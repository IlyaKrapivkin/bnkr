module.exports = (
  str,
  allowError,
) => {
  try {

    if (typeof str === `string`) {
      const str_sbfr = Buffer.from(str).toString(`utf8`);
      console.log(`===`)
      console.log(str_sbfr)
      return str_sbfr;
    }

    throw `cannot convert str -> phoneMobRus str`;
  } catch (error) {
    const str_error = error?.message || error?.toString() || ``;
    
    if (allowError) {
      throw `Catched from service: [${str_error}]`;
    } else {
      return ``;
    }
  }
}