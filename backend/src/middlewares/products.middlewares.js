const joi = require('joi');

const productSchema = joi.object({
  name: joi.string().min(5).required(),
});

const errorMessages = {
  422: {
    message: '"name" length must be at least 5 characters long',
  },
  400: {
    message: '"name" is required',
  },
};

const validateProductCreationFields = (req, res, next) => {
  const result = productSchema.validate(req.body);

  if (result.error) {
    const errorDetail = result.error.details[0];
    const errorMessage = errorDetail.message;
    const errorStatus = errorDetail.path[0] === 'name' && errorMessage.includes('length') 
      ? 422 : 400;
    const { message } = errorMessages[errorStatus];
    return res.status(errorStatus).json({ message });
  }

  return next();
};

module.exports = validateProductCreationFields;
