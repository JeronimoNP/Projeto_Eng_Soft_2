const Motorista = require('../models/Motorista.js');
const empresas = require('../models/Empresa.js');

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
        if(quantidadenumber != 14){
            return false;
        }
    }
    return validade;
}



//buscar email no banco de dados para validade se já existe o email cadastrado
async function buscaremailbd(email, idEmpresa) {
    try {
        // Buscar o motorista pelo e-mail e pelo ID da empresa
        const motorista = await Motorista.findOne({
            where: { 
                email: email 
            },
            include: [{
                model: empresas,
                where: { id: idEmpresa }
            }]
        });
        return motorista; // Retorna o motorista encontrado ou não

    } catch (error) {//Erro interno ao encontrar o motorista
        console.error('Erro ao buscar motorista:', error);
        throw new Error('Erro ao buscar motorista');
    }
}

//função para listar os motoristar cadastrados no db
async function listarmotoristabd(empresaId) {
    try {
        let listamotorista = await Motorista.findAll({
            attributes: ['imagem', 'nome', 'email', 'celular', 'ativo'],
            where: { empresaId: empresaId }
        }); 
        return listamotorista;      //retornar uma lista com os motoristas cadastrados

    } catch (error) {
        console.error('Erro ao listar motoristas do banco de dados:', error);
        throw error; // Lança o erro para ser tratado onde a função for chamada
    }
}

module.exports = {
    verificaemail,
    verificatelefone,
    verificacpf,
    buscaremailbd,
    listarmotoristabd
}