const loginForm = document.getElementById('login'); // Alterado de 'login' para 'loginForm'
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obtenha os valores inseridos nos campos de email e senha
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    if(localStorage.getItem('email') && localStorage.getItem('senha')) {
        // Obtenha os dados do localStorage
        const storedEmail = localStorage.getItem('email');
        const storedSenha = localStorage.getItem('senha');

        // Verifique se os dados inseridos correspondem aos dados armazenados
        if(email === storedEmail && senha === storedSenha) {
            alert('Login bem-sucedido!');
        } else {
            alert('Email ou senha incorretos. Por favor, tente novamente.');
        }
    } else {
        alert('Nenhum dado de login encontrado. Por favor, cadastre-se.');
    }
});

