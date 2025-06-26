(function() {
    'use strict';
    
    function initNavDots() {
        const navDots = document.querySelectorAll('.nav-dot');
        const sections = ['hero', 'about', 'portfolio', 'contact'];
        
        if (!navDots.length) return;
        
        // Handle scroll to update active dot
        function updateActiveDot() {
            const scrollPosition = window.pageYOffset;
            const windowHeight = window.innerHeight;
            
            // Get section positions
            const sectionPositions = sections.map(section => {
                let element;
                if (section === 'hero') {
                    element = document.querySelector('.hero') || document.querySelector('#main-content');
                } else {
                    element = document.querySelector(`#${section}`);
                }
                
                if (!element) return { section, top: 0, bottom: 0 };
                
                const rect = element.getBoundingClientRect();
                const top = rect.top + scrollPosition;
                const bottom = top + rect.height;
                
                return { section, top, bottom };
            });
            
            // Find current section
            let currentSection = 'hero';
            const viewportCenter = scrollPosition + (windowHeight / 2);
            
            for (const { section, top, bottom } of sectionPositions) {
                if (viewportCenter >= top && viewportCenter <= bottom) {
                    currentSection = section;
                    break;
                }
            }
            
            // Update active states
            navDots.forEach(dot => {
                const dotSection = dot.dataset.section;
                if (dotSection === currentSection) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Handle dot clicks
        navDots.forEach(dot => {
            dot.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetHref = this.getAttribute('href');
                const targetElement = document.querySelector(targetHref);
                
                if (targetElement) {
                    // Smooth scroll to target
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update active state immediately
                    navDots.forEach(d => d.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });
        
        // Throttled scroll handler
        let ticking = false;
        function handleScroll() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateActiveDot();
                    ticking = false;
                });
                ticking = true;
            }
        }
        
        // Initial update
        updateActiveDot();
        
        // Listen for scroll events
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Update on resize
        window.addEventListener('resize', updateActiveDot);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavDots);
    } else {
        initNavDots();
    }
})();
