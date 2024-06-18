document.getElementById('schedule-button').addEventListener('click', async function (event) {
    event.preventDefault();

    const form = document.getElementById('servico-form');
    const formData = new FormData(form);

    const token = sessionStorage.getItem('token');
    formData.append('token', token);

    // Ajustando o campo "nome"
    if (formData.has('service-name')) {
        formData.set('nome', formData.get('service-name'));
        formData.delete('service-name');
    }

    // Formatando os campos de CEP
    const cepCampos = ['cepBusca', 'cepEntrega'];
    cepCampos.forEach(cep => {
        if (formData.has(cep)) {
            const valor = formData.get(cep);
            formData.set(cep, formatarCEP(valor));
        }
    });

    // Convertendo o campo "km" para inteiro, se existir
    if (formData.has('km')) {
        formData.set('km', parseInt(formData.get('km')));
    }

    // Função para formatar CEP para o formato "99999-999"
    function formatarCEP(cep) {
        // Remove tudo que não for número
        cep = cep.replace(/\D/g, '');

        // Adiciona o hífen
        if (cep.length === 8) {
            cep = cep.substring(0, 5) + '-' + cep.substring(5);
        }

        return cep;
    }

    // Verificar os dados antes de enviar
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    console.log('Dados do formulário:', data);

    try {
        const response = await fetch('http://localhost:3000/servico/cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(JSON.stringify(errorData));
        }

        const responseData = await response.json();
        console.log('Resposta do servidor:', responseData);
        alert('Serviço agendado com sucesso! ID: ' + responseData.id);
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao agendar serviço. Detalhes: ' + error.message);
    }
});







