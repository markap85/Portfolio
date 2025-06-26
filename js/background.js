document.addEventListener('DOMContentLoaded', function() {
    let backgroundImages = [
        '../img/glassmorphic_01.jpg',
        '../img/glassmorphic_02.jpg'
    ];

    let currentIndex = 0;

    function changeBackgroundImage() {
        // Update the CSS custom property that controls the background
        document.documentElement.style.setProperty('--background-image', `url("${backgroundImages[currentIndex]}")`);
        currentIndex = (currentIndex + 1) % backgroundImages.length;
    }

    // Call the function every 20 seconds (20000 milliseconds)
    setInterval(changeBackgroundImage, 20000);
});