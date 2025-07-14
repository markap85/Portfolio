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
        // Fetch examples content from a template or API endpoint
        try {
            const response = await fetch('content/examples-content.html');
            if (!response.ok) {
                // Fallback to inline content if file doesn't exist
                return this.getInlineExamplesContent();
            }
            return await response.text();
        } catch (error) {
            return this.getInlineExamplesContent();
        }
    }

    getInlineExamplesContent() {
        return `
            <div class="content-wrapper">
                <div class="examples-grid">
                    <div class="examples-header">
                        <h3>Coding Examples <span class="txt-secondary">&#123;</span>Responsive Design<span class="txt-secondary">&#125;</span></h3>
                        <p>Here are some real coding examples from this portfolio website that showcase modern responsive design techniques and best practices.</p>
                    </div>
                    
                    <div class="examples-list">
                        <article class="example-item">
                            <h4>Example 1: Responsive Portfolio Grid</h4>
                            <p>This portfolio grid demonstrates modern responsive design using CSS Grid with automatic column adjustments based on screen size.</p>
                            
                            <div class="code-block">
                                <h5>SCSS Code:</h5>
                                <pre><code>.portfolio-grid {
  display: grid;
  grid-template-columns: 1fr; // 1 column by default
  gap: 30px;
  padding: 20px;
  box-sizing: border-box;
  justify-items: center;

  // Responsive Breakpoints
  @media (min-width: $brk-point-sm) {
    grid-template-columns: 1fr 1fr; // 2 columns on small screens
    max-width: 1260px;
    margin-left: auto;
    margin-right: auto;
  }

  @media (min-width: $brk-point-lg) {
    margin: 0 auto;
    grid-template-columns: 1fr 1fr 1fr; // 3 columns on large screens
  }
}</code></pre>
                            </div>
                            
                            <p><strong>Key Features:</strong></p>
                            <ul>
                                <li>Mobile-first approach (1 column by default)</li>
                                <li>Progressive enhancement for larger screens</li>
                                <li>Automatic spacing with CSS Grid gap</li>
                                <li>Responsive container with max-width constraint</li>
                            </ul>
                        </article>
                        
                        <article class="example-item">
                            <h4>Example 2: Modern Responsive Typography with Clamp()</h4>
                            <p>Using CSS clamp() function for fluid typography that scales smoothly between different screen sizes without media queries.</p>
                            
                            <div class="code-block">
                                <h5>SCSS Code:</h5>
                                <pre><code>.sidebar {
  .logo a {
    font-size: clamp(2rem, 4vh, 3rem); // Responsive logo size
  }
  
  nav ul li a {
    font-size: clamp(1rem, 2.5vh, 1.2rem); // Scale with viewport
    padding: clamp(4px, 1vh, 8px) 0;
  }
  
  #media-player {
    width: clamp(140px, 35vw, 180px); // Scale width with viewport
    padding: clamp(0.5rem, 1.5vh, 1rem); // Scale internal padding
    
    .control-btn.play-btn {
      width: clamp(36px, 8vh, 48px); // Scale play button
      height: clamp(36px, 8vh, 48px);
    }
  }
}</code></pre>
                            </div>
                            
                            <p><strong>Benefits of clamp():</strong></p>
                            <ul>
                                <li>Smooth scaling without abrupt breakpoint changes</li>
                                <li>Minimum and maximum size constraints</li>
                                <li>Reduces the need for multiple media queries</li>
                                <li>Better user experience across all device sizes</li>
                            </ul>
                        </article>
                        
                        <article class="example-item">
                            <h4>Example 3: Responsive Contact Form Layout</h4>
                            <p>A contact form that adapts its layout using CSS Grid, transitioning from single-column on mobile to multi-column on larger screens.</p>
                            
                            <div class="code-block">
                                <h5>SCSS Code:</h5>
                                <pre><code>.contact-form-grid {
  display: grid;
  grid-template-columns: 1fr; // Single column by default
  row-gap: 10px;
  
  // Form field positioning
  .first-name { grid-column: 1; grid-row: 1; }
  .last-name { grid-column: 1; grid-row: 2; }
  .email { grid-column: 1; grid-row: 3; }
  
  // Responsive: Two columns on medium screens
  @media (min-width: 576px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 10px;
    
    .name-row { display: contents; }
    .first-name { grid-column: 1; grid-row: 1; }
    .last-name { grid-column: 2; grid-row: 1; }
    .email { grid-column: 1 / span 2; grid-row: 2; }
  }
}</code></pre>
                            </div>
                            
                            <p><strong>Responsive Features:</strong></p>
                            <ul>
                                <li>Grid layout automatically adjusts form structure</li>
                                <li>Name fields side-by-side on larger screens</li>
                                <li>Full-width fields span multiple columns when needed</li>
                                <li>Consistent spacing maintained across breakpoints</li>
                            </ul>
                        </article>
                    </div>
                </div>
            </div>
        `;
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

    getInlineScssContent() {
        return `
            <div class="content-wrapper">
                <div class="scss-info-grid">
                    <div class="info-header">
                        <h3>SCSS Scheme <span class="txt-secondary">&#123;</span>Course Content<span class="txt-secondary">&#125;</span></h3>
                        <p>Content for the SCSS Scheme course will be loaded here.</p>
                    </div>
                </div>
            </div>
        `;
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
