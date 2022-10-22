const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [product] = await connection.execute(
    `SELECT sp.sale_id, sales.date, sp.product_id, sp.quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS sales
    ON sales.id = sp.sale_id
    ORDER BY sp.sale_id, sp.product_id`,
  );
  return camelize(product);
};

const findById = async (saleId) => {
  const [product] = await connection.execute(
    `SELECT sales.date, sp.product_id, sp.quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS sales
    ON sales.id = sp.sale_id
    WHERE sp.sale_id = ?
    ORDER BY sp.sale_id, sp.product_id`,
    [saleId],
  );
  return camelize(product);
};

module.exports = {
  findAll,
  findById,
};