const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');

describe('Unit Tests - Sales MODEL:', function () {
  it('Should retrieve all sales successfully', async function () {
    // Arrange
    const expectedResult = [
      {
        saleId: 1,
        date: '2024-01-17T21:13:12.000Z',
        productId: 1,
        quantity: 5,
      },
      {
        saleId: 2,
        date: '2024-01-17T21:13:12.000Z',
        productId: 3,
        quantity: 15,
      },
    ];

    sinon.stub(connection, 'execute').resolves([expectedResult]);
 
    // Act
    const result = await salesModel.getAllSales();
 
    // Assert
    expect(result).to.be.an('array');
    expect(result).to.deep.equal(expectedResult);
  });

  it('Should retrieve a product by ID successfully', async function () {
    // Arrange
    const expectedResult = [{
      date: '2024-01-17T21:13:12.000Z',
      productId: 1,
      quantity: 5,
    },
    {
      date: '2024-01-17T21:13:12.000Z',
      productId: 2,
      quantity: 10,
    }];
    sinon.stub(connection, 'execute').resolves([expectedResult]);
 
    // Act
    const result = await salesModel.getSalesById(1);
 
    // Assert
    expect(result).to.be.an('array');
    expect(result).to.deep.equal(expectedResult);
  });

  afterEach(function () {
    sinon.restore();
  });
});