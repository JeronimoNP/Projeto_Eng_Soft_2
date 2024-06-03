const { isUndefined } = require('util');
const {verificaemail, verificacpf, verificatelefone, buscaremailbd, listarfuncionariobd, cadastrarfuncionariobd, editarfuncionariocmiddle, deletarfuncionariodb, decodetoken} = require('../middleware/funcionariomiddle.js')
const senhatoken = process.env.KEYTOKENSECRET;


//função para cadastrar funcionario
async function cadastrofuncio(dados, res){
    //mandando dados para o middleware para a validação de dados
    const resultemail = verificaemail(dados.email);
    const resultcelular = verificatelefone(dados.celular);
    const resultcpf = verificacpf(dados.cpf);
    //criando uma variavel para armazena erros de dados
    let errors = [];
    //condição para informar erros

    if (resultemail === false) {
        errors.push("Email com o domínio incorreto.");
    }

    if (resultcelular === false) {
        errors.push("Formato de telefone incorreto.");
    }

    if (resultcpf === false) {
        errors.push("Formato de CPF incorreto.");
    }

    if(errors.length > 0){
        //console.log("Erro no formato dos dados:", errors.join(" "));
        return res.status(203).json({
            erro: "true",
            info: errors
        });
    }


    //a variavel token2 é onde tera o descriptografia do token
    const token2 = await decodetoken(dados, senhatoken);
    if(token2 === "erro"){
        return res.status(203).json({
            erro: true,
            info: "token invalido ou expirado"
        });
    }


    //verificando se já existe um email cadastrado no bd, caso tenha retorna true
    const emailexiste = await buscaremailbd(dados.email, token2.empresaId);

    
    // const emp = await jwt.verify()

    await cadastrarfuncionariobd(dados, emailexiste, token2, res);
};

//função para listar os funcionarios do db.
async function listarfuncionario(token, res){

     //a variavel token2 é onde tera o descriptografia do token
    const token2 = await decodetoken(token, senhatoken);
    if(token2 === "erro"){
        return res.status(203).json({
            erro: true,
            info: "token invalido ou expirado"
        });
    }
    
    //variabel contendo a lista de funcionarios.
    const listaMotoristas = await listarfuncionariobd(token2.empresaId);
    return res.status(200).json(listaMotoristas);
};


//função para editar funcionario
async function editarfuncionario(dados, res){

    //a variavel token2 é onde tera o descriptografia do token
    const token2 = await decodetoken(dados, senhatoken);
    if(token2 === "erro"){
        return res.status(203).json({
            erro: true,
            info: "token invalido ou expirado"
        });
    }
    
    //verificar email existente.
    const emailexiste = await buscaremailbd(dados.email, empresaId.empresaId);
    //retorno caso funcionario não encontrado no db.
    if(!emailexiste){
        return res.status(404).json({
            erro: true,
            info: "Funcionario não encontrado"
        })
    }

    await editarfuncionariocmiddle(dados, empresaId, res);
};


//função para deletar funcionario do bd
async function deletarfuncionario(dados, res){

    //a variavel token2 é onde tera o descriptografia do token
    const token2 = await decodetoken(dados, senhatoken);
    if(token2 === "erro"){
        return res.status(203).json({
            erro: true,
            info: "token invalido ou expirado"
        });
    }x   

    await deletarfuncionariodb(dados, empresaId, res);
    
};

//exportando funções para poder usar no funcionario Routes
module.exports = {
    cadastrofuncio,
    listarfuncionario,
    deletarfuncionario,
    editarfuncionario
};