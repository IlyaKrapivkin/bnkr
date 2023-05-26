module.exports = (
  bfr,
  allowError,
) => {
  try {
    const str_newline = `\n`;
    const reg_newlineMatch = /\r\n|\n|\r/;
    const reg_keyVal = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/;
    const reg_newlineMany = /\\n/g;

    const obj_final = {};

    if (
      bfr &&
      typeof bfr === `object`
    ) {
      bfr.toString().split(reg_newlineMatch).forEach((line) => {
        const arr_keyVal = line.match(reg_keyVal);

        if (
          arr_keyVal &&
          typeof arr_keyVal === `object` &&
          arr_keyVal.length
        ) {
          const str_key = arr_keyVal[1];
          let str_val = (arr_keyVal[2] || ``);

          const str_valEndSymbol = (str_val.length -1);

          const bol_singleQuoted = (
            str_val[0] === `'` && str_val[str_valEndSymbol] === `'`
          );
          const bol_doubleQuoted = (
            str_val[0] === `"` &&
            str_val[str_valEndSymbol] === `"`
          );

          if (bol_singleQuoted  || bol_doubleQuoted) {
            str_val = str_val.substring(1, str_valEndSymbol);
            if (bol_doubleQuoted) {
              str_val = str_val.replace(reg_newlineMany, str_newline);
            }
          } else {
            str_val = str_val.trim();
          }

          obj_final[str_key] = str_val;
        }
      });

      return obj_final;
    } else {
      if (allowError) {
        throw `cannot convert bufffer -> string`;
      } else {
        return {};
      }
    }
  } catch (error) {
    const str_error = error?.message || error?.toString() || ``;
    
    if (allowError) {
      throw `Catched from service: [${str_error}]`;
    } else {
      return {};
    }
  }
}