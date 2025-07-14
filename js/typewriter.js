function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

function initTypewriter() {
    const heading = document.getElementById('typewriter');
    if (heading) {
        const text = 'name: "Mark Peters",';
        typeWriter(heading, text, 150);
    }
}

function startTypewriter() {
    initTypewriter();
}

// Start typewriter animation on page load
window.addEventListener('load', () => {
    startTypewriter();
});

// Make function available globally for SPA re-initialization
window.initTypewriter = initTypewriter;