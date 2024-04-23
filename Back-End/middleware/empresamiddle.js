

function verificaemail(email){
    const dominio = /^[a-zA-Z0-9.-]+@gmail\.com$/;
    const validade = dominio.test(email);
    return validade;
}

function verificatelefone(celular){
    const numero = /^[0-9]{9}$/;
    const validade = numero.test(celular);
    const quantidadenumber = celular.toString().length;
    if(validade === true){
        if(quantidadenumber > 9 || quantidadenumber < 9){
            return false;
        }
    }
    return validade;
}

module.exports = {
    verificaemail,
    verificatelefone
}