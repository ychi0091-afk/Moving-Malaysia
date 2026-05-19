"""
serve.py — Local dev server for Moving Malaysia
Run: python serve.py
Watches main.js (and any .js/.css/.html in the project) and triggers a
hard-reload in the browser via a simple Server-Sent Events endpoint.
"""

import http.server
import socketserver
import threading
import time
import os
import sys
import webbrowser
from pathlib import Path
from functools import partial

# ── Config ────────────────────────────────────────────────────────────────────
PORT        = 8000
WATCH_EXTS  = {".js", ".css", ".html", ".csv", ".geojson"}
PROJECT_DIR = Path(__file__).parent          # folder containing serve.py
OPEN_URL    = f"http://localhost:{PORT}"

# ── File-watcher state ────────────────────────────────────────────────────────
_file_mtimes: dict[Path, float] = {}
_sse_clients: list = []          # list of open SSE response objects
_sse_lock = threading.Lock()


def _snapshot() -> dict[Path, float]:
    """Return {path: mtime} for every watched file in the project."""
    snap = {}
    for ext in WATCH_EXTS:
        for p in PROJECT_DIR.rglob(f"*{ext}"):
            # skip hidden dirs / node_modules / __pycache__
            if any(part.startswith((".","__")) for part in p.parts):
                continue
            try:
                snap[p] = p.stat().st_mtime
            except FileNotFoundError:
                pass
    return snap


def _notify_clients():
    """Push a reload event to every connected browser tab."""
    with _sse_lock:
        dead = []
        for wfile in _sse_clients:
            try:
                wfile.write(b"data: reload\n\n")
                wfile.flush()
            except Exception:
                dead.append(wfile)
        for d in dead:
            _sse_clients.remove(d)


def _watcher():
    """Background thread: poll for changed files, notify on change."""
    global _file_mtimes
    _file_mtimes = _snapshot()
    print(f"  Watching {len(_file_mtimes)} file(s) for changes …\n")

    while True:
        time.sleep(0.8)
        current = _snapshot()

        changed = [
            p for p, mt in current.items()
            if _file_mtimes.get(p) != mt
        ]
        new_files = [p for p in current if p not in _file_mtimes]
        deleted   = [p for p in _file_mtimes if p not in current]

        if changed or new_files or deleted:
            for p in changed:
                print(f"  ↻  Changed : {p.relative_to(PROJECT_DIR)}")
            for p in new_files:
                print(f"  +  New     : {p.relative_to(PROJECT_DIR)}")
            for p in deleted:
                print(f"  -  Deleted : {p.relative_to(PROJECT_DIR)}")
            _file_mtimes = current
            _notify_clients()

        else:
            _file_mtimes = current   # pick up new files silently


# ── Custom request handler ────────────────────────────────────────────────────
class Handler(http.server.SimpleHTTPRequestHandler):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(PROJECT_DIR), **kwargs)

    # ── SSE endpoint: GET /__reload_stream ────────────────────────────────────
    def do_GET(self):
        if self.path == "/__reload_stream":
            self._sse_handler()
        else:
            super().do_GET()

    def _sse_handler(self):
        self.send_response(200)
        self.send_header("Content-Type",  "text/event-stream")
        self.send_header("Cache-Control", "no-cache")
        self.send_header("Connection",    "keep-alive")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()

        with _sse_lock:
            _sse_clients.append(self.wfile)

        # keep the connection alive until the client disconnects
        try:
            while True:
                time.sleep(5)
                self.wfile.write(b": ping\n\n")
                self.wfile.flush()
        except Exception:
            with _sse_lock:
                if self.wfile in _sse_clients:
                    _sse_clients.remove(self.wfile)

    # ── Inject the auto-reload <script> into every HTML response ──────────────
    def send_head(self):
        path = self.translate_path(self.path)

        # Skip injection for directories and non-HTML files
        if os.path.isdir(path):
            return super().send_head()

        if not self.path.split("?")[0].rstrip("/").endswith(
            (".css", ".js", ".csv", ".geojson", ".json", ".ico", ".png",
            ".jpg", ".svg", ".woff", ".woff2", ".ttf")
        ):
            # Likely an HTML page — intercept and inject script
            try:
                with open(path, "rb") as f:
                    content = f.read()

                inject = b"""
    <script>
    (function(){
    const es = new EventSource('/__reload_stream');
    es.onmessage = function(e){
        if(e.data === 'reload'){ location.reload(); }
    };
    es.onerror = function(){
        setTimeout(function(){ location.reload(); }, 1500);
    };
    })();
    </script>
    """
                content = content.replace(b"</body>", inject + b"</body>")

                self.send_response(200)
                self.send_header("Content-Type",   "text/html; charset=utf-8")
                self.send_header("Content-Length", str(len(content)))
                self.send_header("Cache-Control",  "no-store")
                self.end_headers()
                self.wfile.write(content)
                return None

            except (FileNotFoundError, IsADirectoryError, PermissionError):
                pass  # fall through to default handler

        return super().send_head()

    def log_message(self, fmt, *args):
        # Suppress the per-request noise; only show errors
        code = args[1] if len(args) > 1 else ""
        if str(code).startswith(("4", "5")):
            super().log_message(fmt, *args)


# ── Main ──────────────────────────────────────────────────────────────────────
def main():
    os.chdir(PROJECT_DIR)

    # Allow fast restart (SO_REUSEADDR)
    socketserver.TCPServer.allow_reuse_address = True

    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("─" * 52)
        print(" Moving Malaysia — Dev Server")
        print("─" * 52)
        print(f"  Serving : {PROJECT_DIR}")
        print(f"  URL     : {OPEN_URL}")
        print(f"  Live-reload on save (js / css / html / csv / geojson)")
        print("  Press Ctrl+C to stop.\n")

        # Start file-watcher thread
        t = threading.Thread(target=_watcher, daemon=True)
        t.start()

        # Open browser automatically
        threading.Timer(0.5, webbrowser.open, args=[OPEN_URL]).start()

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n  Server stopped.")
            sys.exit(0)


if __name__ == "__main__":
    main()
