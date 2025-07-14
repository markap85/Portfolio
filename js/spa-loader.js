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
        // Get all navigation links including logo
        const navLinks = document.querySelectorAll('nav a, .logo a');
        console.log('Found navigation links:', navLinks.length);
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                console.log('Navigation clicked:', href);
                
                // Handle different types of links
                if (href.includes('examples.html')) {
                    this.loadContent('examples');
                } else if (href.includes('scss.html')) {
                    this.loadContent('scss');
                } else if (href === '#home' || href.includes('index.html')) {
                    // Logo clicked or home link - always load home and scroll to top
                    console.log('Loading home content...');
                    this.loadContent('home');
                } else if (href.includes('#about') || href.includes('#portfolio') || href.includes('#contact')) {
                    console.log('Hash navigation detected:', href, 'Current page:', this.currentPage);
                    // If we're not on home page, load home first then scroll
                    if (this.currentPage !== 'home') {
                        console.log('Not on home page, loading home content first...');
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
                        console.log('Already on home page, just scrolling to section...');
                        // Already on home page, just scroll to section
                        // But ensure portfolio filter is initialized if scrolling to portfolio
                        const hash = href.includes('#') ? href.split('#')[1] : '';
                        if (hash === 'portfolio' && typeof initPortfolioFilter === 'function') {
                            // Re-initialize portfolio filter to ensure "Coming Soon" projects are visible
                            setTimeout(() => {
                                console.log('Re-initializing portfolio filter for scroll navigation...');
                                initPortfolioFilter();
                            }, 100);
                        }
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
            
            // Update current page before content transition so reinitializePageScripts knows the correct page
            this.currentPage = page;
            
            // Load content with smooth transition
            await this.transitionContent(content);
            
            // Update browser history
            this.updateHistory(page);
            
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
                
                // Auto scroll to top of page when new content loads
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
                
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
        console.log('reinitializePageScripts called for page:', this.currentPage);
        // Re-initialize scripts that might be needed for dynamic content
        
        // Re-run typewriter effect if on home page
        if (this.currentPage === 'home' && typeof initTypewriter === 'function') {
            setTimeout(() => initTypewriter(), 100);
        }
        
        // Re-initialize skill modals if on home page
        if (this.currentPage === 'home' && typeof initSkillModals === 'function') {
            initSkillModals();
        }
        
        // Re-initialize settings menu for all pages
        if (typeof initSettingsMenu === 'function') {
            initSettingsMenu();
        }
        
        // Re-initialize portfolio filter if on home page
        if (this.currentPage === 'home' && typeof initPortfolioFilter === 'function') {
            // Give more time for content to be fully rendered
            setTimeout(() => {
                console.log('Re-initializing portfolio filter...');
                initPortfolioFilter();
            }, 500);
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
        // Use the enhanced form validation instead of basic form handling
        if (typeof window.initFormValidation === 'function') {
            window.initFormValidation();
        } else {
            console.warn('Enhanced form validation not available, falling back to basic handling');
            this.basicContactFormInit();
        }
    }

    basicContactFormInit() {
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
