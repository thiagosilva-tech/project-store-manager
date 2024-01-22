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

const updateProduct = async (id, name) => {
  const result = await connection.execute(`
    UPDATE products SET name = ? WHERE id = ?
  `, [name, id]);

  if (result && result.affectedRows > 0) {
    const [product] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
    return product;
  }

  return null;
};

const deleteProduct = async (id) => {
  const [{ affectedRows }] = await connection.execute('DELETE FROM products WHERE id = ?', [id]);
  return affectedRows;
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
};