const Sinon = require('sinon');
const chai = require('chai');
const { expect } = require('chai');
const sinonChai = require('sinon-chai');
const { productsService } = require('../../../src/services');
const { allProductsServiceResponseMock, allProductsMock } = require('../mocks/products.mock');
const { productsController } = require('../../../src/controllers');

chai.use(sinonChai);

describe('Unit Tests - Products Controller', function () {
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