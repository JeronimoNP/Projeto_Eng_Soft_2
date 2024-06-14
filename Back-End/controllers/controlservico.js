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

    //mudando regra de requisição de listar serviços
    tokenDecodificado.dashboard = false;

    //mandando dados para o middle
    const listaServicos = await listarServicosBd(tokenDecodificado);
    return res.status(200).json(listaServicos);
}

//Rota de listar serviços dashboard
async function listarServicoDashboard(token, res){
    //a variavel token2 é onde tera o descriptografia do token
   const token2 = await decodetoken(token, senhatoken);
   if(token2 === "erro"){
       return res.status(203).json({
           erro: true,
           info: "token invalido ou expirado"
       });
   }
   //mudando rota para dashboard
   token2.dashboard = true;
   
   //mandando dados para middleware
   const listaMotoristas = await listarServicosBd(token2);

   //retorna para a requisição
   return res.status(200).json(listaMotoristas);

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
    listarServicoDashboard,
    editarServico,
    deletarServico
};
