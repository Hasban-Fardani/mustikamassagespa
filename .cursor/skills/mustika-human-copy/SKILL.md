---
name: mustika-human-copy
description: Rewrites Mustika Massage Spa user-facing copy into human Bandung Indonesian and blocks AI-slop cadence. Use when writing, editing, reviewing, or humanizing headlines, FAQs, CTAs, SEO, alt text, seed.json, or WhatsApp prefill for Mustika.
---

# Mustika human copy

Load this before touching any visitor-facing string. Do not invent a new voice.

Canonical copy lives in `src/lib/mustika-copy.ts`. Seed, landing, pricing, contact, and SEO must match that file. Do not let CMS poetic leftovers override it.

## Voice

Bandung spa admin chatting a tired customer. Warm, short, useful. One fact per sentence. Uneven rhythm is good.

Speak like a person at the front desk, not a wellness magazine, not a SaaS landing, not a gold flyer.

Keep: nett, WhatsApp, 0812 2273 9180, Bandung, 60/90/120 menit, Traditional / Aromatherapy / Full Body / Wellness Therapy names.

Do not invent hours, address, reviews, awards, or prices. Prices only from `src/lib/mustika-rates.ts`.

## Ban list

Reject a draft if it has any of these:

- Parallel couplets: "X sejak pagi, Y sejak siang"
- Literary fragments: "Pintu menutup, kota mengecil"
- Spa brochure: ritual, simpul, tubuh Anda, ruang yang tidak meminta Anda bicara, beri tubuh waktu, sisanya biarkan pada kami
- Em dash `—` or `--` as a pause
- Forced groups of three with the same shape
- "It's not X, it's Y" / "bukan daftar menu" profundity
- Stock: nestled, vibrant, elevate, journey, experience (as a product word), mindfulness, oasis
- Title Case Indonesian headings
- English CTA beside Indonesian body except service names and "WhatsApp"

## Replace with

| Slop | Human |
| --- | --- |
| Booking via WhatsApp | Chat WhatsApp |
| Lihat ritual kami | Lihat layanan |
| Tanya admin Mustika | Chat admin |
| Pilihan ritual | Pilihan layanan |
| Mari beri tubuh waktu | Mau booking? |

CTA: Chat WhatsApp. Secondary: Lihat layanan. Consult-only: Kontak kami.

## Checklist before shipping

1. Read the paragraph aloud. If it sounds like a caption, rewrite.
2. Search the diff for `—`, `ritual`, `simpul`, `tubuh Anda`, `Bayangkan`, `Pintu menutup`.
3. Confirm seed.json, `mustika-copy.ts`, and page fallbacks say the same thing.
4. Keep one WhatsApp number. Prefill: `Halo Mustika, mau booking {layanan} {menit} menit.`

See [examples.md](examples.md) for before/after.
