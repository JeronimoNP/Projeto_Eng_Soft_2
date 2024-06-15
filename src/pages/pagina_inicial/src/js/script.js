document.addEventListener('DOMContentLoaded', () => {
    const endpoints = {
        veiculo: 'http://localhost:3000/veiculo/dashboard',
        equipe: 'http://localhost:3000/equipe/dashboard',
        motorista: 'http://localhost:3000/motorista/dashboard',
       servico: 'http://localhost:3000/Servico/dashboard'
    };

    requisiApi(endpoints);

    async function requisiApi(endpoints) {
        const token = sessionStorage.getItem('token'); 
        if (!token) {
            console.error('Token não encontrado');
            window.location.href = '../Login/Login.html';
            return;
        }

        const fetchPromises = Object.keys(endpoints).map(key => fetchData(endpoints[key], token));

        const results = await Promise.allSettled(fetchPromises);

        results.forEach((result, index) => {
            const endpointKey = Object.keys(endpoints)[index];
            if (result.status === 'fulfilled') {
                updateCount(endpointKey, result.value);
            } else {
                console.error(`Erro na aquisição dos dados para o endpoint ${endpointKey}: `, result.reason);
            }
        });


        resizeText();    
        
    }

    async function fetchData(endpoint, token) {
        const response = await fetch(endpoint + `?token=${encodeURIComponent(token)}`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error('Erro na aquisição');
        }

        return response.json();
    }

    function updateCount(endpointKey, data) {
        const countElement = document.getElementById(endpointKey).querySelector('.count');
        if (!isNaN(data)) {
            countElement.textContent = data;
        } else {
            countElement.textContent = "erro";
        }
    }

    
});

function resizeText() {
    const content = document.querySelectorAll('.count');

    content.forEach(element => {
    if(element.textContent !== "Carregando..."){
            if(window.innerWidth <= 700){
                element.style.fontSize = "2em";
            }else {
                element.style.fontSize = "3em";
            }
    }

});
}

window.addEventListener('resize', resizeText);