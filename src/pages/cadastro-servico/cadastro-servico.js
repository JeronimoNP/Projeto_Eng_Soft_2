document.getElementById('gray-bar').addEventListener('click', function() {
    this.style.backgroundColor = 'black';
});

document.getElementById('green-bar').addEventListener('click', function() {
    this.style.backgroundColor = 'yellow';
});

document.getElementById('menu-button').addEventListener('click', function() {
    alert('Menu button clicked!');
});

document.getElementById('login-button').addEventListener('click', function() {
    alert('Login button clicked!');
});

document.getElementById('notification-button').addEventListener('click', function() {
    alert('Notification button clicked!');
});

document.getElementById('calendar-button').addEventListener('click', function() {
    alert('Calendar button clicked!');
});

document.getElementById('add-stop-button').addEventListener('click', function() {
    alert('Add stop button clicked!');
});

document.getElementById('schedule-button').addEventListener('click', function() {
    alert('Schedule button clicked!');
});
document.getElementById('schedule-button').addEventListener('click', function (event) {
    event.preventDefault();
    alert('Schedule button clicked!');
});
