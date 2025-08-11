
document.addEventListener('DOMContentLoaded', function() {
    loadJobData();
    setupFormValidation();
});


function loadJobData() {
    
    const jobData = [
        { jobType: 'JAVA DEVELOPER', positions: 15 },
        { jobType: 'SQL DEVELOPER', positions: 8 },
        { jobType: 'FULL STACK DEVELOPER', positions: 12 }
    ];
    
    populateJobTable(jobData);
}

function populateJobTable(data) {
    const tableBody = document.getElementById('jobTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    data.forEach(job => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${job.jobType}</td>
            <td>${job.positions}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Setup form validation
function setupFormValidation() {
    const form = document.getElementById('stockForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const jobType = document.getElementById('jobType').value;
        const actionType = document.getElementById('actionType').value;
        const units = document.getElementById('units').value;
        
        if (!validateInputs(jobType, actionType, units)) {
            return;
        }
        
        // Submit form data
        submitFormData(jobType, actionType, units);
    });
}

// Validate form inputs
function validateInputs(jobType, actionType, units) {
    let isValid = true;
    
    if (!jobType) {
        showError('jobType', 'Please select a job type');
        isValid = false;
    }
    
    if (!actionType) {
        showError('actionType', 'Please select an action');
        isValid = false;
    }
    
    if (!units || units <= 0) {
        showError('units', 'Please enter a valid number of units');
        isValid = false;
    }
    
    return isValid;
}

// Show error message
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = 'red';
    errorDiv.style.fontSize = '0.8rem';
    
    // Remove existing error
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    field.parentNode.appendChild(errorDiv);
    field.classList.add('error');
}

// Submit form data
function submitFormData(jobType, actionType, units) {
    const formData = new FormData();
    formData.append('bloodgroup', jobType);
    formData.append('incdec', actionType);
    formData.append('units', units);
    
    // Show loading state
    const submitBtn = document.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
    submitBtn.disabled = true;
    
    // Simulate AJAX call (replace with actual fetch/AJAX)
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showNotification('Job requirements updated successfully!', 'success');
        
        // Reload data
        loadJobData();
    }, 1500);
}

// Show notification
function showNotification(message, type) {
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
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

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
