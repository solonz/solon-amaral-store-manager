const productsModel = require('../models/products.model');
const validations = require('./validations/validations');

const doesProductExist = async (productId) => {
  const product = await productsModel.findById(productId);
  if (product) return true;
  return false;
};

const doesFindAllWorks = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

const doesFindByIdWorks = async (productId) => {
  const error = validations.validateId(productId);
  if (error.type) return error;

  const product = await productsModel.findById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: product };
};

module.exports = {
  doesProductExist,
  doesFindAllWorks,
  doesFindByIdWorks,
};