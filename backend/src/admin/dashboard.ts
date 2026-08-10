export const dashboardPage = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SASTEK Admin — Dashboard</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --navy:   #0a0f1e;
      --panel:  #111827;
      --panel2: #1a2332;
      --border: #1e2d45;
      --signal: #00d4ff;
      --signal-soft: rgba(0, 212, 255, 0.10);
      --text:   #e2e8f0;
      --muted:  #64748b;
      --success:#34d399;
      --error:  #f87171;
      --warn:   #fbbf24;
    }
    body { font-family:'Inter',sans-serif; background:var(--navy); color:var(--text); min-height:100vh; }

    /* Layout */
    .layout { display:flex; min-height:100vh; }
    .sidebar {
      width:220px; flex-shrink:0;
      background:var(--panel);
      border-right:1px solid var(--border);
      display:flex; flex-direction:column;
      padding:24px 0;
      position:sticky; top:0; height:100vh;
    }
    .brand {
      padding:0 20px 24px;
      border-bottom:1px solid var(--border);
      margin-bottom:16px;
    }
    .brand-dot { width:8px;height:8px;border-radius:50%;background:var(--signal);box-shadow:0 0 6px var(--signal);display:inline-block;margin-right:8px;animation:pulse 2s infinite; }
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
    .brand h2 { font-size:.85rem;font-weight:700;letter-spacing:.1em; }
    .brand p  { font-size:.65rem;color:var(--muted);margin-top:2px; }

    nav a {
      display:flex;align-items:center;gap:10px;
      padding:9px 20px;
      font-size:.8rem;font-weight:500;
      color:var(--muted);text-decoration:none;
      border-left:2px solid transparent;
      transition:all .15s;
    }
    nav a:hover, nav a.active {
      color:var(--signal);
      border-left-color:var(--signal);
      background:var(--signal-soft);
    }
    nav .section-label {
      font-size:.6rem;letter-spacing:.12em;color:var(--muted);
      padding:14px 20px 4px;font-weight:600;
    }
    .sidebar-bottom { margin-top:auto; padding:16px 20px; }
    .logout-btn {
      width:100%;padding:8px;background:transparent;border:1px solid var(--border);
      border-radius:6px;color:var(--muted);font-size:.75rem;font-family:inherit;
      cursor:pointer;transition:all .15s;
    }
    .logout-btn:hover { border-color:var(--error);color:var(--error); }

    /* Main content */
    .main { flex:1; padding:32px; max-width:1100px; }
    .page { display:none; }
    .page.active { display:block; }
    h1 { font-size:1.25rem;font-weight:700;margin-bottom:4px; }
    .page-sub { font-size:.8rem;color:var(--muted);margin-bottom:28px; }

    /* Stats */
    .stats { display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:14px;margin-bottom:32px; }
    .stat-card {
      background:var(--panel);border:1px solid var(--border);border-radius:10px;
      padding:18px 20px;
    }
    .stat-card .label { font-size:.7rem;color:var(--muted);letter-spacing:.08em;margin-bottom:6px; }
    .stat-card .value { font-size:1.6rem;font-weight:700;color:var(--signal); }

    /* Table */
    .toolbar { display:flex;justify-content:space-between;align-items:center;margin-bottom:14px; }
    .btn {
      padding:8px 16px;border-radius:7px;font-size:.8rem;font-weight:600;
      font-family:inherit;cursor:pointer;border:none;transition:opacity .15s;
    }
    .btn-primary { background:var(--signal);color:var(--navy); }
    .btn-primary:hover { opacity:.85; }
    .btn-danger  { background:transparent;border:1px solid var(--error);color:var(--error); }
    .btn-danger:hover  { background:var(--error);color:var(--navy); }
    .btn-sm { padding:5px 10px;font-size:.75rem; }

    table { width:100%;border-collapse:collapse;font-size:.8rem; }
    th { text-align:left;padding:10px 12px;font-size:.65rem;font-weight:600;letter-spacing:.08em;color:var(--muted);border-bottom:1px solid var(--border); }
    td { padding:10px 12px;border-bottom:1px solid rgba(30,45,69,.5);vertical-align:middle; }
    tr:hover td { background:rgba(255,255,255,.02); }
    .badge {
      display:inline-flex;align-items:center;gap:4px;
      font-size:.65rem;font-weight:600;letter-spacing:.05em;
      padding:2px 8px;border-radius:20px;
    }
    .badge-active  { background:rgba(52,211,153,.12);color:var(--success); }
    .badge-inactive{ background:rgba(248,113,113,.12);color:var(--error); }
    .badge-gold    { background:rgba(251,191,36,.12);color:var(--warn); }
    .badge-silver  { background:rgba(148,163,184,.12);color:#94a3b8; }
    .badge-platinum{ background:rgba(0,212,255,.12);color:var(--signal); }

    .logo-thumb { width:36px;height:36px;border-radius:6px;object-fit:contain;background:rgba(255,255,255,.05);padding:2px; }

    /* Modal */
    .modal-backdrop {
      display:none;position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:100;
      align-items:center;justify-content:center;
    }
    .modal-backdrop.open { display:flex; }
    .modal {
      background:var(--panel);border:1px solid var(--border);border-radius:14px;
      padding:28px;width:100%;max-width:500px;max-height:90vh;overflow-y:auto;
    }
    .modal h3 { font-size:1rem;font-weight:600;margin-bottom:20px; }
    .form-field { margin-bottom:16px; }
    .form-field label { display:block;font-size:.72rem;color:var(--muted);margin-bottom:5px;letter-spacing:.05em; }
    .form-field input, .form-field select, .form-field textarea {
      width:100%;padding:9px 12px;
      background:rgba(255,255,255,.04);border:1px solid var(--border);
      border-radius:7px;color:var(--text);font-size:.83rem;font-family:inherit;
      outline:none;transition:border-color .15s;
    }
    .form-field input:focus, .form-field select:focus, .form-field textarea:focus { border-color:var(--signal); }
    .form-field textarea { resize:vertical;min-height:80px; }
    select option { background:var(--panel2); }
    .modal-actions { display:flex;gap:10px;justify-content:flex-end;margin-top:20px; }
    .btn-ghost { background:transparent;border:1px solid var(--border);color:var(--muted);padding:8px 16px;border-radius:7px;font-size:.8rem;font-family:inherit;cursor:pointer; }
    .btn-ghost:hover { border-color:var(--text);color:var(--text); }

    /* Upload area */
    .upload-area {
      border:2px dashed var(--border);border-radius:8px;padding:20px;
      text-align:center;cursor:pointer;transition:border-color .15s;font-size:.8rem;color:var(--muted);
    }
    .upload-area:hover { border-color:var(--signal); }
    .upload-preview { margin-top:10px; }
    .upload-preview img { max-width:100%;max-height:120px;border-radius:6px;object-fit:contain; }

    /* Toast */
    #toast {
      position:fixed;bottom:24px;right:24px;
      background:var(--panel2);border:1px solid var(--border);
      padding:12px 18px;border-radius:8px;font-size:.8rem;
      transform:translateY(80px);opacity:0;transition:all .3s;z-index:200;
    }
    #toast.show { transform:translateY(0);opacity:1; }
    #toast.success { border-color:var(--success);color:var(--success); }
    #toast.error   { border-color:var(--error);  color:var(--error); }
  </style>
</head>
<body>

<div class="layout">

  <!-- Sidebar -->
  <aside class="sidebar">
    <div class="brand">
      <span class="brand-dot"></span>
      <h2 style="display:inline">SASTEK</h2>
      <p>Admin Paneli</p>
    </div>
    <nav>
      <p class="section-label">GENEL</p>
      <a href="#" class="active" data-page="dashboard">📊 Dashboard</a>
      <p class="section-label">İÇERİK</p>
      <a href="#" data-page="shops">🏪 Anlaşmalı Noktalar</a>
      <a href="#" data-page="sponsors">🤝 Sponsorlar</a>
      <a href="#" data-page="gallery">🖼️ Galeri</a>
    </nav>
    <div class="sidebar-bottom">
      <button class="logout-btn" id="logoutBtn">Çıkış Yap</button>
    </div>
  </aside>

  <!-- Main -->
  <main class="main">

    <!-- Dashboard -->
    <div class="page active" id="page-dashboard">
      <h1>Dashboard</h1>
      <p class="page-sub">SASTEK yönetim paneline hoş geldiniz.</p>
      <div class="stats" id="statsGrid">
        <div class="stat-card"><div class="label">ANLAŞMALI NOKTA</div><div class="value" id="stat-shops">—</div></div>
        <div class="stat-card"><div class="label">SPONSOR</div><div class="value" id="stat-sponsors">—</div></div>
        <div class="stat-card"><div class="label">GALERİ FOTOĞRAF</div><div class="value" id="stat-gallery">—</div></div>
      </div>
    </div>

    <!-- Shops -->
    <div class="page" id="page-shops">
      <h1>Anlaşmalı Noktalar</h1>
      <p class="page-sub">Partner işletmeleri yönetin.</p>
      <div class="toolbar">
        <span id="shopCount" style="font-size:.8rem;color:var(--muted)"></span>
        <button class="btn btn-primary" onclick="openShopModal()">+ Yeni Ekle</button>
      </div>
      <table>
        <thead><tr><th>LOGO</th><th>İSİM</th><th>KATEGORİ</th><th>İNDİRİM</th><th>DURUM</th><th>İŞLEM</th></tr></thead>
        <tbody id="shopTable"></tbody>
      </table>
    </div>

    <!-- Sponsors -->
    <div class="page" id="page-sponsors">
      <h1>Sponsorlar</h1>
      <p class="page-sub">Sponsor kurumları yönetin.</p>
      <div class="toolbar">
        <span id="sponsorCount" style="font-size:.8rem;color:var(--muted)"></span>
        <button class="btn btn-primary" onclick="openSponsorModal()">+ Yeni Ekle</button>
      </div>
      <table>
        <thead><tr><th>LOGO</th><th>İSİM</th><th>WEBSİTE</th><th>SEVİYE</th><th>DURUM</th><th>İŞLEM</th></tr></thead>
        <tbody id="sponsorTable"></tbody>
      </table>
    </div>

    <!-- Gallery -->
    <div class="page" id="page-gallery">
      <h1>Galeri</h1>
      <p class="page-sub">Fotoğraf ve etkinlik görsellerini yönetin.</p>
      <div class="toolbar">
        <span id="galleryCount" style="font-size:.8rem;color:var(--muted)"></span>
        <button class="btn btn-primary" onclick="openGalleryModal()">+ Fotoğraf Yükle</button>
      </div>
      <table>
        <thead><tr><th>GÖRSEL</th><th>ETİKET</th><th>BOYUT</th><th>YÜKLENDİ</th><th>İŞLEM</th></tr></thead>
        <tbody id="galleryTable"></tbody>
      </table>
    </div>

  </main>
</div>

<!-- Shop Modal -->
<div class="modal-backdrop" id="shopModal">
  <div class="modal">
    <h3 id="shopModalTitle">Yeni Anlaşmalı Nokta</h3>
    <input type="hidden" id="shopId" />
    <div class="form-field"><label>İŞLETME ADI *</label><input id="shopName" placeholder="Örn: Cafe Espresso" /></div>
    <div class="form-field"><label>KATEGORİ</label>
      <select id="shopCategory"><option value="">Seçiniz...</option></select>
    </div>
    <div class="form-field"><label>İNDİRİM</label><input id="shopDiscount" placeholder="Örn: %10, %5-20" /></div>
    <div class="form-field"><label>AÇIKLAMA (TR)</label><textarea id="shopDescTr" placeholder="Türkçe açıklama..."></textarea></div>
    <div class="form-field"><label>AÇIKLAMA (EN)</label><textarea id="shopDescEn" placeholder="English description..."></textarea></div>
    <div class="form-field"><label>LOGO YÜKLE</label>
      <div class="upload-area" id="shopLogoArea" onclick="document.getElementById('shopLogoFile').click()">
        📎 Tıkla veya sürükle (maks. 5MB, JPG/PNG/WebP)
        <div class="upload-preview" id="shopLogoPreview"></div>
      </div>
      <input type="file" id="shopLogoFile" accept="image/jpeg,image/png,image/webp" style="display:none" />
    </div>
    <div class="form-field"><label>LOGO URL (mevcut)</label><input id="shopLogoUrl" placeholder="https://..." /></div>
    <div class="form-field"><label>WEBSİTE</label><input id="shopWebsite" placeholder="https://..." /></div>
    <div class="form-field"><label>ADRES</label><input id="shopAddress" /></div>
    <div class="form-field"><label>TELEFON</label><input id="shopPhone" /></div>
    <div class="form-field"><label>DURUM</label>
      <select id="shopActive"><option value="1">Aktif</option><option value="0">Pasif</option></select>
    </div>
    <div class="modal-actions">
      <button class="btn-ghost" onclick="closeModal('shopModal')">İptal</button>
      <button class="btn btn-primary" onclick="saveShop()">Kaydet</button>
    </div>
  </div>
</div>

<!-- Sponsor Modal -->
<div class="modal-backdrop" id="sponsorModal">
  <div class="modal">
    <h3 id="sponsorModalTitle">Yeni Sponsor</h3>
    <input type="hidden" id="sponsorId" />
    <div class="form-field"><label>SPONSOR ADI *</label><input id="sponsorName" /></div>
    <div class="form-field"><label>SEVİYE</label>
      <select id="sponsorTier">
        <option value="standard">Standard</option>
        <option value="silver">Silver</option>
        <option value="gold">Gold</option>
        <option value="platinum">Platinum</option>
      </select>
    </div>
    <div class="form-field"><label>LOGO YÜKLE</label>
      <div class="upload-area" onclick="document.getElementById('sponsorLogoFile').click()">
        📎 Tıkla veya sürükle
        <div class="upload-preview" id="sponsorLogoPreview"></div>
      </div>
      <input type="file" id="sponsorLogoFile" accept="image/jpeg,image/png,image/webp" style="display:none" />
    </div>
    <div class="form-field"><label>LOGO URL (mevcut)</label><input id="sponsorLogoUrl" /></div>
    <div class="form-field"><label>WEBSİTE</label><input id="sponsorWebsite" placeholder="https://..." /></div>
    <div class="form-field"><label>DURUM</label>
      <select id="sponsorActive"><option value="1">Aktif</option><option value="0">Pasif</option></select>
    </div>
    <div class="modal-actions">
      <button class="btn-ghost" onclick="closeModal('sponsorModal')">İptal</button>
      <button class="btn btn-primary" onclick="saveSponsor()">Kaydet</button>
    </div>
  </div>
</div>

<!-- Gallery Modal -->
<div class="modal-backdrop" id="galleryModal">
  <div class="modal">
    <h3>Fotoğraf Yükle</h3>
    <div class="form-field"><label>FOTOĞRAF SEÇ *</label>
      <div class="upload-area" onclick="document.getElementById('galleryFile').click()">
        📎 Tıkla veya sürükle (maks. 5MB)
        <div class="upload-preview" id="galleryPreview"></div>
      </div>
      <input type="file" id="galleryFile" accept="image/jpeg,image/png,image/webp,image/gif" style="display:none" multiple />
    </div>
    <div class="form-field"><label>ETİKET (etkinlik adı)</label><input id="galleryTag" placeholder="Örn: teknik-gezi-2024" /></div>
    <div class="form-field"><label>AÇIKLAMA (TR)</label><input id="galleryCaptionTr" /></div>
    <div class="form-field"><label>AÇIKLAMA (EN)</label><input id="galleryCaptionEn" /></div>
    <div class="modal-actions">
      <button class="btn-ghost" onclick="closeModal('galleryModal')">İptal</button>
      <button class="btn btn-primary" onclick="uploadGallery()">Yükle</button>
    </div>
  </div>
</div>

<div id="toast"></div>

<script>
const API = '';  // same origin

// ── Navigation ───────────────────────────────────────────────────────────────
document.querySelectorAll('nav a').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const page = a.dataset.page;
    document.querySelectorAll('nav a').forEach(x => x.classList.remove('active'));
    document.querySelectorAll('.page').forEach(x => x.classList.remove('active'));
    a.classList.add('active');
    document.getElementById('page-' + page).classList.add('active');
    if (page === 'shops') loadShops();
    if (page === 'sponsors') loadSponsors();
    if (page === 'gallery') loadGallery();
  });
});

// ── Toast ─────────────────────────────────────────────────────────────────────
function toast(msg, type = 'success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'show ' + type;
  setTimeout(() => t.className = '', 3000);
}

// ── Logout ────────────────────────────────────────────────────────────────────
document.getElementById('logoutBtn').onclick = async () => {
  await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
  window.location.href = '/admin/';
};

// ── Auth guard ────────────────────────────────────────────────────────────────
async function checkAuth() {
  const r = await fetch('/api/auth/me', { credentials: 'include' });
  if (!r.ok) window.location.href = '/admin/';
}

// ── Modal helpers ─────────────────────────────────────────────────────────────
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

// ── File Upload helper ────────────────────────────────────────────────────────
async function uploadFile(file, folder) {
  const fd = new FormData();
  fd.append('file', file);
  fd.append('folder', folder);
  const r = await fetch('/api/upload', { method: 'POST', credentials: 'include', body: fd });
  if (!r.ok) throw new Error('Upload failed');
  return (await r.json()).url;
}

// ── Dashboard Stats ───────────────────────────────────────────────────────────
async function loadStats() {
  const [shops, sponsors, gallery] = await Promise.all([
    fetch('/api/shops/admin/all', { credentials: 'include' }).then(r => r.json()),
    fetch('/api/sponsors/admin/all', { credentials: 'include' }).then(r => r.json()),
    fetch('/api/gallery', { credentials: 'include' }).then(r => r.json()),
  ]);
  document.getElementById('stat-shops').textContent = shops.length;
  document.getElementById('stat-sponsors').textContent = sponsors.length;
  document.getElementById('stat-gallery').textContent = gallery.length;
}

// ── Shops ─────────────────────────────────────────────────────────────────────
let categories = [];
async function loadShops() {
  categories = await fetch('/api/shops/categories').then(r => r.json());
  const shops = await fetch('/api/shops/admin/all', { credentials: 'include' }).then(r => r.json());
  document.getElementById('shopCount').textContent = shops.length + ' kayıt';

  const sel = document.getElementById('shopCategory');
  sel.innerHTML = '<option value="">Seçiniz...</option>';
  categories.forEach(c => sel.innerHTML += \`<option value="\${c.id}">\${c.icon || ''} \${c.name_tr}</option>\`);

  document.getElementById('shopTable').innerHTML = shops.map(s => \`
    <tr>
      <td>\${s.logo_url ? \`<img class="logo-thumb" src="\${s.logo_url}" alt="" />\` : '—'}</td>
      <td>\${s.name}</td>
      <td>\${s.category_tr || '—'}</td>
      <td>\${s.discount || '—'}</td>
      <td><span class="badge \${s.is_active ? 'badge-active' : 'badge-inactive'}">\${s.is_active ? 'Aktif' : 'Pasif'}</span></td>
      <td style="display:flex;gap:6px">
        <button class="btn btn-sm btn-primary" onclick="editShop(\${JSON.stringify(s).split('"').join('&quot;')})">Düzenle</button>
        <button class="btn btn-sm btn-danger" onclick="deleteShop(\${s.id})">Sil</button>
      </td>
    </tr>
  \`).join('');
}

function openShopModal(shop = null) {
  document.getElementById('shopId').value = shop?.id || '';
  document.getElementById('shopModalTitle').textContent = shop ? 'Düzenle' : 'Yeni Anlaşmalı Nokta';
  document.getElementById('shopName').value = shop?.name || '';
  document.getElementById('shopCategory').value = shop?.category_id || '';
  document.getElementById('shopDiscount').value = shop?.discount || '';
  document.getElementById('shopDescTr').value = shop?.description_tr || '';
  document.getElementById('shopDescEn').value = shop?.description_en || '';
  document.getElementById('shopLogoUrl').value = shop?.logo_url || '';
  document.getElementById('shopWebsite').value = shop?.website || '';
  document.getElementById('shopAddress').value = shop?.address || '';
  document.getElementById('shopPhone').value = shop?.phone || '';
  document.getElementById('shopActive').value = String(shop?.is_active ?? 1);
  document.getElementById('shopLogoPreview').innerHTML = '';
  openModal('shopModal');
}
function editShop(s) { openShopModal(s); }

async function saveShop() {
  const id = document.getElementById('shopId').value;
  const logoFile = document.getElementById('shopLogoFile').files[0];
  let logoUrl = document.getElementById('shopLogoUrl').value;
  if (logoFile) {
    try { logoUrl = await uploadFile(logoFile, 'logos'); }
    catch { toast('Logo yüklenemedi', 'error'); return; }
  }
  const body = {
    name: document.getElementById('shopName').value,
    category_id: document.getElementById('shopCategory').value || null,
    discount: document.getElementById('shopDiscount').value,
    description_tr: document.getElementById('shopDescTr').value,
    description_en: document.getElementById('shopDescEn').value,
    logo_url: logoUrl,
    website: document.getElementById('shopWebsite').value,
    address: document.getElementById('shopAddress').value,
    phone: document.getElementById('shopPhone').value,
    is_active: parseInt(document.getElementById('shopActive').value),
  };
  const url = id ? \`/api/shops/\${id}\` : '/api/shops';
  const method = id ? 'PUT' : 'POST';
  const r = await fetch(url, { method, credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (r.ok) { closeModal('shopModal'); toast('Kaydedildi ✓'); loadShops(); }
  else toast('Hata oluştu', 'error');
}

async function deleteShop(id) {
  if (!confirm('Bu kaydı silmek istediğinize emin misiniz?')) return;
  await fetch(\`/api/shops/\${id}\`, { method: 'DELETE', credentials: 'include' });
  toast('Silindi'); loadShops();
}

// ── Sponsors ──────────────────────────────────────────────────────────────────
async function loadSponsors() {
  const sponsors = await fetch('/api/sponsors/admin/all', { credentials: 'include' }).then(r => r.json());
  document.getElementById('sponsorCount').textContent = sponsors.length + ' kayıt';
  document.getElementById('sponsorTable').innerHTML = sponsors.map(s => \`
    <tr>
      <td>\${s.logo_url ? \`<img class="logo-thumb" src="\${s.logo_url}" alt="" />\` : '—'}</td>
      <td>\${s.name}</td>
      <td>\${s.website ? \`<a href="\${s.website}" target="_blank" style="color:var(--signal);font-size:.75rem">\${s.website}</a>\` : '—'}</td>
      <td><span class="badge badge-\${s.tier}">\${s.tier}</span></td>
      <td><span class="badge \${s.is_active ? 'badge-active' : 'badge-inactive'}">\${s.is_active ? 'Aktif' : 'Pasif'}</span></td>
      <td style="display:flex;gap:6px">
        <button class="btn btn-sm btn-primary" onclick="editSponsor(\${JSON.stringify(s).split('"').join('&quot;')})">Düzenle</button>
        <button class="btn btn-sm btn-danger" onclick="deleteSponsor(\${s.id})">Sil</button>
      </td>
    </tr>
  \`).join('');
}

function openSponsorModal(s = null) {
  document.getElementById('sponsorId').value = s?.id || '';
  document.getElementById('sponsorModalTitle').textContent = s ? 'Düzenle' : 'Yeni Sponsor';
  document.getElementById('sponsorName').value = s?.name || '';
  document.getElementById('sponsorTier').value = s?.tier || 'standard';
  document.getElementById('sponsorLogoUrl').value = s?.logo_url || '';
  document.getElementById('sponsorWebsite').value = s?.website || '';
  document.getElementById('sponsorActive').value = String(s?.is_active ?? 1);
  document.getElementById('sponsorLogoPreview').innerHTML = '';
  openModal('sponsorModal');
}
function editSponsor(s) { openSponsorModal(s); }

async function saveSponsor() {
  const id = document.getElementById('sponsorId').value;
  const logoFile = document.getElementById('sponsorLogoFile').files[0];
  let logoUrl = document.getElementById('sponsorLogoUrl').value;
  if (logoFile) {
    try { logoUrl = await uploadFile(logoFile, 'sponsors'); }
    catch { toast('Logo yüklenemedi', 'error'); return; }
  }
  const body = {
    name: document.getElementById('sponsorName').value,
    tier: document.getElementById('sponsorTier').value,
    logo_url: logoUrl,
    website: document.getElementById('sponsorWebsite').value,
    is_active: parseInt(document.getElementById('sponsorActive').value),
  };
  const url = id ? \`/api/sponsors/\${id}\` : '/api/sponsors';
  const method = id ? 'PUT' : 'POST';
  const r = await fetch(url, { method, credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (r.ok) { closeModal('sponsorModal'); toast('Kaydedildi ✓'); loadSponsors(); }
  else toast('Hata oluştu', 'error');
}

async function deleteSponsor(id) {
  if (!confirm('Silmek istediğinize emin misiniz?')) return;
  await fetch(\`/api/sponsors/\${id}\`, { method: 'DELETE', credentials: 'include' });
  toast('Silindi'); loadSponsors();
}

// ── Gallery ───────────────────────────────────────────────────────────────────
async function loadGallery() {
  const items = await fetch('/api/gallery', { credentials: 'include' }).then(r => r.json());
  document.getElementById('galleryCount').textContent = items.length + ' fotoğraf';
  document.getElementById('galleryTable').innerHTML = items.map(g => \`
    <tr>
      <td><img class="logo-thumb" src="\${g.url}" alt="" style="width:48px;height:36px" /></td>
      <td>\${g.event_tag || '—'}</td>
      <td>\${g.file_size ? Math.round(g.file_size/1024) + ' KB' : '—'}</td>
      <td style="font-size:.75rem;color:var(--muted)">\${g.uploaded_at?.slice(0,10) || ''}</td>
      <td><button class="btn btn-sm btn-danger" onclick="deleteGallery(\${g.id})">Sil</button></td>
    </tr>
  \`).join('');
}

function openGalleryModal() {
  document.getElementById('galleryFile').value = '';
  document.getElementById('galleryPreview').innerHTML = '';
  document.getElementById('galleryTag').value = '';
  document.getElementById('galleryCaptionTr').value = '';
  document.getElementById('galleryCaptionEn').value = '';
  openModal('galleryModal');
}

// Preview on file select
document.getElementById('galleryFile')?.addEventListener('change', e => {
  const preview = document.getElementById('galleryPreview');
  preview.innerHTML = '';
  Array.from(e.target.files).forEach(f => {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(f);
    img.style.cssText = 'max-height:80px;margin:4px;border-radius:4px';
    preview.appendChild(img);
  });
});
document.getElementById('shopLogoFile')?.addEventListener('change', e => {
  const f = e.target.files[0]; if (!f) return;
  const img = document.createElement('img');
  img.src = URL.createObjectURL(f);
  document.getElementById('shopLogoPreview').innerHTML = '';
  document.getElementById('shopLogoPreview').appendChild(img);
});
document.getElementById('sponsorLogoFile')?.addEventListener('change', e => {
  const f = e.target.files[0]; if (!f) return;
  const img = document.createElement('img');
  img.src = URL.createObjectURL(f);
  document.getElementById('sponsorLogoPreview').innerHTML = '';
  document.getElementById('sponsorLogoPreview').appendChild(img);
});

async function uploadGallery() {
  const files = document.getElementById('galleryFile').files;
  if (!files.length) { toast('Dosya seçin', 'error'); return; }
  const tag = document.getElementById('galleryTag').value;
  const capTr = document.getElementById('galleryCaptionTr').value;
  const capEn = document.getElementById('galleryCaptionEn').value;
  let ok = 0;
  for (const file of files) {
    try {
      const url = await uploadFile(file, 'gallery');
      await fetch('/api/gallery', {
        method: 'POST', credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, event_tag: tag || null, caption_tr: capTr || null, caption_en: capEn || null, file_size: file.size }),
      });
      ok++;
    } catch { toast('Bir dosya yüklenemedi', 'error'); }
  }
  closeModal('galleryModal');
  toast(\`\${ok} fotoğraf yüklendi ✓\`);
  loadGallery();
}

async function deleteGallery(id) {
  if (!confirm('Fotoğrafı silmek istediğinize emin misiniz?')) return;
  await fetch(\`/api/gallery/\${id}\`, { method: 'DELETE', credentials: 'include' });
  toast('Silindi'); loadGallery();
}

// ── Init ──────────────────────────────────────────────────────────────────────
checkAuth().then(loadStats);
</script>
</body>
</html>`;
