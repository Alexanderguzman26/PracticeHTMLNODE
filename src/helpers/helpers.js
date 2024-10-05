document.getElementById('form').addEventListener('submit', async function(event) {
    console.log("iniciando validaciones");
    event.preventDefault();
    
    clearErrors();
    let method = '';
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
    if ((userName && password) && !fullName){
        console.log("enter ")
        //camino para log in
        method = "GET"
        if (!validateUsername(userName)) {
            showError('usernameError', 'El nombre de usuario no debe contener caracteres especiales.');
            isValid = false;
        }
    }else{
        // camino para register
        console.log("enter else")
        method = 'POST'
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
    
    let data = { method: method, headers: {'Content-Type': 'application/json' }}
    if (isValid) {
        try {
            let textAlert = '';
            if (body != ''){
                data.body = JSON.stringify(body);
                textAlert = "registro guardado correctamente!!"
            }
            console.log("data", data)
            const response = await fetch(url, data);
            if (response.ok) {
                alert('Registro completado.');
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
    let password = document.getElementById('password')?.value || undefined;
    let fullNameField = document.getElementById('fullName');
    let fullName = fullNameField ? fullNameField.value : '';
    let strengthBar = document.getElementById('passwordStrength');
    if (fullName !== '' && password.length >= 8) {
        if (password.length < 8) {
            strengthBar.className = 'strength-weak';
            showError('passwordError', 'La contraseña debe tener al menos 8 caracteres.');
        } else if (password.length >= 8 && /(?=.*[A-Za-z])(?=.*\d)/.test(password)) {
            if (password.length >= 12) {
                strengthBar.className = 'strength-strong';
                showError('passwordError', 'La contraseña es muy segura.');
            } else if (password.length >= 10) {
                strengthBar.className = 'strength-good';
                showError('passwordError', 'La contraseña es segura.');
            } else {
                strengthBar.className = 'strength-fair';
                showError('passwordError', 'La contraseña es débil.');
            }
        } else {
            strengthBar.className = 'strength-weak';
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