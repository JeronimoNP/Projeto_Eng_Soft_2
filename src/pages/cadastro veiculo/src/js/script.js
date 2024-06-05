const buttonCadastro = document.getElementById('button-cadastro');
const entradaDado = document.getElementById('entrada-dados');
const saidaDado = document.getElementById('saida-dados');

let novoIcone = document.createElement('i');
let novoParagrafo = document.createElement('p');
buttonCadastro.appendChild(novoIcone);
novoIcone.classList.add('fa-solid', 'fa-circle-xmark');
novoParagrafo.innerHTML = "Cadastro de Veiculo";

formMobile();
resizeTela();

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

entradaDado.addEventListener('submit', (event)=>{

    criarDriver();
});

async function criarDriver() {
    const vehicleData = {};
    const camposInput = entradaDado.querySelectorAll('#entrada-dados input[type="text"], #entrada-dados input[type="file"]');
    let validarDados = true;
    const token = sessionStorage.getItem('token');
    const formData = new FormData();
        for (let campo of camposInput) {
            const placeholder = campo.placeholder;
            if(campo.type === 'text'){
                if(campo.value === '') {
                    if(!campo.placeholder.includes(': campo vazio!'))
                        campo.placeholder = placeholder + ': campo vazio!';
                        campo.style.border = '1px solid red';
                        validarDados = false;
                }else{
                    campo.placeholder = placeholder.replace(new RegExp(': campo vazio!','g'),'');
                    campo.style.border = 'none';
                    //jogar os dados na api
                    formData.append(campo.name, campo.value);
                    vehicleData[campo.name] = campo.value;
                }
            }else if(campo.type === 'file'){
                if(campo.files.length === 0){
                    document.querySelector('.image').style.border = '1px solid red';
                    validarDados = false;
                }else {
                    document.querySelector('.image').style.border = 'none';
                    //jogar os dados na api
                    formData.append(campo.name, campo.value);
                }
            }
        }
        try {
            
            for (let pair of formData.entries()) {
                console.log(pair[0] + ', ' + pair[1]); 
            }
            //inserindo token na variavel de envio para a api
            vehicleData.token = token;
            //verificação de prototipagem de link a api retirar depois
            console.log(vehicleData);
            const response = await fetch('http://localhost:3000/veiculo/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(vehicleData)
            });
            //verificando se o veiculo foi cadastrado com sucesso
            if (response.ok) {
                const data = await response.json();
                console.log('Veiculo cadastrado com sucesso', data);
                
            } else {
                const errorData = await response.json();
                console.error('ERRO ao veiculo', errorData);
            }
        } catch (error) {
            console.error("Erro de rede", error);
        }
    
    if(validarDados){
        
        listarDriver(camposInput);

        // const token = sessionStorage.getItem('token');

        // fetch('http://localhost:3000/motorista/cadastro',{
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${token}`
        //     },
        //     body: formData
        // })
        // .then(response => {
        //     if(!response.ok){
        //         throw new Error('Erro na aquisição');
        //     }
        //     return response.json();
        // })
        // .then(data =>{
        //     console.log('Reposta do servidor: ', data);
        // })
        // .catch(error => {
        //     console.error('Erro: ', error);
        // });
    }
}

function listarDriver(camposInput) {
    // const token = sessionStorage.getItem('token'); 

    // fetch('http://localhost:3000/motorista/cadastro', {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${token}`
    //     }
    // })
    // .then(response => {
    //     if(!response){
    //         throw new Error('Erro na aquisição');
    //     }
    //     return response.json();
    // })
    // .then(data => {
    //     console.log('data:', data);
    // })
    // .catch(error => {
    //     console.error('Erro: ', error);
    // });


    const section = document.createElement('section');
        const titulo = ['Marca: ', 'Modelo: ', 'Tipo: ', 'Cor: ', 'CRLV: ', 'Placa: ', 'Em serviço', 'Driver Atribuido'];
        let count = 0;
        section.classList.add('section-saida');
        saidaDado.appendChild(section);
        for(let campo of camposInput){
            
            if(campo.type === 'text'){
                const div = document.createElement('div');
                section.appendChild(div);
                const p1 = document.createElement('p');
                p1.textContent = titulo[count-1];
                div.appendChild(p1);
                const p2 = document.createElement('p');
                p2.textContent = campo.value;  //aqui é onde recebe os dados da api
                div.appendChild(p2);
                div.classList.add(`item${count+1}`);
                campo.value = '';
            }else if(campo.type === 'file'){
                const img = document.createElement('img');
                img.src = URL.createObjectURL(campo.files[0]); // aqui é onde recebe a imagem da api
                section.appendChild(img);
                img.classList.add(`item${count+1}`);
                campo.value = '';
            }
            count++;
        }
        const div = document.createElement('div');
        const img = document.createElement('img');
        div.classList.add('item10');
        img.src = './src/img/engrenagem.png';
        section.appendChild(div);
        div.appendChild(img);
}