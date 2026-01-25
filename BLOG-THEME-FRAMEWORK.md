# Acromatico Blog Theme Framework
## Master Template for 502 Blog Posts

**Version:** 1.0  
**Created:** January 25, 2026  
**Status:** Production Ready  
**Template File:** `public/static/blog-theme-master.html`

---

## 📋 Overview

This is the master blog theme framework for all Acromatico blog posts. It combines Madison & Jordan's Cork Factory Hotel wedding post layout with Hoffer Photography's menu design, creating a unique, SEO-optimized, mobile-responsive blog template.

---

## 🎨 Design Features

### **Header & Navigation**
- **Fixed Glass Header**: Translucent backdrop with centered white Acromatico logo (200px desktop, 150px mobile)
- **Hamburger Menu**: Sleek 3-line button (☰) that animates to X (╳) when clicked
- **Slide-Out Menu**: 420px wide drawer with light gray background (#f8f8f8)

### **Menu Components**
1. **Logo**: Black Acromatico logo (180px, centered)
2. **Predictive Search**: Real-time autocomplete with 300ms debounce
3. **Navigation**: 6 centered links (Portfolios, Recent Work, About Us, FAQ, Pricing, Contact)
4. **Footer**: Centered tagline + Instagram/Facebook icons

### **Hero Section**
- **Full-screen hero image** with 19% dark overlay
- **Responsive background** (cover, center positioning)
- **Min-height: 100vh** for immersive experience

### **Content Layout**
- **Max-width container**: 1240px for optimal readability
- **Two-column masonry gallery**: Using CSS columns (2 on desktop, 1 on mobile)
- **GLightbox integration**: Fullscreen image viewing with navigation

### **Typography**
- **Font**: Montserrat (400, 600, 700 weights)
- **Body**: 15px, line-height 1.6
- **Headings**: Bold, color #3a3a3a
- **Links**: Green hover (#728012)

---

## 🎯 SEO Framework

### **Meta Tags (Complete)**
```html
<!-- Basic Meta -->
<title>Post Title | Acromatico Photography</title>
<meta name="description" content="160-character optimized description">
<meta name="keywords" content="target, keywords, here">

<!-- Open Graph -->
<meta property="og:title" content="Post Title">
<meta property="og:description" content="...">
<meta property="og:image" content="hero-image-url">
<meta property="og:url" content="canonical-url">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">

<!-- Canonical -->
<link rel="canonical" href="post-url">
```

### **Schema Markup**
1. **BlogPosting Schema**: Author, date, images, publisher
2. **FAQ Schema**: 10 questions with answers
3. **Organization Schema**: Logo, social profiles

### **Content Structure**
- **H1**: Post title (60 chars max)
- **H2**: 5-6 major sections
- **H3**: Subsections under H2s
- **Word count**: 4,500+ words
- **Images**: 70+ with descriptive ALT text (future optimization)

---

## 📱 Responsive Design

### **Breakpoints**
- **Desktop**: >768px (3-column related posts, full navigation)
- **Mobile**: ≤768px (1-column, stacked layout, hamburger menu)

### **Mobile Optimizations**
- Logo: 150px (from 200px)
- Hamburger menu: Touch-friendly 40px target
- Related posts: Single column
- Buttons: Full-width on mobile
- Gallery: Single column masonry

---

## 🎨 Color Palette

### **Primary Colors**
- **Background**: #ffffff (white)
- **Text**: #3a3a3a (dark gray)
- **Accent**: #728012 (olive green)
- **Menu Background**: #f8f8f8 (light gray)

### **Gradients**
- **CTA Sections**: `linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%)` (black to gray)
- **Author Bio**: `linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)` (gray to black)

### **Buttons**
- **Primary**: White background, black text
- **Secondary**: Transparent with white border
- **Hover**: Lift effect + shadow

---

## 🔍 Predictive Search

### **Features**
- **Real-time autocomplete**: Shows results as you type
- **Debounce**: 300ms delay to prevent excessive searches
- **Min characters**: 2 before search triggers
- **Results shown**: Top 5 matches
- **Smart matching**: Searches title AND category

### **Sample Data Structure**
```javascript
const blogPosts = [
    { 
        title: 'Post Title', 
        url: '/static/blog/post-slug.html', 
        category: 'Weddings' 
    }
];
```

---

## 📦 Component Breakdown

### **1. Fixed Header**
```css
.site-header {
    position: fixed;
    top: 0;
    z-index: 9999;
    padding: 20px 40px;
    display: flex;
    justify-content: center;
}
```

### **2. Hamburger Menu Button**
```html
<button class="menu-toggle" id="menuToggle">
    <span></span>
    <span></span>
    <span></span>
</button>
```

### **3. Slide-Out Drawer**
```css
.ast-mobile-popup-drawer {
    position: fixed;
    right: -100%;
    width: 420px;
    transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### **4. Gallery (Masonry)**
```css
.gallery-container {
    column-count: 2;
    column-gap: 20px;
}
```

### **5. CTA Sections**
- **Mid-Post CTA**: After 40% of content
- **End-of-Post CTA**: Before Related Posts
- **Buttons**: Centered, compact (12px 24px padding)

### **6. Related Posts Grid**
```css
.related-posts-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
}
```

### **7. Author Bio**
- **Dual headshots**: Italo (top), Ale (below), 150px each
- **Stacked layout**: Vertical with 15px gap
- **Dark gradient background**: Gray to black
- **White text**: High contrast

---

## 🚀 Implementation Guide

### **Step 1: Clone Master Template**
```bash
cp public/static/blog-theme-master.html public/static/blog/new-post.html
```

### **Step 2: Update Content**
1. **Replace hero image URL** (line ~83)
2. **Update post title** (H1)
3. **Update intro paragraph**
4. **Replace all gallery images** (73+ images)
5. **Update SEO meta tags** (title, description, keywords)
6. **Update schema markup** (dates, author info)
7. **Update FAQ section** (10 questions)
8. **Update vendor credits** (9 vendors)
9. **Update related posts** (3 posts)

### **Step 3: SEO Optimization**
1. **Title tag**: 60 chars max
2. **Meta description**: 160 chars max
3. **H1**: Couple names + Venue
4. **H2 sections**: 5-6 major sections
5. **Internal links**: 3 minimum
6. **External links**: Venue link with nofollow
7. **Image ALT text**: Descriptive 15-25 words each

### **Step 4: Test**
```bash
# Build and deploy
npm run build
pm2 restart acromatico

# Test URL
curl http://localhost:3000/static/blog/new-post.html
```

---

## 📊 Key Metrics

### **Performance**
- **File Size**: ~73KB
- **Images**: 70+ (lazy loading enabled)
- **Load Time**: <3s on 3G
- **Lighthouse Score**: 90+ target

### **SEO**
- **Word Count**: 4,500+
- **H2 Sections**: 6
- **H3 Subsections**: 15+
- **Internal Links**: 3
- **External Links**: 1 (venue)
- **Schema Types**: 2 (BlogPosting, FAQ)

### **User Experience**
- **Gallery**: 2-column masonry
- **Lightbox**: GLightbox with fullscreen
- **Menu**: Predictive search
- **Mobile**: Fully responsive
- **Accessibility**: ARIA labels, keyboard navigation

---

## 🎯 Best Practices

### **Content Writing**
1. **Hook readers** in first paragraph
2. **Use storytelling** throughout
3. **Break up text** with H2/H3 headings
4. **Add personality** (Ale & Italo's voice)
5. **Include CTAs** at 40% and end
6. **Link internally** to related posts

### **Image Optimization**
1. **Compress images** before upload
2. **Use descriptive ALT text**
3. **Enable lazy loading** (already implemented)
4. **Maintain aspect ratios**
5. **Use WebP format** when possible

### **Technical SEO**
1. **Clean URLs** (no dates, simple slugs)
2. **Canonical tags** on every post
3. **Schema markup** (BlogPosting + FAQ)
4. **Internal linking** strategy
5. **Mobile-first** indexing ready

---

## 📁 File Structure

```
webapp/
├── public/static/
│   ├── blog-theme-master.html          # Master template
│   ├── blog/
│   │   ├── madison-jordan-cork-factory.html
│   │   ├── [502 other posts].html
│   ├── acromatico-logo-transparent.png
│   ├── acromatico-logo-black.png
│   └── images/
└── BLOG-THEME-FRAMEWORK.md             # This file
```

---

## 🔄 Maintenance

### **Regular Updates**
- [ ] Update blog posts array for search (monthly)
- [ ] Add new vendor credits as needed
- [ ] Update author bio if business changes
- [ ] Refresh related posts quarterly
- [ ] Update social media links

### **Version Control**
All changes committed to git with descriptive messages:
```bash
git add public/static/blog-theme-master.html
git commit -m "feat: Update blog theme with new feature"
```

---

## 🎉 Credits

**Design Inspiration:**
- Madison & Jordan post layout (masonry gallery, content structure)
- Hoffer Photography menu (slide-out drawer, clean navigation)

**Founders:**
- Ale Campilii (Photographer & Creative Director)
- Italo Campilii (CMO & Photographer)

**Technology Stack:**
- HTML5 + CSS3
- Vanilla JavaScript
- GLightbox (image lightbox)
- Google Fonts (Montserrat)

---

## 📞 Contact

For technical questions or theme customization:
- **Email**: info@acromatico.com
- **Instagram**: @acromatico
- **Website**: https://acromatico.com

---

**Last Updated**: January 25, 2026  
**Version**: 1.0  
**Status**: ✅ Production Ready for 502 Posts
