document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const responseElement = document.querySelector('.ajax-response');
    const submitBtn = document.querySelector('.submit-btn');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';
        
        // Prepare form data
        const formData = new FormData(form);
        
        // Send AJAX request to Formspree
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                responseElement.innerHTML = '<span style="color: #28a745;">Thank you! Your message has been sent successfully.</span>';
                form.reset();
            } else {
                return response.json().then(data => {
                    throw new Error(data.errors ? data.errors.map(error => error.message).join(', ') : 'Form submission failed');
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            responseElement.innerHTML = '<span style="color: #dc3545;">Error sending message. Please try again.</span>';
        })
        .finally(() => {
            // Restore button state
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            
            // Clear response message after 5 seconds
            setTimeout(() => {
                responseElement.innerHTML = '';
            }, 5000);
        });
    });
});