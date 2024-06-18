document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-btn');

    searchBtn.addEventListener('click', async () => {
        const routeId = document.getElementById('route-id').value.trim();

        if (!routeId) {
            alert('Por favor, insira o ID da rota.');
            return;
        }

        try {
            const { cep1, cep2 } = await getCepsFromRouteId(routeId);
            const address1 = await getAddressFromCep(cep1);
            const address2 = await getAddressFromCep(cep2);

            const location1 = await getCoordinatesFromAddress(address1);
            const location2 = await getCoordinatesFromAddress(address2);

            const distance = calculateDistance(location1.lat, location1.lon, location2.lat, location2.lon);
            document.getElementById('distance').textContent = `Distância: ${distance.toFixed(2)} km`;

            showMap(location1, location2);
        } catch (error) {
            console.error('Erro ao buscar rota:', error);
            alert('Erro ao buscar rota. Detalhes: ' + error.message);
        }
    });

    async function getCepsFromRouteId(routeId) {
        try {
            const response = await axios.get(`http://localhost:3000/servico/buscar?id=${routeId}&token=${sessionStorage.getItem('token')}`);
            if (response.data.error) {
                throw new Error('Rota não encontrada');
            }
            return {
                cep1: response.data.cepBusca,
                cep2: response.data.cepEntrega
            };
        } catch (error) {
            throw new Error('Erro ao obter CEPs da rota');
        }
    }

    async function getAddressFromCep(cep) {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            if (response.data.erro) {
                throw new Error('CEP não encontrado');
            }
            return response.data;
        } catch (error) {
            throw new Error('Erro ao obter endereço do CEP');
        }
    }

    async function getCoordinatesFromAddress(address) {
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/search?street=${address.logradouro}&city=${address.localidade}&state=${address.uf}&country=Brazil&format=json`);
            const data = response.data;
            if (data.length === 0) {
                throw new Error('Coordenadas não encontradas para o endereço');
            }
            return {
                lat: parseFloat(data[0].lat),
                lon: parseFloat(data[0].lon)
            };
        } catch (error) {
            throw new Error('Erro ao obter coordenadas do endereço');
        }
    }

    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // raio da Terra em km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a =
            0.5 - Math.cos(dLat) / 2 +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            (1 - Math.cos(dLon)) / 2;

        return R * 2 * Math.asin(Math.sqrt(a));
    }

    function showMap(coordsOrigem, coordsDestino) {
        // Definir ícones padrão do Leaflet usando CDN
        L.Icon.Default.mergeOptions({
            iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
        });

        const map = L.map('map').setView([coordsOrigem.lat, coordsOrigem.lon], 12);

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
    }
});
