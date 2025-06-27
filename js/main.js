    // Mobile hamburger menu controls
    const burger = document.querySelector('.burger');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    function closeSidebar() {
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

    overlay.addEventListener('click', closeSidebar);

    // Close sidebar with ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeSidebar();
    });