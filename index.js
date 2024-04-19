/*
* Tecnologias utilizadas
    express         (para criação da api que sera consumida pelo front)
    jsonwebtoken    (para adição de camanda de criptografia)
    Sequelize       (para linkagem do back com o bd)

* Escorpo de organização de pastas

    principal/
    ├── index.js
    ├── controllers/
    │   ├── empresaController.js
    │   ├── usuarioController.js
    │   ├── motoristaController.js
    │   ├── veiculoController.js
    │   └── autenticacaoController.js
    ├── routes/
    │   ├── empresaRoutes.js
    │   ├── usuarioRoutes.js
    │   ├── motoristaRoutes.js
    │   ├── veiculoRoutes.js
    │   └── autenticacaoRoutes.js
    ├── models/
    │   ├── empresaModel.js
    │   ├── usuarioModel.js
    │   ├── motoristaModel.js
    │   └── veiculoModel.js
    └── middleware/
    └── autenticacaoMiddleware.js

* Explicação da Estrutura:
-    index.js: Este é o arquivo principal da sua aplicação, onde o
servidor Express é configurado e iniciado.

-    controllers/: Esta pasta conterá os controladores responsáveis
por lidar com a lógica de negócios da sua aplicação. Cada
controlador será responsável por uma entidade específica do seu 
sistema, como empresa, usuário, motorista, veículo, etc.

-    routes/: Aqui estarão definidas as rotas da sua API. Cada 
arquivo de rota será responsável por associar as requisições HTTP 
aos métodos dos respectivos controladores.

-    models/: Esta pasta conterá os modelos de dados da sua aplicação. 
Cada arquivo de modelo definirá a estrutura e o comportamento das 
entidades do seu sistema, como empresa, usuário, motorista, veículo, 
etc.

-    middleware/: Esta pasta conterá os middlewares da sua aplicação. 
Por exemplo, o middleware de autenticação (autenticacaoMiddleware.js)
pode ser usado para verificar se o usuário está autenticado antes de 
permitir o acesso a certas rotas.


* modelo do banco de dados

    Dados de entrada:
        Nome:String
        Celular: String
        Cnh: int
        Cpf: int
        Endereço: string[50]
    Retorno: (true caso concluido com sucesso, false caso tenha erro)
*/

let express = require('express');
let api = express();
const cadastromotorista = require('./routes/motoristaRoutes.js');

//iniciação do codigo

api.use('/motorista', cadastromotorista);




api.listen(3000, () => {
    console.log('Servidor conectado!\nHost http://localhost:3000/');
});