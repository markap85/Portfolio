// Single Page Application (SPA) Content Loader
// Handles dynamic content loading without page refreshes

class SPAContentLoader {
    constructor() {
        this.currentPage = 'home';
        this.contentContainer = null;
        this.loadingIndicator = null;
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        document.addEventListener('DOMContentLoaded', () => {
            this.contentContainer = document.getElementById('dynamic-content');
            this.setupNavigation();
            this.setupLoadingIndicator();
            this.handleInitialLoad();
        });
    }

    setupLoadingIndicator() {
        // Create a loading indicator
        this.loadingIndicator = document.createElement('div');
        this.loadingIndicator.className = 'loading-indicator';
        this.loadingIndicator.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>Loading content...</p>
            </div>
        `;
        this.loadingIndicator.style.display = 'none';
        document.body.appendChild(this.loadingIndicator);
    }

    setupNavigation() {
        // Get all navigation links
        const navLinks = document.querySelectorAll('nav a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                
                // Handle different types of links
                if (href.includes('examples.html')) {
                    this.loadContent('examples');
                } else if (href.includes('scss.html')) {
                    this.loadContent('scss');
                } else if (href.includes('#about') || href.includes('#portfolio') || href.includes('#contact')) {
                    // If we're not on home page, load home first then scroll
                    if (this.currentPage !== 'home') {
                        this.loadContent('home').then(() => {
                            // Extract the hash from the href
                            const hash = href.includes('#') ? href.split('#')[1] : '';
                            if (hash) {
                                setTimeout(() => {
                                    this.scrollToSection(hash);
                                }, 300); // Wait for content to load
                            }
                        });
                    } else {
                        // Already on home page, just scroll to section
                        const hash = href.includes('#') ? href.split('#')[1] : '';
                        if (hash) {
                            this.scrollToSection(hash);
                        }
                    }
                } else if (href.includes('index.html')) {
                    this.loadContent('home');
                }
                
                // Update active navigation state
                this.updateActiveNav(link);
            });
        });

        // Also handle any scroll-down links and other hash links in content
        this.setupContentNavigation();
    }

    setupContentNavigation() {
        // Handle scroll-down links and other hash links that might be in dynamic content
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link && !link.closest('nav')) { // Exclude nav links (already handled)
                e.preventDefault();
                const hash = link.getAttribute('href').substring(1);
                
                // If we're not on home page and trying to scroll to a home section, go home first
                if ((hash === 'about' || hash === 'portfolio' || hash === 'contact') && this.currentPage !== 'home') {
                    this.loadContent('home').then(() => {
                        setTimeout(() => {
                            this.scrollToSection(hash);
                        }, 300);
                    });
                } else {
                    this.scrollToSection(hash);
                }
            }
        });
    }

    updateActiveNav(activeLink) {
        // Remove active class from all nav links
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to clicked link
        activeLink.classList.add('active');
    }

    async loadContent(page) {
        try {
            this.showLoading();
            
            let content = '';
            
            switch(page) {
                case 'home':
                    content = await this.getHomeContent();
                    break;
                case 'examples':
                    content = await this.getExamplesContent();
                    break;
                case 'scss':
                    content = await this.getScssContent();
                    break;
                default:
                    content = await this.getHomeContent();
            }
            
            // Update the page title
            this.updatePageTitle(page);
            
            // Load content with smooth transition
            await this.transitionContent(content);
            
            // Update browser history
            this.updateHistory(page);
            
            this.currentPage = page;
            
        } catch (error) {
            console.error('Error loading content:', error);
            this.showError('Failed to load content. Please try again.');
        } finally {
            this.hideLoading();
        }
    }

    async getHomeContent() {
        // Load home content from external file
        try {
            const response = await fetch('content/home-content.html');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.text();
        } catch (error) {
            console.error('Error loading home content:', error);
            // Fallback to basic content if file doesn't exist
            return `
                <div class="content-wrapper">
                    <div class="error-message">
                        <h3>Welcome to Mark Peters' Portfolio</h3>
                        <p>Content is being loaded...</p>
                    </div>
                </div>
            `;
        }
    }

    async getExamplesContent() {
        // Load examples content from external file
        try {
            const response = await fetch('content/examples-content.html');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.text();
        } catch (error) {
            console.error('Error loading examples content:', error);
            // Simple fallback if file doesn't exist
            return `
                <div class="content-wrapper">
                    <div class="error-message">
                        <h3>Coding Examples</h3>
                        <p>Examples content is being loaded...</p>
                    </div>
                </div>
            `;
        }
    }

    async getScssContent() {
        try {
            const response = await fetch('content/scss-content.html');
            if (!response.ok) {
                return this.getInlineScssContent();
            }
            return await response.text();
        } catch (error) {
            return this.getInlineScssContent();
        }
    }

    async transitionContent(newContent) {
        return new Promise((resolve) => {
            // Fade out current content
            this.contentContainer.style.opacity = '0';
            this.contentContainer.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                // Update content
                this.contentContainer.innerHTML = newContent;
                
                // Re-initialize any necessary scripts for the new content
                this.reinitializePageScripts();
                
                // Fade in new content
                this.contentContainer.style.opacity = '1';
                this.contentContainer.style.transform = 'translateY(0)';
                
                resolve();
            }, 300);
        });
    }

    reinitializePageScripts() {
        // Re-initialize scripts that might be needed for dynamic content
        
        // Re-run typewriter effect if on home page
        if (this.currentPage === 'home' && typeof initTypewriter === 'function') {
            setTimeout(() => initTypewriter(), 100);
        }
        
        // Re-initialize skill modals if on home page
        if (this.currentPage === 'home' && typeof initSkillModals === 'function') {
            initSkillModals();
        }
        
        // Re-initialize portfolio filter if on home page
        if (this.currentPage === 'home' && typeof initPortfolioFilter === 'function') {
            setTimeout(() => initPortfolioFilter(), 200);
        }
        
        // Re-initialize contact form if on home page
        if (this.currentPage === 'home') {
            this.initContactForm();
        }
        
        // Re-initialize scroll animations
        if (typeof initScrollAnimations === 'function') {
            initScrollAnimations();
        }
        
        // Re-initialize current year in footer
        if (typeof updateCurrentYear === 'function') {
            updateCurrentYear();
        }
    }

    initContactForm() {
        const form = document.getElementById('form');
        const result = document.getElementById('result');

        if (form && result) {
            // Remove any existing event listeners
            const newForm = form.cloneNode(true);
            form.parentNode.replaceChild(newForm, form);
            
            newForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const formData = new FormData(newForm);
                const object = Object.fromEntries(formData);
                const json = JSON.stringify(object);
                result.innerHTML = "Please wait..."

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
                    if (response.status == 200) {
                        result.innerHTML = json.message;
                    } else {
                        console.log(response);
                        result.innerHTML = json.message;
                    }
                })
                .catch(error => {
                    console.log(error);
                    result.innerHTML = "Something went wrong!";
                })
                .then(function() {
                    newForm.reset();
                    setTimeout(() => {
                        result.style.display = "none";
                    }, 3000);
                });
            });
        }
    }

    updatePageTitle(page) {
        const titles = {
            'home': 'Mark Peters - Web Developer',
            'examples': 'Mark Peters - Coding Examples',
            'scss': 'Mark Peters - SCSS Scheme'
        };
        
        document.title = titles[page] || titles.home;
    }

    updateHistory(page) {
        const urls = {
            'home': '/',
            'examples': '/examples',
            'scss': '/scss'
        };
        
        const url = urls[page] || urls.home;
        window.history.pushState({ page }, '', url);
    }

    handleInitialLoad() {
        // Load home content immediately
        this.loadContent('home');
        
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.page) {
                this.loadContent(e.state.page);
            } else {
                this.loadContent('home');
            }
        });
        
        // Set initial state
        window.history.replaceState({ page: 'home' }, '', '/');
    }

    showLoading() {
        this.loadingIndicator.style.display = 'flex';
    }

    hideLoading() {
        this.loadingIndicator.style.display = 'none';
    }

    showError(message) {
        // You could implement a more sophisticated error display here
        console.error(message);
        alert(message);
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// Initialize the SPA loader
const spaLoader = new SPAContentLoader();
