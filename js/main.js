// Mobile hamburger menu controls
    const burger = document.querySelector('.burger');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    function closeSidebar() {
      console.log('Closing sidebar...');
      sidebar.classList.remove('sidebar--open');
      burger.classList.remove('active');
      overlay.classList.remove('sidebar-overlay--active');
      burger.setAttribute('aria-expanded', 'false');
    }

    burger.addEventListener('click', function () {
      const isOpen = sidebar.classList.toggle('sidebar--open');
      burger.classList.toggle('active');
      overlay.classList.toggle('sidebar-overlay--active', isOpen);
      burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    overlay.addEventListener('click', function(e) {
      console.log('Overlay clicked - closing sidebar');
      closeSidebar();
    });

    // Close sidebar with ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeSidebar();
    });

    // Auto-close sidebar when navigation links are clicked
    document.addEventListener('click', function(e) {
      // Check if clicked element is a navigation link inside the sidebar
      if (e.target.matches('.sidebar nav a, .sidebar .spa-nav')) {
        closeSidebar();
      }
    });