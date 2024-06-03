const Funcionario = require('../models/Funcionario.js');
const empresas = require('../models/Empresa.js');
const jwt = require('jsonwebtoken');

//verificar se o dominio do gmail está correto
function verificaemail(email){
    const dominio = /^[a-zA-Z0-9.-]+@gmail.com$/;
    const validade = dominio.test(email);
    return validade;
}

//verifirar se o telefone tem os 11 numeros
function verificatelefone(celular){
    const numero = /^[0-9]{9}$/;
    const validade = !numero.test(celular);

    if(validade === true){
        const quantidadenumber = celular.toString().length;
        if(quantidadenumber != 11){
            return false;
        }
    }
    return validade;
}

//verificar se tem os 14 numeros de cpf é que não contenha string
function verificacpf(cpf){
    const numero = /^[0-9]{9}$/;
    const validade = !numero.test(cpf);

    if(validade === true){
        const quantidadenumber = cpf.toString().length;
        if(quantidadenumber != 11){
            return false;
        }
    }
    return validade;
}

//buscar email no banco de dados para validade se já existe o email cadastrado
async function buscaremailbd(email, idEmpresa) {
    try {
        // Buscar o funcionario pelo e-mail e pelo ID da empresa
        const funcionario = await Funcionario.findOne({
            where: { 
                email: email 
            },
            include: [{
                model: empresas,
                where: { id: idEmpresa }
            }]
        });
        return funcionario; // Retorna o funcionario encontrado ou não

    } catch (error) {//Erro interno ao encontrar o funcionario
        console.error('Erro ao buscar funcionario:', error);
        throw new Error('Erro ao buscar funcionario');
    }
}

//função para decodificar token
async function decodetoken(dados, senhatoken){
    try{
        const decoded = await jwt.verify(dados.token, senhatoken);
        return decoded;
    }catch(error){
        return decoded = "erro";
    }
};

//função para cadastrar funcionario
async function cadastrarfuncionariobd(dados, emailexiste, decoded,  res){
    if (!emailexiste) {
        
        await Funcionario.create({
            imagem: dados.imagem,
            nome: dados.nome,
            email: dados.email,
            
            cpf: dados.cpf,
            endereco: dados.endereco, // Corrigido para endereco
            celular: dados.celular,
            ativo: dados.ativo,
            empresaId: decoded.empresaId//token
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
}

//função para listar os funcionarios cadastrados no db
async function listarfuncionariobd(empresaId) {
    try {
        let listafuncionario = await Funcionario.findAll({
            attributes: ['imagem', 'id', 'nome', 'email', 'celular', 'ativo', ],
            where: { empresaId: empresaId }
        }); 
        return listafuncionario;      //retornar uma lista com os funcionarios cadastrados

    } catch (error) {
        console.error('Erro ao listar motoristas do banco de dados:', error);
        throw error; // Lança o erro para ser tratado onde a função for chamada
    }
};


//função para editar dados de funcionario
async function editarfuncionariocmiddle(dados, id, res){
    
    const empresaId = id.empresaId;

    await Funcionario.update(dados, {
        where: { email: dados.email, empresaId: empresaId }

    }).then(() => {
    
        return res.status(200).json({
            erro: false,
            info: "funcionario editado com sucessor"
        })
    }).catch(error => {
        return res.status(400).json({
            erro: true,
            info: "erro ao editar funcionario",
            "console log": error
        })
    });
};


//função para deletar funcionario do banco de dados.
async function deletarfuncionariodb(dados, empresaId, res){
    
await Funcionario.destroy({
        where: { email: dados.email, empresaId: empresaId.empresaId }
    }).then(() => {
        return res.status(200).json({
            erro: false,
            info: "funcionario excluido com sucesso"
        })
    }).catch(error =>{
        return res.status(400).json({
            erro: true,
            info: "erro ao excluir funcionario",
            "console log": error
        })
    })
}

module.exports = {
    verificaemail,
    verificatelefone,
    verificacpf,
    buscaremailbd,
    listarfuncionariobd,
    cadastrarfuncionariobd,
    editarfuncionariocmiddle,
    deletarfuncionariodb,
    decodetoken
}