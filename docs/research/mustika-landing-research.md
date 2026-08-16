# Mustika landing page research

_Research date: 2026-08-16. Scope: premium editorial/wellness visual direction, Astro/Core Web Vitals performance, and GSAP/ScrollTrigger motion._

This is a source-backed design and implementation brief, not a claim about Mustika’s services, outcomes, credentials, location, pricing, or audience. Any business-specific copy, testimonials, imagery, or calls to action still needs an approved source.

## Recommended direction

1. Build a calm editorial narrative around a small number of specific, approved ideas. Use generous space, strong typographic hierarchy, and art-directed imagery instead of a generic feature-card grid.
2. Treat real Mustika assets as the visual source of truth. If approved photography is unavailable, use typography, material texture, or abstract composition—not AI-generated people, treatments, facilities, or wellness outcomes.
3. Keep the interface restrained: quiet base palette, one deliberate accent, visible section labels, and one primary action repeated at natural decision points. Avoid gradient-heavy decoration, floating 3D blobs, excessive pills, and invented proof points.
4. Keep the page server-first and mostly static HTML. Make only genuinely interactive pieces client islands; make motion progressive enhancement rather than a prerequisite for seeing content.
5. Use motion as pacing: short entrance reveals and one bounded scroll-linked sequence at most. Disable parallax, pinning, scrubbing, and large-scale movement for reduced-motion users.

## 1. Premium editorial/wellness patterns

### Evidence from first-party sites and case studies

- **Aesop — sensory specificity over generic wellness language.** The homepage pairs a named sensory concept with product context, browseable categories, a regimen finder, and recommended reading. That is a useful model for making each section feel authored rather than templated. [Aesop homepage](https://www.aesop.com/)
- **Aman — a small set of human-readable principles.** Its wellness page organizes the experience around Physical Optimisation, Mental Equilibrium, and Spiritual Illumination, then connects those principles to place-specific experiences. [Aman Wellness](https://www.aman.com/wellness)
- **Six Senses — pillars plus stories.** Its wellness page combines named pillars (Sleep, Eat, Spa, Move, Mindfulness, Grow) with a separate “Wellness stories” layer. The pattern is useful when a landing page needs both quick orientation and deeper editorial texture. [Six Senses Wellness & Spa](https://www.sixsenses.com/en/wellness-spa)
- **The Nue Co. — a distinct vocabulary and method-based grouping.** Its “Tools For Wellbeing” page frames the brand as a bridge between science and sensibility, then groups the offer by methods rather than presenting undifferentiated claims. [The Nue Co. About Us](https://thenueco.com/pages/about-us)
- **goop — magazine-like navigation.** Its editorial index exposes categories, sorting, article titles, short descriptions, and “read now” actions. This creates a clear reading rhythm without turning every item into a SaaS-style card. [goop Editorial](https://goop.com/editorial/)
- **ESPA Life at Corinthia case study — art direction is part of the product.** The agency describes expansive imagery, photography shot specifically for the website, serene video, restrained entrance motion, clear categorisation, persistent CTAs, and muted colour cues used to help navigation. Use this as a directional reference, not as proof that its reported performance results generalise. [KIJO case study](https://kijo.london/web-design/corinthia-hotel/)

### Decisions for Mustika

- Use **three or four narrative chapters** as the first design pass: each chapter gets a clear label, one specific approved idea, one visual, and one next action. Do not add a chapter just to fill a template.
- Prefer a **wide image + offset text, pull quote, or editorial caption** over repeated centred cards. Keep the semantic reading order linear on mobile.
- Use a **material, human visual language**: local photography, close crops, tactile surfaces, real spaces, or restrained type-led compositions. Do not mix stock-photo wellness imagery with decorative AI illustrations.
- Let colour **signpost content**, not decorate every component. A neutral field and one controlled accent should carry most of the page; a second muted cue can distinguish chapters if the approved brand assets support it.
- Keep the primary action visible in the header/hero and repeat it after the section where a visitor has enough context to act. Its label must come from Mustika’s approved content; do not assume “Book,” “Contact,” or any treatment name.
- Use testimonials, awards, “science-backed” language, numbers, and people’s names only when they are supplied and verifiable. Specificity is valuable here, but invented specificity damages trust.

## 2. Performance for the server-rendered Astro page

### Targets

Use the current Core Web Vitals “good” targets at the **75th percentile**, segmented by mobile and desktop: **LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1**. Google identifies LCP, INP, and CLS as the stable Core Web Vitals and recommends field measurement; lab tests are useful for diagnosing regressions but do not replace real-user data. [Web Vitals](https://web.dev/articles/vitals?hl=en), [LCP](https://web.dev/articles/lcp?hl=en), [INP](https://web.dev/articles/inp), [CLS](https://web.dev/articles/optimize-cls?hl=en)

### Implementation decisions

- **LCP:** Render the hero heading and the likely hero image in the initial HTML. Prefer a real `<img>`/Astro image over a JavaScript-inserted image or an unplanned CSS background. Astro’s `Image` API can generate responsive sources; use `priority` for the single above-the-fold image that is genuinely likely to be LCP, and do not mark every image high priority. Google’s LCP guidance says the LCP resource should be discoverable in the initial HTML and that high priority is useful for only one or two likely candidates. [Optimize LCP](https://web.dev/articles/optimize-lcp?hl=en), [Astro Image and Assets API](https://docs.astro.build/en/reference/modules/astro-assets/)
- **CLS:** Give every image and video a width/height or a stable `aspect-ratio`; reserve space for CMS content, embeds, and any asynchronously loaded UI. Astro requires dimension inputs for remote/public-folder images to help prevent layout shifts. [Optimize CLS](https://web.dev/articles/optimize-cls?hl=en), [Astro missing image dimensions](https://docs.astro.build/en/reference/errors/missing-image-dimension/)
- **Fonts:** Keep the type system intentionally small. Preload only the font files needed for above-the-fold content; Astro warns that indiscriminate font preloading can block more important resources, and mismatched fallbacks can cause layout shifts. [Astro custom fonts](https://docs.astro.build/en/guides/fonts/)
- **INP and JavaScript:** Keep the landing page as server-rendered HTML/CSS and hydrate only interactions that need a browser runtime. Astro’s islands architecture loads client JavaScript only for explicitly marked components, with `client:visible` available for below-the-fold widgets. [Astro Islands](https://docs.astro.build/en/concepts/islands/)
- **SSR/TTFB:** The repository already uses `output: "server"` with the Cloudflare adapter. Keep CMS work bounded and cacheable where content rules allow; a server-rendered page still needs a fast first byte. Astro notes that on-demand rendering can stream HTML, but data fetches can block page rendering, and its `output: "server"` mode changes the default rendering behavior rather than adding performance by itself. [Astro on-demand rendering](https://docs.astro.build/en/guides/on-demand-rendering/), [LCP subparts](https://web.dev/articles/optimize-lcp?hl=en)
- **Navigation:** Use Astro prefetch selectively for same-origin links that are likely next steps. Prefer opt-in `hover`/`tap` behavior for a small landing page; avoid prefetching every route, especially for slow or data-saver users. [Astro Prefetch](https://docs.astro.build/en/guides/prefetch/)
- **Measurement:** Before launch, record a mobile throttled lab run and inspect the LCP element, long tasks, layout shifts, image/font waterfalls, and JavaScript cost. After launch, collect field LCP/INP/CLS so decisions are based on the people using the page, not only a local laptop.

## 3. Motion guidance: GSAP, ScrollTrigger, and reduced motion

### Decisions

- Animate **`transform` and `opacity`** first. Avoid using `top`, `left`, `width`, `height`, layout-affecting properties, or large blur/shadow changes as the main animation mechanism. The web.dev guidance recommends transform/opacity because they avoid much of the layout and paint work; use `will-change` narrowly and only when profiling shows it helps. [High-performance CSS animations](https://web.dev/articles/animations-guide), [Animations and performance](https://web.dev/articles/animations-and-performance)
- Use **ScrollTrigger for a few explicit moments**, not a scroll listener on every block. Default to enter/leave reveals with bounded triggers; reserve `scrub` for one deliberate hero or image sequence, and avoid scroll-jacking. ScrollTrigger supports trigger-based playback, scrub smoothing, pinning, markers for development, and responsive media-query setups. [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- Put all GSAP setup behind **`gsap.matchMedia()`**, with a `(prefers-reduced-motion: reduce)` condition and a desktop/mobile condition. GSAP automatically reverts animations and ScrollTriggers created inside the matching context when conditions change. [GSAP `matchMedia()`](https://gsap.com/docs/v3/GSAP/gsap.matchMedia%28%29/)
- For reduced motion, keep the content visible and the layout identical, then remove or collapse movement: no parallax, pinning, scrub, large-scale zoom, or autoplay video. A short opacity-only transition is optional; an immediate final state is the safest default. `prefers-reduced-motion` exists specifically to let users request less non-essential motion, and W3C identifies scaling and panning large objects as potential vestibular triggers. [MDN `prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion), [Media Queries Level 5](https://www.w3.org/TR/mediaqueries-5/)
- Do not hide the hero or section copy until JavaScript runs. The no-JS/slow-JS state should already be readable; motion may enhance the reveal but must not be required for LCP or comprehension. This also avoids adding element-render delay to the largest content. [Optimize LCP](https://web.dev/articles/optimize-lcp?hl=en)
- The current `package.json` does not declare GSAP. Treat it as optional: add it only after a bounded motion sequence has a clear storytelling job and a measured budget. Otherwise, use CSS transitions or no motion.

### Minimal acceptance checklist

- Core Web Vitals targets pass at p75 in field data; mobile lab runs do not reveal a hero-image, font, or CMS waterfall bottleneck.
- With JavaScript disabled, the full page is readable and the primary action is usable.
- With reduced motion enabled, no scroll-linked movement, pinning, zooming, or autoplay remains; content does not disappear.
- On touch devices, resize, back/forward navigation, and slow connections, ScrollTrigger does not create jumps, stuck pins, or overlapping sections.
- Every visual claim, image subject, testimonial, number, and CTA label is traceable to approved Mustika content.

## Sources and source quality

Visual references above are first-party brand sites or project-owner/agency case studies; they show patterns, not universal rules. Performance and motion guidance comes from Google’s web.dev, Astro’s current documentation, GreenSock’s official documentation, MDN, and the W3C specification. The Mustika decisions are synthesis from those sources plus a read-only check of the current repository configuration.
