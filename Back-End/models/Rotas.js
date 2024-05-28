const Sequelize = require('sequelize');
const db = require('./db');
const Empresadb = require('./Empresa');
const Motoristadb = require('./Motorista');
const sequelize = require('./db');

const RotasDb = db.define('rotas', {

    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primarykey: true
    },

    nome_servico:{
        type: Sequelize.STRING(120),
        allowNull: false
    },
    //esse dado é no formato YYYY-MM-DD hh:mm:ss
    data_busca:{
        type: Sequelize.DATE,
        allowNull: false
    },

    endereco_busca:{
        type: Sequelize.STRING(255),
        allowNull: false
    },

    cep_busca:{
        type: Sequelize.STRING(12),
        allowNull: false
    },
    
    endereco_entrega:{
        type: Sequelize.STRING(255),
        allowNull: false
    },

    cep_entrega:{
        type: Sequelize.STRING(12),
        allowNull: false
    },

    paradas:{
        type: Sequelize.STRING(255),
        allowNull: false
    },

    km:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    
    info_transporte:{
        type: Sequelize.STRING(255),
        allowNull: false
    },

});

RotasDb.belongsTo(Empresadb);
RotasDb.belongsTo(Motoristadb);
RotasDb.belongsTo(require('./Veiculo'));

// RotasDb.sync();

module.exports = RotasDb;