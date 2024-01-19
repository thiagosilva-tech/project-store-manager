const connection = require('./connection');

const getAllSales = async () => {
  const [sales] = await connection.execute(`
  SELECT 
    sp.sale_id AS saleId, 
    s.date, 
    sp.product_id AS productId, 
    sp.quantity
FROM sales_products sp
JOIN sales s ON s.id = sp.sale_id;
  `);
  return sales;
};

const getSalesById = async (id) => {
  const [sale] = await connection.execute(`
  SELECT 
   s.date, 
   sp.product_id AS productId, 
   sp.quantity
  FROM sales_products sp
  JOIN sales s ON s.id = sp.sale_id
  WHERE sp.sale_id = ?;
  `, [id]);
  return sale;
};

const createSale = async (body) => {
  const [result] = await connection.execute('INSERT INTO sales (date) VALUES (NOW())');
  const saleId = result.insertId;

  const promises = body.map((item) => connection.execute(`
        INSERT INTO sales_products (sale_id, product_id, quantity) 
        VALUES (?, ?, ?)
    `, [saleId, item.productId, item.quantity]));

  await Promise.all(promises);

  return { id: saleId, itemsSold: body };
};

module.exports = {
  getAllSales,
  getSalesById,
  createSale,
};