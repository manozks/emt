/**
 * header.js
 * Injects the site-wide header and navigation into any page.
 * Usage: <div id="site-header"></div>  (before closing </body>)
 * Or simply include this script — it auto-injects into #site-header if present,
 * otherwise prepends to <body>.
 */

(function () {
  const headerHTML = `
  <header>
    <nav class="navbar navbar-light blue-bg fixed-top">
      <div class="container-fluid d-flex justify-content-between">
        <a class="navbar-brand" href="index.html">
          <img src="images/logo.png" alt="E Multitech Solution Logo" height="42" loading="lazy">
        </a>

        <div class="right--bar">
          <div class="contact-info">
            <a href="https://wa.me/9779851038796" target="_blank" rel="noopener noreferrer">
              <i class="fa-brands fa-whatsapp"></i> +977 9851038796
            </a>
          </div>
          <button class="navbar-toggler" type="button" aria-label="Toggle navigation" onclick="toggleMenu()">
            <img src="images/nav-toggle-icon.png" alt="Toggle Menu" loading="lazy">
          </button>
        </div>
      </div>
    </nav>
  </header>

  <div class="menu-backdrop" id="menuBackdrop" onclick="closeMenu()"></div>
  <aside class="navbar-collapse" id="navbarMenu">
    <button class="menu-close" onclick="closeMenu()">&times;</button>
    <ul class="navbar-nav">
      <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
      <li class="nav-item"><a class="nav-link" href="about.html">About</a></li>
      <li class="nav-item">
        <a class="nav-link dropdown-toggle" id="servicesDropdown" onclick="toggleDropdown(this)">Services</a>
        <div class="dropdown-menu" id="servicesMenu">
        <a class="dropdown-item" href="custom-software-development.html">Software Development</a>
        <a class="dropdown-item" href="saas-development.html">SaaS Development</a> 
        <a class="dropdown-item" href="mobile-development.html">Mobile App Development</a>
          <a class="dropdown-item" href="ai-powered-solutions.html">AI Solutions</a>                             
          <a class="dropdown-item" href="devops-engineer.html">DevOps Engineer</a>
          <a class="dropdown-item" href="product-engineering.html">Product Engineering</a>
        </div>
      </li>
      <li class="nav-item"><a class="nav-link" href="case-studies.html">Case Studies</a></li>
      <li class="nav-item"><a class="nav-link" href="industries.html">Industries</a></li>
      <li class="nav-item"><a class="nav-link" href="works.html">Our Works</a></li>
      <li class="nav-item"><a class="nav-link" href="blog.html">Blog</a></li>
      <li class="nav-item"><a class="nav-link" href="testimonial-all.html">Testimonial</a></li>
      <li class="nav-item"><a class="nav-link" href="contact.html">Contact Us</a></li>
    </ul>
  </aside>
  `;

  // Inject into #site-header placeholder if it exists, otherwise prepend to body
  const placeholder = document.getElementById('site-header');
  if (placeholder) {
    placeholder.outerHTML = headerHTML;
  } else {
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
  }

  // Highlight the active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav .nav-link, .dropdown-item').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href === currentPage) {
      link.classList.add('active');
    }
  });
})();

/* ── Navigation behaviour ─────────────────────────────────── */

function toggleMenu() {
  const navbar   = document.querySelector('.navbar');
  const menu     = document.getElementById('navbarMenu');
  const backdrop = document.getElementById('menuBackdrop');

  const isOpen = menu.classList.contains('show');
  if (isOpen) {
    closeMenu();
  } else {
    menu.classList.add('show');
    backdrop.classList.add('show');
    navbar.classList.add('scrolled');
  }
}

function closeMenu() {
  const navbar   = document.querySelector('.navbar');
  const menu     = document.getElementById('navbarMenu');
  const backdrop = document.getElementById('menuBackdrop');

  menu.classList.remove('show');
  backdrop.classList.remove('show');
  if (window.scrollY < 50) {
    navbar.classList.remove('scrolled');
  }
}

function toggleDropdown(element) {
  const dropdownMenu = element.nextElementSibling;
  const isOpen = dropdownMenu.classList.contains('show');

  // Close all dropdowns first
  document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('show'));
  document.querySelectorAll('.dropdown-toggle').forEach(t => t.classList.remove('active'));

  // Open clicked dropdown if it was not already open
  if (!isOpen) {
    dropdownMenu.classList.add('show');
    element.classList.add('active');
  }
}

// Close menu on ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});

// Navbar scroll background
window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');
  const menu   = document.getElementById('navbarMenu');
  if (!navbar || !menu) return;

  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else if (!menu.classList.contains('show')) {
    navbar.classList.remove('scrolled');
  }
});
