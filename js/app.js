const inventarisKegiatan = [
    { id: 1, nama: 'Proyektor Portable', kategori: 'AV', jumlah: 2, kondisi: 'Baik', lokasi: 'Ruang Rapat' },
    { id: 2, nama: 'Sound System Wireless', kategori: 'Audio', jumlah: 4, kondisi: 'Baik', lokasi: 'Lapangan' },
    { id: 3, nama: 'Banner Sosialisasi JKN', kategori: 'Media', jumlah: 10, kondisi: 'Perlu Cek', lokasi: 'Gudang' },
    { id: 4, nama: 'Tablet Presensi Digital', kategori: 'IT', jumlah: 5, kondisi: 'Baik', lokasi: 'Ruang Rapat' },
    { id: 5, nama: 'Brochure Pack JKN-KIS', kategori: 'Cetakan', jumlah: 150, kondisi: 'Baik', lokasi: 'Gudang' }
];

const alatBaik = inventarisKegiatan.filter(item => item.kondisi === 'Baik');
console.table(alatBaik);

const namaAlat = inventarisKegiatan.map(({ nama }) => nama);
console.log(namaAlat);

const totalUnit = inventarisKegiatan.reduce((total, item) => total + item.jumlah, 0);
console.log(`Total Seluruh Unit Peralatan: ${totalUnit} unit`);

function ringkasInventaris(data) {
    if (!Array.isArray(data)) {
        throw new TypeError('Data harus berupa array');
    }
    return {
        jenisAlat: data.length,
        totalUnit: data.reduce((sum, item) => sum + item.jumlah, 0),
        kondisiBaik: data.filter(item => item.kondisi === 'Baik').length,
        perluCek: data.filter(item => item.kondisi !== 'Baik').length
    };
}

try {
    const statistik = ringkasInventaris(inventarisKegiatan);
    console.log('Statistik Inventaris Berhasil Diolah:');
    console.log(statistik);
} catch (error) {
    console.error('Terjadi Kesalahan:', error.message);
}