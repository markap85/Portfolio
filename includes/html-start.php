<?php
/**
 * HTML Structure Partial - Common HTML opening elements
 */
?>
<!DOCTYPE html>
<html lang="en">

<?php include __DIR__ . '/head.php'; ?>

<body>
    <!-- Accessibility Skip Link -->
    <a href="#main-content" class="skip-link">Skip to main content</a>

    

    <?php if (isset($includeAudioPlayer) && $includeAudioPlayer): ?>
    <!-- =======================
    AUDIO PLAYER
    ======================= -->
    <audio id="bg-music" loop preload="none">
        <source src="audio/chance.wav" type="audio/wav">
        Your browser does not support the audio element.
    </audio>
    <?php endif; ?>