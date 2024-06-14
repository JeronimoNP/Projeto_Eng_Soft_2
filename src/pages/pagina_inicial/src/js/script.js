document.addEventListener('DOMContentLoaded', () => {
    const endpoints = {
        veiculo: 'http://localhost:3000/veiculo/cadastro',
        equipe: 'http://localhost:3000/equipe/cadastro',
        motorista: 'http://localhost:3000/motorista/cadastro'
    };

    Object.keys(endpoints).forEach(key => {
        fetch(endpoints[key])
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ao buscar dados de ${key}: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    document.getElementById(key).querySelector('.count').textContent = data.length;
                } else {
                    document.getElementById(key).querySelector('.count').textContent = 'Erro no formato';
                }
            })
            .catch(error => {
                console.error('Erro ao buscar dados:', error);
                document.getElementById(key).querySelector('.count').textContent = 'Erro';
            });
    });
});
