#!/usr/bin/env bash
# TemplateTester — Development Environment Setup
# Serves the static app locally; no build step required.

set -euo pipefail

PORT="${PORT:-8080}"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "============================================"
echo "  TemplateTester — Interactive Design Gallery"
echo "============================================"
echo ""
echo "Root directory : $ROOT_DIR"
echo "Serve port     : $PORT"
echo ""

# ── Dependency check ──────────────────────────────────────────────────────────
check_cmd() {
  command -v "$1" >/dev/null 2>&1
}

start_server() {
  if check_cmd python3; then
    echo "Starting server with python3 http.server on port $PORT ..."
    echo ""
    echo "  ➜  http://localhost:$PORT"
    echo "  ➜  http://localhost:$PORT/#template=obsidian  (direct template link)"
    echo ""
    echo "Press Ctrl+C to stop."
    cd "$ROOT_DIR"
    python3 -m http.server "$PORT"
  elif check_cmd python; then
    echo "Starting server with python SimpleHTTPServer on port $PORT ..."
    echo ""
    echo "  ➜  http://localhost:$PORT"
    echo ""
    echo "Press Ctrl+C to stop."
    cd "$ROOT_DIR"
    python -m SimpleHTTPServer "$PORT"
  elif check_cmd npx; then
    echo "Starting server with npx serve on port $PORT ..."
    echo ""
    echo "  ➜  http://localhost:$PORT"
    echo ""
    echo "Press Ctrl+C to stop."
    cd "$ROOT_DIR"
    npx serve -p "$PORT" .
  elif check_cmd node; then
    echo "Starting minimal Node.js server on port $PORT ..."
    cd "$ROOT_DIR"
    node - <<'NODESERVER'
const http = require('http');
const fs   = require('fs');
const path = require('path');
const port = parseInt(process.env.PORT || '8080');
const mime = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.zip': 'application/zip'
};
http.createServer((req, res) => {
  let url = req.url.split('?')[0].split('#')[0];
  if (url === '/' || url === '') url = '/index.html';
  const fp = path.join(__dirname, url);
  fs.readFile(fp, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    const ext = path.extname(fp);
    res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(port, () => console.log(`  ➜  http://localhost:${port}`));
NODESERVER
  else
    echo "ERROR: No suitable static file server found."
    echo "Install one of: python3, python, Node.js (npx), or run:"
    echo "  npx serve ."
    exit 1
  fi
}

# ── Verification tips ─────────────────────────────────────────────────────────
echo "Quick verification steps after server starts:"
echo "  1. All 15 template cards visible in gallery grid"
echo "  2. Click any card → preview updates, URL hash changes"
echo "  3. Filter chips, search, favorites, download all functional"
echo "  4. Accessibility: paste into DevTools console →"
echo "       axe.run('#gallery-shell', {}, (e,r) => console.log(r.violations))"
echo ""
echo "Optional AI panel: set ANTHROPIC_API_KEY in the UI (stored in sessionStorage)"
echo ""

start_server
