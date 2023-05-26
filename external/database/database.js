const { Client } = require(`pg`);

module.exports = async (
  sql,
  parameters,
  allowError,
) => {
  try {
    if (
      !sql ||
      typeof sql !== `string`
    ) {
      throw `Incorrect input: argument sql[${sql}]`;
    }

    if (
      !parameters ||
      typeof parameters !== `object` ||
      isNaN(parameters.length)
    ) {
      throw `Incorrect input: argument parameters[${parameters}]`;
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
      console.warn(`query duration: [${num_duration}]`);
    }

    await obj_clientPg.end();

    const arr_resRows = any_res?.rows;

    if (
      !arr_resRows ||
      typeof arr_resRows !== `object` ||
      isNaN(arr_resRows.length)
    ) {
      if (allowError) {
        throw `Incorrect database answer`;
      } else {
        return [];
      }
    } else {
      return arr_resRows;
    }
  } catch (error) {
    const str_error = error?.message || error?.toString() || ``;

    if (allowError) {
      throw `Catched from database: [${str_error}]`;
    } else {
      return [];
    }
  }
}