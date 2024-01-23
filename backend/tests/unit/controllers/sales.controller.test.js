const Sinon = require('sinon');
const chai = require('chai');
const { expect } = require('chai');
const sinonChai = require('sinon-chai');
const { salesService } = require('../../../src/services');
const { allSalesServiceResponseMock, allSalesMock } = require('../mocks/sales.mock');
const { salesController } = require('../../../src/controllers');
const validateSalesCreationFields = require('../../../src/middlewares/sales.middlewares');
const validateItem = require('../../../src/utils/validateItem');
const handleError = require('../../../src/utils/handleError');

chai.use(sinonChai);

describe('Unit Tests - Sales Controller', function () {
  afterEach(function () {
    Sinon.restore();
  });
  describe('getAllSales', function () {
    afterEach(function () {
      Sinon.restore();
    });
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
    afterEach(function () {
      Sinon.restore();
    });
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
    afterEach(function () {
      Sinon.restore();
    });
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

  describe('validateSalesCreationFields', function () {
    afterEach(function () {
      Sinon.restore();
    });
    it('should call next() when the request body is valid', function () {
      // Arrange
      const mockRequest = {
        body: [
          { productId: 1, quantity: 5 },
          { productId: 2, quantity: 3 },
        ],
      };
      const mockResponse = {};
      const mockNext = Sinon.stub();
  
      // Act
      validateSalesCreationFields(mockRequest, mockResponse, mockNext);
  
      // Assert
      expect(mockNext.calledOnce).to.be.equal(true);
    });
  
    it('should call handleError() when the request body is invalid', function () {
      // Arrange
      const mockRequest = {
        body: [
          { productId: 'invalid', quantity: 5 },
          { productId: 2, quantity: 0 },
        ],
      };
      const mockResponse = {
        status: Sinon.stub().returnsThis(),
        json: Sinon.stub().returnsThis(),
      };
      const mockNext = Sinon.stub();
      // const handleErrorStub = Sinon.stub(handleError);
    
      // Act
      validateSalesCreationFields(mockRequest, mockResponse, mockNext);
    
      // Assert
      // expect(handleErrorStub.called).to.be.equal(true);
      expect(mockNext.called).to.be.equal(false);
    });
  });

  describe('Utils Tests', function () {  
    afterEach(function () {
      Sinon.restore();
    });
    describe('handleError', function () {
      it('should handle error with status 400', function () {
        // Arrange
        const res = { status: Sinon.stub().returnsThis(), json: Sinon.stub().returnsThis() };
  
        // Act
        handleError(res, { details: [{ message: 'Validation Error' }] });
  
        // Assert
        expect(res.status.calledWith(400)).to.be.equal(true);
        expect(res.json.calledWith({ message: 'Validation Error' })).to.be.equal(true);
      });
  
      // Add more test cases for different error scenarios
    });
  
    describe('validateItem', function () {
      it('should return null for valid item', function () {
        // Arrange
        const item = { productId: 1, quantity: 2 };
  
        // Act
        const result = validateItem(item);
  
        // Assert
        expect(result).to.be.equal(undefined);
      });
  
      it('should return validation error for invalid item', function () {
        // Arrange
        const item = { productId: 'invalid', quantity: -1 };
  
        // Act
        const result = validateItem(item);
  
        // Assert
        expect(result.details[0].message).to.equal('Product not found');
      });
    });
  });
});