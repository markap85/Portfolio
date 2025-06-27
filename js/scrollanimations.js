document.addEventListener('DOMContentLoaded', function() {
    // Add animation styles to the page
    const animationCSS = `
        <style>
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.8s ease-out;
        }
        
        .animate-slide-left {
            opacity: 0;
            transform: translateX(-50px);
            transition: all 0.8s ease-out;
        }
        
        .animate-slide-right {
            opacity: 0;
            transform: translateX(50px);
            transition: all 0.8s ease-out;
        }
        
        .animate-scale {
            opacity: 0;
            transform: scale(0.8);
            transition: all 0.8s ease-out;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .animate-slide-left.animate-in {
            transform: translateX(0) !important;
        }
        
        .animate-slide-right.animate-in {
            transform: translateX(0) !important;
        }
        
        .animate-scale.animate-in {
            transform: scale(1) !important;
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', animationCSS);
    
    // Apply animation classes to specific elements
    const elementsToAnimate = [
        { selector: '.project', class: 'animate-on-scroll' },
        { selector: '.about-me-text', class: 'animate-slide-left' },
        { selector: '.about-me-image', class: 'animate-slide-right' },
        { selector: '.about-me-icons span', class: 'animate-scale' },
        { selector: '.contact-details', class: 'animate-slide-left' },
        { selector: '.contact-form-grid', class: 'animate-slide-right' }
    ];
    
    elementsToAnimate.forEach(item => {
        document.querySelectorAll(item.selector).forEach(element => {
            element.classList.add(item.class);
        });
    });
    
    // Set up intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Watch for elements entering the viewport
    document.querySelectorAll('.animate-on-scroll, .animate-slide-left, .animate-slide-right, .animate-scale').forEach(element => {
        observer.observe(element);
    });
    
    // Create staggered animation for skill icons
    document.querySelectorAll('.about-me-icons span').forEach((icon, index) => {
        // Delay each icon animation slightly
        icon.style.transitionDelay = `${index * 0.1}s`;
    });
});