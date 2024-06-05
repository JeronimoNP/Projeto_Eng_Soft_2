const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Empresadb = require('../models/Empresa.js');
const senhatoken = process.env.KEYTOKENSECRET;

function verificaemail(email){
    const dominio = /^[a-zA-Z0-9.-]+@gmail.com$/;
    const validade = dominio.test(email);
    return validade;
}

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

function verificacnpj(cnpj){
    const numero = /^[0-9]{9}$/;
    const validade = !numero.test(cnpj);

    if(validade === true){
        const quantidadenumber = cnpj.toString().length;
        if(quantidadenumber != 14){
            return false;
        }
    }
    return validade;
}

//cadastro de empresa
async function cadastrar(dados, emailexiste, res){
    if (!emailexiste) {
        const senhacrypt = await bcrypt.hash(dados.senha, 10);
        await Empresadb.create({
            nome: dados.nome,
            email: dados.email,
            celular: dados.celular,
            cnpj: dados.cnpj,
            endereco: dados.endereco,
            senha: senhacrypt
        }).then(() => {
            return res.status(201).json({
                erro: false,
                mensagem: "Usuário cadastrado com sucesso!!",
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
            mensagem: "Email já existente no banco de dados!"
        });
    }
}

async function login(logindados, emailexiste, res){
    if(!emailexiste){

        return res.status(404).json({
            erro: true,
            info: "email não encontrado no db"
        });
    }else{
        const status = await bcrypt.compare(logindados.senha, emailexiste.senha);
        // const payload = emailexiste.
        if(status){
            const options = {
                expiresIn: '12h' // O token expirará em 1 hora
            };
            
            const token = jwt.sign({empresaId: emailexiste.id}, senhatoken, options);
            return res.status(202).json({
                erro: false,
                info: "login feito com sucesso",
                token: token
            })
        }else{
            return res.status(203).json({
                erro: true,
                info: "senha incorreta"
            })
        };
    }
}

module.exports = {
    verificaemail,
    verificatelefone,
    verificacnpj,
    cadastrar,
    login
}