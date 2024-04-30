const Motorista = require('../models/Motorista.js');
const empresas = require('../models/Empresa.js');
const { where } = require('sequelize');

function verificaemail(email){
    const dominio = /^[a-zA-Z0-9.-]+@gmail.com$/;
    const validade = dominio.test(email);
    return validade;
}

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

        return motorista; // Retorna o motorista encontrado
    } catch (error) {
        console.error('Erro ao buscar motorista:', error);
        throw new Error('Erro ao buscar motorista');
    }
}

async function listarmotoristabd(empresaId) {
    try {
        let listamotorista = await Motorista.findAll({
            attributes: ['imagem', 'nome', 'email', 'celular', 'ativo'],
            where: { empresaId: empresaId }
        }); 

        return listamotorista;
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