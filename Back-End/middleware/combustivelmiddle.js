const { isNumberObject } = require('util/types');
const CombustivelBd = require('../models/Combustivel.js');
const empresas = require('./models/Empresa.js');
const carroBd = require('../models/Veiculo.js');
const motoristadb = require('../models/Motorista.js');
const jwt = require('jsonwebtoken');

//verificar se valor está de acordo
    async function verificarValor(valor){
        if(isNumberObject(valor.valor)){
            return true;
        }else{
            return false;
        }
    }

//verificar se o carro existe no bd
    async function verificarCarro(valor, res){
        try {
            // Buscar o motorista pelo e-mail e pelo ID da empresa
            const carro = await carroBd.findOne({
                where: { 
                    id: valor.idcarro
                },
                include: [{
                    model: empresas,
                    where: { id: valor.empresaId }
                }]
            });

            if(carro == null){
                return false
            }
            
            return carro; // Retorna o motorista encontrado ou não

        } catch (error) {//Erro interno ao encontrar o motorista
            console.error('Erro ao buscar motorista:', error);
            throw new Error('Erro ao buscar motorista');
        }
    }

//verificar se o motorista existe no bd
    async function verficarMotorista(dados){
        try {
            // Buscar o motorista pelo e-mail e pelo ID da empresa
            const motorista = await motoristadb.findOne({
                where: { 
                    id: dados.idmotorista
                },
                include: [{
                    model: empresas,
                    where: { id: dados.empresaId }
                }]
            });
            if(motorista == null){
                return false;
            }
            return motorista; // Retorna o motorista encontrado ou não

        } catch (error) {//Erro interno ao encontrar o motorista
            console.error('Erro ao buscar motorista:', error);
            throw new Error('Erro ao buscar motorista');
        }
    }

//função para decodificar token
    async function decodetoken(dados, senhatoken){
        try{
            const decoded = await jwt.verify(dados.token, senhatoken);
            return decoded;
        }catch(error){
            return decoded = "erro";
        }
    };

//função para cadastrar combustivel no bd
    async function cadastrarcombustivelbd(dados, emailexiste, decoded,  res){

            await CombustivelBd.create({
                valor: dados.valor,
                idcarro: dados.idcarro,
                idmotorista: dados.idmotorista,
                km: dados.km,
                empresaId: decoded.empresaId//token
            }).then(() => {
                return res.status(201).json({
                    erro: false,
                    mensagem: "combustivel cadastrado com sucesso!!",
                    nome: dados.nome,
                    email: dados.email
                });
            }).catch((error) => { // Adicione o parâmetro de erro aqui para poder capturar e exibir a mensagem de erro
                console.error("Erro ao cadastrar combustivel:", error); // Exibir o erro no console para depuração
                return res.status(400).json({
                    erro: true,
                    mensagem: "Erro ao cadastrar combustivel!"
                });
            });
    }

//função para listar combustiveis do bd
    async function listarcombustivelbd(empresaId) {

        try {
            let listacombustivel = await CombustivelBd.findAll({
                attributes: ['id', 'valor', 'idcarro', 'idmotorista', 'km'],
                where: { empresaId: empresaId.empresaId}
            }); 
            return listacombustivel;      //retornar uma lista com os motoristas cadastrados

        } catch (error) {
            console.error('Erro ao listar combustivel do banco de dados:', error);
            throw error; // Lança o erro para ser tratado onde a função for chamada
        }
        
    };



    module.exports = {
        verificarValor,
        verificarCarro,
        verficarMotorista,
        decodetoken,
        cadastrarcombustivelbd,
        listarcombustivelbd
    }