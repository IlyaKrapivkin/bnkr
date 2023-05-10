const http = require(`http`);
const dotenv = require(`dotenv`);
const { Client } = require(`pg`);

const config = require(`./package.json`);
const {
  obj_host,
  obj_port,
  obj_methodHttp,
  obj_statusHttp,
  obj_headerNameHttp,
  obj_headerValueHttp,
  obj_route,
  obj_icon,
  obj_sign,
  obj_messageShort,
  obj_messageLong,
} = require(`./store.js`);

const fun_listeningListener = async () => {
  dotenv.config();

  const str_messageStartExtended = ``.concat(
    obj_icon.str_iconServer,
    obj_sign.str_space,
    obj_messageLong.str_servStart,
    obj_sign.str_space,
    `[${obj_host.str_hostServer}:${obj_port.num_portServer}]`,
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
        obj_icon.str_iconDb,
        obj_sign.str_space,
        obj_messageLong.str_dbConnect,
        obj_sign.str_space,
        `[${process.env.PGDATABASE}]`,
        obj_sign.str_space,
        `[${process.env.PGHOST}:${process.env.PGPORT}]`,
      );
      console.log(str_messageDbConnectedExtended)
    } else {
      throw `version-requset unsuccessful`
    }
  } catch (catchedError) {
    const str_errorLocal = ``.concat(
      obj_icon.str_iconError,
      obj_sign.str_space,
      obj_messageLong.str_dbNoConnect,
      (
        catchedError && catchedError?.message ?
        `:${catchedError.message}` :
        ``
      ),
    )
    console.log(str_errorLocal);
  }
}

const server = http.createServer((incomingMessage, serverResponse) => {
  const str_logRequestStart = ``.concat(
    obj_icon.str_iconRequest,
    obj_sign.str_space,
    `[${incomingMessage.method}]`,
    obj_sign.str_space,
    `[${incomingMessage.url}]`,
  )
  console.log(str_logRequestStart);

  const str_headerName = obj_headerNameHttp.str_headerAuthorization.toLowerCase()
  const any_sessionInitial = incomingMessage.headers[str_headerName];
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
    case obj_methodHttp.str_methodGet:
      switch (incomingMessage.url) {
        case obj_route.str_routePing:
          serverResponse.setHeader(
            obj_headerNameHttp.str_headerContentType,
            obj_headerValueHttp.str_headerValueText
          );
          serverResponse.statusCode = obj_statusHttp.num_statusOk;
          serverResponse.end(obj_messageShort.str_pong);
        break;

        case obj_route.str_routeInfoApp:
          if (bol_authorized) {
            serverResponse.setHeader(
              obj_headerNameHttp.str_headerContentType,
              obj_headerValueHttp.str_headerValueText
            );
            serverResponse.statusCode = obj_statusHttp.num_statusOk;
            const str_infoApp = ``.concat(
              config.name,
              obj_sign.str_space,
              config.version,
              obj_sign.str_space,
              config.description,
            );
            serverResponse.end(str_infoApp);
          } else {
            serverResponse.setHeader(
              obj_headerNameHttp.str_headerContentType,
              obj_headerValueHttp.str_headerValueText
            );
            serverResponse.statusCode = obj_statusHttp.num_statusUnauthorized;
            serverResponse.end(obj_messageShort.str_unauthorized);
          }
        break;
      
        default:
          serverResponse.setHeader(
            obj_headerNameHttp.str_headerContentType,
            obj_headerValueHttp.str_headerValueText
          );
          serverResponse.statusCode = obj_statusHttp.num_statusNotFound;
          serverResponse.end(obj_messageShort.str_notFound);
        break;
      }
    break;

    case obj_methodHttp.str_methodPost:
      serverResponse.setHeader(
        obj_headerNameHttp.str_headerContentType,
        obj_headerValueHttp.str_headerValueText
      );
      serverResponse.statusCode = obj_statusHttp.num_statusNotFound;
      serverResponse.end(obj_messageShort.str_notFound);
    break;

    default:
      serverResponse.setHeader(
        obj_headerNameHttp.str_headerContentType,
        obj_headerValueHttp.str_headerValueText
      );
      serverResponse.statusCode = obj_statusHttp.num_methodNotAllowed;
      serverResponse.end(obj_messageShort.str_methodNotAllowed);
    break;
  }
})

server.listen(
  obj_port.num_portServer,
  obj_host.str_hostServer,
  fun_listeningListener,
);