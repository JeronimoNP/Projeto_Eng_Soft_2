const express = require('express');
const routes = express.Router();
const cors = require('cors');
const motoristaController = require('../controllers/controlservico.js');

routes.use(cors());

routes.post('./cadastro', (req, res) => {

    //puxando dados necessarios do front-end
    const dadoscadastro = req.body;


    //redirecionando para arquivo
})