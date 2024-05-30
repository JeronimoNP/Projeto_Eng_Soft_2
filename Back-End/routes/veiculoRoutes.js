const express = require('express');
const routes = express.Router();
const veiculoController = require('../controllers/controlveiculo.js');


routes.post('/cadastro', (req, res) => {
    //puxando dados necessarios do front-end
    const dadoscadastro = req.body;

    //redirecionando para arquivo control para o tratamento de dados é cadastro
    veiculoController.cadastroveic(dadoscadastro, res); 
});

routes.get('/listar', (req, res) => {
    const empresaId = req.body; // Obtem o empresaId da consulta na URL
    veiculoController.listarmotorista(empresaId, res);
});

routes.post('/editar', (req, res) => {
    const dados = req.body;
    veiculoController.editarveiculo(dados, res);
});

routes.delete('/deletar', (req, res) => {
    const dados = req.body;
    veiculoController.deletarveiculo(dados, res);
});


module.exports = routes;