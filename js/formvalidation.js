/**
 * Enhanced Form Validation for SPA
 * Works with dynamically loaded contact forms
 */

// Global function to initialize form validation
window.initFormValidation = function() {
    const form = document.querySelector('.contact-form-grid') || document.getElementById('form');
    const firstName = document.getElementById('first-name');
    const phone = document.getElementById('last-name'); // This is actually phone number
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    const submitBtn = document.querySelector('.submit-btn');
    const result = document.getElementById('result');

    // Debug: Check if all elements are found
    console.log('Form validation initialized:', {
        form: !!form,
        firstName: !!firstName,
        phone: !!phone,
        email: !!email,
        subject: !!subject,
        message: !!message,
        submitBtn: !!submitBtn,
        result: !!result
    });

    // If form is not found, exit early
    if (!form) {
        console.warn('Contact form not found - validation script will not run');
        return;
    }

    // Remove any existing validation event listeners
    form.removeEventListener('submit', handleFormSubmit);
    
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
    function handleFormSubmit(e) {
        e.preventDefault();
        
        let isValid = true;

        // Clear any existing result messages
        if (result) {
            result.style.display = 'none';
            result.innerHTML = '';
        }

        // Validate required fields
        isValid &= validateRequired(firstName, 'First Name');
        // Phone is now optional - removed from required validation
        isValid &= validateRequired(email, 'Email');
        isValid &= validateRequired(subject, 'Subject');
        isValid &= validateRequired(message, 'Message');

        // Validate email format
        if (email.value.trim() !== '') {
            isValid &= validateEmail(email);
        }

        // Validate phone format
        if (phone.value.trim() !== '') {
            isValid &= validatePhone(phone);
        }

        // If validation fails, stop here
        if (!isValid) {
            console.log('Form validation failed');
            return false;
        }

        // If validation passes, proceed with submission
        if (submitBtn) {
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
        }
        
        try {
            // Use Web3Forms API
            const formData = new FormData(form);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);
            
            if (result) {
                result.innerHTML = 'Please wait...';
                result.style.display = 'block';
                result.className = 'result-loading';
            }

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let data = await response.json();
                if (response.status === 200) {
                    if (result) {
                        result.innerHTML = data.message || 'Thank you! Your message has been sent successfully.';
                        result.className = 'result-success';
                    }
                    form.reset();
                } else {
                    throw new Error(data.message || 'Something went wrong');
                }
            })
            .catch(error => {
                console.error('Form submission error:', error);
                if (result) {
                    result.innerHTML = 'There was an error sending your message. Please try again.';
                    result.className = 'result-error';
                }
            })
            .finally(() => {
                if (submitBtn) {
                    submitBtn.textContent = 'Submit Message';
                    submitBtn.disabled = false;
                }
                // Hide result message after 5 seconds
                setTimeout(() => {
                    if (result) {
                        result.style.display = 'none';
                        result.className = '';
                    }
                }, 5000);
            });
        } catch (error) {
            console.error('Form submission error:', error);
            if (result) {
                result.innerHTML = 'There was an error sending your message. Please try again.';
                result.style.display = 'block';
                result.className = 'result-error';
            }
            if (submitBtn) {
                submitBtn.textContent = 'Submit Message';
                submitBtn.disabled = false;
            }
        }
    }

    // Add form submit event listener
    form.addEventListener('submit', handleFormSubmit);

    // Real-time validation on blur
    if (firstName) {
        firstName.addEventListener('blur', () => validateRequired(firstName, 'First Name'));
    }
    if (phone) {
        phone.addEventListener('blur', () => {
            // Phone is optional, only validate format if user enters something
            if (phone.value.trim() !== '') {
                validatePhone(phone);
            } else {
                clearError(phone); // Clear any existing errors if field is empty
            }
        });
    }
    if (email) {
        email.addEventListener('blur', () => {
            validateRequired(email, 'Email');
            if (email.value.trim() !== '') validateEmail(email);
        });
    }
    if (subject) {
        subject.addEventListener('blur', () => validateRequired(subject, 'Subject'));
    }
    if (message) {
        message.addEventListener('blur', () => validateRequired(message, 'Message'));
    }
};

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    initFormValidation();
});

// Also initialize when called directly (for SPA)
if (typeof window !== 'undefined') {
    window.initFormValidation = initFormValidation;
}