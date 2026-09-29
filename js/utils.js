/* ==========================================================================
   MODUL UTILS (js/utils.js)
   Gudang Data & Fungsi Logika SITRA-BPJS Nunukan
   ========================================================================== */

// 1. Array Objects: Data Inventaris Kegiatan Sosialisasi BPJS Nunukan
export const inventarisKegiatan = [
    { id: 1, nama: 'Proyektor Portable', kategori: 'AV', jumlah: 2, kondisi: 'Baik', lokasi: 'Ruang Rapat' },
    { id: 2, nama: 'Sound System Wireless', kategori: 'Audio', jumlah: 4, kondisi: 'Baik', lokasi: 'Lapangan' },
    { id: 3, nama: 'Banner Sosialisasi JKN', kategori: 'Media', jumlah: 10, kondisi: 'Perlu Cek', lokasi: 'Gudang' },
    { id: 4, nama: 'Tablet Presensi Digital', kategori: 'IT', jumlah: 5, kondisi: 'Baik', lokasi: 'Ruang Rapat' },
    { id: 5, nama: 'Brochure Pack JKN-KIS', kategori: 'Cetakan', jumlah: 150, kondisi: 'Baik', lokasi: 'Gudang' }
];

// 2. Array Objects: Data Kegiatan Sosialisasi JKN SITRA-BPJS (Disesuaikan: 8 Acara & 320 Peserta)
export const daftarKegiatanSosialisasi = [
    { id: 'K01', judul: 'Sosialisasi JKN Desa Binusan', peserta: 50, anggaran: 1500000, status: 'Selesai', kecamatan: 'Nunukan' },
    { id: 'K02', judul: 'Edukasi Mobile JKN Pasar Jamker', peserta: 40, anggaran: 2000000, status: 'Selesai', kecamatan: 'Nunukan Selatan' },
    { id: 'K03', judul: 'Sosialisasi Peserta Mandiri Sebatik', peserta: 30, anggaran: 3000000, status: 'Mendatang', kecamatan: 'Sebatik' },
    { id: 'K04', judul: 'Layanan BPJS Keliling Krayan', peserta: 60, anggaran: 5000000, status: 'Selesai', kecamatan: 'Krayan' },
    { id: 'K05', judul: 'Edukasi Hak & Kewajiban FKTP', peserta: 35, anggaran: 1200000, status: 'Proses', kecamatan: 'Nunukan' },
    { id: 'K06', judul: 'Sosialisasi Pekerja PT NJL', peserta: 45, anggaran: 2500000, status: 'Selesai', kecamatan: 'Nunukan' },
    { id: 'K07', judul: 'Edukasi JKN-KIS Sekolah Tinggi', peserta: 30, anggaran: 1800000, status: 'Selesai', kecamatan: 'Nunukan Selatan' },
    { id: 'K08', judul: 'Layanan BPJS Keliling Mansalong', peserta: 30, anggaran: 2200000, status: 'Mendatang', kecamatan: 'Lumbis' }
];

// 3. Fungsi Rekapitulasi Statistik Inventaris
export function ringkasInventaris(data) {
    if (!Array.isArray(data)) {
        throw new TypeError('Data harus berupa array!');
    }
    return {
        jenisAlat: data.length,
        totalUnit: data.reduce((sum, item) => sum + item.jumlah, 0),
        kondisiBaik: data.filter(item => item.kondisi === 'Baik').length,
        perluCek: data.filter(item => item.kondisi !== 'Baik').length
    };
}

// 4. Fungsi Pencarian Alat Berdasarkan ID (find, destructuring, & template literal)
export function cariAlatById(data, id) {
    if (!Array.isArray(data)) throw new TypeError('Data harus berupa array!');
    
    const hasil = data.find(item => item.id === id);
    if (!hasil) return `Alat dengan ID ${id} tidak ditemukan.`;
    
    const { nama, kategori, kondisi, lokasi } = hasil;
    return `[ID ${id}] ${nama} (${kategori}) - Kondisi: ${kondisi}, Lokasi: ${lokasi}`;
}

// 5. Arrow Function Analisis Proyek Sosialisasi (Tugas OBE - 2 Kolom Rapi)
export const analisisKegiatanProyek = (data) => {
    if (!Array.isArray(data)) throw new TypeError('Argument data harus berupa Array!');
    if (data.length === 0) throw new Error('Data kegiatan tidak boleh kosong!');

    const selesai = data.filter(item => item.status === 'Selesai');
    
    // Gabungkan array judul menjadi satu string agar tabel tidak melebar
    const judulSelesai = selesai.map(({ judul }) => judul).join(', ');
    
    const totalAnggaran = data.reduce((sum, item) => sum + item.anggaran, 0);
    const totalPeserta = data.reduce((sum, item) => sum + item.peserta, 0);

    return {
        totalKegiatan: data.length,
        jumlahSelesai: selesai.length,
        judulSelesai,
        totalAnggaranFormatted: `Rp ${totalAnggaran.toLocaleString('id-ID')}`,
        totalPeserta: `${totalPeserta} Orang`
    };
};

// 6. Arrow Function Pencarian Spesifik Kegiatan Berdasarkan Kode/ID (Tugas OBE)
export const cariKegiatanById = (data, id) => {
    if (!Array.isArray(data)) throw new TypeError('Data harus berupa array!');
    
    const hasil = data.find(item => item.id === id);
    if (!hasil) return `Kegiatan dengan Kode ${id} tidak ditemukan.`;
    
    const { judul, peserta, anggaran, kecamatan, status } = hasil;
    return `[${id}] ${judul} | Lokasi: Kec. ${kecamatan} | Peserta: ${peserta} orang | Anggaran: Rp ${anggaran.toLocaleString('id-ID')} | Status: ${status}`;
};