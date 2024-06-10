const express = require('express');
const routes = express.Router();
const cors = require('cors');
const servicoController = require('../controllers/controlservico.js');

routes.use(cors());

routes.post('/cadastro', (req, res) => {
    const dadosCadastro = req.body;
    servicoController.cadastrarServico(dadosCadastro, res);
});

routes.get('/listar', (req, res) => {
    const token = req.body;//{ "token": req.token };
    servicoController.listarServicos(token, res);
});

routes.post('/editar', (req, res) => {
    const dados = req.body;
    servicoController.editarServico(dados, res);
});

routes.delete('/deletar', (req, res) => {
    const dados = req.body;
    servicoController.deletarServico(dados, res);
});

module.exports = routes;
