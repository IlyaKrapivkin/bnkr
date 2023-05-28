module.exports = (
  str,
  allowError,
) => {
  try {
    const reg_phone = /^(\+7|7|8)?[\s-]?\(?[9][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/;

    if (
      str &&
      typeof str === `string`
    ) {
      const str_trimmed = str.trim().toLowerCase();
      if (reg_phone.test(str_trimmed)) {
        return str_trimmed.replace(/[^\d]/g, ``).slice(-10);
      }
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