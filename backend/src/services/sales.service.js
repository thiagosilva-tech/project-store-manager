const { salesModel } = require('../models');
const serviceResponse = require('./messages/messages');

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

module.exports = {
  getAllSales,
  getSalesById,
};