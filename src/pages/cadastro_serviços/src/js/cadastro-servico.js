document.getElementById('schedule-button').addEventListener('click', function (event) {
    event.preventDefault();

    const form = document.getElementById('servico-form');
    const formData = new FormData(form);

    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    console.log('Dados do formulário:', data); // verificar os dados enviados

    const token = sessionStorage.getItem('token'); 

    fetch('http://localhost:3000/servico/cadastro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
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