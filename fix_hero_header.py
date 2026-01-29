#!/usr/bin/env python3
"""
SIMPLE HERO HEADER - Like Homepage
- Centered ACROMATICO logo at top
- Hamburger menu (top right)
- Clean hero section
- Then blog grid starts below
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
        
        /* Hero Section with Logo */
        .hero-header {
            position: relative;
            width: 100%;
            padding: 60px 40px 40px;
            text-align: center;
            background: #fff;
        }
        
        .hero-logo {
            max-width: 300px;
            height: auto;
            margin: 0 auto;
            display: block;
        }
        
        /* Hamburger Menu - Fixed Top Right */
        .menu-toggle {
            position: fixed;
            top: 20px;
            right: 30px;
            z-index: 10000;
            background: rgba(71, 148, 166, 0.15);
            border: none;
            border-radius: 6px;
            padding: 10px;
            width: 40px;
            height: 40px;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 5px;
            transition: background 0.3s;
        }
        
        .menu-toggle span {
            display: block;
            width: 24px;
            height: 2px;
            background: #4794A6;
            transition: all 0.3s;
        }
        
        .menu-toggle:hover {
            background: rgba(71, 148, 166, 0.25);
        }
        
        /* Blog Container */
        .blog-container {
            max-width: 1240px;
            margin: 0 auto;
            padding: 2rem 40px 4rem;
        }
        
        .blog-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
        }
        
        /* Blog Card */
        .blog-card {
            display: block;
            text-decoration: none;
            color: inherit;
            border-radius: 10px;
            overflow: hidden;
            background: #fff;
            box-shadow: 0 6px 15px -2px rgba(16, 24, 40, 0.05);
            transition: all 0.3s ease;
            height: 320px;
        }
        
        .blog-card:hover {
            box-shadow: 0 12px 24px -2px rgba(16, 24, 40, 0.12);
            transform: translateY(-2px);
        }
        
        /* Background image - COLOR by default */
        .blog-card-bg {
            position: relative;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            filter: saturate(100%) contrast(100%) brightness(100%);
            transition: all 0.5s ease;
        }
        
        /* B&W on HOVER */
        .blog-card:hover .blog-card-bg {
            transform: scale(1.02);
            filter: saturate(0%) contrast(67%) brightness(100%);
        }
        
        /* Overlay */
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
        
        .loading {
            text-align: center;
            padding: 4rem;
            font-size: 1.1rem;
            color: #999;
        }
        
        @media (max-width: 1024px) {
            .blog-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        
        @media (max-width: 768px) {
            .hero-header {
                padding: 40px 20px 30px;
            }
            
            .hero-logo {
                max-width: 220px;
            }
            
            .blog-container {
                padding: 1.5rem 20px 3rem;
            }
            
            .blog-grid {
                grid-template-columns: 1fr;
            }
            
            .blog-card {
                height: 280px;
            }
        }
    </style>
</head>
<body>
    <!-- Hamburger Menu - Fixed Top Right -->
    <button class="menu-toggle" id="menuToggle" aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
    </button>
    
    <!-- Hero Header with Centered Logo -->
    <div class="hero-header">
        <a href="/">
            <img src="/static/acromatico-logo-dark.png" alt="Acromatico Photography" class="hero-logo">
        </a>
    </div>
    
    <!-- Mobile Menu Container -->
    <div id="mobile-menu-container"></div>
    
    <!-- Blog Grid -->
    <div class="blog-container">
        <div class="loading" id="loading">Loading 501 stories...</div>
        <div class="blog-grid" id="blogGrid"></div>
    </div>
    
    <!-- Footer -->
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
                    if (script.src) {
                        newScript.src = script.src;
                    } else {
                        newScript.textContent = script.textContent;
                    }
                    document.body.appendChild(newScript);
                });
                console.log('Mobile menu loaded');
            })
            .catch(e => console.error('Menu error:', e));
        
        // Load footer
        fetch('/api/footer')
            .then(r => r.text())
            .then(html => {
                document.getElementById('footer-container').innerHTML = html;
                console.log('Footer loaded');
            })
            .catch(e => console.error('Footer error:', e));
        
        // Load blog posts
        async function loadBlogPosts() {
            try {
                console.log('Fetching posts...');
                const response = await fetch('/static/../blog_posts_data/all_posts.json');
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                
                const posts = await response.json();
                console.log(`Loaded ${posts.length} posts`);
                
                const blogGrid = document.getElementById('blogGrid');
                const loading = document.getElementById('loading');
                
                loading.style.display = 'none';
                
                posts.forEach((post, index) => {
                    let image = '';
                    const dataSrcMatch = post.content.rendered.match(/data-src="([^"]+)"/);
                    const srcMatch = post.content.rendered.match(/<img[^>]+src="([^">]+)"/);
                    
                    if (dataSrcMatch && !dataSrcMatch[1].includes('data:image')) {
                        image = dataSrcMatch[1];
                    } else if (srcMatch && !srcMatch[1].includes('data:image')) {
                        image = srcMatch[1];
                    } else {
                        image = 'https://acromatico.com/wp-content/uploads/default-wedding.jpg';
                    }
                    
                    let category = 'Photography';
                    const title = post.title.rendered.toLowerCase();
                    if (title.includes('wedding')) category = 'Wedding';
                    else if (title.includes('engagement')) category = 'Engagement';
                    else if (title.includes('family')) category = 'Family';
                    else if (title.includes('portrait')) category = 'Portrait';
                    else if (title.includes('proposal')) category = 'Proposal';
                    
                    const card = document.createElement('a');
                    card.href = `/static/blog/${post.slug}.html`;
                    card.className = 'blog-card';
                    card.innerHTML = `
                        <div class="blog-card-bg" style="background-image: url('${image}')">
                            <div class="blog-card-overlay">
                                <h2 class="blog-card-title">${post.title.rendered}</h2>
                                <span class="blog-card-category">${category}</span>
                            </div>
                        </div>
                    `;
                    
                    blogGrid.appendChild(card);
                });
                
                console.log(`✅ Rendered ${posts.length} cards`);
            } catch (error) {
                console.error('Error:', error);
                document.getElementById('loading').innerHTML = 'Error loading posts. Please refresh.';
            }
        }
        
        loadBlogPosts();
    </script>
</body>
</html>
'''

with open('/home/user/webapp/public/static/blog-index.html', 'w') as f:
    f.write(html_content)

print("✅ SIMPLE HERO HEADER!")
print("\nLayout:")
print("  - Centered ACROMATICO logo at top")
print("  - Hamburger (fixed top-right)")
print("  - Blog grid below")
print("  - Clean and simple!")
print("\nTest: http://localhost:3000/static/blog-index.html")
