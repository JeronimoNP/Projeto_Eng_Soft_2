const buttonCadastro = document.getElementById('button-cadastro');
const entradaDado = document.getElementById('entrada-dados');
const formUser = document.getElementById('formUser');
const saidaDado = document.getElementById('saida-dados');

let novoIcone = document.createElement('i');
let novoParagrafo = document.createElement('p');
buttonCadastro.appendChild(novoIcone);
novoIcone.classList.add('fa-solid', 'fa-circle-xmark');
novoParagrafo.innerHTML = "Cadastro de Usuário";

formMobile();
resizeTela();

buttonCadastro.addEventListener('click', formMobile);
window.addEventListener('resize', resizeTela);

function menuBarAlt() {
    const formEditar = document.querySelector('.formEditar');
    entradaDado.classList.toggle('entrada-dados-on');
    buttonCadastro.classList.toggle('button-cadastro-on');
    saidaDado.classList.toggle('saida-dados-on');
    if(entradaDado.classList.contains('entrada-dados-on')){
        formEditar.classList.add('formEditar-on');
    } else {
        formEditar.classList.remove('formEditar-on');
    }
    
}

function resizeTela(){

    if(window.innerWidth >= 700){

        buttonCadastro.classList.add('hide-main');
        entradaDado.classList.remove('hide-main');

    }else {

        buttonCadastro.classList.remove('hide-main');
        buttonCadastro.classList.add('button-cadastro-off');
        novoIcone.remove();
        buttonCadastro.appendChild(novoParagrafo);
        entradaDado.classList.add('hide-main');
    }
};


function formMobile(){

    if(entradaDado.classList.contains('hide-main')){

        entradaDado.classList.remove('hide-main');
        buttonCadastro.classList.remove('button-cadastro-off');
        buttonCadastro.querySelector('p').remove();
        buttonCadastro.appendChild(novoIcone);
        novoIcone.classList.add('fa-solid', 'fa-circle-xmark');

    }else{

        entradaDado.classList.add('hide-main');
        novoIcone.remove();
        buttonCadastro.appendChild(novoParagrafo);
        buttonCadastro.classList.add('button-cadastro-off');
    }

}

formUser.addEventListener('submit', (event)=>{
    event.preventDefault();
    envioDados();
});

async function envioDados() {
    const camposInput = formUser.querySelectorAll('#entrada-dados input[type="text"]');
    let validarDados = true;
    const varJson = [];
        for (let campo of camposInput) {
            const placeholder = campo.placeholder;
            if(campo.type === 'text'){
                if(campo.value === '') {
                    if(!campo.placeholder.includes(': campo vazio!'))
                        campo.placeholder = placeholder + ': campo vazio!';
                        campo.style.border = '1px solid red';
                        validarDados = false;
                }
                else{
                    campo.placeholder = placeholder.replace(new RegExp(': campo vazio!','g'),'');
                    campo.style.border = 'none';
                    //jogar os dados na api
                    varJson.push({name: campo.name, value: campo.value});
                }
            }
        }

    if(validarDados){
        
    const token = sessionStorage.getItem('token');
    varJson.push('token', token);

        fetch('http://localhost:3000/equipe/cadastro',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(varJson)
        })
        .then(response => {
            if(!response.ok){
                throw new Error('Erro na aquisição');
            }
            return response.json();
        })
        .then(async data =>{
            console.log('Reposta do servidor: ', data);
            listarUser(data);
        })
        .catch(error => {
            console.error('Erro: ', error);
        });
    }
}

async function listarUser(camposInput) {
    const token = sessionStorage.getItem('token'); 

    if (!token) {
        console.error('Token não encontrado');
        return;
    }

     // Realizar a requisição GET com o token como parâmetro na URL
     try {
        const response = await fetch(`http://localhost:3000/equipe/listar`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error('Erro na aquisição');
        }
        
        const data = await response.json();

                    // Chamar a função para renderizar os dados
        renderizarDados(data);    
    } catch (error) {
        console.error('Erro: ', error);
    }
}

async function renderizarDados(dados) {
    if (!saidaDado) {
        console.error('Elemento saidaDado não encontrado');
        return;
    }
    if(saidaDado.children.length > 0){
        saidaDado.innerHTML = '';
    }

            // Adicionar os dados dos motoristas à tabela
    
    for(const campo of dados){
        const section = document.createElement('section');
        const titulo = ['Nome: ', 'Email: ', 'CPF: ', 'Telefone: ', 'Endereco: ', 'Sexo: ', 'Login: ', 'Senha: ', 'Funcao: '];
        const propriedade = ['nome', 'email', 'cpf', 'celular', 'endereco', 'sexo', 'login', 'senha', 'funcao'];
        let count = 0;
        

        section.classList.add('section-saida');
        saidaDado.appendChild(section);

        for (const prop of propriedade) {
            
            if (typeof campo[prop] === 'string' || typeof campo[prop] === 'number') {
                const div = document.createElement('div');
                div.classList.add(`item${count + 1}`);
                section.appendChild(div);
                const p1 = document.createElement('p');
                p1.textContent = titulo[count];
                div.appendChild(p1);
                const p2 = document.createElement('p');
                p2.textContent = campo[prop]; // aqui é onde recebe os dados da api
                div.appendChild(p2);
            } else if (typeof campo[prop] === 'boolean') {
                const div = document.createElement('div');
                div.classList.add(`item${count + 1}`);
                section.appendChild(div);
                const p1 = document.createElement('p');
                p1.textContent = titulo[count];
                div.appendChild(p1);
                const p2 = document.createElement('p');
                p2.textContent = campo[prop] ? 'SIM' : 'NÃO'; // aqui é onde recebe os dados da api
                div.appendChild(p2);
            }
            count++;
        }

        const div = document.createElement('div');
        const img = document.createElement('img');
        const combobox = document.createElement('div');
        const editar = document.createElement('p');
        const deletar = document.createElement('p');
        div.classList.add('item10');
        combobox.classList.add('opcao');
        editar.classList.add('editar');
        editar.textContent = 'Editar';
        deletar.classList.add('deletar');
        deletar.textContent = 'Deletar';
        img.src = './src/img/engrenagem.png';
        section.appendChild(div);
        div.appendChild(img);
        div.appendChild(combobox);
        combobox.appendChild(editar);
        combobox.appendChild(deletar);
        
        div.addEventListener('mouseenter', configHover);
        div.addEventListener('mouseleave', configLeave);
        editar.addEventListener('click', ()=> editarUser(campo));
        deletar.addEventListener('click', ()=> deletarUser(campo.email));
    }
}  

function configHover (event){
    const combobox = event.currentTarget.querySelector('.opcao')
     combobox.style.display = 'block';
}

function configLeave (event){
    const combobox = event.currentTarget.querySelector('.opcao')
    combobox.style.display = 'none';
}

function editarUser (campo){
    let campoAlterado = [];
    // campoAlterado.push({name: 'email', value: campo.email});
    let count;
    const tipo = ['text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text'];
    const name = ['nome', 'email', 'cpf', 'celular', 'endereco', 'sexo', 'login', 'senha', 'funcao'];
    const placeholder = ['Nome', 'Email', 'CPF', 'Telefone', 'Endereço', 'Sexo', 'Login', 'Senha', 'Função'];
    const form = document.createElement('form');
    form.enctype = 'multipart/form-data';
    const buttonForm = document.createElement('button');
    buttonForm.type = 'submit';
    buttonForm.id = 'formEditar';
    buttonForm.textContent = 'Alterar';
    form.classList.add('formEditar');
    if(entradaDado.classList.contains('entrada-dados-on')){
        form.classList.add('formEditar-on');
    }
    for(let i=0;i < 9;i++){
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = tipo[i];
        input.name = name[i];
        input.placeholder = placeholder[i];
        input.value = campo[name[i]];
        form.appendChild(label);
        label.appendChild(input);
    }

    document.querySelector('.main-content').appendChild(form);
    form.appendChild(buttonForm);


    form.addEventListener('submit', function(event) {
            event.preventDefault();
            setTimeout(() => {
                envioDadosEditados();
            }, 100);
    });

    async function envioDadosEditados () {
        const token = sessionStorage.getItem('token');
        campoAlterado.push('token', token);

        name.forEach(nome =>{
            const input = form.querySelector(`input[name="${nome}"]`);
            campoAlterado.push({name: input.name, value: input.value}); 
        });

        saidaDado.innerHTML = '';
        document.querySelector('.main-content').removeChild(form);
        await alterarDados(campoAlterado);
        setTimeout(async function() {
            await listarUser();
        }, 1500);
    };
}

async function alterarDados(campoAlterado) {
    
    //aqui vai ficar o fetch de update da api

    fetch('http://localhost:3000/equipe/editar', {
        method: 'POST',
        body: JSON.stringify(campoAlterado)
    })
    .then(async response => {
        if(!response.ok){
            throw new Error('Erro ao atualizar os dados do motorista');
        }
        return await response.json();
    })
    .then(data => {
        console.log('Dados do motorista atualizados: ', data);
    })
    .catch(error => {
        console.error('Erro:', error);
    });

}

async function deletarUser(email) {
    const token = sessionStorage.getItem('token');
    const dell = {
        token: token,
        email: email
    };
    console.log(dell);

    await fetch('http://localhost:3000/motorista/deletar', {
        method: 'DELETE', // Método HTTP
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dell) // Corpo da requisição com JSON stringificado
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao deletar os dados'); // Lançar erro se a resposta não for OK
        }
        return response.json(); // Parsear a resposta como JSON
    })
    .then(data => {
        console.log('Dados deletados com sucesso: ', data); // Manipular os dados retornados
        listarUser();
    })
    .catch(error => {
        console.error('Erro:', error); // Manipular erros
    });
}
