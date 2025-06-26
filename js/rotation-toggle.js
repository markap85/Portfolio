(function() {
    'use strict';
    
    function initRotationToggle() {
        const toggleContainer = document.getElementById('rotation-toggle');
        const toggleSwitch = document.getElementById('rotation-switch');
        const toggleIcon = document.getElementById('rotation-icon');
        
        if (!toggleContainer || !toggleSwitch || !toggleIcon) return;
        
        // Get current state from localStorage or default to true
        let rotationEnabled = localStorage.getItem('backgroundRotation') !== 'false';
        
        // Apply initial state
        updateToggleState(rotationEnabled);
        applyRotationState(rotationEnabled);
        
        // Handle toggle click
        toggleSwitch.addEventListener('click', function() {
            rotationEnabled = !rotationEnabled;
            updateToggleState(rotationEnabled);
            applyRotationState(rotationEnabled);
            
            // Save state to localStorage
            localStorage.setItem('backgroundRotation', rotationEnabled.toString());
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
        
        function applyRotationState(enabled) {
            const bodyBefore = document.querySelector('body::before');
            
            if (enabled) {
                // Enable rotation by adding CSS class
                document.body.classList.add('rotation-enabled');
                document.body.classList.remove('rotation-disabled');
            } else {
                // Disable rotation
                document.body.classList.add('rotation-disabled');
                document.body.classList.remove('rotation-enabled');
            }
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRotationToggle);
    } else {
        initRotationToggle();
    }
})();
