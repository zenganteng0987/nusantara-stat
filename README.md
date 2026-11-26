# NusantaraStat

[![make.fun bounty](https://img.shields.io/badge/make.fun-bounty-E8A33D)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![License: MIT](https://img.shields.io/badge/License-MIT-0B3B4D.svg)](LICENSE)
[![Node](https://img.shields.io/badge/Node-22-0B3B4D.svg)](https://nodejs.org/)

NusantaraStat adalah situs statistik nasional Indonesia — penduduk, ekonomi, harga, tenaga kerja, kemiskinan, dan Indeks Pembangunan Manusia tahun 2020–2024, diringkas dari rilis Badan Pusat Statistik (BPS) agar mudah dibaca sekilas.

Situs ini adalah visualisasi independen dan **bukan situs resmi BPS**.

## Isi

- **Beranda** — enam kartu angka pokok tahun berjalan (pemilih tahun 2020–2024), grafik pertumbuhan PDB, dan grid semua indikator.
- **Halaman indikator** — angka besar, grafik garis 2020–2024, tabel data lengkap, dan tautan sebelum/berikut.
- **Perbandingan** — seluruh indikator dalam satu tabel; kepala kolom tahun bisa diklik untuk mengurutkan, kotak cari menyaring baris.
- **Tentang** — sumber data, cara membaca, dan penegas status independen situs ini.

## Menjalankan

```sh
node serve.ts
# lalu buka http://localhost:8080
```

Situs ini file statis murni (HTML + CSS + JavaScript vanilla, grafik SVG tanpa library, tanpa font eksternal) dan tidak memuat apa pun dari jaringan.

## Mengemas entri

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Repo GitHub: [zenganteng0987/nusantara-stat](https://github.com/zenganteng0987/nusantara-stat)
