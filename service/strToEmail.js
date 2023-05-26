module.exports = (
  str,
  allowError,
) => {
  try {
    if (allowError) {
      throw `cannot convert str -> email str`;
    } else {
      return ``;
    }
  } catch (error) {
    const str_error = error?.message || error?.toString() || ``;
    
    if (allowError) {
      throw `Catched from service: [${str_error}]`;
    } else {
      return ``;
    }
  }
}