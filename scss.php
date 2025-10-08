<?php
/**
 * SCSS Page - SCSS Scheme Documentation
 */

// Load environment and database configuration
require_once 'config/database.php';

// Page configuration
$pageTitle = 'Mark Peters - SCSS Scheme | Portfolio';
$pageDescription = 'Mark Peters - SCSS Scheme Documentation showcasing the architectural structure and design system used in this portfolio.';
$pageUrl = 'https://mark-peters.dev/scss';
$pageKeywords = 'SCSS, Sass, CSS architecture, design system, stylesheet organization, web development';
$currentPage = 'scss';
$includeStructuredData = false;
$includeAudioPlayer = false;
$includeSpaLoader = false;
?>
<?php include 'includes/html-start.php'; ?>

    <!-- SIDEBAR -->
<?php include 'includes/sidebar.php'; ?>

    <!-- ======================= -->
    <!-- Main Content -->
    <main id="main-content">
        <!-- SCSS Header -->
        <div class="scss-header">
            <h1>SCSS Training & Development</h1>
            <p>My journey through web development training, showcasing the programs and resources that have shaped my skills in SCSS and modern web technologies.</p>
        </div>
        
        <!-- SCSS Content -->
        <div class="content-wrapper">
            <div class="scss-info-grid">
                <div class="info-block">
                    <img src="img/WebSitePlaceHolder_1.webp" alt="Scion Coalition Scheme Logo" class="info-img">
                    <div>
                        <h3>Introduction to Scion Coalition Scheme</h3>
                        <p>
                            The Scion Coalition Scheme is an intensive, specially tailored training program run by Netmatters in order to give willing candidates the opportunity to enter the industry as web developers. Under the supervision of senior web developers, scions generally aim to complete training within six to nine months. The course is intensive and therefore the level of learning achieved is extensive in a short space of time.
                        </p>
                        <a class="button" href="https://www.netmatters.co.uk/train-for-a-career-in-tech" target="_blank" rel="noopener">Learn More</a>
                    </div>
                </div>

                <div class="info-block">
                    <img src="img/WebSitePlaceHolder_2.webp" alt="Treehouse Logo" class="info-img">
                    <div>
                        <h3>Treehouse</h3>
                        <p>
                            Treehouse is an online learning community, featuring videos covering a number of topics from basic HTML to C# programming, iOS development, data analysis, and more. By completing courses users can earn points, allowing them to track their progress and see how much they've covered in certain areas.
                        </p>
                        <p><strong>Total Score</strong><br>
                        <a href="https://teamtreehouse.com/profiles/markpeters4" target="_blank" rel="noopener">6033</a>
                        </p>
                        <a class="button" href="https://teamtreehouse.com/" target="_blank" rel="noopener">Learn More</a>
                    </div>
                </div>

                <div class="info-block">
                    <img src="img/WebSitePlaceHolder_3.webp" alt="Netmatters Logo" class="info-img">
                    <div>
                        <h3>About Netmatters</h3>
                        <ul>
                            <li>Established in 2008</li>
                            <li>Norfolk's leading technology company</li>
                            <li>Winner of the Princess Royal Training Award</li>
                            <li>Winner of EDP Skills of Tomorrow Award</li>
                            <li>80+ staff, 2 locations across Norfolk</li>
                            <li>Digital Marketing, Website &amp; Software development &amp; IT Support</li>
                            <li>Broad spectrum of clients, working nationwide</li>
                            <li>Operate to strict company values</li>
                        </ul>
                        <a class="button" href="https://www.netmatters.co.uk/" target="_blank" rel="noopener">Learn More</a>
                    </div>
                </div>
            </div>
        </div>
        
        <?php include 'includes/footer.php'; ?>
    </main>

    <?php include 'includes/scripts.php'; ?>

</body>
</html>