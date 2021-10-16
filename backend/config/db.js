require('dotenv').config({path:'./config/config.env'});
const { Sequelize } = require('sequelize');
const Lead  = require('../models/lead')

const sequelize = new Sequelize(process.env.LOCAL_MYSQL_URI)
sequelize.define('Lead', Lead)

const connectDB = async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = sequelize
