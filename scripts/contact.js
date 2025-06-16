document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    
    fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            alert('Message sent successfully!');
            this.reset();
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .catch(error => {
        alert('There was a problem sending your message. Please try again later.');
        console.error('Error:', error);
    });
});
