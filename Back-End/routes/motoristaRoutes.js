const express = require('express');
const routes = express.Router();
const motoristaController = require('../controllers/controlmotorista.js');


routes.post('/cadastro', (req, res) => {
    
    //puxando dados necessarios do front-end
    const dadoscadastro = {nome, celular, cnh, cpf, endereco} = req.body;

    //redirecionando para arquivo control para o tratamento de dados é salvamento
    const statuscad = motoristaController.cadastromoto(dadoscadastro); 

    //condição para verificar se o cadastro foi bem sucedido;
    if(statuscad === 1){
        console.log("Erro ao cadastrar. Erro 500");//reportando erro no terminal
        return res.status(500).json({   //retornando protocola http
            erro: true,
            mensagem: "Erro interno no servidor, contate o administrador"
        });
    }else{
        return res.status(200).json({
            erro: false,
            mensagem: "Cadastro motorista concluido com sucesso!"
        });
    }
});

module.exports = routes;