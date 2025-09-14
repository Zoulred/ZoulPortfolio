// Initialize EmailJS with your User ID
emailjs.init('mBMGh04ShC_I_jNFU');

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    // Show loading state
    btn.disabled = true;
    btn.innerHTML = `
        <span class="btn-spinner"></span> Sending...
    `;
    
    // Send email
    emailjs.sendForm('service_wrntwzk', 'template_fl3zund', this)
        .then(() => {
           Swal.fire({
    icon: 'success',
    title: 'Message Received!',
    text: 'Your message has been sent successfully..',
    confirmButtonColor: '#6366f1',
    background: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)',
    color: '#e2e8f0',
    backdrop: `
        rgba(2, 6, 23, 0.7)
        url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='1' fill='%23e2e8f0' fill-opacity='0.2'/%3E%3C/svg%3E")
    `,
    customClass: {
        popup: 'cosmic-alert',
        title: 'cosmic-title',
        content: 'cosmic-text'
    }
});
            this.reset();
        })
        .catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: 'Failed to send message. Please try again.',
                confirmButtonColor: '#6366f1'
            });
            console.error('EmailJS Error:', error);
        })
        .finally(() => {
            // Reset button state
            btn.disabled = false;
            btn.innerHTML = originalText;
        });
});