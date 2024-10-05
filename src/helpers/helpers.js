document.getElementById('form').addEventListener('submit', async function(event) {
    console.log("iniciando validaciones");
    event.preventDefault();
    clearErrors();
    let method = 'POST';
    let body = '';
    let url = '/login';
    let userName = document.getElementById('username')?.value || undefined;
    let password = document.getElementById('password')?.value || undefined;
    let fullName = document.getElementById('fullName')?.value || undefined;
    let documentType = document.getElementById('documentType')?.value || undefined;  
    let documentNumber = document.getElementById('documentNumber')?.value || undefined;
    let email = document.getElementById('email')?.value || undefined;
    let phone = document.getElementById('phone')?.value || undefined;
    let confirmPassword = document.getElementById('confirmPassword')?.value || undefined;
    let strengthBar = document.getElementById('passwordStrength');
    let isValid = true;
    console.log("userName: " + userName + " password: " + password)
    if ((userName && password) && fullName === undefined){
        //camino para log in
        if (!validateUsername(userName)) {
            showError('usernameError', 'El nombre de usuario no debe contener caracteres especiales.');
            isValid = false;
        }
        body = {
            "username": userName,
            "password": password
        }
    }else{
        // camino para register
        url = '/register'
        if (!validateFullName(fullName)) {
            showError('fullNameError', 'El nombre completo no debe contener caracteres especiales no permitidos.');
            alert("El nombre completo no debe contener caracteres especiales no permitidos");
            isValid = false;
        }
        if (!validateUsername(userName)) {
            showError('usernameError', 'El nombre de usuario no debe contener caracteres especiales.');
            isValid = false;
        }
        if (!validatePassword(password)) {
            showError('passwordError', 'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, un número y un carácter especial permitido.');
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
        if (password !== confirmPassword) {
            showError('confirmPasswordError', 'Las contraseñas no coinciden.');
            isValid = false;
        }
        body = {
            "fullName": fullName,
            "documentType": documentType,
            "documentNumber": documentNumber,
            "email": email,
            "phone": phone,
            "username": userName,
            "password": password
        }
    }
    
    let data = { 
        method: method,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json' 
            }
        }
    if (isValid) {
        try {
            let textAlert = '';
            if (fullName != undefined)
                textAlert = "registro guardado correctamente!!"
            console.log("before", data)
            const response = await fetch(`http://localhost:8000${url}`, data);
            console.log("after ", response)
            if (response.ok) {
                document.getElementById('form').reset();
                alert(textAlert)
                if (body != '')
                    window.location.href = '/src/views/home/home.html';    
                else
                    window.location.href = '/src/views/login.html';
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


document.getElementById('password').addEventListener('blur', function() {
    let password = document.getElementById('password')?.value || 0;
    let fullName = document.getElementById('fullName')?.value || '';
    let passwordBar = document.getElementById('password');
    passwordBar.classList.remove('strength-weak', 'strength-fair', 'strength-good', 'strength-strong');
    if (fullName !== '') {
        if (password.length < 8) {
            passwordBar.classList.add('strength-weak');
            showError('passwordError', 'La contraseña debe tener al menos 8 caracteres.');
        } else if (password.length >= 8 && /(?=.*[A-Za-z])(?=.*\d)/.test(password)) {
            if (password.length >= 12) {
                passwordBar.classList.add('strength-strong');
                showError('passwordError', 'La contraseña es muy segura.');
            } else if (password.length >= 10) {
                passwordBar.classList.add('strength-good');
                showError('passwordError', 'La contraseña es segura.');
            } else {
                passwordBar.classList.add('strength-fair');
                showError('passwordError', 'La contraseña es débil.');
            }
        } else {
            passwordBar.classList.add('strength-weak');
            showError('passwordError', 'La contraseña es débil.');
        }
    }
});



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