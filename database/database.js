const { Client } = require(`pg`);

module.exports = async (
  sql,
  parameters,
) => {
  try {
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

    return any_res;
  } catch (error) {
    const str_error = error?.message || error?.toString() || ``;
    console.error(str_error);
    return null;
  }
}