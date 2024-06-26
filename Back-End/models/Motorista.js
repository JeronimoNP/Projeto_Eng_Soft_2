const Sequelize = require('sequelize');
const db = require('./db');
const Empresadb = require('./Empresa');
const { type } = require('os');
// const sequelize = require('./db');


const Motoristadb = db.define('motorista', {

    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    imagem:{
        type: Sequelize.BLOB,
        allowNull: true
    },

    nome:{
        type: Sequelize.STRING(100),
        allowNull: false
    },

    email:{
        type: Sequelize.STRING(255),
        allowNull: false
    },

    cnh:{
        type: Sequelize.STRING(11),
        allowNull: false
    },

    cpf:{
        type: Sequelize.STRING(14),
        allowNull: false
    },

    endereco:{
        type: Sequelize.STRING(255),
        allowNull: false
    },

    celular:{
        type: Sequelize.STRING(15),
        allowNull: false
    },
    ativo:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    }

});

Motoristadb.belongsTo(Empresadb);
Motoristadb.sync();

module.exports = Motoristadb;