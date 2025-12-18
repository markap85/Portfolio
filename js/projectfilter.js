// Portfolio Filter Functionality
function initPortfolioFilter() {
    console.log('Portfolio filter initializing...');
    
    // Check if we're on a large screen (1024px+) before initializing
    if (window.innerWidth < 1024) {
        console.log('Screen too small for portfolio filter, skipping initialization');
        return;
    }
    
    // Remove any existing filter buttons first
    const existingFilters = document.querySelector('.filter-buttons');
    if (existingFilters) {
        existingFilters.remove();
    }

    // Check if portfolio section exists
    const portfolioSection = document.querySelector('#portfolio-section');
    if (!portfolioSection) {
        console.log('Portfolio section not found, skipping filter initialization');
        return;
    }

    console.log('Portfolio section found, creating filter buttons...');

    // Create portfolio filter buttons
    const filterButtons = `
        <div class="filter-buttons">
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="refactor">Refactor</button>
            <button class="filter-btn" data-filter="frontend">Frontend</button>
            <button class="filter-btn" data-filter="backend">Backend</button>
        </div>
    `;

    // Add filter buttons inside the section's content wrapper so they align with containers
    const portfolioWrapper = portfolioSection.querySelector('.content-wrapper') || portfolioSection;
    portfolioWrapper.insertAdjacentHTML('afterbegin', filterButtons);

    // Check if element is visible on current screen size
    function isVisibleOnCurrentScreen(project) {
        const computedStyle = window.getComputedStyle(project);
        return computedStyle.display !== 'none' && computedStyle.visibility !== 'hidden';
    }

    // Set up filter button functionality
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Highlight the active filter button
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const projects = document.querySelectorAll('.project');
            const portfolioGrid = document.querySelector('.portfolio-grid');
            
            // Step 1: Record current height and fade out ALL projects first
            const currentHeight = portfolioGrid.offsetHeight;
            portfolioGrid.style.height = currentHeight + 'px';
            portfolioGrid.style.transition = 'height 0.6s ease';
            
            projects.forEach(project => {
                project.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                project.style.opacity = '0';
                project.style.transform = 'scale(0.95) translateY(-10px)';
            });
            
            // Step 2: After fade out, determine which projects to show/hide
            setTimeout(() => {
                projects.forEach(project => {
                    let shouldShow = false;
                    
                    // Check if project matches the selected filter
                    if (filter === 'all') {
                        shouldShow = true;
                    } else {
                        shouldShow = project.querySelector('.tag-' + filter) !== null;
                    }
                    
                    // Also check if CSS rules allow this project to show on current screen
                    if (shouldShow) {
                        const originalDisplay = project.style.display;
                        project.style.display = '';
                        const isVisibleByCSS = isVisibleOnCurrentScreen(project);
                        project.style.display = originalDisplay;
                        
                        if (isVisibleByCSS) {
                            project.style.display = 'block';
                        } else {
                            project.style.display = 'none';
                        }
                    } else {
                        project.style.display = 'none';
                    }
                });
                
                // Step 3: After repositioning, measure new height and animate to it
                setTimeout(() => {
                    // Let the grid auto-size first
                    portfolioGrid.style.height = 'auto';
                    const newHeight = portfolioGrid.offsetHeight;
                    
                    // Set it back to current height and animate to new height
                    portfolioGrid.style.height = currentHeight + 'px';
                    
                    // Force reflow
                    portfolioGrid.offsetHeight;
                    
                    // Animate to new height
                    portfolioGrid.style.height = newHeight + 'px';
                    
                    // Fade in visible projects
                    projects.forEach(project => {
                        if (project.style.display !== 'none') {
                            project.style.opacity = '1';
                            project.style.transform = 'scale(1) translateY(0)';
                        }
                    });
                    
                    // Reset height to auto after animation completes
                    setTimeout(() => {
                        portfolioGrid.style.height = 'auto';
                    }, 600);
                    
                }, 100); // Small delay to allow grid repositioning
                
            }, 400); // Wait for fade out to complete
        });
    });

        // Reapply filters when screen size changes
        window.addEventListener('resize', () => {
            const activeFilter = document.querySelector('.filter-btn.active');
            if (activeFilter) {
                // Run the current filter again for new screen size
                activeFilter.click();
            }
        });

        // Initialize by showing all projects
        const allButton = document.querySelector('.filter-btn[data-filter="all"]');
        if (allButton) {
            // Trigger the "All" filter to show all projects on initial load
            allButton.click();
        }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', initPortfolioFilter);

// Make function available globally for SPA re-initialization
window.initPortfolioFilter = initPortfolioFilter;
