(function() {
    'use strict';
    
    function initMediaPlayer() {
        const mediaPlayer = document.getElementById('media-player');
        const playPauseBtn = document.getElementById('play-pause');
        const playIcon = document.getElementById('play-icon');
        const prevBtn = document.getElementById('prev-track');
        const nextBtn = document.getElementById('next-track');
        const trackTitle = document.getElementById('track-title');
        const volumeBtn = document.getElementById('volume-toggle');
        const volumeIcon = document.getElementById('volume-icon');
        const volumeSlider = document.getElementById('volume-slider');
        const audioPlayer = document.getElementById('bg-music');
        
        if (!mediaPlayer || !audioPlayer) return;
        
        // Track list
        const tracks = [
            { title: 'Ambient Track 1', src: './audio/chance.wav' },
            { title: 'Ambient Track 2', src: './audio/glorious.wav' },
            { title: 'Ambient Track 3', src: './audio/lord.wav' }
        ];
        
        let currentTrackIndex = 0;
        let isPlaying = false;
        let isMuted = false;
        
        // Initialize
        function init() {
            updateTrackInfo();
            updatePlayState();
            updateVolumeState();
        }
        
        // Update track info display
        function updateTrackInfo() {
            // Extract filename from src path and clean it up
            const filename = tracks[currentTrackIndex].src.split('/').pop(); // Get filename
            const nameWithoutExtension = filename.replace(/\.(wav|mp3|ogg|m4a)$/i, ''); // Remove extension
            const cleanTitle = nameWithoutExtension.replace(/_/g, ' '); // Replace underscores with spaces
            
            trackTitle.textContent = cleanTitle;
            audioPlayer.src = tracks[currentTrackIndex].src;
        }
        
        // Update play/pause state
        function updatePlayState() {
            if (isPlaying) {
                playIcon.className = 'icon-pause2';
                playPauseBtn.classList.add('playing');
                mediaPlayer.classList.add('playing');
                playPauseBtn.setAttribute('aria-label', 'Pause');
            } else {
                playIcon.className = 'icon-play3';
                playPauseBtn.classList.remove('playing');
                mediaPlayer.classList.remove('playing');
                playPauseBtn.setAttribute('aria-label', 'Play');
            }
        }
        
        // Update volume state
        function updateVolumeState() {
            const volume = audioPlayer.volume;
            
            if (isMuted || volume === 0) {
                volumeIcon.className = 'icon-volume_off';
                volumeBtn.classList.add('muted');
                volumeBtn.setAttribute('aria-label', 'Unmute');
            } else if (volume < 0.5) {
                volumeIcon.className = 'icon-volume_down';
                volumeBtn.classList.remove('muted');
                volumeBtn.setAttribute('aria-label', 'Mute');
            } else {
                volumeIcon.className = 'icon-volume_up';
                volumeBtn.classList.remove('muted');
                volumeBtn.setAttribute('aria-label', 'Mute');
            }
            
            // Update slider value
            volumeSlider.value = Math.round(volume * 100);
        }
        
        // Play/Pause functionality
        playPauseBtn.addEventListener('click', function() {
            if (isPlaying) {
                audioPlayer.pause();
                isPlaying = false;
            } else {
                audioPlayer.play().catch(e => console.log('Playback failed:', e));
                isPlaying = true;
            }
            updatePlayState();
        });
        
        // Previous track
        prevBtn.addEventListener('click', function() {
            currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
            updateTrackInfo();
            if (isPlaying) {
                audioPlayer.play().catch(e => console.log('Playback failed:', e));
            }
        });
        
        // Next track
        nextBtn.addEventListener('click', function() {
            currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
            updateTrackInfo();
            if (isPlaying) {
                audioPlayer.play().catch(e => console.log('Playback failed:', e));
            }
        });
        
        // Volume toggle
        volumeBtn.addEventListener('click', function() {
            if (isMuted || audioPlayer.volume === 0) {
                audioPlayer.volume = 0.5;
                isMuted = false;
            } else {
                audioPlayer.volume = 0;
                isMuted = true;
            }
            updateVolumeState();
        });
        
        // Volume slider
        volumeSlider.addEventListener('input', function() {
            const volume = this.value / 100;
            audioPlayer.volume = volume;
            isMuted = volume === 0;
            updateVolumeState();
        });
        
        // Audio events
        audioPlayer.addEventListener('ended', function() {
            // Auto-play next track
            currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
            updateTrackInfo();
            audioPlayer.play().catch(e => console.log('Playback failed:', e));
        });
        
        audioPlayer.addEventListener('pause', function() {
            isPlaying = false;
            updatePlayState();
        });
        
        audioPlayer.addEventListener('play', function() {
            isPlaying = true;
            updatePlayState();
        });
        
        // Initialize the player
        init();
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMediaPlayer);
    } else {
        initMediaPlayer();
    }
})();
