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

const create = async (req, res) => {
  const { status, data } = await productsService.create(req.body);
  return res.status(mapStatusHTTP(status)).json(data.newProduct);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { status, data } = await productsService.updateProduct(id, name);
  return res.status(mapStatusHTTP(status)).json(data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.deleteProduct(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  getAllProducts,
  getProductsById,
  create,
  updateProduct,
  deleteProduct,
};