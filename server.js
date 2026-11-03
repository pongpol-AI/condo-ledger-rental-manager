// Local-only static server. It binds only to 127.0.0.1, never to the network.
const http = require('http');
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, 'dist');
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'};
http.createServer((req,res)=>{
  const url = new URL(req.url, 'http://127.0.0.1');
  const file = path.resolve(root, url.pathname === '/' ? 'index.html' : '.' + url.pathname);
  if (!file.startsWith(root)) return res.writeHead(403).end('Forbidden');
  fs.readFile(file, (err,data)=>{
    if (err) return res.writeHead(err.code === 'ENOENT' ? 404 : 500).end('Not found');
    res.writeHead(200, {'Content-Type': types[path.extname(file)] || 'application/octet-stream','Cache-Control':'no-store'}).end(data);
  });
}).listen(8787, '127.0.0.1', ()=>console.log('Condo Ledger local only: http://127.0.0.1:8787'));
