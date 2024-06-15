function criarComponente() {
    const header = document.querySelector('.init-header');
    const h1 = document.createElement('h1');
    const nav = document.createElement('nav');
    const button = document.createElement('button');
    const i = document.createElement('i');
    const ul = document.createElement('ul');
    const aClass = ['fa-bell', 'fa-circle-user'];
    const ids = ['', 'user-pag'];
    
    h1.textContent = "Gestão de Frota";
    header.appendChild(h1);
    header.appendChild(nav);
    nav.appendChild(button);
    button.id = 'buttonMenuBar';
    button.type = 'button';
    button.appendChild(i);
    i.classList.add('fa-solid', 'fa-bars');
    nav.appendChild(ul);

    for(index = 0; index < 2; index++){
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.id = ids[index];
        a.href = '#';
        const i = document.createElement('i');
        i.classList.add('fa-regular', aClass[index]);

        ul.appendChild(li);
        li.appendChild(a);
        a.appendChild(i);
    }

}

// Chamar a função para criar o componente
criarComponente();

const buttonMenuBar = document.getElementById('buttonMenuBar');
//TRABALHO QUE A EITIANE ME DEU
buttonMenuBar.addEventListener('click', () => {
    const menuBar = document.getElementById('menu-bar');
    
    if(!menuBar.classList.contains('none')) {
        menuBar.classList.add('hide')
        setTimeout(() => {
            menuBar.classList.add('none');
        }, 10);
    }
    else {
        menuBar.classList.remove('hide');
        menuBar.classList.remove('none');
    }

    if(menuBar.classList.contains('width')) menuBar.classList.remove('width');
    else menuBar.classList.add('width');

    if(!menuBar.classList.contains('width')){
        document.querySelector('.main-content').classList.add('main-content-on');
    }else {
        document.querySelector('.main-content').classList.remove('main-content-on');
    }
    if(typeof menuBarAlt === 'function') {
        menuBarAlt();
    }
    if(document.getElementById('buttonInquerito')) {
        replaceButton();
    }

});

document.getElementById("user-pag").addEventListener("click", function() {
    window.location.href = "https://chat.openai.com/";
  });