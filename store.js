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
    num_serverError: 500,
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
  obj_encoding: {
    str_utf: `utf8`,
    str_base: `base64`,
  },
  obj_typeof: {
    str_typeBol: `boolean`,
    str_typeNum: `number`,
    str_typeBgn: `bigint`,
    str_typeStr: `string`,
    str_typeSmb: `symbol`,
    str_typeNdf: `undefined`,
    str_typeFun: `function`,
    str_typeObj: `object`,
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
    str_empty: ``,
    str_squot: `'`,
    str_dquot: `"`,
  },
  obj_messageShort: {
    str_ok: `OK`,
    str_notOK: `NOT OK`,
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
    str_catchService: `catched from service`,
    str_session: `session code is incorrect`,
    str_inputAlias: `incorrect alias in input`,
    str_inputLogin: `incorrect login in input`,
    str_inputPassword: `incorrect password in input`,
    str_agentSame: `same agent already exists`,
    str_insert: `cannot insert new row into DB`,
    str_bfrToObj: `cannot convert bufffer to object`,
    str_password: `incorrect password`,
  },
  obj_regexp: {
    reg_newlineMatch: /\r\n|\n|\r/,
    reg_keyVal: /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/,
    reg_newlineMany: /\\n/g,
    reg_passLatin: /^[a-zA-Z0-9\-\][<>(){}!?.,:;+=~_"^*@#$%|]{6,}$/i,
    reg_passLatinCyril: /^[a-zA-Zа-яА-Я0-9\-\][<>(){}!?.,:;+=~_"^*@#$%|]{6,}$/i,
  }
};

exports.obj_host = obj_store.obj_host;
exports.obj_port = obj_store.obj_port;
exports.obj_methodHttp = obj_store.obj_methodHttp;
exports.obj_statusHttp = obj_store.obj_statusHttp;
exports.obj_headerNameHttp = obj_store.obj_headerNameHttp;
exports.obj_headerValueHttp = obj_store.obj_headerValueHttp;
exports.obj_route = obj_store.obj_route;
exports.obj_encoding = obj_store.obj_encoding;
exports.obj_typeof = obj_store.obj_typeof;
exports.obj_icon = obj_store.obj_icon;
exports.obj_sign = obj_store.obj_sign;
exports.obj_messageShort = obj_store.obj_messageShort;
exports.obj_messageLong = obj_store.obj_messageLong;
exports.obj_error = obj_store.obj_error;
exports.obj_regexp = obj_store.obj_regexp;