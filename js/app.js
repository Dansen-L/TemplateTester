/**
 * app.js — TemplateTester main application entry point
 *
 * Responsibilities:
 *  - Read URL hash on load and pre-select template
 *  - Render gallery cards from TEMPLATES data
 *  - Handle card selection, filter chips, search
 *  - Drive preview pane (CSS injection, cross-fade)
 *  - Manage viewport simulator
 *  - Manage favorites, accent customizer, code inspector
 *  - Wire download modal and clipboard actions
 *  - Wire AI recommendation drawer
 *  - Persist state to localStorage
 */

import { TEMPLATES, getTemplateBySlug, getTemplateCatalog } from './templates.js';

// ── localStorage / sessionStorage helpers ───────────────────────────────────

const LS = {
  get: (key, fallback = null) => {
    try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; }
    catch { return fallback; }
  },
  set: (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* quota */ }
  },
  remove: (key) => { try { localStorage.removeItem(key); } catch { /* noop */ } }
};

const SS = {
  get: (key, fallback = null) => {
    try { const v = sessionStorage.getItem(key); return v !== null ? v : fallback; }
    catch { return fallback; }
  },
  set: (key, value) => {
    try { sessionStorage.setItem(key, value); } catch { /* quota */ }
  }
};

// ── State ────────────────────────────────────────────────────────────────────

const state = {
  selectedSlug: null,
  favorites: [],         // array of slugs
  activeFilters: new Set(),
  searchQuery: '',
  inspectorOpen: false,
  customAccents: {},     // { slug: hexString }
  downloadCounts: {},    // { slug: number }
  panelWidth: null,      // persisted resize handle position
};

// ── Init ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  loadState();
  renderGallery();
  wireFilterChips();
  wireSearch();
  wirePreviewToolbar();
  wireDownloadModal();
  wireClipboard();
  wireCodeInspector();
  wireAIDrawer();
  wirePanelResize();
  wireMobilePreview();
  applyHashOnLoad();
});

// ── State loading ────────────────────────────────────────────────────────────

function loadState() {
  state.favorites     = LS.get('tt_favorites', []);
  state.inspectorOpen = LS.get('tt_inspector_open', false);
  state.customAccents = LS.get('tt_custom_accents', {});
  state.downloadCounts = LS.get('tt_download_counts', {});
  state.panelWidth    = LS.get('tt_panel_width', null);
}

// ── URL hash routing ──────────────────────────────────────────────────────────

function applyHashOnLoad() {
  const hash = window.location.hash; // e.g. "#template=velvet"
  const match = hash.match(/^#template=([a-z0-9-]+)$/i);
  const slug = match ? match[1].toLowerCase() : null;
  const template = slug ? getTemplateBySlug(slug) : null;

  // If slug doesn't exist, getTemplateBySlug returns TEMPLATES[0] — graceful fallback
  const savedSlug = LS.get('tt_selected', null);
  const initialTemplate = template ?? (savedSlug ? getTemplateBySlug(savedSlug) : TEMPLATES[0]);

  selectTemplate(initialTemplate.slug, false);
}

window.addEventListener('hashchange', () => {
  const match = window.location.hash.match(/^#template=([a-z0-9-]+)$/i);
  if (match) {
    const t = getTemplateBySlug(match[1].toLowerCase());
    if (t) selectTemplate(t.slug, false);
  }
});

// ── Gallery rendering ─────────────────────────────────────────────────────────

function renderGallery() {
  const grid = document.getElementById('gallery-grid');

  // Lazy init: build all 15 cards once and keep them in the DOM permanently.
  // Subsequent calls only toggle visibility via .filtered-out (animated).
  if (!grid.querySelector('.template-card')) {
    TEMPLATES.forEach((t, idx) => {
      const card = buildCard(t);
      card.dataset.idx = idx;
      grid.appendChild(card);
    });
  }

  const filtered = getFilteredTemplates();
  const visibleSlugs = new Set(filtered.map(t => t.slug));

  grid.querySelectorAll('.template-card').forEach(card => {
    const visible = visibleSlugs.has(card.dataset.slug);
    card.classList.toggle('filtered-out', !visible);
    card.setAttribute('aria-hidden', String(!visible));
    if (visible) {
      // Keep search-highlight in card name current without rebuilding the card
      const nameEl = card.querySelector('.card-name');
      if (nameEl) {
        const t = getTemplateBySlug(card.dataset.slug);
        nameEl.innerHTML = highlightMatch(t.name, state.searchQuery);
      }
    }
  });

  // Re-sort DOM order to match current favorites-first order (instant repositioning)
  const sortedSlugs = [
    ...filtered.map(t => t.slug),
    ...TEMPLATES.filter(t => !visibleSlugs.has(t.slug)).map(t => t.slug),
  ];
  sortedSlugs.forEach(slug => {
    const card = grid.querySelector(`[data-slug="${slug}"]`);
    if (card) grid.appendChild(card); // moves to end in sorted order
  });

  const visibleCount = visibleSlugs.size;
  document.getElementById('zero-state').hidden = visibleCount > 0;
  grid.hidden = visibleCount === 0;
}

function buildCard(t) {
  const isFav     = state.favorites.includes(t.slug);
  const isActive  = t.slug === state.selectedSlug;
  const dlCount   = state.downloadCounts[t.slug] ?? 0;

  const card = document.createElement('article');
  card.className   = `template-card${isActive ? ' active' : ''}`;
  card.dataset.slug = t.slug;
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `${t.name} template${isActive ? ', currently selected' : ''}`);
  card.setAttribute('aria-current', isActive ? 'true' : 'false');

  // Highlight search match in name
  const highlightedName = highlightMatch(t.name, state.searchQuery);

  card.innerHTML = `
    <div class="card-palette" aria-label="Color palette for ${t.name}">
      ${t.paletteSwatches.map((c, i) => `<span class="swatch" role="img" style="background:${c}" aria-label="Color ${i + 1}: ${c}"></span>`).join('')}
    </div>
    <div class="card-body">
      <div class="card-header-row">
        <h3 class="card-name">${highlightedName}</h3>
        <button
          class="btn-star${isFav ? ' starred' : ''}"
          data-slug="${t.slug}"
          aria-label="${isFav ? 'Remove from favorites' : 'Add to favorites'}: ${t.name}"
          aria-pressed="${String(isFav)}"
        >${isFav ? '★' : '☆'}</button>
      </div>
      <div class="card-tags">
        ${t.categories.map(c => `<span class="tag">${c}</span>`).join('')}
      </div>
      <div class="card-specimen" aria-hidden="true">Aa Bb 123</div>
      ${dlCount > 0 ? `<p class="card-dl-count" aria-label="${dlCount} downloads">Downloaded ${dlCount} time${dlCount !== 1 ? 's' : ''}</p>` : ''}
    </div>
    <div class="card-actions" aria-hidden="true">
      <button class="btn btn-primary btn-sm card-preview-btn" tabindex="-1">Preview</button>
      <button class="btn btn-ghost  btn-sm card-download-btn" tabindex="-1">Download</button>
    </div>
    ${isActive ? '<span class="card-checkmark" aria-hidden="true">✓</span>' : ''}
  `;

  card.addEventListener('click', (e) => {
    if (e.target.closest('.btn-star'))         return; // handled separately
    if (e.target.closest('.card-download-btn')) { openDownloadModal(t.slug); return; }
    selectTemplate(t.slug);
    // On narrow viewports the preview pane is hidden — open bottom sheet instead
    if (window.matchMedia('(max-width: 768px)').matches) {
      openMobilePreview(t.slug);
    }
  });

  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectTemplate(t.slug); }
    if (e.key === 'd' || e.key === 'D')     { openDownloadModal(t.slug); }
    handleCardArrowNav(e, card);
  });

  card.querySelector('.btn-star').addEventListener('click', (e) => {
    e.stopPropagation();
    toggleFavorite(t.slug);
  });

  return card;
}

function highlightMatch(name, query) {
  if (!query) return name;
  const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return name.replace(re, '<mark class="search-highlight">$1</mark>');
}

function handleCardArrowNav(e, card) {
  const grid  = document.getElementById('gallery-grid');
  // Only navigate among visible (non-filtered-out) cards
  const cards = [...grid.querySelectorAll('.template-card:not(.filtered-out)')];
  const idx   = cards.indexOf(card);
  let next = null;
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown')  next = cards[idx + 1];
  if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')    next = cards[idx - 1];
  if (next) { e.preventDefault(); next.focus(); }
}

// ── Template selection ───────────────────────────────────────────────────────

function selectTemplate(slug, updateHash = true) {
  state.selectedSlug = slug;
  LS.set('tt_selected', slug);

  if (updateHash) {
    history.replaceState(null, '', `#template=${slug}`);
  }

  updateGalleryActiveState(slug);
  applyTemplateToPreview(slug);
  updateAccentPicker(slug);
  if (state.inspectorOpen) updateCodeInspector(slug);
}

function updateGalleryActiveState(slug) {
  document.querySelectorAll('.template-card').forEach(card => {
    const isActive = card.dataset.slug === slug;
    card.classList.toggle('active', isActive);
    card.setAttribute('aria-current', isActive ? 'true' : 'false');
    // Update/remove checkmark badge
    let check = card.querySelector('.card-checkmark');
    if (isActive && !check) {
      check = document.createElement('span');
      check.className = 'card-checkmark';
      check.setAttribute('aria-hidden', 'true');
      check.textContent = '✓';
      card.appendChild(check);
    } else if (!isActive && check) {
      check.remove();
    }
  });
}

// ── Preview pane ─────────────────────────────────────────────────────────────

function loadTemplateFonts(t) {
  const id = 'preview-template-fonts';
  let link = document.getElementById(id);
  if (!link) {
    link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  if (link.href !== t.googleFontsUrl) {
    link.href = t.googleFontsUrl;
  }
}

function applyTemplateToPreview(slug) {
  const t = getTemplateBySlug(slug);
  const surface = document.getElementById('preview-surface');

  // Load template-specific fonts from Google Fonts CDN
  loadTemplateFonts(t);

  // Cross-fade: fade out, swap, fade in
  surface.style.opacity = '0';
  surface.style.transition = 'opacity 200ms ease-in-out';

  setTimeout(() => {
    injectTemplateCSS(t);
    surface.innerHTML = buildMockPage(t);
    surface.style.opacity = '1';
  }, 100);
}

function injectTemplateCSS(t) {
  let styleTag = document.getElementById('preview-template-style');
  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = 'preview-template-style';
    document.head.appendChild(styleTag);
  }
  const customAccent = state.customAccents[t.slug];
  let css = t.cssContent;
  if (customAccent) {
    // Append override rule — later declaration wins in the cascade
    css += `\n.preview-mock { ${t.accentToken}: ${customAccent}; }`;
  }
  styleTag.textContent = css;
}

function buildMockPage(t) {
  // Static placeholder page scaffold styled by the active template's CSS
  return `
    <div class="preview-mock" data-template="${t.slug}">
      <nav class="mock-nav">
        <span class="mock-logo">${t.name}</span>
        <ul class="mock-nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Work</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
      <section class="mock-hero">
        <h1 class="mock-hero-title">Beautiful by Design</h1>
        <p class="mock-hero-sub">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum sed.</p>
        <div class="mock-hero-actions">
          <button class="mock-btn mock-btn-primary">Get Started</button>
          <button class="mock-btn mock-btn-ghost">Learn More</button>
        </div>
      </section>
      <section class="mock-cards">
        <div class="mock-card"><div class="mock-card-img" aria-hidden="true"></div><h3>Feature One</h3><p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></div>
        <div class="mock-card"><div class="mock-card-img" aria-hidden="true"></div><h3>Feature Two</h3><p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p></div>
        <div class="mock-card"><div class="mock-card-img" aria-hidden="true"></div><h3>Feature Three</h3><p>Duis aute irure dolor in reprehenderit in voluptate velit esse.</p></div>
      </section>
      <section class="mock-form">
        <h2>Get in touch</h2>
        <form>
          <label>Name<input type="text" placeholder="Your name" /></label>
          <label>Email<input type="email" placeholder="you@example.com" /></label>
          <label>Message<textarea rows="3" placeholder="Your message…"></textarea></label>
          <button class="mock-btn mock-btn-primary" type="button">Send</button>
        </form>
      </section>
      <footer class="mock-footer">
        <p>© 2025 ${t.name} Template — TemplateTester</p>
      </footer>
    </div>
  `;
}

// ── Filter chips ─────────────────────────────────────────────────────────────

function wireFilterChips() {
  document.querySelectorAll('[data-filter]').forEach(chip => {
    chip.addEventListener('click', () => toggleFilter(chip.dataset.filter));
  });
}

function toggleFilter(filter) {
  if (filter === 'all') {
    state.activeFilters.clear();
  } else {
    if (state.activeFilters.has(filter)) {
      state.activeFilters.delete(filter);
    } else {
      state.activeFilters.add(filter);
    }
  }
  updateFilterChipUI();
  renderGallery();
}

function updateFilterChipUI() {
  const allChip    = document.querySelector('[data-filter="all"]');
  const badge      = document.getElementById('filter-badge');
  const isAll      = state.activeFilters.size === 0;

  allChip.classList.toggle('chip-active', isAll);
  allChip.setAttribute('aria-pressed', String(isAll));

  document.querySelectorAll('[data-filter]:not([data-filter="all"])').forEach(chip => {
    const active = state.activeFilters.has(chip.dataset.filter);
    chip.classList.toggle('chip-active', active);
    chip.setAttribute('aria-pressed', String(active));
  });

  if (state.activeFilters.size > 0) {
    badge.textContent = `${state.activeFilters.size} active`;
    badge.hidden = false;
  } else {
    badge.textContent = '';
    badge.hidden = true;
  }
}

function getFilteredTemplates() {
  let templates = [...TEMPLATES];

  // Sort: favorites first within bucket
  const isFav = slug => state.favorites.includes(slug);
  templates.sort((a, b) => Number(isFav(b.slug)) - Number(isFav(a.slug)));

  // Favorites-only filter
  if (state.activeFilters.has('favorites')) {
    templates = templates.filter(t => isFav(t.slug));
  }

  // Category filters (OR logic)
  const catFilters = [...state.activeFilters].filter(f => f !== 'favorites');
  if (catFilters.length > 0) {
    templates = templates.filter(t => t.categories.some(c => catFilters.includes(c)));
  }

  // Search query
  const q = state.searchQuery.toLowerCase().trim();
  if (q) {
    templates = templates.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.categories.some(c => c.toLowerCase().includes(q))
    );
  }

  return templates;
}

// ── Search ───────────────────────────────────────────────────────────────────

function wireSearch() {
  const input = document.getElementById('search-input');
  let debounce;
  input.addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      state.searchQuery = input.value;
      renderGallery();
    }, 80);
  });
}

// ── Favorites ────────────────────────────────────────────────────────────────

function toggleFavorite(slug) {
  const idx = state.favorites.indexOf(slug);
  if (idx === -1) {
    state.favorites.push(slug);
  } else {
    state.favorites.splice(idx, 1);
  }
  LS.set('tt_favorites', state.favorites);

  // Update the star button in-place without rebuilding the card
  const card = document.querySelector(`.template-card[data-slug="${slug}"]`);
  if (card) {
    const isFav = state.favorites.includes(slug);
    const btn   = card.querySelector('.btn-star');
    if (btn) {
      btn.classList.toggle('starred', isFav);
      btn.textContent = isFav ? '★' : '☆';
      btn.setAttribute('aria-label', `${isFav ? 'Remove from favorites' : 'Add to favorites'}: ${getTemplateBySlug(slug).name}`);
      btn.setAttribute('aria-pressed', String(isFav));
    }
  }

  renderGallery();
}

// ── Viewport simulator ───────────────────────────────────────────────────────

function wirePreviewToolbar() {
  // Viewport simulator buttons
  document.querySelectorAll('.viewport-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const width = parseInt(btn.dataset.width, 10);
      document.querySelectorAll('.viewport-btn').forEach(b => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });
      const wrapper = document.getElementById('preview-surface-wrapper');
      wrapper.style.transition = 'max-width 250ms ease-in-out';
      wrapper.style.maxWidth = `${width}px`;
    });
  });

  // Share link
  document.getElementById('btn-share').addEventListener('click', () => {
    const url = window.location.href;
    copyToClipboard(url).then(() => {
      showButtonFeedback(document.getElementById('btn-share'), '✓ Copied', 1000);
    });
  });

  // Download CTA in preview pane
  document.getElementById('btn-download-preview').addEventListener('click', () => {
    if (state.selectedSlug) openDownloadModal(state.selectedSlug);
  });
}

// ── Accent color customizer ───────────────────────────────────────────────────

function updateAccentPicker(slug) {
  const t = getTemplateBySlug(slug);
  const customizer = document.getElementById('accent-customizer');
  const picker     = document.getElementById('accent-picker');
  const resetBtn   = document.getElementById('btn-accent-reset');

  if (!t.hasAccentCustomizer) {
    customizer.hidden = true;
    return;
  }

  customizer.hidden = false;
  picker.value = state.customAccents[slug] ?? t.canonicalAccent;

  picker.oninput = () => {
    state.customAccents[slug] = picker.value;
    LS.set('tt_custom_accents', state.customAccents);
    applyTemplateToPreview(slug);
  };

  resetBtn.onclick = () => {
    delete state.customAccents[slug];
    LS.set('tt_custom_accents', state.customAccents);
    picker.value = t.canonicalAccent;
    applyTemplateToPreview(slug);
  };
}

// ── Copy to clipboard ─────────────────────────────────────────────────────────

function wireClipboard() {
  document.getElementById('btn-copy-css').addEventListener('click', () => {
    const t = getTemplateBySlug(state.selectedSlug);
    const css = buildDownloadCSS(t);
    copyToClipboard(css).then(ok => {
      if (ok) {
        showButtonFeedback(document.getElementById('btn-copy-css'), 'Copied!', 1500);
      } else {
        showClipboardFallback(css);
      }
    });
  });

  document.getElementById('btn-copy-html').addEventListener('click', () => {
    const t = getTemplateBySlug(state.selectedSlug);
    const html = buildDownloadHTML(t);
    copyToClipboard(html).then(ok => {
      if (ok) {
        showButtonFeedback(document.getElementById('btn-copy-html'), 'Copied!', 1500);
      } else {
        showClipboardFallback(html);
      }
    });
  });

  document.getElementById('btn-close-clipboard').addEventListener('click', () => {
    document.getElementById('clipboard-modal-backdrop').hidden = true;
  });

  // Escape key closes the clipboard modal
  document.addEventListener('keydown', (e) => {
    const cbModal = document.getElementById('clipboard-modal-backdrop');
    if (e.key === 'Escape' && !cbModal.hidden) cbModal.hidden = true;
  });
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function showClipboardFallback(content) {
  const modal   = document.getElementById('clipboard-modal-backdrop');
  const textarea = document.getElementById('clipboard-fallback-content');
  textarea.value = content;
  modal.hidden  = false;
  textarea.focus();
  textarea.select();
}

// ── Download ──────────────────────────────────────────────────────────────────

function wireDownloadModal() {
  const backdrop = document.getElementById('download-modal-backdrop');

  document.getElementById('btn-download-confirm').addEventListener('click', executeDownload);
  document.getElementById('btn-download-cancel').addEventListener('click', closeDownloadModal);
  document.getElementById('btn-close-download').addEventListener('click', closeDownloadModal);

  // Dismiss on backdrop click
  backdrop.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeDownloadModal();
  });

  // Escape key closes the modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !backdrop.hidden) closeDownloadModal();
  });

  // Tab / Shift-Tab focus trap within the modal
  backdrop.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focusable = [...backdrop.querySelectorAll(
      'button:not([disabled]), input:not([disabled]), [tabindex="0"]'
    )].filter(el => !el.closest('[hidden]'));
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
    }
  });
}

let downloadTargetSlug = null;

function openDownloadModal(slug) {
  downloadTargetSlug = slug;
  const t = getTemplateBySlug(slug);
  document.getElementById('download-modal-template-name').textContent = t.name;
  document.querySelector('input[name="download-format"][value="css"]').checked = true;
  const backdrop = document.getElementById('download-modal-backdrop');
  backdrop.hidden = false;
  // Move focus into the dialog — first radio option
  const firstFocusable = backdrop.querySelector('input[type="radio"]');
  if (firstFocusable) firstFocusable.focus();
}

function closeDownloadModal() {
  document.getElementById('download-modal-backdrop').hidden = true;
  downloadTargetSlug = null;
}

async function executeDownload() {
  if (!downloadTargetSlug) return;
  const t      = getTemplateBySlug(downloadTargetSlug);
  const format = document.querySelector('input[name="download-format"]:checked')?.value ?? 'css';
  const slug   = t.slug;

  if (format === 'css') {
    triggerDownload(`templatetester-${slug}-css.css`, buildDownloadCSS(t), 'text/css');
  } else if (format === 'html') {
    triggerDownload(`templatetester-${slug}-html.html`, buildDownloadHTML(t), 'text/html');
  } else if (format === 'zip') {
    await downloadZip(t);
  }

  // Increment download count and update the card UI directly
  state.downloadCounts[slug] = (state.downloadCounts[slug] ?? 0) + 1;
  LS.set('tt_download_counts', state.downloadCounts);
  const dlCount = state.downloadCounts[slug];
  const card = document.querySelector(`.template-card[data-slug="${slug}"]`);
  if (card) {
    let countEl = card.querySelector('.card-dl-count');
    if (!countEl) {
      countEl = document.createElement('p');
      countEl.className = 'card-dl-count';
      card.querySelector('.card-body')?.appendChild(countEl);
    }
    countEl.textContent = `Downloaded ${dlCount} time${dlCount !== 1 ? 's' : ''}`;
    countEl.setAttribute('aria-label', `${dlCount} downloads`);
  }

  closeDownloadModal();
  showToast('Download started');
}

function buildDownloadCSS(t) {
  const customAccent = state.customAccents[t.slug];
  let css = t.cssContent;
  if (customAccent) {
    // Append override — later declaration in the cascade wins
    css += `\n/* Custom accent override */\n.preview-mock { ${t.accentToken}: ${customAccent}; }`;
  }
  return css;
}

function buildDownloadHTML(t) {
  return t.htmlBoilerplate
    .replace('__TEMPLATE_CSS__', buildDownloadCSS(t));
}

function triggerDownload(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

async function downloadZip(t) {
  if (typeof JSZip === 'undefined') {
    console.error('JSZip not loaded');
    showToast('ZIP library not available');
    return;
  }
  const zip = new JSZip();
  zip.file('style.css', buildDownloadCSS(t));
  zip.file('index.html', buildDownloadHTML(t));
  const blob = await zip.generateAsync({ type: 'blob' });
  triggerDownload(`templatetester-${t.slug}-both.zip`, blob, 'application/zip');
}

// ── Code inspector ────────────────────────────────────────────────────────────

function wireCodeInspector() {
  const toggleBtn = document.getElementById('btn-inspector-toggle');
  const content   = document.getElementById('inspector-content');

  toggleBtn.addEventListener('click', () => {
    state.inspectorOpen = !state.inspectorOpen;
    LS.set('tt_inspector_open', state.inspectorOpen);
    content.hidden = !state.inspectorOpen;
    toggleBtn.setAttribute('aria-expanded', String(state.inspectorOpen));
    document.getElementById('code-inspector').setAttribute('aria-expanded', String(state.inspectorOpen));
    if (state.inspectorOpen && state.selectedSlug) {
      updateCodeInspector(state.selectedSlug);
    }
  });

  // Apply persisted state
  if (state.inspectorOpen) {
    content.hidden = false;
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.getElementById('code-inspector').setAttribute('aria-expanded', 'true');
  }

  // Tab switching
  document.getElementById('tab-css').addEventListener('click', () => switchInspectorTab('css'));
  document.getElementById('tab-html').addEventListener('click', () => switchInspectorTab('html'));
}

function switchInspectorTab(tab) {
  document.getElementById('inspector-css-panel').hidden  = tab !== 'css';
  document.getElementById('inspector-html-panel').hidden = tab !== 'html';
  document.getElementById('tab-css').setAttribute('aria-selected', String(tab === 'css'));
  document.getElementById('tab-html').setAttribute('aria-selected', String(tab === 'html'));
}

function updateCodeInspector(slug) {
  if (!state.inspectorOpen) return;
  const t = getTemplateBySlug(slug);

  const cssCode  = document.getElementById('inspector-css-code');
  const htmlCode = document.getElementById('inspector-html-code');

  cssCode.textContent  = buildDownloadCSS(t);
  htmlCode.textContent = buildDownloadHTML(t);

  if (typeof Prism !== 'undefined') {
    Prism.highlightElement(cssCode);
    Prism.highlightElement(htmlCode);
  }
}

// ── AI recommendation drawer ──────────────────────────────────────────────────

function wireAIDrawer() {
  const drawer   = document.getElementById('ai-drawer');
  const openBtn  = document.getElementById('btn-ai-drawer');
  const closeBtn = document.getElementById('btn-close-drawer');
  const apiKeyInput   = document.getElementById('ai-api-key');
  const descInput     = document.getElementById('ai-description');
  const recommendBtn  = document.getElementById('btn-recommend');

  openBtn.addEventListener('click', () => openAIDrawer());
  closeBtn.addEventListener('click', () => closeAIDrawer());

  drawer.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAIDrawer();
  });

  // Restore key from sessionStorage
  const savedKey = SS.get('tt_ai_key');
  if (savedKey) {
    apiKeyInput.value = savedKey;
    recommendBtn.disabled = false;
  }

  apiKeyInput.addEventListener('input', () => {
    const key = apiKeyInput.value.trim();
    SS.set('tt_ai_key', key);
    recommendBtn.disabled = key.length === 0;
  });

  recommendBtn.addEventListener('click', () => runAIRecommendation());
}

function openAIDrawer() {
  const drawer  = document.getElementById('ai-drawer');
  const openBtn = document.getElementById('btn-ai-drawer');
  drawer.setAttribute('aria-hidden', 'false');
  drawer.classList.add('open');
  openBtn.setAttribute('aria-expanded', 'true');
  document.getElementById('ai-api-key').focus();
}

function closeAIDrawer() {
  const drawer  = document.getElementById('ai-drawer');
  const openBtn = document.getElementById('btn-ai-drawer');
  drawer.setAttribute('aria-hidden', 'true');
  drawer.classList.remove('open');
  openBtn.setAttribute('aria-expanded', 'false');
  openBtn.focus();
}

async function runAIRecommendation() {
  const key         = SS.get('tt_ai_key', '');
  const description = document.getElementById('ai-description').value.trim();
  const results     = document.getElementById('ai-results');
  const btn         = document.getElementById('btn-recommend');
  const timerEl     = document.getElementById('ai-timer');
  const countdownEl = document.getElementById('ai-countdown');

  if (!key || !description) return;

  btn.disabled = true;
  results.innerHTML = buildAISkeleton();
  timerEl.hidden = false;
  let countdown = 15;
  countdownEl.textContent = countdown;
  const timer = setInterval(() => {
    countdown--;
    countdownEl.textContent = countdown;
    if (countdown <= 0) clearInterval(timer);
  }, 1000);

  const controller = new AbortController();
  const timeout    = setTimeout(() => controller.abort(), 15000);

  try {
    const catalog = getTemplateCatalog();
    const prompt  = buildAIPrompt(description, catalog);

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key':         key,
        'anthropic-version': '2023-06-01',
        // The user supplies their OWN key (BYOK, sessionStorage-only); this
        // header opts into Anthropic's direct-from-browser path so the call
        // works when the app is served from a static host (e.g. GitHub Pages).
        'anthropic-dangerous-direct-browser-access': 'true',
        'content-type':      'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 512,
        messages: [{ role: 'user', content: prompt }]
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);
    clearInterval(timer);
    timerEl.hidden = true;

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      const msg = getAPIErrorMessage(res.status, errBody);
      results.innerHTML = `<p class="ai-error" role="alert">${msg}</p>`;
      btn.disabled = false;
      return;
    }

    const data = await res.json();
    const text = data?.content?.[0]?.text ?? '';
    renderAIResults(text);

  } catch (err) {
    clearTimeout(timeout);
    clearInterval(timer);
    timerEl.hidden = true;
    const msg = err.name === 'AbortError'
      ? 'Request timed out after 15 seconds. Try again.'
      : `Network error: ${err.message}`;
    results.innerHTML = `<p class="ai-error" role="alert">${msg}</p>`;
  }

  btn.disabled = false;
}

function buildAIPrompt(description, catalog) {
  return `You are a design template recommender. Given a project description, recommend 2-3 templates from the catalog below.
Return ONLY a JSON array in this exact format: [{"slug":"name","rationale":"one sentence why"}]
Do not include any other text.

Project: ${description}

Templates: ${JSON.stringify(catalog)}`;
}

function getAPIErrorMessage(status, body) {
  if (status === 401) return 'Invalid API key — check your Anthropic key and try again.';
  if (status === 429) return 'Rate limit exceeded — wait a moment and try again.';
  if (status === 500) return 'Anthropic server error — try again shortly.';
  const msg = body?.error?.message ?? `HTTP ${status}`;
  return `API error: ${msg}`;
}

function buildAISkeleton() {
  return `<div class="ai-skeleton" aria-busy="true" aria-label="Loading recommendations">
    ${'<div class="skeleton-row"></div>'.repeat(3)}
  </div>`;
}

function renderAIResults(text) {
  const results = document.getElementById('ai-results');
  try {
    const recs = JSON.parse(text);
    if (!Array.isArray(recs) || recs.length === 0) throw new Error('Empty response');

    results.innerHTML = recs.map(r => {
      const t = getTemplateBySlug(r.slug);
      if (!t) return '';
      return `
        <div class="ai-result-card" data-slug="${t.slug}" role="button" tabindex="0"
             aria-label="Select template ${t.name}">
          <div class="ai-result-palette">
            ${t.paletteSwatches.slice(0, 3).map(c => `<span style="background:${c}"></span>`).join('')}
          </div>
          <div class="ai-result-info">
            <strong class="ai-result-name">${t.name}</strong>
            <p class="ai-result-rationale">${r.rationale}</p>
          </div>
        </div>
      `;
    }).join('');

    results.querySelectorAll('.ai-result-card').forEach(card => {
      const handler = () => {
        selectTemplate(card.dataset.slug);
        closeAIDrawer();
      };
      card.addEventListener('click', handler);
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') handler(); });
    });

  } catch {
    results.innerHTML = `<p class="ai-error" role="alert">Could not parse recommendations. Try again.</p>`;
  }
}

// ── Panel resize ──────────────────────────────────────────────────────────────

function wirePanelResize() {
  const handle   = document.getElementById('panel-resize-handle');
  const body     = document.getElementById('app-body');
  let dragging   = false;

  handle.addEventListener('mousedown', (e) => {
    dragging = true;
    document.body.style.userSelect = 'none';
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const rect    = body.getBoundingClientRect();
    const pct     = ((e.clientX - rect.left) / rect.width) * 100;
    const clamped = Math.min(Math.max(pct, 20), 70);
    body.style.gridTemplateColumns = `${clamped}% 4px 1fr`;
    LS.set('tt_panel_width', clamped);
  });

  document.addEventListener('mouseup', () => {
    dragging = false;
    document.body.style.userSelect = '';
  });

  // Restore saved position
  if (state.panelWidth) {
    body.style.gridTemplateColumns = `${state.panelWidth}% 4px 1fr`;
  }
}

// ── Mobile preview bottom sheet ───────────────────────────────────────────────

function wireMobilePreview() {
  const modal     = document.getElementById('mobile-preview-modal');
  const surface   = document.getElementById('mobile-preview-surface');
  const titleEl   = document.getElementById('mobile-preview-title');
  const closeBtn  = document.getElementById('btn-mobile-close');
  const prevBtn   = document.getElementById('btn-mobile-prev');
  const nextBtn   = document.getElementById('btn-mobile-next');
  const dlBtn     = document.getElementById('btn-mobile-download');

  closeBtn.addEventListener('click', () => closeMobilePreview());
  modal.addEventListener('click', (e) => { if (e.target === modal) closeMobilePreview(); });

  prevBtn.addEventListener('click', () => cycleMobileTemplate(-1));
  nextBtn.addEventListener('click', () => cycleMobileTemplate(+1));

  dlBtn.addEventListener('click', () => {
    if (state.selectedSlug) openDownloadModal(state.selectedSlug);
  });

  // Swipe left/right — threshold 30px per spec
  let touchStartX = null;
  modal.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  modal.addEventListener('touchend', (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(dx) >= 30) cycleMobileTemplate(dx < 0 ? +1 : -1);
  }, { passive: true });

  // Escape key
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobilePreview();
  });
}

function openMobilePreview(slug) {
  const modal   = document.getElementById('mobile-preview-modal');
  const surface = document.getElementById('mobile-preview-surface');
  const titleEl = document.getElementById('mobile-preview-title');
  const t = getTemplateBySlug(slug);
  loadTemplateFonts(t);
  titleEl.textContent = t.name;
  injectTemplateCSS(t);
  surface.innerHTML = buildMockPage(t);
  modal.hidden = false;
  requestAnimationFrame(() => modal.classList.add('open'));
  document.getElementById('btn-mobile-close').focus();
}

function closeMobilePreview() {
  const modal = document.getElementById('mobile-preview-modal');
  modal.classList.remove('open');
  setTimeout(() => { modal.hidden = true; }, 260);
}

function cycleMobileTemplate(direction) {
  const slugs = getFilteredTemplates().map(t => t.slug);
  if (slugs.length === 0) return;
  const cur = slugs.indexOf(state.selectedSlug);
  const next = (cur + direction + slugs.length) % slugs.length;
  selectTemplate(slugs[next]);
  openMobilePreview(slugs[next]);
}

// ── Toast notifications ───────────────────────────────────────────────────────

function showToast(message, duration = 2000) {
  const container = document.getElementById('toast-container');
  const toast     = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.setAttribute('role', 'status');
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('toast-visible'));
  setTimeout(() => {
    toast.classList.remove('toast-visible');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

function showButtonFeedback(btn, label, duration) {
  const original = btn.textContent;
  btn.textContent = label;
  setTimeout(() => { btn.textContent = original; }, duration);
}
