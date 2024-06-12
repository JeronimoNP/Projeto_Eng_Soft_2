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
    
    if(dadosInp.email == '' || dadosInp.senha == ''){
        msgErro();
        return
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
            const tokenPass = dados.token;
            sessionStorage.setItem('token', tokenPass);
            console.log('login bem completo!');
            console.log(dados);
            if(dados.erro === false){
                window.location.href = '../cadastro motorista/gerencia-drivers.html';
            }else{

            msgErro();
            }
        }else{
            const erro = await token.json();
            console.error('Erro ao logar:', erro);
            msgErro();
        }
    //caso de erro de não conexão ou falha de api
    }catch(error){
        console.error("erro de rede", error);
        
    } 
});
});

function msgErro(){
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = 'Email ou senha incorreta';
    errorMessageElement.style.display = 'block';
        setTimeout(() => {
            errorMessageElement.style.opacity = '0';
            setTimeout(() => {
                errorMessageElement.style.display = 'none';
                errorMessageElement.style.opacity = '1';
            }, 500); // 500ms = 0.5 seconds
        }, 1800); // 1500ms = 1.5 seconds
}

document.getElementById('path-cadastro-cadastro').addEventListener('click',()=>{
    window.location.href = '../cadastro/index.html';
});

document.getElementById('path-login-cadastro').addEventListener('click',()=>{
    window.location.href = '../cadastro/index.html';
});
