document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('surveyForm');
    const thankYouMessage = document.getElementById('thankYouMessage');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        form.classList.add('hidden');
        thankYouMessage.classList.remove('hidden');
    });
});
