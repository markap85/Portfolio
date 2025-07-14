/**
 * Contact Form Handler
 * Handles form submission using Web3Forms API
 */
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const result = document.getElementById('result');

    if (!form || !result) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form before submission
        if (!validateForm()) {
            return;
        }

        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
        
        // Show loading state
        result.innerHTML = "Please wait...";
        result.style.display = "block";
        result.className = "result-loading";

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status === 200) {
                result.innerHTML = json.message || "Thank you! Your message has been sent successfully.";
                result.className = "result-success";
                form.reset();
            } else {
                console.error('Form submission error:', response);
                result.innerHTML = json.message || "Something went wrong. Please try again.";
                result.className = "result-error";
            }
        })
        .catch(error => {
            console.error('Form submission error:', error);
            result.innerHTML = "Something went wrong! Please check your connection and try again.";
            result.className = "result-error";
        })
        .then(function() {
            // Hide result message after 5 seconds
            setTimeout(() => {
                result.style.display = "none";
                result.className = "";
            }, 5000);
        });
    });

    function validateForm() {
        const firstName = document.getElementById('first-name');
        const lastName = document.getElementById('last-name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');

        // Basic validation (HTML5 validation should catch most issues)
        if (!firstName.value.trim() || !email.value.trim() || !message.value.trim()) {
            result.innerHTML = "Please fill in all required fields.";
            result.style.display = "block";
            result.className = "result-error";
            setTimeout(() => {
                result.style.display = "none";
                result.className = "";
            }, 3000);
            return false;
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value)) {
            result.innerHTML = "Please enter a valid email address.";
            result.style.display = "block";
            result.className = "result-error";
            setTimeout(() => {
                result.style.display = "none";
                result.className = "";
            }, 3000);
            return false;
        }

        return true;
    }
});
