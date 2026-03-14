    // BOOKING STATE
    let booking = {
      propertyCount: 0,
      properties: [],
      services: [],
      servicesPrice: 0,
      addons: [],
      addonsPrice: 0,
      realtorName: '',
      brokerageName: '',
      realtorEmail: '',
      realtorPhone: '',
      mlsNumber: ''
    };

    // STEP 1: PROPERTY COUNT FUNCTIONS
    let selectedPropertyCount = 0;

    function selectPropertyCount(card, count) {
      console.log('🏠 Property count selected:', count);
      
      // Remove active class from all cards
      document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      
      if (count === 4) {
        // Show input for 4+ properties
        document.getElementById('propertyCountInput').style.display = 'block';
        document.getElementById('exactPropertyCount').value = '4';
        document.getElementById('exactPropertyCount').focus();
      } else if (count === 2) {
        // Show input for 2-3 properties
        document.getElementById('propertyCountInput').style.display = 'block';
        document.getElementById('exactPropertyCount').value = '2';
        document.getElementById('exactPropertyCount').focus();
      } else {
        // Single property - go directly to property details
        selectedPropertyCount = count;
        booking.propertyCount = count;
        generatePropertyForms();
        nextStep('1b');
      }
    }

    function confirmPropertyCount() {
      const input = document.getElementById('exactPropertyCount');
      const count = parseInt(input.value);
      
      if (!count || count < 1 || count > 50) {
        alert('Please enter a valid number of properties (1-50)');
        return;
      }
      
      selectedPropertyCount = count;
      booking.propertyCount = count;
      console.log('✅ Confirmed property count:', count);
      
      generatePropertyForms();
      nextStep('1b');
    }

    // Property form state
    let currentPropertyIndex = 0;

    function generatePropertyForms() {
      const container = document.getElementById('propertiesFormsContainer');
      const count = booking.propertyCount;
      
      // Initialize properties array if empty
      if (booking.properties.length === 0) {
        booking.properties = Array(count).fill(null).map(() => ({
          address: '',
          type: '',
          squareFootage: '',
          customSqft: '',
          bedrooms: '',
          bathrooms: '',
          coverage: 'both', // interior, exterior, both
          notes: ''
        }));
      }
      
      // Load from localStorage if exists
      const saved = localStorage.getItem('acromaticoRealEstateBooking');
      if (saved) {
        const savedData = JSON.parse(saved);
        if (savedData.properties && savedData.properties.length === count) {
          booking.properties = savedData.properties;
        }
      }
      
      currentPropertyIndex = 0;
      renderCurrentPropertyForm();
    }

    function renderCurrentPropertyForm() {
      const container = document.getElementById('propertiesFormsContainer');
      const count = booking.propertyCount;
      const i = currentPropertyIndex;
      const property = booking.properties[i];
      
      // Update title
      if (count === 1) {
        document.getElementById('propertyDetailsTitle').textContent = 'Property Details';
        document.getElementById('propertyDetailsSubtitle').textContent = 'Provide details for your property listing.';
      } else {
        document.getElementById('propertyDetailsTitle').textContent = `Property ${i + 1} of ${count}`;
        document.getElementById('propertyDetailsSubtitle').textContent = `Fill out details for this property. We'll apply bulk pricing discounts automatically (${count >= 4 ? '15%' : '10%'} off).`;
      }
      
      // Progress indicator for multiple properties
      const progressHTML = count > 1 ? `
        <div style="background: rgba(71, 148, 166, 0.1); border-radius: 8px; padding: 12px 20px; margin-bottom: 24px; text-align: center;">
          <div style="font-size: 14px; color: var(--secondary); margin-bottom: 8px;">Property Progress</div>
          <div style="display: flex; gap: 8px; justify-content: center;">
            ${Array(count).fill(0).map((_, idx) => `
              <div style="width: ${Math.max(40, 200 / count)}px; height: 8px; background: ${idx < i ? 'var(--accent)' : idx === i ? 'var(--accent)' : 'var(--border)'}; border-radius: 4px; opacity: ${idx <= i ? '1' : '0.3'};"></div>
            `).join('')}
          </div>
          <div style="font-size: 12px; color: var(--secondary); margin-top: 8px;">${i} of ${count} completed</div>
        </div>
      ` : '';
      
      const formHTML = `
        ${progressHTML}
        <div class="property-form" style="background: white; border: 2px solid var(--border); border-radius: 16px; padding: 32px; margin-bottom: 24px;">
          <h3 style="font-size: 22px; font-weight: 500; margin-bottom: 24px; color: var(--accent);">
            ${count > 1 ? `Property ${i + 1}` : 'Property Information'}
          </h3>
          
          <label>Property Address *</label>
          <input type="text" id="propertyAddress${i}" list="addressSuggestions${i}" placeholder="123 Main St, Miami, FL 33101" value="${property.address || ''}" required autocomplete="off">
          <datalist id="addressSuggestions${i}">
            <option value="Brickell Ave, Miami, FL">
            <option value="Ocean Drive, Miami Beach, FL">
            <option value="Collins Ave, Miami Beach, FL">
            <option value="Alton Road, Miami Beach, FL">
            <option value="Lincoln Road, Miami Beach, FL">
            <option value="Washington Ave, Miami Beach, FL">
            <option value="Flagler Street, Miami, FL">
            <option value="Coral Way, Miami, FL">
            <option value="Miracle Mile, Coral Gables, FL">
            <option value="Main Highway, Coconut Grove, FL">
            <option value="Biscayne Blvd, Miami, FL">
            <option value="SW 8th Street, Miami, FL">
            <option value="Las Olas Blvd, Fort Lauderdale, FL">
            <option value="A1A, Fort Lauderdale, FL">
            <option value="Atlantic Blvd, Pompano Beach, FL">
          </datalist>
          <p style="font-size: 12px; color: var(--secondary); margin-top: 4px; margin-bottom: 16px;">📍 Start typing street name for suggestions</p>
          
          <label>Property Type *</label>
          <select id="propertyType${i}" required>
            <option value="">Select property type...</option>
            <option value="residential" ${property.type === 'residential' ? 'selected' : ''}>Residential Home</option>
            <option value="condo" ${property.type === 'condo' ? 'selected' : ''}>Condo / Apartment</option>
            <option value="luxury" ${property.type === 'luxury' ? 'selected' : ''}>Luxury Estate</option>
            <option value="commercial-building" ${property.type === 'commercial-building' ? 'selected' : ''}>Commercial Building / Mall</option>
            <option value="commercial-other" ${property.type === 'commercial-other' ? 'selected' : ''}>Other Commercial Property</option>
            <option value="airbnb" ${property.type === 'airbnb' ? 'selected' : ''}>Airbnb / Vacation Rental</option>
            <option value="land" ${property.type === 'land' ? 'selected' : ''}>Land / Lot</option>
          </select>
          
          <label>What needs to be captured? *</label>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 16px;">
            <div id="coverage-interior-${i}" class="coverage-option" onclick="selectPropertyCoverage(${i}, 'interior')" style="border: 2px solid var(--border); border-radius: 8px; padding: 16px; text-align: center; cursor: pointer; transition: all 0.3s;">
              <div style="font-size: 24px; margin-bottom: 4px;">🏠</div>
              <div style="font-size: 14px; font-weight: 500;">Interior Only</div>
            </div>
            <div id="coverage-exterior-${i}" class="coverage-option" onclick="selectPropertyCoverage(${i}, 'exterior')" style="border: 2px solid var(--border); border-radius: 8px; padding: 16px; text-align: center; cursor: pointer; transition: all 0.3s;">
              <div style="font-size: 24px; margin-bottom: 4px;">🌳</div>
              <div style="font-size: 14px; font-weight: 500;">Exterior Only</div>
            </div>
            <div id="coverage-both-${i}" class="coverage-option coverage-selected" onclick="selectPropertyCoverage(${i}, 'both')" style="border: 2px solid var(--accent); border-radius: 8px; padding: 16px; text-align: center; cursor: pointer; transition: all 0.3s; background: rgba(71, 148, 166, 0.05);">
              <div style="font-size: 24px; margin-bottom: 4px;">🏘️</div>
              <div style="font-size: 14px; font-weight: 500;">Both</div>
              <div style="font-size: 11px; color: var(--accent); margin-top: 2px;">Recommended</div>
            </div>
          </div>
          
          <label>Square Footage *</label>
          <select id="squareFootage${i}" required onchange="handleSqftChange(${i})">
            <option value="">Select square footage...</option>
            <option value="0-1500" ${property.squareFootage === '0-1500' ? 'selected' : ''}>0-1,500 sq ft</option>
            <option value="1501-3000" ${property.squareFootage === '1501-3000' ? 'selected' : ''}>1,501-3,000 sq ft</option>
            <option value="3001-5000" ${property.squareFootage === '3001-5000' ? 'selected' : ''}>3,001-5,000 sq ft</option>
            <option value="5001-8000" ${property.squareFootage === '5001-8000' ? 'selected' : ''}>5,001-8,000 sq ft</option>
            <option value="8000+" ${property.squareFootage === '8000+' ? 'selected' : ''}>8,000+ sq ft (specify below)</option>
          </select>
          
          <div id="customSqftContainer${i}" style="display: ${property.squareFootage === '8000+' ? 'block' : 'none'}; margin-top: 16px;">
            <label>Exact Square Footage</label>
            <input type="number" id="customSqft${i}" placeholder="e.g., 12500" min="8001" value="${property.customSqft || ''}">
            <p style="font-size: 12px; color: var(--secondary); margin-top: 4px;">For properties over 8,000 sq ft</p>
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 16px;">
            <div>
              <label>Bedrooms</label>
              <input type="number" id="bedrooms${i}" min="0" max="50" placeholder="e.g., 3" value="${property.bedrooms || ''}">
            </div>
            <div>
              <label>Bathrooms</label>
              <input type="number" id="bathrooms${i}" min="0" max="50" step="0.5" placeholder="e.g., 2.5" value="${property.bathrooms || ''}">
            </div>
          </div>
          
          <label style="margin-top: 16px;">Additional Notes (Optional)</label>
          <textarea id="notes${i}" placeholder="Any special requests, access instructions, or details we should know..." style="width: 100%; min-height: 80px; padding: 12px; border: 2px solid var(--border); border-radius: 8px; font-family: inherit; font-size: 14px; resize: vertical;">${property.notes || ''}</textarea>
          <p style="font-size: 12px; color: var(--secondary); margin-top: 4px;">e.g., "Vacant property - lockbox code 1234" or "Tenant occupied - schedule after 5pm"</p>
        </div>
        
        <div class="button-group" style="display: flex; gap: 12px; justify-content: space-between;">
          <button class="btn btn-secondary" onclick="previousProperty()" ${i === 0 ? 'style="visibility: hidden;"' : ''}>← Previous Property</button>
          <button class="btn btn-primary" onclick="nextProperty()">${i < count - 1 ? 'Next Property →' : 'Continue to Services →'}</button>
        </div>
      `;
      
      container.innerHTML = formHTML;
      
      // Apply selected styling to coverage options
      updateCoverageStyles(i);
    }

    function selectPropertyCoverage(index, coverage) {
      booking.properties[index].coverage = coverage;
      updateCoverageStyles(index);
    }

    function updateCoverageStyles(index) {
      // Safety check
      if (!booking.properties[index]) return;
      
      const coverage = booking.properties[index].coverage;
      if (!coverage) return;
      
      // Reset all three options for this property
      const interior = document.getElementById(`coverage-interior-${index}`);
      const exterior = document.getElementById(`coverage-exterior-${index}`);
      const both = document.getElementById(`coverage-both-${index}`);
      
      if (interior) {
        interior.style.borderColor = 'var(--border)';
        interior.style.background = 'white';
      }
      if (exterior) {
        exterior.style.borderColor = 'var(--border)';
        exterior.style.background = 'white';
      }
      if (both) {
        both.style.borderColor = 'var(--border)';
        both.style.background = 'white';
      }
      
      // Highlight the selected one
      const selected = document.getElementById(`coverage-${coverage}-${index}`);
      if (selected) {
        selected.style.borderColor = 'var(--accent)';
        selected.style.background = 'rgba(71, 148, 166, 0.05)';
      }
    }

    function handleSqftChange(index) {
      const select = document.getElementById(`squareFootage${index}`);
      const customContainer = document.getElementById(`customSqftContainer${index}`);
      
      if (select.value === '8000+') {
        customContainer.style.display = 'block';
      } else {
        customContainer.style.display = 'none';
      }
      
      booking.properties[index].squareFootage = select.value;
    }

    function savePropertyData(index) {
      const property = booking.properties[index];
      
      // Collect all values
      property.address = document.getElementById(`propertyAddress${index}`)?.value.trim() || property.address;
      property.type = document.getElementById(`propertyType${index}`)?.value || property.type;
      property.squareFootage = document.getElementById(`squareFootage${index}`)?.value || property.squareFootage;
      property.customSqft = document.getElementById(`customSqft${index}`)?.value || property.customSqft;
      property.bedrooms = document.getElementById(`bedrooms${index}`)?.value || property.bedrooms;
      property.bathrooms = document.getElementById(`bathrooms${index}`)?.value || property.bathrooms;
      property.notes = document.getElementById(`notes${index}`)?.value || property.notes;
      
      // ✅ CRITICAL: Save coverage field (interior/exterior/both)
      // This field is already set by selectPropertyCoverage() function
      // We just need to ensure it persists in the booking object
      if (!property.coverage) {
        property.coverage = 'interior'; // Default to interior if not set
      }
      
      console.log(`💾 Property ${index} saved:`, property);
      
      // Save to localStorage
      localStorage.setItem('acromaticoRealEstateBooking', JSON.stringify(booking));
      console.log('💾 Saved property', index + 1);
    }

    function previousProperty() {
      if (currentPropertyIndex > 0) {
        // Save current property data first
        savePropertyData(currentPropertyIndex);
        currentPropertyIndex--;
        renderCurrentPropertyForm();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    function nextProperty() {
      const i = currentPropertyIndex;
      const property = booking.properties[i];
      
      // Validate current property
      const address = document.getElementById(`propertyAddress${i}`).value.trim();
      const type = document.getElementById(`propertyType${i}`).value;
      const sqft = document.getElementById(`squareFootage${i}`).value;
      
      if (!address) {
        alert('Please enter property address');
        return;
      }
      if (!type) {
        alert('Please select property type');
        return;
      }
      if (!sqft) {
        alert('Please select square footage');
        return;
      }
      if (sqft === '8000+' && !document.getElementById(`customSqft${i}`).value) {
        alert('Please specify exact square footage for properties over 8,000 sq ft');
        return;
      }
      
      // Save current property
      savePropertyData(i);
      
      // Move to next property or continue
      if (currentPropertyIndex < booking.propertyCount - 1) {
        currentPropertyIndex++;
        renderCurrentPropertyForm();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // All properties filled, move to services
        console.log('✅ All properties completed:', booking.properties);
        nextStep(2);
      }
    }

    function backToPropertyCount() {
      document.getElementById('step1b').classList.remove('active');
      document.getElementById('step1').classList.add('active');
      currentStep = 1;
      updateProgressBar();
    }

    function validateStep1b() {
      const count = booking.propertyCount;
      
      // Clear previous selections when returning from Step 2
      // (prices may have changed if sqft was modified)
      const wasComingFromStep2 = booking.services && booking.services.length > 0;
      if (wasComingFromStep2) {
        console.log('⚠️ Square footage changed - clearing service selections');
      }
      booking.services = [];
      booking.servicesPrice = 0;
      
      // Validate and collect data for each property
      for (let i = 0; i < count; i++) {
        const address = document.getElementById(`propertyAddress${i}`).value.trim();
        const type = document.getElementById(`propertyType${i}`).value;
        const sqft = document.getElementById(`squareFootage${i}`).value;
        const customSqft = document.getElementById(`customSqft${i}`)?.value;
        const beds = document.getElementById(`bedrooms${i}`)?.value;
        const baths = document.getElementById(`bathrooms${i}`)?.value;
        const notes = document.getElementById(`notes${i}`)?.value;
        const coverage = booking.properties[i]?.coverage || 'interior'; // Keep existing coverage
        
        if (!address) {
          alert(`Please enter address for Property ${i + 1}`);
          return;
        }
        if (!type) {
          alert(`Please select property type for Property ${i + 1}`);
          return;
        }
        if (!sqft) {
          alert(`Please select square footage for Property ${i + 1}`);
          return;
        }
        
        // For 8000+ sqft, require custom input
        if (sqft === '8000+' && (!customSqft || customSqft < 8000)) {
          alert(`Please enter exact square footage (minimum 8,000) for Property ${i + 1}`);
          return;
        }
        
        // Update property data (preserve coverage)
        booking.properties[i] = {
          address,
          type,
          squareFootage: sqft,
          customSqft: customSqft || '',
          bedrooms: beds || '0',
          bathrooms: baths || '0',
          notes: notes || '',
          coverage: coverage
        };
      }
      
      console.log('✅ Properties validated:', booking.properties);
      nextStep(2);
    }

    // STEP 2: REAL ESTATE SERVICE SELECTION
    function toggleRealEstateService(card, serviceId, basePrice) {
      // Toggle selection
      card.classList.toggle('selected');
      
      const isSelected = card.classList.contains('selected');
      
      // Service names
      const serviceNames = {
        'aerial': '📷 Aerial Photography',
        'indoor': '🏠 Indoor Photography',
        'lifestyle': '✨ Airbnb Lifestyle',
        'video': '🎬 Video Walkthrough',
        '3d-tour': '🏘️ 3D Virtual Walkthrough'
      };
      
      if (isSelected) {
        // Calculate actual price based on square footage for ALL services
        const actualPrice = calculateServicePrice(serviceId, basePrice);
        
        // Update the card's displayed price
        const priceElement = card.querySelector('.option-price');
        if (priceElement) {
          priceElement.innerHTML = `$${actualPrice}`;
        }
        
        booking.services.push({
          id: serviceId,
          name: serviceNames[serviceId],
          price: actualPrice,
          basePrice: basePrice
        });
        
        console.log(`✅ Added ${serviceNames[serviceId]}: $${actualPrice}`);
      } else {
        // Remove service and restore base price display
        booking.services = booking.services.filter(s => s.id !== serviceId);
        
        const priceElement = card.querySelector('.option-price');
        if (priceElement && serviceId !== 'aerial') { // Aerial is always $350 base
          priceElement.innerHTML = `$<span id="${serviceId}-price-value">${basePrice}</span>`;
        }
        
        console.log(`❌ Removed ${serviceNames[serviceId]}`);
      }
      
      // Calculate total
      booking.servicesPrice = booking.services.reduce((sum, s) => sum + s.price, 0);
      
      console.log('📋 All Services:', booking.services);
      console.log('💰 Total Services Price:', booking.servicesPrice);
      updatePreview(); // Use main preview function
    }

    function calculateServicePrice(serviceId, basePrice) {
      // Get average square footage across all properties
      let totalSqft = 0;
      let propertyCount = booking.properties.length;
      
      booking.properties.forEach(prop => {
        const sqft = prop.squareFootage;
        if (sqft === '0-1500') totalSqft += 1250;
        else if (sqft === '1501-3000') totalSqft += 2250;
        else if (sqft === '3001-5000') totalSqft += 4000;
        else if (sqft === '5001-8000') totalSqft += 6500;
        else if (sqft === '8000+' && prop.customSqft) totalSqft += parseInt(prop.customSqft);
        else if (sqft === '8000+') totalSqft += 10000;
      });
      
      const avgSqft = totalSqft / propertyCount;
      
      // Calculate price based on service type and square footage
      // All prices include 40-50% profit margin for hiring photographers/videographers
      
      if (serviceId === 'indoor') {
        // Indoor Photography - most labor intensive
        // 0-1500: 30-50 photos, 2hr shoot, 3hr edit = $150 cost
        // 1501-3000: 50-75 photos, 3hr shoot, 4hr edit = $210 cost
        // 3001-5000: 75-100 photos, 4hr shoot, 6hr edit = $300 cost
        // 5001-8000: 100-125 photos, 5hr shoot, 8hr edit = $420 cost
        // 8000+: 125-150+ photos, 6hr shoot, 10hr edit = $600 cost
        if (avgSqft <= 1500) return 250;   // $100 profit
        if (avgSqft <= 3000) return 350;   // $140 profit
        if (avgSqft <= 5000) return 500;   // $200 profit
        if (avgSqft <= 8000) return 700;   // $280 profit
        return 1000;                       // $400 profit
      }
      
      if (serviceId === 'aerial') {
        // Aerial/Drone Photography - fixed time regardless of size
        // All properties: 1hr shoot, 2hr edit = $180 cost
        // Pricing scales slightly with property size for premium appeal
        if (avgSqft <= 1500) return 350;   // $170 profit
        if (avgSqft <= 3000) return 400;   // $220 profit
        if (avgSqft <= 5000) return 450;   // $270 profit
        if (avgSqft <= 8000) return 500;   // $320 profit
        return 600;                        // $420 profit
      }
      
      if (serviceId === 'lifestyle') {
        // Airbnb Lifestyle - staged shots, detail work
        // 0-1500: 20-30 photos, 2hr shoot, 3hr edit = $150 cost
        // 1501-3000: 30-40 photos, 2.5hr shoot, 4hr edit = $195 cost
        // 3001-5000: 40-60 photos, 3hr shoot, 5hr edit = $240 cost
        // 5001-8000: 60-80 photos, 4hr shoot, 6hr edit = $300 cost
        // 8000+: 80-100+ photos, 5hr shoot, 8hr edit = $390 cost
        if (avgSqft <= 1500) return 450;   // $300 profit
        if (avgSqft <= 3000) return 600;   // $405 profit
        if (avgSqft <= 5000) return 800;   // $560 profit
        if (avgSqft <= 8000) return 1000;  // $700 profit
        return 1300;                       // $910 profit
      }
      
      if (serviceId === 'video') {
        // Video Walkthrough - high production value
        // 0-1500: 1-2min video, 3hr shoot, 6hr edit = $270 cost
        // 1501-3000: 2-3min video, 4hr shoot, 8hr edit = $360 cost
        // 3001-5000: 3-4min video, 5hr shoot, 10hr edit = $450 cost
        // 5001-8000: 4-5min video, 6hr shoot, 12hr edit = $540 cost
        // 8000+: 5-6min video, 8hr shoot, 15hr edit = $690 cost
        if (avgSqft <= 1500) return 500;   // $230 profit
        if (avgSqft <= 3000) return 700;   // $340 profit
        if (avgSqft <= 5000) return 900;   // $450 profit
        if (avgSqft <= 8000) return 1200;  // $660 profit
        return 1500;                       // $810 profit
      }
      
      if (serviceId === '3d-tour') {
        // 3D Virtual Walkthrough - Matterport scanning
        // 0-1500: 1hr scan, 2hr processing = $180 cost
        // 1501-3000: 2hr scan, 3hr processing = $300 cost
        // 3001-5000: 3hr scan, 4hr processing = $420 cost
        // 5001-8000: 4hr scan, 5hr processing = $540 cost
        // 8000+: 6hr scan, 6hr processing = $720 cost
        if (avgSqft <= 1500) return 350;   // $170 profit
        if (avgSqft <= 3000) return 550;   // $250 profit
        if (avgSqft <= 5000) return 750;   // $330 profit
        if (avgSqft <= 8000) return 950;   // $410 profit
        return 1200;                       // $480 profit
      }
      
      return basePrice; // Fallback to base price
    }

    function backToPropertyDetails() {
      nextStep('1b');
    }

    function validateStep2() {
      if (booking.services.length === 0) {
        alert('Please select at least one service');
        return;
      }
      
      console.log('✅ Services validated:', booking.services);
      nextStep(4); // Skip Step 3 (team size not needed for real estate)
    }

    // STEP NAVIGATION
    let currentStep = 1;

    function nextStep(step) {
      document.getElementById(`step${currentStep}`).classList.remove('active');
      currentStep = step;
      document.getElementById(`step${currentStep}`).classList.add('active');
      updateProgressBar();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // When entering Step 2, update pricing based on square footage
      if (step === 2) {
        updateStep2Pricing();
        
        // Clear all selected service cards (prices may have changed)
        document.querySelectorAll('#step2 .option-card').forEach(card => {
          card.classList.remove('selected');
        });
      }
      
      // When entering Step 6, populate contract
      if (step === 6) {
        populateContract();
      }
    }

    function updateStep2Pricing() {
      // Calculate prices for ALL services based on square footage
      const indoorPrice = calculateServicePrice('indoor', 250);
      const aerialPrice = calculateServicePrice('aerial', 350);
      const lifestylePrice = calculateServicePrice('lifestyle', 450);
      const videoPrice = calculateServicePrice('video', 500);
      const tourPrice = calculateServicePrice('3d-tour', 350);
      
      // Update displayed prices
      document.getElementById('indoor-price-value').textContent = indoorPrice;
      const aerialPriceEl = document.querySelector('#price-aerial');
      if (aerialPriceEl) aerialPriceEl.textContent = '$' + aerialPrice;
      
      const lifestylePriceEl = document.querySelector('#price-lifestyle');
      if (lifestylePriceEl) lifestylePriceEl.textContent = '$' + lifestylePrice;
      
      const videoPriceEl = document.querySelector('#price-video');
      if (videoPriceEl) videoPriceEl.textContent = '$' + videoPrice;
      
      const tourPriceEl = document.querySelector('#price-3d-tour');
      if (tourPriceEl) tourPriceEl.textContent = '$' + tourPrice;
      
      // Show square footage display
      let totalSqft = 0;
      let propertyCount = booking.properties.length;
      let sqftDisplayText = '';
      
      if (propertyCount === 1) {
        // Single property - show exact range or custom value
        const prop = booking.properties[0];
        const sqft = prop.squareFootage;
        
        if (sqft === '8000+' && prop.customSqft) {
          sqftDisplayText = `${parseInt(prop.customSqft).toLocaleString()} sq ft`;
        } else if (sqft === '0-1500') {
          sqftDisplayText = '0-1,500 sq ft';
        } else if (sqft === '1501-3000') {
          sqftDisplayText = '1,501-3,000 sq ft';
        } else if (sqft === '3001-5000') {
          sqftDisplayText = '3,001-5,000 sq ft';
        } else if (sqft === '5001-8000') {
          sqftDisplayText = '5,001-8,000 sq ft';
        } else if (sqft === '8000+') {
          sqftDisplayText = '8,000+ sq ft';
        }
        
        // Calculate for pricing
        if (sqft === '0-1500') totalSqft = 1250;
        else if (sqft === '1501-3000') totalSqft = 2250;
        else if (sqft === '3001-5000') totalSqft = 4000;
        else if (sqft === '5001-8000') totalSqft = 6500;
        else if (sqft === '8000+' && prop.customSqft) totalSqft = parseInt(prop.customSqft);
        else if (sqft === '8000+') totalSqft = 10000;
      } else {
        // Multiple properties - show average
        booking.properties.forEach(prop => {
          const sqft = prop.squareFootage;
          if (sqft === '0-1500') totalSqft += 1250;
          else if (sqft === '1501-3000') totalSqft += 2250;
          else if (sqft === '3001-5000') totalSqft += 4000;
          else if (sqft === '5001-8000') totalSqft += 6500;
          else if (sqft === '8000+' && prop.customSqft) totalSqft += parseInt(prop.customSqft);
          else if (sqft === '8000+') totalSqft += 10000;
        });
        
        const avgSqft = Math.round(totalSqft / propertyCount);
        sqftDisplayText = `${avgSqft.toLocaleString()} sq ft average`;
      }
      
      const sqftDisplay = document.getElementById('sqft-display');
      if (sqftDisplay) {
        sqftDisplay.textContent = sqftDisplayText;
      }
      
      console.log('💰 Step 2 Pricing Updated:');
      console.log(`   Indoor: $${indoorPrice}`);
      console.log(`   Aerial: $${aerialPrice}`);
      console.log(`   Lifestyle: $${lifestylePrice}`);
      console.log(`   Video: $${videoPrice}`);
      console.log(`   3D Tour: $${tourPrice}`);
      console.log(`   Display: ${sqftDisplayText}`);
    }

    function prevStep(step) {
      document.getElementById(`step${currentStep}`).classList.remove('active');
      currentStep = step;
      document.getElementById(`step${currentStep}`).classList.add('active');
      updateProgressBar();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function updateProgressBar() {
      const progress = (currentStep / 7) * 100;
      document.getElementById('progressBar').style.width = progress + '%';
    }

    // STEP 1: VALIDATION
    function validateStep1() {
      const eventName = document.getElementById('eventName').value.trim();
      const eventDate = document.getElementById('eventDate').value;
      const eventType = document.getElementById('eventType').value;
      const location = document.getElementById('eventLocation').value.trim();

      if (!eventName) {
        alert('Please enter your event name');
        return;
      }
      if (!eventDate) {
        alert('Please select your event date');
        return;
      }
      if (!eventType) {
        alert('Please select your event type');
        return;
      }
      if (!location) {
        alert('Please enter your venue/location');
        return;
      }

      booking.eventName = eventName;
      booking.eventDate = eventDate;
      booking.eventType = eventType;
      booking.location = location;
      booking.attendance = document.getElementById('attendance').value;

      nextStep(2);
    }

    // STEP 2: COVERAGE SELECTION
    function selectCoverage(card, coverage, price, hours, imageCount) {
      document.querySelectorAll('#step2 .option-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      
      booking.coverage = coverage;
      booking.coveragePrice = price;
      booking.coverageHours = hours;
      booking.coverageImages = imageCount || 0;
      booking.numberOfDays = 1;

      // Show/hide multi-day options
      if (coverage === 'multi-day') {
        document.getElementById('multiDayOptions').style.display = 'block';
        calculateMultiDay();
      } else {
        document.getElementById('multiDayOptions').style.display = 'none';
        updatePreview();
      }
    }

    function calculateMultiDay() {
      const days = parseInt(document.getElementById('numberOfDays').value);
      booking.numberOfDays = days;
      // Multi-day pricing: $3,900 per day
      booking.coveragePrice = days * 3900;
      booking.coverageImages = days * 800; // 800 images per day
      
      // Recalculate team price for multi-day
      booking.teamPrice = booking.teamBasePrice * days;
      
      // Recalculate video price for multi-day
      if (booking.videoPackages.length > 0) {
        booking.videoPrice = booking.videoPackages.reduce((sum, pkg) => sum + (pkg.price * days), 0);
      }
      
      updatePreview();
    }

    // STEP 3: TEAM SIZE
    function selectTeamSize(card, size, basePrice) {
      document.querySelectorAll('.team-option').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      
      booking.teamSize = size;
      booking.teamBasePrice = basePrice;
      // Multiply by number of days
      booking.teamPrice = basePrice * booking.numberOfDays;
      
      updatePreview();
    }

    function toggleVideoPackage(packageId, packagePrice) {
      const checked = document.getElementById(packageId).checked;
      
      if (checked) {
        booking.videoPackages.push({ id: packageId, price: packagePrice });
      } else {
        booking.videoPackages = booking.videoPackages.filter(p => p.id !== packageId);
      }
      
      // Multiply by number of days
      booking.videoPrice = booking.videoPackages.reduce((sum, pkg) => sum + (pkg.price * booking.numberOfDays), 0);
      updatePreview();
    }

    // STEP 4: ADDONS
    function toggleRealEstateAddon(addonId, price) {
      const checked = document.getElementById(addonId).checked;
      
      const addonNames = {
        'rushDelivery': '24-Hour Rush Delivery',
        'twilightPhotos': 'Twilight Photography',
        'floorPlan': '2D Floor Plan',
        'virtualStaging': 'Virtual Staging',
        'hdrEditing': 'Advanced HDR Editing',
        'skyReplacement': 'Blue Sky Replacement',
        'itemRemoval': 'Object Removal',
        'propertyWebsite': 'Single-Property Website',
        'socialMediaKit': 'Social Media Marketing Kit'
      };
      
      if (checked) {
        booking.addons.push({ 
          id: addonId, 
          name: addonNames[addonId],
          price: price 
        });
      } else {
        booking.addons = booking.addons.filter(a => a.id !== addonId);
      }
      
      booking.addonsPrice = booking.addons.reduce((sum, a) => sum + a.price, 0);
      console.log('📦 Add-ons:', booking.addons, 'Total:', booking.addonsPrice);
      updatePreview();
    }

    function updateUSBQuantity() {
      const quantity = parseInt(document.getElementById('usbQuantity').value) || 0;
      booking.usbQuantity = quantity;
      
      // Real Estate pricing: $125 first, $75 each additional
      if (quantity === 0) {
        booking.usbPrice = 0;
      } else if (quantity === 1) {
        booking.usbPrice = 125;
      } else {
        booking.usbPrice = 125 + ((quantity - 1) * 75);
      }
      
      document.getElementById('usbPriceDisplay').textContent = '$' + booking.usbPrice.toLocaleString();
      updatePreview();
    }

    // STEP 5: VALIDATION
    function validateStep5() {
      const companyName = document.getElementById('companyName').value.trim();
      const contactName = document.getElementById('contactName').value.trim();
      const contactTitle = document.getElementById('contactTitle').value.trim();
      const contactEmail = document.getElementById('contactEmail').value.trim();
      const contactPhone = document.getElementById('contactPhone').value.trim();

      if (!companyName) {
        alert('Please enter your company name');
        return;
      }
      if (!contactName) {
        alert('Please enter contact person name');
        return;
      }
      if (!contactTitle) {
        alert('Please enter contact person title');
        return;
      }
      if (!contactEmail) {
        alert('Please enter email address');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contactEmail)) {
        alert('Please enter a valid email address');
        return;
      }
      if (!contactPhone) {
        alert('Please enter phone number');
        return;
      }

      booking.companyName = companyName;
      booking.contactName = contactName;
      booking.contactTitle = contactTitle;
      booking.contactEmail = contactEmail;
      booking.contactPhone = contactPhone;
      booking.billingAddress = document.getElementById('billingAddress').value.trim();
      booking.poNumber = document.getElementById('poNumber').value.trim();

      nextStep(6);
    }

    // PREVIEW SIDEBAR UPDATE
    function updatePreview() {
      // For Real Estate: Show property count
      let coverageText = booking.propertyCount > 0 
        ? `${booking.propertyCount} ${booking.propertyCount === 1 ? 'Property' : 'Properties'}`
        : 'Not selected';
      document.getElementById('previewCoverage').textContent = coverageText;

      // Team size (not used for real estate, but keep for compatibility)
      let teamText = 'Not applicable';
      document.getElementById('previewTeam').textContent = teamText;

      // Services & Addons
      const addonsContainer = document.getElementById('previewAddons');
      if (!addonsContainer) return; // Safety check
      addonsContainer.innerHTML = '';
      
      // Show selected services
      if (booking.services && booking.services.length > 0) {
        booking.services.forEach(service => {
          addonsContainer.innerHTML += `
            <div class="preview-item">
              <span class="preview-label">${service.name}</span>
              <span class="preview-value">$${service.price.toLocaleString()}</span>
            </div>
          `;
        });
      }
      
      // Show selected addons
      if (booking.addons && booking.addons.length > 0) {
        booking.addons.forEach(addon => {
          addonsContainer.innerHTML += `
            <div class="preview-item">
              <span class="preview-label">${addon.name}</span>
              <span class="preview-value">+$${addon.price.toLocaleString()}</span>
            </div>
          `;
        });
      }
      
      // Show USB drives if any
      if (booking.usbQuantity > 0) {
        addonsContainer.innerHTML += `
          <div class="preview-item">
            <span class="preview-label">USB Drives (${booking.usbQuantity})</span>
            <span class="preview-value">+$${booking.usbPrice.toLocaleString()}</span>
          </div>
        `;
      }

      // Calculate total
      let total = 0;
      
      // Add services price
      if (booking.services && booking.services.length > 0) {
        total = booking.services.reduce((sum, service) => sum + service.price, 0);
      }
      
      // Add addons price
      if (booking.addons && booking.addons.length > 0) {
        total += booking.addons.reduce((sum, addon) => sum + addon.price, 0);
      }
      
      // Add USB price
      if (booking.usbPrice > 0) {
        total += booking.usbPrice;
      }
      
      // Update display
      document.getElementById('previewTotal').textContent = total > 0 ? '$' + total.toLocaleString() : '$0';
      
      const deposit = total > 0 ? Math.round(total * 0.5) : 0;
      document.getElementById('previewDeposit').textContent = '$' + deposit.toLocaleString();
    }
    
    // STEP 6: CONTRACT & SIGNATURE
    function populateContract() {
      // Set contract date
      const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      document.getElementById('contractDate').textContent = today;
      document.getElementById('signatureDate').textContent = today;
      
      // Set client name
      const clientName = document.getElementById('contactName')?.value || 'Client Name';
      const companyName = document.getElementById('companyName')?.value || '';
      document.getElementById('contractClientName').textContent = companyName ? `${clientName} (${companyName})` : clientName;
      
      // Populate services list
      const servicesHtml = booking.services.map(s => `<li>${s.name}: <strong>$${s.price.toLocaleString()}</strong></li>`).join('');
      document.getElementById('contractServices').innerHTML = servicesHtml;
      
      // Populate properties list
      const propertiesHtml = booking.properties.map((p, i) => `
        <p style="margin: 8px 0;"><strong>Property ${i + 1}:</strong> ${p.address}<br>
        <span style="font-size: 13px; color: var(--secondary);">Type: ${p.type} | Size: ${p.squareFootage === '8000+' && p.customSqft ? p.customSqft + ' sq ft' : p.squareFootage} | Coverage: ${p.coverage || 'interior'}</span></p>
      `).join('');
      document.getElementById('contractProperties').innerHTML = propertiesHtml;
      
      // Populate totals
      let total = booking.services.reduce((sum, s) => sum + s.price, 0);
      if (booking.addons && booking.addons.length > 0) {
        total += booking.addons.reduce((sum, a) => sum + a.price, 0);
      }
      if (booking.usbPrice > 0) {
        total += booking.usbPrice;
      }
      
      const deposit = Math.round(total * 0.5);
      document.getElementById('contractTotal').textContent = '$' + total.toLocaleString();
      document.getElementById('contractDeposit').textContent = '$' + deposit.toLocaleString();
    }
    
    function validateSignature() {
      const agreed = document.getElementById('agreeToTerms').checked;
      
      if (!agreed) {
        alert('Please check the box to agree to the terms');
        return;
      }
      
      const signMethod = document.querySelector('input[name="signMethod"]:checked').value;
      let signature;
      
      if (signMethod === 'type') {
        signature = document.getElementById('signatureName').value.trim();
        if (!signature || signature.length < 3) {
          alert('Please type your full legal name to sign the agreement');
          return;
        }
      } else {
        // Check if signature canvas exists and has been drawn on
        const canvas = document.getElementById('signatureCanvas');
        
        if (!canvas) {
          alert('Canvas not found. Please refresh the page.');
          return;
        }
        
        // Ensure canvas has proper dimensions
        if (canvas.width === 0 || canvas.height === 0) {
          canvas.width = 600;
          canvas.height = 150;
          console.log('⚠️ Canvas dimensions were 0, reset to 600x150');
        }
        
        const blankCanvas = document.createElement('canvas');
        blankCanvas.width = canvas.width;
        blankCanvas.height = canvas.height;
        signature = canvas.toDataURL();
        const blankSignature = blankCanvas.toDataURL();
        
        if (!signature || signature === blankSignature) {
          alert('Please draw your signature on the canvas');
          return;
        }
      }
      
      booking.signature = signature;
      booking.signMethod = signMethod;
      booking.signatureDate = new Date().toISOString();
      
      console.log('✅ Agreement signed');
      
      // Update payment step with signature info
      document.getElementById('finalSignatureName').textContent = booking.realtorName || 'Realtor';
      document.getElementById('finalSignDate').textContent = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      
      populatePaymentSummary();
      nextStep(7);
    }
    
    // Update signature preview as user types
    document.addEventListener('DOMContentLoaded', function() {
      const signatureInput = document.getElementById('signatureName');
      if (signatureInput) {
        signatureInput.addEventListener('input', function() {
          document.getElementById('signaturePreview').textContent = this.value || 'Your Name';
        });
      }
    });
    
    // STEP 7: PAYMENT
    function populatePaymentSummary() {
      // Properties
      const propertiesHtml = booking.properties.map((p, i) => `
        <div style="display: flex; justify-content: space-between; margin: 8px 0; font-size: 14px;">
          <span>${i + 1}. ${p.address}</span>
          <span style="color: var(--secondary);">${p.squareFootage === '8000+' && p.customSqft ? p.customSqft + ' sq ft' : p.squareFootage}</span>
        </div>
      `).join('');
      document.getElementById('paymentProperties').innerHTML = propertiesHtml;
      
      // Services
      const servicesHtml = booking.services.map(s => `
        <div style="display: flex; justify-content: space-between; margin: 8px 0; font-size: 14px;">
          <span>${s.name}</span>
          <span>$${s.price.toLocaleString()}</span>
        </div>
      `).join('');
      document.getElementById('paymentServices').innerHTML = servicesHtml;
      
      // Add-ons
      if (booking.addons && booking.addons.length > 0) {
        let addonsHtml = booking.addons.map(a => `
          <div style="display: flex; justify-content: space-between; margin: 8px 0; font-size: 14px;">
            <span>${a.name}</span>
            <span>$${a.price.toLocaleString()}</span>
          </div>
        `).join('');
        
        if (booking.usbQuantity > 0) {
          addonsHtml += `
            <div style="display: flex; justify-content: space-between; margin: 8px 0; font-size: 14px;">
              <span>USB Drives (${booking.usbQuantity})</span>
              <span>$${booking.usbPrice.toLocaleString()}</span>
            </div>
          `;
        }
        
        document.getElementById('paymentAddons').innerHTML = addonsHtml;
        document.getElementById('paymentAddonsSection').style.display = 'block';
      }
      
      // Calculate total
      let total = booking.services.reduce((sum, s) => sum + s.price, 0);
      if (booking.addons && booking.addons.length > 0) {
        total += booking.addons.reduce((sum, a) => sum + a.price, 0);
      }
      if (booking.usbPrice > 0) {
        total += booking.usbPrice;
      }
      
      const deposit = Math.round(total * 0.5);
      document.getElementById('paymentTotal').textContent = '$' + total.toLocaleString();
      document.getElementById('paymentDeposit').textContent = '$' + deposit.toLocaleString();
    }
    
    function downloadAgreement() {
      const total = booking.services.reduce((sum, s) => sum + s.price, 0) + 
                   (booking.addons ? booking.addons.reduce((sum, a) => sum + a.price, 0) : 0) + 
                   (booking.usbPrice || 0);
      const deposit = Math.round(total * 0.5);
      
      // Get the actual contract HTML from the page
      const contractDiv = document.querySelector('#step6 > div:nth-child(3)');
      const contractHTML = contractDiv ? contractDiv.innerHTML : '';
      
      // Generate PDF content with ACTUAL CONTRACT (concatenated to avoid template literal issues)
      const htmlStart = '<!DOCTYPE html><html><head><meta charset="UTF-8">' +
        '<title>Real Estate Photography Agreement - ' + (booking.realtorName || 'Client') + '</title>' +
        '<style>' +
        'body { font-family: "Helvetica Neue", "Arial", sans-serif; padding: 60px; line-height: 1.9; color: #333; font-weight: 300; }' +
        'h3 { font-size: 32px; font-weight: 300; text-align: center; text-transform: uppercase; letter-spacing: 4px; color: #4794A6; margin-bottom: 48px; }' +
        'h4 { font-size: 18px; font-weight: 300; text-transform: uppercase; letter-spacing: 3px; color: #4794A6; border-bottom: 1px solid rgba(71, 148, 166, 0.3); padding-bottom: 12px; margin: 32px 0 20px 0; }' +
        'p { margin-bottom: 12px; font-weight: 300; line-height: 1.9; }' +
        'strong { font-weight: 400; }' +
        '.logo-section { text-align: center; margin-bottom: 40px; }' +
        '.signature-section { margin-top: 60px; padding-top: 40px; border-top: 2px solid rgba(71, 148, 166, 0.2); }' +
        '.signature-line { border-bottom: 2px solid #333; width: 400px; margin: 24px auto; padding: 12px 0; text-align: center; font-family: "Brush Script MT", cursive; font-size: 28px; }' +
        '.signature-image { max-width: 400px; margin: 0 auto; display: block; border: 2px solid #4794A6; border-radius: 8px; padding: 12px; }' +
        '</style></head><body>' +
        '<div class="logo-section"><h3>ACROMATICO</h3></div>';
      
      const signatureHTML = '<div class="signature-section">' +
        '<h4 style="text-align: center; margin-bottom: 32px;">Signed Agreement</h4>' +
        (booking.signMethod === 'draw' ? 
          '<img src="' + booking.signature + '" class="signature-image" alt="Signature" />' : 
          '<div class="signature-line">' + booking.signature + '</div>') +
        '<p style="text-align: center; font-size: 14px; color: #666; margin-top: 16px;">' +
        'Signed by ' + (booking.realtorName || 'Client') + ' on ' + new Date(booking.signatureDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) +
        '</p></div>';
      
      const htmlEnd = '</body></html>';
      
      const agreementHTML = htmlStart + contractHTML + signatureHTML + htmlEnd;
      
      // Create a blob and download
      const blob = new Blob([agreementHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Acromatico-RealEstate-Agreement-${booking.realtorName || 'Client'}-${new Date().toISOString().split('T')[0]}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      console.log('📥 Agreement downloaded');
    }

    function selectPaymentMethod(method, element) {
      // Remove selected state from all
      document.querySelectorAll('.payment-option').forEach(opt => {
        opt.style.borderColor = 'var(--border)';
        opt.style.background = 'white';
      });
      
      // Add selected state
      element.style.borderColor = 'var(--accent)';
      element.style.background = 'rgba(71, 148, 166, 0.05)';
      
      // Check radio
      element.querySelector('input[type="radio"]').checked = true;
      booking.paymentMethod = method;
      
      console.log('💳 Payment method selected:', method);
    }
    
    function completeBooking() {
      if (!booking.paymentMethod) {
        alert('Please select a payment method');
        return;
      }
      
      console.log('🎉 BOOKING COMPLETE!', booking);
      
      // Show success message
      alert('🎉 Booking Complete!\n\nThank you for choosing Acromatico! You will receive a confirmation email shortly with:\n\n• Booking confirmation details\n• Scheduling information\n• Payment receipt\n• Access to your client portal\n\nWe look forward to photographing your properties!');
      
      // In production, this would submit to your backend
      // For now, just log the booking data
      console.log('Booking data ready for submission:', JSON.stringify(booking, null, 2));
    }

    // SIGNATURE CANVAS
    let signatureCanvas;
    let signatureCtx;
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    
    function initCanvas() {
      signatureCanvas = document.getElementById('signatureCanvas');
      if (!signatureCanvas) {
        console.error('❌ Canvas element not found');
        return;
      }
      signatureCtx = signatureCanvas.getContext('2d');
      
      // Set canvas actual size
      signatureCanvas.width = 600;
      signatureCanvas.height = 150;
      
      // Set drawing style
      signatureCtx.strokeStyle = '#000000';
      signatureCtx.lineWidth = 2;
      signatureCtx.lineCap = 'round';
      signatureCtx.lineJoin = 'round';
      
      console.log('✅ Canvas initialized!', signatureCanvas.width, 'x', signatureCanvas.height);
      
      // Add event listeners
      signatureCanvas.addEventListener('mousedown', onMouseDown);
      signatureCanvas.addEventListener('mousemove', onMouseMove);
      signatureCanvas.addEventListener('mouseup', onMouseUp);
      signatureCanvas.addEventListener('mouseleave', onMouseUp);
      
      signatureCanvas.addEventListener('touchstart', onTouchStart);
      signatureCanvas.addEventListener('touchmove', onTouchMove);
      signatureCanvas.addEventListener('touchend', onTouchEnd);
    }
    
    function getMousePos(e) {
      const rect = signatureCanvas.getBoundingClientRect();
      const scaleX = signatureCanvas.width / rect.width;
      const scaleY = signatureCanvas.height / rect.height;
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
    }
    
    function getTouchPos(e) {
      const rect = signatureCanvas.getBoundingClientRect();
      const scaleX = signatureCanvas.width / rect.width;
      const scaleY = signatureCanvas.height / rect.height;
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY
      };
    }
    
    function onMouseDown(e) {
      e.preventDefault();
      isDrawing = true;
      const pos = getMousePos(e);
      lastX = pos.x;
      lastY = pos.y;
      console.log('🖊️ Started drawing at', lastX, lastY);
    }
    
    function onMouseMove(e) {
      if (!isDrawing) return;
      e.preventDefault();
      const pos = getMousePos(e);
      
      signatureCtx.beginPath();
      signatureCtx.moveTo(lastX, lastY);
      signatureCtx.lineTo(pos.x, pos.y);
      signatureCtx.stroke();
      
      lastX = pos.x;
      lastY = pos.y;
    }
    
    function onMouseUp(e) {
      if (!isDrawing) return;
      isDrawing = false;
      console.log('✋ Stopped drawing');
    }
    
    function onTouchStart(e) {
      e.preventDefault();
      isDrawing = true;
      const pos = getTouchPos(e);
      lastX = pos.x;
      lastY = pos.y;
      console.log('📱 Touch started at', lastX, lastY);
    }
    
    function onTouchMove(e) {
      if (!isDrawing) return;
      e.preventDefault();
      const pos = getTouchPos(e);
      
      signatureCtx.beginPath();
      signatureCtx.moveTo(lastX, lastY);
      signatureCtx.lineTo(pos.x, pos.y);
      signatureCtx.stroke();
      
      lastX = pos.x;
      lastY = pos.y;
    }
    
    function onTouchEnd(e) {
      if (!isDrawing) return;
      e.preventDefault();
      isDrawing = false;
      console.log('✋ Touch ended');
    }
    
    function clearSignature() {
      if (!signatureCtx || !signatureCanvas) {
        console.error('❌ Canvas not initialized!');
        return;
      }
      signatureCtx.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
      console.log('🗑️ Signature cleared');
    }
    
    function switchSignMethod(method) {
      if (method === 'type') {
        document.getElementById('typeSignature').style.display = 'block';
        document.getElementById('drawSignature').style.display = 'none';
      } else {
        document.getElementById('typeSignature').style.display = 'none';
        document.getElementById('drawSignature').style.display = 'block';
        initCanvas();
      }
    }

    // Initialize
    updatePreview();
