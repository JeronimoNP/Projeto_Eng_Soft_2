const {verificaemail, verificacpf, verificatelefone, buscaremailbd, listarmotoristabd, cadastrarmotoristabd, editarmotoristacmiddle, deletarmotoristadb} = require('../middleware/motoristamiddle.js')



//função para cadastrar motorista
async function cadastromoto(dados, res){
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
    //verificando se já existe um email cadastrado no bd, caso tenha retorna true
    const emailexiste = await buscaremailbd(dados.email, dados.empresaId);

    await cadastrarmotoristabd(dados, emailexiste, res);
};


//função para listar os motoristas do db.
async function listarmotorista(empresaId, res){

    //variabel contendo a lista de motoristas.
    const listaMotoristas = await listarmotoristabd(empresaId.empresaId);
    return res.status(200).json(listaMotoristas);
};


//função para editar motorista
async function editarmotorista(dados, res){

    //verificar email existente.
    const emailexiste = await buscaremailbd(dados.email, dados.empresaId);
    //retorno caso motorista não encontrado no db.
    if(!emailexiste){
        return res.status(404).json({
            erro: true,
            info: "Motorista não encontrado"
        })
    }

    await editarmotoristacmiddle(dados, res);
};


//função para deletar motorista do bd
async function deletarmotorista(dados, res){
    await deletarmotoristadb(dados, res);
    
};

//exportando funções para poder usar no motorista Routes
module.exports = {
    cadastromoto,
    listarmotorista,
    deletarmotorista,
    editarmotorista
};