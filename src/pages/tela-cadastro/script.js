document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let email = document.getElementById('email').value;
    let cnpj = document.getElementById('cnpj').value;
    let senha = document.getElementById('senha').value;

    // Validar e-mail
    if (!email.includes('@')) {
        alert('O e-mail deve conter "@"');
        return;
    }

    // Validar CNPJ
    if (cnpj.length !== 14 || isNaN(cnpj)) {
        alert('O CNPJ deve conter 14 dígitos');
        return;
    }

    // Validar senha
    if (senha.length > 8 || !/[a-zA-Z]/.test(senha)) {
        alert('A senha deve conter até 8 dígitos com pelo menos uma letra');
        return;
    }

    // Dados válidos, enviar para a API de cadastro (exemplo)
    fetch('url_da_sua_api_de_cadastro', {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            cnpj: cnpj,
            senha: senha
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Redirecionar para a página de login
            window.location.href = 'pagina_de_login.html';
        } else {
            throw new Error('Erro ao cadastrar usuário');
        }
    })
    .catch(error => {
        alert(error.message);
    });
});