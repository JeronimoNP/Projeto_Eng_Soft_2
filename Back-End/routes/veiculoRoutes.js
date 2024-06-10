const express = require('express');
const routes = express.Router();
const multer = require('multer');
const veiculoController = require('../controllers/controlveiculo.js');

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

routes.post('/cadastro', upload.single('imagem'), async (req, res) => {
    
    //puxando dados necessarios do front-end
    const dadoscadastro = req.body;
    const imagem = req.file ? req.file.buffer : null;
    dadoscadastro.imagem = imagem;
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