const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');

describe('Unit Tests - Products MODEL:', function () {
  it('Should retrieve all products successfully', async function () {
    // Arrange
    const expectedResult = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
    sinon.stub(connection, 'execute').resolves([expectedResult]);
 
    // Act
    const result = await productsModel.getAllProducts();
 
    // Assert
    expect(result).to.be.an('array');
    expect(result).to.deep.equal(expectedResult);
  });

  it('Should retrieve a product by ID successfully', async function () {
    // Arrange
    const expectedResult = [{ id: 1, name: 'Product 1' }];
    sinon.stub(connection, 'execute').resolves([expectedResult]);
 
    // Act
    const result = await productsModel.getProductsById(1);
 
    // Assert
    expect(result).to.be.an('array');
    expect(result).to.deep.equal(expectedResult);
  });

  afterEach(function () {
    sinon.restore();
  });
});