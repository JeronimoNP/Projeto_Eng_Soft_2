const Sequelize = require('sequelize');
const db = require('./db');
const Empresadb = require('./Empresa');


const Servico = db.define('servico', {
    
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    nome: {
        type: Sequelize.STRING(100),
        allowNull: false
    },

    dataBusca: {
        type: Sequelize.DATE,
        allowNull: false
    },

    horarioBusca: {
        type: Sequelize.TIME,
        allowNull: false
    },

    enderecoBusca: {
        type: Sequelize.STRING(244),
        allowNull: false
    },

    cepBusca: {
        type: Sequelize.STRING(9),
        allowNull: false
    },

    enderecoEntrega: {
        type: Sequelize.STRING(244),
        allowNull: false
    },

    cepEntrega: {
        type: Sequelize.STRING(9),
        allowNull: false
    },

    paradas: {
        type: Sequelize.STRING(244),
        allowNull: true
    },

    km: {
        type: Sequelize.FLOAT,
        allowNull: false
    },

    transporte: {
        type: Sequelize.STRING(244),
        allowNull: false
    }
});

Servico.belongsTo(Empresadb);
Servico.sync();

module.exports = Servico;
