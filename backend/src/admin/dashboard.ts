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
      --border-subtle: rgba(30, 45, 69, 0.5);
      --signal: #00d4ff;
      --signal-soft: rgba(0, 212, 255, 0.10);
      --text:   #e2e8f0;
      --muted:  #718096;
      --success:#34d399;
      --error:  #f87171;
      --warn:   #fbbf24;
    }
    body { font-family:'Inter',sans-serif; background:var(--navy); color:var(--text); min-height:100vh; line-height:1.5; }

    .layout { display:flex; min-height:100vh; }
    .sidebar {
      width:220px; flex-shrink:0;
      background:var(--panel);
      border-right:1px solid var(--border);
      display:flex; flex-direction:column;
      padding:20px 0;
      position:sticky; top:0; height:100vh;
    }
    .brand {
      padding:0 18px 18px;
      border-bottom:1px solid var(--border);
      margin-bottom:12px;
    }
    .brand-dot { width:7px;height:7px;border-radius:50%;background:var(--signal);box-shadow:0 0 8px var(--signal);display:inline-block;margin-right:8px;animation:pulse 2s infinite; }
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
    .brand h2 { font-size:.85rem;font-weight:700;letter-spacing:.1em;color:#fff; }
    .brand p  { font-size:.65rem;color:var(--muted);margin-top:2px; }

    nav a {
      display:flex;align-items:center;gap:10px;
      padding:8px 14px; margin:2px 10px; border-radius:6px;
      font-size:.78rem;font-weight:500;
      color:var(--muted);text-decoration:none;
      transition:all .15s;
    }
    nav a:hover {
      color:var(--text); background:rgba(255,255,255,.04);
    }
    nav a.active {
      color:var(--signal);
      background:var(--signal-soft);
      font-weight:600;
    }
    nav .section-label {
      font-size:.58rem;letter-spacing:.12em;color:var(--muted);
      padding:12px 18px 4px;font-weight:600;
    }
    .sidebar-bottom { margin-top:auto; padding:12px 14px; }
    .logout-btn {
      width:100%;padding:7px;background:transparent;border:1px solid var(--border);
      border-radius:6px;color:var(--muted);font-size:.72rem;font-family:inherit;
      cursor:pointer;transition:all .15s;
    }
    .logout-btn:hover { border-color:var(--error);color:var(--error);background:rgba(248,113,113,.06); }

    .main { flex:1; padding:24px 32px; max-width:1320px; }
    .page { display:none; }
    .page.active { display:block; }

    .page-header {
      display:flex; justify-content:space-between; align-items:flex-start;
      margin-bottom:18px; gap:16px;
    }
    .page-header h1 { font-size:1.2rem;font-weight:700;color:#fff;margin-bottom:2px; }
    .page-header .page-sub { font-size:.78rem;color:var(--muted);margin-bottom:0; }

    .stats { display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;margin-bottom:24px; }
    .stat-card {
      background:var(--panel);border:1px solid var(--border);border-radius:8px;
      padding:16px 18px;
    }
    .stat-card .label { font-size:.68rem;color:var(--muted);letter-spacing:.08em;margin-bottom:4px;font-weight:500; }
    .stat-card .value { font-size:1.5rem;font-weight:700;color:var(--signal); }

    /* Bulk Action Toolbar */
    .bulk-toolbar {
      display:flex; align-items:center; gap:8px;
      background:var(--panel); border:1px solid var(--border);
      padding:7px 12px; border-radius:8px; margin-bottom:14px;
      flex-wrap:wrap; font-size:.75rem;
    }
    .bulk-group { display:flex; align-items:center; gap:5px; }
    .bulk-group .group-title { font-size:.65rem; font-weight:600; color:var(--muted); text-transform:uppercase; letter-spacing:.05em; margin-right:2px; }
    .bulk-divider { width:1px; height:16px; background:var(--border); margin:0 3px; }
    .select-all-label { display:flex; align-items:center; gap:6px; font-size:.74rem; font-weight:500; color:var(--text); cursor:pointer; user-select:none; }

    /* Table Card */
    .table-card {
      background:var(--panel); border:1px solid var(--border);
      border-radius:10px; overflow:hidden;
    }
    .table-card-header {
      padding:10px 16px; border-bottom:1px solid var(--border);
      display:flex; justify-content:space-between; align-items:center;
      background:rgba(255,255,255,.01);
    }
    .table-card-header .card-title {
      font-size:.78rem; font-weight:600; color:var(--text); letter-spacing:.02em;
    }
    .table-responsive { width:100%; overflow-x:auto; }

    .btn {
      padding:7px 14px;border-radius:6px;font-size:.76rem;font-weight:600;
      font-family:inherit;cursor:pointer;border:1px solid transparent;transition:all .15s;
      display:inline-flex;align-items:center;gap:5px;line-height:1.2;
    }
    .btn-primary { background:var(--signal);color:var(--navy);border-color:var(--signal); }
    .btn-primary:hover { opacity:.9;transform:translateY(-1px); }
    .btn-secondary { background:var(--panel2);border-color:var(--border);color:var(--text); }
    .btn-secondary:hover { border-color:var(--signal);color:var(--signal); }
    .btn-danger  { background:rgba(248,113,113,.08);border-color:rgba(248,113,113,.3);color:var(--error); }
    .btn-danger:hover  { background:var(--error);color:var(--navy);border-color:var(--error); }
    .btn-sm { padding:4px 8px;font-size:.7rem; }

    table { width:100%;border-collapse:collapse;font-size:.78rem; }
    th {
      text-align:left;padding:9px 12px;font-size:.65rem;font-weight:600;
      letter-spacing:.08em;color:var(--muted);background:rgba(255,255,255,.02);
      border-bottom:1px solid var(--border); white-space:nowrap;
    }
    td { padding:9px 12px;border-bottom:1px solid var(--border-subtle);vertical-align:middle; }
    tr:last-child td { border-bottom:none; }
    tr:hover td { background:rgba(255,255,255,.025); }
    input[type="checkbox"] { accent-color:var(--signal);cursor:pointer;width:14px;height:14px; }

    .badge {
      display:inline-flex;align-items:center;gap:3px;
      font-size:.63rem;font-weight:600;letter-spacing:.04em;
      padding:2px 7px;border-radius:4px;
    }
    .badge-active  { background:rgba(52,211,153,.12);color:var(--success);border:1px solid rgba(52,211,153,.2); }
    .badge-inactive{ background:rgba(248,113,113,.12);color:var(--error);border:1px solid rgba(248,113,113,.2); }
    .badge-gold    { background:rgba(251,191,36,.12);color:var(--warn);border:1px solid rgba(251,191,36,.2); }
    .badge-silver  { background:rgba(148,163,184,.12);color:#94a3b8;border:1px solid rgba(148,163,184,.2); }
    .badge-platinum{ background:rgba(0,212,255,.12);color:var(--signal);border:1px solid rgba(0,212,255,.2); }
    .badge-standard{ background:rgba(100,116,139,.12);color:#94a3b8;border:1px solid rgba(100,116,139,.2); }

    .logo-thumb { width:38px;height:30px;border-radius:5px;object-fit:contain;background:rgba(255,255,255,.06);padding:2px; }

    .modal-backdrop {
      display:none;position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:100;
      align-items:center;justify-content:center;
    }
    .modal-backdrop.open { display:flex; }
    .modal {
      background:var(--panel);border:1px solid var(--border);border-radius:12px;
      padding:24px;width:100%;max-width:540px;max-height:90vh;overflow-y:auto;
    }
    .modal h3 { font-size:.95rem;font-weight:600;margin-bottom:18px;color:#fff; }
    .grid-2 { display:grid;grid-template-columns:1fr 1fr;gap:12px; }
    .form-field { margin-bottom:14px; }
    .form-field label { display:block;font-size:.7rem;color:var(--muted);margin-bottom:4px;letter-spacing:.05em;font-weight:500; }
    .form-field input, .form-field select, .form-field textarea {
      width:100%;padding:8px 11px;
      background:rgba(255,255,255,.04);border:1px solid var(--border);
      border-radius:6px;color:var(--text);font-size:.8rem;font-family:inherit;
      outline:none;transition:border-color .15s;
    }
    .form-field input:focus, .form-field select:focus, .form-field textarea:focus { border-color:var(--signal); }
    .form-field textarea { resize:vertical;min-height:75px; }
    select option { background:var(--panel2); }
    .modal-actions { display:flex;gap:10px;justify-content:flex-end;margin-top:18px; }
    .btn-ghost { background:transparent;border:1px solid var(--border);color:var(--muted);padding:7px 14px;border-radius:6px;font-size:.76rem;font-family:inherit;cursor:pointer; }
    .btn-ghost:hover { border-color:var(--text);color:var(--text); }

    .upload-area {
      border:2px dashed var(--border);border-radius:7px;padding:14px;
      text-align:center;cursor:pointer;transition:border-color .15s;font-size:.78rem;color:var(--muted);
    }
    .upload-area:hover { border-color:var(--signal); }
    .upload-preview { margin-top:8px; display:flex; flex-wrap:wrap; justify-content:center; gap:6px; }
    .upload-preview img { max-width:100%;max-height:90px;border-radius:5px;object-fit:contain;border:1px solid var(--border); }

    #toast {
      position:fixed;bottom:24px;right:24px;
      background:var(--panel2);border:1px solid var(--border);
      padding:10px 16px;border-radius:7px;font-size:.78rem;
      transform:translateY(80px);opacity:0;transition:all .3s;z-index:200;
    }
    #toast.show { transform:translateY(0);opacity:1; }
    #toast.success { border-color:var(--success);color:var(--success); }
    #toast.error   { border-color:var(--error);  color:var(--error); }
    #toast.info    { border-color:var(--signal); color:var(--signal); }
  </style>
</head>
<body>

<div class="layout">

  <!-- Sidebar -->
  <aside class="sidebar">
    <div class="brand">
      <span class="brand-dot"></span>
      <h2 style="display:inline">SASTEK</h2>
      <p>Yönetim Paneli</p>
    </div>
    <nav>
      <p class="section-label">GENEL</p>
      <a href="#" class="active" data-page="dashboard">📊 Dashboard</a>
      <p class="section-label">İÇERİK MODÜLLERİ</p>
      <a href="#" data-page="shops">🏪 Anlaşmalı Noktalar</a>
      <a href="#" data-page="events">📅 Etkinlikler</a>
      <a href="#" data-page="team">👥 Ekip & Yönetim</a>
      <a href="#" data-page="sponsors">🤝 Sponsorlar</a>
      <a href="#" data-page="socials">🌐 Sosyal Medya</a>
      <a href="#" data-page="gallery">🖼️ Galeri</a>
      <a href="#" data-page="qr">📱 QR Kodlar</a>
      <p class="section-label">SİSTEM & TEKNİK</p>
      <a href="#" data-page="developer">⚙️ Geliştirici Ayarları</a>
    </nav>
    <div class="sidebar-bottom">
      <button class="logout-btn" id="logoutBtn">Çıkış Yap</button>
    </div>
  </aside>

  <!-- Main -->
  <main class="main">

    <!-- Dashboard -->
    <div class="page active" id="page-dashboard">
      <div class="page-header">
        <div>
          <h1>Dashboard</h1>
          <p class="page-sub">SASTEK modüler içerik yönetim paneline hoş geldiniz.</p>
        </div>
      </div>
      <div class="stats" id="statsGrid">
        <div class="stat-card"><div class="label">ANLAŞMALI NOKTA</div><div class="value" id="stat-shops">—</div></div>
        <div class="stat-card"><div class="label">ETKİNLİK</div><div class="value" id="stat-events">—</div></div>
        <div class="stat-card"><div class="label">EKİP ÜYESİ</div><div class="value" id="stat-team">—</div></div>
        <div class="stat-card"><div class="label">SPONSOR</div><div class="value" id="stat-sponsors">—</div></div>
        <div class="stat-card"><div class="label">GALERİ FOTOĞRAF</div><div class="value" id="stat-gallery">—</div></div>
        <div class="stat-card"><div class="label">QR KOD & ANALİTİK</div><div class="value" id="stat-qr">—</div></div>
      </div>
    </div>

    <!-- Shops -->
    <div class="page" id="page-shops">
      <div class="page-header">
        <div>
          <h1>Anlaşmalı Noktalar</h1>
          <p class="page-sub">Partner işletmeleri, indirim oranlarını, harita konumlarını ve onay durumlarını yönetin.</p>
        </div>
        <button class="btn btn-primary" onclick="openShopModal()">+ Yeni Ekle</button>
      </div>

      <div class="bulk-toolbar">
        <div class="bulk-group">
          <label class="select-all-label">
            <input type="checkbox" id="selectAllShops" /> Tümünü Seç
          </label>
        </div>
        <div class="bulk-divider"></div>
        <div class="bulk-group">
          <span class="group-title">Özellik:</span>
          <button class="btn btn-secondary btn-sm" onclick="bulkSetField('shops', 'is_featured', 1, loadShops)">⭐ Öne Çıkar</button>
          <button class="btn btn-secondary btn-sm" onclick="bulkSetField('shops', 'is_featured', 0, loadShops)">Öne Çıkarma</button>
        </div>
        <div class="bulk-divider"></div>
        <div class="bulk-group">
          <span class="group-title">Harita:</span>
          <button class="btn btn-secondary btn-sm" onclick="bulkSetField('shops', 'show_on_map', 1, loadShops)">📍 Göster</button>
          <button class="btn btn-secondary btn-sm" onclick="bulkSetField('shops', 'show_on_map', 0, loadShops)">Gizle</button>
        </div>
        <div class="bulk-divider"></div>
        <div class="bulk-group">
          <span class="group-title">Durum:</span>
          <button class="btn btn-secondary btn-sm" onclick="bulkSetField('shops', 'is_verified', 1, loadShops)">✅ Doğrula</button>
          <button class="btn btn-secondary btn-sm" onclick="bulkSetStatus('shops', 1, loadShops)">Aktif</button>
          <button class="btn btn-secondary btn-sm" onclick="bulkSetStatus('shops', 0, loadShops)">Pasif</button>
        </div>
        <div class="bulk-group" style="margin-left:auto;">
          <button class="btn btn-danger btn-sm" onclick="bulkDelete('shops', loadShops)">🗑️ Sil</button>
        </div>
      </div>

      <div class="table-card">
        <div class="table-card-header">
          <span class="card-title">Anlaşmalı Noktalar Listesi</span>
        </div>
        <div class="table-responsive">
          <table>
            <thead><tr><th><input type="checkbox" id="selectAllShopsHeader" /></th><th>LOGO</th><th>İSİM</th><th>KATEGORİ</th><th>İNDİRİM</th><th>DURUM & ÖZELLİKLER</th><th>SIRA</th><th>İŞLEM</th></tr></thead>
            <tbody id="shopTable"></tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Events -->
    <div class="page" id="page-events">
      <div class="page-header">
        <div>
          <h1>Etkinlikler</h1>
          <p class="page-sub">Kulüp etkinliklerini, duyuruları, konum ve durum bilgilerini yönetin.</p>
        </div>
        <button class="btn btn-primary" onclick="openEventModal()">+ Yeni Etkinlik</button>
      </div>

      <div class="bulk-toolbar">
        <div class="bulk-group">
          <label class="select-all-label">
            <input type="checkbox" id="selectAllEvents" /> Tümünü Seç
          </label>
        </div>
        <div class="bulk-divider"></div>
        <div class="bulk-group">
          <span class="group-title">Görünürlük:</span>
          <button class="btn btn-secondary btn-sm" onclick="bulkSetStatus('events', 1, loadEvents)">👁️ Görünür Yap</button>
          <button class="btn btn-secondary btn-sm" onclick="bulkSetStatus('events', 0, loadEvents)">🙈 Görünmez Yap</button>
        </div>
        <div class="bulk-group" style="margin-left:auto;">
          <button class="btn btn-danger btn-sm" onclick="bulkDelete('events', loadEvents)">🗑️ Seçilenleri Sil</button>
        </div>
      </div>

      <div class="table-card">
        <div class="table-card-header">
          <span class="card-title">Etkinlik Listesi</span>
        </div>
        <div class="table-responsive">
          <table>
            <thead><tr><th><input type="checkbox" id="selectAllEventsHeader" /></th><th>GÖRSEL</th><th>BAŞLIK</th><th>KATEGORİ</th><th>SLUG</th><th>DURUM</th><th>İŞLEM</th></tr></thead>
            <tbody id="eventTable"></tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Team -->
    <div class="page" id="page-team">
      <div class="page-header">
        <div>
          <h1>Ekip & Yönetim</h1>
          <p class="page-sub">Kulüp yönetim kurulu ve ekip üyelerini yönetin.</p>
        </div>
        <button class="btn btn-primary" onclick="openTeamModal()">+ Üye Ekle</button>
      </div>

      <div class="bulk-toolbar">
        <div class="bulk-group">
          <label class="select-all-label">
            <input type="checkbox" id="selectAllTeam" /> Tümünü Seç
          </label>
        </div>
        <div class="bulk-divider"></div>
        <div class="bulk-group">
          <span class="group-title">Görünürlük:</span>
          <button class="btn btn-secondary btn-sm" onclick="bulkSetStatus('team', 1, loadTeam)">👁️ Görünür Yap</button>
          <button class="btn btn-secondary btn-sm" onclick="bulkSetStatus('team', 0, loadTeam)">🙈 Görünmez Yap</button>
        </div>
        <div class="bulk-group" style="margin-left:auto;">
          <button class="btn btn-danger btn-sm" onclick="bulkDelete('team', loadTeam)">🗑️ Seçilenleri Sil</button>
        </div>
      </div>

      <div class="table-card">
        <div class="table-card-header">
          <span class="card-title">Yönetim Kurulu & Ekip Listesi</span>
        </div>
        <div class="table-responsive">
          <table>
            <thead><tr><th><input type="checkbox" id="selectAllTeamHeader" /></th><th>İSİM</th><th>ROL (TR)</th><th>E-POSTA</th><th>SIRA</th><th>DURUM</th><th>İŞLEM</th></tr></thead>
            <tbody id="teamTable"></tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Sponsors -->
    <div class="page" id="page-sponsors">
      <div class="page-header">
        <div>
          <h1>Sponsorlar</h1>
          <p class="page-sub">Sponsor kurumları, destek seviyelerini ve bağlantılarını yönetin.</p>
        </div>
        <button class="btn btn-primary" onclick="openSponsorModal()">+ Yeni Ekle</button>
      </div>

      <div class="bulk-toolbar">
        <div class="bulk-group">
          <label class="select-all-label">
            <input type="checkbox" id="selectAllSponsors" /> Tümünü Seç
          </label>
        </div>
        <div class="bulk-divider"></div>
        <div class="bulk-group">
          <span class="group-title">Görünürlük:</span>
          <button class="btn btn-secondary btn-sm" onclick="bulkSetStatus('sponsors', 1, loadSponsors)">👁️ Görünür Yap</button>
          <button class="btn btn-secondary btn-sm" onclick="bulkSetStatus('sponsors', 0, loadSponsors)">🙈 Görünmez Yap</button>
        </div>
        <div class="bulk-group" style="margin-left:auto;">
          <button class="btn btn-danger btn-sm" onclick="bulkDelete('sponsors', loadSponsors)">🗑️ Seçilenleri Sil</button>
        </div>
      </div>

      <div class="table-card">
        <div class="table-card-header">
          <span class="card-title">Sponsor Listesi</span>
        </div>
        <div class="table-responsive">
          <table>
            <thead><tr><th><input type="checkbox" id="selectAllSponsorsHeader" /></th><th>LOGO</th><th>İSİM</th><th>WEBSİTE</th><th>SEVİYE</th><th>DURUM</th><th>İŞLEM</th></tr></thead>
            <tbody id="sponsorTable"></tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Socials -->
    <div class="page" id="page-socials">
      <div class="page-header">
        <div>
          <h1>Sosyal Medya</h1>
          <p class="page-sub">Resmi sosyal medya bağlantılarını ve sıralamasını yönetin.</p>
        </div>
        <button class="btn btn-primary" onclick="openSocialModal()">+ Yeni Link</button>
      </div>

      <div class="bulk-toolbar">
        <div class="bulk-group">
          <label class="select-all-label">
            <input type="checkbox" id="selectAllSocials" /> Tümünü Seç
          </label>
        </div>
        <div class="bulk-divider"></div>
        <div class="bulk-group">
          <span class="group-title">Görünürlük:</span>
          <button class="btn btn-secondary btn-sm" onclick="bulkSetStatus('socials', 1, loadSocials)">👁️ Görünür Yap</button>
          <button class="btn btn-secondary btn-sm" onclick="bulkSetStatus('socials', 0, loadSocials)">🙈 Görünmez Yap</button>
        </div>
        <div class="bulk-group" style="margin-left:auto;">
          <button class="btn btn-danger btn-sm" onclick="bulkDelete('socials', loadSocials)">🗑️ Seçilenleri Sil</button>
        </div>
      </div>

      <div class="table-card">
        <div class="table-card-header">
          <span class="card-title">Sosyal Medya Bağlantıları</span>
        </div>
        <div class="table-responsive">
          <table>
            <thead><tr><th><input type="checkbox" id="selectAllSocialsHeader" /></th><th>PLATFORM</th><th>LABEL</th><th>URL</th><th>SIRA</th><th>DURUM</th><th>İŞLEM</th></tr></thead>
            <tbody id="socialTable"></tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Gallery -->
    <div class="page" id="page-gallery">
      <div class="page-header">
        <div>
          <h1>Galeri</h1>
          <p class="page-sub">Etkinlik fotoğraflarını ve medya içeriklerini yönetin.</p>
        </div>
        <button class="btn btn-primary" onclick="openGalleryModal()">+ Fotoğraf Yükle</button>
      </div>

      <div class="bulk-toolbar">
        <div class="bulk-group">
          <label class="select-all-label">
            <input type="checkbox" id="selectAllGallery" /> Tümünü Seç
          </label>
        </div>
        <div class="bulk-group" style="margin-left:auto;">
          <button class="btn btn-danger btn-sm" onclick="bulkDelete('gallery', loadGallery)">🗑️ Seçilenleri Sil</button>
        </div>
      </div>

      <div class="table-card">
        <div class="table-card-header">
          <span class="card-title">Fotoğraf ve Medya Galerisi</span>
        </div>
        <div class="table-responsive">
          <table>
            <thead><tr><th><input type="checkbox" id="selectAllGalleryHeader" /></th><th>GÖRSEL</th><th>ETİKET</th><th>BOYUT</th><th>YÜKLENDİ</th><th>İŞLEM</th></tr></thead>
            <tbody id="galleryTable"></tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- QR Codes -->
    <div class="page" id="page-qr">
      <div class="page-header">
        <div>
          <h1>QR Kod Yönetimi</h1>
          <p class="page-sub">Dinamik yönlendirmeli QR kodları oluşturun, hedef URL'leri yönetin ve tarama analitiğini takip edin.</p>
        </div>
        <button class="btn btn-primary" onclick="openQrModal()">+ Yeni QR Oluştur</button>
      </div>

      <div class="bulk-toolbar">
        <div class="bulk-group">
          <label class="select-all-label">
            <input type="checkbox" id="selectAllQr" /> Tümünü Seç
          </label>
        </div>
        <div class="bulk-divider"></div>
        <div class="bulk-group">
          <span class="group-title">Durum:</span>
          <button class="btn btn-secondary btn-sm" onclick="bulkSetStatus('qr', 1, loadQrs)">👁️ Aktif Yap</button>
          <button class="btn btn-secondary btn-sm" onclick="bulkSetStatus('qr', 0, loadQrs)">🙈 Pasif Yap</button>
        </div>
        <div class="bulk-group" style="margin-left:auto;">
          <button class="btn btn-danger btn-sm" onclick="bulkDelete('qr', loadQrs)">🗑️ Seçilenleri Sil</button>
        </div>
      </div>

      <div class="table-card">
        <div class="table-card-header">
          <span class="card-title">Kayıtlı QR Kodlar & Analitik</span>
        </div>
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th><input type="checkbox" id="selectAllQrHeader" /></th>
                <th>QR ADI & SLUG</th>
                <th>HEDEF YÖNLENDİRME (TARGET)</th>
                <th>DURUM</th>
                <th>KİLİT</th>
                <th>TOPLAM</th>
                <th>BUGÜN / 7G</th>
                <th>SON TARAMA</th>
                <th>İŞLEM</th>
              </tr>
            </thead>
            <tbody id="qrTable"></tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Developer Settings -->
    <div class="page" id="page-developer">
      <div class="page-header">
        <div>
          <h1>Geliştirici Ayarları & Mimari</h1>
          <p class="page-sub">Sistem altyapısı, canlı veri akışı, performans ve duyuru bandı ayarları.</p>
        </div>
      </div>

      <div style="display:grid;gap:20px;">

        <!-- Card: Site Notice Banners Toggle -->
        <div class="stat-card" style="padding:22px;">
          <h3 style="font-size:1rem;color:var(--signal);margin-bottom:8px;display:flex;align-items:center;gap:8px;">📢 Site Uyarı Yazıları Kontrolü (Aç / Kapa)</h3>
          <p style="font-size:.8rem;color:var(--muted);margin-bottom:16px;">Sitedeki Anlaşmalı Noktalar ve Sponsorlar sayfalarında bulunan örnek/doğrulama bilgilendirme bantlarının görünürlüğünü tek tıkla yönetin.</p>

          <div style="display:grid;gap:14px;">
            <div style="display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);padding:14px 18px;border-radius:8px;border:1px solid var(--border);">
              <div>
                <b style="font-size:.85rem;color:var(--text)">🏪 Anlaşmalı Noktalar Uyarı Bandı</b>
                <p style="font-size:.75rem;color:var(--muted);margin-top:2px;">"Anlaşmalı noktalar doğrulanmış güncel liste ile değiştirilmek üzere örnek olarak gösterilmektedir."</p>
              </div>
              <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-weight:600;font-size:.8rem">
                <input type="checkbox" id="togglePartnersNotice" onchange="saveSiteSettings()" style="width:18px;height:18px;" />
                <span id="labelPartnersNotice">AÇIK</span>
              </label>
            </div>

            <div style="display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);padding:14px 18px;border-radius:8px;border:1px solid var(--border);">
              <div>
                <b style="font-size:.85rem;color:var(--text)">🤝 Sponsorlar Uyarı Bandı</b>
                <p style="font-size:.75rem;color:var(--muted);margin-top:2px;">"Sponsor kayıtları doğrulanmış güncel liste ile değiştirilmek üzere örnek olarak gösterilmektedir."</p>
              </div>
              <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-weight:600;font-size:.8rem">
                <input type="checkbox" id="toggleSponsorsNotice" onchange="saveSiteSettings()" style="width:18px;height:18px;" />
                <span id="labelSponsorsNotice">AÇIK</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Card 1: Live Hydration Explanation -->
        <div class="stat-card" style="padding:22px;">
          <h3 style="font-size:1rem;color:var(--signal);margin-bottom:8px;display:flex;align-items:center;gap:8px;">⚡ Canlı Veri Akışı ve Önbellek Mimarisi (Live Hydration)</h3>
          <p style="font-size:.82rem;color:var(--text);line-height:1.6;margin-bottom:12px;">
            SASTEK sistemi modern bir <b>Hibrit Mimari</b> ile çalışır. Admin panelinde yaptığınız tüm ekleme, silme ve düzenleme işlemleri <b>anında Cloudflare D1 Serverless Veritabanına işlenir</b>:
          </p>
          <ul style="font-size:.78rem;color:var(--muted);margin-left:20px;line-height:1.7;">
            <li><b>🏪 Anlaşmalı Noktalar:</b> Değişiklikler <code>sastek.org/anlasmali-noktalar</code> adresinde anında güncellenir.</li>
            <li><b>📅 Etkinlikler:</b> Değişiklikler <code>sastek.org/etkinlikler</code> adresinde anında güncellenir.</li>
            <li><b>🤝 Sponsorlar:</b> Değişiklikler <code>sastek.org/sponsorlar</code> adresinde anında güncellenir.</li>
            <li><b>🖼️ Galeri:</b> Fotoğraf yükleme ve silmeleri <code>sastek.org/galeri</code> adresinde anında güncellenir.</li>
            <li><b>🌐 İletişim & Ekip:</b> Sosyal medya linkleri ve yönetim ekibi <code>sastek.org/iletisim</code> ve sayfa alt bilgisinde (Footer) anında güncellenir.</li>
          </ul>
        </div>

        <!-- Card 2: Automatic Deployment Info -->
        <div class="stat-card" style="padding:22px;">
          <h3 style="font-size:1rem;color:var(--text);margin-bottom:8px;display:flex;align-items:center;gap:8px;">⚡ Dağıtım ve Yayınlama Mimarisi (Deployment)</h3>
          <p style="font-size:.8rem;color:var(--muted);line-height:1.6;margin-bottom:0;">
            Site dağıtımı <b>GitHub → Cloudflare Pages</b> entegrasyonu üzerinden otomatik yapılır. Kod değişiklikleri <code>main</code> branch'e push edildiğinde yeni deployment otomatik başlar. Admin panelindeki D1 veritabanı değişiklikleri ise API üzerinden anında canlıya yansır.
          </p>
        </div>

        <!-- Card 3: Storage & System Details -->
        <div class="stat-card" style="padding:22px;">
          <h3 style="font-size:1rem;color:var(--text);margin-bottom:8px;display:flex;align-items:center;gap:8px;">🔒 Güvenlik, Veritabanı ve Medya Sunucusu</h3>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;margin-top:10px;font-size:.78rem;color:var(--text);">
            <div style="background:rgba(255,255,255,.03);padding:12px;border-radius:8px;border:1px solid var(--border);">
              <b style="color:var(--signal)">🗄️ Veritabanı (SQL)</b>
              <p style="color:var(--muted);margin-top:4px;">Cloudflare D1 Database (sastek-db)<br />Konum: Global Distributed (EEUR)</p>
            </div>
            <div style="background:rgba(255,255,255,.03);padding:12px;border-radius:8px;border:1px solid var(--border);">
              <b style="color:var(--signal)">📸 Medya Sunucusu (R2)</b>
              <p style="color:var(--muted);margin-top:4px;">Cloudflare R2 Bucket (sastek-media)<br />Görsel Rota: <code>/api/upload/file/...</code></p>
            </div>
            <div style="background:rgba(255,255,255,.03);padding:12px;border-radius:8px;border:1px solid var(--border);">
              <b style="color:var(--signal)">🔑 Oturum Güvenliği</b>
              <p style="color:var(--muted);margin-top:4px;">HttpOnly Cookie (JWT Token)<br />Geçerlilik: 8 Saat / Strict SameSite</p>
            </div>
          </div>
        </div>

        <!-- Card 4: Clear Cache -->
        <div class="stat-card" style="padding:22px;">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
            <div>
              <h3 style="font-size:1rem;color:var(--text);margin-bottom:4px;">🧹 İstemci Önbelleğini Temizle</h3>
              <p style="font-size:.8rem;color:var(--muted);">Tarayıcınızın lokal önbelleğini ve admin paneli durumunu yeniler.</p>
            </div>
            <button class="btn btn-secondary" onclick="clearAdminCache()">🧹 Önbelleği Sıfırla</button>
          </div>
        </div>

      </div>
    </div>

  </main>
</div>

<!-- Modals -->
<!-- Shop Modal -->
<div class="modal-backdrop" id="shopModal">
  <div class="modal">
    <h3 id="shopModalTitle">Yeni Anlaşmalı Nokta</h3>
    <input type="hidden" id="shopId" />
    <div class="form-field"><label>İŞLETME ADI *</label><input id="shopName" placeholder="Örn: ARC Kafe" /></div>
    <div class="form-field"><label>KATEGORİ</label><select id="shopCategory"><option value="">Seçiniz...</option></select></div>
    <div class="form-field"><label>İNDİRİM METNİ</label><input id="shopDiscount" placeholder="Örn: SASTEK üyelerine %15 indirim" /></div>
    <div class="form-field"><label>AÇIKLAMA (TR)</label><textarea id="shopDescTr"></textarea></div>
    <div class="form-field"><label>AÇIKLAMA (EN)</label><textarea id="shopDescEn"></textarea></div>
    <div class="form-field">
      <label>KOORDİNATLAR (Enlem, Boylam)</label>
      <input id="shopCoords" placeholder="39.7756, 30.5151 (Google Maps'ten yapıştırabilirsiniz)" />
    </div>
    <div class="grid-2">
      <div class="form-field"><label>ÖNE ÇIKARILAN (Ana Sayfa)</label><select id="shopFeatured"><option value="1">⭐ Öne Çıkarılan (Evet)</option><option value="0">Normal (Hayır)</option></select></div>
      <div class="form-field"><label>HARİTADA GÖSTER</label><select id="shopShowOnMap"><option value="1">📍 Göster (Evet)</option><option value="0">Gizle (Hayır)</option></select></div>
    </div>
    <div class="grid-2">
      <div class="form-field"><label>DOĞRULANMIŞ İŞLETME</label><select id="shopVerified"><option value="1">✅ Doğrulanmış (Evet)</option><option value="0">Bekliyor (Hayır)</option></select></div>
      <div class="form-field"><label>SIRALAMA ÖNCELİĞİ</label><input id="shopOrderNum" type="number" value="1" /></div>
    </div>
    <div class="form-field"><label>HARİTA URL (Google Maps)</label><input id="shopMapUrl" placeholder="https://maps.app.goo.gl/..." /></div>
    <div class="form-field"><label>LOGO YÜKLE</label>
      <div class="upload-area" onclick="document.getElementById('shopLogoFile').click()">
        📎 Tıkla veya sürükle (maks. 5MB, WebP/PNG/JPG)
        <div class="upload-preview" id="shopLogoPreview"></div>
      </div>
      <input type="file" id="shopLogoFile" accept="image/jpeg,image/png,image/webp" style="display:none" />
    </div>
    <div class="form-field"><label>LOGO URL (mevcut veya dış link)</label><input id="shopLogoUrl" placeholder="https://..." /></div>
    <div class="form-field"><label>WEBSİTE</label><input id="shopWebsite" placeholder="https://..." /></div>
    <div class="form-field"><label>ADRES</label><input id="shopAddress" /></div>
    <div class="form-field"><label>DURUM</label><select id="shopActive"><option value="1">Aktif (Görünür)</option><option value="0">Pasif (Görünmez)</option></select></div>
    <div class="modal-actions">
      <button class="btn-ghost" onclick="closeModal('shopModal')">İptal</button>
      <button class="btn btn-primary" id="btnSaveShop" onclick="saveShop()">Kaydet</button>
    </div>
  </div>
</div>

<!-- Event Modal -->
<div class="modal-backdrop" id="eventModal">
  <div class="modal">
    <h3 id="eventModalTitle">Yeni Etkinlik</h3>
    <input type="hidden" id="eventId" />
    <div class="form-field"><label>ETKİNLİK SLUG *</label><input id="eventSlug" placeholder="coffee-talk" /></div>
    <div class="grid-2">
      <div class="form-field"><label>BAŞLIK (TR) *</label><input id="eventTitleTr" /></div>
      <div class="form-field"><label>BAŞLIK (EN)</label><input id="eventTitleEn" /></div>
    </div>
    <div class="grid-2">
      <div class="form-field"><label>ÖZET (TR)</label><input id="eventSummaryTr" /></div>
      <div class="form-field"><label>ÖZET (EN)</label><input id="eventSummaryEn" /></div>
    </div>
    <div class="form-field"><label>AÇIKLAMA (TR)</label><textarea id="eventDescTr"></textarea></div>
    <div class="form-field"><label>AÇIKLAMA (EN)</label><textarea id="eventDescEn"></textarea></div>
    <div class="grid-2">
      <div class="form-field"><label>KATEGORİ (TR)</label><input id="eventCatTr" placeholder="Sektör Buluşması" /></div>
      <div class="form-field"><label>KATEGORİ (EN)</label><input id="eventCatEn" placeholder="Industry Meetup" /></div>
    </div>
    <div class="grid-2">
      <div class="form-field"><label>KONUM (TR)</label><input id="eventLocTr" placeholder="Mühendislik Fakültesi Konferans Salonu" /></div>
      <div class="form-field"><label>KONUM (EN)</label><input id="eventLocEn" placeholder="Faculty of Engineering Conference Hall" /></div>
    </div>
    <div class="grid-2">
      <div class="form-field"><label>ETKİNLİK DURUMU</label>
        <select id="eventStatus">
          <option value="planned">📅 Planlandı (planned)</option>
          <option value="ongoing">⚡ Devam Ediyor (ongoing)</option>
          <option value="completed">✅ Tamamlandı (completed)</option>
          <option value="inactive">⛔ İptal / Pasif (inactive)</option>
        </select>
      </div>
      <div class="form-field"><label>DETAYLARI GÖSTER (Sidebar)</label>
        <select id="eventShowDetails">
          <option value="0">Hayır (Gizlensin)</option>
          <option value="1">Evet (Görünsün)</option>
        </select>
      </div>
    </div>
    <div class="form-field"><label>GÖRSEL YÜKLE</label>
      <div class="upload-area" onclick="document.getElementById('eventImgFile').click()">
        📎 Tıkla veya sürükle
        <div class="upload-preview" id="eventImgPreview"></div>
      </div>
      <input type="file" id="eventImgFile" accept="image/*" style="display:none" />
    </div>
    <div class="form-field"><label>GÖRSEL URL</label><input id="eventImgUrl" /></div>
    <div class="grid-2">
      <div class="form-field"><label>DURUM (Görünürlük)</label><select id="eventActive"><option value="1">Aktif</option><option value="0">Pasif</option></select></div>
      <div class="form-field"><label>ÖNE ÇIKAR (Ana Sayfa)</label><select id="eventFeatured"><option value="0">Normal</option><option value="1">⭐ Öne Çıkarılan</option></select></div>
    </div>
    <div class="modal-actions">
      <button class="btn-ghost" onclick="closeModal('eventModal')">İptal</button>
      <button class="btn btn-primary" id="btnSaveEvent" onclick="saveEvent()">Kaydet</button>
    </div>
  </div>
</div>

<!-- Team Modal -->
<div class="modal-backdrop" id="teamModal">
  <div class="modal">
    <h3 id="teamModalTitle">Ekip Üyesi</h3>
    <input type="hidden" id="teamId" />
    <div class="form-field"><label>AD SOYAD *</label><input id="teamName" /></div>
    <div class="grid-2">
      <div class="form-field"><label>ROL (TR) *</label><input id="teamRoleTr" placeholder="Kulüp Başkanı" /></div>
      <div class="form-field"><label>ROL (EN)</label><input id="teamRoleEn" placeholder="Club President" /></div>
    </div>
    <div class="form-field"><label>E-POSTA</label><input id="teamEmail" type="email" /></div>
    <div class="form-field"><label>LINKEDIN URL</label><input id="teamLinkedin" /></div>
    <div class="grid-2">
      <div class="form-field"><label>SIRA</label><input id="teamOrder" type="number" value="1" /></div>
      <div class="form-field"><label>DURUM</label><select id="teamActive"><option value="1">Aktif</option><option value="0">Pasif</option></select></div>
    </div>
    <div class="modal-actions">
      <button class="btn-ghost" onclick="closeModal('teamModal')">İptal</button>
      <button class="btn btn-primary" id="btnSaveTeam" onclick="saveTeam()">Kaydet</button>
    </div>
  </div>
</div>

<!-- Sponsor Modal -->
<div class="modal-backdrop" id="sponsorModal">
  <div class="modal">
    <h3 id="sponsorModalTitle">Sponsor</h3>
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
      <input type="file" id="sponsorLogoFile" accept="image/*" style="display:none" />
    </div>
    <div class="form-field"><label>LOGO URL</label><input id="sponsorLogoUrl" /></div>
    <div class="form-field"><label>WEBSİTE</label><input id="sponsorWebsite" /></div>
    <div class="form-field"><label>DURUM</label><select id="sponsorActive"><option value="1">Aktif</option><option value="0">Pasif</option></select></div>
    <div class="modal-actions">
      <button class="btn-ghost" onclick="closeModal('sponsorModal')">İptal</button>
      <button class="btn btn-primary" id="btnSaveSponsor" onclick="saveSponsor()">Kaydet</button>
    </div>
  </div>
</div>

<!-- Social Modal -->
<div class="modal-backdrop" id="socialModal">
  <div class="modal">
    <h3 id="socialModalTitle">Sosyal Medya Linki</h3>
    <input type="hidden" id="socialId" />
    <div class="grid-2">
      <div class="form-field"><label>PLATFORM *</label><input id="socialPlatform" placeholder="instagram" /></div>
      <div class="form-field"><label>LABEL</label><input id="socialLabel" placeholder="Instagram" /></div>
    </div>
    <div class="form-field"><label>URL *</label><input id="socialUrl" placeholder="https://..." /></div>
    <div class="grid-2">
      <div class="form-field"><label>SIRA</label><input id="socialOrder" type="number" value="1" /></div>
      <div class="form-field"><label>DURUM</label><select id="socialActive"><option value="1">Aktif</option><option value="0">Pasif</option></select></div>
    </div>
    <div class="modal-actions">
      <button class="btn-ghost" onclick="closeModal('socialModal')">İptal</button>
      <button class="btn btn-primary" id="btnSaveSocial" onclick="saveSocial()">Kaydet</button>
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
      <input type="file" id="galleryFile" accept="image/*" style="display:none" multiple />
    </div>
    <div class="form-field"><label>ETİKET (etkinlik adı)</label><input id="galleryTag" placeholder="teknik-gezi-2024" /></div>
    <div class="modal-actions">
      <button class="btn-ghost" onclick="closeModal('galleryModal')">İptal</button>
      <button class="btn btn-primary" id="btnUploadGallery" onclick="uploadGallery()">Yükle</button>
    </div>
  </div>
</div>

<!-- QR Create/Edit Modal -->
<div class="modal-backdrop" id="qrModal">
  <div class="modal">
    <h3 id="qrModalTitle">Yeni QR Kod Oluştur</h3>
    <input type="hidden" id="qrId" />
    <div class="form-field">
      <label>QR BAŞLIĞI / ADI *</label>
      <input id="qrTitle" placeholder="Örn: 2026 Savunma Günlükleri Kayıt" oninput="autoSlugQr()" />
    </div>
    <div class="form-field">
      <label>SLUG (KISA BAĞLANTI) *</label>
      <div style="display:flex;align-items:center;gap:6px;">
        <span style="font-size:.78rem;color:var(--muted);white-space:nowrap;background:rgba(255,255,255,.04);padding:8px 10px;border-radius:6px;border:1px solid var(--border)">sastek.org/q/</span>
        <input id="qrSlug" placeholder="savunma-gunlukleri" style="flex:1" />
      </div>
      <p id="qrSlugWarning" style="display:none;font-size:.72rem;color:var(--warn);margin-top:6px;line-height:1.4">
        ⚠️ Slug değiştirilirse önceden fiziksel olarak basılmış QR kodlar çalışmayacaktır.
      </p>
    </div>
    <div class="form-field">
      <label>HEDEF URL (TARGET) *</label>
      <input id="qrTargetUrl" placeholder="https://forms.gle/... veya https://sastek.org/..." />
      <p style="font-size:.7rem;color:var(--muted);margin-top:4px">
        Kullanıcı QR kodu taradığında bu adrese 302 ile yönlendirilir. Hedef URL sonradan değiştirilebilir.
      </p>
    </div>
    <div class="form-field">
      <label>DURUM</label>
      <select id="qrActive">
        <option value="1">Aktif (Yönlendirme Açık)</option>
        <option value="0">Pasif (Devre Dışı)</option>
      </select>
    </div>
    <div class="modal-actions">
      <button class="btn-ghost" onclick="closeModal('qrModal')">İptal</button>
      <button class="btn btn-primary" id="btnSaveQr" onclick="saveQr()">Kaydet</button>
    </div>
  </div>
</div>

<!-- QR View & Download Modal -->
<div class="modal-backdrop" id="qrViewModal">
  <div class="modal" style="max-width:480px;text-align:center;">
    <h3 id="qrViewTitle" style="margin-bottom:6px;">QR Kod Önizleme</h3>
    <p id="qrViewTarget" style="font-size:.75rem;color:var(--muted);margin-bottom:16px;word-break:break-all;"></p>

    <div style="background:#fff;padding:16px;border-radius:12px;display:inline-block;margin:0 auto 16px;box-shadow:0 8px 24px rgba(0,0,0,0.4)">
      <div id="qrCanvasContainer" style="display:flex;justify-content:center;align-items:center;min-width:200px;min-height:200px;"></div>
    </div>

    <div style="background:rgba(255,255,255,.03);border:1px solid var(--border);border-radius:8px;padding:10px 12px;margin-bottom:18px;display:flex;justify-content:space-between;align-items:center;gap:8px;">
      <code id="qrViewFullUrl" style="font-size:.78rem;color:var(--signal);word-break:break-all;text-align:left;"></code>
      <button class="btn btn-secondary btn-sm" onclick="copyQrLink()">📋 Kopyala</button>
    </div>

    <!-- Quick Stats in Modal -->
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:8px;margin-bottom:20px;font-size:.72rem;">
      <div style="background:rgba(255,255,255,.02);border:1px solid var(--border);padding:8px 4px;border-radius:6px;">
        <div style="color:var(--muted);font-size:.65rem;">TOPLAM</div>
        <b style="color:var(--signal);font-size:.9rem;" id="qrStatTotal">0</b>
      </div>
      <div style="background:rgba(255,255,255,.02);border:1px solid var(--border);padding:8px 4px;border-radius:6px;">
        <div style="color:var(--muted);font-size:.65rem;">BUGÜN</div>
        <b style="color:var(--success);font-size:.9rem;" id="qrStatToday">0</b>
      </div>
      <div style="background:rgba(255,255,255,.02);border:1px solid var(--border);padding:8px 4px;border-radius:6px;">
        <div style="color:var(--muted);font-size:.65rem;">7 GÜN</div>
        <b style="color:var(--text);font-size:.9rem;" id="qrStat7d">0</b>
      </div>
      <div style="background:rgba(255,255,255,.02);border:1px solid var(--border);padding:8px 4px;border-radius:6px;">
        <div style="color:var(--muted);font-size:.65rem;">30 GÜN</div>
        <b style="color:var(--text);font-size:.9rem;" id="qrStat30d">0</b>
      </div>
    </div>

    <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
      <button class="btn btn-primary" onclick="downloadQrPng()">📥 PNG İndir</button>
      <button class="btn btn-secondary" onclick="downloadQrSvg()">🎨 SVG İndir (Vektör)</button>
      <button class="btn-ghost" onclick="closeModal('qrViewModal')">Kapat</button>
    </div>
  </div>
</div>

<div id="toast"></div>

<script>
// Image URL Helper — Prepends https://sastek.org to relative paths like /images/...
function resolveImageUrl(url) {
  if (!url) return '';
  if (url.startsWith('/images/')) return 'https://sastek.org' + url;
  return url;
}

// ── Routing ──────────────────────────────────────────────────────────────────
document.querySelectorAll('nav a').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const page = a.dataset.page;
    document.querySelectorAll('nav a').forEach(x => x.classList.remove('active'));
    document.querySelectorAll('.page').forEach(x => x.classList.remove('active'));
    a.classList.add('active');
    document.getElementById('page-' + page).classList.add('active');
    if (page === 'shops') loadShops();
    if (page === 'events') loadEvents();
    if (page === 'team') loadTeam();
    if (page === 'sponsors') loadSponsors();
    if (page === 'socials') loadSocials();
    if (page === 'gallery') loadGallery();
    if (page === 'qr') loadQrs();
    if (page === 'developer') loadSiteSettings();
  });
});

function toast(msg, type = 'success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'show ' + type;
  setTimeout(() => t.className = '', 3000);
}

document.getElementById('logoutBtn').onclick = async () => {
  await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
  window.location.href = '/admin/';
};

async function checkAuth() {
  const r = await fetch('/api/auth/me', { credentials: 'include' });
  if (!r.ok) window.location.href = '/admin/';
}

function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

async function uploadFile(file, folder) {
  const fd = new FormData();
  fd.append('file', file);
  fd.append('folder', folder);
  const r = await fetch('/api/upload', { method: 'POST', credentials: 'include', body: fd });
  if (!r.ok) {
    const err = await r.json().catch(() => ({}));
    throw new Error(err.error || 'Upload failed');
  }
  return (await r.json()).url;
}

function bindFilePreview(inputId, previewId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.addEventListener('change', e => {
    const preview = document.getElementById(previewId);
    if (!preview) return;
    preview.innerHTML = '';
    const files = Array.from(e.target.files || []);
    files.forEach(f => {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(f);
      preview.appendChild(img);
    });
  });
}
bindFilePreview('shopLogoFile', 'shopLogoPreview');
bindFilePreview('eventImgFile', 'eventImgPreview');
bindFilePreview('sponsorLogoFile', 'sponsorLogoPreview');
bindFilePreview('galleryFile', 'galleryPreview');

// ── Developer Actions & Settings ─────────────────────────────────────────────
async function loadSiteSettings() {
  try {
    const res = await fetch('/api/settings');
    if (!res.ok) return;
    const settings = await res.json();
    const partnersCb = document.getElementById('togglePartnersNotice');
    const sponsorsCb = document.getElementById('toggleSponsorsNotice');
    if (partnersCb) partnersCb.checked = Boolean(settings.show_partners_notice);
    if (sponsorsCb) sponsorsCb.checked = Boolean(settings.show_sponsors_notice);
    document.getElementById('labelPartnersNotice').textContent = partnersCb?.checked ? 'AÇIK' : 'KAPALI';
    document.getElementById('labelSponsorsNotice').textContent = sponsorsCb?.checked ? 'AÇIK' : 'KAPALI';
  } catch {}
}

async function saveSiteSettings() {
  const partnersCb = document.getElementById('togglePartnersNotice');
  const sponsorsCb = document.getElementById('toggleSponsorsNotice');
  const body = {
    show_partners_notice: partnersCb.checked ? 1 : 0,
    show_sponsors_notice: sponsorsCb.checked ? 1 : 0,
  };
  document.getElementById('labelPartnersNotice').textContent = partnersCb.checked ? 'AÇIK' : 'KAPALI';
  document.getElementById('labelSponsorsNotice').textContent = sponsorsCb.checked ? 'AÇIK' : 'KAPALI';

  const r = await fetch('/api/settings', {
    method: 'PUT', credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (r.ok) toast('Uyarı yazısı ayarları güncellendi ✓');
  else toast('Ayarlar kaydedilemedi', 'error');
}

function clearAdminCache() {
  localStorage.clear();
  sessionStorage.clear();
  toast('Önbellek temizlendi ✓');
  setTimeout(() => window.location.reload(), 1000);
}

// ── Generic Bulk Select & Action Handlers ─────────────────────────────────────
function setupBulkSelect(moduleName) {
  const cap = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
  const selectAll = document.getElementById('selectAll' + cap);
  const selectAllHeader = document.getElementById('selectAll' + cap + 'Header');

  function updateCheckboxes(checked) {
    document.querySelectorAll('.' + moduleName + '-select-cb').forEach(cb => cb.checked = checked);
    if (selectAll) { selectAll.checked = checked; selectAll.indeterminate = false; }
    if (selectAllHeader) { selectAllHeader.checked = checked; selectAllHeader.indeterminate = false; }
  }

  function syncHeaderState() {
    const all = document.querySelectorAll('.' + moduleName + '-select-cb');
    const checked = document.querySelectorAll('.' + moduleName + '-select-cb:checked');
    const isAll = all.length > 0 && checked.length === all.length;
    const isPartial = checked.length > 0 && checked.length < all.length;
    [selectAll, selectAllHeader].forEach(cb => {
      if (!cb) return;
      cb.checked = isAll;
      cb.indeterminate = isPartial;
    });
  }

  selectAll?.addEventListener('change', e => updateCheckboxes(e.target.checked));
  selectAllHeader?.addEventListener('change', e => updateCheckboxes(e.target.checked));

  // Satır checkbox'ları dinamik oluşturuluyor; event delegation ile senkronize et
  document.getElementById('page-' + moduleName)?.addEventListener('change', e => {
    if (e.target?.classList?.contains(moduleName + '-select-cb')) syncHeaderState();
  });
}
['shops', 'events', 'team', 'sponsors', 'socials', 'gallery', 'qr'].forEach(setupBulkSelect);

function getSelectedIds(moduleName) {
  return Array.from(document.querySelectorAll('.' + moduleName + '-select-cb:checked')).map(cb => Number(cb.value));
}

async function bulkSetStatus(moduleName, isActive, reloadFn) {
  const ids = getSelectedIds(moduleName);
  if (!ids.length) { toast('Lütfen en az bir öğe seçin', 'error'); return; }
  const actionName = isActive ? 'aktif (görünür)' : 'pasif (görünmez)';
  if (!confirm(\`Seçilen \${ids.length} öğeyi \${actionName} yapmak istiyor musunuz?\`)) return;

  const r = await fetch(\`/api/\${moduleName}/bulk-status\`, {
    method: 'POST', credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids, is_active: isActive })
  });
  if (r.ok) { toast(\`\${ids.length} öğe \${actionName} yapıldı ✓\`); reloadFn(); }
  else toast('Hata oluştu', 'error');
}

async function bulkSetField(moduleName, field, value, reloadFn) {
  const ids = getSelectedIds(moduleName);
  if (!ids.length) { toast('Lütfen en az bir öğe seçin', 'error'); return; }

  const labels = {
    is_featured: value ? '⭐ Öne Çıkarılan' : 'Normal',
    show_on_map: value ? '📍 Haritada Gösterilen' : 'Harita Gizli',
    is_verified: value ? '✅ Doğrulanmış' : 'Doğrulanmamış',
    is_active: value ? 'Aktif' : 'Pasif'
  };
  const label = labels[field] || (value ? 'Aktif' : 'Pasif');
  if (!confirm(\`Seçilen \${ids.length} öğeyi \${label} yapmak istiyor musunuz?\`)) return;

  const r = await fetch(\`/api/\${moduleName}/bulk-field\`, {
    method: 'POST', credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids, field, value })
  });
  if (r.ok) { toast(\`\${ids.length} öğe \${label} yapıldı ✓\`); reloadFn(); }
  else toast('Hata oluştu', 'error');
}

async function bulkDelete(moduleName, reloadFn) {
  const ids = getSelectedIds(moduleName);
  if (!ids.length) { toast('Lütfen en az bir öğe seçin', 'error'); return; }
  if (!confirm(\`Seçilen \${ids.length} öğeyi KALICI OLARAK silmek istiyor musunuz?\`)) return;

  const r = await fetch(\`/api/\${moduleName}/bulk-delete\`, {
    method: 'POST', credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids })
  });
  const resData = await r.json().catch(() => ({}));
  if (r.ok) {
    toast(resData.message || \`\${ids.length} öğe silindi ✓\`);
    reloadFn();
  } else {
    toast(resData.error || 'Hata oluştu', 'error');
  }
}

// ── Stats ─────────────────────────────────────────────────────────────────────
async function loadStats() {
  const [shops, events, team, sponsors, gallery, qrs] = await Promise.all([
    fetch('/api/shops/admin/all', { credentials: 'include' }).then(r => r.json()).catch(()=>[]),
    fetch('/api/events/admin/all', { credentials: 'include' }).then(r => r.json()).catch(()=>[]),
    fetch('/api/team/admin/all', { credentials: 'include' }).then(r => r.json()).catch(()=>[]),
    fetch('/api/sponsors/admin/all', { credentials: 'include' }).then(r => r.json()).catch(()=>[]),
    fetch('/api/gallery', { credentials: 'include' }).then(r => r.json()).catch(()=>[]),
    fetch('/api/qr', { credentials: 'include' }).then(r => r.json()).catch(()=>[]),
  ]);
  document.getElementById('stat-shops').textContent = shops.length;
  document.getElementById('stat-events').textContent = events.length;
  document.getElementById('stat-team').textContent = team.length;
  document.getElementById('stat-sponsors').textContent = sponsors.length;
  document.getElementById('stat-gallery').textContent = gallery.length;
  const qrStatEl = document.getElementById('stat-qr');
  if (qrStatEl) qrStatEl.textContent = Array.isArray(qrs) ? qrs.length : '0';
}

// ── Shops ─────────────────────────────────────────────────────────────────────
let categories = [];
let allShopsData = [];

async function loadShops() {
  try {
    const [catsRes, shopsRes] = await Promise.all([
      fetch('/api/shops/categories'),
      fetch('/api/shops/admin/all', { credentials: 'include' })
    ]);
    if (!shopsRes.ok) {
      if (shopsRes.status === 401) window.location.href = '/admin/';
      throw new Error('HTTP ' + shopsRes.status);
    }
    categories = await catsRes.json().catch(() => []);
    allShopsData = await shopsRes.json();
    if (!Array.isArray(allShopsData)) allShopsData = [];

    const sel = document.getElementById('shopCategory');
    sel.innerHTML = '<option value="">Seçiniz...</option>';
    categories.forEach(c => sel.innerHTML += \`<option value="\${c.id}">\${c.icon || ''} \${c.name_tr}</option>\`);

    if (!allShopsData.length) {
      document.getElementById('shopTable').innerHTML = '<tr><td colspan="8" style="text-align:center;color:var(--muted);padding:40px 0;font-size:.85rem">Henüz anlaşmalı nokta yok. "+ Yeni Ekle" ile başlayın.</td></tr>';
      return;
    }
    document.getElementById('shopTable').innerHTML = allShopsData.map(s => \`
      <tr>
        <td><input type="checkbox" class="shops-select-cb" value="\${s.id}" /></td>
        <td>\${s.logo_url ? \`<img class="logo-thumb" src="\${resolveImageUrl(s.logo_url)}" alt="" />\` : '—'}</td>
        <td><b>\${s.name}</b></td>
        <td>\${s.category_tr || '—'}</td>
        <td>\${s.discount || '—'}</td>
        <td>
          <span class="badge \${s.is_active ? 'badge-active' : 'badge-inactive'}">\${s.is_active ? 'Aktif' : 'Pasif'}</span>
          \${s.is_featured ? '<span class="badge badge-gold">⭐ Öne Çıkan</span>' : ''}
          \${s.show_on_map ? '<span class="badge badge-platinum">📍 Harita</span>' : ''}
          \${s.is_verified ? '<span class="badge badge-active">✅ Onaylı</span>' : ''}
        </td>
        <td>\${s.order_num || 1}</td>
        <td style="display:flex;gap:6px">
          <button class="btn btn-sm btn-primary" onclick="editShop(\${s.id})">Düzenle</button>
          <button class="btn btn-sm btn-danger" onclick="deleteShop(\${s.id})">Sil</button>
        </td>
      </tr>
    \`).join('');
  } catch (e) {
    toast('Anlaşmalı noktalar yüklenemedi', 'error');
    document.getElementById('shopTable').innerHTML = '<tr><td colspan="8" style="text-align:center;color:var(--error);padding:30px 0;font-size:.85rem">⚠️ Veriler yüklenirken bir hata oluştu.</td></tr>';
  }
}

function openShopModal(shop = null) {
  document.getElementById('shopId').value = shop?.id || '';
  document.getElementById('shopModalTitle').textContent = shop ? 'Düzenle: ' + shop.name : 'Yeni Anlaşmalı Nokta';
  document.getElementById('shopName').value = shop?.name || '';
  document.getElementById('shopCategory').value = shop?.category_id || '';
  document.getElementById('shopDiscount').value = shop?.discount || '';
  document.getElementById('shopDescTr').value = shop?.description_tr || '';
  document.getElementById('shopDescEn').value = shop?.description_en || '';
  document.getElementById('shopCoords').value = (shop?.lat != null && shop?.lng != null) ? \`\${shop.lat}, \${shop.lng}\` : '';
  document.getElementById('shopFeatured').value = String(shop?.is_featured ?? 0);
  document.getElementById('shopShowOnMap').value = String(shop?.show_on_map ?? 1);
  document.getElementById('shopVerified').value = String(shop?.is_verified ?? 1);
  document.getElementById('shopOrderNum').value = shop?.order_num || 1;
  document.getElementById('shopMapUrl').value = shop?.map_url || '';
  document.getElementById('shopLogoUrl').value = shop?.logo_url || '';
  document.getElementById('shopWebsite').value = shop?.website || '';
  document.getElementById('shopAddress').value = shop?.address || '';
  document.getElementById('shopActive').value = String(shop?.is_active ?? 1);
  document.getElementById('shopLogoFile').value = '';

  const preview = document.getElementById('shopLogoPreview');
  if (shop?.logo_url) {
    preview.innerHTML = \`<img src="\${resolveImageUrl(shop.logo_url)}" alt="Mevcut Logo" />\`;
  } else {
    preview.innerHTML = '';
  }
  openModal('shopModal');
}
function editShop(id) { const s = allShopsData.find(x => x.id === id); if (s) openShopModal(s); }

async function saveShop() {
  const btn = document.getElementById('btnSaveShop');
  if (btn) { btn.disabled = true; btn.textContent = 'Kaydediliyor...'; }
  try {
    const id = document.getElementById('shopId').value;
    if (!document.getElementById('shopName').value.trim()) { toast('İşletme adı zorunludur', 'error'); return; }
    const logoFile = document.getElementById('shopLogoFile').files[0];
    let logoUrl = document.getElementById('shopLogoUrl').value;

    if (logoFile) {
      try {
        toast('Logo yükleniyor...', 'info');
        logoUrl = await uploadFile(logoFile, 'logos');
      } catch (e) {
        toast('Logo yüklenemedi: ' + (e.message || ''), 'error');
        return;
      }
    }

    const rawCoords = document.getElementById('shopCoords').value || '';
    let lat = null;
    let lng = null;
    if (rawCoords.trim()) {
      const parts = rawCoords.split(',').map(p => p.trim());
      if (parts.length >= 2) {
        const parsedLat = parseFloat(parts[0]);
        const parsedLng = parseFloat(parts[1]);
        if (!isNaN(parsedLat)) lat = parsedLat;
        if (!isNaN(parsedLng)) lng = parsedLng;
      }
    }

    const body = {
      name: document.getElementById('shopName').value,
      category_id: document.getElementById('shopCategory').value || null,
      discount: document.getElementById('shopDiscount').value,
      description_tr: document.getElementById('shopDescTr').value,
      description_en: document.getElementById('shopDescEn').value,
      lat,
      lng,
      is_featured: parseInt(document.getElementById('shopFeatured').value),
      show_on_map: parseInt(document.getElementById('shopShowOnMap').value),
      is_verified: parseInt(document.getElementById('shopVerified').value),
      order_num: parseInt(document.getElementById('shopOrderNum').value) || 1,
      map_url: document.getElementById('shopMapUrl').value,
      logo_url: logoUrl,
      website: document.getElementById('shopWebsite').value,
      address: document.getElementById('shopAddress').value,
      is_active: parseInt(document.getElementById('shopActive').value),
    };
    const url = id ? \`/api/shops/\${id}\` : '/api/shops';
    const method = id ? 'PUT' : 'POST';
    const r = await fetch(url, { method, credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (r.ok) { closeModal('shopModal'); toast('Kaydedildi ✓'); loadShops(); }
    else toast('Hata oluştu', 'error');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = 'Kaydet'; }
  }
}

async function deleteShop(id) {
  const shop = allShopsData.find(x => x.id === id);
  const name = shop?.name ? \`"\${shop.name}" \` : 'Bu ';
  if (!confirm(\`\${name}anlaşmalı noktasını silmek istediğinize emin misiniz?\`)) return;
  const r = await fetch(\`/api/shops/\${id}\`, { method: 'DELETE', credentials: 'include' });
  if (r.ok) { toast('Silindi ✓'); loadShops(); }
  else toast('Silme başarısız', 'error');
}

// ── Events ────────────────────────────────────────────────────────────────────
let allEventsData = [];
async function loadEvents() {
  try {
    const res = await fetch('/api/events/admin/all', { credentials: 'include' });
    if (!res.ok) {
      if (res.status === 401) window.location.href = '/admin/';
      throw new Error('HTTP ' + res.status);
    }
    allEventsData = await res.json();
    if (!Array.isArray(allEventsData)) allEventsData = [];

    if (!allEventsData.length) {
      document.getElementById('eventTable').innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:40px 0;font-size:.85rem">Henüz etkinlik yok. "+ Yeni Etkinlik" ile başlayın.</td></tr>';
      return;
    }
    document.getElementById('eventTable').innerHTML = allEventsData.map(e => \`
      <tr>
        <td><input type="checkbox" class="events-select-cb" value="\${e.id}" /></td>
        <td>\${e.image_url ? \`<img class="logo-thumb" src="\${resolveImageUrl(e.image_url)}" alt="" />\` : '—'}</td>
        <td><b>\${e.title_tr}</b></td>
        <td>\${e.category_tr || '—'}</td>
        <td><code>\${e.slug}</code></td>
        <td><span class="badge \${e.is_active ? 'badge-active' : 'badge-inactive'}">\${e.is_active ? 'Aktif' : 'Pasif'}</span>\${e.is_featured ? ' <span class="badge badge-gold">⭐ Öne Çıkan</span>' : ''}</td>
        <td style="display:flex;gap:6px">
          <button class="btn btn-sm btn-primary" onclick="editEvent(\${e.id})">Düzenle</button>
          <button class="btn btn-sm btn-danger" onclick="deleteEvent(\${e.id})">Sil</button>
        </td>
      </tr>
    \`).join('');
  } catch (e) {
    toast('Etkinlikler yüklenemedi', 'error');
    document.getElementById('eventTable').innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--error);padding:30px 0;font-size:.85rem">⚠️ Veriler yüklenirken bir hata oluştu.</td></tr>';
  }
}
function openEventModal(ev = null) {
  document.getElementById('eventId').value = ev?.id || '';
  document.getElementById('eventModalTitle').textContent = ev ? 'Düzenle: ' + ev.title_tr : 'Yeni Etkinlik';
  document.getElementById('eventSlug').value = ev?.slug || '';
  document.getElementById('eventTitleTr').value = ev?.title_tr || '';
  document.getElementById('eventTitleEn').value = ev?.title_en || '';
  document.getElementById('eventSummaryTr').value = ev?.summary_tr || '';
  document.getElementById('eventSummaryEn').value = ev?.summary_en || '';
  document.getElementById('eventDescTr').value = ev?.description_tr || '';
  document.getElementById('eventDescEn').value = ev?.description_en || '';
  document.getElementById('eventCatTr').value = ev?.category_tr || '';
  document.getElementById('eventCatEn').value = ev?.category_en || '';
  document.getElementById('eventLocTr').value = ev?.location_tr || '';
  document.getElementById('eventLocEn').value = ev?.location_en || '';
  document.getElementById('eventStatus').value = ev?.status || 'planned';
  document.getElementById('eventShowDetails').value = String(ev?.show_details ?? 0);
  document.getElementById('eventImgUrl').value = ev?.image_url || '';
  document.getElementById('eventActive').value = String(ev?.is_active ?? 1);
  document.getElementById('eventFeatured').value = String(ev?.is_featured ?? 0);
  document.getElementById('eventImgFile').value = '';

  const preview = document.getElementById('eventImgPreview');
  if (ev?.image_url) {
    preview.innerHTML = \`<img src="\${resolveImageUrl(ev.image_url)}" alt="Mevcut Görsel" />\`;
  } else {
    preview.innerHTML = '';
  }
  openModal('eventModal');
}
function editEvent(id) { const ev = allEventsData.find(x => x.id === id); if (ev) openEventModal(ev); }

async function saveEvent() {
  const btn = document.getElementById('btnSaveEvent');
  if (btn) { btn.disabled = true; btn.textContent = 'Kaydediliyor...'; }
  try {
    const id = document.getElementById('eventId').value;
    if (!document.getElementById('eventSlug').value.trim() || !document.getElementById('eventTitleTr').value.trim()) { toast('Etkinlik slug ve başlık (TR) zorunludur', 'error'); return; }
    const imgFile = document.getElementById('eventImgFile').files[0];
    let imgUrl = document.getElementById('eventImgUrl').value;
    if (imgFile) {
      try {
        toast('Fotoğraf yükleniyor...', 'info');
        imgUrl = await uploadFile(imgFile, 'gallery');
      } catch (e) {
        toast('Görsel yüklenemedi: ' + (e.message || ''), 'error');
        return;
      }
    }
    const body = {
      slug: document.getElementById('eventSlug').value,
      title_tr: document.getElementById('eventTitleTr').value,
      title_en: document.getElementById('eventTitleEn').value,
      summary_tr: document.getElementById('eventSummaryTr').value,
      summary_en: document.getElementById('eventSummaryEn').value,
      description_tr: document.getElementById('eventDescTr').value,
      description_en: document.getElementById('eventDescEn').value,
      category_tr: document.getElementById('eventCatTr').value,
      category_en: document.getElementById('eventCatEn').value,
      location_tr: document.getElementById('eventLocTr').value || null,
      location_en: document.getElementById('eventLocEn').value || null,
      status: document.getElementById('eventStatus').value || 'planned',
      show_details: parseInt(document.getElementById('eventShowDetails').value) || 0,
      image_url: imgUrl,
      is_active: parseInt(document.getElementById('eventActive').value),
      is_featured: parseInt(document.getElementById('eventFeatured').value),
    };
    const url = id ? \`/api/events/\${id}\` : '/api/events';
    const method = id ? 'PUT' : 'POST';
    const r = await fetch(url, { method, credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (r.ok) { closeModal('eventModal'); toast('Kaydedildi ✓'); loadEvents(); }
    else toast('Hata oluştu', 'error');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = 'Kaydet'; }
  }
}
async function deleteEvent(id) {
  const ev = allEventsData.find(x => x.id === id);
  const name = ev?.title_tr ? \`"\${ev.title_tr}" \` : 'Bu ';
  if (!confirm(\`\${name}etkinliğini silmek istediğinize emin misiniz?\`)) return;
  const r = await fetch(\`/api/events/\${id}\`, { method: 'DELETE', credentials: 'include' });
  if (r.ok) { toast('Silindi ✓'); loadEvents(); }
  else toast('Silme başarısız', 'error');
}

// ── Team ──────────────────────────────────────────────────────────────────────
let allTeamData = [];
async function loadTeam() {
  try {
    const res = await fetch('/api/team/admin/all', { credentials: 'include' });
    if (!res.ok) {
      if (res.status === 401) window.location.href = '/admin/';
      throw new Error('HTTP ' + res.status);
    }
    allTeamData = await res.json();
    if (!Array.isArray(allTeamData)) allTeamData = [];

    if (!allTeamData.length) {
      document.getElementById('teamTable').innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:40px 0;font-size:.85rem">Henüz ekip üyesi yok. "+ Üye Ekle" ile başlayın.</td></tr>';
      return;
    }
    document.getElementById('teamTable').innerHTML = allTeamData.map(t => \`
      <tr>
        <td><input type="checkbox" class="team-select-cb" value="\${t.id}" /></td>
        <td><b>\${t.name}</b></td>
        <td>\${t.role_tr}</td>
        <td>\${t.email || '—'}</td>
        <td>\${t.order_num}</td>
        <td><span class="badge \${t.is_active ? 'badge-active' : 'badge-inactive'}">\${t.is_active ? 'Aktif' : 'Pasif'}</span></td>
        <td style="display:flex;gap:6px">
          <button class="btn btn-sm btn-primary" onclick="editTeam(\${t.id})">Düzenle</button>
          <button class="btn btn-sm btn-danger" onclick="deleteTeam(\${t.id})">Sil</button>
        </td>
      </tr>
    \`).join('');
  } catch (e) {
    toast('Ekip üyeleri yüklenemedi', 'error');
    document.getElementById('teamTable').innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--error);padding:30px 0;font-size:.85rem">⚠️ Veriler yüklenirken bir hata oluştu.</td></tr>';
  }
}
function openTeamModal(m = null) {
  document.getElementById('teamId').value = m?.id || '';
  document.getElementById('teamModalTitle').textContent = m ? 'Düzenle: ' + m.name : 'Yeni Üye';
  document.getElementById('teamName').value = m?.name || '';
  document.getElementById('teamRoleTr').value = m?.role_tr || '';
  document.getElementById('teamRoleEn').value = m?.role_en || '';
  document.getElementById('teamEmail').value = m?.email || '';
  document.getElementById('teamLinkedin').value = m?.linkedin_url || '';
  document.getElementById('teamOrder').value = m?.order_num || 1;
  document.getElementById('teamActive').value = String(m?.is_active ?? 1);
  openModal('teamModal');
}
function editTeam(id) { const m = allTeamData.find(x => x.id === id); if (m) openTeamModal(m); }

async function saveTeam() {
  const btn = document.getElementById('btnSaveTeam');
  if (btn) { btn.disabled = true; btn.textContent = 'Kaydediliyor...'; }
  try {
    const id = document.getElementById('teamId').value;
    if (!document.getElementById('teamName').value.trim() || !document.getElementById('teamRoleTr').value.trim()) { toast('Ad soyad ve rol (TR) zorunludur', 'error'); return; }
    const body = {
      name: document.getElementById('teamName').value,
      role_tr: document.getElementById('teamRoleTr').value,
      role_en: document.getElementById('teamRoleEn').value,
      email: document.getElementById('teamEmail').value,
      linkedin_url: document.getElementById('teamLinkedin').value,
      order_num: parseInt(document.getElementById('teamOrder').value),
      is_active: parseInt(document.getElementById('teamActive').value),
    };
    const url = id ? \`/api/team/\${id}\` : '/api/team';
    const method = id ? 'PUT' : 'POST';
    const r = await fetch(url, { method, credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (r.ok) { closeModal('teamModal'); toast('Kaydedildi ✓'); loadTeam(); }
    else toast('Hata oluştu', 'error');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = 'Kaydet'; }
  }
}
async function deleteTeam(id) {
  const m = allTeamData.find(x => x.id === id);
  const name = m?.name ? \`"\${m.name}" \` : 'Bu ';
  if (!confirm(\`\${name}ekip üyesini silmek istediğinize emin misiniz?\`)) return;
  const r = await fetch(\`/api/team/\${id}\`, { method: 'DELETE', credentials: 'include' });
  if (r.ok) { toast('Silindi ✓'); loadTeam(); }
  else toast('Silme başarısız', 'error');
}

// ── Sponsors ──────────────────────────────────────────────────────────────────
let allSponsorsData = [];
async function loadSponsors() {
  try {
    const res = await fetch('/api/sponsors/admin/all', { credentials: 'include' });
    if (!res.ok) {
      if (res.status === 401) window.location.href = '/admin/';
      throw new Error('HTTP ' + res.status);
    }
    allSponsorsData = await res.json();
    if (!Array.isArray(allSponsorsData)) allSponsorsData = [];

    if (!allSponsorsData.length) {
      document.getElementById('sponsorTable').innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:40px 0;font-size:.85rem">Henüz sponsor yok. "+ Yeni Ekle" ile başlayın.</td></tr>';
      return;
    }
    document.getElementById('sponsorTable').innerHTML = allSponsorsData.map(s => \`
      <tr>
        <td><input type="checkbox" class="sponsors-select-cb" value="\${s.id}" /></td>
        <td>\${s.logo_url ? \`<img class="logo-thumb" src="\${resolveImageUrl(s.logo_url)}" alt="" />\` : '—'}</td>
        <td><b>\${s.name}</b></td>
        <td>\${s.website ? \`<a href="\${s.website}" target="_blank" style="color:var(--signal)">\${s.website}</a>\` : '—'}</td>
        <td><span class="badge badge-\${s.tier}">\${s.tier}</span></td>
        <td><span class="badge \${s.is_active ? 'badge-active' : 'badge-inactive'}">\${s.is_active ? 'Aktif' : 'Pasif'}</span></td>
        <td style="display:flex;gap:6px">
          <button class="btn btn-sm btn-primary" onclick="editSponsor(\${s.id})">Düzenle</button>
          <button class="btn btn-sm btn-danger" onclick="deleteSponsor(\${s.id})">Sil</button>
        </td>
      </tr>
    \`).join('');
  } catch (e) {
    toast('Sponsorlar yüklenemedi', 'error');
    document.getElementById('sponsorTable').innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--error);padding:30px 0;font-size:.85rem">⚠️ Veriler yüklenirken bir hata oluştu.</td></tr>';
  }
}
function openSponsorModal(s = null) {
  document.getElementById('sponsorId').value = s?.id || '';
  document.getElementById('sponsorModalTitle').textContent = s ? 'Düzenle: ' + s.name : 'Yeni Sponsor';
  document.getElementById('sponsorName').value = s?.name || '';
  document.getElementById('sponsorTier').value = s?.tier || 'standard';
  document.getElementById('sponsorLogoUrl').value = s?.logo_url || '';
  document.getElementById('sponsorWebsite').value = s?.website || '';
  document.getElementById('sponsorActive').value = String(s?.is_active ?? 1);
  document.getElementById('sponsorLogoFile').value = '';

  const preview = document.getElementById('sponsorLogoPreview');
  if (s?.logo_url) {
    preview.innerHTML = \`<img src="\${resolveImageUrl(s.logo_url)}" alt="Mevcut Logo" />\`;
  } else {
    preview.innerHTML = '';
  }
  openModal('sponsorModal');
}
function editSponsor(id) { const s = allSponsorsData.find(x => x.id === id); if (s) openSponsorModal(s); }

async function saveSponsor() {
  const btn = document.getElementById('btnSaveSponsor');
  if (btn) { btn.disabled = true; btn.textContent = 'Kaydediliyor...'; }
  try {
    const id = document.getElementById('sponsorId').value;
    if (!document.getElementById('sponsorName').value.trim()) { toast('Sponsor adı zorunludur', 'error'); return; }
    const logoFile = document.getElementById('sponsorLogoFile').files[0];
    let logoUrl = document.getElementById('sponsorLogoUrl').value;
    if (logoFile) {
      try {
        toast('Logo yükleniyor...', 'info');
        logoUrl = await uploadFile(logoFile, 'sponsors');
      } catch (e) {
        toast('Logo yüklenemedi: ' + (e.message || ''), 'error');
        return;
      }
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
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = 'Kaydet'; }
  }
}
async function deleteSponsor(id) {
  const s = allSponsorsData.find(x => x.id === id);
  const name = s?.name ? \`"\${s.name}" \` : 'Bu ';
  if (!confirm(\`\${name}sponsorunu silmek istediğinize emin misiniz?\`)) return;
  const r = await fetch(\`/api/sponsors/\${id}\`, { method: 'DELETE', credentials: 'include' });
  if (r.ok) { toast('Silindi ✓'); loadSponsors(); }
  else toast('Silme başarısız', 'error');
}

// ── Socials ───────────────────────────────────────────────────────────────────
let allSocialsData = [];
async function loadSocials() {
  try {
    const res = await fetch('/api/socials/admin/all', { credentials: 'include' });
    if (!res.ok) {
      if (res.status === 401) window.location.href = '/admin/';
      throw new Error('HTTP ' + res.status);
    }
    allSocialsData = await res.json();
    if (!Array.isArray(allSocialsData)) allSocialsData = [];

    if (!allSocialsData.length) {
      document.getElementById('socialTable').innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:40px 0;font-size:.85rem">Henüz sosyal medya linki yok. "+ Yeni Link" ile başlayın.</td></tr>';
      return;
    }
    document.getElementById('socialTable').innerHTML = allSocialsData.map(s => \`
      <tr>
        <td><input type="checkbox" class="socials-select-cb" value="\${s.id}" /></td>
        <td><b>\${s.platform}</b></td>
        <td>\${s.label}</td>
        <td><a href="\${s.url}" target="_blank" style="color:var(--signal)">\${s.url}</a></td>
        <td>\${s.order_num}</td>
        <td><span class="badge \${s.is_active ? 'badge-active' : 'badge-inactive'}">\${s.is_active ? 'Aktif' : 'Pasif'}</span></td>
        <td style="display:flex;gap:6px">
          <button class="btn btn-sm btn-primary" onclick="editSocial(\${s.id})">Düzenle</button>
          <button class="btn btn-sm btn-danger" onclick="deleteSocial(\${s.id})">Sil</button>
        </td>
      </tr>
    \`).join('');
  } catch (e) {
    toast('Sosyal medya linkleri yüklenemedi', 'error');
    document.getElementById('socialTable').innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--error);padding:30px 0;font-size:.85rem">⚠️ Veriler yüklenirken bir hata oluştu.</td></tr>';
  }
}
function openSocialModal(s = null) {
  document.getElementById('socialId').value = s?.id || '';
  document.getElementById('socialModalTitle').textContent = s ? 'Düzenle: ' + s.label : 'Yeni Sosyal Link';
  document.getElementById('socialPlatform').value = s?.platform || '';
  document.getElementById('socialLabel').value = s?.label || '';
  document.getElementById('socialUrl').value = s?.url || '';
  document.getElementById('socialOrder').value = s?.order_num || 1;
  document.getElementById('socialActive').value = String(s?.is_active ?? 1);
  openModal('socialModal');
}
function editSocial(id) { const s = allSocialsData.find(x => x.id === id); if (s) openSocialModal(s); }

async function saveSocial() {
  const btn = document.getElementById('btnSaveSocial');
  if (btn) { btn.disabled = true; btn.textContent = 'Kaydediliyor...'; }
  try {
    const id = document.getElementById('socialId').value;
    if (!document.getElementById('socialPlatform').value.trim() || !document.getElementById('socialUrl').value.trim()) { toast('Platform ve URL zorunludur', 'error'); return; }
    const body = {
      platform: document.getElementById('socialPlatform').value,
      label: document.getElementById('socialLabel').value,
      url: document.getElementById('socialUrl').value,
      order_num: parseInt(document.getElementById('socialOrder').value),
      is_active: parseInt(document.getElementById('socialActive').value),
    };
    const url = id ? \`/api/socials/\${id}\` : '/api/socials';
    const method = id ? 'PUT' : 'POST';
    const r = await fetch(url, { method, credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (r.ok) { closeModal('socialModal'); toast('Kaydedildi ✓'); loadSocials(); }
    else toast('Hata oluştu', 'error');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = 'Kaydet'; }
  }
}
async function deleteSocial(id) {
  const s = allSocialsData.find(x => x.id === id);
  const name = s?.label || s?.platform ? \`"\${s.label || s.platform}" \` : 'Bu ';
  if (!confirm(\`\${name}sosyal medya linkini silmek istediğinize emin misiniz?\`)) return;
  const r = await fetch(\`/api/socials/\${id}\`, { method: 'DELETE', credentials: 'include' });
  if (r.ok) { toast('Silindi ✓'); loadSocials(); }
  else toast('Silme başarısız', 'error');
}

// ── Gallery ───────────────────────────────────────────────────────────────────
let allGalleryData = [];
async function loadGallery() {
  try {
    const res = await fetch('/api/gallery', { credentials: 'include' });
    if (!res.ok) {
      if (res.status === 401) window.location.href = '/admin/';
      throw new Error('HTTP ' + res.status);
    }
    allGalleryData = await res.json();
    if (!Array.isArray(allGalleryData)) allGalleryData = [];

    if (!allGalleryData.length) {
      document.getElementById('galleryTable').innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--muted);padding:40px 0;font-size:.85rem">Henüz fotoğraf yok. "+ Fotoğraf Yükle" ile başlayın.</td></tr>';
      return;
    }
    document.getElementById('galleryTable').innerHTML = allGalleryData.map(g => \`
      <tr>
        <td><input type="checkbox" class="gallery-select-cb" value="\${g.id}" /></td>
        <td><img class="logo-thumb" src="\${resolveImageUrl(g.url)}" alt="" style="width:48px;height:36px" /></td>
        <td>\${g.event_tag || '—'}</td>
        <td>\${g.file_size ? Math.round(g.file_size/1024) + ' KB' : '—'}</td>
        <td style="font-size:.75rem;color:var(--muted)">\${g.uploaded_at?.slice(0,10) || ''}</td>
        <td><button class="btn btn-sm btn-danger" onclick="deleteGallery(\${g.id})">Sil</button></td>
      </tr>
    \`).join('');
  } catch (e) {
    toast('Galeri fotoğrafları yüklenemedi', 'error');
    document.getElementById('galleryTable').innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--error);padding:30px 0;font-size:.85rem">⚠️ Veriler yüklenirken bir hata oluştu.</td></tr>';
  }
}
function openGalleryModal() {
  document.getElementById('galleryFile').value = '';
  document.getElementById('galleryPreview').innerHTML = '';
  document.getElementById('galleryTag').value = '';
  openModal('galleryModal');
}

async function uploadGallery() {
  const btn = document.getElementById('btnUploadGallery');
  if (btn) { btn.disabled = true; btn.textContent = 'Yükleniyor...'; }
  try {
    const files = document.getElementById('galleryFile').files;
    if (!files.length) { toast('Lütfen en az bir dosya seçin', 'error'); return; }
    const tag = document.getElementById('galleryTag').value;
    let ok = 0;
    toast('Fotoğraflar yükleniyor...', 'info');
    for (const file of files) {
      try {
        const url = await uploadFile(file, 'gallery');
        await fetch('/api/gallery', {
          method: 'POST', credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, event_tag: tag || null, file_size: file.size }),
        });
        ok++;
      } catch (e) { toast('Yükleme hatası: ' + (e.message || ''), 'error'); }
    }
    closeModal('galleryModal');
    toast(\`\${ok} fotoğraf yüklendi ✓\`);
    loadGallery();
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = 'Yükle'; }
  }
}
async function deleteGallery(id) {
  const g = allGalleryData.find(x => x.id === id);
  const name = g?.event_tag ? \`"\${g.event_tag}" etiketli \` : 'Bu ';
  if (!confirm(\`\${name}fotoğrafı silmek istediğinize emin misiniz?\`)) return;
  const r = await fetch(\`/api/gallery/\${id}\`, { method: 'DELETE', credentials: 'include' });
  if (r.ok) { toast('Silindi ✓'); loadGallery(); }
  else toast('Silme başarısız', 'error');
}

// ── QR Codes & Analytics ──────────────────────────────────────────────────────
let allQrData = [];
let currentViewingQr = null;

function formatTrDateTime(utcStr) {
  if (!utcStr) return '—';
  try {
    const iso = utcStr.includes('T')
      ? (utcStr.endsWith('Z') ? utcStr : utcStr + 'Z')
      : utcStr.replace(' ', 'T') + 'Z';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return utcStr;
    return new Intl.DateTimeFormat('tr-TR', {
      timeZone: 'Europe/Istanbul',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(d).replace(',', '');
  } catch (e) {
    return utcStr;
  }
}

async function loadQrs() {
  try {
    const res = await fetch('/api/qr', { credentials: 'include' });
    if (!res.ok) {
      if (res.status === 401) window.location.href = '/admin/';
      throw new Error('HTTP ' + res.status);
    }
    allQrData = await res.json();
    if (!Array.isArray(allQrData)) allQrData = [];

    if (!allQrData.length) {
      document.getElementById('qrTable').innerHTML = '<tr><td colspan="9" style="text-align:center;color:var(--muted);padding:40px 0;font-size:.85rem">Henüz QR kod bulunmuyor. "+ Yeni QR Oluştur" ile başlayın.</td></tr>';
      return;
    }

    document.getElementById('qrTable').innerHTML = allQrData.map(q => \`
      <tr>
        <td><input type="checkbox" class="qr-select-cb" value="\${q.id}" /></td>
        <td>
          <div style="font-weight:600;color:var(--text);margin-bottom:2px">\${q.title}</div>
          <span class="badge badge-standard" style="cursor:pointer" onclick="openQrViewModal(\${q.id})">sastek.org/q/\${q.slug}</span>
        </td>
        <td>
          <a href="\${q.target_url}" target="_blank" rel="noopener noreferrer" style="color:var(--signal);text-decoration:none;font-size:.76rem;display:inline-block;max-width:280px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;vertical-align:middle;">
            \${q.target_url} ↗
          </a>
        </td>
        <td>
          <span class="badge \${q.is_active ? 'badge-active' : 'badge-inactive'}">
            \${q.is_active ? '● Aktif' : '○ Pasif'}
          </span>
        </td>
        <td>
          \${q.is_locked ? '<span class="badge badge-active" style="background:rgba(34,197,94,.12);color:#22c55e" title="Kilitli — Yanlışlıkla silinemez">🔒 Kilitli</span>' : '<span class="badge" style="background:rgba(255,255,255,.05);color:var(--muted)" title="Açık — Silinebilir">🔓 Açık</span>'}
        </td>
        <td><b style="color:var(--signal);font-size:.85rem">\${q.total_scans || 0}</b></td>
        <td style="font-size:.75rem">\${q.today_scans || 0} <span style="color:var(--muted)">/ \${q.last_7d_scans || 0}</span></td>
        <td style="font-size:.72rem;color:var(--muted)">\${formatTrDateTime(q.last_scanned_at)}</td>
        <td style="white-space:nowrap">
          <button class="btn btn-sm btn-secondary" onclick="openQrViewModal(\${q.id})" title="QR Kodu Gör ve İndir">👁️ QR</button>
          <button class="btn btn-sm btn-secondary" onclick="editQr(\${q.id})">Düzenle</button>
          \${q.is_locked ? \`<button class="btn btn-sm btn-secondary" onclick="toggleQrLock(\${q.id}, 0)" title="Kilidi Aç">🔓 Aç</button>\` : \`<button class="btn btn-sm btn-secondary" onclick="toggleQrLock(\${q.id}, 1)" title="Kilitle">🔒 Kilitle</button>\`}
          \${q.is_locked ? \`<button class="btn btn-sm btn-secondary" style="opacity:0.4;cursor:not-allowed" onclick="toast('Bu QR kod kilitli. Silmek için önce kilidini açmanız gerekiyor.', 'error')" title="Kilitli QR Silinemez">Sil</button>\` : \`<button class="btn btn-sm btn-danger" onclick="deleteQr(\${q.id})">Sil</button>\`}
        </td>
      </tr>
    \`).join('');
  } catch (e) {
    toast('QR kodlar yüklenemedi', 'error');
    document.getElementById('qrTable').innerHTML = '<tr><td colspan="9" style="text-align:center;color:var(--error);padding:30px 0;font-size:.85rem">⚠️ Veriler yüklenirken bir hata oluştu.</td></tr>';
  }
}

async function toggleQrLock(id, willLock) {
  const qr = allQrData.find(x => x.id === id);
  const name = qr?.title ? \`"\${qr.title}" \` : '';
  if (willLock) {
    if (!confirm(\`\${name}QR kodunu kilitlemek istediğinize emin misiniz?\\n\\n🔒 Kilitli QR kodlar silme işlemlerine (tekli veya toplu) karşı korunur.\`)) return;
  } else {
    if (!confirm(\`\${name}QR kodun kilidini açmak istediğinize emin misiniz?\\n\\n⚠️ Kilidi açtığınızda QR tekrar silinebilir hale gelecektir.\`)) return;
  }

  try {
    const r = await fetch(\`/api/qr/\${id}/toggle-lock\`, { method: 'PUT', credentials: 'include' });
    const resData = await r.json().catch(() => ({}));
    if (r.ok) {
      toast(resData.message || (willLock ? 'QR kod kilitlendi 🔒' : 'QR kod kilidi açıldı 🔓'));
      loadQrs();
    } else {
      toast(resData.error || 'İşlem başarısız', 'error');
    }
  } catch (err) {
    toast('Bağlantı hatası', 'error');
  }
}

function openQrModal(qr = null) {
  document.getElementById('qrId').value = qr ? qr.id : '';
  document.getElementById('qrTitle').value = qr ? qr.title : '';
  document.getElementById('qrSlug').value = qr ? qr.slug : '';
  document.getElementById('qrTargetUrl').value = qr ? qr.target_url : '';
  document.getElementById('qrActive').value = String(qr?.is_active ?? 1);
  document.getElementById('qrModalTitle').textContent = qr ? 'QR Kodu Düzenle' : 'Yeni QR Kod Oluştur';
  document.getElementById('qrSlugWarning').style.display = qr ? 'block' : 'none';
  const btn = document.getElementById('btnSaveQr');
  if (btn) btn.textContent = qr ? 'Güncelle' : 'Kaydet';
  openModal('qrModal');
}

function editQr(id) {
  const qr = allQrData.find(x => x.id === id);
  if (qr) openQrModal(qr);
}

function autoSlugQr() {
  const id = document.getElementById('qrId').value;
  if (id) return;
  const title = document.getElementById('qrTitle').value;
  const slugInput = document.getElementById('qrSlug');
  const trMap = { 'ç':'c','ğ':'g','ı':'i','ö':'o','ş':'s','ü':'u','Ç':'c','Ğ':'g','İ':'i','Ö':'o','Ş':'s','Ü':'u' };
  let slug = title.replace(/[çğışöüÇĞİŞÖÜ]/g, m => trMap[m] || m)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
  slugInput.value = slug;
}

async function saveQr() {
  const btn = document.getElementById('btnSaveQr');
  if (btn) { btn.disabled = true; btn.textContent = 'Kaydediliyor...'; }
  try {
    const id = document.getElementById('qrId').value;
    const title = document.getElementById('qrTitle').value.trim();
    const slug = document.getElementById('qrSlug').value.trim().toLowerCase();
    const target_url = document.getElementById('qrTargetUrl').value.trim();
    const is_active = parseInt(document.getElementById('qrActive').value);

    if (!title) { toast('QR başlığı zorunludur', 'error'); return; }
    if (!slug) { toast('Slug zorunludur', 'error'); return; }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      toast('Geçersiz slug. Yalnızca küçük harf, rakam ve tire içerebilir', 'error');
      return;
    }
    if (!target_url) { toast('Hedef URL zorunludur', 'error'); return; }
    if (!target_url.startsWith('http://') && !target_url.startsWith('https://')) {
      toast('Hedef URL http:// veya https:// ile başlamalıdır', 'error');
      return;
    }

    const body = { title, slug, target_url, is_active };
    const method = id ? 'PUT' : 'POST';
    const url = id ? \`/api/qr/\${id}\` : '/api/qr';

    const r = await fetch(url, {
      method, credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const resData = await r.json().catch(() => ({}));

    if (r.ok) {
      closeModal('qrModal');
      toast(id ? 'QR Kod güncellendi ✓' : 'QR Kod oluşturuldu ✓');
      loadQrs();
      loadStats();
    } else {
      toast(resData.error || 'Kaydetme başarısız', 'error');
    }
  } finally {
    if (btn) {
      const id = document.getElementById('qrId').value;
      btn.disabled = false;
      btn.textContent = id ? 'Güncelle' : 'Kaydet';
    }
  }
}

async function deleteQr(id) {
  const qr = allQrData.find(x => x.id === id);
  if (qr?.is_locked) {
    toast('Bu QR kod kilitli. Silmek için önce kilidini açmanız gerekiyor.', 'error');
    return;
  }
  const name = qr?.title ? \`"\${qr.title}" \` : 'Bu ';
  if (!confirm(\`\${name}QR kodu kalıcı olarak silinecek. Bu işlem geri alınamaz!\\n\\nEmin misiniz?\`)) return;

  const r = await fetch(\`/api/qr/\${id}\`, { method: 'DELETE', credentials: 'include' });
  const resData = await r.json().catch(() => ({}));
  if (r.ok) {
    toast('QR Kod silindi ✓');
    loadQrs();
    loadStats();
  } else {
    toast(resData.error || 'Silme başarısız', 'error');
  }
}

async function openQrViewModal(id) {
  const qr = allQrData.find(x => x.id === id);
  if (!qr) return;
  currentViewingQr = qr;

  document.getElementById('qrViewTitle').textContent = qr.title;
  document.getElementById('qrViewTarget').textContent = 'Hedef: ' + qr.target_url;
  const fullShortUrl = 'https://sastek.org/q/' + qr.slug;
  document.getElementById('qrViewFullUrl').textContent = fullShortUrl;

  document.getElementById('qrStatTotal').textContent = qr.total_scans || 0;
  document.getElementById('qrStatToday').textContent = qr.today_scans || 0;
  document.getElementById('qrStat7d').textContent = qr.last_7d_scans || 0;
  document.getElementById('qrStat30d').textContent = qr.last_30d_scans || 0;

  const container = document.getElementById('qrCanvasContainer');
  container.innerHTML = '<div style="color:var(--muted);font-size:.8rem;padding:40px 0;">QR yükleniyor...</div>';
  openModal('qrViewModal');

  try {
    const r = await fetch(\`/api/qr/\${qr.id}/png\`, { credentials: 'include' });
    if (!r.ok) throw new Error('QR yüklenemedi');
    const data = await r.json();
    container.innerHTML = \`<img src="\${data.dataUrl}" alt="QR Kod" style="width:240px;height:240px;display:block;margin:0 auto;border-radius:4px;" />\`;
    currentViewingQr._pngDataUrl = data.dataUrl;
  } catch (err) {
    container.innerHTML = '<div style="color:var(--error);font-size:.8rem;padding:30px 0;">⚠️ QR görseli yüklenemedi</div>';
  }
}

function copyQrLink() {
  if (!currentViewingQr) return;
  const url = 'https://sastek.org/q/' + currentViewingQr.slug;
  navigator.clipboard.writeText(url).then(() => {
    toast('QR Bağlantısı kopyalandı ✓');
  }).catch(() => {
    prompt('QR Bağlantısını kopyalayın:', url);
  });
}

async function downloadQrPng() {
  if (!currentViewingQr) return;
  try {
    let dataUrl = currentViewingQr._pngDataUrl;
    if (!dataUrl) {
      const r = await fetch(\`/api/qr/\${currentViewingQr.id}/png\`, { credentials: 'include' });
      if (!r.ok) throw new Error('İndirme başarısız');
      const data = await r.json();
      dataUrl = data.dataUrl;
    }
    const link = document.createElement('a');
    link.download = \`sastek-qr-\${currentViewingQr.slug}.png\`;
    link.href = dataUrl;
    link.click();
    toast('Yüksek kaliteli PNG indirildi ✓');
  } catch (e) {
    toast('PNG indirilemedi', 'error');
  }
}

async function downloadQrSvg() {
  if (!currentViewingQr) return;
  try {
    const r = await fetch(\`/api/qr/\${currentViewingQr.id}/svg\`, { credentials: 'include' });
    if (!r.ok) throw new Error('İndirme başarısız');
    const svgText = await r.text();
    const blob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = \`sastek-qr-\${currentViewingQr.slug}.svg\`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
    toast('Vektörel SVG indirildi ✓');
  } catch (e) {
    toast('SVG indirilemedi', 'error');
  }
}

// Init
checkAuth().then(loadStats);
</script>
</body>
</html>`;
