const connection = require('./connection');

const getAllProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const getProductsById = async (id) => {
  const [product] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return product;
};

module.exports = {
  getAllProducts,
  getProductsById,
};