const loginForms = document.getElementById('login')
loginForms.addEventListener('submit', async (e) => {
    e.preventDefault();

    if(localStorage.getItem('email') && localStorage.getItem('senha')) {

        const storedEmail = localStorage.getItem('email');
        const storedSenha = localStorage.getItem('senha');
        if(email === storedEmail && senha === storedSenha) {
            alert('Login bem-sucedido!');
        } else {
            alert('Email ou senha incorretos. Por favor, tente novamente.');
            emailInput.classList.add('invalid');
            senhaInput.classList.add('invalid');
        }
    } else {
        alert('Nenhum dado de login encontrado. Por favor, cadastre-se.');
    }
    document.querySelectorAll('.campo-email, .campo-senha').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('invalid');
        });
    });
});
const mostrarSenhaIcon = document.getElementById('mostrar-senha');
const senhaInput = document.getElementById('senha');

mostrarSenhaIcon.addEventListener('click', function() {
    if (senhaInput.type === 'password') {
        senhaInput.type = 'text';
        mostrarSenhaIcon.classList.remove('fa-eye-slash');
        mostrarSenhaIcon.classList.add('fa-eye');
    } else {
        senhaInput.type = 'password';
        mostrarSenhaIcon.classList.remove('fa-eye');
        mostrarSenhaIcon.classList.add('fa-eye-slash');
    }
});




