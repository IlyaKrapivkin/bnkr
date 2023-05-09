const http = require(`http`);
const dotenv = require(`dotenv`);
const config = require(`./package.json`);
const { Client } = require(`pg`);

const num_portServer = 3001;
const num_statusOk = 200;
const num_statusUnauthorized = 401;
const num_statusNotFound = 404;
const num_methodNotAllowed = 405;
const str_hostServer = `127.0.0.1`;
const str_methodGet = `GET`;
const str_methodPost = `POST`;
const str_messageStart = `🚀 server started`;
const str_messageDbConnected = `📚 database connected`;
const str_messageError = `❌`;
const str_iconRequest = `🚗`;
const str_headerContentType = `Content-Type`;
const str_headerAuthorization = `authorization`;
const str_contentTypeText = `text/plain`;
const str_routePing = `/ping`;
const str_routeInfoApp = `/infoApp`;
const str_pong = `PONG`;
const str_notFound = `NOT FOUND`;
const str_unauthorized = `UNAUTHORIZED`;
const str_methodNotAllowed = `METHOD NOT ALLOWED`;

const fun_listeningListener = async () => {
  dotenv.config();

  const str_messageStartExtended = ``.concat(
    str_messageStart,
    ` [${str_hostServer}:${num_portServer}]`,
  );
  console.log(str_messageStartExtended);

  try {
    const obj_clientPg = new Client(
      {
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: +process.env.PGPORT,
      }
    );

    await obj_clientPg.connect();

    const any_resDb = await obj_clientPg.query(`SELECT version();`);

    if (any_resDb) {
      await obj_clientPg.end();
      const str_messageDbConnectedExtended = ``.concat(
        str_messageDbConnected,
        ` [${process.env.PGDATABASE}]`,
        ` [${process.env.PGHOST}:${process.env.PGPORT}]`,
      );
      console.log(str_messageDbConnectedExtended)
    } else {
      throw `version-requset unsuccessful`
    }
  } catch (catchedError) {
    console.log(`${str_messageError} cannot connect to database${catchedError ? `:${catchedError}` : ``}`);
  }
}

const server = http.createServer((incomingMessage, serverResponse) => {
  console.log(`${str_iconRequest} [${incomingMessage.method}] [${incomingMessage.url}]`);

  const any_sessionInitial = incomingMessage.headers[str_headerAuthorization];
  const str_session = (
    (
      any_sessionInitial &&
      typeof any_sessionInitial === `string` &&
      any_sessionInitial.length
    ) ?
    any_sessionInitial :
    ``
  );
  const bol_authorized = (str_session === `12345`);

  switch (incomingMessage.method) {
    case str_methodGet:
      switch (incomingMessage.url) {
        case str_routePing:
          serverResponse.setHeader(str_headerContentType, str_contentTypeText);
          serverResponse.statusCode = num_statusOk;
          serverResponse.end(str_pong);
        break;

        case str_routeInfoApp:
          if (bol_authorized) {
            serverResponse.setHeader(str_headerContentType, str_contentTypeText);
            serverResponse.statusCode = num_statusOk;
            const str_infoApp = `${config.name} ${config.version} ${config.description}`;
            serverResponse.end(str_infoApp);
          } else {
            serverResponse.setHeader(str_headerContentType, str_contentTypeText);
            serverResponse.statusCode = num_statusUnauthorized;
            serverResponse.end(str_unauthorized);
          }
        break;
      
        default:
          serverResponse.setHeader(str_headerContentType, str_contentTypeText);
          serverResponse.statusCode = num_statusNotFound;
          serverResponse.end(str_notFound);
        break;
      }
    break;

    case str_methodPost:
      serverResponse.setHeader(str_headerContentType, str_contentTypeText);
      serverResponse.statusCode = num_statusNotFound;
      serverResponse.end(str_notFound);
    break;

    default:
      serverResponse.setHeader(str_headerContentType, str_contentTypeText);
      serverResponse.statusCode = num_methodNotAllowed;
      serverResponse.end(str_methodNotAllowed);
    break;
  }
})

server.listen(
  num_portServer,
  str_hostServer,
  fun_listeningListener,
);