const Sinon = require('sinon');
const chai = require('chai');
const { expect } = require('chai');
const sinonChai = require('sinon-chai');
const { productsService } = require('../../../src/services');
const { allProductsServiceResponseMock, allProductsMock } = require('../mocks/products.mock');
const { productsController } = require('../../../src/controllers');

chai.use(sinonChai);

describe('Unit Tests - Products Controller', function () {
  afterEach(function () {
    Sinon.restore();
  });
  describe('getAllProducts', function () {
    it('Status deve ser chamado com 200 e json com lista de products', async function () {
      /// Arrange
      Sinon.stub(productsService, 'getAllProducts').resolves(allProductsServiceResponseMock);
      const req = {};
      const res = {};
      res.status = Sinon.stub().returnsThis();
      res.json = Sinon.stub();
  
      /// Act
      await productsController.getAllProducts(req, res);
  
      /// Assert
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json).to.have.been.calledWith(allProductsMock);
    });
  });

  describe('getProductsById', function () {
    it('Status deve ser chamado com 200 e json com product', async function () {
      // Arrange
      const productId = '1';
      const product = { id: productId, name: 'Product 1' };
      Sinon.stub(productsService, 'getProductsById').resolves({ status: 'SUCCESSFUL', data: [product] });
      const req = { params: { id: productId } };
      const res = {};
      res.status = Sinon.stub().returnsThis();
      res.json = Sinon.stub();
  
      // Act
      await productsController.getProductsById(req, res);
  
      // Assert
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(product)).to.be.equal(true);
    });
    it('getProductsById should return "Product not found" when product does not exist', async function () {
      // Arrange
      Sinon.stub(productsService, 'getProductsById').resolves({ status: 'NOT_FOUND', data: {} });
      const req = { params: { id: 'non-existent-id' } };
      const res = { status: Sinon.stub().returnsThis(), json: Sinon.stub() };
  
      // Act
      await productsController.getProductsById(req, res);
  
      // Assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  describe('create', function () {
    it('Status deve ser chamado com 201 e json com newProduct', async function () {
      // Arrange
      const productName = 'New Product';
      const newProduct = { id: '1', name: productName };
      Sinon.stub(productsService, 'create').resolves({ status: 'CREATED', data: { newProduct } });
      const req = { body: { name: productName } };
      const res = {};
      res.status = Sinon.stub().returnsThis();
      res.json = Sinon.stub();
  
      // Act
      await productsController.create(req, res);
  
      // Assert
      expect(productsService.create.calledWith(req.body)).to.be.equal(true);
      expect(res.status.calledWith(201)).to.be.equal(true);
      expect(res.json.calledWith(newProduct)).to.be.equal(true);
    });
  });

  describe('updateProduct', function () {
    it('Status deve ser chamado com 200 e json com updatedProduct', async function () {
      // Arrange
      const productId = '1';
      const productName = 'Updated Product';
      const updatedProduct = { id: productId, name: productName };
      Sinon.stub(productsService, 'updateProduct').resolves({ status: 'SUCCESSFUL', data: updatedProduct });
      const req = { params: { id: productId }, body: { name: productName } };
      const res = {};
      res.status = Sinon.stub().returnsThis();
      res.json = Sinon.stub();
  
      // Act
      await productsController.updateProduct(req, res);
  
      // Assert
      expect(productsService.updateProduct.calledWith(req.params.id, req.body.name)).to.be.equal(true);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(updatedProduct)).to.be.equal(true);
    });
  });

  describe('deleteProduct', function () {
    it('Status deve ser chamado com 200', async function () {
      // Arrange
      const productId = '1';
      Sinon.stub(productsService, 'deleteProduct').resolves({ status: 'SUCCESSFUL', data: {} });
      const req = { params: { id: productId } };
      const res = {};
      res.status = Sinon.stub().returnsThis();
      res.json = Sinon.stub();
  
      // Act
      await productsController.deleteProduct(req, res);
  
      // Assert
      expect(productsService.deleteProduct.calledWith(req.params.id)).to.be.equal(true);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith({})).to.be.equal(true);
    });
  });
});