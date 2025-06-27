(function() {
    'use strict';
    
    function initRotationToggle() {
        const toggleContainer = document.getElementById('rotation-toggle');
        const toggleSwitch = document.getElementById('rotation-switch');
        const toggleIcon = document.getElementById('rotation-icon');
        
        if (!toggleContainer || !toggleSwitch || !toggleIcon) return;
        
        // Detect mobile devices
        function isMobileDevice() {
            return window.innerWidth <= 768 || 
                   /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        }
        
        // Load saved rotation preference (disabled on mobile)
        let rotationEnabled = !isMobileDevice() && localStorage.getItem('backgroundRotation') !== 'false';
        
        // Set initial toggle state
        updateToggleState(rotationEnabled);
        applyRotationState(rotationEnabled);
        
        // Handle toggle clicks (desktop only)
        toggleSwitch.addEventListener('click', function() {
            if (isMobileDevice()) {
                // Mobile devices can't use background rotation
                return;
            }
            
            rotationEnabled = !rotationEnabled;
            updateToggleState(rotationEnabled);
            applyRotationState(rotationEnabled);
            
            // Remember user preference
            localStorage.setItem('backgroundRotation', rotationEnabled.toString());
        });
        
        // Disable rotation when switching to mobile view
        window.addEventListener('resize', function() {
            if (isMobileDevice() && rotationEnabled) {
                // Turn off rotation on mobile devices
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
            
            // Show that mobile devices can't use this feature
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
            
            // Mobile devices and disabled state both stop rotation
            if (isMobile || !enabled) {
                document.body.classList.add('rotation-disabled');
                document.body.classList.remove('rotation-enabled');
            } else {
                document.body.classList.add('rotation-enabled');
                document.body.classList.remove('rotation-disabled');
            }
        }
    }
    
    // Start rotation toggle when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRotationToggle);
    } else {
        initRotationToggle();
    }
})();
