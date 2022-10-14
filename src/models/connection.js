const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || 3306,
  user: 'solon',
  password: '19031958',
  database: 'StoreManager',
});

module.exports = connection;