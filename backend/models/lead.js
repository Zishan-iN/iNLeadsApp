const { DataTypes } = require("sequelize");

const Lead = {
    id:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true
    },
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
    },
    createdAt:{
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt:{
        type: DataTypes.DATE,
        allowNull: false
    }
}

module.exports = Lead