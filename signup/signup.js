document.getElementById('signupForm').addEventListener('submit', function(event) {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;
    const messageElement = document.getElementById('message');

    if (password !== confirmPassword) {
        event.preventDefault(); // Prevent form submission
        messageElement.textContent = 'Passwords do not match.';
    } else {
        messageElement.textContent = '';
    }
});
