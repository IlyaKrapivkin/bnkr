const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  console.log(req.method);``

  const urlObj = url.parse(req.url, true);

  console.log(urlObj);

  res.writeHead(
    200,
    { 'Content-Type': `text/plain` },
  );

  res.end(`priviet`);

}).listen(3000, () => console.log(`server started`));

//127.0.0.1 