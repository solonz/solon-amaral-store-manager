const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};
 
const findById = async (productId) => {
      const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return product;
};

const createNewProduct = async (name) => {
  const [newProduct] = await connection.execute(
    'INSERT INTO StoreManager.products(name) VALUES(?)',
    [name],
  );
  return newProduct.insertId;
};

module.exports = {
  findAll,
  findById,
  createNewProduct,
};