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
    <title>Blog - Acromatico Photography | 501+ Real Stories</title>
    <meta name="description" content="Explore 501+ real wedding stories, engagement sessions, and love stories captured by Acromatico across South Florida, NYC, and destinations worldwide.">
    
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif;
            background: #FAFAFA;
            color: #1D1D1F;
            line-height: 1.6;
        }
        
        nav {
            position: fixed;
            top: 0;
            width: 100%;
            background: rgba(255,255,255,0.72);
            backdrop-filter: saturate(180%) blur(20px);
            z-index: 1000;
            padding: 1rem 5%;
            box-shadow: 0 1px 0 rgba(0,0,0,0.05);
        }
        .nav-content {
            max-width: 1400px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .logo {
            font-size: 1.25rem;
            font-weight: 600;
            letter-spacing: -0.02em;
            color: #1D1D1F;
            text-decoration: none;
        }
        .nav-links {
            display: flex;
            gap: 2rem;
        }
        .nav-links a {
            color: #1D1D1F;
            text-decoration: none;
            font-size: 0.95rem;
            transition: opacity 0.3s;
        }
        .nav-links a:hover {
            opacity: 0.6;
        }
        
        .hero {
            padding: 8rem 5% 4rem;
            text-align: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            position: relative;
            overflow: hidden;
        }
        .hero::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
            background-size: 50px 50px;
            animation: drift 20s linear infinite;
        }
        @keyframes drift {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 50px); }
        }
        .hero-content {
            position: relative;
            z-index: 1;
        }
        h1 {
            font-size: clamp(2.5rem, 8vw, 5rem);
            font-weight: 700;
            margin-bottom: 1rem;
            letter-spacing: -0.03em;
        }
        .subtitle {
            font-size: clamp(1.1rem, 3vw, 1.5rem);
            opacity: 0.95;
            font-weight: 400;
        }
        
        .controls {
            padding: 2.5rem 5%;
            background: white;
            position: sticky;
            top: 60px;
            z-index: 100;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .controls-wrapper {
            max-width: 1400px;
            margin: 0 auto;
        }
        .search-bar {
            width: 100%;
            max-width: 600px;
            margin: 0 auto 1.5rem;
            padding: 1rem 1.5rem;
            border: 2px solid #E5E5E7;
            border-radius: 50px;
            font-size: 1rem;
            transition: all 0.3s;
            background: #F5F5F7;
        }
        .search-bar:focus {
            outline: none;
            border-color: #667eea;
            background: white;
        }
        .filters {
            text-align: center;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.75rem;
        }
        .filter-btn {
            padding: 0.75rem 1.75rem;
            border: 2px solid #E5E5E7;
            border-radius: 50px;
            background: white;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 0.95rem;
            font-weight: 500;
            color: #1D1D1F;
        }
        .filter-btn:hover {
            border-color: #667eea;
            color: #667eea;
        }
        .filter-btn.active {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-color: transparent;
        }
        
        .grid-wrapper {
            padding: 3rem 5%;
            background: #FAFAFA;
        }
        .grid {
            max-width: 1400px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 2rem;
        }
        
        .card {
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 2px 12px rgba(0,0,0,0.06);
            transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
            text-decoration: none;
            color: inherit;
            display: block;
            position: relative;
        }
        .card:hover {
            transform: translateY(-12px);
            box-shadow: 0 16px 40px rgba(0,0,0,0.12);
        }
        .card-img {
            width: 100%;
            height: 280px;
            object-fit: cover;
            transition: transform 0.6s;
        }
        .card:hover .card-img {
            transform: scale(1.08);
        }
        .card-content {
            padding: 1.75rem;
        }
        .card-category {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 0.4rem 1.1rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            margin-bottom: 1rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .card-title {
            font-size: 1.35rem;
            font-weight: 600;
            line-height: 1.4;
            margin-bottom: 0.5rem;
            color: #1D1D1F;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        .card-date {
            font-size: 0.9rem;
            color: #86868B;
            font-weight: 400;
        }
        
        .loading {
            text-align: center;
            padding: 4rem;
            font-size: 1.25rem;
            color: #86868B;
        }
        
        .no-results {
            text-align: center;
            padding: 4rem;
            font-size: 1.25rem;
            color: #86868B;
            display: none;
        }
        
        .load-more {
            text-align: center;
            padding: 3rem;
        }
        .load-more-btn {
            padding: 1rem 3rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 50px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
        }
        .load-more-btn:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }
        
        @media (max-width: 768px) {
            .grid {
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }
            .nav-links {
                display: none;
            }
            .hero {
                padding: 6rem 5% 3rem;
            }
            h1 {
                font-size: 2.5rem;
            }
        }
    </style>
</head>
<body>
    <nav>
        <div class="nav-content">
            <a href="/" class="logo">ACROMATICO</a>
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
            <h1>Love Stories</h1>
            <p class="subtitle"><span id="total-count">501</span> Real Weddings, Engagements & Moments</p>
        </div>
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
        <div class="load-more" id="load-more" style="display: none;">
            <button class="load-more-btn" onclick="loadMore()">Load More Stories</button>
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
                // Fallback to server-rendered preview
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
            const match = content.match(/<img[^>]+src="([^">]+)"/);
            return match ? match[1] : 'https://via.placeholder.com/400x300/667eea/ffffff?text=Acromatico';
        }
        
        function cleanTitle(title) {
            return title.replace(/&#8211;/g, '-').replace(/&#8217;/g, "'").replace(/&#038;/g, '&');
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
            const loadMoreBtn = document.getElementById('load-more');
            
            // Filter posts
            let filtered = allPosts.filter(post => {
                const title = cleanTitle(post.title.rendered).toLowerCase();
                const category = getCategory(title);
                
                const matchesFilter = currentFilter === 'all' || category.toLowerCase() === currentFilter;
                const matchesSearch = currentSearch === '' || title.includes(currentSearch);
                
                return matchesFilter && matchesSearch;
            });
            
            // Show/hide no results
            if (filtered.length === 0) {
                noResults.style.display = 'block';
                loadMoreBtn.style.display = 'none';
                return;
            } else {
                noResults.style.display = 'none';
            }
            
            // Clear grid
            grid.innerHTML = '';
            
            // Render posts
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
                    <img src="\${img}" alt="\${title}" class="card-img" loading="lazy">
                    <div class="card-content">
                        <span class="card-category">\${category}</span>
                        <h3 class="card-title">\${title}</h3>
                        <p class="card-date">\${date}</p>
                    </div>
                \`;
                
                grid.appendChild(card);
            });
            
            // Show/hide load more button
            if (displayedPosts < filtered.length) {
                loadMoreBtn.style.display = 'block';
            } else {
                loadMoreBtn.style.display = 'none';
            }
        }
        
        function loadMore() {
            displayedPosts += POSTS_PER_PAGE;
            renderPosts();
        }
        
        // Filter functionality
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
        
        // Initialize
        loadAllPosts();
    </script>
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
