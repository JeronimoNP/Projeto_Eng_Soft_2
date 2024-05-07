const Sequelize = require('sequelize');
const db = require('./db');
const Empresadb = require("./Empresa");
const Motoristadb = require("./Motorista");

const VeiculoDb = db.define('veiculo', {
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true
    },

    imagem:{
        type: Sequelize.BLOB,
        allowNull: true
    },
    
    marca:{
        type: Sequelize.STRING(100),
        allowNull:false

    },

    modelo:{
        type: Sequelize.STRING(50),
        allowNull: false
    },

    tipo:{
        type: Sequelize.STRING(50),
        allowNull: false
    },
     
    cor:{
        type: Sequelize.STRING(20),
        allowNull: false
    },

    placa:{
        type: Sequelize.STRING(10),
        allowNull: false
    },

    ativo:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    },


});

VeiculoDb.belongsTo(Empresadb);
VeiculoDb.belongsTo(Motoristadb, { allowNull: true });
