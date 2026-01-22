const fs = require('fs');
const path = require('path');

// Load all posts data
const allPosts = JSON.parse(fs.readFileSync('./blog_posts_data/all_posts.json', 'utf-8'));

// Output directory
const outputDir = './public/static/blog';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Helper: Extract all images with metadata
function extractImagesWithMetadata(content) {
  const imgRegex = /<img[^>]+>/g;
  const srcRegex = /(?:src|data-src)="([^"]+)"/;
  const widthRegex = /width="(\d+)"/;
  const heightRegex = /height="(\d+)"/;
  
  const images = [];
  const matches = content.match(imgRegex) || [];
  
  for (const imgTag of matches) {
    const srcMatch = imgTag.match(srcRegex);
    const widthMatch = imgTag.match(widthRegex);
    const heightMatch = imgTag.match(heightRegex);
    
    if (srcMatch && srcMatch[1] && !srcMatch[1].startsWith('data:')) {
      const width = widthMatch ? parseInt(widthMatch[1]) : 0;
      const height = heightMatch ? parseInt(heightMatch[1]) : 0;
      const isLandscape = width > height;
      const isWide = width >= 1920 || width >= 2400;
      
      images.push({
        url: srcMatch[1],
        width,
        height,
        isLandscape,
        isWide,
        score: 0
      });
    }
  }
  
  return images;
}

// Helper: Select BEST cover image
function selectBestCoverImage(images) {
  if (images.length === 0) return 'https://acromatico.com/wp-content/uploads/logo.png';
  
  // Score each image
  for (const img of images) {
    let score = 0;
    
    // Prefer wide landscape images (hero material)
    if (img.isLandscape) score += 10;
    if (img.isWide) score += 15;
    
    // Prefer larger images
    if (img.width >= 2400) score += 20;
    else if (img.width >= 1920) score += 15;
    else if (img.width >= 1600) score += 10;
    
    // Aspect ratio score (prefer 3:2 or 16:9)
    const ratio = img.width / img.height;
    if (ratio >= 1.4 && ratio <= 1.7) score += 10; // 3:2 ratio
    if (ratio >= 1.7 && ratio <= 1.9) score += 8;  // 16:9 ratio
    
    img.score = score;
  }
  
  // Sort by score (descending)
  images.sort((a, b) => b.score - a.score);
  
  return images[0].url;
}

// Helper: Clean HTML content
function cleanContent(content) {
  // Remove lazy-load placeholders
  content = content.replace(/src="data:image\/gif[^"]*"/g, '');
  content = content.replace(/data-src="/g, 'src="');
  
  // Remove WordPress figure/gallery blocks
  content = content.replace(/<figure[^>]*class="wp-block-gallery[^>]*>.*?<\/figure>/gs, '');
  content = content.replace(/<figure[^>]*class="wp-block-image[^>]*>.*?<\/figure>/gs, '');
  
  return content;
}

// Helper: Get category from title
function getCategory(title) {
  const titleLower = title.toLowerCase();
  if (titleLower.includes('wedding')) return 'Wedding';
  if (titleLower.includes('engagement')) return 'Engagement';
  if (titleLower.includes('proposal')) return 'Proposal';
  if (titleLower.includes('family')) return 'Family';
  if (titleLower.includes('portrait') || titleLower.includes('senior') || titleLower.includes('headshot')) return 'Portrait';
  return 'Photography';
}

// Helper: Clean title
function cleanTitle(title) {
  return title
    .replace(/&#8211;/g, '–')
    .replace(/&#8217;/g, "'")
    .replace(/&#038;/g, '&')
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"');
}

// Generate HTML for a single post
function generatePostHTML(post) {
  const title = cleanTitle(post.title.rendered);
  const slug = post.slug;
  const date = new Date(post.date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const category = getCategory(title);
  
  // Extract images with metadata
  const imagesWithMeta = extractImagesWithMetadata(post.content.rendered);
  
  // Select BEST cover image
  const coverImage = selectBestCoverImage(imagesWithMeta);
  
  // Get all image URLs (for gallery)
  const allImages = imagesWithMeta.map(img => img.url);
  
  // Clean content
  const cleanedContent = cleanContent(post.content.rendered);
  const excerpt = post.excerpt.rendered.replace(/<[^>]*>/g, '').trim().substring(0, 160);
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | Acromatico</title>
    <meta name="description" content="${excerpt}">
    
    <!-- Open Graph -->
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://acromatico.com/blog/${slug}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${excerpt}">
    <meta property="og:image" content="${coverImage}">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://acromatico.com/blog/${slug}">
    <meta property="twitter:title" content="${title}">
    <meta property="twitter:description" content="${excerpt}">
    <meta property="twitter:image" content="${coverImage}">
    
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif;
            line-height: 1.8;
            color: #1D1D1F;
            background: #FAFAFA;
            -webkit-font-smoothing: antialiased;
        }
        
        /* Navigation */
        nav {
            position: fixed;
            top: 0;
            width: 100%;
            background: rgba(255,255,255,0.9);
            backdrop-filter: blur(20px);
            z-index: 1000;
            padding: 1rem 5%;
            box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }
        
        .nav-content {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo-img {
            height: 32px;
            width: auto;
        }
        
        .nav-links {
            display: flex;
            gap: 2rem;
        }
        
        .nav-links a {
            color: #1D1D1F;
            text-decoration: none;
            font-size: 0.95rem;
            font-weight: 500;
            transition: opacity 0.3s;
        }
        
        .nav-links a:hover {
            opacity: 0.6;
        }
        
        /* Hero */
        .hero {
            height: 80vh;
            min-height: 600px;
            background: linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.25)), url('${coverImage}');
            background-size: cover;
            background-position: center;
            display: flex;
            align-items: flex-end;
            padding: 0 5% 8rem;
            position: relative;
        }
        
        .hero-content {
            max-width: 900px;
            color: white;
            animation: fadeInUp 1s ease;
        }
        
        .category-badge {
            display: inline-block;
            background: rgba(255,255,255,0.2);
            backdrop-filter: blur(10px);
            padding: 0.5rem 1.25rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 1.5rem;
        }
        
        h1 {
            font-size: clamp(2rem, 5vw, 3.5rem);
            font-weight: 700;
            margin-bottom: 1rem;
            letter-spacing: -0.03em;
            line-height: 1.2;
        }
        
        .post-meta {
            font-size: 1rem;
            opacity: 0.95;
        }
        
        /* Content Container */
        .container {
            max-width: 900px;
            margin: -6rem auto 4rem;
            padding: 0 5%;
            position: relative;
            z-index: 10;
        }
        
        /* Content Card */
        .content-card {
            background: white;
            border-radius: 16px;
            padding: 4rem;
            box-shadow: 0 8px 40px rgba(0,0,0,0.12);
            margin-bottom: 4rem;
        }
        
        .content {
            font-size: 1.125rem;
            line-height: 1.9;
            color: #1D1D1F;
        }
        
        .content p {
            margin: 1.75rem 0;
        }
        
        .content h2,
        .content h3 {
            margin: 3rem 0 1.5rem;
            font-weight: 700;
            letter-spacing: -0.02em;
            color: #000;
        }
        
        .content h2 {
            font-size: 2rem;
        }
        
        .content h3 {
            font-size: 1.5rem;
        }
        
        .content a {
            color: #0066CC;
            text-decoration: none;
            border-bottom: 2px solid transparent;
            transition: border-color 0.3s;
        }
        
        .content a:hover {
            border-bottom-color: #0066CC;
        }
        
        /* Image Gallery */
        .gallery {
            margin: 4rem 0;
        }
        
        .gallery-grid {
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }
        
        .gallery-item {
            width: 100%;
            overflow: hidden;
            border-radius: 8px;
        }
        
        .gallery-item img {
            width: 100%;
            height: auto;
            display: block;
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
        
        /* Mobile */
        @media (max-width: 768px) {
            nav {
                padding: 1rem 4%;
            }
            
            .nav-links {
                display: none;
            }
            
            .hero {
                height: 60vh;
                padding: 0 4% 4rem;
            }
            
            .content-card {
                padding: 2rem 1.5rem;
                margin-top: -4rem;
            }
            
            .content {
                font-size: 1rem;
                line-height: 1.7;
            }
            
            .gallery {
                margin: 2rem -1.5rem;
            }
            
            .gallery-item {
                border-radius: 0;
            }
        }
    </style>
</head>
<body>
    <nav>
        <div class="nav-content">
            <a href="/">
                <img src="/static/acromatico-logo-dark.png" alt="Acromatico" class="logo-img">
            </a>
            <div class="nav-links">
                <a href="/static/our-story-v2.html">Our Story</a>
                <a href="/blog">Blog</a>
                <a href="https://acromatico.com/galleries">Portfolio</a>
                <a href="https://acromatico.com/contact">Contact</a>
            </div>
        </div>
    </nav>
    
    <section class="hero">
        <div class="hero-content">
            <span class="category-badge">${category}</span>
            <h1>${title}</h1>
            <p class="post-meta">${date}</p>
        </div>
    </section>
    
    <div class="container">
        <article class="content-card">
            <div class="content">
                ${cleanedContent}
            </div>
            
            ${allImages.length > 0 ? `
            <section class="gallery">
                <div class="gallery-grid">
                    ${allImages.map(img => `
                        <div class="gallery-item">
                            <img src="${img}" alt="${title}" loading="lazy">
                        </div>
                    `).join('')}
                </div>
            </section>
            ` : ''}
        </article>
    </div>
</body>
</html>`;
}

// Generate all posts
console.log(`🚀 Generating ${allPosts.length} blog posts with BEST cover images...`);

let successCount = 0;
let errorCount = 0;

for (const post of allPosts) {
  try {
    const html = generatePostHTML(post);
    const filename = `${post.slug}.html`;
    const filepath = path.join(outputDir, filename);
    
    fs.writeFileSync(filepath, html, 'utf-8');
    successCount++;
    
    if (successCount % 50 === 0) {
      console.log(`✅ Generated ${successCount}/${allPosts.length} posts...`);
    }
  } catch (error) {
    console.error(`❌ Error generating ${post.slug}:`, error.message);
    errorCount++;
  }
}

console.log(`\n🎉 COMPLETE!`);
console.log(`✅ Success: ${successCount} posts`);
console.log(`❌ Errors: ${errorCount} posts`);
console.log(`📁 Output: ${outputDir}`);
console.log(`\n🎯 FEATURES:`);
console.log(`  - BEST cover images selected (not just first image)`);
console.log(`  - Acromatico logo in header`);
console.log(`  - NO FAQs, NO SEO fluff, NO CTAs`);
console.log(`  - Clean, authentic stories only`);
