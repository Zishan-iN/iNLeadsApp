require('dotenv').config({path:'./config/config.env'});
const { Sequelize } = require('sequelize');
const Lead  = require('../models/lead')

//const sequelize = new Sequelize(process.env.LOCAL_MYSQL_URI)
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: "localhost",
    dialect: "mysql",
    logging: false
})
sequelize.define('Lead', Lead)



module.exports = sequelize
