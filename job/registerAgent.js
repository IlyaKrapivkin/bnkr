const {
  obj_error,
  obj_sign,
  obj_typeof,
  obj_messageLong,
} = require(`../store.js`);
const str_sqlAgentByLogin = require(`../external/database/request/agentByLogin.js`);
const str_sqlInsertAgent = require(`../external/database/request/insertAgent.js`);
const fun_query = require(`../external/database/database.js`);
const fun_isPassword = require(`../service/isPassword.js`);
const fun_strToEmail = require(`../service/strToEmail.js`);
const fun_strToPhone = require(`../service/strToPhone.js`);
const fun_rndmDigits = require(`../service/rndmDigits.js`);
const fun_strToPbfr = require(`../service/strToPbfr.js`);

module.exports = async (
  code,
  login,
  password,
  alias,
  allowError,
) => {
  try {
    const str_aliasChecked = (
      (alias && typeof alias === obj_typeof.str_typeStr) ?
      alias.trim().toLowerCase() :
      obj_sign.str_empty
    )
    if (!str_aliasChecked) {
      throw obj_error.alias;
    }

    const str_loginInitial = (
      (
        login &&
        typeof login === obj_typeof.str_typeStr &&
        login.length
      ) ?
      login.toLowerCase().trim() :
      obj_sign.str_empty
    );

    const str_emailByLogin = fun_strToEmail(str_loginInitial, false);
    const str_phoneByLogin = fun_strToPhone(str_loginInitial, false);

    if (!str_loginInitial) {
      throw obj_error.str_inputNoLogin;
    }

    if (!str_emailByLogin && !str_phoneByLogin) {
      throw obj_error.str_inputLogin;
    }

    const str_loginChecked = (str_emailByLogin || str_phoneByLogin);


    if (!fun_isPassword(password)) {
      throw obj_error.str_inputPassword;
    }

    const str_passCrypted = fun_strToPbfr(password, true);

    const arr_resDbAgentSame = await fun_query(
      str_sqlAgentByLogin,
      [str_loginChecked],
      false,
    );

    const any_agentSame = arr_resDbAgentSame[0];

    if (any_agentSame && any_agentSame.id) {
      throw obj_error.str_agentSame;
    }

    // check code received by agent
    if (code) {
      throw `NOT DONE`
    } else {
      const arr_resDbAgentNew = await fun_query(
        str_sqlInsertAgent,
        [
          false,
          str_aliasChecked,
          str_loginChecked,
          str_passCrypted,
          str_emailByLogin || null,
          str_phoneByLogin || null,
        ],
        true,
      );
  
      const num_agentId = arr_resDbAgentNew[0].id;
  
      if (!num_agentId) {
        throw obj_error.str_insert;
      }
  
      //code sending
      const num_codeAuth = fun_rndmDigits(6, false);
      console.log(`${ obj_messageLong.str_randomCode } [${ num_codeAuth }]`);
    }

    throw `ANY`;//TODO
  } catch (error) {
    const str_error = (
      error?.message ||
      error?.toString() ||
      obj_sign.str_empty
    );
    
    if (allowError) {
      throw `${ obj_error.str_catchJob } [${ str_error }]`;
    } else {
      return obj_sign.num_zero;
    }
  }
}