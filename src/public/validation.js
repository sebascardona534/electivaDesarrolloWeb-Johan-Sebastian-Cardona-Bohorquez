// Muestra un mensaje en la consola para verificar que el archivo se carga correctamente
console.log("El archivo validation.js se ha cargado");

// Agrega el evento de envío al formulario
document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    console.log("Iniciando validaciones");
    event.preventDefault();
    
    clearErrors(); // Limpia errores anteriores

    // Obteniendo los valores de los campos
    let fullName = document.getElementById('fullName').value;
    let lastname = document.getElementById('lastname').value; // Obtener lastname
    let documentType = document.getElementById('documentType').value;  
    let documentNumber = document.getElementById('documentNumber').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    let isValid = true;

    // Validaciones
    if (!validateFullName(fullName)) {
        showError('fullNameError', 'El nombre completo no debe contener caracteres especiales no permitidos.');
        alert("El nombre completo no debe contener caracteres especiales no permitidos");
        isValid = false;
    }

    if (!validateFullName(lastname)) { // Validar lastname
        showError('lastnameError', 'El apellido no debe contener caracteres especiales no permitidos.');
        alert("El apellido no debe contener caracteres especiales no permitidos");
        isValid = false;
    }

    if (!validateDocumentNumber(documentNumber)) {
        showError('documentNumberError', 'El número de documento debe ser estrictamente un número.');
        alert("El número de documento debe ser estrictamente un número");
        isValid = false;
    }

    if (!validateEmail(email)) {
        showError('emailError', 'Ingrese un correo electrónico válido.');
        isValid = false;
    }

    if (!validatePhone(phone)) {
        showError('phoneError', 'Ingrese un número de teléfono válido.');
        isValid = false;
    }

    if (!validateUsername(username)) {
        showError('usernameError', 'El nombre de usuario no debe contener caracteres especiales.');
        isValid = false;
    }

    if (!validatePassword(password)) {
        showError('passwordError', 'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, un número y un carácter especial permitido.');
        isValid = false;
    }

    if (password !== confirmPassword) {
        showError('confirmPasswordError', 'Las contraseñas no coinciden.');
        isValid = false;
    }

    // Envío de datos si todas las validaciones son correctas
    if (isValid) {
        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "fullName": fullName,
                    "lastname": lastname, // Incluir lastname en el envío
                    "documentType": documentType,
                    "documentNumber": documentNumber,
                    "email": email,
                    "phone": phone,
                    "username": username,
                    "password": password
                })
            });

            if (response.ok) {
                alert('Registro completado.');
                document.getElementById('registrationForm').reset();
            } else {
                const result = await response.json();
                alert(result.error);
            }
        } catch (error) {
            console.log('Error:', error);
            alert('Ocurrió un error al registrar el usuario.');
        }
    }
});

// Validación de la contraseña con indicador de fortaleza
document.getElementById('password').addEventListener('input', function() {
    let password = document.getElementById('password').value;
    let strengthBar = document.getElementById('passwordStrength');
    strengthBar.className = 'password-strength';

    if (password.length < 8) {
        strengthBar.classList.add('strength-weak');
        showError('passwordError', 'La contraseña debe tener al menos 8 caracteres.');
    } else if (password.length >= 8 && /(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,:;])/.test(password)) {
        if (password.length >= 12) {
            strengthBar.classList.add('strength-strong');
            showError('passwordError', 'La contraseña es muy segura.');
        } else if (password.length >= 10) {
            strengthBar.classList.add('strength-good');
            showError('passwordError', 'La contraseña es segura.');
        } else {
            strengthBar.classList.add('strength-fair');
            showError('passwordError', 'La contraseña es débil.');
        }
    } else {
        strengthBar.classList.add('strength-weak');
        showError('passwordError', 'La contraseña es débil.');
    }
});

// Funciones de validación
function validateFullName(name) {
    let nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return nameRegex.test(name);
}

function validateDocumentNumber(documentNumber) {
    let documentNumberRegex = /^[0-9]+$/;
    return documentNumberRegex.test(documentNumber);
}

function validateEmail(email) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    let phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
}

function clearErrors() {
    let errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function(el) {
        el.innerText = '';
    });
}

function showError(elementId, message) {
    document.getElementById(elementId).innerText = message;
}

function validateUsername(username) {
    let usernameRegex = /^[a-zA-Z0-9_.-]+$/;
    return usernameRegex.test(username);
}

function validatePassword(password) {
    let passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}
