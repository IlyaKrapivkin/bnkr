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
    num_statusMethodNotAllowed: 405,
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
  obj_timeoutMs: {
    num_verifyCodeLife: 120000,
  },
  obj_encoding: {
    str_utf: `utf8`,
    str_pbfr: `base64`,
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
    str_iconRequest: `🏳️`,
    str_iconResponse: `🏴`,
    str_iconServer: `🚩`,
    str_iconDb: `💿`,
  },
  obj_sign: {
    str_space: ` `,
    str_newline: `\n`,
    str_bslash: `\\`,
    str_slash: `/`,
    str_empty: ``,
    str_dot: `.`,
    str_mdot: `...`,
    str_squot: `'`,
    str_dquot: `"`,
    num_zero: 0,
  },
  obj_extension: {
    str_extEnv: `env`,
    str_extTxt: `txt`,
  },
  obj_measure: {
    str_msrMs: `ms`,
    str_msrItm: `itm`,
  },
  obj_reqEvent: {
    str_eventData: `data`,
    str_eventEnd: `end`,
  },
  obj_messageShort: {
    str_ok: `OK`,
    str_notOK: `NOT OK`,
    str_pong: `PONG`,
    str_notFound: `NOT FOUND`,
    str_unauthorized: `UNAUTHORIZED`,
    str_needNoAuth: `NOT ALLOWED FOR AUTHORIZED`,
    str_methodNotAllowed: `METHOD NOT ALLOWED`,
    str_codeSentTo: `CODE SENT TO`,
    str_codePrevAlive: `PREVIOUS CODE IS STILL ALIVE`,
    str_agentRegistered: `AGENT REGISTERED`,
    str_agentNotFound: `AGENT NOT FOUND`,
  },
  obj_messageLong: {
    str_servStart: `server started`,
    str_dbConnect: `database connected`,
    str_dbNoConnect: `cannot connect to database`,
    str_queryDuration: `query duration`,
    str_randomCode: `random code generated`,
    str_newCode: `new random code will be generated`,
  },
  obj_error: {
    str_unknown: `unknown server error`,
    str_agentSame: `same agent already exists`,
    str_catchService: `catched from service`,
    str_catchJob: `catched from job`,
    str_catchExternal: `catched from external`,
    str_agentNotFound: `agent not found`,
    str_catchDb: `catched from database`,
    str_inputArgument: `incorrect argument in input`,
    str_inputAlias: `incorrect alias in input`,
    str_inputNoLogin: `no login in input`,
    str_inputLogin: `incorrect login in input`,
    str_inputPassword: `incorrect password in input`,
    str_password: `incorrect password`,
    str_authCode: `incorrect auth code`,
    str_code: `incorrect verification code`,
    str_dbAnswer: `incorrect database answer`,
    str_dbLogyc: `incorrect logyc in DB rows`,
    str_reqbody: `cannot parse request body`,
    str_codeExpired: `verify code expried`,
    str_insert: `cannot insert new row into DB`,
    str_bfrToObj: `cannot convert bufffer to object`,
    str_strToEmail: `cannot convert string to email`,
    str_strToPhoneMobRus: `cannot convert string to phoneMobRus`,
    str_strToPbfr: `cannot convert string to prebuffer`,
    str_intPositive: `number must be positive integer`,
    str_notAllowedBySecret: `operation not allowed`,
  },
  obj_regexp: {
    reg_newlineMatch: /\r\n|\n|\r/,
    reg_keyVal: /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/,
    reg_newlineMany: /\\n/g,
    reg_passLatin: /^[a-zA-Z0-9\-\][<>(){}!?.,:;+=~_"^*@#$%|]{6,}$/i,
    reg_passLatinCyril: /^[a-zA-Zа-яА-Я0-9\-\][<>(){}!?.,:;+=~_"^*@#$%|]{6,}$/i,
    reg_email: /(^[\w+\-*&]+)((\.[\w+\-*&]+)*)(@\w+)(([.-]?\w+)*)((\.\w{2,32})+$)/,
    reg_phoneMobRus: /^(\+7|7|8)?[\s-]?\(?[9][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/,
    req_notNumbers: /[^\d]/g,
  }
};

exports.obj_host = obj_store.obj_host;
exports.obj_port = obj_store.obj_port;
exports.obj_methodHttp = obj_store.obj_methodHttp;
exports.obj_statusHttp = obj_store.obj_statusHttp;
exports.obj_headerNameHttp = obj_store.obj_headerNameHttp;
exports.obj_headerValueHttp = obj_store.obj_headerValueHttp;
exports.obj_route = obj_store.obj_route;
exports.obj_timeoutMs = obj_store.obj_timeoutMs;
exports.obj_encoding = obj_store.obj_encoding;
exports.obj_typeof = obj_store.obj_typeof;
exports.obj_icon = obj_store.obj_icon;
exports.obj_sign = obj_store.obj_sign;
exports.obj_extension = obj_store.obj_extension;
exports.obj_measure = obj_store.obj_measure;
exports.obj_reqEvent = obj_store.obj_reqEvent;
exports.obj_messageShort = obj_store.obj_messageShort;
exports.obj_messageLong = obj_store.obj_messageLong;
exports.obj_error = obj_store.obj_error;
exports.obj_regexp = obj_store.obj_regexp;