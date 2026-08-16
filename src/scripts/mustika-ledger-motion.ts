type GsapModule = typeof import("gsap");
type ScrollTriggerModule = typeof import("gsap/ScrollTrigger");

const prefersReducedMotion = () =>
	typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function prepareWordReveals() {
	document.querySelectorAll<HTMLElement>("[data-word-reveal]").forEach((root) => {
		if (root.dataset.wordsReady === "true") return;

		const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
		const textNodes: Text[] = [];
		let currentNode = walker.nextNode();

		while (currentNode) {
			const textNode = currentNode as Text;
			if (textNode.textContent?.trim() && textNode.parentElement?.closest("[data-word-reveal]") === root) {
				textNodes.push(textNode);
			}
			currentNode = walker.nextNode();
		}

		textNodes.forEach((textNode) => {
			const text = textNode.textContent ?? "";
			const words = text.match(/\S+/g);
			if (!words?.length) return;

			const fragment = document.createDocumentFragment();
			const leadingSpace = text.match(/^\s*/)?.[0] ?? "";
			const trailingSpace = text.match(/\s*$/)?.[0] ?? "";

			if (leadingSpace) fragment.append(document.createTextNode(leadingSpace));
			words.forEach((word, index) => {
				const mask = document.createElement("span");
				mask.className = "scroll-word-mask";
				const inner = document.createElement("span");
				inner.dataset.scrollWordInner = "true";
				inner.textContent = word;
				mask.appendChild(inner);
				fragment.append(mask);
				if (index < words.length - 1) fragment.append(document.createTextNode(" "));
			});
			if (trailingSpace) fragment.append(document.createTextNode(trailingSpace));

			textNode.replaceWith(fragment);
		});

		root.dataset.wordsReady = "true";
	});
}

function showStaticContent() {
	document
		.querySelectorAll<HTMLElement>("[data-reveal], [data-service-item], [data-journey-step], [data-standard-item], [data-faq-item]")
		.forEach((element) => {
			element.style.opacity = "1";
			element.style.transform = "none";
			element.style.clipPath = "none";
		});

	document.querySelectorAll<HTMLElement>("[data-hero-word]").forEach((element) => {
		element.style.transform = "none";
	});

	document.querySelectorAll<HTMLElement>("[data-scroll-word-inner], [data-hero-exit-word]").forEach((element) => {
		element.style.opacity = "1";
		element.style.transform = "none";
	});

	document.querySelectorAll<HTMLElement>("[data-hero-paper], [data-hero-main], [data-hero-stage]").forEach((element) => {
		element.style.transform = "none";
		element.style.clipPath = "none";
	});

	document.querySelectorAll<HTMLElement>("[data-hero-visual-detail]").forEach((element) => {
		element.style.opacity = "1";
		element.style.transform = "none";
	});

	document.querySelectorAll<HTMLElement>("[data-hero-exit]").forEach((element) => {
		element.style.opacity = "0";
		element.style.visibility = "hidden";
		element.style.transform = "none";
	});

	document.querySelectorAll<HTMLElement>("[data-hero-exit-visual]").forEach((element) => {
		element.style.opacity = "0";
		element.style.clipPath = "none";
		element.style.transform = "none";
	});
}

function updateScrollProgress() {
	const progress = document.querySelector<HTMLElement>("[data-scroll-progress]");
	if (!progress) return;

	const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
	const ratio = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;
	progress.style.transform = `scaleX(${ratio})`;
}

function enableMagneticButtons(gsap: GsapModule["default"]) {
	document.querySelectorAll<HTMLElement>(".ledger-button.magnetic").forEach((button) => {
		const xTo = gsap.quickTo(button, "x", { duration: 0.52, ease: "power4.out" });
		const yTo = gsap.quickTo(button, "y", { duration: 0.52, ease: "power4.out" });
		const arrow = button.querySelector<HTMLElement>(".btn-arrow");

		button.addEventListener("pointermove", (event) => {
			const bounds = button.getBoundingClientRect();
			xTo((event.clientX - bounds.left - bounds.width / 2) * 0.12);
			yTo((event.clientY - bounds.top - bounds.height / 2) * 0.15);
		});

		button.addEventListener("pointerenter", () => {
			if (arrow) gsap.to(arrow, { x: 4, y: -3, rotate: 8, duration: 0.32, ease: "power3.out" });
		});

		button.addEventListener("pointerleave", () => {
			xTo(0);
			yTo(0);
			if (arrow) gsap.to(arrow, { x: 0, y: 0, rotate: 0, duration: 0.48, ease: "power4.out" });
		});
	});
}

function animateHero(
	gsap: GsapModule["default"],
	ScrollTrigger: ScrollTriggerModule["ScrollTrigger"],
) {
	const hero = document.querySelector<HTMLElement>("[data-ledger-hero]");
	const heroMain = document.querySelector<HTMLElement>("[data-hero-main]");
	const heroCopy = document.querySelector<HTMLElement>("[data-hero-copy]");
	const heroStage = document.querySelector<HTMLElement>("[data-hero-stage]");
	const heroPaper = document.querySelector<HTMLElement>("[data-hero-paper]");
	const heroImageWrap = document.querySelector<HTMLElement>("[data-hero-image-wrap]");
	const heroImage = heroImageWrap?.querySelector<HTMLElement>("img");
	const heroWords = document.querySelectorAll<HTMLElement>("[data-hero-word]");
	const heroReveal = document.querySelectorAll<HTMLElement>("[data-hero-main] [data-reveal]");
	const heroTop = document.querySelector<HTMLElement>("[data-hero-top]");
	const heroFooter = document.querySelector<HTMLElement>("[data-hero-footer]");
	const heroExit = document.querySelector<HTMLElement>("[data-hero-exit]");
	const heroExitVisual = document.querySelector<HTMLElement>("[data-hero-exit-visual]");
	const heroExitWords = document.querySelectorAll<HTMLElement>("[data-hero-exit-word]");
	const heroAnnotations = document.querySelectorAll<HTMLElement>("[data-hero-annotation]");
	const heroSheetRule = document.querySelector<HTMLElement>("[data-hero-sheet-rule]");
	const heroVisualDetail = document.querySelector<HTMLElement>("[data-hero-visual-detail]");

	if (!hero || !heroMain || !heroCopy || !heroStage || !heroPaper || !heroExit) return;

	gsap.set(heroWords, { yPercent: 120, rotate: 2.5, transformOrigin: "left bottom" });
	gsap.set(heroPaper, {
		clipPath: "inset(0 0 0 100%)",
		x: 28,
		rotate: 7,
		transformOrigin: "50% 50%",
	});
	gsap.set(heroStage, { y: 24, rotate: -2, transformOrigin: "50% 50%" });
	gsap.set(heroImageWrap, { scale: 1.16, xPercent: 4, transformOrigin: "50% 50%" });
	if (heroImage) gsap.set(heroImage, { scale: 1.08, transformOrigin: "50% 50%" });
	gsap.set(heroExit, { yPercent: 100, autoAlpha: 0 });
	gsap.set(heroExitWords, { yPercent: 120, opacity: 0, rotate: 2, transformOrigin: "left bottom" });
	if (heroExitVisual) {
		gsap.set(heroExitVisual, {
			xPercent: 18,
			rotate: 8,
			clipPath: "inset(0 0 0 100%)",
			transformOrigin: "50% 50%",
		});
	}
	gsap.set(heroAnnotations, { x: -12, opacity: 0 });
	gsap.set(heroSheetRule, { scaleX: 0, transformOrigin: "left center" });
	gsap.set(heroVisualDetail, { y: 16, opacity: 0 });
	gsap.set([heroTop, heroFooter], { y: 18, opacity: 0 });
	gsap.set(heroReveal, { y: 24, opacity: 0 });

	const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
	intro
		.to(heroTop, { y: 0, opacity: 1, duration: 0.72 }, 0)
		.to(heroPaper, { clipPath: "inset(0 0 0 0%)", x: 0, rotate: 2.4, duration: 1.2 }, 0.12)
		.to(heroStage, { y: 0, rotate: 0, duration: 1.2 }, 0.12)
		.to(heroSheetRule, { scaleX: 1, duration: 0.6 }, 0.38)
		.to(heroImageWrap, { scale: 1, xPercent: 0, duration: 1.05 }, 0.24)
		.to(heroWords, { yPercent: 0, rotate: 0, duration: 0.88, stagger: 0.055 }, 0.34)
		.to(heroAnnotations, { x: 0, opacity: 1, duration: 0.55, stagger: 0.1 }, 0.55)
		.to(heroVisualDetail, { y: 0, opacity: 1, duration: 0.6 }, 0.62)
		.to(heroReveal, { y: 0, opacity: 1, duration: 0.66, stagger: 0.07 }, 0.68)
		.to(heroFooter, { y: 0, opacity: 1, duration: 0.62 }, 1.02);

	if (heroImage) intro.to(heroImage, { scale: 1, duration: 1.1 }, 0.2);

	if (heroImage) {
		gsap.to(heroImage, {
			scale: 1.025,
			duration: 6.2,
			repeat: -1,
			yoyo: true,
			ease: "sine.inOut",
			delay: 1.8,
		});
	}

	const scrollScene = gsap.timeline({
		scrollTrigger: {
			trigger: hero,
			start: "top top",
			end: "+=120%",
			pin: true,
			pinSpacing: false,
			scrub: 1.1,
			anticipatePin: 1,
			onToggle: (self) => {
				hero.classList.toggle("is-pinned", self.isActive);
				hero.classList.toggle("is-released", !self.isActive && self.progress >= 0.999);
			},
			onUpdate: (self) => {
				hero.classList.toggle("is-released", !self.isActive && self.progress >= 0.999);
			},
		},
	});

	scrollScene
		.to(heroMain, { yPercent: -96, ease: "none" }, 0)
		.to(heroCopy, { xPercent: -9, yPercent: -18, ease: "none" }, 0)
		.to(heroStage, { xPercent: -18, yPercent: -12, rotate: -7, ease: "none" }, 0)
		.to(heroImageWrap, { scale: 1.28, ease: "none" }, 0.04)
		.to(heroExit, { yPercent: 0, autoAlpha: 1, ease: "none" }, 0.1);
	if (heroExitVisual) {
		scrollScene.to(heroExitVisual, { xPercent: 0, rotate: 5, clipPath: "inset(0 0 0 0%)", ease: "none" }, 0.14);
	}
	scrollScene.to(heroExitWords, { yPercent: 0, opacity: 1, rotate: 0, stagger: 0.06, ease: "none" }, 0.2);

	const stageX = gsap.quickTo(heroStage, "x", { duration: 1.15, ease: "power3.out" });
	const stageY = gsap.quickTo(heroStage, "y", { duration: 1.15, ease: "power3.out" });
	const copyX = gsap.quickTo(heroCopy, "x", { duration: 1.25, ease: "power3.out" });
	const copyY = gsap.quickTo(heroCopy, "y", { duration: 1.25, ease: "power3.out" });

	const onPointerMove = (event: PointerEvent) => {
		if (event.pointerType === "touch") return;
		const x = event.clientX / window.innerWidth - 0.5;
		const y = event.clientY / window.innerHeight - 0.5;
		stageX(x * 15);
		stageY(y * 10);
		copyX(x * -4);
		copyY(y * -2.5);
	};

	window.addEventListener("pointermove", onPointerMove, { passive: true });
	window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
}

function animateWordReveals(gsap: GsapModule["default"]) {
	document.querySelectorAll<HTMLElement>("[data-word-reveal]").forEach((root) => {
		const words = root.querySelectorAll<HTMLElement>("[data-scroll-word-inner]");
		if (!words.length) return;

		gsap.set(words, { yPercent: 112, opacity: 0, rotate: 1.5, transformOrigin: "left bottom" });
		gsap.to(words, {
			yPercent: 0,
			opacity: 1,
			rotate: 0,
			stagger: 0.035,
			ease: "none",
			scrollTrigger: {
				trigger: root,
				start: "top 88%",
				end: "top 44%",
				scrub: 0.75,
				invalidateOnRefresh: true,
			},
		});
	});
}

function animateServiceLedger(gsap: GsapModule["default"]) {
	const list = document.querySelector<HTMLElement>("[data-service-list]");
	const items = list?.querySelectorAll<HTMLElement>("[data-service-item]");
	if (!list || !items?.length) return;

	gsap.fromTo(
		items,
		{ clipPath: "inset(0 100% 0 0)", x: 24 },
		{
			clipPath: "inset(0 0% 0 0)",
			x: 0,
			duration: 0.95,
			stagger: 0.12,
			ease: "expo.out",
			scrollTrigger: { trigger: list, start: "top 78%", toggleActions: "play reverse play reverse" },
		},
	);

	items.forEach((item) => {
		const hoverLine = item.querySelector<HTMLElement>(".service-hover-line");
		const arrow = item.querySelector<HTMLElement>(".service-arrow");

		item.addEventListener("pointerenter", () => {
			gsap.to(item, { x: 8, duration: 0.42, ease: "power3.out" });
			if (hoverLine) gsap.to(hoverLine, { scaleX: 1, duration: 0.42, ease: "power3.out" });
			if (arrow) gsap.to(arrow, { rotate: 45, color: "#f0e9dd", duration: 0.38, ease: "power3.out" });
		});

		item.addEventListener("pointerleave", () => {
			gsap.to(item, { x: 0, duration: 0.55, ease: "power4.out" });
			if (hoverLine) gsap.to(hoverLine, { scaleX: 0, duration: 0.42, ease: "power3.out" });
			if (arrow) gsap.to(arrow, { rotate: 0, color: "#c49a4e", duration: 0.45, ease: "power4.out" });
		});
	});
}

function animateSections(
	gsap: GsapModule["default"],
	ScrollTrigger: ScrollTriggerModule["ScrollTrigger"],
) {
	animateWordReveals(gsap);

	document.querySelectorAll<HTMLElement>(".mustika-ledger section:not(.ledger-hero) [data-reveal]").forEach((element) => {
		gsap.fromTo(
			element,
			{ y: 28, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 0.82,
				ease: "expo.out",
				scrollTrigger: { trigger: element, start: "top 90%", toggleActions: "play reverse play reverse" },
			},
		);
	});

	const bookVisualImage = document.querySelector<HTMLElement>("[data-book-visual] img");
	if (bookVisualImage) {
		gsap.fromTo(
			bookVisualImage,
			{ scale: 1.08, yPercent: 5 },
			{
				scale: 1,
				yPercent: -4,
				ease: "none",
				scrollTrigger: {
					trigger: bookVisualImage,
					start: "top bottom",
					end: "bottom top",
					scrub: 0.9,
				},
			},
		);
	}

	const journey = document.querySelectorAll<HTMLElement>("[data-journey-step]");
	if (journey.length) {
		gsap.fromTo(
			journey,
			{ y: 24, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 0.75,
				stagger: 0.13,
				ease: "expo.out",
				scrollTrigger: { trigger: journey[0], start: "top 80%", toggleActions: "play reverse play reverse" },
			},
		);
	}

	const standards = document.querySelectorAll<HTMLElement>("[data-standard-item]");
	if (standards.length) {
		gsap.fromTo(
			standards,
			{ x: 26, opacity: 0 },
			{
				x: 0,
				opacity: 1,
				duration: 0.76,
				stagger: 0.1,
				ease: "expo.out",
				scrollTrigger: { trigger: standards[0], start: "top 82%", toggleActions: "play reverse play reverse" },
			},
		);
	}

	const faq = document.querySelectorAll<HTMLElement>("[data-faq-item]");
	if (faq.length) {
		gsap.fromTo(
			faq,
			{ clipPath: "inset(0 0 100% 0)", y: 16 },
			{
				clipPath: "inset(0 0 0% 0)",
				y: 0,
				duration: 0.72,
				stagger: 0.1,
				ease: "expo.out",
				scrollTrigger: { trigger: faq[0], start: "top 82%", toggleActions: "play reverse play reverse" },
			},
		);
	}

	ScrollTrigger.refresh();
}

export async function initMustikaLedgerMotion() {
	if (typeof window === "undefined") return;

	prepareWordReveals();
	updateScrollProgress();
	window.addEventListener("scroll", updateScrollProgress, { passive: true });

	if (prefersReducedMotion()) {
		showStaticContent();
		return;
	}

	const supportsRichMotion = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
	if (!supportsRichMotion) {
		showStaticContent();
		return;
	}

	const fallbackTimer = window.setTimeout(showStaticContent, 1400);

	try {
		const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
			import("gsap"),
			import("gsap/ScrollTrigger"),
		]);
		window.clearTimeout(fallbackTimer);
		gsap.registerPlugin(ScrollTrigger);

		const media = gsap.matchMedia();
		media.add("(min-width: 761px) and (hover: hover) and (pointer: fine)", () => {
			animateHero(gsap, ScrollTrigger);
			animateServiceLedger(gsap);
			animateSections(gsap, ScrollTrigger);
			enableMagneticButtons(gsap);
		});
	} catch {
		window.clearTimeout(fallbackTimer);
		showStaticContent();
	}
}
