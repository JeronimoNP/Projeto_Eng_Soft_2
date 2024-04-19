const Sequelize = require('sequelize');
const db = require('./db');

/*
* modelo do banco de dados

    Dados de entrada:
        Nome:String
        Celular: String
        Cnh: int
        Cpf: int
        Endereço: string[50]
    Retorno: (true caso concluido com sucesso, false caso tenha erro)
*/
const Motoristadb = db.define('motorista', {
    id:{
        type: Sequelize.DataTypes.UUID,
        autoIncrement: true,
        allowNull: false,
        primarykey: true
    },

    nome:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },

    celular:{
        type: Sequelize.DataTypes.NUMBER,
        allowNull: false
    },

    cnh:{
        type: Sequelize.DataTypes.NUMBER,
        allowNull: false
    },

    cpf:{
        type: Sequelize.DataTypes.NUMBER,
        allowNull: false
    },

    Endereço:{
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false
    }
});

Motoristadb.sync();
module.exports = Motoristadb;