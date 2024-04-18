const login = document.getElementById('longin');

login.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const passsword = document.getElementById('password').value;

    const response = await fetch('caminho pro back', {
     method: 'POST',
     headers: {
        'content-type': 'application/json'
     },   
     body: JSON.stringify({email, passsword})
    })
    const data = await response.json();

    if(response.ok){[
        window.location.href='#'
    ]} else {
        alert('Senha ou E-mail incorretos');
    }
});