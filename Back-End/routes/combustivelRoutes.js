const express = require('express');
const routes = require.Router();
const cors = require('cors');
const combustivelController = require('../controllers/controlcombustivel.js');

//usando cors para poder ter a comunicação da requisição do front para a api
routes.use(cors());

//Rota de cadastro
routes.post('/cadastro', (req, res) => {

    //Verifique se o corpo da solicitação contém um objeto JSON
    if (req.body && typeof req.body === 'object') {
        // Verifique se há um campo "token" no corpo da solicitação
        if (req.body.token && Array.isArray(req.body.token)) {
            // Pegue apenas o primeiro token do array
            req.body.token = req.body.token[0];
        }
    }

    const dadoscadastro = req.body;

    try{
        //passagem para o controler para salvamento
        combustivelController.cadastro(dadoscadastro,  res); 
    }catch (error){
        console.log(error);
        return res.status(500).json({
            erro: true,
            info: "erro na passagem de dados"
        })
    }

});

routes.get('/listar', (req, res) => {
    //obtem o token
    const token = {
        "token": req.query.token
    }

    //passa os dados para o controller para tratar os dados
    combustivelController.listarcombustivel(token, res);
});

module.exports = routes;