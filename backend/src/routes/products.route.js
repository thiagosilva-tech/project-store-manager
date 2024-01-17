const { Router } = require('express');
const { productsController } = require('../controllers');

const productsRouter = Router();

productsRouter.get('/', productsController.getAllProducts);

productsRouter.get('/:id', productsController.getProductsById);

module.exports = productsRouter;