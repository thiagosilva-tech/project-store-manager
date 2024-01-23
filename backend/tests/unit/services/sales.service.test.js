const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { allSalesFromModel, allSalesMock } = require('../mocks/sales.mock');
const areAllProductsAvailable = require('../../../src/utils/areAllProductsAvailable');

describe('Uni Tests - Sales Service', function () {
  it('Recuperando todos as vendas com sucesso', async function () {
    sinon.stub(salesModel, 'getAllSales').resolves(allSalesFromModel);

    const responseService = await salesService.getAllSales();
    expect(responseService.data).to.deep.equal(allSalesMock);
  });

  describe('areAllProductsAvailable', function () {
    it('should return true if all products are available', function () {
      const body = [{ productId: 1 }, { productId: 2 }];
      const products = [{ id: 1 }, { id: 2 }];
      expect(areAllProductsAvailable(body, products)).to.be.equal(true);
    });

    it('should return false if a product is not available', function () {
      const body = [{ productId: 1 }, { productId: 3 }];
      const products = [{ id: 1 }, { id: 2 }];
      expect(areAllProductsAvailable(body, products)).to.be.equal(false);
    });
  });
});