<?php
/**
 * Sidebar Navigation Partial
 * 
 * @param string $currentPage - The current page identifier (home, examples, scss)
 */

// Load configuration
require_once __DIR__ . '/config.php';

$currentPage = $currentPage ?? getCurrentPage();
?>

<!-- SIDEBAR -->
<button class="burger" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="sidebar">
    <span class="burger-bar"></span>
    <span class="burger-bar"></span>
    <span class="burger-bar"></span>
</button>
<div class="sidebar-overlay"></div>

<aside class="sidebar" id="sidebar">
    <div class="logo">
        <div class="logo-text">
            <a href="index.php">
                <span>&#123;</span>M/P<span>&#125;</span>
            </a>
        </div>
    </div>

    <!-- Settings removed for clarity -->

    <nav aria-label="Main navigation">
        <ul>
            <li>
                <a href="<?php echo ($currentPage === 'home') ? '#about' : 'index.php#about'; ?>" id="nav-about">
                    About Me
                </a>
            </li>
            <li>
                <a href="<?php echo ($currentPage === 'home') ? '#portfolio' : 'index.php#portfolio'; ?>" id="nav-portfolio">
                    My Portfolio
                </a>
            </li>
            <li>
                <a href="examples.php" class="txt-secondary <?php echo ($currentPage === 'examples') ? 'active' : ''; ?>" id="nav-examples">
                    Coding Examples
                </a>
            </li>
            <li>
                <a href="scss.php" class="txt-secondary <?php echo ($currentPage === 'scss') ? 'active' : ''; ?>" id="nav-scss">
                    SCSS Scheme
                </a>
            </li>
            <li class="contact-me">
                <a href="<?php echo ($currentPage === 'home') ? '#contact' : 'index.php#contact'; ?>" id="nav-contact">
                    Contact Me
                </a>
            </li>
        </ul>
    </nav>

    <!-- =======================
    SIDEBAR BOTTOM SECTION
    ======================= -->
    <div class="sidebar-bottom">
        <div class="socials">
            <a class="social-icons--linkedin icon-linkedin" 
               href="<?php echo LINKEDIN_URL; ?>" 
               target="_blank" 
               rel="noopener noreferrer" 
               aria-label="LinkedIn"></a>
            <a class="social-icons--git icon-github" 
               href="<?php echo GITHUB_URL; ?>" 
               target="_blank" 
               rel="noopener" 
               aria-label="GitHub"></a>
            <a class="social-icons--facebook icon-facebook2" 
               href="<?php echo FACEBOOK_URL; ?>" 
               target="_blank" 
               rel="noopener" 
               aria-label="Facebook"></a>
        </div>
        
        <!-- =======================
        MEDIA PLAYER
        ======================= -->
        <div id="media-player" class="media-player">
            <div class="player-controls">
                <button class="control-btn prev-btn" id="prev-track" aria-label="Previous track">
                    <span class="icon-first"></span>
                </button>
                
                <button class="control-btn play-btn" id="play-pause" aria-label="Play/Pause">
                    <span class="icon-play3" id="play-icon"></span>
                </button>
                
                <button class="control-btn next-btn" id="next-track" aria-label="Next track">
                    <span class="icon-last"></span>
                </button>
            </div>
            
            <div class="track-info">
                <span class="track-title" id="track-title">Track 1</span>
            </div>
            
            <div class="volume-container">
                <button class="volume-btn" id="volume-toggle" aria-label="Toggle volume">
                    <span class="icon-volume_up" id="volume-icon"></span>
                </button>
                <div class="volume-slider-container">
                    <input type="range" class="volume-slider" id="volume-slider" min="0" max="100" value="50" aria-label="Volume">
                </div>
            </div>
        </div>

        <!-- Settings removed for clarity -->
    </div>
</aside>