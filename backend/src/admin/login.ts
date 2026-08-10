export const loginPage = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SASTEK Admin — Giriş</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --navy:   #0a0f1e;
      --panel:  #111827;
      --border: #1e2d45;
      --signal: #00d4ff;
      --signal-soft: rgba(0, 212, 255, 0.12);
      --text:   #e2e8f0;
      --muted:  #64748b;
      --error:  #f87171;
    }
    body {
      font-family: 'Inter', sans-serif;
      background: var(--navy);
      color: var(--text);
      min-height: 100vh;
      display: grid;
      place-items: center;
    }
    .card {
      width: 100%;
      max-width: 380px;
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 40px 36px;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 32px;
    }
    .logo-dot {
      width: 10px; height: 10px;
      border-radius: 50%;
      background: var(--signal);
      box-shadow: 0 0 8px var(--signal);
      animation: pulse 2s infinite;
    }
    @keyframes pulse { 0%,100%{opacity:1}50%{opacity:.4} }
    h1 { font-size: 1rem; font-weight: 600; letter-spacing:.05em; color: var(--text); }
    .sub { font-size:.75rem; color: var(--muted); margin-top: 2px; }
    label { display:block; font-size:.75rem; color: var(--muted); margin-bottom: 6px; letter-spacing:.05em; }
    .field { margin-bottom: 18px; }
    input {
      width: 100%;
      padding: 10px 14px;
      background: rgba(255,255,255,.04);
      border: 1px solid var(--border);
      border-radius: 8px;
      color: var(--text);
      font-size: .875rem;
      font-family: inherit;
      outline: none;
      transition: border-color .2s;
    }
    input:focus { border-color: var(--signal); }
    button {
      width: 100%;
      padding: 11px;
      background: var(--signal);
      color: var(--navy);
      border: none;
      border-radius: 8px;
      font-size: .875rem;
      font-weight: 600;
      font-family: inherit;
      cursor: pointer;
      transition: opacity .2s;
      margin-top: 8px;
    }
    button:hover { opacity: .85; }
    button:disabled { opacity: .5; cursor: not-allowed; }
    .error-msg {
      color: var(--error);
      font-size: .8rem;
      margin-top: 12px;
      text-align: center;
      display: none;
    }
    .error-msg.visible { display: block; }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">
      <div class="logo-dot"></div>
      <div>
        <h1>SASTEK ADMIN</h1>
        <p class="sub">Yönetim Paneli</p>
      </div>
    </div>

    <form id="loginForm">
      <div class="field">
        <label for="username">KULLANICI ADI</label>
        <input id="username" type="text" name="username" autocomplete="username" required />
      </div>
      <div class="field">
        <label for="password">ŞİFRE</label>
        <input id="password" type="password" name="password" autocomplete="current-password" required />
      </div>
      <button type="submit" id="submitBtn">Giriş Yap</button>
      <p class="error-msg" id="errorMsg">Kullanıcı adı veya şifre hatalı.</p>
    </form>
  </div>

  <script>
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('submitBtn');
      const err = document.getElementById('errorMsg');
      btn.disabled = true;
      btn.textContent = 'Giriş yapılıyor...';
      err.classList.remove('visible');

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          username: document.getElementById('username').value,
          password: document.getElementById('password').value,
        }),
      });

      if (res.ok) {
        window.location.href = '/admin/dashboard';
      } else {
        err.classList.add('visible');
        btn.disabled = false;
        btn.textContent = 'Giriş Yap';
      }
    });
  </script>
</body>
</html>`;
