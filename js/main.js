// Slideshow functionality
let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    if (slides.length > 0) {
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        slides[slideIndex - 1].style.display = "block";
        setTimeout(showSlides, 3000); // Change image every 3 seconds
    }
}

// Form validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    showError(field, 'This field is required');
                } else {
                    field.classList.remove('error');
                    clearError(field);
                }
            });
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    }
}

// Error handling
function showError(field, message) {
    const errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
        const error = document.createElement('span');
        error.className = 'error-message';
        error.textContent = message;
        error.style.color = 'red';
        error.style.fontSize = '0.8rem';
        field.parentNode.appendChild(error);
    }
}

function clearError(field) {
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// AJAX functionality for loading data
function loadData(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr.responseText);
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem;
        border-radius: 5px;
        color: white;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#4CAF50';
            break;
        case 'error':
            notification.style.backgroundColor = '#f44336';
            break;
        case 'warning':
            notification.style.backgroundColor = '#ff9800';
            break;
        default:
            notification.style.backgroundColor = '#2196F3';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize form validation
    validateForm('stockForm');
    
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add loading states for buttons
    document.querySelectorAll('button[type="submit"]').forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.disabled = true;
            
            // Re-enable after form submission (you might want to handle this differently)
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 2000);
        });
    });
});

// CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .error {
        border-color: #f44336 !important;
    }
`;
document.head.appendChild(style);
