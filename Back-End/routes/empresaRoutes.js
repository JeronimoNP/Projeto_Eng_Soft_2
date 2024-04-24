const express = require('express');
const routes = express.Router();
const cadastroempresa1 = require('../controllers/controlempresa.js');

routes.post('/cadastro', (req, res) =>{
    //puxando dados cadastrais da empresa
    const dadosempresa =req.body;

    //redirecionando para controllers para o tratamento de dados, statuscad(status do cadastro, se foi bem sucedido ou não)
    const statuscad = cadastroempresa1.cadastroempresa(dadosempresa, res);
    

    //condição para verificar se o cadastro foi bem sucedido
    // if(statuscad === 1){
    //     console.log("Erro ao cadastrar empresa. Erro 500");
    //     return res.status(500).json({
    //         erro: true,
    //         mensagem: "Erro interno no servidor, contate o adminstrador"
    //     });
    // }else{
    //     return res.status(200).json({
    //         erro: false,
    //         mensagem: "Cadastro empresa concluido com sucesso!"
    //     });
    // }

    
});

routes.delete('/deleteempresa', (req, res) =>{

});

module.exports = routes;