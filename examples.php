<?php
/**
 * Examples Page - Coding Examples
 */

// Load environment and database configuration
require_once 'config/database.php';

// Page configuration
$pageTitle = 'Mark Peters - Coding Examples | Portfolio';
$pageDescription = 'Mark Peters - Coding Examples showcasing modern responsive design techniques, JavaScript implementations, and best practices.';
$pageUrl = 'https://mark-peters.dev/examples';
$pageKeywords = 'coding examples, responsive design, JavaScript, CSS Grid, async await, portfolio examples';
$currentPage = 'examples';
$includeStructuredData = false;
$includeAudioPlayer = true;
$includeSpaLoader = false;

// Examples page specific scripts
$additionalScripts = [
    'js/media-player.js'
];
?>
<?php include 'includes/html-start.php'; ?>

    <!-- SIDEBAR -->
<?php include 'includes/sidebar.php'; ?>

    <!-- ======================= -->
    <!-- Main Content -->
    <main id="main-content">
        <!-- Examples Header -->
        <div class="content-wrapper">
          <div class="examples-header">
            <h1>Coding Examples</h1>
            <p>Here are some real coding examples from this portfolio website that showcase modern responsive design techniques and best practices.</p>
          </div>
        </div>

        <!-- Examples Content -->
        <div class="content-wrapper">
          <div class="examples-grid">
            <div class="examples-list">
                    <article class="example-item">
                        <h4>Example 1: Responsive Portfolio Grid</h4>
                        <p>This portfolio grid demonstrates modern responsive design using CSS Grid with automatic column adjustments based on screen size.</p>
                        
                        <div class="code-block">
                            <h5>SCSS Code:</h5>
                            <pre><code>.portfolio-grid {
  display: grid;
  grid-template-columns: 1fr; // 1 column by default
  gap: 30px;
  padding: 20px;
  box-sizing: border-box;
  justify-items: center;

  // Responsive Breakpoints
  @media (min-width: $brk-point-sm) {
    grid-template-columns: 1fr 1fr; // 2 columns on small screens
    max-width: 1260px;
    margin-left: auto;
    margin-right: auto;
  }

  @media (min-width: $brk-point-lg) {
    margin: 0 auto;
    grid-template-columns: 1fr 1fr 1fr; 
    // 3 columns on large screens
  }
}</code></pre>
                        </div>
                        
              <p><strong>Technologies Used:</strong></p>
              <ul>
                <li>Sass (SCSS) with responsive breakpoint variables</li>
                <li>CSS Grid for fluid, column-based layouts</li>
                <li>Max-width container to keep content centered</li>
              </ul>
                        
                        <p><strong>Key Features:</strong></p>
                        <ul>
                            <li>Mobile-first approach (1 column by default)</li>
                            <li>Progressive enhancement for larger screens</li>
                            <li>Automatic spacing with CSS Grid gap</li>
                            <li>Responsive container with max-width constraint</li>
                        </ul>

              <p><strong>Outcomes:</strong></p>
              <ul>
                <li>Consistent card sizing and spacing across breakpoints</li>
                <li>Predictable gutters and alignment in a 1200px container</li>
                <li>No JavaScript needed for layout responsiveness</li>
              </ul>
                    </article>
                    
                    <article class="example-item">
                        <h4>Example 2: Async Random Photo Generator</h4>
                        <p>Modern JavaScript implementation using async/await to fetch random photos from an API, with proper error handling and DOM manipulation.</p>
                        
                        <div class="code-block">
                            <h5>JavaScript Code:</h5>
                            <pre><code>// Random Photo Generator
async function setRandomPhoto() {
  const randomBtn = document.getElementById('button-random');
  const img = document.querySelector('.primary-container img');
  const imageNameElement = document.getElementById('imagename');
  
  if (!randomBtn || !img) return;

  randomBtn.textContent = 'Loading...';

  try {
    // Fetch random photo data
    const page = Math.floor(Math.random() * 10) + 1;
    const response = await fetch
    (`https://picsum.photos/v2/list?page=${
    page}&limit=30`);
    const photos = await response.json();

    if (!Array.isArray(photos) || photos.length === 0) {
      throw new Error('No photos available');
    }

    // Select random photo
    const photo = photos[Math.floor(Math.random() 
    * photos.length)];
    
    // Update image with loading handlers
    img.onload = () => {
      randomBtn.textContent = 'Random Photo';
      window.checkAddButtonState?.();
    };
    
    img.onerror = () => {
      randomBtn.textContent = 'Random Photo';
      console.error('Failed to load image');
    };

    // Set new image
    img.src = `https://picsum.photos/id/${photo.id}/800/600`;
    img.setAttribute('data-picsum-id', photo.id);
    
    // Update photo credit
    if (imageNameElement) {
      imageNameElement.textContent = `Photo by ${photo.author}`;
    }

  } catch (error) {
    console.error('Error fetching photo:', error);
    randomBtn.textContent = 'Random Photo';
  }
}</code></pre>
                        </div>
                        
              <p><strong>Technologies Used:</strong></p>
              <ul>
                <li>Modern JavaScript (ES6+), async/await</li>
                <li>Fetch API for HTTP requests</li>
                <li>DOM APIs with optional chaining for safety</li>
              </ul>
                        
                        <p><strong>Key JavaScript Features:</strong></p>
                        <ul>
                            <li>Async/await for clean asynchronous code handling</li>
                            <li>Fetch API for modern HTTP requests</li>
                            <li>Comprehensive error handling with try/catch blocks</li>
                            <li>DOM manipulation with proper element validation</li>
                            <li>Event listeners and dynamic content updates</li>
                            <li>Optional chaining for safe method calls</li>
                        </ul>

              <p><strong>Outcomes:</strong></p>
              <ul>
                <li>Smoother UX with a clear loading state</li>
                <li>Resilient behavior on network/image errors</li>
                <li>Dynamic image and credit updates without page reloads</li>
              </ul>
                    </article>
                    
                    <article class="example-item">
                        <h4>Example 3: Responsive Contact Form Layout</h4>
                        <p>A contact form that adapts its layout using CSS Grid, transitioning from single-column on mobile to multi-column on larger screens.</p>
                        
                        <div class="code-block">
                            <h5>SCSS Code:</h5>
                            <pre><code>.contact-form-grid {
  display: grid;
  grid-template-columns: 1fr; // Single column by default
  row-gap: 10px;
  
  // Form field positioning
  .first-name { grid-column: 1; grid-row: 1; }
  .last-name { grid-column: 1; grid-row: 2; }
  .email { grid-column: 1; grid-row: 3; }
  
  // Responsive: Two columns on medium screens
  @media (min-width: 576px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 10px;
    
    .name-row { display: contents; }
    .first-name { grid-column: 1; grid-row: 1; }
    .last-name { grid-column: 2; grid-row: 1; }
    .email { grid-column: 1 / span 2; grid-row: 2; }
  }
}</code></pre>
                        </div>
                        
              <p><strong>Technologies Used:</strong></p>
              <ul>
                <li>CSS Grid with responsive media queries</li>
                <li>Progressive enhancement from single to two columns</li>
                <li>Semantic class structure for maintainability</li>
              </ul>
                        
                        <p><strong>Responsive Features:</strong></p>
                        <ul>
                            <li>Grid layout automatically adjusts form structure</li>
                            <li>Name fields side-by-side on larger screens</li>
                            <li>Full-width fields span multiple columns when needed</li>
                            <li>Consistent spacing maintained across breakpoints</li>
                        </ul>

              <p><strong>Outcomes:</strong></p>
              <ul>
                <li>Stable layout with no validation-induced shifting</li>
                <li>Improved readability and form flow on larger screens</li>
                <li>Easier to extend with additional fields and rows</li>
              </ul>
                    </article>
                    
                    <article class="example-item">
                        <h4>Example 4: Advanced Query Builder with Dynamic Filtering & Sorting</h4>
                        <p>Complex search, filter, and sort implementation in a Laravel EmployeeController demonstrating advanced Eloquent query building with relationship handling.</p>
                        
                        <div class="code-block">
                            <h5>PHP/Laravel Code:</h5>
                            <pre><code>public function index(Request $request)
{
    $query = Employee::with(['company', 'user']);
    
    // Multi-field search with relationship queries
    if ($request->has('search') && $request->search != '') {
        $search = $request->search;
        $query->where(function($q) use ($search) {
            $q->where('first_name', 'like', "%{$search}%")
              ->orWhere('last_name', 'like', "%{$search}%")
              ->orWhere('email', 'like', "%{$search}%")
              ->orWhere('phone', 'like', "%{$search}%")
              ->orWhereHas('company', function($q) use ($search) {
                  $q->where('name', 'like', "%{$search}%");
              });
        });
    }
    
    // Dynamic sorting with relationship handling
    if ($sortField === 'company_id') {
        $query->leftJoin('companies', 'employees.company_id', '=', 'companies.id')
              ->orderBy('companies.name', $sortDirection)
              ->select('employees.*');
    } else {
        $query->orderBy($sortField, $sortDirection);
    }
    
    $employees = $query->paginate(10)->appends($request->query());
}</code></pre>
                        </div>
                        
              <p><strong>Technologies Used:</strong></p>
              <ul>
                <li>PHP 8+, Laravel Eloquent ORM</li>
                <li>Eager loading, relationship queries, and joins</li>
                <li>Pagination with query-string preservation</li>
              </ul>
                        
                        <p><strong>Key Laravel Features:</strong></p>
                        <ul>
                            <li>Eager loading relationships with <code>with()</code> to prevent N+1 queries</li>
                            <li>Dynamic multi-field search using query scopes and closures</li>
                            <li>Relationship querying with <code>orWhereHas()</code> for nested searches</li>
                            <li>Complex join operations for sorting by related model attributes</li>
                            <li>Pagination with query string preservation</li>
                            <li>Conditional query building based on request parameters</li>
                        </ul>

              <p><strong>Outcomes:</strong></p>
              <ul>
                <li>Reduced database load and fewer queries via eager loading</li>
                <li>Accurate sorting by related entities without denormalization</li>
                <li>Flexible, maintainable query logic suitable for admin UIs</li>
              </ul>
                    </article>
                </div>
            </div>
        </div>
        
        <?php include 'includes/footer.php'; ?>
    </main>

    <?php include 'includes/scripts.php'; ?>

</body>
</html>