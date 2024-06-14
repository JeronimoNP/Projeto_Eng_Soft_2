const express = require('express');
const routes = express.Router();
const cors = require('cors');
const controlempresa = require('../controllers/controlempresa.js');

routes.use(cors());//3


routes.post('/cadastro', (req, res) =>{
    //puxando dados cadastrais da empresa
    const dadosempresa = req.body;
    console.log(req.body);
    //redirecionando para controllers para o tratamento de dados.
    controlempresa.cadastroempresa(dadosempresa, res);
});

routes.post('/login', (req, res) => {
    //pegando dados da requisição
    const login = req.body;
    
    //condição para verificar se não está passando um indefinido
    if(login.email === (undefined && '') && login.senha === (undefined && '')){
        res.status(203).json({
            erro: true,
            info: "dados indefinidos ou vazio", 
        });
    }

    //redirecionando para controllers para o tratamento de dados.
    controlempresa.loginempresa(login, res);
});

// routes.delete('/deleteempresa', (req, res) =>{

// });

module.exports = routes;