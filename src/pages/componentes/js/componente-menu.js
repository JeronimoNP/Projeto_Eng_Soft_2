function criarComponente() {

    const main = document.querySelector('.main-container');
    const nav = document.createElement('nav');
    const ul = document.createElement('ul');
    const ids = ['super-adm', 'veiculos', 'drivers', 'reservas', 'relatorio', 'combustivel', 'ordem-trabalho', 'lembretes-servico', 'equipe', 'config', 'inqueritos'];
    const aClass = ['fa-user-tie', 'fa-car', 'fa-id-card', 'fa-calendar-days', 'fa-chart-line', 'fa-gas-pump', 'fa-list-check', 'fa-laptop-file', 'fa-users', 'fa-gears', 'fa-headset'];
    const pContent = ['Super Administrador', 'Veículos', 'Drivers', 'Reservas', 'Relatório', 'Combustivel', 'Ordem de Trabalho', 'Lembretes de Serviços', 'Equipe', 'Configurações', 'Inquéritos']
    main.appendChild(nav);
    nav.id = 'menu-bar'
    nav.classList.add('menu-bar');
    nav.classList.add('width');
    nav.classList.add('none');

    nav.appendChild(ul);
    
    for (let index = 0; index < 11; index++) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        const i = document.createElement('i');
        const p = document.createElement('p');
        p.textContent = pContent[index];

        ul.appendChild(document.createComment(` Item ${index+1} da lista `));
        ul.appendChild(li);
        li.appendChild(a);
        a.id = ids[index];
        a.href = '#';
        a.appendChild(i);
        i.classList.add('fa-solid', aClass[index]);
        a.appendChild(p);
    }
    
}

// Chamar a função para criar o componente
criarComponente();

document.getElementById("super-adm").addEventListener("click", function(e) {
    e.preventDefault();
    window.location.href = "https://chat.openai.com/";
  });

document.getElementById("veiculos").addEventListener("click", function(e) {
    e.preventDefault();
    window.location.href = '../cadastro veiculo/gerencia-veiculos.html';
  });
document.getElementById("drivers").addEventListener("click", function(e) {
    e.preventDefault();
    window.location.href = '../cadastro motorista/gerencia-drivers.html';
  });

document.getElementById("reservas").addEventListener("click", function(e) {
    e.preventDefault();
    window.location.href = "https://chat.openai.com/";
  });

document.getElementById("relatorio").addEventListener("click", function(e) {
    e.preventDefault();
    window.location.href = "https://chat.openai.com/";
  });

document.getElementById("combustivel").addEventListener("click", function(e) {
    e.preventDefault();
    window.location.href = "https://chat.openai.com/";
  });

document.getElementById("ordem-trabalho").addEventListener("click", function(e) {
    e.preventDefault();
    window.location.href = "https://chat.openai.com/";
  });

document.getElementById("lembretes-servico").addEventListener("click", function(e) {
    e.preventDefault();
    window.location.href = "https://chat.openai.com/";
  });

document.getElementById("equipe").addEventListener("click", function(e) {
    e.preventDefault();
    window.location.href = "https://chat.openai.com/";
  });

document.getElementById("config").addEventListener("click", function(e) {
    e.preventDefault();
    window.location.href = "https://chat.openai.com/";
  });

document.getElementById("inqueritos").addEventListener("click", function(e) {
    e.preventDefault();
    
    window.location.href = "https://chat.openai.com/";
  });