"""
Arun Shijo Portfolio - Local Development Server
Zero-dependency Python HTTP Server
Run with: python server.py (or py server.py)
"""

import http.server
import socketserver
import os
import sys
import webbrowser

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class PortfolioHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable CORS and caching headers for local testing
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def guess_type(self, path):
        ctype = super().guess_type(path)
        if path.endswith(".js"):
            return "application/javascript"
        elif path.endswith(".svg"):
            return "image/svg+xml"
        elif path.endswith(".css"):
            return "text/css"
        return ctype

def run_server():
    os.chdir(DIRECTORY)
    handler = PortfolioHTTPRequestHandler
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        url = f"http://localhost:{PORT}"
        print("=" * 60)
        print(f"[+] Arun Shijo Portfolio is running at: {url}")
        print(f"[*] Serving directory: {DIRECTORY}")
        print("[*] Press Ctrl+C to stop the server.")
        print("=" * 60)
        
        # If running interactively, open in browser
        if "--open" in sys.argv:
            try:
                webbrowser.open(url)
            except Exception:
                pass
                
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")
            httpd.server_close()

if __name__ == "__main__":
    run_server()
