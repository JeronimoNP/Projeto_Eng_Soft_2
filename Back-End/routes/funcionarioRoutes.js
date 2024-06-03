const express = require('express');
const routes = express.Router();
const cors = require('cors');
const funcionarioController = require('../controllers/controlfuncionario.js');

routes.use(cors());


routes.post('/cadastro', (req, res) => {
    //puxando dados necessarios do front-end
    const dadoscadastro = req.body;

    //redirecionando para arquivo control para o tratamento de dados é cadastro
    motoristaController.cadastromoto(dadoscadastro, res); 
});

routes.get('/listar', (req, res) => {
    const empresaId = {
        "token": req.query.token
    } // Obtem o empresaId da consulta na URL
    console.log(empresaId);
    funcionarioController.listarfuncionario(empresaId, res);
});

routes.post('/editar', (req, res) => {
    const dados = req.body;
    funcionarioController.editarfuncionario(dados, res);
});

routes.delete('/deletar', (req, res) => {
    const dados = req.body;
    funcionarioController.deletarfuncionario(dados, res);
});


module.exports = routes;