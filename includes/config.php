<?php
/**
 * Site Configuration
 * Common settings and constants for the portfolio site
 */

// Site Information
define('SITE_NAME', 'Mark Peters Portfolio');
define('SITE_URL', 'https://mark-peters.dev');
define('SITE_AUTHOR', 'Mark Peters');
define('SITE_EMAIL', 'mark@example.com');

// Default Meta Information
define('DEFAULT_TITLE', 'Mark Peters - Creative Front-End Web Developer | Portfolio');
define('DEFAULT_DESCRIPTION', 'Mark Peters - Creative Front-End Web Developer specializing in HTML, CSS, Sass, and JavaScript. Building clean, responsive websites with modern design.');
define('DEFAULT_KEYWORDS', 'web developer, front-end developer, HTML, CSS, Sass, JavaScript, responsive design, portfolio');

// Social Media Links
define('LINKEDIN_URL', 'https://www.linkedin.com/in/mark-alex-peters/');
define('GITHUB_URL', 'https://github.com/markap85');
define('FACEBOOK_URL', 'https://www.facebook.com/markpeters85');

// Development Settings
define('DEBUG_MODE', $_ENV['APP_DEBUG'] ?? true);
define('APP_ENV', $_ENV['APP_ENV'] ?? 'development');

// File Paths
define('INCLUDES_PATH', __DIR__ . '/includes/');
define('CONTENT_PATH', __DIR__ . '/content/');
define('ASSETS_PATH', __DIR__ . '/');

/**
 * Helper function to get the current page from URL
 */
function getCurrentPage() {
    $page = basename($_SERVER['PHP_SELF'], '.php');
    return $page === 'index' ? 'home' : $page;
}

/**
 * Helper function to check if current page is active
 */
function isCurrentPage($page) {
    return getCurrentPage() === $page;
}

/**
 * Helper function to generate page URL
 */
function getPageUrl($page = '') {
    $baseUrl = SITE_URL;
    return $page ? $baseUrl . '/' . $page : $baseUrl;
}

/**
 * Helper function to load environment variables safely
 */
function getSiteEnv($key, $default = null) {
    return $_ENV[$key] ?? $default;
}