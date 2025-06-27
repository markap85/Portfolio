document.addEventListener('DOMContentLoaded', function() {
    let backgroundImages = [
        '../img/glassmorphic_01.jpg',
        '../img/glassmorphic_02.jpg',
        '../img/glassmorphic_03.jpg',
    ];

    let currentIndex = 0;

    function changeBackgroundImage() {
        // Switch to the next background image
        document.documentElement.style.setProperty('--background-image', `url("${backgroundImages[currentIndex]}")`);
        currentIndex = (currentIndex + 1) % backgroundImages.length;
    }

    // Change background every 20 seconds
    setInterval(changeBackgroundImage, 20000);
});