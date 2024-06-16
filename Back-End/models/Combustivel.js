const Sequelize = require('sequelize');
const db = require('./db');
const Empresadb = require('./Empresa');
const Motoristadb = require('./Motorista');
const Veiculodb = require('./Veiculo');


const CombustivelBd = db.define('combustivel', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    valor:{
        type: Sequelize.MONEY,
        allowNull: false
    },
    km:{
        type: Sequelize.NUMBER,
        allowNull: false
    }
});

CombustivelBd.belongsTo(Empresadb);
CombustivelBd.belongsTo(Veiculodb);
CombustivelBd.belongsTo(Motoristadb);