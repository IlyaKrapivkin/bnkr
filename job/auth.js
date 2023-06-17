const {
  obj_error,
  obj_sign,
  obj_typeof,
} = require(`../store.js`);
const fun_query = require(`../external/database/database.js`);
const str_sqlAgentByAuth = require(`../external/database/sql/agentByAuth.js`);

module.exports = async (
  session,
  allowError,
) => {
  try {
    const str_session = (
      (
        session &&
        typeof session === obj_typeof.str_typeStr &&
        session.length
      ) ?
      session.toLowerCase().trim() :
      obj_sign.str_empty
    );

    if (str_session) {
      const arr_resDb = await fun_query(
        false,
        str_sqlAgentByAuth,
        [str_session],
      );

      const any_agent = arr_resDb[0];
      console.log(any_agent);

      if (any_agent && any_agent.id) {
        const obj_agent = {
          id: any_agent.id,
          session_id: any_agent.ath_id,
          login: any_agent.login,
          crypt: any_agent.crypt,
          alias: any_agent.alias,
          email: any_agent.email || null,
          phone: any_agent.phone || null,
        };
        return obj_agent;
      }
    } else {
      return {};
    }
    
    throw obj_error.str_authCode;
  } catch (error) {
    const str_error = (
      error?.message ||
      error?.toString() ||
      obj_sign.str_empty
    );

    const str_errorDetailed = `${ obj_error.str_catchJob } [${ str_error }]`;
    console.log(str_errorDetailed);
    
    if (allowError) {
      throw str_errorDetailed;
    } else {
      return {};
    }
  }
}