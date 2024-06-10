const Sequelize = require('sequelize');
const db = require('./db.js');
const Empresadb = require('../models/Empresa.js');


const Equipedb = db.define('equipe', {

    id:{
        type: Sequelize.INTEGER,
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

    cpf:{
        type: Sequelize.STRING(14),
        allowNull: false
    },

    celular:{
        type: Sequelize.STRING(15),
        allowNull: false
    },

    endereco:{
        type: Sequelize.STRING(255),
        allowNull: false
    },

    sexo:{
        type: Sequelize.STRING(20),
        allowNull: false
    },

    login:{
        type: Sequelize.STRING(255),
        allowNull: false
    },

    senha: {
        type: Sequelize.STRING(60),
        allowNull: false
    },

    funcao: {
        type: Sequelize.STRING(100),
        allowNull: false
    }
    
});

Equipedb.belongsTo(Empresadb);
Equipedb.sync();

module.exports = Equipedb;