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

const create = async (req, res) => {
  const { status, data } = await salesService.create(req.body);
  if (status === 'NOT_FOUND') {
    return res.status(mapStatusHTTP(status)).json(data);
  }
  return res.status(mapStatusHTTP(status)).json(data.newSales);
};

module.exports = {
  getAllSales,
  getSalesById,
  create,
};