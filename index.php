<?php
/**
 * Main Portfolio Page - Home
 */

// Load environment and database configuration
require_once 'config/database.php';

// Page configuration
$pageTitle = 'Mark Peters - Creative Front-End Web Developer | Portfolio';
$pageDescription = 'Mark Peters - Creative Front-End Web Developer specializing in HTML, CSS, Sass, and JavaScript. Building clean, responsive websites with modern design.';
$pageUrl = 'https://mark-peters.dev';
$pageKeywords = 'web developer, front-end developer, HTML, CSS, Sass, JavaScript, responsive design, portfolio';
$currentPage = 'home';
$includeStructuredData = true;
$includeAudioPlayer = true;
$includeSpaLoader = false; // Disable SPA - using static content now

// Home page specific scripts
$additionalScripts = [
    'js/typewriter.js',
    'js/scrollanimations.js', 
    'js/projectfilter.js',
    'js/media-player.js',
    'js/skill-modals.js',
    'js/contact-form-validation.js'
];
?>
<?php include 'includes/html-start.php'; ?>

<?php include 'includes/sidebar.php'; ?>

<!-- ======================= -->
<!-- Main Content -->
<main id="main-content">
    <!-- Static Content Container (maintaining SPA structure for CSS) -->
    <div id="dynamic-content">
        <!-- Hero Section -->
        <header class="hero" id="hero">
            <div class="content-wrapper">
              <div class="hero-text--name">
                <h2 class="light code-syntax">const me = &#123;</h2>
                <h1 id="typewriter" class="light">name: "Mark Peters",</h1>
                <h2 class="light">  role: <span>"Web Developer"</span>,</h2>
                <h2 class="light code-syntax">&#125;;</h2>
              </div>
            </div>
        </header>

        <!-- ABOUT ME - Wrap content but keep section full width -->
        <section id="about">
          <div class="content-wrapper">
            <div class="about-me-grid">
              <div class="about-me-image">
                <img src="img/MeImage.webp" alt="Mark Peters - Front-End Web Developer" loading="lazy" width="400" height="400" decoding="async" fetchpriority="high">
              </div>
              <div class="about-me-text">
                <h3>About <span class="txt-secondary">&#123;</span>Me<span class="txt-secondary">&#125;</span></h3>
                <p>Hi, I'm a <strong>front-end web developer</strong> who enjoys building clean, responsive websites using <span class="txt-primary">HTML</span>, <span class="txt-secondary">CSS</span>, and <span class="txt-accent">Sass</span>. I focus on making designs look great across all devices, with a strong eye for detail and usability.</p>
                <p>Before diving into web development, I've worked in many creative industries over the last two decades including <em>game development</em>, <em>film</em> and <em>the arts</em> and am a member of <a href="https://www.bafta.org/" target="_blank" rel="noopener" class="special-link">BAFTA</a>. That creative background helps me bring a strong visual sense and storytelling mindset to every project I work on.</p>
                <div class="about-me-icons">
                  <span class="icon-html-five tooltip" data-text="HTML5 - Semantic markup and modern web standards" role="img" aria-label="HTML5"></span>
                  <span class="icon-css3 tooltip" data-text="CSS3 - Modern styling and animations" role="img" aria-label="CSS3"></span>
                  <span class="icon-sass tooltip" data-text="Sass - Advanced CSS preprocessing" role="img" aria-label="Sass"></span>
                  <span class="icon-javascript tooltip" data-text="JavaScript - Interactive web experiences" role="img" aria-label="JavaScript"></span>
                  <span class="icon-jquery tooltip" data-text="jQuery - Simplified DOM manipulation" role="img" aria-label="jQuery"></span>
                  <span class="icon-mysql tooltip" data-text="MySQL - Robust database management" role="img" aria-label="MySQL"></span>
                  <span class="icon-php tooltip" data-text="PHP - Server-side development" role="img" aria-label="PHP"></span>
                  <span class="icon-laravel tooltip" data-text="Laravel - Elegant PHP framework" role="img" aria-label="Laravel"></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Portfolio Projects - Keep section full width for particles background -->
        <section id="portfolio-section" class="portfolio-section particles" aria-labelledby="portfolio-heading">
          <div class="content-wrapper">
            <h2 id="portfolio-heading" class="visually-hidden">My Portfolio Projects</h2>
            <div id="portfolio" class="portfolio-grid">
              <!-- Project 1 -->
                <article class="project pr-1" itemscope itemtype="https://schema.org/CreativeWork">
                  <img src="img/Netmatters.webp" alt="Netmatters Homepage - Responsive website refactor project" loading="lazy" decoding="async" itemprop="image">
                  <p class="tag-refactor"><span class="icon-heart"></span> Refactor</p>
                  <h3 itemprop="name">Netmatters Homepage</h3>
                  <meta itemprop="description" content="Responsive website refactor project showcasing modern web development techniques">
                  <a href="https://netmatters.mark-peters.netmatters-scs.co.uk/" target="_blank" rel="noopener noreferrer" itemprop="url">
                    View Project <span class="icon-arrow-right2"></span>
                  </a>
                  <br>
                  <a href="https://github.com/markap85/Netmatters-Homepage" target="_blank" rel="noopener noreferrer">
                    Source Code
                  </a>
                </article>

                <!-- Project 2 -->
                <article class="project pr-2" itemscope itemtype="https://schema.org/CreativeWork">
                  <img src="img/JSArrays.webp" alt="JavaScript - Array Reflection" loading="lazy" decoding="async" itemprop="image">
                  <p class="tag-frontend">Frontend</p>
                  <h3 itemprop="name">JavaScript - Arrays</h3>
                  <meta itemprop="description" content="Example of JavaScript array reflection techniques">
                  <a href="https://js-array.mark-peters.netmatters-scs.co.uk/" target="_blank" rel="noopener noreferrer" itemprop="url">
                    View Project <span class="icon-arrow-right2"></span>
                  </a>
                  <br>
                  <a href="https://github.com/markap85/JavascriptArrayAssessment" target="_blank" rel="noopener noreferrer">
                    Source Code
                  </a>
                </article>

              <!-- Project 3 -->
                <article class="project pr-3" itemscope itemtype="https://schema.org/CreativeWork">
                  <img src="img/laravel.webp" alt="Laravel Assessment - PHP Backend Development" loading="lazy" decoding="async" itemprop="image">
                  <p class="tag-backend">Backend</p>
                  <h3 itemprop="name">Laravel - Assessment</h3>
                  <meta itemprop="description" content="Full-stack Laravel application demonstrating PHP backend development and MVC architecture">
                  <a href="https://laravel.mark-peters.netmatters-scs.co.uk/" target="_blank" rel="noopener noreferrer" itemprop="url">
                    View Project <span class="icon-arrow-right2"></span>
                  </a>
                  <br>
                  <a href="https://github.com/markap85/Laravel" target="_blank" rel="noopener noreferrer">
                    Source Code
                  </a>
                </article>
              <!-- Project 4 -->
                <article class="project pr-4" itemscope itemtype="https://schema.org/CreativeWork">
                  <img src="img/AGS.webp" alt="Aurora Game Studios - Creative gaming website" loading="lazy" decoding="async" itemprop="image">
                  <p class="tag-frontend">Frontend</p>
                  <h3 itemprop="name">Aurora Game Studios</h3>
                  <meta itemprop="description" content="Creative gaming website showcasing frontend development skills">
                  <a href="https://auroragamestudios.co.uk" target="_blank" rel="noopener noreferrer" itemprop="url">View Project <span class="icon-arrow-right2"></span>
                  </a>
                </article>
              <!-- Project 5 -->
                <article class="project pr-5" itemscope itemtype="https://schema.org/CreativeWork">
                  <img src="img/ACSite.webp" alt="Andy Childs Driving Coach - Professional driving instructor website" loading="lazy" decoding="async" itemprop="image">
                  <p class="tag-frontend">Frontend</p>
                  <h3 itemprop="name">Andy Childs Driving Coach</h3>
                  <meta itemprop="description" content="Professional driving instructor website showcasing frontend development skills">
                  <a href="https://andychildsdrivingcoach.co.uk/" target="_blank" rel="noopener noreferrer" itemprop="url">View Project <span class="icon-arrow-right2"></span>
                  </a>
                </article>
              <!-- Project 6 -->
                <article class="project pr-6">
                  <img src="img/WebSitePlaceHolder_5.webp" alt="Coming soon - Future project placeholder" loading="lazy" decoding="async">
                  <p class="tag-backend">Coming Soon</p>
                  <h3>Future Project</h3>
                </article>

            </div>
          </div>
        </section>

        <!-- Contact Section - Wrap content but keep section full width -->
        <section id="contact">
          <div class="content-wrapper">
            <div class="contact-grid">

              <div class="contact-details">
                <h3 id="contact-heading">Let's Connect</h3>
                <p>If you like what you see, I'd love to hear from you! Whether it's a new project, a collaboration idea, or just to say hello — feel free to reach out.</p>
                <a href="mailto:markalexanderpeters@gmail.com" target="_blank" rel="noopener">Email Me</a>
                <p>I'm always open to a chat — drop me a message anytime!</p>
              </div>

              <form class="contact-form-grid" method="POST" id="contact-form" action="contact-form" novalidate aria-labelledby="contact-heading">
                <input type="checkbox" name="botcheck" style="display: none;" tabindex="-1" aria-hidden="true">

                <div class="name-row">
                  <label for="first-name" class="visually-hidden">First Name</label>
                  <input type="text" class="first-name" id="first-name" name="first_name" placeholder="First Name" required autocomplete="given-name">
                  
                  <label for="phone" class="visually-hidden">Phone Number</label>
                  <input type="tel" class="last-name" id="phone" name="phone" placeholder="Phone Number (Optional)" autocomplete="tel">
                </div>
                
                <label for="email" class="visually-hidden">Email Address</label>
                <input type="email" class="email" id="email" name="email" placeholder="Email Address" required autocomplete="email">
                
                <label for="subject" class="visually-hidden">Subject</label>
                <input type="text" class="subject" id="subject" name="subject" placeholder="Subject" required autocomplete="off">
                
                <label for="message" class="visually-hidden">Message</label>
                <textarea class="message" id="message" name="message" placeholder="Message" required autocomplete="off" rows="5"></textarea>
                
                <button type="submit" class="submit-btn" id="submit-btn" aria-describedby="form-result">
                  <span class="button-text">Submit Message</span>
                  <span class="loading-spinner" style="display: none;">Sending...</span>
                </button>
                
                <!-- Form messages within the form grid -->
                <div class="error-message" id="form-errors" role="alert" style="display: none;"></div>
                <div id="form-result" class="form-result" role="status" aria-live="polite"></div>
              </form>

            </div>
          </div>
        </section>
    </div> <!-- End dynamic-content -->
    
    <?php include 'includes/footer.php'; ?>
</main>

<?php include 'includes/scripts.php'; ?>

</body>
</html>