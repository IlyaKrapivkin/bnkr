const {
  obj_error,
  obj_sign,
} = require(`../store.js`);

module.exports = (
  quantity,
  allowError,
) => {
  try {
    if (
      !quantity ||
      isNaN(quantity) ||
      !isFinite(quantity) ||
      !Number.isInteger(quantity)
    ) {
      throw obj_error.str_intPositive
    }

    return Math.floor(
      (1 * Math.pow(10, quantity - 1))
      +
      (Math.random() * (9 * Math.pow(10, quantity - 1)))
    );
  } catch (error) {
    const str_error = (
      error?.message ||
      error?.toString() ||
      obj_sign.str_empty
    );
    
    if (allowError) {
      throw `${ obj_error.str_catchService } [${ str_error }]`;
    } else {
      return obj_sign.num_zero;
    }
  }
}