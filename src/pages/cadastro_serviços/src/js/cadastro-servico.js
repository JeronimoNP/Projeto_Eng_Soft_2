document.getElementById('schedule-button').addEventListener('click', function (event) {
    event.preventDefault();

    const form = document.getElementById('servico-form');
    const formData = new FormData(form);

    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Transformar os dados do formulário para o formato esperado pela API
    const requestData = {
        nome: data['service-name'],
        dataBusca: data['search-date'], // Formato yyyy-MM-dd
        horarioBusca: data['search-time'], // Formato HH:mm
        enderecoBusca: data['search-address'],
        cepBusca: data['search-cep'].padStart(8, '0').replace(/^(\d{5})(\d{3})$/, '$1-$2'), // Garantir 8 dígitos com formatação 00000-000
        enderecoEntrega: data['delivery-address'],
        cepEntrega: data['delivery-cep'].padStart(8, '0').replace(/^(\d{5})(\d{3})$/, '$1-$2'), // Garantir 8 dígitos com formatação 00000-000
        paradas: data['stop'],
        km: parseInt(data['km'], 10), // Convertendo para número inteiro
        transporte: data['transporting'],
        ativo: "0"
    };

    console.log('Dados formatados para a API:', requestData); // verificar os dados formatados

    // Validar os dados formatados
    const errors = verificarCampos(requestData);
    if (errors.length > 0) {
        console.error('Erros de validação:', errors);
        alert('Erros de validação: ' + errors.join(', '));
        return;
    }

    // Obter o token do sessionStorage
    const token = sessionStorage.getItem('token'); 
        
    if (!token) {
        console.error('Token não encontrado');
        window.location.href = '../login/login.html';
        return;
    }

    // Adicionar o token ao corpo da requisição
    requestData.token = token;

    fetch('http://localhost:3000/servico/cadastro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestData)
    })
    .then(response => {
        console.log('Resposta do servidor:', response);  // verificar a resposta do servidor
        if (!response.ok) {
            return response.json().then(errorData => {
                console.error('Erro na resposta do servidor:', errorData); // detalhes do erro
                throw new Error(JSON.stringify(errorData));
            });
        }
        return response.json();
    })
    .then(data => {
        console.log('Dados recebidos do servidor:', data); // dados recebidos do servidor 
        alert('Serviço agendado com sucesso! ID: ' + data.id);
    })
    .catch((error) => {
        console.error('Erro:', error);
        alert('Erro ao agendar serviço. Detalhes: ' + error.message);
    });
});

function verificarCampos(dados) {
    let errors = [];

    if (!dados.nome || typeof dados.nome !== 'string') {
        errors.push("Nome inválido");
    }

    if (!dados.dataBusca || !/^\d{4}-\d{2}-\d{2}$/.test(dados.dataBusca)) {
        errors.push("Data da busca inválida");
    }

    if (!dados.horarioBusca || !/^[0-2][0-9]:[0-5][0-9]$/.test(dados.horarioBusca)) {
        errors.push("Horário da busca inválido");
    }

    if (!dados.enderecoBusca || typeof dados.enderecoBusca !== 'string') {
        errors.push("Endereço da busca inválido");
    }

    if (!dados.cepBusca || !/^[0-9]{5}-[0-9]{3}$/.test(dados.cepBusca)) {
        errors.push("CEP da busca inválido");
    }

    if (!dados.enderecoEntrega || typeof dados.enderecoEntrega !== 'string') {
        errors.push("Endereço da entrega inválido");
    }

    if (!dados.cepEntrega || !/^[0-9]{5}-[0-9]{3}$/.test(dados.cepEntrega)) {
        errors.push("CEP da entrega inválido");
    }

    if (dados.paradas && typeof dados.paradas !== 'string') {
        errors.push("Paradas inválidas");
    }

    if (!dados.km || typeof dados.km !== 'number' || dados.km <= 0) {
        errors.push("KM inválido");
    }

    if (!dados.transporte || typeof dados.transporte !== 'string') {
        errors.push("Informação do transporte inválida");
    }

    return errors;
}



