document.getElementById('schedule-button').addEventListener('click', function (event) {
    event.preventDefault();

    const form = document.getElementById('servico-form');
    const formData = new FormData(form);

    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    const token = localStorage.getItem('token'); 

    fetch('http://localhost:3000/servico/cadastro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert('Serviço agendado com sucesso!');
    })
    .catch((error) => {
        console.error('Erro:', error);
        alert('Erro ao agendar serviço.');
    });
});
