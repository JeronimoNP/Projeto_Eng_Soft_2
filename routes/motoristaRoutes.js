const express = require('express');
const routes = express.Router();
const motoristaController = require('../controllers/controlmotorista.js');


routes.post('/cadastro', (res, req) => {
    motoristaController();  
});

module.exports = routes;