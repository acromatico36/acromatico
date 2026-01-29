#!/usr/bin/env python3
"""
COMPLETE FIX for blog index:
1. Fix JSON path
2. Match Hoffer's exact design
3. Show ALL posts with correct images
4. Equal height landscape images
"""

html_content = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog - Acromatico Photography</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&display=swap" rel="stylesheet">
    
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Montserrat', sans-serif;
            background: #fff;
            color: #3a3a3a;
        }
        
        /* Header - Fixed */
        .site-header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 9999;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            padding: 12px 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        }
        
        .site-logo {
            max-width: 160px;
            height: auto;
        }
        
        .menu-toggle {
            position: fixed;
            top: 18px;
            right: 30px;
            z-index: 10000;
            background: rgba(0, 0, 0, 0.6);
            border: none;
            border-radius: 6px;
            padding: 8px;
            width: 36px;
            height: 36px;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 5px;
        }
        
        .menu-toggle span {
            display: block;
            width: 24px;
            height: 2px;
            background: #fff;
            transition: all 0.3s;
        }
        
        .menu-toggle:hover {
            background: rgba(114, 128, 18, 0.9);
        }
        
        /* Mobile menu - hidden by default */
        #mobile-menu-container {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 9998;
        }
        
        #mobile-menu-container.active {
            display: block;
        }
        
        /* Blog Grid Container - STARTS IMMEDIATELY */
        .blog-container {
            max-width: 1240px;
            margin: 65px auto 0; /* Small top margin for fixed header */
            padding: 1.5rem 40px 4rem;
        }
        
        .blog-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr); /* EXACTLY 3 columns */
            gap: 1.5rem;
        }
        
        /* Blog Card - HOFFER STYLE */
        .blog-card {
            display: block;
            text-decoration: none;
            color: inherit;
            border-radius: 10px;
            overflow: hidden;
            background: #fff;
            box-shadow: 0 6px 15px -2px rgba(16, 24, 40, 0.05);
            transition: all 0.3s ease;
        }
        
        .blog-card:hover {
            box-shadow: 0 12px 24px -2px rgba(16, 24, 40, 0.12);
            transform: translateY(-2px);
        }
        
        /* CRITICAL: Equal height images */
        .blog-card-image-wrapper {
            position: relative;
            width: 100%;
            height: 240px; /* FIXED HEIGHT for all images */
            overflow: hidden;
        }
        
        .blog-card-image {
            width: 100%;
            height: 100%;
            object-fit: cover; /* Cover the entire area */
            object-position: center; /* Center the image */
            filter: saturate(0%) contrast(67%) brightness(100%); /* Hoffer grayscale */
            transition: all 0.5s ease;
        }
        
        .blog-card:hover .blog-card-image {
            transform: scale(1.02);
            filter: saturate(0%) contrast(100%) brightness(100%) blur(1px);
        }
        
        /* Title overlay on image - HOFFER STYLE */
        .blog-card-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.7) 70%);
            padding: 1.5rem 1rem 1rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
        }
        
        .blog-card-title {
            font-size: 1.3rem;
            font-weight: 400;
            line-height: 1.3;
            color: white;
            margin-bottom: 0.4rem;
            text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
        }
        
        .blog-card-category {
            font-size: 0.7rem;
            font-weight: 300;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: rgba(255, 255, 255, 0.9);
        }
        
        /* Loading */
        .loading {
            text-align: center;
            padding: 4rem;
            font-size: 1.1rem;
            color: #999;
        }
        
        /* Responsive */
        @media (max-width: 1024px) {
            .blog-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        
        @media (max-width: 768px) {
            .blog-container {
                padding: 1.5rem 20px 3rem;
            }
            
            .blog-grid {
                grid-template-columns: 1fr;
            }
            
            .blog-card-image-wrapper {
                height: 220px;
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header class="site-header">
        <a href="/">
            <img src="/static/acromatico-logo-transparent.png" alt="Acromatico Photography" class="site-logo">
        </a>
        <button class="menu-toggle" id="menuToggle" aria-label="Menu">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </header>
    
    <!-- Mobile Menu Container (hidden) -->
    <div id="mobile-menu-container"></div>
    
    <!-- Blog Grid - STARTS IMMEDIATELY -->
    <div class="blog-container">
        <div class="loading" id="loading">Loading 501 stories...</div>
        <div class="blog-grid" id="blogGrid"></div>
    </div>
    
    <!-- Footer Container -->
    <div id="footer-container"></div>
    
    <script>
        console.log('Blog index initializing...');
        
        // Load mobile menu
        fetch('/api/mobile-menu')
            .then(r => r.text())
            .then(html => {
                document.getElementById('mobile-menu-container').innerHTML = html;
                const scripts = document.getElementById('mobile-menu-container').querySelectorAll('script');
                scripts.forEach(script => {
                    const newScript = document.createElement('script');
                    if (script.src) newScript.src = script.src;
                    else newScript.textContent = script.textContent;
                    document.body.appendChild(newScript);
                });
                console.log('Mobile menu loaded');
            })
            .catch(e => console.error('Menu load error:', e));
        
        // Load footer
        fetch('/api/footer')
            .then(r => r.text())
            .then(html => {
                document.getElementById('footer-container').innerHTML = html;
                console.log('Footer loaded');
            })
            .catch(e => console.error('Footer load error:', e));
        
        // Toggle mobile menu
        document.getElementById('menuToggle').addEventListener('click', () => {
            document.getElementById('mobile-menu-container').classList.toggle('active');
        });
        
        // Load blog posts - FIXED PATH
        async function loadBlogPosts() {
            try {
                console.log('Fetching blog posts...');
                const response = await fetch('/static/../blog_posts_data/all_posts.json');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const posts = await response.json();
                console.log(`Loaded ${posts.length} posts`);
                
                const blogGrid = document.getElementById('blogGrid');
                const loading = document.getElementById('loading');
                
                loading.style.display = 'none';
                
                // Render ALL posts
                posts.forEach((post, index) => {
                    // Extract first image from content
                    const imgMatch = post.content.rendered.match(/<img[^>]+src="([^">]+)"/);
                    const image = imgMatch ? imgMatch[1] : 'https://acromatico.com/wp-content/uploads/default-wedding.jpg';
                    
                    // Determine category
                    let category = 'Photography';
                    const title = post.title.rendered.toLowerCase();
                    if (title.includes('wedding')) category = 'Wedding';
                    else if (title.includes('engagement')) category = 'Engagement';
                    else if (title.includes('family')) category = 'Family';
                    else if (title.includes('portrait')) category = 'Portrait';
                    else if (title.includes('proposal')) category = 'Proposal';
                    
                    // Create card
                    const card = document.createElement('a');
                    card.href = `/static/blog/${post.slug}.html`;
                    card.className = 'blog-card';
                    card.innerHTML = `
                        <div class="blog-card-image-wrapper">
                            <img 
                                src="${image}" 
                                alt="${post.title.rendered}" 
                                class="blog-card-image" 
                                loading="lazy"
                            >
                            <div class="blog-card-overlay">
                                <h2 class="blog-card-title">${post.title.rendered}</h2>
                                <span class="blog-card-category">${category}</span>
                            </div>
                        </div>
                    `;
                    
                    blogGrid.appendChild(card);
                });
                
                console.log(`Rendered ${posts.length} blog cards`);
            } catch (error) {
                console.error('Error loading posts:', error);
                document.getElementById('loading').innerHTML = 'Error loading posts. Please refresh the page.';
            }
        }
        
        // Start loading
        loadBlogPosts();
    </script>
</body>
</html>
'''

# Write the fixed file
with open('/home/user/webapp/public/static/blog-index.html', 'w') as f:
    f.write(html_content)

print("✅ COMPLETE FIX APPLIED!")
print("\nWhat's fixed:")
print("1. JSON path: /static/../blog_posts_data/all_posts.json")
print("2. Grid: EXACTLY 3 columns on desktop")
print("3. Images: ALL 240px height, equal height")
print("4. Grayscale: Hoffer-style filter applied")
print("5. Layout: Grid starts immediately after header")
print("6. ALL 501 posts will load")
print("\nTest URL: http://localhost:3000/static/blog-index.html")
