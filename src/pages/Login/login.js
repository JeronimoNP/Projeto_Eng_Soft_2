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
            window.location.href = '../cadastro motorista/gerencia-drivers.html';

        }else{
            const erro = await token.json();
            console.error('Erro ao logar:', erro);
        }
    //caso de erro de não conexão ou falha de api
    }catch(error){
        console.error("erro de rede", error);
    }
});

//     if(localStorage.getItem('email') && localStorage.getItem('senha')) {
//         // Obtenha os dados do localStorage
//         const storedEmail = localStorage.getItem('email');
//         const storedSenha = localStorage.getItem('senha');

//         // Verifique se os dados inseridos correspondem aos dados armazenados
//         if(email === storedEmail && senha === storedSenha) {
//             alert('Login bem-sucedido!');
//         } else {
//             alert('Email ou senha incorretos. Por favor, tente novamente.');
//         }
//     } else {
//         alert('Nenhum dado de login encontrado. Por favor, cadastre-se.');
//     }
// });

document.getElementById('path-cadastro-cadastro').addEventListener('click',()=>{
    window.location.href = '../cadastro/index.html';
});

document.getElementById('path-login-cadastro').addEventListener('click',()=>{
    window.location.href = '../cadastro/index.html';
});
