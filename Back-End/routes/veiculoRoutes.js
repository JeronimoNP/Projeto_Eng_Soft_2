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
    //obtem o token
    const token = {
        "token": req.query.token
    } // Obtem o empresaId da consulta na URL
    
    //envia para o controle
    veiculoController.listarveiculo(token, res);
});

routes.post('/editar', upload.single('imagem'), async (req, res) => {

    //puxando dados necessarios do front-end
    const dadoscadastro = req.body;

    //verificando se tem dados de imagem e coloca no const se não null
    const imagem = req.file ? req.file.buffer : null;

    //inserindo dados imagem no campo imagem se tiver se não coloca null
    dadoscadastro.imagem = imagem;

    //condição para verificar se o campo imagem e null
    if(dadoscadastro.imagem === null){
        //deletando campo
        delete dadoscadastro.imagem;
    }

    //enviando para controller
    veiculoController.editarveiculo(dadoscadastro, res);
});

routes.delete('/deletar', (req, res) => {

    //puxando dados da requisição
    const dados = req.body;

    //enviando para controller
    veiculoController.deletarveiculo(dados, res);
});

routes.get('/dashboard', (req, res) => {
    //obtem o token
    const token = {
        "token": req.query.token
    } // Obtem o empresaId da consulta na URL
    console.log("passei por aqui");
    //passa os dados para o controller para tratar o token
    veiculoController.listarVeiculoDashboard(token, res);
})

module.exports = routes;