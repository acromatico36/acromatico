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

      {/* Hero Section - Full Screen with Animated Starfield Background */}
      <section class="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Animated Starfield Background */}
        <div class="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900">
          {/* Stars Layer 1 - Small */}
          <div class="stars-small"></div>
          {/* Stars Layer 2 - Medium */}
          <div class="stars-medium"></div>
          {/* Stars Layer 3 - Large */}
          <div class="stars-large"></div>
          {/* Child Silhouette */}
          <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-1/3 opacity-20">
            <svg viewBox="0 0 800 400" class="w-full h-full">
              {/* Child with camera looking up */}
              <ellipse cx="400" cy="380" rx="200" ry="30" fill="rgba(20,184,166,0.3)"/>
              <path d="M 350 300 Q 350 250 370 230 L 370 280 Q 380 290 400 285 L 410 240 Q 420 230 430 250 Q 430 280 430 300 L 420 380 L 380 380 Z" fill="rgba(20,184,166,0.4)"/>
              <circle cx="390" cy="235" r="25" fill="rgba(20,184,166,0.5)"/>
              <rect x="395" y="245" width="30" height="20" rx="5" fill="rgba(20,184,166,0.6)"/>
            </svg>
          </div>
        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          .stars-small, .stars-medium, .stars-large {
            position: absolute;
            inset: 0;
          }
          
          .stars-small::before,
          .stars-medium::before,
          .stars-large::before {
            content: '';
            position: absolute;
            inset: 0;
            background-size: 200px 200px;
            animation: twinkle 3s infinite;
          }
          
          .stars-small::before {
            background-image: 
              radial-gradient(1px 1px at 20px 30px, rgba(20,184,166,0.8), transparent),
              radial-gradient(1px 1px at 60px 70px, rgba(59,130,246,0.8), transparent),
              radial-gradient(1px 1px at 140px 120px, rgba(147,51,234,0.8), transparent),
              radial-gradient(1px 1px at 180px 50px, rgba(20,184,166,0.6), transparent),
              radial-gradient(1px 1px at 90px 160px, rgba(59,130,246,0.6), transparent),
              radial-gradient(1px 1px at 30px 180px, rgba(147,51,234,0.6), transparent),
              radial-gradient(1px 1px at 150px 10px, rgba(20,184,166,0.7), transparent),
              radial-gradient(1px 1px at 110px 90px, rgba(59,130,246,0.7), transparent);
            animation-duration: 2s;
          }
          
          .stars-medium::before {
            background-image: 
              radial-gradient(2px 2px at 40px 60px, rgba(20,184,166,0.9), transparent),
              radial-gradient(2px 2px at 120px 140px, rgba(59,130,246,0.9), transparent),
              radial-gradient(2px 2px at 180px 100px, rgba(147,51,234,0.9), transparent),
              radial-gradient(2px 2px at 80px 30px, rgba(20,184,166,0.7), transparent),
              radial-gradient(2px 2px at 160px 180px, rgba(59,130,246,0.7), transparent);
            animation-duration: 4s;
            animation-delay: 0.5s;
          }
          
          .stars-large::before {
            background-image: 
              radial-gradient(3px 3px at 100px 120px, rgba(20,184,166,1), transparent),
              radial-gradient(3px 3px at 50px 150px, rgba(59,130,246,1), transparent),
              radial-gradient(3px 3px at 170px 80px, rgba(147,51,234,1), transparent);
            animation-duration: 5s;
            animation-delay: 1s;
          }
        `}} />
        
        {/* Dark Overlay */}
        <div class="absolute inset-0 bg-black/40 z-10 pointer-events-none"></div>
        {/* Gradient Overlay */}
        <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70 z-10 pointer-events-none"></div>
        
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

      {/* Curriculum Preview - 12-Month Journey with Video Background */}
      <section class="py-32 bg-black relative overflow-hidden">
        {/* Video Background */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          preload="metadata"
          class="absolute inset-0 w-full h-full object-cover opacity-30"
          style="transform: scale(1.2);"
          webkit-playsinline="true"
        >
          <source src="/static/hero-video.mp4" type="video/mp4" />
        </video>
        
        {/* Dark Overlay */}
        <div class="absolute inset-0 bg-black/70 z-10"></div>
        
        {/* Gradient Overlay */}
        <div class="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10"></div>
        
        <div class="relative z-20 max-w-6xl mx-auto px-6 lg:px-8">
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
              <div class="text-blue-500 font-bold mb-2">FEBRUARY</div>
              <h4 class="text-xl font-bold mb-3">Light & Shadow</h4>
              <p class="text-gray-400 text-sm">Understanding natural light, golden hour, exposure</p>
            </div>
            <div class="feature-card p-8 rounded-2xl">
              <div class="text-purple-500 font-bold mb-2">MARCH</div>
              <h4 class="text-xl font-bold mb-3">Video Basics</h4>
              <p class="text-gray-400 text-sm">Moving stories, camera movement, storytelling</p>
            </div>
            <div class="feature-card p-8 rounded-2xl">
              <div class="text-teal-500 font-bold mb-2">APRIL</div>
              <h4 class="text-xl font-bold mb-3">Portrait Photography</h4>
              <p class="text-gray-400 text-sm">Capturing emotion, connection, and personality</p>
            </div>
            <div class="feature-card p-8 rounded-2xl">
              <div class="text-blue-500 font-bold mb-2">MAY</div>
              <h4 class="text-xl font-bold mb-3">Street Photography</h4>
              <p class="text-gray-400 text-sm">Candid moments, urban composition, storytelling</p>
            </div>
            <div class="feature-card p-8 rounded-2xl">
              <div class="text-purple-500 font-bold mb-2">JUNE</div>
              <h4 class="text-xl font-bold mb-3">Documentary Premiere</h4>
              <p class="text-gray-400 text-sm">Complete a full documentary film project</p>
            </div>
            <div class="feature-card p-8 rounded-2xl">
              <div class="text-teal-500 font-bold mb-2">SEPTEMBER</div>
              <h4 class="text-xl font-bold mb-3">Advanced Composition</h4>
              <p class="text-gray-400 text-sm">Breaking rules, creative framing, visual poetry</p>
            </div>
            <div class="feature-card p-8 rounded-2xl">
              <div class="text-blue-500 font-bold mb-2">OCTOBER</div>
              <h4 class="text-xl font-bold mb-3">Video Editing Mastery</h4>
              <p class="text-gray-400 text-sm">Pacing, color grading, sound design, storytelling</p>
            </div>
            <div class="feature-card p-8 rounded-2xl">
              <div class="text-purple-500 font-bold mb-2">NOVEMBER</div>
              <h4 class="text-xl font-bold mb-3">Portfolio Building</h4>
              <p class="text-gray-400 text-sm">Curating work, presenting your unique vision</p>
            </div>
            <div class="feature-card p-8 rounded-2xl">
              <div class="text-teal-500 font-bold mb-2">DECEMBER</div>
              <h4 class="text-xl font-bold mb-3">Year-End Showcase</h4>
              <p class="text-gray-400 text-sm">Present your best work to family and community</p>
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
