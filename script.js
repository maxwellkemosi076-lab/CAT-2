const form = document.getElementById('registrationForm');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const successMessage = document.getElementById('successMessage');

// Validation functions
function validateUsername(username) {
    if (username.trim() === '') {
        return { valid: false, message: 'Username is required' };
    }
    if (username.length < 3) {
        return { valid: false, message: 'Username must be at least 3 characters' };
    }
    if (username.length > 20) {
        return { valid: false, message: 'Username must not exceed 20 characters' };
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        return { valid: false, message: 'Username can only contain letters, numbers, and underscores' };
    }
    return { valid: true, message: '' };
}

function validateEmail(email) {
    if (email.trim() === '') {
        return { valid: false, message: 'Email is required' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { valid: false, message: 'Please enter a valid email address' };
    }
    return { valid: true, message: '' };
}

function validatePassword(password) {
    if (password === '') {
        return { valid: false, message: 'Password is required' };
    }
    if (password.length < 6) {
        return { valid: false, message: 'Password must be at least 6 characters' };
    }
    if (password.length > 30) {
        return { valid: false, message: 'Password must not exceed 30 characters' };
    }
    return { valid: true, message: '' };
}

function validateConfirmPassword(password, confirmPassword) {
    if (confirmPassword === '') {
        return { valid: false, message: 'Please confirm your password' };
    }
    if (password !== confirmPassword) {
        return { valid: false, message: 'Passwords do not match' };
    }
    return { valid: true, message: '' };
}

// Display error message
function showError(input, errorElement, message) {
    input.classList.remove('valid');
    input.classList.add('invalid');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

// Clear error message
function clearError(input, errorElement) {
    input.classList.remove('invalid');
    input.classList.add('valid');
    errorElement.textContent = '';
    errorElement.classList.remove('show');
}

// Real-time validation
usernameInput.addEventListener('blur', () => {
    const validation = validateUsername(usernameInput.value);
    if (!validation.valid) {
        showError(usernameInput, document.getElementById('usernameError'), validation.message);
    } else {
        clearError(usernameInput, document.getElementById('usernameError'));
    }
});

emailInput.addEventListener('blur', () => {
    const validation = validateEmail(emailInput.value);
    if (!validation.valid) {
        showError(emailInput, document.getElementById('emailError'), validation.message);
    } else {
        clearError(emailInput, document.getElementById('emailError'));
    }
});

passwordInput.addEventListener('blur', () => {
    const validation = validatePassword(passwordInput.value);
    if (!validation.valid) {
        showError(passwordInput, document.getElementById('passwordError'), validation.message);
    } else {
        clearError(passwordInput, document.getElementById('passwordError'));
    }
});

confirmPasswordInput.addEventListener('blur', () => {
    const validation = validateConfirmPassword(passwordInput.value, confirmPasswordInput.value);
    if (!validation.valid) {
        showError(confirmPasswordInput, document.getElementById('confirmPasswordError'), validation.message);
    } else {
        clearError(confirmPasswordInput, document.getElementById('confirmPasswordError'));
    }
});

// Form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all fields
    const usernameValidation = validateUsername(usernameInput.value);
    const emailValidation = validateEmail(emailInput.value);
    const passwordValidation = validatePassword(passwordInput.value);
    const confirmPasswordValidation = validateConfirmPassword(passwordInput.value, confirmPasswordInput.value);

    let isValid = true;

    if (!usernameValidation.valid) {
        showError(usernameInput, document.getElementById('usernameError'), usernameValidation.message);
        isValid = false;
    } else {
        clearError(usernameInput, document.getElementById('usernameError'));
    }

    if (!emailValidation.valid) {
        showError(emailInput, document.getElementById('emailError'), emailValidation.message);
        isValid = false;
    } else {
        clearError(emailInput, document.getElementById('emailError'));
    }

    if (!passwordValidation.valid) {
        showError(passwordInput, document.getElementById('passwordError'), passwordValidation.message);
        isValid = false;
    } else {
        clearError(passwordInput, document.getElementById('passwordError'));
    }

    if (!confirmPasswordValidation.valid) {
        showError(confirmPasswordInput, document.getElementById('confirmPasswordError'), confirmPasswordValidation.message);
        isValid = false;
    } else {
        clearError(confirmPasswordInput, document.getElementById('confirmPasswordError'));
    }

    // If all fields are valid, show success message
    if (isValid) {
        successMessage.classList.add('show');
        form.reset();
        usernameInput.classList.remove('valid');
        emailInput.classList.remove('valid');
        passwordInput.classList.remove('valid');
        confirmPasswordInput.classList.remove('valid');

        // Hide success message after 3 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 3000);
    }
});
