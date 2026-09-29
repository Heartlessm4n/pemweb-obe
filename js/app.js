import { 
    daftarKegiatanSosialisasi, 
    cariKegiatanById 
} from './utils.js';

let state = {
    filterStatusKegiatan: 'Semua',
    searchKegiatanQuery: '',
    itemLimit: 10
};

document.addEventListener('DOMContentLoaded', () => {
    initThemePreference();
    initTabNavigation();
    initQuickAccessNavigation();
    initFiltersAndSearch();
    initLimitSelect();
    initModalAndDelegation();
    renderKegiatan();
});

function initThemePreference() {
    const themeBtn = document.getElementById('theme-button');
    if (!themeBtn) return;

    const savedTheme = localStorage.getItem('theme') ?? 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeButtonUI(savedTheme);

    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('theme', nextTheme);
        updateThemeButtonUI(nextTheme);
    });
}

function updateThemeButtonUI(theme) {
    const icon = document.querySelector('.theme-icon');
    const text = document.querySelector('.theme-text');
    if (theme === 'dark') {
        if (icon) icon.className = 'fa-solid fa-sun theme-icon';
        if (text) text.textContent = 'Mode Terang';
    } else {
        if (icon) icon.className = 'fa-solid fa-moon theme-icon';
        if (text) text.textContent = 'Mode Gelap';
    }
}

function initTabNavigation() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
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

function initFiltersAndSearch() {
    const searchKegiatan = document.getElementById('search-input-kegiatan');
    const filterStatusBtns = document.querySelectorAll('.btn-filter');

    if (searchKegiatan) {
        searchKegiatan.addEventListener('input', (e) => {
            state.searchKegiatanQuery = e.target.value.toLowerCase().trim();
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

function initLimitSelect() {
    const limitSelect = document.getElementById('limit-select');
    if (!limitSelect) return;

    const savedLimit = localStorage.getItem('limit_preference') || '10';
    state.itemLimit = parseInt(savedLimit);
    limitSelect.value = savedLimit;

    limitSelect.addEventListener('change', (e) => {
        state.itemLimit = parseInt(e.target.value);
        localStorage.setItem('limit_preference', e.target.value);
        renderKegiatan();
    });
}

function renderKegiatan() {
    const container = document.getElementById('daftar-kegiatan');
    if (!container) return;
    container.innerHTML = '';

    const filtered = daftarKegiatanSosialisasi.filter(item => {
        const matchStatus = state.filterStatusKegiatan === 'Semua' || item.status === state.filterStatusKegiatan;
        const matchSearch = item.judul.toLowerCase().includes(state.searchKegiatanQuery) || 
                            item.kecamatan.toLowerCase().includes(state.searchKegiatanQuery);
        return matchStatus && matchSearch;
    });

    const dataTampil = filtered.slice(0, state.itemLimit);

    const badge = document.getElementById('total-badge');
    if (badge) badge.textContent = `${filtered.length} Acara`;

    if (dataTampil.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary); padding: 1rem;">Tidak ada agenda sosialisasi yang ditemukan.</p>';
        return;
    }

    dataTampil.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        const statusClass = item.status.toLowerCase();

        card.innerHTML = `
            <div>
                <div class="flex-between">
                    <span class="status-tag ${statusClass}">${item.status}</span>
                    <small style="color: var(--text-secondary);"><i class="fa-solid fa-location-dot"></i> Kec. ${item.kecamatan}</small>
                </div>
                <h4 style="margin: 0.6rem 0 0.3rem 0; font-size: 1.05rem;">${item.judul}</h4>
                <p style="font-size: 0.85rem; color: var(--text-secondary);"><i class="fa-solid fa-users"></i> Target: ${item.peserta} Peserta</p>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.2rem;"><i class="fa-solid fa-wallet"></i> Anggaran: Rp ${item.anggaran.toLocaleString('id-ID')}</p>
            </div>
            <button class="btn-detail" data-id="${item.id}" data-type="kegiatan" style="margin-top: 0.85rem;">Detail Acara</button>
        `;
        container.appendChild(card);
    });
}

function initModalAndDelegation() {
    const mainContainer = document.querySelector('.container');
    const modal = document.getElementById('modal-detail');
    const closeBtns = document.querySelectorAll('.close-modal, .btn-close-modal, .modal-overlay');

    if (mainContainer) {
        mainContainer.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('btn-detail')) {
                const id = e.target.getAttribute('data-id');
                const detailText = cariKegiatanById(daftarKegiatanSosialisasi, id);
                const item = daftarKegiatanSosialisasi.find(k => k.id === id);
                
                const modalTitle = document.getElementById('modal-title');
                const modalBody = document.getElementById('modal-body');
                
                if (modalTitle && modalBody) {
                    modalTitle.textContent = item ? item.judul : 'Detail Acara';
                    modalBody.innerHTML = `
                        <p style="margin-bottom: 0.5rem;"><strong>Informasi Lengkap:</strong></p>
                        <blockquote style="background: var(--bg-accent); padding: 0.75rem; border-left: 4px solid var(--primary-green); border-radius: 4px; font-size: 0.9rem; margin-bottom: 1rem;">
                            ${detailText}
                        </blockquote>
                    `;
                    modal.classList.remove('hidden');
                } else {
                    alert(detailText);
                }
            }
        });
    }

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (modal) modal.classList.add('hidden');
        });
    });
}