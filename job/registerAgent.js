const {
  obj_error,
  obj_sign,
  obj_typeof,
  obj_messageLong,
  obj_messageShort,
} = require(`../store.js`);
const str_sqlAgentByLogin = require(`../external/database/sql/agentByLogin.js`);
const str_sqlInsertAgent = require(`../external/database/sql/insertAgent.js`);
const str_sqlInsertVerify = require(`../external/database/sql/insertVerify.js`);
const str_sqlVerifyByLogin = require(`../external/database/sql/verifyByLogin.js`);
const str_sqlUpdateVerify = require(`../external/database/sql/updateVerify.js`);
const str_sqlUpdateAgentAlive = require(`../external/database/sql/updateAgentAlive.js`);
const fun_query = require(`../external/database/database.js`);
const fun_isPassword = require(`../service/isPassword.js`);
const fun_strToEmail = require(`../service/strToEmail.js`);
const fun_strToPhone = require(`../service/strToPhone.js`);
const fun_rndmDigits = require(`../service/rndmDigits.js`);
const fun_strToPbfr = require(`../service/strToPbfr.js`);

module.exports = async (
  secret,
  code,
  login,
  password,
  alias,
  allowError,
) => {
  try {
    if (
      !secret ||
      typeof secret !== obj_typeof.str_typeStr ||
      secret !== process.env.REGAGENTSECRET
    ) {
      throw obj_error.str_notAllowedBySecret;
    }

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
      false,
      [str_loginChecked],
    );

    const num_agentSameId = arr_resDbAgentSame[0]?.id;

    // check code from request body
    if (code) {
      const arr_resDbAuthOld = await fun_query(
        str_sqlVerifyByLogin,
        true,
        [
          str_loginChecked,
        ],
      );
      const str_authCodeOld = arr_resDbAuthOld[0].code;
      const num_authIdOld = arr_resDbAuthOld[0].id;

      if (str_authCodeOld && str_authCodeOld === code.trim()) {
        await fun_query(
          str_sqlUpdateVerify,
          true,
          [
            num_authIdOld,
            false,
          ]
        );

        if (num_agentSameId) {
          await fun_query(
            str_sqlUpdateAgentAlive,
            true,
            [
              num_agentSameId,
            ]
          );

          return {
            message: `${obj_messageShort.str_agentRegistered} ${str_loginChecked}`,
            error: ``,
          };
        } else {
          throw obj_error.str_agentNotFound;
        }
      } else {
        await fun_query(
          str_sqlUpdateVerify,
          true,
          [
            num_authIdOld,
            true,
          ]
        );

        throw obj_error.str_code;

      }
    } else {
      if (num_agentSameId) {
        throw obj_error.str_agentSame;
      }

      const arr_resDbAgentNew = await fun_query(
        str_sqlInsertAgent,
        true,
        [
          false,
          str_aliasChecked,
          str_loginChecked,
          str_passCrypted,
          str_emailByLogin || null,
          str_phoneByLogin || null,
        ],
      );
      const num_agentId = arr_resDbAgentNew[0].id;
      if (!num_agentId) {
        throw obj_error.str_insert;
      }
  
      // code sending
      const num_codeAuth = fun_rndmDigits(6, false);
      console.log(`${ obj_messageLong.str_randomCode } [${ num_codeAuth }]`);
      await fun_query(
        str_sqlInsertVerify,
        true,
        [
          str_loginChecked,
          num_codeAuth,
        ],
      );

      return {
        message: `${obj_messageShort.str_codeSentTo} ${str_loginChecked}`,
        error: ``,
      };
    }
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
      return {
        message: ``,
        error: str_errorDetailed,
      }
    }
  }
}