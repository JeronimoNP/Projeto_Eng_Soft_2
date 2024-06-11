const express = require('express');
const routes = express.Router();
const cors = require('cors');
const multer = require('multer');
const fs = require('fs'); // Importe o módulo fs
const motoristaController = require('../controllers/controlmotorista.js');

routes.use(cors());

const upload = multer({ dest: 'uploads/'});

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
    //puxando dados necessarios do front-end
    

    //condição para verificar se não está passando um indefinido
    
    //redirecionando para arquivo control para o tratamento de dados é cadastro
    
});

routes.get('/listar', (req, res) => {
    //obtem o token
    const token = {
        "token": req.query.token
    } // Obtem o empresaId da consulta na URL
    motoristaController.listarmotorista(token, res);
});

routes.post('/editar', upload.single('imagem'), (req, res) => {

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
    
        try{
            const imagemB = fs.readFileSync(imagempath);
           
            
            //passagem para o controler para salvamento
            motoristaController.editarmotorista(dadoscadastro, imagemB, res); 
            fs.unlinkSync(imagempath);
        }catch (error){
            console.log(error);
            return res.status(500).json({
                erro: true,
                
                info: "erro na passagem de dados"
            })
        }

    // const dados = req.body;
    // motoristaController.editarmotorista(dados, res);
});

routes.delete('/deletar', (req, res) => {
    const dados = req.body;
    // dados.token = req.body.token;
    // dados.email = req.body.email
    console.log(dados);
    motoristaController.deletarmotorista(dados, res);
});


module.exports = routes;