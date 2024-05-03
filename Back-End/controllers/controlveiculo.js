const {verificamodelo, verificaCrlv, verificaplaca, buscarplacabd, listarveiculobd, cadastrarveiculobd, editarveiculocmiddle, deletarveiculodb} = require('../middleware/veiculomiddle.js')



//função para cadastrar veiculo
async function cadastroveic(dados, res){
    //mandando dados para o middleware para a validação de dados
    const resultmodelo = verificamodelo(dados.modelo);
    const resultCrlv = verificaCrlv(dados.Crlv);
    const resultplaca = verificaplaca(dados.placa);
    //criando uma variavel para armazena erros de dados
    let errors = [];
    //condição para informar erros

    if (resultmodelo === false) {
        errors.push("Modelo com o domínio incorreto.");
    }

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
    //verificando se já existe placa cadastrado no bd, caso tenha retorna true
    const placaexiste = await buscarplacabd(dados.placa, dados.empresaId);

    await cadastrarveiculobd(dados, placaexiste, res);
};


//função para listar os veículos do db.
async function listarveiculo(empresaId, res){

    //variabel contendo a lista de veiculo.
    const listaveiculo = await listarveiculobd(empresaId.empresaId);
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