const mysql = require("../node_modules/mysql2/promise");
const env = require("../node_modules/dotenv");
env.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  connectionLimit: process.env.MYSQL_CONNECTION_LIMIT,
  waitForConnections: process.env.MYSQL_WAIT_FOR_CONNECTIONS,
  queueLimit: process.env.MYSQL_QUEUE_LIMIT,
});

module.exports = pool;
