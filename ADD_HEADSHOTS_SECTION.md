# ADD HEADSHOTS & SERVICE CATEGORIES

## 1. Add Service Category Selector (Insert after line 2383, before packages)

```html
<!-- SERVICE CATEGORIES SELECTOR -->
<div style="max-width: 1200px; margin: 80px auto 60px; padding: 0 40px;">
  <h2 style="font-size: clamp(32px, 5vw, 48px); font-weight: 700; text-align: center; margin-bottom: 16px; letter-spacing: -0.02em;">Choose Your Experience</h2>
  <p style="text-align: center; font-size: 17px; color: #6e6e73; margin-bottom: 48px; max-width: 700px; margin-left: auto; margin-right: auto;">From weddings to personal branding, we create authentic visual stories that last.</p>
  
  <div class="service-categories-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
    
    <!-- PORTRAITS -->
    <div class="service-category-card" onclick="selectService('portraits')" style="background: linear-gradient(135deg, #f5f5f7 0%, #ffffff 100%); border: 2px solid #d2d2d7; border-radius: 20px; padding: 32px; cursor: pointer; transition: all 0.3s; position: relative;">
      <div style="font-size: 40px; margin-bottom: 16px;">👨‍👩‍👧‍👦</div>
      <h3 style="font-size: 22px; font-weight: 700; margin-bottom: 8px; color: #1d1d1f;">Portraits</h3>
      <p style="font-size: 15px; color: #6e6e73; line-height: 1.6;">Family, maternity, newborn & lifestyle sessions that capture your story.</p>
      <div style="margin-top: 20px; font-size: 13px; color: #0071e3; font-weight: 600;">Starting at $695 →</div>
    </div>
    
    <!-- HEADSHOTS -->
    <div class="service-category-card" onclick="selectService('headshots')" style="background: linear-gradient(135deg, #fff9f0 0%, #ffffff 100%); border: 2px solid #ffcc80; border-radius: 20px; padding: 32px; cursor: pointer; transition: all 0.3s; position: relative; box-shadow: 0 4px 16px rgba(255,149,0,0.15);">
      <div style="font-size: 40px; margin-bottom: 16px;">💼</div>
      <h3 style="font-size: 22px; font-weight: 700; margin-bottom: 8px; color: #1d1d1f;">Headshots</h3>
      <p style="font-size: 15px; color: #6e6e73; line-height: 1.6;">Professional headshots for real estate, corporate & personal branding.</p>
      <div style="margin-top: 20px; font-size: 13px; color: #ff9500; font-weight: 600;">Starting at $695 →</div>
    </div>
    
    <!-- REAL ESTATE -->
    <div class="service-category-card" onclick="selectService('real-estate')" style="background: linear-gradient(135deg, #f5f5f7 0%, #ffffff 100%); border: 2px solid #d2d2d7; border-radius: 20px; padding: 32px; cursor: pointer; transition: all 0.3s; position: relative;">
      <div style="font-size: 40px; margin-bottom: 16px;">🏡</div>
      <h3 style="font-size: 22px; font-weight: 700; margin-bottom: 8px; color: #1d1d1f;">Real Estate</h3>
      <p style="font-size: 15px; color: #6e6e73; line-height: 1.6;">Property photography that sells—residential & commercial listings.</p>
      <div style="margin-top: 20px; font-size: 13px; color: #0071e3; font-weight: 600;">Custom Pricing →</div>
    </div>
    
    <!-- WEDDINGS -->
    <div class="service-category-card" onclick="selectService('weddings')" style="background: linear-gradient(135deg, #f5f5f7 0%, #ffffff 100%); border: 2px solid #d2d2d7; border-radius: 20px; padding: 32px; cursor: pointer; transition: all 0.3s; position: relative;">
      <div style="font-size: 40px; margin-bottom: 16px;">💍</div>
      <h3 style="font-size: 22px; font-weight: 700; margin-bottom: 8px; color: #1d1d1f;">Weddings</h3>
      <p style="font-size: 15px; color: #6e6e73; line-height: 1.6;">Full wedding day coverage—authentic moments, timeless memories.</p>
      <div style="margin-top: 20px; font-size: 13px; color: #0071e3; font-weight: 600;">Starting at $2,400 →</div>
    </div>
    
    <!-- EVENTS -->
    <div class="service-category-card" onclick="selectService('events')" style="background: linear-gradient(135deg, #f5f5f7 0%, #ffffff 100%); border: 2px solid #d2d2d7; border-radius: 20px; padding: 32px; cursor: pointer; transition: all 0.3s; position: relative;">
      <div style="font-size: 40px; margin-bottom: 16px;">🎉</div>
      <h3 style="font-size: 22px; font-weight: 700; margin-bottom: 8px; color: #1d1d1f;">Events</h3>
      <p style="font-size: 15px; color: #6e6e73; line-height: 1.6;">Corporate events, celebrations & special occasions captured beautifully.</p>
      <div style="margin-top: 20px; font-size: 13px; color: #0071e3; font-weight: 600;">Custom Pricing →</div>
    </div>
    
    <!-- COMMERCIAL -->
    <div class="service-category-card" onclick="selectService('commercial')" style="background: linear-gradient(135deg, #f5f5f7 0%, #ffffff 100%); border: 2px solid #d2d2d7; border-radius: 20px; padding: 32px; cursor: pointer; transition: all 0.3s; position: relative;">
      <div style="font-size: 40px; margin-bottom: 16px;">📸</div>
      <h3 style="font-size: 22px; font-weight: 700; margin-bottom: 8px; color: #1d1d1f;">Commercial</h3>
      <p style="font-size: 15px; color: #6e6e73; line-height: 1.6;">Brand campaigns, product photography & commercial content creation.</p>
      <div style="margin-top: 20px; font-size: 13px; color: #0071e3; font-weight: 600;">Custom Pricing →</div>
    </div>
    
  </div>
</div>

<style>
.service-category-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 36px rgba(0,0,0,0.15) !important;
  border-color: #0071e3 !important;
}
</style>

<script>
function selectService(service) {
  // Smooth scroll to packages
  document.getElementById('packages').scrollIntoView({ behavior: 'smooth', block: 'start' });
  
  // Update package type based on service
  if (service === 'weddings') {
    showPackageType('wedding');
  } else if (service === 'portraits' || service === 'headshots') {
    showPackageType('portraits');
  } else {
    // For Real Estate, Events, Commercial - show contact/custom builder
    alert(`${service.charAt(0).toUpperCase() + service.slice(1)} photography requires custom pricing. Please contact us for a tailored quote.`);
  }
}
</script>
```

## 2. Add Headshots Packages (Insert after line 2529, in education packages section)

After the education packages, add:

```html
      <!-- PORTRAIT & HEADSHOTS PACKAGES (Initially hidden) -->
      <div class="packages-grid" id="portraitsPackages" style="display: none;">
        
        <!-- PORTRAIT STARTER -->
        <div class="package-card" onclick="selectPackage('Portrait Starter', 695, 'portrait', this)">
          <div class="package-badge">SELECTED</div>
          <div class="package-name">Portrait Starter</div>
          <div class="package-subtitle">Perfect for Families & Maternity</div>
          <div class="package-price">
            <div class="price-amount">$695</div>
          </div>
          <ul class="package-features">
            <li><strong>1-hour session</strong></li>
            <li>1 location of your choice</li>
            <li>50-80 edited images (color & B&W)</li>
            <li>Online gallery + downloads</li>
            <li>Print release included</li>
          </ul>
          <button class="select-btn">Select & Customize</button>
        </div>

        <!-- HEADSHOTS ESSENTIAL -->
        <div class="package-card" style="border: 3px solid #ff9500; background: linear-gradient(135deg, #fff9f0 0%, #ffffff 100%); box-shadow: 0 8px 32px rgba(255,149,0,0.2);" onclick="selectPackage('Headshots Essential', 695, 'headshots', this)">
          <div class="package-badge" style="background: #ff9500;">PERSONAL BRANDING</div>
          <div class="package-name">Headshots Essential</div>
          <div class="package-subtitle">Real Estate · Corporate · LinkedIn</div>
          <div class="package-price">
            <div class="price-amount" style="color: #ff9500;">$695</div>
          </div>
          <ul class="package-features">
            <li><strong>1-hour professional headshot session</strong></li>
            <li>Multiple outfits & backgrounds</li>
            <li><strong>50-80 images for social branding, website & LinkedIn</strong></li>
            <li>Lifestyle shots for personal brand storytelling</li>
            <li>Online gallery + high-res downloads</li>
            <li>Print release included</li>
          </ul>
          <button class="select-btn" style="background: #ff9500;">Select & Customize</button>
        </div>

        <!-- PORTRAIT PREMIUM -->
        <div class="package-card" onclick="selectPackage('Portrait Premium', 1095, 'portrait', this)">
          <div class="package-badge">SELECTED</div>
          <div class="package-name">Portrait Premium</div>
          <div class="package-subtitle">Extended Sessions & Albums</div>
          <div class="package-price">
            <div class="price-amount">$1,095</div>
          </div>
          <ul class="package-features">
            <li><strong>2-hour extended session</strong></li>
            <li>2 locations</li>
            <li>100+ edited images</li>
            <li><strong>✓ 10x10 Premium Album included</strong></li>
            <li>Online gallery + downloads</li>
            <li>Print release & wall art credit</li>
          </ul>
          <button class="select-btn">Select & Customize</button>
        </div>

        <!-- HEADSHOTS PRO BRANDING -->
        <div class="package-card" style="border: 3px solid #ff9500; background: linear-gradient(135deg, #fff9f0 0%, #ffffff 100%); box-shadow: 0 8px 32px rgba(255,149,0,0.2);" onclick="selectPackage('Headshots Pro Branding', 1095, 'headshots', this)">
          <div class="package-badge" style="background: #ff9500;">PRO BRANDING</div>
          <div class="package-name">Headshots Pro Branding</div>
          <div class="package-subtitle">Complete Personal Brand Package</div>
          <div class="package-price">
            <div class="price-amount" style="color: #ff9500;">$1,095</div>
          </div>
          <ul class="package-features">
            <li><strong>2-hour extended branding session</strong></li>
            <li>Multiple locations & outfit changes</li>
            <li><strong>100+ images optimized for all platforms</strong></li>
            <li>Lifestyle, candid & professional headshots</li>
            <li><strong>✓ Social media graphics pack (10 templates)</strong></li>
            <li>Online gallery + high-res downloads</li>
            <li>Print release & branding consultation</li>
          </ul>
          <button class="select-btn" style="background: #ff9500;">Select & Customize</button>
        </div>
        
      </div>
```

## 3. Update showPackageType function to handle portraits

Find the `showPackageType()` function and update it to show/hide portraits packages:

```javascript
function showPackageType(type) {
  const weddingTab = document.getElementById('weddingTab');
  const educationTab = document.getElementById('educationTab');
  const portraitsTab = document.getElementById('portraitsTab'); // Add if exists
  
  const weddingPackages = document.getElementById('weddingPackages');
  const educationPackages = document.getElementById('educationPackages');
  const portraitsPackages = document.getElementById('portraitsPackages');
  
  if (type === 'wedding') {
    weddingPackages.style.display = 'grid';
    educationPackages.style.display = 'none';
    portraitsPackages.style.display = 'none';
    weddingTab.style.background = '#0071e3';
    weddingTab.style.color = 'white';
    educationTab.style.background = '#f5f5f7';
    educationTab.style.color = '#1d1d1f';
  } else if (type === 'education') {
    weddingPackages.style.display = 'none';
    educationPackages.style.display = 'grid';
    portraitsPackages.style.display = 'none';
    educationTab.style.background = '#0071e3';
    educationTab.style.color = 'white';
    weddingTab.style.background = '#f5f5f7';
    weddingTab.style.color = '#1d1d1f';
  } else if (type === 'portraits') {
    weddingPackages.style.display = 'none';
    educationPackages.style.display = 'none';
    portraitsPackages.style.display = 'grid';
  }
}
```

## 4. Add Portraits tab button (line 2394, after educationTab)

```html
<button onclick="showPackageType('portraits')" id="portraitsTab" style="padding: 14px 36px; background: #f5f5f7; color: #1d1d1f; border: 2px solid #d2d2d7; border-radius: 24px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s;">📸 Portrait & Headshots</button>
```
