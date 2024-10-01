document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    clearErrors();

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        });

        if (response.ok) {
            // Si el login es exitoso, redirigir al usuario
            alert('Login completado.');
            window.location.href = '/catalogo'; // Redirigir a Google o a la página deseada
        } else {
            // Manejar errores específicos de respuesta
            const result = await response.json();
            alert(result.message || 'Ocurrió un error en el login.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Ocurrió un error al loggear el usuario.');
    }
});

function clearErrors() {
    let errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function(el) {
        el.innerText = ''; // Limpia el contenido de los mensajes de error
    });
}
