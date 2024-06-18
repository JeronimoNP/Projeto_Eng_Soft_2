const Equipedb = require('../models/Equipe.js');
const empresas = require('../models/Empresa.js');
const jwt = require('jsonwebtoken');

//verificar se o dominio do gmail está correto
    function verificaemail(email){
        const dominio = /^[a-zA-Z0-9.-]+@gmail.com$/;
        const validade = dominio.test(email);
        return validade;
    }

//verifirar se o telefone tem os 11 numeros
    function verificatelefone(celular){
        const numero = /^[0-9]{9}$/;
        const validade = !numero.test(celular);


        if(validade === true){
            const quantidadenumber = celular.toString().length;
            if(quantidadenumber != 11){
                return false;
            }
        }
        return validade;
    }

//verificar se tem os 14 numeros de cpf é que não contenha string
    function verificacpf(cpf){
        const numero = /^[0-9]{9}$/;
        const validade = !numero.test(cpf);

        if(validade === true){
            const quantidadenumber = cpf.toString().length;
            if(quantidadenumber != 11){
                return false;
            }
        }
        return validade;
    }

//buscar email no banco de dados para validade se já existe o email cadastrado
    async function buscaremailbd(email, idEmpresa) {
        try {
            // Buscar o motorista pelo e-mail e pelo ID da empresa
            const motorista = await Equipedb.findOne({
                where: { 
                    email: email 
                },
                include: [{
                    model: empresas,
                    where: { id: idEmpresa }
                }]
            });
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

    async function cadastrarequipebd(dados, emailexiste, decoded, res){
        if(!emailexiste){

            await Equipedb.create({
                nome: dados.nome,
                email: dados.email,
                cpf: dados.cpf,
                celular: dados.celular,
                endereco: dados.endereco,
                sexo:dados.sexo,
                login: dados.login,
                senha: dados.senha,
                funcao: dados.funcao,
                empresaId: decoded.empresaId
        }).then(() => {
            return res.status(201).json({
                erro: false,
                mensagem: "usuário cadastrado com sucesso!!",
                nome: dados.nome,
                email: dados.email
            });
        }).catch((error) => { // Adicione o parâmetro de erro aqui para poder capturar e exibir a mensagem de erro
                console.error("Erro ao cadastrar usuário:", error); // Exibir o erro no console para depuração
                return res.status(400).json({
                    erro: true,
                    mensagem: "Erro ao cadastrar usuário!"
                });
            });
        } else {
            return res.status(406).json({
                erro: true,
                menagem: "Erro ao cadastrar equipe!, erro no tratamento de dados api ou bd"
            });
        }
    }

//função para listar as equipes cadastradas no db
    async function listarequipedb(empresaId){
        if(empresaId.dashboard === false){
            try {
                let listamotorista = await Equipedb.findAll({
                    attributes: ['id', 'nome', 'email', 'cpf', 'celular', 'endereco', 'sexo', 'login', 'senha', 'funcao'],
                    where: { empresaId: empresaId.empresaId }
                }); 
                return listamotorista;      //retornar uma lista com os motoristas cadastrados
        
            } catch (error) {
                console.error('Erro ao listar motoristas do banco de dados:', error);
                throw error; // Lança o erro para ser tratado onde a função for chamada
            }
        }else{
            try {
                const amount = await Equipedb.count({
                    where: {empresaId: empresaId.empresaId}
                });
                return amount;
            } catch (error) {
                console.error('Erro ao contar equipe no bd');
                throw error;
            }
        }
    };

    async function editarEquipemiddle(dados, id, res){
        const empresaId = id.empresaId;

        const emailbd = await buscaremailbd(dados.email, id.empresaId);

        if(!emailbd){
            return res.status(404).json({
                erro: true,
                info: "Equipe não encontrada no bd"
            })
        }

        await Equipedb.update(dados, {
            where: { email: dados.email, empresaId: empresaId }
        }).then(() => {
    
            return res.status(200).json({
                erro: false,
                info: "motorista editado com sucessor"
            })
        }).catch(error => {
            return res.status(400).json({
                erro: true,
                info: "erro ao editar motorista",
                "console log": error
            })
        });
    };

//função para deletar funcionario do banco de dados.
    async function deletarfuncionariodb(dados, empresaId, res){
        
        const emailbd = await buscaremailbd(dados.email, empresaId.empresaId);

        if(!emailbd){
            return res.status(404).json({
                erro: true,
                info: "Equipe não encontrada no bd"
            })
        }
        console.log("deletando",empresaId);
        await Equipedb.destroy({
                where: { email: dados.email, empresaId: empresaId.empresaId }
            }).then(() => {
                return res.status(200).json({
                    erro: false,
                    info: "funcionario excluido com sucesso"
                })
            }).catch(error =>{
                return res.status(400).json({
                    erro: true,
                    info: "erro ao excluir funcionario",
                    "console log": error
                })
            })
    };

module.exports = {
    verificaemail,
    verificatelefone,
    verificacpf,
    buscaremailbd,
    decodetoken,
    cadastrarequipebd,
    listarequipedb,
    editarEquipemiddle,
    deletarfuncionariodb
}