const areAllProductsAvailable = (body, products) => {
  const productsAvailable = body.every((product) => {
    for (let i = 0; i < products.length; i += 1) {
      if (product.productId === products[i].id) {
        return product;
      }
    }
    return false;
  });
  return productsAvailable;
};

module.exports = areAllProductsAvailable;
