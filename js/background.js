document.addEventListener('DOMContentLoaded', function() {
    let backgroundImages = [
        '../img/glassmorphic_01.jpg',
        '../img/glassmorphic_02.jpg',
        '../img/glassmorphic_03.jpg',
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
            currentIndex = (currentIndex + 1) % backgroundImages.length;
            changeBackgroundImage();
        },
        previousBackground: function() {
            currentIndex = (currentIndex - 1 + backgroundImages.length) % backgroundImages.length;
            changeBackgroundImage();
        }
    };

    function changeBackgroundImage() {
        // Switch to the current background image
        document.documentElement.style.setProperty('--background-image', `url("${backgroundImages[currentIndex]}")`);
    }

    function startSlideshow() {
        if (slideShowInterval) clearInterval(slideShowInterval);
        // Change background every 20 seconds
        slideShowInterval = setInterval(function() {
            if (isSlideShowEnabled) {
                currentIndex = (currentIndex + 1) % backgroundImages.length;
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