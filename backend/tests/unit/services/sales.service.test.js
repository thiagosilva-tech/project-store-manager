const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { allSalesFromModel, allSalesMock } = require('../mocks/sales.mock');

describe('Uni Tests - Sales Service', function () {
  it('Recuperando todos as vendas com sucesso', async function () {
    sinon.stub(salesModel, 'getAllSales').resolves(allSalesFromModel);

    const responseService = await salesService.getAllSales();
    expect(responseService.data).to.deep.equal(allSalesMock);
  });
});