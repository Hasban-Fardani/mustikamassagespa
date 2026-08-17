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

	document.querySelectorAll<HTMLElement>("[data-scroll-word-inner]").forEach((element) => {
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

}

function updateScrollProgress() {
	const progress = document.querySelector<HTMLElement>("[data-scroll-progress]");
	if (!progress) return;

	const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
	const ratio = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;
	progress.style.transform = `scaleX(${ratio})`;
}

function prepareInitialHashPosition() {
	const hash = window.location.hash;
	if (!hash || hash.length < 2) return null;

	const target = document.getElementById(hash.slice(1));
	if (!target) return null;

	const previousScrollRestoration = window.history.scrollRestoration;
	window.history.scrollRestoration = "manual";
	const root = document.documentElement;
	const previousScrollBehavior = root.style.scrollBehavior;
	root.style.scrollBehavior = "auto";
	window.scrollTo(0, 0);
	root.style.scrollBehavior = previousScrollBehavior;

	return () => {
		const scrollPaddingTop = Number.parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
		const top = target.getBoundingClientRect().top + window.scrollY - scrollPaddingTop;
		const restoreBehavior = root.style.scrollBehavior;
		root.style.scrollBehavior = "auto";
		window.scrollTo(0, Math.max(0, top));
		root.style.scrollBehavior = restoreBehavior;
		window.history.scrollRestoration = previousScrollRestoration;
	};
}

function enableFaqAccordion() {
	const list = document.querySelector<HTMLElement>("[data-faq-list]");
	const page = document.querySelector<HTMLElement>(".mustika-page");
	const rows = list ? Array.from(list.querySelectorAll<HTMLElement>("[data-faq-item]")) : [];
	if (!page || !rows.length) return;

	const setRowState = (row: HTMLElement, isOpen: boolean) => {
		row.dataset.faqOpen = String(isOpen);
		row.querySelector<HTMLButtonElement>("[data-faq-trigger]")?.setAttribute("aria-expanded", String(isOpen));
		row.querySelector<HTMLElement>("[data-faq-answer]")?.setAttribute("aria-hidden", String(!isOpen));
	};

	page.classList.add("faq-ready");
	rows.forEach((row) => {
		const trigger = row.querySelector<HTMLButtonElement>("[data-faq-trigger]");
		if (!trigger) return;

		setRowState(row, row.dataset.faqOpen === "true");
		trigger.addEventListener("click", () => {
			const nextState = row.dataset.faqOpen !== "true";
			rows.forEach((otherRow) => setRowState(otherRow, otherRow === row && nextState));
		});
	});
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

function enableHashNavigation(
	gsap: GsapModule["default"],
	ScrollTrigger: ScrollTriggerModule["ScrollTrigger"],
) {
	const root = document.documentElement;
	const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("a[href]"));
	let activeTween: ReturnType<typeof gsap.to> | null = null;
	const cancelOnUserInput = () => activeTween?.kill();
	window.addEventListener("wheel", cancelOnUserInput, { passive: true });
	window.addEventListener("touchstart", cancelOnUserInput, { passive: true });
	window.addEventListener("pointerdown", cancelOnUserInput, { passive: true });
	window.addEventListener("keydown", (event) => {
		if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) {
			cancelOnUserInput();
		}
	});

	const getTarget = (href: string) => {
		const url = new URL(href, window.location.href);
		if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return null;
		return document.getElementById(url.hash.slice(1));
	};

	const scrollToTarget = (target: HTMLElement, hash: string, updateHistory: boolean) => {
		const scrollPaddingTop = Number.parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
		const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - scrollPaddingTop);
		const previousScrollBehavior = root.style.scrollBehavior;
		root.style.scrollBehavior = "auto";
		activeTween?.kill();

		if (updateHistory) window.history.pushState(null, "", hash);

		const scrollState = { value: window.scrollY };
		activeTween = gsap.to(scrollState, {
			duration: 1.12,
			ease: "power3.inOut",
			overwrite: "auto",
			value: top,
			onUpdate: () => window.scrollTo(0, scrollState.value),
			onComplete: () => {
				root.style.scrollBehavior = previousScrollBehavior;
				activeTween = null;
				ScrollTrigger.update();
				target.focus({ preventScroll: true });
			},
			onInterrupt: () => {
				root.style.scrollBehavior = previousScrollBehavior;
				activeTween = null;
			},
		});
	};

	links.forEach((link) => {
		const target = getTarget(link.href);
		if (!target) return;

		link.addEventListener("click", (event) => {
			event.preventDefault();
			const url = new URL(link.href, window.location.href);
			scrollToTarget(target, url.hash, true);
		});
	});
}

function enableHeroSlider(gsap?: GsapModule["default"]) {
	const wrap = document.querySelector<HTMLElement>("[data-hero-image-wrap]");
	const stage = document.querySelector<HTMLElement>("[data-hero-stage]");
	const slides = wrap ? Array.from(wrap.querySelectorAll<HTMLElement>("[data-hero-slide]")) : [];
	const previousButton = document.querySelector<HTMLButtonElement>("[data-hero-prev]");
	const nextButton = document.querySelector<HTMLButtonElement>("[data-hero-next]");
	const counter = document.querySelector<HTMLElement>("[data-hero-counter]");
	const label = document.querySelector<HTMLElement>("[data-hero-slide-label]");
	const detail = document.querySelector<HTMLElement>("[data-hero-detail]");

	if (!wrap || !stage || slides.length < 2 || wrap.dataset.heroSliderReady === "true") return;
	wrap.dataset.heroSliderReady = "true";

	let activeIndex = Math.max(0, slides.findIndex((slide) => slide.dataset.active === "true"));
	// Cooldown instead of a boolean latch: a latch can deadlock forever when the
	// GSAP ticker is throttled and the timeline's onComplete never fires.
	let lastTransitionAt = 0;
	let timer: number | undefined;
	let pointerStartX: number | null = null;
	let isVisible = true;
	let isPaused = false;
	const reducedMotion = prefersReducedMotion();
	const total = slides.length;
	const copyTargets = [label, detail].filter((element): element is HTMLElement => Boolean(element));

	const formatIndex = (index: number) => String(index + 1).padStart(2, "0");
	const updateCopy = (slide: HTMLElement, index: number, animate: boolean) => {
		// State is applied synchronously so the counter and captions are always
		// correct even if the animation ticker is throttled; the tween is only
		// the entrance garnish. The counter is a screen-reader-only live region
		// announcing the slide label -- no visual chrome on the photo.
		const slideLabel = slide.dataset.label || "Suasana relaksasi";
		if (counter) counter.textContent = `${slideLabel} (${formatIndex(index + 1)} dari ${total})`;
		if (label) label.textContent = slideLabel;
		if (detail) detail.textContent = slide.dataset.detail || "Waktu untuk beristirahat.";

		if (!gsap || !animate || !copyTargets.length) return;
		gsap.fromTo(
			copyTargets,
			{ y: 7 },
			{ y: 0, duration: 0.4, stagger: 0.04, ease: "power3.out", overwrite: "auto" },
		);
	};

	const setAccessibilityState = (nextIndex: number) => {
		slides.forEach((slide, index) => {
			const isActive = index === nextIndex;
			slide.dataset.active = String(isActive);
			slide.setAttribute("aria-hidden", String(!isActive));
		});
	};

	const clearTimer = () => {
		if (timer !== undefined) window.clearTimeout(timer);
		timer = undefined;
	};

	const scheduleNext = () => {
		clearTimer();
		if (reducedMotion || isPaused || !isVisible || document.hidden) return;
		timer = window.setTimeout(() => showSlide(activeIndex + 1, 1, true), 6200);
	};

	const showSlide = (requestedIndex: number, direction: 1 | -1, automatic = false) => {
		const now = performance.now();
		const nextIndex = (requestedIndex + total) % total;
		if (nextIndex === activeIndex || now - lastTransitionAt < 950) {
			if (automatic) scheduleNext();
			return;
		}

		clearTimer();
		const outgoing = slides[activeIndex];
		const incoming = slides[nextIndex];
		if (!outgoing || !incoming) return;

		const outgoingImage = outgoing.querySelector<HTMLElement>("img");
		const incomingImage = incoming.querySelector<HTMLElement>("img");
		activeIndex = nextIndex;
		lastTransitionAt = now;
		setAccessibilityState(nextIndex);
		updateCopy(incoming, nextIndex, true);

		if (!gsap || reducedMotion) {
			scheduleNext();
			return;
		}

		const incomingClip = direction > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)";
		const outgoingClip = direction > 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)";
		const timeline = gsap.timeline({
			onComplete: () => {
				gsap.set(outgoing, { autoAlpha: 0, zIndex: 0, clipPath: "inset(0 0 0 0)" });
				gsap.set(incoming, { autoAlpha: 1, zIndex: 1, clipPath: "inset(0 0 0 0)" });
				scheduleNext();
			},
		});

		timeline
			.set(incoming, { autoAlpha: 1, zIndex: 2, clipPath: incomingClip })
			.to(outgoing, { clipPath: outgoingClip, duration: 0.72, ease: "expo.inOut" }, 0)
			.to(incoming, { clipPath: "inset(0 0% 0 0%)", duration: 0.82, ease: "expo.inOut" }, 0.06);

		if (outgoingImage) {
			timeline.to(outgoingImage, { scale: 1.055, xPercent: direction * -2, duration: 0.72, ease: "power2.inOut" }, 0);
		}
		if (incomingImage) {
			timeline.fromTo(
				incomingImage,
				{ scale: 1.12, xPercent: direction * 3 },
				{ scale: 1.015, xPercent: 0, duration: 1, ease: "power3.out" },
				0.02,
			);
		}
	};

	if (gsap) {
		gsap.set(slides, { autoAlpha: 0, zIndex: 0, clipPath: "inset(0 0 0 0)" });
		gsap.set(slides[activeIndex], { autoAlpha: 1, zIndex: 1 });
	}
	setAccessibilityState(activeIndex);
	updateCopy(slides[activeIndex]!, activeIndex, false);

	previousButton?.addEventListener("click", () => showSlide(activeIndex - 1, -1));
	nextButton?.addEventListener("click", () => showSlide(activeIndex + 1, 1));
	wrap.addEventListener("keydown", (event) => {
		if (event.key === "ArrowLeft") {
			event.preventDefault();
			showSlide(activeIndex - 1, -1);
		}
		if (event.key === "ArrowRight") {
			event.preventDefault();
			showSlide(activeIndex + 1, 1);
		}
	});
	wrap.addEventListener("pointerdown", (event) => {
		if (event.pointerType === "touch") pointerStartX = event.clientX;
	});
	wrap.addEventListener("pointerup", (event) => {
		if (pointerStartX === null) return;
		const distance = event.clientX - pointerStartX;
		pointerStartX = null;
		if (Math.abs(distance) < 42) return;
		showSlide(activeIndex + (distance < 0 ? 1 : -1), distance < 0 ? 1 : -1);
	});
	// No section-wide hover pause: the stage covers the whole first viewport,
	// so a resting cursor would freeze autoplay forever. The deck still pauses
	// for keyboard focus on the controls, hidden tabs, and when scrolled away.
	stage.addEventListener("focusin", () => {
		isPaused = true;
		clearTimer();
	});
	stage.addEventListener("focusout", () => {
		isPaused = false;
		scheduleNext();
	});
	document.addEventListener("visibilitychange", scheduleNext);

	if ("IntersectionObserver" in window) {
		const observer = new IntersectionObserver(
			([entry]) => {
				isVisible = Boolean(entry?.isIntersecting && entry.intersectionRatio > 0.22);
				if (isVisible) scheduleNext();
				else clearTimer();
			},
			{ threshold: [0, 0.22] },
		);
		observer.observe(stage);
	}

	scheduleNext();
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
	const heroSheetRule = document.querySelector<HTMLElement>("[data-hero-sheet-rule]");
	const heroVisualDetail = document.querySelector<HTMLElement>("[data-hero-visual-detail]");

	if (!hero || !heroMain || !heroCopy || !heroStage || !heroPaper) return;

	gsap.set(heroWords, { yPercent: 120, rotate: 2.5, transformOrigin: "left bottom" });
	gsap.set(heroPaper, {
		clipPath: "inset(0 0 0 100%)",
		x: 28,
		rotate: 0,
		transformOrigin: "50% 50%",
	});
	gsap.set(heroStage, { y: 24, rotate: 0, transformOrigin: "50% 50%" });
	gsap.set(heroImageWrap, { scale: 1.16, xPercent: 4, transformOrigin: "50% 50%" });
	if (heroImage) gsap.set(heroImage, { scale: 1.08, transformOrigin: "50% 50%" });
	gsap.set(heroSheetRule, { scaleX: 0, transformOrigin: "left center" });
	gsap.set(heroVisualDetail, { y: 16 });
	gsap.set(heroReveal, { y: 24 });

	const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
	intro
		.to(heroPaper, { clipPath: "inset(0 0 0 0%)", x: 0, rotate: 0, duration: 1.2 }, 0.12)
		.to(heroStage, { y: 0, rotate: 0, duration: 1.2 }, 0.12)
		.to(heroSheetRule, { scaleX: 1, duration: 0.6 }, 0.38)
		.to(heroImageWrap, { scale: 1, xPercent: 0, duration: 1.05 }, 0.24)
		.to(heroWords, { yPercent: 0, rotate: 0, duration: 0.88, stagger: 0.055 }, 0.34)
		.to(heroVisualDetail, { y: 0, duration: 0.6 }, 0.62)
		.to(heroReveal, { y: 0, duration: 0.66, stagger: 0.07 }, 0.68);

	if (heroImage) intro.to(heroImage, { scale: 1, duration: 1.1 }, 0.2);

	// The hero scrolls away naturally -- no pin, no extra scroll length. Layered
	// parallax keeps the exit continuous so nothing feels skipped or teleported.
	const scrollScene = gsap.timeline({
		defaults: { ease: "none" },
		scrollTrigger: {
			trigger: hero,
			start: "top top",
			end: "bottom top",
			scrub: 0.6,
			invalidateOnRefresh: true,
		},
	});

	scrollScene
		.to(heroVisualDetail, { autoAlpha: 0, duration: 0.28 }, 0)
		.to(heroCopy, { yPercent: -18, autoAlpha: 0, duration: 0.55 }, 0.08)
		.to(heroStage, { yPercent: 9, duration: 1 }, 0)
		.to(heroImageWrap, { scale: 1.09, duration: 1 }, 0);

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
	enableHeroSlider(gsap);
}

function animateWordReveals(gsap: GsapModule["default"]) {
	document.querySelectorAll<HTMLElement>("[data-word-reveal]").forEach((root) => {
		const words = root.querySelectorAll<HTMLElement>("[data-scroll-word-inner]");
		if (!words.length) return;

		gsap.set(words, { yPercent: 112, rotate: 1.5, transformOrigin: "left bottom" });
		gsap.to(words, {
			yPercent: 0,
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

function enableTapFeedback(gsap: GsapModule["default"]) {
	document.querySelectorAll<HTMLElement>(".ledger-button, .ledger-text-link, .ledger-inline-link").forEach((element) => {
		if (element.dataset.tapFeedbackReady === "true") return;
		element.dataset.tapFeedbackReady = "true";

		element.addEventListener("pointerdown", (event) => {
			if (event.pointerType !== "touch") return;
			gsap.to(element, { scale: 0.965, duration: 0.12, ease: "power2.out", overwrite: true });
		});
		element.addEventListener("pointerup", (event) => {
			if (event.pointerType !== "touch") return;
			gsap.to(element, { scale: 1, duration: 0.38, ease: "back.out(2.4)", overwrite: true });
		});
		element.addEventListener("pointercancel", () => {
			gsap.to(element, { scale: 1, duration: 0.3, ease: "power3.out", overwrite: true });
		});
	});
}

function animateMobileExperience(
	gsap: GsapModule["default"],
	ScrollTrigger: ScrollTriggerModule["ScrollTrigger"],
) {
	const hero = document.querySelector<HTMLElement>("[data-ledger-hero]");
	const heroStage = document.querySelector<HTMLElement>("[data-hero-stage]");
	const heroImageWrap = document.querySelector<HTMLElement>("[data-hero-image-wrap]");
	const heroImage = heroImageWrap?.querySelector<HTMLElement>("img");
	const heroWords = document.querySelectorAll<HTMLElement>("[data-hero-word]");
	const heroReveal = document.querySelectorAll<HTMLElement>("[data-hero-main] [data-reveal]");
	const heroDetail = document.querySelector<HTMLElement>("[data-hero-visual-detail]");

	if (hero && heroStage && heroImageWrap) {
		gsap.set(heroStage, { y: 18, clipPath: "inset(0 0 10% 0)" });
		gsap.set(heroImageWrap, { scale: 1.1, transformOrigin: "50% 50%" });
		gsap.set(heroWords, { yPercent: 112, rotate: 2.5, transformOrigin: "left bottom" });
		gsap.set(heroReveal, { y: 18 });
		gsap.set(heroDetail, { y: 10 });

		const arrival = gsap.timeline({ defaults: { ease: "expo.out" } });
		arrival
			.to(heroStage, { y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.85 }, 0)
			.to(heroImageWrap, { scale: 1, duration: 1.15 }, 0)
			.to(heroWords, { yPercent: 0, rotate: 0, duration: 0.78, stagger: 0.045 }, 0.2)
			.to(heroDetail, { y: 0, duration: 0.48 }, 0.52)
			.to(heroReveal, { y: 0, duration: 0.6, stagger: 0.07 }, 0.48);

		// Mobile gets the same story without the pin: the intro photograph
		// settles as it passes through the viewport.
		const introMedia = document.querySelector<HTMLElement>(".ledger-intro-media img");
		if (introMedia) {
			gsap.fromTo(
				introMedia,
				{ scale: 1.12, yPercent: 3 },
				{
					scale: 1,
					yPercent: -3,
					ease: "none",
					scrollTrigger: { trigger: introMedia, start: "top bottom", end: "bottom top", scrub: 1, invalidateOnRefresh: true },
				},
			);
		}

		if (heroImage) {
			gsap.to(heroImage, {
				yPercent: 5,
				ease: "none",
				scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.8 },
			});
		}
	}

	animateSections(gsap, ScrollTrigger);
	enableTapFeedback(gsap);
}

function animateServiceLedger(gsap: GsapModule["default"]) {
	const list = document.querySelector<HTMLElement>("[data-service-list]");
	const items = list?.querySelectorAll<HTMLElement>("[data-service-item]");
	if (!list || !items?.length) return;

	// Anticipation: each card wipes in left-to-right as the reader scrolls,
	// one card chasing the next. Scrub keeps the reveal glued to the scroll
	// position, so a fast jump or a restored scroll can never strand a card.
	const cardTimeline = gsap.timeline({
		scrollTrigger: {
			trigger: list,
			start: "top 82%",
			end: "top 28%",
			scrub: 0.8,
			invalidateOnRefresh: true,
		},
	});
	cardTimeline
		.fromTo(
			items,
			{ clipPath: "inset(0 100% 0 0)", x: 24 },
			{ clipPath: "inset(0 0% 0 0)", x: 0, stagger: 0.42, ease: "none" },
			0,
		)
		.fromTo(
			list.querySelectorAll<HTMLElement>(".service-row-media img"),
			{ scale: 1.14 },
			{ scale: 1, stagger: 0.42, ease: "none" },
			0,
		);

	// The hover preview is a desktop-only sweetener: every row already shows its
	// photograph, so touch devices never need a popup (and never get stuck with
	// one that cannot be closed).
	const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
	if (!canHover) return;

	const preview = document.querySelector<HTMLElement>("[data-service-preview]");
	const previewImage = preview?.querySelector<HTMLImageElement>("[data-service-preview-image]");
	const previewTitle = preview?.querySelector<HTMLElement>("[data-service-preview-title]");
	const previewTag = preview?.querySelector<HTMLElement>("[data-service-preview-tag]");
	if (!preview || !previewImage) return;

	if (preview.parentElement !== document.body) {
		document.body.appendChild(preview);
	}

	// Position via transform only. Animating left/top fights whatever the
	// stylesheet sets on the portal and can leave the card stuck at the left
	// edge; x/y always track the pointer.
	const previewX = gsap.quickTo(preview, "x", { duration: 0.32, ease: "power3.out" });
	const previewY = gsap.quickTo(preview, "y", { duration: 0.32, ease: "power3.out" });
	let previewOpen = false;

	const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
	const pointerCoordinates = (event: PointerEvent) => {
		const gap = 28;
		const previewWidth = preview.offsetWidth || 320;
		const previewHeight = preview.offsetHeight || 430;
		const placeLeft = event.clientX > window.innerWidth * 0.58;
		const placeAbove = event.clientY > window.innerHeight * 0.66;
		const rawX = event.clientX + (placeLeft ? -previewWidth - gap : gap);
		const rawY = event.clientY + (placeAbove ? -previewHeight - gap : gap);
		return {
			x: clamp(rawX, 18, window.innerWidth - previewWidth - 18),
			y: clamp(rawY, 18, window.innerHeight - previewHeight - 18),
		};
	};

	const movePreview = (event: PointerEvent) => {
		if (!previewOpen) return;
		const { x, y } = pointerCoordinates(event);
		previewX(x);
		previewY(y);
	};

	const openPreview = (event: PointerEvent) => {
		if (event.pointerType === "touch") return;
		const item = event.currentTarget instanceof HTMLElement ? event.currentTarget : null;
		if (!item) return;

		previewOpen = true;
		preview.dataset.servicePreviewOpen = "true";
		preview.setAttribute("aria-hidden", "false");
		previewImage.src = item.dataset.serviceImage || previewImage.src;
		previewImage.alt = `Detail suasana ${item.dataset.serviceTitle || "layanan Mustika"}`;
		if (previewTitle) previewTitle.textContent = item.dataset.serviceTitle || "Ritual Mustika";
		if (previewTag) previewTag.textContent = item.dataset.serviceTag || "Massage & wellness";

		gsap.killTweensOf(preview);
		gsap.killTweensOf(previewImage);
		gsap.set(preview, {
			rotate: event.clientX > window.innerWidth * 0.58 ? 1.8 : -1.8,
			transformOrigin: event.clientX > window.innerWidth * 0.58 ? "right bottom" : "left bottom",
		});
		// Place instantly on open; quickTo only smooths the follow afterwards.
		const { x, y } = pointerCoordinates(event);
		gsap.set(preview, { x, y });
		gsap.fromTo(
			preview,
			{ autoAlpha: 0, scale: 0.78 },
			{ autoAlpha: 1, scale: 1, duration: 0.48, ease: "expo.out" },
		);
		gsap.fromTo(
			previewImage,
			{ scale: 1.16, xPercent: event.clientX > window.innerWidth * 0.58 ? 5 : -5 },
			{ scale: 1, xPercent: 0, duration: 0.8, ease: "power3.out" },
		);
	};

	const closePreview = () => {
		if (!previewOpen) return;
		previewOpen = false;
		preview.dataset.servicePreviewOpen = "false";
		preview.setAttribute("aria-hidden", "true");
		gsap.to(preview, { autoAlpha: 0, scale: 0.9, duration: 0.28, ease: "power3.in" });
	};

	items.forEach((item) => {
		const hoverLine = item.querySelector<HTMLElement>(".service-hover-line");
		const arrow = item.querySelector<HTMLElement>(".service-arrow");

		item.addEventListener("pointerenter", (event) => {
			if (event.pointerType === "touch") return;
			gsap.to(item, { x: 8, duration: 0.42, ease: "power3.out" });
			if (hoverLine) gsap.to(hoverLine, { scaleX: 1, duration: 0.42, ease: "power3.out" });
			if (arrow) gsap.to(arrow, { rotate: 45, color: "#f0e9dd", duration: 0.38, ease: "power3.out" });
			openPreview(event);
		});
		item.addEventListener("pointermove", movePreview);
		item.addEventListener("pointerleave", (event) => {
			if (event.pointerType === "touch") return;
			gsap.to(item, { x: 0, duration: 0.55, ease: "power4.out" });
			if (hoverLine) gsap.to(hoverLine, { scaleX: 0, duration: 0.42, ease: "power3.out" });
			if (arrow) gsap.to(arrow, { rotate: 0, color: "#c49a4e", duration: 0.45, ease: "power4.out" });
			closePreview();
		});
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") closePreview();
	});
}

/*
 * Narrative scroll system. Every reveal is scrub-linked (progress follows the
 * scrollbar) instead of toggle-based, so state can never desync from scroll
 * position -- and the page reads as one continuous breath: quick hero,
 * immersive pinned middle, slow exhale at the booking end.
 */

function animateIntroPin(
	gsap: GsapModule["default"],
	ScrollTrigger: ScrollTriggerModule["ScrollTrigger"],
) {
	const section = document.querySelector<HTMLElement>(".ledger-intro");
	const media = section?.querySelector<HTMLElement>(".ledger-intro-media img");
	const content = section?.querySelector<HTMLElement>(".ledger-intro-content");
	if (!section || !media || !content) return;

	// "Entering the room": while pinned, the photograph opens from its inset
	// matte and the copy drifts upward, like stepping through the doorway.
	gsap
		.timeline({
			defaults: { ease: "none" },
			scrollTrigger: {
				trigger: section,
				start: "top top",
				end: "+=78%",
				pin: true,
				anticipatePin: 1,
				scrub: 0.7,
				invalidateOnRefresh: true,
			},
		})
		.fromTo(media, { clipPath: "inset(12% 9% 12% 9%)", scale: 1.16 }, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1 }, 0)
		.fromTo(content, { y: 46 }, { y: -14, duration: 1 }, 0);

	ScrollTrigger.refresh();
}

function animateSections(
	gsap: GsapModule["default"],
	ScrollTrigger: ScrollTriggerModule["ScrollTrigger"],
) {
	animateWordReveals(gsap);

	// Quiet utility reveals (footers, captions): a short rise, nothing louder
	// than the content it carries.
	document
		.querySelectorAll<HTMLElement>(".mustika-ledger section:not(.ledger-hero) [data-reveal]")
		.forEach((element) => {
			gsap.fromTo(
				element,
				{ y: 24 },
				{
					y: 0,
					ease: "none",
					scrollTrigger: { trigger: element, start: "top 94%", end: "top 68%", scrub: 0.8, invalidateOnRefresh: true },
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

	// The visit steps arrive one by one, and each connector rule is "drawn"
	// (scaleX) as the step settles -- sequence you can feel while scrolling.
	const journeySteps = document.querySelectorAll<HTMLElement>("[data-journey-step]");
	journeySteps.forEach((step) => {
		const rule = step.querySelector<HTMLElement>(".journey-rule");
		const stepTimeline = gsap.timeline({
			defaults: { ease: "none" },
			scrollTrigger: { trigger: step, start: "top 84%", end: "top 52%", scrub: 0.8, invalidateOnRefresh: true },
		});
		stepTimeline.fromTo(step, { y: 34 }, { y: 0, duration: 1 }, 0);
		if (rule) stepTimeline.fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 0.65 }, 0.28);
	});

	// The standards sweep in from the right, ledger-like.
	const standards = document.querySelectorAll<HTMLElement>("[data-standard-item]");
	if (standards.length) {
		gsap.fromTo(
			standards,
			{ x: 36 },
			{
				x: 0,
				stagger: 0.3,
				ease: "none",
				scrollTrigger: { trigger: standards[0], start: "top 84%", end: "top 40%", scrub: 0.85, invalidateOnRefresh: true },
			},
		);
	}

	// The quote gets the slowest lane on the page -- an emotional pause before
	// the FAQ takes over. Long scrub window = unhurried.
	const quote = document.querySelector<HTMLElement>(".standard-quote");
	if (quote) {
		gsap.fromTo(
			quote,
			{ y: 48 },
			{
				y: 0,
				ease: "none",
				scrollTrigger: { trigger: quote, start: "top 92%", end: "top 42%", scrub: 1.25, invalidateOnRefresh: true },
			},
		);
	}

	// FAQ rows unfold downward, unhurried but not heavy.
	const faq = document.querySelectorAll<HTMLElement>("[data-faq-item]");
	if (faq.length) {
		gsap.fromTo(
			faq,
			{ clipPath: "inset(0 0 100% 0)", y: 18 },
			{
				clipPath: "inset(0 0 0% 0)",
				y: 0,
				stagger: 0.28,
				ease: "none",
				scrollTrigger: { trigger: faq[0], start: "top 84%", end: "top 38%", scrub: 0.9, invalidateOnRefresh: true },
			},
		);
	}

	// Closing exhale: the booking copy widens and rises slowly -- no sharp
	// moves this late in the story.
	const bookCopy = document.querySelector<HTMLElement>(".ledger-book .book-copy");
	if (bookCopy) {
		gsap.fromTo(
			bookCopy,
			{ scale: 0.965, y: 42 },
			{
				scale: 1,
				y: 0,
				ease: "none",
				scrollTrigger: { trigger: bookCopy, start: "top 90%", end: "top 44%", scrub: 1.15, invalidateOnRefresh: true },
			},
		);
	}

	ScrollTrigger.refresh();
}

export async function initMustikaLedgerMotion() {
	if (typeof window === "undefined") return;

	prepareWordReveals();
	enableFaqAccordion();
	updateScrollProgress();
	window.addEventListener("scroll", updateScrollProgress, { passive: true });

	if (prefersReducedMotion()) {
		enableHeroSlider();
		showStaticContent();
		return;
	}

	const supportsRichMotion = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
	const restoreInitialHash = prepareInitialHashPosition();

	const fallbackTimer = window.setTimeout(showStaticContent, 1400);

	try {
		const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
			import("gsap"),
			import("gsap/ScrollTrigger"),
		]);
		window.clearTimeout(fallbackTimer);
		gsap.registerPlugin(ScrollTrigger);
		enableHeroSlider(gsap);

		const media = gsap.matchMedia();
		media.add("(max-width: 760px)", () => animateMobileExperience(gsap, ScrollTrigger));
		media.add("(min-width: 761px)", () => {
			animateHero(gsap, ScrollTrigger);
			animateIntroPin(gsap, ScrollTrigger);
			animateServiceLedger(gsap);
			animateSections(gsap, ScrollTrigger);
			if (supportsRichMotion) enableMagneticButtons(gsap);
		});
		enableHashNavigation(gsap, ScrollTrigger);

		if (restoreInitialHash) {
			const restore = () => {
				restoreInitialHash();
				window.requestAnimationFrame(() => ScrollTrigger.refresh());
			};
			if (document.readyState === "complete") window.requestAnimationFrame(restore);
			else window.addEventListener("load", restore, { once: true });
		}
	} catch {
		window.clearTimeout(fallbackTimer);
		restoreInitialHash?.();
		showStaticContent();
	}
}
