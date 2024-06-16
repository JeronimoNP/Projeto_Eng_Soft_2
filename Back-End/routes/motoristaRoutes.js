const express = require('express');
const routes = express.Router();
const cors = require('cors');
const multer = require('multer');
const fs = require('fs'); // Importe o módulo fs
const motoristaController = require('../controllers/controlmotorista.js');

//usando cors para poder ter a comunicação da requisição do front para a api
routes.use(cors());

//salvando temporariamente o arquivo imagem enviada do front
const upload = multer({ dest: 'uploads/'});

//Rota de cadastro
routes.post('/cadastro', upload.single('imagem'), (req, res) => {
    
    // Verifique se o corpo da solicitação contém um objeto JSON
    if (req.body && typeof req.body === 'object') {
        // Verifique se há um campo "token" no corpo da solicitação
        if (req.body.token && Array.isArray(req.body.token)) {
            // Pegue apenas o primeiro token do array
            req.body.token = req.body.token[0];
        }
    }

    const dadoscadastro = req.body;
    const imagempath = req.file.path;

    //tratando dados imagem
    try{
        const imagemB = fs.readFileSync(imagempath);
        
        //passagem para o controler para salvamento
        motoristaController.cadastromoto(dadoscadastro, imagemB, res); 
        fs.unlinkSync(imagempath);
    }catch (error){
        console.log(error);
        return res.status(500).json({
            erro: true,
            info: "erro na passagem de dados"
        })
    }
    
});

//Rota de listar
routes.get('/listar', (req, res) => {

    //obtem o token
    const token = {
        "token": req.query.token
    } // Obtem o empresaId da consulta na URL

    //passa os dados para o controller para tratar o token
    motoristaController.listarmotorista(token, res);
});

//Rota de editar motorista
routes.post('/editar', upload.single('imagem'), (req, res) => {

        // Verifique se o corpo da solicitação contém um objeto JSON
        if (req.body && typeof req.body === 'object') {
            // Verifique se há um campo "token" no corpo da solicitação
            if (req.body.token && Array.isArray(req.body.token)) {
                // Pegue apenas o primeiro token do array
                req.body.token = req.body.token[0];
            }
        }
        //salvando dados do front
        const dadoscadastro = req.body;
        //salvando imagem
        const imagempath = req.file.path;
        
        //verificando imagem path é enviando para controller
        try{
            //lendo arquivo imagem
            const imagemB = fs.readFileSync(imagempath);
           
            //passagem para o controler para salvamento
            motoristaController.editarmotorista(dadoscadastro, imagemB, res); 

            //apaga da variavel os dados da imagem depois de salvo
            fs.unlinkSync(imagempath);
        }catch (error){
            console.log(error);
            return res.status(500).json({
                erro: true,
                info: "erro na passagem de dados"
            })
        }

});

//Rota de deletar motorista
routes.delete('/deletar', (req, res) => {
    
    //pegando dados do front
    const dados = req.body;
    
    //passando parra controller
    motoristaController.deletarmotorista(dados, res);
});

routes.get('/dashboard', (req, res) => {
        //obtem o token
        const token = {
            "token": req.query.token
        } // Obtem o empresaId da consulta na URL
    
        //passa os dados para o controller para tratar o token
        motoristaController.listarmotoristadashboard(token, res);
})


module.exports = routes;