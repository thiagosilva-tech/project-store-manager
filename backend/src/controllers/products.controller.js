const { productsService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getAllProducts = async (req, res) => {
  const { status, data } = await productsService.getAllProducts();
  return res.status(mapStatusHTTP(status)).json(data);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.getProductsById(id);
  if (status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(status)).json({ message: 'Product not found' });
  }
  return res.status(mapStatusHTTP(status)).json(data[0]);
};

module.exports = {
  getAllProducts,
  getProductsById,
};