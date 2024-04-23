const { verificartelefone } = require('../middleware/empresamiddle.js');
const initdbempresa = require('../models/Empresa.js');


function cadastroempresa(nome, email, celular, cnpj, endereco, senha){
    //exportanto para middleware para validação de email.
    const resultemail = verificaemail(email);
    const resultcelular = verificatelefone(celular);


    if(resultemail === false){
        console.log("erro no formato do email!");
        return res.status(203).json({
            erro: "true code 203",
            info: "Email com o domino incorreto."
        });
    }

    if(resultcelular === false){
        console.log("erro no formato do email!");
        return res.status(203).json({
            erro: "true code 203",
            info: "formato de telefone incorreto."
        });
    }

}

module.exports = cadastroempresa;