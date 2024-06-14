document.querySelector('.add').addEventListener('click', function(event) {
    event.preventDefault(); // Impede o comportamento padrão de envio do formulário
    
    // Seleciona todos os campos de entrada dentro do formulário
    const inputs = document.querySelectorAll('#file-upload, #model, #type, #color, #plate, #group, #services, #driver');

    // Verifica se algum campo de entrada está vazio
    let isValid = true;
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('invalid'); // Opcionalmente marca visualmente os campos inválidos
        } else {
            input.classList.remove('invalid'); // Remove a marcação de inválido se o campo estiver preenchido
        }
    });

    if (!isValid) {
        alert('Por favor, preencha todos os campos.');
        return; // Impede o envio do formulário se algum campo estiver vazio
    }

    // Extrai os valores dos campos de entrada
    const formData = {};
    inputs.forEach(input => {
        formData[input.id] = input.value;
    });

    // Envia os dados do formulário para o backend (ou registra no console por enquanto)
    console.log(formData);

    // Limpa os campos de entrada após o envio
    inputs.forEach(input => {
        input.value = '';
    });
});