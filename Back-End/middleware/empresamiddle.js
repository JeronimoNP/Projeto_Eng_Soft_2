

function verificaemail(email){
    const dominio = /^[a-zA-Z0-9.-]+@gmail.com$/;
    const validade = dominio.test(email);
    return validade;
}

function verificatelefone(celular){
    const numero = /^[0-9]{9}$/;
    const validade = !numero.test(celular);

    if(validade === true){
        const quantidadenumber = celular.toString().length;
        if(quantidadenumber != 11){
            return false;
        }
    }
    return validade;
}

function verificacnpj(cnpj){
    const numero = /^[0-9]{9}$/;
    const validade = !numero.test(cnpj);

    if(validade === true){
        const quantidadenumber = cnpj.toString().length;
        if(quantidadenumber != 14){
            return false;
        }
    }
    return validade;
}

module.exports = {
    verificaemail,
    verificatelefone,
    verificacnpj
}