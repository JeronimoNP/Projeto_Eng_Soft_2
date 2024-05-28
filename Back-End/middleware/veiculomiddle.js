const Veiculodb = require('../models/Veiculo.js');
const empresas = require('../models/Empresa.js');
const jwt = require('jsonwebtoken');

//verificar se o dominio do gmail está correto
// function verificamodelo(email){
//     const dominio = /^[a-zA-Z0-9.-]+@gmail.com$/;
//     const validade = dominio.test(email);
//     return validade;
// }

//verifirar se o Crlv tem os 12 numeros
function verificaCrlv(Crlv){
    const numero = /^[0-9]{9}$/;
    const validade = !numero.test(Crlv);

    if(validade === true){
        const quantidadenumber = Crlv.toString().length;
        if(quantidadenumber != 12){
            return false;
        }
    }
    return validade;
}

//verificar se tem os 7 caracteres na placa é que não contenha string
function verificaplaca(placa){
    const numero = /^[0-9]{9}$/;
    const validade = !numero.test(placa);

    if(validade === true){
        const quantidadenumber = placa.toString().length;
        if(quantidadenumber != 7){
            return false;
        }
    }
    return validade;
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


//buscar placa no banco de dados para validade se já existe a placa cadastrada
async function buscarplacabd(placa, idEmpresa) {
    try {
        // Buscar o veículo pela placa e pelo ID da empresa
        const veiculo = await Veiculodb.findOne({
            where: { 
                placa: placa 
            },
            include: [{
                model: empresas,
                where: { id: idEmpresa }
            }]
        });
        return veiculo; // Retorna o veículo encontrado ou não

    } catch (error) {//Erro interno ao encontrar o veículo
        console.error('Erro ao buscar veículo:', error);
        throw new Error('Erro ao buscar veículo');
    }
}

//função para cadastrar veículo
async function cadastrarveiculobd(dados, placaexiste, decoded,  res){
    if (!placaexiste) {
        console.log(dados);
        await Veiculodb.create({
            imagem: dados.imagem,
            marca: dados.marca,
            modelo: dados.modelo,
            crlv: dados.crlv,
            placa: dados.placa,
            ativo: dados.ativo,
            tipo: dados.tipo,
            empresaId: decoded.empresaId,
            motoristumId: dados.motoristumId
        }).then(() => {
            return res.status(201).json({
                erro: false,
                mensagem: "Veículo cadastrado com sucesso!!",
                modelo: dados.modelo,
                placa: dados.placa
            });
        }).catch((error) => { // Adicione o parâmetro de erro aqui para poder capturar e exibir a mensagem de erro
            console.error("Erro ao cadastrar veículo:", error); // Exibir o erro no console para depuração
            return res.status(400).json({
                erro: true,
                mensagem: "Erro ao cadastrar veículo!"
            });
        });
    } else {
        return res.status(406).json({
            erro: true,
            mensagem: "Placa já existente no banco de dados!"
        });
    }
}

//função para listar os veículos cadastrados no db
async function listarveiculobd(empresaId) {
    try {
        let listaveiculo = await Veiculodb.findAll({
            attributes: ['imagem', 'id', 'modelo', 'Crlv', 'placa', 'ativo'],
            where: { empresaId: empresaId }
        }); 
        return listaveiculo;      //retornar uma lista com os veículos cadastrados

    } catch (error) {
        console.error('Erro ao listar veículos do banco de dados:', error);
        throw error; // Lança o erro para ser tratado onde a função for chamada
    }
};


//função para editar dados do veículo
async function editarveiculomiddle(dados, res){
    const empresaId = dados.empresaId;

    await veiculo.update(dados, {
        where: { placa: dados.placa, empresaId: empresaId }

    }).then(() => {
    
        return res.status(200).json({
            erro: false,
            info: "veículo editado com sucessor"
        })
    }).catch(error => {
        return res.status(400).json({
            erro: true,
            info: "erro ao editar veículo",
            "console log": error
        })
    });
};


//função para deletar veiculo do banco de dados.
async function deletarveiculodb(dados, res){
    
await veiculo.destroy({
        where: { placa: dados.placa, empresaId: dados.empresaId }
    }).then(() => {
        return res.status(200).json({
            erro: false,
            info: "veículo excluido com sucesso"
        })
    }).catch(error =>{
        return res.status(400).json({
            erro: true,
            info: "erro ao excluir veículo",
            "console log": error
        })
    })
}

module.exports = {
    // verificamodelo,
    verificaCrlv,
    verificaplaca,
    buscarplacabd,
    listarveiculobd,
    cadastrarveiculobd,
    editarveiculomiddle,
    deletarveiculodb,
    decodetoken
}
