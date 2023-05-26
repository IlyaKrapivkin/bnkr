const { obj_error } = require(`../store.js`);
const fun_query = require(`../database/database.js`);
const str_sqlAgentBySession = require(`../database/request/agentBySession.js`);

module.exports = async (
  session,
  allowError,
) => {
  try {
    const str_session = (
      (
        session &&
        typeof session === `string` &&
        session.length
      ) ?
      session.toLowerCase().trim() :
      ``
    );

    if (str_session) {
      const arr_resDb = await fun_query(
        str_sqlAgentBySession,
        [str_session],
        false,
      );
      
      const any_agent = arr_resDb[0];
      console.log(any_agent);

      if (any_agent && any_agent.id) {
        const obj_agent = {
          id: any_agent.id,
          session_id: any_agent.ssn_id,
          login: any_agent.login,
          password: any_agent.password,
          alias: any_agent.alias,
          email: any_agent.email || null,
          phone: any_agent.phone || null,
        };
        return obj_agent;
      }
    }
    
    if (allowError) {
      throw obj_error.str_sessionIncorrect;
    } else {
      return {};
    }
  } catch (error) {
    const str_error = error?.message || error?.toString() || ``;
    if (allowError) {
      throw `Catched from job: [${str_error}]`;
    } else {
      return {};
    }
  }
}