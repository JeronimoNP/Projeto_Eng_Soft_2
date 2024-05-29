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
    event.preventDefault();
    criarDriver();
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
            
            
            sessionStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXByZXNhSWQiOjUsImlhdCI6MTcxNjk5NDk4MSwiZXhwIjoxNzE3MDM4MTgxfQ.Nt0CMPL2WL2T5cTmI6AocfVpObZGGVdmWqhfY5EDVmY');
            const token = sessionStorage.getItem('token');
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


    // if(validarDados){
    //     ('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXByZXNhSWQiOjUsImlhdCI6MTcxNjkzNzA2NiwiZXhwIjoxNzE2OTgwMjY2fQ.bVOajTJtc1xpp24llATt6JIuzAyynHW2SLGm2ifUgRs');
    //     const token = sessionStorage.getItem('token');

    //     fetch('http://localhost:3000/motorista/cadastro',{
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}`
    //         },
    //         body: formData
    //     })
    //     .then(response => {
    //         if(!response.ok){
    //             throw new Error('Erro na aquisição');
    //         }
    //         return response.json();
    //     })
    //     .then(data =>{
    //         console.log('Reposta do servidor: ', data);
    //     })
    //     .catch(error => {
    //         console.error('Erro: ', error);
    //     });
    // }


function listarDriver() {
    const token = sessionStorage.getItem('token'); 

    fetch('http://localhost:3000/motorista/cadastro', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if(!response.ok){
            throw new Error('Erro na aquisição');
        }
        return response.json();
    })
    .then(data => {
        console.log('data:', data);
    })
    .catch(error => {
        console.error('Erro: ', error);
    });


    // const section = document.createElement('section');
    //     const titulo = ['Nome: ', 'Email: ', 'CNH: ', 'CPF: ', 'Endereço: ', 'Veículo: '];
    //     let count = 0;
    //     section.classList.add('section-saida');
    //     saidaDado.appendChild(section);
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
}