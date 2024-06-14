document.addEventListener('DOMContentLoaded', () => {
    const endpoints = {
        veiculo: 'http://localhost:3000/veiculo/cadastro',
        equipe: 'http://localhost:3000/equipe/cadastro',
        motorista: 'http://localhost:3000/motorista/dashboard'
    };
    requisiApi(endpoints);
    async function requisiApi(endpoints){
        // Obter o token do sessionStorage
        const token = sessionStorage.getItem('token'); 
        if (!token) {
            console.error('Token não encontrado');
            window.location.href = '../Login/Login.html';
            return;
        }

        // Realizar a requisição GET com o token como parâmetro na URL
        try {
            const response = await fetch(endpoints.motorista+`?token=${encodeURIComponent(token)}`, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error('Erro na aquisição');
            }
            
            const data = await response.json();

            //condição para verificar se retornou um number
            if(!isNaN(data)){
                document.getElementById('motorista').querySelector('.count').textContent = data;
            }else{
                document.getElementById('motorista').querySelector('.count').textContent = "erro";
            }
            
        } catch (error) {
            console.error('Erro: ', error);
        }
    }

//     Object.keys(endpoints).forEach(key => {
//         fetch(endpoints[key])
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error(`Erro ao buscar dados de ${key}: ${response.status} ${response.statusText}`);
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 if (Array.isArray(data)) {
//                     document.getElementById(key).querySelector('.count').textContent = data.length;
//                 } else {
//                     document.getElementById(key).querySelector('.count').textContent = 'Erro no formato';
//                 }
//             })
//             .catch(error => {
//                 console.error('Erro ao buscar dados:', error);
//                 document.getElementById(key).querySelector('.count').textContent = 'Erro';
//             });
//     });
});
