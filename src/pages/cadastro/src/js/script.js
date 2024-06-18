function removerAdicionarClasses() {
    const login_page = document.getElementById('login-page');
    const area_cadastro = document.getElementById('area-cadastro');

    if (window.innerWidth > 699) {
        login_page.classList.remove('hide');
        login_page.classList.add('visible');
        area_cadastro.classList.remove('hide');
        area_cadastro.classList.add('visible');
    } else {
        area_cadastro.classList.remove('visible');
        area_cadastro.classList.add('hide');
    }
}

const cadastroClick = (event) => {
    event.preventDefault();
    if (window.innerWidth < 700) {
        const login_page = document.getElementById('login-page');
        const area_cadastro = document.getElementById('area-cadastro');

        login_page.classList.remove('visible');
        login_page.classList.add('hide');

        area_cadastro.classList.remove('hide');
        area_cadastro.classList.add('visible');
    }
};

const loginClick = (event) => {
    event.preventDefault();
    if (window.innerWidth < 700) {
        const area_cadastro = document.getElementById('area-cadastro');
        const login_page = document.getElementById('login-page');

        area_cadastro.classList.remove('visible');
        area_cadastro.classList.add('hide');

        login_page.classList.remove('hide');
        login_page.classList.add('visible');
    }
};

const mostrarSenha = (event) => {
    event.preventDefault();
    const senhaInput = document.getElementById('senha');
    const mostrarSenhaIcon = document.getElementById('mostrar-senha');

    if (senhaInput.type === "password") {
        senhaInput.type = "text";
        mostrarSenhaIcon.classList.remove('fa-eye');
        mostrarSenhaIcon.classList.add('fa-eye-slash');
    } else {
        senhaInput.type = "password";
        mostrarSenhaIcon.classList.remove('fa-eye-slash');
        mostrarSenhaIcon.classList.add('fa-eye');
    }
};

// Captar os eventos de click 
document.getElementById('acesso-cadastro').addEventListener("click", cadastroClick);
document.getElementById('button-retorno').addEventListener("click", loginClick);
document.getElementById('mostrar-senha').addEventListener("click", mostrarSenha);
window.addEventListener('resize', removerAdicionarClasses);

document.getElementById('path-login').addEventListener('click', () => {
    window.location.href = '../login/login.html';
});

// Adicionar evento de submit ao formulário
const formUser = document.getElementById('formUser');
formUser.addEventListener('submit', async (event) => {
    event.preventDefault();
    await envioDados();
});

async function envioDados() {
    console.log('Função envioDados chamada');
    
    const formUser = document.getElementById('formUser');
    if (!formUser) {
        console.error('Formulário não encontrado');
        return;
    }

    const camposInput = formUser.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="password"]');
    let validarDados = true;
    let camposjson = {};

    // Verificação e coleta dos dados do formulário
    camposInput.forEach(campo => {
        const placeholder = campo.placeholder;
        if (campo.value === '') {
            if (!campo.placeholder.includes(': campo vazio!')) {
                campo.placeholder = placeholder + ': campo vazio!';
            }
            campo.style.border = '1px solid red';
            validarDados = false;
        } else {
            campo.placeholder = placeholder.replace(': campo vazio!', '');
            campo.style.border = 'none';
            camposjson[campo.name] = campo.value;
        }
    });

    // Se todos os campos estiverem preenchidos, envie os dados
    if (validarDados) {
        fetch('http://localhost:3000/empresa/cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(camposjson)
        })
        .then(async response => {
            if(!response.ok){
                alert("email já em uso");
                throw new Error('email já em uso');
            }
            return await response.json();
        })
        .then(data => {
            console.log('Cadastro concluido com sucesso', data);
            window.location.href = '../Login/Login.html';

        })
        .catch(error => {
            console.log("Erro:", error);
        })
    }
}


removerAdicionarClasses();
