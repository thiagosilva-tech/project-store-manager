const { Router } = require('express');
const { productsController } = require('../controllers');
const validateProductCreationFields = require('../middlewares/products.middlewares');

const productsRouter = Router();

productsRouter.get('/', productsController.getAllProducts);

productsRouter.get('/:id', productsController.getProductsById);

productsRouter.post('/', validateProductCreationFields, productsController.create);

productsRouter.put('/:id', validateProductCreationFields, productsController.updateProduct);

productsRouter.delete('/:id', productsController.deleteProduct);
module.exports = productsRouter;