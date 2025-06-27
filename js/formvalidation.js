document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form-grid');
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    // Regex patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(?:(?:\+44)|(?:0))(?:\d{10}|\d{3}\s?\d{3}\s?\d{4}|\d{4}\s?\d{6})$/;

    // Validation functions
    function validateRequired(field, fieldName) {
        if (field.value.trim() === '') {
            showError(field, `${fieldName} is required`);
            return false;
        }
        clearError(field);
        return true;
    }

    function validateEmail(field) {
        if (!emailRegex.test(field.value.trim())) {
            showError(field, 'Please enter a valid email address');
            return false;
        }
        clearError(field);
        return true;
    }

    function validatePhone(field) {
        if (field.value.trim() !== '' && !phoneRegex.test(field.value.trim())) {
            showError(field, 'Please enter a valid UK phone number');
            return false;
        }
        clearError(field);
        return true;
    }

    function showError(field, message) {
        clearError(field);
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentNode.insertBefore(errorDiv, field.nextSibling);
    }

    function clearError(field) {
        field.classList.remove('error');
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;

        // Validate required fields
        isValid &= validateRequired(firstName, 'First Name');
        isValid &= validateRequired(lastName, 'Last Name');
        isValid &= validateRequired(email, 'Email');
        isValid &= validateRequired(subject, 'Subject');
        isValid &= validateRequired(message, 'Message');

        // Validate email format
        if (email.value.trim() !== '') {
            isValid &= validateEmail(email);
        }

        // Process form if all validation passes
        if (isValid) {
            alert('Form submitted successfully!');
            // Send form data to server
            form.reset();
        }
    });

    // Real-time validation on blur
    firstName.addEventListener('blur', () => validateRequired(firstName, 'First Name'));
    lastName.addEventListener('blur', () => validateRequired(lastName, 'Last Name'));
    email.addEventListener('blur', () => {
        if (email.value.trim() !== '') validateEmail(email);
    });
    subject.addEventListener('blur', () => validateRequired(subject, 'Subject'));
    message.addEventListener('blur', () => validateRequired(message, 'Message'));
});