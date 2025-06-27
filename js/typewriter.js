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

        function startTypewriter() {
            const heading = document.getElementById('typewriter');
            const text = "name: \"Mark Peters\",";
            typeWriter(heading, text, 150);
        }
        // Start typewriter animation on page load
        window.addEventListener('load', () => {
            startTypewriter();
        });