const express = require('express');
const routes = express.Router();
const cors = require('cors');
const equipeController = require('../controllers/controlequipe.js');



routes.use(cors());

routes.post('/cadastro', (req, res) =>{
    //puxando dados do front
    const dadoscadastro = req.body;
    //condição para verificar se não está passando um indefinido

    //redirecionando para arquivo control para o tratamento de dados e cadastro
    equipeController.cadastroequipe(dadoscadastro, res);
});

routes.get('/listar', (req, res) => {
    //obtem o token
    const token = {
        "token": req.query.token
    }
    equipeController.listaequipe(token, res);
});

routes.post('/editar', (req, res) => {
    const dados = req.body;
    equipeController.editarEquipe(dados, res);
});

routes.delete('/deletar', (req, res) => {
    const dados = req.body;
    equipeController.deletarfuncionario(dados, res);
});

routes.get('/dashboard', (req, res) => {
    //obtem o token
    const token = {
        "token": req.query.token
    } // Obtem o empresaId da consulta na URL

    //passa os dados para o controller para tratar o token
    equipeController.listarEquipedashboard(token, res);
})

module.exports = routes;