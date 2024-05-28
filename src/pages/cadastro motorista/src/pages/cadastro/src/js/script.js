function removerAdicionarClasses() {
    if (window.innerWidth > 699) {

        const login_page = document.getElementById('login-page');
        const area_cadastro = document.getElementById('area-cadastro');

        //remover a classe hide e adiciona a classe visible
        login_page.classList.remove('hide');
        login_page.classList.add('visible');
        //remover a classe hide e adiciona a classe visible
        area_cadastro.classList.remove('hide');
        area_cadastro.classList.add('visible');
    } else if (window.innerWidth < 700) {
        const area_cadastro = document.getElementById('area-cadastro');
        //remover a classe visible
        area_cadastro.classList.remove('visible');
        //adicionar a classe hide
        area_cadastro.classList.add('hide');
    }
}

const cadastroClick = (event) => {
    //evitar comportamento da tag
    event.preventDefault();
    if (window.innerWidth < 700) {

        const login_page = document.getElementById('login-page');
        //remover a classe visible
        login_page.classList.remove('visible');
        //adicionar a classe hide
        login_page.classList.add('hide');

        const area_cadastro = document.getElementById('area-cadastro');
        //remover a classe hide
        area_cadastro.classList.remove('hide');
        //adicionar a classe visible
        area_cadastro.classList.add('visible');
    }
}

const loginClick = (event) => {
    //evitar comportamento da tag
    event.preventDefault();
    if (window.innerWidth < 700) {

        const area_cadastro = document.getElementById('area-cadastro');
        //remover a classe visible
        area_cadastro.classList.remove('visible');
        //adicionar a classe hide
        area_cadastro.classList.add('hide');

        const login_page = document.getElementById('login-page');
        //remover a classe hide
        login_page.classList.remove('hide');
        //adicionar a classe visible
        login_page.classList.add('visible');
    }
}

const mostrarSenha = (event) => {
    //evitar comportamento da tag
    event.preventDefault();
    var senhaInput = document.getElementById('senha');
    if (senhaInput.type == "password") {
        //mostrar a senha e trocar o icone 'mostrar-senha'
        senhaInput.type = "text";
        document.getElementById('mostrar-senha').classList.remove('fa-eye');
        document.getElementById('mostrar-senha').classList.add('fa-eye-slash');

    } else {
        //ocultar a senha e trocar o icone 'mostrar-senha'
        senhaInput.type = "password";
        document.getElementById('mostrar-senha').classList.remove('fa-eye-slash');
        document.getElementById('mostrar-senha').classList.add('fa-eye');

    }
}

    //captar os eventos de click 
    document.getElementById('acesso-cadastro').addEventListener("click", cadastroClick);
    document.getElementById('button-retorno').addEventListener("click", loginClick);
    document.getElementById('mostrar-senha').addEventListener("click", mostrarSenha);
    window.addEventListener('resize', removerAdicionarClasses);

    document.getElementById('path-login').addEventListener('click',()=>{
        window.location.href = '../login/login.html';
    });
    

    removerAdicionarClasses();