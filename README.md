inicio do progeto


Documentação do uso da API

    *Dados de input de cada rota
        -Entidade motorista
            /cadastro método post{

                    "nome": "test",
                    "email": "test@gmail.com",
                    "cnh": "12345678901",//11 digitos
                    "cpf": "12345678901234",// 14 digitos
                    "endereco": "moro bem ali 4",
                    "celular": "99991959995",
                    "ativo": "0",
                    "empresaId": "1"
                }

            /listar método get{

                    "empresaId": "1"
                }

            /editar método post{

                    "nome": "test",
                    "email": "test@gmail.com", //campo obrigatorio, (chave de motorista)
                    "cnh": "12345678901",//11 digitos
                    "cpf": "12345678901234",// 14 digitos
                    "endereco": "moro bem ali 4",
                    "celular": "99991959995",
                    "ativo": "0",
                    "empresaId": "1"    //Campo obrigatorio, (encontrar tabela db)
                }

            /deletar método delete{

                    "email": "mateus@gmail.com",
                    "empresaId": "1"
                }
        
        -Entidade Empresa
            /cadastro método post{

                    "nome": "test",
                    "email": "test@gmail.com",
                    "celular": "99999999999",
                    "cnpj": "0000000",
                    "endereco": "moro ali na esquina",
                    "senha": "senhasecreta"
            }