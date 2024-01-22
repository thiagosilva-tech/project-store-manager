const Sinon = require('sinon');
const chai = require('chai');
const { expect } = require('chai');
const sinonChai = require('sinon-chai');
const { salesService } = require('../../../src/services');
const { allSalesServiceResponseMock, allSalesMock } = require('../mocks/sales.mock');
const { salesController } = require('../../../src/controllers');

chai.use(sinonChai);

describe('Unit Tests - Sales Controller', function () {
  afterEach(function () {
    Sinon.restore();
  });
  describe('getAllSales', function () {
    it('Status deve ser chamado com 200 e json com lista de sales', async function () {
      /// Arrange
      Sinon.stub(salesService, 'getAllSales').resolves(allSalesServiceResponseMock);
      const req = {};
      const res = {};
      res.status = Sinon.stub().returnsThis();
      res.json = Sinon.stub();
  
      /// Act
      await salesController.getAllSales(req, res);
  
      /// Assert
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json).to.have.been.calledWith(allSalesMock);
    });
  });
  describe('getSalesById', function () {
    it('should call salesService.getSalesById and send response', async function () {
      // Arrange
      const saleId = '1';
      Sinon.stub(salesService, 'getSalesById').resolves({ status: 'SUCCESSFUL', data: [] });
      const req = { params: { id: saleId } };
      const res = {};
      res.status = Sinon.stub().returnsThis();
      res.json = Sinon.stub();
   
      // Act
      await salesController.getSalesById(req, res);
   
      // Assert
      expect(salesService.getSalesById.calledWith(req.params.id)).to.be.equal(true);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith([])).to.be.equal(true);
    });
    it('getSalesById should return "Sale not found" when sale does not exist', async function () {
      // Arrange
      Sinon.stub(salesService, 'getSalesById').resolves({ status: 'NOT_FOUND', data: {} });
      const req = { params: { id: 'non-existent-id' } };
      const res = { status: Sinon.stub().returnsThis(), json: Sinon.stub() };
  
      // Act
      await salesController.getSalesById(req, res);
  
      // Assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });
   
  describe('create', function () {
    it('should call salesService.create and send response', async function () {
      // Arrange
      const saleBody = [];
      Sinon.stub(salesService, 'create').resolves({ status: 'CREATED', data: { newSales: saleBody } });
      const req = { body: saleBody };
      const res = {};
      res.status = Sinon.stub().returnsThis();
      res.json = Sinon.stub();
   
      // Act
      await salesController.create(req, res);
   
      // Assert
      expect(salesService.create.calledWith(req.body)).to.be.equal(true);
      expect(res.status.calledWith(201)).to.be.equal(true);
      expect(res.json.calledWith(saleBody)).to.be.equal(true);
    });
    it('create should return an error response when a product is not found', async function () {
      // Arrange
      const req = { body: { /* ... */ } };
      const res = { status: Sinon.stub().returnsThis(), json: Sinon.stub() };
      Sinon.stub(salesService, 'create').resolves({ status: 'NOT_FOUND', data: { message: 'Product not found' } });
    
      // Act
      await salesController.create(req, res);
    
      // Assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });
});