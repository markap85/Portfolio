// Skill modals initialization function for SPA
function initSkillModals() {
    console.log('Initializing skill modals...');
    
    // Remove any existing modal to prevent duplicates
    const existingModal = document.querySelector('#skill-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Skill information data
    const skillInfo = {
        'icon-html-five': {
            name: 'HTML5',
            description: 'Markup language for creating web pages and web applications with semantic elements and modern features.'
        },
        'icon-css3': {
            name: 'CSS3',
            description: 'Style sheet language for designing and laying out web pages with advanced features like animations and grid layouts.'
        },
        'icon-sass': {
            name: 'Sass/SCSS',
            description: 'CSS preprocessor that adds features like variables, nesting, and mixins to CSS.'
        },
        'icon-javascript': {
            name: 'JavaScript',
            description: 'Programming language that enables interactive web pages and dynamic user experiences.'
        },
        'icon-jquery': {
            name: 'jQuery',
            description: 'JavaScript library that simplifies HTML document manipulation and event handling.'
        },
        'icon-postgresql': {
            name: 'PostgreSQL',
            description: 'Advanced open-source relational database system (learning in progress).'
        },
        'icon-php': {
            name: 'PHP',
            description: 'Server-side scripting language for dynamic web development (learning in progress).'
        }
    };

    // Create modal HTML
    const modalHTML = `
        <div id="skill-modal" class="skill-modal" style="display: none;">
            <div class="skill-modal-content">
                <span class="skill-modal-close">&times;</span>
                <h3 id="skill-name"></h3>
                <p id="skill-description"></p>
            </div>
        </div>
    `;

    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Get modal elements
    const modal = document.querySelector('#skill-modal');
    const modalContent = modal.querySelector('.skill-modal-content');
    const closeBtn = modal.querySelector('.skill-modal-close');
    const skillName = modal.querySelector('#skill-name');
    const skillDescription = modal.querySelector('#skill-description');

    // Find all skill icons
    const skillIcons = document.querySelectorAll('.about-me-icons [class^="icon-"]');
    console.log('Found skill icons:', skillIcons.length);

    // Add click handlers to skill icons
    skillIcons.forEach(icon => {
        icon.style.cursor = 'pointer';
        
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Icon clicked:', this);
            
            // Get the icon class name
            const iconClass = Array.from(this.classList).find(cls => cls.startsWith('icon-'));
            console.log('Icon class:', iconClass);
            const skill = skillInfo[iconClass];
            console.log('Skill info:', skill);
            
            if (skill) {
                // Update modal content
                skillName.textContent = skill.name;
                skillDescription.textContent = skill.description;
                
                // Show modal with animation
                modal.style.display = 'block';
                modalContent.style.transition = 'all 0.3s ease';
                modalContent.style.transform = 'translate(-50%, -50%) scale(0.8)';
                modalContent.style.opacity = '0';
                
                // Trigger animation
                setTimeout(() => {
                    modalContent.style.transform = 'translate(-50%, -50%) scale(1)';
                    modalContent.style.opacity = '1';
                }, 10);
            } else {
                console.warn('No skill info found for:', iconClass);
            }
        });
    });

    function closeModal() {
        modalContent.style.transform = 'translate(-50%, -50%) scale(0.8)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            modal.style.display = 'none';
            modalContent.style.transition = '';
        }, 300);
    }

    // Close modal on X click
    closeBtn.addEventListener('click', closeModal);

    // Close modal on backdrop click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Skill modals script loaded - calling initSkillModals');
    initSkillModals();
});
