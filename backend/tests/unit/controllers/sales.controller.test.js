const Sinon = require('sinon');
const chai = require('chai');
const { expect } = require('chai');
const sinonChai = require('sinon-chai');
const { salesService } = require('../../../src/services');
const { allSalesServiceResponseMock, allSalesMock } = require('../mocks/sales.mock');
const { salesController } = require('../../../src/controllers');

chai.use(sinonChai);

describe('Unit Tests - Sales Controller', function () {
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