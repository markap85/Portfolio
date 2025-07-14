// Enhanced scroll reveal with stagger effect
function initEnhancedScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('reveal-animate');
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.project, .about-me-icons span').forEach(el => {
        observer.observe(el);
    });
}

// Initialize remaining effects
document.addEventListener('DOMContentLoaded', () => {
    initEnhancedScrollAnimations();
});
