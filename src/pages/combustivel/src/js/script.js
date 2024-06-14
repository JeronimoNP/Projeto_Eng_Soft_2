async function listarDriver() {
    const token = sessionStorage.getItem('token'); 
    
    if (!token) {
        console.error('Token não encontrado');
        window.location.href = '../login/login.html';
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/motorista/listar?token=${encodeURIComponent(token)}`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error('Erro na aquisição');
        }
        
        const data = await response.json();

        const motoristaSelect = document.getElementById('motorista');
        data.forEach(motorista => {
            const option = document.createElement('option');
            option.value = motorista.id;
            option.textContent = motorista.nome;
            motoristaSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erro: ', error);
    }
}

async function listarCarros() {
    const token = sessionStorage.getItem('token'); 
    
    if (!token) {
        console.error('Token não encontrado');
        window.location.href = '../login/login.html';
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/veiculo/listar?token=${encodeURIComponent(token)}`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error('Erro na aquisição');
        }
        
        const data = await response.json();

        const carroSelect = document.getElementById('carro');
        data.forEach(carro => {
            const option = document.createElement('option');
            option.value = carro.id;
            option.textContent = carro.modelo;
            carroSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erro: ', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    listarDriver();
    listarCarros();
});