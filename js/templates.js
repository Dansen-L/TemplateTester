/**
 * templates.js — TemplateTester template data layer
 *
 * Each template object shape:
 * {
 *   slug:             string       — URL-safe identifier
 *   name:             string       — Display name
 *   categories:       string[]     — 1-3 tags
 *   paletteSwatches:  string[]     — 5 hex color values
 *   fontPairing:      { display: string, body: string }
 *   radiusScale:      'sharp'|'medium'|'pill'
 *   shadowScale:      'flat'|'raised'|'deep'
 *   density:          'compact'|'comfortable'|'airy'
 *   accentToken:      string       — CSS custom property name
 *   canonicalAccent:  string       — Default hex value
 *   hasAccentCustomizer: boolean
 *   googleFontsUrl:   string
 *   cssContent:       string       — Full scoped CSS for preview injection
 *   htmlBoilerplate:  string       — Complete standalone HTML (has __ACCENT__ and __TEMPLATE_CSS__)
 * }
 */

/* ── HTML boilerplate builder ──────────────────────────────────────────────── */

function makeBP(name, slug, fontsUrl, fontsFamily) {
  const content = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${name} — TemplateTester Boilerplate</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${fontsUrl}" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh}
__TEMPLATE_CSS__
</style>
</head>
<body>
<div class="preview-mock" data-template="${slug}">
  <nav class="mock-nav">
    <span class="mock-logo">${name}</span>
    <ul class="mock-nav-links">
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Work</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </nav>
  <section class="mock-hero">
    <h1 class="mock-hero-title">Beautiful by Design</h1>
    <p class="mock-hero-sub">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum sed arcu non odio euismod.</p>
    <div class="mock-hero-actions">
      <button class="mock-btn mock-btn-primary">Get Started</button>
      <button class="mock-btn mock-btn-ghost">Learn More</button>
    </div>
  </section>
  <section class="mock-cards">
    <div class="mock-card">
      <div class="mock-card-img"></div>
      <h3>Feature One</h3>
      <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim.</p>
    </div>
    <div class="mock-card">
      <div class="mock-card-img"></div>
      <h3>Feature Two</h3>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.</p>
    </div>
    <div class="mock-card">
      <div class="mock-card-img"></div>
      <h3>Feature Three</h3>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.</p>
    </div>
  </section>
  <section class="mock-form">
    <h2>Get in touch</h2>
    <form>
      <label>Name<input type="text" placeholder="Your name"></label>
      <label>Email<input type="email" placeholder="you@example.com"></label>
      <label>Message<textarea rows="3" placeholder="Your message…"></textarea></label>
      <button class="mock-btn mock-btn-primary" type="button">Send Message</button>
    </form>
  </section>
  <footer class="mock-footer">
    <p>© 2025 ${name} — Built with TemplateTester</p>
  </footer>
</div>
</body>
</html>`;
  return content;
}

/* ── Template definitions ──────────────────────────────────────────────────── */

export const TEMPLATES = [

  /* ── 1. Obsidian ─────────────────────────────────────────────── */
  {
    slug: 'obsidian',
    name: 'Obsidian',
    categories: ['dark', 'typographic'],
    paletteSwatches: ['#1A1A1A', '#2D2D2D', '#E63946', '#FFFFFF', '#3D3D3D'],
    fontPairing: { display: 'JetBrains Mono', body: 'JetBrains Mono' },
    radiusScale: 'sharp',
    shadowScale: 'deep',
    density: 'compact',
    accentToken: '--accent',
    canonicalAccent: '#E63946',
    hasAccentCustomizer: true,
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap',
    cssContent: `/* Obsidian — deep charcoal dark, crimson accent, sharp edges */
.preview-mock{--accent:#E63946;--bg:#1A1A1A;--surface:#2D2D2D;--text:#FFFFFF;--text-muted:#AAAAAA;--border:#3D3D3D;font-family:'JetBrains Mono',monospace;background:var(--bg);color:var(--text);min-height:100%}
.preview-mock .mock-nav{display:flex;align-items:center;justify-content:space-between;padding:12px 24px;background:#111;border-bottom:1px solid var(--accent)}
.preview-mock .mock-logo{font-size:16px;font-weight:700;color:var(--accent);letter-spacing:0.1em;text-transform:uppercase}
.preview-mock .mock-nav-links{display:flex;gap:24px;list-style:none}
.preview-mock .mock-nav-links a{color:var(--text-muted);text-decoration:none;font-size:13px;letter-spacing:0.05em;transition:color 150ms}
.preview-mock .mock-nav-links a:hover{color:var(--accent)}
.preview-mock .mock-hero{padding:60px 24px 48px;border-bottom:1px solid var(--border)}
.preview-mock .mock-hero-title{font-size:36px;font-weight:700;letter-spacing:-0.02em;margin-bottom:12px;color:var(--text)}
.preview-mock .mock-hero-sub{font-size:14px;color:var(--text-muted);max-width:480px;line-height:1.7;margin-bottom:24px}
.preview-mock .mock-hero-actions{display:flex;gap:12px;flex-wrap:wrap}
.preview-mock .mock-btn{font-family:'JetBrains Mono',monospace;font-size:13px;padding:10px 20px;border:none;cursor:pointer;letter-spacing:0.05em;text-transform:uppercase;font-weight:700}
.preview-mock .mock-btn-primary{background:var(--accent);color:#fff}
.preview-mock .mock-btn-primary:hover{filter:brightness(1.15)}
.preview-mock .mock-btn-ghost{background:transparent;color:var(--accent);border:1px solid var(--accent)}
.preview-mock .mock-btn-ghost:hover{background:rgba(230,57,70,0.1)}
.preview-mock .mock-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1px;background:var(--border);border-top:none}
.preview-mock .mock-card{background:var(--surface);padding:20px;border-top:3px solid transparent;transition:border-color 150ms}
.preview-mock .mock-card:hover{border-top-color:var(--accent)}
.preview-mock .mock-card-img{height:100px;background:var(--bg);margin-bottom:14px}
.preview-mock .mock-card h3{font-size:14px;font-weight:700;color:var(--text);margin-bottom:6px;letter-spacing:0.02em}
.preview-mock .mock-card p{font-size:12px;color:var(--text-muted);line-height:1.6}
.preview-mock .mock-form{padding:32px 24px;background:var(--surface);border-top:1px solid var(--border)}
.preview-mock .mock-form h2{font-size:18px;font-weight:700;margin-bottom:20px;color:var(--text)}
.preview-mock .mock-form form{display:flex;flex-direction:column;gap:12px;max-width:420px}
.preview-mock .mock-form label{display:flex;flex-direction:column;gap:6px;font-size:12px;color:var(--text-muted);letter-spacing:0.05em;text-transform:uppercase}
.preview-mock .mock-form input,.preview-mock .mock-form textarea{background:var(--bg);border:1px solid var(--border);color:var(--text);padding:8px 12px;font-family:inherit;font-size:13px}
.preview-mock .mock-form input:focus,.preview-mock .mock-form textarea:focus{outline:none;border-color:var(--accent)}
.preview-mock .mock-form textarea{resize:vertical}
.preview-mock .mock-footer{padding:20px 24px;text-align:center;font-size:12px;color:var(--text-muted);border-top:1px solid var(--border);letter-spacing:0.05em}`,
    htmlBoilerplate: makeBP('Obsidian', 'obsidian', 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap', 'JetBrains Mono')
  },

  /* ── 2. Arctic ───────────────────────────────────────────────── */
  {
    slug: 'arctic',
    name: 'Arctic',
    categories: ['light', 'minimal'],
    paletteSwatches: ['#F8F9FF', '#FFFFFF', '#1A56DB', '#1E293B', '#E8ECF8'],
    fontPairing: { display: 'Plus Jakarta Sans', body: 'Plus Jakarta Sans' },
    radiusScale: 'medium',
    shadowScale: 'raised',
    density: 'airy',
    accentToken: '--accent',
    canonicalAccent: '#1A56DB',
    hasAccentCustomizer: true,
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700&display=swap',
    cssContent: `/* Arctic — near-white, cobalt blue, generous whitespace */
.preview-mock{--accent:#1A56DB;--bg:#F8F9FF;--surface:#FFFFFF;--text:#1E293B;--text-muted:#64748B;--border:#E2E8F0;font-family:'Plus Jakarta Sans',sans-serif;background:var(--bg);color:var(--text);min-height:100%}
.preview-mock .mock-nav{display:flex;align-items:center;justify-content:space-between;padding:16px 40px;background:var(--surface);border-bottom:1px solid var(--border);box-shadow:0 1px 4px rgba(0,0,0,0.06)}
.preview-mock .mock-logo{font-size:18px;font-weight:700;color:var(--accent);letter-spacing:-0.02em}
.preview-mock .mock-nav-links{display:flex;gap:32px;list-style:none}
.preview-mock .mock-nav-links a{color:var(--text-muted);text-decoration:none;font-size:14px;font-weight:500;transition:color 150ms}
.preview-mock .mock-nav-links a:hover{color:var(--accent)}
.preview-mock .mock-hero{padding:80px 40px 64px;text-align:center;background:linear-gradient(180deg,#EEF2FF 0%,var(--bg) 100%)}
.preview-mock .mock-hero-title{font-size:42px;font-weight:700;letter-spacing:-0.03em;color:var(--text);margin-bottom:16px;line-height:1.15}
.preview-mock .mock-hero-sub{font-size:16px;color:var(--text-muted);max-width:520px;margin:0 auto 32px;line-height:1.7}
.preview-mock .mock-hero-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.preview-mock .mock-btn{font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:600;padding:12px 24px;border:none;border-radius:8px;cursor:pointer;transition:all 150ms}
.preview-mock .mock-btn-primary{background:var(--accent);color:#fff;box-shadow:0 2px 8px rgba(26,86,219,0.3)}
.preview-mock .mock-btn-primary:hover{background:#1748C8;box-shadow:0 4px 16px rgba(26,86,219,0.4);transform:translateY(-1px)}
.preview-mock .mock-btn-ghost{background:transparent;color:var(--accent);border:1.5px solid var(--accent)}
.preview-mock .mock-btn-ghost:hover{background:#EEF2FF}
.preview-mock .mock-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:24px;padding:48px 40px;background:var(--bg)}
.preview-mock .mock-card{background:var(--surface);border-radius:12px;padding:24px;box-shadow:0 2px 12px rgba(0,0,0,0.06);border:1px solid var(--border);transition:box-shadow 180ms,transform 180ms}
.preview-mock .mock-card:hover{box-shadow:0 8px 28px rgba(0,0,0,0.1);transform:translateY(-2px)}
.preview-mock .mock-card-img{height:120px;background:linear-gradient(135deg,#EEF2FF,#DBEAFE);border-radius:8px;margin-bottom:16px}
.preview-mock .mock-card h3{font-size:15px;font-weight:700;color:var(--text);margin-bottom:8px}
.preview-mock .mock-card p{font-size:13px;color:var(--text-muted);line-height:1.6}
.preview-mock .mock-form{padding:48px 40px;background:var(--surface);border-top:1px solid var(--border)}
.preview-mock .mock-form h2{font-size:22px;font-weight:700;letter-spacing:-0.02em;margin-bottom:28px;color:var(--text)}
.preview-mock .mock-form form{display:flex;flex-direction:column;gap:16px;max-width:460px}
.preview-mock .mock-form label{display:flex;flex-direction:column;gap:6px;font-size:13px;font-weight:500;color:var(--text)}
.preview-mock .mock-form input,.preview-mock .mock-form textarea{background:var(--bg);border:1.5px solid var(--border);border-radius:8px;color:var(--text);padding:10px 14px;font-family:inherit;font-size:14px;transition:border-color 150ms}
.preview-mock .mock-form input:focus,.preview-mock .mock-form textarea:focus{outline:none;border-color:var(--accent)}
.preview-mock .mock-footer{padding:32px 40px;text-align:center;font-size:13px;color:var(--text-muted);border-top:1px solid var(--border)}`,
    htmlBoilerplate: makeBP('Arctic', 'arctic', 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700&display=swap', 'Plus Jakarta Sans')
  },

  /* ── 3. Velvet ───────────────────────────────────────────────── */
  {
    slug: 'velvet',
    name: 'Velvet',
    categories: ['dark', 'colorful', 'typographic'],
    paletteSwatches: ['#2D0A3E', '#3D1654', '#D4AF37', '#F5F0FF', '#5A2272'],
    fontPairing: { display: 'Cormorant Garamond', body: 'DM Sans' },
    radiusScale: 'medium',
    shadowScale: 'deep',
    density: 'comfortable',
    accentToken: '--accent',
    canonicalAccent: '#D4AF37',
    hasAccentCustomizer: true,
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@400;500&display=swap',
    cssContent: `/* Velvet — rich eggplant purple, gold accent */
.preview-mock{--accent:#D4AF37;--bg:#2D0A3E;--surface:#3D1654;--text:#F5F0FF;--text-muted:#B09FC0;--border:#5A2272;font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--text);min-height:100%}
.preview-mock .mock-nav{display:flex;align-items:center;justify-content:space-between;padding:14px 32px;background:rgba(28,6,38,0.95);border-bottom:1px solid rgba(212,175,55,0.25);backdrop-filter:blur(8px)}
.preview-mock .mock-logo{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:700;color:var(--accent);letter-spacing:0.05em}
.preview-mock .mock-nav-links{display:flex;gap:28px;list-style:none}
.preview-mock .mock-nav-links a{color:var(--text-muted);text-decoration:none;font-size:14px;font-weight:500;transition:color 150ms}
.preview-mock .mock-nav-links a:hover{color:var(--accent)}
.preview-mock .mock-hero{padding:72px 32px 56px;background:linear-gradient(135deg,#3D1654 0%,#2D0A3E 60%,#1A0528 100%);border-bottom:1px solid rgba(212,175,55,0.2)}
.preview-mock .mock-hero-title{font-family:'Cormorant Garamond',serif;font-size:48px;font-weight:700;letter-spacing:0.02em;color:var(--text);margin-bottom:14px;line-height:1.15}
.preview-mock .mock-hero-sub{font-size:15px;color:var(--text-muted);max-width:500px;line-height:1.75;margin-bottom:28px}
.preview-mock .mock-hero-actions{display:flex;gap:14px;flex-wrap:wrap}
.preview-mock .mock-btn{font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;padding:12px 26px;border:none;border-radius:8px;cursor:pointer;letter-spacing:0.02em;transition:all 150ms}
.preview-mock .mock-btn-primary{background:var(--accent);color:#1A0528;font-weight:700}
.preview-mock .mock-btn-primary:hover{filter:brightness(1.1);transform:translateY(-1px)}
.preview-mock .mock-btn-ghost{background:transparent;color:var(--accent);border:1px solid var(--accent)}
.preview-mock .mock-btn-ghost:hover{background:rgba(212,175,55,0.08)}
.preview-mock .mock-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px;padding:40px 32px;background:var(--bg)}
.preview-mock .mock-card{background:var(--surface);border-radius:10px;padding:22px;border:1px solid rgba(212,175,55,0.15);box-shadow:0 4px 20px rgba(0,0,0,0.4);transition:box-shadow 180ms,transform 180ms}
.preview-mock .mock-card:hover{box-shadow:0 8px 32px rgba(212,175,55,0.15);transform:translateY(-2px)}
.preview-mock .mock-card-img{height:110px;background:linear-gradient(135deg,#4A1E6B,#2D0A3E);border-radius:6px;margin-bottom:14px;border:1px solid rgba(212,175,55,0.1)}
.preview-mock .mock-card h3{font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:700;color:var(--accent);margin-bottom:8px}
.preview-mock .mock-card p{font-size:13px;color:var(--text-muted);line-height:1.65}
.preview-mock .mock-form{padding:40px 32px;background:var(--surface)}
.preview-mock .mock-form h2{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:700;color:var(--text);margin-bottom:24px}
.preview-mock .mock-form form{display:flex;flex-direction:column;gap:14px;max-width:440px}
.preview-mock .mock-form label{display:flex;flex-direction:column;gap:6px;font-size:12px;font-weight:500;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.08em}
.preview-mock .mock-form input,.preview-mock .mock-form textarea{background:var(--bg);border:1px solid var(--border);border-radius:8px;color:var(--text);padding:10px 14px;font-family:inherit;font-size:14px;transition:border-color 150ms}
.preview-mock .mock-form input:focus,.preview-mock .mock-form textarea:focus{outline:none;border-color:var(--accent)}
.preview-mock .mock-footer{padding:24px 32px;text-align:center;font-size:12px;color:var(--text-muted);border-top:1px solid rgba(212,175,55,0.15);letter-spacing:0.05em}`,
    htmlBoilerplate: makeBP('Velvet', 'velvet', 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@400;500&display=swap', 'Cormorant Garamond')
  },

  /* ── 4. Forge ────────────────────────────────────────────────── */
  {
    slug: 'forge',
    name: 'Forge',
    categories: ['minimal', 'typographic'],
    paletteSwatches: ['#3D3D3D', '#555555', '#FF6B00', '#F5F5F5', '#2A2A2A'],
    fontPairing: { display: 'Barlow Condensed', body: 'Barlow Condensed' },
    radiusScale: 'sharp',
    shadowScale: 'flat',
    density: 'compact',
    accentToken: '--accent',
    canonicalAccent: '#FF6B00',
    hasAccentCustomizer: true,
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;800&display=swap',
    cssContent: `/* Forge — industrial grey, orange accent, bold weight */
.preview-mock{--accent:#FF6B00;--bg:#2A2A2A;--surface:#3D3D3D;--text:#F5F5F5;--text-muted:#9E9E9E;--border:#555555;font-family:'Barlow Condensed',sans-serif;background:var(--bg);color:var(--text);min-height:100%}
.preview-mock .mock-nav{display:flex;align-items:center;justify-content:space-between;padding:8px 20px;background:var(--surface);border-bottom:3px solid var(--accent)}
.preview-mock .mock-logo{font-size:20px;font-weight:800;color:var(--text);letter-spacing:0.15em;text-transform:uppercase}
.preview-mock .mock-nav-links{display:flex;gap:20px;list-style:none}
.preview-mock .mock-nav-links a{color:var(--text-muted);text-decoration:none;font-size:14px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;transition:color 100ms}
.preview-mock .mock-nav-links a:hover{color:var(--accent)}
.preview-mock .mock-hero{padding:48px 20px 40px;border-bottom:1px solid var(--border)}
.preview-mock .mock-hero-title{font-size:52px;font-weight:800;letter-spacing:0.05em;text-transform:uppercase;color:var(--text);margin-bottom:10px;line-height:1;border-left:6px solid var(--accent);padding-left:16px}
.preview-mock .mock-hero-sub{font-size:15px;color:var(--text-muted);max-width:500px;line-height:1.5;margin-bottom:20px}
.preview-mock .mock-hero-actions{display:flex;gap:10px;flex-wrap:wrap}
.preview-mock .mock-btn{font-family:'Barlow Condensed',sans-serif;font-size:14px;font-weight:700;padding:10px 20px;border:none;cursor:pointer;letter-spacing:0.08em;text-transform:uppercase;transition:all 100ms}
.preview-mock .mock-btn-primary{background:var(--accent);color:#fff}
.preview-mock .mock-btn-primary:hover{background:#FF8800}
.preview-mock .mock-btn-ghost{background:transparent;color:var(--accent);border:2px solid var(--accent)}
.preview-mock .mock-btn-ghost:hover{background:rgba(255,107,0,0.1)}
.preview-mock .mock-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border)}
.preview-mock .mock-card{background:var(--surface);padding:18px;transition:background 100ms}
.preview-mock .mock-card:hover{background:#4A4A4A}
.preview-mock .mock-card-img{height:90px;background:var(--bg);margin-bottom:12px;border-top:3px solid var(--accent)}
.preview-mock .mock-card h3{font-size:16px;font-weight:800;color:var(--text);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.05em}
.preview-mock .mock-card p{font-size:13px;color:var(--text-muted);line-height:1.5}
.preview-mock .mock-form{padding:28px 20px;background:var(--bg);border-top:1px solid var(--border)}
.preview-mock .mock-form h2{font-size:22px;font-weight:800;text-transform:uppercase;letter-spacing:0.05em;color:var(--text);margin-bottom:16px}
.preview-mock .mock-form form{display:flex;flex-direction:column;gap:10px;max-width:400px}
.preview-mock .mock-form label{display:flex;flex-direction:column;gap:4px;font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.1em}
.preview-mock .mock-form input,.preview-mock .mock-form textarea{background:var(--surface);border:none;border-bottom:2px solid var(--border);color:var(--text);padding:8px 0;font-family:inherit;font-size:14px;transition:border-color 100ms}
.preview-mock .mock-form input:focus,.preview-mock .mock-form textarea:focus{outline:none;border-bottom-color:var(--accent)}
.preview-mock .mock-footer{padding:16px 20px;text-align:left;font-size:12px;color:var(--text-muted);border-top:1px solid var(--border);letter-spacing:0.1em;text-transform:uppercase}`,
    htmlBoilerplate: makeBP('Forge', 'forge', 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;800&display=swap', 'Barlow Condensed')
  },

  /* ── 5. Sakura ───────────────────────────────────────────────── */
  {
    slug: 'sakura',
    name: 'Sakura',
    categories: ['light', 'colorful'],
    paletteSwatches: ['#FFE4EC', '#FFF0F5', '#4A3728', '#D4707A', '#F9C6D0'],
    fontPairing: { display: 'Noto Serif', body: 'Noto Serif' },
    radiusScale: 'pill',
    shadowScale: 'raised',
    density: 'airy',
    accentToken: '--accent',
    canonicalAccent: '#D4707A',
    hasAccentCustomizer: true,
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400&display=swap',
    cssContent: `/* Sakura — blush pink, soft ink, rounded pill forms */
.preview-mock{--accent:#D4707A;--bg:#FFF0F5;--surface:#FFFFFF;--text:#4A3728;--text-muted:#9B7B7B;--border:#F9C6D0;font-family:'Noto Serif',serif;background:var(--bg);color:var(--text);min-height:100%}
.preview-mock .mock-nav{display:flex;align-items:center;justify-content:space-between;padding:16px 36px;background:rgba(255,255,255,0.85);backdrop-filter:blur(12px);border-bottom:1px solid var(--border)}
.preview-mock .mock-logo{font-size:20px;font-weight:700;color:var(--accent);font-style:italic;letter-spacing:0.02em}
.preview-mock .mock-nav-links{display:flex;gap:28px;list-style:none}
.preview-mock .mock-nav-links a{color:var(--text-muted);text-decoration:none;font-size:14px;font-style:italic;transition:color 150ms}
.preview-mock .mock-nav-links a:hover{color:var(--accent)}
.preview-mock .mock-hero{padding:80px 36px 64px;text-align:center;background:radial-gradient(ellipse at 50% 0%,#FFD6E0 0%,var(--bg) 70%)}
.preview-mock .mock-hero-title{font-size:44px;font-weight:700;font-style:italic;color:var(--text);margin-bottom:16px;line-height:1.2}
.preview-mock .mock-hero-sub{font-size:15px;color:var(--text-muted);max-width:480px;margin:0 auto 32px;line-height:1.8;font-style:italic}
.preview-mock .mock-hero-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.preview-mock .mock-btn{font-family:'Noto Serif',serif;font-size:14px;font-weight:700;padding:12px 28px;border:none;border-radius:100px;cursor:pointer;transition:all 150ms}
.preview-mock .mock-btn-primary{background:var(--accent);color:#fff;box-shadow:0 4px 16px rgba(212,112,122,0.35)}
.preview-mock .mock-btn-primary:hover{background:#C05A66;box-shadow:0 6px 20px rgba(212,112,122,0.45);transform:translateY(-1px)}
.preview-mock .mock-btn-ghost{background:transparent;color:var(--accent);border:1.5px solid var(--accent)}
.preview-mock .mock-btn-ghost:hover{background:rgba(212,112,122,0.08)}
.preview-mock .mock-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:20px;padding:48px 36px}
.preview-mock .mock-card{background:var(--surface);border-radius:20px;padding:24px;box-shadow:0 4px 20px rgba(212,112,122,0.1);border:1px solid var(--border);transition:box-shadow 180ms,transform 180ms}
.preview-mock .mock-card:hover{box-shadow:0 8px 32px rgba(212,112,122,0.2);transform:translateY(-2px)}
.preview-mock .mock-card-img{height:110px;background:linear-gradient(135deg,#FFD6E0,#F9C6D0);border-radius:16px;margin-bottom:16px}
.preview-mock .mock-card h3{font-size:16px;font-weight:700;color:var(--text);margin-bottom:8px;font-style:italic}
.preview-mock .mock-card p{font-size:13px;color:var(--text-muted);line-height:1.7;font-style:italic}
.preview-mock .mock-form{padding:48px 36px;background:var(--surface);border-top:1px solid var(--border)}
.preview-mock .mock-form h2{font-size:24px;font-weight:700;font-style:italic;color:var(--text);margin-bottom:24px}
.preview-mock .mock-form form{display:flex;flex-direction:column;gap:16px;max-width:440px}
.preview-mock .mock-form label{display:flex;flex-direction:column;gap:6px;font-size:13px;font-style:italic;color:var(--text-muted)}
.preview-mock .mock-form input,.preview-mock .mock-form textarea{background:var(--bg);border:1.5px solid var(--border);border-radius:100px;color:var(--text);padding:10px 18px;font-family:inherit;font-size:14px;transition:border-color 150ms}
.preview-mock .mock-form textarea{border-radius:16px}
.preview-mock .mock-form input:focus,.preview-mock .mock-form textarea:focus{outline:none;border-color:var(--accent)}
.preview-mock .mock-footer{padding:28px 36px;text-align:center;font-size:13px;font-style:italic;color:var(--text-muted);border-top:1px solid var(--border)}`,
    htmlBoilerplate: makeBP('Sakura', 'sakura', 'https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400&display=swap', 'Noto Serif')
  },

  /* ── 6. Nocturne ─────────────────────────────────────────────── */
  {
    slug: 'nocturne',
    name: 'Nocturne',
    categories: ['dark', 'typographic', 'retro'],
    paletteSwatches: ['#0D1B2A', '#1B2B3A', '#00F5D4', '#E8F4F8', '#1A3A52'],
    fontPairing: { display: 'Fira Code', body: 'Fira Code' },
    radiusScale: 'sharp',
    shadowScale: 'flat',
    density: 'compact',
    accentToken: '--accent',
    canonicalAccent: '#00F5D4',
    hasAccentCustomizer: true,
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&display=swap',
    cssContent: `/* Nocturne — navy dark, electric teal, code-editor aesthetic */
.preview-mock{--accent:#00F5D4;--bg:#0D1B2A;--surface:#1B2B3A;--text:#E8F4F8;--text-muted:#7AA2B8;--border:#1A3A52;font-family:'Fira Code',monospace;background:var(--bg);color:var(--text);min-height:100%}
.preview-mock .mock-nav{display:flex;align-items:center;justify-content:space-between;padding:10px 20px;background:var(--surface);border-bottom:1px solid var(--border);font-size:13px}
.preview-mock .mock-logo{font-size:14px;font-weight:700;color:var(--accent);letter-spacing:0.1em}
.preview-mock .mock-logo::before{content:'> ';color:var(--text-muted)}
.preview-mock .mock-nav-links{display:flex;gap:20px;list-style:none}
.preview-mock .mock-nav-links a{color:var(--text-muted);text-decoration:none;font-size:12px;transition:color 100ms}
.preview-mock .mock-nav-links a:hover{color:var(--accent)}
.preview-mock .mock-nav-links li::before{content:'#';color:var(--accent);margin-right:4px}
.preview-mock .mock-hero{padding:56px 20px 44px;border-bottom:1px solid var(--border)}
.preview-mock .mock-hero-title{font-size:32px;font-weight:700;color:var(--text);margin-bottom:10px;line-height:1.15}
.preview-mock .mock-hero-title::before{content:'// ';color:var(--text-muted);font-size:18px}
.preview-mock .mock-hero-sub{font-size:13px;color:var(--text-muted);max-width:480px;line-height:1.7;margin-bottom:22px;border-left:2px solid var(--accent);padding-left:12px}
.preview-mock .mock-hero-actions{display:flex;gap:10px;flex-wrap:wrap}
.preview-mock .mock-btn{font-family:'Fira Code',monospace;font-size:12px;padding:9px 18px;border:none;cursor:pointer;letter-spacing:0.05em;transition:all 100ms}
.preview-mock .mock-btn-primary{background:var(--accent);color:#0D1B2A;font-weight:700}
.preview-mock .mock-btn-primary:hover{background:#00DDBC}
.preview-mock .mock-btn-ghost{background:transparent;color:var(--accent);border:1px solid var(--accent)}
.preview-mock .mock-btn-ghost:hover{background:rgba(0,245,212,0.08)}
.preview-mock .mock-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1px;background:var(--border)}
.preview-mock .mock-card{background:var(--surface);padding:18px;transition:background 100ms}
.preview-mock .mock-card:hover{background:#223344}
.preview-mock .mock-card-img{height:90px;background:var(--bg);margin-bottom:12px;border:1px solid var(--border)}
.preview-mock .mock-card h3{font-size:13px;font-weight:700;color:var(--accent);margin-bottom:6px}
.preview-mock .mock-card h3::before{content:'fn ';color:var(--text-muted)}
.preview-mock .mock-card p{font-size:12px;color:var(--text-muted);line-height:1.6}
.preview-mock .mock-form{padding:28px 20px;background:var(--bg);border-top:1px solid var(--border)}
.preview-mock .mock-form h2{font-size:16px;font-weight:700;color:var(--text);margin-bottom:18px}
.preview-mock .mock-form h2::before{content:'/* ';color:var(--text-muted)}
.preview-mock .mock-form h2::after{content:' */';color:var(--text-muted)}
.preview-mock .mock-form form{display:flex;flex-direction:column;gap:10px;max-width:400px}
.preview-mock .mock-form label{display:flex;flex-direction:column;gap:4px;font-size:11px;color:var(--text-muted)}
.preview-mock .mock-form label::before{content:'// ';color:var(--accent)}
.preview-mock .mock-form input,.preview-mock .mock-form textarea{background:var(--surface);border:1px solid var(--border);color:var(--text);padding:8px 12px;font-family:inherit;font-size:12px;transition:border-color 100ms}
.preview-mock .mock-form input:focus,.preview-mock .mock-form textarea:focus{outline:none;border-color:var(--accent)}
.preview-mock .mock-footer{padding:14px 20px;text-align:right;font-size:11px;color:var(--text-muted);border-top:1px solid var(--border)}
.preview-mock .mock-footer::before{content:'/* '}
.preview-mock .mock-footer::after{content:' */'}`,
    htmlBoilerplate: makeBP('Nocturne', 'nocturne', 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&display=swap', 'Fira Code')
  },

  /* ── 7. Terra ────────────────────────────────────────────────── */
  {
    slug: 'terra',
    name: 'Terra',
    categories: ['light', 'colorful'],
    paletteSwatches: ['#C4714A', '#E8906A', '#6B8F5E', '#FDF6EE', '#8B5A3C'],
    fontPairing: { display: 'Lora', body: 'Lora' },
    radiusScale: 'medium',
    shadowScale: 'raised',
    density: 'comfortable',
    accentToken: '--accent',
    canonicalAccent: '#6B8F5E',
    hasAccentCustomizer: true,
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400&display=swap',
    cssContent: `/* Terra — warm clay, sage green, earthy texture */
.preview-mock{--accent:#6B8F5E;--bg:#FDF6EE;--surface:#FFF8F0;--text:#4A3728;--text-muted:#8B6B55;--border:#E8D5C0;font-family:'Lora',serif;background:var(--bg);background-image:radial-gradient(circle at 25% 25%,rgba(196,113,74,0.05) 0%,transparent 60%),radial-gradient(circle at 75% 75%,rgba(107,143,94,0.05) 0%,transparent 60%);color:var(--text);min-height:100%}
.preview-mock .mock-nav{display:flex;align-items:center;justify-content:space-between;padding:14px 32px;background:rgba(253,246,238,0.9);backdrop-filter:blur(8px);border-bottom:1px solid var(--border)}
.preview-mock .mock-logo{font-size:20px;font-weight:700;color:var(--accent);font-style:italic}
.preview-mock .mock-nav-links{display:flex;gap:28px;list-style:none}
.preview-mock .mock-nav-links a{color:var(--text-muted);text-decoration:none;font-size:14px;font-style:italic;transition:color 150ms}
.preview-mock .mock-nav-links a:hover{color:var(--accent)}
.preview-mock .mock-hero{padding:64px 32px 52px;background:linear-gradient(160deg,#FFF4E6 0%,var(--bg) 100%);border-bottom:1px solid var(--border)}
.preview-mock .mock-hero-title{font-size:42px;font-weight:700;font-style:italic;color:#4A3728;margin-bottom:14px;line-height:1.2}
.preview-mock .mock-hero-sub{font-size:15px;color:var(--text-muted);max-width:480px;line-height:1.8;margin-bottom:28px}
.preview-mock .mock-hero-actions{display:flex;gap:12px;flex-wrap:wrap}
.preview-mock .mock-btn{font-family:'Lora',serif;font-size:14px;padding:11px 24px;border:none;border-radius:8px;cursor:pointer;font-style:italic;transition:all 150ms}
.preview-mock .mock-btn-primary{background:var(--accent);color:#fff;box-shadow:0 3px 12px rgba(107,143,94,0.3)}
.preview-mock .mock-btn-primary:hover{background:#5A7D4E;transform:translateY(-1px)}
.preview-mock .mock-btn-ghost{background:transparent;color:var(--accent);border:1.5px solid var(--accent)}
.preview-mock .mock-btn-ghost:hover{background:rgba(107,143,94,0.08)}
.preview-mock .mock-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:20px;padding:40px 32px}
.preview-mock .mock-card{background:var(--surface);border-radius:10px;padding:22px;box-shadow:0 2px 12px rgba(139,90,60,0.1);border:1px solid var(--border);transition:box-shadow 180ms}
.preview-mock .mock-card:hover{box-shadow:0 6px 24px rgba(139,90,60,0.18)}
.preview-mock .mock-card-img{height:110px;background:linear-gradient(135deg,#E8D5C0,#C4B08A);border-radius:8px;margin-bottom:14px}
.preview-mock .mock-card h3{font-size:16px;font-weight:700;color:var(--text);margin-bottom:8px}
.preview-mock .mock-card p{font-size:13px;color:var(--text-muted);line-height:1.7}
.preview-mock .mock-form{padding:40px 32px;background:var(--surface);border-top:1px solid var(--border)}
.preview-mock .mock-form h2{font-size:24px;font-weight:700;font-style:italic;color:var(--text);margin-bottom:24px}
.preview-mock .mock-form form{display:flex;flex-direction:column;gap:14px;max-width:440px}
.preview-mock .mock-form label{display:flex;flex-direction:column;gap:6px;font-size:13px;color:var(--text-muted)}
.preview-mock .mock-form input,.preview-mock .mock-form textarea{background:var(--bg);border:1.5px solid var(--border);border-radius:8px;color:var(--text);padding:10px 14px;font-family:inherit;font-size:14px;transition:border-color 150ms}
.preview-mock .mock-form input:focus,.preview-mock .mock-form textarea:focus{outline:none;border-color:var(--accent)}
.preview-mock .mock-footer{padding:24px 32px;text-align:center;font-size:13px;font-style:italic;color:var(--text-muted);border-top:1px solid var(--border)}`,
    htmlBoilerplate: makeBP('Terra', 'terra', 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400&display=swap', 'Lora')
  },

  /* ── 8. Glacier ──────────────────────────────────────────────── */
  {
    slug: 'glacier',
    name: 'Glacier',
    categories: ['light', 'glassmorphism', 'minimal'],
    paletteSwatches: ['#EBF5FF', '#FFFFFF', '#87CEEB', '#1A3A4A', 'rgba(255,255,255,0.6)'],
    fontPairing: { display: 'Sora', body: 'Sora' },
    radiusScale: 'pill',
    shadowScale: 'raised',
    density: 'airy',
    accentToken: '--accent',
    canonicalAccent: '#4A90D9',
    hasAccentCustomizer: true,
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap',
    cssContent: `/* Glacier — translucent frosted-glass panels, sky tones */
.preview-mock{--accent:#4A90D9;--bg:linear-gradient(135deg,#A8D8EA 0%,#C9E8F5 40%,#E8F5FF 100%);--surface:rgba(255,255,255,0.65);--text:#1A3A4A;--text-muted:#5A8099;--border:rgba(255,255,255,0.8);font-family:'Sora',sans-serif;background:linear-gradient(135deg,#A8D8EA 0%,#C9E8F5 40%,#E8F5FF 100%);color:var(--text);min-height:100%}
.preview-mock .mock-nav{display:flex;align-items:center;justify-content:space-between;padding:16px 36px;background:rgba(255,255,255,0.7);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,0.8)}
.preview-mock .mock-logo{font-size:18px;font-weight:700;color:var(--accent);letter-spacing:-0.02em}
.preview-mock .mock-nav-links{display:flex;gap:28px;list-style:none}
.preview-mock .mock-nav-links a{color:var(--text-muted);text-decoration:none;font-size:14px;font-weight:500;transition:color 150ms}
.preview-mock .mock-nav-links a:hover{color:var(--accent)}
.preview-mock .mock-hero{padding:72px 36px 60px;text-align:center}
.preview-mock .mock-hero-title{font-size:44px;font-weight:700;letter-spacing:-0.03em;color:var(--text);margin-bottom:16px;line-height:1.15}
.preview-mock .mock-hero-sub{font-size:15px;color:var(--text-muted);max-width:500px;margin:0 auto 32px;line-height:1.75}
.preview-mock .mock-hero-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.preview-mock .mock-btn{font-family:'Sora',sans-serif;font-size:14px;font-weight:600;padding:12px 28px;border:none;border-radius:100px;cursor:pointer;transition:all 150ms}
.preview-mock .mock-btn-primary{background:var(--accent);color:#fff;box-shadow:0 4px 16px rgba(74,144,217,0.35)}
.preview-mock .mock-btn-primary:hover{background:#3A7BC8;transform:translateY(-2px);box-shadow:0 8px 24px rgba(74,144,217,0.4)}
.preview-mock .mock-btn-ghost{background:rgba(255,255,255,0.6);color:var(--accent);border:1.5px solid rgba(255,255,255,0.9);backdrop-filter:blur(8px)}
.preview-mock .mock-btn-ghost:hover{background:rgba(255,255,255,0.8)}
.preview-mock .mock-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:20px;padding:48px 36px}
.preview-mock .mock-card{background:rgba(255,255,255,0.6);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:20px;padding:24px;border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 20px rgba(74,144,217,0.1);transition:box-shadow 180ms,transform 180ms}
.preview-mock .mock-card:hover{box-shadow:0 8px 32px rgba(74,144,217,0.2);transform:translateY(-2px)}
.preview-mock .mock-card-img{height:110px;background:linear-gradient(135deg,rgba(74,144,217,0.2),rgba(168,216,234,0.4));border-radius:14px;margin-bottom:16px;border:1px solid rgba(255,255,255,0.8)}
.preview-mock .mock-card h3{font-size:15px;font-weight:700;color:var(--text);margin-bottom:8px}
.preview-mock .mock-card p{font-size:13px;color:var(--text-muted);line-height:1.65}
.preview-mock .mock-form{padding:48px 36px}
.preview-mock .mock-form h2{font-size:24px;font-weight:700;letter-spacing:-0.02em;color:var(--text);margin-bottom:24px}
.preview-mock .mock-form form{display:flex;flex-direction:column;gap:16px;max-width:440px}
.preview-mock .mock-form label{display:flex;flex-direction:column;gap:6px;font-size:13px;font-weight:600;color:var(--text)}
.preview-mock .mock-form input,.preview-mock .mock-form textarea{background:rgba(255,255,255,0.65);backdrop-filter:blur(8px);border:1.5px solid rgba(255,255,255,0.9);border-radius:100px;color:var(--text);padding:10px 18px;font-family:inherit;font-size:14px;transition:border-color 150ms}
.preview-mock .mock-form textarea{border-radius:16px}
.preview-mock .mock-form input:focus,.preview-mock .mock-form textarea:focus{outline:none;border-color:var(--accent)}
.preview-mock .mock-footer{padding:28px 36px;text-align:center;font-size:13px;color:var(--text-muted);border-top:1px solid rgba(255,255,255,0.6)}`,
    htmlBoilerplate: makeBP('Glacier', 'glacier', 'https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap', 'Sora')
  },

  /* ── 9. Ember ────────────────────────────────────────────────── */
  {
    slug: 'ember',
    name: 'Ember',
    categories: ['dark', 'colorful', 'typographic'],
    paletteSwatches: ['#7B2D00', '#A64200', '#FFF8F0', '#F4C79A', '#5C2200'],
    fontPairing: { display: 'Playfair Display', body: 'Playfair Display' },
    radiusScale: 'medium',
    shadowScale: 'deep',
    density: 'comfortable',
    accentToken: '--accent',
    canonicalAccent: '#F4C79A',
    hasAccentCustomizer: true,
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap',
    cssContent: `/* Ember — burnt sienna, warm cream, candle glow */
.preview-mock{--accent:#F4C79A;--bg:linear-gradient(160deg,#3D1200 0%,#7B2D00 40%,#A64200 100%);--surface:rgba(91,35,0,0.9);--text:#FFF8F0;--text-muted:#C4A882;--border:rgba(244,199,154,0.2);font-family:'Playfair Display',serif;background:linear-gradient(160deg,#3D1200 0%,#7B2D00 40%,#A64200 100%);color:var(--text);min-height:100%}
.preview-mock .mock-nav{display:flex;align-items:center;justify-content:space-between;padding:14px 32px;background:rgba(30,8,0,0.8);backdrop-filter:blur(8px);border-bottom:1px solid var(--border)}
.preview-mock .mock-logo{font-size:22px;font-weight:700;color:var(--accent);letter-spacing:0.05em}
.preview-mock .mock-nav-links{display:flex;gap:28px;list-style:none}
.preview-mock .mock-nav-links a{color:var(--text-muted);text-decoration:none;font-size:14px;font-style:italic;transition:color 150ms}
.preview-mock .mock-nav-links a:hover{color:var(--accent)}
.preview-mock .mock-hero{padding:72px 32px 56px;text-align:center}
.preview-mock .mock-hero-title{font-size:48px;font-weight:700;font-style:italic;color:var(--text);margin-bottom:16px;line-height:1.15;text-shadow:0 0 40px rgba(244,199,154,0.3)}
.preview-mock .mock-hero-sub{font-size:15px;color:var(--text-muted);max-width:500px;margin:0 auto 32px;line-height:1.8;font-style:italic}
.preview-mock .mock-hero-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.preview-mock .mock-btn{font-family:'Playfair Display',serif;font-size:14px;font-style:italic;padding:12px 26px;border:none;border-radius:8px;cursor:pointer;transition:all 150ms}
.preview-mock .mock-btn-primary{background:var(--accent);color:#3D1200;font-weight:700;box-shadow:0 4px 20px rgba(244,199,154,0.4)}
.preview-mock .mock-btn-primary:hover{filter:brightness(1.1);box-shadow:0 6px 28px rgba(244,199,154,0.5);transform:translateY(-1px)}
.preview-mock .mock-btn-ghost{background:transparent;color:var(--accent);border:1.5px solid var(--accent)}
.preview-mock .mock-btn-ghost:hover{background:rgba(244,199,154,0.08)}
.preview-mock .mock-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px;padding:40px 32px}
.preview-mock .mock-card{background:rgba(91,35,0,0.7);backdrop-filter:blur(4px);border-radius:10px;padding:22px;border:1px solid var(--border);box-shadow:0 4px 24px rgba(0,0,0,0.5),0 0 20px rgba(244,199,154,0.05);transition:box-shadow 180ms}
.preview-mock .mock-card:hover{box-shadow:0 8px 32px rgba(0,0,0,0.6),0 0 30px rgba(244,199,154,0.1)}
.preview-mock .mock-card-img{height:110px;background:linear-gradient(135deg,#5C2200,#A64200);border-radius:6px;margin-bottom:14px;border:1px solid var(--border)}
.preview-mock .mock-card h3{font-size:17px;font-weight:700;font-style:italic;color:var(--accent);margin-bottom:8px}
.preview-mock .mock-card p{font-size:13px;color:var(--text-muted);line-height:1.7}
.preview-mock .mock-form{padding:40px 32px;background:rgba(30,8,0,0.5)}
.preview-mock .mock-form h2{font-size:26px;font-weight:700;font-style:italic;color:var(--text);margin-bottom:24px}
.preview-mock .mock-form form{display:flex;flex-direction:column;gap:14px;max-width:440px}
.preview-mock .mock-form label{display:flex;flex-direction:column;gap:6px;font-size:12px;color:var(--text-muted);font-style:italic}
.preview-mock .mock-form input,.preview-mock .mock-form textarea{background:rgba(91,35,0,0.5);border:1px solid var(--border);border-radius:8px;color:var(--text);padding:10px 14px;font-family:inherit;font-size:14px;transition:border-color 150ms}
.preview-mock .mock-form input:focus,.preview-mock .mock-form textarea:focus{outline:none;border-color:var(--accent)}
.preview-mock .mock-footer{padding:24px 32px;text-align:center;font-size:13px;font-style:italic;color:var(--text-muted);border-top:1px solid var(--border)}`,
    htmlBoilerplate: makeBP('Ember', 'ember', 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap', 'Playfair Display')
  },

  /* ── 10. Circuit ─────────────────────────────────────────────── */
  {
    slug: 'circuit',
    name: 'Circuit',
    categories: ['dark', 'retro', 'typographic'],
    paletteSwatches: ['#000000', '#0A0A0A', '#00FF41', '#FFFFFF', '#001A00'],
    fontPairing: { display: 'IBM Plex Mono', body: 'IBM Plex Mono' },
    radiusScale: 'sharp',
    shadowScale: 'flat',
    density: 'compact',
    accentToken: '--accent',
    canonicalAccent: '#00FF41',
    hasAccentCustomizer: true,
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;700&display=swap',
    cssContent: `/* Circuit — matrix green on black, CRT aesthetic */
.preview-mock{--accent:#00FF41;--bg:#000000;--surface:#0A0A0A;--text:#00FF41;--text-dim:#007A1F;--border:#003300;font-family:'IBM Plex Mono',monospace;background:var(--bg);color:var(--text);min-height:100%}
.preview-mock::after{content:'';position:fixed;inset:0;background:repeating-linear-gradient(0deg,rgba(0,0,0,0.03) 0px,rgba(0,0,0,0.03) 1px,transparent 1px,transparent 2px);pointer-events:none;z-index:0}
.preview-mock .mock-nav{display:flex;align-items:center;justify-content:space-between;padding:8px 16px;background:#000;border-bottom:1px solid var(--accent);position:relative;z-index:1}
.preview-mock .mock-logo{font-size:14px;font-weight:700;color:var(--accent);letter-spacing:0.15em;text-transform:uppercase;text-shadow:0 0 8px var(--accent)}
.preview-mock .mock-nav-links{display:flex;gap:20px;list-style:none}
.preview-mock .mock-nav-links a{color:var(--text-dim);text-decoration:none;font-size:12px;letter-spacing:0.08em;transition:all 100ms}
.preview-mock .mock-nav-links a:hover{color:var(--accent);text-shadow:0 0 6px var(--accent)}
.preview-mock .mock-hero{padding:48px 16px 40px;border-bottom:1px solid var(--border);position:relative;z-index:1}
.preview-mock .mock-hero-title{font-size:32px;font-weight:700;color:var(--accent);margin-bottom:10px;line-height:1.1;text-shadow:0 0 12px var(--accent);letter-spacing:0.05em}
.preview-mock .mock-hero-sub{font-size:12px;color:var(--text-dim);max-width:480px;line-height:1.7;margin-bottom:20px}
.preview-mock .mock-hero-actions{display:flex;gap:10px;flex-wrap:wrap}
.preview-mock .mock-btn{font-family:'IBM Plex Mono',monospace;font-size:12px;padding:8px 16px;border:none;cursor:pointer;letter-spacing:0.08em;text-transform:uppercase;transition:all 100ms;position:relative;z-index:1}
.preview-mock .mock-btn-primary{background:var(--accent);color:#000;font-weight:700}
.preview-mock .mock-btn-primary:hover{box-shadow:0 0 16px var(--accent)}
.preview-mock .mock-btn-ghost{background:transparent;color:var(--accent);border:1px solid var(--accent)}
.preview-mock .mock-btn-ghost:hover{background:rgba(0,255,65,0.08);box-shadow:0 0 8px rgba(0,255,65,0.3)}
.preview-mock .mock-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:1px;background:var(--border);position:relative;z-index:1}
.preview-mock .mock-card{background:var(--surface);padding:16px;transition:background 100ms}
.preview-mock .mock-card:hover{background:#001200}
.preview-mock .mock-card-img{height:80px;background:repeating-linear-gradient(90deg,var(--border) 0px,var(--border) 1px,transparent 1px,transparent 20px),repeating-linear-gradient(0deg,var(--border) 0px,var(--border) 1px,transparent 1px,transparent 20px);margin-bottom:12px;border:1px solid var(--border)}
.preview-mock .mock-card h3{font-size:12px;font-weight:700;color:var(--accent);margin-bottom:6px;letter-spacing:0.08em;text-shadow:0 0 4px var(--accent)}
.preview-mock .mock-card p{font-size:11px;color:var(--text-dim);line-height:1.6}
.preview-mock .mock-form{padding:24px 16px;background:var(--bg);border-top:1px solid var(--border);position:relative;z-index:1}
.preview-mock .mock-form h2{font-size:14px;font-weight:700;color:var(--accent);margin-bottom:16px;letter-spacing:0.08em;text-transform:uppercase;text-shadow:0 0 6px var(--accent)}
.preview-mock .mock-form form{display:flex;flex-direction:column;gap:8px;max-width:380px}
.preview-mock .mock-form label{display:flex;flex-direction:column;gap:4px;font-size:10px;color:var(--text-dim);letter-spacing:0.1em;text-transform:uppercase}
.preview-mock .mock-form input,.preview-mock .mock-form textarea{background:#000;border:1px solid var(--border);color:var(--accent);padding:7px 10px;font-family:inherit;font-size:12px;transition:border-color 100ms}
.preview-mock .mock-form input:focus,.preview-mock .mock-form textarea:focus{outline:none;border-color:var(--accent);box-shadow:0 0 6px rgba(0,255,65,0.2)}
.preview-mock .mock-footer{padding:12px 16px;text-align:right;font-size:10px;color:var(--text-dim);border-top:1px solid var(--border);letter-spacing:0.1em;text-transform:uppercase;position:relative;z-index:1}`,
    htmlBoilerplate: makeBP('Circuit', 'circuit', 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;700&display=swap', 'IBM Plex Mono')
  },

  /* ── 11. Chalk ───────────────────────────────────────────────── */
  {
    slug: 'chalk',
    name: 'Chalk',
    categories: ['light', 'typographic', 'minimal'],
    paletteSwatches: ['#F5F5F0', '#EBEBEB', '#2C2C2C', '#6B6B6B', '#E0DDD8'],
    fontPairing: { display: 'Caveat', body: 'Work Sans' },
    radiusScale: 'medium',
    shadowScale: 'flat',
    density: 'airy',
    accentToken: '--accent',
    canonicalAccent: '#4A90D9',
    hasAccentCustomizer: true,
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Work+Sans:wght@400;500&display=swap',
    cssContent: `/* Chalk — off-white, handwritten headers, dashed borders */
.preview-mock{--accent:#4A90D9;--bg:#F5F5F0;--surface:#FAFAF8;--text:#2C2C2C;--text-muted:#6B6B6B;--border:#D4D0C8;font-family:'Work Sans',sans-serif;background:var(--bg);color:var(--text);min-height:100%}
.preview-mock .mock-nav{display:flex;align-items:center;justify-content:space-between;padding:14px 36px;background:var(--surface);border-bottom:2px dashed var(--border)}
.preview-mock .mock-logo{font-family:'Caveat',cursive;font-size:24px;font-weight:700;color:var(--text);letter-spacing:0.02em}
.preview-mock .mock-nav-links{display:flex;gap:28px;list-style:none}
.preview-mock .mock-nav-links a{color:var(--text-muted);text-decoration:none;font-size:14px;font-weight:500;border-bottom:1px dashed transparent;transition:all 150ms}
.preview-mock .mock-nav-links a:hover{color:var(--text);border-bottom-color:var(--accent)}
.preview-mock .mock-hero{padding:72px 36px 56px;background:var(--bg)}
.preview-mock .mock-hero-title{font-family:'Caveat',cursive;font-size:52px;font-weight:700;color:var(--text);margin-bottom:14px;line-height:1.1;letter-spacing:-0.01em}
.preview-mock .mock-hero-sub{font-size:15px;color:var(--text-muted);max-width:500px;line-height:1.8;margin-bottom:28px}
.preview-mock .mock-hero-actions{display:flex;gap:12px;flex-wrap:wrap}
.preview-mock .mock-btn{font-family:'Work Sans',sans-serif;font-size:14px;font-weight:500;padding:11px 24px;border:none;border-radius:8px;cursor:pointer;transition:all 150ms}
.preview-mock .mock-btn-primary{background:var(--accent);color:#fff;border:2px dashed rgba(74,144,217,0.5)}
.preview-mock .mock-btn-primary:hover{background:#3A7BC8;transform:translateY(-1px)}
.preview-mock .mock-btn-ghost{background:transparent;color:var(--text);border:2px dashed var(--border)}
.preview-mock .mock-btn-ghost:hover{border-color:var(--accent);color:var(--accent)}
.preview-mock .mock-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:20px;padding:48px 36px}
.preview-mock .mock-card{background:var(--surface);border-radius:8px;padding:22px;border:2px dashed var(--border);transition:border-color 150ms,transform 150ms}
.preview-mock .mock-card:hover{border-color:var(--accent);transform:translateY(-2px)}
.preview-mock .mock-card-img{height:110px;background:repeating-linear-gradient(45deg,var(--border) 0px,var(--border) 1px,transparent 1px,transparent 10px);border-radius:6px;margin-bottom:14px}
.preview-mock .mock-card h3{font-family:'Caveat',cursive;font-size:20px;font-weight:700;color:var(--text);margin-bottom:8px}
.preview-mock .mock-card p{font-size:13px;color:var(--text-muted);line-height:1.7}
.preview-mock .mock-form{padding:48px 36px;background:var(--surface);border-top:2px dashed var(--border)}
.preview-mock .mock-form h2{font-family:'Caveat',cursive;font-size:32px;font-weight:700;color:var(--text);margin-bottom:24px}
.preview-mock .mock-form form{display:flex;flex-direction:column;gap:16px;max-width:440px}
.preview-mock .mock-form label{display:flex;flex-direction:column;gap:6px;font-size:13px;color:var(--text-muted)}
.preview-mock .mock-form input,.preview-mock .mock-form textarea{background:var(--bg);border:2px dashed var(--border);border-radius:8px;color:var(--text);padding:10px 14px;font-family:inherit;font-size:14px;transition:border-color 150ms}
.preview-mock .mock-form input:focus,.preview-mock .mock-form textarea:focus{outline:none;border-color:var(--accent)}
.preview-mock .mock-footer{padding:28px 36px;text-align:center;font-family:'Caveat',cursive;font-size:16px;color:var(--text-muted);border-top:2px dashed var(--border)}`,
    htmlBoilerplate: makeBP('Chalk', 'chalk', 'https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Work+Sans:wght@400;500&display=swap', 'Caveat')
  },

  /* ── 12. Steel ───────────────────────────────────────────────── */
  {
    slug: 'steel',
    name: 'Steel',
    categories: ['minimal', 'dark'],
    paletteSwatches: ['#808080', '#9E9E9E', '#FFEB00', '#F5F5F5', '#666666'],
    fontPairing: { display: 'Space Mono', body: 'Space Mono' },
    radiusScale: 'sharp',
    shadowScale: 'flat',
    density: 'compact',
    accentToken: '--accent',
    canonicalAccent: '#FFEB00',
    hasAccentCustomizer: true,
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap',
    cssContent: `/* Steel — flat grey, neon yellow, ultra-minimal */
.preview-mock{--accent:#FFEB00;--bg:#808080;--surface:#9E9E9E;--text:#F5F5F5;--text-dark:#111;--text-muted:#D0D0D0;--border:#666666;font-family:'Space Mono',monospace;background:var(--bg);color:var(--text);min-height:100%}
.preview-mock .mock-nav{display:flex;align-items:center;justify-content:space-between;padding:10px 20px;background:var(--border);border-bottom:1px solid #555}
.preview-mock .mock-logo{font-size:14px;font-weight:700;color:var(--accent);letter-spacing:0.12em;text-transform:uppercase}
.preview-mock .mock-nav-links{display:flex;gap:20px;list-style:none}
.preview-mock .mock-nav-links a{color:var(--text-muted);text-decoration:none;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;transition:color 100ms}
.preview-mock .mock-nav-links a:hover{color:var(--accent)}
.preview-mock .mock-hero{padding:52px 20px 44px;border-bottom:1px solid var(--border)}
.preview-mock .mock-hero-title{font-size:36px;font-weight:700;color:var(--text);margin-bottom:10px;letter-spacing:-0.02em;line-height:1.1}
.preview-mock .mock-hero-title span{color:var(--accent)}
.preview-mock .mock-hero-sub{font-size:13px;color:var(--text-muted);max-width:460px;line-height:1.7;margin-bottom:22px}
.preview-mock .mock-hero-actions{display:flex;gap:10px;flex-wrap:wrap}
.preview-mock .mock-btn{font-family:'Space Mono',monospace;font-size:12px;font-weight:700;padding:10px 20px;border:none;cursor:pointer;letter-spacing:0.08em;text-transform:uppercase;transition:all 100ms}
.preview-mock .mock-btn-primary{background:var(--accent);color:var(--text-dark)}
.preview-mock .mock-btn-primary:hover{filter:brightness(1.1)}
.preview-mock .mock-btn-ghost{background:transparent;color:var(--text);border:1px solid var(--text-muted)}
.preview-mock .mock-btn-ghost:hover{border-color:var(--accent);color:var(--accent)}
.preview-mock .mock-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border)}
.preview-mock .mock-card{background:var(--bg);padding:18px;transition:background 100ms}
.preview-mock .mock-card:hover{background:var(--surface)}
.preview-mock .mock-card-img{height:90px;background:var(--surface);margin-bottom:12px;border-left:3px solid var(--accent)}
.preview-mock .mock-card h3{font-size:13px;font-weight:700;color:var(--text);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.06em}
.preview-mock .mock-card p{font-size:11px;color:var(--text-muted);line-height:1.6}
.preview-mock .mock-form{padding:28px 20px;background:var(--surface)}
.preview-mock .mock-form h2{font-size:16px;font-weight:700;color:var(--text);margin-bottom:18px;text-transform:uppercase;letter-spacing:0.08em}
.preview-mock .mock-form form{display:flex;flex-direction:column;gap:10px;max-width:380px}
.preview-mock .mock-form label{display:flex;flex-direction:column;gap:4px;font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.1em}
.preview-mock .mock-form input,.preview-mock .mock-form textarea{background:var(--bg);border:none;border-bottom:2px solid var(--border);color:var(--text);padding:7px 0;font-family:inherit;font-size:13px;transition:border-color 100ms}
.preview-mock .mock-form input:focus,.preview-mock .mock-form textarea:focus{outline:none;border-bottom-color:var(--accent)}
.preview-mock .mock-footer{padding:14px 20px;text-align:left;font-size:10px;color:var(--text-muted);border-top:1px solid var(--border);text-transform:uppercase;letter-spacing:0.12em}`,
    htmlBoilerplate: makeBP('Steel', 'steel', 'https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap', 'Space Mono')
  },

  /* ── 13. Bloom ───────────────────────────────────────────────── */
  {
    slug: 'bloom',
    name: 'Bloom',
    categories: ['light', 'colorful'],
    paletteSwatches: ['#FFF5FF', '#FFFFFF', '#FF79C6', '#BD93F9', '#50FA7B'],
    fontPairing: { display: 'Nunito', body: 'Nunito' },
    radiusScale: 'pill',
    shadowScale: 'raised',
    density: 'airy',
    accentToken: '--accent',
    canonicalAccent: '#FF79C6',
    hasAccentCustomizer: true,
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap',
    cssContent: `/* Bloom — pastel multicolor gradient headers, rounded pill */
.preview-mock{--accent:#FF79C6;--bg:#FFF5FF;--surface:#FFFFFF;--text:#2D2038;--text-muted:#7B6A8A;--border:#EDD5F5;font-family:'Nunito',sans-serif;background:var(--bg);color:var(--text);min-height:100%}
.preview-mock .mock-nav{display:flex;align-items:center;justify-content:space-between;padding:16px 40px;background:rgba(255,255,255,0.9);backdrop-filter:blur(12px);border-bottom:1px solid var(--border)}
.preview-mock .mock-logo{font-size:20px;font-weight:800;background:linear-gradient(135deg,#FF79C6,#BD93F9);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.preview-mock .mock-nav-links{display:flex;gap:28px;list-style:none}
.preview-mock .mock-nav-links a{color:var(--text-muted);text-decoration:none;font-size:14px;font-weight:600;transition:color 150ms}
.preview-mock .mock-nav-links a:hover{color:var(--accent)}
.preview-mock .mock-hero{padding:80px 40px 64px;text-align:center;background:linear-gradient(180deg,#FFE8F7 0%,var(--bg) 100%)}
.preview-mock .mock-hero-title{font-size:46px;font-weight:800;background:linear-gradient(135deg,#FF79C6,#BD93F9,#50FA7B);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px;line-height:1.1}
.preview-mock .mock-hero-sub{font-size:16px;color:var(--text-muted);max-width:520px;margin:0 auto 32px;line-height:1.75;font-weight:500}
.preview-mock .mock-hero-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.preview-mock .mock-btn{font-family:'Nunito',sans-serif;font-size:14px;font-weight:700;padding:12px 28px;border:none;border-radius:100px;cursor:pointer;transition:all 150ms}
.preview-mock .mock-btn-primary{background:linear-gradient(135deg,#FF79C6,#BD93F9);color:#fff;box-shadow:0 4px 16px rgba(255,121,198,0.4)}
.preview-mock .mock-btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(255,121,198,0.5)}
.preview-mock .mock-btn-ghost{background:transparent;color:var(--accent);border:2px solid var(--border)}
.preview-mock .mock-btn-ghost:hover{border-color:var(--accent);background:rgba(255,121,198,0.06)}
.preview-mock .mock-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:20px;padding:48px 40px}
.preview-mock .mock-card{background:var(--surface);border-radius:20px;padding:24px;box-shadow:0 4px 20px rgba(189,147,249,0.15);border:1px solid var(--border);transition:box-shadow 180ms,transform 180ms}
.preview-mock .mock-card:hover{box-shadow:0 8px 32px rgba(189,147,249,0.25);transform:translateY(-3px)}
.preview-mock .mock-card-img{height:110px;background:linear-gradient(135deg,#FFD6F0,#E8D5F9,#D5F9E0);border-radius:14px;margin-bottom:16px}
.preview-mock .mock-card h3{font-size:16px;font-weight:700;color:var(--text);margin-bottom:8px}
.preview-mock .mock-card p{font-size:13px;color:var(--text-muted);line-height:1.65;font-weight:500}
.preview-mock .mock-form{padding:48px 40px;background:var(--surface);border-top:1px solid var(--border)}
.preview-mock .mock-form h2{font-size:26px;font-weight:800;color:var(--text);margin-bottom:24px}
.preview-mock .mock-form form{display:flex;flex-direction:column;gap:16px;max-width:440px}
.preview-mock .mock-form label{display:flex;flex-direction:column;gap:6px;font-size:13px;font-weight:600;color:var(--text-muted)}
.preview-mock .mock-form input,.preview-mock .mock-form textarea{background:var(--bg);border:2px solid var(--border);border-radius:100px;color:var(--text);padding:10px 18px;font-family:inherit;font-size:14px;transition:border-color 150ms}
.preview-mock .mock-form textarea{border-radius:16px}
.preview-mock .mock-form input:focus,.preview-mock .mock-form textarea:focus{outline:none;border-color:var(--accent)}
.preview-mock .mock-footer{padding:28px 40px;text-align:center;font-size:14px;color:var(--text-muted);border-top:1px solid var(--border);font-weight:600}`,
    htmlBoilerplate: makeBP('Bloom', 'bloom', 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap', 'Nunito')
  },

  /* ── 14. Shadow ──────────────────────────────────────────────── */
  {
    slug: 'shadow',
    name: 'Shadow',
    categories: ['light', 'minimal', 'typographic'],
    paletteSwatches: ['#F0F0F0', '#FFFFFF', '#000000', '#333333', '#E0E0E0'],
    fontPairing: { display: 'Inter', body: 'Inter' },
    radiusScale: 'medium',
    shadowScale: 'deep',
    density: 'comfortable',
    accentToken: '--accent',
    canonicalAccent: '#000000',
    hasAccentCustomizer: false,
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap',
    cssContent: `/* Shadow — neumorphic high-contrast black/white */
.preview-mock{--accent:#000000;--bg:#E8E8E8;--surface:#EDEDEE;--text:#111111;--text-muted:#666666;--border:#D0D0D0;font-family:'Inter',sans-serif;background:var(--bg);color:var(--text);min-height:100%}
.preview-mock .mock-nav{display:flex;align-items:center;justify-content:space-between;padding:16px 36px;background:var(--bg);box-shadow:inset 0 -1px 0 var(--border)}
.preview-mock .mock-logo{font-size:18px;font-weight:900;color:var(--text);letter-spacing:-0.03em}
.preview-mock .mock-nav-links{display:flex;gap:28px;list-style:none}
.preview-mock .mock-nav-links a{color:var(--text-muted);text-decoration:none;font-size:14px;font-weight:700;transition:color 150ms}
.preview-mock .mock-nav-links a:hover{color:var(--text)}
.preview-mock .mock-hero{padding:72px 36px 56px;background:var(--surface);box-shadow:8px 8px 16px #c8c8c8,-8px -8px 16px #ffffff}
.preview-mock .mock-hero-title{font-size:48px;font-weight:900;letter-spacing:-0.04em;color:var(--text);margin-bottom:14px;line-height:1.05}
.preview-mock .mock-hero-sub{font-size:15px;color:var(--text-muted);max-width:500px;line-height:1.7;margin-bottom:28px}
.preview-mock .mock-hero-actions{display:flex;gap:12px;flex-wrap:wrap}
.preview-mock .mock-btn{font-family:'Inter',sans-serif;font-size:14px;font-weight:700;padding:12px 24px;border:none;border-radius:12px;cursor:pointer;transition:all 150ms}
.preview-mock .mock-btn-primary{background:var(--bg);color:var(--text);box-shadow:6px 6px 12px #c4c4c4,-6px -6px 12px #ffffff}
.preview-mock .mock-btn-primary:hover{box-shadow:inset 4px 4px 8px #c4c4c4,inset -4px -4px 8px #ffffff}
.preview-mock .mock-btn-ghost{background:var(--bg);color:var(--text-muted);box-shadow:4px 4px 8px #c4c4c4,-4px -4px 8px #ffffff}
.preview-mock .mock-btn-ghost:hover{box-shadow:inset 2px 2px 6px #c4c4c4,inset -2px -2px 6px #ffffff;color:var(--text)}
.preview-mock .mock-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:24px;padding:48px 36px;background:var(--bg)}
.preview-mock .mock-card{background:var(--bg);border-radius:16px;padding:24px;box-shadow:8px 8px 16px #c8c8c8,-8px -8px 16px #ffffff;border:none;transition:box-shadow 200ms}
.preview-mock .mock-card:hover{box-shadow:inset 4px 4px 10px #c8c8c8,inset -4px -4px 10px #ffffff}
.preview-mock .mock-card-img{height:110px;background:var(--surface);border-radius:12px;margin-bottom:16px;box-shadow:inset 4px 4px 8px #c8c8c8,inset -4px -4px 8px #ffffff}
.preview-mock .mock-card h3{font-size:15px;font-weight:700;color:var(--text);margin-bottom:8px}
.preview-mock .mock-card p{font-size:13px;color:var(--text-muted);line-height:1.65}
.preview-mock .mock-form{padding:48px 36px;background:var(--surface);box-shadow:inset 0 4px 12px rgba(0,0,0,0.06)}
.preview-mock .mock-form h2{font-size:24px;font-weight:900;letter-spacing:-0.03em;color:var(--text);margin-bottom:24px}
.preview-mock .mock-form form{display:flex;flex-direction:column;gap:16px;max-width:440px}
.preview-mock .mock-form label{display:flex;flex-direction:column;gap:6px;font-size:13px;font-weight:600;color:var(--text-muted)}
.preview-mock .mock-form input,.preview-mock .mock-form textarea{background:var(--bg);border:none;border-radius:12px;color:var(--text);padding:12px 16px;font-family:inherit;font-size:14px;box-shadow:inset 4px 4px 8px #c4c4c4,inset -4px -4px 8px #ffffff;transition:box-shadow 150ms}
.preview-mock .mock-form input:focus,.preview-mock .mock-form textarea:focus{outline:none;box-shadow:inset 6px 6px 10px #c4c4c4,inset -6px -6px 10px #ffffff}
.preview-mock .mock-footer{padding:28px 36px;text-align:center;font-size:13px;color:var(--text-muted);border-top:1px solid var(--border)}`,
    htmlBoilerplate: makeBP('Shadow', 'shadow', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap', 'Inter')
  },

  /* ── 15. Prism ───────────────────────────────────────────────── */
  {
    slug: 'prism',
    name: 'Prism',
    categories: ['dark', 'colorful', 'glassmorphism'],
    paletteSwatches: ['#0F0F1A', '#1A1A2E', '#FF6B6B', '#4ECDC4', '#FFE66D'],
    fontPairing: { display: 'Outfit', body: 'Outfit' },
    radiusScale: 'medium',
    shadowScale: 'raised',
    density: 'comfortable',
    accentToken: '--accent',
    canonicalAccent: '#FF6B6B',
    hasAccentCustomizer: true,
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap',
    cssContent: `/* Prism — dark surface, rainbow gradient accent stripes */
.preview-mock{--accent:#FF6B6B;--bg:#0F0F1A;--surface:rgba(26,26,46,0.9);--text:#FFFFFF;--text-muted:#8888AA;--border:rgba(255,255,255,0.1);font-family:'Outfit',sans-serif;background:var(--bg);color:var(--text);min-height:100%}
.preview-mock .mock-nav{display:flex;align-items:center;justify-content:space-between;padding:14px 32px;background:rgba(10,10,20,0.8);backdrop-filter:blur(16px);border-bottom:1px solid var(--border)}
.preview-mock .mock-logo{font-size:20px;font-weight:700;background:linear-gradient(90deg,#FF6B6B,#4ECDC4,#FFE66D);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.preview-mock .mock-nav-links{display:flex;gap:28px;list-style:none}
.preview-mock .mock-nav-links a{color:var(--text-muted);text-decoration:none;font-size:14px;font-weight:500;transition:color 150ms}
.preview-mock .mock-nav-links a:hover{color:var(--text)}
.preview-mock .mock-hero{padding:80px 32px 64px;position:relative;overflow:hidden}
.preview-mock .mock-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 20% 50%,rgba(255,107,107,0.15) 0%,transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(78,205,196,0.12) 0%,transparent 60%),radial-gradient(ellipse at 60% 80%,rgba(255,230,109,0.1) 0%,transparent 60%);pointer-events:none}
.preview-mock .mock-hero-title{font-size:46px;font-weight:700;color:var(--text);margin-bottom:16px;line-height:1.1;letter-spacing:-0.02em;position:relative}
.preview-mock .mock-hero-title::after{content:'';display:block;height:4px;width:80px;background:linear-gradient(90deg,#FF6B6B,#4ECDC4,#FFE66D);margin-top:12px;border-radius:2px}
.preview-mock .mock-hero-sub{font-size:15px;color:var(--text-muted);max-width:500px;line-height:1.75;margin-bottom:32px;position:relative}
.preview-mock .mock-hero-actions{display:flex;gap:12px;flex-wrap:wrap;position:relative}
.preview-mock .mock-btn{font-family:'Outfit',sans-serif;font-size:14px;font-weight:600;padding:12px 26px;border:none;border-radius:8px;cursor:pointer;transition:all 150ms}
.preview-mock .mock-btn-primary{background:linear-gradient(135deg,#FF6B6B,#FF8E53);color:#fff;box-shadow:0 4px 16px rgba(255,107,107,0.4)}
.preview-mock .mock-btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(255,107,107,0.5)}
.preview-mock .mock-btn-ghost{background:rgba(255,255,255,0.05);color:var(--text);border:1px solid var(--border);backdrop-filter:blur(8px)}
.preview-mock .mock-btn-ghost:hover{background:rgba(255,255,255,0.1);border-color:rgba(255,255,255,0.25)}
.preview-mock .mock-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:16px;padding:40px 32px}
.preview-mock .mock-card{background:rgba(26,26,46,0.7);backdrop-filter:blur(16px);border-radius:12px;padding:22px;border:1px solid var(--border);box-shadow:0 4px 20px rgba(0,0,0,0.4);transition:box-shadow 180ms,transform 180ms;overflow:hidden;position:relative}
.preview-mock .mock-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#FF6B6B,#4ECDC4,#FFE66D)}
.preview-mock .mock-card:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(0,0,0,0.6),0 0 20px rgba(255,107,107,0.1)}
.preview-mock .mock-card-img{height:100px;background:linear-gradient(135deg,rgba(255,107,107,0.15),rgba(78,205,196,0.15));border-radius:8px;margin-bottom:14px;border:1px solid var(--border)}
.preview-mock .mock-card h3{font-size:15px;font-weight:600;color:var(--text);margin-bottom:8px}
.preview-mock .mock-card p{font-size:13px;color:var(--text-muted);line-height:1.65}
.preview-mock .mock-form{padding:40px 32px;background:rgba(10,10,20,0.5);border-top:1px solid var(--border)}
.preview-mock .mock-form h2{font-size:24px;font-weight:700;color:var(--text);margin-bottom:24px}
.preview-mock .mock-form form{display:flex;flex-direction:column;gap:14px;max-width:440px}
.preview-mock .mock-form label{display:flex;flex-direction:column;gap:6px;font-size:13px;color:var(--text-muted)}
.preview-mock .mock-form input,.preview-mock .mock-form textarea{background:rgba(26,26,46,0.8);border:1px solid var(--border);border-radius:8px;color:var(--text);padding:10px 14px;font-family:inherit;font-size:14px;transition:border-color 150ms;backdrop-filter:blur(8px)}
.preview-mock .mock-form input:focus,.preview-mock .mock-form textarea:focus{outline:none;border-color:var(--accent)}
.preview-mock .mock-footer{padding:24px 32px;text-align:center;font-size:13px;color:var(--text-muted);border-top:1px solid var(--border)}`,
    htmlBoilerplate: makeBP('Prism', 'prism', 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap', 'Outfit')
  }

];

/** Quick lookup by slug — returns first template if not found (graceful fallback) */
export function getTemplateBySlug(slug) {
  return TEMPLATES.find(t => t.slug === slug) ?? TEMPLATES[0];
}

/** Compact catalog for the AI recommendation prompt */
export function getTemplateCatalog() {
  return TEMPLATES.map(({ slug, name, categories, fontPairing, radiusScale, density }) => ({
    slug, name, categories, fontPairing, radiusScale, density
  }));
}
