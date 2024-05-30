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
            // entradaDado.classList.remove('mobile');
            // entradaDado.classList.add('desktop');
            buttonCadastro.classList.add('hide-main');
            entradaDado.classList.remove('hide-main');

        }else {
            // entradaDado.classList.remove('desktop');
            // entradaDado.classList.add('mobile');
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
    entradaDado.addEventListener('submit', (event)=>{
        event.preventDefault();
        // criarDriver();
    });

    document.addEventListener('DOMContentLoaded', function() {
        const entradaDado = document.getElementById('vehicleForm');

        entradaDado.addEventListener('submit', (event) => {
            event.preventDefault();
            criarDriver();
        });

        async function criarDriver() {
            const camposInput = entradaDado.querySelectorAll('input[type="text"], input[type="email"]');
            let validarDados = true;
            const token = sessionStorage.getItem('token');
            const vehicleData = {};

            for (let campo of camposInput) {
                const placeholder = campo.placeholder;
                if (campo.value === '') {
                    if (!campo.placeholder.includes(': campo vazio!')) {
                        campo.placeholder = placeholder + ': campo vazio!';
                        campo.style.border = '1px solid red';
                        validarDados = false;
                    }
                } else {
                    campo.placeholder = placeholder.replace(new RegExp(': campo vazio!', 'g'), '');
                    campo.style.border = 'none';
                    vehicleData[campo.name] = campo.value;
                    console.log(`Adicionado ao vehicleData: ${campo.name} = ${campo.value}`);
                }
            }

            if (validarDados) {
                
                
                
                if (!token) {
                    console.error('Token não encontrado');
                    return;
                }
                vehicleData.token = token;

                // Verificando o conteúdo de vehicleData
                console.log(vehicleData);

                try {
                    const response = await fetch('http://localhost:3000/motorista/cadastro', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(vehicleData)
                    });
                    if (response.ok) {
                        const data = await response.json();
                        console.log('Motorista cadastrado com sucesso', data);
                        
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

        // Criar a tabela e o cabeçalho
        const tabela = document.createElement('table');
        const cabecalho = `
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>CNH</th>
                    <th>Celular</th>
                </tr>
            </thead>
        `;
        tabela.innerHTML = cabecalho;
        const corpoTabela = document.createElement('tbody');
        tabela.appendChild(corpoTabela);
        saidaDado.appendChild(tabela);

        // Adicionar os dados dos motoristas à tabela
        dados.forEach(campo => {
            const linha = document.createElement('tr');

            const colunaNome = document.createElement('td');
            colunaNome.textContent = campo.nome || 'N/A';
            linha.appendChild(colunaNome);

            const colunaEmail = document.createElement('td');
            colunaEmail.textContent = campo.email || 'N/A';
            linha.appendChild(colunaEmail);

            const colunaCNH = document.createElement('td');
            colunaCNH.textContent = campo.cnh || 'N/A';
            linha.appendChild(colunaCNH);

            const colunaCelular = document.createElement('td');
            colunaCelular.textContent = campo.celular || 'N/A';
            linha.appendChild(colunaCelular);

            // Adicionar a linha ao corpo da tabela
            corpoTabela.appendChild(linha);
        });
    }

    //bugs, a tabela não atualiza
    //imagem não está sendo enviado para a api