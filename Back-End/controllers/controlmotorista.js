const {verificaemail, verificacpf, verificatelefone, buscaremailbd, listarmotoristabd} = require('../middleware/motoristamiddle.js')
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
    const emailexiste = await buscaremailbd(dados.email, dados.empresaId);

    if (!emailexiste) {
        // Adicione um console.log aqui para verificar os dados antes de criar o usuário
        console.log("Dados do usuário:", dados);
        
        await Motoristadb.create({
            imagem: dados.imagem,
            nome: dados.nome,
            email: dados.email,
            cnh: dados.cnh,
            cpf: dados.cpf,
            endereco: dados.endereco, // Corrigido para endereco
            celular: dados.celular,
            ativo: dados.ativo,
            empresaId: dados.empresaId
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

async function listarmotorista(empresaId, res){
    const listaMotoristas = await listarmotoristabd(empresaId.empresaId);
    return res.status(200).json(listaMotoristas);


    // const listaencontrada = await listarmotoristabd(empresaId);

    // if(listaencontrada === NULL){
    //     return res.status(404).json({
    //         erro: true,
    //         info: "Erro ao encontrar lista de motorista vinculado a empresa"
    //     });
    // }
    // return res.status(200).json({
    //     lista: listaencontrada
    // });
};



module.exports = {
    cadastromoto,
    listarmotorista
};