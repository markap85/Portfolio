document.addEventListener('DOMContentLoaded', function() {
    // Prepare page transition styles
    document.body.style.transition = 'opacity 0.5s ease';
    
    // Fade in page if coming from another page on this site
    if (document.referrer && document.referrer.includes(window.location.hostname)) {
        document.body.style.opacity = '0';
        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
        });
    } else {
        document.body.style.opacity = '1';
    }
    
    // Set up page transitions for internal links
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

(function() {
    'use strict';
    
    // Advanced glassmorphic page transition system
    function initPageTransitions() {
        
        // Build the transition overlay element
        function createTransitionOverlay() {
            const overlay = document.createElement('div');
            overlay.id = 'page-transition-overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: white;
                );
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                z-index: 9999;
                opacity: 0;
                pointer-events: none;
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            
            // Create spinning loading animation
            const loadingIndicator = document.createElement('div');
            loadingIndicator.style.cssText = `
                width: 60px;
                height: 60px;
                border: 3px solid rgba(0, 120, 160, 0.3);
                border-top: 3px solid rgba(0, 120, 160, 0.8);
                border-radius: 50%;
                animation: glassSpin 1s linear infinite;
                backdrop-filter: blur(5px);
                -webkit-backdrop-filter: blur(5px);
            `;
            
            overlay.appendChild(loadingIndicator);
            document.body.appendChild(overlay);
            
            // Create CSS animation for the spinner
            if (!document.getElementById('glass-spinner-styles')) {
                const style = document.createElement('style');
                style.id = 'glass-spinner-styles';
                style.textContent = `
                    @keyframes glassSpin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `;
                document.head.appendChild(style);
            }
            
            return overlay;
        }
        
        // Page exit animation
        function transitionOut() {
            return new Promise((resolve) => {
                const overlay = createTransitionOverlay();
                
                // Apply blur and brightness effects to current page
                document.body.style.transition = 'filter 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                document.body.style.filter = 'brightness(1.5) contrast(0.8) blur(2px)';
                
                // Make overlay visible
                requestAnimationFrame(() => {
                    overlay.style.opacity = '1';
                    overlay.style.pointerEvents = 'all';
                });
                
                setTimeout(() => {
                    resolve();
                }, 600);
            });
        }
        
        // Page entry animation
        function transitionIn() {
            return new Promise((resolve) => {
                const overlay = document.getElementById('page-transition-overlay');
                
                if (overlay) {
                    // Clear any filters applied to page content
                    document.body.style.filter = 'none';
                    
                    // Hide transition overlay
                    overlay.style.opacity = '0';
                    overlay.style.pointerEvents = 'none';
                    
                    setTimeout(() => {
                        overlay.remove();
                        resolve();
                    }, 600);
                } else {
                    resolve();
                }
            });
        }
        
        // Set up initial page load transition
        function handlePageLoad() {
            // Show overlay immediately for smooth page entry
            const overlay = createTransitionOverlay();
            overlay.style.opacity = '1';
            overlay.style.pointerEvents = 'all';
            
            // Wait for page content to load
            if (document.readyState === 'complete') {
                setTimeout(() => transitionIn(), 100);
            } else {
                window.addEventListener('load', () => {
                    setTimeout(() => transitionIn(), 100);
                });
            }
        }
        
        // Set up click handlers for navigation links
        function handleNavigation() {
            const navLinks = document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"])');
            
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    
                    // Skip external links, hash links, and special protocols
                    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || this.target === '_blank') {
                        return;
                    }
                    
                    e.preventDefault();
                    
                    transitionOut().then(() => {
                        window.location.href = href;
                    });
                });
            });
        }
        
        // Handle browser navigation buttons
        function handlePopState() {
            window.addEventListener('popstate', () => {
                transitionOut().then(() => {
                    location.reload();
                });
            });
        }
        
        // Start page load animation
        handlePageLoad();
        
        // Prepare navigation transitions
        document.addEventListener('DOMContentLoaded', () => {
            handleNavigation();
            handlePopState();
        });
        
        // Update navigation handlers when content changes
        function reinitNavigation() {
            handleNavigation();
        }
        
        // Make transition functions available globally
        window.pageTransitions = {
            out: transitionOut,
            in: transitionIn,
            reinit: reinitNavigation
        };
    }
    
    // Initialize the transition system
    initPageTransitions();
})();