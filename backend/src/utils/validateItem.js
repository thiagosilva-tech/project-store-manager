const joi = require('joi');

const saleItemSchema = joi.object({
  productId: joi.number().integer().required().messages({
    'number.base': 'Product not found',
    'any.required': '"productId" is required',
  }),
  quantity: joi.number().integer().min(1).required()
    .messages({
      'number.base': '"quantity" must be greater than or equal to 1',
      'any.required': '"quantity" is required',
    }),
});

const validateItem = (item) => {
  const { error } = saleItemSchema.validate(item);
  return error;
};

module.exports = validateItem;