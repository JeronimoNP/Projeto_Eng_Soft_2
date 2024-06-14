 const button = document.querySelectorAll('.opcao button');

button.forEach(button => {
    button.addEventListener('click', () => {
        if(button.innerHTML === 'desativado') button.innerHTML = 'ativado';
        else button.innerHTML ='desativado';
    });
});