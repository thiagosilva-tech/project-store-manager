const handleError = require('../utils/handleError');
const validateItem = require('../utils/validateItem');

const validateSalesCreationFields = (req, res, next) => {
  const { body } = req;

  const isValid = body.every((item) => {
    const error = validateItem(item);
    if (error) {
      handleError(res, error);
      return false;
    }
    return true;
  });
  if (isValid) {
    return next();
  }
};

module.exports = validateSalesCreationFields;
