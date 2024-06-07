const {verificaData, } = require('../middleware/servicomiddle.js');

async function cadastroserve(dados, res){
    //mandando dados para o middleware para a validação de dados
    const resultData = verificaData(dados.databusca);

    let errors = [];

    //condição para informa erros
    if(resultData === false){
        errors.push("Formato data incorreto");
    }
    
}


//exportando funções para poder usar no motorista Routes
module.exports = {
    cadastroserve
}