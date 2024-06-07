const empresas = require('../models/Empresa.js');
const jwt = require('jsonwebtoken');

//verificar se a data está correta
    function verificaData(data){
        //data no formato 2020-01-02
        const date = new Date(data);
        
        return isNaN(date.getTime());
    }

    function verificahorario(data){
        
    }

    module.exports = {
        verificaData
    }
