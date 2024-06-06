const buttonCadastro = document.getElementById('button-cadastro');
const entradaDado = document.getElementById('entrada-dados');
const saidaDado = document.getElementById('saida-dados');
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

    entradaDado.addEventListener('submit', function(event) {
        event.preventDefault();
        const formDado = document.getElementById('vehicleForm');        

        criarDriver();

        async function criarDriver() {
            const camposInput = formDado.querySelectorAll('input[type="text"], input[type="email"], input[type="file"]');
            let validarDados = true;
            const token = sessionStorage.getItem('token');
            const formData = new FormData(); // Use FormData para construir o corpo da solicitação
        
            formData.append('token', token);
        
            for (let campo of camposInput) {
                console.log(campo.type);
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
                    console.log(campo.name, campo.value);
                    formData.append(campo.name, campo.value); // Adicione os campos ao FormData
                    console.log(`Adicionado ao formData: ${campo.name} = ${campo.value}`);
                    console.log('oi');
                } else if(campo.type === 'file'){
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
                console.log(token);
        
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
    });
    
    async function listarDriver() {
        // Obter o token do sessionStorage
        const token = sessionStorage.getItem('token'); 
        console.log(token);
            
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
            console.log('data:', data);

            // Chamar a função para renderizar os dados
            renderizarDados(data);    
        } catch (error) {
            console.error('Erro: ', error);
        }
    }

    function renderizarDados(dados) {
        const saidaDado = document.getElementById('saidaDado'); // Certifique-se de que o elemento existe
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
            const titulo = [ 'ID: ', 'Nome: ', 'Email: ', 'CNH: ', 'CPF: ', 'Celular: ', 'Endereço: ', 'Ativo: '];
            const propriedade = ['imagem', 'id','nome', 'email', 'cnh', 'cpf', 'celular', 'endereco', 'ativo'];
            let count = 0;

            section.classList.add('section-saida');
            saidaDado.appendChild(section);

            propriedade.forEach(propriedade => {    
                console.log(typeof campo[propriedade]);
                console.log('--'); 
                console.log(campo[propriedade]);
                console.log('--');          
                if(typeof campo[propriedade] === 'string' && campo[propriedade].length > 50){
                    console.log('sou uma imagem ou era pra ser');
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
                    }                  
                    count++;       
                });

            const div = document.createElement('div');
            const img = document.createElement('img');
            div.classList.add('item8');
            img.src = './src/img/engrenagem.png';
            section.appendChild(div);
            div.appendChild(img);
        });
    }
