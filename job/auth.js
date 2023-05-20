const { obj_error } = require(`../store.js`);
const fun_query = require(`../database/database.js`);

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
    )
    if (str_session) {
      const any_resDb = await fun_query(
        `
          SELECT
            agn.id,
            ssn.id AS ssn_id,
            agn.login,
            agn.password,
            agn.alias,
            agn.email,
            agn.phone
          FROM
            session ssn
          INNER JOIN agent agn ON (
            agn.id = ssn.agent_id
            AND agn.alive = TRUE
          )
          WHERE ssn.code = $1
          AND ssn.alive = TRUE;
        `,
        [str_session],
      );
      const any_agent = any_resDb?.rows?.[0];
      console.log(any_agent);
      if (any_agent && any_agent.id) {
        const obj_agent = {
          id: any_agent.id,
          ssn_id: any_agent.ssn_id,
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
      throw obj_error.str_error;
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