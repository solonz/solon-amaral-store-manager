const productsService = require('../services/products.service');
const errorMap = require('../utils/errorMap');

const findAll = async (_req, res) => {
  const { message } = await productsService.findAll();
  // if (type) return res.status(errorMap[type]).json(message);
  res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.findById(id);

  if (type) return res.status(errorMap[type]).json({ message });
  res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsService.createProduct(name);
  // const { type, message } = await productsService.createProduct(name);
  if (type) {
    console.log(type);
    console.log(message);
    return res.status(422).json({ message });
  }
  res.status(201).json(message);
};

module.exports = {
  findAll,
  findById,
  createProduct,
};