require('dotenv').config({path:'./config/config.env'});
const { Sequelize } = require('sequelize');
const Lead  = require('../models/lead');
const User = require('../models/user');
const Role =require('../models/role')

//const sequelize = new Sequelize(process.env.LOCAL_MYSQL_URI)
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: "localhost",
    dialect: "mysql",
    logging: false,
    dialectOptions: {
        //useUTC: false, //for reading from database
        dateStrings: true,
        typeCast: true,
        timezone: "+05:30"
    },
    timezone: "+05:30", //for writing to database
})
const lead = sequelize.define('Lead', Lead)
const user = sequelize.define('User', User)
const role = sequelize.define('Role', Role)

// Option 1
role.hasOne(user, {
    foreignKey: 'roleId'
});

user.belongsTo(role, {
    foreignKey: 'roleId'
});

module.exports = sequelize
