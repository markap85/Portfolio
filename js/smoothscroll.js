document.addEventListener('DOMContentLoaded', function() {
    // Find all anchor links that navigate to page sections
    const anchorLinks = document.querySelectorAll('a[href^="#"], a[href*="index.php#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if this is a link to a different page
            if (href.includes('index.php#') && !window.location.pathname.endsWith('index.php')) {
                // If we're not on index.php, let the browser handle the navigation normally
                return;
            }
            
            e.preventDefault();
            
            // Get the section ID from the link
            const targetId = href.includes('#') ? href.split('#')[1] : '';
            
            if (targetId) {
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Handle back to top links
    const backToTopLinks = document.querySelectorAll('a[href="#"]');
    backToTopLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
});
