/**
 * Advanced Contact Form Validation and Submission
 * Provides real-time validation and AJAX form submission
 */

class ContactFormValidator {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.errors = {};
        this.isSubmitting = false;
        
        if (this.form) {
            this.init();
        }
    }

    init() {
        // Add real-time validation to form fields
        this.addFieldValidation();
        
        // Handle form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Clear any existing messages on form interaction
        this.form.addEventListener('input', () => this.clearMessages());
        
        // Show any server-side messages on page load
        this.showServerMessages();
    }

    addFieldValidation() {
        const fieldMap = {
            'first-name': 'first_name',
            'phone': 'phone', 
            'email': 'email',
            'subject': 'subject',
            'message': 'message'
        };
        
        Object.keys(fieldMap).forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                const fieldName = fieldMap[fieldId];
                // Validate on blur (when user leaves field)
                field.addEventListener('blur', () => this.validateField(fieldName, field.value));
                
                // Clear error on input
                field.addEventListener('input', () => this.clearFieldError(fieldName));
            }
        });
    }

    validateField(fieldName, value) {
        const trimmedValue = value.trim();
        let isValid = true;

        // Clear previous error
        this.clearFieldError(fieldName);

        switch (fieldName) {
            case 'first_name':
                if (!trimmedValue) {
                    this.setFieldError(fieldName, 'First name is required.');
                    isValid = false;
                } else if (trimmedValue.length < 2) {
                    this.setFieldError(fieldName, 'First name must be at least 2 characters.');
                    isValid = false;
                } else if (trimmedValue.length > 50) {
                    this.setFieldError(fieldName, 'First name cannot exceed 50 characters.');
                    isValid = false;
                } else if (!/^[a-zA-Z\s\'-]+$/.test(trimmedValue)) {
                    this.setFieldError(fieldName, 'First name can only contain letters, spaces, hyphens, and apostrophes.');
                    isValid = false;
                }
                break;

            case 'phone':
                // Phone is optional, but if provided, validate format
                if (trimmedValue && trimmedValue.length > 0) {
                    if (!/^[\+]?[1-9][\d]{0,15}$/.test(trimmedValue.replace(/[\s\-\(\)]/g, ''))) {
                        this.setFieldError(fieldName, 'Please enter a valid phone number.');
                        isValid = false;
                    }
                }
                break;

            case 'email':
                if (!trimmedValue) {
                    this.setFieldError(fieldName, 'Email address is required.');
                    isValid = false;
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
                    this.setFieldError(fieldName, 'Please enter a valid email address.');
                    isValid = false;
                } else if (trimmedValue.length > 100) {
                    this.setFieldError(fieldName, 'Email address cannot exceed 100 characters.');
                    isValid = false;
                }
                break;

            case 'subject':
                if (!trimmedValue) {
                    this.setFieldError(fieldName, 'Subject is required.');
                    isValid = false;
                } else if (trimmedValue.length < 3) {
                    this.setFieldError(fieldName, 'Subject must be at least 3 characters.');
                    isValid = false;
                } else if (trimmedValue.length > 100) {
                    this.setFieldError(fieldName, 'Subject cannot exceed 100 characters.');
                    isValid = false;
                }
                break;

            case 'message':
                if (!trimmedValue) {
                    this.setFieldError(fieldName, 'Message is required.');
                    isValid = false;
                } else if (trimmedValue.length < 10) {
                    this.setFieldError(fieldName, 'Message must be at least 10 characters.');
                    isValid = false;
                } else if (trimmedValue.length > 5000) {
                    this.setFieldError(fieldName, 'Message cannot exceed 5000 characters.');
                    isValid = false;
                }
                break;
        }

        return isValid;
    }

    validateAllFields() {
        let isValid = true;
        this.errors = {};

        // Get all form values
        const formData = new FormData(this.form);
        
        // Validate each field (phone is optional)
        ['first_name', 'phone', 'email', 'subject', 'message'].forEach(fieldName => {
            const value = formData.get(fieldName) || '';
            if (!this.validateField(fieldName, value)) {
                isValid = false;
            }
        });

        return isValid;
    }

    setFieldError(fieldName, message) {
        this.errors[fieldName] = message;
        
        // Map field names to HTML IDs for field highlighting
        const fieldIdMap = {
            'first_name': 'first-name',
            'phone': 'phone',
            'email': 'email', 
            'subject': 'subject',
            'message': 'message'
        };
        
        const fieldId = fieldIdMap[fieldName] || fieldName;
        const field = document.getElementById(fieldId);
        
        // Add error styling to field
        if (field) {
            field.classList.add('error');
        }
        
        // Update the single error message display
        this.showFormErrors();
    }

    clearFieldError(fieldName) {
        delete this.errors[fieldName];
        
        // Map field names to HTML IDs
        const fieldIdMap = {
            'first_name': 'first-name',
            'phone': 'phone',
            'email': 'email', 
            'subject': 'subject',
            'message': 'message'
        };
        
        const fieldId = fieldIdMap[fieldName] || fieldName;
        const field = document.getElementById(fieldId);
        
        // Remove error styling from field
        if (field) {
            field.classList.remove('error');
        }
        
        // Update the single error message display
        this.showFormErrors();
    }

    createErrorElement(fieldName) {
        const field = document.getElementById(fieldName);
        if (!field) return null;

        const errorElement = document.createElement('div');
        errorElement.id = `${fieldName}_error`;
        errorElement.className = 'field-error';
        errorElement.style.display = 'none';

        // Insert error element after the field
        field.parentNode.insertBefore(errorElement, field.nextSibling);
        
        return errorElement;
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (this.isSubmitting) {
            return false;
        }

        // Validate all fields
        if (!this.validateAllFields()) {
            // Error message is already shown by showFormErrors()
            return false;
        }

        this.isSubmitting = true;
        this.showMessage('Sending your message...', 'info');
        this.setSubmitButtonState(true);

        try {
            const formData = new FormData(this.form);
            
            const response = await fetch('contact-form', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            const result = await response.json();

            if (result.success) {
                this.showMessage(result.message, 'success');
                this.form.reset();
                this.clearAllErrors();
            } else {
                this.showMessage(result.message, 'error');
                
                // Display field-specific errors
                if (result.errors) {
                    Object.keys(result.errors).forEach(fieldName => {
                        if (fieldName !== 'system') {
                            this.setFieldError(fieldName, result.errors[fieldName]);
                        }
                    });
                }
            }

        } catch (error) {
            console.error('Contact form submission error:', error);
            this.showMessage('Network error. Please check your connection and try again.', 'error');
        } finally {
            this.isSubmitting = false;
            this.setSubmitButtonState(false);
        }

        return false;
    }

    showMessage(message, type) {
        const messageContainer = document.getElementById('form-result');
        
        if (messageContainer) {
            messageContainer.textContent = message;
            messageContainer.className = `form-result ${type}`;
            
            // Auto-hide info messages after 3 seconds
            if (type === 'info') {
                setTimeout(() => {
                    if (messageContainer.classList.contains('info')) {
                        messageContainer.classList.remove('info', 'success', 'error');
                    }
                }, 3000);
            }
        }
    }

    showFormErrors() {
        const errorContainer = document.getElementById('form-errors');
        if (!errorContainer) return;
        
        const errorCount = Object.keys(this.errors).length;
        
        if (errorCount === 0) {
            errorContainer.style.display = 'none';
            errorContainer.textContent = '';
        } else {
            errorContainer.textContent = 'Please correct the errors above.';
            errorContainer.style.display = 'block';
        }
    }

    clearMessages() {
        const messageContainer = document.getElementById('form-result');
        if (messageContainer) {
            messageContainer.className = 'form-result';
            messageContainer.textContent = '';
        }
        
        const errorContainer = document.getElementById('form-errors');
        if (errorContainer) {
            errorContainer.style.display = 'none';
            errorContainer.textContent = '';
        }
    }

    clearAllErrors() {
        Object.keys(this.errors).forEach(fieldName => {
            // Map field names to HTML IDs
            const fieldIdMap = {
                'first_name': 'first-name',
                'phone': 'phone',
                'email': 'email', 
                'subject': 'subject',
                'message': 'message'
            };
            
            const fieldId = fieldIdMap[fieldName] || fieldName;
            const field = document.getElementById(fieldId);
            
            // Remove error styling from field
            if (field) {
                field.classList.remove('error');
            }
        });
        this.errors = {};
        
        // Hide the error message
        const errorContainer = document.getElementById('form-errors');
        if (errorContainer) {
            errorContainer.style.display = 'none';
            errorContainer.textContent = '';
        }
    }

    setSubmitButtonState(isSubmitting) {
        const submitButton = document.getElementById('submit-btn');
        const buttonText = submitButton?.querySelector('.button-text');
        const loadingSpinner = submitButton?.querySelector('.loading-spinner');
        
        if (submitButton) {
            if (isSubmitting) {
                submitButton.disabled = true;
                submitButton.classList.add('loading');
                if (buttonText) buttonText.style.opacity = '0';
                if (loadingSpinner) loadingSpinner.style.display = 'inline-block';
            } else {
                submitButton.disabled = false;
                submitButton.classList.remove('loading');
                if (buttonText) buttonText.style.opacity = '1';
                if (loadingSpinner) loadingSpinner.style.display = 'none';
            }
        }
    }

    showServerMessages() {
        // This will show any messages passed from the server via session
        // The PHP will inject these into the page
        const serverMessage = document.querySelector('[data-server-message]');
        if (serverMessage) {
            const message = serverMessage.getAttribute('data-server-message');
            const type = serverMessage.getAttribute('data-server-type') || 'info';
            this.showMessage(message, type);
        }
    }
}

// Initialize the contact form validator when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ContactFormValidator();
});

// Also initialize when SPA content is loaded
document.addEventListener('contentLoaded', () => {
    new ContactFormValidator();
});