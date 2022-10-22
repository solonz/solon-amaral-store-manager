const productsModel = require('../models/products.model');
const validations = require('./validations/validations');

const findAll = async () => {
  const products = await productsModel.findAll();
  // if (!products) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: products };
};

const findById = async (productId) => {
  const error = validations.validateId(productId);
  if (error.type) return { type: error.type, message: error.message };
  
  const product = await productsModel.findById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: product };
};

// const doesProductExist = async (productId) => {
//   const error = validations.validateId(productId);
//   if (error.type) return { type: 'INVALID_PRODUCT', message: error };
  
//   const product = await productsModel.findById(productId);
//   if (product) return true;
//   return { type: 'INVALID_PRODUCT', message: 'Invalid product' };
// };

const createProduct = async (productName) => {
  const error = validations.validateName(productName);
  if (error.type) return error;
  const id = await productsModel.createProduct(productName);
  const product = await productsModel.findById(id);
  // console.log(product);
  return { type: null, message: product };
};

module.exports = {
  // doesProductExist,
  findAll,
  findById,
  createProduct,
};