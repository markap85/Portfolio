document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bg-music");
  const toggle = document.getElementById("music-toggle");
  const clickSound = document.getElementById("click-sound");
  let isPlaying = false;
  let fadeInterval;
  let clickSoundEnabled = false;

  const fadeAudio = (targetVolume, duration) => {
    clearInterval(fadeInterval);
    const steps = 30;
    const stepTime = duration / steps;
    const volumeStep = (targetVolume - music.volume) / steps;

    fadeInterval = setInterval(() => {
      music.volume = Math.min(Math.max(0, music.volume + volumeStep), 1);
      if ((volumeStep > 0 && music.volume >= targetVolume) || 
          (volumeStep < 0 && music.volume <= targetVolume)) {
        music.volume = targetVolume;
        clearInterval(fadeInterval);
        if (targetVolume === 0) {
          music.pause();
          // iOS requires this to properly pause audio
          music.currentTime = 0;
          music.load();
        }
      }
    }, stepTime);
  };

  toggle.addEventListener("click", () => {
    if (isPlaying) {
      fadeAudio(0, 1000); // fade out over 1 second
      toggle.classList.add("paused");
      clickSoundEnabled = false;
    } else {
      music.volume = 0;
      music.play().then(() => fadeAudio(0.5, 1000));
      toggle.classList.remove("paused");
      clickSoundEnabled = true;
    }
    isPlaying = !isPlaying;
  });

  // Enable click sounds for navigation
  if (clickSound) {
    document.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        if (clickSoundEnabled) {
          clickSound.currentTime = 0;
          clickSound.play();
        }
      });
    });
  }

  // Start with music paused
  music.volume = 0;
  toggle.classList.add("paused");
});
