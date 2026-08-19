import { execFile } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { basename, resolve } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const cwd = process.cwd();
const configPath = resolve(cwd, process.env.EMDASH_WRANGLER_CONFIG_PATH || "dist/server/wrangler.json");
const wranglerBin = resolve(cwd, process.env.EMDASH_WRANGLER_BIN || "node_modules/.bin/wrangler");
const sessionBinding = "SESSION";

const readConfigWhenReady = async (path) => {
	let lastError;
	for (let attempt = 0; attempt < 80; attempt += 1) {
		try {
			return await readFile(path, "utf8");
		} catch (error) {
			lastError = error;
			if (error?.code !== "ENOENT") throw error;
			await delay(250);
		}
	}
	throw lastError;
};

const normalize = (value) => String(value).toLowerCase().replace(/[^a-z0-9]/g, "");

const parseJsonOutput = (output) => {
	const start = output.search(/[\[{]/);
	if (start === -1) throw new Error("Wrangler returned no JSON namespace list.");
	return JSON.parse(output.slice(start));
};

const readNamespaces = async () => {
	try {
		const { stdout } = await execFileAsync(wranglerBin, ["kv", "namespace", "list"], {
			cwd,
			env: process.env,
			maxBuffer: 10 * 1024 * 1024,
		});
		const payload = parseJsonOutput(stdout);
		return Array.isArray(payload) ? payload : payload.result || payload.namespaces || [];
	} catch (error) {
		const detail = error instanceof Error ? error.message : String(error);
		throw new Error(
			`Unable to list Cloudflare KV namespaces. Ensure the deploy environment has a valid CLOUDFLARE_API_TOKEN with KV read access. ${detail}`,
		);
	}
};

const getCandidateTitles = (config, packageJson) => {
	const configuredNames = [
		process.env.EMDASH_SESSION_KV_NAMESPACE_TITLE?.replace(/-session$/i, ""),
		"mustikamassagespa",
		process.env.CLOUDFLARE_WORKER_NAME,
		process.env.WRANGLER_WORKER_NAME,
		process.env.WORKER_NAME,
		process.env.CLOUDFLARE_PROJECT_NAME,
		config.name,
		packageJson.name,
		basename(cwd),
	].filter(Boolean);

	const titles = configuredNames.flatMap((name) => [`${name}-session`, `${normalize(name)}-session`]);
	return [...new Set(titles.map((title) => title.toLowerCase()))];
};

const resolveSessionNamespaceId = async (config, packageJson) => {
	const explicitId = process.env.EMDASH_SESSION_KV_NAMESPACE_ID?.trim();
	if (explicitId) return explicitId;

	const namespaces = await readNamespaces();
	const usableNamespaces = namespaces.filter((namespace) => namespace?.id && (namespace.title || namespace.name));
	const candidateTitles = getCandidateTitles(config, packageJson);
	const candidateSet = new Set(candidateTitles);
	const candidateMatches = usableNamespaces.filter((namespace) => {
		const title = String(namespace.title || namespace.name).toLowerCase();
		const baseTitle = title.replace(/-session$/i, "");
		return candidateSet.has(title) || candidateSet.has(`${normalize(baseTitle)}-session`);
	});

	if (candidateMatches.length === 1) return candidateMatches[0].id;

	const sessionNamespaces = usableNamespaces.filter((namespace) => /session/i.test(String(namespace.title || namespace.name)));
	if (candidateMatches.length === 0 && sessionNamespaces.length === 1) return sessionNamespaces[0].id;

	const available = sessionNamespaces.map((namespace) => `${namespace.title || namespace.name} (${namespace.id})`).join(", ") || "none";
	throw new Error(
		[
			"Could not resolve the existing SESSION KV namespace automatically.",
			`Candidate titles: ${candidateTitles.join(", ") || "none"}`,
			`Session-like namespaces found: ${available}`,
			"Set EMDASH_SESSION_KV_NAMESPACE_ID to the intended namespace ID in the deployment environment and retry.",
		].join(" "),
	);
};

const setSessionBinding = (bindings, id) => {
	const list = Array.isArray(bindings) ? bindings : [];
	const existing = list.find((binding) => binding.binding === sessionBinding);
	if (existing) existing.id = id;
	else list.push({ binding: sessionBinding, id });
	return list;
};

const stripDynamicWorkers = (config) => {
	delete config.worker_loaders;
	if (Array.isArray(config.durable_objects?.bindings)) {
		config.durable_objects.bindings = config.durable_objects.bindings.filter(
			(binding) => binding?.class_name !== "PluginBridge" && binding?.name !== "PluginBridge",
		);
		if (config.durable_objects.bindings.length === 0) delete config.durable_objects;
	}
	if (Array.isArray(config.unsafe?.bindings)) {
		config.unsafe.bindings = config.unsafe.bindings.filter((binding) => binding?.type !== "worker-loader");
		if (config.unsafe.bindings.length === 0) delete config.unsafe.bindings;
	}
};

const main = async () => {
	const [configSource, packageSource] = await Promise.all([
		readConfigWhenReady(configPath),
		readFile(resolve(cwd, "package.json"), "utf8"),
	]);
	const config = JSON.parse(configSource);
	const packageJson = JSON.parse(packageSource);
	stripDynamicWorkers(config);
	if (config.previews) stripDynamicWorkers(config.previews);

	// The Astro adapter does not carry `observability` over from the root
	// wrangler config, so mirror it here to keep Workers Logs enabled on deploy.
	config.observability = {
		logs: {
			enabled: true,
			invocation_logs: true,
		},
	};

	const currentBinding = config.kv_namespaces?.find((binding) => binding.binding === sessionBinding);

	if (currentBinding?.id) {
		await writeFile(configPath, `${JSON.stringify(config, null, "\t")}\n`);
		console.log(`Cloudflare SESSION KV binding already configured: ${currentBinding.id}`);
		console.log("Workers observability logs enabled in the deploy config.");
		return;
	}

	const explicitId = process.env.EMDASH_SESSION_KV_NAMESPACE_ID?.trim();
	const hasCloudflareContext = Boolean(
		process.env.CI ||
			process.env.CLOUDFLARE_API_TOKEN ||
			process.env.CLOUDFLARE_API_KEY ||
			process.env.WRANGLER_API_TOKEN,
	);

	if (!explicitId && !hasCloudflareContext) {
		console.warn(
			"[cloudflare-deploy] Skipping SESSION namespace lookup outside CI. The Cloudflare build will resolve it during postbuild.",
		);
		return;
	}

	const namespaceId = await resolveSessionNamespaceId(config, packageJson);
	config.kv_namespaces = setSessionBinding(config.kv_namespaces, namespaceId);
	if (config.previews) config.previews.kv_namespaces = setSessionBinding(config.previews.kv_namespaces, namespaceId);

	await writeFile(configPath, `${JSON.stringify(config, null, "\t")}\n`);
	console.log(`Linked SESSION binding to existing Cloudflare KV namespace ${namespaceId}.`);
};

main().catch((error) => {
	console.error(`[cloudflare-deploy] ${error instanceof Error ? error.message : String(error)}`);
	process.exitCode = 1;
});
