// APPLE-STYLE PRINTS PAGE - CLEAN, MINIMAL, INSTANT CHECKOUT

app.get('/prints', (c) => 
  c.render(
    <div class="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <Header />

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }
        
        .hero-image {
          width: 100%;
          height: 90vh;
          object-fit: cover;
          animation: fadeIn 1.2s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(1.05); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .print-grid-item {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .print-grid-item:hover {
          transform: scale(1.02);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }
        
        .print-grid-item img {
          width: 100%;
          height: 400px;
          object-fit: cover;
        }
        
        .print-title {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.85), transparent);
          padding: 24px 20px;
          color: white;
          font-weight: 600;
          font-size: 18px;
        }
        
        .modal {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.75);
          z-index: 9999;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(20px);
        }
        
        .modal.active {
          display: flex;
        }
        
        .modal-content {
          background: white;
          border-radius: 20px;
          max-width: 500px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          animation: modalSlideUp 0.3s ease-out;
        }
        
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .size-option, .frame-option {
          border: 2px solid #e5e5e5;
          border-radius: 12px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .size-option:hover, .frame-option:hover {
          border-color: #0071e3;
          background: #f5f5f7;
        }
        
        .size-option.selected, .frame-option.selected {
          border-color: #0071e3;
          background: #e8f4fd;
        }
        
        .buy-button {
          background: #0071e3;
          color: white;
          padding: 16px 32px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 17px;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          width: 100%;
        }
        
        .buy-button:hover {
          background: #0077ED;
          transform: scale(1.02);
        }
      `}</style>

      {/* Hero Section - Full Screen Feature Image */}
      <section class="relative">
        <img 
          src="/static/prints/aruba-beach-hut.jpg" 
          alt="Featured Print" 
          class="hero-image"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/30"></div>
        <div class="absolute bottom-0 left-0 right-0 text-center pb-16">
          <h1 class="text-5xl md:text-7xl font-semibold text-white mb-4" style="text-shadow: 0 2px 20px rgba(0,0,0,0.3);">
            Fine Art Prints
          </h1>
          <p class="text-xl md:text-2xl text-white/90 font-light" style="text-shadow: 0 2px 10px rgba(0,0,0,0.3);">
            Limited Edition • Museum Quality • Signed by Artists
          </p>
        </div>
      </section>

      {/* Simple 3-Column Grid */}
      <section class="py-20 px-6 max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Print 1: Aruba */}
          <div class="print-grid-item" onclick="openPrintModal('Eagle Beach Palapa', 'aruba-beach-hut.jpg', 795)">
            <img src="/static/prints/aruba-beach-hut.jpg" alt="Eagle Beach Palapa" />
            <div class="print-title">
              Eagle Beach Palapa
              <div class="text-sm font-normal text-white/80 mt-1">From $795</div>
            </div>
          </div>

          {/* Print 2: Aruba */}
          <div class="print-grid-item" onclick="openPrintModal('Divi Divi Sanctuary', 'aruba-divi-tree.jpg', 795)">
            <img src="/static/prints/aruba-divi-tree.jpg" alt="Divi Divi Sanctuary" />
            <div class="print-title">
              Divi Divi Sanctuary
              <div class="text-sm font-normal text-white/80 mt-1">From $795</div>
            </div>
          </div>

          {/* Print 3: Mexico */}
          <div class="print-grid-item" onclick="openPrintModal('Pacific Serenity', 'mexico-ocean-view.jpg', 795)">
            <img src="/static/prints/mexico-ocean-view.jpg" alt="Pacific Serenity" />
            <div class="print-title">
              Pacific Serenity
              <div class="text-sm font-normal text-white/80 mt-1">From $795</div>
            </div>
          </div>

          {/* Print 4: Chile */}
          <div class="print-grid-item" onclick="openPrintModal('Torres del Paine', 'chile-torres-del-paine.jpg', 795)">
            <img src="/static/prints/chile-torres-del-paine.jpg" alt="Torres del Paine" />
            <div class="print-title">
              Torres del Paine
              <div class="text-sm font-normal text-white/80 mt-1">From $795</div>
            </div>
          </div>

          {/* Print 5: Chile */}
          <div class="print-grid-item" onclick="openPrintModal('Glacial Majesty', 'chile-glacier.jpg', 795)">
            <img src="/static/prints/chile-glacier.jpg" alt="Glacial Majesty" />
            <div class="print-title">
              Glacial Majesty
              <div class="text-sm font-normal text-white/80 mt-1">From $795</div>
            </div>
          </div>

          {/* Print 6: Hawaii */}
          <div class="print-grid-item" onclick="openPrintModal('Volcanic Fire', 'hawaii-lava.jpg', 795)">
            <img src="/static/prints/hawaii-lava.jpg" alt="Volcanic Fire" />
            <div class="print-title">
              Volcanic Fire
              <div class="text-sm font-normal text-white/80 mt-1">From $795</div>
            </div>
          </div>

          {/* Print 7: Hawaii */}
          <div class="print-grid-item" onclick="openPrintModal('Na Pali Emerald', 'hawaii-napali.jpg', 795)">
            <img src="/static/prints/hawaii-napali.jpg" alt="Na Pali Emerald" />
            <div class="print-title">
              Na Pali Emerald
              <div class="text-sm font-normal text-white/80 mt-1">From $795</div>
            </div>
          </div>

          {/* Print 8: Italy */}
          <div class="print-grid-item" onclick="openPrintModal('Cinque Terre', 'italy-cinque-terre.jpg', 795)">
            <img src="/static/prints/italy-cinque-terre.jpg" alt="Cinque Terre" />
            <div class="print-title">
              Cinque Terre
              <div class="text-sm font-normal text-white/80 mt-1">From $795</div>
            </div>
          </div>

          {/* Print 9: Italy */}
          <div class="print-grid-item" onclick="openPrintModal('Tuscany Dawn', 'italy-tuscany.jpg', 795)">
            <img src="/static/prints/italy-tuscany.jpg" alt="Tuscany Dawn" />
            <div class="print-title">
              Tuscany Dawn
              <div class="text-sm font-normal text-white/80 mt-1">From $795</div>
            </div>
          </div>

        </div>
      </section>

      {/* Purchase Modal */}
      <div id="purchaseModal" class="modal" onclick="closeModal(event)">
        <div class="modal-content" onclick="event.stopPropagation()">
          <div class="p-8">
            {/* Close Button */}
            <button onclick="closeModal()" class="float-right text-3xl text-gray-400 hover:text-gray-600">&times;</button>
            
            <h2 id="modalTitle" class="text-3xl font-semibold mb-2">Print Title</h2>
            <p class="text-gray-500 mb-8">Edition 1/100 • Signed by Artists</p>

            {/* Step 1: Size Selection */}
            <div id="sizeStep">
              <h3 class="text-xl font-semibold mb-4">Choose Size</h3>
              <div class="space-y-3">
                <div class="size-option" onclick="selectSize('24x36', 795)">
                  <div class="font-semibold">24" × 36"</div>
                  <div class="text-gray-600">Perfect for living rooms • $795</div>
                </div>
                <div class="size-option" onclick="selectSize('30x40', 995)">
                  <div class="font-semibold">30" × 40"</div>
                  <div class="text-gray-600">Statement piece • $995</div>
                </div>
                <div class="size-option" onclick="selectSize('48x60', 1595)">
                  <div class="font-semibold">48" × 60"</div>
                  <div class="text-gray-600">Gallery size • $1,595</div>
                </div>
              </div>
            </div>

            {/* Step 2: Frame Selection */}
            <div id="frameStep" style="display: none;">
              <button onclick="backToSize()" class="text-blue-600 mb-4">&larr; Back</button>
              <h3 class="text-xl font-semibold mb-4">Choose Frame</h3>
              <div class="space-y-3">
                <div class="frame-option" onclick="selectFrame('heritage', 400)">
                  <div class="font-semibold">Heritage Frame</div>
                  <div class="text-gray-600">Natural wood • Museum mount • +$400</div>
                </div>
                <div class="frame-option" onclick="selectFrame('crystal', 0)">
                  <div class="font-semibold">Crystal Vision</div>
                  <div class="text-gray-600">Ultra-clear acrylic • +$0</div>
                </div>
              </div>
            </div>

            {/* Step 3: Checkout */}
            <div id="checkoutStep" style="display: none;">
              <button onclick="backToFrame()" class="text-blue-600 mb-4">&larr; Back</button>
              <h3 class="text-xl font-semibold mb-4">Complete Purchase</h3>
              
              <div class="bg-gray-50 rounded-lg p-4 mb-6">
                <div class="flex justify-between mb-2">
                  <span class="text-gray-600">Print</span>
                  <span id="summaryPrint" class="font-semibold">—</span>
                </div>
                <div class="flex justify-between mb-2">
                  <span class="text-gray-600">Size</span>
                  <span id="summarySize" class="font-semibold">—</span>
                </div>
                <div class="flex justify-between mb-2">
                  <span class="text-gray-600">Frame</span>
                  <span id="summaryFrame" class="font-semibold">—</span>
                </div>
                <div class="flex justify-between pt-2 border-t border-gray-200">
                  <span class="font-semibold">Total</span>
                  <span id="summaryTotal" class="font-bold text-xl">$0</span>
                </div>
              </div>

              <button onclick="checkout()" class="buy-button">
                Buy with Apple Pay
              </button>
              <p class="text-center text-sm text-gray-500 mt-3">or Google Pay</p>
            </div>
          </div>
        </div>
      </div>

      <script>{`
        let currentPrint = { name: '', image: '', basePrice: 0 };
        let selectedSize = { name: '', price: 0 };
        let selectedFrame = { name: '', price: 0 };

        function openPrintModal(name, image, price) {
          currentPrint = { name, image, basePrice: price };
          document.getElementById('modalTitle').textContent = name;
          document.getElementById('purchaseModal').classList.add('active');
          showSizeStep();
        }

        function closeModal(event) {
          if (!event || event.target.id === 'purchaseModal') {
            document.getElementById('purchaseModal').classList.remove('active');
            showSizeStep();
          }
        }

        function selectSize(size, price) {
          selectedSize = { name: size, price };
          document.querySelectorAll('.size-option').forEach(el => el.classList.remove('selected'));
          event.currentTarget.classList.add('selected');
          setTimeout(() => showFrameStep(), 200);
        }

        function selectFrame(frame, price) {
          selectedFrame = { name: frame, price };
          document.querySelectorAll('.frame-option').forEach(el => el.classList.remove('selected'));
          event.currentTarget.classList.add('selected');
          setTimeout(() => showCheckoutStep(), 200);
        }

        function showSizeStep() {
          document.getElementById('sizeStep').style.display = 'block';
          document.getElementById('frameStep').style.display = 'none';
          document.getElementById('checkoutStep').style.display = 'none';
        }

        function showFrameStep() {
          document.getElementById('sizeStep').style.display = 'none';
          document.getElementById('frameStep').style.display = 'block';
          document.getElementById('checkoutStep').style.display = 'none';
        }

        function showCheckoutStep() {
          document.getElementById('sizeStep').style.display = 'none';
          document.getElementById('frameStep').style.display = 'none';
          document.getElementById('checkoutStep').style.display = 'block';
          
          // Update summary
          const total = selectedSize.price + selectedFrame.price;
          document.getElementById('summaryPrint').textContent = currentPrint.name;
          document.getElementById('summarySize').textContent = selectedSize.name;
          document.getElementById('summaryFrame').textContent = selectedFrame.name === 'heritage' ? 'Heritage Frame (+$400)' : 'Crystal Vision';
          document.getElementById('summaryTotal').textContent = '$' + total.toLocaleString();
        }

        function backToSize() {
          showSizeStep();
        }

        function backToFrame() {
          showFrameStep();
        }

        function checkout() {
          const total = selectedSize.price + selectedFrame.price;
          // For now, just alert - we'll integrate Stripe Payment Link next
          alert('Checkout: ' + currentPrint.name + ' - ' + selectedSize.name + ' - ' + selectedFrame.name + ' - Total: $' + total);
          // TODO: Redirect to Stripe Payment Link with pre-filled details
        }
      `}</script>

      <footer class="bg-white border-t border-gray-200 py-12">
        <div class="max-w-7xl mx-auto px-6 text-center">
          <p class="text-gray-500 text-sm">© 2026 Acromatico. Museum-quality fine art prints.</p>
        </div>
      </footer>

    </div>
  )
)
