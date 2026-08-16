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
	const detailIndex = document.querySelector<HTMLElement>("[data-hero-detail-index]");

	if (!wrap || !stage || slides.length < 2 || wrap.dataset.heroSliderReady === "true") return;
	wrap.dataset.heroSliderReady = "true";

	let activeIndex = Math.max(0, slides.findIndex((slide) => slide.dataset.active === "true"));
	let transitionInProgress = false;
	let timer: number | undefined;
	let pointerStartX: number | null = null;
	let isVisible = true;
	let isPaused = false;
	const reducedMotion = prefersReducedMotion();
	const total = slides.length;
	const copyTargets = [label, detail, detailIndex].filter((element): element is HTMLElement => Boolean(element));

	const formatIndex = (index: number) => String(index + 1).padStart(2, "0");
	const updateCopy = (slide: HTMLElement, index: number, animate: boolean) => {
		const apply = () => {
			if (counter) counter.textContent = `${formatIndex(index)} / ${String(total).padStart(2, "0")}`;
			if (label) label.textContent = slide.dataset.label || "Suasana relaksasi";
			if (detail) detail.textContent = slide.dataset.detail || "Waktu untuk beristirahat.";
			if (detailIndex) detailIndex.textContent = formatIndex(index);
		};

		if (!gsap || !animate || !copyTargets.length) {
			apply();
			return;
		}

		gsap.to(copyTargets, {
			y: -6,
			opacity: 0,
			duration: 0.16,
			stagger: 0.025,
			ease: "power2.in",
			onComplete: () => {
				apply();
				gsap.fromTo(
					copyTargets,
					{ y: 7, opacity: 0 },
					{ y: 0, opacity: 1, duration: 0.34, stagger: 0.035, ease: "power3.out" },
				);
			},
		});
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
		const nextIndex = (requestedIndex + total) % total;
		if (nextIndex === activeIndex || transitionInProgress) {
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
		setAccessibilityState(nextIndex);
		updateCopy(incoming, nextIndex, true);

		if (!gsap || reducedMotion) {
			transitionInProgress = false;
			scheduleNext();
			return;
		}

		transitionInProgress = true;
		const incomingClip = direction > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)";
		const outgoingClip = direction > 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)";
		const timeline = gsap.timeline({
			onComplete: () => {
				gsap.set(outgoing, { autoAlpha: 0, zIndex: 0, clipPath: "inset(0 0 0 0)" });
				gsap.set(incoming, { autoAlpha: 1, zIndex: 1, clipPath: "inset(0 0 0 0)" });
				transitionInProgress = false;
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
	stage.addEventListener("pointerenter", () => {
		isPaused = true;
		clearTimer();
	});
	stage.addEventListener("pointerleave", () => {
		isPaused = false;
		scheduleNext();
	});
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
	const heroTop = document.querySelector<HTMLElement>("[data-hero-top]");
	const heroExit = document.querySelector<HTMLElement>("[data-hero-exit]");
	const heroExitInner = document.querySelector<HTMLElement>("[data-hero-exit-inner]");
	const heroExitVisual = document.querySelector<HTMLElement>("[data-hero-exit-visual]");
	const heroExitWords = document.querySelectorAll<HTMLElement>("[data-hero-exit-word]");
	const heroSheetRule = document.querySelector<HTMLElement>("[data-hero-sheet-rule]");
	const heroVisualDetail = document.querySelector<HTMLElement>("[data-hero-visual-detail]");

	if (!hero || !heroMain || !heroCopy || !heroStage || !heroPaper || !heroExit) return;

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
	gsap.set(hero, { backgroundColor: "rgba(240, 233, 221, 1)" });
	gsap.set(heroExit, { yPercent: 0, autoAlpha: 0 });
	gsap.set(heroExit, { backgroundColor: "rgba(28, 32, 26, 1)" });
	gsap.set(heroExitWords, { yPercent: 120, opacity: 0, rotate: 2, transformOrigin: "left bottom" });
	if (heroExitVisual) {
		gsap.set(heroExitVisual, {
			xPercent: 8,
			rotate: 1.5,
			opacity: 0,
			clipPath: "inset(0 0 0 100%)",
			transformOrigin: "50% 50%",
		});
	}
	gsap.set(heroExitInner, { opacity: 0 });
	gsap.set(heroSheetRule, { scaleX: 0, transformOrigin: "left center" });
	gsap.set(heroVisualDetail, { y: 16, opacity: 0 });
	gsap.set(heroTop, { y: 18, opacity: 0 });
	gsap.set(heroReveal, { y: 24, opacity: 0 });

	const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
	intro
		.to(heroTop, { y: 0, opacity: 1, duration: 0.72 }, 0)
		.to(heroPaper, { clipPath: "inset(0 0 0 0%)", x: 0, rotate: 0, duration: 1.2 }, 0.12)
		.to(heroStage, { y: 0, rotate: 0, duration: 1.2 }, 0.12)
		.to(heroSheetRule, { scaleX: 1, duration: 0.6 }, 0.38)
		.to(heroImageWrap, { scale: 1, xPercent: 0, duration: 1.05 }, 0.24)
		.to(heroWords, { yPercent: 0, rotate: 0, duration: 0.88, stagger: 0.055 }, 0.34)
		.to(heroVisualDetail, { y: 0, opacity: 1, duration: 0.6 }, 0.62)
		.to(heroReveal, { y: 0, opacity: 1, duration: 0.66, stagger: 0.07 }, 0.68);

	if (heroImage) intro.to(heroImage, { scale: 1, duration: 1.1 }, 0.2);

	const scrollScene = gsap.timeline({
		defaults: { ease: "none" },
		scrollTrigger: {
			trigger: hero,
			start: "top top",
			end: "+=120%",
			pin: true,
			pinSpacing: false,
			scrub: 0.55,
			anticipatePin: 1,
			fastScrollEnd: true,
			invalidateOnRefresh: true,
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
		.to(heroMain, { yPercent: -5, scale: 0.98, autoAlpha: 0.22, duration: 0.62 }, 0)
		.to(heroCopy, { xPercent: -2, yPercent: -5, duration: 0.52 }, 0)
		.to(heroStage, { xPercent: -3, yPercent: -2, scale: 1.03, duration: 0.58 }, 0)
		.to(heroImageWrap, { scale: 1.08, duration: 0.58 }, 0)
		.to(hero, { backgroundColor: "rgba(240, 233, 221, 0)", duration: 0.34 }, 0.56)
		.to(heroMain, { autoAlpha: 0, duration: 0.25 }, 0.7);

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

function animateMobileWordReveals() {
	if (!("IntersectionObserver" in window)) {
		showStaticContent();
		return;
	}

	document.querySelectorAll<HTMLElement>("[data-word-reveal]").forEach((root) => {
		const words = Array.from(root.querySelectorAll<HTMLElement>("[data-scroll-word-inner]"));
		if (!words.length) return;

		words.forEach((word, index) => {
			word.style.opacity = "0";
			word.style.transform = "translate3d(0, 112%, 0) rotate(1.5deg)";
			word.style.transition = "transform 720ms cubic-bezier(0.16, 1, 0.3, 1), opacity 420ms ease";
			word.style.transitionDelay = `${Math.min(index * 28, 360)}ms`;
		});

		const observer = new IntersectionObserver(
			([entry]) => {
				const isVisible = Boolean(entry?.isIntersecting && entry.intersectionRatio > 0.1);
				words.forEach((word) => {
					word.style.opacity = isVisible ? "1" : "0";
					word.style.transform = isVisible ? "translate3d(0, 0, 0) rotate(0deg)" : "translate3d(0, 112%, 0) rotate(1.5deg)";
				});
			},
			{ threshold: [0, 0.1], rootMargin: "-8% 0px -18% 0px" },
		);
		observer.observe(root);
	});
}

function animateServiceLedger(gsap: GsapModule["default"]) {
	const list = document.querySelector<HTMLElement>("[data-service-list]");
	const items = list?.querySelectorAll<HTMLElement>("[data-service-item]");
	const preview = document.querySelector<HTMLElement>("[data-service-preview]");
	const previewImage = preview?.querySelector<HTMLImageElement>("[data-service-preview-image]");
	const previewNumber = preview?.querySelector<HTMLElement>("[data-service-preview-number]");
	const previewTitle = preview?.querySelector<HTMLElement>("[data-service-preview-title]");
	const previewTag = preview?.querySelector<HTMLElement>("[data-service-preview-tag]");
	if (!list || !items?.length) return;

	if (preview && preview.parentElement !== document.body) {
		document.body.appendChild(preview);
	}

	const previewX = preview ? gsap.quickTo(preview, "x", { duration: 0.42, ease: "power3.out" }) : null;
	const previewY = preview ? gsap.quickTo(preview, "y", { duration: 0.42, ease: "power3.out" }) : null;

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
		let previewOpen = false;

		const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
		const movePreview = (event: PointerEvent) => {
			if (!preview || !previewOpen || !previewX || !previewY) return;

			const gap = 28;
			const previewWidth = preview.offsetWidth || 320;
			const previewHeight = preview.offsetHeight || 430;
			const placeLeft = event.clientX > window.innerWidth * 0.58;
			const placeAbove = event.clientY > window.innerHeight * 0.66;
			const rawX = event.clientX + (placeLeft ? -previewWidth - gap : gap);
			const rawY = event.clientY + (placeAbove ? -previewHeight - gap : gap);
			const x = clamp(rawX, 18, window.innerWidth - previewWidth - 18);
			const y = clamp(rawY, 18, window.innerHeight - previewHeight - 18);

			previewX(x);
			previewY(y);
		};

		const openPreview = (event: PointerEvent) => {
			if (!preview || !previewImage || event.pointerType === "touch") return;

			previewOpen = true;
			preview.dataset.servicePreviewOpen = "true";
			previewImage.src = item.dataset.serviceImage || previewImage.src;
			previewImage.alt = `Detail suasana ${item.dataset.serviceTitle || "layanan Mustika"}`;
			if (previewNumber) previewNumber.textContent = item.dataset.serviceNumber || "01";
			if (previewTitle) previewTitle.textContent = item.dataset.serviceTitle || "Ritual Mustika";
			if (previewTag) previewTag.textContent = item.dataset.serviceTag || "Massage & wellness";

			movePreview(event);
			gsap.killTweensOf(preview);
			gsap.killTweensOf(previewImage);
			gsap.set(preview, {
				rotate: event.clientX > window.innerWidth * 0.58 ? 1.8 : -1.8,
				transformOrigin: event.clientX > window.innerWidth * 0.58 ? "right bottom" : "left bottom",
			});
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
			if (!preview || !previewOpen) return;
			previewOpen = false;
			preview.dataset.servicePreviewOpen = "false";
			gsap.to(preview, { autoAlpha: 0, scale: 0.9, duration: 0.28, ease: "power3.in" });
		};

		item.addEventListener("pointerenter", () => {
			gsap.to(item, { x: 8, duration: 0.42, ease: "power3.out" });
			if (hoverLine) gsap.to(hoverLine, { scaleX: 1, duration: 0.42, ease: "power3.out" });
			if (arrow) gsap.to(arrow, { rotate: 45, color: "#f0e9dd", duration: 0.38, ease: "power3.out" });
		});
		item.addEventListener("pointerenter", openPreview);
		item.addEventListener("pointermove", movePreview);

		item.addEventListener("pointerleave", () => {
			gsap.to(item, { x: 0, duration: 0.55, ease: "power4.out" });
			if (hoverLine) gsap.to(hoverLine, { scaleX: 0, duration: 0.42, ease: "power3.out" });
			if (arrow) gsap.to(arrow, { rotate: 0, color: "#c49a4e", duration: 0.45, ease: "power4.out" });
			closePreview();
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
	enableFaqAccordion();
	updateScrollProgress();
	window.addEventListener("scroll", updateScrollProgress, { passive: true });

	if (prefersReducedMotion()) {
		enableHeroSlider();
		showStaticContent();
		return;
	}

	const supportsRichMotion = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
	const supportsMobileWordMotion = window.matchMedia("(max-width: 760px)").matches;
	const supportsDesktopRichMotion = supportsRichMotion && !supportsMobileWordMotion;
	if (!supportsDesktopRichMotion) {
		enableHeroSlider();
		if (supportsMobileWordMotion) animateMobileWordReveals();
		else showStaticContent();
		return;
	}
	const restoreInitialHash = prepareInitialHashPosition();

	const fallbackTimer = window.setTimeout(showStaticContent, 1400);

	try {
		const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
			import("gsap"),
			import("gsap/ScrollTrigger"),
		]);
		window.clearTimeout(fallbackTimer);
		gsap.registerPlugin(ScrollTrigger);

		const media = gsap.matchMedia();
		if (supportsDesktopRichMotion) {
			media.add("(min-width: 761px) and (hover: hover) and (pointer: fine)", () => {
				animateHero(gsap, ScrollTrigger);
				animateServiceLedger(gsap);
				animateSections(gsap, ScrollTrigger);
				enableMagneticButtons(gsap);
				enableHashNavigation(gsap, ScrollTrigger);
			});
		}

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
