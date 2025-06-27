document.addEventListener('DOMContentLoaded', function() {
    // Prevent duplicate filter buttons
    if (document.querySelector('.filter-buttons')) {
        return;
    }

    // Create portfolio filter buttons
    const filterButtons = `
        <div class="filter-buttons">
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="refactor">Refactor</button>
            <button class="filter-btn" data-filter="frontend">Frontend</button>
            <button class="filter-btn" data-filter="backend">Backend</button>
        </div>
    `;

    // Add filter buttons to portfolio section
    const portfolioSection = document.querySelector('#portfolio-section');
    if (portfolioSection) {
        portfolioSection.insertAdjacentHTML('afterbegin', filterButtons);

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
                
                // Show/hide projects based on filter
                document.querySelectorAll('.project').forEach(project => {
                    let shouldShow = false;
                    
                    // Check if project matches the selected filter
                    if (filter === 'all') {
                        shouldShow = true;
                    } else {
                        // Look for matching tag in project
                        shouldShow = project.querySelector('.tag-' + filter) !== null;
                    }
                    
                    // Also check if CSS rules allow this project to show on current screen
                    if (shouldShow) {
                        // Reset display to check CSS visibility
                        const originalDisplay = project.style.display;
                        project.style.display = '';
                        
                        // See if CSS media queries hide this element
                        const isVisibleByCSS = isVisibleOnCurrentScreen(project);
                        
                        // Put back original display value
                        project.style.display = originalDisplay;
                        
                        // Show project with animation if both filter and CSS allow it
                        if (isVisibleByCSS) {
                            project.style.display = 'block';
                            project.style.opacity = '0';
                            project.style.transform = 'translateY(20px)';
                            
                            // Animate project into view
                            setTimeout(() => {
                                project.style.opacity = '1';
                                project.style.transform = 'translateY(0)';
                            }, 100);
                        } else {
                            // Hide projects that CSS rules exclude on current screen
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

        // Reapply filters when screen size changes
        window.addEventListener('resize', () => {
            const activeFilter = document.querySelector('.filter-btn.active');
            if (activeFilter) {
                // Run the current filter again for new screen size
                activeFilter.click();
            }
        });
    }
});