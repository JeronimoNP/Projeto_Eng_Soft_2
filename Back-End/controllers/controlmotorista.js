const {verificaemail, verificacpf, verificatelefone} = require('../middleware/motoristamiddle.js')
const Motoristadb = require('../models/Motorista.js');

async function cadastromoto(dados, res){
    //mandando dados para o middleware para a validação de dados
    const resultemail = verificaemail(dados.email);
    const resultcelular = verificatelefone(dados.celular);
    const resultcpf = verificacpf(dados.cpf);
    //criando uma variavel para armazena erros de dados
    let errors = [];
    //condição para informar erros
    if (resultemail === false) {
        errors.push("Email com o domínio incorreto.");
    }

    if (resultcelular === false) {
        errors.push("Formato de telefone incorreto.");
    }

    if (resultcpf === false) {
        errors.push("Formato de CPF incorreto.");
    }

    if(errors.length > 0){
        //console.log("Erro no formato dos dados:", errors.join(" "));
        return res.status(203).json({
            erro: "true",
            info: errors
        });
    }
    //verificando se já existe um email cadastrado no bd, caso tenha retorna true
    const emailexiste = await Motoristadb.findOne({where: {email: dados.email}});
    //condição para verificar email existente, caso não tenha ele cadastra motorista
    if(!emailexiste){
        await Motoristadb.create({
            imagem: dados.imagem,
            nome: dados.nome,
            email: dados.email,
            cnh: dados.cnh,
            cpf: dados.cpf,
            endereço: dados.endereco,
            celular: dados.celular,
            empresaID: dados.empresaID
        }).then(() => {
            return res.status(201).json({
                erro: false,
                mensagem: "Motorista cadastrado com sucesso!!",
                nome: dados.nome,
                email: dados.email
            });
        }).catch((error) => {
            console.error("Erro ao cadastrar motorista");
            return res.status(400).json({
                erro: true,
                mensagem: "Erro ao cadastrar motorista!"
            });
        });
    }else{
        return res.status(406).json({
            erro: true,
            mensagem: "Email já existe no banco de dados"
        });
    }
}


module.exports = {cadastromoto};