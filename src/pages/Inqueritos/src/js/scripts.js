document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('surveyForm');
    const thankYouMessage = document.getElementById('thankYouMessage');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = document.getElementById('message').value;
        const phoneNumber = '559991959995'; // numero do TI

        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');

        form.classList.add('');
        thankYouMessage.classList.remove('hidden');
    });
});

replaceButton();

function replaceButton() {
    const buttonForm = document.getElementById('surveyForm').querySelector('button');
    const form = document.getElementById('surveyForm');
    if(form.offsetWidth >= 600){
        buttonForm.style.left ='600px';
        buttonForm.style.transform = 'translate(-100%, 0)';
    } else{
        buttonForm.style.left = '';
        buttonForm.style.transform = '';
    }
}

window.addEventListener('resize', replaceButton);
