import { Hono } from 'hono'

const blog = new Hono()

// Import lightweight blog preview (first 100 posts with truncated content)
import blogPreview from '../blog_posts_data/blog_preview.json'

// Blog landing page
blog.get('/', async (c) => {
  const previewPosts = blogPreview as any[]
  
  return c.html(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog - Acromatico</title>
    <meta name="description" content="Real wedding stories, engagement sessions, and love stories captured by Acromatico across South Florida, NYC, and destinations worldwide.">
    
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif;
            background: #FAFAFA;
            color: #1D1D1F;
            line-height: 1.6;
        }
        
        /* Header */
        .site-header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 9999;
            padding: 20px 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: transparent;
        }
        
        .site-logo {
            max-width: 200px;
            height: auto;
            filter: brightness(0) invert(1);
            transition: all 0.3s;
        }
        
        .menu-toggle {
            position: fixed;
            top: 25px;
            right: 30px;
            z-index: 10000;
            background: transparent;
            border: none;
            cursor: pointer;
            width: 40px;
            height: 40px;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 6px;
        }
        
        .menu-toggle span {
            display: block;
            width: 30px;
            height: 2px;
            background: #ffffff;
            transition: all 0.3s ease;
            border-radius: 2px;
        }
        
        .menu-toggle:hover span {
            background: rgba(255,255,255,0.7);
        }
        
        /* Overlay Menu */
        .overlay-menu {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.98);
            z-index: 9998;
            display: none;
            align-items: center;
            justify-content: center;
        }
        
        .overlay-menu.active {
            display: flex;
        }
        
        .menu-content {
            text-align: center;
        }
        
        .menu-content a {
            display: block;
            color: white;
            text-decoration: none;
            font-size: 2rem;
            font-weight: 300;
            margin: 1.5rem 0;
            transition: opacity 0.3s;
        }
        
        .menu-content a:hover {
            opacity: 0.6;
        }
        
        /* Hero Section */
        .hero-section {
            min-height: 100vh;
            background-image: url('https://acromatico.com/wp-content/uploads/2022/03/Lifestyle-Newborn-Session-001-1024x682.jpg');
            background-position: center center;
            background-size: cover;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }
        
        .hero-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.35);
        }
        
        .hero-title {
            position: relative;
            z-index: 10;
            color: #ffffff;
            font-size: 56px;
            font-weight: 300;
            text-align: center;
            letter-spacing: -0.5px;
            line-height: 1.3em;
            max-width: 900px;
            padding: 0 40px;
            text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
            margin-bottom: 1rem;
        }
        
        .hero-subtitle {
            position: relative;
            z-index: 10;
            color: rgba(255, 255, 255, 0.95);
            font-size: 1.5rem;
            font-weight: 300;
            text-align: center;
            text-shadow: 0 1px 8px rgba(0,0,0,0.3);
        }
        
        /* Search & Filters */
        .controls {
            padding: 2rem 5%;
            background: white;
            border-top: 1px solid #E5E5E7;
        }
        
        .controls-wrapper {
            max-width: 1400px;
            margin: 0 auto;
        }
        
        .search-bar {
            width: 100%;
            max-width: 500px;
            margin: 0 auto 1.5rem;
            padding: 0.875rem 1.25rem;
            border: 1px solid #E5E5E7;
            border-radius: 8px;
            font-size: 0.95rem;
            transition: all 0.3s;
        }
        
        .search-bar:focus {
            outline: none;
            border-color: #000;
        }
        
        .filters {
            text-align: center;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.75rem;
        }
        
        .filter-btn {
            padding: 0.625rem 1.5rem;
            border: 1px solid #E5E5E7;
            border-radius: 6px;
            background: white;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 0.9rem;
            font-weight: 500;
            color: #1D1D1F;
        }
        
        .filter-btn:hover {
            background: #F5F5F7;
        }
        
        .filter-btn.active {
            background: #000;
            color: white;
            border-color: #000;
        }
        
        /* Blog Grid */
        .grid-wrapper {
            padding: 3rem 5%;
            background: #FAFAFA;
        }
        
        .grid {
            max-width: 1400px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
            gap: 2.5rem;
        }
        
        /* Blog Cards */
        .card {
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
            transition: all 0.3s;
            text-decoration: none;
            color: inherit;
            display: block;
        }
        
        .card:hover {
            transform: translateY(-6px);
            box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        }
        
        .card-img-wrapper {
            width: 100%;
            height: 280px;
            overflow: hidden;
            background: #F5F5F7;
        }
        
        .card-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.6s;
        }
        
        .card:hover .card-img {
            transform: scale(1.05);
        }
        
        .card-content {
            padding: 1.75rem;
        }
        
        .card-category {
            display: inline-block;
            background: #F5F5F7;
            color: #000;
            padding: 0.375rem 0.875rem;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 600;
            margin-bottom: 1rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        
        .card-title {
            font-size: 1.25rem;
            font-weight: 600;
            line-height: 1.4;
            margin-bottom: 0.75rem;
            color: #000;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        
        .card-date {
            font-size: 0.875rem;
            color: #86868B;
        }
        
        /* No Results */
        .no-results {
            text-align: center;
            padding: 4rem;
            font-size: 1.1rem;
            color: #86868B;
            display: none;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .grid {
                grid-template-columns: 1fr;
                gap: 2rem;
            }
            
            .nav-links {
                display: none;
            }
            
            .hero-title {
                font-size: 2.5rem;
                padding: 0 20px;
            }
            
            .hero-subtitle {
                font-size: 1.1rem;
            }
            
            .site-logo {
                max-width: 150px;
            }
        }
    </style>
</head>
<body>
    <header class="site-header">
        <a href="/">
            <img src="/static/acromatico-logo-white.png" alt="ACROMATICO" class="site-logo">
        </a>
    </header>
    
    <button class="menu-toggle" id="menuToggle" aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
    </button>
    
    <div class="overlay-menu" id="overlayMenu">
        <div class="menu-content">
            <a href="/">Home</a>
            <a href="/static/our-story-v2.html">Our Story</a>
            <a href="/blog">Blog</a>
            <a href="https://acromatico.com/galleries">Portfolio</a>
            <a href="https://acromatico.com/contact">Contact</a>
        </div>
    </div>
    
    <section class="hero-section">
        <h1 class="hero-title">Love Stories</h1>
        <p class="hero-subtitle"><span id="total-count">501</span> Real Weddings, Engagements & Moments</p>
    </section>
    
    <section class="controls">
        <div class="controls-wrapper">
            <input 
                type="search" 
                class="search-bar" 
                id="search" 
                placeholder="Search stories by name, location, or keyword..."
            >
            
            <div class="filters">
                <button class="filter-btn active" data-filter="all">All Stories</button>
                <button class="filter-btn" data-filter="wedding">Weddings</button>
                <button class="filter-btn" data-filter="engagement">Engagements</button>
                <button class="filter-btn" data-filter="family">Family</button>
                <button class="filter-btn" data-filter="proposal">Proposals</button>
                <button class="filter-btn" data-filter="portrait">Portraits</button>
            </div>
        </div>
    </section>
    
    <section class="grid-wrapper">
        <div class="grid" id="grid"></div>
        <div class="no-results" id="no-results">
            No stories found. Try a different search or filter.
        </div>
    </section>
    
    <script>
        let allPosts = [];
        let displayedPosts = 0;
        const POSTS_PER_PAGE = 50;
        
        let currentFilter = 'all';
        let currentSearch = '';
        
        // Load all posts from static JSON
        async function loadAllPosts() {
            try {
                const response = await fetch('/static/blog_posts_data/all_posts.json');
                const data = await response.json();
                allPosts = data;
                document.getElementById('total-count').textContent = allPosts.length;
                renderPosts();
            } catch (error) {
                console.error('Error loading posts:', error);
                allPosts = ${JSON.stringify(previewPosts)};
                renderPosts();
            }
        }
        
        function getCategory(title) {
            const titleLower = title.toLowerCase();
            if (titleLower.includes('wedding')) return 'Wedding';
            if (titleLower.includes('engagement')) return 'Engagement';
            if (titleLower.includes('proposal')) return 'Proposal';
            if (titleLower.includes('family')) return 'Family';
            if (titleLower.includes('portrait') || titleLower.includes('senior') || titleLower.includes('headshot')) return 'Portrait';
            return 'Photography';
        }
        
        function extractImage(content) {
            // Extract all img tags
            const imgRegex = /<img[^>]+>/g;
            const imgs = content.match(imgRegex) || [];
            
            // Find first image with real src (not data: URI)
            for (const img of imgs) {
                const srcMatch = img.match(/src="([^">]+)"/);
                if (srcMatch && srcMatch[1] && !srcMatch[1].startsWith('data:')) {
                    return srcMatch[1];
                }
            }
            
            return 'https://acromatico.com/wp-content/uploads/logo.png';
        }
        
        function cleanTitle(title) {
            return title.replace(/&#8211;/g, '–').replace(/&#8217;/g, "'").replace(/&#038;/g, '&');
        }
        
        function formatDate(dateStr) {
            return new Date(dateStr).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        }
        
        function renderPosts() {
            const grid = document.getElementById('grid');
            const noResults = document.getElementById('no-results');
            
            let filtered = allPosts.filter(post => {
                const title = cleanTitle(post.title.rendered).toLowerCase();
                const category = getCategory(title);
                
                const matchesFilter = currentFilter === 'all' || category.toLowerCase() === currentFilter;
                const matchesSearch = currentSearch === '' || title.includes(currentSearch);
                
                return matchesFilter && matchesSearch;
            });
            
            if (filtered.length === 0) {
                noResults.style.display = 'block';
                return;
            } else {
                noResults.style.display = 'none';
            }
            
            grid.innerHTML = '';
            
            const postsToShow = filtered.slice(0, displayedPosts + POSTS_PER_PAGE);
            displayedPosts = postsToShow.length;
            
            postsToShow.forEach(post => {
                const title = cleanTitle(post.title.rendered);
                const category = getCategory(title);
                const img = extractImage(post.content.rendered);
                const date = formatDate(post.date);
                
                const card = document.createElement('a');
                card.href = \`/blog/\${post.slug}\`;
                card.className = 'card';
                card.innerHTML = \`
                    <div class="card-img-wrapper">
                        <img src="\${img}" alt="\${title}" class="card-img" loading="lazy">
                    </div>
                    <div class="card-content">
                        <span class="card-category">\${category}</span>
                        <h3 class="card-title">\${title}</h3>
                        <p class="card-date">\${date}</p>
                    </div>
                \`;
                
                grid.appendChild(card);
            });
        }
        
        const filterBtns = document.querySelectorAll('.filter-btn');
        const searchBar = document.getElementById('search');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                displayedPosts = 0;
                renderPosts();
            });
        });
        
        searchBar.addEventListener('input', (e) => {
            currentSearch = e.target.value.toLowerCase();
            displayedPosts = 0;
            renderPosts();
        });
        
        loadAllPosts();
        
        // Menu toggle
        const menuToggle = document.getElementById('menuToggle');
        const overlayMenu = document.getElementById('overlayMenu');
        
        menuToggle.addEventListener('click', () => {
            overlayMenu.classList.toggle('active');
        });
        
        overlayMenu.addEventListener('click', (e) => {
            if (e.target === overlayMenu) {
                overlayMenu.classList.remove('active');
            }
        });
    </script>
    
    <!-- Footer -->
    <footer style="background: #0A0A0A; border-top: 1px solid rgba(255,255,255,0.1); padding: 4rem 5%; margin-top: 6rem;">
        <div style="max-width: 1200px; margin: 0 auto; text-align: center;">
            <a href="/" style="display: inline-block; margin-bottom: 2rem;">
                <img src="/static/acromatico-logo-white.png" alt="Acromatico Photography" style="height: 40px; width: auto;">
            </a>
            <div style="display: flex; justify-content: center; gap: 2rem; margin-bottom: 2rem; flex-wrap: wrap;">
                <a href="/static/our-story-v2.html" style="color: rgba(255,255,255,0.6); text-decoration: none; font-size: 0.95rem;">Our Story</a>
                <a href="/blog" style="color: rgba(255,255,255,0.6); text-decoration: none; font-size: 0.95rem;">Blog</a>
                <a href="https://acromatico.com/galleries" style="color: rgba(255,255,255,0.6); text-decoration: none; font-size: 0.95rem;">Portfolio</a>
                <a href="https://acromatico.com/contact" style="color: rgba(255,255,255,0.6); text-decoration: none; font-size: 0.95rem;">Contact</a>
            </div>
            <p style="color: rgba(255,255,255,0.4); font-size: 0.875rem; margin: 0;">© 2026 Acromatico Photography. Capturing love stories worldwide.</p>
        </div>
    </footer>
</body>
</html>
  `)
})

// Individual blog post - redirect to static file
blog.get('/:slug', async (c) => {
  const slug = c.req.param('slug')
  return c.redirect(`/static/blog/${slug}.html`)
})

export default blog
