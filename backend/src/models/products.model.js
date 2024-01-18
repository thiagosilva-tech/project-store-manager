const connection = require('./connection');

const getAllProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const getProductsById = async (id) => {
  const [product] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return product;
};

const createProduct = async (name) => {
  const [result] = await connection.execute(`
  INSERT INTO products (name)
  VALUES (?)
  `, [name]);
  return {
    id: result.insertId,
    name,
  };
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
};