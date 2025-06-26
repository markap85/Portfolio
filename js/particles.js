document.addEventListener('DOMContentLoaded', function() {
    class SectionParticleSystem {
        constructor(sectionId) {
            this.section = document.getElementById(sectionId);
            this.container = null;
            this.particles = [];
            this.mouse = { x: 0, y: 0 };
            this.particleCount = 120; // Increased for denser effect
            this.enabled = false;
            this.isInSection = false;
            this.animationId = null;
            
            this.createContainer();
            this.setupEventListeners();
            this.setupIntersectionObserver();
        }

        createContainer() {
            // Create particle container within the section
            this.container = document.createElement('div');
            this.container.className = 'section-particle-container';
            this.container.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: -1;
                overflow: hidden;
            `;
            
            // Make sure the section has relative positioning
            this.section.style.position = 'relative';
            this.section.appendChild(this.container);
        }

        setupIntersectionObserver() {
            const options = {
                root: null,
                rootMargin: '0px',
                threshold: 0.3 // Trigger when 30% of section is visible
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.startParticles();
                    } else {
                        this.stopParticles();
                    }
                });
            }, options);

            observer.observe(this.section);
        }

        startParticles() {
            if (!this.enabled) {
                this.enabled = true;
                this.isInSection = true;
                this.init();
                this.animate();
            }
        }

        stopParticles() {
            this.enabled = false;
            this.isInSection = false;
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
            }
            // Fade out particles
            this.particles.forEach(particle => {
                particle.element.style.transition = 'opacity 0.5s ease-out';
                particle.element.style.opacity = '0';
            });
            
            // Clean up after fade
            setTimeout(() => {
                this.container.innerHTML = '';
                this.particles = [];
            }, 500);
        }

        init() {
            this.container.innerHTML = '';
            this.particles = [];
            
            for (let i = 0; i < this.particleCount; i++) {
                this.createParticle();
            }
        }

        createParticle() {
            const sectionRect = this.section.getBoundingClientRect();
            
            const particle = {
                element: document.createElement('div'),
                x: Math.random() * sectionRect.width,
                y: Math.random() * sectionRect.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 12 + 6, // Much larger particles (6px to 18px)
                hue: Math.random() * 60 + 200,
                opacity: Math.random() * 0.4 + 0.3, // Fixed opacity range (0.3 to 0.7)
                baseOpacity: Math.random() * 0.4 + 0.3, // Store base opacity
                floatOffset: Math.random() * Math.PI * 2 // For gentle floating motion
            };

            this.styleParticle(particle);
            this.container.appendChild(particle.element);
            this.particles.push(particle);
        }

        styleParticle(particle) {
            const { element } = particle;
            element.style.cssText = `
                position: absolute;
                width: ${particle.size}px;
                height: ${particle.size}px;
                border-radius: 50%;
                pointer-events: none;
                background: radial-gradient(circle, hsla(${particle.hue}, 70%, 60%, ${particle.opacity}), transparent);
                box-shadow: 0 0 ${particle.size * 3}px hsla(${particle.hue}, 70%, 60%, 0.4);
                filter: blur(0.5px);
                transition: opacity 0.3s ease;
                z-index: -1;
            `;
        }

        updateParticle(particle) {
            if (!this.enabled) return;

            const sectionRect = this.section.getBoundingClientRect();
            
            // Mouse interaction (relative to section)
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 120;

            if (distance < maxDistance && this.isInSection) {
                const force = (maxDistance - distance) / maxDistance;
                const angle = Math.atan2(dy, dx);

                // Repulsion: move AWAY from mouse
                particle.vx -= Math.cos(angle) * force * 0.7;
                particle.vy -= Math.sin(angle) * force * 0.7;

                // Color shift on interaction
                particle.hue += force * 1;
                particle.opacity = Math.min(0.9, particle.baseOpacity + force * 0.3);
            } else {
                // Return to base opacity when not interacting
                particle.opacity = particle.baseOpacity;
            }

            // Gentle floating motion like dust
            particle.floatOffset += 0.02;
            particle.vx += Math.sin(particle.floatOffset) * 0.02;
            particle.vy += Math.cos(particle.floatOffset * 1.3) * 0.02;

            // Apply velocity
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Stronger friction for gentle movement
            particle.vx *= 0.98;
            particle.vy *= 0.98;

            // Boundary wrapping within section
            if (particle.x < -particle.size) particle.x = sectionRect.width + particle.size;
            if (particle.x > sectionRect.width + particle.size) particle.x = -particle.size;
            if (particle.y < -particle.size) particle.y = sectionRect.height + particle.size;
            if (particle.y > sectionRect.height + particle.size) particle.y = -particle.size;

            // Very subtle random motion for dust-like behavior
            particle.vx += (Math.random() - 0.5) * 0.02;
            particle.vy += (Math.random() - 0.5) * 0.02;

            // Limit velocity to keep gentle movement
            const maxVel = 1;
            particle.vx = Math.max(-maxVel, Math.min(maxVel, particle.vx));
            particle.vy = Math.max(-maxVel, Math.min(maxVel, particle.vy));
            
            // Apply styles
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
            particle.element.style.opacity = particle.opacity;
            particle.element.style.background = `radial-gradient(circle, hsla(${particle.hue}, 70%, 60%, ${particle.opacity}), transparent)`;
        }

        animate() {
            if (!this.enabled) return;

            this.particles.forEach(particle => this.updateParticle(particle));
            this.animationId = requestAnimationFrame(this.animate.bind(this));
        }

        setupEventListeners() {
            // Track mouse position relative to section
            this.section.addEventListener('mousemove', (e) => {
                const rect = this.section.getBoundingClientRect();
                this.mouse.x = e.clientX - rect.left;
                this.mouse.y = e.clientY - rect.top;
            });

            this.section.addEventListener('mouseenter', () => {
                this.isInSection = true;
            });

            this.section.addEventListener('mouseleave', () => {
                this.isInSection = false;
            });
        }
    }

    // Initialize particle systems for sections with class "particles"
    // Disable particles on mobile devices (screen width <= 768px)
    if (window.innerWidth > 768) {
        // Find all elements with class "particles" that have an ID
        const particleSections = document.querySelectorAll('.particles[id]');
        
        particleSections.forEach(section => {
            new SectionParticleSystem(section.id);
            console.log(`Particles initialized for section: ${section.id}`);
        });
        
        console.log(`Total particle systems created: ${particleSections.length}`);
    }
});