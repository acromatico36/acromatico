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
        
        html {
          scroll-behavior: smooth;
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
          background: #4794A6;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(71, 148, 166, 0.3);
        }
        
        .btn-primary:hover {
          background: #5aa5b8;
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(71, 148, 166, 0.5);
        }
        
        .feature-card {
          background: rgba(20, 20, 30, 0.3);
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
            <div class="flex items-center space-x-4 opacity-0">
              {/* Left spacer for balance */}
              <span>Spacer</span>
            </div>
            <div class="flex-1 flex justify-center">
              <a href="/">
                <img src="/static/acromatico-logo-white.png" alt="Acromatico" class="h-8 w-auto" />
              </a>
            </div>
            <div class="flex items-center space-x-4">
              <a href="/pricing" class="btn-primary px-6 py-3 rounded-full font-semibold" style="background: #4794A6;">
                Enroll Now
              </a>
              <a href="/login" class="text-gray-300 hover:text-white transition">Sign In</a>
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
            <a href="#curriculum" class="px-10 py-5 rounded-full text-lg font-bold border-2 border-white/20 hover:border-teal-500/50 transition inline-block">
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

      {/* Meet Your Educators Section */}
      <section class="py-32 bg-gradient-to-b from-black to-gray-900">
        <div class="max-w-6xl mx-auto px-6 lg:px-8">
          <div class="text-center mb-20">
            <h2 class="text-5xl md:text-6xl font-black mb-6">
              Meet Your Educators
            </h2>
            <p class="text-xl text-gray-400 max-w-3xl mx-auto">
              Learn from award-winning photographers & filmmakers with 20+ years of professional experience
            </p>
          </div>
          
          {/* Educators Grid */}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            {/* Italo */}
            <div class="feature-card p-10 rounded-3xl text-center">
              <div class="relative inline-block mb-6">
                <div class="absolute inset-0 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full blur-xl opacity-50"></div>
                <img 
                  src="/static/italo-headshot.jpg" 
                  alt="Italo Campilii" 
                  class="relative w-48 h-48 rounded-full object-cover border-4 border-white/10 mx-auto"
                />
              </div>
              <h3 class="text-3xl font-bold mb-2">Italo Campilii</h3>
              <div class="text-teal-500 font-semibold mb-4">Founder & Lead Educator</div>
              <p class="text-gray-400 leading-relaxed mb-4">
                Award-winning photographer and filmmaker with 20+ years of experience. 
                Specializes in visual storytelling, documentary filmmaking, and portrait photography.
              </p>
              <div class="flex justify-center gap-4 text-sm text-gray-500">
                <span>📸 Photography</span>
                <span>🎬 Filmmaking</span>
                <span>✨ Composition</span>
              </div>
            </div>
            
            {/* Ale */}
            <div class="feature-card p-10 rounded-3xl text-center">
              <div class="relative inline-block mb-6">
                <div class="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-xl opacity-50"></div>
                <img 
                  src="/static/ale-headshot.jpg" 
                  alt="Ale" 
                  class="relative w-48 h-48 rounded-full object-cover border-4 border-white/10 mx-auto"
                />
              </div>
              <h3 class="text-3xl font-bold mb-2">Ale</h3>
              <div class="text-purple-500 font-semibold mb-4">Co-Founder & Creative Director</div>
              <p class="text-gray-400 leading-relaxed mb-4">
                Professional photographer and visual artist with expertise in portrait photography, 
                lighting techniques, and creative direction. Passionate about developing young talent.
              </p>
              <div class="flex justify-center gap-4 text-sm text-gray-500">
                <span>💡 Lighting</span>
                <span>👤 Portraits</span>
                <span>🎨 Direction</span>
              </div>
            </div>
          </div>
          
          {/* Philosophy Cards */}
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="feature-card p-8 rounded-2xl">
              <div class="w-14 h-14 bg-gradient-to-br from-teal-500 to-blue-500 rounded-xl mb-4 flex items-center justify-center">
                <i class="fas fa-camera text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold mb-3">Creator-First</h3>
              <p class="text-gray-400 text-sm leading-relaxed">
                Every lesson focuses on hands-on creation, not theory. Learn by doing.
              </p>
            </div>
            
            <div class="feature-card p-8 rounded-2xl">
              <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mb-4 flex items-center justify-center">
                <i class="fas fa-calendar-day text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold mb-3">Flexible</h3>
              <p class="text-gray-400 text-sm leading-relaxed">
                Daily proration. No contracts. Pay only for what you use.
              </p>
            </div>
            
            <div class="feature-card p-8 rounded-2xl">
              <div class="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl mb-4 flex items-center justify-center">
                <i class="fas fa-users text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold mb-3">Family-Focused</h3>
              <p class="text-gray-400 text-sm leading-relaxed">
                Multi-child discounts. 4+ students at just $79/month each.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Preview - 12-Month Journey with Video Background */}
      <section id="curriculum" class="py-32 bg-black relative overflow-hidden">
        {/* YouTube Video Background */}
        <iframe 
          src="https://www.youtube.com/embed/ekPhZnuaR0E?autoplay=1&mute=1&loop=1&playlist=ekPhZnuaR0E&controls=0&showinfo=0&modestbranding=1&playsinline=1&enablejsapi=1&rel=0&vq=hd1080"
          class="absolute inset-0 w-full h-full pointer-events-none"
          style="transform: scale(1.3); filter: brightness(1.1) saturate(1.2);"
          allow="autoplay; encrypted-media"
          frameborder="0"
        ></iframe>
        
        {/* Light Overlay for text readability */}
        <div class="absolute inset-0 bg-black/40 z-10"></div>
        
        {/* Subtle Gradient Overlay */}
        <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 z-10"></div>
        
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
          <a href="/checkout" class="btn-primary px-12 py-6 rounded-full text-xl font-bold text-white inline-block shadow-2xl">
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

      {/* TYPEFORM-STYLE ENROLLMENT MODAL */}
      <div id="enrollment-modal" class="fixed inset-0 bg-black/95 z-[100] hidden flex items-center justify-center p-4">
        <div class="max-w-2xl w-full">
          {/* Progress Bar */}
          <div class="mb-8">
            <div class="flex justify-between mb-2 text-sm text-gray-400">
              <span id="step-label">Step 1 of 3</span>
              <span id="step-percentage">33%</span>
            </div>
            <div class="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div id="progress-bar" class="h-full bg-gradient-to-r from-teal-500 to-blue-500 transition-all duration-500" style="width: 33%"></div>
            </div>
          </div>

          {/* STEP 1: Create Account */}
          <div id="step-1" class="step-content">
            <h2 class="text-5xl font-black mb-4">Create Your Free Account</h2>
            <p class="text-xl text-gray-400 mb-8">Get started in seconds - no credit card required</p>
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium mb-2">Parent Email</label>
                <input 
                  type="email" 
                  id="parent-email" 
                  placeholder="your@email.com"
                  class="w-full px-6 py-4 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-teal-500 focus:outline-none text-lg"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Create Password</label>
                <input 
                  type="password" 
                  id="parent-password" 
                  placeholder="Min 8 characters"
                  class="w-full px-6 py-4 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-teal-500 focus:outline-none text-lg"
                />
              </div>
              <button onclick="goToStep(2)" class="btn-primary w-full px-8 py-5 rounded-full text-xl font-bold" style="background: #4794A6;">
                Continue →
              </button>
            </div>
          </div>

          {/* STEP 2: Select Package */}
          <div id="step-2" class="step-content hidden">
            <button onclick="goToStep(1)" class="text-gray-400 hover:text-white mb-4 flex items-center gap-2">
              ← Back
            </button>
            <h2 class="text-5xl font-black mb-4">How Many Students?</h2>
            <p class="text-xl text-gray-400 mb-6">Select the package that fits your family</p>
            
            {/* Monthly/Annual Toggle */}
            <div class="flex items-center justify-center gap-4 mb-8 bg-gray-900 p-3 rounded-full inline-flex mx-auto">
              <button id="monthly-toggle-btn" onclick="toggleBilling('monthly')" class="px-6 py-3 rounded-full font-semibold transition bg-teal-500 text-white">
                Monthly
              </button>
              <button id="annual-toggle-btn" onclick="toggleBilling('annual')" class="px-6 py-3 rounded-full font-semibold transition text-gray-400">
                Annual <span class="text-teal-500 text-sm ml-1">Save 20%</span>
              </button>
            </div>

            <div class="grid grid-cols-2 gap-4 mb-8">
              <div class="package-option feature-card p-6 rounded-2xl cursor-pointer hover:ring-2 hover:ring-teal-500 transition relative" onclick="selectPackage(1)">
                <div class="text-4xl font-black mb-2">1</div>
                <div class="text-gray-400 text-sm mb-3">Student</div>
                <div class="text-2xl font-bold">
                  <span class="monthly-price">$116</span>
                  <span class="annual-price hidden">$93</span>
                  <span class="text-sm text-gray-500">/mo</span>
                </div>
                <div class="annual-savings text-teal-500 text-xs mt-2 hidden">Save $276/year</div>
              </div>
              <div class="package-option feature-card p-6 rounded-2xl cursor-pointer hover:ring-2 hover:ring-teal-500 transition ring-2 ring-teal-500 relative" onclick="selectPackage(2)">
                <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-500 px-3 py-1 rounded-full text-xs font-bold">Most Popular</div>
                <div class="text-4xl font-black mb-2">2</div>
                <div class="text-gray-400 text-sm mb-3">Students</div>
                <div class="text-2xl font-bold">
                  <span class="monthly-price">$99</span>
                  <span class="annual-price hidden">$79</span>
                  <span class="text-sm text-gray-500">/mo each</span>
                </div>
                <div class="annual-savings text-teal-500 text-xs mt-2 hidden">Save $480/year</div>
              </div>
              <div class="package-option feature-card p-6 rounded-2xl cursor-pointer hover:ring-2 hover:ring-teal-500 transition relative" onclick="selectPackage(3)">
                <div class="text-4xl font-black mb-2">3</div>
                <div class="text-gray-400 text-sm mb-3">Students</div>
                <div class="text-2xl font-bold">
                  <span class="monthly-price">$89</span>
                  <span class="annual-price hidden">$71</span>
                  <span class="text-sm text-gray-500">/mo each</span>
                </div>
                <div class="annual-savings text-teal-500 text-xs mt-2 hidden">Save $648/year</div>
              </div>
              <div class="package-option feature-card p-6 rounded-2xl cursor-pointer hover:ring-2 hover:ring-teal-500 transition relative" onclick="selectPackage(4)">
                <div class="text-4xl font-black mb-2">4+</div>
                <div class="text-gray-400 text-sm mb-3">Students</div>
                <div class="text-2xl font-bold">
                  <span class="monthly-price">$79</span>
                  <span class="annual-price hidden">$63</span>
                  <span class="text-sm text-gray-500">/mo each</span>
                </div>
                <div class="annual-savings text-teal-500 text-xs mt-2 hidden">Save $768/year</div>
              </div>
            </div>
          </div>

          {/* STEP 3: Payment */}
          <div id="step-3" class="step-content hidden">
            <button onclick="goToStep(2)" class="text-gray-400 hover:text-white mb-4 flex items-center gap-2">
              ← Back
            </button>
            <h2 class="text-5xl font-black mb-4">Complete Enrollment</h2>
            <p class="text-xl text-gray-400 mb-8">You selected <span id="selected-package" class="text-teal-500"></span></p>
            
            {/* Order Summary */}
            <div class="feature-card p-6 rounded-2xl mb-6">
              <div class="flex justify-between mb-4">
                <span class="text-gray-400">Students</span>
                <span id="summary-students" class="font-bold"></span>
              </div>
              <div class="flex justify-between mb-4">
                <span class="text-gray-400">Price per student</span>
                <span id="summary-price" class="font-bold"></span>
              </div>
              <div class="flex justify-between pt-4 border-t border-white/10">
                <span id="summary-label" class="text-xl font-bold">Total Today (Prorated)</span>
                <span id="summary-total" class="text-xl font-bold text-teal-500"></span>
              </div>
              <div id="savings-display" class="flex justify-between mt-2 hidden">
                <span class="text-sm text-gray-400">Annual Savings</span>
                <span id="summary-savings" class="text-sm font-bold text-green-500"></span>
              </div>
              <p id="proration-note" class="text-xs text-gray-500 mt-2">*First month prorated based on days remaining</p>
            </div>

            {/* Payment Form */}
            <div class="space-y-4 mb-6">
              <div class="bg-gray-900 border-2 border-gray-800 rounded-xl p-6">
                <p class="text-sm text-gray-400">Stripe payment form will appear here</p>
              </div>
            </div>

            <button onclick="completeEnrollment()" class="btn-primary w-full px-8 py-5 rounded-full text-xl font-bold" style="background: #4794A6;">
              Complete Enrollment 🎉
            </button>
          </div>

          {/* Close Button */}
          <button onclick="closeEnrollment()" class="absolute top-8 right-8 text-gray-400 hover:text-white text-4xl">×</button>
        </div>
      </div>

      {/* Enrollment Modal JavaScript */}
      <script dangerouslySetInnerHTML={{__html: `
        let currentStep = 1;
        let selectedStudents = 0;
        let selectedPrice = 0;
        let isAnnual = false;
        
        const pricingData = {
          monthly: { 1: 116, 2: 99, 3: 89, 4: 79 },
          annual: { 1: 93, 2: 79, 3: 71, 4: 63 }
        };

        function openEnrollment() {
          document.getElementById('enrollment-modal').classList.remove('hidden');
          document.body.style.overflow = 'hidden';
          goToStep(1);
        }

        function closeEnrollment() {
          document.getElementById('enrollment-modal').classList.add('hidden');
          document.body.style.overflow = 'auto';
        }

        function goToStep(step) {
          // Hide all steps
          document.querySelectorAll('.step-content').forEach(el => el.classList.add('hidden'));
          
          // Show target step
          document.getElementById('step-' + step).classList.remove('hidden');
          
          // Update progress
          currentStep = step;
          const percentage = (step / 3) * 100;
          document.getElementById('progress-bar').style.width = percentage + '%';
          document.getElementById('step-label').textContent = 'Step ' + step + ' of 3';
          document.getElementById('step-percentage').textContent = Math.round(percentage) + '%';
        }

        function toggleBilling(type) {
          isAnnual = (type === 'annual');
          
          // Update toggle buttons
          const monthlyBtn = document.getElementById('monthly-toggle-btn');
          const annualBtn = document.getElementById('annual-toggle-btn');
          
          if (isAnnual) {
            monthlyBtn.classList.remove('bg-teal-500', 'text-white');
            monthlyBtn.classList.add('text-gray-400');
            annualBtn.classList.add('bg-teal-500', 'text-white');
            annualBtn.classList.remove('text-gray-400');
          } else {
            monthlyBtn.classList.add('bg-teal-500', 'text-white');
            monthlyBtn.classList.remove('text-gray-400');
            annualBtn.classList.remove('bg-teal-500', 'text-white');
            annualBtn.classList.add('text-gray-400');
          }
          
          // Toggle prices
          document.querySelectorAll('.monthly-price').forEach(el => {
            el.classList.toggle('hidden', isAnnual);
          });
          document.querySelectorAll('.annual-price').forEach(el => {
            el.classList.toggle('hidden', !isAnnual);
          });
          document.querySelectorAll('.annual-savings').forEach(el => {
            el.classList.toggle('hidden', !isAnnual);
          });
        }

        function selectPackage(students) {
          selectedStudents = students;
          selectedPrice = isAnnual ? pricingData.annual[students] : pricingData.monthly[students];
          
          // Calculate totals
          const pricePerStudent = selectedPrice;
          const monthlyTotal = pricePerStudent * students;
          
          let totalCharge, chargeLabel;
          
          if (isAnnual) {
            // Annual: 12 months prepaid
            totalCharge = monthlyTotal * 12;
            chargeLabel = 'Total (12 months prepaid)';
          } else {
            // Monthly: prorated for first month
            const today = new Date();
            const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
            const daysRemaining = daysInMonth - today.getDate() + 1;
            totalCharge = (monthlyTotal / daysInMonth) * daysRemaining;
            chargeLabel = 'Total Today (Prorated)';
          }
          
          // Calculate savings for display (Annual vs Monthly)
          const yearlySavings = isAnnual ? 
            ((pricingData.monthly[students] * students * 12) - (pricePerStudent * students * 12)) : 0;
          
          // Update summary
          const billingText = isAnnual ? ' (Annual - 12 months)' : ' (Monthly)';
          document.getElementById('selected-package').textContent = 
            students + (students >= 4 ? '+' : '') + ' student' + (students > 1 ? 's' : '') + billingText;
          document.getElementById('summary-students').textContent = students + (students >= 4 ? '+' : '');
          document.getElementById('summary-price').textContent = '$' + pricePerStudent + '/mo per student' + (isAnnual ? ' (20% off)' : '');
          document.getElementById('summary-total').textContent = '$' + totalCharge.toFixed(2);
          
          // Update the label and savings display
          document.getElementById('summary-label').textContent = chargeLabel;
          
          if (isAnnual) {
            document.getElementById('savings-display').classList.remove('hidden');
            document.getElementById('summary-savings').textContent = '-$' + yearlySavings.toFixed(2);
            document.getElementById('proration-note').classList.add('hidden');
          } else {
            document.getElementById('savings-display').classList.add('hidden');
            document.getElementById('proration-note').classList.remove('hidden');
          }
          
          // Go to next step
          setTimeout(() => goToStep(3), 300);
        }

        function completeEnrollment() {
          const email = document.getElementById('parent-email').value;
          const password = document.getElementById('parent-password').value;
          
          if (!email || !password) {
            alert('Please fill in all fields');
            return;
          }
          
          const billingType = isAnnual ? 'Annual (12 months prepaid)' : 'Monthly';
          const pricePerStudent = selectedPrice;
          const monthlyTotal = pricePerStudent * selectedStudents;
          const totalCharge = isAnnual ? monthlyTotal * 12 : monthlyTotal;
          
          alert('🎉 Enrollment Complete!\\n\\nEmail: ' + email + '\\nPackage: ' + selectedStudents + ' students at $' + pricePerStudent + '/mo each\\nBilling: ' + billingType + '\\nTotal: $' + totalCharge.toFixed(2) + '\\n\\nStripe integration will be added next!');
          closeEnrollment();
        }

        // Update all "Enroll Now" and "Start Creating Today" buttons
        document.addEventListener('DOMContentLoaded', function() {
          const enrollButtons = document.querySelectorAll('a[href="/pricing"], a[href="/checkout"]');
          enrollButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
              e.preventDefault();
              openEnrollment();
            });
          });
        });
      `}} />
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
// Pricing page
app.get('/pricing', (c) => {
  return c.render(
    <div class="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav class="glass-nav fixed top-0 left-0 right-0 z-50">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
          <div class="flex justify-between h-20 items-center">
            <div class="flex items-center space-x-4 opacity-0">
              {/* Left spacer for balance */}
              <span>Spacer</span>
            </div>
            <div class="flex-1 flex justify-center">
              <a href="/">
                <img src="/static/acromatico-logo-white.png" alt="Acromatico" class="h-8 w-auto" />
              </a>
            </div>
            <div class="flex items-center space-x-4">
              <a href="/cart" class="text-gray-300 hover:text-white transition relative">
                <i class="fas fa-shopping-cart text-xl"></i>
                <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" id="cart-count">0</span>
              </a>
              <a href="/login" class="text-gray-300 hover:text-white transition">Sign In</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section class="pt-32 pb-20 bg-gradient-to-b from-gray-900 to-black">
        <div class="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <h1 class="text-6xl md:text-7xl font-black mb-6">
            Choose Your Plan
          </h1>
          <p class="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Flexible pricing that grows with your family. Pay only for what you use with daily proration.
          </p>
          
          {/* Billing Toggle */}
          <div class="flex items-center justify-center gap-4 mb-12">
            <span class="text-lg" id="monthly-label">Monthly</span>
            <button class="relative inline-flex h-8 w-16 items-center rounded-full bg-gray-700" id="billing-toggle">
              <span class="inline-block h-6 w-6 transform rounded-full bg-white transition ml-1" id="toggle-circle"></span>
            </button>
            <span class="text-lg" id="annual-label">
              Annual <span class="text-teal-500 text-sm font-bold">(Save 20%)</span>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section class="py-20 bg-black">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" id="pricing-cards">
            
            {/* 1 Student */}
            <div class="pricing-card feature-card p-8 rounded-3xl relative" data-tier="1" data-monthly="116" data-annual="93">
              <div class="text-center mb-6">
                <div class="text-5xl font-black mb-2">
                  <span class="stat-number">1</span>
                </div>
                <div class="text-gray-400">Student</div>
              </div>
              <div class="text-center mb-6">
                <div class="text-4xl font-bold mb-2 price-display">
                  $116<span class="text-xl text-gray-400">/mo</span>
                </div>
                <div class="text-sm text-gray-500">per student</div>
                <div class="text-teal-500 text-sm font-bold mt-2 savings-display" style="display: none;"></div>
              </div>
              <button onclick="addToCart(1, 116, false)" class="btn-primary w-full px-6 py-4 rounded-full font-bold text-white" style="background: #4794A6; display: block;">
                Add to Cart
              </button>
              <div class="mt-6 pt-6 border-t border-white/10 space-y-3 text-sm text-gray-400">
                <div class="flex items-center gap-2"><i class="fas fa-check text-teal-500"></i><span>8 live classes/month</span></div>
                <div class="flex items-center gap-2"><i class="fas fa-check text-teal-500"></i><span>All recordings included</span></div>
                <div class="flex items-center gap-2"><i class="fas fa-check text-teal-500"></i><span>Daily proration</span></div>
                <div class="flex items-center gap-2"><i class="fas fa-check text-teal-500"></i><span>Cancel anytime</span></div>
              </div>
            </div>

            {/* 2 Students - MOST POPULAR */}
            <div class="pricing-card feature-card p-8 rounded-3xl ring-2 ring-teal-500 relative" data-tier="2" data-monthly="99" data-annual="79">
              <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal-500 text-white px-4 py-1 rounded-full text-sm font-bold">Most Popular</div>
              <div class="text-center mb-6">
                <div class="text-5xl font-black mb-2">
                  <span class="stat-number">2</span>
                </div>
                <div class="text-gray-400">Students</div>
              </div>
              <div class="text-center mb-6">
                <div class="text-4xl font-bold mb-2 price-display">
                  $99<span class="text-xl text-gray-400">/mo</span>
                </div>
                <div class="text-sm text-gray-500">per student</div>
                <div class="text-teal-500 text-sm font-bold mt-2 savings-display" style="display: none;"></div>
              </div>
              <button onclick="addToCart(2, 99, false)" class="btn-primary w-full px-6 py-4 rounded-full font-bold text-white" style="background: #4794A6; display: block;">
                Add to Cart
              </button>
              <div class="mt-6 pt-6 border-t border-white/10 space-y-3 text-sm text-gray-400">
                <div class="flex items-center gap-2"><i class="fas fa-check text-teal-500"></i><span>8 live classes/month</span></div>
                <div class="flex items-center gap-2"><i class="fas fa-check text-teal-500"></i><span>All recordings included</span></div>
                <div class="flex items-center gap-2"><i class="fas fa-check text-teal-500"></i><span>Daily proration</span></div>
                <div class="flex items-center gap-2"><i class="fas fa-check text-teal-500"></i><span>Cancel anytime</span></div>
              </div>
            </div>

            {/* 3 Students */}
            <div class="pricing-card feature-card p-8 rounded-3xl relative" data-tier="3" data-monthly="89" data-annual="71">
              <div class="text-center mb-6">
                <div class="text-5xl font-black mb-2">
                  <span class="stat-number">3</span>
                </div>
                <div class="text-gray-400">Students</div>
              </div>
              <div class="text-center mb-6">
                <div class="text-4xl font-bold mb-2 price-display">
                  $89<span class="text-xl text-gray-400">/mo</span>
                </div>
                <div class="text-sm text-gray-500">per student</div>
                <div class="text-teal-500 text-sm font-bold mt-2 savings-display" style="display: none;"></div>
              </div>
              <button onclick="addToCart(3, 89, false)" class="btn-primary w-full px-6 py-4 rounded-full font-bold text-white" style="background: #4794A6; display: block;">
                Add to Cart
              </button>
              <div class="mt-6 pt-6 border-t border-white/10 space-y-3 text-sm text-gray-400">
                <div class="flex items-center gap-2"><i class="fas fa-check text-teal-500"></i><span>8 live classes/month</span></div>
                <div class="flex items-center gap-2"><i class="fas fa-check text-teal-500"></i><span>All recordings included</span></div>
                <div class="flex items-center gap-2"><i class="fas fa-check text-teal-500"></i><span>Daily proration</span></div>
                <div class="flex items-center gap-2"><i class="fas fa-check text-teal-500"></i><span>Cancel anytime</span></div>
              </div>
            </div>

            {/* 4+ Students */}
            <div class="pricing-card feature-card p-8 rounded-3xl relative" data-tier="4" data-monthly="79" data-annual="63">
              <div class="text-center mb-6">
                <div class="text-5xl font-black mb-2">
                  <span class="stat-number">4+</span>
                </div>
                <div class="text-gray-400">Students</div>
              </div>
              <div class="text-center mb-6">
                <div class="text-4xl font-bold mb-2 price-display">
                  $79<span class="text-xl text-gray-400">/mo</span>
                </div>
                <div class="text-sm text-gray-500">per student</div>
                <div class="text-teal-500 text-sm font-bold mt-2 savings-display" style="display: none;"></div>
              </div>
              <button onclick="addToCart(4, 79, false)" class="btn-primary w-full px-6 py-4 rounded-full font-bold text-white" style="background: #4794A6; display: block;">
                Add to Cart
              </button>
              <div class="mt-6 pt-6 border-t border-white/10 space-y-3 text-sm text-gray-400">
                <div class="flex items-center gap-2"><i class="fas fa-check text-teal-500"></i><span>8 live classes/month</span></div>
                <div class="flex items-center gap-2"><i class="fas fa-check text-teal-500"></i><span>All recordings included</span></div>
                <div class="flex items-center gap-2"><i class="fas fa-check text-teal-500"></i><span>Daily proration</span></div>
                <div class="flex items-center gap-2"><i class="fas fa-check text-teal-500"></i><span>Cancel anytime</span></div>
              </div>
            </div>

          </div>
          
          {/* Features Section */}
          <div class="mt-20 pt-20 border-t border-white/10">
            <h2 class="text-4xl font-black text-center mb-12">Everything Included</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="feature-card p-8 rounded-2xl text-center">
                <i class="fas fa-video text-4xl text-teal-500 mb-4"></i>
                <h3 class="text-xl font-bold mb-3">Live Classes</h3>
                <p class="text-gray-400 text-sm">8 live classes per month, Mon & Thu at 11:30 AM ET</p>
              </div>
              <div class="feature-card p-8 rounded-2xl text-center">
                <i class="fas fa-play-circle text-4xl text-teal-500 mb-4"></i>
                <h3 class="text-xl font-bold mb-3">Recorded Sessions</h3>
                <p class="text-gray-400 text-sm">Access all class recordings anytime, anywhere</p>
              </div>
              <div class="feature-card p-8 rounded-2xl text-center">
                <i class="fas fa-certificate text-4xl text-teal-500 mb-4"></i>
                <h3 class="text-xl font-bold mb-3">Portfolio Building</h3>
                <p class="text-gray-400 text-sm">Create a professional portfolio throughout the year</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JavaScript for Pricing Logic */}
      <script dangerouslySetInnerHTML={{__html: `
        let isAnnual = false;
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        function updateCartCount() {
          const count = cart.reduce((sum, item) => sum + (item.students * item.quantity), 0);
          const el = document.getElementById('cart-count');
          if (el) el.textContent = count;
        }
        
        function addToCart(students, price, annual) {
          const existingIndex = cart.findIndex(item => 
            item.type === 'academy' && 
            item.students === students && 
            item.billing === (annual ? 'annual' : 'monthly')
          );
          
          if (existingIndex >= 0) {
            cart[existingIndex].quantity += 1;
          } else {
            cart.push({
              type: 'academy',
              students: students,
              billing: annual ? 'annual' : 'monthly',
              price: price,
              quantity: 1
            });
          }
          
          localStorage.setItem('cart', JSON.stringify(cart));
          updateCartCount();
          alert('Added to cart! 🎉');
        }
        
        function updatePricing() {
          const cards = document.querySelectorAll('.pricing-card');
          cards.forEach(card => {
            const tier = parseInt(card.getAttribute('data-tier'));
            const monthlyPrice = parseInt(card.getAttribute('data-monthly'));
            const annualPrice = parseInt(card.getAttribute('data-annual'));
            const currentPrice = isAnnual ? annualPrice : monthlyPrice;
            
            // Update price display
            const priceDisplay = card.querySelector('.price-display');
            if (priceDisplay) {
              priceDisplay.innerHTML = '$' + currentPrice + '<span class="text-xl text-gray-400">/mo</span>';
            }
            
            // Update savings display
            const savingsDisplay = card.querySelector('.savings-display');
            if (savingsDisplay && isAnnual) {
              const savings = (monthlyPrice * 10) - (annualPrice * 10);
              savingsDisplay.textContent = 'Save $' + savings + '/year';
              savingsDisplay.style.display = 'block';
            } else if (savingsDisplay) {
              savingsDisplay.style.display = 'none';
            }
            
            // Update button onclick
            const button = card.querySelector('button');
            if (button) {
              button.setAttribute('onclick', 'addToCart(' + tier + ', ' + currentPrice + ', ' + isAnnual + ')');
            }
          });
        }
        
        // Toggle billing
        const toggleBtn = document.getElementById('billing-toggle');
        if (toggleBtn) {
          toggleBtn.addEventListener('click', function() {
            isAnnual = !isAnnual;
            const circle = document.getElementById('toggle-circle');
            const toggle = document.getElementById('billing-toggle');
            
            if (isAnnual) {
              if (circle) circle.style.transform = 'translateX(32px)';
              if (toggle) toggle.style.backgroundColor = '#4794A6';
            } else {
              if (circle) circle.style.transform = 'translateX(0)';
              if (toggle) toggle.style.backgroundColor = '#374151';
            }
            
            updatePricing();
          });
        }
        
        // Initial update
        updateCartCount();
      `}} />
    </div>,
    { title: 'Pricing - Acromatico Academy' }
  )
})
// Cart page
app.get('/cart', (c) => {
  return c.render(
    <div class="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav class="glass-nav fixed top-0 left-0 right-0 z-50">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
          <div class="flex justify-between h-20 items-center">
            <div class="flex items-center space-x-4">
              <a href="/pricing" class="text-gray-300 hover:text-white transition">
                <i class="fas fa-arrow-left mr-2"></i>Continue Shopping
              </a>
            </div>
            <div class="flex-1 flex justify-center">
              <a href="/">
                <img src="/static/acromatico-logo-white.png" alt="Acromatico" class="h-8 w-auto" />
              </a>
            </div>
            <div class="flex items-center space-x-4 opacity-0">
              {/* Spacer for balance */}
              <span>Spacer</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Content */}
      <section class="pt-32 pb-20 min-h-screen">
        <div class="max-w-6xl mx-auto px-6 lg:px-8">
          <h1 class="text-5xl font-black mb-12">Shopping Cart</h1>
          
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div class="lg:col-span-2 space-y-4" id="cart-items">
              {/* Items will be rendered by JavaScript */}
            </div>
            
            {/* Order Summary */}
            <div class="lg:col-span-1">
              <div class="feature-card p-8 rounded-3xl sticky top-32">
                <h2 class="text-2xl font-bold mb-6">Order Summary</h2>
                <div class="space-y-4 mb-6">
                  <div class="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span id="subtotal">$0.00</span>
                  </div>
                  <div class="flex justify-between text-gray-400">
                    <span>Annual Savings</span>
                    <span id="savings" class="text-teal-500">-$0.00</span>
                  </div>
                  <div class="pt-4 border-t border-white/10">
                    <div class="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span id="total">$0.00</span>
                    </div>
                    <div class="text-sm text-gray-400 mt-2" id="billing-cycle">per month</div>
                  </div>
                </div>
                <a href="/checkout" class="btn-primary w-full px-6 py-4 rounded-full font-bold text-white text-center block">
                  Proceed to Checkout
                </a>
                <p class="text-xs text-gray-500 text-center mt-4">
                  <i class="fas fa-lock mr-1"></i>
                  Secure checkout powered by Stripe
                </p>
              </div>
            </div>
          </div>
          
          {/* Empty Cart State */}
          <div id="empty-cart" class="text-center py-20 hidden">
            <i class="fas fa-shopping-cart text-6xl text-gray-700 mb-6"></i>
            <h2 class="text-3xl font-bold mb-4">Your cart is empty</h2>
            <p class="text-gray-400 mb-8">Add some students to get started!</p>
            <a href="/pricing" class="btn-primary px-8 py-4 rounded-full font-bold text-white inline-block">
              View Pricing
            </a>
          </div>
        </div>
      </section>

      {/* JavaScript for Cart Logic */}
      <script dangerouslySetInnerHTML={{__html: `
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        function updateCart() {
          localStorage.setItem('cart', JSON.stringify(cart));
          renderCart();
        }
        
        function removeItem(index) {
          cart.splice(index, 1);
          updateCart();
        }
        
        function updateQuantity(index, change) {
          cart[index].quantity += change;
          if (cart[index].quantity <= 0) {
            removeItem(index);
          } else {
            updateCart();
          }
        }
        
        function renderCart() {
          const container = document.getElementById('cart-items');
          const emptyState = document.getElementById('empty-cart');
          
          if (cart.length === 0) {
            container.parentElement.classList.add('hidden');
            emptyState.classList.remove('hidden');
            return;
          }
          
          container.parentElement.classList.remove('hidden');
          emptyState.classList.add('hidden');
          
          let subtotal = 0;
          let totalSavings = 0;
          
          container.innerHTML = cart.map((item, index) => {
            // Calculate price per student per month
            const pricePerStudent = item.price;
            const totalStudents = item.students * item.quantity;
            
            // Monthly total = price per student × number of students
            const monthlyTotal = pricePerStudent * totalStudents;
            
            // Annual billing: 10 months prepaid
            let itemTotal = monthlyTotal;
            let itemSavings = 0;
            
            if (item.billing === 'annual') {
              // Annual total = monthly × 10 months (already has 20% discount in price)
              itemTotal = monthlyTotal * 10;
              
              // Calculate what they WOULD pay without discount
              const monthlyPriceWithoutDiscount = pricePerStudent / 0.8; // Reverse 20% discount
              const annualWithoutDiscount = monthlyPriceWithoutDiscount * totalStudents * 10;
              itemSavings = annualWithoutDiscount - itemTotal;
              totalSavings += itemSavings;
            }
            
            subtotal += itemTotal;
            
            return \`
              <div class="feature-card p-6 rounded-2xl">
                <div class="flex items-center justify-between">
                  <div class="flex-1">
                    <h3 class="text-xl font-bold mb-2">
                      Acromatico Academy - \${item.students}\${item.students >= 4 ? '+' : ''} Student\${item.students > 1 ? 's' : ''}
                    </h3>
                    <p class="text-gray-400 text-sm mb-2">
                      $\${pricePerStudent}/month per student · \${item.billing === 'annual' ? 'Annual (10 months prepaid)' : 'Monthly'}
                    </p>
                    \${item.billing === 'annual' ? '<span class="text-teal-500 text-xs font-bold">💰 Save $' + itemSavings.toFixed(2) + ' with annual billing!</span>' : ''}
                  </div>
                  <div class="flex items-center gap-6">
                    <div class="flex items-center gap-3">
                      <button onclick="updateQuantity(\${index}, -1)" class="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center">
                        <i class="fas fa-minus text-sm"></i>
                      </button>
                      <span class="text-xl font-bold w-8 text-center">\${item.quantity}</span>
                      <button onclick="updateQuantity(\${index}, 1)" class="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center">
                        <i class="fas fa-plus text-sm"></i>
                      </button>
                    </div>
                    <div class="text-right min-w-[100px]">
                      <div class="text-xl font-bold">$\${itemTotal.toFixed(2)}</div>
                      <div class="text-xs text-gray-500">\${item.billing === 'annual' ? 'total (10 months)' : 'per month'}</div>
                    </div>
                    <button onclick="removeItem(\${index})" class="text-gray-400 hover:text-red-500 transition">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            \`;
          }).join('');
          
          // Update summary
          document.getElementById('subtotal').textContent = '$' + subtotal.toFixed(2);
          document.getElementById('savings').textContent = totalSavings > 0 ? '-$' + totalSavings.toFixed(2) : '$0.00';
          document.getElementById('total').textContent = '$' + subtotal.toFixed(2);
          
          const hasAnnual = cart.some(item => item.billing === 'annual');
          document.getElementById('billing-cycle').textContent = hasAnnual ? 'total for 10 months' : 'per month';
        }
        
        // Initial render
        renderCart();
      `}} />
    </div>,
    { title: 'Shopping Cart - Acromatico' }
  )
})
// Checkout page
app.get('/checkout', (c) => {
  return c.render(
    <div class="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav class="glass-nav fixed top-0 left-0 right-0 z-50">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
          <div class="flex justify-between h-20 items-center">
            <div class="flex items-center space-x-4">
              <a href="/cart" class="text-gray-300 hover:text-white transition">
                <i class="fas fa-arrow-left mr-2"></i>Back to Cart
              </a>
            </div>
            <div class="flex-1 flex justify-center">
              <a href="/">
                <img src="/static/acromatico-logo-white.png" alt="Acromatico" class="h-8 w-auto" />
              </a>
            </div>
            <div class="flex items-center space-x-4 opacity-0">
              {/* Spacer for balance */}
              <span>Spacer</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Checkout Content */}
      <section class="pt-32 pb-20">
        <div class="max-w-6xl mx-auto px-6 lg:px-8">
          <h1 class="text-5xl font-black mb-12">Checkout</h1>
          
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div class="lg:col-span-2 space-y-8">
              {/* Step 1: Account */}
              <div class="feature-card p-8 rounded-3xl">
                <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span class="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-sm font-bold">1</span>
                  Account Information
                </h2>
                <div class="space-y-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium mb-2">First Name</label>
                      <input type="text" id="firstName" class="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-teal-500 focus:outline-none" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-2">Last Name</label>
                      <input type="text" id="lastName" class="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-teal-500 focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">Email Address</label>
                    <input type="email" id="email" class="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-teal-500 focus:outline-none" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">Password</label>
                    <input type="password" id="password" class="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-teal-500 focus:outline-none" />
                  </div>
                </div>
              </div>

              {/* Step 2: Students */}
              <div class="feature-card p-8 rounded-3xl">
                <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span class="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-sm font-bold">2</span>
                  Student Information
                </h2>
                <div id="students-container" class="space-y-6">
                  {/* Students will be added by JavaScript */}
                </div>
              </div>

              {/* Step 3: Payment */}
              <div class="feature-card p-8 rounded-3xl">
                <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span class="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-sm font-bold">3</span>
                  Payment Information
                </h2>
                <div class="space-y-4">
                  <div id="card-element" class="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700">
                    {/* Stripe Card Element will be mounted here */}
                    <div class="text-gray-500 text-sm">Stripe payment form will be integrated here</div>
                  </div>
                  <p class="text-xs text-gray-500">
                    <i class="fas fa-lock mr-1"></i>
                    Your payment information is secure and encrypted
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button id="submit-btn" class="btn-primary w-full px-8 py-5 rounded-full text-xl font-bold text-white">
                Complete Enrollment
              </button>
            </div>
            
            {/* Order Summary */}
            <div class="lg:col-span-1">
              <div class="feature-card p-8 rounded-3xl sticky top-32">
                <h2 class="text-2xl font-bold mb-6">Order Summary</h2>
                <div id="order-items" class="space-y-4 mb-6">
                  {/* Order items will be rendered by JavaScript */}
                </div>
                <div class="space-y-3 mb-6">
                  <div class="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span id="checkout-subtotal">$0.00</span>
                  </div>
                  <div class="flex justify-between text-gray-400">
                    <span>Annual Savings</span>
                    <span id="checkout-savings" class="text-teal-500">-$0.00</span>
                  </div>
                  <div class="pt-3 border-t border-white/10">
                    <div class="flex justify-between text-xl font-bold">
                      <span>Total Today</span>
                      <span id="checkout-total">$0.00</span>
                    </div>
                    <div class="text-sm text-gray-400 mt-2">Daily prorated for first month</div>
                  </div>
                </div>
                <div class="pt-6 border-t border-white/10 space-y-3 text-xs text-gray-500">
                  <div class="flex items-start gap-2">
                    <i class="fas fa-check text-teal-500 mt-0.5"></i>
                    <span>Cancel anytime, no questions asked</span>
                  </div>
                  <div class="flex items-start gap-2">
                    <i class="fas fa-check text-teal-500 mt-0.5"></i>
                    <span>Daily proration - pay only for days used</span>
                  </div>
                  <div class="flex items-start gap-2">
                    <i class="fas fa-check text-teal-500 mt-0.5"></i>
                    <span>Instant access to all class recordings</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JavaScript for Checkout Logic */}
      <script dangerouslySetInnerHTML={{__html: `
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        function renderStudentForms() {
          const container = document.getElementById('students-container');
          const totalStudents = cart.reduce((sum, item) => sum + (item.students * item.quantity), 0);
          
          container.innerHTML = Array.from({ length: totalStudents }, (_, i) => \`
            <div class="p-6 bg-gray-900 rounded-xl">
              <h3 class="font-bold mb-4">Student \${i + 1}</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium mb-2">First Name</label>
                  <input type="text" class="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-teal-500 focus:outline-none" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2">Last Name</label>
                  <input type="text" class="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-teal-500 focus:outline-none" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2">Age</label>
                  <input type="number" min="7" max="14" class="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-teal-500 focus:outline-none" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2">Grade</label>
                  <input type="text" class="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-teal-500 focus:outline-none" />
                </div>
              </div>
            </div>
          \`).join('');
        }
        
        function renderOrderSummary() {
          const container = document.getElementById('order-items');
          let monthlySubtotal = 0;
          let totalSavings = 0;
          
          container.innerHTML = cart.map(item => {
            // Calculate price per student per month
            const pricePerStudent = item.price;
            const totalStudents = item.students * item.quantity;
            
            // Monthly total = price per student × number of students
            const monthlyTotal = pricePerStudent * totalStudents;
            
            let displayTotal = monthlyTotal;
            let itemSavings = 0;
            
            if (item.billing === 'annual') {
              // Annual: already has 20% discount in price, so total is monthly × 10
              displayTotal = monthlyTotal * 10;
              
              // Calculate savings: what they would pay without discount
              const monthlyPriceWithoutDiscount = pricePerStudent / 0.8;
              const annualWithoutDiscount = monthlyPriceWithoutDiscount * totalStudents * 10;
              itemSavings = annualWithoutDiscount - displayTotal;
              totalSavings += itemSavings;
            }
            
            monthlySubtotal += monthlyTotal;
            
            return \`
              <div class="pb-4 border-b border-white/10">
                <div class="font-bold mb-1">\${item.students}\${item.students >= 4 ? '+' : ''} Student\${item.students > 1 ? 's' : ''}\${item.quantity > 1 ? ' (×' + item.quantity + ' packages)' : ''}</div>
                <div class="text-sm text-gray-400">\${item.billing === 'annual' ? 'Annual (10 months)' : 'Monthly'} · $\${monthlyTotal.toFixed(2)}/mo</div>
                \${item.billing === 'annual' ? '<div class="text-teal-500 text-xs mt-1">Save $' + itemSavings.toFixed(2) + '</div>' : ''}
              </div>
            \`;
          }).join('');
          
          // Calculate prorated amount for FIRST MONTH ONLY (for monthly billing)
          const today = new Date();
          const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
          const daysRemaining = daysInMonth - today.getDate() + 1;
          
          // For first month: prorate based on days remaining
          const proratedFirstMonth = (monthlySubtotal / daysInMonth) * daysRemaining;
          
          document.getElementById('checkout-subtotal').textContent = '$' + monthlySubtotal.toFixed(2);
          document.getElementById('checkout-savings').textContent = totalSavings > 0 ? '-$' + totalSavings.toFixed(2) : '$0.00';
          document.getElementById('checkout-total').textContent = '$' + proratedFirstMonth.toFixed(2);
        }
        
        // Handle form submission
        document.getElementById('submit-btn').addEventListener('click', () => {
          alert('Payment integration coming soon! This will connect to Stripe for secure payment processing.');
        });
        
        // Initial render
        if (cart.length === 0) {
          window.location.href = '/pricing';
        } else {
          renderStudentForms();
          renderOrderSummary();
        }
      `}} />
    </div>,
    { title: 'Checkout - Acromatico Academy' }
  )
})

app.get('/login', (c) => c.render(<div class="p-8"><h1 class="text-3xl font-bold">Login - Coming Soon</h1></div>))
app.get('/faq', (c) => c.render(<div class="p-8"><h1 class="text-3xl font-bold">FAQ - Coming Soon</h1></div>))
app.get('/contact', (c) => c.render(<div class="p-8"><h1 class="text-3xl font-bold">Contact - Coming Soon</h1></div>))
app.get('/our-story', (c) => {
  return c.render(
    <div class="min-h-screen bg-black text-white">
      <nav class="glass-nav fixed top-0 left-0 right-0 z-50">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
          <div class="flex justify-between h-20 items-center">
            <div class="flex items-center space-x-4 opacity-0">
              <span>Spacer</span>
            </div>
            <div class="flex-1 flex justify-center">
              <a href="/">
                <img src="/static/acromatico-logo-white.png" alt="Acromatico" class="h-8 w-auto" />
              </a>
            </div>
            <div class="flex items-center space-x-4">
              <a href="/login" class="text-gray-300 hover:text-white transition">Sign In</a>
            </div>
          </div>
        </div>
      </nav>

      <section class="pt-32 pb-20">
        <div class="max-w-4xl mx-auto px-6 lg:px-8">
          <h1 class="text-6xl font-black mb-8">Our Story</h1>
          <div class="space-y-8 text-xl text-gray-300 leading-relaxed">
            <p>
              Acromatico was born from a simple belief: every child has a unique way of seeing the world, 
              and photography is one of the most powerful tools to help them discover and express that vision.
            </p>
            <p>
              Founded by award-winning photographers Italo Campilii and Ale, with over 20 years of combined 
              experience in visual storytelling, documentary filmmaking, and portrait photography, Acromatico 
              exists to empower young creators ages 7-14 with real-world skills.
            </p>
            <p>
              We're not just teaching kids how to use a camera. We're teaching them how to see, how to tell 
              stories, and how to capture moments that matter. Our live, interactive classes combine technical 
              expertise with creative freedom, giving students the confidence to create work they're proud of.
            </p>
            <p>
              <strong class="text-teal-500">Our mission is simple:</strong> Help 1,000 young creators discover 
              their visual voice and build skills that last a lifetime.
            </p>
          </div>
        </div>
      </section>
    </div>,
    { title: 'Our Story - Acromatico' }
  )
})

export default app
