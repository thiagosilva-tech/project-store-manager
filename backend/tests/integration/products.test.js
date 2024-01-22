const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../src/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('Test Products', function () {
  describe('POST /products', function () {
    it('Deve retornar status 400 caso não tiver o campo name', async function () {
      const bodyWithoutName = {};
      const result = await chai.request(app)
        .post('/products')
        .send(bodyWithoutName);

      expect(result.status).to.equal(400);
    });
    it('Deve retornar status 422 caso o campo name tenha menos de 5 caracteres', async function () {
      const nameWithLess5Charecters = {
        name: 'abc',
      };
      const result = await chai.request(app)
        .post('/products')
        .send(nameWithLess5Charecters);
      expect(result.status).to.equal(422);
    });
  });

  describe('PUT /products/:id', function () {
    it('Should return status 400 if name field is missing', async function () {
      const result = await chai.request(app)
        .put('/products/1')
        .send({});
      expect(result.status).to.equal(400);
      expect(result.body.message).to.equal('"name" is required');
    });
   
    it('Should return status 422 if name field has less than 5 characters', async function () {
      const result = await chai.request(app)
        .put('/products/1')
        .send({ name: 'abc' });
      expect(result.status).to.equal(422);
      expect(result.body.message).to.equal('"name" length must be at least 5 characters long');
    });
   
    it('Should return status 404 if product does not exist', async function () {
      const result = await chai.request(app)
        .put('/products/99')
        .send({ name: 'New Product' });
      expect(result.status).to.equal(404);
      expect(result.body.message).to.equal('Product not found');
    });
   
    it('Should return status 200 if product is updated successfully', async function () {
      const result = await chai.request(app)
        .put('/products/1')
        .send({ name: 'New Product' });
      expect(result.status).to.equal(200);
      expect(result.body.id).to.equal(1);
      expect(result.body.name).to.equal('New Product');
    });
  });
});