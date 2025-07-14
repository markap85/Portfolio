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
        // Return the original home content (about, portfolio, contact sections)
        return `
            <!-- Hero Section -->
            <header class="hero">
                <div class="content-wrapper">
                  <div class="hero-text--name">
                    <h2 class="light">const me = &#123;</h2>
                    <h1 id="typewriter" class="light">name: <span>"Mark Peters"</span>,</h1>
                    <h2 class="light">  role: <span>"Web Developer"</span>,</h2>
                    <h2 class="light">&#125;;</h2>
                  </div>
                </div>
                  <div class="content-wrapper hero-text--scroll">
                    <a href="#about" class="scroll-down"></a> <br>
                    <a href="#about" class="icon-keyboard_arrow_down"></a>
                  </div>
            </header>

            <!-- ABOUT ME Section -->
            <section id="about">
              <div class="content-wrapper">
                <div class="about-me-grid">
                  <div class="about-me-image">
                    <img src="img/MeImage.webp" alt="Mark Peters" loading="lazy">
                  </div>
                  <div class="about-me-text">
                    <h3>About <span class="txt-secondary">&#123;</span>Me<span class="txt-secondary">&#125;</span></h3>
                    <p>Hi, I'm a front-end web developer who enjoys building clean, responsive websites using <span class="txt-primary">HTML</span>, <span class="txt-secondary">CSS</span>, and <span class="txt-accent">Sass</span>. I focus on making designs look great across all devices, with a strong eye for detail and usability.</p>
                    <p>Before diving into web development, I've worked in many creative industries over the last two decades including game dev, film and the arts and am a member of <a href="https://www.bafta.org/" target="_blank" rel="noopener" class="special-link">BAFTA</a>. That creative background helps me bring a strong visual sense and storytelling mindset to every project I work on.</p>
                    <div class="about-me-icons">
                      <span class="icon-html-five" data-text="HTML5" class="tooltip"></span>
                      <span class="icon-css3" data-text="CSS3" class="tooltip"></span>
                      <span class="icon-sass" data-text="Sass/SCSS" class="tooltip"></span>
                      <span class="icon-javascript" data-text="JavaScript" class="tooltip"></span>
                      <span class="icon-jquery" data-text="jQuery" class="tooltip"></span>
                      <span class="icon-postgresql" data-text="PostgreSQL" class="tooltip"></span>
                      <span class="icon-php" data-text="PHP" class="tooltip"></span>
                      <span class="icon-laravel" data-text="Laravel" class="tooltip"></span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div class="content-wrapper">
              <div class="next-section">
                <a href="#portfolio" class="icon-keyboard_arrow_down"></a>
              </div>
            </div>

            <!-- Portfolio Projects -->
            <div id="portfolio-section" class="portfolio-section particles">
              <div class="content-wrapper">
                <section id="portfolio" class="portfolio-grid">
                  <article class="project pr-1">
                    <img src="img/Netmatters.png" alt="Project One">
                    <p class="tag-refactor"><span class="icon-heart"></span> Refactor</p>
                    <h3>Netmatters Homepage</h3>
                    <a href="https://netmatters.mark-peters.netmatters-scs.co.uk/" target="_blank">
                      View Project <span class="icon-arrow-right2"></span>
                    </a>
                    <br>
                    <a href="https://github.com/markap85/Netmatters-Homepage" target="_blank">
                      Source Code
                    </a>
                  </article>
                  <article class="project pr-2">
                    <img src="img/AGS.png" alt="Project Two">
                    <p class="tag-frontend">Frontend</p>
                    <h3>Aurora Game Studios</h3>
                    <a href="https://auroragamestudios.co.uk" target="_blank">View Project <span class="icon-arrow-right2"></span>
                    </a>
                  </article>
                  <article class="project pr-3">
                    <img src="img/WebSitePlaceHolder_3.jpg" alt="Project Three">
                    <h3>Coming Soon</h3>
                  </article>
                  <article class="project pr-4">
                    <img src="img/WebSitePlaceHolder_4.jpg" alt="Project Four">
                    <h3>Coming Soon</h3>
                  </article>
                  <article class="project pr-5">
                    <img src="img/WebSitePlaceHolder_5.jpg" alt="Project Five">
                    <h3>Coming Soon</h3>
                  </article>
                  <article class="project pr-6">
                    <img src="img/WebSitePlaceHolder_6.jpg" alt="Project Six">
                    <h3>Coming Soon</h3>
                  </article>
                </section>
              </div>
            </div>

            <div class="content-wrapper">
              <div class="next-section">
                <a href="#contact" class="icon-keyboard_arrow_down"></a>
              </div>
            </div>

            <!-- Contact Section -->
            <section id="contact">
              <div class="content-wrapper">
              <div class="contact-grid">

              <div class="contact-details">
              <h3>Let's Connect</h3>
              <p>If you like what you see, I'd love to hear from you! Whether it's a new project, a collaboration idea, or just to say hello — feel free to reach out.</p>
              <h3>(+44) 7909 448558</h3>
              <a href="mailto:markalexanderpeters@gmail.com" target="_blank" rel="noopener">Email Me</a>
              <p>I'm always open to a chat — drop me a message anytime!</p>
              </div>

              <form class="contact-form-grid" method="POST" id="form">
                <input type="hidden" name="access_key" value="15528a23-c6d4-4bf0-a2b0-422078a35cb9">
                <input type="hidden" name="subject" value="New Submission from Web3Forms">
                <input type="checkbox" name="botcheck" id="" style="display: none;">

                <div class="name-row">
                  <input type="text" class="first-name" id="first-name" name="name" placeholder="First Name" required autocomplete="given-name">
                  <input type="text" class="last-name" id="last-name" name="phone" placeholder="Phone Number" required autocomplete="family-name">
                </div>
                <input type="email" class="email" id="email" name="email" placeholder="Email Address" required autocomplete="email">
                <input type="text" class="subject" id="subject" name="subject" placeholder="Subject" required autocomplete="off">
                <textarea class="message" id="message" name="message" placeholder="Message" required autocomplete="off"></textarea>
                <button type="submit" class="submit-btn">Submit</button>
                
                <div id="result"></div>
              </form>

              </div>
              </div>
            </section>
        `;
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
                        <h3>SCSS Architecture <span class="txt-secondary">&#123;</span>7-1 Pattern<span class="txt-secondary">&#125;</span></h3>
                        <p>This project follows the industry-standard 7-1 SCSS architecture pattern for maintainable and scalable stylesheets.</p>
                    </div>
                    
                    <div class="info-block">
                        <div class="info-content">
                            <h4>Project Structure</h4>
                            <p>The SCSS files are organized using the 7-1 pattern, which divides stylesheets into 7 folders and 1 main file:</p>
                            
                            <div class="folder-structure">
                                <h5>📁 scss/</h5>
                                <ul>
                                    <li>📂 <strong>abstracts/</strong> - Variables, mixins, functions</li>
                                    <li>📂 <strong>base/</strong> - Reset, typography, base styles</li>
                                    <li>📂 <strong>components/</strong> - UI components</li>
                                    <li>📂 <strong>layout/</strong> - Layout-related sections</li>
                                    <li>📂 <strong>pages/</strong> - Page-specific styles</li>
                                    <li>📂 <strong>themes/</strong> - Different themes</li>
                                    <li>📂 <strong>vendors/</strong> - Third-party styles</li>
                                    <li>📄 <strong>styles.scss</strong> - Main file that imports everything</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="info-image">
                            <img src="img/scss-architecture.png" alt="SCSS 7-1 Pattern" class="info-img">
                        </div>
                    </div>
                    
                    <div class="benefits-section">
                        <h4>Benefits of This Approach</h4>
                        <ul>
                            <li><strong>Maintainability:</strong> Easy to find and modify specific styles</li>
                            <li><strong>Scalability:</strong> Can grow with project complexity</li>
                            <li><strong>Team Collaboration:</strong> Clear organization for multiple developers</li>
                            <li><strong>Performance:</strong> Modular imports reduce unused CSS</li>
                            <li><strong>Best Practices:</strong> Industry-standard approach</li>
                        </ul>
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
            'scss': 'Mark Peters - SCSS Architecture'
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
