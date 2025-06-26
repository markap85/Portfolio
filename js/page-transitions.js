document.addEventListener('DOMContentLoaded', function() {
    // Set initial styles
    document.body.style.transition = 'opacity 0.5s ease';
    
    // Only fade in if coming from a transition
    if (document.referrer && document.referrer.includes(window.location.hostname)) {
        document.body.style.opacity = '0';
        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
        });
    } else {
        document.body.style.opacity = '1';
    }
    
    // Handle transitions
    const links = document.querySelectorAll('a[href$=".html"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            document.body.style.opacity = '0';
            
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
    });
});