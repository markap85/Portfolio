document.addEventListener('DOMContentLoaded', function() {
    // Check if filter buttons already exist to prevent duplicates
    if (document.querySelector('.filter-buttons')) {
        return;
    }

    // Add filter buttons to your portfolio section
    const filterButtons = `
        <div class="filter-buttons">
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="refactor">Refactor</button>
            <button class="filter-btn" data-filter="frontend">Frontend</button>
            <button class="filter-btn" data-filter="backend">Backend</button>
        </div>
    `;

    // Target the correct portfolio section
    const portfolioSection = document.querySelector('#portfolio-section');
    if (portfolioSection) {
        portfolioSection.insertAdjacentHTML('afterbegin', filterButtons);

        // Helper function to check if an element should be visible on current screen size
        function isVisibleOnCurrentScreen(project) {
            const computedStyle = window.getComputedStyle(project);
            return computedStyle.display !== 'none' && computedStyle.visibility !== 'hidden';
        }

        // Filter functionality
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                
                // Update active button
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter projects
                document.querySelectorAll('.project').forEach(project => {
                    let shouldShow = false;
                    
                    // First check if the project should be visible based on filter
                    if (filter === 'all') {
                        shouldShow = true;
                    } else {
                        // Check if project has the matching tag class
                        shouldShow = project.querySelector('.tag-' + filter) !== null;
                    }
                    
                    // If it should show based on filter, also check if it's allowed to be visible on current screen
                    if (shouldShow) {
                        // Temporarily reset display to check CSS visibility rules
                        const originalDisplay = project.style.display;
                        project.style.display = '';
                        
                        // Check if CSS rules hide this element on current screen size
                        const isVisibleByCSS = isVisibleOnCurrentScreen(project);
                        
                        // Restore original display
                        project.style.display = originalDisplay;
                        
                        // Only show if both filter and CSS rules allow it
                        if (isVisibleByCSS) {
                            project.style.display = 'block';
                            project.style.opacity = '0';
                            project.style.transform = 'translateY(20px)';
                            
                            // Trigger animation
                            setTimeout(() => {
                                project.style.opacity = '1';
                                project.style.transform = 'translateY(0)';
                            }, 100);
                        } else {
                            // Hide items that are disabled by CSS on current screen size
                            project.style.display = 'none';
                        }
                    } else {
                        project.style.opacity = '0';
                        project.style.transform = 'translateY(-20px)';
                        
                        setTimeout(() => {
                            project.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // Re-run filter on window resize to handle responsive visibility changes
        window.addEventListener('resize', () => {
            const activeFilter = document.querySelector('.filter-btn.active');
            if (activeFilter) {
                // Trigger the active filter again to respect new screen size
                activeFilter.click();
            }
        });
    }
});