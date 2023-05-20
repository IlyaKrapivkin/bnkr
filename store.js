const obj_store = {
  obj_host: {
    str_hostServer: `127.0.0.1`,
    str_hostServerAlias: `localhost`,
  },
  obj_port: {
    num_portServer: 3001,
  },
  obj_methodHttp: {
    str_methodGet: `GET`,
    str_methodPost: `POST`,
  },
  obj_statusHttp: {
    num_statusOk: 200,
    num_statusUnauthorized: 401,
    num_statusWrongAuthorized: 403,
    num_statusNotFound: 404,
    num_methodNotAllowed: 405,
  },
  obj_headerNameHttp: {
    str_headerContentType: `Content-Type`,
    str_headerAuthorization: `Authorization`,
  },
  obj_headerValueHttp: {
    str_headerValueText: `text/plain`,
  },
  obj_route: {
    str_routePing: `/ping`,
    str_routeInfoApp: `/infoApp`,
    str_routeRegAgent: `/registerAgent`,
  },
  obj_icon: {
    str_iconError: `❌`,
    str_iconRequest: `🚗`,
    str_iconServer: `🚀`,
    str_iconDb: `📚`,
  },
  obj_sign: {
    str_space: ` `,
    str_newline: `\n`,
    str_bslash: `\\`,
    str_slash: `/`,
  },
  obj_messageShort: {
    str_pong: `PONG`,
    str_notFound: `NOT FOUND`,
    str_unauthorized: `UNAUTHORIZED`,
    str_needNoAuth: `NOT ALLOWED FOR AUTHORIZED`,
    str_methodNotAllowed: `METHOD NOT ALLOWED`,
  },
  obj_messageLong: {
    str_servStart: `server started`,
    str_dbConnect: `database connected`,
    str_dbNoConnect: `cannot connect to database`,
  },
  obj_error: {
    str_sessionIncorrect: `session code is incorrect`,
  },
};

exports.obj_host = obj_store.obj_host;
exports.obj_port = obj_store.obj_port;
exports.obj_methodHttp = obj_store.obj_methodHttp;
exports.obj_statusHttp = obj_store.obj_statusHttp;
exports.obj_headerNameHttp = obj_store.obj_headerNameHttp;
exports.obj_headerValueHttp = obj_store.obj_headerValueHttp;
exports.obj_route = obj_store.obj_route;
exports.obj_icon = obj_store.obj_icon;
exports.obj_sign = obj_store.obj_sign;
exports.obj_messageShort = obj_store.obj_messageShort;
exports.obj_messageLong = obj_store.obj_messageLong;
exports.obj_error = obj_store.obj_error;