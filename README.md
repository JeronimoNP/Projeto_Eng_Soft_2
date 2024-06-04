# Sistema de Gerenciamento de Frotas - Minha Gestão de Frota

## Introdução

O setor de transporte é vasto e multifacetado, abrangendo uma ampla gama de empresas dedicadas ao transporte de diversos tipos de carga. Com a crescente demanda por eficiência e controle operacional, torna-se imperativo para empresas de pequeno e médio porte implementarem sistemas de gestão de frota eficazes.

Este projeto, "Minha Gestão de Frota", visa auxiliar no desenvolvimento e implementação de um sistema de gestão de frota específico, projetado para atender às necessidades das empresas de transporte de menor porte. O objetivo principal deste sistema é oferecer ferramentas e funcionalidades que permitam monitorar e otimizar as operações da frota, abordando questões como horas de direção prolongadas e outras práticas que possam impactar negativamente a segurança e eficiência do transporte.

## Equipe

- Jerônimo Noleto Pacheco
- Jherison Mattheus Sousa Lemos
- Leonardo Barbosa de Oliveira
- Lucas Fontinele Alves Sousa
- Eitiane Borges de Sousa
- Mateus dos Santos Rodrigues
- Vinicius Nunes de Sousa Costa

## Funcionalidades

### Autenticação e Autorização

- Cadastro e login de usuários.
- Recuperação de senha.
- Geração e validação de tokens JWT para autenticação.

### Gerenciamento de Empresas e Usuários

- Cadastro de novas empresas.
- Cadastro de funcionários da empresa.
- Edição e exclusão de contas.

### Gerenciamento de Motoristas e Veículos

- Cadastro de motoristas.
- Cadastro de veículos.
- Associação de motoristas a veículos.
- Edição e exclusão de motoristas e veículos.
- Visualização do status da frota.
- Histórico de rotas de veículos.

### Relatórios e Planejamento

- Geração de relatórios completos de operações.
- Planejamento de rotas para motoristas e veículos.
- Sistema de notificações para administradores e usuários.

### Outros Recursos

- Sistema de pagamento de mensalidades.
- Calendário com as atividades dos veículos.
- Sistema de inquérito para relatar bugs ou problemas no sistema.

## Tecnologias Utilizadas

- **Backend**
  - Node.js
  - Express.js
  - Sequelize (ORM)
  - Bcrypt (para hash de senhas)
  - Jsonwebtoken (JWT para autenticação)

- **Banco de Dados**
  - Microsoft SQL Server

## Requisitos de Instalação

1. **Pré-requisitos**
   - Node.js
   - NPM ou Yarn
   - Banco de dados Microsoft SQL Server

2. **Instalação**
   Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio

