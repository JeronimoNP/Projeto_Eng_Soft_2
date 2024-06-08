const buttonCadastro = document.getElementById('button-cadastro');
const entradaDado = document.getElementById('entrada-dados');
const saidaDado = document.getElementById('saidaDado');
let novoIcone = document.createElement('i');
let novoParagrafo = document.createElement('p');
buttonCadastro.appendChild(novoIcone);
novoIcone.classList.add('fa-solid', 'fa-circle-xmark');
novoParagrafo.innerHTML = "Cadastro de Motorista";
formMobile();
resizeTela();
let dados = '';
buttonCadastro.addEventListener('click', formMobile);
window.addEventListener('resize', resizeTela);

function menuBarAlt() {
    entradaDado.classList.toggle('entrada-dados-on');
    buttonCadastro.classList.toggle('button-cadastro-on');
    saidaDado.classList.toggle('saida-dados-on');

    
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
    listarDriver();
    entradaDado.addEventListener('submit', async function(event){
        event.preventDefault();
        setTimeout(() => {
            envioDados();
        }, 100);
    });

async function envioDados() {

        const formDado = document.getElementById('vehicleForm');        

            const camposInput = formDado.querySelectorAll('input[type="text"], input[type="email"], input[type="file"]');
            let validarDados = true;
            const token = sessionStorage.getItem('token');
            const formData = new FormData(); // Use FormData para construir o corpo da solicitação
        
            formData.append('token', token);
        
            for (let campo of camposInput) {
                const placeholder = campo.placeholder;
                if (campo.value === '') {
                    if (!campo.placeholder.includes(': campo vazio!')) {
                        campo.placeholder = placeholder + ': campo vazio!';
                        campo.style.border = '1px solid red';
                        validarDados = false;
                    }
                } else if(campo.type === 'text') {
                    campo.placeholder = placeholder.replace(new RegExp(': campo vazio!', 'g'), '');
                    campo.style.border = 'none';
                    formData.append(campo.name, campo.value); // Adicione os campos ao FormData
                    console.log(`Adicionado ao formData: ${campo.name} = ${campo.value}`);
                } else if(campo.type === 'file' && campo.files.length > 0){
                    formData.append(campo.name, campo.files[0]); // Adicione os arquivos ao FormData
                    console.log(`Adicionado ao formData: ${campo.name} = ${campo.files[0]}`);
                }
            }
        
            if (validarDados) {
                
                if (!token) {
                    console.error('Token não encontrado');
                    return;
                }
                formData.append('token', token);
        
                try {
                    const response = await fetch('http://localhost:3000/motorista/cadastro', {
                        method: 'POST',
                        headers: {
                            // 'Content-Type': 'multipart/form-data',
                            // 'Authorization': `Bearer ${token}`
                        },
                        body: (formData) // Use o FormData como corpo da solicitação
                    });
                    if (response.ok) {
                        const data = await response.json();
                        console.log('Motorista cadastrado com sucesso', data);
                        listarDriver();
                        
                    } else {
                        const errorData = await response.json();
                        console.error('ERRO ao cadastrar motorista', errorData);
                    }
                } catch (error) {
                    console.error("Erro de rede", error);
                }
            }
        
    }
    
    async function listarDriver() {
        // Obter o token do sessionStorage
        const token = sessionStorage.getItem('token'); 
            
        if (!token) {
            console.error('Token não encontrado');
            return;
        }

        // Realizar a requisição GET com o token como parâmetro na URL
        try {
            const response = await fetch(`http://localhost:3000/motorista/listar?token=${encodeURIComponent(token)}`, {
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

    function isBase64Image(str) {
        if(str.length % 4 === 0 && (/^[A-Za-z0-9+/]+={0,2}$/).test(str)){
            const img = new Image();
            img.src = "data:image/jpg;base64," + str;
            return img.complete && img.naturalWidth !== 0;
        } 
    }

    function renderizarDados(dados) {
        if (!saidaDado) {
            console.error('Elemento saidaDado não encontrado');
            return;
        }
        if(saidaDado.children.length > 0){
            saidaDado.innerHTML = '';
        }

                // Adicionar os dados dos motoristas à tabela
        
        dados.forEach(campo => {
            const section = document.createElement('section');
            const titulo = ['', 'ID: ', 'Nome: ', 'Email: ', 'CNH: ', 'CPF: ', 'Celular: ', 'Endereço: ', 'Ativo: '];
            const propriedade = ['imagem', 'id','nome', 'email', 'cnh', 'cpf', 'celular', 'endereco', 'ativo'];
            let count = 0;
            

            section.classList.add('section-saida');
            saidaDado.appendChild(section);

            propriedade.forEach(propriedade => {            
                if((typeof campo[propriedade] === 'string') && isBase64Image(campo[propriedade])){
                    const img = document.createElement('img');
                    img.src = "data:image/jpg;base64," + campo[propriedade]; // aqui é onde recebe a imagem da api
                    section.appendChild(img);
                    img.classList.add(`item${count+1}`);
                 
                } else if(typeof campo[propriedade] === 'string' || typeof campo[propriedade] === 'number'){
                    const div = document.createElement('div');
                    div.classList.add(`item${count+1}`);
                    section.appendChild(div);
                    const p1 = document.createElement('p');
                    p1.textContent = titulo[count];
                    div.appendChild(p1);
                    const p2 = document.createElement('p');
                    p2.textContent = campo[propriedade];  //aqui é onde recebe os dados da api
                    div.appendChild(p2);
                } else if(typeof campo[propriedade] === 'boolean'){
                    const div = document.createElement('div');
                    div.classList.add(`item${count+1}`);
                    section.appendChild(div);
                    const p1 = document.createElement('p');
                    p1.textContent = titulo[count];
                    div.appendChild(p1);
                    const p2 = document.createElement('p');
                    if(campo[propriedade]) p2.textContent = 'SIM'; //aqui é onde recebe os dados da api
                    else p2.textContent = 'NÃO'
                    div.appendChild(p2);
                }          
                count++;       
                });

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
            editar.addEventListener('click', ()=> editarMotorista(campo));
            deletar.addEventListener('click', ()=> deletarMotorista(campo));
        });
    }

function configHover (event){
    const combobox = event.currentTarget.querySelector('.opcao')
     combobox.style.display = 'block';
}

function configLeave (event){
    const combobox = event.currentTarget.querySelector('.opcao')
     combobox.style.display = 'none';
}

function editarMotorista (campo){
    let campoAlterado = [];
    let count;
    const tipo = ['file', 'text', 'text', 'text', 'text', 'text', 'text'];
    const name = ['imagem', 'nome', 'cnh', 'cpf', 'celular', 'endereco', 'ativo'];
    const placeholder = ['', 'Nome', 'CNH', 'CPF', 'Celular', 'Endereco', 'Ativo'];
    const form = document.createElement('form');
    form.enctype = 'multipart/form-data';
    const buttonForm = document.createElement('button');
    buttonForm.textContent = 'Alterar';
    form.classList.add('formEditar');
    for(let i=0;i < 7;i++){
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = tipo[i];
        input.name = name[i];
        input.placeholder = placeholder[i];
        
        if(input.type === 'file'){
            const pimagem = document.createElement('p');
            pimagem.textContent = 'Imagem do Motorista';
            input.style.display = 'none';
            label.appendChild(pimagem);
            input.files[0] = campo[name[i]];
            label.classList.add('formImagem');

        }else {
            input.value = campo[name[i]];
        }
        form.appendChild(label);
        label.appendChild(input);
        document.querySelector('.main-content').appendChild(form);
    }
    form.appendChild(buttonForm);


    buttonForm.addEventListener('click', (event) => {
        event.preventDefault();
        name.forEach(nome =>{
            const input = form.querySelector(`input[name="${nome}"]`);
            if(input.type === 'file'){
                campoAlterado.push({name: input.name, value: input.files[0]});
            }else{
                campoAlterado.push({name: input.name, value: input.value});
            }
        });

        saidaDado.innerHTML = '';
        document.querySelector('.main-content').removeChild(form);
        alterarDados(campoAlterado);
        listarDriver();
    });

}

//ESSA FUNÇÃO JOGAR OS DADOS ALTERADOS PARA UMA VARIAVEL FORMDATA E ENVIA PARA A API
function alterarDados(campoAlterado) {
    const token = sessionStorage.getItem('token');
    const formData = new FormData();

    formData.append('token', token);

    campoAlterado.forEach(campo => {
            formData.append(campo.name, campo.value);
    });

    console.log('formData:');
    for (let pair of formData.entries()) {
        console.log(pair[0]+ ': ' + pair[1]);
    }
    //aqui vai ficar o fetch de update da api

    fetch('http://localhost:3000/motorista/editar', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if(!response.ok){
            throw new Error('Erro ao atualizar os dados do motorista');
        }
        return response.json();
    })
    .then(data => {
        console.log('Dados do motorista atualizados: ', data);
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

function deletarMotorista (id){
    console.log(id);
}