const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const hasilPencarianDiv = document.getElementById('hasil-pencarian');
const loadingDiv = document.getElementById('loading');

searchInput.addEventListener('input', function () {
  this.style.borderColor = this.value.length > 0
    ? 'rgba(255, 255, 255, 0.4)'
    : 'rgba(255, 255, 255, 0.2)';
});

searchInput.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    cariPengiriman();
  }
});

searchButton.addEventListener('click', cariPengiriman);

function cariPengiriman() {
  const input = searchInput.value.toLowerCase().trim();
  if (!input) {
    showNotification('Masukkan nomor order atau nomor receive.', 'warning');
    return;
  }

  loadingDiv.style.display = 'flex';
  hasilPencarianDiv.innerHTML = '';

  fetch(`https://script.google.com/macros/s/AKfycbyYa1Er129YX3qcpxulaD40nNiKo94HjD3aH25LLqjApmEuqnEzCX5uU_VvoWAUnp7lqg/exec?q=${encodeURIComponent(input)}`)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then(data => tampilkanHasil(data))
    .catch(err => tampilkanKesalahan(err.message));
}

function tampilkanHasil(data) {
  loadingDiv.style.display = 'none';

  if (!data || data.length === 0) {
    hasilPencarianDiv.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search"></i>
        <h3>Data tidak ditemukan</h3>
        <p>Silakan periksa kembali nomor order atau nomor receive, pastikan tidak ada spasi</p>
      </div>
    `;
    return;
  }

  const cardsHtml = data.map((item, index) => `
    <div class="result-card" style="animation-delay: ${index * 0.1}s">
      <div style="margin-bottom: 15px; color: white; font-weight: 600; font-size: 1.1rem;">
        <span><i class="fas fa-calendar-alt" style="margin-right: 6px;"></i> Tanggal Kirim: ${formatTanggalKirim(item.noLC)}</span>
        <span style="background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 12px; font-size: 0.9rem;">Status: ${item.status || 'N/A'}</span>
      </div>
      <div class="card-header">
        <div class="order-icon">
          <i class="fas fa-box"></i>
        </div>
        <div class="order-number">${item.noOrder}</div>
      </div>
      <div class="card-grid">
        <div class="info-group"><div class="info-label">Kode Store</div><div class="info-value">${item.kodeStore}</div></div>
        <div class="info-group"><div class="info-label">Store Booking</div><div class="info-value">${item.storeName}</div></div>
        <div class="info-group"><div class="info-label">Nama Customer</div><div class="info-value">${item.name}</div></div>
        <div class="info-group"><div class="info-label">No LC</div><div class="info-value">${item.noLC}</div></div>
        <div class="info-group"><div class="info-label">Delivery Via</div><div class="info-value">${item.delivery}</div></div>
        <div class="info-group"><div class="info-label">Via Hub</div><div class="info-value">${item.viaHub}</div></div>
      </div>
    </div>
  `).join('');

  hasilPencarianDiv.innerHTML = cardsHtml;

  const actionButtons = document.createElement('div');
  actionButtons.className = 'action-buttons';
  actionButtons.innerHTML = `
    <button class="action-btn btn-success" onclick="resetPencarian()">
      <i class="fas fa-redo"></i> Cari Ulang
    </button>
    <button class="action-btn btn-danger" onclick="tutupHasil()">
      <i class="fas fa-times"></i> Tutup Hasil
    </button>
  `;
  hasilPencarianDiv.appendChild(actionButtons);
  showNotification('Data berhasil ditemukan!', 'success');
}

function tampilkanKesalahan(error) {
  loadingDiv.style.display = 'none';
  hasilPencarianDiv.innerHTML = `
    <div class="no-results">
      <i class="fas fa-exclamation-triangle"></i>
      <h3>Terjadi Kesalahan</h3>
      <p>${error}</p>
    </div>
  `;
  showNotification('Terjadi kesalahan saat mencari data.', 'error');
}

function resetPencarian() {
  hasilPencarianDiv.innerHTML = '';
  searchInput.value = '';
  searchInput.focus();
  searchInput.style.borderColor = 'rgba(255, 255, 255, 0.2)';
}

function tutupHasil() {
  hasilPencarianDiv.innerHTML = '';
}
