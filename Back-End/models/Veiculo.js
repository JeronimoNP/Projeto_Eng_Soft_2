const sequelize = require('sequelize');
const db = require('./db');

const VeiculoDb = db.define('veiculo', {
    id:{
        type: sequelize.DataTypes.UUID,
        allowNull: false,
    },
    
})
