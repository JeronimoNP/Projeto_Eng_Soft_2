const multer = require('multer');
const {} = require('../middleware/combustivelmiddle.js');
const senhatoken = process.env.KEYTOKENSECRET;


async function cadastro(dados, res){
//a variavel token2 é onde tera o descriptografia do token
    const token2 = await decodetoken(dados, senhatoken);
    if(token2 === "erro"){
        return res.status(203).json({
            erro: true,
            info: "token invalido ou expirado"
        });
    }
    
//verificando dados
    const resultvalor = verificarValor(dados);
    const resultcarro = verificarCarro(dados);
    const resultmotorista = verficarMotorista(dados.motorista);
    const resultkm = verificarValor(dados.km);

//criando variavel para armazenar erros de tratamento de dados
    let errors = [];

    if(resultvalor === false){
        errors.push("Valor invalido")
    }
    if(resultcarro === false){
        errors.push("Carro não encontrado ou formato invalido");
    }
    if(resultmotorista === false){
        errors.push("Carro não encontrado ou formato invalido");
    }
    if(resultkm === false){
        errors.push("km no formato invalido");
    }
    if(errors.length > 0){
        return res.status(203).json({
            erro: true,
            info: errors
        })
    }

    //cadastrando dados de combustivel no bd
    await cadastrarCombustivelBd(dados, token2, res);
}

async function listarcombustivel(token, res){
    
    //criando variavel token2 onde tera a descriptografia do token
    const token2 = await decodetoken(token, senhatoken);
    if(token2 === "erro"){
        return res.status(498).json({
            erro: true,
            info: "token invalido ou expirado"
        });
    }

    try{
        const listarcombustivel1 = await listarcombustivelbd(token2);
    }catch{
        return res.status(500).json({
            erro: true,
            info: "erro ao listar no bd"
        })
    }

    //retornando para o front os dados
    return res.status(200).json(listarcombustivel);
}

module.exports = {
    cadastro
}