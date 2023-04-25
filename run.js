const http = require(`http`);

const num_port = 3001;
const num_statusOk = 200;
const num_statusIncorrect = 404;
const str_host = `127.0.0.1`;
const str_methodGet = `GET`;
const str_methodPost = `POST`;
const str_messageOk = `OK`;
const str_messageIncorrect = `INCORRECT`;
const str_messageStart = `🚀 server started on port [${ num_port }]\n`;
const str_messageConnection = `🚂 new connection`;
const str_messageRequest = `🚗 new request`;
const str_contentType = `Content-Type`;
const str_contentTypeText = `text/plain`;

const server = http.createServer();

server.on(`connection`, () => {
  console.log(str_messageConnection);
})

server.on(`request`, (req, res) => {
  console.log(str_messageRequest);

  switch (req.method) {
    case str_methodGet:
      console.log(str_methodGet);
      res.setHeader(str_contentType, str_contentTypeText);
      res.writeHead(num_statusOk);
      res.end(`${ str_methodGet } ${ str_messageOk }`);
    break;

    case str_methodPost:
      console.log(str_methodPost);
      res.setHeader(str_contentType, str_contentTypeText);
      res.writeHead(num_statusOk);
      res.end(`${ str_methodPost } ${ str_messageOk }`);
    break;

    default:
      console.log(req.method);
      res.setHeader(str_contentType, str_contentTypeText);
      res.writeHead(num_statusIncorrect);
      res.end(str_messageIncorrect);
    break;
  }
});

server.listen(num_port, str_host, () => console.log(str_messageStart));