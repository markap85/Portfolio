<?php
/**
 * Error Handler Partial
 * 
 * @param int $errorCode - HTTP error code (404, 500, etc.)
 * @param string $errorMessage - Error message to display
 */

$errorCode = $errorCode ?? 404;
$errorMessage = $errorMessage ?? 'Page not found';
?>

<div class="content-wrapper">
    <div class="error-page">
        <div class="error-container">
            <h1 class="error-code"><?php echo $errorCode; ?></h1>
            <h2 class="error-title">
                <?php 
                switch($errorCode) {
                    case 404:
                        echo 'Page Not Found';
                        break;
                    case 500:
                        echo 'Server Error';
                        break;
                    default:
                        echo 'Error';
                }
                ?>
            </h2>
            <p class="error-message"><?php echo htmlspecialchars($errorMessage); ?></p>
            
            <div class="error-actions">
                <a href="index.php" class="btn btn-primary">Go Home</a>
                <a href="javascript:history.back()" class="btn btn-secondary">Go Back</a>
            </div>
        </div>
    </div>
</div>