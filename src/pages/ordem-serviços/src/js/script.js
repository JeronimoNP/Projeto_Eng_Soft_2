document.addEventListener('DOMContentLoaded', function() {
    const token = sessionStorage.getItem('token');
    if (!token) {
        console.error('Token não encontrado');
        window.location.href = '../Login/Login.html';
        return;
    }    
    fetch(`http://localhost:3000/servico/listar?token=${token}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
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
        const tbody = document.querySelector('#servicosTable tbody');
        data.forEach(servico => {
            const tr = document.createElement('tr');

            const tdId = document.createElement('td');
            tdId.textContent = servico.id;
            tr.appendChild(tdId);

            const tdNome = document.createElement('td');
            tdNome.textContent = servico.nome;
            tr.appendChild(tdNome);

            const tdDataBusca = document.createElement('td');
            tdDataBusca.textContent = new Date(servico.dataBusca).toLocaleDateString();
            tr.appendChild(tdDataBusca);

            const tdHorarioBusca = document.createElement('td');
            tdHorarioBusca.textContent = servico.horarioBusca;
            tr.appendChild(tdHorarioBusca);

            const tdEnderecoBusca = document.createElement('td');
            tdEnderecoBusca.textContent = servico.enderecoBusca;
            tr.appendChild(tdEnderecoBusca);

            const tdCepBusca = document.createElement('td');
            tdCepBusca.textContent = servico.cepBusca;
            tr.appendChild(tdCepBusca);

            const tdEnderecoEntrega = document.createElement('td');
            tdEnderecoEntrega.textContent = servico.enderecoEntrega;
            tr.appendChild(tdEnderecoEntrega);

            const tdCepEntrega = document.createElement('td');
            tdCepEntrega.textContent = servico.cepEntrega;
            tr.appendChild(tdCepEntrega);

            const tdParadas = document.createElement('td');
            tdParadas.textContent = servico.paradas || 'N/A';
            tr.appendChild(tdParadas);

            const tdKm = document.createElement('td');
            tdKm.textContent = servico.km;
            tr.appendChild(tdKm);

            const tdTransporte = document.createElement('td');
            tdTransporte.textContent = servico.transporte;
            tr.appendChild(tdTransporte);

            const tdEmpresa = document.createElement('td');
            tdEmpresa.textContent = servico.Empresa ? servico.Empresa.nome : 'N/A';
            tr.appendChild(tdEmpresa);

            tbody.appendChild(tr);
        });
    })
    .catch(error => {
        console.error('Erro ao buscar os serviços:', error);
    });
});
