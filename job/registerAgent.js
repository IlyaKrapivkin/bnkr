const {
  obj_error,
  obj_sign,
  obj_typeof,
  obj_measure,
  obj_timeoutMs,
  obj_messageLong,
  obj_messageShort,
} = require(`../store.js`);
const str_sqlInsertHistoryAgentKilled = require(`../external/database/sql/insertHistoryAgentKilled.js`);
const str_sqlInsertHistoryAgent = require(`../external/database/sql/insertHistoryAgent.js`);
const str_sqlUpdateAgentAlive = require(`../external/database/sql/updateAgentAlive.js`);
const str_sqlUpdateAgentKill = require(`../external/database/sql/updateAgentKill.js`);
const str_sqlVerifyByLogin = require(`../external/database/sql/verifyByLogin.js`);
const str_sqlAgentByLogin = require(`../external/database/sql/agentByLogin.js`);
const str_sqlInsertVerify = require(`../external/database/sql/insertVerify.js`);
const str_sqlUpdateVerify = require(`../external/database/sql/updateVerify.js`);
const str_sqlInsertAgent = require(`../external/database/sql/insertAgent.js`);
const str_sqlUpdateAgent = require(`../external/database/sql/updateAgent.js`);
const fun_query = require(`../external/database/database.js`);
const fun_isPassword = require(`../service/isPassword.js`);
const fun_strToEmail = require(`../service/strToEmail.js`);
const fun_strToPhone = require(`../service/strToPhone.js`);
const fun_rndmDigits = require(`../service/rndmDigits.js`);
const fun_strToPbfr = require(`../service/strToPbfr.js`);

module.exports = async (
  allowError,
  secret,
  code,
  login,
  password,
  alias,
) => {
  try {
    // check input
    if (
      !secret ||
      typeof secret !== obj_typeof.str_typeStr ||
      secret !== process.env.REGAGENTSECRET
    ) {
      throw obj_error.str_notAllowedBySecret;
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

    if (!str_loginInitial) {
      throw obj_error.str_inputNoLogin;
    }

    const str_emailByLogin = fun_strToEmail(str_loginInitial, false);
    const str_phoneByLogin = fun_strToPhone(str_loginInitial, false);

    if (!str_emailByLogin && !str_phoneByLogin) {
      throw obj_error.str_inputLogin;
    }

    const str_loginChecked = (str_emailByLogin || str_phoneByLogin);

    // get all agents with same login
    const arr_resDbAgentSame = await fun_query(
      false,
      str_sqlAgentByLogin,
      [str_loginChecked],
    );

    const arr_agentSameAliveIds = arr_resDbAgentSame.filter(
      obj => obj.alive === true
    ).map(
      obj => obj.id
    );
    const arr_agentSameDead = arr_resDbAgentSame.filter(
      obj => !arr_agentSameAliveIds.includes(obj.id)
    );

    if (arr_agentSameAliveIds.length) {
      if (arr_agentSameAliveIds.length > 1) {
        const arr_agentAliveUnwantedIds = arr_agentSameAliveIds.filter(
          (val,ind) => ind < (arr_agentSameAliveIds.length - 1)
        );

        console.log(`${ obj_error.str_dbLogyc } [${ arr_agentAliveUnwantedIds.length }]${ obj_measure.str_msrItm }`);

        await fun_query(
          true,
          str_sqlUpdateAgentKill,
          [
            arr_agentAliveUnwantedIds,
          ],
        );

        await fun_query(
          true,
          str_sqlInsertHistoryAgentKilled,
          [
            arr_agentAliveUnwantedIds,
          ]
        );
      }
      throw obj_error.str_agentSame;
    }

    const obj_agentSameDead = arr_agentSameDead[0];
    const num_agentSameDeadId = obj_agentSameDead?.id;

    // get last code from DB
    const arr_resDbVerifyOld = await fun_query(
      true,
      str_sqlVerifyByLogin,
      [
        str_loginChecked,
      ],
    );
    const obj_verifyLastOld = arr_resDbVerifyOld[0];

    const num_verifyIdOld = obj_verifyLastOld?.id;
    const str_verifyCodeOld = obj_verifyLastOld?.code;
    const dte_verifyMomentOld = obj_verifyLastOld?.moment;
    const bol_verifyAlive = (
      num_verifyIdOld &&
      str_verifyCodeOld &&
      dte_verifyMomentOld
    );
    const num_verifyDiffTime = (
      bol_verifyAlive ?
      (new Date().getTime() - dte_verifyMomentOld.getTime()) :
      0
    );
    const bol_verifyExpired = (num_verifyDiffTime > obj_timeoutMs.num_verifyCodeLife);
    const num_verifyLifeTimeLast = (
      bol_verifyExpired ?
      0 :
      obj_timeoutMs.num_verifyCodeLife - num_verifyDiffTime
    );

    // check code from input
    if (code) {
      if (
        bol_verifyAlive &&
        str_verifyCodeOld === code.trim()
      ) {

        await fun_query(
          true,
          str_sqlUpdateVerify,
          [
            false,
            num_verifyIdOld,
          ]
        );

        if (bol_verifyExpired) {
          console.log(`${ obj_error.str_codeExpired } [${ num_verifyDiffTime }]${ obj_measure.str_msrMs }`);
          console.log(`${ obj_messageLong.str_newCode }`);
        } else {
          if (num_agentSameDeadId) {
            await fun_query(
              true,
              str_sqlUpdateAgentAlive,
              [
                num_agentSameDeadId,
              ]
            );
  
            await fun_query(
              true,
              str_sqlInsertHistoryAgent,
              [
                num_agentSameDeadId,
                true,
                null,
                null,
                null,
                null,
                null,
              ],
            );
  
            return {
              message: `${ obj_messageShort.str_agentRegistered } ${ str_loginChecked }`,
              error: obj_sign.str_empty,
            };
          } else {
            throw obj_error.str_agentNotFound;
          }
        }
      } else {
        await fun_query(
          true,
          str_sqlUpdateVerify,
          [
            true,
            num_verifyIdOld,
          ]
        );

        throw obj_error.str_code;
      }
    } else {
      const str_aliasChecked = (
        (alias && typeof alias === obj_typeof.str_typeStr) ?
        alias.trim().toLowerCase() :
        obj_sign.str_empty
      )
      if (!str_aliasChecked) {
        throw obj_error.str_inputAlias;
      }
  
      if (!fun_isPassword(false, false, password)) {
        throw obj_error.str_inputPassword;
      }
      const str_passCrypted = fun_strToPbfr(password, true);
  
      if (obj_agentSameDead && num_agentSameDeadId) {
        const bol_cryptChanged = (obj_agentSameDead.crypt !== str_passCrypted);
        const bol_aliasChanged = (obj_agentSameDead.alias !== str_aliasChecked);
        const bol_emailChanged = (str_emailByLogin && obj_agentSameDead.email !== str_emailByLogin);
        const bol_phoneChanged = (str_phoneByLogin && obj_agentSameDead.phone !== str_phoneByLogin);
        if (
          bol_cryptChanged ||
          bol_aliasChanged ||
          bol_emailChanged ||
          bol_phoneChanged
        ) {
          await fun_query(
            true,
            str_sqlUpdateAgent,
            [
              (bol_cryptChanged ? str_passCrypted : null),
              (bol_aliasChanged ? str_aliasChecked : null),
              (bol_emailChanged && str_emailByLogin ? str_emailByLogin : null),
              (bol_phoneChanged && str_phoneByLogin ? str_phoneByLogin : null),
              num_agentSameDeadId,
            ],
          );
  
          await fun_query(
            true,
            str_sqlInsertHistoryAgent,
            [
              num_agentSameDeadId,
              null,
              null,
              (bol_cryptChanged ? str_passCrypted : null),
              (bol_aliasChanged ? str_aliasChecked : null),
              (bol_emailChanged && str_emailByLogin ? str_emailByLogin : null),
              (bol_phoneChanged && str_phoneByLogin ? str_phoneByLogin : null),
            ],
          );
        }
      } else {
        const arr_resDbAgentNew = await fun_query(
          true,
          str_sqlInsertAgent,
          [
            false,
            str_loginChecked,
            str_passCrypted,
            str_aliasChecked,
            str_emailByLogin || null,
            str_phoneByLogin || null,
          ],
        );
        const num_agentId = arr_resDbAgentNew[0].id;
        if (!num_agentId) {
          throw obj_error.str_insert;
        }
    
        await fun_query(
          true,
          str_sqlInsertHistoryAgent,
          [
            num_agentId,
            false,
            str_loginChecked,
            str_passCrypted,
            str_aliasChecked,
            str_emailByLogin || null,
            str_phoneByLogin || null,
          ],
        );
      }
    }

    // code generation and sending
    if (!bol_verifyAlive || bol_verifyExpired) {
      const num_codeVerifyNew = fun_rndmDigits(6, false);
      console.log(`${ obj_messageLong.str_randomCode } [${ num_codeVerifyNew }]`);
      await fun_query(
        true,
        str_sqlInsertVerify,
        [
          str_loginChecked,
          num_codeVerifyNew,
        ],
      );

      return {
        message: `${ obj_messageShort.str_codeSentTo } ${ str_loginChecked }`,
        error: obj_sign.str_empty,
      };
    } else {
      return {
        message: `${ obj_messageShort.str_codePrevAlive } [${ num_verifyLifeTimeLast }]${ obj_measure.str_msrMs }`,
        error: obj_sign.str_empty,
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
      throw str_error;
    } else {
      return {
        message: obj_sign.str_empty,
        error: str_error,
      }
    }
  }
}