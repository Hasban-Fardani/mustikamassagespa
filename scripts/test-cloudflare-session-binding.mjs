import assert from "node:assert/strict";
import { chmod, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const projectRoot = resolve(import.meta.dirname, "..");
const packageJson = JSON.parse(await readFile(join(projectRoot, "package.json"), "utf8"));
const helperSource = await readFile(join(projectRoot, "scripts/prepare-cloudflare-deploy.mjs"), "utf8");

assert.match(
	packageJson.scripts?.postbuild || "",
	/prepare-cloudflare-deploy\.mjs/,
	"postbuild must resolve the existing SESSION namespace before Cloudflare's default deploy stage",
);
assert.doesNotMatch(helperSource, /"--json"/, "Wrangler v4 namespace list does not accept --json");
assert.match(helperSource, /stripDynamicWorkers/, "postbuild must drop Worker Loader / Dynamic Workers before deploy");

const fixtureDir = await mkdtemp(join(tmpdir(), "mustika-cloudflare-binding-"));
const fixtureConfig = join(fixtureDir, "wrangler.json");
const mockWrangler = join(fixtureDir, "wrangler.mjs");
const namespaceId = "0123456789abcdef0123456789abcdef";

await writeFile(
	fixtureConfig,
	JSON.stringify({
		name: "my-marketing-site",
		kv_namespaces: [{ binding: "SESSION" }],
		worker_loaders: [{ binding: "LOADER" }],
		durable_objects: { bindings: [{ name: "PluginBridge", class_name: "PluginBridge" }] },
		previews: {
			kv_namespaces: [{ binding: "SESSION" }],
			worker_loaders: [{ binding: "LOADER" }],
		},
	}),
);

const result = spawnSync(process.execPath, [join(projectRoot, "scripts/prepare-cloudflare-deploy.mjs")], {
	cwd: projectRoot,
	encoding: "utf8",
	env: {
		...process.env,
		EMDASH_WRANGLER_CONFIG_PATH: fixtureConfig,
		EMDASH_SESSION_KV_NAMESPACE_ID: namespaceId,
	},
});

assert.equal(result.status, 0, result.stderr || result.stdout);

const patchedConfig = JSON.parse(await readFile(fixtureConfig, "utf8"));
assert.equal(patchedConfig.kv_namespaces[0].id, namespaceId);
assert.equal(patchedConfig.previews.kv_namespaces[0].id, namespaceId);
assert.equal(patchedConfig.worker_loaders, undefined);
assert.equal(patchedConfig.durable_objects, undefined);
assert.equal(patchedConfig.previews.worker_loaders, undefined);

await writeFile(
	mockWrangler,
	`#!/usr/bin/env node
if (process.argv.slice(2).join(" ") !== "kv namespace list") process.exit(2);
console.log(JSON.stringify([{ id: "${namespaceId}", title: "mustikamassagespa-session" }]));
`,
);
await chmod(mockWrangler, 0o755);
await writeFile(
	fixtureConfig,
	JSON.stringify({
		name: "my-marketing-site",
		kv_namespaces: [{ binding: "SESSION" }],
		previews: { kv_namespaces: [{ binding: "SESSION" }] },
	}),
);

const automaticResult = spawnSync(process.execPath, [join(projectRoot, "scripts/prepare-cloudflare-deploy.mjs")], {
	cwd: projectRoot,
	encoding: "utf8",
	env: {
		...process.env,
		CI: "true",
		EMDASH_WRANGLER_BIN: mockWrangler,
		EMDASH_WRANGLER_CONFIG_PATH: fixtureConfig,
		EMDASH_SESSION_KV_NAMESPACE_ID: "",
	},
});

assert.equal(automaticResult.status, 0, automaticResult.stderr || automaticResult.stdout);

const automaticallyPatchedConfig = JSON.parse(await readFile(fixtureConfig, "utf8"));
assert.equal(automaticallyPatchedConfig.kv_namespaces[0].id, namespaceId);
assert.equal(automaticallyPatchedConfig.previews.kv_namespaces[0].id, namespaceId);
assert.equal(automaticallyPatchedConfig.worker_loaders, undefined);

console.log("Cloudflare SESSION binding regression test passed.");
