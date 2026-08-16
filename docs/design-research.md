# Mustika landing page — design research

Tanggal riset: 16 Agustus 2026

## Temuan yang relevan

- [Six Senses Wellness & Spa](https://www.sixsenses.com/en/wellness-spa) menyusun wellness sebagai rangkaian pilar dan cerita, bukan kumpulan kartu layanan. Bahasa visualnya memberi ruang untuk hierarchy, personalisasi, dan perjalanan yang bertahap.
- [Six Senses Spa](https://www.sixsenses.com/en/wellness-spa/spa/) menggabungkan signature treatment, inspirasi lokal, dan keahlian praktisi. Untuk Mustika, ini berarti layanan harus dibaca sebagai pilihan ritual berdasarkan kebutuhan tubuh, bukan katalog generik.
- [Aman Wellness](https://www.aman.com/wellness) mengelompokkan pengalaman ke dalam prinsip yang mudah dipahami: physical optimisation, mental equilibrium, dan spiritual illumination. Struktur seperti ini cocok untuk pengunjung umum dan keluarga karena mengurangi beban memilih.
- [THE WELL](https://www.the-well.com/?lang=en) menempatkan pencarian layanan, offerings, praktisi, dan konsultasi sebagai jalur utama. Booking harus tetap terlihat jelas walau desain dibuat editorial.
- Referensi editorial dari [Lilly Breeze](https://tarikbamarouf.com/work/lily-home-spa) dan [Judy Chapman Spa Consulting](https://ludbrookagency.com/projects/judy-chapman-spa-consulting/) menekankan urutan cerita yang tenang, typography yang restrained, dan detail hospitality daripada dekorasi UI.
- [Goldust Spa di Awwwards](https://www.awwwards.com/inspiration/scroll-animations-goldust-spa) memperlihatkan bahwa scroll animation yang memorable bekerja sebagai bagian dari narasi—misalnya perpindahan treatment, jurnal, atau langkah booking—bukan sekumpulan fade-in.
- [Impeccable Slop Detector](https://impeccable.style/slop) dipakai sebagai validasi anti-pattern. Saya menghindari radial glow, gradient headline, orbit dekoratif, kumpulan rounded cards, dan hero yang menghabiskan layar tanpa informasi baru.
- [TasteSkill](https://www.tasteskill.dev/) dipakai sebagai sanity check rasa dan craft: sistem visual harus konsisten, punya keputusan art-direction yang spesifik, dan tidak terasa seperti template AI yang hanya mengganti warna.

## Keputusan art direction

Konsep baru: **The Ritual Ledger**.

Mustika dipresentasikan seperti halaman ledger/ritual menu milik hospitality boutique: kertas tulang hangat, tinta hijau-hitam, oxide terracotta sebagai aksen, dan emas hanya sebagai detail yang mengikat logo asli. Layout menggunakan grid editorial 12 kolom, hairline rules, index numerik, dan bidang gambar persegi panjang yang terasa seperti lembar menu—bukan hero gelap dengan logo melayang.

Konsekuensinya:

1. Hero dibuat pendek dan informatif, dengan copy di kiri dan “ritual sheet” di kanan. Logo client tetap menjadi asset utama, tetapi berada di dalam komposisi editorial yang nyata.
2. Layanan tampil sebagai daftar bernomor yang melebar dengan hover state yang menggeser marker, bukan empat kartu icon.
3. Cerita pengalaman memakai jalur 3 langkah dan ruang kosong; FAQ tetap plain-spoken agar conversion tidak dikorbankan demi gaya.
4. GSAP dipakai untuk choreography: paper-sheet reveal dengan clip-path, baseline typography entrance, pinned hero transition saat scroll, parallax pointer yang halus, dan progress line. AOS tidak dapat menghasilkan rangkaian state ini secara koheren.
5. Mobile mempertahankan urutan baca dan CTA tanpa memuat GSAP; desktop mendapat pinned transition karena memiliki pointer dan ruang horizontal yang cukup.

## Batasan yang sengaja dipertahankan

- Copy tetap berbahasa Indonesia dan tidak mengklaim layanan medis.
- Booking tetap satu klik melalui WhatsApp Mustika.
- Semua gambar berasal dari asset lokal client yang sudah dikompresi ke WebP.
- Halaman tetap server-rendered melalui EmDash; customisasi berada di komponen halaman, bukan mengubah alur CMS.
