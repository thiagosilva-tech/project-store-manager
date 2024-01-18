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

module.exports = {
  getAllSales,
  getSalesById,
};