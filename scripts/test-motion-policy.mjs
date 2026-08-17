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
assert.match(
	motionSource,
	/quickTo\(preview, "x"/,
	"the service preview must follow the pointer through transform (x), not stylesheet left/top",
);
assert.match(motionSource, /event\.key === "Escape"/, "the service preview must have a keyboard close path");
assert.doesNotMatch(
	motionSource,
	/openPreview\(event, true\)/,
	"the service preview must never open from a touch tap -- rows show their photo already",
);
assert.match(
	motionSource,
	/const canHover = window\.matchMedia\("\(hover: hover\) and \(pointer: fine\)"\)\.matches;/,
	"the service preview must only bind on hover-capable pointers",
);
assert.doesNotMatch(
	motionSource,
	/pinSpacing:\s*false/,
	"a pinned scene must reserve its own scroll space -- pinSpacing:false plus margin hacks feel like a teleport",
);
assert.match(
	motionSource,
	/\.ledger-intro[\s\S]{0,900}?pin:\s*true/,
	"the intro section must pin with proper spacing for the enter-the-room narrative",
);
assert.match(
	motionSource,
	/scrub:/,
	"section reveals must be scrub-linked so animation state can never desync from scroll position",
);

console.log("Motion policy regression test passed.");
