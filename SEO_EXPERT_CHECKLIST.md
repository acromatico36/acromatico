# 📋 EXPERT AI SEO AUDIT & FIX CHECKLIST

## 🎯 **WHAT TO CHECK & HOW TO FIX**

---

## **CATEGORY 1: STRUCTURE & FORMATTING (CRITICAL)**

### ✅ **Check 1: H2 Section Headings with Subtitle Format**
**What to check:**
- Must have 5+ H2 sections with `<br/>` tag for subtitle
- Format: `<h2 class="section-heading">Main Title:<br/>Descriptive Subtitle</h2>`

**What to fix:**
- Convert plain H2s to proper Mares format with subtitles
- Add `class="section-heading"`
- Insert `<br/>` between title and subtitle
- Ensure 5 storytelling sections minimum

**Example Fix:**
```html
<!-- BEFORE -->
<h2>Frequently Asked Questions</h2>

<!-- AFTER -->
<h2 class="section-heading">Personal Touches:<br/>What Made This Session Uniquely Theirs</h2>
```

---

### ✅ **Check 2: Featured Images with Captions**
**What to check:**
- Must have 5+ featured images distributed across sections
- Each with `class="featured-image"`
- Each must have descriptive caption in `<p class="image-caption">`

**What to fix:**
- Insert featured images from gallery into sections
- Add descriptive, keyword-rich captions
- Proper HTML structure with featured-image class

**Example Fix:**
```html
<div class="featured-image">
    <img src="[image-url]" alt="Couple portraits at golden hour - Miami wedding" class="section-image" loading="lazy"/>
    <p class="image-caption">The golden hour light creating perfect romantic moments at their Miami celebration</p>
</div>
```

---

### ✅ **Check 3: Hero Section**
**What to check:**
- `<section class="hero-section">` with background image
- `<h1 class="hero-title">` matching page title
- Proper overlay for readability

**What to fix:**
- Ensure hero section exists with proper classes
- H1 must match title exactly
- Background image from first gallery image

---

### ✅ **Check 4: Full Mares CSS**
**What to check:**
- `<style>` tag must contain 20,000+ characters
- Must include all Mares framework styles

**What to fix:**
- If CSS missing or incomplete, inject full Mares CSS
- Verify hero, section, gallery, and responsive styles

---

## **CATEGORY 2: SEO OPTIMIZATION (HIGH PRIORITY)**

### ✅ **Check 5: Title Tag**
**What to check:**
- Format: `[Location] [Session Type] | [Names] | Acromatico Photography`
- 50-60 characters optimal
- Includes primary keywords

**What to fix:**
- Extract location, session type, names from content
- Format: "Fort Lauderdale Indian Wedding | Alissa + Imran | Acromatico Photography"

---

### ✅ **Check 6: Meta Description**
**What to check:**
- Must be 150-160 characters
- Include location + session type + unique detail
- Compelling call-to-action

**What to fix:**
- Generate from first paragraph + location
- Format: "Celebrate [couple names]'s stunning [session type] at [location]. Experience [unique detail]. [CTA]"
- Example: "Celebrate Alissa + Imran's stunning Indian wedding in Fort Lauderdale. Vibrant cultural celebration with family. View their story."

---

### ✅ **Check 7: Image Alt Tags**
**What to check:**
- Every image must have descriptive alt text
- Include location + session type + specific detail
- No generic "Photo 1", "Image 2"

**What to fix:**
- Gallery images: "Fort Lauderdale Indian Wedding | Alissa + Imran - Ceremony moment"
- Featured images: "Golden hour couple portraits at Miami beach - anniversary session"
- Hero images: "[Session Type] at [Location] - [Names]"

---

### ✅ **Check 8: H1 Hierarchy**
**What to check:**
- ONLY ONE H1 per page (hero-title)
- H1 matches title tag
- H2s follow logical structure
- H3s for subsections within H2s

**What to fix:**
- Ensure single H1
- Convert any extra H1s to H2
- Add H3 subheadings where needed

---

### ✅ **Check 9: Internal Linking**
**What to check:**
- "Related Sessions" section with 3+ internal links
- Links to similar session types
- Links to same location
- Anchor text is descriptive

**What to fix:**
- Add related posts section if missing
- Link to 3-4 relevant blog posts
- Use descriptive anchor text: "View their Brooklyn engagement session"

---

### ✅ **Check 10: URL Structure**
**What to check:**
- Clean slug: location-session-type-names
- No dates, no IDs, no special characters
- Lowercase with hyphens

**What to fix:**
- Already correct in V5 (no action needed)

---

## **CATEGORY 3: CONTENT QUALITY (MEDIUM PRIORITY)**

### ✅ **Check 11: Word Count**
**What to check:**
- Minimum 2,500 words for wedding posts
- Minimum 1,500 words for family/engagement
- Content is unique, not duplicated

**What to fix:**
- If < 2,500 words, expand sections with:
  - More location details
  - Photography approach explanation
  - Vendor spotlight
  - Session timeline details

---

### ✅ **Check 12: Keyword Density**
**What to check:**
- Primary keyword (location + session type) appears 3-5 times
- Natural placement, not forced
- LSI keywords (related terms) used

**What to fix:**
- Add location mentions in section text
- Include session type variations
- Example: "Miami wedding" → "South Florida wedding photography", "Miami celebration"

---

### ✅ **Check 13: Unique Content**
**What to check:**
- Content uses real WordPress details
- Couple/family names mentioned 5+ times
- Specific location details
- Personal touches described

**What to fix:**
- Extract couple names from title/content
- Mention venue name 2-3 times
- Add specific details from WordPress content

---

### ✅ **Check 14: Vendor Credits**
**What to check:**
- `<div class="vendor-credits">` section present
- Vendor links preserved from WordPress
- Minimum 3-5 vendor credits

**What to fix:**
- Extract vendor links from WordPress content
- Format with proper HTML structure
- Include: MUA, florist, DJ, venue, planner

---

### ✅ **Check 15: Call-to-Action (CTA)**
**What to check:**
- CTA section above footer
- "Ready to Create Your Story?" or similar
- Button linking to /contact
- Compelling copy

**What to fix:**
- Add CTA section if missing
- Use Mares CTA template
- Button with proper styling

---

## **CATEGORY 4: TECHNICAL SEO (MEDIUM PRIORITY)**

### ✅ **Check 16: Schema Markup**
**What to check:**
- LocalBusiness schema for Acromatico
- Article schema for blog post
- FAQ schema (if FAQs present)
- ImageObject schema for featured images

**What to fix:**
- Add JSON-LD schema blocks
- Include all required properties
- Validate schema structure

---

### ✅ **Check 17: Open Graph Tags**
**What to check:**
- og:title, og:description, og:image
- og:type = "article"
- og:url with full URL
- Facebook sharing optimized

**What to fix:**
- Add all OG tags in <head>
- Use first gallery image for og:image
- Format: `<meta property="og:title" content="[Title]">`

---

### ✅ **Check 18: Twitter Card Tags**
**What to check:**
- twitter:card = "summary_large_image"
- twitter:title, twitter:description, twitter:image
- Matches OG tags

**What to fix:**
- Add Twitter card tags
- Ensure image is 1200x630 or larger

---

### ✅ **Check 19: Canonical URL**
**What to check:**
- `<link rel="canonical" href="[URL]">`
- Points to production URL
- Prevents duplicate content

**What to fix:**
- Add canonical tag if missing
- Format: `https://acromatico.com/blog/[slug]`

---

### ✅ **Check 20: Robots Meta**
**What to check:**
- `<meta name="robots" content="index, follow">`
- Allows indexing and crawling

**What to fix:**
- Add robots meta if missing
- Ensure "index, follow" for all posts

---

## **CATEGORY 5: USER EXPERIENCE (LOW PRIORITY)**

### ✅ **Check 21: Mobile Responsive**
**What to check:**
- Viewport meta tag present
- CSS media queries for mobile
- Text readable on small screens
- Images scale properly

**What to fix:**
- Already in Mares CSS (verify only)

---

### ✅ **Check 22: Loading Performance**
**What to check:**
- Images have `loading="lazy"`
- Gallery images deferred
- CSS inline for critical path
- No render-blocking resources

**What to fix:**
- Add `loading="lazy"` to all images
- Ensure gallery images are lazy-loaded

---

### ✅ **Check 23: Gallery Lightbox**
**What to check:**
- GLightbox initialized
- All gallery images clickable
- Lightbox navigation works
- Images high resolution

**What to fix:**
- Ensure glightbox class on all gallery links
- Verify GLightbox script loaded

---

### ✅ **Check 24: FAQ Section**
**What to check:**
- 5-10 FAQs for wedding posts
- Schema markup for FAQs
- Questions relevant to session type
- Answers comprehensive

**What to fix:**
- Add FAQ section if missing
- Use Mares FAQ template
- Include schema markup

---

### ✅ **Check 25: Breadcrumb Navigation**
**What to check:**
- Breadcrumb at top: Home > Blog > [Post Title]
- Schema markup for breadcrumbs
- Proper linking

**What to fix:**
- Add breadcrumb navigation
- Include BreadcrumbList schema

---

## **CATEGORY 6: CONVERSION OPTIMIZATION (LOW PRIORITY)**

### ✅ **Check 26: Contact Information**
**What to check:**
- Email, phone visible
- Contact form link prominent
- Social media links

**What to fix:**
- Add contact info in footer/CTA
- Link to contact page

---

### ✅ **Check 27: Portfolio Links**
**What to check:**
- Links to main portfolio
- Links to specific galleries
- Session type category pages

**What to fix:**
- Add portfolio links in relevant sections

---

### ✅ **Check 28: Testimonial/Review**
**What to check:**
- Client quote or testimonial
- Star rating (if available)
- Review schema markup

**What to fix:**
- Extract testimonial from WordPress
- Add Review schema

---

### ✅ **Check 29: Pricing Information**
**What to check:**
- FAQ mentions pricing
- Link to pricing page
- Starting prices listed

**What to fix:**
- Ensure FAQ includes pricing question
- Link to /photography page

---

### ✅ **Check 30: Related Content**
**What to check:**
- "Related Sessions" section
- 3-4 similar posts
- Thumbnails + titles
- Relevant to current post

**What to fix:**
- Generate related posts based on:
  - Same session type
  - Same location
  - Similar date

---

## 🎯 **PRIORITY MATRIX**

### **CRITICAL (FIX IMMEDIATELY):**
1. H2 section headings with `<br/>` format
2. Featured images with captions (5+)
3. Meta descriptions (150-160 chars)
4. Title tags optimized
5. Image alt tags descriptive

### **HIGH PRIORITY (FIX NEXT):**
6. Internal linking (related posts)
7. Word count (2,500+ for weddings)
8. Vendor credits preserved
9. Schema markup (LocalBusiness, Article, FAQ)
10. Canonical URLs

### **MEDIUM PRIORITY (FIX AFTER HIGH):**
11. Open Graph tags
12. Twitter Card tags
13. CTA sections
14. FAQ sections
15. Unique content expansion

### **LOW PRIORITY (FIX LAST):**
16. Breadcrumb navigation
17. Contact information
18. Portfolio links
19. Testimonials
20. Pricing mentions

---

## 🔧 **BATCH PROCESSING WORKFLOW**

### **For Every 10 Posts:**
1. **Audit** - Check all 30 items
2. **Report** - List issues found
3. **Fix** - Apply fixes automatically
4. **Verify** - Re-check fixed items
5. **Report** - Confirm fixes applied
6. **Move to next batch**

### **After Each Batch:**
- Commit changes to git
- Report summary of fixes
- Show before/after examples
- Continue to next 10 posts

---

## ✅ **SUCCESS CRITERIA**

### **EXCELLENT (90%+):**
- All 30 checks pass
- Ready for production

### **GOOD (70-89%):**
- Critical items fixed
- Minor improvements needed

### **NEEDS WORK (<70%):**
- Major issues present
- Requires immediate attention

