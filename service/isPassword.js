module.exports = (
  password,
  allowCyrillic,
  allowError,
) => {
  try {
    const reg_latin = /^[a-zA-Z0-9\-\][<>(){}!?.,:;+=~_"^*@#$%|]{6,}$/i;
    const reg_latinAndCyrillic = /^[a-zA-Zа-яА-Я0-9\-\][<>(){}!?.,:;+=~_"^*@#$%|]{6,}$/i;

    if (
      reg_latin.test(password) ||
      allowCyrillic && reg_latinAndCyrillic(password)
    ) {
      return true;
    } else {
      throw `incorrect password`;
    }
  } catch (error) {
    const str_error = error?.message || error?.toString() || ``;
    
    if (allowError) {
      throw `Catched from service: [${str_error}]`;
    } else {
      return false;
    }
  }
}