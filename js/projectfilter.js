document.addEventListener('DOMContentLoaded', function() {
    // Add filter buttons to your portfolio section
    const filterButtons = `
        <div class="filter-buttons">
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="responsive">Frontend</button>
            <button class="filter-btn" data-filter="backend">Backend</button>
            <button class="filter-btn" data-filter="design">Design</button>
        </div>
    `;

    const portfolioSection = document.querySelector('#portfolio');
    if (portfolioSection) {
        portfolioSection.insertAdjacentHTML('afterbegin', filterButtons);

        // Filter functionality
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                
                // Update active button
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter projects
                document.querySelectorAll('.project').forEach(project => {
                    const shouldShow = filter === 'all' || project.querySelector('.tag-' + filter);
                    
                    if (shouldShow) {
                        project.style.display = 'block';
                        project.style.opacity = '0';
                        project.style.transform = 'translateY(20px)';
                        
                        // Trigger animation
                        setTimeout(() => {
                            project.style.opacity = '1';
                            project.style.transform = 'translateY(0)';
                        }, 100);
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
    }
});