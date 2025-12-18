<?php
/**
 * Scripts Partial - Common JavaScript files for all pages
 * 
 * @param array $additionalScripts - Array of additional script files to include
 * @param bool $includeSpaLoader - Whether to include SPA loader (default: false for standalone pages)
 */

$additionalScripts = $additionalScripts ?? [];
$includeSpaLoader = $includeSpaLoader ?? false;
?>

<!-- Scripts - Loaded at bottom for better performance -->
<!-- jQuery removed - using modern vanilla JavaScript -->

<!-- Core Application Scripts -->
<script src="js/main.js" defer></script>
<script src="js/smoothscroll.js" defer></script>
<script src="js/currentyear.js" defer></script>
<script src="js/visual-effects.js" defer></script>
<script src="js/back-to-top.js" defer></script>

<?php if ($includeSpaLoader): ?>
<!-- Static Content Scripts (for index.php) -->
<script src="js/typewriter.js" defer></script>
<script src="js/scrollanimations.js" defer></script>
<script src="js/projectfilter.js" defer></script>
<script src="js/media-player.js" defer></script>
<script src="js/skill-modals.js" defer></script>
<script src="js/contact-form-validation.js" defer></script>
<?php endif; ?>

<?php if (!empty($additionalScripts)): ?>
<!-- Additional Page-Specific Scripts -->
<?php foreach ($additionalScripts as $script): ?>
<script src="<?php echo htmlspecialchars($script); ?>" defer></script>
<?php endforeach; ?>
<?php endif; ?>

<?php if ($currentPage === 'home' && !$includeSpaLoader): ?>
<!-- Simple Navigation for Static Home Page -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    console.log('Static navigation initialized');
    
    // Handle smooth scroll for hash links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            console.log('Clicking nav link:', targetId, 'Found element:', !!targetElement);
            
            if (targetElement) {
                // Calculate offset for any fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                console.log('Scrolling to:', targetId, 'Position:', offsetPosition);
                
                // Smooth scroll to target
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav state
                updateActiveNav(targetId);
            }
        });
    });
    
    // Update active navigation
    function updateActiveNav(activeSection) {
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        const activeNavLink = document.getElementById('nav-' + activeSection);
        if (activeNavLink) {
            activeNavLink.classList.add('active');
        }
        
        console.log('Updated active nav to:', activeSection);
    }
    
    // Set initial active state (About Me by default)
    setTimeout(() => {
        updateActiveNav('about');
    }, 100);
    
    // Handle hash in URL on page load
    const hash = window.location.hash.substring(1);
    if (hash) {
        setTimeout(() => {
            const targetElement = document.getElementById(hash);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                updateActiveNav(hash);
            }
        }, 500);
    }
});
</script>
<?php endif; ?>