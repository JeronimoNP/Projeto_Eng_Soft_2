const Sequelize = require('sequelize');
const sequelize = require("./db");

const Empresadb = db.define('empresa', {

    id:{
        type:Sequelize.DataTypes.UUID,
        autoIncrement: true,
        allowNull: false,
        primarykey: true
    },

    nome:{
        type: Sequelize.DataTypes.STRING(10),
        allowNull: false
    },

    celular:{
        type: Sequelize.DataTypes.NUMBER,
        allowNull: false
    },

    cnpj:{
        type: Sequelize.DataTypes.NUMBER,
        allowNull: false
    },

    endereco:{
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false
    },

    senha:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    }

})