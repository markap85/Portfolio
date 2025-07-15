/**
 * Enhanced Form Validation for SPA
 * Works with dynamically loaded contact forms
 */

// Global function to initialize form validation
window.initFormValidation = function() {
    console.log('🔧 Initializing form validation...');
    
    const form = document.querySelector('.contact-form-grid') || document.getElementById('form');
    const firstName = document.getElementById('first-name');
    const phone = document.getElementById('last-name'); // This is actually phone number
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    const submitBtn = document.querySelector('.submit-btn');
    const result = document.getElementById('result');

    // Debug: Check if all elements are found
    console.log('📋 Form validation elements check:', {
        form: !!form,
        firstName: !!firstName,
        phone: !!phone,
        email: !!email,
        subject: !!subject,
        message: !!message,
        submitBtn: !!submitBtn,
        result: !!result,
        userAgent: navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop'
    });

    // If form is not found, exit early
    if (!form) {
        console.warn('❌ Contact form not found - validation script will not run');
        return false;
    }

    // Check if required fields exist
    if (!firstName || !email || !subject || !message) {
        console.error('❌ Missing required form fields:', {
            firstName: !!firstName,
            email: !!email,
            subject: !!subject,
            message: !!message
        });
        return false;
    }

    console.log('✅ Form validation setup starting...');
    
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
        console.log(`⚠️ Showing error for ${field.id}: ${message}`);
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
        console.log('📝 Form submission attempt started');
        e.preventDefault();
        e.stopPropagation();
        
        let isValid = true;

        // Clear any existing result messages
        if (result) {
            result.style.display = 'none';
            result.innerHTML = '';
        }

        console.log('🔍 Starting validation checks...');

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
        if (phone && phone.value.trim() !== '') {
            isValid &= validatePhone(phone);
        }

        console.log(`🎯 Validation result: ${isValid ? 'PASSED' : 'FAILED'}`);

        // If validation fails, stop here
        if (!isValid) {
            console.log('❌ Form validation failed - preventing submission');
            if (result) {
                result.innerHTML = 'Please fix the errors above before submitting.';
                result.style.display = 'block';
                result.className = 'result-error';
                setTimeout(() => {
                    result.style.display = 'none';
                    result.className = '';
                }, 3000);
            }
            return false;
        }

        console.log('✅ Validation passed - proceeding with submission');

        // If validation passes, proceed with submission
        if (submitBtn) {
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
        }
        
        console.log('📤 Starting form submission to Web3Forms...');
        
        try {
            // Use Web3Forms API
            const formData = new FormData(form);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);
            
            console.log('📋 Form data prepared:', Object.keys(object));
            
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
                console.log('🌐 Web3Forms response received');
                let data = await response.json();
                console.log('📊 Response data:', data);
                
                if (response.status === 200) {
                    console.log('✅ Form submission successful');
                    if (result) {
                        result.innerHTML = data.message || 'Thank you! Your message has been sent successfully.';
                        result.className = 'result-success';
                    }
                    form.reset();
                    
                    // Clear any error messages
                    const errorMessages = form.querySelectorAll('.error-message');
                    errorMessages.forEach(msg => {
                        msg.style.display = 'none';
                        msg.textContent = '';
                    });
                } else {
                    throw new Error(data.message || 'Something went wrong');
                }
            })
            .catch(error => {
                console.error('❌ Form submission error:', error);
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
                console.log('🔄 Form submission process completed');
                // Hide result message after 5 seconds
                setTimeout(() => {
                    if (result) {
                        result.style.display = 'none';
                        result.className = '';
                    }
                }, 5000);
            });
        } catch (error) {
            console.error('❌ Form submission initialization error:', error);
            if (result) {
                result.innerHTML = 'There was an error sending your message. Please try again.';
                result.style.display = 'block';
                result.className = 'result-error';
                setTimeout(() => {
                    result.style.display = 'none';
                    result.className = '';
                }, 3000);
            }
            if (submitBtn) {
                submitBtn.textContent = 'Submit Message';
                submitBtn.disabled = false;
            }
        }

        return false; // Always prevent default form submission
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