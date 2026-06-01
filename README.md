# TemplateTester — Interactive Design Template Gallery

A single-page web application presenting **15 distinct, opinionated design templates**.
Select a template to apply it live to the preview surface, download its CSS + HTML boilerplate,
and use the AI-powered recommendation panel to find the best match for your project.

## Quick Start

No build step required — just serve the static files:

```bash
# Python (recommended)
python3 -m http.server 8080
# then open: http://localhost:8080

# Node.js (via npx)
npx serve -p 8080 .

# Or run the provided script:
./init.sh
```

Open **http://localhost:8080** in Chrome 108+, Firefox 110+, Safari 16.4+, or Edge 108+.

## Features

| Feature | Description |
|---|---|
| **15 Templates** | Obsidian, Arctic, Velvet, Forge, Sakura, Nocturne, Terra, Glacier, Ember, Circuit, Chalk, Steel, Bloom, Shadow, Prism |
| **Live Preview** | Cross-fade preview with desktop / tablet / mobile viewport simulator |
| **Download** | CSS only, HTML boilerplate, or both as a ZIP (client-side, no server) |
| **Category Filter** | Dark / Light / Minimal / Colorful / Typographic / Glassmorphism / Retro |
| **Search** | Instant search with 80ms debounce and character highlighting |
| **Favorites** | Star cards; persisted in localStorage |
| **Accent Customizer** | Live-tweak the accent color; custom value included in downloaded CSS |
| **Shareable URL** | `#template=<slug>` hash — share a direct link to any template |
| **Code Inspector** | Syntax-highlighted CSS + HTML drawer; persisted open/closed state |
| **AI Recommendations** | Plain-English project description → Claude Haiku returns 2-3 ranked templates |
| **Accessibility** | WCAG AA contrast, keyboard nav, ARIA roles, reduced-motion support |

## Project Structure

```
TemplateTester/
├── index.html            # App shell (semantic HTML, no framework)
├── css/
│   └── app.css           # App shell stylesheet (design tokens + layout)
├── js/
│   ├── templates.js      # Template data layer (15 template objects)
│   └── app.js            # Main application logic (selection, filter, AI, etc.)
├── vendor/
│   ├── jszip.min.js      # JSZip for client-side ZIP assembly
│   ├── prism.js          # Prism.js for code inspector syntax highlighting
│   └── prism.css         # Prism.js dark theme
├── assets/
│   └── icons/            # SVG icon sprites (if any)
├── init.sh               # Dev server launcher
└── README.md             # This file
```

## Vendor Libraries

The `vendor/` directory bundles self-contained, dependency-free implementations
of the client-side libraries the app uses — no external CDN is required at runtime:

- **`jszip.min.js`** — client-side ZIP assembly for the "download as ZIP" feature.
- **`prism.js` / `prism.css`** — syntax highlighting for the code inspector (CSS + HTML).

## AI Recommendation Panel

The panel uses the **Anthropic claude-haiku-3-5** model. To activate:

1. Click **✦ Find my template** in the header.
2. Enter your Anthropic API key (stored in `sessionStorage` only — never persisted to disk).
3. Type a plain-English project description and click **Recommend**.

The app will never store your API key in `localStorage` or send it anywhere
other than `api.anthropic.com`.

## localStorage Keys

| Key | Purpose |
|---|---|
| `tt_selected` | Last-selected template slug |
| `tt_favorites` | JSON array of favorited slugs |
| `tt_custom_accents` | Object of `{ slug: hexColor }` for per-template accent overrides |
| `tt_download_counts` | Object of `{ slug: count }` for client-side download counters |
| `tt_inspector_open` | Boolean — whether the code inspector is expanded |
| `tt_panel_width` | Number — drag-resize panel split percentage |

## Development Notes

- **No build step** — edit files directly and refresh.
- **No framework** — vanilla HTML5 / CSS3 / ES2022 modules.
- **No backend** — all state is client-side (localStorage / sessionStorage / Blob API).
- Google Fonts are loaded from CDN; templates degrade to system font fallbacks offline.

## Browser Support

Chrome 108+, Firefox 110+, Safari 16.4+, Edge 108+.
All features use standard web platform APIs (no polyfills required for these targets).
