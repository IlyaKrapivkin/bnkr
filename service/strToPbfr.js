const {
  obj_error,
  obj_sign,
  obj_typeof,
  obj_encoding,
} = require(`../store.js`);

module.exports = (
  str,
  allowError,
) => {
  try {

    if (typeof str === obj_typeof.str_typeStr) {
      const str_pbfr = Buffer.from(str).toString(obj_encoding.str_utf);

      console.log(`===`)
      console.log(str_pbfr)
      
      return str_pbfr;
    }

    throw obj_error.str_strToPbfr;
  } catch (error) {
    const str_error = (
      error?.message ||
      error?.toString() ||
      obj_sign.str_empty
    );
    
    if (allowError) {
      throw `${obj_error.str_catchService} [${str_error}]`;
    } else {
      return obj_sign.str_empty;
    }
  }
}