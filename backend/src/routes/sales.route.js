const { Router } = require('express');
const { salesController } = require('../controllers');
const validateSalesCreationFields = require('../middlewares/sales.middlewares');

const salesRouter = Router();

salesRouter.get('/', salesController.getAllSales);

salesRouter.get('/:id', salesController.getSalesById);

salesRouter.post('/', validateSalesCreationFields, salesController.create);

module.exports = salesRouter;