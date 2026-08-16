import { spawn } from "node:child_process";
import { existsSync, statSync, watch } from "node:fs";
import { mkdir, stat } from "node:fs/promises";
import { resolve } from "node:path";

const cwd = process.cwd();
const persistPath = resolve(cwd, process.env.EMDASH_LOCAL_STATE || ".wrangler/mustika-local");
const command = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
const port = process.env.PORT || "4321";

function run(args, { capture = false } = {}) {
	return new Promise((resolveRun, reject) => {
		const child = spawn(command, args, {
			cwd,
			env: process.env,
			stdio: capture ? ["ignore", "pipe", "pipe"] : "inherit",
		});
		let stdout = "";
		let stderr = "";
		if (capture) {
			child.stdout.on("data", (chunk) => {
				stdout += chunk;
			});
			child.stderr.on("data", (chunk) => {
				stderr += chunk;
			});
		}
		child.on("error", reject);
		child.on("exit", (code) => {
			if (code === 0) resolveRun({ stdout, stderr });
			else reject(new Error(`${command} ${args.join(" ")} exited with code ${code}`));
		});
	});
}

await mkdir(persistPath, { recursive: true });
await run(["build"]);

let localPages = "";
try {
	const result = await run(
		[
			"exec",
			"wrangler",
			"d1",
			"execute",
			"DB",
			"--local",
			"--persist-to",
			persistPath,
			"--command",
			"SELECT COUNT(*) AS pages FROM ec_pages WHERE slug IN ('home', 'pricing', 'contact') AND status = 'published'",
			"--json",
			"--yes",
		],
		{ capture: true },
	);
	localPages = result.stdout;
} catch {
	// A new local D1 database has no schema yet; the snapshot below initializes it.
}

if (!/"pages"\s*:\s*3/.test(localPages)) {
	await run([
		"exec",
		"wrangler",
		"d1",
		"execute",
		"DB",
		"--local",
		"--persist-to",
		persistPath,
		"--file",
		resolve(cwd, "scripts/local-d1.sql"),
		"--yes",
	]);
}

const workerArgs = [
	"exec",
	"wrangler",
	"dev",
	"dist/server/entry.mjs",
	"--config",
	"dist/server/wrangler.json",
	"--local",
	"--persist-to",
	persistPath,
	"--port",
	port,
];

const buildEntry = resolve(cwd, "dist/server/entry.mjs");
const watchedPaths = ["src", "public", "seed", "astro.config.mjs", "wrangler.jsonc"]
	.map((path) => resolve(cwd, path))
	.filter((path) => existsSync(path));

let worker;
let shuttingDown = false;
let rebuilding = false;
let restarting = false;
let rebuildTimer;
let restartTimer;
let buildPoller;
let lastBuildSignature = null;
const watchers = [];

function startWorker() {
	const child = spawn(command, workerArgs, { cwd, env: process.env, stdio: "inherit" });
	worker = child;
	child.on("exit", (code, signal) => {
		if (worker !== child) return;
		worker = undefined;
		if (!shuttingDown && !rebuilding && !restarting) {
			process.exit(code ?? (signal ? 1 : 0));
		}
	});
}

function stopWorker() {
	const child = worker;
	if (!child) return Promise.resolve();

	worker = undefined;
	return new Promise((resolveStop) => {
		if (child.exitCode !== null) {
			resolveStop();
			return;
		}

		const forceStop = setTimeout(() => {
			if (child.exitCode === null) child.kill("SIGTERM");
		}, 5000);
		child.once("exit", () => {
			clearTimeout(forceStop);
			resolveStop();
		});
		child.kill("SIGINT");
	});
}

async function readBuildSignature() {
	try {
		const info = await stat(buildEntry);
		return `${info.mtimeMs}:${info.size}`;
	} catch {
		return null;
	}
}

async function rebuildAndRestart(reason) {
	if (shuttingDown || rebuilding) return;
	rebuilding = true;
	try {
		console.log(`[dev] ${reason}; rebuilding and restarting Wrangler`);
		await stopWorker();
		await run(["build"]);
		lastBuildSignature = await readBuildSignature();
		startWorker();
	} catch (error) {
		console.error("[dev] Rebuild failed:", error);
		shuttingDown = true;
		process.exitCode = 1;
	} finally {
		rebuilding = false;
	}
}

async function restartForExternalBuild() {
	if (shuttingDown || rebuilding || restarting) return;
	restarting = true;
	try {
		console.log("[dev] Build output changed; restarting Wrangler to refresh static assets");
		await stopWorker();
		startWorker();
	} finally {
		restarting = false;
	}
}

function scheduleRebuild(reason) {
	if (shuttingDown) return;
	clearTimeout(rebuildTimer);
	rebuildTimer = setTimeout(() => {
		rebuildTimer = undefined;
		void rebuildAndRestart(reason);
	}, 350);
}

function scheduleExternalRestart() {
	if (shuttingDown || rebuilding) return;
	clearTimeout(restartTimer);
	restartTimer = setTimeout(() => {
		restartTimer = undefined;
		void restartForExternalBuild();
	}, 700);
}

function watchPath(path) {
	const isDirectory = statSync(path).isDirectory();
	const watcher = watch(path, isDirectory ? { recursive: true } : undefined, () => {
		scheduleRebuild(`change detected in ${path.replace(`${cwd}/`, "")}`);
	});
	watchers.push(watcher);
}

function stopWatching() {
	for (const watcher of watchers) watcher.close();
	if (buildPoller) clearInterval(buildPoller);
	clearTimeout(rebuildTimer);
	clearTimeout(restartTimer);
}

async function shutdown() {
	if (shuttingDown) return;
	shuttingDown = true;
	stopWatching();
	await stopWorker();
	process.exit(0);
}

startWorker();
lastBuildSignature = await readBuildSignature();

for (const path of watchedPaths) {
	try {
		watchPath(path);
	} catch (error) {
		console.warn(`[dev] Could not watch ${path}:`, error.message);
	}
}

buildPoller = setInterval(async () => {
	const signature = await readBuildSignature();
	if (!signature || signature === lastBuildSignature) return;
	lastBuildSignature = signature;
	if (!rebuilding && !restarting) scheduleExternalRestart();
}, 300);

process.once("SIGINT", () => void shutdown());
process.once("SIGTERM", () => void shutdown());
