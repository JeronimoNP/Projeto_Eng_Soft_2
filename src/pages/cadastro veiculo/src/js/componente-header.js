function criarComponente() {
    const headerComponent = `
        
    <!-- titulo do cabeçalho -->
    <h1>
        Gestão de Frota
    </h1>

    <!-- menu superior -->
    <nav>
        <!-- botão lateral esquerda do menu -->
        <button id="buttonMenuBar" type="button">
            <i class="fa-solid fa-bars"></i>
        </button>
        <ul>
            <!-- icones na lateral direita do menu -->
            <li>
                <a href="#">
                    <i class="fa-regular fa-bell"></i>
                </a>
            </li>
            <li>
                <a id="user-pag" href="#">
                <i class="fa-regular fa-circle-user"></i>
                </a>
            </li>
        </ul>
    </nav>
    `;

    // Selecionar o corpo do documento
    const corpoDocumento = document.querySelector('.init-header');

    // Inserir o componente no corpo do documento
    corpoDocumento.innerHTML = headerComponent + corpoDocumento.innerHTML;
}

// Chamar a função para criar o componente
criarComponente();

const buttonMenuBar = document.getElementById('buttonMenuBar');

buttonMenuBar.addEventListener('click', () => {
    const menuBar = document.getElementById('menu-bar');

    menuBar.classList.toggle('hide');

});

document.getElementById("user-pag").addEventListener("click", function() {
    window.location.href = "https://chat.openai.com/";
  });