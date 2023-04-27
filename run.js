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
const str_messageRequest = `🚗 new request`;
const str_contentType = `Content-Type`;
const str_contentTypeText = `text/plain`;

const fun_listeningListener = () => {
  console.log(str_messageStart)
}

const fun_requestListener = (incomingMessage, serverResponse) => {
  console.log(str_messageRequest);

  switch (incomingMessage.method) {
    case str_methodGet:
      console.log(str_methodGet);
      serverResponse.setHeader(str_contentType, str_contentTypeText);
      serverResponse.statusCode = num_statusOk;
      serverResponse.end(`${ str_methodGet } ${ str_messageOk }`);
    break;

    case str_methodPost:
      console.log(str_methodPost);
      serverResponse.setHeader(str_contentType, str_contentTypeText);
      serverResponse.statusCode = num_statusOk;
      serverResponse.end(`${ str_methodPost } ${ str_messageOk }`);
    break;

    default:
      console.log(incomingMessage.method);
      serverResponse.setHeader(str_contentType, str_contentTypeText);
      serverResponse.statusCode = num_statusIncorrect;
      serverResponse.end(str_messageIncorrect);
    break;
  }
}

const server = http.createServer(fun_requestListener);

server.listen(
  num_port,
  str_host,
  fun_listeningListener,
);