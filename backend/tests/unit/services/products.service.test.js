const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { allProductsFromModel, allProductsMock } = require('../mocks/products.mock');

describe('Uni Tests - Products Service', function () {
  it('Recuperando todos os producos com sucesso', async function () {
    sinon.stub(productsModel, 'getAllProducts').resolves(allProductsFromModel);

    const responseService = await productsService.getAllProducts();
    expect(responseService.data).to.deep.equal(allProductsMock);
  });
});