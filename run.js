const http = require('http');
const url = require('url');

const localhost = `127.0.0.1 `;
const port = 3001;
const methodGet = `GET`;
const methodPost = `POST`;
const statusOk = 200;
const statusIncorrect = 404;
const messageStart = `🚀 server started`;
const messageOk = `OK`;
const messageIncorrect = `INCORRECT`;
const contentType = `text/plain`;

const server = http.createServer((req, res) => {
  switch (req.method) {
    case methodGet:
      console.log(methodGet);
      const urlObj = url.parse(req.url, true);
      console.log(urlObj);
      res.writeHead(
        statusOk,
        { 'Content-Type': contentType },
      );
      res.end(`${methodGet} ${messageOk}`);
    break;

    case methodPost:
      console.log(methodPost);
      res.writeHead(
        statusOk,
        { 'Content-Type': contentType },
      );
      res.end(`${methodPost} ${messageOk}`);
    break;

    default:
      console.log(req.method);
      res.writeHead(
        statusIncorrect,
        { 'Content-Type': contentType },
      );
      res.end(messageIncorrect);
    break;
  }
});

server.listen(port, () => console.log(messageStart));