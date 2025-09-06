import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const server = http.createServer((request, response) => {
  const filePath = '.' + request.url;

  if (filePath === './') {
    response.writeHead(400, { 'Content-Type': 'text/html' });
    response.end('<h1>Insira o caminho do arquivo na URL.</h1>');
    return;
  };

  const filePathExtended = path.extname(filePath).toLowerCase();

  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.otf': 'application/font-otf',
  };

  const contentType = mimeTypes[filePathExtended] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      const statusCode = error.code === 'ENOENT' ? 404 : 500;
      const message = error.code === 'ENOENT'
        ? '<h1>404 Not Found</h1>'
        : `Server error: ${error.code}`;

      response.writeHead(statusCode, { 'Content-Type': 'text/html' });
      response.end(message);
      return;
    };

    response.writeHead(200, { 'Content-Type': contentType });
    response.end(content);
  });
});

const PORT = 3000;

server.listen(PORT, 'localhost', () => {
  console.log(`Server running at http://localhost:${PORT}.`);
});
