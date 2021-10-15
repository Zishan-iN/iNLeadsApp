require('dotenv').config({path:'./config/config.env'});
const {Sequelize, DataTypes } =require('sequelize')

const sequelize = new Sequelize(process.env.LOCAL_MYSQL_URI)

const Lead = sequelize.define('Lead', {
    firstName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    emailAddress:{
        type: DataTypes.STRING,
        allowNull: false
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: false
    },
    intrestedProgram:{
        type: DataTypes.STRING,
        allowNull: false
    },
    intrestedUniversity:{
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Lead' // We need to choose the model name
  });

module.exports = Lead