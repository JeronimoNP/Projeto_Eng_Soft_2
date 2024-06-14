document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('surveyForm');
    const thankYouMessage = document.getElementById('thankYouMessage');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = document.getElementById('message').value;
        const phoneNumber = '559991959995'; // Número do WhatsApp para o qual enviar a mensagem (formato internacional)

        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');

        form.classList.add('hidden');
        thankYouMessage.classList.remove('hidden');
    });
});

