<?php
/**
 * Head Partial - Common <head> section for all pages
 * 
 * @param string $pageTitle - The page title
 * @param string $pageDescription - The page description
 * @param string $pageUrl - The page URL for og:url
 * @param string $pageKeywords - Additional keywords (optional)
 */

// Load configuration
require_once __DIR__ . '/config.php';

// Set default values if not provided
$pageTitle = $pageTitle ?? DEFAULT_TITLE;
$pageDescription = $pageDescription ?? DEFAULT_DESCRIPTION;
$pageUrl = $pageUrl ?? SITE_URL;
$pageKeywords = $pageKeywords ?? DEFAULT_KEYWORDS;
?>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <!-- SEO Meta Tags -->
    <meta name="description" content="<?php echo htmlspecialchars($pageDescription); ?>">
    <meta name="keywords" content="<?php echo htmlspecialchars($pageKeywords); ?>">
    <meta name="author" content="Mark Peters">
    <meta name="robots" content="index, follow">
    
    <!-- Open Graph Meta Tags for Social Media -->
    <meta property="og:title" content="<?php echo htmlspecialchars($pageTitle); ?>">
    <meta property="og:description" content="<?php echo htmlspecialchars($pageDescription); ?>">
    <meta property="og:image" content="img/MeImage.webp">
    <meta property="og:url" content="<?php echo htmlspecialchars($pageUrl); ?>">
    <meta property="og:type" content="website">
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?php echo htmlspecialchars($pageTitle); ?>">
    <meta name="twitter:description" content="<?php echo htmlspecialchars($pageDescription); ?>">
    <meta name="twitter:image" content="img/MeImage.webp">
    
    <!-- Performance Optimizations -->
    <link rel="preconnect" href="https://api.web3forms.com">
    <link rel="dns-prefetch" href="https://www.linkedin.com">
    <link rel="dns-prefetch" href="https://github.com">
    <link rel="dns-prefetch" href="https://www.facebook.com">
    
    <!-- Favicon -->
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    
    <!-- Stylesheet -->
    <link rel="stylesheet" href="css/styles.css">
    
    <!-- Page Title -->
    <title><?php echo htmlspecialchars($pageTitle); ?></title>
    
    <?php if (isset($includeStructuredData) && $includeStructuredData): ?>
    <!-- Structured Data for SEO -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Mark Peters",
      "jobTitle": "Front-End Web Developer",
      "description": "Creative Front-End Web Developer specializing in HTML, CSS, Sass, and JavaScript. Building clean, responsive websites with modern design.",
      "url": "https://mark-peters.dev",
      "image": "img/MeImage.webp",
      "sameAs": [
        "https://www.linkedin.com/in/mark-alex-peters/",
        "https://github.com/markap85",
        "https://www.facebook.com/markpeters85"
      ],
      "knowsAbout": ["HTML5", "CSS3", "Sass", "JavaScript", "jQuery", "PHP", "Laravel", "PostgreSQL", "Responsive Design", "Web Development"],
      "memberOf": {
        "@type": "Organization",
        "name": "BAFTA",
        "url": "https://www.bafta.org/"
      }
    }
    </script>
    <?php endif; ?>
</head>