// Acromatico Gallery - Complete E-Commerce System
// LocalStorage-based cart with size/frame selection

class AcromaticoCart {
  constructor() {
    this.cart = this.loadCart();
    this.initEventListeners();
  }

  // Load cart from localStorage
  loadCart() {
    const saved = localStorage.getItem('acromatico_cart');
    return saved ? JSON.parse(saved) : [];
  }

  // Save cart to localStorage
  saveCart() {
    localStorage.setItem('acromatico_cart', JSON.stringify(this.cart));
    this.updateCartBadge();
  }

  // Add item to cart with configuration
  addItem(printId, printName, basePrice, config = {}) {
    const item = {
      id: `${printId}-${Date.now()}`,
      printId,
      printName,
      size: config.size || '24" × 36"',
      frame: config.frame || 'Crystal Vision',
      price: this.calculatePrice(config.size, config.frame, basePrice),
      quantity: 1,
      image: config.image || `/static/prints/${printId}.jpg`,
      timestamp: Date.now()
    };

    this.cart.push(item);
    this.saveCart();
    this.showNotification(`${printName} added to cart`);
    return item;
  }

  // Calculate price based on size and frame
  calculatePrice(size, frame, basePrice = 795) {
    const sizeMultipliers = {
      '12" × 16"': 1.0,
      '18" × 24"': 1.3,
      '24" × 36"': 1.5,    // Base price
      '30" × 40"': 2.0,
      '40" × 60"': 3.0,    // The Statement
      '48" × 60"': 3.5,
      '50" × 70"': 4.0,    // The Masterpiece
      '60" × 80"': 5.0,
      '72" × 48"': 6.0     // The Legacy
    };

    const frameMultipliers = {
      'Crystal Vision': 1.0,      // $795 base
      'Heritage Frame': 2.0       // $1,595 base
    };

    const sizeMultiplier = sizeMultipliers[size] || 1.5;
    const frameMultiplier = frameMultipliers[frame] || 1.0;
    
    return Math.round(basePrice * sizeMultiplier * frameMultiplier);
  }

  // Remove item from cart
  removeItem(itemId) {
    this.cart = this.cart.filter(item => item.id !== itemId);
    this.saveCart();
  }

  // Update quantity
  updateQuantity(itemId, quantity) {
    const item = this.cart.find(i => i.id === itemId);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.saveCart();
    }
  }

  // Get cart total
  getTotal() {
    return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  // Get cart item count
  getItemCount() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Update cart badge
  updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    const count = this.getItemCount();
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }

  // Show notification
  showNotification(message) {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-8 right-8 bg-teal-500 text-white px-6 py-4 rounded-sm shadow-2xl z-50 animate-slide-up';
    toast.style.fontFamily = "'Montserrat', sans-serif";
    toast.style.fontSize = '0.875rem';
    toast.style.letterSpacing = '0.05em';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }

  // Open cart modal
  openCart() {
    this.renderCartModal();
  }

  // Render cart modal
  renderCartModal() {
    // Remove existing modal
    const existing = document.getElementById('cart-modal');
    if (existing) existing.remove();

    // Create modal
    const modal = document.createElement('div');
    modal.id = 'cart-modal';
    modal.className = 'fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6';
    modal.style.fontFamily = "'Montserrat', sans-serif";
    
    const cartHTML = this.cart.length === 0 
      ? this.renderEmptyCart()
      : this.renderCartItems();

    modal.innerHTML = `
      <div class="bg-black border border-white/10 rounded-sm max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <!-- Header -->
        <div class="sticky top-0 bg-black border-b border-white/10 p-6 flex items-center justify-between z-10">
          <h2 class="text-3xl font-light text-white/90" style="font-family: 'Cormorant Garamond', serif;">Your Cart</h2>
          <button onclick="cart.closeCart()" class="text-white/50 hover:text-white/90 transition">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Cart Content -->
        <div class="p-6">
          ${cartHTML}
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) this.closeCart();
    });
  }

  renderEmptyCart() {
    return `
      <div class="text-center py-16">
        <div class="text-6xl mb-4">🛒</div>
        <h3 class="text-2xl font-light text-white/70 mb-4" style="font-family: 'Cormorant Garamond', serif;">Your cart is empty</h3>
        <p class="text-white/40 text-sm mb-8">Add museum-quality prints to begin</p>
        <button onclick="cart.closeCart()" class="px-8 py-3 border border-white/30 hover:border-teal-400/50 hover:bg-teal-500/10 transition-all duration-300 text-sm tracking-[0.15em] uppercase">
          Continue Shopping
        </button>
      </div>
    `;
  }

  renderCartItems() {
    const itemsHTML = this.cart.map(item => `
      <div class="flex gap-6 p-6 border border-white/5 rounded-sm mb-4 hover:border-white/10 transition">
        <div class="w-32 h-32 bg-gray-900 rounded-sm overflow-hidden flex-shrink-0">
          <div class="w-full h-full bg-gradient-to-br from-teal-900/20 to-blue-900/20 flex items-center justify-center text-4xl">
            🖼️
          </div>
        </div>
        
        <div class="flex-1">
          <h4 class="text-xl font-light text-white/90 mb-2" style="font-family: 'Cormorant Garamond', serif;">${item.printName}</h4>
          <div class="space-y-1 text-sm text-white/50 mb-4">
            <p>Size: ${item.size}</p>
            <p>Frame: ${item.frame}</p>
            <p>Edition: 1 of 100</p>
          </div>
          
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2 border border-white/10 rounded-sm">
              <button onclick="cart.updateQuantity('${item.id}', ${item.quantity - 1}); cart.openCart();" 
                class="px-3 py-1 hover:bg-white/5 transition text-white/50">−</button>
              <span class="px-4 text-white/90">${item.quantity}</span>
              <button onclick="cart.updateQuantity('${item.id}', ${item.quantity + 1}); cart.openCart();" 
                class="px-3 py-1 hover:bg-white/5 transition text-white/50">+</button>
            </div>
            
            <button onclick="cart.removeItem('${item.id}'); cart.openCart();" 
              class="text-xs text-white/30 hover:text-red-400 transition tracking-wide uppercase">
              Remove
            </button>
          </div>
        </div>
        
        <div class="text-right">
          <p class="text-2xl font-light text-white/90" style="font-family: 'Cormorant Garamond', serif;">
            $${(item.price * item.quantity).toLocaleString()}
          </p>
        </div>
      </div>
    `).join('');

    const total = this.getTotal();
    
    return `
      ${itemsHTML}
      
      <!-- Cart Summary -->
      <div class="border-t border-white/10 pt-6 mt-6">
        <div class="flex justify-between items-center mb-6">
          <span class="text-xl font-light text-white/70" style="font-family: 'Cormorant Garamond', serif;">Subtotal</span>
          <span class="text-3xl font-light text-white/90" style="font-family: 'Cormorant Garamond', serif;">$${total.toLocaleString()}</span>
        </div>
        
        <p class="text-xs text-white/40 mb-6">Shipping calculated at checkout • Free shipping on orders over $5,000</p>
        
        <div class="flex gap-4">
          <button onclick="cart.closeCart()" 
            class="flex-1 px-8 py-4 border border-white/20 hover:border-white/40 transition-all duration-300 text-sm tracking-[0.15em] uppercase text-white/70">
            Continue Shopping
          </button>
          <a href="/checkout" 
            class="flex-1 px-8 py-4 bg-teal-500/10 border border-teal-400/50 hover:bg-teal-500/20 transition-all duration-300 text-sm tracking-[0.15em] uppercase text-teal-400 text-center">
            Proceed to Checkout
          </a>
        </div>
      </div>
    `;
  }

  closeCart() {
    const modal = document.getElementById('cart-modal');
    if (modal) modal.remove();
  }

  // Initialize event listeners
  initEventListeners() {
    // Update badge on load
    this.updateCartBadge();
  }
}

// Initialize global cart instance
const cart = new AcromaticoCart();

// Global functions for inline handlers
function openPrintModal(printId, printName, basePrice) {
  const modal = document.createElement('div');
  modal.id = 'print-modal';
  modal.className = 'fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6';
  modal.style.fontFamily = "'Montserrat', sans-serif";
  
  modal.innerHTML = `
    <div class="bg-black border border-white/10 rounded-sm max-w-2xl w-full p-8">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-3xl font-light text-white/90" style="font-family: 'Cormorant Garamond', serif;">${printName}</h2>
        <button onclick="this.closest('#print-modal').remove()" class="text-white/50 hover:text-white/90 transition">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <div class="space-y-6">
        <!-- Size Selection -->
        <div>
          <label class="block text-sm text-white/50 tracking-[0.15em] uppercase mb-3">Select Size</label>
          <select id="size-select" class="w-full bg-black border border-white/20 text-white/90 px-4 py-3 rounded-sm focus:border-teal-400/50 focus:outline-none">
            <option value="24&quot; × 36&quot;">24" × 36" - The Collector ($1,095 - $1,595)</option>
            <option value="40&quot; × 60&quot;">40" × 60" - The Statement ($2,295 - $3,595) ⭐ MOST POPULAR</option>
            <option value="50&quot; × 70&quot;">50" × 70" - The Masterpiece ($2,995 - $4,795)</option>
            <option value="72&quot; × 48&quot;">72" × 48" - The Legacy ($3,795 - $6,295)</option>
          </select>
        </div>

        <!-- Frame Selection -->
        <div>
          <label class="block text-sm text-white/50 tracking-[0.15em] uppercase mb-3">Select Frame</label>
          <div class="grid grid-cols-2 gap-4">
            <label class="cursor-pointer">
              <input type="radio" name="frame" value="Crystal Vision" class="peer hidden" checked />
              <div class="border-2 border-white/20 peer-checked:border-teal-400/50 peer-checked:bg-teal-500/5 p-4 rounded-sm transition">
                <div class="font-light text-lg text-white/90 mb-1" style="font-family: 'Cormorant Garamond', serif;">Crystal Vision</div>
                <div class="text-xs text-white/50">Ultra-clear acrylic</div>
                <div class="text-sm text-white/70 mt-2">From $795</div>
              </div>
            </label>
            
            <label class="cursor-pointer">
              <input type="radio" name="frame" value="Heritage Frame" class="peer hidden" />
              <div class="border-2 border-white/20 peer-checked:border-amber-400/50 peer-checked:bg-amber-500/5 p-4 rounded-sm transition">
                <div class="font-light text-lg text-white/90 mb-1" style="font-family: 'Cormorant Garamond', serif;">Heritage Frame</div>
                <div class="text-xs text-white/50">Natural wood</div>
                <div class="text-sm text-white/70 mt-2">From $1,595</div>
              </div>
            </label>
          </div>
        </div>

        <!-- Edition Info -->
        <div class="bg-white/5 border border-white/10 p-4 rounded-sm">
          <p class="text-xs text-white/50 tracking-wide">
            ✓ Edition 1 of 100 • Signed & Numbered<br/>
            ✓ Certificate of Authenticity Included<br/>
            ✓ Museum-Grade Archival Quality
          </p>
        </div>

        <!-- Add to Cart Button -->
        <button onclick="addConfiguredPrint('${printId}', '${printName}', ${basePrice})" 
          class="w-full px-8 py-4 bg-teal-500/10 border border-teal-400/50 hover:bg-teal-500/20 transition-all duration-300 text-sm tracking-[0.15em] uppercase text-teal-400">
          Add to Cart
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  
  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
}

function addConfiguredPrint(printId, printName, basePrice) {
  const size = document.getElementById('size-select').value;
  const frame = document.querySelector('input[name="frame"]:checked').value;
  
  cart.addItem(printId, printName, basePrice, { size, frame });
  
  // Close modal
  document.getElementById('print-modal').remove();
  
  // Show cart notification
  setTimeout(() => {
    cart.showNotification('✓ Added to cart! View cart to checkout');
  }, 300);
}

// Legacy function for simple add to cart (opens modal instead)
function addToCart(printId, printName, basePrice) {
  openPrintModal(printId, printName, basePrice);
}
