const express = require('express');
const routes = express.Router();
const cors = require('cors');
const motoristaController = require('../controllers/controlmotorista.js');

routes.use(cors());


routes.post('/cadastro', (req, res) => {

    //puxando dados necessarios do front-end
    const dadoscadastro = req.body;

    //condição para verificar se não está passando um indefinido
    
    //redirecionando para arquivo control para o tratamento de dados é cadastro
    motoristaController.cadastromoto(dadoscadastro, res); 
});

routes.get('/listar', (req, res) => {
    //obtem o token
    const token = {
        "token": req.query.token
    } // Obtem o empresaId da consulta na URL
    motoristaController.listarmotorista(token, res);
});

routes.post('/editar', (req, res) => {
    const dados = req.body;
    motoristaController.editarmotorista(dados, res);
});

routes.delete('/deletar', (req, res) => {
    const dados = req.body;
    motoristaController.deletarmotorista(dados, res);
});


module.exports = routes;