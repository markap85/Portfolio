(function() {
    'use strict';
    
    function initBackgroundToggle() {
        const toggleSwitch = document.getElementById('background-switch-unique');
        const toggleIcon = document.getElementById('background-icon-unique');
        
        if (!toggleSwitch || !toggleIcon) return;
        
        // Get current state from localStorage or default to true
        let isEnabled = localStorage.getItem('backgroundToggle') !== 'false';
        
        // Apply initial state
        updateToggleState(isEnabled);
        
        // Handle toggle click
        toggleSwitch.addEventListener('click', function() {
            isEnabled = !isEnabled;
            updateToggleState(isEnabled);
            
            // Save state to localStorage
            localStorage.setItem('backgroundToggle', isEnabled.toString());
            
            // ==============================================
            // ADD YOUR CUSTOM CODE HERE
            // ==============================================

                let backgroundImages = [
        '../img/glassmorphic_01.jpg',
        '../img/glassmorphic_02.jpg'
    ];
            if (isEnabled) {
                console.log('Background toggle ENABLED');
                // Your code for when toggle is ON
                document.documentElement.style.setProperty('--background-image', `url("${backgroundImages[0]}")`);
            } else {
                console.log('Background toggle DISABLED');
                // Your code for when toggle is OFF
                document.documentElement.style.setProperty('--background-image', `url("${backgroundImages[1]}")`);
            }
    // ==============================================
        });
        
        function updateToggleState(enabled) {
            if (enabled) {
                toggleSwitch.classList.add('active');
                toggleIcon.classList.add('active');
            } else {
                toggleSwitch.classList.remove('active');
                toggleIcon.classList.remove('active');
            }
        }
        
        // Initial state application
        // ==============================================
        // ADD YOUR INITIAL STATE CODE HERE
        // ==============================================
        if (isEnabled) {
            console.log('Background toggle initialized as ENABLED');
            // Your initial code for ON state
            
        } else {
            console.log('Background toggle initialized as DISABLED');
            // Your initial code for OFF state
            
        }
        // ==============================================
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBackgroundToggle);
    } else {
        initBackgroundToggle();
    }
})();
