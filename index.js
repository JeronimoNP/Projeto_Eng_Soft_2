/*
    express         (para criação da api que sera consumida pelo front)
    jsonwebtoken    (para adição de camanda de criptografia)
    Sequelize       (para linkagem do back com o bd)
*/

/*
1-definir qual porta utilizar 
2-definir url da api
3-regras de entrada
*/

let express =require('express');
let api = express();


api.get('/', function(req, res){
    res.send('hellou world');

});

app.listen(3000)