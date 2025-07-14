// Settings menu initialization function for SPA
function initSettingsMenu() {
    console.log('Initializing settings menu...');
    
    // Remove any existing modal to prevent duplicates
    const existingModal = document.querySelector('#settings-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create settings modal HTML
    const modalHTML = `
        <div id="settings-modal" class="settings-modal" style="display: none;">
            <div class="settings-modal-content">
                <div class="settings-header">
                    <h3>Settings</h3>
                    <span class="settings-modal-close">&times;</span>
                </div>
                
                <div class="settings-body">
                    
                    <!-- Background Rotation Setting -->
                    <div class="setting-item">
                        <div class="setting-label">
                            <span class="setting-icon icon-refresh"></span>
                            <div class="setting-text">
                                <h4>Background Rotation</h4>
                                <p>Rotate background images</p>
                            </div>
                        </div>
                        <div class="setting-control">
                            <div class="toggle-switch" id="settings-rotation-toggle">
                                <span class="toggle-slider"></span>
                            </div>
                        </div>
                    </div>

                    <!-- Background Slideshow Setting -->
                    <div class="setting-item">
                        <div class="setting-label">
                            <span class="setting-icon icon-slideshow"></span>
                            <div class="setting-text">
                                <h4>Background Slideshow</h4>
                                <p>Auto-cycle through background images</p>
                            </div>
                        </div>
                        <div class="setting-control">
                            <div class="toggle-switch" id="settings-slideshow-toggle">
                                <span class="toggle-slider"></span>
                            </div>
                        </div>
                    </div>

                    <!-- Music Player Setting -->
                    <div class="setting-item">
                        <div class="setting-label">
                            <span class="setting-icon icon-volume_up"></span>
                            <div class="setting-text">
                                <h4>Background Music</h4>
                                <p>Play ambient background music</p>
                            </div>
                        </div>
                        <div class="setting-control">
                            <div class="toggle-switch" id="settings-music-toggle">
                                <span class="toggle-slider"></span>
                            </div>
                        </div>
                    </div>

                    <!-- Animation Speed Setting -->
                    <div class="setting-item">
                        <div class="setting-label">
                            <span class="setting-icon icon-bolt"></span>
                            <div class="setting-text">
                                <h4>Animation Speed</h4>
                                <p>Control scroll and transition animations</p>
                            </div>
                        </div>
                        <div class="setting-control">
                            <select id="settings-animation-speed" class="setting-select">
                                <option value="slow">Slow</option>
                                <option value="normal">Normal</option>
                                <option value="fast">Fast</option>
                            </select>
                        </div>
                    </div>

                    <!-- Theme Preference -->
                    <div class="setting-item">
                        <div class="setting-label">
                            <span class="setting-icon icon-brightness_4"></span>
                            <div class="setting-text">
                                <h4>Glassmorphic Intensity</h4>
                                <p>Adjust glassmorphic effect strength</p>
                            </div>
                        </div>
                        <div class="setting-control">
                            <input type="range" id="settings-glass-intensity" 
                                   class="setting-range" 
                                   min="1" max="3" value="2" 
                                   aria-label="Glassmorphic intensity">
                            <div class="range-labels">
                                <span>Subtle</span>
                                <span>Normal</span>
                                <span>Strong</span>
                            </div>
                        </div>
                    </div>

                </div>
                
                <div class="settings-footer">
                    <button class="settings-reset-btn" id="settings-reset">Reset to Defaults</button>
                    <button class="settings-close-btn" id="settings-close">Done</button>
                </div>
            </div>
        </div>
    `;

    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Get modal elements
    const modal = document.querySelector('#settings-modal');
    const modalContent = modal.querySelector('.settings-modal-content');
    const closeBtn = modal.querySelector('.settings-modal-close');
    const closeBtnFooter = modal.querySelector('#settings-close');
    const resetBtn = modal.querySelector('#settings-reset');

    // Setting controls
    const rotationToggle = modal.querySelector('#settings-rotation-toggle');
    const slideshowToggle = modal.querySelector('#settings-slideshow-toggle');
    const musicToggle = modal.querySelector('#settings-music-toggle');
    const animationSpeed = modal.querySelector('#settings-animation-speed');
    const glassIntensity = modal.querySelector('#settings-glass-intensity');

    // Initialize settings from localStorage or defaults
    loadSettings();

    // Apply initial settings on page load
    const initialRotation = localStorage.getItem('backgroundRotation') !== 'false';
    const initialSlideshow = localStorage.getItem('backgroundSlideshow') !== 'false'; // Default to true
    const initialMusic = localStorage.getItem('backgroundMusic') !== 'false'; // Default to true
    const initialSpeed = localStorage.getItem('animationSpeed') || 'normal';
    const initialIntensity = localStorage.getItem('glassIntensity') || '2';
    
    applyRotationSetting(initialRotation);
    applySlideshowSetting(initialSlideshow);
    applyMusicSetting(initialMusic);
    applyAnimationSpeed(initialSpeed);
    applyGlassIntensity(initialIntensity);

    // Setting event handlers
    rotationToggle.addEventListener('click', function() {
        const isActive = this.classList.contains('active');
        const newState = !isActive;
        
        // Update UI
        updateToggleState(this, newState);
        
        // Apply rotation setting
        applyRotationSetting(newState);
        
        // Save setting
        localStorage.setItem('backgroundRotation', newState.toString());
    });

    slideshowToggle.addEventListener('click', function() {
        const isActive = this.classList.contains('active');
        const newState = !isActive;
        
        // Update UI
        updateToggleState(this, newState);
        
        // Apply slideshow setting
        applySlideshowSetting(newState);
        
        // Save setting
        localStorage.setItem('backgroundSlideshow', newState.toString());
    });

    musicToggle.addEventListener('click', function() {
        const isActive = this.classList.contains('active');
        const newState = !isActive;
        
        // Update UI
        updateToggleState(this, newState);
        
        // Apply music setting
        applyMusicSetting(newState);
        
        // Save setting
        localStorage.setItem('backgroundMusic', newState.toString());
    });

    animationSpeed.addEventListener('change', function() {
        const speed = this.value;
        applyAnimationSpeed(speed);
        localStorage.setItem('animationSpeed', speed);
    });

    glassIntensity.addEventListener('input', function() {
        const intensity = this.value;
        applyGlassIntensity(intensity);
        localStorage.setItem('glassIntensity', intensity);
    });

    resetBtn.addEventListener('click', function() {
        resetToDefaults();
    });

    // Modal functions
    function openModal() {
        modal.style.display = 'block';
        modalContent.style.transition = 'all 0.3s ease';
        modalContent.style.transform = 'translate(-50%, -50%) scale(0.9)';
        modalContent.style.opacity = '0';
        
        // Trigger animation
        setTimeout(() => {
            modalContent.style.transform = 'translate(-50%, -50%) scale(1)';
            modalContent.style.opacity = '1';
        }, 10);
        
        // Update settings display
        loadSettings();
    }

    function closeModal() {
        modalContent.style.transform = 'translate(-50%, -50%) scale(0.9)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            modal.style.display = 'none';
            modalContent.style.transition = '';
        }, 300);
    }

    // Setting helper functions
    function updateToggleState(toggle, active) {
        if (active) {
            toggle.classList.add('active');
        } else {
            toggle.classList.remove('active');
        }
    }

    function loadSettings() {
        // Background rotation - default to enabled (true)
        const rotationEnabled = localStorage.getItem('backgroundRotation') !== 'false';
        updateToggleState(rotationToggle, rotationEnabled);
        applyRotationSetting(rotationEnabled); // Apply the setting immediately
        
        // Background slideshow - default to enabled (true)
        const slideshowEnabled = localStorage.getItem('backgroundSlideshow') !== 'false';
        updateToggleState(slideshowToggle, slideshowEnabled);
        applySlideshowSetting(slideshowEnabled); // Apply the setting immediately
        
        // Background music - default to enabled (true)
        const musicEnabled = localStorage.getItem('backgroundMusic') !== 'false';
        updateToggleState(musicToggle, musicEnabled);
        
        // Animation speed
        const speed = localStorage.getItem('animationSpeed') || 'normal';
        animationSpeed.value = speed;
        
        // Glass intensity
        const intensity = localStorage.getItem('glassIntensity') || '2';
        glassIntensity.value = intensity;
    }

    function applyRotationSetting(enabled) {
        // Apply rotation setting directly to body classes since sidebar toggle is removed
        if (enabled) {
            document.body.classList.add('rotation-enabled');
            document.body.classList.remove('rotation-disabled');
        } else {
            document.body.classList.add('rotation-disabled');
            document.body.classList.remove('rotation-enabled');
        }
    }

    function applySlideshowSetting(enabled) {
        // Apply slideshow setting to control automatic background changes
        if (window.backgroundController) {
            if (enabled) {
                window.backgroundController.enableSlideshow();
                // Hide manual navigation arrow
                const arrow = document.querySelector('.background-nav-arrow');
                if (arrow) arrow.style.display = 'none';
            } else {
                window.backgroundController.disableSlideshow();
                // Show manual navigation arrow
                const arrow = document.querySelector('.background-nav-arrow');
                if (arrow) arrow.style.display = 'flex';
            }
        }
    }

    function applyMusicSetting(enabled) {
        const mediaPlayer = document.getElementById('media-player');
        if (mediaPlayer) {
            if (enabled) {
                mediaPlayer.style.display = 'block';
            } else {
                mediaPlayer.style.display = 'none';
                // Also pause any playing music
                const audio = document.getElementById('bg-music');
                if (audio) {
                    audio.pause();
                }
            }
        }
    }

    function applyAnimationSpeed(speed) {
        document.documentElement.style.setProperty('--animation-speed', 
            speed === 'slow' ? '1.5' : speed === 'fast' ? '0.5' : '1'
        );
    }

    function applyGlassIntensity(intensity) {
        document.documentElement.style.setProperty('--glass-intensity', intensity);
    }

    function resetToDefaults() {
        // Clear localStorage
        localStorage.removeItem('backgroundRotation');
        localStorage.removeItem('backgroundSlideshow');
        localStorage.removeItem('backgroundMusic');
        localStorage.removeItem('animationSpeed');
        localStorage.removeItem('glassIntensity');
        
        // Reset to defaults
        updateToggleState(rotationToggle, true);
        updateToggleState(slideshowToggle, true); // Default to enabled
        updateToggleState(musicToggle, true); // Default to enabled
        animationSpeed.value = 'normal';
        glassIntensity.value = '2';
        
        // Apply defaults
        applyRotationSetting(true);
        applySlideshowSetting(true); // Default to enabled
        applyMusicSetting(true); // Default to enabled
        applyAnimationSpeed('normal');
        applyGlassIntensity('2');
    }

    // Close modal event handlers
    closeBtn.addEventListener('click', closeModal);
    closeBtnFooter.addEventListener('click', closeModal);

    // Close modal on backdrop click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    // Expose openModal function globally for external access
    window.openSettingsMenu = openModal;
}

// Initialize on DOM ready and expose for SPA
document.addEventListener('DOMContentLoaded', function() {
    console.log('Settings menu script loaded - calling initSettingsMenu');
    initSettingsMenu();
});

// Expose for SPA reinitialization
if (typeof window !== 'undefined') {
    window.initSettingsMenu = initSettingsMenu;
}
