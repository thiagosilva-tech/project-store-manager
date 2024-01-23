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

  it('Should create a product successfully', async function () {
    // Arrange
    const expectedResult = { id: 5, name: 'Product 5' };
    sinon.stub(connection, 'execute').resolves([{ insertId: expectedResult.id }]);
    
    // Act
    const result = await productsModel.createProduct('Product 5');
  
    // Assert
    expect(result).to.be.an('object');
    expect(result).to.deep.equal(expectedResult);
  });
   
  it('Should update a product successfully', async function () {
    // Arrange
    const expectedResult = { id: 1, name: 'Updated Product' };
    sinon.stub(connection, 'execute')
      .onFirstCall().resolves([{ changedRows: 1 }])
      .onSecondCall()
      .resolves(expectedResult);
  
    // Act
    const result = await productsModel.updateProduct(1, 'Updated Product');
    // Assert
    expect(result).to.be.an('object');
    expect(result).to.deep.equal(expectedResult);
  });
   
  it('Should delete a product successfully', async function () {
    const expectedResult = 1;
    sinon.stub(connection, 'execute').resolves([{ affectedRows: expectedResult }]);
    const result = await productsModel.deleteProduct(1);

    expect(result).to.be.an('number');
    expect(result).to.equal(expectedResult);
  });
   
  afterEach(function () {
    sinon.restore();
  });
});