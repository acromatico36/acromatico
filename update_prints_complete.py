#!/usr/bin/env python3
"""
Comprehensive update of ALL print sections in photography-apple-ux.html
"""

with open('public/static/photography-apple-ux.html', 'r') as f:
    content = f.read()

# Count changes
changes = 0

# 1. Remove all Canvas Pro 20x30 cards (lines 2662-2700)
old_canvas_pro_20x30 = '''              <!-- CANVAS PRO 20x30 with FRAME OPTIONS -->
              <div class="wall-art-product-card" data-product="canvas_pro_20x30" data-base-price="650">
                <label class="wall-art-card" style="cursor: pointer; border: 2px solid #e5e5e5; border-radius: 16px; overflow: hidden; transition: all 0.3s; display: block;">
                  <input type="checkbox" value="canvas_pro_20x30" onchange="toggleWallArtProduct(this)" style="display: none;">
                  <img class="product-main-image" src="/static/prints/canvas-pro-20x30-mockup.jpg" alt="Canvas Pro Floating Block" style="width: 100%; height: 220px; object-fit: cover;">
                  <div style="padding: 20px;">
                    <div style="font-size: 18px; font-weight: 700; margin-bottom: 4px;">Canvas Pro</div>
                    <div style="font-size: 14px; color: #666; margin-bottom: 16px;">20×30"</div>
                    
                    <!-- FRAME SELECTOR -->
                    <div style="margin-bottom: 16px;">
                      <label style="display: block; font-size: 12px; font-weight: 600; color: #333; margin-bottom: 6px;">FRAME STYLE</label>
                      <select class="frame-selector" onchange="updateProductPreview(this)" style="width: 100%; padding: 10px; border: 1.5px solid #ddd; border-radius: 8px; font-size: 14px; background: white; cursor: pointer;">
                        <option value="floating" data-img="/static/prints/staging-aruba-living-room.jpg" data-price="0">Floating Block (Included)</option>
                        <option value="light" data-img="/static/prints/staging-mediterranean-villa.jpg" data-price="150">Light Frame (+$150)</option>
                        <option value="premium" data-img="/static/prints/staging-mediterranean-villa.jpg" data-price="250">Premium Frame (+$250)</option>
                      </select>
                    </div>

                    <!-- FINISH SELECTOR -->
                    <div style="margin-bottom: 16px;">
                      <label style="display: block; font-size: 12px; font-weight: 600; color: #333; margin-bottom: 6px;">FINISH</label>
                      <select class="finish-selector" style="width: 100%; padding: 10px; border: 1.5px solid #ddd; border-radius: 8px; font-size: 14px; background: white; cursor: pointer;">
                        <option value="matte">Matte (Anti-Glare)</option>
                        <option value="glossy">Glossy</option>
                        <option value="satin">Satin</option>
                      </select>
                    </div>

                    <div style="font-size: 13px; color: #666; line-height: 1.6; margin-bottom: 16px;">
                      • Premium cotton canvas<br>
                      • 2.3" wooden floating block<br>
                      • Archival HD printing<br>
                      • Handcrafted in Italy
                    </div>
                    <div class="product-price" style="font-size: 24px; font-weight: 700; color: var(--accent);">$470</div>
                  </div>
                </label>
              </div>

'''
if old_canvas_pro_20x30 in content:
    content = content.replace(old_canvas_pro_20x30, '')
    changes += 1
    print("✅ Removed Canvas Pro 20x30 card")

# 2. Remove Canvas Pro 30x40 card (lines 2782-2820)
old_canvas_pro_30x40 = '''              <!-- CANVAS PRO 30x40 with FRAME OPTIONS -->
              <div class="wall-art-product-card" data-product="canvas_pro_30x40" data-base-price="1200">
                <label class="wall-art-card" style="cursor: pointer; border: 2px solid #e5e5e5; border-radius: 16px; overflow: hidden; transition: all 0.3s; display: block;">
                  <input type="checkbox" value="canvas_pro_30x40" onchange="toggleWallArtProduct(this)" style="display: none;">
                  <img class="product-main-image" src="/static/prints/staging-coastal-terrace.jpg" alt="Canvas Pro Large" style="width: 100%; height: 220px; object-fit: cover;">
                  <div style="padding: 20px;">
                    <div style="font-size: 18px; font-weight: 700; margin-bottom: 4px;">Canvas Pro</div>
                    <div style="font-size: 14px; color: #666; margin-bottom: 16px;">30×40" <span style="background: var(--accent); color: white; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600;">LARGE</span></div>
                    
                    <!-- FRAME SELECTOR -->
                    <div style="margin-bottom: 16px;">
                      <label style="display: block; font-size: 12px; font-weight: 600; color: #333; margin-bottom: 6px;">FRAME STYLE</label>
                      <select class="frame-selector" onchange="updateProductPreview(this)" style="width: 100%; padding: 10px; border: 1.5px solid #ddd; border-radius: 8px; font-size: 14px; background: white; cursor: pointer;">
                        <option value="floating" data-img="/static/prints/staging-aruba-living-room.jpg" data-price="0">Floating Block (Included)</option>
                        <option value="light" data-img="/static/prints/staging-mediterranean-villa.jpg" data-price="200">Light Frame (+$200)</option>
                        <option value="premium" data-img="/static/prints/staging-mediterranean-villa.jpg" data-price="350">Premium Frame (+$350)</option>
                      </select>
                    </div>

                    <!-- FINISH SELECTOR -->
                    <div style="margin-bottom: 16px;">
                      <label style="display: block; font-size: 12px; font-weight: 600; color: #333; margin-bottom: 6px;">FINISH</label>
                      <select class="finish-selector" style="width: 100%; padding: 10px; border: 1.5px solid #ddd; border-radius: 8px; font-size: 14px; background: white; cursor: pointer;">
                        <option value="matte">Matte (Anti-Glare)</option>
                        <option value="glossy">Glossy</option>
                        <option value="satin">Satin</option>
                      </select>
                    </div>

                    <div style="font-size: 13px; color: #666; line-height: 1.6; margin-bottom: 16px;">
                      • Large statement piece<br>
                      • Premium cotton canvas<br>
                      • Gallery-quality<br>
                      • Perfect for living rooms
                    </div>
                    <div class="product-price" style="font-size: 24px; font-weight: 700; color: var(--accent);">$1,200</div>
                  </div>
                </label>
              </div>

'''
if old_canvas_pro_30x40 in content:
    content = content.replace(old_canvas_pro_30x40, '')
    changes += 1
    print("✅ Removed Canvas Pro 30x40 card")

# 3. Remove Metal Pro 20x30 card
old_metal_pro = '''              <!-- METAL PRO 20x30 with FRAME OPTIONS -->
              <div class="wall-art-product-card" data-product="metal_pro_20x30" data-base-price="650">
                <label class="wall-art-card" style="cursor: pointer; border: 2px solid #e5e5e5; border-radius: 16px; overflow: hidden; transition: all 0.3s; display: block;">
                  <input type="checkbox" value="metal_pro_20x30" onchange="toggleWallArtProduct(this)" style="display: none;">
                  <img class="product-main-image" src="/static/prints/metal-pro-20x30-mockup.jpg" alt="Metal Pro Framed" style="width: 100%; height: 220px; object-fit: cover;">
                  <div style="padding: 20px;">
                    <div style="font-size: 18px; font-weight: 700; margin-bottom: 4px;">Metal Pro</div>
                    <div style="font-size: 14px; color: #666; margin-bottom: 16px;">20×30"</div>
                    
                    <!-- FRAME SELECTOR -->
                    <div style="margin-bottom: 16px;">
                      <label style="display: block; font-size: 12px; font-weight: 600; color: #333; margin-bottom: 6px;">FRAME STYLE</label>
                      <select class="frame-selector" onchange="updateProductPreview(this)" style="width: 100%; padding: 10px; border: 1.5px solid #ddd; border-radius: 8px; font-size: 14px; background: white; cursor: pointer;">
                        <option value="floating" data-img="/static/prints/staging-aruba-living-room.jpg" data-price="0">Floating Block (Included)</option>
                        <option value="light" data-img="/static/prints/staging-mediterranean-villa.jpg" data-price="150">Light Frame (+$150)</option>
                        <option value="premium" data-img="/static/prints/staging-mediterranean-villa.jpg" data-price="250">Premium Frame (+$250)</option>
                      </select>
                    </div>

                    <!-- FINISH SELECTOR -->
                    <div style="margin-bottom: 16px;">
                      <label style="display: block; font-size: 12px; font-weight: 600; color: #333; margin-bottom: 6px;">FINISH</label>
                      <select class="finish-selector" style="width: 100%; padding: 10px; border: 1.5px solid #ddd; border-radius: 8px; font-size: 14px; background: white; cursor: pointer;">
                        <option value="glossy">Glossy</option>
                        <option value="matte">Matte</option>
                        <option value="satin">Satin</option>
                        <option value="brushed">Brushed Aluminum</option>
                      </select>
                    </div>

                    <div style="font-size: 13px; color: #666; line-height: 1.6; margin-bottom: 16px;">
                      • ChromaLuxe® aluminum<br>
                      • Waterproof & scratch-resistant<br>
                      • Vibrant colors on metal<br>
                      • UV-resistant coating
                    </div>
                    <div class="product-price" style="font-size: 24px; font-weight: 700; color: var(--accent);">$470</div>
                  </div>
                </label>
              </div>

'''
if old_metal_pro in content:
    content = content.replace(old_metal_pro, '')
    changes += 1
    print("✅ Removed Metal Pro 20x30 card")

# 4. Update Acrylic Pro in first section (Wall Art Showcase)
old_acrylic_title = '<div style="font-size: 18px; font-weight: 700; margin-bottom: 4px;">Acrylic Pro</div>'
new_acrylic_title = '<div style="font-size: 18px; font-weight: 700; margin-bottom: 4px;">Acrylic Wall Art</div>'
if old_acrylic_title in content:
    content = content.replace(old_acrylic_title, new_acrylic_title, 1)  # Only first occurrence
    changes += 1
    print("✅ Updated Acrylic Pro → Acrylic Wall Art (first section)")

# Write updated content
with open('public/static/photography-apple-ux.html', 'w') as f:
    f.write(content)

print(f"\n🎉 Done! Made {changes} changes to the file.")
