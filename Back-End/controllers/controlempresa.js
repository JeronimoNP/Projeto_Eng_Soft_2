const { verificaemail, verificacnpj, verificatelefone } = require('../middleware/empresamiddle.js');
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

   
    const emailexiste = await Empresadb.findOne({where:{ email:dados.email}});



    console.log(dados.nome, dados.email, dados.celular, dados.cnpj);
    if (!emailexiste) {
        await Empresadb.create({
            nome: dados.nome,
            email: dados.email,
            celular: dados.celular,
            cnpj: dados.cnpj,
            endereco: dados.endereco,
            senha: dados.senha
        }).then(() => {
            return res.status(201).json({
                erro: false,
                mensagem: "Usuário cadastrado com sucesso!!",
                nome: dados.nome,
                email: dados.email
            });
        }).catch((error) => { // Adicione o parâmetro de erro aqui para poder capturar e exibir a mensagem de erro
            console.error("Erro ao cadastrar usuário:", error); // Exibir o erro no console para depuração
            return res.status(400).json({
                erro: true,
                mensagem: "Erro ao cadastrar usuário!"
            });
        });
    } else {
        return res.status(406).json({
            erro: true,
            mensagem: "Email já existente no banco de dados!"
        });
    }
    
    
    

};

module.exports = {cadastroempresa};