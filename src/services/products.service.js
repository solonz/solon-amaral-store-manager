const productsModel = require('../models/products.model');
const validations = require('./validations/validations');

const doesProductExist = async (productId) => {
  const error = validations.validateId(productId);
  if (error.type) return { type: 'INVALID_PRODUCT', message: error };
  
  const product = await productsModel.findById(productId);
  if (product) return true;
  return { type: 'INVALID_PRODUCT', message: 'Invalid product' };
};

const doesFindAllWorks = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

const doesFindByIdWorks = async (productId) => {
  const error = validations.validateId(productId);
  if (error.type) return { type: 'INVALID_PRODUCT', message: error };

  const product = await productsModel.findById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: product };
};

module.exports = {
  doesProductExist,
  doesFindAllWorks,
  doesFindByIdWorks,
};