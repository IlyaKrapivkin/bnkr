const { obj_error } = require(`../store.js`);
const fun_strToEmail = require(`../service/strToEmail.js`);
const fun_strToPhone = require(`../service/strToPhone.js`);
const fun_isPassword = require(`../service/isPassword.js`);
const fun_query = require(`../external/database/database.js`);
const str_sqlAgentByLogin = require(`../external/database/request/agentByLogin.js`);

module.exports = async (
  login,
  password,
  alias,
  allowError,
) => {
  try {
    if (!alias) {
      throw obj_error.alias;
    }

    const str_loginInitial = (
      (
        login &&
        typeof login === `string` &&
        login.length
      ) ?
      login.toLowerCase().trim() :
      ``
    );

    const str_emailByLogin = fun_strToEmail(str_loginInitial, false);
    const str_phoneByLogin = fun_strToPhone(str_loginInitial, false);

    if (
      !str_loginInitial ||
      !str_emailByLogin && !str_phoneByLogin ||
      str_emailByLogin && str_phoneByLogin
    ) {
      throw obj_error.login;
    }

    const str_loginChecked = (str_emailByLogin || str_phoneByLogin);


    if (!fun_isPassword(password)) {
      throw obj_error.str_inputPassword;
    }


    const arr_resDb = await fun_query(
      str_sqlAgentByLogin,
      [str_loginChecked],
      false,
    );

    const any_agentSame = arr_resDb[0];

    if (any_agentSame && any_agentSame.id) {
      throw obj_error.str_agentSame;
    }
    
    //TODO
    throw `ANY`;
  } catch (error) {
    const str_error = error?.message || error?.toString() || ``;
    if (allowError) {
      throw `Catched from job: [${str_error}]`;
    } else {
      return {};
    }
  }
}