const { verificaCrlv, verificaplaca, buscarplacabd, listarveiculobd, cadastrarveiculobd, editarveiculomiddle, deletarveiculodb, decodetoken} = require('../middleware/veiculomiddle.js');
// import("../middleware/veiculomiddle.js");
const senhatoken = process.env.KEYTOKENSECRET;


//função para cadastrar veiculo
async function cadastroveic(dados, res){
    //exportando para functions para o devido tratamento de dados
    const resultCrlv = verificaCrlv(dados.crlv);
    const resultplaca = verificaplaca(dados.placa);
    //criando uma variavel para armazena erros de dados
    let errors = [];

    //condições para pegar os erros de dados
    if (resultCrlv === false) {
        errors.push("Formato Crlv incorreto.");
    }

    if (resultplaca === false) {
        errors.push("Formato da placa incorreto.");
    }

    if(errors.length > 0){
        //console.log("Erro no formato dos dados:", errors.join(" "));
        return res.status(203).json({
            erro: "true",
            info: errors
        });
    }

    const token2 = await decodetoken(dados, senhatoken);
    if(token2 === "erro"){
        return res.status(203).json({
            erro: true,
            info: "token invalido ou expirado"
        });
    }

    //verificando se já existe placa cadastrado no bd, caso tenha retorna true
    const placaexiste = await buscarplacabd(dados.placa, token2.empresaId);

    await cadastrarveiculobd(dados, placaexiste, token2, res);
};


//função para listar os veículos do db.
async function listarveiculo(empresaId, res){

    //variabel contendo a lista de veiculo.
    const listaveiculo = await listarveiculobd(empresaId.token);
    return res.status(200).json(listaveiculo);
};


//função para editar veiculo
async function editarveiculo(dados, res){

    //verificar placa existente.
    const placaexiste = await buscarplacabd(dados.placa, dados.empresaId);
    //retorno caso veículo não encontrado no db.
    if(!placaexiste){
        return res.status(404).json({
            erro: true,
            info: "Veículo não encontrado"
        })
    }

    await editarveiculomiddle(dados, res);
};


//função para deletar veiculo do bd
async function deletarveiculo(dados, res){
    await deletarveiculodb(dados, res);
    
};

//exportando funções para poder usar no veiculo Routes
module.exports = {
    cadastroveic,
    listarveiculo,
    deletarveiculo,
    editarveiculo
};