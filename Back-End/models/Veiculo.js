const Sequelize = require('sequelize');
const db = require('./db');
const Empresadb = require("./Empresa");
const Motoristadb = require("./Motorista");

const Veiculodb = db.define('veiculo', {
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
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

    crlv:{
        type: Sequelize.STRING(50),
        allowNull: false
    },

    modelo:{
        type: Sequelize.STRING(50),
        allowNull: false
    },

    tipo:{
        type: Sequelize.STRING(50),
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

    cor: {
        type: Sequelize.STRING(25),
        allowNull: false
    }

});

Veiculodb.belongsTo(Empresadb);
Veiculodb.belongsTo(Motoristadb, { foreignKey: { allowNull: true } });
Veiculodb.sync();

module.exports = Veiculodb;
