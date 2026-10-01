/**
 * ResumeCraft Pro - Local Development Server
 * Zero dependencies required. Uses Node.js native http and fs modules.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const DEFAULT_PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.pdf': 'application/pdf'
};

function createServer(port) {
  const server = http.createServer((req, res) => {
    // Parse URL and strip query strings or hash
    let safePath = decodeURIComponent(req.url.split('?')[0].split('#')[0]);
    if (safePath === '/' || safePath === '') {
      safePath = '/index.html';
    }

    // Prevent directory traversal attacks
    const filePath = path.normalize(path.join(ROOT_DIR, safePath));
    if (!filePath.startsWith(ROOT_DIR)) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('403 Forbidden');
      return;
    }

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
          <!DOCTYPE html>
          <html>
          <head><title>404 Not Found</title></head>
          <body style="font-family: sans-serif; text-align: center; padding: 50px;">
            <h2>404 - File Not Found</h2>
            <p>Could not find: <code>${safePath}</code></p>
            <p><a href="/">Return to Home</a></p>
          </body>
          </html>
        `);
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });

      const readStream = fs.createReadStream(filePath);
      readStream.pipe(res);
    });
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is currently in use, trying port ${port + 1}...`);
      createServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });

  server.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.log('\n==================================================');
    console.log('  🚀 ResumeCraft Pro Development Server Running!');
    console.log(`  Local URL:  \x1b[36m${url}\x1b[0m`);
    console.log('==================================================\n');
    console.log('Press Ctrl + C to stop the server.\n');

    // Automatically open browser on Windows
    const openCommand = process.platform === 'win32' ? `start ${url}` :
                        process.platform === 'darwin' ? `open ${url}` :
                        `xdg-open ${url}`;
    
    exec(openCommand, (error) => {
      if (error) {
        // Fallback if auto-open fails
        console.log(`Open your browser and visit: ${url}`);
      }
    });
  });
}

createServer(Number(DEFAULT_PORT));
