const { salesService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getAllSales = async (req, res) => {
  const { status, data } = await salesService.getAllSales();
  return res.status(mapStatusHTTP(status)).json(data);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.getSalesById(id);
  if (status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(status)).json({ message: 'Sale not found' });
  }
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  getAllSales,
  getSalesById,
};