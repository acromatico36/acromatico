# ACROMATICO BLOG POST VALIDATION CHECKLIST
## CRITICAL: Check EVERY item before marking a post as complete!

---

## 🎯 POST IDENTITY VALIDATION

### ✅ Title & Metadata
- [ ] **Page Title** (`<title>` tag) matches THIS post (not Mares/other post)
- [ ] **Hero Title** (H1) matches THIS post exactly
- [ ] **Meta Description** describes THIS post (not Mares/other post)
- [ ] **og:title** matches THIS post
- [ ] **og:description** describes THIS post
- [ ] **og:image** is from THIS post (first image)
- [ ] **twitter:title** matches THIS post
- [ ] **twitter:description** describes THIS post
- [ ] **twitter:image** is from THIS post
- [ ] **Canonical URL** uses THIS post's slug
- [ ] **No references to "Mares", "Claire", "20th Anniversary"** in metadata

---

## 🖼️ IMAGES & GALLERY

### ✅ Hero Section
- [ ] **Hero background image** is from THIS post (first image)
- [ ] **Hero image URL** does NOT contain "20th-Anniversary-Photo-Session"
- [ ] **Hero image URL** matches post's actual images

### ✅ Featured Images (Between Sections)
- [ ] **All 4 featured images** are from THIS post only
- [ ] **No Mares session images** in featured sections
- [ ] **Featured image alt text** references THIS post title
- [ ] **Image captions** reference THIS post (not Mares/other posts)

### ✅ Gallery Section
- [ ] **All gallery images** are from THIS post only
- [ ] **Gallery image count** matches expected count for THIS post
- [ ] **No 20th-Anniversary-Photo-Session URLs** in gallery
- [ ] **Gallery alt text** references THIS post title
- [ ] **Gallery uses glightbox** for lightbox functionality

---

## 📝 CONTENT VALIDATION

### ✅ Post Type Accuracy
- [ ] **Post type detected correctly** (wedding/newborn/engagement/maternity/family/anniversary)
- [ ] **Section headings match post type**:
  - Weddings: Ceremony, Couple Portraits, Reception, Photography Approach
  - Newborns: Session, Minimal & Timeless, Family Connection, Safety First
  - Engagements: Location, Authentic Moments, Session Flow, Photography Style
  - Maternity: Celebrating Motherhood, Timing & Planning, What to Wear, Including Partners
  - Family: Family Sessions, Session Experience, Location & Timing, What to Expect
  - Anniversary: Anniversary Sessions, Personal Touches, Photography Approach, Planning
- [ ] **NO wedding sections in newborn posts** (no "ceremony", "reception")
- [ ] **NO newborn sections in wedding posts** (no "safety first", "baby")
- [ ] **Content contextually appropriate** for post type

### ✅ Content Cleanliness
- [ ] **Intro paragraph** is from THIS post's JSON data
- [ ] **No Mares family content** in body text
- [ ] **No "Matheson Hammock Park"** references (unless THIS post is at Matheson Hammock)
- [ ] **No "Claire"** references (unless THIS post features Claire)
- [ ] **No generic template text** bleeding through
- [ ] **All 4 content sections** have appropriate text for post type

---

## ❓ FAQ SECTION

### ✅ FAQ Relevance
- [ ] **FAQ questions match post type**:
  - Weddings: wedding pricing, timeline, rain plans, coverage hours
  - Newborns: session length, safety, timing, what to bring
  - Engagements: session pricing, best locations, outfit guidance, timing
  - Maternity: best timing (30-36 weeks), what to wear, partner inclusion
  - Family: session pricing, kid-friendly approach, best times, what to wear
  - Anniversary: pricing, locations, outfit ideas, planning tips
- [ ] **NO anniversary FAQs in newborn posts**
- [ ] **NO wedding FAQs in maternity posts**
- [ ] **FAQ answers reference appropriate locations** for post type
- [ ] **FAQ Schema.org markup** present and valid

---

## 🎨 STRUCTURE & DESIGN

### ✅ Visual Structure
- [ ] **Full-height hero** (100vh) with centered title
- [ ] **Intro paragraph** (section-text div)
- [ ] **4 content sections** with headings
- [ ] **4 featured images** between sections
- [ ] **Gallery container** with masonry layout
- [ ] **CTA section** (mid-post)
- [ ] **FAQ section** (5+ questions)
- [ ] **Footer** with contact info loaded via /api/footer

### ✅ CSS & Styling
- [ ] **Montserrat font** loaded from Google Fonts
- [ ] **GLightbox CSS** loaded from CDN
- [ ] **Tailwind CSS** loaded from CDN
- [ ] **Hero title font size**: 56px desktop, 36px mobile
- [ ] **Gallery**: 2 columns desktop, 1 column mobile
- [ ] **Section headings**: 32px, center-aligned
- [ ] **Image border-radius**: 10px on all images
- [ ] **Responsive breakpoint** at 768px

---

## 📱 RESPONSIVE TESTING

### ✅ Desktop (1920px+)
- [ ] **Hero fills viewport** (100vh)
- [ ] **Title readable** and centered
- [ ] **Gallery 2-column** layout
- [ ] **Images display properly** with 10px rounding
- [ ] **CTA section centered** and readable
- [ ] **FAQ accordion** works properly

### ✅ Tablet (768px - 1024px)
- [ ] **Hero scales properly**
- [ ] **Title size appropriate** (between 36-56px)
- [ ] **Gallery 2-column** still works
- [ ] **All sections stack** properly
- [ ] **Navigation accessible**

### ✅ Mobile (375px - 767px)
- [ ] **Hero title readable** at 36px
- [ ] **Gallery switches to 1-column**
- [ ] **All text readable** without horizontal scroll
- [ ] **Images scale properly**
- [ ] **Touch targets adequate** (44px min)
- [ ] **Hamburger menu works**

---

## 🔍 SEO & TECHNICAL

### ✅ SEO Elements
- [ ] **Title tag** optimized (60 chars max)
- [ ] **Meta description** optimized (155-160 chars)
- [ ] **Canonical URL** correct
- [ ] **Open Graph tags** complete
- [ ] **Twitter Card tags** complete
- [ ] **Schema.org FAQPage** markup present
- [ ] **Image alt text** descriptive and unique
- [ ] **No broken links** in content

### ✅ Performance
- [ ] **Images use loading="lazy"**
- [ ] **File size under 100KB** (reasonable)
- [ ] **No duplicate content** from other posts
- [ ] **No broken image URLs**

---

## 🚫 CROSS-CONTAMINATION CHECK

### ✅ Zero Tolerance Check
Run these grep checks and ensure **COUNT = 0**:

```bash
# Check for Mares content in NON-Mares posts
grep -i "mares\|claire\|20th-anniversary-photo-session" [POST_FILE] | wc -l
# MUST BE 0 (unless post IS about Mares)

# Check for Matheson Hammock in NON-Matheson posts
grep -i "matheson hammock" [POST_FILE] | wc -l
# MUST BE 0 (unless post IS at Matheson Hammock)

# Check for wrong post type sections in newborn posts
grep -i "ceremony\|reception\|vows\|first dance" [NEWBORN_POST] | wc -l
# MUST BE 0 (newborns don't have ceremonies!)

# Check for wedding content in non-wedding posts
grep -i "bride\|groom\|wedding dress\|vows" [NEWBORN_POST] | wc -l
# MUST BE 0 (unless it IS a wedding post)
```

---

## ✅ FINAL SIGN-OFF

Before marking post as complete, verify:

- [ ] **All checklist items above = PASS**
- [ ] **Visual review in browser** looks perfect
- [ ] **Mobile responsive** test passed
- [ ] **No console errors** in browser
- [ ] **Lightbox works** when clicking gallery images
- [ ] **All links work** (CTA button, footer links)
- [ ] **File size reasonable** (50-100KB typical)

---

## 🎯 POST-GENERATION AUTOMATED CHECKS

Run this validation script after generating each post:

```python
def validate_post(post_file, post_slug, post_type):
    """
    Automated validation checks
    Returns: (passed: bool, errors: list)
    """
    errors = []
    
    with open(post_file, 'r') as f:
        content = f.read()
    
    # Check for cross-contamination
    contamination_terms = ['mares', 'claire', '20th-anniversary-photo-session']
    if post_slug not in ['20th-anniversary-photo-session', 'mares-family']:
        for term in contamination_terms:
            if term.lower() in content.lower():
                errors.append(f"CONTAMINATION: Found '{term}' in {post_slug}")
    
    # Check post type sections
    wrong_sections = {
        'newborn': ['ceremony', 'reception', 'first dance', 'vows'],
        'engagement': ['ceremony', 'reception', 'baby', 'newborn'],
        'maternity': ['ceremony', 'reception', 'wedding dress'],
        'family': ['ceremony', 'groom', 'bride', 'vows']
    }
    
    if post_type in wrong_sections:
        for term in wrong_sections[post_type]:
            if term.lower() in content.lower():
                errors.append(f"WRONG SECTION: Found '{term}' in {post_type} post")
    
    # Check for proper title
    if f'<title>' in content and post_slug not in content:
        errors.append(f"TITLE MISMATCH: Title doesn't contain post slug")
    
    # Check for images
    if 'gallery-image' not in content:
        errors.append(f"NO GALLERY: No gallery images found")
    
    # Check for required sections
    required = ['hero-title', 'section-heading', 'gallery-container', 'cta-section', 'faq-section']
    for req in required:
        if req not in content:
            errors.append(f"MISSING SECTION: {req} not found")
    
    return (len(errors) == 0, errors)
```

---

## 📊 BATCH GENERATION WORKFLOW

When generating all 475 posts:

1. **Generate post** using generator script
2. **Run automated validation** (script above)
3. **Manual spot check** (visual review in browser)
4. **Check mobile responsive** (resize browser to 375px)
5. **Verify gallery works** (click image to test lightbox)
6. **Mark as complete** in checklist JSON
7. **Commit to git** with descriptive message
8. **Move to next post**

**NEVER skip to the next post if ANY validation fails!**

---

## 🎨 DESIGN/UX AGENT REVIEW CHECKLIST

Before scaling to all 475 posts, design agent must verify:

### Visual Design
- [ ] Hero section stunning on desktop
- [ ] Typography clean and professional
- [ ] Gallery layout perfect (2-column masonry)
- [ ] Featured images display beautifully
- [ ] CTA section visually appealing
- [ ] Color scheme consistent
- [ ] Spacing/padding appropriate

### Mobile Experience
- [ ] Hero title perfectly sized (not too big/small)
- [ ] Gallery switches to 1-column smoothly
- [ ] All sections stack cleanly
- [ ] Touch targets easy to tap
- [ ] No horizontal scroll
- [ ] Loading performance good

### Content Quality
- [ ] Section headings appropriate for post type
- [ ] No generic/wrong content visible
- [ ] SEO elements in place
- [ ] Content reads professionally
- [ ] No grammar/spelling errors

### User Experience
- [ ] Smooth scrolling between sections
- [ ] Lightbox works flawlessly
- [ ] CTA button prominent and clickable
- [ ] FAQ accordion functional
- [ ] No visual bugs or glitches
- [ ] Site navigation works

---

**THIS CHECKLIST MUST BE FOLLOWED FOR EVERY POST!**
**NO EXCEPTIONS. NO SHORTCUTS. ZERO MISTAKES TOLERATED.**
