/**
 * Form Handler for Landlord Landing Page
 * Handles form validation, submission, and user experience
 */

class FormHandler {
    constructor() {
        this.form = document.getElementById('landlord-signup-form');
        this.init();
    }

    init() {
        if (this.form) {
            this.setupEventListeners();
            this.setupConditionalFields();
            this.setupFormValidation();
        }
    }

    setupEventListeners() {
        // Form submission
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearErrors(input));
        });

        // Phone number formatting
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', this.formatPhoneNumber.bind(this));
        }
    }

    setupConditionalFields() {
        const isLandlordSelect = document.getElementById('is-landlord');
        const propertyInfoGroup = document.getElementById('property-info-group');

        if (isLandlordSelect && propertyInfoGroup) {
            isLandlordSelect.addEventListener('change', (e) => {
                if (e.target.value === 'yes') {
                    propertyInfoGroup.style.display = 'block';
                    propertyInfoGroup.style.animation = 'slideInFromTop 0.5s ease-out';
                } else {
                    propertyInfoGroup.style.display = 'none';
                }
            });
        }

        // Add CSS for slide animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInFromTop {
                0% { opacity: 0; transform: translateY(-20px); }
                100% { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }

    setupFormValidation() {
        // Custom validation messages
        this.validationMessages = {
            name: 'Please enter your full name',
            email: 'Please enter a valid email address',
            phone: 'Please enter a valid phone number',
            'is-landlord': 'Please select whether you are currently a landlord',
            'session-date': 'Please select a preferred session date',
            'session-type': 'Please select a session type',
            'pm-reports': 'Please let us know about your property manager reports'
        };
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name || field.id;
        let isValid = true;
        let message = '';

        // Remove existing error styling
        this.clearErrors(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            message = this.validationMessages[fieldName] || 'This field is required';
        }
        // Email validation
        else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                message = 'Please enter a valid email address';
            }
        }
        // Phone validation
        else if (field.type === 'tel' && value) {
            const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                message = 'Please enter a valid phone number (###) ###-####';
            }
        }
        // Name validation
        else if (fieldName === 'name' && value) {
            if (value.length < 2) {
                isValid = false;
                message = 'Name must be at least 2 characters long';
            }
        }

        if (!isValid) {
            this.showError(field, message);
        }

        return isValid;
    }

    showError(field, message) {
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Add new error message
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        field.parentNode.appendChild(errorElement);

        // Add error styles
        const style = document.createElement('style');
        if (!document.getElementById('form-error-styles')) {
            style.id = 'form-error-styles';
            style.textContent = `
                .form-group input.error,
                .form-group select.error,
                .form-group textarea.error {
                    border-color: #ff6b6b !important;
                    box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1) !important;
                }
                
                .error-message {
                    color: #ff6b6b;
                    font-size: 0.8rem;
                    margin-top: 0.25rem;
                    animation: fadeInError 0.3s ease-out;
                }
                
                @keyframes fadeInError {
                    0% { opacity: 0; transform: translateY(-5px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    clearErrors(field) {
        field.classList.remove('error');
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    formatPhoneNumber(event) {
        const input = event.target;
        const value = input.value.replace(/\D/g, '');
        
        if (value.length >= 6) {
            input.value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        } else if (value.length >= 3) {
            input.value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else {
            input.value = value;
        }
    }

    async handleSubmit(event) {
        event.preventDefault();

        // Validate all fields
        const inputs = this.form.querySelectorAll('input[required], select[required]');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showFormError('Please fix the errors above before submitting.');
            return;
        }

        // Collect form data
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());

        // Show loading state
        this.showLoadingState();

        try {
            // Simulate form submission (replace with actual endpoint)
            await this.submitForm(data);
            this.showSuccessState();
        } catch (error) {
            this.showErrorState(error.message);
        }
    }

    async submitForm(data) {
        // Simulate API call - replace with actual submission logic
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success (90% of the time)
                if (Math.random() > 0.1) {
                    console.log('Form submitted successfully:', data);
                    resolve({ success: true, message: 'Registration successful!' });
                } else {
                    reject(new Error('Sorry, there was an issue with your submission. Please try again.'));
                }
            }, 2000);
        });
    }

    showLoadingState() {
        const submitButton = this.form.querySelector('.cta-button');
        const originalContent = submitButton.innerHTML;
        
        submitButton.disabled = true;
        submitButton.style.opacity = '0.7';
        submitButton.innerHTML = `
            <div class="loading-spinner"></div>
            <span>Submitting...</span>
        `;

        // Add spinner CSS
        const style = document.createElement('style');
        if (!document.getElementById('loading-styles')) {
            style.id = 'loading-styles';
            style.textContent = `
                .loading-spinner {
                    width: 20px;
                    height: 20px;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    border-top-color: #ffffff;
                    animation: spin 1s ease-in-out infinite;
                }
                
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }

        // Store original content for restoration
        submitButton.dataset.originalContent = originalContent;
    }

    showSuccessState() {
        const submitButton = this.form.querySelector('.cta-button');
        
        submitButton.innerHTML = `
            <span>✓ Successfully Registered!</span>
        `;
        submitButton.style.background = 'linear-gradient(135deg, #00ff88 0%, #00cc66 100%)';

        // Show success message
        this.showFormMessage('Thank you for registering! We\'ll send you course details via email shortly.', 'success');

        // Reset form after delay
        setTimeout(() => {
            this.resetForm();
        }, 5000);
    }

    showErrorState(message) {
        const submitButton = this.form.querySelector('.cta-button');
        const originalContent = submitButton.dataset.originalContent;

        submitButton.disabled = false;
        submitButton.style.opacity = '1';
        submitButton.innerHTML = originalContent;

        this.showFormError(message);
    }

    showFormMessage(message, type = 'info') {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = message;

        this.form.appendChild(messageElement);

        // Add message styles
        const style = document.createElement('style');
        if (!document.getElementById('form-message-styles')) {
            style.id = 'form-message-styles';
            style.textContent = `
                .form-message {
                    padding: 1rem;
                    border-radius: 8px;
                    margin-top: 1rem;
                    animation: slideInFromBottom 0.5s ease-out;
                }
                
                .form-message.success {
                    background: rgba(0, 255, 136, 0.1);
                    border: 1px solid #00ff88;
                    color: #00ff88;
                }
                
                .form-message.error {
                    background: rgba(255, 107, 107, 0.1);
                    border: 1px solid #ff6b6b;
                    color: #ff6b6b;
                }
                
                @keyframes slideInFromBottom {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
            `;
            document.head.appendChild(style);
        }

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 5000);
    }

    showFormError(message) {
        this.showFormMessage(message, 'error');
        
        // Scroll to error
        this.form.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }

    resetForm() {
        this.form.reset();
        
        // Clear all errors
        const errorElements = this.form.querySelectorAll('.error-message');
        errorElements.forEach(el => el.remove());
        
        const errorInputs = this.form.querySelectorAll('.error');
        errorInputs.forEach(input => input.classList.remove('error'));
        
        // Hide conditional fields
        const propertyInfoGroup = document.getElementById('property-info-group');
        if (propertyInfoGroup) {
            propertyInfoGroup.style.display = 'none';
        }
        
        // Reset button
        const submitButton = this.form.querySelector('.cta-button');
        if (submitButton.dataset.originalContent) {
            submitButton.innerHTML = submitButton.dataset.originalContent;
            submitButton.style.background = '';
            submitButton.disabled = false;
            submitButton.style.opacity = '1';
        }
    }

    // Analytics tracking (placeholder)
    trackFormInteraction(action, field = null) {
        // Integrate with Google Analytics, Mixpanel, etc.
        console.log(`Form ${action}`, field ? `on ${field}` : '');
        
        // Example: gtag('event', action, { 'field': field });
    }
}

// Initialize form handler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const formHandler = new FormHandler();
    
    // Track form view
    if (formHandler.form) {
        formHandler.trackFormInteraction('viewed');
    }
});

// Export for use in other modules
window.FormHandler = FormHandler;