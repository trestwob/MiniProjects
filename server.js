const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const requestListener = (req, res) => {
    console.log(`Request URL: ${req.url}`);
    
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    const extname = path.extname(filePath);
    let contentType = 'text/html';
    let charset = 'utf-8';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.gif':
            contentType = 'image/gif';
            break;
    }

    if (extname === '.html') {
        contentType = 'text/html';
    }

    fs.readFile(filePath, 'utf-8', (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>', 'utf8');
            } else {
                res.writeHead(500);
                res.end('Server Error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': `${contentType}; charset=${charset}` });
            res.end(content, 'utf8');
        }
    });
};

const server = http.createServer(requestListener);

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
