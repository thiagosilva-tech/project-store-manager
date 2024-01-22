const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../src/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('Test Sales', function () {
  describe('POST /sales', function () {
    it('Should return status 404 if productId does not exist in a single item request', async function () {
      const bodyWithNonExistentProductId = [{
        productId: '99',
        quantity: 1,
      }];
      const result = await chai.request(app)
        .post('/sales')
        .send(bodyWithNonExistentProductId);
      expect(result.status).to.equal(404);
      // expect(result.body.message).to.equal('Product not found');
    });

    it('Should return status 404 if productId does not exist in a multi-item request', async function () {
      const bodyWithNonExistentProductId = [
        {
          productId: '99',
          quantity: 1,
        },
        {
          productId: '99',
          quantity: 2,
        },
      ];
      const result = await chai.request(app)
        .post('/sales')
        .send(bodyWithNonExistentProductId);
      expect(result.status).to.equal(404);
      // expect(result.body.message).to.equal('Product not found');
    });
  });
});