#!/usr/bin/env node

/**
 * ACROMATICO BLOG POST GENERATOR
 * Generates 501 individual blog post HTML files
 * Apple/Tesla-level design + Full SEO + Schema.org markup
 */

const fs = require('fs');
const path = require('path');

// Load all blog posts
const allPosts = JSON.parse(fs.readFileSync('blog_posts_data/all_posts.json', 'utf8'));

console.log(`🚀 Generating ${allPosts.length} blog posts...`);

// Ensure output directory exists
const OUTPUT_DIR = 'public/static/blog';
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Helper: Clean HTML content
function cleanHTML(html) {
  if (!html) return '';
  // Strip WordPress-specific classes but keep structure
  return html
    .replace(/class="[^"]*"/g, '') // Remove classes
    .replace(/<figure>/g, '<div class="image-wrapper">')
    .replace(/<\/figure>/g, '</div>')
    .trim();
}

// Helper: Extract images from content
function extractImages(content) {
  if (!content) return [];
  const imgRegex = /<img[^>]+src="([^">]+)"/g;
  const images = [];
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    images.push(match[1]);
  }
  return images;
}

// Helper: Get category name
function getCategoryName(categories) {
  const categoryMap = {
    1: 'Wedding',
    2: 'Engagement',
    3: 'Family',
    4: 'Portrait',
    5: 'Proposal',
    6: 'Anniversary'
  };
  if (!categories || categories.length === 0) return 'Photography';
  return categoryMap[categories[0]] || 'Photography';
}

// Helper: Generate blog post HTML
function generateBlogPostHTML(post, index) {
  const title = post.title.rendered;
  const slug = post.slug;
  const content = post.content.rendered;
  const excerpt = post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160);
  const date = new Date(post.date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const images = extractImages(content);
  const category = getCategoryName(post.categories);
  const featuredImage = images[0] || 'https://acromatico.com/wp-content/uploads/default-wedding.jpg';

  // Generate FAQ schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Where was this ${category.toLowerCase()} photographed?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `This ${category.toLowerCase()} was captured by Acromatico, serving South Florida, NYC, and destination locations worldwide.`
        }
      },
      {
        "@type": "Question",
        "name": "How can I book Acromatico for my wedding or event?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Visit https://acromatico.com/contact-us/ to inquire about availability and packages for your special day."
        }
      },
      {
        "@type": "Question",
        "name": "What photography style does Acromatico specialize in?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Acromatico specializes in authentic, unscripted moments with a cinematic, editorial approach. We focus on real emotions and genuine connections."
        }
      }
    ]
  };

  // Generate Article schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "image": images.slice(0, 3),
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": "Acromatico",
      "url": "https://acromatico.com/our-story/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Acromatico Photography",
      "logo": {
        "@type": "ImageObject",
        "url": "https://acromatico.com/wp-content/uploads/logo.png"
      }
    },
    "description": excerpt
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | Acromatico Photography</title>
    <meta name="description" content="${excerpt}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://acromatico.com/blog/${slug}.html">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${excerpt}">
    <meta property="og:image" content="${featuredImage}">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://acromatico.com/blog/${slug}.html">
    <meta property="twitter:title" content="${title}">
    <meta property="twitter:description" content="${excerpt}">
    <meta property="twitter:image" content="${featuredImage}">
    
    <!-- Schema.org structured data -->
    <script type="application/ld+json">
    ${JSON.stringify(articleSchema, null, 2)}
    </script>
    <script type="application/ld+json">
    ${JSON.stringify(faqSchema, null, 2)}
    </script>
    
    <!-- Local Business Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Acromatico Photography",
      "image": "https://acromatico.com/wp-content/uploads/logo.png",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Miami",
        "addressRegion": "FL",
        "addressCountry": "US"
      },
      "areaServed": ["Miami", "Fort Lauderdale", "Palm Beach", "New York City", "Hudson Valley"],
      "priceRange": "$$$",
      "telephone": "+1-XXX-XXX-XXXX",
      "url": "https://acromatico.com"
    }
    </script>
    
    <style>
        /* APPLE/TESLA MINIMALIST DESIGN */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        :root {
            --primary: #000;
            --secondary: #666;
            --accent: #0066CC;
            --bg: #FAFAFA;
            --text: #1D1D1F;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif;
            line-height: 1.6;
            color: var(--text);
            background: var(--bg);
            -webkit-font-smoothing: antialiased;
        }
        
        /* Hero Section */
        .hero {
            height: 85vh;
            background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${featuredImage}');
            background-size: cover;
            background-position: center;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: white;
            position: relative;
        }
        
        .hero-content {
            max-width: 900px;
            padding: 0 20px;
            animation: fadeInUp 1s ease;
        }
        
        .hero h1 {
            font-size: clamp(2.5rem, 6vw, 4.5rem);
            font-weight: 700;
            letter-spacing: -0.02em;
            margin-bottom: 1rem;
            text-shadow: 0 2px 20px rgba(0,0,0,0.5);
        }
        
        .hero-meta {
            font-size: 1.1rem;
            opacity: 0.95;
            font-weight: 300;
        }
        
        /* Navigation */
        nav {
            position: fixed;
            top: 0;
            width: 100%;
            background: rgba(255,255,255,0.95);
            backdrop-filter: blur(20px);
            z-index: 1000;
            padding: 1rem 5%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        nav a {
            color: var(--text);
            text-decoration: none;
            font-weight: 500;
            transition: opacity 0.3s;
        }
        
        nav a:hover {
            opacity: 0.6;
        }
        
        .logo {
            font-size: 1.5rem;
            font-weight: 700;
            letter-spacing: -0.02em;
        }
        
        /* Content Container */
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 4rem 5%;
        }
        
        .content {
            font-size: 1.15rem;
            line-height: 1.8;
            color: var(--text);
        }
        
        .content p {
            margin: 1.5rem 0;
        }
        
        .content h2, .content h3 {
            margin: 2.5rem 0 1rem;
            font-weight: 600;
            letter-spacing: -0.02em;
        }
        
        /* Image Gallery */
        .image-wrapper {
            margin: 3rem 0;
            animation: fadeIn 0.8s ease;
        }
        
        .image-wrapper img {
            width: 100%;
            height: auto;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        
        /* CTA Section */
        .cta {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 4rem 5%;
            text-align: center;
            margin: 4rem 0;
            border-radius: 12px;
        }
        
        .cta h2 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }
        
        .cta p {
            font-size: 1.2rem;
            margin-bottom: 2rem;
            opacity: 0.95;
        }
        
        .btn {
            display: inline-block;
            background: white;
            color: #764ba2;
            padding: 1rem 3rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            transition: transform 0.3s, box-shadow 0.3s;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }
        
        /* Related Posts */
        .related {
            padding: 4rem 5%;
            background: white;
        }
        
        .related h2 {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 3rem;
        }
        
        .related-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .related-card {
            text-decoration: none;
            color: var(--text);
            transition: transform 0.3s;
        }
        
        .related-card:hover {
            transform: translateY(-8px);
        }
        
        .related-card img {
            width: 100%;
            aspect-ratio: 16/9;
            object-fit: cover;
            border-radius: 8px;
        }
        
        .related-card h3 {
            margin-top: 1rem;
            font-size: 1.3rem;
        }
        
        /* Footer */
        footer {
            background: var(--primary);
            color: white;
            text-align: center;
            padding: 3rem 5%;
        }
        
        footer a {
            color: white;
            text-decoration: none;
            opacity: 0.8;
            transition: opacity 0.3s;
        }
        
        footer a:hover {
            opacity: 1;
        }
        
        /* Animations */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .hero {
                height: 70vh;
            }
            
            .container {
                padding: 2rem 5%;
            }
            
            .content {
                font-size: 1.05rem;
            }
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav>
        <a href="/" class="logo">ACROMATICO</a>
        <div>
            <a href="/static/blog-index.html">Blog</a>
        </div>
    </nav>
    
    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-content">
            <h1>${title}</h1>
            <div class="hero-meta">
                ${category} • ${date}
            </div>
        </div>
    </section>
    
    <!-- Content -->
    <div class="container">
        <article class="content">
            ${content}
        </article>
    </div>
    
    <!-- CTA -->
    <section class="cta">
        <h2>Ready to Create Your Story?</h2>
        <p>Let's capture the moments that matter most to you.</p>
        <a href="https://acromatico.com/contact-us/" class="btn">Get in Touch</a>
    </section>
    
    <!-- Related Posts -->
    <section class="related">
        <h2>More Stories</h2>
        <div class="related-grid">
            <a href="/static/blog-index.html" class="related-card">
                <img src="https://acromatico.com/wp-content/uploads/related-1.jpg" alt="Related Story">
                <h3>View All ${category} Stories</h3>
            </a>
        </div>
    </section>
    
    <!-- Footer -->
    <footer>
        <p>&copy; ${new Date().getFullYear()} Acromatico Photography. All rights reserved.</p>
        <p>
            <a href="https://acromatico.com">Home</a> • 
            <a href="https://acromatico.com/our-story/">Our Story</a> • 
            <a href="https://acromatico.com/contact-us/">Contact</a>
        </p>
    </footer>
</body>
</html>`;
}

// Generate all blog posts
let successCount = 0;
let errorCount = 0;

allPosts.forEach((post, index) => {
  try {
    const html = generateBlogPostHTML(post, index);
    const filename = `${post.slug}.html`;
    const filepath = path.join(OUTPUT_DIR, filename);
    
    fs.writeFileSync(filepath, html);
    successCount++;
    
    if ((index + 1) % 50 === 0) {
      console.log(`✅ Generated ${index + 1}/${allPosts.length} posts...`);
    }
  } catch (error) {
    console.error(`❌ Error generating ${post.slug}:`, error.message);
    errorCount++;
  }
});

console.log(`\n🎉 BLOG GENERATION COMPLETE!`);
console.log(`✅ Success: ${successCount} posts`);
console.log(`❌ Errors: ${errorCount} posts`);
console.log(`📁 Output: ${OUTPUT_DIR}/`);
