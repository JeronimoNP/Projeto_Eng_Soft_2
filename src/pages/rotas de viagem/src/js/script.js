// obter os CEPs de um ID de rota usando a API serviço-rotas que ainda vai ser implementada
async function getCepsFromRouteId(routeId) {
    const response = await axios.get(``);
    if (response.data.error) {
        throw new Error('Rota não encontrada');
    }
    return {
        cep1: response.data.cep1,
        cep2: response.data.cep2
    };
}

// obter o endereço de um CEP usando a API ViaCEP
async function getAddressFromCep(cep) {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    if (response.data.erro) {
        throw new Error('CEP não encontrado');
    }
    return response.data;
}

// obter as coordenadas de um endereço usando a API Nominatim
async function getCoordinatesFromAddress(address) {
    const response = await axios.get(`https://nominatim.openstreetmap.org/search?street=${address.logradouro}&city=${address.localidade}&state=${address.uf}&country=Brazil&format=json`);
    const data = response.data;
    if (data.length === 0) {
        throw new Error('Endereço não encontrado');
    }
    return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon)
    };
}

// calcular a distância 
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; 
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        0.5 - Math.cos(dLat)/2 + 
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        (1 - Math.cos(dLon))/2;

    return R * 2 * Math.asin(Math.sqrt(a));
}

//  buscar a rota e mostrar no mapa
async function fetchRouteAndShowMap() {
    const routeId = document.getElementById('route-id').value;

    try {
        const ceps = await getCepsFromRouteId(routeId);
        const address1 = await getAddressFromCep(ceps.cep1);
        const address2 = await getAddressFromCep(ceps.cep2);

        const location1 = await getCoordinatesFromAddress(address1);
        const location2 = await getCoordinatesFromAddress(address2);

        const distance = calculateDistance(location1.lat, location1.lon, location2.lat, location2.lon);
        document.getElementById('distance').innerText = `Distância: ${distance.toFixed(2)} km`;

    
        const map = L.map('map').setView([location1.lat, location1.lon], 7);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.Routing.control({
            waypoints: [
                L.latLng(location1.lat, location1.lon),
                L.latLng(location2.lat, location2.lon)
            ],
            routeWhileDragging: true,
            show: false 
        }).addTo(map);

    } catch (error) {
        alert('Erro: ' + error.message);
    }
}
