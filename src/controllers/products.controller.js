const productsService = require('../services/products.service');
const errorMap = require('../utils/errorMap');

const listAllProducts = async (_req, res) => {
  const { type, message } = await productsService.doesFindAllWorks();
  if (type) return res.status(errorMap[type]).json(message);
  res.status(200).json(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.doesFindByIdWorks(id);

  if (type) return res.status(errorMap[type]).json({ message });
  res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  console.log(name);
  const { type, message } = await productsService.doesCreateProductWorks(name);
  if (type) return res.status(422).json(message);
  res.status(201).json(message);
};

module.exports = {
  listAllProducts,
  getProduct,
  createProduct,
};