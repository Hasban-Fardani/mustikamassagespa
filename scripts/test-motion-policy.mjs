import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const motionSource = await readFile(join(projectRoot, "src/scripts/mustika-ledger-motion.ts"), "utf8");

assert.doesNotMatch(
	 motionSource,
	 /if \(!supportsDesktopRichMotion\)[\s\S]*?return;\s*\}\s*const restoreInitialHash/,
	 "mobile and coarse-pointer browsers must not return before GSAP is imported",
);
assert.match(motionSource, /animateMobileExperience\(gsap, ScrollTrigger\)/, "mobile must have a GSAP animation path");
assert.match(motionSource, /enableHeroSlider\(gsap\)/, "the hero slider must receive GSAP on the shared initialization path");
assert.match(motionSource, /pointerType === "touch"/, "touch interaction handling must remain explicit");
assert.match(motionSource, /quickTo\(preview, "left"/, "the service preview must follow the pointer with its left coordinate");
assert.match(motionSource, /event\.key === "Escape"/, "the service preview must have a keyboard close path");
assert.match(motionSource, /pointerdown.*activeClosePreview/s, "the service preview must close when a touch lands outside it");

console.log("Motion policy regression test passed.");
