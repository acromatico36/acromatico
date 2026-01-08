import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS for API routes
app.use('/api/*', cors())

// Serve static files from public directory
app.use('/static/*', serveStatic({ root: './' }))

// Use JSX renderer
app.use(renderer)

// ============================================
// PUBLIC ROUTES
// ============================================

app.get('/', (c) => {
  return c.render(
    <div class="min-h-screen bg-black text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        video {
          filter: brightness(0.8) saturate(1.1);
        }
        
        .video-zoom {
          transform: scale(1.2);
          object-fit: cover;
        }
        
        .glass-nav {
          background: rgba(10, 10, 10, 0.8);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(20, 184, 166, 0.3);
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(20, 184, 166, 0.5);
        }
        
        .feature-card {
          background: rgba(20, 20, 30, 0.5);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .feature-card:hover {
          transform: translateY(-5px);
          border-color: rgba(20, 184, 166, 0.5);
          box-shadow: 0 10px 40px rgba(20, 184, 166, 0.2);
        }
        
        .stat-number {
          background: linear-gradient(135deg, #14b8a6 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Navigation */}
      <nav class="glass-nav fixed top-0 left-0 right-0 z-50">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
          <div class="flex justify-between h-20 items-center">
            <div class="flex items-center space-x-3">
              <img src="/static/acromatico-logo-white.png" alt="Acromatico" class="h-8 w-auto" />
            </div>
            <div class="hidden md:flex space-x-8">
              <a href="/academy" class="text-gray-300 hover:text-white transition">Academy</a>
              <a href="/studio" class="text-gray-300 hover:text-white transition">Studio</a>
              <a href="/prints" class="text-gray-300 hover:text-white transition">Prints</a>
              <a href="/photography" class="text-gray-300 hover:text-white transition">Photography</a>
            </div>
            <div class="flex items-center space-x-4">
              <a href="/login" class="text-gray-300 hover:text-white transition">Sign In</a>
              <a href="/checkout" class="btn-primary px-6 py-3 rounded-full font-semibold">
                Enroll Now
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Full Screen with Video Background */}
      <section class="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* YouTube Video Background - iframe embed */}
        <div class="absolute inset-0 w-full h-full" style="z-index: 0;">
          <iframe
            src="https://www.youtube.com/embed/ekPhZnuaR0E?autoplay=1&mute=1&loop=1&playlist=ekPhZnuaR0E&controls=0&showinfo=0&modestbranding=1&autohide=1&rel=0&playsinline=1&enablejsapi=1&vq=hd1080"
            allow="autoplay; fullscreen"
            style="position: absolute; top: 50%; left: 50%; width: 100vw; height: 56.25vw; min-height: 100vh; min-width: 177.77vh; transform: translate(-50%, -50%) scale(1.2); pointer-events: none; border: 0;"
          />
        </div>
        {/* Dark Overlay */}
        <div class="absolute inset-0 bg-black/60 z-10 pointer-events-none"></div>
        {/* Gradient Overlay */}
        <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 z-10 pointer-events-none"></div>
        
        <div class="relative z-20 max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <div class="mb-6 inline-block">
            <span class="px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-sm font-medium">
              Built for Creators, by Creators
            </span>
          </div>
          <h1 class="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-tight">
            Learn to See<br />
            <span class="stat-number">The World Differently</span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto font-light">
            Live photography & filmmaking education for young creators ages 7-14.
            <br />Learn from educators with 20+ years of real-world experience.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/checkout" class="btn-primary px-10 py-5 rounded-full text-lg font-bold inline-block">
              Start Creating Today
            </a>
            <a href="/academy" class="px-10 py-5 rounded-full text-lg font-bold border-2 border-white/20 hover:border-teal-500/50 transition inline-block">
              View Curriculum
            </a>
          </div>
          
          {/* Stats - Floating Cards */}
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
            <div class="feature-card p-6 rounded-2xl">
              <div class="text-5xl font-black stat-number mb-2">20+</div>
              <div class="text-gray-400 text-sm">Years Experience</div>
            </div>
            <div class="feature-card p-6 rounded-2xl">
              <div class="text-5xl font-black stat-number mb-2">8</div>
              <div class="text-gray-400 text-sm">Classes/Month</div>
            </div>
            <div class="feature-card p-6 rounded-2xl">
              <div class="text-5xl font-black stat-number mb-2">11:30</div>
              <div class="text-gray-400 text-sm">AM Mon & Thu</div>
            </div>
            <div class="feature-card p-6 rounded-2xl">
              <div class="text-5xl font-black stat-number mb-2">7-14</div>
              <div class="text-gray-400 text-sm">Age Range</div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section class="py-32 bg-gradient-to-b from-black to-gray-900">
        <div class="max-w-6xl mx-auto px-6 lg:px-8">
          <div class="text-center mb-20">
            <h2 class="text-5xl md:text-6xl font-black mb-6">
              Why Acromatico?
            </h2>
            <p class="text-xl text-gray-400 max-w-3xl mx-auto">
              We're not just teaching photography. We're developing a generation of visual storytellers.
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="feature-card p-10 rounded-3xl">
              <div class="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-500 rounded-2xl mb-6 flex items-center justify-center">
                <i class="fas fa-camera text-3xl"></i>
              </div>
              <h3 class="text-2xl font-bold mb-4">Creator-First</h3>
              <p class="text-gray-400 leading-relaxed">
                Learn from real photographers and filmmakers. Every lesson focuses on hands-on creation, not theory.
              </p>
            </div>
            
            <div class="feature-card p-10 rounded-3xl">
              <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-6 flex items-center justify-center">
                <i class="fas fa-calendar-day text-3xl"></i>
              </div>
              <h3 class="text-2xl font-bold mb-4">Flexible</h3>
              <p class="text-gray-400 leading-relaxed">
                Daily proration. No contracts. Pay only for what you use. Homeschool-friendly scheduling.
              </p>
            </div>
            
            <div class="feature-card p-10 rounded-3xl">
              <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mb-6 flex items-center justify-center">
                <i class="fas fa-users text-3xl"></i>
              </div>
              <h3 class="text-2xl font-bold mb-4">Family-Focused</h3>
              <p class="text-gray-400 leading-relaxed">
                Multi-child discounts. 4+ students at just $79/month each. Built for homeschool families.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Preview */}
      <section class="py-32 bg-black">
        <div class="max-w-6xl mx-auto px-6 lg:px-8">
          <div class="text-center mb-20">
            <h2 class="text-5xl md:text-6xl font-black mb-6">
              12-Month Journey
            </h2>
            <p class="text-xl text-gray-400">
              From composition basics to documentary filmmaking
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="feature-card p-8 rounded-2xl">
              <div class="text-teal-500 font-bold mb-2">JANUARY</div>
              <h4 class="text-xl font-bold mb-3">Finding Your Eye</h4>
              <p class="text-gray-400 text-sm">Master composition, rule of thirds, leading lines</p>
            </div>
            <div class="feature-card p-8 rounded-2xl">
              <div class="text-teal-500 font-bold mb-2">MARCH</div>
              <h4 class="text-xl font-bold mb-3">Video Basics</h4>
              <p class="text-gray-400 text-sm">Moving stories, camera movement, storytelling</p>
            </div>
            <div class="feature-card p-8 rounded-2xl">
              <div class="text-teal-500 font-bold mb-2">JUNE</div>
              <h4 class="text-xl font-bold mb-3">Documentary Premiere</h4>
              <p class="text-gray-400 text-sm">Complete a full documentary film project</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section class="py-32 bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 relative overflow-hidden">
        <div class="absolute inset-0 bg-black/30"></div>
        <div class="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 class="text-5xl md:text-6xl font-black mb-8">
            Ready to Create?
          </h2>
          <p class="text-2xl mb-12 opacity-90">
            Learn from educators with 20+ years of professional experience
          </p>
          <a href="/checkout" class="bg-white text-black px-12 py-6 rounded-full text-xl font-bold hover:bg-gray-100 transition inline-block shadow-2xl">
            Enroll Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer class="bg-black border-t border-white/10 py-16">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h4 class="font-bold mb-4">Academy</h4>
              <ul class="space-y-2 text-gray-400 text-sm">
                <li><a href="/academy" class="hover:text-white transition">Curriculum</a></li>
                <li><a href="/pricing" class="hover:text-white transition">Pricing</a></li>
                <li><a href="/faq" class="hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold mb-4">Services</h4>
              <ul class="space-y-2 text-gray-400 text-sm">
                <li><a href="/studio" class="hover:text-white transition">Studio</a></li>
                <li><a href="/prints" class="hover:text-white transition">Art Prints</a></li>
                <li><a href="/photography" class="hover:text-white transition">Photography</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold mb-4">Company</h4>
              <ul class="space-y-2 text-gray-400 text-sm">
                <li><a href="/about" class="hover:text-white transition">About</a></li>
                <li><a href="/blog" class="hover:text-white transition">Blog</a></li>
                <li><a href="/contact" class="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold mb-4">Legal</h4>
              <ul class="space-y-2 text-gray-400 text-sm">
                <li><a href="/privacy" class="hover:text-white transition">Privacy</a></li>
                <li><a href="/terms" class="hover:text-white transition">Terms</a></li>
              </ul>
            </div>
          </div>
          <div class="pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
            <p>&copy; 2026 Acromatico. Built for creators, by creators.</p>
          </div>
        </div>
      </footer>
    </div>,
    { title: 'Acromatico - Learn to See The World Differently' }
  )
})

// ============================================
// API ROUTES
// ============================================

app.get('/api/health', (c) => {
  return c.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    database: 'connected'
  })
})

// Test database connection
app.get('/api/db-test', async (c) => {
  try {
    const result = await c.env.DB.prepare('SELECT 1 as test').first()
    return c.json({ 
      status: 'success', 
      message: 'Database connection successful',
      result 
    })
  } catch (error) {
    return c.json({ 
      status: 'error', 
      message: error.message 
    }, 500)
  }
})

// Coming soon placeholder routes
app.get('/academy', (c) => c.render(<div class="p-8"><h1 class="text-3xl font-bold">Academy - Coming Soon</h1></div>))
app.get('/studio', (c) => c.render(<div class="p-8"><h1 class="text-3xl font-bold">Studio - Coming Soon</h1></div>))
app.get('/prints', (c) => c.render(<div class="p-8"><h1 class="text-3xl font-bold">Art Prints - Coming Soon</h1></div>))
app.get('/photography', (c) => c.render(<div class="p-8"><h1 class="text-3xl font-bold">Photography - Coming Soon</h1></div>))
app.get('/blog', (c) => c.render(<div class="p-8"><h1 class="text-3xl font-bold">Blog - Coming Soon</h1></div>))
app.get('/pricing', (c) => c.render(<div class="p-8"><h1 class="text-3xl font-bold">Pricing - Coming Soon</h1></div>))
app.get('/checkout', (c) => c.render(<div class="p-8"><h1 class="text-3xl font-bold">Checkout - Coming Soon</h1></div>))
app.get('/login', (c) => c.render(<div class="p-8"><h1 class="text-3xl font-bold">Login - Coming Soon</h1></div>))
app.get('/faq', (c) => c.render(<div class="p-8"><h1 class="text-3xl font-bold">FAQ - Coming Soon</h1></div>))
app.get('/contact', (c) => c.render(<div class="p-8"><h1 class="text-3xl font-bold">Contact - Coming Soon</h1></div>))
app.get('/about', (c) => c.render(<div class="p-8"><h1 class="text-3xl font-bold">About - Coming Soon</h1></div>))

export default app
