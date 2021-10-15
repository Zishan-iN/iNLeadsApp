require('dotenv').config({path:'./config/.env'});

module.exports = {
  development:{
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  test:{
    username: 'root',
    password: null,
    database: '',
    host: 'localhost',
    dialect: 'mysql'
  },
  production:{
    username: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PASS,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOST,
    dialect: 'mysql'
  }
}