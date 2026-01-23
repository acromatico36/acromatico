const fs = require('fs');

// Load post data
const allPosts = JSON.parse(fs.readFileSync('./blog_posts_data/all_posts.json', 'utf-8'));

// Find the surprise proposal post
const post = allPosts.find(p => p.slug === 'surprise-proposal-sarasota');

if (!post) {
  console.log('Post not found!');
  process.exit(1);
}

// Extract images from content
function extractImages(htmlContent) {
  const images = [];
  const imgRegex = /src="([^"]+\.(?:jpg|jpeg|png|webp|gif))"/gi;
  let match;
  while ((match = imgRegex.exec(htmlContent)) !== null) {
    if (!match[1].includes('data:image') && !match[1].includes('placeholder')) {
      images.push(match[1]);
    }
  }
  return [...new Set(images)]; // Remove duplicates
}

// Extract clean text from HTML
function extractText(html) {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[^;]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const images = extractImages(post.content.rendered);
const cleanText = extractText(post.content.rendered);
const coverImage = images[0] || 'https://acromatico.com/wp-content/uploads/2024/09/Selby-gardens-sarasota-proposal-engagement-photos-8-2.jpeg';

// Split images into 3 sections
const section1Images = images.slice(0, Math.floor(images.length * 0.3));
const section2Images = images.slice(Math.floor(images.length * 0.3), Math.floor(images.length * 0.7));
const section3Images = images.slice(Math.floor(images.length * 0.7));

console.log(`Found ${images.length} images`);
console.log(`Section 1: ${section1Images.length} images`);
console.log(`Section 2: ${section2Images.length} images`);
console.log(`Section 3: ${section3Images.length} images`);
console.log(`Text length: ${cleanText.length} chars`);

// Generate ONE perfect blog post
const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${post.title.rendered} | Acromatico Photography</title>
    
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
            line-height: 1.7;
            color: #1a1a1a;
            background: #fafafa;
        }
        
        /* Navigation */
        nav {
            position: fixed;
            top: 0;
            width: 100%;
            background: rgba(255,255,255,0.98);
            backdrop-filter: blur(10px);
            z-index: 1000;
            border-bottom: 1px solid rgba(0,0,0,0.08);
        }
        
        .nav-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo-img { height: 32px; }
        
        .nav-links {
            display: flex;
            gap: 2rem;
        }
        
        .nav-links a {
            color: #1a1a1a;
            text-decoration: none;
            font-size: 15px;
            font-weight: 500;
            transition: opacity 0.2s;
        }
        
        .nav-links a:hover { opacity: 0.6; }
        
        /* Hero - Full Screen */
        .hero {
            height: 100vh;
            min-height: 700px;
            background: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4)), url('${coverImage}') center/cover;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 0 2rem;
            margin-top: 60px;
        }
        
        .hero-content {
            max-width: 900px;
            margin: 0 auto;
            color: white;
        }
        
        h1 {
            font-size: clamp(2rem, 4vw, 3rem);
            font-weight: 700;
            line-height: 1.2;
            margin-bottom: 1rem;
        }
        
        .hero-meta {
            font-size: 1.1rem;
            opacity: 0.9;
        }
        
        /* Main Content */
        .container {
            max-width: 900px;
            margin: -8rem auto 4rem;
            padding: 0 2rem;
            position: relative;
        }
        
        .content-card {
            background: white;
            border-radius: 12px;
            padding: 3rem;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }
        
        .content p {
            font-size: 1.0625rem;
            line-height: 1.7;
            margin-bottom: 1.25rem;
            color: #333;
        }
        
        .content h2 {
            font-size: 1.75rem;
            font-weight: 700;
            margin: 2.5rem 0 1rem;
            color: #000;
        }
        
        /* Two-Column Gallery (WordPress Style) */
        .gallery {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.5rem;
            margin: 1.5rem 0;
        }
        
        .gallery-image {
            width: 100%;
            cursor: pointer;
            transition: opacity 0.3s;
        }
        
        .gallery-image:hover {
            opacity: 0.92;
        }
        
        .gallery-image img {
            width: 100%;
            height: auto;
            display: block;
        }
        
        /* Lightbox */
        .lightbox {
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.95);
            z-index: 9999;
            align-items: center;
            justify-content: center;
        }
        
        .lightbox.active { display: flex; }
        
        .lightbox-content { max-width: 90vw; max-height: 90vh; }
        
        .lightbox-content img {
            max-width: 100%;
            max-height: 90vh;
            object-fit: contain;
        }
        
        .lightbox-close {
            position: absolute;
            top: 20px;
            right: 40px;
            font-size: 3rem;
            color: white;
            cursor: pointer;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255,255,255,0.1);
            border-radius: 50%;
        }
        
        .lightbox-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            font-size: 2rem;
            color: white;
            cursor: pointer;
            padding: 1rem 1.5rem;
            background: rgba(255,255,255,0.1);
            border-radius: 8px;
        }
        
        .lightbox-prev { left: 20px; }
        .lightbox-next { right: 20px; }
        
        @media (max-width: 768px) {
            .nav-links { display: none; }
            .hero { 
                height: 100vh; 
                min-height: 600px;
            }
            .container { margin-top: -6rem; padding: 0 1rem; }
            .content-card { padding: 2rem 1.5rem; }
            .gallery { grid-template-columns: 1fr; gap: 0.35rem; margin: 1rem 0; }
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav>
        <div class="nav-content">
            <a href="/"><img src="/static/acromatico-logo-dark.png" alt="Acromatico" class="logo-img"></a>
            <div class="nav-links">
                <a href="/our-story">Our Story</a>
                <a href="/blog">Blog</a>
                <a href="/portfolio">Portfolio</a>
                <a href="/contact">Contact</a>
            </div>
        </div>
    </nav>
    
    <!-- Hero -->
    <section class="hero">
        <div class="hero-content">
            <h1>${post.title.rendered}</h1>
            <p class="hero-meta">Sarasota, Florida | September 2024</p>
        </div>
    </section>
    
    <!-- Main Content -->
    <div class="container">
        <article class="content-card">
            <div class="content">
                <p>Planning a surprise proposal is no small feat, but when it takes place in one of Sarasota's most beautiful locations, it becomes an unforgettable memory. Sarasota's Shelby Gardens, with its lush landscapes and serene beauty, offers the perfect backdrop for such a romantic gesture.</p>
            </div>
            
            <!-- Gallery Section 1 -->
            <div class="gallery">
                ${section1Images.map((img, i) => `
                    <div class="gallery-image">
                        <img src="${img}" alt="Surprise Proposal Sarasota - Photo ${i + 1}" loading="lazy">
                    </div>
                `).join('')}
            </div>
            
            <div class="content">
                <h2>A Beautiful Introduction: Shelby Gardens in Sarasota</h2>
                
                <p>Stepping into Shelby Gardens feels like entering a botanical paradise. Nestled in the heart of Sarasota, this lush garden is renowned for its stunning greenery, exotic plants, and peaceful atmosphere. It's a place where love naturally blooms, making it an ideal setting for a surprise proposal.</p>
                
                <p>For Isander, Shelby Gardens wasn't just a location; it was the perfect canvas to paint a lifelong memory. The vibrant colors of blooming flowers, the gentle rustling of leaves, and the tranquility of the gardens created a scene straight out of a fairytale.</p>
            </div>
            
            <!-- Gallery Section 2 -->
            <div class="gallery">
                ${section2Images.map((img, i) => `
                    <div class="gallery-image">
                        <img src="${img}" alt="Surprise Proposal Sarasota - Photo ${section1Images.length + i + 1}" loading="lazy">
                    </div>
                `).join('')}
            </div>
            
            <div class="content">
                <h2>The Big Surprise: A Moment of Pure Joy</h2>
                
                <p>Natalie had no idea what was in store when her mom and best friend invited her for a casual outing to Shelby Gardens. Little did she know that Isander, who she thought was on his way to New York, was waiting with a diamond ring and a heart full of love.</p>
                
                <p>The sun shone brightly that day, casting a golden glow over the gardens. With hardly any visitors around, the setting felt intimate and secluded—the perfect atmosphere for a surprise proposal. As Natalie strolled through the gardens, the anticipation was building. Meanwhile, Isander, hidden nearby, was preparing for the big moment.</p>
                
                <p>When Natalie turned a corner, she saw him standing there, a mix of nervousness and excitement on his face. The look in her eyes said it all: pure shock, joy, and love. In that special moment, Isander dropped to one knee and asked the question that would change both their lives forever. Tears streamed down Natalie's face as she said "Yes!"—a moment neither of them would ever forget.</p>
            </div>
            
            <!-- Gallery Section 3 -->
            <div class="gallery">
                ${section3Images.map((img, i) => `
                    <div class="gallery-image">
                        <img src="${img}" alt="Surprise Proposal Sarasota - Photo ${section1Images.length + section2Images.length + i + 1}" loading="lazy">
                    </div>
                `).join('')}
            </div>
        </article>
    </div>
    
    <!-- Lightbox -->
    <div class="lightbox" id="lightbox">
        <span class="lightbox-close" id="lightbox-close">&times;</span>
        <span class="lightbox-nav lightbox-prev" id="lightbox-prev">&#8249;</span>
        <div class="lightbox-content">
            <img src="" alt="" id="lightbox-img">
        </div>
        <span class="lightbox-nav lightbox-next" id="lightbox-next">&#8250;</span>
    </div>
    
    <script>
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const images = Array.from(document.querySelectorAll('.gallery-image img'));
        let currentIndex = 0;
        
        images.forEach((img, index) => {
            img.addEventListener('click', () => {
                currentIndex = index;
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        document.getElementById('lightbox-close').addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        document.getElementById('lightbox-prev').addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            lightboxImg.src = images[currentIndex].src;
        });
        
        document.getElementById('lightbox-next').addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            lightboxImg.src = images[currentIndex].src;
        });
        
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') lightbox.classList.remove('active'), document.body.style.overflow = 'auto';
            if (e.key === 'ArrowLeft') document.getElementById('lightbox-prev').click();
            if (e.key === 'ArrowRight') document.getElementById('lightbox-next').click();
        });
    </script>
</body>
</html>`;

// Write the file
fs.writeFileSync('./public/static/blog/surprise-proposal-sarasota-NEW.html', html, 'utf-8');

console.log('✅ Generated NEW surprise-proposal-sarasota.html');
console.log('📍 File: ./public/static/blog/surprise-proposal-sarasota-NEW.html');
console.log(`📸 Images: ${images.length}`);
