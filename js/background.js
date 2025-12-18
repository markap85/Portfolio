document.addEventListener('DOMContentLoaded', function() {
    // Vibrant dark gradients with strong variation for glassmorphic showcase
    let backgroundGradients = [
        'linear-gradient(135deg, #0f0c29 0%, #302b63 20%, #24243e 40%, #0f2027 60%, #203a43 80%, #0f0c29 100%)',
        'linear-gradient(135deg, #434343 0%, #000000 20%, #141e30 40%, #243b55 60%, #434343 80%, #000000 100%)',
        'linear-gradient(135deg, #1e3c72 0%, #2a5298 20%, #1e3c72 40%, #7f27ff 60%, #513d8f 80%, #1e3c72 100%)',
    ];

    let currentIndex = 0;
    let slideShowInterval = null;
    let isSlideShowEnabled = true;

    // Background controller object for external access
    window.backgroundController = {
        enableSlideshow: function() {
            isSlideShowEnabled = true;
            startSlideshow();
        },
        disableSlideshow: function() {
            isSlideShowEnabled = false;
            stopSlideshow();
        },
        nextBackground: function() {
            currentIndex = (currentIndex + 1) % backgroundGradients.length;
            changeBackgroundImage();
        },
        previousBackground: function() {
            currentIndex = (currentIndex - 1 + backgroundGradients.length) % backgroundGradients.length;
            changeBackgroundImage();
        }
    };

    function changeBackgroundImage() {
        // Switch to the current background gradient
        document.documentElement.style.setProperty('--background-gradient', backgroundGradients[currentIndex]);
    }

    function startSlideshow() {
        if (slideShowInterval) clearInterval(slideShowInterval);
        // Change background every 20 seconds
        slideShowInterval = setInterval(function() {
            if (isSlideShowEnabled) {
                currentIndex = (currentIndex + 1) % backgroundGradients.length;
                changeBackgroundImage();
            }
        }, 20000);
    }

    function stopSlideshow() {
        if (slideShowInterval) {
            clearInterval(slideShowInterval);
            slideShowInterval = null;
        }
    }

    // Create navigation arrow (right only - cycles through all backgrounds)
    function createNavigationArrow() {
        const rightArrow = document.createElement('div');
        rightArrow.className = 'background-nav-arrow';
        rightArrow.innerHTML = '<span class="icon-keyboard_arrow_right"></span>';
        rightArrow.setAttribute('aria-label', 'Next background');
        rightArrow.addEventListener('click', window.backgroundController.nextBackground);

        document.body.appendChild(rightArrow);

        // Initially hide arrow (slideshow is enabled by default)
        rightArrow.style.display = 'none';
    }

    // Initialize
    changeBackgroundImage(); // Set initial background
    createNavigationArrow();
    
    // Check localStorage for slideshow setting
    const slideshowEnabled = localStorage.getItem('backgroundSlideshow') !== 'false';
    if (slideshowEnabled) {
        startSlideshow();
    } else {
        isSlideShowEnabled = false;
        // Show arrow if slideshow is disabled
        const arrow = document.querySelector('.background-nav-arrow');
        if (arrow) arrow.style.display = 'flex';
    }
});