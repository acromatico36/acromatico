import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'
import Stripe from 'stripe'

// Shared Header Component
const Header = () => (
  <nav class="glass-nav fixed top-0 left-0 right-0 z-50">
    <style>{`
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
    `}</style>
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
          <a href="/pricing" class="btn-primary px-6 py-3 rounded-full font-semibold">
            Enroll Now
          </a>
          <a href="/login" class="text-gray-300 hover:text-white transition">Sign In</a>
        </div>
      </div>
    </div>
  </nav>
)

type Bindings = {
  DB: D1Database
  STRIPE_SECRET_KEY: string
  STRIPE_PUBLISHABLE_KEY: string
}

const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS for API routes
app.use('/api/*', cors())

// Stripe Checkout API
app.post('/api/create-checkout', async (c) => {
  try {
    const { STRIPE_SECRET_KEY } = c.env
    const stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: '2024-12-18.acacia',
    })

    const body = await c.req.json()
    const { printName, size, sizePrice, frameName, framePrice } = body

    // Calculate total
    const total = sizePrice + framePrice

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${printName} - ${size}"`,
              description: `${frameName} Frame • Edition 1/100 • Signed by Artists • Artisan Made • Ships in 4-6 Weeks`,
              images: ['https://acromatico.com/static/logo.png'], // Add your logo
            },
            unit_amount: total * 100, // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${c.req.url.split('/api')[0]}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${c.req.url.split('/api')[0]}/prints`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      metadata: {
        printName,
        size,
        frameName,
      },
    })

    return c.json({ url: session.url })
  } catch (error) {
    console.error('Stripe error:', error)
    return c.json({ error: 'Failed to create checkout session' }, 500)
  }
})

// Get Stripe publishable key
app.get('/api/stripe-key', (c) => {
  return c.json({ publishableKey: c.env.STRIPE_PUBLISHABLE_KEY })
})

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
          border-color: rgba(71, 148, 166, 0.5);
          box-shadow: 0 10px 40px rgba(71, 148, 166, 0.2);
        }
        
        .stat-number {
          background: linear-gradient(135deg, #4794A6 0%, #ED70C4 50%, #AF40F6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Navigation */}
      <Header />

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
              <div class="text-teal-500 font-semibold mb-4">Co-Founder & Lead Educator</div>
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
              From finding your eye to storytelling through the lens
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
              <h4 class="text-xl font-bold mb-3">Manual Mode Mastery</h4>
              <p class="text-gray-400 text-sm">Exposure triangle: aperture, shutter speed, ISO control</p>
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
              <h4 class="text-xl font-bold mb-3">Photo Essay Project</h4>
              <p class="text-gray-400 text-sm">Complete your first photo essay—10-15 curated images that tell a story</p>
            </div>
            <div class="feature-card p-8 rounded-2xl">
              <div class="text-teal-500 font-bold mb-2">SEPTEMBER</div>
              <h4 class="text-xl font-bold mb-3">Advanced Composition</h4>
              <p class="text-gray-400 text-sm">Breaking rules, creative framing, visual poetry</p>
            </div>
            <div class="feature-card p-8 rounded-2xl">
              <div class="text-blue-500 font-bold mb-2">OCTOBER</div>
              <h4 class="text-xl font-bold mb-3">Photo Editing Mastery</h4>
              <p class="text-gray-400 text-sm">Lightroom basics, turning good photos into great ones</p>
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
                <p class="text-xs text-gray-500 mt-2">
                  Minimum 8 characters (letters, numbers, or symbols)
                </p>
              </div>
              <button onclick="goToStep(2)" class="btn-primary w-full px-8 py-5 rounded-full text-xl font-bold" style="background: #4794A6;">
                Continue →
              </button>
            </div>
            
            {/* Security Badge */}
            <div class="mt-8 pt-8 border-t border-white/10">
              <div class="flex items-center justify-center gap-3 text-sm text-gray-400">
                <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span class="font-medium">256-bit SSL Encryption</span>
                <span class="text-gray-600">•</span>
                <span>Your data is secure</span>
              </div>
              <p class="text-center text-xs text-gray-500 mt-2">
                We use industry-standard encryption (AES-256) and secure password hashing (bcrypt) to protect your information.
              </p>
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
            <p class="text-center text-sm text-gray-400 mb-6">
              <span class="annual-note hidden">Annual billing covers 10 months (Sept-June school year). No classes in July & August. December includes 2 special 1-hour workshops!</span>
              <span class="monthly-note">Billed monthly. Cancel anytime with daily proration.</span>
            </p>

            <div class="grid grid-cols-2 gap-4 mb-8">
              <div class="package-option feature-card p-6 rounded-2xl cursor-pointer hover:ring-2 hover:ring-teal-500 transition relative" onclick="selectPackage(1)">
                <div class="text-4xl font-black mb-2">1</div>
                <div class="text-gray-400 text-sm mb-3">Student</div>
                <div class="text-2xl font-bold">
                  <span class="monthly-price">$116</span>
                  <span class="annual-price hidden">$93</span>
                  <span class="text-sm text-gray-500">/mo</span>
                </div>
                <div class="annual-savings text-teal-500 text-xs mt-2 hidden">Save $230 (school year)</div>
                <div class="text-xs text-gray-500 mt-3 monthly-per-class">$14.50 per class</div>
                <div class="text-xs text-gray-500 mt-3 annual-per-class hidden">$11.63 per class</div>
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
                <div class="annual-savings text-teal-500 text-xs mt-2 hidden">Save $400 (school year)</div>
                <div class="text-xs text-gray-500 mt-3 monthly-per-class">$12.38 per class (each)</div>
                <div class="text-xs text-gray-500 mt-3 annual-per-class hidden">$9.88 per class (each)</div>
              </div>
              <div class="package-option feature-card p-6 rounded-2xl cursor-pointer hover:ring-2 hover:ring-teal-500 transition relative" onclick="selectPackage(3)">
                <div class="text-4xl font-black mb-2">3</div>
                <div class="text-gray-400 text-sm mb-3">Students</div>
                <div class="text-2xl font-bold">
                  <span class="monthly-price">$89</span>
                  <span class="annual-price hidden">$71</span>
                  <span class="text-sm text-gray-500">/mo each</span>
                </div>
                <div class="annual-savings text-teal-500 text-xs mt-2 hidden">Save $540 (school year)</div>
                <div class="text-xs text-gray-500 mt-3 monthly-per-class">$11.13 per class (each)</div>
                <div class="text-xs text-gray-500 mt-3 annual-per-class hidden">$8.88 per class (each)</div>
              </div>
              <div class="package-option feature-card p-6 rounded-2xl cursor-pointer hover:ring-2 hover:ring-teal-500 transition relative" onclick="selectPackage(4)">
                <div class="text-4xl font-black mb-2">4+</div>
                <div class="text-gray-400 text-sm mb-3">Students</div>
                <div class="text-2xl font-bold">
                  <span class="monthly-price">$79</span>
                  <span class="annual-price hidden">$63</span>
                  <span class="text-sm text-gray-500">/mo each</span>
                </div>
                <div class="annual-savings text-teal-500 text-xs mt-2 hidden">Save $640 (school year)</div>
                <div class="text-xs text-gray-500 mt-3 monthly-per-class">$9.88 per class (each)</div>
                <div class="text-xs text-gray-500 mt-3 annual-per-class hidden">$7.88 per class (each)</div>
              </div>
            </div>
            
            {/* What's Included */}
            <div class="feature-card p-6 rounded-2xl mt-6">
              <h3 class="text-lg font-bold mb-4 text-center">Everything Included</h3>
              <div class="grid grid-cols-1 gap-3 text-sm">
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <div>
                    <div class="font-semibold text-white">30-Minute Micro-Learning Sessions</div>
                    <div class="text-gray-400 text-xs">Perfect for young creators' attention spans - 8 live classes/month (Mon & Thu 11:30 AM ET)</div>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <div>
                    <div class="font-semibold text-white">Lifetime Instruction Library</div>
                    <div class="text-gray-400 text-xs">Can't make it live? Catch up on expert-led teachings anytime.</div>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <div>
                    <div class="font-semibold text-white">December Bonus Workshops</div>
                    <div class="text-gray-400 text-xs">First 2 weeks of December: Special 1-hour fun workshops to celebrate the year!</div>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <div>
                    <div class="font-semibold text-white">Portfolio Building</div>
                    <div class="text-gray-400 text-xs">Showcase your child's work and track their creative journey</div>
                  </div>
                </div>
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
          // Validate Step 1 before proceeding to Step 2
          if (currentStep === 1 && step === 2) {
            const email = document.getElementById('parent-email').value.trim();
            const password = document.getElementById('parent-password').value;
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
              alert('Please enter a valid email address');
              document.getElementById('parent-email').focus();
              return;
            }
            
            // Password validation (min 8 chars only - keep it simple)
            if (!password || password.length < 8) {
              alert('Password must be at least 8 characters long');
              document.getElementById('parent-password').focus();
              return;
            }
          }
          
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
          
          // Toggle per-class pricing
          document.querySelectorAll('.monthly-per-class').forEach(el => {
            el.classList.toggle('hidden', isAnnual);
          });
          document.querySelectorAll('.annual-per-class').forEach(el => {
            el.classList.toggle('hidden', !isAnnual);
          });
          
          // Toggle billing notes
          document.querySelectorAll('.monthly-note').forEach(el => {
            el.classList.toggle('hidden', isAnnual);
          });
          document.querySelectorAll('.annual-note').forEach(el => {
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
            // Annual: 10 months prepaid (school year, no summer)
            totalCharge = monthlyTotal * 10;
            chargeLabel = 'Total (10 months prepaid)';
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
            ((pricingData.monthly[students] * students * 10) - (pricePerStudent * students * 10)) : 0;
          
          // Update summary
          const billingText = isAnnual ? ' (Annual - 10 months)' : ' (Monthly)';
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
          
          const billingType = isAnnual ? 'Annual (10 months prepaid - school year)' : 'Monthly';
          const pricePerStudent = selectedPrice;
          const monthlyTotal = pricePerStudent * selectedStudents;
          const totalCharge = isAnnual ? monthlyTotal * 10 : monthlyTotal;
          
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

// ACADEMY - CURRICULUM PAGE
// BRAND NEW ACADEMY PAGE - CLEAN REBUILD FROM SCRATCH
app.get('/academy', (c) => 
  c.render(
    <div class="min-h-screen bg-black text-white">
      {/* Navigation */}
      <Header />

      {/* Hero */}
      <section class="pt-32 pb-16 text-center">
        <div class="max-w-4xl mx-auto px-6">
          <h1 class="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Your 12-Month Creative Journey
          </h1>
          <p class="text-xl md:text-2xl text-gray-300 mb-8">
            From camera-curious beginner to confident visual storyteller.
          </p>
          <a href="/pricing" class="inline-block px-10 py-4 rounded-full font-bold text-lg bg-teal-500 hover:bg-teal-600 transition">
            Start Your Journey →
          </a>
        </div>
      </section>

      {/* JANUARY - Finding Your Eye */}
      <section class="py-20 bg-gradient-to-b from-black to-gray-900">
        <div class="max-w-6xl mx-auto px-6">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div class="text-teal-500 font-bold text-sm mb-2">MONTH 1 • JANUARY</div>
              <h2 class="text-4xl md:text-5xl font-black mb-6">Finding Your Eye</h2>
              <p class="text-lg text-gray-300 mb-4">
                <strong class="text-white">Imagine your child picking up a camera</strong> and instinctively knowing exactly where to stand, what to frame, and when to press the shutter.
              </p>
              <p class="text-lg text-gray-300 mb-4">
                Through the <strong class="text-white">Rule of Thirds</strong> and <strong class="text-white">Leading Lines</strong>, they learn why some photos feel balanced and others feel chaotic.
              </p>
              <p class="text-lg text-teal-400 font-semibold">
                By the end of January, they won't just take photos — they'll compose them like a professional.
              </p>
            </div>
            <div class="relative">
              <img src="/static/images/curriculum/january-vintage-camera.jpg" alt="Vintage Camera" class="rounded-2xl shadow-2xl w-full"/>
            </div>
          </div>
        </div>
      </section>

      {/* FEBRUARY - Light & Shadow */}
      <section class="py-20 bg-gray-900">
        <div class="max-w-6xl mx-auto px-6">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div class="order-2 md:order-1 relative">
              <img src="/static/images/curriculum/february-beach-boardwalk.jpg" alt="Beach Boardwalk" class="rounded-2xl shadow-2xl w-full"/>
            </div>
            <div class="order-1 md:order-2">
              <div class="text-blue-500 font-bold text-sm mb-2">MONTH 2 • FEBRUARY</div>
              <h2 class="text-4xl md:text-5xl font-black mb-6">Light & Shadow</h2>
              <p class="text-lg text-gray-300 mb-4">
                <strong class="text-white">Photography is painting with light.</strong> And in February, your child becomes the artist.
              </p>
              <p class="text-lg text-gray-300 mb-4">
                They'll learn why the <strong class="text-blue-400">Golden Hour</strong> makes everything look cinematic. Why shadows aren't mistakes, but tools for drama and depth.
              </p>
              <p class="text-lg text-blue-400 font-semibold">
                Your child won't just take photos anymore. They'll chase the light.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MARCH - Video Basics */}
      <section class="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div class="max-w-6xl mx-auto px-6">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div class="text-purple-500 font-bold text-sm mb-2">MONTH 3 • MARCH</div>
              <h2 class="text-4xl md:text-5xl font-black mb-6">Video Basics</h2>
              <p class="text-lg text-gray-300 mb-4">
                <strong class="text-white">Still photos capture a moment.</strong> Video tells the whole story.
              </p>
              <p class="text-lg text-gray-300 mb-4">
                In March, your child discovers <strong class="text-purple-400">the power of motion</strong> — how to make viewers feel like they're right there in the scene.
              </p>
              <p class="text-lg text-purple-400 font-semibold">
                By the end of March, they'll be creating mini-movies that make you say "How did my kid do that?"
              </p>
            </div>
            <div class="relative">
              <img src="/static/images/curriculum/march-mountain-photographer.jpg" alt="Mountain Photographer" class="rounded-2xl shadow-2xl w-full"/>
            </div>
          </div>
        </div>
      </section>

      {/* APRIL - Portrait Photography */}
      <section class="py-20 bg-black">
        <div class="max-w-6xl mx-auto px-6">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div class="order-2 md:order-1 relative">
              <img src="/static/images/curriculum/april-mom-child-beach.jpg" alt="Mother and Child" class="rounded-2xl shadow-2xl w-full"/>
            </div>
            <div class="order-1 md:order-2">
              <div class="text-teal-500 font-bold text-sm mb-2">MONTH 4 • APRIL</div>
              <h2 class="text-4xl md:text-5xl font-black mb-6">Portrait Photography</h2>
              <p class="text-lg text-gray-300 mb-4">
                <strong class="text-white">People aren't just subjects.</strong> They're stories waiting to be told.
              </p>
              <p class="text-lg text-gray-300 mb-4">
                In April, your child learns the art of <strong class="text-teal-400">connection</strong> — how to capture genuine smiles and personality.
              </p>
              <p class="text-lg text-teal-400 font-semibold">
                Your child will become the family photographer everyone requests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MAY - Street Photography */}
      <section class="py-20 bg-gradient-to-b from-black to-gray-900">
        <div class="max-w-6xl mx-auto px-6">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div class="text-blue-500 font-bold text-sm mb-2">MONTH 5 • MAY</div>
              <h2 class="text-4xl md:text-5xl font-black mb-6">Street Photography</h2>
              <p class="text-lg text-gray-300 mb-4">
                <strong class="text-white">The world is your canvas.</strong> And May is when your child learns to capture it.
              </p>
              <p class="text-lg text-gray-300 mb-4">
                <strong class="text-blue-400">Street photography</strong> is all about <strong class="text-white">decisive moments</strong> — finding beauty in the everyday.
              </p>
              <p class="text-lg text-blue-400 font-semibold">
                After May, every walk becomes a photo adventure.
              </p>
            </div>
            <div class="relative">
              <img src="/static/images/curriculum/may-chicago-skyline.jpg" alt="Chicago Skyline" class="rounded-2xl shadow-2xl w-full"/>
            </div>
          </div>
        </div>
      </section>

      {/* JUNE - Photo Essay Project */}
      <section class="py-20 bg-gradient-to-r from-purple-900 via-blue-900 to-teal-900">
        <div class="max-w-4xl mx-auto px-6 text-center">
          <div class="text-purple-400 font-bold text-sm mb-2">MONTH 6 • JUNE</div>
          <h2 class="text-5xl md:text-6xl font-black mb-8">Photo Essay Project</h2>
          <p class="text-2xl text-gray-200 mb-8">
            This is it. <strong class="text-white">The big reveal.</strong>
          </p>
          <p class="text-lg text-gray-300 mb-4">
            Every student completes their <strong class="text-purple-400">first photo essay</strong> — a real, start-to-finish project that tells a story they care about.
          </p>
          <p class="text-xl text-purple-300 font-bold mt-8">
            They present it to family and friends. 📸
          </p>
        </div>
      </section>

      {/* SEPTEMBER - Advanced Composition */}
      <section class="py-20 bg-black">
        <div class="max-w-6xl mx-auto px-6">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div class="text-teal-500 font-bold text-sm mb-2">MONTH 7 • SEPTEMBER</div>
              <h2 class="text-4xl md:text-5xl font-black mb-6">Advanced Composition</h2>
              <p class="text-lg text-gray-300 mb-4">
                <strong class="text-white">Now that they know the rules...</strong> it's time to break them.
              </p>
              <p class="text-lg text-gray-300 mb-4">
                September is where <strong class="text-teal-400">creativity gets unleashed</strong>. Negative space, unconventional framing, artistic choices.
              </p>
              <p class="text-lg text-teal-400 font-semibold">
                Your child will develop their own unique style.
              </p>
            </div>
            <div class="relative">
              <img src="/static/images/curriculum/september-advanced-composition.jpg" alt="Advanced Composition" class="rounded-2xl shadow-2xl w-full"/>
            </div>
          </div>
        </div>
      </section>

      {/* OCTOBER - Photo Editing Mastery */}
      <section class="py-20 bg-gray-900">
        <div class="max-w-6xl mx-auto px-6">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div class="order-2 md:order-1 relative">
              <img src="/static/images/curriculum/october-video-editing.jpg" alt="Video Editing Timeline" class="rounded-2xl shadow-2xl w-full"/>
            </div>
            <div class="order-1 md:order-2">
              <div class="text-blue-500 font-bold text-sm mb-2">MONTH 8 • OCTOBER</div>
              <h2 class="text-4xl md:text-5xl font-black mb-6">Photo Editing Mastery</h2>
              <p class="text-lg text-gray-300 mb-4">
                <strong class="text-white">Great photos are made twice.</strong> Once in-camera. Once in post-production.
              </p>
              <p class="text-lg text-gray-300 mb-4">
                In October, your child learns <strong class="text-blue-400">professional editing techniques</strong> using Lightroom.
              </p>
              <p class="text-lg text-blue-400 font-semibold">
                They'll turn good photos into great ones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NOVEMBER - Portfolio Building */}
      <section class="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div class="max-w-6xl mx-auto px-6">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div class="text-purple-500 font-bold text-sm mb-2">MONTH 9 • NOVEMBER</div>
              <h2 class="text-4xl md:text-5xl font-black mb-6">Portfolio Building</h2>
              <p class="text-lg text-gray-300 mb-4">
                <strong class="text-white">A year's worth of work deserves to be seen.</strong>
              </p>
              <p class="text-lg text-gray-300 mb-4">
                In November, your child learns to <strong class="text-purple-400">curate like a gallery curator</strong> — selecting their strongest work.
              </p>
              <p class="text-lg text-purple-400 font-semibold">
                Your child will have a professional portfolio they can be proud of.
              </p>
            </div>
            <div class="relative">
              <img src="/static/images/curriculum/november-portfolio-collage.jpg" alt="Professional Portfolio Collage" class="rounded-2xl shadow-2xl w-full"/>
            </div>
          </div>
        </div>
      </section>

      {/* DECEMBER - Year-End Showcase */}
      <section class="py-20 bg-gradient-to-r from-teal-900 via-blue-900 to-purple-900">
        <div class="max-w-4xl mx-auto px-6 text-center">
          <div class="text-teal-400 font-bold text-sm mb-2">MONTH 10 • DECEMBER</div>
          <h2 class="text-5xl md:text-6xl font-black mb-8">Year-End Showcase</h2>
          <p class="text-2xl text-gray-200 mb-8">
            <strong class="text-white">This is the moment.</strong> The celebration. The standing ovation.
          </p>
          <p class="text-lg text-gray-300 mb-4">
            The <strong class="text-teal-400">Year-End Showcase</strong> is their moment to shine — presenting their best work to everyone who matters.
          </p>
          <p class="text-xl text-teal-300 font-bold mt-8">
            Imagine your child standing in front of everyone, sharing their creative journey. 🎉
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section class="py-32 bg-black text-center">
        <div class="max-w-4xl mx-auto px-6">
          <h2 class="text-5xl md:text-6xl font-black mb-6">Ready to Start This Journey?</h2>
          <p class="text-2xl text-gray-300 mb-12">
            10 transformative months. 80 micro-learning sessions. 1 incredible creative journey.
          </p>
          <a href="/pricing" class="inline-block px-12 py-6 rounded-full text-xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 transition shadow-2xl">
            Enroll Now
          </a>
          <p class="mt-8 text-sm text-gray-400">
            30-minute sessions • Expert-led instruction • Lifetime access to all teachings
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer class="bg-gray-900 py-16 border-t border-white/10">
        <div class="max-w-7xl mx-auto px-6 text-center">
          <p class="text-gray-400 text-sm">© 2026 Acromatico. Built for creators, by creators.</p>
        </div>
      </footer>

      {/* Enrollment Modal */}
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
                <p class="text-xs text-gray-500 mt-2">
                  Minimum 8 characters (letters, numbers, or symbols)
                </p>
              </div>
              <button onclick="goToStep(2)" class="btn-primary w-full px-8 py-5 rounded-full text-xl font-bold" style="background: #4794A6;">
                Continue →
              </button>
            </div>
            
            {/* Security Badge */}
            <div class="mt-8 pt-8 border-t border-white/10">
              <div class="flex items-center justify-center gap-3 text-sm text-gray-400">
                <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span class="font-medium">256-bit SSL Encryption</span>
                <span class="text-gray-600">•</span>
                <span>Your data is secure</span>
              </div>
              <p class="text-center text-xs text-gray-500 mt-2">
                We use industry-standard encryption (AES-256) and secure password hashing (bcrypt) to protect your information.
              </p>
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
            <p class="text-center text-sm text-gray-400 mb-6">
              <span class="annual-note hidden">Annual billing covers 10 months (Sept-June school year). No classes in July & August. December includes 2 special 1-hour workshops!</span>
              <span class="monthly-note">Billed monthly. Cancel anytime with daily proration.</span>
            </p>

            <div class="grid grid-cols-2 gap-4 mb-8">
              <div class="package-option feature-card p-6 rounded-2xl cursor-pointer hover:ring-2 hover:ring-teal-500 transition relative" onclick="selectPackage(1)">
                <div class="text-4xl font-black mb-2">1</div>
                <div class="text-gray-400 text-sm mb-3">Student</div>
                <div class="text-2xl font-bold">
                  <span class="monthly-price">$116</span>
                  <span class="annual-price hidden">$93</span>
                  <span class="text-sm text-gray-500">/mo</span>
                </div>
                <div class="annual-savings text-teal-500 text-xs mt-2 hidden">Save $230 (school year)</div>
                <div class="text-xs text-gray-500 mt-3 monthly-per-class">$14.50 per class</div>
                <div class="text-xs text-gray-500 mt-3 annual-per-class hidden">$11.63 per class</div>
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
                <div class="annual-savings text-teal-500 text-xs mt-2 hidden">Save $400 (school year)</div>
                <div class="text-xs text-gray-500 mt-3 monthly-per-class">$12.38 per class (each)</div>
                <div class="text-xs text-gray-500 mt-3 annual-per-class hidden">$9.88 per class (each)</div>
              </div>
              <div class="package-option feature-card p-6 rounded-2xl cursor-pointer hover:ring-2 hover:ring-teal-500 transition relative" onclick="selectPackage(3)">
                <div class="text-4xl font-black mb-2">3</div>
                <div class="text-gray-400 text-sm mb-3">Students</div>
                <div class="text-2xl font-bold">
                  <span class="monthly-price">$89</span>
                  <span class="annual-price hidden">$71</span>
                  <span class="text-sm text-gray-500">/mo each</span>
                </div>
                <div class="annual-savings text-teal-500 text-xs mt-2 hidden">Save $540 (school year)</div>
                <div class="text-xs text-gray-500 mt-3 monthly-per-class">$11.13 per class (each)</div>
                <div class="text-xs text-gray-500 mt-3 annual-per-class hidden">$8.88 per class (each)</div>
              </div>
              <div class="package-option feature-card p-6 rounded-2xl cursor-pointer hover:ring-2 hover:ring-teal-500 transition relative" onclick="selectPackage(4)">
                <div class="text-4xl font-black mb-2">4+</div>
                <div class="text-gray-400 text-sm mb-3">Students</div>
                <div class="text-2xl font-bold">
                  <span class="monthly-price">$79</span>
                  <span class="annual-price hidden">$63</span>
                  <span class="text-sm text-gray-500">/mo each</span>
                </div>
                <div class="annual-savings text-teal-500 text-xs mt-2 hidden">Save $640 (school year)</div>
                <div class="text-xs text-gray-500 mt-3 monthly-per-class">$9.88 per class (each)</div>
                <div class="text-xs text-gray-500 mt-3 annual-per-class hidden">$7.88 per class (each)</div>
              </div>
            </div>
            
            {/* What's Included */}
            <div class="feature-card p-6 rounded-2xl mt-6">
              <h3 class="text-lg font-bold mb-4 text-center">Everything Included</h3>
              <div class="grid grid-cols-1 gap-3 text-sm">
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <div>
                    <div class="font-semibold text-white">30-Minute Micro-Learning Sessions</div>
                    <div class="text-gray-400 text-xs">Perfect for young creators' attention spans - 8 live classes/month (Mon & Thu 11:30 AM ET)</div>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <div>
                    <div class="font-semibold text-white">Lifetime Instruction Library</div>
                    <div class="text-gray-400 text-xs">Can't make it live? Catch up on expert-led teachings anytime.</div>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <div>
                    <div class="font-semibold text-white">December Bonus Workshops</div>
                    <div class="text-gray-400 text-xs">First 2 weeks of December: Special 1-hour fun workshops to celebrate the year!</div>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <div>
                    <div class="font-semibold text-white">Portfolio Building</div>
                    <div class="text-gray-400 text-xs">Showcase your child's work and track their creative journey</div>
                  </div>
                </div>
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
          // Validate Step 1 before proceeding to Step 2
          if (currentStep === 1 && step === 2) {
            const email = document.getElementById('parent-email').value.trim();
            const password = document.getElementById('parent-password').value;
            
            // Email validation
            const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
            if (!email || !emailRegex.test(email)) {
              alert('Please enter a valid email address');
              document.getElementById('parent-email').focus();
              return;
            }
            
            // Password validation (min 8 chars only - keep it simple)
            if (!password || password.length < 8) {
              alert('Password must be at least 8 characters long');
              document.getElementById('parent-password').focus();
              return;
            }
          }
          
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
          
          // Toggle per-class pricing
          document.querySelectorAll('.monthly-per-class').forEach(el => {
            el.classList.toggle('hidden', isAnnual);
          });
          document.querySelectorAll('.annual-per-class').forEach(el => {
            el.classList.toggle('hidden', !isAnnual);
          });
          
          // Toggle billing notes
          document.querySelectorAll('.monthly-note').forEach(el => {
            el.classList.toggle('hidden', isAnnual);
          });
          document.querySelectorAll('.annual-note').forEach(el => {
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
            // Annual: 10 months prepaid (school year, no summer)
            totalCharge = monthlyTotal * 10;
            chargeLabel = 'Total (10 months prepaid)';
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
            ((pricingData.monthly[students] * students * 10) - (pricePerStudent * students * 10)) : 0;
          
          // Update summary
          const billingText = isAnnual ? ' (Annual - 10 months)' : ' (Monthly)';
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
          
          const billingType = isAnnual ? 'Annual (10 months prepaid - school year)' : 'Monthly';
          const pricePerStudent = selectedPrice;
          const monthlyTotal = pricePerStudent * selectedStudents;
          const totalCharge = isAnnual ? monthlyTotal * 10 : monthlyTotal;
          
          alert('🎉 Enrollment Complete!\\\\n\\\\nEmail: ' + email + '\\\\nPackage: ' + selectedStudents + ' students at $' + pricePerStudent + '/mo each\\\\nBilling: ' + billingType + '\\\\nTotal: $' + totalCharge.toFixed(2) + '\\\\n\\\\nStripe integration will be added next!');
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
    { title: 'Curriculum - Acromatico Academy' }
  )
)
app.get('/studio', (c) => c.render(<div class="p-8"><h1 class="text-3xl font-bold">Studio - Coming Soon</h1></div>))
// APPLE-STYLE PRINTS PAGE - CLEAN, MINIMAL, INSTANT CHECKOUT

// LUXURY COASTAL PRINTS PAGE - WARM MINIMALISM

app.get('/prints', (c) => 
  c.render(
    <div class="min-h-screen" style="background: #F5F3F0;">
      {/* Navigation */}
      <Header />

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif; 
          -webkit-font-smoothing: antialiased;
          background: #F5F3F0;
          color: #3D3935;
        }
        
        .hero-section {
          padding: 120px 24px 80px;
          text-align: center;
          background: linear-gradient(180deg, #FDFDFB 0%, #F5F3F0 100%);
        }
        
        .hero-title {
          font-size: 72px;
          font-weight: 300;
          letter-spacing: -1px;
          color: #3D3935;
          margin-bottom: 16px;
        }
        
        .hero-subtitle {
          font-size: 20px;
          color: #8B7E6A;
          font-weight: 300;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        
        .staging-showcase {
          max-width: 1400px;
          margin: 0 auto;
          padding: 80px 24px;
        }
        
        .staging-image {
          width: 100%;
          border-radius: 8px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
          margin-bottom: 80px;
          transition: transform 0.6s ease;
        }
        
        .staging-image:hover {
          transform: translateY(-4px);
        }
        
        .print-description {
          text-align: center;
          max-width: 600px;
          margin: -60px auto 100px;
          padding: 0 24px;
        }
        
        .print-title {
          font-size: 36px;
          font-weight: 400;
          color: #3D3935;
          margin-bottom: 12px;
        }
        
        .print-details {
          font-size: 16px;
          color: #8B7E6A;
          line-height: 1.6;
        }
        
        .cta-section {
          text-align: center;
          padding: 100px 24px;
          background: #FDFDFB;
        }
        
        .cta-button {
          display: inline-block;
          padding: 20px 48px;
          background: #3D3935;
          color: #FDFDFB;
          text-decoration: none;
          border-radius: 4px;
          font-size: 18px;
          letter-spacing: 1px;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }
        
        .cta-button:hover {
          background: #8B7E6A;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }
        
        .modal {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(61, 57, 53, 0.85);
          z-index: 9999;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(12px);
        }
        
        .modal.active {
          display: flex;
        }
        
        .modal-content {
          background: #FDFDFB;
          border-radius: 8px;
          max-width: 600px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.3);
        }
        
        .modal-header {
          padding: 40px;
          border-bottom: 1px solid #E8E5E0;
        }
        
        .modal-body {
          padding: 40px;
        }
        
        .size-option, .frame-option {
          border: 2px solid #E8E5E0;
          border-radius: 4px;
          padding: 24px;
          margin-bottom: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          background: white;
        }
        
        .size-option:hover, .frame-option:hover {
          border-color: #8B7E6A;
          background: #FDFDFB;
        }
        
        .size-option.selected, .frame-option.selected {
          border-color: #3D3935;
          background: #F5F3F0;
        }
        
        .option-title {
          font-size: 20px;
          font-weight: 500;
          color: #3D3935;
          margin-bottom: 4px;
        }
        
        .option-details {
          font-size: 16px;
          color: #8B7E6A;
        }
        
        .checkout-summary {
          background: #F5F3F0;
          border-radius: 4px;
          padding: 32px;
          margin-bottom: 24px;
        }
        
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          font-size: 16px;
        }
        
        .summary-total {
          border-top: 2px solid #3D3935;
          padding-top: 16px;
          margin-top: 16px;
          font-size: 24px;
          font-weight: 500;
        }
        
        .back-button {
          color: #8B7E6A;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 16px;
          margin-bottom: 24px;
          padding: 8px 0;
        }
        
        .back-button:hover {
          color: #3D3935;
        }
        
        .close-button {
          position: absolute;
          top: 24px;
          right: 24px;
          background: none;
          border: none;
          font-size: 32px;
          color: #8B7E6A;
          cursor: pointer;
          line-height: 1;
        }
        
        .close-button:hover {
          color: #3D3935;
        }
      `}</style>

      {/* Hero Section */}
      <section class="hero-section">
        <h1 class="hero-title">Fine Art Prints</h1>
        <p class="hero-subtitle">Museum Quality • Limited Edition</p>
      </section>

      {/* Staging Showcase */}
      <section class="staging-showcase">
        
        {/* Print 1: Where Morning Feels Like Forever */}
        <div>
          <img 
            src="/static/prints/staging-aruba-living-room.jpg" 
            alt="Where Morning Feels Like Forever - Aruba Baby Beach Fine Art Print" 
            class="staging-image"
          />
          <div class="print-description">
            <h3 class="print-title">Where Morning Feels Like Forever</h3>
            <p class="print-details" style="margin-bottom: 24px;">
              Baby Beach, Aruba • 6:47 AM. The moment before the world wakes up. A solitary palapa stands where turquoise waters meet endless sky—the kind of blue that makes you want to pause everything and just breathe. This is the feeling you chase on vacation, bottled into a single frame.
            </p>
            <div style="display: flex; gap: 12px; justify-content: center; margin-bottom: 16px; flex-wrap: wrap;">
              <button onclick="addToCart('Where Morning Feels Like Forever', '24×36', 795)" class="cta-button" style="padding: 12px 24px; font-size: 15px;">
                24×36" – $795
              </button>
              <button onclick="addToCart('Where Morning Feels Like Forever', '30×40', 995)" class="cta-button" style="padding: 12px 24px; font-size: 15px;">
                30×40" – $995
              </button>
              <button onclick="addToCart('Where Morning Feels Like Forever', '48×60', 1595)" class="cta-button" style="padding: 12px 24px; font-size: 15px;">
                48×60" – $1,595
              </button>
            </div>
            <p style="font-size: 13px; color: #8B7E6A; text-align: center;">Edition 1/100 • Signed by Artists • Artisan Made • Built to Order • Ships in 4-6 Weeks</p>
          </div>
        </div>

        {/* Print 2: The Village That Time Forgot */}
        <div>
          <img 
            src="/static/prints/staging-mediterranean-villa.jpg" 
            alt="The Village That Time Forgot - Cinque Terre Fine Art Print" 
            class="staging-image"
          />
          <div class="print-description">
            <h3 class="print-title">The Village That Time Forgot</h3>
            <p class="print-details" style="margin-bottom: 24px;">
              Cinque Terre, Italy • Golden Hour. Colorful houses cling to cliffs like they've been there forever—because they have. Captured at the exact moment when the sun turns stone into honey and the Mediterranean becomes liquid sapphire. This is what 'escape' looks like.
            </p>
            <div style="display: flex; gap: 12px; justify-content: center; margin-bottom: 16px; flex-wrap: wrap;">
              <button onclick="addToCart('The Village That Time Forgot', '24×36', 795)" class="cta-button" style="padding: 12px 24px; font-size: 15px;">
                24×36" – $795
              </button>
              <button onclick="addToCart('The Village That Time Forgot', '30×40', 995)" class="cta-button" style="padding: 12px 24px; font-size: 15px;">
                30×40" – $995
              </button>
              <button onclick="addToCart('The Village That Time Forgot', '48×60', 1595)" class="cta-button" style="padding: 12px 24px; font-size: 15px;">
                48×60" – $1,595
              </button>
            </div>
            <p style="font-size: 13px; color: #8B7E6A; text-align: center;">Edition 1/100 • Signed by Artists • Artisan Made • Built to Order • Ships in 4-6 Weeks</p>
          </div>
        </div>

        {/* Print 3: The View That Changed Everything */}
        <div>
          <img 
            src="/static/prints/staging-coastal-terrace.jpg" 
            alt="The View That Changed Everything - Ixtapa Fine Art Print" 
            class="staging-image"
          />
          <div class="print-description">
            <h3 class="print-title">The View That Changed Everything</h3>
            <p class="print-details" style="margin-bottom: 24px;">
              Ixtapa, Mexico • Late Afternoon. Standing on this terrace, the Pacific stretches into forever. This is the view that makes you rethink your entire life—the one that reminds you why you work so hard. Where ocean meets sky, and everything else just... fades away.
            </p>
            <div style="display: flex; gap: 12px; justify-content: center; margin-bottom: 16px; flex-wrap: wrap;">
              <button onclick="addToCart('The View That Changed Everything', '24×36', 795)" class="cta-button" style="padding: 12px 24px; font-size: 15px;">
                24×36" – $795
              </button>
              <button onclick="addToCart('The View That Changed Everything', '30×40', 995)" class="cta-button" style="padding: 12px 24px; font-size: 15px;">
                30×40" – $995
              </button>
              <button onclick="addToCart('The View That Changed Everything', '48×60', 1595)" class="cta-button" style="padding: 12px 24px; font-size: 15px;">
                48×60" – $1,595
              </button>
            </div>
            <p style="font-size: 13px; color: #8B7E6A; text-align: center;">Edition 1/100 • Signed by Artists • Artisan Made • Built to Order • Ships in 4-6 Weeks</p>
          </div>
        </div>

        {/* Print 4: Nature's Compass */}
        <div>
          <img 
            src="/static/prints/staging-aruba-divi-tree.jpg" 
            alt="Nature's Compass - Aruba Divi-Divi Fine Art Print" 
            class="staging-image"
          />
          <div class="print-description">
            <h3 class="print-title">Nature's Compass</h3>
            <p class="print-details" style="margin-bottom: 24px;">
              Aruba • First Light. The divi-divi tree—bent by trade winds for decades, pointing southwest like it's been waiting to show you the way home. Roots dig deep into white sand, tide pools reflect the morning sky. This tree has witnessed a thousand sunrises. You're looking at just one.
            </p>
            <div style="display: flex; gap: 12px; justify-content: center; margin-bottom: 16px; flex-wrap: wrap;">
              <button onclick="addToCart('Nature\\'s Compass', '24×36', 795)" class="cta-button" style="padding: 12px 24px; font-size: 15px;">
                24×36" – $795
              </button>
              <button onclick="addToCart('Nature\\'s Compass', '30×40', 995)" class="cta-button" style="padding: 12px 24px; font-size: 15px;">
                30×40" – $995
              </button>
              <button onclick="addToCart('Nature\\'s Compass', '48×60', 1595)" class="cta-button" style="padding: 12px 24px; font-size: 15px;">
                48×60" – $1,595
              </button>
            </div>
            <p style="font-size: 13px; color: #8B7E6A; text-align: center;">Edition 1/100 • Signed by Artists • Artisan Made • Built to Order • Ships in 4-6 Weeks</p>
          </div>
        </div>

        {/* Print 5: Where Silence Lives */}
        <div>
          <img 
            src="/static/prints/staging-alpine-lodge.jpg" 
            alt="Where Silence Lives - Dolomites Mountain Lodge Fine Art Print" 
            class="staging-image"
          />
          <div class="print-description">
            <h3 class="print-title">Where Silence Lives</h3>
            <p class="print-details" style="margin-bottom: 24px;">
              Dolomites, Italy • Late Afternoon. A stone lodge perched between earth and sky, where jagged peaks pierce clouds and firelight flickers against ancient walls. This is where you go to remember what quiet feels like—the kind of place that makes city noise feel like a distant memory.
            </p>
            <div style="display: flex; gap: 12px; justify-content: center; margin-bottom: 16px; flex-wrap: wrap;">
              <button onclick="addToCart('Where Silence Lives', '24×36', 795)" class="cta-button" style="padding: 12px 24px; font-size: 15px;">
                24×36" – $795
              </button>
              <button onclick="addToCart('Where Silence Lives', '30×40', 995)" class="cta-button" style="padding: 12px 24px; font-size: 15px;">
                30×40" – $995
              </button>
              <button onclick="addToCart('Where Silence Lives', '48×60', 1595)" class="cta-button" style="padding: 12px 24px; font-size: 15px;">
                48×60" – $1,595
              </button>
            </div>
            <p style="font-size: 13px; color: #8B7E6A; text-align: center;">Edition 1/100 • Signed by Artists • Artisan Made • Built to Order • Ships in 4-6 Weeks</p>
          </div>
        </div>

        {/* Print 6: The Room Where Dreams Live */}
        <div>
          <img 
            src="/static/prints/staging-cinque-terre-villa.jpg" 
            alt="The Room Where Dreams Live - Cinque Terre Villa Fine Art Print" 
            class="staging-image"
          />
          <div class="print-description">
            <h3 class="print-title">The Room Where Dreams Live</h3>
            <p class="print-details" style="margin-bottom: 24px;">
              Cinque Terre, Italy • Mid-Morning. A villa perched on cliffs, where whitewashed walls frame the deepest blue you've ever seen. This is the room where every dream vacation starts—the one you pin to your vision board and think about during long meetings. Where luxury meets simplicity, and the view does all the talking.
            </p>
            <div style="display: flex; gap: 12px; justify-content: center; margin-bottom: 16px; flex-wrap: wrap;">
              <button onclick="addToCart('The Room Where Dreams Live', '24×36', 795)" class="cta-button" style="padding: 12px 24px; font-size: 15px;">
                24×36" – $795
              </button>
              <button onclick="addToCart('The Room Where Dreams Live', '30×40', 995)" class="cta-button" style="padding: 12px 24px; font-size: 15px;">
                30×40" – $995
              </button>
              <button onclick="addToCart('The Room Where Dreams Live', '48×60', 1595)" class="cta-button" style="padding: 12px 24px; font-size: 15px;">
                48×60" – $1,595
              </button>
            </div>
            <p style="font-size: 13px; color: #8B7E6A; text-align: center;">Edition 1/100 • Signed by Artists • Artisan Made • Built to Order • Ships in 4-6 Weeks</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section class="cta-section">
        <h2 style="font-size: 48px; font-weight: 300; margin-bottom: 24px; color: #3D3935;">
          Transform Your Space
        </h2>
        <p style="font-size: 18px; color: #8B7E6A; margin-bottom: 40px; max-width: 600px; margin-left: auto; margin-right: auto;">
          Each print is crafted with archival materials and natural oak framing.
          <br/>Limited editions signed by the artists.
        </p>
      </section>

      {/* Purchase Modal */}
      <div id="purchaseModal" class="modal" onclick="closeModal(event)">
        <div class="modal-content" onclick="event.stopPropagation()">
          <button onclick="closeModal()" class="close-button">×</button>
          
          <div class="modal-header">
            <h2 id="modalTitle" style="font-size: 36px; font-weight: 400; color: #3D3935; margin-bottom: 8px;">Print Title</h2>
            <p style="font-size: 16px; color: #8B7E6A;">Limited Edition • Signed by Artists</p>
          </div>

          <div class="modal-body">
            {/* Step 1: Size Selection */}
            <div id="sizeStep">
              <h3 style="font-size: 24px; font-weight: 400; margin-bottom: 24px; color: #3D3935;">Select Size</h3>
              <div class="size-option" onclick="selectSize('40x60', 1595)">
                <div class="option-title">40" × 60"</div>
                <div class="option-details">Perfect for living spaces • $1,595</div>
              </div>
              <div class="size-option" onclick="selectSize('50x75', 2195)">
                <div class="option-title">50" × 75"</div>
                <div class="option-details">Statement piece • $2,195</div>
              </div>
              <div class="size-option" onclick="selectSize('60x90', 2995)">
                <div class="option-title">60" × 90"</div>
                <div class="option-details">Gallery size • $2,995</div>
              </div>
            </div>

            {/* Step 2: Frame Selection */}
            <div id="frameStep" style="display: none;">
              <button onclick="backToSize()" class="back-button">← Back to Size</button>
              <h3 style="font-size: 24px; font-weight: 400; margin-bottom: 24px; color: #3D3935;">Select Frame</h3>
              <div class="frame-option" onclick="selectFrame('Natural Oak', 0)">
                <div class="option-title">Natural Oak Frame</div>
                <div class="option-details">Premium solid oak • Included</div>
              </div>
              <div class="frame-option" onclick="selectFrame('Walnut', 300)">
                <div class="option-title">Walnut Frame</div>
                <div class="option-details">Rich dark wood • +$300</div>
              </div>
              <div class="frame-option" onclick="selectFrame('White Oak', 300)">
                <div class="option-title">White Oak Frame</div>
                <div class="option-details">Light coastal finish • +$300</div>
              </div>
            </div>

            {/* Step 3: Checkout */}
            <div id="checkoutStep" style="display: none;">
              <button onclick="backToFrame()" class="back-button">← Back to Frame</button>
              <h3 style="font-size: 24px; font-weight: 400; margin-bottom: 24px; color: #3D3935;">Order Summary</h3>
              
              <div class="checkout-summary">
                <div class="summary-row">
                  <span style="color: #8B7E6A;">Print</span>
                  <span id="summaryPrint" style="color: #3D3935; font-weight: 500;">—</span>
                </div>
                <div class="summary-row">
                  <span style="color: #8B7E6A;">Size</span>
                  <span id="summarySize" style="color: #3D3935; font-weight: 500;">—</span>
                </div>
                <div class="summary-row">
                  <span style="color: #8B7E6A;">Frame</span>
                  <span id="summaryFrame" style="color: #3D3935; font-weight: 500;">—</span>
                </div>
                <div class="summary-row summary-total">
                  <span style="color: #3D3935;">Total</span>
                  <span id="summaryTotal" style="color: #3D3935;">$0</span>
                </div>
              </div>

              <button onclick="checkout()" class="cta-button" style="width: 100%;">
                Complete Purchase
              </button>
              <p style="text-align: center; font-size: 14px; color: #8B7E6A; margin-top: 16px;">
                Secure checkout with Apple Pay or Credit Card
              </p>
            </div>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{__html: `
        let cart = [];
        let currentPrint = { name: '', basePrice: 0 };
        let selectedSize = { name: '', price: 0 };
        let selectedFrame = { name: '', price: 0 };

        function addToCart(printName, size, price) {
          // Set current selection
          currentPrint = { name: printName, basePrice: price };
          selectedSize = { name: size, price: price };
          selectedFrame = { name: 'Natural Oak', price: 0 };
          
          // Show checkout modal immediately
          showCheckoutModal();
        }
        
        function showCheckoutModal() {
          const total = selectedSize.price + selectedFrame.price;
          
          // Create modal HTML with string concatenation to avoid template literal issues
          const modalHTML = '<div id="checkoutModal" class="modal active" onclick="closeCheckoutModal(event)">' +
            '<div class="modal-content" onclick="event.stopPropagation()" style="max-width: 500px;">' +
            '<button onclick="closeCheckoutModal()" class="close-button">×</button>' +
            '<div class="modal-header">' +
            '<h2 style="font-size: 28px; font-weight: 400; color: #3D3935; margin-bottom: 8px;">Complete Your Order</h2>' +
            '<p style="font-size: 14px; color: #8B7E6A;">Artisan Made • Built to Order • Ships in 4-6 Weeks</p>' +
            '</div>' +
            '<div class="modal-body">' +
            '<div class="checkout-summary" style="margin-bottom: 32px;">' +
            '<div class="summary-row"><span style="color: #8B7E6A;">Print</span><span style="color: #3D3935; font-weight: 500;">' + currentPrint.name + '</span></div>' +
            '<div class="summary-row"><span style="color: #8B7E6A;">Size</span><span style="color: #3D3935; font-weight: 500;">' + selectedSize.name + '"</span></div>' +
            '<div class="summary-row"><span style="color: #8B7E6A;">Frame</span><span style="color: #3D3935; font-weight: 500;">' + selectedFrame.name + (selectedFrame.price > 0 ? ' (+$' + selectedFrame.price + ')' : ' (included)') + '</span></div>' +
            '<div class="summary-row" style="border-top: 2px solid #3D3935; padding-top: 16px; margin-top: 16px; font-size: 20px; font-weight: 500;"><span style="color: #3D3935;">Total</span><span style="color: #3D3935;">$' + total.toLocaleString() + '</span></div>' +
            '</div>' +
            '<h3 style="font-size: 18px; font-weight: 500; margin-bottom: 16px; color: #3D3935;">Choose Payment Method</h3>' +
            '<button onclick="processPayment(\\'apple-pay\\')" class="cta-button" style="width: 100%; margin-bottom: 12px; background: #000;">Apple Pay</button>' +
            '<button onclick="processPayment(\\'google-pay\\')" class="cta-button" style="width: 100%; margin-bottom: 12px; background: #fff; color: #3D3935; border: 2px solid #E8E5E0;">Google Pay</button>' +
            '<button onclick="processPayment(\\'credit-card\\')" class="cta-button" style="width: 100%; background: #3D3935;">Credit Card</button>' +
            '<p style="text-align: center; font-size: 12px; color: #8B7E6A; margin-top: 16px; line-height: 1.6;">🔒 Secure checkout powered by Stripe<br/>Free shipping within the United States</p>' +
            '</div></div></div>';
          
          // Remove existing modal if any
          const existingModal = document.getElementById('checkoutModal');
          if (existingModal) existingModal.remove();
          
          // Add new modal
          document.body.insertAdjacentHTML('beforeend', modalHTML);
        }
        
        function closeCheckoutModal(event) {
          if (!event || event.target.id === 'checkoutModal' || event.target.classList.contains('close-button')) {
            const modal = document.getElementById('checkoutModal');
            if (modal) modal.remove();
          }
        }
        
        function processPayment(method) {
          const total = selectedSize.price + selectedFrame.price;
          
          // Show loading state
          const modal = document.getElementById('checkoutModal');
          if (modal) {
            modal.querySelector('.modal-body').innerHTML = '<div style="text-align: center; padding: 40px;"><p style="font-size: 18px; color: #3D3935; margin-bottom: 16px;">Processing your order...</p><p style="font-size: 14px; color: #8B7E6A;">Redirecting to secure checkout</p></div>';
          }
          
          // Call Stripe checkout API
          fetch('/api/create-checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              printName: currentPrint.name,
              size: selectedSize.name,
              sizePrice: selectedSize.price,
              frameName: selectedFrame.name,
              framePrice: selectedFrame.price
            })
          })
          .then(res => res.json())
          .then(data => {
            if (data.url) {
              window.location.href = data.url;
            } else {
              alert('Error creating checkout session. Please try again.');
              closeCheckoutModal();
            }
          })
          .catch(error => {
            console.error('Checkout error:', error);
            alert('Error processing payment. Please try again.');
            closeCheckoutModal();
          });
        }

        function updateCartBadge() {
          const badge = document.getElementById('cart-badge');
          if (badge) {
            badge.textContent = cart.length;
            badge.style.display = cart.length > 0 ? 'block' : 'none';
          }
        }

        // Load cart from localStorage on page load
        window.addEventListener('DOMContentLoaded', () => {
          const savedCart = localStorage.getItem('acromatico_cart');
          if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCartBadge();
          }
        });

        function openModal(name, price) {
          currentPrint = { name, basePrice: price };
          document.getElementById('modalTitle').textContent = name;
          document.getElementById('purchaseModal').classList.add('active');
          showSizeStep();
        }

        function closeModal(event) {
          if (!event || event.target.id === 'purchaseModal' || event.target.classList.contains('close-button')) {
            document.getElementById('purchaseModal').classList.remove('active');
            showSizeStep();
          }
        }

        function selectSize(size, price) {
          selectedSize = { name: size, price };
          document.querySelectorAll('.size-option').forEach(el => el.classList.remove('selected'));
          event.currentTarget.classList.add('selected');
          setTimeout(() => showFrameStep(), 300);
        }

        function selectFrame(frame, price) {
          selectedFrame = { name: frame, price };
          document.querySelectorAll('.frame-option').forEach(el => el.classList.remove('selected'));
          event.currentTarget.classList.add('selected');
          setTimeout(() => showCheckoutStep(), 300);
        }

        function showSizeStep() {
          document.getElementById('sizeStep').style.display = 'block';
          document.getElementById('frameStep').style.display = 'none';
          document.getElementById('checkoutStep').style.display = 'none';
        }

        function showFrameStep() {
          document.getElementById('sizeStep').style.display = 'none';
          document.getElementById('frameStep').style.display = 'block';
          document.getElementById('checkoutStep').style.display = 'none';
        }

        function showCheckoutStep() {
          document.getElementById('sizeStep').style.display = 'none';
          document.getElementById('frameStep').style.display = 'none';
          document.getElementById('checkoutStep').style.display = 'block';
          
          const total = selectedSize.price + selectedFrame.price;
          document.getElementById('summaryPrint').textContent = currentPrint.name;
          document.getElementById('summarySize').textContent = selectedSize.name + '"';
          document.getElementById('summaryFrame').textContent = selectedFrame.name + (selectedFrame.price > 0 ? ' (+$' + selectedFrame.price + ')' : '');
          document.getElementById('summaryTotal').textContent = '$' + total.toLocaleString();
        }

        function backToSize() {
          showSizeStep();
        }

        function backToFrame() {
          showFrameStep();
        }

        function checkout() {
          const total = selectedSize.price + selectedFrame.price;
          alert('Proceeding to checkout: ' + currentPrint.name + ' - ' + selectedSize.name + ' - ' + selectedFrame.name + ' - Total: $' + total);
          // TODO: Stripe checkout integration
        }
      `}} />

      <footer style="background: #3D3935; padding: 60px 24px; text-align: center;">
        <p style="color: #F5F3F0; font-size: 14px; letter-spacing: 1px;">
          © 2026 Acromatico · Museum-Quality Fine Art Prints
        </p>
      </footer>

    </div>
  )
)
app.get('/photography', (c) => c.render(<div class="p-8"><h1 class="text-3xl font-bold">Photography - Coming Soon</h1></div>))
app.get('/blog', (c) => c.render(<div class="p-8"><h1 class="text-3xl font-bold">Blog - Coming Soon</h1></div>))
// Pricing page
app.get('/pricing', (c) => {
  return c.render(
    <div class="min-h-screen bg-black text-white">
      {/* Navigation */}
      <Header />

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

// Success page after Stripe checkout
app.get('/success', (c) => {
  const sessionId = c.req.query('session_id')
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmed - Acromatico</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-white">
      <div class="min-h-screen flex items-center justify-center px-4">
        <div class="max-w-2xl w-full text-center">
          <div class="mb-8">
            <svg class="w-24 h-24 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          
          <h1 style="font-size: 48px; font-weight: 300; color: #3D3935; margin-bottom: 16px;">
            Order Confirmed
          </h1>
          
          <p style="font-size: 20px; color: #8B7E6A; margin-bottom: 32px; line-height: 1.6;">
            Thank you for your purchase! Your fine art print is being prepared by our artisan team.
          </p>
          
          <div style="background: #F5F3F0; border-radius: 12px; padding: 32px; margin-bottom: 32px; text-align: left;">
            <h3 style="font-size: 18px; font-weight: 500; color: #3D3935; margin-bottom: 16px;">What Happens Next?</h3>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="padding: 12px 0; border-bottom: 1px solid #E8E5E0;">
                <strong style="color: #3D3935;">📧 Confirmation Email</strong>
                <p style="color: #8B7E6A; margin: 4px 0 0 0;">Check your inbox for order details and tracking</p>
              </li>
              <li style="padding: 12px 0; border-bottom: 1px solid #E8E5E0;">
                <strong style="color: #3D3935;">🎨 Artisan Production</strong>
                <p style="color: #8B7E6A; margin: 4px 0 0 0;">Your print is hand-crafted to order</p>
              </li>
              <li style="padding: 12px 0; border-bottom: 1px solid #E8E5E0;">
                <strong style="color: #3D3935;">📦 Shipping (4-6 Weeks)</strong>
                <p style="color: #8B7E6A; margin: 4px 0 0 0;">Free shipping within the United States</p>
              </li>
              <li style="padding: 12px 0;">
                <strong style="color: #3D3935;">✨ Edition 1/100</strong>
                <p style="color: #8B7E6A; margin: 4px 0 0 0;">Signed by artists Italo Campilii & John</p>
              </li>
            </ul>
          </div>
          
          <a href="/prints" style="display: inline-block; background: #3D3935; color: white; padding: 16px 48px; border-radius: 8px; text-decoration: none; font-size: 16px; font-weight: 500; margin-right: 12px;">
            Browse More Prints
          </a>
          
          <a href="/" style="display: inline-block; background: white; color: #3D3935; padding: 16px 48px; border-radius: 8px; text-decoration: none; font-size: 16px; font-weight: 500; border: 2px solid #E8E5E0;">
            Back to Home
          </a>
          
          <p style="margin-top: 48px; font-size: 14px; color: #8B7E6A;">
            Questions? Email us at <a href="mailto:hello@acromatico.com" style="color: #3D3935; text-decoration: underline;">hello@acromatico.com</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `)
})

// Cart page
app.get('/cart', (c) => {
  return c.render(
    <div class="min-h-screen bg-black text-white">
      {/* Navigation */}
      <Header />

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

// FAQ Page - Resource Powerhouse
app.get('/faq', (c) => 
  c.render(
    <div class="min-h-screen bg-black text-white">
      {/* Fixed Navigation */}
      <nav class="glass-nav fixed top-0 left-0 right-0 z-50">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
          <div class="flex justify-between h-20 items-center">
            <a href="/">
              <img src="/static/acromatico-logo-white.png" alt="Acromatico" class="h-8"/>
            </a>
            <div class="flex items-center gap-6">
              <a href="/pricing" class="btn-primary px-6 py-3 rounded-full text-sm font-bold inline-block" style="background: #4794A6;">
                Enroll Now
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section class="pt-32 pb-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
        <div class="absolute inset-0 opacity-20">
          <div class="stars-small"></div>
          <div class="stars-medium"></div>
          <div class="stars-large"></div>
        </div>
        <div class="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <h1 class="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Everything You Need to Know
          </h1>
          <p class="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            From enrollment to gear recommendations — your complete resource guide.
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section class="py-20 bg-black">
        <div class="max-w-4xl mx-auto px-6 lg:px-8">
          
          {/* GENERAL QUESTIONS */}
          <div class="mb-16">
            <h2 class="text-4xl font-black mb-8 text-teal-500">General Questions</h2>
            
            <div class="space-y-6">
              <div class="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 class="text-2xl font-bold mb-3 text-white">What age is this program for?</h3>
                <p class="text-gray-300 leading-relaxed">
                  Acromatico Academy is designed for young creators <strong class="text-white">ages 7-14</strong>. Our 30-minute micro-learning format is perfect for this age range — long enough to teach real skills, short enough to keep them engaged.
                </p>
              </div>

              <div class="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 class="text-2xl font-bold mb-3 text-white">Do they need prior experience?</h3>
                <p class="text-gray-300 leading-relaxed">
                  <strong class="text-white">Absolutely not!</strong> We start from the very beginning. Whether your child has never touched a camera or has been snapping photos on their phone, we'll meet them where they are and take them further.
                </p>
              </div>

              <div class="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 class="text-2xl font-bold mb-3 text-white">What if they can't attend a live class?</h3>
                <p class="text-gray-300 leading-relaxed">
                  No problem! Every class is recorded and available in our <strong class="text-teal-400">Lifetime Instruction Library</strong>. Your child can catch up on expert-led teachings anytime, rewatch lessons as many times as they need, and never fall behind.
                </p>
              </div>

              <div class="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 class="text-2xl font-bold mb-3 text-white">How many classes per month?</h3>
                <p class="text-gray-300 leading-relaxed">
                  <strong class="text-white">8 live classes per month</strong> — every Monday and Thursday at 11:30 AM ET. Plus, in December, we add <strong class="text-teal-400">2 special 1-hour fun workshops</strong> during the first 2 weeks to celebrate the year.
                </p>
              </div>

              <div class="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 class="text-2xl font-bold mb-3 text-white">Can I cancel anytime?</h3>
                <p class="text-gray-300 leading-relaxed">
                  <strong class="text-white">Yes!</strong> Monthly plans can be canceled anytime with no penalties. You only pay for the days you use (daily proration). Annual plans are prepaid for 10 months (Sept-June school year) and save you 20%.
                </p>
              </div>

              <div class="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 class="text-2xl font-bold mb-3 text-white">What if we join mid-year?</h3>
                <p class="text-gray-300 leading-relaxed mb-3">
                  <strong class="text-white">No problem!</strong> You can join anytime during the school year.
                </p>
                <p class="text-gray-300 leading-relaxed">
                  <strong class="text-teal-400">For Monthly Plans:</strong> You'll start with the current month's curriculum and continue through June. Any months you missed will roll over to the next school year, so your child completes the full 10-month journey.
                </p>
                <p class="text-gray-300 leading-relaxed mt-3">
                  <strong class="text-teal-400">For Annual Plans:</strong> If you join mid-year (e.g., January), your 10-month annual plan covers January-June this year, then September-December the following year. You get the full curriculum and 20% savings, just spread across two school years.
                </p>
              </div>
            </div>
          </div>

          {/* GEAR RECOMMENDATIONS */}
          <div class="mb-16">
            <h2 class="text-4xl font-black mb-8 text-blue-500">Gear Recommendations</h2>
            
            <div class="bg-gradient-to-br from-blue-900/20 to-purple-900/20 p-8 rounded-2xl border border-blue-800/30 mb-8">
              <h3 class="text-3xl font-bold mb-4 text-white">Do they need a professional camera?</h3>
              <p class="text-xl text-gray-300 leading-relaxed mb-4">
                <strong class="text-white">Short answer: Not required, but highly recommended for serious growth.</strong>
              </p>
              <p class="text-gray-300 leading-relaxed">
                Your child can start with a smartphone — many incredible photographers do. But if you want to invest in their creative future and give them full manual control, here's what we recommend:
              </p>
            </div>

            {/* AGE-BASED RECOMMENDATIONS */}
            <div class="space-y-8">
              
              {/* Ages 7-10 */}
              <div class="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 class="text-2xl font-bold mb-4 text-teal-500">Ages 7-10: Light & Fun</h3>
                <p class="text-gray-300 mb-4">
                  At this age, <strong class="text-white">lightweight and compact</strong> is key. They need something they can carry, love using, and won't be intimidated by.
                </p>
                <div class="space-y-3">
                  <div class="bg-black/30 p-4 rounded-lg">
                    <strong class="text-white">🎯 Best Option: Fujifilm Instax Mini Evo</strong>
                    <p class="text-gray-400 text-sm mt-1">Instant printing + digital saving. Kids LOVE seeing their photos instantly. Budget: $200-250</p>
                  </div>
                  <div class="bg-black/30 p-4 rounded-lg">
                    <strong class="text-white">📸 Step-Up Option: Sony ZV-1</strong>
                    <p class="text-gray-400 text-sm mt-1">Compact, point-and-shoot style, great for both photo and video. Perfect for learning. Budget: ~$899 (available on StepUp)</p>
                  </div>
                </div>
                <p class="text-gray-400 text-sm mt-4">
                  💡 <strong class="text-white">Pro Tip:</strong> Check <strong class="text-teal-400">StepUp</strong> for budget-friendly options on used Sony, Canon, and Fujifilm cameras. Great way to get professional gear at student-friendly prices.
                </p>
              </div>

              {/* Ages 11-14 */}
              <div class="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 class="text-2xl font-bold mb-4 text-blue-500">Ages 11-14: Serious Growth</h3>
                <p class="text-gray-300 mb-4">
                  This is the sweet spot for <strong class="text-white">mirrorless cameras</strong> — professional quality, lightweight bodies, and room to grow into advanced techniques.
                </p>
                <div class="space-y-3">
                  <div class="bg-black/30 p-4 rounded-lg">
                    <strong class="text-white">🏆 Best Option: Sony A6400 + 16-50mm Kit Lens</strong>
                    <p class="text-gray-400 text-sm mt-1">Lightweight, fast autofocus, excellent image quality. Perfect starter pro camera. Budget: $900-1,100 (check StepUp for savings)</p>
                  </div>
                  <div class="bg-black/30 p-4 rounded-lg">
                    <strong class="text-white">🎬 Budget Option: Fujifilm X-T30 II</strong>
                    <p class="text-gray-400 text-sm mt-1">Compact, retro design kids love, excellent colors straight out of camera. Budget: $800-900 (check StepUp for used)</p>
                  </div>
                </div>

                <div class="mt-6 mb-4">
                  <h4 class="text-xl font-bold text-white mb-3">Pro Options (For Serious Growth)</h4>
                  <p class="text-gray-300 text-sm mb-4">If your child is ready for professional-level gear, these are the systems we've used and recommend:</p>
                </div>

                <div class="space-y-3">
                  <div class="bg-black/30 p-4 rounded-lg border border-teal-500/30">
                    <strong class="text-white">💎 Sony A7 IV + 28-70mm Kit Lens (Pro Mirrorless)</strong>
                    <p class="text-gray-400 text-sm mt-1">Full-frame powerhouse. 33MP, incredible autofocus, 10fps burst, 4K 60p video. Perfect balance of photo/video. Lighter than Canon, longer battery life. Budget: $2,500-2,800</p>
                  </div>
                  <div class="bg-black/30 p-4 rounded-lg border border-teal-500/30">
                    <strong class="text-white">⭐ Sony A7R V + 20mm f/1.8 lens (What We Use!)</strong>
                    <p class="text-gray-400 text-sm mt-1">61MP resolution monster. Incredible sharpness, natural color science, simplified system. Best for portraits, landscapes, studio work. Lightweight mirrorless design. Budget: $3,500-4,000</p>
                  </div>
                  <div class="bg-black/30 p-4 rounded-lg border border-blue-500/30">
                    <strong class="text-white">📸 Canon EOS R6 Mark II + 24-105mm f/4-7.1 Kit Lens (Pro Canon)</strong>
                    <p class="text-gray-400 text-sm mt-1">24MP full-frame. Canon's flagship mirrorless. Incredible color science, reliable autofocus, works with Canon RF and EF lenses (with adapter). 2 decades of Canon fans love this. Budget: $2,500-2,800</p>
                  </div>
                  <div class="bg-black/30 p-4 rounded-lg border border-blue-500/30">
                    <strong class="text-white">🔥 Canon 5D Mark IV + 24-105mm f/4L II Kit Lens (Pro DSLR Classic)</strong>
                    <p class="text-gray-400 text-sm mt-1">30MP full-frame DSLR. The workhorse we used for almost a decade. Rugged, reliable, massive lens ecosystem. Heavier than mirrorless but built like a tank. Perfect for learning pro fundamentals. Budget: $2,000-2,500 (check StepUp for savings)</p>
                  </div>
                </div>
                <p class="text-gray-400 text-sm mt-4">
                  💡 <strong class="text-white">Pro Tip:</strong> <strong class="text-teal-400">StepUp</strong> is a marketplace for high-quality used camera gear. You can save 20-40% on Sony, Canon, and Fujifilm bodies and lenses. All gear is inspected and rated by condition.
                </p>
              </div>

              {/* LENSES RECOMMENDATIONS */}
              <div class="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 class="text-2xl font-bold mb-4 text-purple-500">Lens Recommendations (For Serious Students)</h3>
                <p class="text-gray-300 mb-4">
                  If your child is ready to invest in glass, here's what we recommend based on 2 decades of professional experience:
                </p>
                
                <div class="mb-6">
                  <h4 class="text-lg font-bold text-white mb-3">Sony E-Mount (Our Current System):</h4>
                  <div class="space-y-2">
                    <div class="bg-black/30 p-3 rounded-lg">
                      <strong class="text-white">20mm f/1.8 G</strong>
                      <p class="text-gray-400 text-sm">Wide angle for landscapes, architecture, environmental portraits, street photography. Budget: $900</p>
                    </div>
                    <div class="bg-black/30 p-3 rounded-lg">
                      <strong class="text-white">50mm f/1.8</strong>
                      <p class="text-gray-400 text-sm">The classic everyday lens. Perfect for portraits, street photography, storytelling, and learning fundamentals. Budget: $250</p>
                    </div>
                    <div class="bg-black/30 p-3 rounded-lg">
                      <strong class="text-white">85mm f/1.8</strong>
                      <p class="text-gray-400 text-sm">Portrait perfection. Beautiful bokeh, flattering compression, isolates subjects beautifully. Budget: $600</p>
                    </div>
                    <div class="bg-black/30 p-3 rounded-lg">
                      <strong class="text-white">70-200mm f/2.8 GM II</strong>
                      <p class="text-gray-400 text-sm">Versatile telephoto zoom for portraits, sports, wildlife, events, and distant subjects. Budget: $2,600</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 class="text-lg font-bold text-white mb-3">Canon EF Mount (What We Used for a Decade):</h4>
                  <div class="space-y-2">
                    <div class="bg-black/30 p-3 rounded-lg">
                      <strong class="text-white">24mm f/1.4L II</strong>
                      <p class="text-gray-400 text-sm">Wide, sharp, perfect for storytelling, landscapes, architecture, and environmental portraits. Budget: $1,500</p>
                    </div>
                    <div class="bg-black/30 p-3 rounded-lg">
                      <strong class="text-white">50mm f/1.2L</strong>
                      <p class="text-gray-400 text-sm">Dreamy bokeh, low-light champion. Creates beautiful subject separation and artistic portraits. Budget: $1,400</p>
                    </div>
                    <div class="bg-black/30 p-3 rounded-lg">
                      <strong class="text-white">85mm f/1.2L II (Our Favorite!)</strong>
                      <p class="text-gray-400 text-sm">Magazine-quality portraits. Incredible bokeh, makes people look stunning, perfect for headshots and creative portraits. Budget: $2,000</p>
                    </div>
                    <div class="bg-black/30 p-3 rounded-lg">
                      <strong class="text-white">100mm f/2.8L IS Macro</strong>
                      <p class="text-gray-400 text-sm">Dual-purpose: stunning portraits and extreme close-up macro photography. Incredible detail and sharpness. Budget: $900</p>
                    </div>
                    <div class="bg-black/30 p-3 rounded-lg">
                      <strong class="text-white">70-200mm f/2.8L IS II</strong>
                      <p class="text-gray-400 text-sm">Workhorse telephoto zoom. Perfect for portraits, sports, wildlife, events, and any distant subjects. Budget: $2,000</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ACCESSORIES */}
              <div class="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 class="text-2xl font-bold mb-4 text-teal-500">Essential Accessories</h3>
                <div class="space-y-3">
                  <div class="bg-black/30 p-4 rounded-lg">
                    <strong class="text-white">🎒 Camera Bag & Lens Protection</strong>
                    <p class="text-gray-400 text-sm mt-1"><strong class="text-white">Think Tank Photo</strong> — Industry standard. TSA-approved, travel-tested for nearly 20 years. Nearly indestructible. <a href="https://prz.io/paQKyvEIO" target="_blank" class="text-teal-400 underline">Use our referral link</a> for $15 off. Budget: $100-300</p>
                  </div>
                  <div class="bg-black/30 p-4 rounded-lg">
                    <strong class="text-white">💾 SD Cards (Sony Cameras)</strong>
                    <p class="text-gray-400 text-sm mt-1"><strong class="text-white">Sony SF-G UHS-II V90</strong> or <strong class="text-white">SanDisk Extreme Pro UHS-II V90</strong> — 128GB or 256GB. Fast read/write speeds for burst shooting and 4K video. Budget: $60-120 each. Always carry at least 2.</p>
                  </div>
                  <div class="bg-black/30 p-4 rounded-lg">
                    <strong class="text-white">📥 SD Card Reader (For Sony Cameras)</strong>
                    <p class="text-gray-400 text-sm mt-1"><strong class="text-white">USB-C UHS-II Card Reader</strong> — Fast ingesting for editing workflow. ProGrade Digital or SanDisk readers work great. Budget: $30-50</p>
                  </div>
                  <div class="bg-black/30 p-4 rounded-lg">
                    <strong class="text-white">🔋 Extra Batteries</strong>
                    <p class="text-gray-400 text-sm mt-1">Always carry at least 2 batteries. Nothing worse than a dead battery mid-shoot. Sony NP-FZ100 for A7 series. Budget: $50-80 each</p>
                  </div>
                  <div class="bg-black/30 p-4 rounded-lg">
                    <strong class="text-white">🧼 Cleaning Kit</strong>
                    <p class="text-gray-400 text-sm mt-1">Microfiber cloths, lens pen, air blower. Keep gear pristine. Budget: $20-40</p>
                  </div>
                </div>
              </div>

              {/* DRONE */}
              <div class="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 class="text-2xl font-bold mb-4 text-blue-500">Bonus: Drones (For Advanced Students)</h3>
                <p class="text-gray-300 mb-4">
                  Once your child masters ground-level photography, <strong class="text-white">aerial perspective</strong> opens up a whole new world.
                </p>
                <div class="bg-black/30 p-4 rounded-lg">
                  <strong class="text-white">🚁 DJI Mini 4 Pro</strong>
                  <p class="text-gray-400 text-sm mt-1">Lightweight, under 249g (no FAA registration needed), 4K video, incredible stabilization. Budget: $750-900</p>
                </div>
              </div>
            </div>
          </div>

          {/* MANUAL MODE MASTERY */}
          <div class="mb-16">
            <h2 class="text-4xl font-black mb-8 text-purple-500">Manual Mode Mastery</h2>
            
            <div class="bg-gradient-to-br from-purple-900/20 to-teal-900/20 p-8 rounded-2xl border border-purple-800/30 mb-6">
              <h3 class="text-2xl font-bold mb-4 text-white">Why Manual Mode Matters</h3>
              <p class="text-gray-300 leading-relaxed mb-4">
                <strong class="text-white">Manual mode gives your child complete creative control.</strong> Instead of the camera guessing, they decide how the photo looks — the depth of field, the motion blur, the brightness, the mood.
              </p>
              <p class="text-gray-300 leading-relaxed">
                We teach them to master the <strong class="text-teal-400">Exposure Triangle</strong>: Aperture (controls depth), Shutter Speed (controls motion), and ISO (controls light sensitivity). Once they understand how these three work together, they can shoot anything, anywhere, in any light.
              </p>
            </div>

            <div class="grid md:grid-cols-3 gap-6">
              <div class="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h4 class="text-xl font-bold mb-3 text-teal-500">Aperture (f-stop)</h4>
                <p class="text-gray-400 text-sm">
                  Controls <strong class="text-white">depth of field</strong>. Wide open (f/1.8) = blurry background (portraits). Closed down (f/16) = everything sharp (landscapes).
                </p>
              </div>
              <div class="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h4 class="text-xl font-bold mb-3 text-blue-500">Shutter Speed</h4>
                <p class="text-gray-400 text-sm">
                  Controls <strong class="text-white">motion</strong>. Fast (1/1000s) = freeze action. Slow (1/30s) = motion blur (waterfalls, light trails).
                </p>
              </div>
              <div class="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h4 class="text-xl font-bold mb-3 text-purple-500">ISO</h4>
                <p class="text-gray-400 text-sm">
                  Controls <strong class="text-white">sensitivity to light</strong>. Low (100-400) = clean, sharp. High (1600+) = grainy but bright in darkness.
                </p>
              </div>
            </div>
          </div>

          {/* BUDGET GUIDE */}
          <div class="mb-16">
            <h2 class="text-4xl font-black mb-8 text-teal-500">Budget Guide</h2>
            
            <div class="grid md:grid-cols-3 gap-6">
              <div class="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700">
                <h3 class="text-2xl font-bold mb-3 text-white">Starter Budget</h3>
                <p class="text-4xl font-black text-teal-500 mb-4">$0-300</p>
                <ul class="space-y-2 text-gray-300 text-sm">
                  <li>✅ Smartphone camera (free!)</li>
                  <li>✅ Fujifilm Instax Mini ($200)</li>
                  <li>✅ Basic accessories ($50-100)</li>
                </ul>
              </div>
              <div class="bg-gradient-to-br from-blue-900 to-blue-800 p-6 rounded-xl border border-blue-700">
                <h3 class="text-2xl font-bold mb-3 text-white">Growth Budget</h3>
                <p class="text-4xl font-black text-blue-400 mb-4">$800-1,500</p>
                <ul class="space-y-2 text-gray-300 text-sm">
                  <li>✅ Sony A6400 or Fujifilm X-T30 ($900)</li>
                  <li>✅ Kit lens + 50mm f/1.8 ($400)</li>
                  <li>✅ Bag, cards, batteries ($200)</li>
                </ul>
              </div>
              <div class="bg-gradient-to-br from-purple-900 to-purple-800 p-6 rounded-xl border border-purple-700">
                <h3 class="text-2xl font-bold mb-3 text-white">Pro Budget</h3>
                <p class="text-4xl font-black text-purple-400 mb-4">$3,000+</p>
                <ul class="space-y-2 text-gray-300 text-sm">
                  <li>✅ Sony A7R V or Canon R6 ($3,500)</li>
                  <li>✅ Prime lenses 20mm, 50mm, 85mm ($2,000)</li>
                  <li>✅ Drone, lighting, accessories ($1,500)</li>
                </ul>
              </div>
            </div>

            <div class="mt-8 bg-gradient-to-r from-teal-900/30 to-blue-900/30 p-6 rounded-xl border border-teal-800/30">
              <p class="text-lg text-gray-300 leading-relaxed">
                <strong class="text-white">Remember:</strong> Gear doesn't make the photographer. <strong class="text-teal-400">Vision, composition, and light</strong> make the photographer. A $200 camera in skilled hands beats a $5,000 camera in unskilled hands every time. We'll teach them the skills — you choose the tool that fits your budget.
              </p>
            </div>
          </div>

          {/* TECH & SOFTWARE */}
          <div class="mb-16">
            <h2 class="text-4xl font-black mb-8 text-blue-500">Software & Editing Tools</h2>
            
            <div class="space-y-6">
              <div class="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 class="text-2xl font-bold mb-3 text-white">Adobe Student Photography Bundle (Required)</h3>
                <p class="text-gray-300 leading-relaxed mb-3">
                  <strong class="text-white">The industry standard for photo editing.</strong> We teach Lightroom basics in <strong class="text-teal-400">October: Photo Editing Mastery</strong>. It's how we bring colors to life, enhance natural beauty, and create that magazine-ready look.
                </p>
                <p class="text-gray-300 mb-3">
                  Includes <strong class="text-white">Lightroom</strong> + <strong class="text-white">Lightroom Classic</strong> + <strong class="text-white">Photoshop</strong> + 20GB cloud storage.
                </p>
                <p class="text-gray-400 text-sm">
                  Budget: <strong class="text-white">~$19.99/month</strong> with student discount | Check Adobe's website for current student pricing
                </p>
              </div>

              <div class="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 class="text-2xl font-bold mb-3 text-white">Photoshop Bundle (Optional — For Curious Students)</h3>
                <p class="text-gray-300 leading-relaxed">
                  <strong class="text-white">Not required.</strong> Lightroom covers 95% of post-production needs. But if your child wants to explore advanced compositing, graphic design, or creative effects, Photoshop is included in the Photography Bundle.
                </p>
                <p class="text-gray-400 text-sm mt-2">
                  Most professional photographers edit 100% in Lightroom. Photoshop is for advanced creative exploration.
                </p>
              </div>
            </div>
          </div>

          {/* COMPUTER REQUIREMENTS */}
          <div class="mb-24">
            <h2 class="text-4xl font-black mb-8 text-purple-500">Computer Requirements for Editing</h2>
            
            <div class="space-y-6">
              <div class="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 class="text-2xl font-bold mb-3 text-white">Mac (Highly Recommended)</h3>
                <p class="text-gray-300 leading-relaxed mb-4">
                  <strong class="text-white">Best editing experience on a Mac.</strong> Ideally on the new <strong class="text-teal-400">Apple M1-M5 chips</strong> for blazing-fast performance and energy efficiency.
                </p>
                <p class="text-teal-400 text-sm mb-4">
                  💡 <strong class="text-white">Pro Tip:</strong> Use <strong class="text-teal-400">Apple Education Store</strong> to get education discounts on Macs. Significant savings for students and educators!
                </p>

                <div class="bg-black/30 p-4 rounded-lg mb-4">
                  <strong class="text-white">💻 Minimum Specs (Starting Students)</strong>
                  <ul class="text-gray-400 text-sm mt-2 space-y-1 ml-4 list-disc">
                    <li><strong class="text-white">16GB RAM</strong> — Minimum for smooth Lightroom performance</li>
                    <li><strong class="text-white">256GB SSD</strong> — Enough for OS + apps + moderate photo library</li>
                    <li><strong class="text-white">M1 chip or newer</strong> — Fast, efficient, future-proof</li>
                  </ul>
                  <p class="text-gray-400 text-sm mt-3">
                    Options: <strong class="text-white">MacBook Air M1/M2</strong> (portable, lightweight) or <strong class="text-white">iMac 24" M1/M3</strong> (larger screen, perfect for home editing)
                  </p>
                  <p class="text-gray-400 text-sm mt-2">
                    Budget: <strong class="text-white">$800-1,200</strong> (check Apple Education Store for discounts)
                  </p>
                </div>

                <div class="bg-black/30 p-4 rounded-lg mb-4">
                  <strong class="text-white">🚀 Ideal Specs (Growing Photographers) — THE POWERHOUSE</strong>
                  <ul class="text-gray-400 text-sm mt-2 space-y-1 ml-4 list-disc">
                    <li><strong class="text-white">32GB RAM</strong> — Ideal for multitasking, large photo libraries, and advanced editing</li>
                    <li><strong class="text-white">512GB-1TB SSD</strong> — Room for growing photo library + video projects</li>
                    <li><strong class="text-white">M3/M4 chip</strong> — Faster rendering, smoother multitasking</li>
                  </ul>
                  <p class="text-gray-400 text-sm mt-3">
                    <strong class="text-white">Best Option: MacBook Pro 14" M3/M4 with 32GB RAM</strong> — Less expensive than 16" model, incredibly powerful, perfect balance of portability and performance. This is a true powerhouse for serious photographers.
                  </p>
                  <p class="text-gray-400 text-sm mt-2">
                    Alternative: <strong class="text-white">iMac 24" M3 with 32GB RAM</strong> — Gorgeous 4.5K Retina display, all-in-one setup, perfect for dedicated editing station at home.
                  </p>
                  <p class="text-gray-400 text-sm mt-2">
                    Budget: <strong class="text-white">$1,800-2,500</strong> (check Apple Education Store for discounts)
                  </p>
                </div>

                <div class="bg-black/30 p-4 rounded-lg">
                  <strong class="text-white">⚡ Professional Setup (What Italo Uses)</strong>
                  <ul class="text-gray-400 text-sm mt-2 space-y-1 ml-4 list-disc">
                    <li><strong class="text-white">MacBook Pro 16" M1 Pro</strong></li>
                    <li><strong class="text-white">64GB RAM</strong> — Runs multiple apps simultaneously with zero lag</li>
                    <li><strong class="text-white">1TB SSD</strong> — Fast storage for large photo/video libraries</li>
                  </ul>
                  <p class="text-gray-400 text-sm mt-3">
                    <em>"I edit with speed and have multiple applications open at once. This is professional-level, not required for starting students—but shows what's possible."</em> — Italo
                  </p>
                  <p class="text-gray-400 text-sm mt-2">
                    Budget: <strong class="text-white">$3,000-4,500</strong> (MacBook Pro 16" M1 Pro/Max/Ultra with 64GB RAM)
                  </p>
                </div>
              </div>

              <div class="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 class="text-2xl font-bold mb-3 text-white">PC/Windows (Alternative)</h3>
                <p class="text-gray-300 leading-relaxed mb-3">
                  <strong class="text-white">PCs work fine for Lightroom,</strong> but Macs offer better color accuracy, battery life, and creative workflow optimization.
                </p>
                <p class="text-gray-400 text-sm">
                  Minimum: <strong class="text-white">16GB RAM, Intel i5/AMD Ryzen 5 or better, 256GB SSD</strong> | Budget: $700-1,200
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section class="py-32 bg-gradient-to-b from-black via-gray-900 to-black text-center">
        <div class="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 class="text-5xl md:text-6xl font-black mb-6">Ready to Start Their Journey?</h2>
          <p class="text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Questions answered. Gear researched. Time to enroll.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/pricing" class="btn-primary px-10 py-5 rounded-full text-lg font-bold inline-block" style="background: #4794A6;">
              Enroll Now
            </a>
            <a href="/academy" class="px-10 py-5 rounded-full text-lg font-bold border-2 border-white/20 hover:border-teal-500/50 transition inline-block">
              View Curriculum
            </a>
          </div>
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

      {/* Enrollment Modal */}
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
                <p class="text-xs text-gray-500 mt-2">
                  Minimum 8 characters (letters, numbers, or symbols)
                </p>
              </div>
              <button onclick="goToStep(2)" class="btn-primary w-full px-8 py-5 rounded-full text-xl font-bold" style="background: #4794A6;">
                Continue →
              </button>
            </div>
            
            {/* Security Badge */}
            <div class="mt-8 pt-8 border-t border-white/10">
              <div class="flex items-center justify-center gap-3 text-sm text-gray-400">
                <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span class="font-medium">256-bit SSL Encryption</span>
                <span class="text-gray-600">•</span>
                <span>Your data is secure</span>
              </div>
              <p class="text-center text-xs text-gray-500 mt-2">
                We use industry-standard encryption (AES-256) and secure password hashing (bcrypt) to protect your information.
              </p>
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
            <p class="text-center text-sm text-gray-400 mb-6">
              <span class="annual-note hidden">Annual billing covers 10 months (Sept-June school year). No classes in July & August. December includes 2 special 1-hour workshops!</span>
              <span class="monthly-note">Billed monthly. Cancel anytime with daily proration.</span>
            </p>

            <div class="grid grid-cols-2 gap-4 mb-8">
              <div class="package-option feature-card p-6 rounded-2xl cursor-pointer hover:ring-2 hover:ring-teal-500 transition relative" onclick="selectPackage(1)">
                <div class="text-4xl font-black mb-2">1</div>
                <div class="text-gray-400 text-sm mb-3">Student</div>
                <div class="text-2xl font-bold">
                  <span class="monthly-price">$116</span>
                  <span class="annual-price hidden">$93</span>
                  <span class="text-sm text-gray-500">/mo</span>
                </div>
                <div class="annual-savings text-teal-500 text-xs mt-2 hidden">Save $230 (school year)</div>
                <div class="text-xs text-gray-500 mt-3 monthly-per-class">$14.50 per class</div>
                <div class="text-xs text-gray-500 mt-3 annual-per-class hidden">$11.63 per class</div>
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
                <div class="annual-savings text-teal-500 text-xs mt-2 hidden">Save $400 (school year)</div>
                <div class="text-xs text-gray-500 mt-3 monthly-per-class">$12.38 per class (each)</div>
                <div class="text-xs text-gray-500 mt-3 annual-per-class hidden">$9.88 per class (each)</div>
              </div>
              <div class="package-option feature-card p-6 rounded-2xl cursor-pointer hover:ring-2 hover:ring-teal-500 transition relative" onclick="selectPackage(3)">
                <div class="text-4xl font-black mb-2">3</div>
                <div class="text-gray-400 text-sm mb-3">Students</div>
                <div class="text-2xl font-bold">
                  <span class="monthly-price">$89</span>
                  <span class="annual-price hidden">$71</span>
                  <span class="text-sm text-gray-500">/mo each</span>
                </div>
                <div class="annual-savings text-teal-500 text-xs mt-2 hidden">Save $540 (school year)</div>
                <div class="text-xs text-gray-500 mt-3 monthly-per-class">$11.13 per class (each)</div>
                <div class="text-xs text-gray-500 mt-3 annual-per-class hidden">$8.88 per class (each)</div>
              </div>
              <div class="package-option feature-card p-6 rounded-2xl cursor-pointer hover:ring-2 hover:ring-teal-500 transition relative" onclick="selectPackage(4)">
                <div class="text-4xl font-black mb-2">4+</div>
                <div class="text-gray-400 text-sm mb-3">Students</div>
                <div class="text-2xl font-bold">
                  <span class="monthly-price">$79</span>
                  <span class="annual-price hidden">$63</span>
                  <span class="text-sm text-gray-500">/mo each</span>
                </div>
                <div class="annual-savings text-teal-500 text-xs mt-2 hidden">Save $640 (school year)</div>
                <div class="text-xs text-gray-500 mt-3 monthly-per-class">$9.88 per class (each)</div>
                <div class="text-xs text-gray-500 mt-3 annual-per-class hidden">$7.88 per class (each)</div>
              </div>
            </div>
            
            {/* What's Included */}
            <div class="feature-card p-6 rounded-2xl mt-6">
              <h3 class="text-lg font-bold mb-4 text-center">Everything Included</h3>
              <div class="grid grid-cols-1 gap-3 text-sm">
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <div>
                    <div class="font-semibold text-white">30-Minute Micro-Learning Sessions</div>
                    <div class="text-gray-400 text-xs">Perfect for young creators' attention spans - 8 live classes/month (Mon & Thu 11:30 AM ET)</div>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <div>
                    <div class="font-semibold text-white">Lifetime Instruction Library</div>
                    <div class="text-gray-400 text-xs">Can't make it live? Catch up on expert-led teachings anytime.</div>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <div>
                    <div class="font-semibold text-white">December Bonus Workshops</div>
                    <div class="text-gray-400 text-xs">First 2 weeks of December: Special 1-hour fun workshops to celebrate the year!</div>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <div>
                    <div class="font-semibold text-white">Portfolio Building</div>
                    <div class="text-gray-400 text-xs">Showcase your child's work and track their creative journey</div>
                  </div>
                </div>
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
          // Validate Step 1 before proceeding to Step 2
          if (currentStep === 1 && step === 2) {
            const email = document.getElementById('parent-email').value.trim();
            const password = document.getElementById('parent-password').value;
            
            // Email validation
            const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
            if (!email || !emailRegex.test(email)) {
              alert('Please enter a valid email address');
              document.getElementById('parent-email').focus();
              return;
            }
            
            // Password validation (min 8 chars only - keep it simple)
            if (!password || password.length < 8) {
              alert('Password must be at least 8 characters long');
              document.getElementById('parent-password').focus();
              return;
            }
          }
          
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
          
          // Toggle per-class pricing
          document.querySelectorAll('.monthly-per-class').forEach(el => {
            el.classList.toggle('hidden', isAnnual);
          });
          document.querySelectorAll('.annual-per-class').forEach(el => {
            el.classList.toggle('hidden', !isAnnual);
          });
          
          // Toggle billing notes
          document.querySelectorAll('.monthly-note').forEach(el => {
            el.classList.toggle('hidden', isAnnual);
          });
          document.querySelectorAll('.annual-note').forEach(el => {
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
            // Annual: 10 months prepaid (school year, no summer)
            totalCharge = monthlyTotal * 10;
            chargeLabel = 'Total (10 months prepaid)';
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
            ((pricingData.monthly[students] * students * 10) - (pricePerStudent * students * 10)) : 0;
          
          // Update summary
          const billingText = isAnnual ? ' (Annual - 10 months)' : ' (Monthly)';
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
          
          const billingType = isAnnual ? 'Annual (10 months prepaid - school year)' : 'Monthly';
          const pricePerStudent = selectedPrice;
          const monthlyTotal = pricePerStudent * selectedStudents;
          const totalCharge = isAnnual ? monthlyTotal * 10 : monthlyTotal;
          
          alert('🎉 Enrollment Complete!\\\\n\\\\nEmail: ' + email + '\\\\nPackage: ' + selectedStudents + ' students at $' + pricePerStudent + '/mo each\\\\nBilling: ' + billingType + '\\\\nTotal: $' + totalCharge.toFixed(2) + '\\\\n\\\\nStripe integration will be added next!');
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
    { title: 'FAQ - Everything You Need to Know | Acromatico' }
  )
)

// Curriculum Page - Epic Storytelling
// Redirect /curriculum to /academy
app.get('/curriculum', (c) => c.redirect('/academy'))


export default app
