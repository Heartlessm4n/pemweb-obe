## Identitas
- **Nama**: Ainur Rofiq
- **NPM**: 2440304034
- **Angkatan**: 2024
- **Mata Kuliah**: Pemrograman Web (26TJ453127)
- **Program Studi**: Sarjana Teknik Komputer - Universitas Borneo Tarakan
- **Semester**: 5

## Deskripsi Proyek
Repository ini memuat fondasi awal pengembangan proyek aplikasi web berbasis kurikulum OBE.

## Environment & Spesifikasi
- **Web Server**: Laragon 5 (Apache)
- **Bahasa Pemrograman**: PHP 8.4
- **Version Control**: Git & GitHub

## Cara Menjalankan Proyek
1. Jalankan Laragon 5 dan klik **Start All**.
2. Simpan proyek pada path `C:\laragon\www\pemweb-obe`.
3. Akses halaman melalui browser di URL: [http://localhost/pemweb-obe/](http://localhost/pemweb-obe/)

## Analisis Request-Response HTTP

Situs Layanan Publik yang dianalisis: **`https://bps.go.id/id`**

| No | Request Name / Resource | Method | Status | Type | Size | Fungsi Request |
|:--:|:---|:---:|:---:|:---:|:---:|:---|
| 1 | `id` | GET | 200 | document | 22.4 kB | Mengambil dokumen utama (HTML) untuk memuat struktur halaman web. |
| 2 | `e1af272ccee01ff0-s.p.woff2` | GET | 200 | font | 48.8 kB | Mengunduh berkas web font (WOFF2) untuk merender tipografi teks. |
| 3 | `9bfd5c302cf50924.css` | GET | 200 | stylesheet | 20.2 kB | Memuat stylesheet CSS utama untuk mengatur tata letak dan desain visual. |
| 4 | `email-decode.min.js` | GET | 200 | script | 0.8 kB | Memuat skrip JavaScript untuk mendekode dan melindungi email dari spam. |
| 5 | `geoportal.svg` | GET | 200 | svg+xml | 9.9 kB | Mengunduh berkas gambar SVG untuk menampilkan ikon layanan Geoportal. |

## Status Proyek
- **Progress**: Selesai Modul 1 (Setup Environment, DevTools, dan Version Control).