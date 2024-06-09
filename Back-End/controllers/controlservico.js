const { verificarCampos, buscarServicoBd, listarServicosBd, cadastrarServicoBd, editarServicoBd, deletarServicoBd, decodificarToken } = require('../middleware/servicomiddle.js');
const senhatoken = process.env.KEYTOKENSECRET;

async function cadastrarServico(dados, res) {
    const errors = verificarCampos(dados);

    if (errors.length > 0) {
        return res.status(400).json({ erro: true, info: errors });
    }

    const tokenDecodificado = await decodificarToken(dados, senhatoken);
    if (tokenDecodificado === "erro") {
        return res.status(403).json({ erro: true, info: "Token inválido ou expirado" });
    }

    await cadastrarServicoBd(dados, tokenDecodificado, res);
}

async function listarServicos(token, res) {
    const tokenDecodificado = await decodificarToken(token, senhatoken);
    console.log(tokenDecodificado);
    if (tokenDecodificado === "erro") {
        return res.status(403).json({ erro: true, info: "Token inválido ou expirado" });
    }

    const listaServicos = await listarServicosBd(tokenDecodificado.empresaId);
    return res.status(200).json(listaServicos);
}

async function editarServico(dados, res) {
    const errors = verificarCampos(dados);

    if (errors.length > 0) {
        return res.status(400).json({ erro: true, info: errors });
    }

    const tokenDecodificado = await decodificarToken(dados, senhatoken);
    if (tokenDecodificado === "erro") {
        return res.status(403).json({ erro: true, info: "Token inválido ou expirado" });
    }

    await editarServicoBd(dados, tokenDecodificado, res);
}

async function deletarServico(dados, res) {
    const tokenDecodificado = await decodificarToken(dados, senhatoken);
    if (tokenDecodificado === "erro") {
        return res.status(403).json({ erro: true, info: "Token inválido ou expirado" });
    }

    await deletarServicoBd(dados, tokenDecodificado, res);
}

module.exports = {
    cadastrarServico,
    listarServicos,
    editarServico,
    deletarServico
};
