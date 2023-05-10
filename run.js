const http = require(`http`);
const dotenv = require(`dotenv`);
const { Client } = require(`pg`);

const config = require(`./package.json`);
const { obj_store } = require(`./store.js`);

const fun_listeningListener = async () => {
  dotenv.config();

  const str_messageStartExtended = ``.concat(
    obj_store.obj_icon.str_iconServer,
    ` `,
    obj_store.obj_messageLong.str_servStart,
    ` `,
    `[${obj_store.obj_host.str_hostServer}:${obj_store.obj_port.num_portServer}]`,
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
        obj_store.obj_icon.str_iconDb,
        ` `,
        obj_store.obj_messageLong.str_dbConnect,
        ` `,
        `[${process.env.PGDATABASE}]`,
        ` `,
        `[${process.env.PGHOST}:${process.env.PGPORT}]`,
      );
      console.log(str_messageDbConnectedExtended)
    } else {
      throw `version-requset unsuccessful`
    }
  } catch (catchedError) {
    const str_catchedError = (
      catchedError && catchedError?.message ?
      `:${catchedError.message}` :
      ``
    );
    console.log(`${obj_store.obj_icon.str_iconError} cannot connect to database${str_catchedError}`);
  }
}

const server = http.createServer((incomingMessage, serverResponse) => {
  console.log(`${obj_store.obj_icon.str_iconRequest} [${incomingMessage.method}] [${incomingMessage.url}]`);

  const any_sessionInitial = incomingMessage.headers[obj_store.obj_headerNameHttp.str_headerAuthorization.toLowerCase()];
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
    case obj_store.obj_methodHttp.str_methodGet:
      switch (incomingMessage.url) {
        case obj_store.obj_route.str_routePing:
          serverResponse.setHeader(
            obj_store.obj_headerNameHttp.str_headerContentType,
            obj_store.obj_headerValueHttp.str_headerValueText
          );
          serverResponse.statusCode = obj_store.obj_statusHttp.num_statusOk;
          serverResponse.end(obj_store.obj_messageShort.str_pong);
        break;

        case obj_store.obj_route.str_routeInfoApp:
          if (bol_authorized) {
            serverResponse.setHeader(
              obj_store.obj_headerNameHttp.str_headerContentType,
              obj_store.obj_headerValueHttp.str_headerValueText
            );
            serverResponse.statusCode = obj_store.obj_statusHttp.num_statusOk;
            const str_infoApp = `${config.name} ${config.version} ${config.description}`;
            serverResponse.end(str_infoApp);
          } else {
            serverResponse.setHeader(
              obj_store.obj_headerNameHttp.str_headerContentType,
              obj_store.obj_headerValueHttp.str_headerValueText
            );
            serverResponse.statusCode = obj_store.obj_statusHttp.num_statusUnauthorized;
            serverResponse.end(obj_store.obj_messageShort.str_unauthorized);
          }
        break;
      
        default:
          serverResponse.setHeader(
            obj_store.obj_headerNameHttp.str_headerContentType,
            obj_store.obj_headerValueHttp.str_headerValueText
          );
          serverResponse.statusCode = obj_store.obj_statusHttp.num_statusNotFound;
          serverResponse.end(obj_store.obj_messageShort.str_notFound);
        break;
      }
    break;

    case obj_store.obj_methodHttp.str_methodPost:
      serverResponse.setHeader(
        obj_store.obj_headerNameHttp.str_headerContentType,
        obj_store.obj_headerValueHttp.str_headerValueText
      );
      serverResponse.statusCode = obj_store.obj_statusHttp.num_statusNotFound;
      serverResponse.end(obj_store.obj_messageShort.str_notFound);
    break;

    default:
      serverResponse.setHeader(
        obj_store.obj_headerNameHttp.str_headerContentType,
        obj_store.obj_headerValueHttp.str_headerValueText
      );
      serverResponse.statusCode = obj_store.obj_statusHttp.num_methodNotAllowed;
      serverResponse.end(obj_store.obj_messageShort.str_methodNotAllowed);
    break;
  }
})

server.listen(
  obj_store.obj_port.num_portServer,
  obj_store.obj_host.str_hostServer,
  fun_listeningListener,
);