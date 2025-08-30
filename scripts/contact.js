// Contact form functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Validate form
            if (!validateContactForm(name, email, message)) {
                return;
            }
            
            // Create WhatsApp message
            const whatsappMessage = `
*New Contact Form Submission*

*Name:* ${name}
*Email:* ${email}
*Phone:* ${phone || 'Not provided'}
*Subject:* ${subject}

*Message:*
${message}
            `.trim();
            
            // Open WhatsApp with pre-filled message
            const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappUrl, '_blank');
            
            // Show success message
            showSuccessMessage('Message sent successfully! We will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Real-time form validation
    const inputs = contactForm?.querySelectorAll('input, textarea, select');
    inputs?.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
});

// Form validation functions
function validateContactForm(name, email, message) {
    let isValid = true;
    
    // Clear previous errors
    clearAllErrors();
    
    // Validate name
    if (!name || name.trim().length < 2) {
        showFieldError('name', 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    // Validate email
    if (!email || !validateEmail(email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate message
    if (!message || message.trim().length < 10) {
        showFieldError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    switch (fieldName) {
        case 'name':
            if (value.length < 2) {
                showFieldError(fieldName, 'Name must be at least 2 characters long');
                return false;
            }
            break;
        case 'email':
            if (!validateEmail(value)) {
                showFieldError(fieldName, 'Please enter a valid email address');
                return false;
            }
            break;
        case 'phone':
            if (value && !/^\+?[\d\s\-\(\)]{10,}$/.test(value)) {
                showFieldError(fieldName, 'Please enter a valid phone number');
                return false;
            }
            break;
        case 'message':
            if (value.length < 10) {
                showFieldError(fieldName, 'Message must be at least 10 characters long');
                return false;
            }
            break;
    }
    
    clearFieldError(field);
    return true;
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const formGroup = field.closest('.form-group');
    
    // Remove existing error
    const existingError = formGroup.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        animation: fadeInUp 0.3s ease;
    `;
    
    formGroup.appendChild(errorDiv);
    field.style.borderColor = '#dc3545';
}

function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    const errorDiv = formGroup.querySelector('.field-error');
    
    if (errorDiv) {
        errorDiv.remove();
    }
    
    field.style.borderColor = 'var(--light-green)';
}

function clearAllErrors() {
    const errors = document.querySelectorAll('.field-error');
    errors.forEach(error => error.remove());
    
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.style.borderColor = 'var(--light-green)';
    });
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-notification';
    successDiv.innerHTML = `
        <div class="success-content">
            <span class="success-icon">✅</span>
            <span class="success-text">${message}</span>
        </div>
    `;
    
    successDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-green);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: 0 8px 30px rgba(56, 102, 65, 0.3);
        z-index: 2000;
        animation: slideInRight 0.5s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            successDiv.remove();
        }, 500);
    }, 4000);
}

// Auto-resize textarea
const textareas = document.querySelectorAll('textarea');
textareas.forEach(textarea => {
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
});

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        if (value.length >= 10) {
            value = value.substring(0, 10);
            this.value = value.replace(/(\d{5})(\d{5})/, '$1-$2');
        } else {
            this.value = value;
        }
    });
}

// Form field focus effects
const formFields = document.querySelectorAll('input, textarea, select');
formFields.forEach(field => {
    field.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    field.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
});

// Add CSS for form focus effects
const style = document.createElement('style');
style.textContent = `
    .form-group.focused label {
        color: var(--primary-green);
        transform: translateY(-2px);
        transition: all 0.3s ease;
    }
    
    .field-error {
        animation: fadeInUp 0.3s ease;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    .success-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .success-icon {
        font-size: 1.2rem;
    }
`;
document.head.appendChild(style);