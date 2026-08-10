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

    .layout { display:flex; min-height:100vh; }
    .sidebar {
      width:230px; flex-shrink:0;
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

    .main { flex:1; padding:32px; max-width:1200px; }
    .page { display:none; }
    .page.active { display:block; }
    h1 { font-size:1.25rem;font-weight:700;margin-bottom:4px; }
    .page-sub { font-size:.8rem;color:var(--muted);margin-bottom:28px; }

    .stats { display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:14px;margin-bottom:32px; }
    .stat-card {
      background:var(--panel);border:1px solid var(--border);border-radius:10px;
      padding:18px 20px;
    }
    .stat-card .label { font-size:.7rem;color:var(--muted);letter-spacing:.08em;margin-bottom:6px; }
    .stat-card .value { font-size:1.6rem;font-weight:700;color:var(--signal); }

    .toolbar { display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:10px; }
    .bulk-actions { display:flex;gap:8px;align-items:center;flex-wrap:wrap; }

    .btn {
      padding:8px 16px;border-radius:7px;font-size:.8rem;font-weight:600;
      font-family:inherit;cursor:pointer;border:none;transition:all .15s;
      display:inline-flex;align-items:center;gap:6px;
    }
    .btn-primary { background:var(--signal);color:var(--navy); }
    .btn-primary:hover { opacity:.85; }
    .btn-secondary { background:var(--panel2);border:1px solid var(--border);color:var(--text); }
    .btn-secondary:hover { border-color:var(--signal);color:var(--signal); }
    .btn-danger  { background:transparent;border:1px solid var(--error);color:var(--error); }
    .btn-danger:hover  { background:var(--error);color:var(--navy); }
    .btn-sm { padding:5px 10px;font-size:.75rem; }

    table { width:100%;border-collapse:collapse;font-size:.8rem; }
    th { text-align:left;padding:10px 12px;font-size:.65rem;font-weight:600;letter-spacing:.08em;color:var(--muted);border-bottom:1px solid var(--border); }
    td { padding:10px 12px;border-bottom:1px solid rgba(30,45,69,.5);vertical-align:middle; }
    tr:hover td { background:rgba(255,255,255,.02); }
    input[type="checkbox"] { accent-color:var(--signal);cursor:pointer;width:15px;height:15px; }

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

    .logo-thumb { width:44px;height:36px;border-radius:6px;object-fit:contain;background:rgba(255,255,255,.08);padding:2px; }

    .modal-backdrop {
      display:none;position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:100;
      align-items:center;justify-content:center;
    }
    .modal-backdrop.open { display:flex; }
    .modal {
      background:var(--panel);border:1px solid var(--border);border-radius:14px;
      padding:28px;width:100%;max-width:540px;max-height:90vh;overflow-y:auto;
    }
    .modal h3 { font-size:1rem;font-weight:600;margin-bottom:20px; }
    .grid-2 { display:grid;grid-template-columns:1fr 1fr;gap:12px; }
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

    .upload-area {
      border:2px dashed var(--border);border-radius:8px;padding:16px;
      text-align:center;cursor:pointer;transition:border-color .15s;font-size:.8rem;color:var(--muted);
    }
    .upload-area:hover { border-color:var(--signal); }
    .upload-preview { margin-top:10px; display:flex; flex-wrap:wrap; justify-content:center; gap:8px; }
    .upload-preview img { max-width:100%;max-height:100px;border-radius:6px;object-fit:contain;border:1px solid var(--border); }

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
      <h1>Dashboard</h1>
      <p class="page-sub">SASTEK modüler içerik yönetim paneline hoş geldiniz.</p>
      <div class="stats" id="statsGrid">
        <div class="stat-card"><div class="label">ANLAŞMALI NOKTA</div><div class="value" id="stat-shops">—</div></div>
        <div class="stat-card"><div class="label">ETKİNLİK</div><div class="value" id="stat-events">—</div></div>
        <div class="stat-card"><div class="label">EKİP ÜYESİ</div><div class="value" id="stat-team">—</div></div>
        <div class="stat-card"><div class="label">SPONSOR</div><div class="value" id="stat-sponsors">—</div></div>
        <div class="stat-card"><div class="label">GALERİ FOTOĞRAF</div><div class="value" id="stat-gallery">—</div></div>
      </div>
    </div>

    <!-- Shops -->
    <div class="page" id="page-shops">
      <h1>Anlaşmalı Noktalar</h1>
      <p class="page-sub">Partner işletmeleri ve harita konumlarını yönetin.</p>
      <div class="toolbar">
        <div class="bulk-actions">
          <label style="display:flex;align-items:center;gap:6px;font-size:.75rem;color:var(--muted);cursor:pointer">
            <input type="checkbox" id="selectAllShops" /> Tümünü Seç
          </label>
          <button class="btn btn-secondary btn-sm" onclick="bulkSetStatus('shops', 1, loadShops)">👁️ Görünür Yap</button>
          <button class="btn btn-secondary btn-sm" onclick="bulkSetStatus('shops', 0, loadShops)">🙈 Görünmez Yap</button>
          <button class="btn btn-danger btn-sm" onclick="bulkDelete('shops', loadShops)">🗑️ Seçilenleri Sil</button>
        </div>
        <button class="btn btn-primary" onclick="openShopModal()">+ Yeni Ekle</button>
      </div>
      <table>
        <thead><tr><th><input type="checkbox" id="selectAllShopsHeader" /></th><th>LOGO</th><th>İSİM</th><th>KATEGORİ</th><th>İNDİRİM</th><th>KOORDİNAT</th><th>DURUM</th><th>İŞLEM</th></tr></thead>
        <tbody id="shopTable"></tbody>
      </table>
    </div>

    <!-- Events -->
    <div class="page" id="page-events">
      <h1>Etkinlikler</h1>
      <p class="page-sub">Kulüp etkinliklerini düzenleyin.</p>
      <div class="toolbar">
        <div class="bulk-actions">
          <label style="display:flex;align-items:center;gap:6px;font-size:.75rem;color:var(--muted);cursor:pointer">
            <input type="checkbox" id="selectAllEvents" /> Tümünü Seç
          </label>
          <button class="btn btn-secondary btn-sm" onclick="bulkSetStatus('events', 1, loadEvents)">👁️ Görünür Yap</button>
          <button class="btn btn-secondary btn-sm" onclick="bulkSetStatus('events', 0, loadEvents)">🙈 Görünmez Yap</button>
          <button class="btn btn-danger btn-sm" onclick="bulkDelete('events', loadEvents)">🗑️ Seçilenleri Sil</button>
        </div>
        <button class="btn btn-primary" onclick="openEventModal()">+ Yeni Etkinlik</button>
      </div>
      <table>
        <thead><tr><th><input type="checkbox" id="selectAllEventsHeader" /></th><th>GÖRSEL</th><th>BAŞLIK</th><th>KATEGORİ</th><th>SLUG</th><th>DURUM</th><th>İŞLEM</th></tr></thead>
        <tbody id="eventTable"></tbody>
      </table>
    </div>

    <!-- Team -->
    <div class="page" id="page-team">
      <h1>Ekip & Yönetim</h1>
      <p class="page-sub">Kulüp yönetim kurulu üyelerini yönetin.</p>
      <div class="toolbar">
        <div class="bulk-actions">
          <label style="display:flex;align-items:center;gap:6px;font-size:.75rem;color:var(--muted);cursor:pointer">
            <input type="checkbox" id="selectAllTeam" /> Tümünü Seç
          </label>
          <button class="btn btn-secondary btn-sm" onclick="bulkSetStatus('team', 1, loadTeam)">👁️ Görünür Yap</button>
          <button class="btn btn-secondary btn-sm" onclick="bulkSetStatus('team', 0, loadTeam)">🙈 Görünmez Yap</button>
          <button class="btn btn-danger btn-sm" onclick="bulkDelete('team', loadTeam)">🗑️ Seçilenleri Sil</button>
        </div>
        <button class="btn btn-primary" onclick="openTeamModal()">+ Üye Ekle</button>
      </div>
      <table>
        <thead><tr><th><input type="checkbox" id="selectAllTeamHeader" /></th><th>İSİM</th><th>ROL (TR)</th><th>E-POSTA</th><th>SIRA</th><th>DURUM</th><th>İŞLEM</th></tr></thead>
        <tbody id="teamTable"></tbody>
      </table>
    </div>

    <!-- Sponsors -->
    <div class="page" id="page-sponsors">
      <h1>Sponsorlar</h1>
      <p class="page-sub">Sponsor kurumları yönetin.</p>
      <div class="toolbar">
        <div class="bulk-actions">
          <label style="display:flex;align-items:center;gap:6px;font-size:.75rem;color:var(--muted);cursor:pointer">
            <input type="checkbox" id="selectAllSponsors" /> Tümünü Seç
          </label>
          <button class="btn btn-secondary btn-sm" onclick="bulkSetStatus('sponsors', 1, loadSponsors)">👁️ Görünür Yap</button>
          <button class="btn btn-secondary btn-sm" onclick="bulkSetStatus('sponsors', 0, loadSponsors)">🙈 Görünmez Yap</button>
          <button class="btn btn-danger btn-sm" onclick="bulkDelete('sponsors', loadSponsors)">🗑️ Seçilenleri Sil</button>
        </div>
        <button class="btn btn-primary" onclick="openSponsorModal()">+ Yeni Ekle</button>
      </div>
      <table>
        <thead><tr><th><input type="checkbox" id="selectAllSponsorsHeader" /></th><th>LOGO</th><th>İSİM</th><th>WEBSİTE</th><th>SEVİYE</th><th>DURUM</th><th>İŞLEM</th></tr></thead>
        <tbody id="sponsorTable"></tbody>
      </table>
    </div>

    <!-- Socials -->
    <div class="page" id="page-socials">
      <h1>Sosyal Medya</h1>
      <p class="page-sub">Sosyal medya hesap linklerini yönetin.</p>
      <div class="toolbar">
        <div class="bulk-actions">
          <label style="display:flex;align-items:center;gap:6px;font-size:.75rem;color:var(--muted);cursor:pointer">
            <input type="checkbox" id="selectAllSocials" /> Tümünü Seç
          </label>
          <button class="btn btn-secondary btn-sm" onclick="bulkSetStatus('socials', 1, loadSocials)">👁️ Görünür Yap</button>
          <button class="btn btn-secondary btn-sm" onclick="bulkSetStatus('socials', 0, loadSocials)">🙈 Görünmez Yap</button>
          <button class="btn btn-danger btn-sm" onclick="bulkDelete('socials', loadSocials)">🗑️ Seçilenleri Sil</button>
        </div>
        <button class="btn btn-primary" onclick="openSocialModal()">+ Yeni Link</button>
      </div>
      <table>
        <thead><tr><th><input type="checkbox" id="selectAllSocialsHeader" /></th><th>PLATFORM</th><th>LABEL</th><th>URL</th><th>SIRA</th><th>DURUM</th><th>İŞLEM</th></tr></thead>
        <tbody id="socialTable"></tbody>
      </table>
    </div>

    <!-- Gallery -->
    <div class="page" id="page-gallery">
      <h1>Galeri</h1>
      <p class="page-sub">Fotoğraf ve medya içeriklerini yönetin.</p>
      <div class="toolbar">
        <div class="bulk-actions">
          <label style="display:flex;align-items:center;gap:6px;font-size:.75rem;color:var(--muted);cursor:pointer">
            <input type="checkbox" id="selectAllGallery" /> Tümünü Seç
          </label>
          <button class="btn btn-danger btn-sm" onclick="bulkDelete('gallery', loadGallery)">🗑️ Seçilenleri Sil</button>
        </div>
        <button class="btn btn-primary" onclick="openGalleryModal()">+ Fotoğraf Yükle</button>
      </div>
      <table>
        <thead><tr><th><input type="checkbox" id="selectAllGalleryHeader" /></th><th>GÖRSEL</th><th>ETİKET</th><th>BOYUT</th><th>YÜKLENDİ</th><th>İŞLEM</th></tr></thead>
        <tbody id="galleryTable"></tbody>
      </table>
    </div>

    <!-- Developer Settings -->
    <div class="page" id="page-developer">
      <h1>⚙️ Geliştirici Ayarları & Mimari Bilgilendirme</h1>
      <p class="page-sub">Sistem altyapısı, canlı veri akışı, performans ve duyuru bandı ayarları.</p>

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

        <!-- Card 2: Manual Deploy / Build Explanation -->
        <div class="stat-card" style="padding:22px;">
          <h3 style="font-size:1rem;color:var(--text);margin-bottom:8px;display:flex;align-items:center;gap:8px;">🚀 Manuel Cloudflare Site Derlemesi (Deploy / Rebuild)</h3>
          <p style="font-size:.8rem;color:var(--muted);line-height:1.6;margin-bottom:14px;">
            Veri değişiklikleri sitede 0.1 saniye içerisinde canlı görünse de, Google arama motoru botları için statik HTML sayfalarını da Cloudflare sunucularında sıfırdan derlemek isterseniz aşağıdaki buton ile tetikleyebilirsiniz.
          </p>
          <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
            <button class="btn btn-primary" onclick="triggerManualBuild()">🚀 Statik Site Derlemesini Başlat</button>
            <span id="buildStatusMsg" style="font-size:.78rem;color:var(--success);display:none;"></span>
          </div>
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
      <button class="btn btn-primary" onclick="saveShop()">Kaydet</button>
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
    <div class="form-field"><label>GÖRSEL YÜKLE</label>
      <div class="upload-area" onclick="document.getElementById('eventImgFile').click()">
        📎 Tıkla veya sürükle
        <div class="upload-preview" id="eventImgPreview"></div>
      </div>
      <input type="file" id="eventImgFile" accept="image/*" style="display:none" />
    </div>
    <div class="form-field"><label>GÖRSEL URL</label><input id="eventImgUrl" /></div>
    <div class="form-field"><label>DURUM</label><select id="eventActive"><option value="1">Aktif</option><option value="0">Pasif</option></select></div>
    <div class="modal-actions">
      <button class="btn-ghost" onclick="closeModal('eventModal')">İptal</button>
      <button class="btn btn-primary" onclick="saveEvent()">Kaydet</button>
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
      <button class="btn btn-primary" onclick="saveTeam()">Kaydet</button>
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
      <button class="btn btn-primary" onclick="saveSponsor()">Kaydet</button>
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
      <button class="btn btn-primary" onclick="saveSocial()">Kaydet</button>
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
      <button class="btn btn-primary" onclick="uploadGallery()">Yükle</button>
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

function triggerManualBuild() {
  const msg = document.getElementById('buildStatusMsg');
  msg.style.display = 'inline';
  msg.textContent = '🚀 Derleme isteği gönderildi! Siteniz ~30s içinde yeniden inşa edilecek.';
  toast('Site derleme isteği başlatıldı ✓');
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
    if (selectAll) selectAll.checked = checked;
    if (selectAllHeader) selectAllHeader.checked = checked;
  }

  selectAll?.addEventListener('change', e => updateCheckboxes(e.target.checked));
  selectAllHeader?.addEventListener('change', e => updateCheckboxes(e.target.checked));
}
['shops', 'events', 'team', 'sponsors', 'socials', 'gallery'].forEach(setupBulkSelect);

function getSelectedIds(moduleName) {
  return Array.from(document.querySelectorAll('.' + moduleName + '-select-cb:checked')).map(cb => Number(cb.value));
}

async function bulkSetStatus(moduleName, isActive, reloadFn) {
  const ids = getSelectedIds(moduleName);
  if (!ids.length) { toast('Lütfen en az bir öğe seçin', 'error'); return; }
  const actionName = isActive ? 'görünür (aktif)' : 'görünmez (pasif)';
  if (!confirm(\`Seçilen \${ids.length} öğeyi \${actionName} yapmak istiyor musunuz?\`)) return;

  const r = await fetch(\`/api/\${moduleName}/bulk-status\`, {
    method: 'POST', credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids, is_active: isActive })
  });
  if (r.ok) { toast(\`\${ids.length} öğe \${actionName} yapıldı ✓\`); reloadFn(); }
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
  if (r.ok) { toast(\`\${ids.length} öğe silindi ✓\`); reloadFn(); }
  else toast('Hata oluştu', 'error');
}

// ── Stats ─────────────────────────────────────────────────────────────────────
async function loadStats() {
  const [shops, events, team, sponsors, gallery] = await Promise.all([
    fetch('/api/shops/admin/all', { credentials: 'include' }).then(r => r.json()).catch(()=>[]),
    fetch('/api/events/admin/all', { credentials: 'include' }).then(r => r.json()).catch(()=>[]),
    fetch('/api/team/admin/all', { credentials: 'include' }).then(r => r.json()).catch(()=>[]),
    fetch('/api/sponsors/admin/all', { credentials: 'include' }).then(r => r.json()).catch(()=>[]),
    fetch('/api/gallery', { credentials: 'include' }).then(r => r.json()).catch(()=>[]),
  ]);
  document.getElementById('stat-shops').textContent = shops.length;
  document.getElementById('stat-events').textContent = events.length;
  document.getElementById('stat-team').textContent = team.length;
  document.getElementById('stat-sponsors').textContent = sponsors.length;
  document.getElementById('stat-gallery').textContent = gallery.length;
}

// ── Shops ─────────────────────────────────────────────────────────────────────
let categories = [];
let allShopsData = [];

async function loadShops() {
  categories = await fetch('/api/shops/categories').then(r => r.json());
  allShopsData = await fetch('/api/shops/admin/all', { credentials: 'include' }).then(r => r.json());

  const sel = document.getElementById('shopCategory');
  sel.innerHTML = '<option value="">Seçiniz...</option>';
  categories.forEach(c => sel.innerHTML += \`<option value="\${c.id}">\${c.icon || ''} \${c.name_tr}</option>\`);

  document.getElementById('shopTable').innerHTML = allShopsData.map(s => \`
    <tr>
      <td><input type="checkbox" class="shops-select-cb" value="\${s.id}" /></td>
      <td>\${s.logo_url ? \`<img class="logo-thumb" src="\${resolveImageUrl(s.logo_url)}" alt="" />\` : '—'}</td>
      <td><b>\${s.name}</b></td>
      <td>\${s.category_tr || '—'}</td>
      <td>\${s.discount || '—'}</td>
      <td>\${s.lat && s.lng ? \`<span style="color:var(--success);font-size:.7rem">📍 \${s.lat.toFixed(3)}, \${s.lng.toFixed(3)}</span>\` : '<span style="color:var(--muted);font-size:.7rem">Yok</span>'}</td>
      <td><span class="badge \${s.is_active ? 'badge-active' : 'badge-inactive'}">\${s.is_active ? 'Aktif' : 'Pasif'}</span></td>
      <td style="display:flex;gap:6px">
        <button class="btn btn-sm btn-primary" onclick="editShop(\${s.id})">Düzenle</button>
        <button class="btn btn-sm btn-danger" onclick="deleteShop(\${s.id})">Sil</button>
      </td>
    </tr>
  \`).join('');
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
  const id = document.getElementById('shopId').value;
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
    lat: lat,
    lng: lng,
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
}

async function deleteShop(id) {
  if (!confirm('Bu kaydı silmek istediğinize emin misiniz?')) return;
  await fetch(\`/api/shops/\${id}\`, { method: 'DELETE', credentials: 'include' });
  toast('Silindi'); loadShops();
}

// ── Events ────────────────────────────────────────────────────────────────────
let allEventsData = [];
async function loadEvents() {
  allEventsData = await fetch('/api/events/admin/all', { credentials: 'include' }).then(r => r.json());
  document.getElementById('eventTable').innerHTML = allEventsData.map(e => \`
    <tr>
      <td><input type="checkbox" class="events-select-cb" value="\${e.id}" /></td>
      <td>\${e.image_url ? \`<img class="logo-thumb" src="\${resolveImageUrl(e.image_url)}" alt="" />\` : '—'}</td>
      <td><b>\${e.title_tr}</b></td>
      <td>\${e.category_tr || '—'}</td>
      <td><code>\${e.slug}</code></td>
      <td><span class="badge \${e.is_active ? 'badge-active' : 'badge-inactive'}">\${e.is_active ? 'Aktif' : 'Pasif'}</span></td>
      <td style="display:flex;gap:6px">
        <button class="btn btn-sm btn-primary" onclick="editEvent(\${e.id})">Düzenle</button>
        <button class="btn btn-sm btn-danger" onclick="deleteEvent(\${e.id})">Sil</button>
      </td>
    </tr>
  \`).join('');
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
  document.getElementById('eventImgUrl').value = ev?.image_url || '';
  document.getElementById('eventActive').value = String(ev?.is_active ?? 1);
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
  const id = document.getElementById('eventId').value;
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
    image_url: imgUrl,
    is_active: parseInt(document.getElementById('eventActive').value),
  };
  const url = id ? \`/api/events/\${id}\` : '/api/events';
  const method = id ? 'PUT' : 'POST';
  const r = await fetch(url, { method, credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (r.ok) { closeModal('eventModal'); toast('Kaydedildi ✓'); loadEvents(); }
  else toast('Hata oluştu', 'error');
}
async function deleteEvent(id) {
  if (!confirm('Silmek istediğinize emin misiniz?')) return;
  await fetch(\`/api/events/\${id}\`, { method: 'DELETE', credentials: 'include' });
  toast('Silindi'); loadEvents();
}

// ── Team ──────────────────────────────────────────────────────────────────────
let allTeamData = [];
async function loadTeam() {
  allTeamData = await fetch('/api/team/admin/all', { credentials: 'include' }).then(r => r.json());
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
  const id = document.getElementById('teamId').value;
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
}
async function deleteTeam(id) {
  if (!confirm('Silmek istediğinize emin misiniz?')) return;
  await fetch(\`/api/team/\${id}\`, { method: 'DELETE', credentials: 'include' });
  toast('Silindi'); loadTeam();
}

// ── Sponsors ──────────────────────────────────────────────────────────────────
let allSponsorsData = [];
async function loadSponsors() {
  allSponsorsData = await fetch('/api/sponsors/admin/all', { credentials: 'include' }).then(r => r.json());
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
  const id = document.getElementById('sponsorId').value;
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
}
async function deleteSponsor(id) {
  if (!confirm('Silmek istediğinize emin misiniz?')) return;
  await fetch(\`/api/sponsors/\${id}\`, { method: 'DELETE', credentials: 'include' });
  toast('Silindi'); loadSponsors();
}

// ── Socials ───────────────────────────────────────────────────────────────────
let allSocialsData = [];
async function loadSocials() {
  allSocialsData = await fetch('/api/socials/admin/all', { credentials: 'include' }).then(r => r.json());
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
  const id = document.getElementById('socialId').value;
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
}
async function deleteSocial(id) {
  if (!confirm('Silmek istediğinize emin misiniz?')) return;
  await fetch(\`/api/socials/\${id}\`, { method: 'DELETE', credentials: 'include' });
  toast('Silindi'); loadSocials();
}

// ── Gallery ───────────────────────────────────────────────────────────────────
async function loadGallery() {
  const items = await fetch('/api/gallery', { credentials: 'include' }).then(r => r.json());
  document.getElementById('galleryTable').innerHTML = items.map(g => \`
    <tr>
      <td><input type="checkbox" class="gallery-select-cb" value="\${g.id}" /></td>
      <td><img class="logo-thumb" src="\${resolveImageUrl(g.url)}" alt="" style="width:48px;height:36px" /></td>
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
  openModal('galleryModal');
}

async function uploadGallery() {
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
}
async function deleteGallery(id) {
  if (!confirm('Silmek istediğinize emin misiniz?')) return;
  await fetch(\`/api/gallery/\${id}\`, { method: 'DELETE', credentials: 'include' });
  toast('Silindi'); loadGallery();
}

// Init
checkAuth().then(loadStats);
</script>
</body>
</html>`;
