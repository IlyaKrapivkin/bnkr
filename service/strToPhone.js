const {
  obj_error,
  obj_sign,
  obj_typeof,
  obj_regexp,
} = require(`../store.js`);

module.exports = (
  str,
  allowError,
) => {
  try {
    if (
      str &&
      typeof str === obj_typeof.str_typeStr
    ) {
      const str_trimmed = str.trim().toLowerCase();
      if (obj_regexp.reg_phoneMobRus.test(str_trimmed)) {
        return str_trimmed.replace(obj_regexp.req_notNumbers, obj_sign.str_empty).slice(-10);
      }
    }

    throw obj_error.str_strToPhoneMobRus;
  } catch (error) {
    const str_error = (
      error?.message ||
      error?.toString() ||
      obj_sign.str_empty
    );
    
    if (allowError) {
      throw `${ obj_error.str_catchService } [${ str_error }]`;
    } else {
      return obj_sign.str_empty;
    }
  }
}