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
    <div class="min-h-screen">
      {/* Navigation */}
      <nav class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16 items-center">
            <div class="flex items-center">
              <h1 class="text-2xl font-bold text-teal-600">acromatico</h1>
            </div>
            <div class="hidden md:flex space-x-8">
              <a href="/academy" class="text-gray-700 hover:text-teal-600">Academy</a>
              <a href="/studio" class="text-gray-700 hover:text-teal-600">Studio</a>
              <a href="/prints" class="text-gray-700 hover:text-teal-600">Prints</a>
              <a href="/photography" class="text-gray-700 hover:text-teal-600">Photography</a>
              <a href="/blog" class="text-gray-700 hover:text-teal-600">Blog</a>
            </div>
            <div class="flex items-center space-x-4">
              <a href="/login" class="text-gray-700 hover:text-teal-600">Login</a>
              <a href="/checkout" class="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">
                Enroll Now
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section class="bg-gradient-to-r from-teal-50 to-cyan-50 py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 class="text-5xl font-bold text-gray-900 mb-6">
            Creative Education for Homeschool Kids
          </h1>
          <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Live photography & filmmaking classes for ages 8-13. 
            Learn to see the world through a creative lens.
          </p>
          <div class="flex justify-center gap-4">
            <a href="/checkout" class="bg-teal-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-700">
              Start Learning Today
            </a>
            <a href="/academy" class="bg-white text-teal-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-teal-600 hover:bg-teal-50">
              Explore Curriculum
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div class="text-4xl font-bold text-teal-600 mb-2">140+</div>
              <div class="text-gray-600">Active Students</div>
            </div>
            <div>
              <div class="text-4xl font-bold text-teal-600 mb-2">16</div>
              <div class="text-gray-600">Classes Per Month</div>
            </div>
            <div>
              <div class="text-4xl font-bold text-teal-600 mb-2">12:30 PM</div>
              <div class="text-gray-600">ET Daily Schedule</div>
            </div>
            <div>
              <div class="text-4xl font-bold text-teal-600 mb-2">10</div>
              <div class="text-gray-600">Months of Learning</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold text-center mb-12">Why Families Love Acromatico</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white p-8 rounded-lg shadow-sm">
              <div class="text-teal-600 text-4xl mb-4">
                <i class="fas fa-calendar-check"></i>
              </div>
              <h3 class="text-xl font-bold mb-3">Flexible Billing</h3>
              <p class="text-gray-600">
                Daily proration means you only pay for what you use. No waiting periods, no commitments.
              </p>
            </div>
            <div class="bg-white p-8 rounded-lg shadow-sm">
              <div class="text-teal-600 text-4xl mb-4">
                <i class="fas fa-users"></i>
              </div>
              <h3 class="text-xl font-bold mb-3">Family Discounts</h3>
              <p class="text-gray-600">
                The more kids you enroll, the lower the per-child price. 4+ students at just $79/month each.
              </p>
            </div>
            <div class="bg-white p-8 rounded-lg shadow-sm">
              <div class="text-teal-600 text-4xl mb-4">
                <i class="fas fa-video"></i>
              </div>
              <h3 class="text-xl font-bold mb-3">Live + Recordings</h3>
              <p class="text-gray-600">
                Join live classes or watch recordings within 7 days. Perfect for busy homeschool schedules.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section class="py-20 bg-teal-600 text-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-4xl font-bold mb-6">Ready to Start Your Creative Journey?</h2>
          <p class="text-xl mb-8 opacity-90">
            Join 140+ homeschool families discovering the art of photography and filmmaking.
          </p>
          <a href="/checkout" class="bg-white text-teal-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 inline-block">
            Enroll Your Children Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer class="bg-gray-900 text-gray-300 py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 class="text-white font-bold mb-4">Acromatico</h3>
              <p class="text-sm">Creative education for the next generation.</p>
            </div>
            <div>
              <h4 class="text-white font-semibold mb-4">Academy</h4>
              <ul class="space-y-2 text-sm">
                <li><a href="/academy" class="hover:text-white">Curriculum</a></li>
                <li><a href="/pricing" class="hover:text-white">Pricing</a></li>
                <li><a href="/faq" class="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 class="text-white font-semibold mb-4">Services</h4>
              <ul class="space-y-2 text-sm">
                <li><a href="/studio" class="hover:text-white">Studio</a></li>
                <li><a href="/prints" class="hover:text-white">Art Prints</a></li>
                <li><a href="/photography" class="hover:text-white">Photography</a></li>
              </ul>
            </div>
            <div>
              <h4 class="text-white font-semibold mb-4">Connect</h4>
              <ul class="space-y-2 text-sm">
                <li><a href="/blog" class="hover:text-white">Blog</a></li>
                <li><a href="/contact" class="hover:text-white">Contact</a></li>
                <li><a href="/about" class="hover:text-white">About</a></li>
              </ul>
            </div>
          </div>
          <div class="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
            <p>&copy; 2026 Acromatico. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>,
    { title: 'Acromatico - Creative Education for Homeschool Kids' }
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
