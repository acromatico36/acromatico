// Shared Footer Component - Single Source of Truth
// This footer is used site-wide: homepage, blog posts, all pages
// When you update this file, ALL pages will reflect the change automatically

export const footerHTML = `
<footer class="bg-black border-t border-white/10 py-16">
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
      <div>
        <h4 class="font-bold mb-4" style="color: white;">Academy</h4>
        <ul class="space-y-2 text-gray-400 text-sm">
          <li><a href="/education" class="hover:text-white transition">Academy</a></li>
          <li><a href="/academy" class="hover:text-white transition">Curriculum</a></li>
          <li><a href="/pricing" class="hover:text-white transition">Pricing</a></li>
          <li><a href="/faq" class="hover:text-white transition">FAQ</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-bold mb-4" style="color: white;">Services</h4>
        <ul class="space-y-2 text-gray-400 text-sm">
          <li><a href="/studio" class="hover:text-white transition">Brand Building</a></li>
          <li><a href="/prints" class="hover:text-white transition">Art Prints</a></li>
          <li><a href="/photography" class="hover:text-white transition">Photography</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-bold mb-4" style="color: white;">Company</h4>
        <ul class="space-y-2 text-gray-400 text-sm">
          <li><a href="/about" class="hover:text-white transition">About</a></li>
          <li><a href="/blog" class="hover:text-white transition">Blog</a></li>
          <li><a href="/contact" class="hover:text-white transition">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-bold mb-4" style="color: white;">Legal</h4>
        <ul class="space-y-2 text-gray-400 text-sm">
          <li><a href="/privacy" class="hover:text-white transition">Privacy</a></li>
          <li><a href="/terms" class="hover:text-white transition">Terms</a></li>
        </ul>
      </div>
    </div>
    
    <!-- Sign In Section - Prominent on Mobile -->
    <div class="pt-8 pb-8 border-t border-white/10 text-center">
      <style>
        .footer-signin-btn {
          display: inline-block;
          padding: 1rem 3rem;
          background: rgba(71, 148, 166, 0.15);
          border: 2px solid #4794A6;
          color: #4794A6;
          font-weight: 600;
          font-size: 1.125rem;
          border-radius: 9999px;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .footer-signin-btn:hover {
          background: #4794A6;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(71, 148, 166, 0.4);
        }
        @media (min-width: 769px) {
          .footer-signin-btn {
            display: none; /* Hide on desktop - it's in header */
          }
        }
      </style>
      <a href="/login" class="footer-signin-btn">
        Sign In to Your Account →
      </a>
    </div>
    
    <div class="pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
      <p>&copy; 2026 Acromatico. Built for creators, by creators.</p>
    </div>
  </div>
</footer>
`;
