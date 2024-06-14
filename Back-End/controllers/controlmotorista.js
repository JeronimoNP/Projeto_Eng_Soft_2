const { isUndefined } = require('util');
const multer = require('multer');
const upload = multer({ dest: 'uploads/'});
const {verificaemail, verificacpf, verificatelefone, buscaremailbd, listarmotoristabd, cadastrarmotoristabd, editarmotoristacmiddle, deletarmotoristadb, decodetoken} = require('../middleware/motoristamiddle.js')
const senhatoken = process.env.KEYTOKENSECRET;

//função para cadastrar motorista
async function cadastromoto(dados, imagemB, res){
    dados.imagem = imagemB;
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

    await cadastrarmotoristabd(dados, emailexiste, token2, res);
};

//função para listar os motoristas do db.
async function listarmotorista(token, res){

     //a variavel token2 é onde tera o descriptografia do token
    const token2 = await decodetoken(token, senhatoken);
    if(token2 === "erro"){
        return res.status(203).json({
            erro: true,
            info: "token invalido ou expirado"
        });
    }
    
    //variabel contendo a lista de motoristas.
    const listaMotoristas = await listarmotoristabd(token2);

    listaMotoristas.forEach(motorista => {
        if (motorista.imagem) {
            motorista.imagem = motorista.imagem.toString('base64');
        }
    });
    return res.status(200).json(listaMotoristas);
};

async function listarmotoristadashboard(token, res){

     //a variavel token2 é onde tera o descriptografia do token
    const token2 = await decodetoken(token, senhatoken);
    if(token2 === "erro"){
        return res.status(203).json({
            erro: true,
            info: "token invalido ou expirado"
        });
    }

    token2.dashboard = true;
    

}

//função para editar motorista
async function editarmotorista(dados, imagemb, res){
    dados.imagem = imagemb;

    //a variavel token2 é onde tera o descriptografia do token
    console.log(dados);
    const token2 = await decodetoken(dados, senhatoken);
    if(token2 === "erro"){
        return res.status(203).json({
            erro: true,
            info: "token invalido ou expirado"
        });
    }
    
    //verificar email existente.
    const emailexiste = await buscaremailbd(dados.email, token2.empresaId);
    //retorno caso motorista não encontrado no db.
    if(!emailexiste){
        return res.status(404).json({
            erro: true,
            info: "Motorista não encontrado"
        })
    }

    await editarmotoristacmiddle(dados, token2, res);
};

//função para deletar motorista do bd
async function deletarmotorista(dados, res){

    //a variavel token2 é onde tera o descriptografia do token
    const token2 = await decodetoken(dados, senhatoken);
    if(token2 === "erro"){
        return res.status(203).json({
            erro: true,
            info: "token invalido ou expirado"
        });
    }  

    await deletarmotoristadb(dados, token2, res);
    
};

//exportando funções para poder usar no motorista Routes
module.exports = {
    cadastromoto,
    listarmotorista,
    listarmotoristadashboard,
    deletarmotorista,
    editarmotorista
};