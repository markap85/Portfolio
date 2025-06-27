(function() {
    'use strict';
    
    function initRotationToggle() {
        const toggleContainer = document.getElementById('rotation-toggle');
        const toggleSwitch = document.getElementById('rotation-switch');
        const toggleIcon = document.getElementById('rotation-icon');
        
        if (!toggleContainer || !toggleSwitch || !toggleIcon) return;
        
        // Check if device is mobile
        function isMobileDevice() {
            return window.innerWidth <= 768 || 
                   /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        }
        
        // Get current state from localStorage or default to true (but false on mobile)
        let rotationEnabled = !isMobileDevice() && localStorage.getItem('backgroundRotation') !== 'false';
        
        // Apply initial state
        updateToggleState(rotationEnabled);
        applyRotationState(rotationEnabled);
        
        // Handle toggle click - only if not mobile
        toggleSwitch.addEventListener('click', function() {
            if (isMobileDevice()) {
                // Don't allow toggling on mobile
                return;
            }
            
            rotationEnabled = !rotationEnabled;
            updateToggleState(rotationEnabled);
            applyRotationState(rotationEnabled);
            
            // Save state to localStorage
            localStorage.setItem('backgroundRotation', rotationEnabled.toString());
        });
        
        // Handle window resize to check if device switches to/from mobile
        window.addEventListener('resize', function() {
            if (isMobileDevice() && rotationEnabled) {
                // Force disable rotation on mobile
                rotationEnabled = false;
                updateToggleState(rotationEnabled);
                applyRotationState(rotationEnabled);
            }
        });
        
        function updateToggleState(enabled) {
            const isMobile = isMobileDevice();
            
            if (enabled && !isMobile) {
                toggleSwitch.classList.add('active');
                toggleIcon.classList.add('active');
            } else {
                toggleSwitch.classList.remove('active');
                toggleIcon.classList.remove('active');
            }
            
            // Add visual indication that toggle is disabled on mobile
            if (isMobile) {
                toggleSwitch.style.opacity = '0.5';
                toggleSwitch.style.cursor = 'not-allowed';
            } else {
                toggleSwitch.style.opacity = '';
                toggleSwitch.style.cursor = 'pointer';
            }
        }
        
        function applyRotationState(enabled) {
            const isMobile = isMobileDevice();
            
            // Force disabled on mobile regardless of enabled state
            if (isMobile || !enabled) {
                document.body.classList.add('rotation-disabled');
                document.body.classList.remove('rotation-enabled');
            } else {
                document.body.classList.add('rotation-enabled');
                document.body.classList.remove('rotation-disabled');
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
