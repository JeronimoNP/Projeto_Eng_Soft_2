const Servico = require('../models/Servico.js');
const jwt = require('jsonwebtoken');

function verificarCampos(dados) {
    let errors = [];

    if (!dados.nome || typeof dados.nome !== 'string') {
        errors.push("Nome inválido");
    }

    if (!dados.dataBusca || isNaN(Date.parse(dados.dataBusca))) {
        errors.push("Data da busca inválida");
    }

    if (!dados.horarioBusca || !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(dados.horarioBusca)) {
        errors.push("Horário da busca inválido");
    }

    if (!dados.enderecoBusca || typeof dados.enderecoBusca !== 'string') {
        errors.push("Endereço da busca inválido");
    }

    if (!dados.cepBusca || !/^[0-9]{5}-[0-9]{3}$/.test(dados.cepBusca)) {
        errors.push("CEP da busca inválido");
    }

    if (!dados.enderecoEntrega || typeof dados.enderecoEntrega !== 'string') {
        errors.push("Endereço da entrega inválido");
    }

    if (!dados.cepEntrega || !/^[0-9]{5}-[0-9]{3}$/.test(dados.cepEntrega)) {
        errors.push("CEP da entrega inválido");
    }

    if (dados.paradas && typeof dados.paradas !== 'string') {
        errors.push("Paradas inválidas");
    }

    if (!dados.km || typeof dados.km !== 'number' || dados.km <= 0) {
        errors.push("KM inválido");
    }

    if (!dados.transporte || typeof dados.transporte !== 'string') {
        errors.push("Informação do transporte inválida");
    }

    return errors;
}

async function buscarServicoBd(id, idEmpresa) {
    try {
        const servico = await Servico.findOne({
            where: { id: id, empresaId: idEmpresa }
        });
        return servico;
    } catch (error) {
        console.error('Erro ao buscar serviço:', error);
        throw new Error('Erro ao buscar serviço');
    }
}


async function listarServicosBd(empresaId) {
    if(empresaId.dashboard === false){
        try {
            return await Servico.findAll({
                attributes: ['id', 'nome', 'dataBusca', 'horarioBusca', 'enderecoBusca', 'cepBusca', 'enderecoEntrega', 'cepEntrega', 'paradas', 'km', 'transporte'],
                where: { empresaId: empresaId.empresaId }
            });
        } catch (error) {
            console.error('Erro ao listar serviços:', error);
            throw error;
        }
    }else{
        try {
            const amount = await Servico.count({
                where: {empresaId: empresaId.empresaId}
            });
            return amount;
        } catch (error) {
            console.error('Erro ao contar servicos no bd');
            throw error;
        }
    }
}

async function cadastrarServicoBd(dados, decoded, res) {
    try {
        await Servico.create({
            nome: dados.nome,
            dataBusca: dados.dataBusca,
            horarioBusca: dados.horarioBusca,
            enderecoBusca: dados.enderecoBusca,
            cepBusca: dados.cepBusca,
            enderecoEntrega: dados.enderecoEntrega,
            cepEntrega: dados.cepEntrega,
            paradas: dados.paradas,
            km: dados.km,
            transporte: dados.transporte,
            empresaId: decoded.empresaId
        });

        return res.status(201).json({ erro: false, mensagem: "Serviço cadastrado com sucesso" });
    } catch (error) {
        console.error("Erro ao cadastrar serviço:", error);
        return res.status(400).json({ erro: true, mensagem: "Erro ao cadastrar serviço" });
    }
}

async function editarServicoBd(dados, decoded, res) {
    try {
        const servico = await buscarServicoBd(dados.id, decoded.empresaId);

        if (!servico) {
            return res.status(404).json({ erro: true, mensagem: "Serviço não encontrado" });
        }

        await Servico.update(dados, {
            where: { id: dados.id, empresaId: decoded.empresaId }
        });

        return res.status(200).json({ erro: false, mensagem: "Serviço editado com sucesso" });
    } catch (error) {
        console.error("Erro ao editar serviço:", error);
        return res.status(400).json({ erro: true, mensagem: "Erro ao editar serviço" });
    }
}

async function deletarServicoBd(dados, decoded, res) {
    try {
        const servico = await buscarServicoBd(dados.id, decoded.empresaId);

        if (!servico) {
            return res.status(404).json({ erro: true, mensagem: "Serviço não encontrado" });
        }

        await Servico.destroy({
            where: { id: dados.id, empresaId: decoded.empresaId }
        });

        return res.status(200).json({ erro: false, mensagem: "Serviço deletado com sucesso" });
    } catch (error) {
        console.error("Erro ao deletar serviço:", error);
        return res.status(400).json({ erro: true, mensagem: "Erro ao deletar serviço" });
    }
}

async function decodificarToken(dados, senhatoken) {
    try {
        return await jwt.verify(dados.token, senhatoken);
    } catch (error) {
        return "erro";
    }
}

module.exports = {
    verificarCampos,
    buscarServicoBd,
    listarServicosBd,
    cadastrarServicoBd,
    editarServicoBd,
    deletarServicoBd,
    decodificarToken
};

