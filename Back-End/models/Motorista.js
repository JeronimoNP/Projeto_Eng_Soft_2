const Sequelize = require('sequelize');
const db = require('./db');
const Empresadb = require('./Empresa');

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
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    imagem:{
        type: Sequelize.BLOB('long'),
        allowNull: true
    },

    nome:{
        type: Sequelize.STRING(10),
        allowNull: false
    },

    email:{
        type: Sequelize.STRING(10),
        allowNull: false
    },

    cnh:{
        type: Sequelize.STRING,
        allowNull: false
    },

    cpf:{
        type: Sequelize.STRING,
        allowNull: false
    },

    endereço:{
        type: Sequelize.STRING(50),
        allowNull: false
    },

    celular:{
        type: Sequelize.STRING,
        allowNull: false
    }

});

Motoristadb.belongsTo(Empresadb);
Motoristadb.sync();

module.exports = Motoristadb;