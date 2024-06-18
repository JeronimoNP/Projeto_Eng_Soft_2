document.addEventListener('DOMContentLoaded', function() {
    const diasContainer = document.getElementById('dias');
    const tabelaCorpo = document.getElementById('tabela-corpo');
    
    // Função para criar os dias do calendário
    function criarDias() {
        const diasNoMes = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
        for (let i = 1; i <= diasNoMes; i++) {
            const li = document.createElement('li');
            li.textContent = i;
            li.addEventListener('click', () => carregarServicos(i));
            diasContainer.appendChild(li);
        }
    }
    
    // Função para carregar todos os serviços
    async function carregarServicos(dia) {
        const token = sessionStorage.getItem('token');

        if (!token) {
            console.error('Token não encontrado');
            return;
        }

        console.log('Token:', token); // Verificar se o token está sendo lido corretamente

        try {
            const response = await fetch(`http://localhost:3000/servico/listar?token=${token}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                if (response.status === 403) {
                    console.error('Acesso negado. Verifique se o token está correto e possui as permissões necessárias.');
                }
                throw new Error('Erro na aquisição');
            }

            const data = await response.json();
            filtrarServicosPorDia(data, dia);
        } catch (error) {
            console.error('Erro ao carregar serviços:', error);
        }
    }
    
    // Função para filtrar os serviços por dia
    function filtrarServicosPorDia(servicos, dia) {
        const servicosFiltrados = servicos.filter(servico => {
            const dataServico = new Date(servico.dataBusca); // Utilizando o campo 'dataBusca'
            return dataServico.getDate() === dia;
        });
        preencherTabela(servicosFiltrados);
    }
    
    // Função para preencher a tabela com os serviços
    function preencherTabela(servicos) {
        tabelaCorpo.innerHTML = '';
        servicos.forEach(servico => {
            const tr = document.createElement('tr');
            const tdServico = document.createElement('td');
            const tdDetalhes = document.createElement('td');
            
            tdServico.textContent = servico.nome;
            tdDetalhes.textContent = `Endereço de Busca: ${servico.enderecoBusca}, Endereço de Entrega: ${servico.enderecoEntrega}, Transporte: ${servico.transporte}`;
            
            tr.appendChild(tdServico);
            tr.appendChild(tdDetalhes);
            tabelaCorpo.appendChild(tr);
        });
    }
    
    criarDias();
});