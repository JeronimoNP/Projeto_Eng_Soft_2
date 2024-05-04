const express = require('express');
const routes = express.Router();
const cors = require('cors');
const controlempresa = require('../controllers/controlempresa.js');

routes.use(cors());//3


routes.post('/cadastro', (req, res) =>{
    //puxando dados cadastrais da empresa
    const dadosempresa = req.body;

    //redirecionando para controllers para o tratamento de dados.
    controlempresa.cadastroempresa(dadosempresa, res);
});

routes.get('/login', (req, res) => {
    //puxando dados cadastrais da empresa
    const login = req.body;

    //redirecionando para controllers para o tratamento de dados.
    controlempresa.loginempresa(login, res);
});

// routes.delete('/deleteempresa', (req, res) =>{

// });

module.exports = routes;