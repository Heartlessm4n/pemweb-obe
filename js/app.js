/* ==========================================================================
   MAIN EXECUTION SCRIPT (js/app.js)
   SITRA-BPJS Nunukan
   ========================================================================== */

import { 
    inventarisKegiatan, 
    ringkasInventaris, 
    cariAlatById,
    daftarKegiatanSosialisasi,
    analisisKegiatanProyek,
    cariKegiatanById
} from './utils.js';

console.log('=== LOGIKA JAVASCRIPT MODERN (ES6+) SITRA-BPJS NUNUKAN ===');

// --- A. LANGKAH PRAKTIKUM UTAMA ---
console.log('\n--- 1. Filter Alat Kondisi Baik ---');
const alatBaik = inventarisKegiatan.filter(item => item.kondisi === 'Baik');
console.table(alatBaik);

console.log('\n--- 2. Map Daftar Nama Alat ---');
const namaAlat = inventarisKegiatan.map(({ nama }) => nama);
console.table(namaAlat);

console.log('\n--- 3. Total Unit Peralatan (Reduce) ---');
const totalUnit = inventarisKegiatan.reduce((total, item) => total + item.jumlah, 0);
console.log(`Total Seluruh Unit Peralatan: ${totalUnit} unit`);

// --- B. LATIHAN MODUL 4 ---
console.log('\n--- 4. Latihan 1: Filter Alat di Gudang ---');
const alatDiGudang = inventarisKegiatan.filter(item => item.lokasi === 'Gudang');
console.table(alatDiGudang);

console.log('\n--- 5. Latihan 2: Cari Alat ID 2 (Find) ---');
console.log(cariAlatById(inventarisKegiatan, 2));

console.log('\n--- 6. Latihan 3: Ringkasan String Seluruh Alat ---');
inventarisKegiatan.forEach(item => {
    const { id, nama, kategori, jumlah, kondisi, lokasi } = item;
    console.log(`[ID: ${id}] ${nama} (${kategori}) | Jumlah: ${jumlah} unit | Kondisi: ${kondisi} | Lokasi: ${lokasi}`);
});

console.log('\n--- 7. Statistik Inventaris (Import utils.js) ---');
try {
    const statistik = ringkasInventaris(inventarisKegiatan);
    console.table(statistik);
} catch (error) {
    console.error('Terjadi Kesalahan:', error.message);
}

// --- C. F. TUGAS OBE: ANALISIS LOGIKA PROYEK SITRA-BPJS ---
console.log('\n==================================================');
console.log('=== F. TUGAS OBE: ANALISIS LOGIKA PROYEK SITRA ===');
console.log('==================================================');

try {
    // 1. Eksekusi Hasil Ringkasan Analisis Kegiatan Proyek (Tabel 2 Kolom Rapi)
    console.log('\n1. Hasil Ringkasan Analisis Kegiatan Proyek:');
    const ringkasanProyek = analisisKegiatanProyek(daftarKegiatanSosialisasi);
    console.table(ringkasanProyek);

    // 2. Tampilkan Kegiatan Kecamatan Nunukan (Filter)
    console.log('\n2. Daftar Kegiatan di Kecamatan Nunukan (Filter):');
    const kegiatanNunukan = daftarKegiatanSosialisasi.filter(k => k.kecamatan === 'Nunukan');
    console.table(kegiatanNunukan);

    // 3. Pencarian Detail Kegiatan Berdasarkan Kode (Find)
    console.log('\n3. Pencarian Detail Kegiatan (Kode K04):');
    console.log(cariKegiatanById(daftarKegiatanSosialisasi, 'K04'));

} catch (error) {
    console.error('Terjadi Kesalahan pada Pengolahan Proyek:', error.message);
}