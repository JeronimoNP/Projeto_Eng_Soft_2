const express = require('express');
const routes = express.Router();
const motoristaController = require('../controllers/controlmotorista.js');


routes.post('/cadastro', (req, res) => {
    
    //puxando dados necessarios do front-end
    const dadoscadastro = req.body;

    //redirecionando para arquivo control para o tratamento de dados é cadastro
    motoristaController.cadastromoto(dadoscadastro, res); 


});

module.exports = routes;