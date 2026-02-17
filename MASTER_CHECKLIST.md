# MASTER BLOG POST AUDIT CHECKLIST
## 30 Expert AI SEO Checks for Acromatico Photography Blog

---

## ✅ **1. STRUCTURE & FORMATTING (Critical - 7 checks)**

| # | Check | Required | Pass Criteria |
|---|-------|----------|---------------|
| 1 | Hero section with H1 | ✅ CRITICAL | `<section class="hero-section">` with `<h1 class="hero-title">` |
| 2 | 5 H2 sections with `<br/>` | ✅ CRITICAL | `<h2 class="section-heading">Title:<br/>Subtitle</h2>` (exactly 5) |
| 3 | 5 Featured images | ✅ CRITICAL | `<div class="featured-image">` with caption (exactly 5) |
| 4 | Each section has unique content | ✅ CRITICAL | 400-600 words per section, NO repetition |
| 5 | Post intro paragraph | ✅ CRITICAL | `<div class="post-intro">` with 1-2 paragraphs (no WordPress bloat) |
| 6 | Clean gallery container | ✅ CRITICAL | `<div class="gallery-container">` with grid layout (not inline) |
| 7 | Full Mares CSS | ✅ CRITICAL | 20,000+ characters of CSS in `<style>` tag |

---

## 🔍 **2. SEO OPTIMIZATION (High Priority - 8 checks)**

| # | Check | Required | Pass Criteria |
|---|-------|----------|---------------|
| 8 | Title tag format | ✅ HIGH | `[Location] [Session Type] \| [Names] \| Acromatico Photography` (50-60 chars) |
| 9 | Meta description | ✅ HIGH | 150-160 chars with location, session type, couple/family names, CTA |
| 10 | Descriptive image alt tags | ✅ HIGH | `[Location] [Session Type] \| [Names] - Photo [#]` (NO "Photo 1", "Photo 2") |
| 11 | H1 hierarchy | ✅ HIGH | Single H1 in hero, H2 sections, H3 subsections |
| 12 | Internal linking | ✅ HIGH | "Related Sessions" block with 3+ posts |
| 13 | URL structure | ✅ HIGH | Clean lowercase slug: `location-session-type-names` |
| 14 | Open Graph tags | ✅ HIGH | 4+ tags: og:type, og:url, og:title, og:description, og:image |
| 15 | Twitter Card tags | ✅ HIGH | 3+ tags: twitter:card, twitter:title, twitter:description, twitter:image |

---

## 📝 **3. CONTENT QUALITY (Medium Priority - 6 checks)**

| # | Check | Required | Pass Criteria |
|---|-------|----------|---------------|
| 16 | Word count | ✅ MEDIUM | 2,500+ words total (weddings), 1,500+ (other sessions) |
| 17 | Couple/family names | ✅ MEDIUM | Mentioned 5+ times throughout content |
| 18 | Location details | ✅ MEDIUM | Specific venue name, city, state mentioned multiple times |
| 19 | Vendor credits | ✅ MEDIUM | 3-5 vendors with links preserved |
| 20 | Call-to-action | ✅ MEDIUM | "Ready to Create Your Story?" section with `/contact` button |
| 21 | Unique storytelling | ✅ MEDIUM | No generic filler, uses real WordPress details + smart expansion |

---

## ⚙️ **4. TECHNICAL SEO (Medium Priority - 5 checks)**

| # | Check | Required | Pass Criteria |
|---|-------|----------|---------------|
| 22 | Schema markup | ✅ MEDIUM | LocalBusiness + Article + FAQ + ImageObject structured data |
| 23 | Canonical URL | ✅ MEDIUM | `<link rel="canonical" href="https://acromatico.com/blog/[slug]">` |
| 24 | Robots meta | ✅ MEDIUM | `<meta name="robots" content="index, follow">` |
| 25 | Breadcrumb navigation | 🟡 LOW | Home > Blog > Post Title (with schema) |
| 26 | Mobile responsive | ✅ MEDIUM | Viewport meta + CSS media queries |

---

## 🎨 **5. USER EXPERIENCE (Low Priority - 4 checks)**

| # | Check | Required | Pass Criteria |
|---|-------|----------|---------------|
| 27 | Lazy loading | 🟡 LOW | Images have `loading="lazy"` attribute |
| 28 | Gallery lightbox | 🟡 LOW | GLightbox enabled on gallery images |
| 29 | FAQ section | ✅ MEDIUM | 5-10 Q&A entries with FAQ schema |
| 30 | Contact info visible | 🟡 LOW | Email/phone in footer, contact button prominent |

---

## 📊 **SCORING SYSTEM**

- **✅ CRITICAL (7 checks):** Must pass 100% (7/7) - Structural integrity
- **✅ HIGH (8 checks):** Must pass 90%+ (7+/8) - SEO essentials
- **✅ MEDIUM (10 checks):** Should pass 70%+ (7+/10) - Quality & technical
- **🟡 LOW (5 checks):** Nice to have 60%+ (3+/5) - UX polish

**Overall Score:**
- **90%+ (27+/30):** ✅ EXCELLENT - Deploy ready
- **70-89% (21-26/30):** 🟡 GOOD - Minor fixes needed
- **<70% (<21/30):** ❌ NEEDS WORK - Major issues

---

## 🚀 **BATCH PROCESSING WORKFLOW**

**For every 10 posts:**
1. **Audit** - Run 30 checks, generate score
2. **Report** - List all failures with line numbers
3. **Fix** - Auto-apply fixes using V12 generator
4. **Verify** - Re-run 30 checks, confirm 90%+ score
5. **Commit** - Git commit with summary (e.g., "Fixed posts 1-10: avg 92% score")
6. **Report** - Show user progress: "Batch 1/50 complete, 18 minutes remaining"

**Repeat until all 501 posts = 90%+ score.**

---

## 📌 **PRIORITY FIXES (What to fix first)**

**Phase 1 - Critical Structure (Checks 1-7):**
- Add 5 H2 sections with `<br/>`
- Add 5 featured images with captions
- Remove WordPress gallery bloat
- Generate unique 400-600 word content per section

**Phase 2 - SEO Essentials (Checks 8-15):**
- Add meta descriptions
- Fix image alt tags
- Add Open Graph + Twitter Card tags
- Add canonical URLs

**Phase 3 - Content Quality (Checks 16-21):**
- Expand sections to 400-600 words each
- Preserve WordPress details (names, venues, vendors)
- Add smart storytelling templates

**Phase 4 - Polish (Checks 22-30):**
- Schema markup
- Breadcrumbs
- CTA sections
- Final UX tweaks

---

## ✅ **POST #1 CURRENT SCORE**

| Category | Score | Status |
|----------|-------|--------|
| Structure & Formatting | 6/7 (86%) | 🟡 Missing unique content |
| SEO Optimization | 8/8 (100%) | ✅ Perfect |
| Content Quality | 3/6 (50%) | ❌ Repetitive content, low word count |
| Technical SEO | 4/5 (80%) | ✅ Good |
| User Experience | 4/4 (100%) | ✅ Perfect |
| **OVERALL** | **25/30 (83%)** | 🟡 **GOOD - Needs content fix** |

**Issues:**
1. ❌ Repetitive content (same paragraph 5 times)
2. ❌ Word count per section only ~150 words (need 400-600)
3. ❌ Generic image captions

**Fix these 3 issues → Score jumps to 28/30 (93%) ✅ EXCELLENT**

---

## 🎯 **SUCCESS CRITERIA**

**Target:** All 501 posts scoring **90%+ (27+/30 checks passing)**

**Critical blockers (must be 100%):**
- 5 H2 sections with `<br/>` format
- 5 featured images with captions
- Meta descriptions
- Open Graph tags
- Unique content per section

**Deploy when:**
- 95%+ posts score 90%+
- 100% posts have critical fixes
- All 501 posts have proper Mares structure
