<?php
/**
 * Contact Form Processing Endpoint
 * Handles POST requests for contact form submissions
 */

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed. Only POST requests are accepted.'
    ]);
    exit;
}

// Load environment and dependencies
require_once 'config/database.php';
require_once 'includes/contact-handler.php';

// Set JSON response header
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

try {
    // Check if this is an AJAX request or form submission
    $isAjax = !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && 
              strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';
    
    // Process the contact form
    $handler = new ContactFormHandler();
    $result = $handler->processForm();
    
    if ($isAjax) {
        // Return JSON response for AJAX requests
        echo json_encode($result);
    } else {
        // Handle regular form submission - redirect back with message
        session_start();
        
        if ($result['success']) {
            $_SESSION['contact_message'] = $result['message'];
            $_SESSION['contact_type'] = 'success';
        } else {
            $_SESSION['contact_message'] = $result['message'];
            $_SESSION['contact_type'] = 'error';
            $_SESSION['contact_errors'] = $result['errors'] ?? [];
            $_SESSION['contact_data'] = $handler->getFormData();
        }
        
        // Redirect back to the contact section
        $redirect = $_SERVER['HTTP_REFERER'] ?? 'index.php';
        if (strpos($redirect, '#') === false) {
            $redirect .= '#contact';
        }
        header("Location: $redirect");
        exit;
    }
    
} catch (Exception $e) {
    error_log('Contact form processing error: ' . $e->getMessage());
    
    $errorResponse = [
        'success' => false,
        'message' => 'An unexpected error occurred. Please try again later.',
        'errors' => ['system' => 'Server error']
    ];
    
    if ($isAjax ?? false) {
        echo json_encode($errorResponse);
    } else {
        session_start();
        $_SESSION['contact_message'] = $errorResponse['message'];
        $_SESSION['contact_type'] = 'error';
        header('Location: index.php#contact');
        exit;
    }
}
?>