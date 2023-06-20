const { Client } = require(`pg`);
const {
  obj_error,
  obj_sign,
  obj_typeof,
  obj_measure,
  obj_messageLong,
} = require(`../../../store.js`);

module.exports = async (
  allowError,
  sql,
  parameters,
) => {
  try {
    if (
      !sql ||
      typeof sql !== obj_typeof.str_typeStr
    ) {
      throw `${ obj_error.str_inputArgument } sql[${ sql }]`;
    }

    if (
      !parameters ||
      typeof parameters !== obj_typeof.str_typeObj ||
      isNaN(parameters.length)
    ) {
      throw `${ obj_error.str_inputArgument } parameters[${ parameters }]`;
    }

    const obj_clientPg = new Client(
      {
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: +process.env.PGPORT,
      }
    );
  
    await obj_clientPg.connect();

    const num_start = Date.now();

    const any_res = await obj_clientPg.query(sql, parameters);

    const num_duration = Date.now() - num_start;
    if (num_duration > 10) {
      console.warn(`${ obj_messageLong.str_queryDuration } [${ num_duration }]${ obj_measure.str_msrMs }`);
    }

    await obj_clientPg.end();

    const arr_resRows = any_res?.rows;

    if (
      !arr_resRows ||
      typeof arr_resRows !== obj_typeof.str_typeObj ||
      isNaN(arr_resRows.length)
    ) {
      throw obj_error.str_dbAnswer;
    } else {
      return arr_resRows;
    }
  } catch (error) {
    const str_error = (
      error?.message ||
      error?.toString() ||
      obj_sign.str_empty
    );
    
    if (allowError) {
      throw `${ obj_error.str_catchExternal } [${ str_error }]`;
    } else {
      return [];
    }
  }
}