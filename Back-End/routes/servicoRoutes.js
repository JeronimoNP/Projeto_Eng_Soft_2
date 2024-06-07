const express = require('express');
const routes = express.Router();
const cors = require('cors');
const servicoController = require('../controllers/controlservico.js');

routes.use(cors());

routes.post('./cadastro', (req, res) => {

    //puxando dados necessarios do front-end
    const dadoscadastro = req.body;


    //redirecionando para arquivo
    servicoController.cadastroserve(dadoscadastro, res);
})

module.exports = routes;