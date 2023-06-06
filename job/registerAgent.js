const { obj_error } = require(`../store.js`);
const fun_strToEmail = require(`../service/strToEmail.js`);
const fun_strToPhone = require(`../service/strToPhone.js`);
const fun_strToSbfr = require(`../service/strToSbfr.js`);
const fun_isPassword = require(`../service/isPassword.js`);
const fun_query = require(`../external/database/database.js`);
const str_sqlAgentByLogin = require(`../external/database/request/agentByLogin.js`);
const str_sqlInsertAgent = require(`../external/database/request/insertAgent.js`);

module.exports = async (
  login,
  password,
  alias,
  allowError,
) => {
  try {
    const str_aliasChecked = (
      (alias && typeof alias === `string`) ?
      alias.trim().toLowerCase() :
      ``
    )
    if (!str_aliasChecked) {
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
      !str_emailByLogin && !str_phoneByLogin
    ) {
      throw obj_error.login;
    }

    const str_loginChecked = (str_emailByLogin || str_phoneByLogin);


    if (!fun_isPassword(password)) {
      throw obj_error.str_inputPassword;
    }

    const str_passCrypted = fun_strToSbfr(password);


    const arr_resDbAgentSame = await fun_query(
      str_sqlAgentByLogin,
      [str_loginChecked],
      false,
    );

    const any_agentSame = arr_resDbAgentSame[0];

    if (any_agentSame && any_agentSame.id) {
      throw obj_error.str_agentSame;
    }

    //TODO code sending

    const arr_resDbAgentNew = await fun_query(
      str_sqlInsertAgent,
      [
        str_aliasChecked,
        str_loginChecked,
        str_passCrypted,
        str_emailByLogin || null,
        str_phoneByLogin || null,
      ],
      true,
    );
    const num_agentId = arr_resDbAgentNew[0].id;
    if (num_agentId) {
      return num_agentId;
    }

    throw `ANY`;//TODO
  } catch (error) {
    const str_error = error?.message || error?.toString() || ``;
    if (allowError) {
      throw `Catched from job: [${str_error}]`;
    } else {
      return 0;
    }
  }
}