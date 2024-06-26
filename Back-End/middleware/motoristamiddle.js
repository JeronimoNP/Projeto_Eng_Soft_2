const Motorista = require('../models/Motorista.js');
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

//verificar se tem os 11 numeros de cpf é que não contenha string
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

//verificar se tem os 11 numeros da cnh é que não contenha string
    function verificacnh(cnh){
        const numero = /^[0-9]{9}$/;
        const validade = !numero.test(cnh);

        if(validade === true){
            const quantidadenumber = cnh.toString().length;
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
            const motorista = await Motorista.findOne({
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

//função para cadastrar motorista
    async function cadastrarmotoristabd(dados, emailexiste, decoded,  res){
        if (!emailexiste) {
            
            await Motorista.create({
                imagem: dados.imagem,
                nome: dados.nome,
                email: dados.email,
                cnh: dados.cnh,
                cpf: dados.cpf,
                endereco: dados.endereco, // Corrigido para endereco
                celular: dados.celular,
                ativo: dados.ativo,
                empresaId: decoded.empresaId//token
            }).then(() => {
                return res.status(201).json({
                    erro: false,
                    mensagem: "Usuário motorista com sucesso!!",
                    nome: dados.nome,
                    email: dados.email
                });
            }).catch((error) => { // Adicione o parâmetro de erro aqui para poder capturar e exibir a mensagem de erro
                console.error("Erro ao cadastrar motorista:", error); // Exibir o erro no console para depuração
                return res.status(400).json({
                    erro: true,
                    mensagem: "Erro ao cadastrar motorista!"
                });
            });
        } else {
            return res.status(406).json({
                erro: true,
                mensagem: "Email já existente no banco de dados!"
            });
        }
    }

//função para listar os motoristar cadastrados no db
    async function listarmotoristabd(empresaId) {
        if(empresaId.dashboard === false){

            try {
                let listamotorista = await Motorista.findAll({
                    attributes: ['imagem', 'id', 'nome', 'email', 'celular', 'ativo', 'cnh', 'cpf', 'endereco'],
                    where: { empresaId: empresaId.empresaId}
                }); 
                return listamotorista;      //retornar uma lista com os motoristas cadastrados

            } catch (error) {
                console.error('Erro ao listar motoristas do banco de dados:', error);
                throw error; // Lança o erro para ser tratado onde a função for chamada
            }
        }else{
            try {
                const amount = await Motorista.count({
                    where: {empresaId: empresaId.empresaId}
                });
                return amount;
            } catch (error) {
                console.error('Erro ao contar motoristas no bd');
                throw error;
            }
        }
    };


//função para editar dados de motorista
async function editarmotoristacmiddle(dados, id, res) {

    const empresaId = id.empresaId;
    const dadosjson = {
        imagem: dados.imagem,
        nome: dados.nome,
        email: dados.email,
        cnh: dados.cnh,
        cpf: dados.cpf,
        endereco: dados.endereco, // Corrigido para endereco
        celular: dados.celular,
        ativo: dados.ativo,
        empresaId: id.empresaId
    }
    console.log(dadosjson);

    try {
        const [updated] = await Motorista.update(dadosjson, {
            where: { email: dados.email, empresaId: empresaId }
        });

        if (updated) {
            console.log("edição feita com sucessor");
            return res.status(200).json({
                erro: false,
                info: "Motorista editado com sucesso"
            });
        } else {
            return res.status(404).json({
                erro: true,
                info: "Motorista não encontrado"
            });
        }
    } catch (error) {
        return res.status(400).json({
            erro: true,
            info: "Erro ao editar motorista",
            console: error
        });
    }
}


//função para deletar motorista do banco de dados.
    async function deletarmotoristadb(dados, empresaId, res){
        

        //verificar se tem email cadastrado no db
        const emailbd = await buscaremailbd(dados.email, empresaId.empresaId);
        console.log(emailbd);
        if(!emailbd){
            return res.status(404).json({
                erro: true,
                info: "motorista não encontrada no bd"
            })
        }
    
        
        await Motorista.destroy({
                where: { email: dados.email, empresaId: empresaId.empresaId }
            }).then(() => {
                return res.status(200).json({
                    erro: false,
                    info: "motorista excluido com sucesso"
                })
            }).catch(error =>{
                return res.status(400).json({
                    erro: true,
                    info: "erro ao excluir motorista",
                    "console log": error
                })
            })
    }

    module.exports = {
        verificaemail,
        verificatelefone,
        verificacpf,
        verificacnh,
        buscaremailbd,
        listarmotoristabd,
        cadastrarmotoristabd,
        editarmotoristacmiddle,
        deletarmotoristadb,
        decodetoken
    }