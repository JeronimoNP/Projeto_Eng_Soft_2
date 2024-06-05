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
        // event.preventDefault();
        // criarDriver();
    });

    entradaDado.addEventListener('submit', function(event) {
        event.preventDefault();
        const entradaDado = document.getElementById('vehicleForm');
        criarDriver();

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
                console.log(token);

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


        // Adicionar os dados dos motoristas à tabela
        dados.forEach(campo => {
            const section = document.createElement('section');
            const titulo = ['ID: ', 'Nome: ', 'Email: ', 'CNH: ', 'CPF: ', 'Endereço: ', 'Veículo: '];
            const propriedade = ['imagem', 'id','nome', 'email', 'cnh', 'cpf', 'celular', 'endereco', 'ativo'];
            let count = 0;

            section.classList.add('section-saida');
            saidaDado.appendChild(section);

            propriedade.forEach(propriedade => {
                console.log('Tipo: ');
                console.log(typeof campo[propriedade]);
                console.log('----');
                if(typeof campo[propriedade] === 'string' || typeof campo[propriedade === 'number']){
                    const div = document.createElement('div');
                    section.appendChild(div);
                    const p1 = document.createElement('p');
                    p1.textContent = titulo[count];
                    console.log(titulo[count]);
                    div.appendChild(p1);
                    const p2 = document.createElement('p');
                    p2.textContent = campo[propriedade];  //aqui é onde recebe os dados da api
                    console.log(campo[propriedade]);
                    div.appendChild(p2);
                    div.classList.add(`item${count}`);
                    count++;
                }else if(campo[propriedade] instanceof File){
                    const img = document.createElement('img');
                    img.src = URL.createObjectURL(campo[propriedade]); // aqui é onde recebe a imagem da api
                    section.appendChild(img);
                    img.classList.add(`item${count}`);
                }
            });

            const div = document.createElement('div');
            const img = document.createElement('img');
            div.classList.add('item8');
            img.src = './src/img/engrenagem.png';
            section.appendChild(div);
            div.appendChild(img);
        });
    }
            // colunaNome.textContent = campo.nome || 'N/A';



            // colunaEmail.textContent = campo.email || 'N/A';


            // colunaCNH.textContent = campo.cnh || 'N/A';
            

            // colunaCelular.textContent = campo.celular || 'N/A';


            // Adicionar a linha ao corpo da tabela

        
        
    //     for(let campo of camposInput){
    //         count++;
    //         if(campo.type === 'text'){
    //             const div = document.createElement('div');
    //             section.appendChild(div);
    //             const p1 = document.createElement('p');
    //             p1.textContent = titulo[count-2];
    //             div.appendChild(p1);
    //             const p2 = document.createElement('p');
    //             p2.textContent = campo.value;  //aqui é onde recebe os dados da api
    //             div.appendChild(p2);
    //             div.classList.add(`item${count}`);
    //             campo.value = '';
    //         }else if(campo.type === 'file'){
    //             const img = document.createElement('img');
    //             img.src = URL.createObjectURL(campo.files[0]); // aqui é onde recebe a imagem da api
    //             section.appendChild(img);
    //             img.classList.add(`item${count}`);
    //             campo.value = '';
    //         }
    //     }
    //     const div = document.createElement('div');
    //     const img = document.createElement('img');
    //     div.classList.add('item8');
    //     img.src = './src/img/engrenagem.png';
    //     section.appendChild(div);
    //     div.appendChild(img);
    //     });
        
    // }

    //bugs, a tabela não atualiza
    //imagem não está sendo enviado para a api