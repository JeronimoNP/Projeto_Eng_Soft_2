document.getElementById('search-icon').addEventListener('click', function () {
    const routeId = document.getElementById('route-id').value;
    const token = sessionStorage.getItem('token');

    if (!routeId) {
        alert('Por favor, insira o ID da rota.');
        return;
    }

    fetch(`http://localhost:3000/servico/${routeId}?token=${token}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                console.error('Erro na resposta do servidor:', errorData);
                throw new Error(JSON.stringify(errorData));
            });
        }
        return response.json();
    })
    .then(data => {
        console.log('Dados recebidos do servidor:', data);
        if (data.cepBusca && data.cepEntrega) {
            showMap(data.cepBusca, data.cepEntrega, data.km);
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao buscar serviço. Detalhes: ' + error.message);
    });
});

function showMap(cepOrigem, cepDestino, distancia) {
    const map = L.map('map').setView([-23.55052, -46.633308], 12); // Coordenadas iniciais de SP

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.Routing.control({
        waypoints: [
            L.latLng(-23.55052, -46.633308), // Coordenadas de exemplo para SP
            L.latLng(-23.55052, -46.633308)  // Coordenadas de exemplo para SP
        ],
        routeWhileDragging: true
    }).addTo(map);

    document.getElementById('distance').textContent = `Distância: ${distancia}`;
}
