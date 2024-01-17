const mysql = require('mysql2/promise');

const sqlConfig = {
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'StoreManager',
  host: process.env.MYSQL_HOST || 'db',
  port: process.env.MYSQL_PORT || 3306,
};

const connection = mysql.createPool(sqlConfig);

module.exports = connection;