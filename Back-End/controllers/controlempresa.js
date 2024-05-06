const { verificaemail, verificacnpj, verificatelefone, login, cadastrar} = require('../middleware/empresamiddle.js');
const Empresadb = require('../models/Empresa.js');


async function cadastroempresa(dados, res){
    //exportanto para middleware para validação de email.
    const resultemail = verificaemail(dados.email);
    const resultcelular = verificatelefone(dados.celular);
    const resultcnpj = verificacnpj(dados.cnpj);
    let errors = [];
 


    if (resultemail === false) {
        errors.push("Email com o domínio incorreto.");
    }

    if (resultcelular === false) {
        errors.push("Formato de telefone incorreto.");
    }

    if (resultcnpj === false) {
        errors.push("Formato de CNPJ incorreto.");
    }


    if (errors.length > 0) {
        //console.log("Erro no formato dos dados:", errors.join(" ")); teste de dev
        return res.status(203).json({
            erro: "true code 203",
            info: errors
        });
    }

    //verificar se o email já existe no banco de dados
    const emailexiste = await Empresadb.findOne({where:{ email:dados.email}});

    //cadastrando empresa
    await cadastrar(dados, emailexiste, res);

};

async function loginempresa(logind, res){
    
    const emailexiste = await Empresadb.findOne({where:{ email:logind.email}});

    //chamando função middle para fazer a validação é salvar no bd
    await login(logind, emailexiste, res);

}

module.exports = {
    cadastroempresa,
    loginempresa
};