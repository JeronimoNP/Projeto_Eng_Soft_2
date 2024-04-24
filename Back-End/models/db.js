const Sequelize = require('sequelize');
require('dotenv').config();
const DataBase = process.env.DATABASE;
const User = process.env.USER;
const Password = process.env.PASSWORD;
const nomedb = process.env.NOMEDB;


const sequelize = new Sequelize({
    dialect: 'mssql',
    host: DataBase,
    port: 1433,
    database: nomedb,
    username: User,
    password: Password,
});

sequelize.authenticate()
.then(() => {
    console.log("Conexão com o banco de dados concluido!");
}).catch(function(error){
    console.clear();
    console.error("Erro na conexão ao banco de dados!!", error);
    console.error(error);
});

module.exports = sequelize;