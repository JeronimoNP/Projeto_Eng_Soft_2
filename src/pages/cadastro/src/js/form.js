const formAction = document.getElementById('form-area');

formAction.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const cell = document.getElementById('celular').value;
    const cpfCnpj = document.getElementById('id-unico').value;
    const endereco = document.getElementById('endereco').value;
    const senha = document.getElementById('senha').value;
    var senhaValida = /^(?=.*[a-zA-Z]).{8}$/.test(senha);
    var cpfCnpjValida = /^\d{14}$/.test(cpfCnpj);

    if (nome == '' || email == '' || cell == '' || cpfCnpj == '' || endereco == '' || senha == '' || !cpfCnpjValida || !senhaValida) {
        if (nome == '') {
            document.getElementById('campo-nome').style.border = '1px solid red';
            document.getElementById('nome').placeholder = 'Preencha o campo nome';
        }

        if (email == '') {
            document.getElementById('campo-email').style.border = '1px solid red';
            document.getElementById('email').placeholder = 'Preencha o campo email';
        }

        if (cell == '') {
            document.getElementById('campo-cell').style.border = '1px solid red';
            document.getElementById('celular').placeholder = 'Preencha o campo celular';
        }

        if (cpfCnpj == '') {
            document.getElementById('campo-id-unico').style.border = '1px solid red';
            document.getElementById('id-unico').placeholder = 'Preencha o campo CNPJ';
        } else if (!cpfCnpjValida) {
            document.getElementById('id-unico').value = '';
            document.getElementById('campo-id-unico').style.border = '1px solid red';
            document.getElementById('id-unico').placeholder = 'O cnpj deve 14 caracteres';
        }

        if (endereco == '') {
            document.getElementById('campo-endereco').style.border = '1px solid red';
            document.getElementById('endereco').placeholder = 'Preencha o campo endereço';
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

        document.getElementById('email').addEventListener('focus', (event) => {
            document.getElementById('campo-email').style.border = 'none';
            document.getElementById('email').placeholder = 'Email';
        });

        document.getElementById('celular').addEventListener('focus', (event) => {
            document.getElementById('campo-cell').style.border = 'none';
            document.getElementById('celular').placeholder = 'Celular';
        });

        document.getElementById('id-unico').addEventListener('focus', (event) => {
            document.getElementById('campo-id-unico').style.border = 'none';
            document.getElementById('id-unico').placeholder = 'CNPJ/CPF';
        });

        document.getElementById('endereco').addEventListener('focus', (event) => {
            document.getElementById('campo-endereco').style.border = 'none';
            document.getElementById('endereco').placeholder = 'Endereço';
        });

        document.getElementById('senha').addEventListener('focus', (event) => {
            document.getElementById('campo-senha').style.border = 'none';
            document.getElementById('senha').placeholder = 'Senha';
        });

        return;
    }


    localStorage.setItem('nome', nome);
    localStorage.setItem('email', email);
    localStorage.setItem('celular', cell);
    localStorage.setItem('id-unico', cpfCnpj);
    localStorage.setItem('endereço', endereco);
    localStorage.setItem('senha', senha);
});
