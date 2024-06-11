document.addEventListener('DOMContentLoaded', function(){
const loginForm = document.getElementById('login'); // Alterado de 'login' para 'loginForm'

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obtenha os valores inseridos nos campos de email e senha
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;
    const dadosInp = {
        "email": email,
        "senha": senha
    }
    try{
        console.log(dadosInp);
        const token = await fetch('http://localhost:3000/empresa/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosInp)
        });
        //verificar se a requisição foi bem sucedida
        if(token.ok){
            const dados = await token.json();
            console.log(dados);
            const tokenPass = dados.token;
            sessionStorage.setItem('token', tokenPass);
            console.log('login bem completo!');
            console.log(dados);
            if(dados.erro === false){
                window.location.href = '../cadastro motorista/gerencia-drivers.html';
            }else{
                document.getElementById('error-message').style.display = 'block';
            }
        }else{
            const erro = await token.json();
            console.error('Erro ao logar:', erro);
        }
    //caso de erro de não conexão ou falha de api
    }catch(error){
        console.error("erro de rede", error);
    }
});
});


document.getElementById('path-cadastro-cadastro').addEventListener('click',()=>{
    window.location.href = '../cadastro/index.html';
});

document.getElementById('path-login-cadastro').addEventListener('click',()=>{
    window.location.href = '../cadastro/index.html';
});
