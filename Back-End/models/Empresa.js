const Sequelize = require('sequelize');
const db = require("./db");

const Empresadb = db.define('empresa', {

    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    nome:{
        type: Sequelize.STRING(100),
        allowNull: false
    },

    email:{
        type: Sequelize.STRING(255),
        allowNull: false
    },
    
    celular:{
        type: Sequelize.STRING(15),
        allowNull: false
    },

    cnpj:{
        type: Sequelize.STRING(14),
        allowNull: false
    },

    endereco:{
        type: Sequelize.STRING(255),
        allowNull: false
    },

    senha:{
        type: Sequelize.STRING(60),
        allowNull: false
    }

})

Empresadb.sync();

module.exports = Empresadb;
