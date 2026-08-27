// Cloudflare Pages Function: /q/:slug
// Handles public QR redirects (https://sastek.org/q/<slug>) directly at Cloudflare Edge
// Proxies to backend Worker with manual redirect handling to return a single clean 302 to target_url

interface PagesFunctionContext {
  request: Request;
  params: Record<string, string | string[]>;
}

export async function onRequestGet(context: PagesFunctionContext): Promise<Response> {
  const rawSlug = context.params.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;
  if (!slug || typeof slug !== 'string') {
    return new Response('Geçersiz QR bağlantısı', { status: 400 });
  }

  const backendUrl = `https://admin.sastek.org/q/${encodeURIComponent(slug)}`;

  try {
    // Fetch backend with redirect: 'manual' so the 302 response from Worker is captured
    const backendRes = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'User-Agent': context.request.headers.get('User-Agent') || 'Cloudflare-Pages-QR-Proxy',
        'X-Forwarded-For': context.request.headers.get('CF-Connecting-IP') || '',
        'CF-Connecting-IP': context.request.headers.get('CF-Connecting-IP') || ''
      },
      redirect: 'manual'
    });

    // If backend returns a 302 redirect with Location header, return it directly to the browser
    if (backendRes.status === 302) {
      const targetLocation = backendRes.headers.get('Location');
      if (targetLocation) {
        return new Response(null, {
          status: 302,
          headers: {
            'Location': targetLocation,
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
          }
        });
      }
    }

    // Pass through 404 or other responses (custom 404 UI)
    const body = await backendRes.text();
    return new Response(body, {
      status: backendRes.status,
      headers: {
        'Content-Type': backendRes.headers.get('Content-Type') || 'text/html; charset=utf-8'
      }
    });
  } catch (err) {
    return new Response('QR yönlendirme servisine ulaşılamadı', { status: 502 });
  }
}