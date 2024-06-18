const {verificaemail, verificacpf, verificatelefone, buscaremailbd, listarequipedb, cadastrarequipebd, editarEquipemiddle, deletarfuncionariodb, decodetoken} = require('../middleware/equipemiddle.js');
const senhatoken = process.env.KEYTOKENSECRET;

//função para cadastrar equipe
    async function cadastroequipe(dados, res){

        //mandando dados para o middleware para a validação dos dados
        const resultemail = verificaemail(dados.email);
        const resultcpf = verificacpf(dados.cpf);
        const resultcelular = verificatelefone(dados.celular);

        //criando uma variavel para armazena erros de  dados
        let errors = [];

        //condição para colocar erros na variavel
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

        const token2 = await decodetoken(dados, senhatoken);
        if(token2 === "erro"){
            return res.status(203).json({
                erro: true, 
                info: "token invalidado ou expirado"
            });
        }

        //verificando se já existe um email cadastrado no bd, caso tenha retorna true
        const emailexiste = await buscaremailbd(dados.email, token2.empresaId);
        
        //enviando para função para cadastrar equipe
        await cadastrarequipebd(dados, emailexiste, token2, res);
    };


//função para listar os motoristas do db.
    async function listaequipe(token, res){
        console.log(token);
        //A variavel token2 é a variavel que conterá a descriptografia do token
        const token2 = await decodetoken(token, senhatoken);
        if(token2 === "erro"){
            return res.status(203).json({
                erro: true,
                info: "token invalido ou expirado"
            });
        }

        //mudando rota para listar
        token2.dashboard = false;

        const listaequipe = await listarequipedb(token2);
        return res.status(200).json(listaequipe);
    };

    async function listarEquipedashboard(token, res){
        //a variavel token2 é onde tera o descriptografia do token
       const token2 = await decodetoken(token, senhatoken);
       if(token2 === "erro"){
           return res.status(203).json({
               erro: true,
               info: "token invalido ou expirado"
           });
       }
       //mudando rota para dashboard
       token2.dashboard = true;
       
       //mandando dados para middleware
       const listaMotoristas = await listarequipedb(token2);
   
       //retorna para a requisição
       return res.status(200).json(listaMotoristas);
   
   }


//função para editar equipe
    async function editarEquipe(dados, res){

        //a variavel token2 é onde tera a descriptografia do token
        const token2 = await decodetoken(dados, senhatoken);
        if(token2 === "erro"){
            return res.status(203).json({
                erro: true,
                info: "token invalido ou expirado"
            });
        };

        //verificar email existente.
        const emailexiste = await buscaremailbd(dados.email, token2.empresaId);

        //retorno caso Equipe não é encontrado no db.

        if(!emailexiste){
            return res.status(404).json({
                erro: true,
                info: "Equipe não encontrada no bd"
            })
        }
        console.log(token2);
        await editarEquipemiddle(dados, token2, res);
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
        }  
        console.log(token2);
        await deletarfuncionariodb(dados, token2, res);
        
    };


module.exports = {
    cadastroequipe,
    listaequipe,
    listarEquipedashboard,
    editarEquipe,
    deletarfuncionario
}