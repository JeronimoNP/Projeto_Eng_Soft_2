const express = require('express');
const routes = express.Router();
const cors = require('cors');
const cadastroempresa1 = require('../controllers/controlempresa.js');

routes.use(cors());3


routes.post('/cadastro', (req, res) =>{
    //puxando dados cadastrais da empresa
    const dadosempresa =req.body;

    //redirecionando para controllers para o tratamento de dados, statuscad(status do cadastro, se foi bem sucedido ou não)
    cadastroempresa1.cadastroempresa(dadosempresa, res);


    
});

routes.delete('/deleteempresa', (req, res) =>{

});

module.exports = routes;