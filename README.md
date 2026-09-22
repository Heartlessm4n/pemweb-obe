## Identitas
- **Nama:** Ainur Rofiq
- **NPM:** 2440304034
- **Angkatan:** 2024
- **Mata Kuliah:** Pemrograman Web (26TJ453127)
- **Program Studi:** Sarjana Teknik Komputer - Universitas Borneo Tarakan
- **Semester:** 5

## Deskripsi Proyek
Repository ini memuat fondasi awal pengembangan proyek aplikasi web berbasis kurikulum OBE: **SITRA-BPJS Kesehatan (Sistem Registrasi & Evaluasi Sosialisasi Terpadu)** untuk BPJS Kesehatan Kantor Kabupaten Nunukan.

## Environment & Spesifikasi
- **Web Server:** Laragon 5 (Apache)
- **Bahasa Pemrograman:** PHP 8.4 / HTML5
- **Version Control:** Git & GitHub

## Cara Menjalankan Proyek
1. Jalankan Laragon 5 dan klik **Start All**.
2. Simpan proyek pada path `C:\laragon\www\pemweb-obe`.
3. Akses halaman melalui browser di URL: [http://localhost/pemweb-obe/](http://localhost/pemweb-obe/)

## Analisis Request-Response HTTP

Situs Layanan Publik yang dianalisis: **https://bps.go.id/id**

| No | Request Name / Resource | Method | Status | Type | Size | Fungsi Request |
|:---|:---|:---|:---|:---|:---|:---|
| 1 | `id` | GET | 200 | document | 22.4 kB | Mengambil dokumen utama (HTML) untuk memuat struktur halaman web. |
| 2 | `e1af272ccee01ff0-s.p.woff2` | GET | 200 | font | 48.8 kB | Mengunduh berkas web font (WOFF2) untuk merender tipografi teks. |
| 3 | `9bfd5c302cf50924.css` | GET | 200 | stylesheet | 20.2 kB | Memuat stylesheet CSS utama untuk mengatur tata letak dan desain visual. |
| 4 | `email-decode.min.js` | GET | 200 | script | 0.8 kB | Memuat skrip JavaScript untuk mendekode dan melindungi email dari spam. |
| 5 | `geoportal.svg` | GET | 200 | svg+xml | 9.9 kB | Mengunduh berkas gambar SVG untuk menampilkan ikon layanan Geoportal. |

## Catatan Fitur Modul 2 (Struktur HTML5 & Aksesibilitas)
- Implementasi elemen semantik HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) untuk proyek SITRA-BPJS Kesehatan Kantor Kabupaten Nunukan.
- Penerapan aksesibilitas dasar (atribut `lang="id"`, deskripsi `alt` pada `<img>` `assets/sosialisasi bpjs.jpg` ukuran 350px, serta relasi `<label for="no_jkn">` dengan `<input id="no_jkn">`).
- Uji navigasi keyboard (*Skip link* `#main-content`).
- Detail kegiatan sosialisasi khusus pekerja PT. Nunukan Jaya Lestari (PT.NJL) dengan narasumber Kepala Kabupaten BPJS Kesehatan Nunukan (Yuliarsih Sahar).

## Status Proyek
- **Progress:** Selesai Modul 2 (Struktur HTML5 Semantik dan Aksesibilitas Web Dasar - SITRA BPJS Nunukan).

## Catatan Fitur Modul 3 (CSS Modern, Responsive Design & UI/UX)
- Implementasi *Design System Tokens* (`:root`) untuk mengelola variabel warna resmi BPJS Kesehatan (`#00a859`), typography, spacing, dan radius.
- Menerapkan Flexbox pada tata letak menu navigasi (`nav ul`) dengan `flex-wrap` agar tombol melipat secara alami tanpa memicu *horizontal scrollbar*.
- Menerapkan CSS Grid dua dimensi pada kartu statistik (`.stats-grid`) dan tata letak artikel hero (`.article-grid`) menggunakan satuan proporsional `fr`.
- Penerapan *responsive typography* menggunakan fungsi `clamp()` pada judul utama header.
- Penerapan strategi *mobile-first* dengan *media query* `@media (min-width: 768px)` untuk fleksibilitas tampilan di perangkat layar lebar.
- Pengujian aksesibilitas visual dengan mempertahankan indikator fokus (`:focus-visible`) warna hijau menyala (`3px`) saat navigasi menggunakan tombol Tab keyboard.

## Status Proyek
- **Progress:** Selesai Modul 3 (CSS Modern, Responsive Design, Flexbox/Grid, dan Dasar UI/UX - SITRA BPJS Nunukan).

## Catatan Fitur Modul 4 (Logika JavaScript Modern & ES Modules)
- Memisahkan logika program menjadi dua modul utama (`js/utils.js` dan `js/app.js`) menggunakan sintaks ES Modules (`export` dan `import`).
- Menerapkan manipulasi array of objects menggunakan method `filter` (penyaringan kondisi/lokasi), `map` (pembentukan array nama/judul), `reduce` (akumulasi total unit/anggaran), serta `find` (pencarian data spesifik berdasar ID/kode).
- Menggunakan *object destructuring* dan *template literals* untuk menghasilkan format string ringkasan data yang rapi pada konsol browser.
- Menerapkan penanganan kesalahan dasar (*error handling*) dengan blok `try...catch` dan penyampaian pesan error melalui `throw new TypeError()`.

## Status Proyek
- **Progress:** Selesai Modul 4 (Logika JavaScript Modern ES6+, Modularisasi, Array Methods, dan Error Handling - SITRA BPJS Nunukan).