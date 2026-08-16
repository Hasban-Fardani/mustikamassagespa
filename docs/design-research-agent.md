# Design research agent — Mustika Massage Spa Bandung

> Tanggal observasi: 2026-08-16  
> Scope: riset singkat untuk arah redesign landing page; fokus pada sumber resmi dan pola yang ringan.  
> Status: research-only. Tidak ada kode produk yang diubah.

## Keputusan desain

Pilih arah **quiet ritual, local proof, direct booking**: halaman terasa tenang dan premium melalui ruang, tipografi, material, serta informasi layanan yang spesifik. Jangan meniru hotel spa secara literal. Ambil struktur editorialnya, lalu isi dengan bukti Mustika yang benar-benar tersedia.

Prioritas keputusan:

1. **Konten nyata lebih penting daripada dekorasi.** Tampilkan nama layanan, durasi/harga jika sudah disetujui, proses kedatangan, jam operasional, dan jalur booking yang jelas.
2. **Gunakan visual milik Mustika atau visual type-led.** Logo lokal adalah aset utama; foto interior, terapis, tangan, minyak, kain, atau detail ruang hanya boleh dipakai jika benar-benar berasal dari Mustika. Jika belum ada foto yang disetujui, lebih baik gunakan komposisi logo, tekstur nyata, dan tipografi daripada stock photo atau gambar AI.
3. **Buat halaman seperti rangkaian ritual, bukan template SaaS.** Satu hero, indeks treatment, proses, bukti/standar, informasi kunjungan, lalu booking.
4. **Interaksi harus membantu memilih atau memesan.** Gunakan anchor, daftar treatment, FAQ native, dan CTA WhatsApp/booking. Hindari carousel untuk informasi inti, modal bertingkat, parallax, dan animasi dekoratif.

## Evidence dari sumber resmi

| Sumber | Pola visual/interaksi yang terlihat | Keputusan yang dapat dipakai Mustika |
| --- | --- | --- |
| [Six Senses — Wellness & Spa](https://www.sixsenses.com/en/wellness-spa) dan [Six Senses Spa](https://www.sixsenses.com/en/wellness-spa/spa/) | Navigasi memisahkan Wellness & Spa, Personalized Wellness, Retreats, Visiting Practitioners’ Calendar, dan Stories. Halaman utama memakai enam wellness pillars dengan tautan “Read more”; halaman spa mengurutkan signature massages, local inspiration, Alchemy Bar, dan practitioners. | Bangun **taxonomy layanan** dan satu lapisan cerita lokal. Untuk Mustika cukup 3–4 tema yang benar-benar dimiliki; jangan menyalin enam pilar atau klaim wellness Six Senses. Setiap treatment mendapat satu deskripsi dan satu langkah lanjut, bukan kartu dekoratif tanpa konteks. |
| [Aman — Wellness](https://www.aman.com/wellness) | Aman merumuskan wellness melalui tiga prinsip: Physical Optimisation, Mental Equilibrium, dan Spiritual Illumination. Di bawahnya ada contoh pengalaman yang terikat pada tempat tertentu dan tautan “Discover more”. | Gunakan **tiga lensa editorial** untuk mengelompokkan cerita/layanan hanya jika Mustika punya dasar kontennya. Yang ditiru adalah hubungan “prinsip → pengalaman nyata”, bukan kosakata medis atau spiritual Aman. |
| [THE WELL — homepage](https://www.the-well.com/) dan [Bodywork & Massage](https://www.the-well.com/new-york/service/bodywork-massage) | Global navigation memberi jalur Locations, Membership, Offerings, WELLInformed, Login, serta search “services, classes and articles”. Halaman bodywork menjelaskan pendekatan personalized/integrative dan teknik yang dipakai sebelum pengguna masuk ke booking/service detail. | Untuk empat layanan Mustika, tidak perlu search global. Buat **service index yang bisa dipindai** dan copy yang menjawab “untuk kebutuhan apa”. Jika pilihan layanan bertambah banyak, baru tambahkan filter ringan atau halaman detail, bukan modal kompleks. |
| [Mandarin Oriental, Jakarta — Wellness](https://www.mandarinoriental.com/en/jakarta/jalan-mh-thamrin/wellness) dan [The Spa](https://www.mandarinoriental.com/en/jakarta/jalan-mh-thamrin/wellness/the-spa) | Halaman lokal menggabungkan jam, kontak, treatment menu, “Book Treatments”, kategori layanan, kartu treatment dengan durasi/harga/Book, instruksi datang lebih awal, konsultasi/sensory testing, FAQ, dan gift card. | Tiru **information architecture yang membantu keputusan**: treatment name → durasi/harga bila resmi → apa yang diharapkan → Book/Tanya. Letakkan jam, lokasi, kebijakan, dan FAQ sebelum CTA terakhir. Jangan menyalin klaim atau teknik khas Mandarin Oriental. |

### Observasi aset workspace

- [`docs/logo.jpeg`](../docs/logo.jpeg) memberi sinyal brand yang kuat: obsidian/hitam, lingkaran, daun, figur manusia, dan gold. Jadikan ini anchor visual; emas cukup dipakai sebagai penanda, CTA utama, dan detail garis.
- [`docs/example.jpeg`](../docs/example.jpeg) adalah mockup konseptual laptop dengan ruang spa, empat service, nomor WhatsApp, dan trust strip. Perlakukan sebagai **referensi arah**, bukan bukti bisnis. Nama layanan, nomor, “100% Satisfaction Guaranteed”, “Professional Therapists”, dan klaim lain di dalamnya perlu diverifikasi sebelum masuk ke halaman publik.

## Prinsip anti-AI-slop yang diterapkan

[Impeccable /slop](https://impeccable.style/slop/) menginventarisasi pola yang membuat UI terasa generatif: decorative grid, glassmorphism, side-tab border, nested cards, identical card grids, flat hierarchy, icon tile di atas setiap heading, purple/cyan gradient, gradient text, glow, oversized headline, bounce, image scale on hover, buzzword copy, serta placeholder image. Untuk Mustika, terjemahannya:

- jangan memakai purple/cyan gradient, radial glow, glass card, decorative grid, atau shadow besar sebagai pengganti art direction;
- jangan membuat empat service card yang identik dengan icon tile besar; gunakan daftar editorial, garis pemisah, atau layout asimetris;
- jangan menaruh eyebrow uppercase kecil di atas setiap section atau nomor `01 / 02 / 03` jika halaman bukan urutan proses;
- jangan memakai serif italic besar hanya karena kategori spa terlihat “luxury”; pilih display face yang sesuai dengan logo dan gunakan roman/regular bila lebih terbaca;
- jangan mengisi ruang kosong dengan illustration SVG generik, foto stock, atau gambar placeholder;
- gunakan copy yang menyebut layanan dan tindakan konkret, bukan “world-class”, “elevate”, “transformative”, “holistic” tanpa bukti;
- untuk interaksi, gunakan underline/warna/kontras/focus state; jangan zoom gambar, bounce, atau animasi yang tidak menjelaskan status.

[Taste Skill](https://www.tasteskill.dev/) menekankan brief inference, pemetaan ke design system, audit-first untuk redesign, dan hard pre-flight check. Konsekuensi praktisnya: baca token Mustika yang sudah ada sebelum menambah gaya baru, dokumentasikan pilihan font/warna/radius, tetapkan aturan anti-placeholder, dan lakukan review akhir terhadap seluruh page—bukan hanya hero.

## Struktur landing page yang direkomendasikan

### 1. Hero — satu janji dan satu jalan keluar

- H1: 4–8 kata; maksimal 2–3 baris di desktop dan 3–4 baris di mobile.
- Supporting copy: maksimal sekitar 120 karakter, menjelaskan jenis pengalaman Mustika tanpa klaim kesehatan yang belum diverifikasi.
- CTA utama: satu label yang konkret, misalnya label booking yang sudah disetujui. Tampilkan di hero, setelah indeks treatment, dan di penutup; maksimal 3 penempatan utama.
- Media: satu foto lokal atau komposisi logo/tekstur. Tidak ada autoplay video, slider hero, atau laptop mockup sebagai hero production asset.

### 2. Treatment index — bantu orang memilih

Gunakan empat layanan yang sudah muncul di mockup hanya jika dikonfirmasi oleh menu Mustika. Format per item:

`Nama layanan` · `1 kalimat manfaat/karakter yang faktual` · `durasi/harga bila resmi` · `Tanya/Book`

Desktop dapat memakai dua kolom editorial atau baris dengan thumbnail kecil; mobile menjadi daftar vertikal. Untuk empat item, semua informasi inti harus langsung terlihat. Jika kelak ada lebih dari enam item, tambahkan filter kategori sederhana; jangan mulai dari carousel atau kartu bersarang.

### 3. Ritual / process — tiga langkah yang benar-benar terjadi

Gunakan urutan **pilih fokus → konsultasi singkat → sesi dan penutupan** hanya jika itu proses Mustika. Pola ini mengambil pelajaran dari pendekatan personalized THE WELL dan sensory testing/pre-arrival guidance Mandarin Oriental, tetapi teks final harus berasal dari operasional Mustika.

### 4. Proof dan standards — maksimal tiga bukti

Pakai maksimal tiga bukti yang dapat diverifikasi: nama terapis/sertifikasi, foto ruang asli, ulasan dengan nama/inisial dan izin, atau kebijakan kebersihan yang benar-benar dijalankan. Jangan memakai angka, garansi kepuasan, atau “professional therapists” hanya karena terlihat meyakinkan di mockup.

### 5. Visit, FAQ, dan booking

Sebelum CTA terakhir, jawab minimal: lokasi, jam buka, cara booking, apa yang perlu disiapkan, keterlambatan/pembatalan, dan kondisi kesehatan yang perlu diinformasikan. Gunakan `<details>`/accordion yang keyboard-accessible; jangan memindahkan informasi penting ke modal. CTA terakhir sebaiknya langsung membuka jalur booking yang disetujui, dengan nama layanan atau waktu pilihan sebagai konteks jika alurnya mendukung.

## Spesifikasi awal yang terukur

Angka di bawah adalah **guardrail desain untuk tim**, bukan klaim dari brand referensi. Target Core Web Vitals mengikuti target p75 resmi Google: [LCP ≤ 2,5 detik](https://web.dev/articles/lcp), [INP ≤ 200 ms](https://web.dev/articles/inp), dan [CLS ≤ 0,1](https://web.dev/articles/optimize-cls).

| Area | Guardrail awal | Kriteria lulus |
| --- | --- | --- |
| Struktur | 6 blok utama: hero, treatment, process, proof, visit/FAQ, booking | Tidak ada section kosong atau repetisi visual; CTA utama maksimum 3 penempatan |
| Tipografi | Maksimum 2 font family, 4–5 ukuran fungsional, body 16px minimum, functional text 14px minimum | H1 jelas dominan; body 60–72ch; tidak ada paragraf all-caps; kontras teks normal ≥ 4,5:1 |
| Warna | 4 warna brand inti: obsidian/ink, botanical green, ivory, antique gold; 1 aksen dominan per viewport | Tidak ada purple/cyan gradient, gradient text, neon glow, atau lebih dari 3 elemen gold yang bersaing dalam satu viewport |
| Layout | Shell 1.200–1.280px desktop; gutter mobile 20–24px; section gap 64–112px desktop dan 48–80px mobile | Tidak ada horizontal overflow; tidak lebih dari 3 komponen identik berturut-turut |
| Radius & surface | Radius kecil/tegas untuk panel layanan; pill hanya untuk kontrol yang memang berstatus pill | Tidak ada card kecil dengan radius ekstrem, side-tab border, hairline + shadow lebar, atau nested card |
| Media | Maksimum 1 media utama di atas fold; owned/local only; WebP/AVIF; target hero image ≤180KB | Tidak ada stock photo, placeholder, video autoplay, atau gambar AI yang menyatakan kondisi ruang/terapis Mustika |
| Interaksi | Hit area minimum 44px; anchor/FAQ native; 1 CTA booking yang mudah ditemukan | Service detail dapat ditemukan tanpa membuka modal; focus state terlihat; booking mobile ≤2 tap setelah CTA |
| Motion | Hanya transform/opacity; 250–600ms; maksimum satu momen scroll-linked | Reduced motion menghapus movement/parallax/pinning/scrub; konten tetap terlihat tanpa JavaScript |
| Performance | HTML awal server-rendered; lazy-load media below-fold; batasi script non-esensial | LCP/INP/CLS memenuhi target p75; first viewport tidak menunggu video, font, atau widget eksternal |

## Keputusan visual final untuk handoff

1. Pertahankan **obsidian + gold** dari logo, tambahkan botanical green sebagai field/section, dan ivory sebagai permukaan baca. Ivory harus terasa sebagai bagian dari palet Mustika yang disengaja, bukan beige default generatif.
2. Jadikan logo dan material nyata sebagai hero art direction. Jika foto interior/terapis belum disetujui, gunakan crop logo, tekstur kain/kayu/batu yang difoto sendiri, atau type-only composition.
3. Ganti “feature grid” generik dengan treatment index editorial dan satu proses tiga langkah. Gunakan ruang kosong yang bervariasi, bukan padding yang sama di setiap section.
4. Prioritaskan informasi lokal dan keputusan booking sebelum ornamen: service, durasi/harga resmi, jam, lokasi, kebijakan, dan kontak.
5. Jadikan checklist anti-slop sebagai gate sebelum launch: tidak ada placeholder, klaim tanpa sumber, card grid identik, gradient/glow dekoratif, motion tanpa fungsi, atau copy buzzword.

## Validasi sebelum implementasi

- **Content provenance:** 100% nama layanan, harga, durasi, nomor WhatsApp, jam, lokasi, testimonial, sertifikasi, dan klaim memiliki sumber/approval Mustika.
- **Five-second test:** pengguna baru dapat menjawab “Mustika menawarkan apa?” dan “bagaimana saya booking?” tanpa membaca seluruh halaman.
- **Task test mobile:** dari first viewport ke daftar layanan ≤1 scroll; dari service item ke booking ≤2 tap; FAQ dan jam dapat ditemukan tanpa membuka modal.
- **Visual QA:** cek 320px, 390px, 768px, dan desktop; tidak ada overflow, teks terlalu kecil, atau gold/green yang kehilangan kontras.
- **Accessibility/performance:** keyboard order linear, focus visible, reduced-motion pass, dan pengukuran Core Web Vitals dilakukan pada mobile throttled serta field data setelah launch.

## Sumber resmi yang dipakai

- [Six Senses — Wellness & Spa](https://www.sixsenses.com/en/wellness-spa)
- [Six Senses — Spa](https://www.sixsenses.com/en/wellness-spa/spa/)
- [Aman — Wellness](https://www.aman.com/wellness)
- [THE WELL — homepage](https://www.the-well.com/)
- [THE WELL — Bodywork & Massage](https://www.the-well.com/new-york/service/bodywork-massage)
- [Mandarin Oriental, Jakarta — Wellness](https://www.mandarinoriental.com/en/jakarta/jalan-mh-thamrin/wellness)
- [Mandarin Oriental, Jakarta — The Spa](https://www.mandarinoriental.com/en/jakarta/jalan-mh-thamrin/wellness/the-spa)
- [Impeccable — Slop catalog](https://impeccable.style/slop/)
- [Taste Skill — Anti-Slop Frontend Framework](https://www.tasteskill.dev/)
- [Google web.dev — LCP](https://web.dev/articles/lcp), [INP](https://web.dev/articles/inp), dan [CLS](https://web.dev/articles/optimize-cls)

