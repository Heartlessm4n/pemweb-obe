import { 
    daftarKegiatanSosialisasi, 
    cariKegiatanById 
} from './utils.js';

let state = {
    filterStatusKegiatan: 'Semua',
    searchKegiatanQuery: '',
    itemLimit: 10
};

const containerKegiatan = document.querySelector('#daftar-kegiatan');
const filterStatusBtns = document.querySelectorAll('.btn-filter');
const searchInput = document.querySelector('#search-input-kegiatan');
const limitSelect = document.querySelector('#limit-select');
const themeButton = document.querySelector('#theme-button');

document.addEventListener('DOMContentLoaded', () => {
    initThemePreference();
    initTabNavigation();
    initQuickAccessNavigation();
    initFiltersAndEvents();
    initLimitStorage();
    initModalAndDelegation();
    initFormValidation();
    renderKegiatan();
});

// 1. Web Storage: Preferensi Tema (Dark/Light)
function initThemePreference() {
    if (!themeButton) return;
    const savedTheme = localStorage.getItem('theme') ?? 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeButtonUI(savedTheme);

    themeButton.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('theme', nextTheme);
        updateThemeButtonUI(nextTheme);
    });
}

function updateThemeButtonUI(theme) {
    const icon = themeButton.querySelector('.theme-icon');
    const text = themeButton.querySelector('.theme-text');
    if (theme === 'dark') {
        if (icon) icon.className = 'fa-solid fa-sun theme-icon';
        if (text) text.textContent = 'Mode Terang';
    } else {
        if (icon) icon.className = 'fa-solid fa-moon theme-icon';
        if (text) text.textContent = 'Mode Gelap';
    }
}

// 2. Navigasi Tab Utama
function initTabNavigation() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetTabId = btn.getAttribute('data-tab');
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            
            const targetContent = document.getElementById(targetTabId);
            if (targetContent) targetContent.classList.add('active');
        });
    });
}

function initQuickAccessNavigation() {
    const quickCards = document.querySelectorAll('.quick-card');
    quickCards.forEach(card => {
        card.addEventListener('click', () => {
            const targetTab = card.getAttribute('data-target-tab');
            const targetBtn = document.querySelector(`.tab-btn[data-tab="${targetTab}"]`);
            if (targetBtn) {
                targetBtn.click();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
}

// 3. Event Handling: Pencarian (Input) & Filter Status
function initFiltersAndEvents() {
    if (searchInput) {
        searchInput.addEventListener('input', (event) => {
            state.searchKegiatanQuery = event.target.value.toLowerCase().trim();
            renderKegiatan();
        });
    }

    filterStatusBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterStatusBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.filterStatusKegiatan = btn.getAttribute('data-filter');
            renderKegiatan();
        });
    });
}

// 4. Web Storage: Limit Jumlah Item yang Tampil
function initLimitStorage() {
    if (!limitSelect) return;
    const savedLimit = localStorage.getItem('limit') ?? '10';
    state.itemLimit = Number(savedLimit);
    limitSelect.value = savedLimit;

    limitSelect.addEventListener('change', (e) => {
        state.itemLimit = Number(e.target.value);
        localStorage.setItem('limit', e.target.value);
        renderKegiatan();
    });
}

// 5. Event Delegation untuk Popup Modal Detail
function initModalAndDelegation() {
    const modal = document.getElementById('modal-detail');
    const closeBtns = document.querySelectorAll('.close-modal, .btn-close-modal, .modal-overlay');

    if (containerKegiatan) {
        containerKegiatan.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-detail');
            if (!btn) return;

            const id = btn.getAttribute('data-id');
            const detailText = cariKegiatanById(daftarKegiatanSosialisasi, id);
            const item = daftarKegiatanSosialisasi.find(k => k.id === id);
            
            const modalTitle = document.getElementById('modal-title');
            const modalBody = document.getElementById('modal-body');
            
            if (modalTitle && modalBody && modal) {
                modalTitle.textContent = item ? item.judul : 'Detail Acara';
                modalBody.innerHTML = `
                    <p style="margin-bottom: 0.5rem;"><strong>Informasi Lengkap:</strong></p>
                    <blockquote style="background: var(--bg-accent); padding: 0.75rem; border-left: 4px solid var(--primary-green); border-radius: 4px; font-size: 0.9rem; margin-bottom: 1rem;">
                        ${detailText}
                    </blockquote>
                `;
                modal.classList.remove('hidden');
            }
        });
    }

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (modal) modal.classList.add('hidden');
        });
    });
}

// 6. MODUL 6: VALIDASI FORM PENGAJUAN KEGIATAN (UI FEEDBACK)
function initFormValidation() {
    const form = document.querySelector('#form-pengajuan');
    const status = document.querySelector('#form-status');

    if (!form) return;

    function validateForm(formData) {
        const errors = {};
        
        const nama = String(formData.get('nama') ?? '').trim();
        const kecamatan = String(formData.get('kecamatan') ?? '');
        const jumlah = Number(formData.get('jumlah'));
        const tanggalInput = String(formData.get('tanggal') ?? '');

        // 1. Validasi Nama Instansi / Desa
        if (!nama) {
            errors.nama = 'Nama instansi / desa wajib diisi.';
        } else if (nama.length < 3) {
            errors.nama = 'Nama instansi / desa minimal harus 3 karakter.';
        }

        // 2. Validasi Kecamatan (Pilihan opsi)
        const validKecamatan = ['Nunukan', 'Nunukan Selatan', 'Sebatik', 'Krayan', 'Lumbis'];
        if (!kecamatan) {
            errors.kecamatan = 'Kecamatan target wajib dipilih.';
        } else if (!validKecamatan.includes(kecamatan)) {
            errors.kecamatan = 'Kecamatan yang dipilih tidak valid.';
        }

        // 3. Validasi Estimasi Jumlah Peserta (Number, min 1)
        if (formData.get('jumlah') === '') {
            errors.jumlah = 'Estimasi jumlah peserta wajib diisi.';
        } else if (!Number.isInteger(jumlah) || jumlah < 1) {
            errors.jumlah = 'Estimasi peserta harus berupa bilangan bulat minimal 1.';
        }

        // 4. Validasi Tanggal (Hari ini atau masa depan, tidak boleh masa lalu)
        if (!tanggalInput) {
            errors.tanggal = 'Rencana tanggal pelaksanaan wajib diisi.';
        } else {
            const selectedDate = new Date(tanggalInput);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Normalisasi ke tengah malam

            if (selectedDate < today) {
                errors.tanggal = 'Rencana tanggal pelaksanaan tidak boleh tanggal yang sudah lewat.';
            }
        }

        return errors;
    }

    form.addEventListener('submit', event => {
        // Mencegah reload browser dan pengalihan tab
        event.preventDefault();
        event.stopPropagation();
        
        const formData = new FormData(form);
        const errors = validateForm(formData);

        // Reset pesan error & atribut aria-invalid
        document.querySelectorAll('.error-text').forEach(el => el.textContent = '');
        form.querySelectorAll('[aria-invalid="true"]').forEach(el => el.removeAttribute('aria-invalid'));

        // Jika terdapat error validasi
        if (Object.keys(errors).length > 0) {
            for (const [field, message] of Object.entries(errors)) {
                const errorEl = document.querySelector(`#error-${field}`);
                if (errorEl) errorEl.textContent = message;
                
                const inputEl = form.elements[field];
                if (inputEl) inputEl.setAttribute('aria-invalid', 'true');
            }

            // Fokus ke elemen error pertama
            const firstField = Object.keys(errors)[0];
            form.elements[firstField]?.focus();
            
            if (status) {
                status.style.background = 'transparent';
                status.style.border = 'none';
                status.style.padding = '0';
                status.style.color = '#ef4444';
                status.textContent = 'Periksa kembali data form yang belum valid.';
            }
            return false;
        }

        // SIMPAN DATA SEMENTARA KE LOCALSTORAGE BROWSER
        const pengajuanBaru = {
            nama: formData.get('nama'),
            kecamatan: formData.get('kecamatan'),
            jumlah: formData.get('jumlah'),
            tanggal: formData.get('tanggal'),
            timestamp: new Date().toISOString()
        };

        const listPengajuan = JSON.parse(localStorage.getItem('daftar_pengajuan') ?? '[]');
        listPengajuan.push(pengajuanBaru);
        localStorage.setItem('daftar_pengajuan', JSON.stringify(listPengajuan));

        // TAMPILKAN BANNER SUKSES LANGSUNG DI UI (TANPA ALERT)
        if (status) {
            status.style.background = '#dcfce7';
            status.style.border = '1px solid #22c55e';
            status.style.padding = '0.85rem 1rem';
            status.style.borderRadius = '8px';
            status.style.color = '#15803d';
            status.innerHTML = `
                <div style="font-weight: 700; font-size: 0.95rem; margin-bottom: 0.35rem;">
                    <i class="fa-solid fa-circle-check"></i> Pengajuan Kegiatan Berhasil Dikirim!
                </div>
                <div style="font-weight: 500; font-size: 0.85rem; line-height: 1.4;">
                    Data valid dan siap diproses: <strong>${formData.get('nama')}</strong> (${formData.get('kecamatan')}) - Estimasi ${formData.get('jumlah')} peserta pada ${formData.get('tanggal')}.
                </div>
            `;
        }

        // Reset isi input form setelah berhasil disubmit
        form.reset();

        return false;
    });
}

// 7. Fungsi Render DOM (Safe Update dengan createElement)
function renderKegiatan() {
    if (!containerKegiatan) return;
    containerKegiatan.replaceChildren();

    const filtered = daftarKegiatanSosialisasi.filter(item => {
        const matchStatus = state.filterStatusKegiatan === 'Semua' || item.status === state.filterStatusKegiatan;
        const matchSearch = item.judul.toLowerCase().includes(state.searchKegiatanQuery) || 
                            item.kecamatan.toLowerCase().includes(state.searchKegiatanQuery);
        return matchStatus && matchSearch;
    });

    const dataDibatasi = filtered.slice(0, state.itemLimit);

    const badge = document.getElementById('total-badge');
    if (badge) badge.textContent = `${filtered.length} Acara`;

    if (dataDibatasi.length === 0) {
        const p = document.createElement('p');
        p.textContent = 'Tidak ada agenda sosialisasi yang ditemukan.';
        p.style.gridColumn = '1 / -1';
        p.style.textAlign = 'center';
        p.style.color = 'var(--text-secondary)';
        p.style.padding = '1rem';
        containerKegiatan.append(p);
        return;
    }

    for (const item of dataDibatasi) {
        const card = document.createElement('div');
        card.className = 'card';

        const headerFlex = document.createElement('div');
        headerFlex.className = 'flex-between';

        const statusTag = document.createElement('span');
        statusTag.className = `status-tag ${item.status.toLowerCase()}`;
        statusTag.textContent = item.status;

        const locSmall = document.createElement('small');
        locSmall.style.color = 'var(--text-secondary)';
        locSmall.innerHTML = `<i class="fa-solid fa-location-dot"></i> Kec. ${item.kecamatan}`;
        headerFlex.append(statusTag, locSmall);

        const title = document.createElement('h4');
        title.style.margin = '0.6rem 0 0.3rem 0';
        title.style.fontSize = '1.05rem';
        title.textContent = item.judul;

        const infoPeserta = document.createElement('p');
        infoPeserta.style.fontSize = '0.85rem';
        infoPeserta.style.color = 'var(--text-secondary)';
        infoPeserta.innerHTML = `<i class="fa-solid fa-users"></i> Target: ${item.peserta} Peserta`;

        const infoAnggaran = document.createElement('p');
        infoAnggaran.style.fontSize = '0.85rem';
        infoAnggaran.style.color = 'var(--text-secondary)';
        infoAnggaran.style.marginTop = '0.2rem';
        infoAnggaran.innerHTML = `<i class="fa-solid fa-wallet"></i> Anggaran: Rp ${item.anggaran.toLocaleString('id-ID')}`;

        const contentDiv = document.createElement('div');
        contentDiv.append(headerFlex, title, infoPeserta, infoAnggaran);

        const btnDetail = document.createElement('button');
        btnDetail.type = 'button';
        btnDetail.className = 'btn-detail';
        btnDetail.textContent = 'Detail Acara';
        btnDetail.dataset.id = item.id;
        btnDetail.style.marginTop = '0.85rem';

        card.append(contentDiv, btnDetail);
        containerKegiatan.append(card);
    }
}