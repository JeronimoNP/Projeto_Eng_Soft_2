const formAction = document.getElementById('equipe_script-area');

formAction.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email1 = document.getElementById('nome').value;
    const email2 = document.getElementById('nome').value;
    const email3 = document.getElementById('nome').value;
    const email4 = document.getElementById('nome').value;
    const email5 = document.getElementById('nome').value;
    const cell = document.getElementById('celular').value;
    const nome_equipe = document.getElementById('id-unico').value;
    const area = document.getElementById('area').value;
    const senha = document.getElementById('senha').value;
    var senhaValida = /^(?=.*[a-zA-Z]).{8}$/.test(senha);
    var cpfCnpjValida = /^\d{14}$/.test(cpfCnpj);

    if (nome == '' || email1 == ''|| email2 == ''|| email3 == ''|| email4 == ''|| email5 == '' || cell == '' || nome_equipe == '' || area == '' || senha == '' || !cpfCnpjValida || !senhaValida) {
        if (nome == '') {
            document.getElementById('campo-nome').style.border = '1px solid red';
            document.getElementById('nome').placeholder = 'Preencha o campo nome';
        }

        if (email1 == '') {
            document.getElementById('campo-email1').style.border = '1px solid red';
            document.getElementById('email').placeholder = 'Preencha o campo email';
        }
        if (email2 == '') {
            document.getElementById('campo-email2').style.border = '1px solid red';
            document.getElementById('email').placeholder = 'Preencha o campo email';
        }
        if (email3 == '') {
            document.getElementById('campo-email3').style.border = '1px solid red';
            document.getElementById('email').placeholder = 'Preencha o campo email';
        }
        if (email4 == '') {
            document.getElementById('campo-email4').style.border = '1px solid red';
            document.getElementById('email').placeholder = 'Preencha o campo email';
        }
        if (email5 == '') {
            document.getElementById('campo-email5').style.border = '1px solid red';
            document.getElementById('email').placeholder = 'Preencha o campo email';
        }


        if (cell == '') {
            document.getElementById('campo-cell').style.border = '1px solid red';
            document.getElementById('celular').placeholder = 'Preencha o campo celular';
        }

        if (nome_equipe == '') {
            document.getElementById('campo-id-unico').style.border = '1px solid red';
            document.getElementById('id-unico').placeholder = 'Preencha o nome da equipe';
        } else if (!cpfCnpjValida) {
            document.getElementById('id-unico').value = '';
            document.getElementById('campo-id-unico').style.border = '1px solid red';
            document.getElementById('id-unico').placeholder = 'preencha um nome válido de mais de 14 caracteres';
        }

        if (endereco == '') {
            document.getElementById('campo-endereco').style.border = '1px solid red';
            document.getElementById('endereco').placeholder = 'Preencha o campo área';
        }

        if (senha == '') {
            document.getElementById('campo-senha').style.border = '1px solid red';
            document.getElementById('senha').placeholder = 'Preencha o campo senha';
        } else if (!senhaValida) {
            document.getElementById('senha').value = '';
            document.getElementById('campo-senha').style.border = '1px solid red';
            document.getElementById('senha').placeholder = 'A senha é invalida.';
        }

        document.getElementById('nome').addEventListener('focus', (event) => {
            document.getElementById('campo-nome').style.border = 'none';
            document.getElementById('nome').placeholder = 'Nome';
        });

        document.getElementById('email1').addEventListener('focus', (event) => {
            document.getElementById('campo-email').style.border = 'none';
            document.getElementById('email').placeholder = 'Email';
        });
        document.getElementById('email2').addEventListener('focus', (event) => {
            document.getElementById('campo-email').style.border = 'none';
            document.getElementById('email').placeholder = 'Email';
        });
        document.getElementById('email3').addEventListener('focus', (event) => {
            document.getElementById('campo-email').style.border = 'none';
            document.getElementById('email').placeholder = 'Email';
        });
        document.getElementById('email4').addEventListener('focus', (event) => {
            document.getElementById('campo-email').style.border = 'none';
            document.getElementById('email').placeholder = 'Email';
        });
        document.getElementById('email5').addEventListener('focus', (event) => {
            document.getElementById('campo-email').style.border = 'none';
            document.getElementById('email').placeholder = 'Email';
        });
        document.getElementById('celular').addEventListener('focus', (event) => {
            document.getElementById('campo-cell').style.border = 'none';
            document.getElementById('celular').placeholder = 'Celular';
        });

        document.getElementById('id-unico').addEventListener('focus', (event) => {
            document.getElementById('campo-id-unico').style.border = 'none';
            document.getElementById('id-unico').placeholder = 'nome-equipe';
        });

        document.getElementById('endereco').addEventListener('focus', (event) => {
            document.getElementById('campo-area').style.border = 'none';
            document.getElementById('endereco').placeholder = 'area';
        });

        document.getElementById('senha').addEventListener('focus', (event) => {
            document.getElementById('campo-senha').style.border = 'none';
            document.getElementById('senha').placeholder = 'Senha';
        });

        return;
    }


    localStorage.setItem('nome', nome);
    localStorage.setItem('email1', email1);
    localStorage.setItem('email2', email2);
    localStorage.setItem('email3', email3);
    localStorage.setItem('email4', email4);
    localStorage.setItem('email5', email5);
    localStorage.setItem('celular', cell);
    localStorage.setItem('nome-equipe', nome-equipe);
    localStorage.setItem('area', area);
    localStorage.setItem('senha', senha);
    window.location.href = '../login/equipe.html';
});