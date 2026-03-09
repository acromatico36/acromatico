import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'
import Stripe from 'stripe'
import blog from './blog-page'
import { footerHTML } from './components/footer'
import { mobileMenuHTML } from './components/mobile-menu'

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
      .site-logo-header {
        width: 200px;
        height: auto;
        filter: brightness(0) invert(1);
        transition: all 0.3s ease;
      }
      .header-signin {
        display: inline-block;
      }
      @media (max-width: 768px) {
        .site-logo-header {
          width: 150px;
        }
        .header-signin {
          display: none; /* Hide Sign In on mobile */
        }
        .btn-primary {
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }
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
            <img src="/static/acromatico-logo-transparent.png?v=3" alt="Acromatico" class="site-logo-header" />
          </a>
        </div>
        <div class="flex items-center space-x-4">
          <a href="/pricing" class="btn-primary px-6 py-3 rounded-full font-semibold">
            Enroll Now
          </a>
          <a href="/login" class="header-signin text-gray-300 hover:text-white transition">Sign In</a>
        </div>
      </div>
    </div>
  </nav>
)

// Prints Header Component (light background with cart)
const PrintsHeader = () => (
  <nav class="glass-nav fixed top-0 left-0 right-0 z-50" style="background: rgba(253, 253, 251, 0.95); backdrop-filter: blur(20px); border-bottom: 1px solid #E8E5E0;">
    <style>{`
      .site-logo-prints {
        width: 200px;
        height: auto;
        transition: all 0.3s ease;
      }
      @media (max-width: 768px) {
        .site-logo-prints {
          width: 150px;
        }
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
            <img src="/static/acromatico-logo-transparent.png?v=3" alt="Acromatico" class="site-logo-prints" />
          </a>
        </div>
        <div class="flex items-center space-x-6">
          <a href="/prints" style="color: #3D3935; text-decoration: none; font-size: 16px; font-weight: 500;">Prints</a>
          <a href="/about" style="color: #3D3935; text-decoration: none; font-size: 16px;">About</a>
          <button onclick="viewCart()" style="position: relative; background: none; border: none; cursor: pointer; color: #3D3935; font-size: 24px; padding: 8px;">
            🛒
            <span class="cart-badge" style="display: none; position: absolute; top: 0; right: 0; background: #3D3935; color: white; border-radius: 50%; width: 20px; height: 20px; font-size: 12px; align-items: center; justify-content: center; font-weight: 500;">0</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
)

// Footer Component
const Footer = () => (
  <footer class="bg-black border-t border-white/10 py-16">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
        <div>
          <h4 class="font-bold mb-4" style="color: white;">Academy</h4>
          <ul class="space-y-2 text-gray-400 text-sm">
            <li><a href="/academy" class="hover:text-white transition">Curriculum</a></li>
            <li><a href="/pricing" class="hover:text-white transition">Pricing</a></li>
            <li><a href="/faq" class="hover:text-white transition">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-4" style="color: white;">Services</h4>
          <ul class="space-y-2 text-gray-400 text-sm">
            <li><a href="/studio" class="hover:text-white transition">Studio</a></li>
            <li><a href="/prints" class="hover:text-white transition">Art Prints</a></li>
            <li><a href="/photography" class="hover:text-white transition">Photography</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-4" style="color: white;">Company</h4>
          <ul class="space-y-2 text-gray-400 text-sm">
            <li><a href="/about" class="hover:text-white transition">About</a></li>
            <li><a href="/blog" class="hover:text-white transition">Blog</a></li>
            <li><a href="/contact" class="hover:text-white transition">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-4" style="color: white;">Legal</h4>
          <ul class="space-y-2 text-gray-400 text-sm">
            <li><a href="/privacy" class="hover:text-white transition">Privacy</a></li>
            <li><a href="/terms" class="hover:text-white transition">Terms</a></li>
          </ul>
        </div>
      </div>
      
      {/* Sign In Section - Prominent on Mobile */}
      <div class="pt-8 pb-8 border-t border-white/10 text-center">
        <style>{`
          .footer-signin-btn {
            display: inline-block;
            padding: 1rem 3rem;
            background: rgba(71, 148, 166, 0.15);
            border: 2px solid #4794A6;
            color: #4794A6;
            font-weight: 600;
            font-size: 1.125rem;
            border-radius: 9999px;
            transition: all 0.3s ease;
            text-decoration: none;
          }
          .footer-signin-btn:hover {
            background: #4794A6;
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(71, 148, 166, 0.4);
          }
          @media (min-width: 769px) {
            .footer-signin-btn {
              display: none; /* Hide on desktop - it's in header */
            }
          }
        `}</style>
        <a href="/login" class="footer-signin-btn">
          Sign In to Your Account →
        </a>
      </div>
      
      <div class="pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
        <p>&copy; 2026 Acromatico. Built for creators, by creators.</p>
      </div>
    </div>
  </footer>
)

type Bindings = {
  DB: D1Database
  STRIPE_SECRET_KEY: string
  STRIPE_PUBLISHABLE_KEY: string
}

const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS for API routes
app.use('/api/*', cors())

// Mount blog routes
app.route('/blog', blog)

// Mobile Menu API - Returns HTML for dynamic mobile menu loading
app.get('/api/mobile-menu', (c) => {
  return c.html(mobileMenuHTML)
})

// Footer API - Returns HTML for dynamic footer loading
app.get('/api/footer', (c) => {
  return c.html(footerHTML)
})

// Stripe Checkout API
app.post('/api/create-checkout', async (c) => {
  try {
    const { STRIPE_SECRET_KEY } = c.env
    const stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: '2024-12-18.acacia',
    })

    const body = await c.req.json()
    const { items } = body // Now accepting array of items

    // Create line items for Stripe
    const lineItems = items.map((item: any) => {
      const total = item.sizePrice + item.framePrice
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${item.printName} - ${item.size}"`,
            description: `✨ Limited Edition 1/100\n🖋️ Hand-Signed by Italo Campilii & Ale\n🎨 ${item.frameName} Frame\n📐 ${item.size}" Museum-Quality Print\n📄 Archival Paper • UV-Protected\n🏗️ Artisan-Made • Built to Order\n📦 Ships in 4-6 Weeks • Free US Shipping`,
            images: item.imageUrl ? [item.imageUrl] : [],
          },
          unit_amount: total * 100, // Stripe uses cents
        },
        quantity: item.quantity || 1,
      }
    })

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${c.req.url.split('/api')[0]}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${c.req.url.split('/api')[0]}/prints`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      metadata: {
        items: JSON.stringify(items.map((i: any) => ({ print: i.printName, size: i.size, frame: i.frameName }))),
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
app.use('/*.html', serveStatic({ root: './public' }))

// Explicitly serve blog_posts_data
app.use('/blog_posts_data/*', serveStatic({ root: './' }))

// Use JSX renderer
app.use(renderer)

// ============================================
// PUBLIC ROUTES
// ============================================

app.get('/', (c) => {
  // Redirect to splash page with 4 services
  return c.redirect('/static/index.html')
})

// EDUCATION LANDING PAGE - Educators Profile
app.get('/education', (c) => {
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
          background: linear-gradient(135deg, #4794A6 0%, #14b8a6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Navigation */}
      <Header />

      {/* Hero Section - Apple-Style Full-Screen Impact */}
      <section class="relative h-screen flex items-start justify-end overflow-hidden">
        {/* Hero Image - Freedom on High Hill */}
        <div class="absolute inset-0">
          <img 
            src="/static/images/hero-freedom-hill.jpg" 
            alt="Young photographer on hilltop" 
            class="w-full h-full object-cover"
            style="filter: brightness(0.9) saturate(1.3);"
          />
          <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>
        </div>
        
        {/* Text Positioned in Bottom - Safe Area */}
        <div class="relative z-20 max-w-4xl w-full px-6 md:px-12 pb-20 md:pb-32 text-left self-end">
          {/* Apple-Style Typography */}
          <h1 class="text-7xl md:text-8xl font-semibold tracking-tight mb-6" style="letter-spacing: -0.05em; line-height: 0.95;">
            See<br/>differently.
          </h1>
          
          <p class="text-2xl md:text-3xl font-light mb-12 text-white/90" style="letter-spacing: -0.02em;">
            Photography for young<br/>creators 7–14.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4">
            <a href="/checkout" class="bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/90 transition inline-block text-center">
              Start learning
            </a>
            <a href="#curriculum" class="border-2 border-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition inline-block text-center">
              Explore curriculum
            </a>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div class="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <svg class="w-6 h-10 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* Meet Your Educators Section - Unified Team Profile */}
      <section class="py-32 bg-gradient-to-b from-black to-gray-900">
        <div class="max-w-6xl mx-auto px-6 lg:px-8">
          
          {/* Side-by-Side Educator Profiles */}
          <div class="max-w-6xl mx-auto mb-20">
            
            {/* Mission-Driven Story - FIRST */}
            <div class="text-center mb-16">
              <h2 class="text-5xl md:text-6xl font-black mb-6">
                We're Italo & Ale
              </h2>
              <p class="text-2xl text-white/90 font-light mb-8">
                Parents. Photographers. Adventurers.
              </p>
              <p class="text-2xl text-white leading-relaxed max-w-2xl mx-auto">
                We teach kids to see the world differently—with a camera in hand and confidence in their vision.
              </p>
            </div>

            {/* Side-by-Side Photos - Cropped by User */}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <img 
                  src="/static/images/educators-ale-cropped.jpg" 
                  alt="Ale - Professional Photographer & Educator" 
                  class="w-full rounded-3xl shadow-2xl"
                  style="object-fit: cover; aspect-ratio: 3/4;"
                />
              </div>
              <div>
                <img 
                  src="/static/images/educators-italo-cropped.jpg" 
                  alt="Italo - Professional Photographer & Educator" 
                  class="w-full rounded-3xl shadow-2xl"
                  style="object-fit: cover; aspect-ratio: 3/4;"
                />
              </div>
            </div>
            
            {/* Credentials - Clean & Simple */}
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div class="text-4xl font-light mb-2">20+</div>
                <div class="text-sm text-gray-500 uppercase tracking-wider">Years Pro</div>
              </div>
              <div>
                <div class="text-4xl font-light mb-2">1,000+</div>
                <div class="text-sm text-gray-500 uppercase tracking-wider">Events Shot</div>
              </div>
              <div>
                <div class="text-4xl font-light mb-2">3</div>
                <div class="text-sm text-gray-500 uppercase tracking-wider">Countries</div>
              </div>
              <div>
                <div class="text-4xl font-light mb-2">1M+</div>
                <div class="text-sm text-gray-500 uppercase tracking-wider">Images Taken</div>
              </div>
            </div>
          </div>
          
          {/* Philosophy Cards */}
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="feature-card p-8 rounded-2xl text-center">
              <div class="w-14 h-14 rounded-xl mb-4 flex items-center justify-center mx-auto" style="background: #4794A6;">
                <i class="fas fa-camera text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold mb-3">Creator-First</h3>
              <p class="text-gray-400 text-sm leading-relaxed">
                Every lesson focuses on hands-on creation, not theory. Learn by doing.
              </p>
            </div>
            
            <div class="feature-card p-8 rounded-2xl text-center">
              <div class="w-14 h-14 rounded-xl mb-4 flex items-center justify-center mx-auto" style="background: #4794A6;">
                <i class="fas fa-calendar-day text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold mb-3">Flexible</h3>
              <p class="text-gray-400 text-sm leading-relaxed">
                Daily proration. No contracts. Pay only for what you use.
              </p>
            </div>
            
            <div class="feature-card p-8 rounded-2xl text-center">
              <div class="w-14 h-14 rounded-xl mb-4 flex items-center justify-center mx-auto" style="background: #4794A6;">
                <i class="fas fa-users text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold mb-3">Multi-Child Discounts</h3>
              <p class="text-gray-400 text-sm leading-relaxed">
                4+ students at just $9.88 per class (each).
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
              <div class="text-teal-500 font-bold mb-2">FEBRUARY</div>
              <h4 class="text-xl font-bold mb-3">Light & Shadow</h4>
              <p class="text-gray-400 text-sm">Understanding natural light, golden hour, exposure</p>
            </div>
            <div class="feature-card p-8 rounded-2xl">
              <div class="text-teal-500 font-bold mb-2">MARCH</div>
              <h4 class="text-xl font-bold mb-3">Manual Mode Mastery</h4>
              <p class="text-gray-400 text-sm">Exposure triangle: aperture, shutter speed, ISO control</p>
            </div>
            <div class="feature-card p-8 rounded-2xl">
              <div class="text-teal-500 font-bold mb-2">APRIL</div>
              <h4 class="text-xl font-bold mb-3">Portrait Photography</h4>
              <p class="text-gray-400 text-sm">Capturing emotion, connection, and personality</p>
            </div>
            <div class="feature-card p-8 rounded-2xl">
              <div class="text-teal-500 font-bold mb-2">MAY</div>
              <h4 class="text-xl font-bold mb-3">Street Photography</h4>
              <p class="text-gray-400 text-sm">Candid moments, urban composition, storytelling</p>
            </div>
            <div class="feature-card p-8 rounded-2xl">
              <div class="text-teal-500 font-bold mb-2">JUNE</div>
              <h4 class="text-xl font-bold mb-3">Photo Essay Project</h4>
              <p class="text-gray-400 text-sm">Complete your first photo essay—10-15 curated images that tell a story</p>
            </div>
            <div class="feature-card p-8 rounded-2xl">
              <div class="text-teal-500 font-bold mb-2">SEPTEMBER</div>
              <h4 class="text-xl font-bold mb-3">Advanced Composition</h4>
              <p class="text-gray-400 text-sm">Breaking rules, creative framing, visual poetry</p>
            </div>
            <div class="feature-card p-8 rounded-2xl">
              <div class="text-teal-500 font-bold mb-2">OCTOBER</div>
              <h4 class="text-xl font-bold mb-3">Photo Editing Mastery</h4>
              <p class="text-gray-400 text-sm">Lightroom basics, turning good photos into great ones</p>
            </div>
            <div class="feature-card p-8 rounded-2xl">
              <div class="text-teal-500 font-bold mb-2">NOVEMBER</div>
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

      {/* CTA Section with Starfield */}
      <section class="py-32 relative overflow-hidden">
        {/* Animated Starfield Background */}
        <div class="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900">
          <div class="stars-small"></div>
          <div class="stars-medium"></div>
          <div class="stars-large"></div>
        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
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
              radial-gradient(1px 1px at 60px 70px, rgba(6,182,212,0.8), transparent),
              radial-gradient(1px 1px at 140px 120px, rgba(20,184,166,0.8), transparent),
              radial-gradient(1px 1px at 180px 50px, rgba(6,182,212,0.6), transparent),
              radial-gradient(1px 1px at 90px 160px, rgba(20,184,166,0.6), transparent),
              radial-gradient(1px 1px at 30px 180px, rgba(6,182,212,0.6), transparent),
              radial-gradient(1px 1px at 150px 10px, rgba(20,184,166,0.7), transparent),
              radial-gradient(1px 1px at 110px 90px, rgba(6,182,212,0.7), transparent);
            animation-duration: 2s;
          }
          
          .stars-medium::before {
            background-image: 
              radial-gradient(2px 2px at 40px 60px, rgba(20,184,166,0.9), transparent),
              radial-gradient(2px 2px at 120px 140px, rgba(6,182,212,0.9), transparent),
              radial-gradient(2px 2px at 180px 100px, rgba(20,184,166,0.9), transparent),
              radial-gradient(2px 2px at 80px 30px, rgba(6,182,212,0.7), transparent),
              radial-gradient(2px 2px at 160px 180px, rgba(20,184,166,0.7), transparent);
            animation-duration: 4s;
            animation-delay: 0.5s;
          }
          
          .stars-large::before {
            background-image: 
              radial-gradient(3px 3px at 100px 120px, rgba(20,184,166,1), transparent),
              radial-gradient(3px 3px at 50px 150px, rgba(6,182,212,1), transparent),
              radial-gradient(3px 3px at 170px 80px, rgba(20,184,166,1), transparent);
            animation-duration: 5s;
            animation-delay: 1s;
          }
        `}} />
        
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

      <div dangerouslySetInnerHTML={{__html: footerHTML}} />

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
      <section class="py-20 bg-gradient-to-r from-teal-900 via-cyan-900 to-teal-900">
        <div class="max-w-4xl mx-auto px-6 text-center">
          <div class="text-teal-400 font-bold text-sm mb-2">MONTH 6 • JUNE</div>
          <h2 class="text-5xl md:text-6xl font-black mb-8">Photo Essay Project</h2>
          <p class="text-2xl text-gray-200 mb-8">
            This is it. <strong class="text-white">The big reveal.</strong>
          </p>
          <p class="text-lg text-gray-300 mb-4">
            Every student completes their <strong class="text-teal-400">first photo essay</strong> — a real, start-to-finish project that tells a story they care about.
          </p>
          <p class="text-xl text-teal-300 font-bold mt-8">
            They present it to family and friends. 📸
          </p>
        </div>
      </section>

      {/* MID-YEAR CTA - Join Now */}
      <section class="py-32 bg-black relative overflow-hidden">
        <div class="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 class="text-5xl md:text-6xl font-black mb-6">Ready to Start<br/>This Journey?</h2>
          <p class="text-xl text-gray-400 mb-8">Join thousands of young creators learning to see differently.</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/checkout" class="bg-teal-500 text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-teal-400 transition inline-block text-center shadow-2xl hover:shadow-teal-500/50">
              Enroll Now
            </a>
            <a href="#pricing" class="border-2 border-teal-500 text-teal-500 px-10 py-5 rounded-full text-xl font-bold hover:bg-teal-500/10 transition inline-block text-center">
              View Pricing
            </a>
          </div>
          <p class="text-sm text-gray-500 mt-8">Monthly from $79/student • Cancel anytime</p>
        </div>
        {/* Background decoration */}
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-20 left-10 w-72 h-72 bg-teal-500 rounded-full filter blur-3xl"></div>
          <div class="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl"></div>
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
              <div class="text-teal-500 font-bold text-sm mb-2">MONTH 9 • NOVEMBER</div>
              <h2 class="text-4xl md:text-5xl font-black mb-6">Portfolio Building</h2>
              <p class="text-lg text-gray-300 mb-4">
                <strong class="text-white">A year's worth of work deserves to be seen.</strong>
              </p>
              <p class="text-lg text-gray-300 mb-4">
                In November, your child learns to <strong class="text-teal-400">curate like a gallery curator</strong> — selecting their strongest work.
              </p>
              <p class="text-lg text-teal-400 font-semibold">
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
      <section class="py-20 bg-black">
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
          <a href="/pricing" class="inline-block px-12 py-6 rounded-full text-xl font-bold text-white transition shadow-2xl" style="background: #4794A6;">
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

app.get('\/studio', (c) =>
  c.html(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>We Build Movements — Acromatico</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;900&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    html {
      scroll-behavior: smooth;
    }
    
    body {
      font-family: 'Inter', -apple-system, sans-serif;
      -webkit-font-smoothing: antialiased;
      background: #000;
      color: #fff;
      overflow-x: hidden;
    }
    
    /* MINIMAL HEADER */
    header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 9999;
      background: rgba(10, 10, 10, 0.8);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    nav {
      max-width: 1600px;
      margin: 0 auto;
      padding: 20px 48px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .logo {
      font-size: 16px;
      font-weight: 700;
      color: #fff;
      text-decoration: none;
      letter-spacing: 0.2em;
    }
    
    .nav-links {
      display: flex;
      gap: 40px;
    }
    
    .nav-links a {
      color: rgba(255, 255, 255, 0.6);
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: color 0.2s;
    }
    
    .nav-links a:hover {
      color: #fff;
    }
    
    /* HERO */
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 140px 48px 80px;
      text-align: center;
      position: relative;
      background: #000;
    }
    
    .hero-content {
      max-width: 1200px;
      z-index: 2;
      position: relative;
    }
    
    .hero h1 {
      font-size: clamp(56px, 10vw, 160px);
      font-weight: 900;
      line-height: 0.95;
      letter-spacing: -0.03em;
      margin-bottom: 40px;
      color: #fff;
    }
    
    .hero h1 span {
      color: #4794A6;
    }
    
    .hero p {
      font-size: clamp(20px, 3vw, 32px);
      font-weight: 300;
      line-height: 1.5;
      color: rgba(255, 255, 255, 0.7);
      max-width: 900px;
      margin: 0 auto 60px;
    }
    
    .cta-primary {
      display: inline-block;
      background: #4794A6;
      color: #fff;
      padding: 24px 64px;
      font-size: 18px;
      font-weight: 700;
      text-decoration: none;
      border-radius: 8px;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    
    .cta-primary:hover {
      background: #3a7a8a;
      transform: translateY(-2px);
      box-shadow: 0 12px 40px rgba(71, 148, 166, 0.4);
    }
    
    /* TRUTH SECTION */
    .truth {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 120px 48px;
      background: #0a0a0a;
      text-align: center;
    }
    
    .truth-content {
      max-width: 1000px;
    }
    
    .truth h2 {
      font-size: clamp(40px, 7vw, 100px);
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 48px;
      color: #fff;
    }
    
    .truth p {
      font-size: clamp(18px, 2.5vw, 28px);
      font-weight: 300;
      line-height: 1.7;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 32px;
    }
    
    .truth .highlight {
      color: #4794A6;
      font-weight: 600;
    }
    
    /* PROOF SECTION */
    .proof {
      padding: 120px 48px;
      background: #000;
    }
    
    .proof-header {
      text-align: center;
      margin-bottom: 100px;
    }
    
    .proof-header h2 {
      font-size: clamp(36px, 6vw, 80px);
      font-weight: 700;
      margin-bottom: 24px;
    }
    
    .proof-header p {
      font-size: 20px;
      color: rgba(255, 255, 255, 0.6);
    }
    
    .case-studies {
      max-width: 1600px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 0;
    }
    
    .case {
      display: grid;
      grid-template-columns: 1fr 1fr;
      min-height: 70vh;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .case:last-child {
      border-bottom: none;
    }
    
    .case-image {
      position: relative;
      overflow: hidden;
      background: #111;
    }
    
    .case-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s ease;
    }
    
    .case:hover .case-image img {
      transform: scale(1.05);
    }
    
    .case-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 80px;
      background: #000;
    }
    
    .case-label {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      color: rgba(255, 255, 255, 0.4);
      margin-bottom: 24px;
    }
    
    .case-title {
      font-size: clamp(32px, 5vw, 72px);
      font-weight: 900;
      line-height: 1;
      margin-bottom: 32px;
      color: #fff;
    }
    
    .case-metric {
      font-size: clamp(48px, 8vw, 120px);
      font-weight: 900;
      color: #4794A6;
      line-height: 1;
      margin-bottom: 16px;
    }
    
    .case-description {
      font-size: 18px;
      line-height: 1.7;
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 32px;
    }
    
    .case-stats {
      display: flex;
      gap: 48px;
      margin-top: 40px;
    }
    
    .stat {
      flex: 1;
    }
    
    .stat-number {
      font-size: 36px;
      font-weight: 700;
      color: #4794A6;
      margin-bottom: 8px;
    }
    
    .stat-label {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.5);
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    
    /* SCARCITY */
    .scarcity {
      min-height: 80vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 120px 48px;
      background: #0a0a0a;
      text-align: center;
    }
    
    .scarcity-content {
      max-width: 1000px;
    }
    
    .scarcity h2 {
      font-size: clamp(48px, 8vw, 140px);
      font-weight: 900;
      line-height: 1.1;
      margin-bottom: 40px;
      color: #fff;
    }
    
    .scarcity h2 span {
      color: #4794A6;
    }
    
    .scarcity p {
      font-size: clamp(20px, 3vw, 32px);
      font-weight: 300;
      line-height: 1.5;
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 60px;
    }
    
    /* FINAL CTA */
    .final-cta {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 120px 48px;
      background: #000;
      text-align: center;
    }
    
    .final-cta-content {
      max-width: 1000px;
    }
    
    .final-cta h2 {
      font-size: clamp(48px, 8vw, 120px);
      font-weight: 900;
      line-height: 1.1;
      margin-bottom: 60px;
      color: #fff;
    }
    
    /* MOBILE */
    @media (max-width: 1024px) {
      nav {
        padding: 20px 32px;
      }
      
      .nav-links {
        gap: 24px;
      }
      
      .hero,
      .truth,
      .scarcity,
      .final-cta {
        padding: 100px 32px 80px;
      }
      
      .proof {
        padding: 80px 32px;
      }
      
      .case {
        grid-template-columns: 1fr;
      }
      
      .case-image {
        min-height: 50vh;
      }
      
      .case-content {
        padding: 60px 32px;
      }
      
      .case-stats {
        flex-direction: column;
        gap: 32px;
      }
      
      .cta-primary {
        padding: 20px 48px;
        font-size: 16px;
      }
    }
  </style>
</head>
<body>

  <!-- HEADER -->
  <header>
    <nav>
      <a href="/" class="logo">
        <img src="/static/acromatico-logo-transparent.png" alt="Acromatico" style="width: 180px; height: auto; filter: brightness(0) invert(1);">
      </a>
      <div class="nav-links">
        <a href="/">Home</a>
        <a href="/education">Education</a>
        <a href="/studio">Studio</a>
        <a href="/prints">Prints</a>
        <a href="/photography">Photography</a>
        <a href="/contact">Contact</a>
      </div>
    </nav>
  </header>

  <!-- HERO: THE MOVEMENT -->
  <section class="hero">
    <div class="hero-content">
      <h1>You dream it.<br/>We <span>build</span> it.</h1>
      <p>Custom SaaS applications, enterprise platforms, and scalable web solutions. From concept to deployment, we turn your vision into reality. Full-stack development. Cloud architecture. Real results.</p>
      <a href="/contact" class="cta-primary">Start Your Project</a>
    </div>
  </section>

  <!-- TRUTH: WHY WE'RE DIFFERENT -->
  <section class="truth">
    <div class="truth-content">
      <h2>Your idea deserves world-class execution.</h2>
      <p>If your platform looks generic, you're invisible.</p>
      <p>If your tech stack is outdated, you're forgettable.</p>
      <p>If your user experience is clunky, you're <span class="highlight">just another app</span>.</p>
      <p>We make you <span class="highlight">the standard</span>.</p>
    </div>
  </section>

  <!-- PROOF: THE RESULTS -->
  <section class="proof">
    <div class="proof-header">
      <h2>Built for scale. Proven by results.</h2>
      <p>We only take 6 projects per year. Here's what we deliver.</p>
    </div>
    
    <div class="case-studies">
      
      <!-- ACCESS BY CGI -->
      <style>
        .case-featured {
          position: relative;
          min-height: 900px;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
          padding: 80px 40px;
          overflow: visible;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          max-width: 1600px;
          margin: 0 auto;
        }
        
        .case-info {
          max-width: 500px;
        }
        
        .device-showcase {
          position: relative;
          width: 100%;
          height: 600px;
        }
        
        /* Desktop Frame - iMac Style */
        .desktop-frame {
          position: relative;
          width: 100%;
          z-index: 1;
          margin-bottom: 20px;
        }
        
        .desktop-screen {
          width: 100%;
          background: #1a1a1a;
          border-radius: 12px;
          padding: 8px;
          box-shadow: 0 40px 80px rgba(0,0,0,0.5);
        }
        
        .desktop-screen img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 8px;
        }
        
        .desktop-notch {
          height: 24px;
          background: #1a1a1a;
          border-radius: 0 0 8px 8px;
        }
        
        .desktop-stand {
          width: 200px;
          height: 80px;
          margin: 0 auto;
          position: relative;
        }
        
        .desktop-stand::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 50px;
          background: linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%);
          border-radius: 3px;
        }
        
        .desktop-stand::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 180px;
          height: 12px;
          background: linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%);
          border-radius: 6px;
        }
        
        /* Mobile Frame */
        .mobile-frame {
          position: absolute;
          right: -40px;
          bottom: 40px;
          width: 200px;
          background: #1a1a1a;
          border-radius: 28px;
          padding: 10px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.6);
          z-index: 2;
        }
        
        .mobile-screen {
          width: 100%;
          border-radius: 24px;
          overflow: hidden;
          background: #000;
        }
        
        .mobile-screen img {
          width: 100%;
          height: auto;
          display: block;
        }
        
        /* Portfolio Dashboard */
        .portfolio-dashboard {
          position: absolute;
          right: 0;
          bottom: 40px;
          width: 400px;
          background: rgba(10, 10, 10, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 32px;
          backdrop-filter: blur(20px);
          z-index: 3;
        }
        
        .portfolio-header {
          font-size: 14px;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 8px;
        }
        
        .portfolio-aum {
          font-size: 48px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 4px;
        }
        
        .portfolio-label {
          font-size: 14px;
          color: #888;
          margin-bottom: 24px;
        }
        
        .growth-chart {
          width: 100%;
          height: 120px;
          position: relative;
          margin-bottom: 24px;
        }
        
        .chart-bars {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          height: 100%;
          gap: 12px;
        }
        
        .chart-bar {
          flex: 1;
          background: linear-gradient(180deg, #00d4ff 0%, #0066ff 100%);
          border-radius: 4px 4px 0 0;
          position: relative;
          transition: transform 0.3s ease;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 8px;
        }
        
        .chart-bar:hover {
          transform: translateY(-4px);
        }
        
        .bar-value {
          font-size: 11px;
          font-weight: 700;
          color: #fff;
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        }
        
        .chart-bar.bar-1 { height: 20%; }
        .chart-bar.bar-2 { height: 40%; }
        .chart-bar.bar-3 { height: 60%; }
        .chart-bar.bar-4 { height: 80%; }
        .chart-bar.bar-5 { height: 100%; }
        
        .chart-years {
          display: flex;
          justify-content: space-between;
          margin-top: 8px;
        }
        
        .chart-year {
          font-size: 11px;
          color: #666;
        }
        
        .portfolio-metrics {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        
        .metric {
          text-align: center;
        }
        
        .metric-value {
          font-size: 24px;
          font-weight: 700;
          color: #00d4ff;
          margin-bottom: 4px;
        }
        
        .metric-label {
          font-size: 12px;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .case-info {
          max-width: 600px;
          margin: 0 auto 60px;
          text-align: center;
        }
        
        @media (max-width: 1024px) {
          .case-featured {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          
          .device-showcase {
            height: auto;
            min-height: 400px;
          }
          
          .desktop-frame {
            width: 100%;
            margin-bottom: 30px;
          }
          
          .mobile-frame {
            position: relative;
            width: 200px;
            margin: 0 auto;
            right: auto;
            bottom: auto;
          }
        }
      </style>
      
      <div class="case case-featured">
        <div class="case-info">
          <div class="case-label">Custom SaaS Platform</div>
          <div class="case-title">Access by CGI</div>
          <div class="case-metric">$1B+ Under Management</div>
          <div class="case-description">
            Ultra-high-net-worth family office needed a platform that commands trust at the institutional level. We built a complete fintech SaaS platform with real-time portfolio analytics, secure authentication, and enterprise-grade infrastructure.
          </div>
        </div>
        
        <div class="device-showcase">
          <!-- Desktop Frame - iMac Style -->
          <div class="desktop-frame">
            <div class="desktop-screen">
              <img src="/static/images/brand-showcase/access-cgi-app-screen.jpg" alt="Access by CGI Dashboard">
            </div>
            <div class="desktop-notch"></div>
            <div class="desktop-stand"></div>
          </div>
          
          <!-- Mobile Frame -->
          <div class="mobile-frame">
            <div class="mobile-screen">
              <img src="/static/images/brand-showcase/access-cgi-app-screen.jpg" alt="Access by CGI Mobile App">
            </div>
          </div>
          
          <!-- Portfolio Dashboard -->
          <div class="portfolio-dashboard">
            <div class="portfolio-header">Portfolio Growth</div>
            <div class="portfolio-aum">$1.2B</div>
            <div class="portfolio-label">Assets Under Management During Our Relationship Period.</div>
            
            <div class="growth-chart">
              <div class="chart-bars">
                <div class="chart-bar bar-1">
                  <span class="bar-value">$200M</span>
                </div>
                <div class="chart-bar bar-2">
                  <span class="bar-value">$450M</span>
                </div>
                <div class="chart-bar bar-3">
                  <span class="bar-value">$680M</span>
                </div>
                <div class="chart-bar bar-4">
                  <span class="bar-value">$950M</span>
                </div>
                <div class="chart-bar bar-5">
                  <span class="bar-value">$1.2B</span>
                </div>
              </div>
            </div>
            
            <div class="chart-years">
              <span class="chart-year">2020</span>
              <span class="chart-year">2021</span>
              <span class="chart-year">2022</span>
              <span class="chart-year">2023</span>
              <span class="chart-year">2024</span>
            </div>
            
            <div class="portfolio-metrics">
              <div class="metric">
                <div class="metric-value">+500%</div>
                <div class="metric-label">Growth Rate</div>
              </div>
              <div class="metric">
                <div class="metric-value">$1B+</div>
                <div class="metric-label">AUM Increase</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- TRAVEL DRD -->
      <div class="case case-featured">
        <div class="case-info">
          <div class="case-label">Exclusive Multi-Property Rental Platform</div>
          <div class="case-title">Travel DRD</div>
          <div class="case-metric">Luxury Travel Redefined</div>
          <div class="case-description">
            Exclusive vacation rental platform needed a SaaS solution for curating multi-property experiences. We built a custom booking platform with integrated property management, concierge services, and seamless guest experiences across premium destinations.
          </div>
        </div>
        
        <div class="device-showcase">
          <!-- Desktop Frame - iMac Style -->
          <div class="desktop-frame">
            <div class="desktop-screen">
              <img src="/static/images/brand-showcase/travel-drd-hero.jpg" alt="Travel DRD Platform">
            </div>
            <div class="desktop-notch"></div>
            <div class="desktop-stand"></div>
          </div>
          
          <!-- Mobile Frame -->
          <div class="mobile-frame">
            <div class="mobile-screen">
              <img src="/static/images/brand-showcase/travel-drd-hero.jpg" alt="Travel DRD Mobile">
            </div>
          </div>
        </div>
      </div>
      
      <!-- LIA -->
      <div class="case case-featured">
        <div class="case-info">
          <div class="case-label">Celebrity Beauty Brand</div>
          <div class="case-title">LIA by Jomari Goyso</div>
          <div class="case-metric">$7.2M</div>
          <div class="case-description">
            Celebrity stylist needed a brand that matched his vision. We built the complete visual identity, shot all product photography, and created a content system that scaled to 7-figures in 9 months.
          </div>
        </div>
        
        <div class="device-showcase">
          <!-- Desktop Frame - iMac Style -->
          <div class="desktop-frame">
            <div class="desktop-screen">
              <img src="/static/images/brand-showcase/lia-beauty.jpg" alt="LIA Beauty Platform">
            </div>
            <div class="desktop-notch"></div>
            <div class="desktop-stand"></div>
          </div>
          
          <!-- Mobile Frame -->
          <div class="mobile-frame">
            <div class="mobile-screen">
              <img src="/static/images/brand-showcase/lia-beauty.jpg" alt="LIA Beauty Mobile">
            </div>
          </div>
        </div>
      </div>
      
      <!-- ECOLOSOPHY -->
      <div class="case case-featured">
        <div class="case-info">
          <div class="case-label">Non-Toxic Cleaning Brand</div>
          <div class="case-title">Ecolosophy</div>
          <div class="case-metric">$0 → 6-figures</div>
          <div class="case-description">
            Started with nothing. Built complete Shopify store, shot 500+ product photos, created 12-month content system, integrated warehouse fulfillment. Launched in 8 months.
          </div>
        </div>
        
        <div class="device-showcase">
          <!-- Desktop Frame - iMac Style -->
          <div class="desktop-frame">
            <div class="desktop-screen">
              <img src="/static/images/brand-showcase/ecolosophy-real.jpg" alt="Ecolosophy Platform">
            </div>
            <div class="desktop-notch"></div>
            <div class="desktop-stand"></div>
          </div>
          
          <!-- Mobile Frame -->
          <div class="mobile-frame">
            <div class="mobile-screen">
              <img src="/static/images/brand-showcase/ecolosophy-real.jpg" alt="Ecolosophy Mobile">
            </div>
          </div>
        </div>
      </div>
      
      <!-- REPUBLIC COMMERCIAL FUND -->
      <div class="case case-featured">
        <div class="case-info">
          <div class="case-label">Commercial Real Estate Funding Platform</div>
          <div class="case-title">Republic Commercial Fund</div>
          <div class="case-metric">Enterprise Capital Solutions</div>
          <div class="case-description">
            Commercial real estate fund needed a platform that commands institutional trust. We built a complete fintech SaaS with deal flow management, investor portal, secure document handling, and real-time portfolio analytics for high-value transactions.
          </div>
        </div>
        
        <div class="device-showcase">
          <!-- Desktop Frame - iMac Style -->
          <div class="desktop-frame">
            <div class="desktop-screen">
              <img src="/static/images/brand-showcase/republic-fund-hero.jpg" alt="Republic Commercial Fund Platform">
            </div>
            <div class="desktop-notch"></div>
            <div class="desktop-stand"></div>
          </div>
          
          <!-- Mobile Frame -->
          <div class="mobile-frame">
            <div class="mobile-screen">
              <img src="/static/images/brand-showcase/republic-fund-hero.jpg" alt="Republic Fund Mobile">
            </div>
          </div>
        </div>
      </div>
      
      <!-- BLUE BUILDING -->
      <div class="case case-featured">
        <div class="case-info">
          <div class="case-label">Smart Luxury Office Rentals</div>
          <div class="case-title">Blue Building</div>
          <div class="case-metric">24/7 Business</div>
          <div class="case-description">
            Modern office rental company needed a brand that positioned smart workspaces as the future. We created a visual identity that speaks to growing entrepreneurs who demand excellence.
          </div>
        </div>
        
        <div class="device-showcase">
          <!-- Desktop Frame - iMac Style -->
          <div class="desktop-frame">
            <div class="desktop-screen">
              <img src="/static/images/brand-showcase/blue-building-real.jpg" alt="Blue Building Platform">
            </div>
            <div class="desktop-notch"></div>
            <div class="desktop-stand"></div>
          </div>
          
          <!-- Mobile Frame -->
          <div class="mobile-frame">
            <div class="mobile-screen">
              <img src="/static/images/brand-showcase/blue-building-real.jpg" alt="Blue Building Mobile">
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </section>

  <!-- SCARCITY -->
  <section class="scarcity">
    <div class="scarcity-content">
      <h2>We only take<br/><span>6 clients</span><br/>per year.</h2>
      <p>Every brand gets 500+ custom photos. 12-month content systems. Full Shopify builds. Complete visual identities.</p>
      <p>That's not scalable. That's intentional.</p>
      <a href="/contact" class="cta-primary">Apply for 2026</a>
    </div>
  </section>

  <!-- FINAL CTA -->
  <section class="final-cta">
    <div class="final-cta-content">
      <h2>Ready to become<br/>a movement?</h2>
      <a href="/contact" class="cta-primary">Let's Talk</a>
    </div>
  </section>

  <!-- FOOTER -->
  <footer style="background: #000; border-top: 1px solid rgba(255,255,255,0.1); padding: 60px 48px; text-align: center;">
    <div style="max-width: 1600px; margin: 0 auto;">
      <img src="/static/acromatico-logo-transparent.png" alt="Acromatico" style="width: 200px; height: auto; filter: brightness(0) invert(1); margin-bottom: 32px; opacity: 0.6;">
      <div style="display: flex; justify-content: center; gap: 32px; margin-bottom: 32px; flex-wrap: wrap;">
        <a href="/" style="color: rgba(255,255,255,0.6); text-decoration: none; font-size: 14px; transition: color 0.2s;">Home</a>
        <a href="/education" style="color: rgba(255,255,255,0.6); text-decoration: none; font-size: 14px; transition: color 0.2s;">Education</a>
        <a href="/studio" style="color: rgba(255,255,255,0.6); text-decoration: none; font-size: 14px; transition: color 0.2s;">Studio</a>
        <a href="/prints" style="color: rgba(255,255,255,0.6); text-decoration: none; font-size: 14px; transition: color 0.2s;">Prints</a>
        <a href="/photography" style="color: rgba(255,255,255,0.6); text-decoration: none; font-size: 14px; transition: color 0.2s;">Photography</a>
        <a href="/contact" style="color: rgba(255,255,255,0.6); text-decoration: none; font-size: 14px; transition: color 0.2s;">Contact</a>
      </div>
      <p style="color: rgba(255,255,255,0.4); font-size: 14px; margin: 0;">© 2026 Acromatico. We help people see differently.</p>
    </div>
  </footer>

</body>
</html>
  `)
)

// OLD: Full photography route (removed for performance)
// Blog route is defined at the top with app.route('/blog', blog)

// Movement/Manifesto page
app.get('/movement', (c) =>
  c.html(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Movement - Acromatico</title>
  <link rel="icon" type="image/png" href="/static/acromatico-icon.png">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #000;
      color: #fff;
      overflow-x: hidden;
    }
    
    .nav {
      position: fixed;
      top: 0;
      width: 100%;
      padding: 24px 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 1000;
      background: rgba(0,0,0,0.3);
      backdrop-filter: blur(20px);
    }
    
    .nav-logo {
      height: 32px;
    }
    
    .nav-links {
      display: flex;
      gap: 32px;
      align-items: center;
    }
    
    .nav-links a {
      color: #fff;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: opacity 0.3s;
    }
    
    .nav-links a:hover {
      opacity: 0.7;
    }
    
    .fullscreen-hero {
      height: 100vh;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    
    .fullscreen-hero img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(0.4);
    }
    
    .hero-text {
      position: relative;
      z-index: 2;
      text-align: center;
      padding: 0 40px;
    }
    
    .hero-text h1 {
      font-size: clamp(48px, 10vw, 140px);
      font-weight: 700;
      letter-spacing: -0.03em;
      line-height: 1;
      margin-bottom: 24px;
      text-shadow: 0 4px 20px rgba(0,0,0,0.5);
    }
    
    .hero-text p {
      font-size: clamp(18px, 2.5vw, 32px);
      font-weight: 300;
      max-width: 800px;
      margin: 0 auto;
      text-shadow: 0 2px 10px rgba(0,0,0,0.5);
    }
    
    .split-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      min-height: 100vh;
    }
    
    .split-image {
      position: relative;
      overflow: hidden;
    }
    
    .split-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .split-content {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 80px 60px;
      background: #000;
    }
    
    .split-content-inner {
      max-width: 500px;
    }
    
    .split-content h2 {
      font-size: clamp(36px, 5vw, 72px);
      font-weight: 700;
      margin-bottom: 24px;
      letter-spacing: -0.02em;
      line-height: 1.1;
    }
    
    .split-content p {
      font-size: clamp(16px, 2vw, 24px);
      line-height: 1.6;
      color: #ccc;
    }
    
    .triple-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0;
    }
    
    .grid-item {
      position: relative;
      aspect-ratio: 1;
      overflow: hidden;
    }
    
    .grid-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s ease;
    }
    
    .grid-item:hover img {
      transform: scale(1.1);
    }
    
    .grid-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 32px;
      background: linear-gradient(0deg, rgba(0,0,0,0.9) 0%, transparent 100%);
    }
    
    .grid-overlay h3 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    
    .grid-overlay p {
      font-size: 16px;
      color: #ccc;
    }
    
    .manifesto-big {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 120px 40px;
      background: #000;
    }
    
    .manifesto-big h2 {
      font-size: clamp(40px, 8vw, 120px);
      font-weight: 700;
      letter-spacing: -0.03em;
      line-height: 1.2;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .manifesto-big span {
      color: #00d4ff;
    }
    
    .final-cta {
      height: 100vh;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    
    .final-cta img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(0.3);
    }
    
    .final-cta-content {
      position: relative;
      z-index: 2;
      text-align: center;
    }
    
    .final-cta h2 {
      font-size: clamp(48px, 8vw, 96px);
      font-weight: 700;
      margin-bottom: 48px;
      letter-spacing: -0.02em;
      text-shadow: 0 4px 20px rgba(0,0,0,0.5);
    }
    
    .final-cta a {
      display: inline-block;
      padding: 24px 60px;
      background: #fff;
      color: #000;
      text-decoration: none;
      font-size: 20px;
      font-weight: 700;
      border-radius: 50px;
      transition: transform 0.3s, box-shadow 0.3s;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    
    .final-cta a:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 40px rgba(255,255,255,0.3);
    }
    
    @media (max-width: 1024px) {
      .split-section {
        grid-template-columns: 1fr;
      }
      
      .split-image {
        min-height: 50vh;
      }
      
      .triple-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <!-- Navigation -->
  <nav class="nav">
    <a href="/">
      <img src="/static/acromatico-logo-transparent.png" alt="Acromatico" class="nav-logo">
    </a>
    <div class="nav-links">
      <a href="/studio">Studio</a>
      <a href="/academy">Academy</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </div>
  </nav>

  <!-- Hero: Full-screen image -->
  <section class="fullscreen-hero">
    <img src="/static/images/hero-freedom-hill.jpg" alt="Freedom">
    <div class="hero-text">
      <h1>FEEL ALIVE</h1>
      <p>This is the movement.</p>
    </div>
  </section>

  <!-- Feel Different -->
  <section class="split-section">
    <div class="split-content">
      <div class="split-content-inner">
        <h2>Feel<br/>Different</h2>
        <p>Stand out. Don't blend in. Your vision deserves more than templates.</p>
      </div>
    </div>
    <div class="split-image">
      <img src="/static/images/hero-brand-epic.jpg" alt="Different">
    </div>
  </section>

  <!-- Feel Empowered -->
  <section class="split-section">
    <div class="split-image">
      <img src="/static/images/hero-studio-wow.jpg" alt="Empowered">
    </div>
    <div class="split-content">
      <div class="split-content-inner">
        <h2>Feel<br/>Empowered</h2>
        <p>We amplify your vision. You walk away with power.</p>
      </div>
    </div>
  </section>

  <!-- Feel Confident -->
  <section class="split-section">
    <div class="split-content">
      <div class="split-content-inner">
        <h2>Feel<br/>Confident</h2>
        <p>Own your brand. Stand taller. Walk into rooms like you own them.</p>
      </div>
    </div>
    <div class="split-image">
      <img src="/static/images/brand-seaside-boca-shoot.jpg" alt="Confident">
    </div>
  </section>

  <!-- The Culture Grid -->
  <section class="triple-grid">
    <div class="grid-item">
      <img src="/static/images/hero-photography-wow.jpg" alt="Photography First">
      <div class="grid-overlay">
        <h3>Photography First</h3>
        <p>500+ custom photos per brand</p>
      </div>
    </div>
    <div class="grid-item">
      <img src="/static/images/hero-education-wow.jpg" alt="20+ Years">
      <div class="grid-overlay">
        <h3>20+ Years</h3>
        <p>Experience matters</p>
      </div>
    </div>
    <div class="grid-item">
      <img src="/static/images/hero-prints-wow.jpg" alt="Exclusive">
      <div class="grid-overlay">
        <h3>6 Clients Per Year</h3>
        <p>Intentionally exclusive</p>
      </div>
    </div>
  </section>

  <!-- Big Manifesto -->
  <section class="manifesto-big">
    <h2>
      We don't build brands.<br/>
      We build <span>movements.</span>
    </h2>
  </section>

  <!-- Final CTA -->
  <section class="final-cta">
    <img src="/static/images/hero-photography-real.jpg" alt="Join">
    <div class="final-cta-content">
      <h2>Ready?</h2>
      <a href="/contact">Join The Movement</a>
    </div>
  </section>

  ${footerHTML}
</body>
</html>
  `)
)

// About page
app.get('/about', (c) =>
  c.render(
    <div style="background: #F5F3F0; min-height: 100vh;">
      {/* Navigation */}
      <PrintsHeader />

      {/* Hero Section */}
      <section style="padding: 140px 24px 80px; background: linear-gradient(180deg, #F5F3F0 0%, #E8E5E0 100%);">
        <div style="max-width: 1000px; margin: 0 auto; text-align: center;">
          <h1 style="font-size: 64px; font-weight: 300; letter-spacing: -2px; margin-bottom: 24px; color: #3D3935;">
            Our Story
          </h1>
          <p style="font-size: 24px; line-height: 1.6; color: #8B7E6A; max-width: 800px; margin: 0 auto;">
            We're not just here to take photos—we're here to tell your story the way it was meant to be told.
          </p>
        </div>
      </section>

      {/* Main Story Content */}
      <section style="padding: 100px 24px; background: white;">
        <div style="max-width: 900px; margin: 0 auto;">
          
          {/* The Mission */}
          <div style="margin-bottom: 80px;">
            <h2 style="font-size: 48px; font-weight: 300; letter-spacing: -1px; margin-bottom: 32px; color: #3D3935;">
              No Forced Moments. No Copy-Paste Edits.
            </h2>
            <p style="font-size: 20px; line-height: 1.8; color: #5A5550; margin-bottom: 24px;">
              Just real, meaningful connections captured with intention. We keep it real. Every couple, every brand, every story is different—so why should your photos look the same as everyone else's?
            </p>
            <p style="font-size: 20px; line-height: 1.8; color: #5A5550; margin-bottom: 24px;">
              We take the time to understand who you are and craft images that feel like <em style="color: #3D3935; font-style: italic;">you</em>. No awkward poses, no stiff smiles—just raw, authentic moments that hit home.
            </p>
          </div>

          {/* The Promise */}
          <div style="background: #F5F3F0; padding: 60px; margin-bottom: 80px; border-left: 4px solid #3D3935;">
            <h3 style="font-size: 32px; font-weight: 400; margin-bottom: 24px; color: #3D3935;">
              We Keep It Honest.
            </h3>
            <p style="font-size: 20px; line-height: 1.8; color: #5A5550; margin-bottom: 24px;">
              What you see is what you get. No paid referrals, no outsourcing, no gimmicks—just a team that genuinely cares about making every moment unforgettable.
            </p>
            <p style="font-size: 20px; line-height: 1.8; color: #5A5550;">
              For more than two decades, we've been all about one thing: <strong style="color: #3D3935;">capturing stories that last.</strong>
            </p>
          </div>

          {/* The Founders */}
          <div style="margin-bottom: 80px;">
            <h2 style="font-size: 48px; font-weight: 300; letter-spacing: -1px; margin-bottom: 48px; color: #3D3935; text-align: center;">
              Meet the Artists
            </h2>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; margin-bottom: 60px;">
              {/* Italo */}
              <div>
                <h3 style="font-size: 28px; font-weight: 400; margin-bottom: 16px; color: #3D3935;">
                  Italo Campilii
                </h3>
                <p style="font-size: 16px; line-height: 1.8; color: #8B7E6A; margin-bottom: 16px;">
                  Photographer, Filmmaker, Storyteller
                </p>
                <p style="font-size: 18px; line-height: 1.8; color: #5A5550;">
                  After decades of chasing light across continents—from the turquoise shores of Aruba to the golden villages of Cinque Terre—Italo discovered that the best photographs aren't staged. They're <em style="color: #3D3935;">felt</em>.
                </p>
                <p style="font-size: 18px; line-height: 1.8; color: #5A5550; margin-top: 16px;">
                  Co-founder of Ecolosophy, father, and advocate for intentional living, Italo brings a perspective shaped by years of healing, travel, and deep connection to nature.
                </p>
              </div>

              {/* Ale */}
              <div>
                <h3 style="font-size: 28px; font-weight: 400; margin-bottom: 16px; color: #3D3935;">
                  Ale
                </h3>
                <p style="font-size: 16px; line-height: 1.8; color: #8B7E6A; margin-bottom: 16px;">
                  Photographer, Visual Artist, Detail Obsessive
                </p>
                <p style="font-size: 18px; line-height: 1.8; color: #5A5550;">
                  Ale sees the world in frames—the way light falls, the way a moment breathes, the way emotion lives in the smallest details. Together with Italo, she captures the places and moments that make us stop and remember what it feels like to be alive.
                </p>
                <p style="font-size: 18px; line-height: 1.8; color: #5A5550; margin-top: 16px;">
                  Her work is defined by honesty, precision, and a refusal to settle for anything less than real.
                </p>
              </div>
            </div>
          </div>

          {/* The Philosophy */}
          <div style="margin-bottom: 80px; text-align: center;">
            <h2 style="font-size: 48px; font-weight: 300; letter-spacing: -1px; margin-bottom: 32px; color: #3D3935;">
              What We Believe
            </h2>
            
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; margin-top: 60px;">
              <div>
                <div style="font-size: 48px; margin-bottom: 16px;">📸</div>
                <h4 style="font-size: 20px; font-weight: 500; margin-bottom: 12px; color: #3D3935;">Authenticity Over Everything</h4>
                <p style="font-size: 16px; line-height: 1.6; color: #8B7E6A;">
                  We don't manufacture moments. We capture them as they happen—raw, real, unforgettable.
                </p>
              </div>
              
              <div>
                <div style="font-size: 48px; margin-bottom: 16px;">🌍</div>
                <h4 style="font-size: 20px; font-weight: 500; margin-bottom: 12px; color: #3D3935;">Timeless, Not Trendy</h4>
                <p style="font-size: 16px; line-height: 1.6; color: #8B7E6A;">
                  Trends fade. Moments last. We create images that will matter in 20 years, not just 20 minutes.
                </p>
              </div>
              
              <div>
                <div style="font-size: 48px; margin-bottom: 16px;">✨</div>
                <h4 style="font-size: 20px; font-weight: 500; margin-bottom: 12px; color: #3D3935;">Quality Over Quantity</h4>
                <p style="font-size: 16px; line-height: 1.6; color: #8B7E6A;">
                  Limited editions. Hand-signed prints. Every piece is crafted with intention, not mass-produced.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div style="background: #3D3935; padding: 80px 60px; text-align: center; color: #F5F3F0;">
            <h2 style="font-size: 42px; font-weight: 300; margin-bottom: 24px; color: #F5F3F0;">
              Let's Create Something Real, Together.
            </h2>
            <p style="font-size: 20px; line-height: 1.6; color: #E8E5E0; margin-bottom: 40px; max-width: 700px; margin-left: auto; margin-right: auto;">
              Whether you're looking for fine art prints that transform your space or storytelling photography that captures your most important moments—we're here.
            </p>
            <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
              <a href="/prints" style="padding: 18px 40px; background: white; color: #3D3935; text-decoration: none; font-size: 16px; font-weight: 500; letter-spacing: 1px; transition: all 0.3s; display: inline-block;">
                EXPLORE PRINTS
              </a>
              <a href="https://acromatico.com/contact" target="_blank" style="padding: 18px 40px; background: transparent; color: white; border: 2px solid white; text-decoration: none; font-size: 16px; font-weight: 500; letter-spacing: 1px; transition: all 0.3s; display: inline-block;">
                GET IN TOUCH
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />

    </div>
  )
)

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
          
          {/* CTA Button - Middle Section */}
          <div class="mt-16 text-center">
            <div class="max-w-2xl mx-auto mb-8">
              <h3 class="text-3xl font-bold mb-4">Ready to Transform Your Child's Creative Journey?</h3>
              <p class="text-xl text-gray-400 mb-8">
                Join hundreds of families building confidence, creativity, and lifelong skills through photography.
              </p>
            </div>
            <a 
              href="/pricing#pricing-cards" 
              class="inline-block px-12 py-5 rounded-full text-xl font-bold text-white transition shadow-2xl hover:shadow-teal-500/50" 
              style="background: #4794A6;"
            >
              Start Your Journey Today
            </a>
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

      <div dangerouslySetInnerHTML={{__html: footerHTML}} />

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
