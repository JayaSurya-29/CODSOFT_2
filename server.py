import os
from http.server import HTTPServer, SimpleHTTPRequestHandler

class MyHTTPRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

port = int(os.environ.get('PORT', 8000))
server_address = ('', port)
httpd = HTTPServer(server_address, MyHTTPRequestHandler)

print(f"Server running on port {port}")
httpd.serve_forever()
