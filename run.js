const http = require(`http`);
const fs = require(`fs`);

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

const fun_bfrToObj = require(`./service/bfrToObj.js`);
const fun_query = require(`./database/database.js`);

const fun_startListener = async () => {
  // message about starting server
  const str_messageStartExtended = ``.concat(
    obj_icon.str_iconServer,
    obj_sign.str_space,
    obj_messageLong.str_servStart,
    obj_sign.str_space,
    `[${obj_host.str_hostServer}:${obj_port.num_portServer}]`,
  );
  console.log(str_messageStartExtended);
  // adding hide parameters to global config
  const str_pathEnvFile = ``.concat(
    __dirname,
    obj_sign.str_slash,
    `.env`,
  );
  const bfr_envCustom = fs.readFileSync(str_pathEnvFile);
  const obj_envCustom = fun_bfrToObj(bfr_envCustom, false);
  Object.keys(obj_envCustom).map(key => {
    if (
      !process.env[key] ||
      process.env[key] !== obj_envCustom[key]
    ) {
      process.env[key] = obj_envCustom[key];
    }
  });
  // connection to database
  const any_resDb = await fun_query(
    `SELECT version();`,
    [],
  );
  const str_versionDb = any_resDb?.rows?.[0]?.version;
  if (
    str_versionDb &&
    typeof str_versionDb === `string` &&
    str_versionDb.length
  ) {
    const str_versionDbShort = `${str_versionDb.slice(0, 16)}...`;
    const str_messageDbConnectedExtended = ``.concat(
      obj_icon.str_iconDb,
      obj_sign.str_space,
      obj_messageLong.str_dbConnect,
      obj_sign.str_space,
      `[${process.env.PGDATABASE}]`,
      obj_sign.str_space,
      `[${process.env.PGHOST}:${process.env.PGPORT}]`,
      obj_sign.str_space,
      `[${str_versionDbShort}]`,
    );
    console.log(str_messageDbConnectedExtended);
  } else {
    const str_errorLocal = ``.concat(
      obj_icon.str_iconError,
      obj_sign.str_space,
      obj_messageLong.str_dbNoConnect,
    )
    console.error(str_errorLocal);
  }
  // server was successfully started
  console.log(obj_sign.str_newline);
}

const server = http.createServer((incomingMessage, serverResponse) => {
  // message about catching request
  const str_logRequestStart = ``.concat(
    obj_icon.str_iconRequest,
    obj_sign.str_space,
    `[${incomingMessage.method}]`,
    obj_sign.str_space,
    `[${incomingMessage.url}]`,
  );
  console.log(str_logRequestStart);
  // check of request authorization
  const str_headerName = obj_headerNameHttp.str_headerAuthorization.toLowerCase();
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
  // handling request by method and route
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
});

server.listen(
  obj_port.num_portServer,
  obj_host.str_hostServer,
  fun_startListener,
);