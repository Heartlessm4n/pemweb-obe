import { inventarisKegiatan, ringkasInventaris, cariAlatById } from './utils.js';

console.log('=== LOGIKA JAVASCRIPT MODERN (ES6+) SITRA-BPJS NUNUKAN ===');

const alatBaik = inventarisKegiatan.filter(item => item.kondisi === 'Baik');
console.table(alatBaik);

const namaAlat = inventarisKegiatan.map(({ nama }) => nama);
console.log(namaAlat);

const totalUnit = inventarisKegiatan.reduce((total, item) => total + item.jumlah, 0);
console.log(`Total Seluruh Unit Peralatan: ${totalUnit} unit`);

try {
    const statistik = ringkasInventaris(inventarisKegiatan);
    console.log('Statistik Inventaris Berhasil Diolah:');
    console.log(statistik);
} catch (error) {
    console.error('Terjadi Kesalahan:', error.message);
}

const alatDiGudang = inventarisKegiatan.filter(item => item.lokasi === 'Gudang');
console.table(alatDiGudang);

const hasilCari = cariAlatById(inventarisKegiatan, 2);
console.log(hasilCari);

inventarisKegiatan.forEach(item => {
    const { id, nama, kategori, jumlah, kondisi, lokasi } = item;
    console.log(`[ID: ${id}] ${nama} (${kategori}) | Jumlah: ${jumlah} unit | Kondisi: ${kondisi} | Lokasi: ${lokasi}`);
});