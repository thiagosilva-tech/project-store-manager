const { productsModel } = require('../models');
const serviceResponse = require('./messages/messages');

const getAllProducts = async () => {
  let data = await productsModel.getAllProducts();
  if (!data || data.length === 0) data = { message: 'There are no products' };
  return { status: serviceResponse.SUCCESSFUL, data };
};

const getProductsById = async (id) => {
  const data = await productsModel.getProductsById(id);
  if (!data || data.length === 0) {
    return { status: serviceResponse.NOT_FOUND, data };
  }
  return { status: serviceResponse.SUCCESSFUL, data };
};

module.exports = {
  getAllProducts,
  getProductsById,
};