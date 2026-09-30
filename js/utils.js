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

export const analisisKegiatanProyek = (data) => {
    if (!Array.isArray(data)) throw new TypeError('Argument data harus berupa Array!');
    if (data.length === 0) throw new Error('Data kegiatan tidak boleh kosong!');

    const selesai = data.filter(item => item.status === 'Selesai');
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

export const cariKegiatanById = (data, id) => {
    if (!Array.isArray(data)) throw new TypeError('Data harus berupa array!');

    const hasil = data.find(item => item.id === id);
    if (!hasil) return `Kegiatan dengan Kode ${id} tidak ditemukan.`;

    const { judul, peserta, anggaran, kecamatan, status } = hasil;
    return `[${id}] ${judul} | Lokasi: Kec. ${kecamatan} | Peserta: ${peserta} orang | Anggaran: Rp ${anggaran.toLocaleString('id-ID')} | Status: ${status}`;
};  