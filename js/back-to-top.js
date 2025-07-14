/**
 * Back to Top Functionality
 * Handles smooth scrolling back to the top of the page
 */
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.querySelector('.back-to-top a');
    
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Optional: Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        const backToTopContainer = document.querySelector('.back-to-top');
        if (backToTopContainer) {
            if (window.pageYOffset > 300) {
                backToTopContainer.style.opacity = '1';
                backToTopContainer.style.visibility = 'visible';
            } else {
                backToTopContainer.style.opacity = '0.7';
                backToTopContainer.style.visibility = 'visible';
            }
        }
    });
});
