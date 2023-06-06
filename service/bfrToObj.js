const {
  obj_error,
  obj_sign,
  obj_typeof,
  obj_regexp,
} = require(`../store.js`);

module.exports = (
  bfr,
  allowError,
) => {
  try {
    const obj_final = {};

    if (
      bfr &&
      typeof bfr === obj_typeof.str_typeObj
    ) {
      bfr.toString().split(obj_regexp.reg_newlineMatch).forEach((line) => {
        const arr_keyVal = line.match(obj_regexp.reg_keyVal);

        if (
          arr_keyVal &&
          typeof arr_keyVal === obj_typeof.str_typeObj &&
          arr_keyVal.length
        ) {
          const str_key = arr_keyVal[1];
          let str_val = (arr_keyVal[2] || obj_sign.str_empty);

          const str_valEndSymbol = (str_val.length -1);

          const bol_singleQuoted = (
            str_val[0] === obj_sign.str_squot &&
            str_val[str_valEndSymbol] === obj_sign.str_squot
          );
          const bol_doubleQuoted = (
            str_val[0] === obj_sign.str_dquot &&
            str_val[str_valEndSymbol] === obj_sign.str_dquot
          );

          if (bol_singleQuoted  || bol_doubleQuoted) {
            str_val = str_val.substring(1, str_valEndSymbol);
            if (bol_doubleQuoted) {
              str_val = str_val.replace(obj_regexp.reg_newlineMany, obj_sign.str_newline);
            }
          } else {
            str_val = str_val.trim();
          }

          obj_final[str_key] = str_val;
        }
      });

      return obj_final;
    }

    throw obj_error.str_bfrToObj;
  } catch (error) {
    const str_error = error?.message || error?.toString() || obj_sign.str_empty;
    
    if (allowError) {
      throw `${obj_error.str_catchService} [${str_error}]`;
    } else {
      return {};
    }
  }
}