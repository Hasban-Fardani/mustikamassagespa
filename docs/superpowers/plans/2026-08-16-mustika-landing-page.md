# Mustika Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the generic marketing starter surface with a premium, locally hosted Mustika Massage Spa landing page that converts visitors into WhatsApp bookings.

**Architecture:** Keep the site server-rendered in Astro/EmDash, but make the homepage a focused Mustika composition with a small set of semantic sections instead of generic CMS block cards. Preserve the existing EmDash admin and secondary routes while making the public shell, tokens, contact language, and navigation brand-specific. Use local WebP assets, CSS-first visual treatment, and a deferred GSAP motion layer that never hides content when JavaScript or motion is unavailable.

**Tech Stack:** Astro 7, Cloudflare adapter, EmDash, semantic HTML, CSS custom properties, inline SVG, GSAP + ScrollTrigger loaded only for motion-capable clients.

## Global Constraints

- All public content remains server-rendered (`output: "server"`).
- Every major section uses the same `--site-width: min(90%, 1360px)` shell.
- Use Mustika's obsidian, warm ivory, deep botanical green, and antique gold palette; no purple/cyan gradients, glassmorphism, or generic SaaS copy.
- `logo.jpeg` and the client reference are copied to local `public/images` as compressed WebP; no remote production image URLs.
- Motion uses transform/opacity, natural deceleration, and `prefers-reduced-motion`; initial HTML is usable without JavaScript.
- Interactive targets are at least 44px; all images have dimensions and meaningful alt text.
- Do not invent address, email, or claims. Keep unknown business details as clearly marked replaceable content.

---

### Task 1: Create the local asset pipeline

**Files:**
- Create: `public/images/mustika-logo.webp`
- Create: `public/images/mustika-reference.webp`

- [ ] Convert `docs/logo.jpeg` to a quality-optimized WebP that preserves the full gold-on-obsidian mark.
- [ ] Convert `docs/example.jpeg` to a quality-optimized WebP for optional reference/visual proof usage.
- [ ] Inspect file sizes and dimensions; keep the logo below 100 KB where visually acceptable and the reference below 180 KB.

### Task 2: Establish Mustika design tokens and public shell

**Files:**
- Modify: `src/styles/theme.css`
- Modify: `src/layouts/Base.astro`
- Modify: `astro.config.mjs`

**Interfaces:**
- `Base.astro` continues to accept `title`, `description`, and `image` and remains the shared layout for all pages.
- Public navigation links target `#rituals`, `#experience`, `#faq`, and `#book`.

- [ ] Replace the starter theme with warm, tinted neutrals and explicit shell/spacing/type tokens.
- [ ] Set the document language to Indonesian, remove the generic admin/signup header actions, and provide an accessible mobile navigation toggle.
- [ ] Replace the generic footer/theme switcher with a Mustika footer and booking CTA while retaining EmDash SEO head wiring.
- [ ] Remove unnecessary Google font preloading if the final type system uses local system stacks.

### Task 3: Build the Mustika homepage composition

**Files:**
- Modify: `src/pages/index.astro`
- Create: `src/components/MustikaLanding.astro`

**Interfaces:**
- `MustikaLanding.astro` renders a self-contained page and expects no CMS-only data.
- Booking CTA points to the phone shown in the client reference as `https://wa.me/6281222739180` and is easy to replace in one constant.

- [ ] Add the hero narrative: “Ruang untuk kembali ke tubuhmu.” with an editorial logo stage and explicit booking action.
- [ ] Add the four client-referenced rituals: traditional, aromatherapy, full body, and wellness therapy.
- [ ] Add a three-step experience story, proof/standards section, FAQ, and final booking panel without fabricated numeric testimonials or location claims.
- [ ] Use one shell width and deliberate asymmetry rather than repeated identical card grids.
- [ ] Use inline SVG marks and accessible headings/landmarks; avoid a runtime icon bundle on the homepage.

### Task 4: Add purposeful motion and interaction

**Files:**
- Create: `src/scripts/mustika-motion.ts`
- Modify: `src/components/MustikaLanding.astro`
- Modify: `package.json`

- [ ] Add GSAP/ScrollTrigger as a production dependency only if the installed runtime supports the deferred import.
- [ ] Implement one signature “ritual reveal” on load, section choreography on scroll, a subtle pointer response for the hero emblem, and tactile CTA/link states.
- [ ] Load motion after first paint, animate only transform/opacity, and skip all non-essential motion for reduced-motion users.
- [ ] Keep every section visible and usable if the script fails or is disabled.

### Task 5: Update secondary public routes and content defaults

**Files:**
- Modify: `src/pages/contact.astro`
- Modify: `src/pages/pricing.astro`
- Modify: `src/pages/404.astro`
- Modify: `seed/seed.json`

- [ ] Remove Acme/demo SaaS copy from public routes and replace it with Mustika booking/service language.
- [ ] Keep contact form behavior functional, but label it as a booking enquiry and avoid fake email addresses.
- [ ] Update site settings and menus to match the Mustika page anchors and phone CTA.
- [ ] Keep the EmDash admin/editor data valid for the existing schema.

### Task 6: Verify and polish

**Files:**
- Modify any files identified by verification.
- Create: `docs/research/mustika-landing-research.md` (research sidecar output)

- [ ] Run `pnpm typecheck` and `pnpm build` and resolve every error.
- [ ] Run the local site and inspect desktop/mobile rendering, keyboard navigation, reduced-motion behavior, and horizontal overflow.
- [ ] Confirm all local image requests use WebP and no stale Acme copy remains in public routes.
- [ ] Run a Lighthouse/PageSpeed-equivalent audit when available; report any score limitation honestly and fix actionable findings.
- [ ] Complete a final alignment, contrast, spacing, focus, and copy consistency pass.
