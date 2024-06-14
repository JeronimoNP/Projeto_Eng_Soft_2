function criarComponente() {
    const mainComponent = `
        
    <!-- menu lateral -->
    <nav id="menu-bar" class="menu-bar">
        <!-- lista do menu -->
        <ul>
            
            <!-- item 1 da lista -->
            <li><a id="super-adm" href="#">
                    <i class="fa-solid fa-user-tie"></i>
                    <p>Super Administrador</p>
                </a></li>
            <!-- item 2 da lista -->
                <li><a id="veiculos" href="#">
                    <i class="fa-solid fa-car"></i>
                    <p>Veiculos</p>
                </a></li>
            <!-- item 3 da lista -->
                <li><a id=" drivers" href="#">
                    <i class="fa-solid fa-id-card"></i>
                    <p>Drivers</p>
                </a></li>
            <!-- item 4 da lista -->
                <li><a id="reservas" href="#">
                    <i class="fa-solid fa-calendar-days"></i>
                    <p>Reservas</p>
                </a>
            </li>
            <!-- item 5 da lista -->
            <li><a id="relatorio" href="#">
                    <i class="fa-solid fa-chart-line"></i>
                    <p>Relatório</p>
                </a>
            </li>
            <!-- item 6 da lista -->
            <li><a id="combustivel" href="#">
                    <i class="fa-solid fa-gas-pump"></i>
                    <p>Combustivel</p>
                </a>
            </li>
            <!-- item 7 da lista -->
            <li><a id="ordem-trabalho" href="#">
                    <i class="fa-solid fa-list-check"></i>
                    <p>Ordem de Trabalho</p>
                </a>
            </li>
            <!-- item 8 da lista -->
            <li><a id="lembretes-servico" href="#">
                    <i class="fa-solid fa-laptop-file"></i>
                    <p>Lembretes de Serviços</p>
                </a>
            </li>
            <!-- item 9 da lista -->
            <li><a id="equipe" href="#">
                    <i class="fa-solid fa-users"></i>
                    <p>Equipe</p>
                </a>
            </li>
            <!-- item 10 da lista -->
            <li><a id="config" href="#">
                    <i class="fa-solid fa-gears"></i>
                    <p>Configurações</p>
                </a>
            </li>
            <!-- item 11 da lista -->
            <li><a id="inqueritos" href="#">
                    <i class="fa-solid fa-headset"></i>
                    <p>Inquéritos</p>
                </a>
            </li>
        </ul>
    </nav>
    `;

    // Selecionar o corpo do documento
    const corpoDocumento = document.querySelector('.main-container');

    // Inserir o componente no corpo do documento
    corpoDocumento.innerHTML = mainComponent + corpoDocumento.innerHTML;
}

// Chamar a função para criar o componente
criarComponente();

document.getElementById("super-adm").addEventListener("click", function(e) {
    e.preventDefault();
    window.location.href = "https://chat.openai.com/";
  });

document.getElementById("veiculos").addEventListener("click", function(e) {
    e.preventDefault();
    window.location.href = "https://chat.openai.com/";
  });
document.getElementById("drivers").addEventListener("click", function(e) {
    e.preventDefault();
    window.location.href = "https://chat.openai.com/";
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