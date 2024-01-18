const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../src/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('Test Products', function () {
  describe('POST /products', function () {
    it('Deve retornar status 400 caso não tiver o campo name', async function () {
      // AAA - triple A
      // Arrange - organização pro teste
      const bodyWithoutName = {};

      // Act - Agir - executar o comando a ser testado
      const result = await chai.request(app)
        .post('/products')
        .send(bodyWithoutName);

      // Assert - Expectations 
      expect(result.status).to.equal(400);
    });
    it('Deve retornar status 422 caso o campo name tenha menos de 5 caracteres', async function () {
      // AAA - triple A
      // Arrange - organização pro teste
      const nameWithLess5Charecters = {
        name: 'abc',
      };
  
      // Act - Agir - executar o comando a ser testado
      const result = await chai.request(app)
        .post('/products')
        .send(nameWithLess5Charecters);
  
      // Assert - Expectations 
      expect(result.status).to.equal(422);
    });
  });
});