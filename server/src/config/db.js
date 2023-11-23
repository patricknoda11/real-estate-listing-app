const knex = require('knex');
const env = require('dotenv');

env.config();

const knexInstance = knex({
  client: 'mysql2',
  connection: {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
  },
  pool: {
    min: 0,
    max: process.env.MYSQL_CONNECTION_LIMIT,
    queueLimit: process.env.MYSQL_QUEUE_LIMIT
  },
  debug: false // set to true if you want to see SQL queries in console
});

module.exports = knexInstance;
