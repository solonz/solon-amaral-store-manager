const salesModel = require('../models/sales.model');
const validations = require('./validations/validations');

const findAll = async () => {
  const sales = await salesModel.findAll();
  return { type: null, message: sales };
};

const findById = async (saleId) => {
  const error = validations.validateId(saleId);
  if (error.type) return { type: error.type, message: error.message };

  const sales = await salesModel.findById(saleId);
  if (sales.length < 1) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: sales };
};

module.exports = {
  findAll,
    findById,
};