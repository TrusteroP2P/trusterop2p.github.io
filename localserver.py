import SimpleHTTPServer, SocketServer, sys
port = int(sys.argv[1]) if len(sys.argv) > 1 else 9000
SocketServer.TCPServer(("", port), SimpleHTTPServer.SimpleHTTPRequestHandler).serve_forever()