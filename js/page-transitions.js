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

(function() {
    'use strict';
    
    // Glassmorphic page transition system
    function initPageTransitions() {
        
        // Create transition overlay
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
            
            // Add loading indicator
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
            
            // Add keyframes for spinner
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
        
        // Transition out (when leaving page)
        function transitionOut() {
            return new Promise((resolve) => {
                const overlay = createTransitionOverlay();
                
                // Fade body to white
                document.body.style.transition = 'filter 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                document.body.style.filter = 'brightness(1.5) contrast(0.8) blur(2px)';
                
                // Show overlay
                requestAnimationFrame(() => {
                    overlay.style.opacity = '1';
                    overlay.style.pointerEvents = 'all';
                });
                
                setTimeout(() => {
                    resolve();
                }, 600);
            });
        }
        
        // Transition in (when entering new page)
        function transitionIn() {
            return new Promise((resolve) => {
                const overlay = document.getElementById('page-transition-overlay');
                
                if (overlay) {
                    // Reset body styles
                    document.body.style.filter = 'none';
                    
                    // Fade out overlay
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
        
        // Handle page load transition in
        function handlePageLoad() {
            // Create initial overlay for smooth entry
            const overlay = createTransitionOverlay();
            overlay.style.opacity = '1';
            overlay.style.pointerEvents = 'all';
            
            // Wait for page to be ready
            if (document.readyState === 'complete') {
                setTimeout(() => transitionIn(), 100);
            } else {
                window.addEventListener('load', () => {
                    setTimeout(() => transitionIn(), 100);
                });
            }
        }
        
        // Handle navigation clicks
        function handleNavigation() {
            const navLinks = document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"])');
            
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    
                    // Skip if it's a hash link, external link, or special link
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
        
        // Handle browser back/forward buttons
        function handlePopState() {
            window.addEventListener('popstate', () => {
                transitionOut().then(() => {
                    location.reload();
                });
            });
        }
        
        // Initialize on page load
        handlePageLoad();
        
        // Set up navigation handling
        document.addEventListener('DOMContentLoaded', () => {
            handleNavigation();
            handlePopState();
        });
        
        // Re-initialize navigation when new content is loaded
        function reinitNavigation() {
            handleNavigation();
        }
        
        // Expose functions for external use
        window.pageTransitions = {
            out: transitionOut,
            in: transitionIn,
            reinit: reinitNavigation
        };
    }
    
    // Start the transition system
    initPageTransitions();
})();