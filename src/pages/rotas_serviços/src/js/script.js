document.getElementById('search-icon').addEventListener('click', fetchRouteAndShowMap);

async function fetchRouteAndShowMap() {
    const routeId = document.getElementById('route-id').value;
    const token = sessionStorage.getItem('token');
    
    if (!token) {
        console.error('Token não encontrado');
        window.location.href = '../Login/Login.html';
        return;
    }

    if (!routeId) {
        alert('Por favor, insira o ID da rota.');
        return;
    }
    
    console.log(token, routeId);

    try {
        const response = await fetch(`http://localhost:3000/servico/buscar?id=${routeId}&token=${token}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erro na resposta do servidor:', errorData);
            throw new Error(JSON.stringify(errorData));
        }

        const data = await response.json();
        console.log('Dados recebidos do servidor:', data);

        if (data.cepBusca && data.cepEntrega) {
            const coordsOrigem = await geocodeCep(data.cepBusca);
            const coordsDestino = await geocodeCep(data.cepEntrega);
            showMap(coordsOrigem, coordsDestino, data.km);
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao buscar serviço. Detalhes: ' + error.message);
    }
}

async function geocodeCep(cep) {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?postalcode=${cep}&country=Brazil&format=json`);
    const data = await response.json();
    
    if (data.length > 0) {
        return {
            lat: data[0].lat,
            lon: data[0].lon
        };
    } else {
        throw new Error(`Não foi possível encontrar coordenadas para o CEP: ${cep}`);
    }
}

let map; // Variável global para o mapa

function showMap(coordsOrigem, coordsDestino, distancia) {
    // Se o mapa já estiver inicializado, remova-o
    if (map) {
        map.remove();
    }

    // Inicializa um novo mapa centralizado no ponto de origem
    map = L.map('map').setView([coordsOrigem.lat, coordsOrigem.lon], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.Routing.control({
        waypoints: [
            L.latLng(coordsOrigem.lat, coordsOrigem.lon),
            L.latLng(coordsDestino.lat, coordsDestino.lon)
        ],
        routeWhileDragging: true
    }).addTo(map);

    document.getElementById('distance').textContent = `Distância: ${distancia}`;
}
