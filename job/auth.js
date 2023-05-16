module.exports = (
  session,
  allowError,
) => {
  try {
    if (allowError) {
      throw `некорректный код сессии`;
    } else {
      return {};
    }
  } catch (error) {
    const str_error = error?.message || error?.toString() || ``;
    if (allowError) {
      throw `Ошибка сервиса: [${str_error}]`;
    } else {
      return {};
    }
  }
}