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
  },
  obj_icon: {
    str_iconError: `❌`,
    str_iconRequest: `🚗`,
    str_iconServer: `🚀`,
    str_iconDb: `📚`,
  },
  obj_messageShort: {
    str_pong: `PONG`,
    str_notFound: `NOT FOUND`,
    str_unauthorized: `UNAUTHORIZED`,
    str_methodNotAllowed: `METHOD NOT ALLOWED`,
  },
  obj_messageLong: {
    str_servStart: `server started`,
    str_dbConnect: `database connected`,
  },
};

exports.obj_store = obj_store;