const form = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', (e) => {
	e.preventDefault();

	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;

	if (username === 'aradhana' && password === 'pass12') {
		window.location.href = 'hello.html';
	} else {
		alert('Invalid username or password');
	}
});