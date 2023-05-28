module.exports = (
  str,
  allowError,
) => {
  try {
    const reg_email = /(^[\w+\-*&]+)((\.[\w+\-*&]+)*)(@\w+)(([.-]?\w+)*)((\.\w{2,32})+$)/;

    if (
      str &&
      typeof str === `string`
    ) {
      const str_trimmed = str.trim().toLowerCase();
      if (reg_email.test(str_trimmed)) {
        return str_trimmed;
      }
    }

    throw `cannot convert str -> email str`;
  } catch (error) {
    const str_error = error?.message || error?.toString() || ``;
    
    if (allowError) {
      throw `Catched from service: [${str_error}]`;
    } else {
      return ``;
    }
  }
}