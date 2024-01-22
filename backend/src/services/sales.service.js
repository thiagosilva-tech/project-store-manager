const { salesModel, productsModel } = require('../models');
const serviceResponse = require('./messages/messages');
const areAllProductsAvailable = require('../utils/areAllProductsAvailable');

const getAllSales = async () => {
  let data = await salesModel.getAllSales();
  if (!data || data.length === 0) data = { message: 'There are no sales' };
  return { status: serviceResponse.SUCCESSFUL, data };
};

const getSalesById = async (id) => {
  const data = await salesModel.getSalesById(id);
  if (!data || data.length === 0) {
    return { status: serviceResponse.NOT_FOUND, data };
  }
  return { status: serviceResponse.SUCCESSFUL, data };
};

const create = async (body) => {
  const products = await productsModel.getAllProducts();
  const productsAvailable = areAllProductsAvailable(body, products);

  if (!productsAvailable) {
    return { status: serviceResponse.NOT_FOUND, data: { message: 'Product not found' } };
  }

  const newSales = await salesModel.createSale(body);

  return { status: serviceResponse.CREATED, data: { newSales } };
};

module.exports = {
  getAllSales,
  getSalesById,
  create,
};