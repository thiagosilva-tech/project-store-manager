const serviceResponse = require('../../../src/services/messages/messages');

const allProductsMock = [
  { id: 1, name: 'Samara Granjeiro' },
  { id: 2, name: 'Levi Teixeira' },
];

const allProductsServiceResponseMock = { 
  status: serviceResponse.SUCCESSFUL, 
  data: allProductsMock,
};

const allProductsFromModel = [
  { id: 1, name: 'Samara Granjeiro' },
  { id: 2, name: 'Levi Teixeira' },
];

module.exports = {
  allProductsMock,
  allProductsServiceResponseMock,
  allProductsFromModel,
};