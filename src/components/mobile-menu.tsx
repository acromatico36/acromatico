// Shared Mobile Menu Component - Single Source of Truth
// This mobile menu is used site-wide: blog posts, all pages
// Static header/logo stays in each page, only menu drawer is dynamic

// Acromatico Brand Color
const ACROMATICO_COLOR = '#4794A6'; // Teal/Turquoise brand color

export const mobileMenuHTML = `
<!-- Mobile Menu Overlay -->
<div class="ast-mobile-popup-overlay" id="overlay"></div>

<!-- Mobile Menu Drawer -->
<div class="ast-mobile-popup-drawer" id="drawer">
  <div class="ast-mobile-popup-inner">
    <div class="mobile-menu-logo">
      <img src="/static/acromatico-logo-black.png" alt="Acromatico Photography" />
    </div>
    
    <div class="mobile-menu-search">
      <input type="search" id="siteSearch" placeholder="Search our site" autocomplete="off" aria-label="Search" />
      <button type="submit" aria-label="Submit search">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
      </button>
      <div class="search-results" id="searchResults"></div>
    </div>
    
    <nav class="mobile-menu-nav">
      <ul>
        <li><a href="/">PORTFOLIOS</a></li>
        <li><a href="/static/blog-index.html">RECENT WORK</a></li>
        <li><a href="/our-story">ABOUT US</a></li>
        <li><a href="/faq">FAQ</a></li>
        <li><a href="/photography">PRICING</a></li>
        <li><a href="/contact">CONTACT</a></li>
      </ul>
    </nav>
    
    <div class="mobile-menu-footer">
      <div class="mobile-menu-tagline">
        South Florida & NYC Photographers
      </div>
      <div class="mobile-menu-social">
        <a href="https://www.instagram.com/acromatico" target="_blank" aria-label="Instagram">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
          </svg>
        </a>
        <a href="https://www.facebook.com/acromatico" target="_blank" aria-label="Facebook">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
          </svg>
        </a>
      </div>
    </div>
  </div>
</div>

<style>
  /* Use Acromatico brand color: ${ACROMATICO_COLOR} */
  
  /* FIXED: Hamburger menu visibility when scrolling */
  .menu-toggle {
    background: rgba(0, 0, 0, 0.6) !important;
    backdrop-filter: blur(10px);
    border-radius: 8px;
    padding: 10px !important;
    transition: all 0.3s ease;
  }
  
  .menu-toggle:hover {
    background: rgba(71, 148, 166, 0.9) !important;
  }
  
  .menu-toggle span {
    background: #ffffff !important;
  }
  
  .menu-toggle:hover span {
    background: #ffffff !important;
  }
  
  .main-header-menu .menu-link:hover {
    color: ${ACROMATICO_COLOR} !important;
  }
  
  .mobile-menu-search input:focus {
    border-color: ${ACROMATICO_COLOR} !important;
    box-shadow: 0 0 0 3px rgba(71, 148, 166, 0.1) !important;
  }
  
  .mobile-menu-nav ul li a:hover {
    color: ${ACROMATICO_COLOR} !important;
  }
</style>

<script>
// Mobile Menu Toggle Script
(function() {
  const menuToggle = document.getElementById('menuToggle');
  const drawer = document.getElementById('drawer');
  const overlay = document.getElementById('overlay');
  
  if (!menuToggle || !drawer || !overlay) {
    console.warn('Menu elements not found');
    return;
  }
  
  function toggleMenu() {
    const isActive = drawer.classList.contains('active');
    
    if (isActive) {
      // Close menu
      drawer.classList.remove('active');
      overlay.classList.remove('active');
      menuToggle.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      // Open menu
      drawer.classList.add('active');
      overlay.classList.add('active');
      menuToggle.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }
  
  // Toggle on hamburger click
  menuToggle.addEventListener('click', toggleMenu);
  
  // Close on overlay click
  overlay.addEventListener('click', toggleMenu);
  
  // Close on ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      toggleMenu();
    }
  });
  
  // Close menu when clicking a link
  const menuLinks = drawer.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', function() {
      toggleMenu();
    });
  });
  
  console.log('✅ Mobile menu initialized');
})();
</script>
`;
