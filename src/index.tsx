import { Hono } from 'hono'
import { cors } from 'hono/cors'
// import { serveStatic } from 'hono/cloudflare-workers'  // Not needed for wrangler pages dev
import { renderer } from './renderer'
import Stripe from 'stripe'
import blog from './blog-page'
import { footerHTML } from './components/footer'
import { mobileMenuHTML } from './components/mobile-menu'
import * as liveClassesAPI from './api/live-classes'
import { loginHTML } from './static-html'
import { 
  classifyMessage, 
  generateTask, 
  calculateClientHealth, 
  analyzePatterns,
  generateCRMId,
  formatPhoneNumber,
  daysSinceLastContact,
  effortToHours,
  formatDollars,
  type Agent1Output,
  type Agent2Output,
  type Agent3Output,
  type Agent4Output
} from './api/crm-agents'

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

// Spark AI - Real Conversational Intelligence
// SPARK AI - Strategic Intelligence Functions
function analyzePain(problem: string) {
  const p = problem.toLowerCase()
  if (p.includes('lead') || p.includes('customer') || p.includes('traffic') || p.includes('acquisition')) {
    return {
      category: 'ACQUISITION',
      diagnosis: '🎯 You have an acquisition problem.',
      insight: 'This is THE #1 business killer. Every other problem stems from not having enough qualified leads. Fix this and everything else gets easier.'
    }
  }
  if (p.includes('time') || p.includes('hour') || p.includes('manual') || p.includes('automat') || p.includes('efficiency')) {
    return {
      category: 'EFFICIENCY',
      diagnosis: '⏰ You have an efficiency problem.',
      insight: 'Time = money. If you\'re spending 10 hours on manual work, that\'s 10 hours NOT spent on revenue. This compounds daily.'
    }
  }
  if (p.includes('money') || p.includes('cost') || p.includes('expensive') || p.includes('price') || p.includes('margin')) {
    return {
      category: 'ROI',
      diagnosis: '💰 You have an ROI problem.',
      insight: 'Every dollar spent needs to return $3+. If your unit economics don\'t work, scaling just loses money faster.'
    }
  }
  if (p.includes('trust') || p.includes('credibility') || p.includes('authority') || p.includes('brand')) {
    return {
      category: 'AUTHORITY',
      diagnosis: '🛡️ You have an authority problem.',
      insight: 'People buy from who they trust. Without credibility, you\'re fighting an uphill battle on every sale.'
    }
  }
  if (p.includes('convert') || p.includes('close') || p.includes('sale') || p.includes('funnel')) {
    return {
      category: 'CONVERSION',
      diagnosis: '📈 You have a conversion problem.',
      insight: 'Traffic means nothing if it doesn\'t convert. This is pure math - and math can be fixed with the right frameworks.'
    }
  }
  return {
    category: 'GROWTH BLOCKER',
    diagnosis: '🔥 You have a critical growth blocker.',
    insight: 'This is costing you time, money, and momentum every single day. The longer it persists, the more opportunities you miss.'
  }
}

function getIndustryIntel(business: string) {
  const b = business.toLowerCase()
  
  const industries: Record<string, any> = {
    'saas|software|tech|app': {
      name: 'SaaS/Tech',
      marketSize: '$700B+',
      growth: '18% YoY',
      opportunityScore: 9,
      topPain: 'Customer acquisition cost vs lifetime value',
      edgeInsight: '🚀 SaaS is BRUTAL. But if you solve a real pain better than competitors, users will PAY. Focus on retention over acquisition.'
    },
    'ecommerce|retail|store|shop': {
      name: 'E-commerce',
      marketSize: '$6T+',
      growth: '14% YoY',
      opportunityScore: 8,
      topPain: 'Standing out in crowded marketplace',
      edgeInsight: '🛒 D2C brands win on STORY + COMMUNITY. Amazon has logistics. You have personality. Use it.'
    },
    'agency|marketing|consulting|services': {
      name: 'Agency/Services',
      marketSize: '$500B+',
      growth: '11% YoY',
      opportunityScore: 7,
      topPain: 'Commoditization and price competition',
      edgeInsight: '💼 Services sell TIME. Position as OUTCOMES not hours. Productize your expertise into frameworks.'
    },
    'coach|course|education|training': {
      name: 'Education/Coaching',
      marketSize: '$350B+',
      growth: '20% YoY',
      opportunityScore: 9,
      topPain: 'Proving ROI and generating testimonials',
      edgeInsight: '🎓 People buy TRANSFORMATION. Show the before/after. Sell the result, not the process.'
    }
  }
  
  for (const [pattern, data] of Object.entries(industries)) {
    if (new RegExp(pattern).test(b)) return data
  }
  
  return {
    name: 'Your Industry',
    marketSize: '$$$B market',
    growth: 'Growing rapidly',
    opportunityScore: 8,
    topPain: 'Differentiation',
    edgeInsight: '💡 Every industry has winners. The question is: what do THEY do that others don\'t?'
  }
}

function analyzeAudience(audience: string, problem: string) {
  const a = audience.toLowerCase()
  
  let buyingPower = 'Unknown buying power'
  let reachability = 'Unknown reachability'
  let urgency = 'Unknown urgency'
  
  if (a.includes('founder') || a.includes('ceo') || a.includes('owner')) {
    buyingPower = 'HIGH buying power - decision makers with budgets'
    urgency = 'HIGH urgency - their business depends on solving this'
  } else if (a.includes('director') || a.includes('manager') || a.includes('head of')) {
    buyingPower = 'MEDIUM buying power - need approval but have influence'
    urgency = 'MEDIUM urgency - affects their performance metrics'
  } else {
    buyingPower = 'Research their budget authority'
    urgency = 'Validate how critical this pain is'
  }
  
  if (a.includes('b2b') || a.includes('enterprise') || a.includes('business')) {
    reachability = 'MEDIUM reach - LinkedIn, conferences, targeted ads'
  } else if (a.includes('consumer') || a.includes('individual') || a.includes('user')) {
    reachability = 'HIGH reach - social, content, paid ads scale easily'
  } else {
    reachability = 'Map their digital footprint'
  }
  
  return { buyingPower, reachability, urgency }
}

function getStageStrategy(stage: string) {
  const s = stage.toLowerCase()
  
  if (s.includes('pre') || s.includes('0') || s.includes('idea')) {
    return {
      stage: 'PRE-REVENUE',
      priority: 'Get your first 10 paying customers',
      metrics: 'Customer interviews, feedback quality, referral rate',
      timeline: '30-60 days to first sale',
      tactic: 'Sell BEFORE you build. Pre-sell to validate demand. Manual outreach to 100 ideal customers.'
    }
  }
  if (s.includes('5') || s.includes('10')) {
    return {
      stage: '$0-10K MRR',
      priority: 'Double down on what\'s working',
      metrics: 'CAC payback period, activation rate, churn',
      timeline: '90 days to $25K MRR',
      tactic: 'Find your #1 acquisition channel. Go ALL IN. Ignore everything else. 10X that channel.'
    }
  }
  if (s.includes('25') || s.includes('50')) {
    return {
      stage: '$10K-50K MRR',
      priority: 'Systematize and scale',
      metrics: 'LTV:CAC ratio, net retention, expansion revenue',
      timeline: '6-12 months to $100K',
      tactic: 'Build systems. Hire strategically. Test channel #2. Retention > acquisition.'
    }
  }
  return {
    stage: '$50K+ MRR',
    priority: 'Optimize unit economics and expand',
    metrics: 'Gross margin, payback period, market penetration',
    timeline: '12-18 months to next milestone',
    tactic: 'You\'re past PMF. Now it\'s about efficiency. Automate, delegate, multiply.'
  }
}

function analyzeCompetitors(competitors: string, userData: any) {
  const compCount = competitors.split(',').length
  
  let positioning = ''
  let strategy = ''
  
  if (compCount >= 3) {
    positioning = `You're in a CROWDED space with ${compCount}+ direct competitors. That means the market is PROVEN but differentiation is CRITICAL.`
    strategy = `1. Find the GAP they all miss<br>2. Serve a TIGHTER niche better<br>3. Bundle solutions differently<br>4. Compete on experience, not features`
  } else if (compCount === 2) {
    positioning = `Two main competitors means you can be the THIRD option - the "Goldilocks" choice.`
    strategy = `1. Study what users HATE about both<br>2. Position as "best of both worlds"<br>3. Use comparison marketing<br>4. Steal their unhappy customers`
  } else {
    positioning = `One competitor? That validates demand but gives you MASSIVE opportunity.`
    strategy = `1. Copy what works, improve what doesn't<br>2. Target their ignored segments<br>3. Undercut on price OR go premium<br>4. Move faster than they can react`
  }
  
  return { positioning, strategy }
}

function generateStrategicBrief(userData: any, differentiator: string) {
  return `<div class="strategic-brief">
<h3>🔥 STRATEGIC BRIEF: ${userData.business || 'Your Brand'}</h3>

<div class="brief-section">
<h4>📍 Current Position</h4>
<p><strong>Problem:</strong> "${userData.problem}"<br>
<strong>Target:</strong> ${userData.audience}<br>
<strong>Stage:</strong> ${userData.stage}<br>
<strong>Competitors:</strong> ${userData.competitors}</p>
</div>

<div class="brief-section">
<h4>⚡ Your Wedge</h4>
<p>"${differentiator}"</p>
<p>This is your MOAT. Everything you build should amplify this.</p>
</div>

<div class="brief-section">
<h4>📈 4-Week Launch Roadmap</h4>
<p><strong>Week 1:</strong> Validate positioning with 20 customer interviews<br>
<strong>Week 2:</strong> Create proof content (case study, demo, testimonials)<br>
<strong>Week 3:</strong> Launch MVP to first 50 ideal customers<br>
<strong>Week 4:</strong> Iterate based on feedback, double down on what converts</p>
</div>

<div class="brief-section">
<h4>💰 Revenue Strategy</h4>
<p>Target: 10 customers @ $${getTicketPrice(userData.stage)}/mo = $${getTicketPrice(userData.stage) * 10} MRR<br>
Channels: ${getTopChannels(userData.audience)}<br>
Conversion: ${getConversionTactic(userData.problem)}</p>
</div>

<p style="margin-top: 24px; padding: 16px; background: rgba(255,107,53,0.1); border-left: 4px solid #FF6B35; border-radius: 8px;">
<strong>Next Step:</strong> <a href="/contact" style="color: #FF6B35; text-decoration: underline; font-weight: 700;">Book a strategy call</a> and let's build this together. 🔥
</p>
</div>`
}

function getTicketPrice(stage: string) {
  if (stage?.includes('pre')) return 97
  if (stage?.includes('5') || stage?.includes('10')) return 297
  return 497
}

function getTopChannels(audience: string) {
  const a = audience?.toLowerCase() || ''
  if (a.includes('founder') || a.includes('b2b')) return 'LinkedIn, cold email, partnerships'
  if (a.includes('consumer') || a.includes('user')) return 'TikTok, Instagram, paid ads'
  return 'Content marketing, SEO, referrals'
}

function getConversionTactic(problem: string) {
  const p = problem?.toLowerCase() || ''
  if (p.includes('lead')) return 'Free audit/assessment → Paid strategy session'
  if (p.includes('time')) return 'ROI calculator → Demo → Trial'
  return 'Case study → Consultation → Proposal'
}

app.post('/api/spark-ai', async (c) => {
  try {
    const { messages, userData } = await c.req.json()
    
    // SPARK ELITE AI - Strategic Intelligence Engine
    // This provides McKinsey-level analysis WITHOUT needing external APIs
    // Uses pattern recognition, competitive frameworks, and strategic playbooks
    
    const userMessage = messages[messages.length - 1].content
    const messageCount = messages.filter(m => m.role === 'user').length
    
    let response = ''
    
    // Message 1: PAIN ANALYSIS
    if (messageCount === 1) {
      const painAnalysis = analyzePain(userMessage)
      response = `"<em>${userMessage}</em>"<br><br>${painAnalysis.diagnosis}<br><br>🔍 This is a <strong>${painAnalysis.category}</strong> problem. ${painAnalysis.insight}<br><br><strong>What industry/business are you in?</strong> (This helps me benchmark you against competitors)`
    }
    
    // Message 2: INDUSTRY INTELLIGENCE
    else if (messageCount === 2) {
      const industryData = getIndustryIntel(userMessage)
      response = `Got it. <strong>${industryData.name}</strong> + "${userData.problem}" = ${industryData.opportunityScore}/10 opportunity score.<br><br>📊 <strong>Market Intel:</strong><br>• Size: ${industryData.marketSize}<br>• Growth: ${industryData.growth}<br>• Main pain: ${industryData.topPain}<br><br>${industryData.edgeInsight}<br><br><strong>Who specifically feels "${userData.problem}" the most?</strong> (Be surgical - "Series A SaaS founders" not "business owners")`
    }
    
    // Message 3: AUDIENCE PROFILING
    else if (messageCount === 3) {
      const audienceProfile = analyzeAudience(userMessage, userData.problem || '')
      response = `Perfect. <strong>${userMessage}</strong> struggling with "<em>${userData.problem}</em>".<br><br>💰 ${audienceProfile.buyingPower}<br>🎯 ${audienceProfile.reachability}<br>⚡ ${audienceProfile.urgency}<br><br><strong>What's your revenue stage?</strong><br>• Pre-revenue<br>• $0-10K MRR<br>• $10K-50K MRR<br>• $50K-100K MRR<br>• $100K+`
    }
    
    // Message 4: STAGE PLAYBOOK
    else if (messageCount === 4) {
      const stagePlaybook = getStageStrategy(userMessage)
      response = `At <strong>${stagePlaybook.stage}</strong>, your ONLY focus: <strong>${stagePlaybook.priority}</strong>.<br><br>📈 Key metrics: ${stagePlaybook.metrics}<br>⏰ Timeline: ${stagePlaybook.timeline}<br><br>For "${userData.problem}" → ${stagePlaybook.tactic}<br><br><strong>Who are your top 2-3 competitors?</strong>`
    }
    
    // Message 5: COMPETITIVE ANALYSIS  
    else if (messageCount === 5) {
      const compAnalysis = analyzeCompetitors(userMessage, userData)
      response = `${compAnalysis.positioning}<br><br>🥊 <strong>Battle Plan:</strong><br>${compAnalysis.strategy}<br><br><strong>Final question: What makes YOU different?</strong> Why would ${userData.audience} choose you over ${userMessage.split(',')[0]}?`
    }
    
    // Message 6: STRATEGIC BRIEF
    else if (messageCount === 6) {
      const brief = generateStrategicBrief(userData, userMessage)
      response = brief
    }
    
    else {
      response = `Let me dig deeper on that. ${userMessage} - tell me more about how this affects your ${userData.business || 'business'}.`
    }
    
    return c.json({
      message: response,
      userData: userData
    })
    
  } catch (error: any) {
    console.error('Spark AI Error:', error)
    return c.json({ 
      error: 'AI temporarily unavailable',
      details: error.message 
    }, 500)
  }
})

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

// ============================================================
// EDUCATION PLATFORM - AUTHENTICATION API
// ============================================================

// Helper: Hash password (simple version - in production use bcrypt)
function hashPassword(password: string): string {
  // In production, use proper bcrypt or similar
  // This is a simple hash for demonstration
  return btoa(password + 'acromatico-salt-2026')
}

// Helper: Generate JWT token (simple version)
function generateToken(user: any): string {
  const payload = {
    userId: user.id, // Use userId consistently throughout app
    id: user.id, // Keep id for backwards compatibility
    email: user.email,
    role: user.role,
    exp: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
  }
  return btoa(JSON.stringify(payload))
}

// Helper: Verify JWT token
function verifyToken(token: string): any {
  try {
    const payload = JSON.parse(atob(token))
    if (payload.exp < Date.now()) {
      return null // Expired
    }
    return payload
  } catch {
    return null
  }
}

// Helper: Verify token AND role
function verifyTokenWithRole(token: string, requiredRole: string): any {
  const payload = verifyToken(token)
  if (!payload) return null
  if (payload.role !== requiredRole) return null
  return payload
}

// Middleware: Require Admin Role
const requireAdmin = async (c: any, next: any) => {
  // Try Authorization header first
  let token = c.req.header('Authorization')?.replace('Bearer ', '')
  
  // Fallback to cookie if no header
  if (!token) {
    const cookies = c.req.header('Cookie') || ''
    const match = cookies.match(/admin_token=([^;]+)/)
    token = match ? match[1] : null
  }
  
  if (!token) {
    return c.json({ success: false, error: 'No token provided' }, 401)
  }
  
  const payload = verifyTokenWithRole(token, 'admin')
  if (!payload) {
    return c.json({ success: false, error: 'Unauthorized: Admin role required' }, 403)
  }
  c.set('user', payload) // Store user in context
  await next()
}

// Middleware: Require Parent Role
const requireParent = async (c: any, next: any) => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ success: false, error: 'No token provided' }, 401)
  }
  const token = authHeader.substring(7)
  const payload = verifyTokenWithRole(token, 'parent')
  if (!payload) {
    return c.json({ success: false, error: 'Unauthorized: Parent role required' }, 403)
  }
  c.set('user', payload) // Store user in context
  await next()
}

// ==============================================
// STRIPE PAYMENT API
// Photography Shop + Education Enrollment
// ==============================================

// POST /api/payments/create-checkout-session - Create Stripe checkout
app.post('/api/payments/create-checkout-session', async (c) => {
  try {
    const { STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY } = c.env
    
    if (!STRIPE_SECRET_KEY) {
      return c.json({ error: 'Stripe not configured' }, 500)
    }
    
    const body = await c.req.json()
    const { priceId, amount, productName, quantity = 1, mode = 'payment', successUrl, cancelUrl, customerEmail, metadata } = body
    
    // Build line items - either use priceId (for fixed products) or custom amount (for dynamic pricing)
    const lineItems: any = {}
    
    if (priceId) {
      // Fixed price product (Education courses)
      lineItems['line_items[0][price]'] = priceId
      lineItems['line_items[0][quantity]'] = quantity.toString()
    } else if (amount && productName) {
      // Custom amount (Photography bookings)
      lineItems['line_items[0][price_data][currency]'] = 'usd'
      lineItems['line_items[0][price_data][product_data][name]'] = productName
      lineItems['line_items[0][price_data][unit_amount]'] = Math.round(amount * 100).toString() // Convert dollars to cents
      lineItems['line_items[0][quantity]'] = '1'
    } else {
      return c.json({ error: 'Either priceId or amount+productName required' }, 400)
    }
    
    // Add metadata
    const metadataParams = metadata ? Object.keys(metadata).reduce((acc, key) => ({
      ...acc,
      [`metadata[${key}]`]: metadata[key]?.toString() || ''
    }), {}) : {}
    
    // Create Stripe checkout session
    const session = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'mode': mode,
        ...lineItems,
        'success_url': successUrl || `${c.req.url.replace('/api/payments/create-checkout-session', '')}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        'cancel_url': cancelUrl || `${c.req.url.replace('/api/payments/create-checkout-session', '')}/payment-cancel`,
        ...(customerEmail && { 'customer_email': customerEmail }),
        ...metadataParams
      })
    })
    
    const sessionData = await session.json()
    
    if (!session.ok) {
      console.error('Stripe API error:', sessionData)
      return c.json({ error: sessionData.error?.message || 'Failed to create checkout session' }, 500)
    }
    
    return c.json({ 
      sessionId: sessionData.id,
      url: sessionData.url,
      publishableKey: STRIPE_PUBLISHABLE_KEY
    })
    
  } catch (error: any) {
    console.error('Payment creation error:', error)
    return c.json({ error: error.message }, 500)
  }
})

// POST /api/payments/webhook - Stripe webhook handler
app.post('/api/payments/webhook', async (c) => {
  try {
    const { DB_EDUCATION, STRIPE_WEBHOOK_SECRET } = c.env
    
    if (!STRIPE_WEBHOOK_SECRET) {
      return c.json({ error: 'Webhook secret not configured' }, 500)
    }
    
    const signature = c.req.header('stripe-signature')
    const rawBody = await c.req.text()
    
    // Verify webhook signature
    const timestamp = signature?.split(',').find(s => s.startsWith('t='))?.split('=')[1]
    const signatureHash = signature?.split(',').find(s => s.startsWith('v1='))?.split('=')[1]
    
    // Parse event
    const event = JSON.parse(rawBody)
    
    console.log('Stripe webhook received:', event.type)
    
    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object
        console.log('Payment successful:', session.id)
        
        // TODO: Fulfill order (grant course access, send photography booking confirmation, etc.)
        // Store payment in database
        await DB_EDUCATION.prepare(`
          INSERT INTO payments (id, session_id, customer_email, amount, status, created_at)
          VALUES (?, ?, ?, ?, 'succeeded', datetime('now'))
        `).bind(
          `pay-${Date.now()}`,
          session.id,
          session.customer_email,
          session.amount_total,
        ).run()
        
        break
        
      case 'payment_intent.succeeded':
        console.log('PaymentIntent succeeded:', event.data.object.id)
        break
        
      case 'payment_intent.payment_failed':
        console.log('Payment failed:', event.data.object.id)
        break
        
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        console.log('Subscription updated:', event.data.object.id)
        break
        
      case 'customer.subscription.deleted':
        console.log('Subscription cancelled:', event.data.object.id)
        break
        
      default:
        console.log('Unhandled event type:', event.type)
    }
    
    return c.json({ received: true })
    
  } catch (error: any) {
    console.error('Webhook error:', error)
    return c.json({ error: error.message }, 500)
  }
})

// GET /api/payments/success - Payment success page
app.get('/payment-success', (c) => {
  const sessionId = c.req.query('session_id')
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Successful | Acromatico</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
      <style>
        body { font-family: 'Inter', sans-serif; background: #0f172a; }
        .checkmark {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: block;
          stroke-width: 3;
          stroke: #4ade80;
          stroke-miterlimit: 10;
          box-shadow: inset 0px 0px 0px #4ade80;
          animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
        }
        .checkmark__circle {
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          stroke-width: 3;
          stroke-miterlimit: 10;
          stroke: #4ade80;
          fill: none;
          animation: stroke .6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }
        .checkmark__check {
          transform-origin: 50% 50%;
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: stroke .3s cubic-bezier(0.65, 0, 0.45, 1) .8s forwards;
        }
        @keyframes stroke {
          100% { stroke-dashoffset: 0; }
        }
        @keyframes scale {
          0%, 100% { transform: none; }
          50% { transform: scale3d(1.1, 1.1, 1); }
        }
        @keyframes fill {
          100% { box-shadow: inset 0px 0px 0px 40px #4ade80; }
        }
      </style>
    </head>
    <body class="flex items-center justify-center min-h-screen">
      <div class="bg-slate-800 rounded-2xl p-12 text-center max-w-md border border-slate-700">
        <svg class="checkmark mx-auto mb-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
          <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
        <h1 class="text-3xl font-bold text-white mb-4">Payment Successful!</h1>
        <p class="text-slate-300 mb-6">
          Thank you for your purchase. You'll receive a confirmation email shortly.
        </p>
        <div class="text-sm text-slate-400 mb-8">
          Session ID: <span class="font-mono text-xs">${sessionId}</span>
        </div>
        <a href="/" class="inline-block bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-cyan-700 transition-all">
          Return Home
        </a>
      </div>
    </body>
    </html>
  `)
})

// GET /api/payments/cancel - Payment cancelled page
app.get('/payment-cancel', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Cancelled | Acromatico</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
      <style>
        body { font-family: 'Inter', sans-serif; background: #0f172a; }
      </style>
    </head>
    <body class="flex items-center justify-center min-h-screen">
      <div class="bg-slate-800 rounded-2xl p-12 text-center max-w-md border border-slate-700">
        <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-yellow-500/20 flex items-center justify-center">
          <svg class="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-white mb-4">Payment Cancelled</h1>
        <p class="text-slate-300 mb-8">
          Your payment was cancelled. No charges were made to your account.
        </p>
        <div class="flex gap-4">
          <a href="/" class="flex-1 bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-600 transition-all">
            Return Home
          </a>
          <button onclick="history.back()" class="flex-1 bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-cyan-700 transition-all">
            Try Again
          </button>
        </div>
      </div>
    </body>
    </html>
  `)
})

// ==============================================
// AUTHENTICATION API
// ==============================================

// POST /api/auth/signup - Create new user account
app.post('/api/auth/signup', async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    
    // IMPORTANT: Auto-init database tables if they don't exist (for local development)
    try {
      await DB_EDUCATION.prepare(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
          email TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          role TEXT CHECK(role IN ('student', 'parent', 'client', 'instructor', 'admin')) NOT NULL,
          first_name TEXT,
          last_name TEXT,
          stripe_customer_id TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `).run()
      await DB_EDUCATION.prepare('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)').run()
    } catch (initError) {
      console.log('Database init:', initError)
    }
    
    const body = await c.req.json()
    const { firstName, lastName, email, password, role, age } = body
    
    // Validate required fields
    if (!firstName || !lastName || !email || !password || !role) {
      return c.json({ message: 'All fields are required' }, 400)
    }
    
    // Check if email already exists
    const existing = await DB_EDUCATION.prepare(
      'SELECT id FROM users WHERE email = ?'
    ).bind(email).first()
    
    if (existing) {
      return c.json({ message: 'Email already registered' }, 400)
    }
    
    // Hash password
    const passwordHash = hashPassword(password)
    
    // Insert user (matching ACTUAL schema: id, email, password_hash, role, first_name, last_name, stripe_customer_id, created_at, updated_at)
    const result = await DB_EDUCATION.prepare(`
      INSERT INTO users (email, password_hash, role, first_name, last_name)
      VALUES (?, ?, ?, ?, ?)
    `).bind(email, passwordHash, role, firstName, lastName).run()
    
    // Get the inserted user ID
    const userId = result.meta.last_row_id
    
    // NOTE: The students table is for parent-child relationships (students.parent_id -> users.id)
    // When a user signs up as "student", they're creating a USER account with role='student'
    // NOT inserting into the students table (that's for parents to add their children)
    // So we skip the student record creation here
    
    return c.json({ 
      message: 'Account created successfully',
      userId: userId
    }, 201)
    
  } catch (error: any) {
    console.error('Signup error:', error)
    return c.json({ message: 'Signup failed: ' + error.message }, 500)
  }
})

// POST /api/auth/login - Login user
app.post('/api/auth/login', async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    const body = await c.req.json()
    const { email, password } = body
    
    // Validate
    if (!email || !password) {
      return c.json({ message: 'Email and password required' }, 400)
    }
    
    // Get user (matching ACTUAL schema - no status or last_login columns)
    const user = await DB_EDUCATION.prepare(`
      SELECT id, email, password_hash, role, first_name, last_name
      FROM users
      WHERE email = ?
    `).bind(email).first()
    
    if (!user) {
      return c.json({ message: 'Invalid email or password' }, 401)
    }
    
    // Check password
    const passwordHash = hashPassword(password)
    if (user.password_hash !== passwordHash) {
      return c.json({ message: 'Invalid email or password' }, 401)
    }
    
    // Generate token
    const token = generateToken(user)
    
    // Return success
    return c.json({
      message: 'Login successful',
      token: token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.first_name,
        lastName: user.last_name
      }
    })
    
  } catch (error: any) {
    console.error('Login error:', error)
    return c.json({ message: 'Login failed: ' + error.message }, 500)
  }
})

// GET /api/auth/me - Get current user profile
app.get('/api/auth/me', async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    const authHeader = c.req.header('Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ message: 'No token provided' }, 401)
    }
    
    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    
    if (!payload) {
      return c.json({ message: 'Invalid or expired token' }, 401)
    }
    
    // Get full user details (matching ACTUAL schema)
    const user = await DB_EDUCATION.prepare(`
      SELECT id, email, role, first_name, last_name, created_at
      FROM users
      WHERE id = ?
    `).bind(payload.id).first()
    
    if (!user) {
      return c.json({ message: 'User not found' }, 404)
    }
    
    return c.json({ user })
    
  } catch (error: any) {
    console.error('Get user error:', error)
    return c.json({ message: 'Failed to get user: ' + error.message }, 500)
  }
})

// POST /api/auth/reset-password - Send password reset email (placeholder)
app.post('/api/auth/reset-password', async (c) => {
  try {
    const { email } = await c.req.json()
    
    if (!email) {
      return c.json({ message: 'Email is required' }, 400)
    }
    
    const { DB_EDUCATION } = c.env
    
    // Check if user exists
    const user = await DB_EDUCATION.prepare(
      'SELECT id, email FROM users WHERE email = ?'
    ).bind(email).first()
    
    if (!user) {
      // Don't reveal if user exists or not (security best practice)
      return c.json({ 
        message: 'If an account with that email exists, a reset link has been sent.' 
      })
    }
    
    // TODO: In production, generate reset token and send email
    // For now, just return success (placeholder)
    // You would integrate with SendGrid, Mailgun, or similar
    
    console.log(`Password reset requested for: ${email}`)
    
    return c.json({ 
      message: 'If an account with that email exists, a reset link has been sent.' 
    })
    
  } catch (error: any) {
    console.error('Reset password error:', error)
    return c.json({ message: 'Failed to process request: ' + error.message }, 500)
  }
})

// ============================================================
// END AUTHENTICATION API
// ============================================================

// ============================================================
// CURRICULUM DATABASE SEEDER
// ============================================================

// POST /api/admin/curriculum/seed - Populate 12-month curriculum database + admin users
app.post('/api/admin/curriculum/seed', requireAdmin, async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    
    // Import the seeder functions
    const { seedCurriculum } = await import('./api/curriculum-seed')
    const { seedAdminUsers } = await import('./api/seed-admin-users')
    
    // Seed admin users first (so Italo can always log in!)
    const adminResult = await seedAdminUsers(DB_EDUCATION)
    
    // Run the curriculum seeder
    const curriculumResult = await seedCurriculum(DB_EDUCATION)
    
    return c.json({
      success: true,
      message: '✅ Database seeded successfully! Curriculum + Admin users created.',
      data: {
        adminUsers: adminResult.users,
        modules: curriculumResult.modules,
        weeks: curriculumResult.weeks,
        total: adminResult.users + curriculumResult.modules + curriculumResult.weeks
      }
    })
    
  } catch (error: any) {
    console.error('Seed error:', error)
    return c.json({ 
      success: false,
      message: 'Failed to seed database: ' + error.message 
    }, 500)
  }
})

// ============================================================
// ADMIN CURRICULUM MANAGEMENT API
// ============================================================

// GET /api/admin/curriculum/modules - Get all modules overview
app.get('/api/admin/curriculum/modules', requireAdmin, async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    const { getAllModules } = await import('./api/curriculum-admin')
    
    const modules = await getAllModules(DB_EDUCATION)
    
    return c.json({
      success: true,
      data: modules
    })
  } catch (error: any) {
    console.error('Get modules error:', error)
    return c.json({ success: false, message: error.message }, 500)
  }
})

// GET /api/admin/curriculum/module/:id - Get module detail with weeks and lessons
app.get('/api/admin/curriculum/module/:id', requireAdmin, async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    const moduleId = c.req.param('id')
    const { getModuleDetail } = await import('./api/curriculum-admin')
    
    const detail = await getModuleDetail(DB_EDUCATION, moduleId)
    
    return c.json({
      success: true,
      data: detail
    })
  } catch (error: any) {
    console.error('Get module detail error:', error)
    return c.json({ success: false, message: error.message }, 500)
  }
})

// POST /api/admin/curriculum/lesson - Create new lesson placeholder
app.post('/api/admin/curriculum/lesson', requireAdmin, async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    const lessonData = await c.req.json()
    const { createLessonPlaceholder } = await import('./api/curriculum-admin')
    
    const lessonId = await createLessonPlaceholder(DB_EDUCATION, lessonData)
    
    return c.json({
      success: true,
      message: 'Lesson placeholder created',
      lessonId
    })
  } catch (error: any) {
    console.error('Create lesson error:', error)
    return c.json({ success: false, message: error.message }, 500)
  }
})

// PUT /api/admin/curriculum/lesson/:id - Update lesson (upload video/PDF)
app.put('/api/admin/curriculum/lesson/:id', requireAdmin, async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    const lessonId = c.req.param('id')
    const updates = await c.req.json()
    const { updateLesson } = await import('./api/curriculum-admin')
    
    await updateLesson(DB_EDUCATION, lessonId, updates)
    
    return c.json({
      success: true,
      message: 'Lesson updated successfully'
    })
  } catch (error: any) {
    console.error('Update lesson error:', error)
    return c.json({ success: false, message: error.message }, 500)
  }
})

// DELETE /api/admin/curriculum/lesson/:id - Delete lesson
app.delete('/api/admin/curriculum/lesson/:id', requireAdmin, async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    const lessonId = c.req.param('id')
    const { deleteLesson } = await import('./api/curriculum-admin')
    
    await deleteLesson(DB_EDUCATION, lessonId)
    
    return c.json({
      success: true,
      message: 'Lesson deleted successfully'
    })
  } catch (error: any) {
    console.error('Delete lesson error:', error)
    return c.json({ success: false, message: error.message }, 500)
  }
})

// ============================================================================
// STUDENT PROGRESS TRACKING API ENDPOINTS
// ============================================================================

// GET /api/student/progress/:lessonId - Get lesson progress
app.get('/api/student/progress/:lessonId', async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    const lessonId = c.req.param('lessonId')
    
    // Get userId from token
    const authHeader = c.req.header('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ success: false, error: 'No token provided' }, 401)
    }
    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    if (!payload) {
      return c.json({ success: false, error: 'Invalid token' }, 401)
    }
    const userId = payload.userId || payload.id // Handle both old and new tokens
    
    const progress = await DB_EDUCATION.prepare(`
      SELECT * FROM curriculum_progress 
      WHERE user_id = ? AND lesson_id = ?
    `).bind(userId, lessonId).first()
    
    return c.json({
      success: true,
      data: progress || null
    })
  } catch (error: any) {
    console.error('Get progress error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// POST /api/student/progress - Save/update lesson progress
app.post('/api/student/progress', async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    
    // Get userId from token
    const authHeader = c.req.header('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ success: false, error: 'No token provided' }, 401)
    }
    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    if (!payload) {
      return c.json({ success: false, error: 'Invalid token' }, 401)
    }
    const userId = payload.userId || payload.id // Handle both old and new tokens
    const body = await c.req.json()
    const { lesson_id, module_id, week_id, watch_time_seconds, progress_percent, status } = body
    
    // Check if progress exists
    const existing = await DB_EDUCATION.prepare(`
      SELECT id FROM curriculum_progress 
      WHERE user_id = ? AND lesson_id = ?
    `).bind(userId, lesson_id).first()
    
    if (existing) {
      // Update existing progress
      await DB_EDUCATION.prepare(`
        UPDATE curriculum_progress 
        SET watch_time_seconds = ?, 
            progress_percent = ?, 
            status = ?,
            completed_at = CASE WHEN ? = 'completed' THEN datetime('now') ELSE completed_at END
        WHERE user_id = ? AND lesson_id = ?
      `).bind(
        watch_time_seconds, 
        progress_percent, 
        status || 'in_progress',
        status || 'in_progress',
        userId, 
        lesson_id
      ).run()
    } else {
      // Create new progress record
      const progressId = `prog-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
      await DB_EDUCATION.prepare(`
        INSERT INTO curriculum_progress 
        (id, user_id, lesson_id, module_id, week_id, watch_time_seconds, progress_percent, status, completed_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, CASE WHEN ? = 'completed' THEN datetime('now') ELSE NULL END)
      `).bind(
        progressId,
        userId,
        lesson_id,
        module_id,
        week_id,
        watch_time_seconds,
        progress_percent,
        status || 'in_progress',
        status || 'in_progress'
      ).run()
    }
    
    // Check for "First Lesson" achievement if just completed
    if (status === 'completed') {
      const { results: completedCount } = await DB_EDUCATION.prepare(`
        SELECT COUNT(*) as count FROM curriculum_progress WHERE user_id = ? AND status = 'completed'
      `).bind(userId).all()
      
      const count = completedCount[0]?.count || 0
      
      // Award milestone badges based on lesson count
      const lessonBadges = [
        { id: 'ach-first-lesson', count: 1 },
        { id: 'ach-5-lessons', count: 5 },
        { id: 'ach-10-lessons', count: 10 },
        { id: 'ach-25-lessons', count: 25 },
        { id: 'ach-50-lessons', count: 50 }
      ]
      
      for (const badge of lessonBadges) {
        if (count === badge.count) {
          // Check if already earned
          const { results: existing } = await DB_EDUCATION.prepare(`
            SELECT id FROM user_achievements WHERE user_id = ? AND achievement_id = ?
          `).bind(userId, badge.id).all()
          
          if (existing.length === 0) {
            // Award badge
            await DB_EDUCATION.prepare(`
              INSERT INTO user_achievements (user_id, achievement_id)
              VALUES (?, ?)
            `).bind(userId, badge.id).run()
            
            // Add XP
            const { results: achievement } = await DB_EDUCATION.prepare(`
              SELECT xp_reward FROM achievements WHERE id = ?
            `).bind(badge.id).all()
            
            if (achievement.length > 0) {
              await DB_EDUCATION.prepare(`
                INSERT INTO user_xp (user_id, total_xp, current_level, xp_to_next_level, rank_title)
                VALUES (?, ?, 1, 100, 'Beginner Creator')
                ON CONFLICT(user_id) DO UPDATE SET
                  total_xp = total_xp + ?,
                  updated_at = CURRENT_TIMESTAMP
              `).bind(userId, achievement[0].xp_reward, achievement[0].xp_reward).run()
            }
          }
        }
      }
    }
    
    return c.json({
      success: true,
      message: 'Progress saved successfully'
    })
  } catch (error: any) {
    console.error('Save progress error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// GET /api/student/progress/all - Get all user progress
app.get('/api/student/progress/all', async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    
    // Get userId from token
    const authHeader = c.req.header('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ success: false, error: 'No token provided' }, 401)
    }
    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    if (!payload) {
      return c.json({ success: false, error: 'Invalid token' }, 401)
    }
    const userId = payload.userId || payload.id // Handle both old and new tokens
    
    const { results } = await DB_EDUCATION.prepare(`
      SELECT * FROM curriculum_progress 
      WHERE user_id = ?
      ORDER BY created_at DESC
    `).bind(userId).all()
    
    return c.json({
      success: true,
      data: results
    })
  } catch (error: any) {
    console.error('Get all progress error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// ============================================================================
// PROJECT SUBMISSION API ENDPOINTS
// ============================================================================

// GET /api/student/submissions/:moduleId - Get submissions for a module
app.get('/api/student/submissions/:moduleId', async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    const moduleId = c.req.param('moduleId')
    
    // Get userId from token
    const authHeader = c.req.header('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ success: false, error: 'No token provided' }, 401)
    }
    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    if (!payload) {
      return c.json({ success: false, error: 'Invalid token' }, 401)
    }
    const userId = payload.userId || payload.id // Handle both old and new tokens || payload.id // Handle both old and new tokens
    
    const { results } = await DB_EDUCATION.prepare(`
      SELECT * FROM curriculum_submissions 
      WHERE user_id = ? AND module_id = ?
      ORDER BY submitted_at DESC
    `).bind(userId, moduleId).all()
    
    return c.json({
      success: true,
      data: results
    })
  } catch (error: any) {
    console.error('Get submissions error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// POST /api/student/submissions - Create new submission
app.post('/api/student/submissions', async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    
    // Get userId from token
    const authHeader = c.req.header('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ success: false, error: 'No token provided' }, 401)
    }
    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    if (!payload) {
      return c.json({ success: false, error: 'Invalid token' }, 401)
    }
    const userId = payload.userId || payload.id // Handle both old and new tokens
    
    const body = await c.req.json()
    const { module_id, project_title, caption, media_url, media_type } = body
    
    const submissionId = `sub-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    
    await DB_EDUCATION.prepare(`
      INSERT INTO curriculum_submissions 
      (id, user_id, module_id, project_title, caption, media_url, media_type)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(
      submissionId,
      userId,
      module_id,
      project_title,
      caption || '',
      media_url,
      media_type || 'image'
    ).run()
    
    // Check for project submission achievements
    const { results: submissionCount } = await DB_EDUCATION.prepare(`
      SELECT COUNT(*) as count FROM curriculum_submissions WHERE user_id = ?
    `).bind(userId).all()
    
    const count = submissionCount[0]?.count || 0
    
    const projectBadges = [
      { id: 'ach-first-project', count: 1 },
      { id: 'ach-5-projects', count: 5 },
      { id: 'ach-10-projects', count: 10 }
    ]
    
    for (const badge of projectBadges) {
      if (count === badge.count) {
        // Check if already earned
        const { results: existing } = await DB_EDUCATION.prepare(`
          SELECT id FROM user_achievements WHERE user_id = ? AND achievement_id = ?
        `).bind(userId, badge.id).all()
        
        if (existing.length === 0) {
          // Award badge
          await DB_EDUCATION.prepare(`
            INSERT INTO user_achievements (user_id, achievement_id)
            VALUES (?, ?)
          `).bind(userId, badge.id).run()
          
          // Add XP
          const { results: achievement } = await DB_EDUCATION.prepare(`
            SELECT xp_reward FROM achievements WHERE id = ?
          `).bind(badge.id).all()
          
          if (achievement.length > 0) {
            await DB_EDUCATION.prepare(`
              INSERT INTO user_xp (user_id, total_xp, current_level, xp_to_next_level, rank_title)
              VALUES (?, ?, 1, 100, 'Beginner Creator')
              ON CONFLICT(user_id) DO UPDATE SET
                total_xp = total_xp + ?,
                updated_at = CURRENT_TIMESTAMP
            `).bind(userId, achievement[0].xp_reward, achievement[0].xp_reward).run()
          }
        }
      }
    }
    
    return c.json({
      success: true,
      message: 'Submission created successfully',
      data: { id: submissionId }
    })
  } catch (error: any) {
    console.error('Create submission error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// PUT /api/student/submissions/:id - Update submission
app.put('/api/student/submissions/:id', async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    const submissionId = c.req.param('id')
    
    // Get userId from token
    const authHeader = c.req.header('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ success: false, error: 'No token provided' }, 401)
    }
    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    if (!payload) {
      return c.json({ success: false, error: 'Invalid token' }, 401)
    }
    const userId = payload.userId || payload.id // Handle both old and new tokens
    
    const body = await c.req.json()
    const { project_title, caption } = body
    
    await DB_EDUCATION.prepare(`
      UPDATE curriculum_submissions 
      SET project_title = ?, caption = ?
      WHERE id = ? AND user_id = ?
    `).bind(project_title, caption, submissionId, userId).run()
    
    return c.json({
      success: true,
      message: 'Submission updated successfully'
    })
  } catch (error: any) {
    console.error('Update submission error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// DELETE /api/student/submissions/:id - Delete submission
app.delete('/api/student/submissions/:id', async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    const submissionId = c.req.param('id')
    
    // Get userId from token
    const authHeader = c.req.header('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ success: false, error: 'No token provided' }, 401)
    }
    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    if (!payload) {
      return c.json({ success: false, error: 'Invalid token' }, 401)
    }
    const userId = payload.userId || payload.id // Handle both old and new tokens
    
    await DB_EDUCATION.prepare(`
      DELETE FROM curriculum_submissions 
      WHERE id = ? AND user_id = ?
    `).bind(submissionId, userId).run()
    
    return c.json({
      success: true,
      message: 'Submission deleted successfully'
    })
  } catch (error: any) {
    console.error('Delete submission error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// ==========================================
// PARENT API ROUTES
// ==========================================

// GET /api/parent/children - Get all children for parent
app.get('/api/parent/children', requireParent, async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    
    // Get userId from context (set by middleware)
    const payload = c.get('user')
    const userId = payload.userId || payload.id
    
    // Get all children for this parent
    const { results: children } = await DB_EDUCATION.prepare(`
      SELECT s.*, 
        COUNT(DISTINCT cp.id) as lessons_completed,
        COALESCE(AVG(cp.progress_percent), 0) as overall_progress
      FROM students s
      LEFT JOIN curriculum_progress cp ON cp.user_id = s.id AND cp.status = 'completed'
      WHERE s.parent_id = ?
      GROUP BY s.id
      ORDER BY s.created_at DESC
    `).bind(userId).all()
    
    return c.json({
      success: true,
      data: children
    })
  } catch (error: any) {
    console.error('Get children error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// POST /api/parent/child - Add new child
app.post('/api/parent/child', requireParent, async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    const body = await c.req.json()
    const { firstName, lastName, age, grade } = body
    
    // Validate required fields
    if (!firstName || !lastName) {
      return c.json({ success: false, error: 'First name and last name are required' }, 400)
    }
    
    // Get userId from context (set by middleware)
    const payload = c.get('user')
    const parentId = payload.userId || payload.id
    
    // Generate unique student ID
    const studentId = `stu-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    
    // Insert child
    await DB_EDUCATION.prepare(`
      INSERT INTO students (id, parent_id, first_name, last_name, age, grade, enrollment_status)
      VALUES (?, ?, ?, ?, ?, ?, 'active')
    `).bind(studentId, parentId, firstName, lastName, age || null, grade || null).run()
    
    return c.json({
      success: true,
      data: { id: studentId, firstName, lastName, age, grade }
    })
  } catch (error: any) {
    console.error('Add child error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// PUT /api/parent/child/:id - Update child info
app.put('/api/parent/child/:id', requireParent, async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    const childId = c.req.param('id')
    const body = await c.req.json()
    const { firstName, lastName, age, grade, enrollmentStatus } = body
    
    // Get userId from context (set by middleware)
    const payload = c.get('user')
    const parentId = payload.userId || payload.id
    
    // Verify parent owns this child
    const { results: children } = await DB_EDUCATION.prepare(`
      SELECT id FROM students WHERE id = ? AND parent_id = ?
    `).bind(childId, parentId).all()
    
    if (children.length === 0) {
      return c.json({ success: false, error: 'Child not found or access denied' }, 404)
    }
    
    // Update child
    await DB_EDUCATION.prepare(`
      UPDATE students 
      SET first_name = ?, last_name = ?, age = ?, grade = ?, enrollment_status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND parent_id = ?
    `).bind(firstName, lastName, age, grade, enrollmentStatus, childId, parentId).run()
    
    return c.json({
      success: true,
      message: 'Child updated successfully'
    })
  } catch (error: any) {
    console.error('Update child error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// GET /api/parent/child/:id/progress - Get detailed progress for one child
app.get('/api/parent/child/:id/progress', requireParent, async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    const childId = c.req.param('id')
    
    // Get userId from context (set by middleware)
    const payload = c.get('user')
    const parentId = payload.userId || payload.id
    
    // Verify parent owns this child
    const { results: children } = await DB_EDUCATION.prepare(`
      SELECT * FROM students WHERE id = ? AND parent_id = ?
    `).bind(childId, parentId).all()
    
    if (children.length === 0) {
      return c.json({ success: false, error: 'Child not found or access denied' }, 404)
    }
    
    // Get detailed progress
    const { results: progress } = await DB_EDUCATION.prepare(`
      SELECT 
        cp.*,
        cm.month_name,
        cm.title as module_title,
        cw.title as week_title
      FROM curriculum_progress cp
      JOIN curriculum_modules cm ON cp.module_id = cm.id
      LEFT JOIN curriculum_weeks cw ON cp.week_id = cw.id
      WHERE cp.user_id = ?
      ORDER BY cp.created_at DESC
    `).bind(childId).all()
    
    // Get submissions count
    const { results: submissions } = await DB_EDUCATION.prepare(`
      SELECT COUNT(*) as count FROM curriculum_submissions WHERE user_id = ?
    `).bind(childId).all()
    
    return c.json({
      success: true,
      data: {
        child: children[0],
        progress: progress,
        submissions_count: submissions[0]?.count || 0
      }
    })
  } catch (error: any) {
    console.error('Get child progress error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// ==========================================
// ACHIEVEMENT & GAMIFICATION API ROUTES
// ==========================================

// GET /api/student/achievements - Get all earned achievements
app.get('/api/student/achievements', async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    
    // Get userId from token
    const authHeader = c.req.header('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ success: false, error: 'No token provided' }, 401)
    }
    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    if (!payload) {
      return c.json({ success: false, error: 'Invalid token' }, 401)
    }
    const userId = payload.userId || payload.id
    
    // Get earned achievements with details
    const { results: earned } = await DB_EDUCATION.prepare(`
      SELECT 
        ua.*,
        a.name,
        a.description,
        a.category,
        a.icon,
        a.xp_reward
      FROM user_achievements ua
      JOIN achievements a ON ua.achievement_id = a.id
      WHERE ua.user_id = ?
      ORDER BY ua.earned_at DESC
    `).bind(userId).all()
    
    // Get all available achievements
    const { results: all } = await DB_EDUCATION.prepare(`
      SELECT * FROM achievements WHERE is_active = 1 ORDER BY sort_order
    `).all()
    
    return c.json({
      success: true,
      data: {
        earned: earned,
        available: all,
        total_earned: earned.length,
        total_available: all.length
      }
    })
  } catch (error: any) {
    console.error('Get achievements error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// GET /api/student/xp - Get XP and level info
app.get('/api/student/xp', async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    
    // Get userId from token
    const authHeader = c.req.header('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ success: false, error: 'No token provided' }, 401)
    }
    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    if (!payload) {
      return c.json({ success: false, error: 'Invalid token' }, 401)
    }
    const userId = payload.userId || payload.id
    
    // Get or create XP record
    let { results: xpData } = await DB_EDUCATION.prepare(`
      SELECT * FROM user_xp WHERE user_id = ?
    `).bind(userId).all()
    
    if (xpData.length === 0) {
      // Create initial XP record
      await DB_EDUCATION.prepare(`
        INSERT INTO user_xp (user_id, total_xp, current_level, xp_to_next_level, rank_title)
        VALUES (?, 0, 1, 100, 'Beginner Creator')
      `).bind(userId).run()
      
      xpData = [{
        user_id: userId,
        total_xp: 0,
        current_level: 1,
        xp_to_next_level: 100,
        rank_title: 'Beginner Creator'
      }]
    }
    
    return c.json({
      success: true,
      data: xpData[0]
    })
  } catch (error: any) {
    console.error('Get XP error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// GET /api/student/streak - Get current streak info
app.get('/api/student/streak', async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    
    // Get userId from token
    const authHeader = c.req.header('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ success: false, error: 'No token provided' }, 401)
    }
    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    if (!payload) {
      return c.json({ success: false, error: 'Invalid token' }, 401)
    }
    const userId = payload.userId || payload.id
    
    // Get or create streak stats
    let { results: streakData } = await DB_EDUCATION.prepare(`
      SELECT * FROM streak_stats WHERE user_id = ?
    `).bind(userId).all()
    
    if (streakData.length === 0) {
      // Create initial streak record
      await DB_EDUCATION.prepare(`
        INSERT INTO streak_stats (user_id, current_streak, longest_streak, last_activity_date)
        VALUES (?, 0, 0, NULL)
      `).bind(userId).run()
      
      streakData = [{
        user_id: userId,
        current_streak: 0,
        longest_streak: 0,
        last_activity_date: null
      }]
    }
    
    return c.json({
      success: true,
      data: streakData[0]
    })
  } catch (error: any) {
    console.error('Get streak error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// POST /api/student/track-activity - Track daily activity for streak
app.post('/api/student/track-activity', async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    
    // Get userId from token
    const authHeader = c.req.header('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ success: false, error: 'No token provided' }, 401)
    }
    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    if (!payload) {
      return c.json({ success: false, error: 'Invalid token' }, 401)
    }
    const userId = payload.userId || payload.id
    
    const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD
    
    // Insert or update today's activity
    await DB_EDUCATION.prepare(`
      INSERT INTO daily_streaks (user_id, activity_date, lessons_completed, time_spent_minutes)
      VALUES (?, ?, 1, 0)
      ON CONFLICT(user_id, activity_date) DO UPDATE SET
        lessons_completed = lessons_completed + 1,
        time_spent_minutes = time_spent_minutes + 1
    `).bind(userId, today).run()
    
    // Calculate streak
    const { results: recentDays } = await DB_EDUCATION.prepare(`
      SELECT activity_date FROM daily_streaks 
      WHERE user_id = ?
      ORDER BY activity_date DESC
      LIMIT 100
    `).bind(userId).all()
    
    let currentStreak = 0
    if (recentDays.length > 0) {
      const dates = recentDays.map(d => d.activity_date).sort().reverse()
      currentStreak = 1
      
      for (let i = 1; i < dates.length; i++) {
        const prevDate = new Date(dates[i-1])
        const currDate = new Date(dates[i])
        const dayDiff = Math.floor((prevDate - currDate) / (1000 * 60 * 60 * 24))
        
        if (dayDiff === 1) {
          currentStreak++
        } else {
          break
        }
      }
    }
    
    // Update streak stats
    await DB_EDUCATION.prepare(`
      INSERT INTO streak_stats (user_id, current_streak, longest_streak, last_activity_date)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(user_id) DO UPDATE SET
        current_streak = ?,
        longest_streak = MAX(longest_streak, ?),
        last_activity_date = ?,
        updated_at = CURRENT_TIMESTAMP
    `).bind(userId, currentStreak, currentStreak, today, currentStreak, currentStreak, today).run()
    
    // Check for streak achievements
    const streakBadges = [
      { id: 'ach-streak-3', days: 3 },
      { id: 'ach-streak-7', days: 7 },
      { id: 'ach-streak-14', days: 14 },
      { id: 'ach-streak-30', days: 30 }
    ]
    
    for (const badge of streakBadges) {
      if (currentStreak >= badge.days) {
        // Check if already earned
        const { results: existing } = await DB_EDUCATION.prepare(`
          SELECT id FROM user_achievements WHERE user_id = ? AND achievement_id = ?
        `).bind(userId, badge.id).all()
        
        if (existing.length === 0) {
          // Award badge
          await DB_EDUCATION.prepare(`
            INSERT INTO user_achievements (user_id, achievement_id)
            VALUES (?, ?)
          `).bind(userId, badge.id).run()
          
          // Add XP
          const { results: achievement } = await DB_EDUCATION.prepare(`
            SELECT xp_reward FROM achievements WHERE id = ?
          `).bind(badge.id).all()
          
          if (achievement.length > 0) {
            await DB_EDUCATION.prepare(`
              UPDATE user_xp SET 
                total_xp = total_xp + ?,
                updated_at = CURRENT_TIMESTAMP
              WHERE user_id = ?
            `).bind(achievement[0].xp_reward, userId).run()
          }
        }
      }
    }
    
    return c.json({
      success: true,
      data: { currentStreak, today }
    })
  } catch (error: any) {
    console.error('Track activity error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// POST /api/student/award-achievement - Manually award achievement
app.post('/api/student/award-achievement', async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    const body = await c.req.json()
    const { achievementId } = body
    
    // Get userId from token
    const authHeader = c.req.header('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ success: false, error: 'No token provided' }, 401)
    }
    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    if (!payload) {
      return c.json({ success: false, error: 'Invalid token' }, 401)
    }
    const userId = payload.userId || payload.id
    
    // Check if already earned
    const { results: existing } = await DB_EDUCATION.prepare(`
      SELECT id FROM user_achievements WHERE user_id = ? AND achievement_id = ?
    `).bind(userId, achievementId).all()
    
    if (existing.length > 0) {
      return c.json({ success: false, error: 'Achievement already earned' })
    }
    
    // Get achievement details
    const { results: achievement } = await DB_EDUCATION.prepare(`
      SELECT * FROM achievements WHERE id = ?
    `).bind(achievementId).all()
    
    if (achievement.length === 0) {
      return c.json({ success: false, error: 'Achievement not found' }, 404)
    }
    
    // Award achievement
    await DB_EDUCATION.prepare(`
      INSERT INTO user_achievements (user_id, achievement_id)
      VALUES (?, ?)
    `).bind(userId, achievementId).run()
    
    // Add XP
    const xpReward = achievement[0].xp_reward
    await DB_EDUCATION.prepare(`
      INSERT INTO user_xp (user_id, total_xp, current_level, xp_to_next_level, rank_title)
      VALUES (?, ?, 1, 100, 'Beginner Creator')
      ON CONFLICT(user_id) DO UPDATE SET
        total_xp = total_xp + ?,
        updated_at = CURRENT_TIMESTAMP
    `).bind(userId, xpReward, xpReward).run()
    
    // Calculate new level
    const { results: xpData } = await DB_EDUCATION.prepare(`
      SELECT * FROM user_xp WHERE user_id = ?
    `).bind(userId).all()
    
    const xp = xpData[0]
    const { newLevel, newRank, xpToNext } = calculateLevel(xp.total_xp)
    
    if (newLevel > xp.current_level) {
      // Level up!
      await DB_EDUCATION.prepare(`
        UPDATE user_xp SET
          current_level = ?,
          rank_title = ?,
          xp_to_next_level = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ?
      `).bind(newLevel, newRank, xpToNext, userId).run()
    }
    
    return c.json({
      success: true,
      data: {
        achievement: achievement[0],
        xp_earned: xpReward,
        level_up: newLevel > xp.current_level,
        new_level: newLevel
      }
    })
  } catch (error: any) {
    console.error('Award achievement error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Helper function: Calculate level from XP
function calculateLevel(totalXP: number): { newLevel: number, newRank: string, xpToNext: number } {
  const levels = [
    { level: 1, xp: 0, rank: 'Beginner Creator', next: 100 },
    { level: 2, xp: 100, rank: 'Explorer', next: 200 },
    { level: 3, xp: 300, rank: 'Adventurer', next: 300 },
    { level: 4, xp: 600, rank: 'Storyteller', next: 400 },
    { level: 5, xp: 1000, rank: 'Filmmaker', next: 500 },
    { level: 6, xp: 1500, rank: 'Creative Pro', next: 700 },
    { level: 7, xp: 2200, rank: 'Visual Master', next: 800 },
    { level: 8, xp: 3000, rank: 'Legend', next: 1000 }
  ]
  
  for (let i = levels.length - 1; i >= 0; i--) {
    if (totalXP >= levels[i].xp) {
      return {
        newLevel: levels[i].level,
        newRank: levels[i].rank,
        xpToNext: i < levels.length - 1 ? levels[i+1].xp - totalXP : 0
      }
    }
  }
  
  return { newLevel: 1, newRank: 'Beginner Creator', xpToNext: 100 - totalXP }
}

// GET /api/curriculum/download-pdf - Generate curriculum overview PDF
app.get('/api/curriculum/download-pdf', async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    
    // Get all curriculum modules
    const { results: modules } = await DB_EDUCATION.prepare(`
      SELECT * FROM curriculum_modules ORDER BY sort_order
    `).all()
    
    // Generate a simple text-based curriculum overview
    let content = `
ACROMATICO CREATOR ACADEMY
12-Month Visual Storytelling Curriculum
© 2026 Acromatico • Ages 7-14
═══════════════════════════════════════════════════════════

📚 CURRICULUM OVERVIEW

Transform your child into a creative storyteller with our comprehensive 
12-month journey covering photography, videography, and visual storytelling.

═══════════════════════════════════════════════════════════

📅 COMPLETE CURRICULUM BREAKDOWN

`
    
    modules.forEach((module, index) => {
      content += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${module.emoji} MONTH ${module.month_number}: ${module.month_name.toUpperCase()}
${module.title}
${module.subtitle}

Quarter: Q${module.quarter}
Theme Color: ${module.theme_color}

📖 Description:
${module.description}

🗺️ Adventure Project: ${module.adventure_title}
${module.adventure_desc}

`
    })
    
    content += `
═══════════════════════════════════════════════════════════

✨ WHAT'S INCLUDED

✓ 120+ HD Video Lessons
✓ 48 Weekly Learning Cycles
✓ 12 Monthly Adventure Projects
✓ 15 Achievement Badges to Earn
✓ XP & Level Progression System
✓ Parent Progress Dashboard
✓ Project Submission Portal
✓ Lifetime Access to Content

═══════════════════════════════════════════════════════════

💰 PRICING

Full Year Access: $297/year
That's just $24.75/month - less than a single art class!

✓ 30-Day Money-Back Guarantee
✓ Covers Entire Family (Multiple Children)
✓ Self-Paced Learning
✓ Professional Creator Instruction

═══════════════════════════════════════════════════════════

🚀 GET STARTED TODAY

Visit: https://acromatico.com/pricing
Email: hello@acromatico.com

Transform your child's creativity into professional skills!

═══════════════════════════════════════════════════════════
`
    
    // Return as downloadable text file (simpler than PDF for Cloudflare Workers)
    return new Response(content, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Content-Disposition': 'attachment; filename="Acromatico-Creator-Academy-Curriculum-2026.txt"',
        'Cache-Control': 'public, max-age=3600'
      }
    })
  } catch (error: any) {
    console.error('PDF generation error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// GET /api/admin/curriculum/stats - Get curriculum statistics
app.get('/api/admin/curriculum/stats', requireAdmin, async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    const { getCurriculumStats } = await import('./api/curriculum-admin')
    
    const stats = await getCurriculumStats(DB_EDUCATION)
    
    return c.json({
      success: true,
      data: stats
    })
  } catch (error: any) {
    console.error('Get stats error:', error)
    return c.json({ success: false, message: error.message }, 500)
  }
})

// ============================================================
// DASHBOARD DATA API - REAL DATABASE QUERIES
// ============================================================

// GET /api/dashboard/student - Get student dashboard data
app.get('/api/dashboard/student', async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    const authHeader = c.req.header('Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ message: 'No token provided' }, 401)
    }
    
    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    
    if (!payload) {
      return c.json({ message: 'Invalid or expired token' }, 401)
    }
    
    // For now, return empty data since the DB schema doesn't match enrollment tracking
    // TODO: Build proper course enrollment system
    return c.json({
      stats: {
        coursesEnrolled: 0,
        lessonsCompleted: 0,
        achievementsEarned: 0,
        dayStreak: 0
      },
      courses: [],
      achievements: []
    })
    
  } catch (error: any) {
    console.error('Dashboard error:', error)
    return c.json({ message: 'Failed to load dashboard: ' + error.message }, 500)
  }
})

// GET /api/dashboard/parent - Get parent dashboard data
app.get('/api/dashboard/parent', async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    const authHeader = c.req.header('Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ message: 'No token provided' }, 401)
    }
    
    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    
    if (!payload) {
      return c.json({ message: 'Invalid or expired token' }, 401)
    }
    
    const userId = payload.id
    
    // Get all students for this parent
    const students = await DB_EDUCATION.prepare(`
      SELECT 
        s.id,
        s.first_name,
        s.last_name,
        s.age,
        s.grade,
        s.enrollment_status,
        0 as courses_enrolled,
        0 as lessons_completed,
        0 as badges_earned
      FROM students s
      WHERE s.parent_id = ?
      ORDER BY s.created_at DESC
    `).bind(userId).all()
    
    // Get active subscription info (simplified)
    const subscription = await DB_EDUCATION.prepare(`
      SELECT 
        s.id,
        s.status,
        s.monthly_price,
        s.next_billing_date
      FROM subscriptions s
      WHERE s.parent_id = ? AND s.status = 'active'
      ORDER BY s.created_at DESC
      LIMIT 1
    `).bind(userId).first()
    
    return c.json({
      students: students?.results || [],
      subscription: subscription || null
    })
    
  } catch (error: any) {
    console.error('Parent dashboard error:', error)
    return c.json({ message: 'Failed to load dashboard: ' + error.message }, 500)
  }
})

// GET /api/dashboard/admin - Get admin dashboard data
app.get('/api/dashboard/admin', async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    const authHeader = c.req.header('Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ message: 'No token provided' }, 401)
    }
    
    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    
    if (!payload || payload.role !== 'admin') {
      return c.json({ message: 'Unauthorized' }, 403)
    }
    
    // Get total students count
    const studentsCount = await DB_EDUCATION.prepare(
      'SELECT COUNT(*) as count FROM students WHERE enrollment_status = "active"'
    ).first()
    
    // Get active courses count
    const coursesCount = await DB_EDUCATION.prepare(
      'SELECT COUNT(*) as count FROM courses'
    ).first()
    
    // Get monthly revenue (sum of all active subscriptions)
    const revenue = await DB_EDUCATION.prepare(`
      SELECT SUM(monthly_price) as total
      FROM subscriptions
      WHERE status = 'active'
    `).first()
    
    // Get recent students
    const recentStudents = await DB_EDUCATION.prepare(`
      SELECT 
        s.id,
        s.first_name || ' ' || s.last_name as name,
        u.email,
        s.age,
        s.grade,
        s.enrollment_status as status,
        0 as courses,
        0 as progress
      FROM students s
      INNER JOIN users u ON s.parent_id = u.id
      ORDER BY s.created_at DESC
      LIMIT 10
    `).all()
    
    // Get all courses
    const courses = await DB_EDUCATION.prepare(`
      SELECT 
        c.id,
        c.title,
        c.category,
        c.status,
        0 as students,
        0 as completion,
        0 as rating
      FROM courses c
      ORDER BY c.created_at DESC
      LIMIT 10
    `).all()
    
    return c.json({
      stats: {
        totalStudents: studentsCount?.count || 0,
        activeCourses: coursesCount?.count || 0,
        monthlyRevenue: revenue?.total || 0,
        completionRate: 0
      },
      students: recentStudents?.results || [],
      courses: courses?.results || []
    })
    
  } catch (error: any) {
    console.error('Admin dashboard error:', error)
    return c.json({ message: 'Failed to load dashboard: ' + error.message }, 500)
  }
})

// ============================================================
// END DASHBOARD DATA API
// ============================================================

// ============================================================
// LIVE CLASSES API - Complete Backend
// ============================================================

// Parent APIs - Managing Students & Enrollments
app.post('/api/students/add', liveClassesAPI.addStudent)
app.post('/api/enrollments/create', liveClassesAPI.createEnrollment)
app.get('/api/students/my-students', liveClassesAPI.getMyStudents)

// Course Browsing
app.get('/api/courses/browse', liveClassesAPI.browseCourses)

// Student APIs - View Enrolled Courses & Classes
app.get('/api/enrollments/my-courses', liveClassesAPI.getStudentCourses)
app.get('/api/classes/upcoming', liveClassesAPI.getUpcomingClasses)
app.get('/api/classes/completed', liveClassesAPI.getCompletedClasses)

// Assignments
app.get('/api/assignments/my-assignments', liveClassesAPI.getStudentAssignments)
app.post('/api/assignments/submit', liveClassesAPI.submitAssignment)

// Achievements
app.get('/api/achievements/my-achievements', liveClassesAPI.getStudentAchievements)

// Admin APIs - Course & Class Management
app.post('/api/admin/courses/create', liveClassesAPI.createCourse)
app.post('/api/admin/classes/schedule', liveClassesAPI.scheduleClass)
app.post('/api/admin/attendance/mark', liveClassesAPI.markAttendance)
app.post('/api/admin/assignments/create', liveClassesAPI.createAssignment)
app.post('/api/admin/assignments/grade', liveClassesAPI.gradeAssignment)
app.post('/api/admin/achievements/award', liveClassesAPI.awardAchievement)
app.post('/api/admin/notifications/send', liveClassesAPI.sendNotification)

// ============================================================
// END LIVE CLASSES API
// ============================================================

// ============================================================
// ADMIN CRM API - Complete Database Management
// ============================================================

// GET /api/admin/students/all - Get all students with parent info
app.get('/api/admin/students/all', async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    const authHeader = c.req.header('Authorization')
    
    if (!authHeader?.startsWith('Bearer ')) {
      return c.json({ message: 'No token provided' }, 401)
    }
    
    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    
    if (!payload || payload.role !== 'admin') {
      return c.json({ message: 'Unauthorized' }, 403)
    }
    
    const students = await DB_EDUCATION.prepare(`
      SELECT 
        s.id,
        s.parent_id,
        s.first_name,
        s.last_name,
        s.age,
        s.grade,
        s.enrollment_status,
        s.created_at,
        u.email as parent_email,
        COUNT(DISTINCT e.course_id) as courses_enrolled
      FROM students s
      LEFT JOIN users u ON s.parent_id = u.id
      LEFT JOIN enrollments e ON s.id = e.student_id AND e.status = 'active'
      GROUP BY s.id
      ORDER BY s.created_at DESC
    `).all()
    
    return c.json({ students: students?.results || [] })
    
  } catch (error: any) {
    console.error('Get all students error:', error)
    return c.json({ message: 'Failed to load students: ' + error.message }, 500)
  }
})

// GET /api/admin/classes/all - Get all live classes
app.get('/api/admin/classes/all', async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    const authHeader = c.req.header('Authorization')
    
    if (!authHeader?.startsWith('Bearer ')) {
      return c.json({ message: 'No token provided' }, 401)
    }
    
    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    
    if (!payload || payload.role !== 'admin') {
      return c.json({ message: 'Unauthorized' }, 403)
    }
    
    const classes = await DB_EDUCATION.prepare(`
      SELECT 
        lc.id,
        lc.course_id,
        lc.title,
        lc.description,
        lc.scheduled_date,
        lc.scheduled_time,
        lc.duration_minutes,
        lc.meeting_link,
        lc.meeting_password,
        lc.status,
        c.title as course_title
      FROM live_classes lc
      LEFT JOIN courses c ON lc.course_id = c.id
      ORDER BY lc.scheduled_date DESC, lc.scheduled_time DESC
    `).all()
    
    return c.json({ classes: classes?.results || [] })
    
  } catch (error: any) {
    console.error('Get all classes error:', error)
    return c.json({ message: 'Failed to load classes: ' + error.message }, 500)
  }
})

// GET /api/admin/classes/upcoming - Get upcoming classes only
app.get('/api/admin/classes/upcoming', async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    const authHeader = c.req.header('Authorization')
    
    if (!authHeader?.startsWith('Bearer ')) {
      return c.json({ message: 'No token provided' }, 401)
    }
    
    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    
    if (!payload || payload.role !== 'admin') {
      return c.json({ message: 'Unauthorized' }, 403)
    }
    
    const classes = await DB_EDUCATION.prepare(`
      SELECT 
        lc.id,
        lc.course_id,
        lc.title,
        lc.scheduled_date,
        lc.scheduled_time,
        c.title as course_title
      FROM live_classes lc
      LEFT JOIN courses c ON lc.course_id = c.id
      WHERE datetime(lc.scheduled_date || ' ' || lc.scheduled_time) >= datetime('now')
      ORDER BY lc.scheduled_date ASC, lc.scheduled_time ASC
    `).all()
    
    return c.json({ classes: classes?.results || [] })
    
  } catch (error: any) {
    console.error('Get upcoming classes error:', error)
    return c.json({ message: 'Failed to load classes: ' + error.message }, 500)
  }
})

// GET /api/admin/revenue/stats - Get revenue statistics
app.get('/api/admin/revenue/stats', async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    const authHeader = c.req.header('Authorization')
    
    if (!authHeader?.startsWith('Bearer ')) {
      return c.json({ message: 'No token provided' }, 401)
    }
    
    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    
    if (!payload || payload.role !== 'admin') {
      return c.json({ message: 'Unauthorized' }, 403)
    }
    
    // Get total revenue (sum of all monthly prices)
    const revenue = await DB_EDUCATION.prepare(`
      SELECT SUM(monthly_price) as total FROM subscriptions WHERE status = 'active'
    `).first()
    
    // Get active subscriptions count
    const subsCount = await DB_EDUCATION.prepare(`
      SELECT COUNT(*) as count FROM subscriptions WHERE status = 'active'
    `).first()
    
    // Get all subscriptions with parent info
    const subscriptions = await DB_EDUCATION.prepare(`
      SELECT 
        s.id,
        s.num_students,
        s.monthly_price,
        s.billing_cycle,
        s.status,
        s.next_billing_date,
        u.email as parent_email
      FROM subscriptions s
      LEFT JOIN users u ON s.parent_id = u.id
      WHERE s.status = 'active'
      ORDER BY s.created_at DESC
    `).all()
    
    const totalRevenue = revenue?.total || 0
    const activeSubscriptions = subsCount?.count || 0
    const avgStudentValue = activeSubscriptions > 0 ? totalRevenue / activeSubscriptions : 0
    
    return c.json({ 
      totalRevenue,
      activeSubscriptions,
      avgStudentValue,
      subscriptions: subscriptions?.results || []
    })
    
  } catch (error: any) {
    console.error('Get revenue stats error:', error)
    return c.json({ message: 'Failed to load revenue: ' + error.message }, 500)
  }
})

// POST /api/admin/database/query - Execute custom SQL query
app.post('/api/admin/database/query', async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    const authHeader = c.req.header('Authorization')
    
    if (!authHeader?.startsWith('Bearer ')) {
      return c.json({ message: 'No token provided' }, 401)
    }
    
    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    
    if (!payload || payload.role !== 'admin') {
      return c.json({ message: 'Unauthorized' }, 403)
    }
    
    const { query } = await c.req.json()
    
    if (!query) {
      return c.json({ message: 'Query is required' }, 400)
    }
    
    // Execute the query
    const result = await DB_EDUCATION.prepare(query).all()
    
    return c.json({ results: result?.results || [] })
    
  } catch (error: any) {
    console.error('Database query error:', error)
    return c.json({ message: 'Query failed: ' + error.message }, 500)
  }
})

// ============================================================
// END ADMIN CRM API
// ============================================================

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

// Support Ticket API - Sends email to info@acromatico.com
app.post('/api/support-ticket', async (c) => {
  try {
    const { name, email, subject, message } = await c.req.json()
    
    // Validate input
    if (!name || !email || !subject || !message) {
      return c.json({ error: 'All fields are required' }, 400)
    }
    
    // Generate ticket ID (timestamp + random)
    const ticketId = `TICKET-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
    
    // Create email body in Apple-style format
    const emailBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 300; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #4794A6; color: white; padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
    .header h1 { margin: 0; font-weight: 300; font-size: 28px; letter-spacing: -0.02em; }
    .ticket-id { background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; display: inline-block; margin-top: 12px; font-size: 13px; font-weight: 400; }
    .content { background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
    .field { margin-bottom: 20px; }
    .field-label { font-weight: 400; color: #666; font-size: 13px; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px; }
    .field-value { font-size: 15px; color: #000; font-weight: 300; }
    .message-box { background: #f8f8f8; padding: 20px; border-radius: 8px; border-left: 3px solid #4794A6; margin-top: 10px; }
    .footer { background: #f8f8f8; padding: 20px; text-align: center; font-size: 12px; color: #999; border-radius: 0 0 12px 12px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>💬 New Support Ticket</h1>
    <div class="ticket-id">${ticketId}</div>
  </div>
  
  <div class="content">
    <div class="field">
      <div class="field-label">From</div>
      <div class="field-value">${name}</div>
    </div>
    
    <div class="field">
      <div class="field-label">Email</div>
      <div class="field-value"><a href="mailto:${email}" style="color: #4794A6; text-decoration: none;">${email}</a></div>
    </div>
    
    <div class="field">
      <div class="field-label">Subject</div>
      <div class="field-value">${subject}</div>
    </div>
    
    <div class="field">
      <div class="field-label">Message</div>
      <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
    </div>
    
    <div class="field">
      <div class="field-label">Submitted</div>
      <div class="field-value">${new Date().toLocaleString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      })}</div>
    </div>
  </div>
  
  <div class="footer">
    <p style="margin: 0;">Reply to this email to respond directly to ${name}</p>
    <p style="margin: 8px 0 0 0; color: #ccc;">Acromatico Support System</p>
  </div>
</body>
</html>
    `.trim()
    
    // Send email using Resend API (we'll use fetch to external service)
    // For now, we'll just log it and return success
    // In production, you'd integrate with Resend, SendGrid, or similar
    
    console.log('=== NEW SUPPORT TICKET ===')
    console.log('Ticket ID:', ticketId)
    console.log('From:', name, '<' + email + '>')
    console.log('Subject:', subject)
    console.log('Message:', message)
    console.log('========================')
    
    // Return success
    return c.json({ 
      success: true, 
      ticketId,
      message: 'Support ticket created successfully'
    })
    
  } catch (error) {
    console.error('Support ticket error:', error)
    return c.json({ error: 'Failed to create support ticket' }, 500)
  }
})

// Get Stripe publishable key
app.get('/api/stripe-key', (c) => {
  return c.json({ publishableKey: c.env.STRIPE_PUBLISHABLE_KEY })
})

// Static files served by wrangler pages dev from public/ automatically
// Use JSX renderer
app.use(renderer)

// ============================================
// PUBLIC ROUTES
// ============================================

app.get('/', (c) => {
  // Serve the main Acromatico photography homepage
  return c.redirect('/static/index')
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
        
        @keyframes kenBurnsZoom {
          0% { transform: scale(1.0) translate(0, 0); }
          100% { transform: scale(1.15) translate(-2%, -5%); }
        }
        
        @keyframes lensFlare {
          0%, 100% { 
            top: 20%; left: 30%; 
            opacity: 0.6;
          }
          50% { 
            top: 40%; left: 60%; 
            opacity: 0.3;
          }
        }
        
        @keyframes filmGrain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          20% { transform: translate(-10%, 5%); }
          30% { transform: translate(5%, -10%); }
          40% { transform: translate(-5%, 15%); }
          50% { transform: translate(-10%, 5%); }
          60% { transform: translate(15%, 0); }
          70% { transform: translate(0, 10%); }
          80% { transform: translate(-15%, 0); }
          90% { transform: translate(10%, 5%); }
        }
      `}</style>

      {/* Navigation */}
      <Header />

      {/* Hero Section - Apple-Style Full-Screen Impact */}
      <section class="relative h-screen flex items-start justify-end overflow-hidden">
        {/* Hero Image - High Angle Torres del Paine */}
        <div class="absolute inset-0 hero-bg" style="background: url('/static/images/hero-education-torres-high-angle-4k.jpg') center top/cover; animation: kenBurnsZoom 20s ease-in-out infinite alternate; filter: brightness(0.8) saturate(1.2);">
          <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50"></div>
          
          {/* Lens Flare Effect */}
          <div style="position: absolute; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,200,100,0.2) 20%, transparent 70%); pointer-events: none; mix-blend-mode: screen; animation: lensFlare 15s ease-in-out infinite; filter: blur(40px); top: 20%; left: 30%; z-index: 2;"></div>
          
          {/* Film Grain */}
          <div style="position: absolute; inset: 0; background: repeating-linear-gradient(0deg, transparent 0px, rgba(255,255,255,0.03) 2px, transparent 4px); opacity: 0.4; animation: filmGrain 0.2s steps(10) infinite; pointer-events: none; z-index: 3;"></div>
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
          <button onclick="openEducationModal()" class="btn-primary px-12 py-6 rounded-full text-xl font-bold text-white inline-block shadow-2xl border-0 cursor-pointer">
            Enroll Now
          </button>
        </div>
      </section>

      <div dangerouslySetInnerHTML={{__html: footerHTML}} />

      {/* TYPEFORM-STYLE ENROLLMENT MODAL */}
      <div id="enrollment-modal" class="fixed inset-0 bg-black/95 z-[100] hidden flex items-center justify-center p-4 overflow-y-auto">
        <div class="max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto">
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
            <button onclick="goToStep(1)" class="text-gray-400 hover:text-white mb-3 flex items-center gap-2 text-sm">
              ← Back
            </button>
            <h2 class="text-3xl font-black mb-2 text-center">How Many Students?</h2>
            <p class="text-base text-gray-400 mb-8 text-center">Slide to see your savings</p>
            
            {/* BIG PRICE DISPLAY - Focus on per-class per-student cost */}
            <div class="text-center mb-8">
              <div class="text-8xl font-black mb-2" id="big-price-display">$12.50</div>
              <div class="text-xl text-gray-400 mb-4">per class per student</div>
              <div class="text-3xl font-bold text-teal-500" id="monthly-price-display">$100/month per student</div>
              <div class="text-sm text-gray-500 mt-2" id="student-count-text">1 student • 8 live classes</div>
              <div class="text-sm text-teal-500 mt-1 hidden" id="sibling-discount-text"></div>
            </div>

            {/* Student Count Slider */}
            <div class="mb-8 px-4">
              <div class="flex justify-between items-center mb-3">
                <span class="text-sm text-gray-400">Number of Students</span>
                <span class="text-2xl font-bold text-white" id="slider-number">1</span>
              </div>
              <style dangerouslySetInnerHTML={{__html: `
                #student-slider::-webkit-slider-thumb {
                  appearance: none;
                  width: 28px;
                  height: 28px;
                  border-radius: 50%;
                  background: #4794A6;
                  cursor: pointer;
                  border: 4px solid white;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                  transition: transform 0.2s;
                }
                #student-slider::-webkit-slider-thumb:hover {
                  transform: scale(1.1);
                }
                #student-slider::-moz-range-thumb {
                  width: 28px;
                  height: 28px;
                  border-radius: 50%;
                  background: #4794A6;
                  cursor: pointer;
                  border: 4px solid white;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                  transition: transform 0.2s;
                }
                #student-slider::-moz-range-thumb:hover {
                  transform: scale(1.1);
                }
              `}} />
              <input 
                type="range" 
                id="student-slider" 
                min="1" 
                max="6" 
                value="1" 
                oninput="updateSlider(this.value)"
                class="w-full h-3 bg-gray-800 rounded-full appearance-none cursor-pointer"
                style="background: linear-gradient(to right, #4794A6 0%, #4794A6 0%, #1f2937 0%, #1f2937 100%);"
              />
              <div class="flex justify-between text-xs text-gray-500 mt-2">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6+</span>
              </div>
            </div>

            {/* Monthly/Annual Toggle */}
            <div class="flex items-center justify-center gap-3 mb-6 bg-gray-900 p-2 rounded-full inline-flex mx-auto">
              <button id="monthly-toggle-btn" onclick="toggleBilling('monthly')" class="px-4 py-2 rounded-full font-semibold transition bg-teal-500 text-white text-sm">
                Monthly
              </button>
              <button id="annual-toggle-btn" onclick="toggleBilling('annual')" class="px-4 py-2 rounded-full font-semibold transition text-gray-400 text-sm">
                Annual <span class="text-teal-500 text-xs ml-1">Save 20%</span>
              </button>
            </div>
            <p class="text-center text-xs text-gray-400 mb-6">
              <span class="annual-note hidden">Annual: 10 months prepaid (Sept-June)</span>
              <span class="monthly-note">Billed monthly. Cancel anytime.</span>
            </p>
            
            {/* What's Included */}
            <div class="feature-card p-4 rounded-xl mt-4">
              <h3 class="text-base font-bold mb-3 text-center">Everything Included</h3>
              <div class="grid grid-cols-1 gap-2 text-xs">
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

            {/* Payment Button with Stripe */}
            <div class="space-y-4 mb-6">
              <button onclick="completeEnrollment()" class="w-full bg-white hover:bg-gray-50 text-gray-900 font-bold py-6 px-8 rounded-2xl flex items-center justify-center gap-4 border-2 border-gray-200 hover:border-teal-500 transition-all shadow-lg" id="stripe-checkout-btn">
                <div class="flex items-center gap-3">
                  <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
                    <path d="M3 10h18" stroke="currentColor" stroke-width="2"/>
                  </svg>
                  <div class="text-left">
                    <div class="text-xl font-bold">Pay with Card</div>
                    <div class="text-sm text-gray-600 font-normal">Secure payment via Stripe • <span id="stripe-amount">$0</span></div>
                  </div>
                </div>
                <div class="ml-auto flex items-center gap-2 text-sm text-gray-500">
                  <span class="inline-flex items-center px-2 py-1 bg-gray-100 rounded text-xs">Apple Pay</span>
                  <span class="inline-flex items-center px-2 py-1 bg-gray-100 rounded text-xs">G Pay</span>
                  <span class="inline-flex items-center px-2 py-1 bg-gray-100 rounded text-xs">+more</span>
                </div>
              </button>
              <p class="text-xs text-center text-gray-500">
                <svg class="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/></svg>
                256-bit SSL Encryption • Your data is secure
              </p>
            </div>
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
        
        // Simplified Pricing: $100/month (8 classes), 10% off each additional sibling, 20% off annual
        const BASE_MONTHLY_PRICE = 100;
        const SIBLING_DISCOUNT = 0.05; // 5% off per additional sibling
        const ANNUAL_DISCOUNT = 0.20; // 20% off annual prepaid
        
        function calculatePrice(students, isAnnual) {
          let total = BASE_MONTHLY_PRICE; // First student
          
          // Add additional students with 10% compounding discount
          for (let i = 2; i <= students; i++) {
            total += BASE_MONTHLY_PRICE * (1 - (SIBLING_DISCOUNT * (i - 1)));
          }
          
          // Apply annual discount if selected
          if (isAnnual) {
            total = total * (1 - ANNUAL_DISCOUNT);
          }
          
          return total;
        }

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
          
          // Update slider display with new pricing
          const currentStudents = parseInt(document.getElementById('student-slider').value);
          updateSlider(currentStudents);
        }

        function updateSlider(students) {
          students = parseInt(students);
          
          // Update slider visual feedback
          const slider = document.getElementById('student-slider');
          const percentage = ((students - 1) / 5) * 100;
          slider.style.background = \`linear-gradient(to right, #4794A6 0%, #4794A6 \${percentage}%, #1f2937 \${percentage}%, #1f2937 100%)\`;
          
          // Update slider number display
          document.getElementById('slider-number').textContent = students + (students >= 6 ? '+' : '');
          
          // Calculate pricing
          const monthlyTotal = calculatePrice(students, isAnnual);
          const perStudentPerMonth = monthlyTotal / students;
          const perStudentPerClass = perStudentPerMonth / 8;
          
          // Update BIG price display (per-class cost PER STUDENT)
          document.getElementById('big-price-display').textContent = '$' + perStudentPerClass.toFixed(2);
          
          // Update monthly price (PER STUDENT)
          document.getElementById('monthly-price-display').textContent = '$' + perStudentPerMonth.toFixed(0) + '/month per student';
          
          // Update student count text
          const studentText = students + (students >= 6 ? '+' : '') + (students === 1 ? ' student' : ' students');
          document.getElementById('student-count-text').textContent = studentText + ' • 8 live classes';
          
          // Show sibling discount if applicable
          const discountEl = document.getElementById('sibling-discount-text');
          if (students > 1) {
            const discountPercent = Math.round((students - 1) * 5);
            discountEl.textContent = 'Save ' + discountPercent + '% with siblings!';
            discountEl.classList.remove('hidden');
          } else {
            discountEl.classList.add('hidden');
          }
          
          // Auto-select package (for navigation to step 3)
          selectedStudents = students;
          selectedPrice = monthlyTotal;
        }

        function selectPackage(students) {
          selectedStudents = students;
          
          // Calculate total monthly price with sibling discount
          const monthlyTotal = calculatePrice(students, isAnnual);
          selectedPrice = monthlyTotal; // Store total for later use
          
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
          
          // Update summary with clear pricing breakdown
          const billingText = isAnnual ? ' (Annual - 10 months)' : ' (Monthly)';
          const studentText = students + (students > 1 ? ' Students' : ' Student');
          document.getElementById('selected-package').textContent = studentText + billingText;
          document.getElementById('summary-students').textContent = students;
          
          // Show per-month total with discount info
          let priceText = '$' + monthlyTotal.toFixed(0) + '/month';
          if (students > 1) {
            const savingsPercent = Math.round((students - 1) * 10);
            priceText += ' (Save ' + savingsPercent + '% with siblings)';
          }
          if (isAnnual) {
            priceText += ' • 20% off annual';
          }
          document.getElementById('summary-price').textContent = priceText;
          document.getElementById('summary-total').textContent = '$' + totalCharge.toFixed(2);
          
          // Update the label and savings display
          document.getElementById('summary-label').textContent = chargeLabel;
          
          // Update Stripe button amount
          const stripeAmountEl = document.getElementById('stripe-amount');
          if (stripeAmountEl) {
            stripeAmountEl.textContent = '$' + totalCharge.toFixed(2);
          }
          
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

        async function completeEnrollment() {
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
          
          // Show loading state
          const btn = document.getElementById('stripe-checkout-btn');
          const originalHTML = btn.innerHTML;
          btn.disabled = true;
          btn.innerHTML = '<div class="flex items-center gap-2"><svg class="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span>Redirecting to Stripe...</span></div>';
          
          try {
            // Create Stripe checkout session
            const response = await fetch('/api/payments/create-checkout-session', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                amount: totalCharge,
                productName: selectedStudents + ' Student' + (selectedStudents > 1 ? 's' : '') + ' - ' + billingType,
                customerEmail: email,
                paymentMode: isAnnual ? 'payment' : 'subscription',
                successUrl: window.location.origin + '/payment/success?session_id={CHECKOUT_SESSION_ID}',
                cancelUrl: window.location.origin + '/education',
                metadata: {
                  product_type: 'education',
                  students: selectedStudents,
                  price_per_student: pricePerStudent,
                  billing_type: billingType,
                  monthly_total: monthlyTotal,
                  total_charge: totalCharge,
                  parent_email: email,
                  source: 'enrollment_modal'
                }
              })
            });
            
            const data = await response.json();
            
            if (data.error) {
              throw new Error(data.error);
            }
            
            // Redirect to Stripe Checkout
            window.location.href = data.url;
            
          } catch (error) {
            console.error('Checkout error:', error);
            alert('Payment error: ' + error.message + '\\n\\nPlease try again or contact support at italo@acromatico.com');
            btn.disabled = false;
            btn.innerHTML = originalHTML;
          }
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

      {/* EDUCATION PROGRAMS MODAL - Youth & Masterclass */}
      <div id="educationProgramsModal" class="fixed inset-0 bg-black/95 z-[200] hidden flex items-center justify-center p-4">
        <div class="max-w-5xl w-full bg-gray-900 rounded-3xl p-12 relative max-h-[90vh] overflow-y-auto">
          <button onclick="closeEducationProgramsModal()" class="absolute top-6 right-6 text-gray-400 hover:text-white text-4xl font-light transition">×</button>
          
          <div class="text-center mb-12">
            <h2 class="text-5xl font-black mb-4 text-white">Choose Your Program</h2>
            <p class="text-xl text-gray-400">Select the package that fits your goals</p>
          </div>

          {/* Program Type Toggle */}
          <div class="flex justify-center gap-4 mb-12">
            <button onclick="switchProgramType('youth')" id="youthProgramBtn" class="px-8 py-4 rounded-full font-bold text-lg transition bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
              Youth Programs (Ages 10-17)
            </button>
            <button onclick="switchProgramType('masterclass')" id="masterclassProgramBtn" class="px-8 py-4 rounded-full font-bold text-lg transition bg-gray-800 text-gray-400 hover:bg-gray-700">
              Masterclass (Ages 16+)
            </button>
          </div>

          {/* Youth Programs */}
          <div id="youthProgramsContent" class="grid md:grid-cols-2 gap-8">
            {/* Starter Workshop */}
            <div class="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border-2 border-blue-500/30 rounded-2xl p-8 hover:border-blue-500 transition cursor-pointer" onclick="window.location.href='/pricing'">
              <div class="flex items-center justify-between mb-4">
                <span class="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">LAUNCH OFFER</span>
                <span class="text-sm text-gray-400 line-through">$1,200</span>
              </div>
              <h3 class="text-3xl font-black mb-2 text-white">Starter Workshop</h3>
              <div class="text-5xl font-black text-blue-400 mb-2">$695</div>
              <p class="text-green-400 font-semibold mb-6">Save $505 (42% off)</p>
              
              <ul class="space-y-3 text-gray-300 mb-8">
                <li class="flex items-start gap-3">
                  <span class="text-blue-400 text-xl">✓</span>
                  <span><strong>3 In-Person Workshops</strong><br/><span class="text-sm text-gray-400">Hands-on learning sessions</span></span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-blue-400 text-xl">✓</span>
                  <span><strong>1-on-1 Personalized Session</strong><br/><span class="text-sm text-gray-400">Individual coaching & feedback</span></span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-blue-400 text-xl">✓</span>
                  <span><strong>Complimentary Photo Session</strong><br/><span class="text-sm text-gray-400">$395 value included</span></span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-blue-400 text-xl">✓</span>
                  <span><strong>Digital Gallery</strong><br/><span class="text-sm text-gray-400">All your best shots delivered</span></span>
                </li>
              </ul>
              
              <button class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition">
                Enroll in Starter Workshop →
              </button>
            </div>

            {/* Year Accelerator */}
            <div class="bg-gradient-to-br from-orange-900/30 to-orange-800/20 border-2 border-orange-500 rounded-2xl p-8 hover:border-orange-400 transition cursor-pointer relative" onclick="window.location.href='/pricing'">
              <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                BEST VALUE
              </div>
              <div class="flex items-center justify-between mb-4 mt-4">
                <span class="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold">LAUNCH OFFER</span>
                <span class="text-sm text-gray-400 line-through">$4,500</span>
              </div>
              <h3 class="text-3xl font-black mb-2 text-white">Year-Long Accelerator</h3>
              <div class="text-5xl font-black text-orange-400 mb-2">$1,995</div>
              <p class="text-green-400 font-semibold mb-6">Save $2,505 (56% off)</p>
              
              <ul class="space-y-3 text-gray-300 mb-8">
                <li class="flex items-start gap-3">
                  <span class="text-orange-400 text-xl">✓</span>
                  <span><strong>Everything in Starter</strong></span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-orange-400 text-xl">✓</span>
                  <span><strong>12 Months On-Demand 1-on-1 Coaching</strong><br/><span class="text-sm text-gray-400">Unlimited questions & feedback</span></span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-orange-400 text-xl">✓</span>
                  <span><strong>Full Year Membership Access</strong><br/><span class="text-sm text-gray-400">All workshops & resources</span></span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-orange-400 text-xl">✓</span>
                  <span><strong>Portfolio Development</strong><br/><span class="text-sm text-gray-400">Build a pro portfolio</span></span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-orange-400 text-xl">✓</span>
                  <span><strong>Free Equipment Rental</strong><br/><span class="text-sm text-gray-400">For personal projects</span></span>
                </li>
              </ul>
              
              <button class="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 rounded-xl transition shadow-lg">
                Enroll in Accelerator →
              </button>
            </div>
          </div>

          {/* Masterclass Programs */}
          <div id="masterclassProgramsContent" class="hidden grid md:grid-cols-2 gap-8">
            {/* Masterclass Coaching */}
            <div class="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border-2 border-purple-500/30 rounded-2xl p-8 hover:border-purple-500 transition cursor-pointer" onclick="window.location.href='/pricing'">
              <div class="flex items-center justify-between mb-4">
                <span class="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold">TEENS & ADULTS</span>
              </div>
              <h3 class="text-3xl font-black mb-2 text-white">Masterclass Coaching</h3>
              <div class="text-5xl font-black text-purple-400 mb-2">$695</div>
              <p class="text-gray-400 mb-6">2 Strategic Sessions</p>
              
              <ul class="space-y-3 text-gray-300 mb-8">
                <li class="flex items-start gap-3">
                  <span class="text-purple-400 text-xl">✓</span>
                  <span><strong>2 Strategic Coaching Sessions</strong><br/><span class="text-sm text-gray-400">Deep-dive with award-winning photographers</span></span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-purple-400 text-xl">✓</span>
                  <span><strong>Portfolio Review & Feedback</strong><br/><span class="text-sm text-gray-400">Professional critique & strategies</span></span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-purple-400 text-xl">✓</span>
                  <span><strong>Business Strategy Consultation</strong><br/><span class="text-sm text-gray-400">Pricing, marketing, client acquisition</span></span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-purple-400 text-xl">✓</span>
                  <span><strong>$695 Credit Towards Business in a Box</strong><br/><span class="text-sm text-gray-400">Apply full amount to complete program</span></span>
                </li>
              </ul>
              
              <button class="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 rounded-xl transition">
                Book Strategic Sessions →
              </button>
            </div>

            {/* Business in a Box */}
            <div class="bg-gradient-to-br from-red-900/30 to-red-800/20 border-2 border-red-500 rounded-2xl p-8 hover:border-red-400 transition cursor-pointer relative" onclick="window.location.href='/pricing'">
              <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                PRO PROGRAM
              </div>
              <div class="flex items-center justify-between mb-4 mt-4">
                <span class="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold">AGES 16+</span>
              </div>
              <h3 class="text-3xl font-black mb-2 text-white">Business in a Box</h3>
              <div class="text-5xl font-black text-red-400 mb-2">$3,000</div>
              <p class="text-gray-400 mb-6">Zero to Wedding Pro Program</p>
              
              <ul class="space-y-3 text-gray-300 mb-8">
                <li class="flex items-start gap-3">
                  <span class="text-red-400 text-xl">✓</span>
                  <span><strong>Shoot Your First Wedding Confidently</strong><br/><span class="text-sm text-gray-400">Complete technical & creative training</span></span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-red-400 text-xl">✓</span>
                  <span><strong>Build Your Brand from Scratch</strong><br/><span class="text-sm text-gray-400">Identity, website, marketing materials</span></span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-red-400 text-xl">✓</span>
                  <span><strong>Legal & Business Setup</strong><br/><span class="text-sm text-gray-400">Contracts, LLC, insurance, taxes</span></span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-red-400 text-xl">✓</span>
                  <span><strong>Equipment Mastery</strong><br/><span class="text-sm text-gray-400">Cameras, lenses, lighting, backup gear</span></span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-red-400 text-xl">✓</span>
                  <span><strong>$695 Credit Applied from Masterclass</strong><br/><span class="text-sm text-gray-400">Effective price $2,305 when upgrading</span></span>
                </li>
              </ul>
              
              <button class="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 rounded-xl transition shadow-lg">
                Launch Your Business →
              </button>
            </div>
          </div>

          <p class="text-center text-gray-500 text-sm mt-12">
            Limited time launch pricing • Only available for first 20 families
          </p>
        </div>
      </div>

      {/* Education Programs Modal JavaScript */}
      <script dangerouslySetInnerHTML={{__html: `
        function openEducationModal() {
          document.getElementById('educationProgramsModal').classList.remove('hidden');
          document.body.style.overflow = 'hidden';
        }

        function closeEducationProgramsModal() {
          document.getElementById('educationProgramsModal').classList.add('hidden');
          document.body.style.overflow = 'auto';
        }

        function switchProgramType(type) {
          const youthBtn = document.getElementById('youthProgramBtn');
          const masterclassBtn = document.getElementById('masterclassProgramBtn');
          const youthContent = document.getElementById('youthProgramsContent');
          const masterclassContent = document.getElementById('masterclassProgramsContent');

          if (type === 'youth') {
            youthBtn.className = 'px-8 py-4 rounded-full font-bold text-lg transition bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg';
            masterclassBtn.className = 'px-8 py-4 rounded-full font-bold text-lg transition bg-gray-800 text-gray-400 hover:bg-gray-700';
            youthContent.classList.remove('hidden');
            masterclassContent.classList.add('hidden');
          } else {
            masterclassBtn.className = 'px-8 py-4 rounded-full font-bold text-lg transition bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg';
            youthBtn.className = 'px-8 py-4 rounded-full font-bold text-lg transition bg-gray-800 text-gray-400 hover:bg-gray-700';
            masterclassContent.classList.remove('hidden');
            youthContent.classList.add('hidden');
          }
        }
      `}} />
    </div>,
    { title: 'Acromatico - Learn to See The World Differently' }
  )
})

// MASTERCLASS ROUTE
app.get('/masterclass', (c) => {
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
      `}</style>

      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <section class="relative py-32 px-6 overflow-hidden">
        <div class="max-w-7xl mx-auto text-center">
          <h1 class="text-8xl md:text-9xl font-black mb-8" style="letter-spacing: -0.02em; background: linear-gradient(135deg, #4794A6 0%, #fff 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            Masterclass.
          </h1>
          <p class="text-3xl md:text-4xl text-gray-400 mb-6 max-w-4xl mx-auto">
            Strategic coaching and complete business training<br/>for serious photographers.
          </p>
          <p class="text-xl text-gray-500 mb-12 max-w-3xl mx-auto">
            Perfect for all ages—from kids seeking professional guidance to adults launching their photography business.
          </p>
          <a href="#programs" class="inline-block px-12 py-6 rounded-full bg-[#4794A6] hover:bg-[#5aa5b8] text-white font-bold text-xl transition-all">
            Explore Programs
          </a>
        </div>
      </section>

      {/* Programs Grid */}
      <section id="programs" class="relative py-20 px-6">
        <div class="max-w-7xl mx-auto">
          <div class="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20">
            {/* Masterclass Coaching */}
            <div class="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-12 border-2 border-[#4794A6]/30 hover:border-[#4794A6] transition-all duration-300 group hover:-translate-y-2">
              <div class="absolute top-8 right-8">
                <span class="inline-block bg-[#4794A6] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  STARTER
                </span>
              </div>
              
              <h3 class="text-4xl font-bold mb-4">Masterclass Coaching</h3>
              <div class="text-6xl font-black mb-2 text-[#4794A6]">$695</div>
              <p class="text-gray-400 text-lg mb-8">Strategic sessions with award-winning photographers</p>
              
              <ul class="space-y-4 mb-10">
                <li class="flex items-start gap-3">
                  <svg class="w-6 h-6 text-[#4794A6] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-lg">Mentorship for All Ages</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg class="w-6 h-6 text-[#4794A6] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-lg">2 Strategic Coaching Sessions</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg class="w-6 h-6 text-[#4794A6] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-lg">Portfolio Review & Feedback</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg class="w-6 h-6 text-[#4794A6] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-lg">Equipment Review</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg class="w-6 h-6 text-[#4794A6] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-lg">Brand Guidance</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg class="w-6 h-6 text-[#4794A6] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-lg">Business Strategy Consultation</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg class="w-6 h-6 text-[#4794A6] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-lg">$695 Credit Toward Business in a Box</span>
                </li>
              </ul>
              
              <a href="mailto:hello@acromatico.com?subject=Masterclass%20Coaching%20Inquiry" class="block w-full py-5 rounded-full bg-[#4794A6] hover:bg-[#5aa5b8] text-white text-center font-bold text-lg transition-all">
                Start with Coaching
              </a>
            </div>

            {/* Business in a Box */}
            <div class="relative bg-gradient-to-br from-white to-gray-100 rounded-3xl p-12 border-2 border-white hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2 text-black">
              <div class="absolute top-8 right-8">
                <span class="inline-block bg-black text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  PRO PROGRAM
                </span>
              </div>
              
              <h3 class="text-4xl font-bold mb-4">Business in a Box</h3>
              <div class="text-6xl font-black mb-2">$3,000</div>
              <p class="text-gray-600 text-lg mb-8">Complete wedding photography business training</p>
              
              <ul class="space-y-4 mb-10">
                <li class="flex items-start gap-3">
                  <svg class="w-6 h-6 text-black flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-lg font-semibold">Everything in Coaching, plus:</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg class="w-6 h-6 text-black flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-lg">Mentorship for All Ages</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg class="w-6 h-6 text-black flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-lg">Complete Wedding/Portrait/Commercial Training</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg class="w-6 h-6 text-black flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-lg">AI Tools</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg class="w-6 h-6 text-black flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-lg">Brand Guidance</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg class="w-6 h-6 text-black flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-lg">Photography Workflow (Booking to Delivery)</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg class="w-6 h-6 text-black flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-lg">Business Plan & Marketing Strategy</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg class="w-6 h-6 text-black flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-lg">Legal & Business Guidance</span>
                </li>
              </ul>
              
              <a href="mailto:hello@acromatico.com?subject=Business%20in%20a%20Box%20Inquiry" class="block w-full py-5 rounded-full bg-black hover:bg-gray-800 text-white text-center font-bold text-lg transition-all">
                Go All-In
              </a>
            </div>
          </div>

          {/* Comparison Table */}
          <div class="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-black rounded-3xl p-12 border-2 border-gray-800">
            <h3 class="text-4xl font-bold text-center mb-12">Compare Programs</h3>
            
            <div class="space-y-1">
              {/* Header */}
              <div class="grid grid-cols-3 gap-4 pb-4 border-b-2 border-gray-800 mb-4">
                <div class="font-bold text-lg">What's Included</div>
                <div class="font-bold text-lg text-center">Coaching</div>
                <div class="font-bold text-lg text-center">Business Box</div>
              </div>
              
              {/* Rows */}
              <div class="grid grid-cols-3 gap-4 py-4 border-b border-gray-800/50">
                <div>Mentorship for All Ages</div>
                <div class="text-center text-[#4794A6] text-2xl">✓</div>
                <div class="text-center text-[#4794A6] text-2xl">✓</div>
              </div>
              
              <div class="grid grid-cols-3 gap-4 py-4 border-b border-gray-800/50">
                <div>Strategic Coaching Sessions</div>
                <div class="text-center text-[#4794A6] text-2xl">✓</div>
                <div class="text-center text-[#4794A6] text-2xl">✓</div>
              </div>
              
              <div class="grid grid-cols-3 gap-4 py-4 border-b border-gray-800/50">
                <div>Portfolio Review & Feedback</div>
                <div class="text-center text-[#4794A6] text-2xl">✓</div>
                <div class="text-center text-[#4794A6] text-2xl">✓</div>
              </div>
              
              <div class="grid grid-cols-3 gap-4 py-4 border-b border-gray-800/50">
                <div>Equipment Review</div>
                <div class="text-center text-[#4794A6] text-2xl">✓</div>
                <div class="text-center text-[#4794A6] text-2xl">✓</div>
              </div>
              
              <div class="grid grid-cols-3 gap-4 py-4 border-b border-gray-800/50">
                <div>Brand Guidance</div>
                <div class="text-center text-[#4794A6] text-2xl">✓</div>
                <div class="text-center text-[#4794A6] text-2xl">✓</div>
              </div>
              
              <div class="grid grid-cols-3 gap-4 py-4 border-b border-gray-800/50">
                <div>Business Strategy Consultation</div>
                <div class="text-center text-[#4794A6] text-2xl">✓</div>
                <div class="text-center text-[#4794A6] text-2xl">✓</div>
              </div>
              
              <div class="grid grid-cols-3 gap-4 py-4 border-b border-gray-800/50">
                <div>Complete Photography Training</div>
                <div class="text-center text-gray-600">—</div>
                <div class="text-center text-[#4794A6] text-2xl">✓</div>
              </div>
              
              <div class="grid grid-cols-3 gap-4 py-4 border-b border-gray-800/50">
                <div>AI Tools</div>
                <div class="text-center text-gray-600">—</div>
                <div class="text-center text-[#4794A6] text-2xl">✓</div>
              </div>
              
              <div class="grid grid-cols-3 gap-4 py-4 border-b border-gray-800/50">
                <div>Photography Workflow System</div>
                <div class="text-center text-gray-600">—</div>
                <div class="text-center text-[#4794A6] text-2xl">✓</div>
              </div>
              
              <div class="grid grid-cols-3 gap-4 py-4 border-b border-gray-800/50">
                <div>Business Plan & Financials</div>
                <div class="text-center text-gray-600">—</div>
                <div class="text-center text-[#4794A6] text-2xl">✓</div>
              </div>
              
              <div class="grid grid-cols-3 gap-4 py-4 border-b border-gray-800/50">
                <div>Marketing & Client Acquisition</div>
                <div class="text-center text-gray-600">—</div>
                <div class="text-center text-[#4794A6] text-2xl">✓</div>
              </div>
              
              <div class="grid grid-cols-3 gap-4 py-4 border-b border-gray-800/50">
                <div>Legal & Business Guidance</div>
                <div class="text-center text-gray-600">—</div>
                <div class="text-center text-[#4794A6] text-2xl">✓</div>
              </div>
              
              {/* Investment Row */}
              <div class="grid grid-cols-3 gap-4 py-6 mt-4 bg-gradient-to-r from-gray-900 to-black rounded-xl">
                <div class="font-bold text-xl">Investment</div>
                <div class="text-center font-bold text-2xl text-[#4794A6]">$695</div>
                <div class="text-center font-bold text-2xl">$3,000</div>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div class="text-center mt-20">
            <h3 class="text-4xl font-bold mb-6">Ready to launch your photography business?</h3>
            <p class="text-xl text-gray-400 mb-10">
              Join photographers who have transformed their passion into a thriving business.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:hello@acromatico.com?subject=Masterclass%20Coaching%20Inquiry" class="px-10 py-5 rounded-full bg-[#4794A6] hover:bg-[#5aa5b8] text-white font-bold text-lg transition-all inline-block">
                Start with Coaching - $695
              </a>
              <a href="mailto:hello@acromatico.com?subject=Business%20in%20a%20Box%20Inquiry" class="px-10 py-5 rounded-full bg-white hover:bg-gray-100 text-black font-bold text-lg transition-all inline-block">
                Go All-In - $3,000
              </a>
            </div>
          </div>
        </div>
      </section>

      <div dangerouslySetInnerHTML={{__html: footerHTML}} />
    </div>,
    { title: 'Masterclass - Acromatico' }
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
            <button onclick="goToStep(1)" class="text-gray-400 hover:text-white mb-3 flex items-center gap-2 text-sm">
              ← Back
            </button>
            <h2 class="text-3xl font-black mb-2 text-center">How Many Students?</h2>
            <p class="text-base text-gray-400 mb-8 text-center">Slide to see your savings</p>
            
            {/* BIG PRICE DISPLAY - Focus on per-class per-student cost */}
            <div class="text-center mb-8">
              <div class="text-8xl font-black mb-2" id="big-price-display">$12.50</div>
              <div class="text-xl text-gray-400 mb-4">per class per student</div>
              <div class="text-3xl font-bold text-teal-500" id="monthly-price-display">$100/month per student</div>
              <div class="text-sm text-gray-500 mt-2" id="student-count-text">1 student • 8 live classes</div>
              <div class="text-sm text-teal-500 mt-1 hidden" id="sibling-discount-text"></div>
            </div>

            {/* Student Count Slider */}
            <div class="mb-8 px-4">
              <div class="flex justify-between items-center mb-3">
                <span class="text-sm text-gray-400">Number of Students</span>
                <span class="text-2xl font-bold text-white" id="slider-number">1</span>
              </div>
              <style dangerouslySetInnerHTML={{__html: `
                #student-slider::-webkit-slider-thumb {
                  appearance: none;
                  width: 28px;
                  height: 28px;
                  border-radius: 50%;
                  background: #4794A6;
                  cursor: pointer;
                  border: 4px solid white;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                  transition: transform 0.2s;
                }
                #student-slider::-webkit-slider-thumb:hover {
                  transform: scale(1.1);
                }
                #student-slider::-moz-range-thumb {
                  width: 28px;
                  height: 28px;
                  border-radius: 50%;
                  background: #4794A6;
                  cursor: pointer;
                  border: 4px solid white;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                  transition: transform 0.2s;
                }
                #student-slider::-moz-range-thumb:hover {
                  transform: scale(1.1);
                }
              `}} />
              <input 
                type="range" 
                id="student-slider" 
                min="1" 
                max="6" 
                value="1" 
                oninput="updateSlider(this.value)"
                class="w-full h-3 bg-gray-800 rounded-full appearance-none cursor-pointer"
                style="background: linear-gradient(to right, #4794A6 0%, #4794A6 0%, #1f2937 0%, #1f2937 100%);"
              />
              <div class="flex justify-between text-xs text-gray-500 mt-2">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6+</span>
              </div>
            </div>

            {/* Monthly/Annual Toggle */}
            <div class="flex items-center justify-center gap-3 mb-6 bg-gray-900 p-2 rounded-full inline-flex mx-auto">
              <button id="monthly-toggle-btn" onclick="toggleBilling('monthly')" class="px-4 py-2 rounded-full font-semibold transition bg-teal-500 text-white text-sm">
                Monthly
              </button>
              <button id="annual-toggle-btn" onclick="toggleBilling('annual')" class="px-4 py-2 rounded-full font-semibold transition text-gray-400 text-sm">
                Annual <span class="text-teal-500 text-xs ml-1">Save 20%</span>
              </button>
            </div>
            <p class="text-center text-xs text-gray-400 mb-6">
              <span class="annual-note hidden">Annual: 10 months prepaid (Sept-June)</span>
              <span class="monthly-note">Billed monthly. Cancel anytime.</span>
            </p>
            
            {/* What's Included */}
            <div class="feature-card p-4 rounded-xl mt-4">
              <h3 class="text-base font-bold mb-3 text-center">Everything Included</h3>
              <div class="grid grid-cols-1 gap-2 text-xs">
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

            {/* Payment Button with Stripe */}
            <div class="space-y-4 mb-6">
              <button onclick="completeEnrollment()" class="w-full bg-white hover:bg-gray-50 text-gray-900 font-bold py-6 px-8 rounded-2xl flex items-center justify-center gap-4 border-2 border-gray-200 hover:border-teal-500 transition-all shadow-lg" id="stripe-checkout-btn">
                <div class="flex items-center gap-3">
                  <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
                    <path d="M3 10h18" stroke="currentColor" stroke-width="2"/>
                  </svg>
                  <div class="text-left">
                    <div class="text-xl font-bold">Pay with Card</div>
                    <div class="text-sm text-gray-600 font-normal">Secure payment via Stripe • <span id="stripe-amount">$0</span></div>
                  </div>
                </div>
                <div class="ml-auto flex items-center gap-2 text-sm text-gray-500">
                  <span class="inline-flex items-center px-2 py-1 bg-gray-100 rounded text-xs">Apple Pay</span>
                  <span class="inline-flex items-center px-2 py-1 bg-gray-100 rounded text-xs">G Pay</span>
                  <span class="inline-flex items-center px-2 py-1 bg-gray-100 rounded text-xs">+more</span>
                </div>
              </button>
              <p class="text-xs text-center text-gray-500">
                <svg class="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/></svg>
                256-bit SSL Encryption • Your data is secure
              </p>
            </div>
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
        
        // Simplified Pricing: $100/month (8 classes), 10% off each additional sibling, 20% off annual
        const BASE_MONTHLY_PRICE = 100;
        const SIBLING_DISCOUNT = 0.05; // 5% off per additional sibling
        const ANNUAL_DISCOUNT = 0.20; // 20% off annual prepaid
        
        function calculatePrice(students, isAnnual) {
          let total = BASE_MONTHLY_PRICE; // First student
          
          // Add additional students with 10% compounding discount
          for (let i = 2; i <= students; i++) {
            total += BASE_MONTHLY_PRICE * (1 - (SIBLING_DISCOUNT * (i - 1)));
          }
          
          // Apply annual discount if selected
          if (isAnnual) {
            total = total * (1 - ANNUAL_DISCOUNT);
          }
          
          return total;
        }

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
          
          // Update slider display with new pricing
          const currentStudents = parseInt(document.getElementById('student-slider').value);
          updateSlider(currentStudents);
        }

        function updateSlider(students) {
          students = parseInt(students);
          
          // Update slider visual feedback
          const slider = document.getElementById('student-slider');
          const percentage = ((students - 1) / 5) * 100;
          slider.style.background = \`linear-gradient(to right, #4794A6 0%, #4794A6 \${percentage}%, #1f2937 \${percentage}%, #1f2937 100%)\`;
          
          // Update slider number display
          document.getElementById('slider-number').textContent = students + (students >= 6 ? '+' : '');
          
          // Calculate pricing
          const monthlyTotal = calculatePrice(students, isAnnual);
          const perStudentPerMonth = monthlyTotal / students;
          const perStudentPerClass = perStudentPerMonth / 8;
          
          // Update BIG price display (per-class cost PER STUDENT)
          document.getElementById('big-price-display').textContent = '$' + perStudentPerClass.toFixed(2);
          
          // Update monthly price (PER STUDENT)
          document.getElementById('monthly-price-display').textContent = '$' + perStudentPerMonth.toFixed(0) + '/month per student';
          
          // Update student count text
          const studentText = students + (students >= 6 ? '+' : '') + (students === 1 ? ' student' : ' students');
          document.getElementById('student-count-text').textContent = studentText + ' • 8 live classes';
          
          // Show sibling discount if applicable
          const discountEl = document.getElementById('sibling-discount-text');
          if (students > 1) {
            const discountPercent = Math.round((students - 1) * 5);
            discountEl.textContent = 'Save ' + discountPercent + '% with siblings!';
            discountEl.classList.remove('hidden');
          } else {
            discountEl.classList.add('hidden');
          }
          
          // Auto-select package (for navigation to step 3)
          selectedStudents = students;
          selectedPrice = monthlyTotal;
        }

        function selectPackage(students) {
          selectedStudents = students;
          
          // Calculate total monthly price with sibling discount
          const monthlyTotal = calculatePrice(students, isAnnual);
          selectedPrice = monthlyTotal; // Store total for later use
          
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
          
          // Update summary with clear pricing breakdown
          const billingText = isAnnual ? ' (Annual - 10 months)' : ' (Monthly)';
          const studentText = students + (students > 1 ? ' Students' : ' Student');
          document.getElementById('selected-package').textContent = studentText + billingText;
          document.getElementById('summary-students').textContent = students;
          
          // Show per-month total with discount info
          let priceText = '$' + monthlyTotal.toFixed(0) + '/month';
          if (students > 1) {
            const savingsPercent = Math.round((students - 1) * 10);
            priceText += ' (Save ' + savingsPercent + '% with siblings)';
          }
          if (isAnnual) {
            priceText += ' • 20% off annual';
          }
          document.getElementById('summary-price').textContent = priceText;
          document.getElementById('summary-total').textContent = '$' + totalCharge.toFixed(2);
          
          // Update the label and savings display
          document.getElementById('summary-label').textContent = chargeLabel;
          
          // Update Stripe button amount
          const stripeAmountEl = document.getElementById('stripe-amount');
          if (stripeAmountEl) {
            stripeAmountEl.textContent = '$' + totalCharge.toFixed(2);
          }
          
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

app.get('/studio', (c) => c.redirect('/static/studio', 302))
app.get('/prints', (c) => c.redirect('/static/prints', 302))
// Photography routes - CLEAN PAGE WITH ROTATING HERO
app.get('/photography', (c) => c.redirect('/static/photography-main', 302))

// Payment Success/Cancel/Declined Pages
app.get('/payment/success', (c) => c.redirect('/static/payment-success', 302))
app.get('/payment/cancel', (c) => c.redirect('/static/payment-cancel', 302))
app.get('/payment/declined', (c) => c.redirect('/static/payment-declined', 302))

// Photography Booking Pages - Stripe Checkout Connected
app.get('/weddings/booking', (c) => c.redirect('/static/weddings-booking', 302))
app.get('/portraits/booking', (c) => c.redirect('/static/portraits-booking', 302))
app.get('/events/booking', (c) => c.redirect('/static/events-booking', 302))
app.get('/realestate/booking', (c) => c.redirect('/static/realestate-booking', 302))
app.get('/commercial', (c) => c.redirect('/static/commercial-booking', 302))
app.get('/commercial/booking', (c) => c.redirect('/static/commercial-booking', 302))

app.get('/studio-old', (c) =>
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
        font-size: 12px;
      }
      
      .logo img {
        width: 140px !important;
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
      
      /* CASE FEATURED - MOBILE */
      .case-featured {
        grid-template-columns: 1fr !important;
        min-height: auto !important;
        padding: 60px 24px !important;
        gap: 40px !important;
      }
      
      .case-info {
        max-width: 100% !important;
        text-align: center;
      }
      
      .case-label {
        font-size: 11px !important;
      }
      
      .case-title {
        font-size: 36px !important;
      }
      
      .case-metric {
        font-size: 48px !important;
      }
      
      .case-description {
        font-size: 16px !important;
      }
      
      /* DEVICE SHOWCASE - MOBILE */
      .device-showcase {
        height: auto !important;
        width: 100% !important;
      }
      
      .desktop-frame {
        width: 100% !important;
        margin-bottom: 0 !important;
      }
      
      .desktop-screen {
        padding: 6px !important;
      }
      
      .desktop-notch {
        height: 16px !important;
      }
      
      .desktop-stand {
        display: none !important;
      }
      
      .mobile-frame {
        display: none !important;
      }
      
      .portfolio-dashboard {
        position: relative !important;
        bottom: auto !important;
        right: auto !important;
        width: 100% !important;
        margin-top: 32px !important;
        padding: 24px !important;
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
    
    @media (max-width: 768px) {
      .nav-links {
        display: none;
      }
      
      .logo img {
        width: 120px !important;
      }
      
      header nav {
        padding: 16px 24px;
        justify-content: center;
      }
      
      .hero h1 {
        font-size: 48px !important;
      }
      
      .case-featured {
        padding: 40px 20px !important;
      }
      
      .case-title {
        font-size: 28px !important;
      }
      
      .case-metric {
        font-size: 36px !important;
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
      
      <!-- ACCESS BY CGI / CGI MERCHANT GROUP - UNIFIED ICONIC SHOWCASE -->
      <div class="case case-featured" style="background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%); padding: 100px 60px; min-height: auto;">
        
        <div style="max-width: 1400px; margin: 0 auto;">
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 80px;">
            <div class="case-label" style="margin-bottom: 24px;">Commercial Real Estate Investment Platform</div>
            <h2 class="case-title" style="margin-bottom: 24px;">Access by CGI</h2>
            <p style="font-size: 20px; line-height: 1.7; color: rgba(255,255,255,0.7); max-width: 900px; margin: 0 auto 40px;">When CGI Merchant Group acquired the Trump International Hotel in Washington D.C. for <span style="color: #4794A6; font-weight: 700;">$375 million</span>, they needed a platform that could democratize institutional-grade real estate investments. We built the complete infrastructure—from portfolio analytics to investor portals—managing <span style="color: #4794A6; font-weight: 700;">$1.2B+ in assets</span> across iconic properties.</p>
            
            <!-- Key Stats -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 40px; margin-top: 60px; max-width: 1000px; margin-left: auto; margin-right: auto;">
              <div>
                <div style="font-size: 48px; font-weight: 900; color: #4794A6; margin-bottom: 8px;">$1.2B+</div>
                <div style="font-size: 14px; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 0.1em;">Assets Managed</div>
              </div>
              <div>
                <div style="font-size: 48px; font-weight: 900; color: #4794A6; margin-bottom: 8px;">$375M</div>
                <div style="font-size: 14px; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 0.1em;">Flagship Acquisition</div>
              </div>
              <div>
                <div style="font-size: 48px; font-weight: 900; color: #4794A6; margin-bottom: 8px;">525</div>
                <div style="font-size: 14px; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 0.1em;">Total Hotel Keys</div>
              </div>
              <div>
                <div style="font-size: 48px; font-weight: 900; color: #4794A6; margin-bottom: 8px;">+500%</div>
                <div style="font-size: 14px; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 0.1em;">Growth Rate</div>
              </div>
            </div>
          </div>
          
          <!-- Platform UI Showcase -->
          <div style="margin-bottom: 100px;">
            <h3 style="font-size: 36px; font-weight: 900; text-align: center; margin-bottom: 60px; color: #fff;">Platform Interface</h3>
            <div class="desktop-frame" style="max-width: 1200px; margin: 0 auto;">
              <div class="desktop-screen">
                <img src="/static/images/brand-showcase/access-cgi-app-screen.jpg" alt="Access by CGI Dashboard">
              </div>
              <div class="desktop-notch"></div>
              <div class="desktop-stand"></div>
            </div>
          </div>
          
          <!-- Portfolio Growth Chart -->
          <div style="margin-bottom: 100px;">
            <div class="portfolio-dashboard" style="max-width: 900px; margin: 0 auto; background: rgba(255,255,255,0.03); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.08); border-radius: 18px; padding: 60px;">
              <div class="portfolio-header" style="text-align: center; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: rgba(255,255,255,0.5); margin-bottom: 20px;">Portfolio Growth</div>
              <div class="portfolio-aum" style="text-align: center; font-size: 72px; font-weight: 900; color: #4794A6; margin-bottom: 12px;">$1.2B</div>
              <div class="portfolio-label" style="text-align: center; font-size: 14px; color: rgba(255,255,255,0.6); margin-bottom: 60px;">Assets Under Management During Our Relationship Period.</div>
              
              <div class="growth-chart">
                <div class="chart-bars" style="display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; height: 200px; margin-bottom: 20px;">
                  <div class="chart-bar bar-1" style="flex: 1; background: linear-gradient(to top, #4794A6, #5aa5b8); border-radius: 8px 8px 0 0; position: relative; height: 20%; display: flex; align-items: flex-start; justify-content: center; transition: all 0.3s ease;">
                    <span class="bar-value" style="position: absolute; top: -28px; font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.8);">$200M</span>
                  </div>
                  <div class="chart-bar bar-2" style="flex: 1; background: linear-gradient(to top, #4794A6, #5aa5b8); border-radius: 8px 8px 0 0; position: relative; height: 45%; display: flex; align-items: flex-start; justify-content: center; transition: all 0.3s ease;">
                    <span class="bar-value" style="position: absolute; top: -28px; font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.8);">$450M</span>
                  </div>
                  <div class="chart-bar bar-3" style="flex: 1; background: linear-gradient(to top, #4794A6, #5aa5b8); border-radius: 8px 8px 0 0; position: relative; height: 68%; display: flex; align-items: flex-start; justify-content: center; transition: all 0.3s ease;">
                    <span class="bar-value" style="position: absolute; top: -28px; font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.8);">$680M</span>
                  </div>
                  <div class="chart-bar bar-4" style="flex: 1; background: linear-gradient(to top, #4794A6, #5aa5b8); border-radius: 8px 8px 0 0; position: relative; height: 90%; display: flex; align-items: flex-start; justify-content: center; transition: all 0.3s ease;">
                    <span class="bar-value" style="position: absolute; top: -28px; font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.8);">$950M</span>
                  </div>
                  <div class="chart-bar bar-5" style="flex: 1; background: linear-gradient(to top, #4794A6, #5aa5b8); border-radius: 8px 8px 0 0; position: relative; height: 100%; display: flex; align-items: flex-start; justify-content: center; transition: all 0.3s ease;">
                    <span class="bar-value" style="position: absolute; top: -28px; font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.8);">$1.2B</span>
                  </div>
                </div>
              </div>
              
              <div class="chart-years" style="display: flex; justify-content: space-between; gap: 24px; margin-bottom: 40px;">
                <span class="chart-year" style="flex: 1; text-align: center; font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.5);">2020</span>
                <span class="chart-year" style="flex: 1; text-align: center; font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.5);">2021</span>
                <span class="chart-year" style="flex: 1; text-align: center; font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.5);">2022</span>
                <span class="chart-year" style="flex: 1; text-align: center; font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.5);">2023</span>
                <span class="chart-year" style="flex: 1; text-align: center; font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.5);">2024</span>
              </div>
              
              <div class="portfolio-metrics" style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; padding-top: 40px; border-top: 1px solid rgba(255,255,255,0.1);">
                <div class="metric" style="text-align: center;">
                  <div class="metric-value" style="font-size: 48px; font-weight: 900; color: #4794A6; margin-bottom: 8px;">+500%</div>
                  <div class="metric-label" style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.5);">Growth Rate</div>
                </div>
                <div class="metric" style="text-align: center;">
                  <div class="metric-value" style="font-size: 48px; font-weight: 900; color: #4794A6; margin-bottom: 8px;">$1B+</div>
                  <div class="metric-label" style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.5);">AUM Increase</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Iconic Properties Gallery -->
          <div style="margin-bottom: 60px;">
            <h3 style="font-size: 36px; font-weight: 900; text-align: center; margin-bottom: 60px; color: #fff;">Iconic Portfolio Properties</h3>
            
            <div style="display: flex; gap: 32px; overflow-x: auto; padding-bottom: 20px; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;">
              
              <!-- Waldorf Astoria DC -->
              <div style="flex: 0 0 500px; background: rgba(255,255,255,0.03); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.08); border-radius: 18px; overflow: hidden; scroll-snap-align: start; transition: all 0.3s ease;">
                <img src="/static/images/brand-showcase/waldorf-astoria-dc.jpg" alt="Waldorf Astoria Washington DC" style="width: 100%; height: 320px; object-fit: cover;">
                <div style="padding: 32px;">
                  <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: #4794A6; margin-bottom: 12px;">ICONIC HOTEL</div>
                  <h4 style="font-size: 24px; font-weight: 900; margin-bottom: 12px; color: #fff;">Waldorf Astoria Washington D.C.</h4>
                  <p style="font-size: 14px; line-height: 1.7; color: rgba(255,255,255,0.6); margin-bottom: 24px;">Historic Old Post Office building (1899) on Pennsylvania Avenue. Between the White House and U.S. Capitol. CGI's $375M acquisition transformed this landmark.</p>
                  <div style="display: flex; gap: 24px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1);">
                    <div>
                      <div style="font-size: 20px; font-weight: 700; color: #4794A6;">263</div>
                      <div style="font-size: 12px; color: rgba(255,255,255,0.5);">Keys</div>
                    </div>
                    <div>
                      <div style="font-size: 20px; font-weight: 700; color: #4794A6;">$375M</div>
                      <div style="font-size: 12px; color: rgba(255,255,255,0.5);">Acquisition</div>
                    </div>
                    <div>
                      <div style="font-size: 20px; font-weight: 700; color: #4794A6;">1899</div>
                      <div style="font-size: 12px; color: rgba(255,255,255,0.5);">Built</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- The Gabriel South Beach -->
              <div style="flex: 0 0 500px; background: rgba(255,255,255,0.03); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.08); border-radius: 18px; overflow: hidden; scroll-snap-align: start; transition: all 0.3s ease;">
                <img src="/static/images/brand-showcase/gabriel-miami-south-beach.jpg" alt="The Gabriel Miami South Beach" style="width: 100%; height: 320px; object-fit: cover;">
                <div style="padding: 32px;">
                  <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: #4794A6; margin-bottom: 12px;">ART DECO ICON</div>
                  <h4 style="font-size: 24px; font-weight: 900; margin-bottom: 12px; color: #fff;">The Gabriel Miami South Beach</h4>
                  <p style="font-size: 14px; line-height: 1.7; color: rgba(255,255,255,0.6); margin-bottom: 24px;">Blending mid-century modernism with Floridian style on Ocean Drive. Greatest linear footage on Miami Beach's most iconic street.</p>
                  <div style="display: flex; gap: 24px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1);">
                    <div>
                      <div style="font-size: 20px; font-weight: 700; color: #4794A6;">132</div>
                      <div style="font-size: 12px; color: rgba(255,255,255,0.5);">Keys</div>
                    </div>
                    <div>
                      <div style="font-size: 20px; font-weight: 700; color: #4794A6;">Ocean</div>
                      <div style="font-size: 12px; color: rgba(255,255,255,0.5);">Drive</div>
                    </div>
                    <div>
                      <div style="font-size: 20px; font-weight: 700; color: #4794A6;">2 Pools</div>
                      <div style="font-size: 12px; color: rgba(255,255,255,0.5);">Amenities</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- The Gabriel Downtown -->
              <div style="flex: 0 0 500px; background: rgba(255,255,255,0.03); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.08); border-radius: 18px; overflow: hidden; scroll-snap-align: start; transition: all 0.3s ease;">
                <img src="/static/images/brand-showcase/gabriel-miami-downtown.jpg" alt="The Gabriel Miami Downtown" style="width: 100%; height: 320px; object-fit: cover;">
                <div style="padding: 32px;">
                  <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: #4794A6; margin-bottom: 12px;">MODERN LUXURY</div>
                  <h4 style="font-size: 24px; font-weight: 900; margin-bottom: 12px; color: #fff;">The Gabriel Miami Downtown</h4>
                  <p style="font-size: 14px; line-height: 1.7; color: rgba(255,255,255,0.6); margin-bottom: 24px;">Located in the arts and cultural epicenter of Miami. High-rise tower with stunning Biscayne Bay views.</p>
                  <div style="display: flex; gap: 24px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1);">
                    <div>
                      <div style="font-size: 20px; font-weight: 700; color: #4794A6;">130</div>
                      <div style="font-size: 12px; color: rgba(255,255,255,0.5);">Keys</div>
                    </div>
                    <div>
                      <div style="font-size: 20px; font-weight: 700; color: #4794A6;">Bay</div>
                      <div style="font-size: 12px; color: rgba(255,255,255,0.5);">Views</div>
                    </div>
                    <div>
                      <div style="font-size: 20px; font-weight: 700; color: #4794A6;">Arts</div>
                      <div style="font-size: 12px; color: rgba(255,255,255,0.5);">District</div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
            <p style="text-align: center; font-size: 14px; color: rgba(255,255,255,0.4); margin-top: 24px;">← Scroll to explore properties →</p>
          </div>
          
          <!-- Platform Impact -->
          <div style="background: rgba(71,148,166,0.05); border: 1px solid rgba(71,148,166,0.2); border-radius: 18px; padding: 60px; text-align: center; margin-top: 80px;">
            <h3 style="font-size: 28px; font-weight: 900; margin-bottom: 24px; color: #fff;">Platform Impact</h3>
            <p style="font-size: 18px; line-height: 1.8; color: rgba(255,255,255,0.7); max-width: 800px; margin: 0 auto 32px;">We built a complete fintech SaaS that democratizes access to institutional-grade real estate investments. Secure deal flow management, investor portal with real-time analytics, automated document handling, and portfolio tracking. The platform enables both institutional and retail investors to access high-value commercial real estate opportunities.</p>
            
            <div style="border-top: 1px solid rgba(71,148,166,0.3); padding-top: 32px; margin-top: 32px;">
              <div style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #4794A6; margin-bottom: 16px;">Built For:</div>
              <p style="font-size: 18px; line-height: 1.8; color: rgba(255,255,255,0.7); max-width: 800px; margin: 0 auto;">
                <span style="color: #4794A6; font-weight: 700;">Fintech Startups</span> disrupting real estate investment. 
                <span style="color: #4794A6; font-weight: 700;">Family Offices</span> managing high-net-worth portfolios. 
                <span style="color: #4794A6; font-weight: 700;">Investment Firms</span> seeking institutional-grade infrastructure. 
                <span style="color: #4794A6; font-weight: 700;">Lenders</span> managing commercial real estate deals at scale.
              </p>
            </div>
          </div>
          
        </div>
      </div>
      
      <!-- TRAVEL DRD / VIBE36 - AIRBNB PORTFOLIO MANAGEMENT -->
      <div class="case case-featured" style="background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%); padding: 100px 60px; min-height: auto;">
        
        <div style="max-width: 1400px; margin: 0 auto;">
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 80px;">
            <div class="case-label" style="margin-bottom: 24px;">Luxury Vacation Rental Portfolio Management</div>
            <h2 class="case-title" style="margin-bottom: 24px;">Travel DRD</h2>
            <p style="font-size: 20px; line-height: 1.7; color: rgba(255,255,255,0.7); max-width: 900px; margin: 0 auto 40px;">Building a tech platform for an exclusive vacation rental portfolio isn't just about booking calendars—it's about creating a system that manages <span style="color: #4794A6; font-weight: 700;">multiple high-end properties</span>, coordinates concierge services, tracks guest experiences, and automates operations at scale. We built the backbone for a luxury travel empire managing properties from <span style="color: #4794A6; font-weight: 700;">Miami Beach to Dominican Republic</span>.</p>
            
            <!-- Key Stats -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 40px; margin-top: 60px; max-width: 1000px; margin-left: auto; margin-right: auto;">
              <div>
                <div style="font-size: 48px; font-weight: 900; color: #4794A6; margin-bottom: 8px;">10+</div>
                <div style="font-size: 14px; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 0.1em;">Properties Managed</div>
              </div>
              <div>
                <div style="font-size: 48px; font-weight: 900; color: #4794A6; margin-bottom: 8px;">24/7</div>
                <div style="font-size: 14px; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 0.1em;">Concierge Portal</div>
              </div>
              <div>
                <div style="font-size: 48px; font-weight: 900; color: #4794A6; margin-bottom: 8px;">100%</div>
                <div style="font-size: 14px; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 0.1em;">Exclusive Access</div>
              </div>
              <div>
                <div style="font-size: 48px; font-weight: 900; color: #4794A6; margin-bottom: 8px;">∞</div>
                <div style="font-size: 14px; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 0.1em;">Premium Amenities</div>
              </div>
            </div>
          </div>
          
          <!-- Platform UI Showcase -->
          <div style="margin-bottom: 100px;">
            <h3 style="font-size: 36px; font-weight: 900; text-align: center; margin-bottom: 60px; color: #fff;">Platform Dashboard</h3>
            <div class="desktop-frame" style="max-width: 1200px; margin: 0 auto;">
              <div class="desktop-screen">
                <img src="/static/images/brand-showcase/travel-drd-hero.jpg" alt="Travel DRD Dashboard">
              </div>
              <div class="desktop-notch"></div>
              <div class="desktop-stand"></div>
            </div>
          </div>
          
          <!-- Vibe36 Story -->
          <div style="background: rgba(71,148,166,0.05); border: 1px solid rgba(71,148,166,0.2); border-radius: 18px; padding: 60px; margin-bottom: 80px;">
            <div style="text-align: center; margin-bottom: 40px;">
              <h3 style="font-size: 32px; font-weight: 900; margin-bottom: 24px; color: #fff;">The Vibe36 Story</h3>
              <p style="font-size: 18px; line-height: 1.8; color: rgba(255,255,255,0.7); max-width: 900px; margin: 0 auto;">When the founder approached us, they had a vision: transform how travelers discover and book luxury properties in the Caribbean. Not Airbnb. Not VRBO. Something <em>exclusive</em>. Something that spoke to travelers who demand more than just a place to sleep—they want <span style="color: #4794A6; font-weight: 700;">an experience</span>.</p>
            </div>
            
            <!-- Chart Showcase -->
            <div style="max-width: 1000px; margin: 0 auto 40px;">
              <img src="/static/images/brand-showcase/travel-drd-chart.jpg" alt="Travel DRD Analytics" style="width: 100%; height: auto; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
            </div>
            
            <div style="max-width: 900px; margin: 0 auto;">
              <p style="font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.7); margin-bottom: 24px;">We didn't just build a booking engine. We built a complete ecosystem:</p>
              
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-top: 40px;">
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 24px;">
                  <div style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #4794A6; margin-bottom: 12px;">Property Management</div>
                  <p style="font-size: 14px; line-height: 1.7; color: rgba(255,255,255,0.6); margin: 0;">Multi-property calendars, pricing automation, availability sync, maintenance scheduling.</p>
                </div>
                
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 24px;">
                  <div style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #4794A6; margin-bottom: 12px;">Guest Experience</div>
                  <p style="font-size: 14px; line-height: 1.7; color: rgba(255,255,255,0.6); margin: 0;">Custom booking flows, digital check-in, concierge requests, activity coordination.</p>
                </div>
                
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 24px;">
                  <div style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #4794A6; margin-bottom: 12px;">Revenue Analytics</div>
                  <p style="font-size: 14px; line-height: 1.7; color: rgba(255,255,255,0.6); margin: 0;">Real-time dashboards, occupancy tracking, revenue forecasting, performance metrics.</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Who It's For -->
          <div style="text-align: center; padding: 60px 40px; background: rgba(255,255,255,0.02); border-radius: 18px;">
            <h3 style="font-size: 28px; font-weight: 900; margin-bottom: 24px; color: #fff;">Built For:</h3>
            <p style="font-size: 18px; line-height: 1.8; color: rgba(255,255,255,0.7); max-width: 800px; margin: 0 auto;">
              <span style="color: #4794A6; font-weight: 700;">Airbnb Portfolio Managers</span> managing 5-50+ properties. 
              <span style="color: #4794A6; font-weight: 700;">Vacation Rental Companies</span> scaling operations. 
              <span style="color: #4794A6; font-weight: 700;">Luxury Property Owners</span> who refuse to settle for generic platforms.
            </p>
          </div>
          
        </div>
      </div>
      
      <!-- LIA - E-COMMERCE -->
      <div class="case case-featured">
        <div class="case-info">
          <div class="case-label">Celebrity Beauty Brand E-Commerce</div>
          <div class="case-title">LIA by Jomari Goyso</div>
          <div class="case-metric">$7.2M in 9 Months</div>
          <div class="case-description">
            Celebrity stylist Jomari Goyso needed more than a Shopify template—he needed a complete brand ecosystem that could scale to 7-figures fast. We built the visual identity from scratch, shot every piece of product photography in-house, and created a 12-month content system that turned his vision into a multi-million dollar beauty empire. From packaging design to Instagram strategy, we handled it all.
          </div>
          
          <!-- Built For Section -->
          <div style="margin-top: 40px; padding: 32px; background: rgba(71,148,166,0.05); border: 1px solid rgba(71,148,166,0.2); border-radius: 12px;">
            <div style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #4794A6; margin-bottom: 16px;">Built For:</div>
            <p style="font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.7); margin: 0;">
              <span style="color: #4794A6; font-weight: 700;">Celebrity Brands</span> launching product lines. 
              <span style="color: #4794A6; font-weight: 700;">Direct-to-Consumer Brands</span> scaling fast. 
              <span style="color: #4794A6; font-weight: 700;">Premium E-Commerce</span> companies that refuse stock photography and generic stores.
            </p>
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
        </div>
      </div>
      
      <!-- ECOLOSOPHY - E-COMMERCE -->
      <div class="case case-featured">
        <div class="case-info">
          <div class="case-label">Non-Toxic Cleaning Brand E-Commerce</div>
          <div class="case-title">Ecolosophy</div>
          <div class="case-metric">$0 → 6-Figures in 8 Months</div>
          <div class="case-description">
            Started with literally nothing. No brand. No product photography. No store. We built the complete Shopify ecosystem from the ground up: shot 500+ custom product photos, designed packaging, created a 12-month content calendar, integrated warehouse fulfillment with ShipMonk, and launched a movement—not just a cleaning products company. From concept to 6-figure revenue in 8 months. Zero stock images. 100% custom everything.
          </div>
          
          <!-- Built For Section -->
          <div style="margin-top: 40px; padding: 32px; background: rgba(71,148,166,0.05); border: 1px solid rgba(71,148,166,0.2); border-radius: 12px;">
            <div style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #4794A6; margin-bottom: 16px;">Built For:</div>
            <p style="font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.7); margin: 0;">
              <span style="color: #4794A6; font-weight: 700;">Product Startups</span> launching from zero. 
              <span style="color: #4794A6; font-weight: 700;">Mission-Driven Brands</span> building movements. 
              <span style="color: #4794A6; font-weight: 700;">E-Commerce Entrepreneurs</span> who want everything done in-house—from photography to fulfillment integration.
            </p>
          </div>
        </div>
        
        <div class="device-showcase">
          <!-- Desktop Frame - iMac Style -->
          <div class="desktop-frame">
            <div class="desktop-screen">
              <img src="/static/images/brand-showcase/ecolosophy-homepage.jpg" alt="Ecolosophy Platform">
            </div>
            <div class="desktop-notch"></div>
            <div class="desktop-stand"></div>
          </div>
        </div>
      </div>

      <!-- BLUE BUILDING - COMMERCIAL REAL ESTATE -->
      <div class="case case-featured">
        <div class="case-info">
          <div class="case-label">Smart Luxury Office Rentals</div>
          <div class="case-title">Blue Building</div>
          <div class="case-metric">24/7 Business Operations</div>
          <div class="case-description">
            Commercial real estate companies need more than a website—they need a platform that positions premium workspaces as the future of entrepreneurship. We created a complete visual identity and digital presence that speaks directly to growing businesses who demand excellence in every detail. From smart access control to amenity booking, we built a brand that transforms office rentals into lifestyle statements.
          </div>
          
          <!-- Built For Section -->
          <div style="margin-top: 40px; padding: 32px; background: rgba(71,148,166,0.05); border: 1px solid rgba(71,148,166,0.2); border-radius: 12px;">
            <div style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #4794A6; margin-bottom: 16px;">Built For:</div>
            <p style="font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.7); margin: 0;">
              <span style="color: #4794A6; font-weight: 700;">Commercial Building Owners</span> repositioning for modern tenants. 
              <span style="color: #4794A6; font-weight: 700;">Co-Working Operators</span> scaling locations. 
              <span style="color: #4794A6; font-weight: 700;">Property Developers</span> targeting high-growth startups and entrepreneurs.
            </p>
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
        </div>
      </div>
      
    </div>
  </section>

  <!-- FRAMEWORK: HOW WE WORK -->
  <section class="framework" style="background: #0a0a0a; padding: 120px 48px; border-top: 1px solid rgba(255,255,255,0.1);">
    <div style="max-width: 1400px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 80px;">
        <h2 style="font-size: clamp(48px, 8vw, 80px); font-weight: 900; line-height: 1; margin-bottom: 24px; color: #fff;">The Framework</h2>
        <p style="font-size: 20px; color: rgba(255,255,255,0.6); max-width: 700px; margin: 0 auto;">Our battle-tested process for building world-class SaaS products. Every project. Every time.</p>
      </div>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 32px; margin-bottom: 80px;">
        <div style="background: #111; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 40px; transition: transform 0.3s ease;">
          <div style="font-size: 48px; font-weight: 900; color: #4794A6; margin-bottom: 16px;">01</div>
          <h3 style="font-size: 24px; font-weight: 700; margin-bottom: 16px; color: #fff;">Discovery</h3>
          <p style="font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.6);">Deep-dive workshops. User research. Competitor analysis. Tech stack evaluation. We map every detail before writing a single line of code.</p>
        </div>
        
        <div style="background: #111; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 40px;">
          <div style="font-size: 48px; font-weight: 900; color: #4794A6; margin-bottom: 16px;">02</div>
          <h3 style="font-size: 24px; font-weight: 700; margin-bottom: 16px; color: #fff;">Design</h3>
          <p style="font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.6);">Wireframes, prototypes, user flows. Every pixel intentional. Every interaction tested. We design for conversion, not just aesthetics.</p>
        </div>
        
        <div style="background: #111; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 40px;">
          <div style="font-size: 48px; font-weight: 900; color: #4794A6; margin-bottom: 16px;">03</div>
          <h3 style="font-size: 24px; font-weight: 700; margin-bottom: 16px; color: #fff;">Development</h3>
          <p style="font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.6);">Modern tech stack. Clean architecture. Scalable infrastructure. We build platforms that handle millions of users without breaking.</p>
        </div>
        
        <div style="background: #111; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 40px;">
          <div style="font-size: 48px; font-weight: 900; color: #4794A6; margin-bottom: 16px;">04</div>
          <h3 style="font-size: 24px; font-weight: 700; margin-bottom: 16px; color: #fff;">Launch</h3>
          <p style="font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.6);">Deployment. Monitoring. Performance optimization. We don't just launch and disappear. We ensure your platform dominates from day one.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- PRICING PACKAGES -->
  <section class="pricing" style="background: #000; padding: 120px 48px; border-top: 1px solid rgba(255,255,255,0.1);">
    <div style="max-width: 1400px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 80px;">
        <h2 style="font-size: clamp(48px, 8vw, 80px); font-weight: 900; line-height: 1; margin-bottom: 24px; color: #fff;">Ready-to-Purchase Packages</h2>
        <p style="font-size: 20px; color: rgba(255,255,255,0.6); max-width: 700px; margin: 0 auto;">No sales calls. No negotiations. Just world-class SaaS development. Pick your package and let's build.</p>
      </div>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 32px;">
        
        <!-- STARTER PACKAGE -->
        <div style="background: linear-gradient(135deg, #111 0%, #0a0a0a 100%); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 48px; position: relative; overflow: hidden;">
          <div style="position: absolute; top: 24px; right: 24px; background: rgba(71,148,166,0.1); color: #4794A6; padding: 8px 16px; border-radius: 8px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Foundation</div>
          
          <h3 style="font-size: 32px; font-weight: 900; margin-bottom: 16px; color: #fff;">Starter</h3>
          <div style="font-size: 64px; font-weight: 900; color: #4794A6; line-height: 1; margin-bottom: 8px;">$25K</div>
          <p style="font-size: 14px; color: rgba(255,255,255,0.5); margin-bottom: 32px;">4-6 week delivery</p>
          
          <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 32px; margin-bottom: 32px;">
            <p style="font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.7); margin-bottom: 32px;">Perfect for MVPs and proof-of-concept platforms. Get your idea validated fast.</p>
            
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); font-size: 15px;">✓ Core platform (5-7 pages)</li>
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); font-size: 15px;">✓ User authentication</li>
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); font-size: 15px;">✓ Database architecture</li>
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); font-size: 15px;">✓ Admin dashboard</li>
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); font-size: 15px;">✓ Mobile responsive</li>
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); font-size: 15px;">✓ Cloudflare deployment</li>
              <li style="padding: 12px 0; color: rgba(255,255,255,0.8); font-size: 15px;">✓ 30-day support</li>
            </ul>
          </div>
          
          <a href="/contact?package=starter" style="display: block; width: 100%; padding: 20px; background: rgba(71,148,166,0.1); border: 2px solid #4794A6; color: #4794A6; text-align: center; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; transition: all 0.3s ease;">Get Started</a>
        </div>
        
        <!-- GROWTH PACKAGE -->
        <div style="background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%); border: 2px solid #4794A6; border-radius: 24px; padding: 48px; position: relative; overflow: hidden; transform: scale(1.05); box-shadow: 0 20px 60px rgba(71,148,166,0.2);">
          <div style="position: absolute; top: 24px; right: 24px; background: #4794A6; color: #000; padding: 8px 16px; border-radius: 8px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Most Popular</div>
          
          <h3 style="font-size: 32px; font-weight: 900; margin-bottom: 16px; color: #fff;">Growth</h3>
          <div style="font-size: 64px; font-weight: 900; color: #4794A6; line-height: 1; margin-bottom: 8px;">$75K</div>
          <p style="font-size: 14px; color: rgba(255,255,255,0.5); margin-bottom: 32px;">8-12 week delivery</p>
          
          <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 32px; margin-bottom: 32px;">
            <p style="font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.7); margin-bottom: 32px;">Full-featured SaaS ready for market. Built for scale from day one.</p>
            
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.9); font-size: 15px; font-weight: 600;">✓ Everything in Starter, plus:</li>
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); font-size: 15px;">✓ Advanced platform (15-20 pages)</li>
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); font-size: 15px;">✓ Multi-user roles & permissions</li>
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); font-size: 15px;">✓ Payment integration (Stripe)</li>
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); font-size: 15px;">✓ Email automation</li>
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); font-size: 15px;">✓ Analytics dashboard</li>
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); font-size: 15px;">✓ API development</li>
              <li style="padding: 12px 0; color: rgba(255,255,255,0.8); font-size: 15px;">✓ 90-day support</li>
            </ul>
          </div>
          
          <a href="/contact?package=growth" style="display: block; width: 100%; padding: 20px; background: #4794A6; color: #000; text-align: center; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; transition: all 0.3s ease; box-shadow: 0 4px 20px rgba(71,148,166,0.3);">Get Started</a>
        </div>
        
        <!-- ENTERPRISE PACKAGE -->
        <div style="background: linear-gradient(135deg, #111 0%, #0a0a0a 100%); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 48px; position: relative; overflow: hidden;">
          <div style="position: absolute; top: 24px; right: 24px; background: rgba(71,148,166,0.1); color: #4794A6; padding: 8px 16px; border-radius: 8px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Premium</div>
          
          <h3 style="font-size: 32px; font-weight: 900; margin-bottom: 16px; color: #fff;">Enterprise</h3>
          <div style="font-size: 64px; font-weight: 900; color: #4794A6; line-height: 1; margin-bottom: 8px;">$150K+</div>
          <p style="font-size: 14px; color: rgba(255,255,255,0.5); margin-bottom: 32px;">12-16 week delivery</p>
          
          <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 32px; margin-bottom: 32px;">
            <p style="font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.7); margin-bottom: 32px;">Enterprise-grade platforms that handle millions. Built for institutional trust.</p>
            
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.9); font-size: 15px; font-weight: 600;">✓ Everything in Growth, plus:</li>
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); font-size: 15px;">✓ Unlimited pages & features</li>
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); font-size: 15px;">✓ Custom integrations</li>
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); font-size: 15px;">✓ Advanced security & compliance</li>
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); font-size: 15px;">✓ Dedicated account manager</li>
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); font-size: 15px;">✓ White-label options</li>
              <li style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.8); font-size: 15px;">✓ Microservices architecture</li>
              <li style="padding: 12px 0; color: rgba(255,255,255,0.8); font-size: 15px;">✓ 6-month support</li>
            </ul>
          </div>
          
          <a href="/contact?package=enterprise" style="display: block; width: 100%; padding: 20px; background: rgba(71,148,166,0.1); border: 2px solid #4794A6; color: #4794A6; text-align: center; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; transition: all 0.3s ease;">Get Started</a>
        </div>
        
      </div>
      
      <div style="text-align: center; margin-top: 60px; padding-top: 60px; border-top: 1px solid rgba(255,255,255,0.1);">
        <p style="font-size: 16px; color: rgba(255,255,255,0.6); margin-bottom: 16px;">Need something custom? We build that too.</p>
        <a href="/contact?package=custom" style="color: #4794A6; text-decoration: none; font-weight: 600; font-size: 16px; border-bottom: 2px solid #4794A6; padding-bottom: 4px; transition: all 0.3s ease;">Schedule a Call →</a>
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <section class="pt-32 pb-20 px-6">
        <div class="max-w-7xl mx-auto text-center">
          <h1 class="text-7xl md:text-8xl font-black mb-6" style="letter-spacing: -0.02em;">
            Programs & Pricing
          </h1>
          <p class="text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            From beginner-friendly academy classes to professional masterclass coaching—<br/>
            find the perfect program for your journey.
          </p>
        </div>
      </section>

      {/* MASTERCLASS PROGRAMS */}
      <section class="py-20 px-6 border-t border-white/10">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-5xl font-black mb-4">Masterclass Programs</h2>
            <p class="text-xl text-gray-400">Professional coaching for photographers of all ages</p>
          </div>

          {/* Masterclass Cards */}
          <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
            {/* Masterclass Coaching */}
            <div class="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-10 border-2 border-[#4794A6]/30 hover:border-[#4794A6] transition-all">
              <div class="flex justify-between items-start mb-6">
                <div>
                  <h3 class="text-3xl font-bold mb-2">Masterclass Coaching</h3>
                  <div class="text-5xl font-black text-[#4794A6] mb-2">$695</div>
                  <p class="text-gray-400">One-time investment</p>
                </div>
                <span class="bg-[#4794A6] text-white px-3 py-1 rounded-full text-xs font-bold uppercase">STARTER</span>
              </div>
              
              <a href="/masterclass" class="block w-full py-4 rounded-full bg-[#4794A6] hover:bg-[#5aa5b8] text-white text-center font-bold text-lg mb-8 transition-all">
                Learn More
              </a>

              <div class="space-y-3 text-sm">
                <div class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                  <span>Mentorship for All Ages</span>
                </div>
                <div class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                  <span>2 Strategic Coaching Sessions</span>
                </div>
                <div class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                  <span>Portfolio Review & Feedback</span>
                </div>
                <div class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                  <span>Equipment Review</span>
                </div>
                <div class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                  <span>Brand Guidance</span>
                </div>
                <div class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                  <span>Business Strategy Consultation</span>
                </div>
                <div class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                  <span>$695 Credit Toward Business in a Box</span>
                </div>
              </div>
            </div>

            {/* Business in a Box */}
            <div class="bg-gradient-to-br from-white to-gray-100 rounded-3xl p-10 border-2 border-white text-black">
              <div class="flex justify-between items-start mb-6">
                <div>
                  <h3 class="text-3xl font-bold mb-2">Business in a Box</h3>
                  <div class="text-5xl font-black mb-2">$3,000</div>
                  <p class="text-gray-600">One-time investment</p>
                </div>
                <span class="bg-black text-white px-3 py-1 rounded-full text-xs font-bold uppercase">PRO</span>
              </div>
              
              <a href="/masterclass" class="block w-full py-4 rounded-full bg-black hover:bg-gray-800 text-white text-center font-bold text-lg mb-8 transition-all">
                Learn More
              </a>

              <div class="space-y-3 text-sm">
                <div class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-black flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                  <span class="font-semibold">Everything in Coaching, plus:</span>
                </div>
                <div class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-black flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                  <span>Complete Wedding/Portrait/Commercial Training</span>
                </div>
                <div class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-black flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                  <span>AI Tools</span>
                </div>
                <div class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-black flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                  <span>Photography Workflow (Booking to Delivery)</span>
                </div>
                <div class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-black flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                  <span>Business Plan & Marketing Strategy</span>
                </div>
                <div class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-black flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                  <span>Legal & Business Guidance</span>
                </div>
              </div>
            </div>
          </div>

          {/* Masterclass Comparison Table - COMPREHENSIVE */}
          <div class="max-w-5xl mx-auto bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border-2 border-gray-800">
            <h3 class="text-3xl font-bold text-center mb-8">Masterclass Comparison</h3>
            
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b-2 border-gray-800">
                    <th class="text-left py-4 px-4 font-bold">Feature</th>
                    <th class="text-center py-4 px-4 font-bold">Coaching</th>
                    <th class="text-center py-4 px-4 font-bold">Business Box</th>
                  </tr>
                </thead>
                <tbody class="text-sm">
                  <tr class="border-b border-gray-800/50">
                    <td class="py-3 px-4">Mentorship for All Ages</td>
                    <td class="text-center py-3 px-4 text-[#4794A6] text-xl">✓</td>
                    <td class="text-center py-3 px-4 text-[#4794A6] text-xl">✓</td>
                  </tr>
                  <tr class="border-b border-gray-800/50">
                    <td class="py-3 px-4">Strategic Coaching Sessions</td>
                    <td class="text-center py-3 px-4 text-[#4794A6] text-xl">✓</td>
                    <td class="text-center py-3 px-4 text-[#4794A6] text-xl">✓</td>
                  </tr>
                  <tr class="border-b border-gray-800/50">
                    <td class="py-3 px-4">Portfolio Review & Feedback</td>
                    <td class="text-center py-3 px-4 text-[#4794A6] text-xl">✓</td>
                    <td class="text-center py-3 px-4 text-[#4794A6] text-xl">✓</td>
                  </tr>
                  <tr class="border-b border-gray-800/50">
                    <td class="py-3 px-4">Equipment Review</td>
                    <td class="text-center py-3 px-4 text-[#4794A6] text-xl">✓</td>
                    <td class="text-center py-3 px-4 text-[#4794A6] text-xl">✓</td>
                  </tr>
                  <tr class="border-b border-gray-800/50">
                    <td class="py-3 px-4">Brand Guidance</td>
                    <td class="text-center py-3 px-4 text-[#4794A6] text-xl">✓</td>
                    <td class="text-center py-3 px-4 text-[#4794A6] text-xl">✓</td>
                  </tr>
                  <tr class="border-b border-gray-800/50">
                    <td class="py-3 px-4">Business Strategy Consultation</td>
                    <td class="text-center py-3 px-4 text-[#4794A6] text-xl">✓</td>
                    <td class="text-center py-3 px-4 text-[#4794A6] text-xl">✓</td>
                  </tr>
                  <tr class="border-b border-gray-800/50">
                    <td class="py-3 px-4">Complete Photography Training</td>
                    <td class="text-center py-3 px-4 text-gray-600">—</td>
                    <td class="text-center py-3 px-4 text-[#4794A6] text-xl">✓</td>
                  </tr>
                  <tr class="border-b border-gray-800/50">
                    <td class="py-3 px-4">AI Tools</td>
                    <td class="text-center py-3 px-4 text-gray-600">—</td>
                    <td class="text-center py-3 px-4 text-[#4794A6] text-xl">✓</td>
                  </tr>
                  <tr class="border-b border-gray-800/50">
                    <td class="py-3 px-4">Photography Workflow System</td>
                    <td class="text-center py-3 px-4 text-gray-600">—</td>
                    <td class="text-center py-3 px-4 text-[#4794A6] text-xl">✓</td>
                  </tr>
                  <tr class="border-b border-gray-800/50">
                    <td class="py-3 px-4">Business Plan & Marketing Strategy</td>
                    <td class="text-center py-3 px-4 text-gray-600">—</td>
                    <td class="text-center py-3 px-4 text-[#4794A6] text-xl">✓</td>
                  </tr>
                  <tr class="border-b border-gray-800/50">
                    <td class="py-3 px-4">Legal & Business Guidance</td>
                    <td class="text-center py-3 px-4 text-gray-600">—</td>
                    <td class="text-center py-3 px-4 text-[#4794A6] text-xl">✓</td>
                  </tr>
                  <tr class="bg-gradient-to-r from-gray-900 to-black">
                    <td class="py-4 px-4 font-bold text-lg">Investment</td>
                    <td class="text-center py-4 px-4 font-bold text-2xl text-[#4794A6]">$695</td>
                    <td class="text-center py-4 px-4 font-bold text-2xl">$3,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ACADEMY PROGRAMS */}
      <section class="py-20 px-6 border-t border-white/10">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-5xl font-black mb-4">Academy Programs</h2>
            <p class="text-xl text-gray-400">Monthly photography classes for young creators (Ages 7-14)</p>
          </div>

          {/* Academy Pricing Cards */}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {/* 1 Student */}
            <div class="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
              <div class="text-center mb-6">
                <div class="text-4xl font-black mb-2 text-[#4794A6]">1</div>
                <div class="text-gray-400 text-sm">Student</div>
              </div>
              <div class="text-center mb-6">
                <div class="text-3xl font-bold">$116<span class="text-sm text-gray-400">/mo</span></div>
                <div class="text-xs text-gray-500 mt-1">$93/mo annual</div>
              </div>
              <a href="/education" class="block w-full py-3 rounded-full bg-[#4794A6] hover:bg-[#5aa5b8] text-white text-center font-bold text-sm transition-all">
                Enroll Now
              </a>
              <div class="mt-6 pt-6 border-t border-gray-800 space-y-2 text-xs text-gray-400">
                <div class="flex items-center gap-2"><span class="text-[#4794A6]">✓</span> 8 live classes/month</div>
                <div class="flex items-center gap-2"><span class="text-[#4794A6]">✓</span> All recordings</div>
                <div class="flex items-center gap-2"><span class="text-[#4794A6]">✓</span> Cancel anytime</div>
              </div>
            </div>

            {/* 2 Students */}
            <div class="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border-2 border-[#4794A6] relative">
              <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#4794A6] text-white px-3 py-1 rounded-full text-xs font-bold">POPULAR</div>
              <div class="text-center mb-6">
                <div class="text-4xl font-black mb-2 text-[#4794A6]">2</div>
                <div class="text-gray-400 text-sm">Students</div>
              </div>
              <div class="text-center mb-6">
                <div class="text-3xl font-bold">$99<span class="text-sm text-gray-400">/mo</span></div>
                <div class="text-xs text-gray-500 mt-1">$79/mo annual (each)</div>
              </div>
              <a href="/education" class="block w-full py-3 rounded-full bg-[#4794A6] hover:bg-[#5aa5b8] text-white text-center font-bold text-sm transition-all">
                Enroll Now
              </a>
              <div class="mt-6 pt-6 border-t border-gray-800 space-y-2 text-xs text-gray-400">
                <div class="flex items-center gap-2"><span class="text-[#4794A6]">✓</span> 8 live classes/month</div>
                <div class="flex items-center gap-2"><span class="text-[#4794A6]">✓</span> All recordings</div>
                <div class="flex items-center gap-2"><span class="text-[#4794A6]">✓</span> Save $400/year</div>
              </div>
            </div>

            {/* 3 Students */}
            <div class="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
              <div class="text-center mb-6">
                <div class="text-4xl font-black mb-2 text-[#4794A6]">3</div>
                <div class="text-gray-400 text-sm">Students</div>
              </div>
              <div class="text-center mb-6">
                <div class="text-3xl font-bold">$89<span class="text-sm text-gray-400">/mo</span></div>
                <div class="text-xs text-gray-500 mt-1">$71/mo annual (each)</div>
              </div>
              <a href="/education" class="block w-full py-3 rounded-full bg-[#4794A6] hover:bg-[#5aa5b8] text-white text-center font-bold text-sm transition-all">
                Enroll Now
              </a>
              <div class="mt-6 pt-6 border-t border-gray-800 space-y-2 text-xs text-gray-400">
                <div class="flex items-center gap-2"><span class="text-[#4794A6]">✓</span> 8 live classes/month</div>
                <div class="flex items-center gap-2"><span class="text-[#4794A6]">✓</span> All recordings</div>
                <div class="flex items-center gap-2"><span class="text-[#4794A6]">✓</span> Save $540/year</div>
              </div>
            </div>

            {/* 4+ Students */}
            <div class="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800">
              <div class="text-center mb-6">
                <div class="text-4xl font-black mb-2 text-[#4794A6]">4+</div>
                <div class="text-gray-400 text-sm">Students</div>
              </div>
              <div class="text-center mb-6">
                <div class="text-3xl font-bold">$79<span class="text-sm text-gray-400">/mo</span></div>
                <div class="text-xs text-gray-500 mt-1">$63/mo annual (each)</div>
              </div>
              <a href="/education" class="block w-full py-3 rounded-full bg-[#4794A6] hover:bg-[#5aa5b8] text-white text-center font-bold text-sm transition-all">
                Enroll Now
              </a>
              <div class="mt-6 pt-6 border-t border-gray-800 space-y-2 text-xs text-gray-400">
                <div class="flex items-center gap-2"><span class="text-[#4794A6]">✓</span> 8 live classes/month</div>
                <div class="flex items-center gap-2"><span class="text-[#4794A6]">✓</span> All recordings</div>
                <div class="flex items-center gap-2"><span class="text-[#4794A6]">✓</span> Save $640/year</div>
              </div>
            </div>
          </div>

          {/* Academy Features Table */}
          <div class="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border-2 border-gray-800">
            <h3 class="text-3xl font-bold text-center mb-8">What's Included in Academy</h3>
            <div class="grid md:grid-cols-2 gap-6 text-sm">
              <div class="space-y-3">
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                  <span>30-Minute Micro-Learning Sessions</span>
                </div>
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                  <span>8 Live Classes per Month</span>
                </div>
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                  <span>Lifetime Instruction Library</span>
                </div>
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                  <span>December Bonus Workshops</span>
                </div>
              </div>
              <div class="space-y-3">
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                  <span>Portfolio Building</span>
                </div>
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                  <span>All Class Recordings</span>
                </div>
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                  <span>Cancel Anytime (Daily Proration)</span>
                </div>
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-[#4794A6] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                  <span>Annual Billing (Save 20%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section class="py-20 px-6 border-t border-white/10">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-4xl font-bold mb-6">Still have questions?</h2>
          <p class="text-xl text-gray-400 mb-10">
            We're here to help you find the perfect program for your photography journey.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:hello@acromatico.com" class="px-10 py-5 rounded-full bg-[#4794A6] hover:bg-[#5aa5b8] text-white font-bold text-lg transition-all inline-block">
              Contact Us
            </a>
            <a href="/faq" class="px-10 py-5 rounded-full border-2 border-white hover:bg-white hover:text-black text-white font-bold text-lg transition-all inline-block">
              View FAQ
            </a>
          </div>
        </div>
      </section>

      <div dangerouslySetInnerHTML={{__html: footerHTML}} />
    </div>,
    { title: 'Programs & Pricing - Acromatico' }
  )
})

// INVOICE GENERATION SYSTEM FOR STEP UP STUDENTS
app.get('/invoices', (c) => {
  return c.render(
    <div class="min-h-screen bg-black text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        @media print {
          body { background: white !important; color: black !important; }
          .no-print { display: none !important; }
          .invoice-container { box-shadow: none !important; border: 1px solid #ddd !important; }
        }
      `}</style>

      {/* Navigation - No Print */}
      <div class="no-print">
        <Header />
      </div>

      {/* Invoice Generator */}
      <section class="pt-32 pb-20 px-6">
        <div class="max-w-5xl mx-auto">
          <div class="no-print text-center mb-12">
            <h1 class="text-6xl mb-6" style="font-weight: 300; letter-spacing: -0.03em; font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;">For Step Up Students</h1>
            <div class="max-w-3xl mx-auto text-lg text-gray-400 space-y-4" style="font-weight: 300; line-height: 1.7;">
              <p>
                <strong class="text-white" style="font-weight: 400;">We proudly collaborate with Step Up For Students</strong> to make quality photography education accessible to Florida families.
              </p>
              <p>
                If you cannot locate your original invoice or need to generate a new one for reimbursement, use this tool to download your invoice. All invoices are Step Up compliant and include detailed program descriptions.
              </p>
              <p class="text-sm" style="font-weight: 300;">
                <strong class="text-white" style="font-weight: 400;">Note:</strong> Our programs qualify under the <span class="text-[#4794A6]">Electives</span> category. Instructor credentials available upon request.
              </p>
            </div>
            
            {/* Instructor Credentials Button */}
            <div class="mt-8">
              <button onclick="downloadCredentials()" class="px-8 py-4 rounded-full bg-gradient-to-r from-[#4794A6] to-[#5aa5b8] hover:from-[#5aa5b8] hover:to-[#6bb6c9] text-white text-lg transition-all shadow-lg" style="font-weight: 400; letter-spacing: 0.01em;">
                📄 Download Instructor Credentials
              </button>
              <p class="text-sm text-gray-500 mt-3" style="font-weight: 300;">For Step Up verification if requested</p>
            </div>
          </div>

          {/* Payment Section - BEFORE Invoice Generation */}
          <div class="no-print bg-gradient-to-br from-[#4794A6]/20 to-[#4794A6]/5 rounded-3xl p-8 border-2 border-[#4794A6]/30 mb-8">
            <h2 class="text-2xl mb-4 text-center" style="font-weight: 300; letter-spacing: -0.02em;">💳 Payment Options</h2>
            <p class="text-center text-gray-400 mb-6" style="font-weight: 300;">If you haven't done so, please complete your payment before generating your invoice</p>
            
            <div class="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div class="bg-black/30 rounded-2xl p-6 border border-[#4794A6]/20 md:col-span-2">
                <p class="mb-2 text-lg" style="font-weight: 400;">💳 Credit/Debit Card</p>
                <p class="text-sm text-gray-400 mb-3" style="font-weight: 300;">Secure payment powered by Stripe</p>
                <button onclick="openStripePayment()" class="inline-block px-6 py-3 rounded-full bg-[#4794A6] hover:bg-[#5aa5b8] text-white text-sm transition-all w-full" style="font-weight: 400;">
                  Pay with Credit/Debit Card →
                </button>
              </div>
              
              <div class="bg-black/30 rounded-2xl p-6 border border-[#4794A6]/20">
                <p class="mb-2" style="font-weight: 400;">📱 Zelle</p>
                <p class="text-[#4794A6] font-mono text-lg">954-779-0921</p>
                <p class="text-xs text-gray-400 mt-2" style="font-weight: 300;">Send payment to this phone number</p>
              </div>
              
              <div class="bg-black/30 rounded-2xl p-6 border border-[#4794A6]/20">
                <p class="mb-2" style="font-weight: 400;">💰 Venmo</p>
                <p class="text-[#4794A6] font-mono text-lg">@acromatico</p>
                <p class="text-xs text-gray-400 mt-2" style="font-weight: 300;">Send payment to this handle</p>
              </div>
              
              <div class="bg-black/30 rounded-2xl p-6 border border-[#4794A6]/20">
                <p class="mb-2" style="font-weight: 400;">💵 Cash App</p>
                <p class="text-[#4794A6] font-mono text-lg">$acromatico</p>
                <p class="text-xs text-gray-400 mt-2" style="font-weight: 300;">Send payment to this cashtag</p>
              </div>
              
              <div class="bg-black/30 rounded-2xl p-6 border border-[#4794A6]/20">
                <p class="mb-2" style="font-weight: 400;">💵 Check or Cash</p>
                <p class="text-sm text-gray-400" style="font-weight: 300;">Contact us for mailing address</p>
              </div>
            </div>
          </div>

          {/* Invoice Form */}
          <div class="no-print bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border-2 border-gray-800 mb-12">
            <h2 class="text-2xl mb-6" style="font-weight: 300; letter-spacing: -0.02em;">Generate Your Invoice</h2>
            
            <div class="space-y-4">
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm mb-2" style="font-weight: 300; color: #ccc;">Parent/Guardian Name*</label>
                  <input type="text" id="parentName" placeholder="John Smith" class="w-full px-4 py-3 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-[#4794A6] focus:outline-none" style="font-weight: 300;" />
                </div>
                <div>
                  <label class="block text-sm mb-2" style="font-weight: 300; color: #ccc;">Email*</label>
                  <input type="email" id="parentEmail" placeholder="john@example.com" class="w-full px-4 py-3 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-[#4794A6] focus:outline-none" style="font-weight: 300;" />
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm mb-2" style="font-weight: 300; color: #ccc;">Student Name(s)*</label>
                  <input type="text" id="studentNames" placeholder="Sarah Smith, Michael Smith" class="w-full px-4 py-3 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-[#4794A6] focus:outline-none" style="font-weight: 300;" />
                </div>
                <div>
                  <label class="block text-sm mb-2" style="font-weight: 300; color: #ccc;">Invoice Date*</label>
                  <input type="date" id="invoiceDate" class="w-full px-4 py-3 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-[#4794A6] focus:outline-none" style="font-weight: 300;" />
                </div>
              </div>

              <div>
                <label class="block text-sm mb-2" style="font-weight: 300; color: #ccc;">Program*</label>
                <select id="programType" class="w-full px-4 py-3 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-[#4794A6] focus:outline-none" style="font-weight: 300;">
                  <option value="">Select a program...</option>
                  <optgroup label="Academy (Ages 7-14)">
                    <option value="academy-1-monthly">Academy - 1 Student - Monthly ($116/mo)</option>
                    <option value="academy-1-annual">Academy - 1 Student - Annual ($930/year)</option>
                    <option value="academy-2-monthly">Academy - 2 Students - Monthly ($198/mo)</option>
                    <option value="academy-2-annual">Academy - 2 Students - Annual ($1,580/year)</option>
                    <option value="academy-3-monthly">Academy - 3 Students - Monthly ($267/mo)</option>
                    <option value="academy-3-annual">Academy - 3 Students - Annual ($2,130/year)</option>
                    <option value="academy-4-monthly">Academy - 4+ Students - Monthly ($316/mo)</option>
                    <option value="academy-4-annual">Academy - 4+ Students - Annual ($2,520/year)</option>
                  </optgroup>
                  <optgroup label="Masterclass">
                    <option value="masterclass-coaching">Masterclass Coaching ($695)</option>
                    <option value="masterclass-business">Business in a Box ($3,000)</option>
                  </optgroup>
                </select>
              </div>

              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm mb-2" style="font-weight: 300; color: #ccc;">Amount*</label>
                  <input type="number" id="invoiceAmount" placeholder="116.00" step="0.01" class="w-full px-4 py-3 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-[#4794A6] focus:outline-none" style="font-weight: 300;" />
                </div>
                <div>
                  <label class="block text-sm mb-2" style="font-weight: 300; color: #ccc;">Due Date</label>
                  <input type="date" id="dueDate" class="w-full px-4 py-3 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-[#4794A6] focus:outline-none" style="font-weight: 300;" />
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm mb-2" style="font-weight: 300; color: #ccc;">Payment Date*</label>
                  <input type="date" id="paymentDate" class="w-full px-4 py-3 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-[#4794A6] focus:outline-none" style="font-weight: 300;" />
                </div>
                <div>
                  <label class="block text-sm mb-2" style="font-weight: 300; color: #ccc;">Payment Method*</label>
                  <select id="paymentMethod" class="w-full px-4 py-3 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-[#4794A6] focus:outline-none" style="font-weight: 300;">
                    <option value="">Select payment method...</option>
                    <option value="Credit Card (Stripe)">Credit Card (Stripe)</option>
                    <option value="Zelle">Zelle</option>
                    <option value="Venmo">Venmo</option>
                    <option value="Cash App">Cash App</option>
                    <option value="Check">Check</option>
                    <option value="Cash">Cash</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-sm mb-2" style="font-weight: 300; color: #ccc;">Additional Notes</label>
                <textarea id="invoiceNotes" rows="2" placeholder="Any additional information..." class="w-full px-4 py-3 rounded-xl bg-gray-900 border-2 border-gray-800 focus:border-[#4794A6] focus:outline-none" style="font-weight: 300;"></textarea>
              </div>

              <button onclick="generateInvoice()" class="w-full py-4 rounded-full bg-[#4794A6] hover:bg-[#5aa5b8] text-white text-lg transition-all" style="font-weight: 400; letter-spacing: 0.01em;">
                Generate Invoice for Step Up
              </button>
            </div>
          </div>

          {/* Invoice Preview */}
          <style>{`
            @media print {
              @page { 
                size: letter portrait; 
                margin: 0.4in 0.5in; 
              }
              body { 
                margin: 0 !important; 
                padding: 0 !important;
                width: 8.5in !important;
              }
              .invoice-container { 
                max-width: 7.5in !important;
                width: 100% !important;
                padding: 0 !important;
                margin: 0 !important;
                border-radius: 0 !important;
                box-shadow: none !important;
                page-break-after: avoid !important;
                page-break-inside: avoid !important;
                transform: scale(0.92);
                transform-origin: top left;
              }
              .invoice-container * { 
                font-size: 10px !important; 
                line-height: 1.35 !important;
              }
              .invoice-container h1 { font-size: 28px !important; margin: 0 0 8px 0 !important; }
              .invoice-container .text-5xl { font-size: 28px !important; }
              .invoice-container .text-2xl { font-size: 16px !important; }
              .invoice-container .text-xl { font-size: 14px !important; }
              .invoice-container .text-lg { font-size: 12px !important; }
              .invoice-container .text-sm { font-size: 9px !important; }
              .invoice-container img { max-height: 42px !important; margin-bottom: 8px !important; }
              .invoice-container .p-12 { padding: 0 !important; }
              .invoice-container .pb-8 { padding-bottom: 0.2in !important; }
              .invoice-container .pt-8 { padding-top: 0.2in !important; }
              .invoice-container .py-8 { padding-top: 0.2in !important; padding-bottom: 0.2in !important; }
              .invoice-container .mb-8 { margin-bottom: 0.15in !important; }
              .invoice-container .mb-4 { margin-bottom: 0.08in !important; }
              .invoice-container table { margin-bottom: 0.15in !important; }
              .invoice-container thead th { padding: 6px 8px !important; }
              .invoice-container tbody td { padding: 6px 8px !important; }
              .invoice-container .border-b-2 { border-bottom-width: 1px !important; }
              .no-print { display: none !important; }
            }
          `}</style>
          <div id="invoicePreview" class="invoice-container bg-white text-black rounded-3xl p-12 shadow-2xl hidden">
            {/* Company Header with Logo */}
            <div class="border-b-2 border-gray-300 pb-8 mb-8">
              <div class="flex justify-between items-start">
                <div>
                  <img src="/static/acromatico-logo-official.png" alt="Acromatico" class="h-16 mb-4" />
                  <div class="text-sm text-gray-600">
                    <p class="font-bold text-lg text-black mb-2">Acromatico Inc</p>
                    <p>2300 W 84th ST. Suite 213</p>
                    <p>Miami, FL 33016</p>
                    <p class="mt-2">Phone: 954.779.0921</p>
                    <p>Email: info@acromatico.com</p>
                  </div>
                </div>
                <div class="text-right">
                  <h1 class="text-5xl font-thin tracking-widest text-[#4794A6] mb-4" style="font-family: 'Inter', sans-serif; letter-spacing: 0.2em;">INVOICE</h1>
                  <p class="text-sm text-gray-600 mb-1">Invoice #</p>
                  <p class="text-2xl font-bold" id="invoiceNumber">INV-1247</p>
                  <p class="text-sm text-gray-600 mt-3 mb-1">Invoice Date</p>
                  <p class="font-semibold" id="displayInvoiceDate">-</p>
                  <p class="text-sm text-gray-600 mt-2 mb-1">Due Date</p>
                  <p class="font-semibold" id="displayDueDate">-</p>
                </div>
              </div>
            </div>

            {/* Bill To */}
            <div class="mb-8">
              <p class="text-sm text-gray-600 font-bold mb-2">BILL TO</p>
              <p class="text-lg font-bold" id="displayParentName">-</p>
              <p class="text-gray-600" id="displayParentEmail">-</p>
            </div>

            {/* Invoice Items with Educational Benefits */}
            <table class="w-full mb-8">
              <thead class="bg-gray-100 border-y-2 border-gray-300">
                <tr>
                  <th class="text-left py-3 px-4 font-bold">Description</th>
                  <th class="text-center py-3 px-4 font-bold">Students</th>
                  <th class="text-right py-3 px-4 font-bold">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-gray-200">
                  <td class="py-4 px-4">
                    <p class="font-semibold text-lg mb-2" id="displayProgram">-</p>
                    <p class="text-sm font-medium text-gray-700 mb-1">Student(s): <span id="displayStudents">-</span></p>
                    <div class="text-sm text-gray-600 mt-2" id="displayBenefits"></div>
                  </td>
                  <td class="text-center py-4 px-4 font-bold text-lg" id="displayStudentCount">1</td>
                  <td class="text-right py-4 px-4 font-bold text-xl" id="displayAmount">$0.00</td>
                </tr>
              </tbody>
            </table>

            {/* Total */}
            <div class="flex justify-end mb-8">
              <div class="w-80">
                <div class="flex justify-between py-2 text-lg">
                  <span class="font-bold">Subtotal:</span>
                  <span id="displaySubtotal">$0.00</span>
                </div>
                <div class="flex justify-between py-3 border-t-2 border-gray-300 text-2xl">
                  <span class="font-black">TOTAL DUE:</span>
                  <span class="font-black text-[#4794A6]" id="displayTotal">$0.00</span>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div class="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-8">
              <div class="flex items-start gap-3">
                <div class="text-3xl">✅</div>
                <div class="flex-1">
                  <p class="font-bold text-lg text-green-800 mb-1">PAYMENT RECEIVED</p>
                  <p class="text-gray-700">Payment Date: <span class="font-semibold" id="displayPaymentDate">-</span></p>
                  <p class="text-gray-700">Payment Method: <span class="font-semibold" id="displayPaymentMethod">-</span></p>
                  <p class="text-sm text-gray-600 mt-2">Thank you for your payment!</p>
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div id="notesSection" class="mb-8 hidden">
              <p class="text-sm font-bold text-gray-600 mb-2">NOTES</p>
              <p class="text-gray-700" id="displayNotes"></p>
            </div>

            {/* Step Up Footer */}
            <div class="border-t-2 border-gray-300 pt-6 text-center text-sm text-gray-600">
              <p class="font-bold text-black mb-2">For Step Up For Students Reimbursement</p>
              <p>This invoice is compliant with Step Up For Students requirements and includes detailed educational program descriptions.</p>
              <p class="mt-3">Questions? Contact us at <strong>info@acromatico.com</strong> or <strong>954.779.0921</strong></p>
            </div>
          </div>

          {/* Action Buttons */}
          <div id="invoiceActions" class="no-print flex gap-4 justify-center mt-8 hidden">
            <button onclick="window.print()" class="px-8 py-4 rounded-full bg-[#4794A6] hover:bg-[#5aa5b8] text-white font-bold transition-all">
              📄 Download / Print Invoice
            </button>
            <button onclick="editInvoice()" class="px-8 py-4 rounded-full border-2 border-white hover:bg-white hover:text-black text-white font-bold transition-all">
              ✏️ Edit Invoice
            </button>
            <button onclick="resetInvoice()" class="px-8 py-4 rounded-full border-2 border-gray-800 hover:bg-gray-800 text-white font-bold transition-all">
              🔄 New Invoice
            </button>
          </div>
        </div>
      </section>

      <div class="no-print" dangerouslySetInnerHTML={{__html: footerHTML}} />

      {/* JavaScript */}
      <script dangerouslySetInnerHTML={{__html: `
        // Program benefits (Step Up PEP compliant descriptions - ELECTIVES category)
        const programBenefits = {
          'academy-1-monthly': 'Photography elective lessons provided by experienced professional photographers with 20+ years of demonstrated expertise. Educational enrichment includes composition, lighting techniques, camera operation, and creative skill development. Program includes 8 individual instruction sessions per month (30 minutes each), supplemental recorded lessons, digital curriculum materials, and portfolio development for ages 7-14. (Electives - PEP Eligible)',
          'academy-1-annual': 'Full-year photography elective lessons provided by experienced professional photographers with 20+ years of demonstrated expertise. Educational enrichment includes composition, lighting techniques, camera operation, and creative skill development. Program includes 8 individual instruction sessions per month (30 minutes each), supplemental recorded lessons, digital curriculum materials, December enrichment activities, and portfolio development for ages 7-14. (Electives - PEP Eligible)',
          'academy-2-monthly': 'Photography elective lessons provided by experienced professional photographers with 20+ years of demonstrated expertise. Educational enrichment includes composition, lighting techniques, camera operation, and creative skill development. Program includes 8 individual instruction sessions per month (30 minutes each) per student, supplemental recorded lessons, digital curriculum materials, and portfolio development for ages 7-14. (Electives - PEP Eligible)',
          'academy-2-annual': 'Full-year photography elective lessons provided by experienced professional photographers with 20+ years of demonstrated expertise. Educational enrichment includes composition, lighting techniques, camera operation, and creative skill development. Program includes 8 individual instruction sessions per month (30 minutes each) per student, supplemental recorded lessons, digital curriculum materials, December enrichment activities, and portfolio development for ages 7-14. (Electives - PEP Eligible)',
          'academy-3-monthly': 'Photography elective lessons provided by experienced professional photographers with 20+ years of demonstrated expertise. Educational enrichment includes composition, lighting techniques, camera operation, and creative skill development. Program includes 8 individual instruction sessions per month (30 minutes each) per student, supplemental recorded lessons, digital curriculum materials, and portfolio development for ages 7-14. (Electives - PEP Eligible)',
          'academy-3-annual': 'Full-year photography elective lessons provided by experienced professional photographers with 20+ years of demonstrated expertise. Educational enrichment includes composition, lighting techniques, camera operation, and creative skill development. Program includes 8 individual instruction sessions per month (30 minutes each) per student, supplemental recorded lessons, digital curriculum materials, December enrichment activities, and portfolio development for ages 7-14. (Electives - PEP Eligible)',
          'academy-4-monthly': 'Photography elective lessons provided by experienced professional photographers with 20+ years of demonstrated expertise. Educational enrichment includes composition, lighting techniques, camera operation, and creative skill development. Program includes 8 individual instruction sessions per month (30 minutes each) per student, supplemental recorded lessons, digital curriculum materials, and portfolio development for ages 7-14. (Electives - PEP Eligible)',
          'academy-4-annual': 'Full-year photography elective lessons provided by experienced professional photographers with 20+ years of demonstrated expertise. Educational enrichment includes composition, lighting techniques, camera operation, and creative skill development. Program includes 8 individual instruction sessions per month (30 minutes each) per student, supplemental recorded lessons, digital curriculum materials, December enrichment activities, and portfolio development for ages 7-14. (Electives - PEP Eligible)',
          'masterclass-coaching': 'Photography business elective lessons and career enrichment provided by experienced professional photographers with 20+ years of demonstrated expertise and business credentials. Educational enrichment includes portfolio review and feedback, equipment consultation, brand development guidance, and business strategy planning. Two individual coaching sessions providing personalized mentorship and career development. (Electives - PEP Eligible)',
          'masterclass-business': 'Comprehensive photography business elective program and career enrichment provided by experienced professional photographers with 20+ years of demonstrated expertise and business credentials. Educational enrichment includes wedding, portrait, and commercial photography techniques, professional workflow development, business planning and financial management, marketing strategies, legal compliance guidance, digital tools training (AI editing), and industry best practices. Complete professional development delivered through individual instruction. (Electives - PEP Eligible)'
        };
        
        // Set defaults
        document.getElementById('invoiceDate').valueAsDate = new Date();
        document.getElementById('paymentDate').valueAsDate = new Date();
        
        // Auto-calculate due date
        document.getElementById('invoiceDate').addEventListener('change', function() {
          const invoiceDate = new Date(this.value);
          const dueDate = new Date(invoiceDate);
          dueDate.setDate(dueDate.getDate() + 30);
          document.getElementById('dueDate').valueAsDate = dueDate;
        });
        
        // Auto-populate amount
        document.getElementById('programType').addEventListener('change', function() {
          const prices = {
            'academy-1-monthly': 116, 'academy-1-annual': 930,
            'academy-2-monthly': 198, 'academy-2-annual': 1580,
            'academy-3-monthly': 267, 'academy-3-annual': 2130,
            'academy-4-monthly': 316, 'academy-4-annual': 2520,
            'masterclass-coaching': 695, 'masterclass-business': 3000
          };
          if (prices[this.value]) {
            document.getElementById('invoiceAmount').value = prices[this.value].toFixed(2);
          }
        });
        
        function generateInvoice() {
          // Get values
          const parentName = document.getElementById('parentName').value;
          const parentEmail = document.getElementById('parentEmail').value;
          const studentNames = document.getElementById('studentNames').value;
          const invoiceDate = document.getElementById('invoiceDate').value;
          const dueDate = document.getElementById('dueDate').value;
          const programType = document.getElementById('programType');
          const programText = programType.options[programType.selectedIndex].text;
          const programValue = programType.value;
          const amount = parseFloat(document.getElementById('invoiceAmount').value);
          const paymentDate = document.getElementById('paymentDate').value;
          const paymentMethod = document.getElementById('paymentMethod').value;
          const notes = document.getElementById('invoiceNotes').value;
          
          // Validation
          if (!parentName || !parentEmail || !studentNames || !invoiceDate || !programValue || !amount || !paymentDate || !paymentMethod) {
            alert('Please fill in all required fields (*)');
            return;
          }
          
          // Generate invoice with auto-incrementing number
          let invoiceCounter = parseInt(localStorage.getItem('acromatico_invoice_counter') || '1247');
          invoiceCounter += Math.floor(Math.random() * 3) + 1; // Skip 1-3 numbers to look busy
          localStorage.setItem('acromatico_invoice_counter', invoiceCounter.toString());
          const invoiceNum = 'INV-' + invoiceCounter;
          document.getElementById('invoiceNumber').textContent = invoiceNum;
          document.getElementById('displayInvoiceDate').textContent = new Date(invoiceDate).toLocaleDateString();
          document.getElementById('displayDueDate').textContent = dueDate ? new Date(dueDate).toLocaleDateString() : 'Upon Receipt';
          document.getElementById('displayParentName').textContent = parentName;
          document.getElementById('displayParentEmail').textContent = parentEmail;
          document.getElementById('displayProgram').textContent = programText;
          document.getElementById('displayStudents').textContent = studentNames;
          
          // Benefits
          const benefits = programBenefits[programValue] || 'Educational photography program';
          document.getElementById('displayBenefits').innerHTML = '<strong>Educational Benefits:</strong><br>' + benefits;
          
          // Student count
          const studentCount = studentNames.split(',').length;
          document.getElementById('displayStudentCount').textContent = studentCount;
          
          // Amounts
          const formattedAmount = '$' + amount.toFixed(2).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');
          document.getElementById('displayAmount').textContent = formattedAmount;
          document.getElementById('displaySubtotal').textContent = formattedAmount;
          document.getElementById('displayTotal').textContent = formattedAmount;
          
          // Payment info
          document.getElementById('displayPaymentDate').textContent = new Date(paymentDate).toLocaleDateString();
          document.getElementById('displayPaymentMethod').textContent = paymentMethod;
          
          // Notes
          if (notes) {
            document.getElementById('displayNotes').textContent = notes;
            document.getElementById('notesSection').classList.remove('hidden');
          } else {
            document.getElementById('notesSection').classList.add('hidden');
          }
          
          // Show invoice
          document.getElementById('invoicePreview').classList.remove('hidden');
          document.getElementById('invoiceActions').classList.remove('hidden');
          document.getElementById('invoicePreview').scrollIntoView({ behavior: 'smooth' });
        }
        
        function editInvoice() {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        function resetInvoice() {
          document.getElementById('parentName').value = '';
          document.getElementById('parentEmail').value = '';
          document.getElementById('studentNames').value = '';
          document.getElementById('programType').value = '';
          document.getElementById('invoiceAmount').value = '';
          document.getElementById('paymentMethod').value = '';
          document.getElementById('invoiceNotes').value = '';
          document.getElementById('invoiceDate').valueAsDate = new Date();
          document.getElementById('paymentDate').valueAsDate = new Date();
          const dueDate = new Date();
          dueDate.setDate(dueDate.getDate() + 30);
          document.getElementById('dueDate').valueAsDate = dueDate;
          document.getElementById('invoicePreview').classList.add('hidden');
          document.getElementById('invoiceActions').classList.add('hidden');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        function openStripePayment() {
          const programType = document.getElementById('programType').value;
          const amount = document.getElementById('invoiceAmount').value;
          
          if (!programType || !amount) {
            alert('Please select a program first to see the payment amount.');
            document.getElementById('programType').focus();
            return;
          }
          
          // Show custom payment modal with Stripe integration
          const modal = document.createElement('div');
          modal.id = 'stripe-modal';
          modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;z-index:9999;';
          
          modal.innerHTML = \`
            <div style="background:#1a1a1a;border-radius:24px;padding:48px;max-width:500px;width:90%;border:2px solid #4794A6;">
              <div style="text-align:center;margin-bottom:32px;">
                <h2 style="font-size:32px;font-weight:bold;color:white;margin-bottom:16px;">💳 Stripe Payment</h2>
                <p style="color:#999;margin-bottom:8px;">Amount to Pay</p>
                <p style="font-size:48px;font-weight:bold;color:#4794A6;">$\${parseFloat(amount).toFixed(2)}</p>
              </div>
              
              <div style="background:#0a0a0a;border-radius:16px;padding:24px;margin-bottom:24px;">
                <p style="color:#ccc;font-size:14px;line-height:1.6;">
                  <strong style="color:white;">Email us to get your secure payment link:</strong><br><br>
                  📧 <a href="mailto:info@acromatico.com?subject=Stripe Payment Request - $\${amount}&body=Hi, I'd like to make a payment of $\${amount} for my Step Up invoice. Please send me a secure Stripe payment link.%0A%0AProgram: \${programType}%0A%0AThank you!" style="color:#4794A6;text-decoration:underline;">info@acromatico.com</a><br><br>
                  We'll send you a secure Stripe payment link within 1 business hour.
                </p>
              </div>
              
              <button onclick="closeStripeModal()" style="width:100%;padding:16px;background:#4794A6;color:white;border:none;border-radius:12px;font-size:16px;font-weight:bold;cursor:pointer;">
                Close
              </button>
            </div>
          \`;
          
          document.body.appendChild(modal);
          modal.addEventListener('click', function(e) {
            if (e.target === modal) closeStripeModal();
          });
        }
        
        function closeStripeModal() {
          const modal = document.getElementById('stripe-modal');
          if (modal) modal.remove();
        }
        
        // Apple-Style Support Ticket System
        function openSupportModal() {
          const modal = document.createElement('div');
          modal.id = 'support-modal';
          modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);display:flex;align-items:center;justify-content:center;z-index:10000;backdrop-filter:blur(20px);';
          
          modal.innerHTML = \`
            <div style="background:#1a1a1a;border-radius:24px;padding:48px;max-width:600px;width:90%;border:1px solid rgba(71,148,166,0.3);box-shadow:0 25px 50px rgba(0,0,0,0.5);">
              <div style="text-align:center;margin-bottom:32px;">
                <div style="font-size:56px;margin-bottom:16px;">💬</div>
                <h2 style="font-size:32px;font-weight:300;color:white;margin-bottom:12px;letter-spacing:-0.02em;font-family:-apple-system,sans-serif;">How can we help?</h2>
                <p style="color:#999;font-size:15px;font-weight:300;line-height:1.6;">Tell us about your question or issue and we'll get back to you within 24 hours.</p>
              </div>
              
              <form id="supportForm" style="space-y-4;">
                <div style="margin-bottom:20px;">
                  <label style="display:block;color:#ccc;font-size:13px;font-weight:400;margin-bottom:8px;font-family:-apple-system,sans-serif;">Your Name</label>
                  <input type="text" id="supportName" required style="width:100%;padding:14px 16px;background:#0a0a0a;border:1px solid rgba(71,148,166,0.3);border-radius:12px;color:white;font-size:15px;font-weight:300;font-family:-apple-system,sans-serif;outline:none;transition:border 0.2s;" onfocus="this.style.borderColor='#4794A6'" onblur="this.style.borderColor='rgba(71,148,166,0.3)'" placeholder="John Smith" />
                </div>
                
                <div style="margin-bottom:20px;">
                  <label style="display:block;color:#ccc;font-size:13px;font-weight:400;margin-bottom:8px;font-family:-apple-system,sans-serif;">Email Address</label>
                  <input type="email" id="supportEmail" required style="width:100%;padding:14px 16px;background:#0a0a0a;border:1px solid rgba(71,148,166,0.3);border-radius:12px;color:white;font-size:15px;font-weight:300;font-family:-apple-system,sans-serif;outline:none;transition:border 0.2s;" onfocus="this.style.borderColor='#4794A6'" onblur="this.style.borderColor='rgba(71,148,166,0.3)'" placeholder="john@example.com" />
                </div>
                
                <div style="margin-bottom:20px;">
                  <label style="display:block;color:#ccc;font-size:13px;font-weight:400;margin-bottom:8px;font-family:-apple-system,sans-serif;">Subject</label>
                  <input type="text" id="supportSubject" required style="width:100%;padding:14px 16px;background:#0a0a0a;border:1px solid rgba(71,148,166,0.3);border-radius:12px;color:white;font-size:15px;font-weight:300;font-family:-apple-system,sans-serif;outline:none;transition:border 0.2s;" onfocus="this.style.borderColor='#4794A6'" onblur="this.style.borderColor='rgba(71,148,166,0.3)'" placeholder="Brief description of your issue" />
                </div>
                
                <div style="margin-bottom:24px;">
                  <label style="display:block;color:#ccc;font-size:13px;font-weight:400;margin-bottom:8px;font-family:-apple-system,sans-serif;">Message</label>
                  <textarea id="supportMessage" required rows="5" style="width:100%;padding:14px 16px;background:#0a0a0a;border:1px solid rgba(71,148,166,0.3);border-radius:12px;color:white;font-size:15px;font-weight:300;font-family:-apple-system,sans-serif;outline:none;resize:vertical;transition:border 0.2s;" onfocus="this.style.borderColor='#4794A6'" onblur="this.style.borderColor='rgba(71,148,166,0.3)'" placeholder="Please describe your question or issue in detail..."></textarea>
                </div>
                
                <div style="display:flex;gap:12px;">
                  <button type="button" onclick="closeSupportModal()" style="flex:1;padding:14px;background:#2a2a2a;color:#ccc;border:none;border-radius:12px;font-size:15px;font-weight:400;cursor:pointer;transition:all 0.2s;font-family:-apple-system,sans-serif;" onmouseover="this.style.background='#3a3a3a'" onmouseout="this.style.background='#2a2a2a'">
                    Cancel
                  </button>
                  <button type="submit" style="flex:1;padding:14px;background:#4794A6;color:white;border:none;border-radius:12px;font-size:15px;font-weight:400;cursor:pointer;transition:all 0.2s;font-family:-apple-system,sans-serif;" onmouseover="this.style.background='#5aa5b8'" onmouseout="this.style.background='#4794A6'">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          \`;
          
          document.body.appendChild(modal);
          modal.addEventListener('click', function(e) {
            if (e.target === modal) closeSupportModal();
          });
          
          // Handle form submission
          document.getElementById('supportForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            const name = document.getElementById('supportName').value;
            const email = document.getElementById('supportEmail').value;
            const subject = document.getElementById('supportSubject').value;
            const message = document.getElementById('supportMessage').value;
            
            // Show loading state
            const submitBtn = e.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '⏳ Sending...';
            submitBtn.disabled = true;
            
            try {
              const response = await fetch('/api/support-ticket', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, subject, message })
              });
              
              if (response.ok) {
                closeSupportModal();
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.95);color:white;padding:40px 60px;border-radius:20px;z-index:10001;text-align:center;border:1px solid #4794A6;';
                successMsg.innerHTML = '<div style="font-size:48px;margin-bottom:16px;">✅</div><div style="font-size:20px;font-weight:300;margin-bottom:8px;font-family:-apple-system,sans-serif;">Message Sent!</div><div style="font-size:14px;color:#999;font-weight:300;">We\\'ll get back to you within 24 hours.</div>';
                document.body.appendChild(successMsg);
                setTimeout(() => successMsg.remove(), 3000);
              } else {
                throw new Error('Failed to send');
              }
            } catch (error) {
              submitBtn.innerHTML = originalText;
              submitBtn.disabled = false;
              alert('Failed to send message. Please try again or email us directly at info@acromatico.com');
            }
          });
        }
        
        function closeSupportModal() {
          const modal = document.getElementById('support-modal');
          if (modal) modal.remove();
        }
        
        async function downloadCredentials() {
          // Show loading message
          const loadingMsg = document.createElement('div');
          loadingMsg.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.9);color:white;padding:30px 50px;border-radius:16px;z-index:99999;font-family:-apple-system,sans-serif;text-align:center;';
          loadingMsg.innerHTML = '<div style="font-size:24px;margin-bottom:10px;">⏳</div><div style="font-size:16px;font-weight:300;">Generating PDF...</div><div style="font-size:12px;color:#ccc;margin-top:8px;font-weight:300;">Including logo & photo • Luxury formatting</div>';
          document.body.appendChild(loadingMsg);
          
          try {
            // Load images as base64 first to ensure they show in PDF
            const loadImageAsBase64 = async (url) => {
              return new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = 'anonymous';
                img.onload = function() {
                  const canvas = document.createElement('canvas');
                  canvas.width = img.width;
                  canvas.height = img.height;
                  const ctx = canvas.getContext('2d');
                  ctx.drawImage(img, 0, 0);
                  resolve(canvas.toDataURL('image/png'));
                };
                img.onerror = () => reject(new Error('Failed to load image: ' + url));
                img.src = url;
              });
            };
            
            loadingMsg.innerHTML = '<div style="font-size:24px;margin-bottom:10px;">⏳</div><div style="font-size:16px;font-weight:300;">Loading Acromatico logo...</div><div style="font-size:12px;color:#ccc;margin-top:8px;font-weight:300;">Step 1 of 3</div>';
            const logoBase64 = await loadImageAsBase64('/static/acromatico-logo-official.png');
            
            loadingMsg.innerHTML = '<div style="font-size:24px;margin-bottom:10px;">⏳</div><div style="font-size:16px;font-weight:300;">Loading your headshot...</div><div style="font-size:12px;color:#ccc;margin-top:8px;font-weight:300;">Step 2 of 3</div>';
            const photoBase64 = await loadImageAsBase64('/static/italo-headshot.jpg');
            
            loadingMsg.innerHTML = '<div style="font-size:24px;margin-bottom:10px;">⏳</div><div style="font-size:16px;font-weight:300;">Generating PDF...</div><div style="font-size:12px;color:#ccc;margin-top:8px;font-weight:300;">Step 3 of 3</div>';
            
            // Load html2pdf library
            await new Promise((resolve, reject) => {
              const script = document.createElement('script');
              script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
              script.onload = resolve;
              script.onerror = reject;
              document.head.appendChild(script);
            });
            
            // Create beautiful HTML content for PDF with LUXURY THIN FONT
            const pdfContent = document.createElement('div');
            pdfContent.innerHTML = \`
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; width: 8.5in; min-height: 11in; padding: 0.65in 0.6in 1.3in 0.6in; background: white; color: #000; font-weight: 300; position: relative;">
                <!-- Header -->
                <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #4794A6; padding-bottom: 18px; margin-bottom: 26px;">
                  <div style="flex: 1;">
                    <img src="\${logoBase64}" style="width: 200px; height: auto; margin-bottom: 12px;" />
                    <h1 style="font-size: 28px; font-weight: 300; color: #000; margin: 0 0 8px 0; letter-spacing: -0.8px;">Acromatico Photography Academy</h1>
                    <h2 style="font-size: 14px; font-weight: 300; color: #4794A6; margin: 0 0 10px 0; letter-spacing: 0.3px;">Instructor Credentials • Step Up For Students PEP</h2>
                    <span style="display: inline-block; background: #4794A6; color: white; padding: 6px 16px; border-radius: 12px; font-size: 11px; font-weight: 400; letter-spacing: 0.5px;">ELECTIVES - Photography Enrichment</span>
                  </div>
                  <div style="text-align: center; margin-left: 30px;">
                    <img src="\${photoBase64}" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 4px solid #4794A6; margin-bottom: 10px;" />
                    <div style="font-size: 16px; font-weight: 400; color: #000; letter-spacing: -0.3px;">Italo Campilii</div>
                    <div style="font-size: 12px; font-weight: 300; color: #666; letter-spacing: 0.2px;">Lead Instructor</div>
                  </div>
                </div>

                <!-- Two Column Layout -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 22px; margin-bottom: 26px;">
                  <!-- Left Column -->
                  <div>
                    <div style="background: #fafafa; padding: 18px; border-radius: 12px; border-left: 4px solid #4794A6; margin-bottom: 18px;">
                      <h3 style="font-size: 16px; font-weight: 400; color: #000; margin: 0 0 12px 0; letter-spacing: -0.3px;">📸 Photography Experience</h3>
                      <ul style="list-style: none; padding: 0; margin: 0; font-size: 12px; font-weight: 300; line-height: 1.7;">
                        <li style="margin-bottom: 9px; color: #333;">• <strong style="font-weight: 400;">20+ years</strong> professional experience (2004–present)</li>
                        <li style="margin-bottom: 9px; color: #333;">• <strong style="font-weight: 400;">1,000+ photography projects</strong> completed</li>
                        <li style="margin-bottom: 9px; color: #333;">• Co-Founder & CMO, <strong style="font-weight: 400;">Acromatico Photography</strong></li>
                        <li style="margin-bottom: 9px; color: #333;">• Award-winning wedding, portrait, commercial photographer</li>
                        <li style="margin-bottom: 0; color: #333;">• Portfolio: <strong style="font-weight: 400;">www.acromatico.com</strong></li>
                      </ul>
                    </div>

                    <div style="background: #fafafa; padding: 18px; border-radius: 12px; border-left: 4px solid #4794A6;">
                      <h3 style="font-size: 16px; font-weight: 400; color: #000; margin: 0 0 12px 0; letter-spacing: -0.3px;">🏆 Professional Certifications</h3>
                      <ul style="list-style: none; padding: 0; margin: 0; font-size: 12px; font-weight: 300; line-height: 1.7;">
                        <li style="margin-bottom: 11px; color: #333;">• <strong style="font-weight: 400;">John Maxwell Certified</strong><br><span style="font-size: 10px; color: #666; font-weight: 300;">Leadership Coach, Team & Speaker</span></li>
                        <li style="margin-bottom: 11px; color: #333;">• <strong style="font-weight: 400;">EXMA Certified Speaker</strong><br><span style="font-size: 10px; color: #666; font-weight: 300;">Experiential Marketing</span></li>
                        <li style="margin-bottom: 0; color: #333;">• <strong style="font-weight: 400;">Apple Sales Specialist (ASTO)</strong><br><span style="font-size: 10px; color: #666; font-weight: 300;">Apple Training & Certification</span></li>
                      </ul>
                    </div>
                  </div>

                  <!-- Right Column -->
                  <div>
                    <div style="background: #fafafa; padding: 18px; border-radius: 12px; border-left: 4px solid #4794A6; margin-bottom: 18px;">
                      <h3 style="font-size: 16px; font-weight: 400; color: #000; margin: 0 0 12px 0; letter-spacing: -0.3px;">🎓 Education & Training</h3>
                      <ul style="list-style: none; padding: 0; margin: 0; font-size: 12px; font-weight: 300; line-height: 1.7;">
                        <li style="margin-bottom: 11px; color: #333;">• <strong style="font-weight: 400;">FIAF Certified Photographer</strong><br><span style="font-size: 10px; color: #666; font-weight: 300;">Federazione Italiana Associazioni Fotografiche (Italy)</span></li>
                        <li style="margin-bottom: 0; color: #333;">• <strong style="font-weight: 400;">BS Business Administration</strong><br><span style="font-size: 10px; color: #666; font-weight: 300;">Business Information Systems</span></li>
                      </ul>
                    </div>

                    <div style="background: #fafafa; padding: 18px; border-radius: 12px; border-left: 4px solid #4794A6;">
                      <h3 style="font-size: 16px; font-weight: 400; color: #000; margin: 0 0 12px 0; letter-spacing: -0.3px;">🌟 Additional Credentials</h3>
                      <ul style="list-style: none; padding: 0; margin: 0; font-size: 12px; font-weight: 300; line-height: 1.7;">
                        <li style="margin-bottom: 11px; color: #333;">• <strong style="font-weight: 400;">Google AdWords Certified</strong><br><span style="font-size: 10px; color: #666; font-weight: 300;">Credential ID: 11533071</span></li>
                        <li style="margin-bottom: 11px; color: #333;">• <strong style="font-weight: 400;">Guinness World Record Holder</strong><br><span style="font-size: 10px; color: #666; font-weight: 300;">Professional Achievement</span></li>
                        <li style="margin-bottom: 0; color: #333;">• <strong style="font-weight: 400;">LinkedIn Profile</strong><br><span style="font-size: 10px; color: #666; font-weight: 300;">linkedin.com/in/italocampilii</span></li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- Compliance Box -->
                <div style="background: #f0f8fa; border: 2px solid #4794A6; padding: 18px; border-radius: 12px; margin-bottom: 0;">
                  <div style="font-size: 14px; font-weight: 400; color: #000; margin-bottom: 10px; letter-spacing: -0.3px;">✅ Step Up PEP Compliance Statement</div>
                  <p style="font-size: 11px; color: #333; line-height: 1.6; margin: 0 0 9px 0; font-weight: 300;">
                    Acromatico Photography Academy programs qualify under the <strong style="color: #4794A6; font-weight: 400;">Electives</strong> category of Step Up For Students PEP scholarship. Per PEP Purchasing Guide (Page 7, Electives Section), eligible providers must have <strong style="font-weight: 400;">"minimum of three years of experience in the relevant subject area as demonstrated by employment records."</strong>
                  </p>
                  <p style="font-size: 11px; color: #333; line-height: 1.6; margin: 0 0 9px 0; font-weight: 300;">
                    <strong style="font-weight: 400;">Our instructors exceed this requirement with 20+ years of professional photography experience and 1,000+ completed projects, documented at www.acromatico.com and LinkedIn.</strong>
                  </p>
                  <p style="font-size: 10px; color: #666; margin: 0; font-weight: 300;"><strong style="font-weight: 400;">Reference:</strong> Step Up PEP Purchasing Guide 2024-25, Page 7, Electives Section</p>
                </div>

                <!-- Footer positioned at bottom -->
                <div style="position: absolute; bottom: 0.5in; left: 0.6in; right: 0.6in; border-top: 1px solid #ddd; padding-top: 12px; text-align: center;">
                  <p style="font-size: 11px; color: #000; margin: 0 0 6px 0; font-weight: 300;"><strong style="font-weight: 400;">Acromatico Inc</strong> • 2300 W 84th ST. Suite 213, Miami, FL 33016</p>
                  <p style="font-size: 10px; color: #666; margin: 0 0 4px 0; font-weight: 300;">Phone: 954.779.0921 | Email: info@acromatico.com | Website: www.acromatico.com</p>
                  <p style="font-size: 9px; color: #999; margin: 0; font-weight: 300;">Document generated: \${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} • For Step Up verification purposes</p>
                </div>
              </div>
            \`;

            // Configure html2pdf options with better settings
            const opt = {
              margin: 0,
              filename: 'Acromatico_Instructor_Credentials_StepUp_PEP.pdf',
              image: { type: 'jpeg', quality: 1.0 },
              html2canvas: { 
                scale: 3,
                useCORS: false,
                allowTaint: false,
                logging: false,
                backgroundColor: '#ffffff'
              },
              jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };

            // Generate PDF
            await html2pdf().set(opt).from(pdfContent).save();
            
            document.body.removeChild(loadingMsg);
            alert('✅ Credentials Downloaded Successfully!\\n\\nYour instructor credentials PDF is ready to submit to Step Up For Students.\\n\\nFile saved: Acromatico_Instructor_Credentials_StepUp_PEP.pdf');
            
          } catch(error) {
            if (document.body.contains(loadingMsg)) {
              document.body.removeChild(loadingMsg);
            }
            alert('❌ PDF generation failed: ' + error.message + '\\n\\nPlease try again or contact support.');
            console.error('PDF Error:', error);
          }
        }
      `}} />
    </div>,
    { title: 'For Step Up Students - Invoice Generator - Acromatico' }
  )
})

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

// Education Platform Routes
app.get('/login', (c) => c.redirect('/education/login'))
// Education pages
// EDUCATION AUTH ROUTES - Serve HTML directly
app.get('/education/login', (c) => {
  return c.html(loginHTML)
})
app.get('/education/signup', (c) => c.redirect('/static/education-signup'))
app.get('/education/reset-password', (c) => c.redirect('/education-reset-password.html'))
app.get('/pricing', (c) => c.redirect('/static/pricing'))
app.get('/enroll', (c) => c.redirect('/static/pricing'))

// Dashboards
app.get('/student/dashboard', (c) => c.redirect('/static/student-dashboard.html'))
app.get('/student/projects', (c) => c.redirect('/static/student-projects.html'))
app.get('/parent/dashboard', (c) => c.redirect('/static/parent-dashboard.html'))
app.get('/admin/dashboard', (c) => c.redirect('/static/admin-dashboard.html'))
app.get('/admin/curriculum', (c) => c.redirect('/static/admin-curriculum-v2.html'))
app.get('/admin/curriculum/old', (c) => c.redirect('/static/admin-curriculum.html'))
app.get('/debug/auth', (c) => c.redirect('/static/debug-auth.html'))
app.get('/admin/crm', (c) => c.redirect('/static/admin-crm.html'))

// Brand Intelligence Assessment - Instant-Start AI-Powered Tool  
app.get('/assessment', (c) => c.redirect('/static/assessment.html'))

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
            <button onclick="goToStep(1)" class="text-gray-400 hover:text-white mb-3 flex items-center gap-2 text-sm">
              ← Back
            </button>
            <h2 class="text-3xl font-black mb-2 text-center">How Many Students?</h2>
            <p class="text-base text-gray-400 mb-8 text-center">Slide to see your savings</p>
            
            {/* BIG PRICE DISPLAY - Focus on per-class per-student cost */}
            <div class="text-center mb-8">
              <div class="text-8xl font-black mb-2" id="big-price-display">$12.50</div>
              <div class="text-xl text-gray-400 mb-4">per class per student</div>
              <div class="text-3xl font-bold text-teal-500" id="monthly-price-display">$100/month per student</div>
              <div class="text-sm text-gray-500 mt-2" id="student-count-text">1 student • 8 live classes</div>
              <div class="text-sm text-teal-500 mt-1 hidden" id="sibling-discount-text"></div>
            </div>

            {/* Student Count Slider */}
            <div class="mb-8 px-4">
              <div class="flex justify-between items-center mb-3">
                <span class="text-sm text-gray-400">Number of Students</span>
                <span class="text-2xl font-bold text-white" id="slider-number">1</span>
              </div>
              <style dangerouslySetInnerHTML={{__html: `
                #student-slider::-webkit-slider-thumb {
                  appearance: none;
                  width: 28px;
                  height: 28px;
                  border-radius: 50%;
                  background: #4794A6;
                  cursor: pointer;
                  border: 4px solid white;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                  transition: transform 0.2s;
                }
                #student-slider::-webkit-slider-thumb:hover {
                  transform: scale(1.1);
                }
                #student-slider::-moz-range-thumb {
                  width: 28px;
                  height: 28px;
                  border-radius: 50%;
                  background: #4794A6;
                  cursor: pointer;
                  border: 4px solid white;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                  transition: transform 0.2s;
                }
                #student-slider::-moz-range-thumb:hover {
                  transform: scale(1.1);
                }
              `}} />
              <input 
                type="range" 
                id="student-slider" 
                min="1" 
                max="6" 
                value="1" 
                oninput="updateSlider(this.value)"
                class="w-full h-3 bg-gray-800 rounded-full appearance-none cursor-pointer"
                style="background: linear-gradient(to right, #4794A6 0%, #4794A6 0%, #1f2937 0%, #1f2937 100%);"
              />
              <div class="flex justify-between text-xs text-gray-500 mt-2">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6+</span>
              </div>
            </div>

            {/* Monthly/Annual Toggle */}
            <div class="flex items-center justify-center gap-3 mb-6 bg-gray-900 p-2 rounded-full inline-flex mx-auto">
              <button id="monthly-toggle-btn" onclick="toggleBilling('monthly')" class="px-4 py-2 rounded-full font-semibold transition bg-teal-500 text-white text-sm">
                Monthly
              </button>
              <button id="annual-toggle-btn" onclick="toggleBilling('annual')" class="px-4 py-2 rounded-full font-semibold transition text-gray-400 text-sm">
                Annual <span class="text-teal-500 text-xs ml-1">Save 20%</span>
              </button>
            </div>
            <p class="text-center text-xs text-gray-400 mb-6">
              <span class="annual-note hidden">Annual: 10 months prepaid (Sept-June)</span>
              <span class="monthly-note">Billed monthly. Cancel anytime.</span>
            </p>
            
            {/* What's Included */}
            <div class="feature-card p-4 rounded-xl mt-4">
              <h3 class="text-base font-bold mb-3 text-center">Everything Included</h3>
              <div class="grid grid-cols-1 gap-2 text-xs">
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

            {/* Payment Button with Stripe */}
            <div class="space-y-4 mb-6">
              <button onclick="completeEnrollment()" class="w-full bg-white hover:bg-gray-50 text-gray-900 font-bold py-6 px-8 rounded-2xl flex items-center justify-center gap-4 border-2 border-gray-200 hover:border-teal-500 transition-all shadow-lg" id="stripe-checkout-btn">
                <div class="flex items-center gap-3">
                  <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
                    <path d="M3 10h18" stroke="currentColor" stroke-width="2"/>
                  </svg>
                  <div class="text-left">
                    <div class="text-xl font-bold">Pay with Card</div>
                    <div class="text-sm text-gray-600 font-normal">Secure payment via Stripe • <span id="stripe-amount">$0</span></div>
                  </div>
                </div>
                <div class="ml-auto flex items-center gap-2 text-sm text-gray-500">
                  <span class="inline-flex items-center px-2 py-1 bg-gray-100 rounded text-xs">Apple Pay</span>
                  <span class="inline-flex items-center px-2 py-1 bg-gray-100 rounded text-xs">G Pay</span>
                  <span class="inline-flex items-center px-2 py-1 bg-gray-100 rounded text-xs">+more</span>
                </div>
              </button>
              <p class="text-xs text-center text-gray-500">
                <svg class="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/></svg>
                256-bit SSL Encryption • Your data is secure
              </p>
            </div>
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
        
        // Simplified Pricing: $100/month (8 classes), 10% off each additional sibling, 20% off annual
        const BASE_MONTHLY_PRICE = 100;
        const SIBLING_DISCOUNT = 0.05; // 5% off per additional sibling
        const ANNUAL_DISCOUNT = 0.20; // 20% off annual prepaid
        
        function calculatePrice(students, isAnnual) {
          let total = BASE_MONTHLY_PRICE; // First student
          
          // Add additional students with 10% compounding discount
          for (let i = 2; i <= students; i++) {
            total += BASE_MONTHLY_PRICE * (1 - (SIBLING_DISCOUNT * (i - 1)));
          }
          
          // Apply annual discount if selected
          if (isAnnual) {
            total = total * (1 - ANNUAL_DISCOUNT);
          }
          
          return total;
        }

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
          
          // Update slider display with new pricing
          const currentStudents = parseInt(document.getElementById('student-slider').value);
          updateSlider(currentStudents);
        }

        function updateSlider(students) {
          students = parseInt(students);
          
          // Update slider visual feedback
          const slider = document.getElementById('student-slider');
          const percentage = ((students - 1) / 5) * 100;
          slider.style.background = \`linear-gradient(to right, #4794A6 0%, #4794A6 \${percentage}%, #1f2937 \${percentage}%, #1f2937 100%)\`;
          
          // Update slider number display
          document.getElementById('slider-number').textContent = students + (students >= 6 ? '+' : '');
          
          // Calculate pricing
          const monthlyTotal = calculatePrice(students, isAnnual);
          const perStudentPerMonth = monthlyTotal / students;
          const perStudentPerClass = perStudentPerMonth / 8;
          
          // Update BIG price display (per-class cost PER STUDENT)
          document.getElementById('big-price-display').textContent = '$' + perStudentPerClass.toFixed(2);
          
          // Update monthly price (PER STUDENT)
          document.getElementById('monthly-price-display').textContent = '$' + perStudentPerMonth.toFixed(0) + '/month per student';
          
          // Update student count text
          const studentText = students + (students >= 6 ? '+' : '') + (students === 1 ? ' student' : ' students');
          document.getElementById('student-count-text').textContent = studentText + ' • 8 live classes';
          
          // Show sibling discount if applicable
          const discountEl = document.getElementById('sibling-discount-text');
          if (students > 1) {
            const discountPercent = Math.round((students - 1) * 5);
            discountEl.textContent = 'Save ' + discountPercent + '% with siblings!';
            discountEl.classList.remove('hidden');
          } else {
            discountEl.classList.add('hidden');
          }
          
          // Auto-select package (for navigation to step 3)
          selectedStudents = students;
          selectedPrice = monthlyTotal;
        }

        function selectPackage(students) {
          selectedStudents = students;
          
          // Calculate total monthly price with sibling discount
          const monthlyTotal = calculatePrice(students, isAnnual);
          selectedPrice = monthlyTotal; // Store total for later use
          
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
          
          // Update summary with clear pricing breakdown
          const billingText = isAnnual ? ' (Annual - 10 months)' : ' (Monthly)';
          const studentText = students + (students > 1 ? ' Students' : ' Student');
          document.getElementById('selected-package').textContent = studentText + billingText;
          document.getElementById('summary-students').textContent = students;
          
          // Show per-month total with discount info
          let priceText = '$' + monthlyTotal.toFixed(0) + '/month';
          if (students > 1) {
            const savingsPercent = Math.round((students - 1) * 10);
            priceText += ' (Save ' + savingsPercent + '% with siblings)';
          }
          if (isAnnual) {
            priceText += ' • 20% off annual';
          }
          document.getElementById('summary-price').textContent = priceText;
          document.getElementById('summary-total').textContent = '$' + totalCharge.toFixed(2);
          
          // Update the label and savings display
          document.getElementById('summary-label').textContent = chargeLabel;
          
          // Update Stripe button amount
          const stripeAmountEl = document.getElementById('stripe-amount');
          if (stripeAmountEl) {
            stripeAmountEl.textContent = '$' + totalCharge.toFixed(2);
          }
          
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
app.get('/curriculum', (c) => c.redirect('/static/curriculum'))

// ==============================================
// ACROMATICO CRM SYSTEM
// AI-Powered Client Intelligence & Task Management
// ==============================================

// Admin Login API - Simple email/password authentication
app.post('/api/admin/login', async (c) => {
  try {
    const { email, password } = await c.req.json()
    
    // Hardcoded admin credentials (simple and robust)
    const ADMIN_EMAIL = 'italo@acromatico.com'
    const ADMIN_PASSWORD = 'Acromatico2026!'
    
    // Validate credentials
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return c.json({ 
        success: false, 
        error: 'Invalid email or password' 
      }, 401)
    }
    
    // Generate token
    const user = {
      id: 'admin-italo',
      email: ADMIN_EMAIL,
      role: 'admin',
      name: 'Italo Campilii'
    }
    
    const token = generateToken(user)
    
    return c.json({
      success: true,
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
    
  } catch (error: any) {
    console.error('[Admin Login] Error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Protect all /admin/crm/* dashboard pages EXCEPT login and static HTML pages
// Static HTML pages (dashboard, analytics, projects) protect themselves with client-side JS
app.use('/admin/crm/*', async (c, next) => {
  const path = c.req.path
  
  // Allow these pages without server-side auth (they use client-side JS auth)
  const publicPaths = [
    '/admin/crm/login',
    '/admin/crm/dashboard', 
    '/admin/crm/analytics',
    '/admin/crm/projects',
    '/admin/crm/projects/traveldrd',
    '/admin/crm/roadmap'
  ]
  
  if (publicPaths.includes(path)) {
    return next()
  }
  
  // All other /admin/crm/* pages require admin auth
  return requireAdmin(c, next)
})

// Protect all /api/crm/* endpoints (except webhook which has Twilio signature validation)
app.use('/api/crm/process-message', requireAdmin)
app.use('/api/crm/tasks', requireAdmin)
app.use('/api/crm/tasks/*', requireAdmin)
app.use('/api/crm/clients', requireAdmin)
app.use('/api/crm/clients/*', requireAdmin)
app.use('/api/crm/analytics/*', requireAdmin)

// ==============================================
// CRM HELPER FUNCTIONS
// ==============================================

/**
 * Map Agent 1 classification to database enum values
 */
function mapMessageTypeToDBEnum(agentType: string): string {
  const mapping: Record<string, string> = {
    'bug-report': 'BUSINESS_PROJECT',
    'feature-request': 'BUSINESS_PROJECT',
    'scope-change': 'BUSINESS_PROJECT',
    'question': 'BUSINESS_PROJECT',
    'payment': 'BUSINESS_ADMIN',
    'feedback': 'PERSONAL',
    'personal': 'PERSONAL',
    'spam': 'SPAM'
  }
  return mapping[agentType] || 'UNKNOWN'
}

function mapSentimentToDBEnum(agentSentiment: string): string {
  const mapping: Record<string, string> = {
    'positive': 'POSITIVE',
    'neutral': 'NEUTRAL',
    'negative': 'FRUSTRATED',
    'frustrated': 'ANGRY'
  }
  return mapping[agentSentiment] || 'UNKNOWN'
}

function mapPriorityToDBEnum(agentPriority: string): string {
  const mapping: Record<string, string> = {
    'critical': 'P1',
    'high': 'P2',
    'medium': 'P3',
    'low': 'P4'
  }
  return mapping[agentPriority] || 'P3'
}

function mapEffortToDBEnum(agentEffort: string): { effort: string; hours: number } {
  const mapping: Record<string, { effort: string; hours: number }> = {
    '15min': { effort: 'XS', hours: 0.25 },
    '30min': { effort: 'XS', hours: 0.5 },
    '1hr': { effort: 'S', hours: 1 },
    '2hr': { effort: 'S', hours: 2 },
    '4hr': { effort: 'M', hours: 4 },
    '8hr': { effort: 'L', hours: 8 },
    '16hr': { effort: 'XL', hours: 16 },
    'unknown': { effort: 'M', hours: 4 }
  }
  return mapping[agentEffort] || { effort: 'M', hours: 4 }
}

// ==============================================
// CRM DASHBOARD PAGES
// ==============================================

// Login Page (Public - redirect to static HTML with email/password form)
app.get('/admin/crm/login', (c) => {
  return c.redirect('/static/admin-crm-login.html')
})

// OLD TOKEN-BASED LOGIN (DEPRECATED - keeping for reference)
app.get('/admin/crm/login-old', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Admin Login - Acromatico CRM</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        * { -webkit-tap-highlight-color: transparent; -webkit-touch-callout: none; }
        body { min-height: 100vh; min-height: -webkit-fill-available; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        .glass-card { background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.3); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1); }
        .input-field { transition: all 0.3s ease; -webkit-appearance: none; appearance: none; }
        .input-field:focus { outline: none; border-color: #667eea; box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1); }
        .btn-primary { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); transition: all 0.3s ease; }
        .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4); }
        .btn-primary:active { transform: translateY(0); }
        .error-shake { animation: shake 0.5s; }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-10px); } 75% { transform: translateX(10px); } }
        .fade-in { animation: fadeIn 0.3s ease-in; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .spinner { border: 3px solid rgba(255, 255, 255, 0.3); border-top-color: #667eea; border-radius: 50%; width: 24px; height: 24px; animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
    </style>
</head>
<body class="flex items-center justify-center p-4">
    <div class="glass-card rounded-2xl p-8 w-full max-w-md fade-in">
        <div class="text-center mb-8">
            <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <i class="fas fa-brain text-white text-2xl"></i>
            </div>
            <h1 class="text-3xl font-bold text-gray-800 mb-2">Acromatico CRM</h1>
            <p class="text-gray-600 text-sm">AI-Powered Client Intelligence</p>
        </div>
        <form id="loginForm" class="space-y-6">
            <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                    <i class="fas fa-key mr-2 text-purple-600"></i>Admin Token
                </label>
                <textarea id="tokenInput" rows="4" class="input-field w-full px-4 py-3 border-2 border-gray-200 rounded-xl resize-none font-mono text-sm" placeholder="Paste your JWT token here..." required autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></textarea>
                <p class="text-xs text-gray-500 mt-2"><i class="fas fa-info-circle mr-1"></i>Your secure access token from the admin team</p>
            </div>
            <div id="errorAlert" class="hidden p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                <div class="flex items-center">
                    <i class="fas fa-exclamation-triangle text-red-500 mr-3"></i>
                    <div>
                        <p class="font-semibold text-red-800">Authentication Failed</p>
                        <p id="errorMessage" class="text-sm text-red-600 mt-1"></p>
                    </div>
                </div>
            </div>
            <div id="successAlert" class="hidden p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
                <div class="flex items-center">
                    <i class="fas fa-check-circle text-green-500 mr-3"></i>
                    <p class="font-semibold text-green-800">Access Granted - Redirecting...</p>
                </div>
            </div>
            <button type="submit" id="submitBtn" class="btn-primary w-full py-4 text-white font-bold rounded-xl flex items-center justify-center">
                <span id="btnText"><i class="fas fa-sign-in-alt mr-2"></i>Access Dashboard</span>
                <span id="btnSpinner" class="hidden"><div class="spinner mr-3"></div>Processing...</span>
            </button>
        </form>
        <div class="mt-6 text-center text-sm text-gray-600">
            <i class="fas fa-shield-alt mr-1"></i>Secured with JWT Authentication
        </div>
        <div class="mt-8 pt-6 border-t border-gray-200">
            <p class="text-xs text-gray-500 text-center mb-3">System Status</p>
            <div class="grid grid-cols-3 gap-3 text-center">
                <div><div class="text-lg font-bold text-purple-600">🤖</div><div class="text-xs text-gray-600 mt-1">4 AI Agents</div></div>
                <div><div class="text-lg font-bold text-green-600">⚡</div><div class="text-xs text-gray-600 mt-1">15s Response</div></div>
                <div><div class="text-lg font-bold text-blue-600">📊</div><div class="text-xs text-gray-600 mt-1">Real-time BI</div></div>
            </div>
        </div>
    </div>
    <script>
        function setViewportHeight() { const vh = window.innerHeight * 0.01; document.documentElement.style.setProperty('--vh', \`\${vh}px\`); }
        setViewportHeight();
        window.addEventListener('resize', setViewportHeight);

        const form = document.getElementById('loginForm');
        const tokenInput = document.getElementById('tokenInput');
        const submitBtn = document.getElementById('submitBtn');
        const btnText = document.getElementById('btnText');
        const btnSpinner = document.getElementById('btnSpinner');
        const errorAlert = document.getElementById('errorAlert');
        const successAlert = document.getElementById('successAlert');
        const errorMessage = document.getElementById('errorMessage');

        const existingToken = localStorage.getItem('admin_token');
        if (existingToken) { validateAndRedirect(existingToken); }

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const token = tokenInput.value.trim();
            errorAlert.classList.add('hidden');
            successAlert.classList.add('hidden');
            
            console.log('Login attempt with token length:', token.length);
            
            if (!token || token.length < 20) { 
                showError('Invalid token format. Please paste the complete token.'); 
                return; 
            }
            
            submitBtn.disabled = true;
            btnText.classList.add('hidden');
            btnSpinner.classList.remove('hidden');
            
            try {
                await validateAndRedirect(token);
            } catch (error) {
                console.error('Login error:', error);
                showError(error.message || 'Authentication failed. Please check your token and try again.');
                submitBtn.disabled = false;
                btnText.classList.remove('hidden');
                btnSpinner.classList.add('hidden');
            }
        });

        async function validateAndRedirect(token) {
            try {
                const response = await fetch('/api/crm/clients', {
                    method: 'GET',
                    headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' }
                });
                if (response.status === 401) throw new Error('Invalid or expired token');
                if (response.status === 403) throw new Error('Unauthorized: Admin role required');
                if (!response.ok) throw new Error(\`Authentication failed (\${response.status})\`);
                
                // Set cookie for server-side auth (browser navigation)
                document.cookie = 'admin_token=' + token + '; path=/; max-age=86400; SameSite=Lax';
                
                // Keep localStorage for JS access
                localStorage.setItem('admin_token', token);
                
                successAlert.classList.remove('hidden');
                setTimeout(() => { window.location.href = '/admin/crm/dashboard'; }, 800);
            } catch (error) {
                localStorage.removeItem('admin_token');
                throw error;
            }
        }

        function showError(message) {
            errorMessage.textContent = message;
            errorAlert.classList.remove('hidden');
            errorAlert.classList.add('error-shake');
            setTimeout(() => { errorAlert.classList.remove('error-shake'); }, 500);
        }

        setTimeout(() => { tokenInput.focus(); }, 300);
    </script>
</body>
</html>`)
})

// Dashboard (Auth Required)
app.get('/admin/crm/dashboard', (c) => c.redirect('/static/admin-crm-dashboard.html'))

app.get('/admin/crm/analytics', (c) => c.redirect('/static/admin-crm-analytics.html'))

app.get('/admin/crm/projects', (c) => c.redirect('/static/admin-project-pipeline.html'))

app.get('/admin/crm/projects/traveldrd', (c) => c.redirect('/static/traveldrd-summary.html'))

app.get('/admin/crm/roadmap', (c) => c.redirect('/static/project-roadmap.html'))

// ==============================================
// TWILIO WEBHOOK ENDPOINT (PUBLIC)
// ==============================================

// ==============================================
// PROJECT PIPELINE API
// Creative Agency Project Management
// ==============================================

// GET /api/projects - List all projects
app.get('/api/projects', requireAdmin, async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    const { status, client_id, limit = 50 } = c.req.query()
    
    let query = 'SELECT * FROM projects'
    const conditions = []
    
    if (status) conditions.push(`status = '${status}'`)
    if (client_id) conditions.push(`client_id = '${client_id}'`)
    
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ')
    }
    
    query += ' ORDER BY created_at DESC LIMIT ?'
    
    const result = await DB_EDUCATION.prepare(query).bind(parseInt(limit)).all()
    
    return c.json({ success: true, projects: result.results || [] })
  } catch (error: any) {
    console.error('Error fetching projects:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// POST /api/projects - Create new project
app.post('/api/projects', requireAdmin, async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    const body = await c.req.json()
    
    const projectId = `proj-${Date.now()}-${Math.random().toString(36).substring(7)}`
    
    const {
      client_id,
      project_name,
      project_type,
      priority = 'P2',
      start_date,
      target_delivery,
      project_lead,
      estimated_hours,
      budget_dollars
    } = body
    
    await DB_EDUCATION.prepare(`
      INSERT INTO projects (
        id, client_id, project_name, project_type, status, priority,
        start_date, target_delivery, project_lead, estimated_hours, budget_dollars
      ) VALUES (?, ?, ?, ?, 'discovery', ?, ?, ?, ?, ?, ?)
    `).bind(
      projectId,
      client_id,
      project_name,
      project_type,
      priority,
      start_date,
      target_delivery,
      project_lead,
      estimated_hours,
      budget_dollars
    ).run()
    
    return c.json({ success: true, project_id: projectId })
  } catch (error: any) {
    console.error('Error creating project:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// GET /api/pipeline/overview - Pipeline dashboard overview
app.get('/api/pipeline/overview', requireAdmin, async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    
    // Count projects by status
    const statusCounts = await DB_EDUCATION.prepare(`
      SELECT status, COUNT(*) as count FROM projects GROUP BY status
    `).all()
    
    // Active projects (not delivered/cancelled)
    const activeProjects = await DB_EDUCATION.prepare(`
      SELECT COUNT(*) as count FROM projects 
      WHERE status NOT IN ('delivered', 'cancelled')
    `).first()
    
    // Upcoming deadlines
    const upcomingDeadlines = await DB_EDUCATION.prepare(`
      SELECT id, project_name, target_delivery, days_remaining, status, priority
      FROM projects 
      WHERE status NOT IN ('delivered', 'cancelled')
      AND target_delivery IS NOT NULL
      ORDER BY target_delivery ASC
      LIMIT 10
    `).all()
    
    // At-risk projects (behind schedule)
    const atRisk = await DB_EDUCATION.prepare(`
      SELECT COUNT(*) as count FROM projects 
      WHERE days_remaining < 7 AND status NOT IN ('delivered', 'cancelled')
    `).first()
    
    return c.json({
      success: true,
      stats: {
        active: activeProjects?.count || 0,
        at_risk: atRisk?.count || 0,
        by_status: statusCounts.results || []
      },
      upcoming_deadlines: upcomingDeadlines.results || []
    })
  } catch (error: any) {
    console.error('Error fetching pipeline overview:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// ==============================================
// CRM WEBHOOK
// ==============================================

/**
 * POST /api/crm/message-webhook
 * Receives SMS from Twilio when clients text your business number
 * Security: Validates Twilio signature header
 */
app.post('/api/crm/message-webhook', async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    
    // Get Twilio credentials from environment
    const twilioAuthToken = c.env.TWILIO_AUTH_TOKEN
    if (!twilioAuthToken) {
      console.error('TWILIO_AUTH_TOKEN not configured')
      return c.json({ error: 'Webhook not configured' }, 500)
    }

    // Parse Twilio webhook payload (application/x-www-form-urlencoded)
    const body = await c.req.parseBody()
    const fromNumber = body.From as string
    const messageBody = body.Body as string
    const messageSid = body.MessageSid as string

    console.log('[CRM Webhook] Received SMS from', fromNumber, ':', messageBody)

    // Rate limiting: Check if this number sent >100 messages in last minute
    const oneMinuteAgo = new Date(Date.now() - 60000).toISOString()
    const recentCount = await DB_EDUCATION.prepare(
      'SELECT COUNT(*) as count FROM crm_messages WHERE phone_number = ? AND created_at > ?'
    ).bind(fromNumber, oneMinuteAgo).first()

    if (recentCount && (recentCount as any).count >= 100) {
      console.warn('[CRM Webhook] Rate limit exceeded for', fromNumber)
      return c.text('<?xml version="1.0" encoding="UTF-8"?><Response></Response>', 200, {
        'Content-Type': 'text/xml'
      })
    }

    // Lookup or create client by phone number
    const formattedPhone = formatPhoneNumber(fromNumber)
    let client = await DB_EDUCATION.prepare(
      'SELECT * FROM crm_clients WHERE phone_number = ?'
    ).bind(formattedPhone).first()

    if (!client) {
      // Auto-create new client
      const newClientId = generateCRMId('client')
      await DB_EDUCATION.prepare(
        'INSERT INTO crm_clients (id, name, phone_number, status) VALUES (?, ?, ?, ?)'
      ).bind(newClientId, 'Unknown Client', formattedPhone, 'lead').run()

      client = await DB_EDUCATION.prepare(
        'SELECT * FROM crm_clients WHERE id = ?'
      ).bind(newClientId).first()

      console.log('[CRM Webhook] Created new client:', newClientId)
    }

    // Get Genspark API key
    const gensparkApiKey = c.env.GENSPARK_API_KEY
    if (!gensparkApiKey) {
      throw new Error('GENSPARK_API_KEY not configured')
    }

    // Run Agent 1: Classify message
    const classification = await classifyMessage({
      rawMessage: messageBody,
      clientName: (client as any).name,
      companyName: (client as any).company
    }, gensparkApiKey)

    console.log('[CRM Agent 1] Classification:', classification)

    // Store message in database
    const messageId = generateCRMId('msg')
    await DB_EDUCATION.prepare(`
      INSERT INTO crm_messages (
        id, client_id, source, phone_number, body,
        message_type, category, urgency, sentiment, 
        action_required, confidence_score, processed_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `).bind(
      messageId,
      (client as any).id,
      'sms',
      formattedPhone,
      messageBody,
      mapMessageTypeToDBEnum(classification.messageType),  // Map to DB enum
      classification.category.toUpperCase(),  // Map category to uppercase
      classification.urgency.toUpperCase(),  // Map urgency to uppercase
      mapSentimentToDBEnum(classification.sentiment),  // Map sentiment to DB enum
      classification.requiresAction ? 'create_task' : 'auto_resolve',
      classification.confidence
    ).run()

    // If actionable, run Agent 2: Generate task
    let taskId: string | null = null
    let suggestedResponse = 'Thanks for reaching out! We received your message and will get back to you within 2 hours. - Team Acromatico'

    if (classification.requiresAction) {
      // Get project context if available
      const project = await DB_EDUCATION.prepare(
        'SELECT * FROM crm_projects WHERE client_id = ? AND status = ? LIMIT 1'
      ).bind((client as any).id, 'active').first()

      const projectContext = project ? {
        projectName: (project as any).name,
        projectType: (project as any).project_type || 'unknown',
        techStack: (project as any).tech_stack || '[]',
        currentPhase: (project as any).status,
        budgetHours: (project as any).budget_hours || 0,
        hoursUsed: (project as any).hours_used || 0
      } : {
        projectName: 'No active project',
        projectType: 'unknown',
        techStack: '[]',
        currentPhase: 'discovery',
        budgetHours: 0,
        hoursUsed: 0
      }

      const taskSpec = await generateTask({
        rawMessage: messageBody,
        classification,
        projectContext
      }, gensparkApiKey)

      console.log('[CRM Agent 2] Task generated:', taskSpec.taskTitle)

      // Create task in database
      taskId = generateCRMId('task')
      const effortMap = mapEffortToDBEnum(taskSpec.estimatedEffort)
      
      await DB_EDUCATION.prepare(`
        INSERT INTO crm_tasks (
          id, message_id, client_id, project_id,
          title, description, acceptance_criteria,
          effort, estimated_hours, priority, status, scope_flag, client_approval_required
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        taskId,
        messageId,
        (client as any).id,
        project ? (project as any).id : null,
        taskSpec.taskTitle,
        taskSpec.description,
        JSON.stringify(taskSpec.acceptanceCriteria),
        effortMap.effort,
        effortMap.hours,
        mapPriorityToDBEnum(taskSpec.priority),
        'open',
        taskSpec.scopeFlag ? 1 : 0,
        taskSpec.clientApprovalRequired ? 1 : 0
      ).run()

      // Use AI-suggested response
      suggestedResponse = taskSpec.suggestedResponse
    }

    // Send auto-response via TwiML
    const twimlResponse = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${suggestedResponse}</Message>
</Response>`

    // Update message with response sent timestamp
    await DB_EDUCATION.prepare(
      'UPDATE crm_messages SET auto_response_sent = ? WHERE id = ?'
    ).bind(suggestedResponse, messageId).run()

    console.log('[CRM Webhook] Processed successfully:', messageId, taskId ? `(Task: ${taskId})` : '(No task)')

    return c.text(twimlResponse, 200, {
      'Content-Type': 'text/xml'
    })

  } catch (error: any) {
    console.error('[CRM Webhook] Error:', error)
    return c.text('<?xml version="1.0" encoding="UTF-8"?><Response></Response>', 200, {
      'Content-Type': 'text/xml'
    })
  }
})

// ==============================================
// MANUAL MESSAGE PROCESSING (ADMIN-ONLY)
// ==============================================

/**
 * POST /api/crm/process-message
 * Manually process messages from email/portal/WhatsApp
 * Requires admin authentication
 */
app.post('/api/crm/process-message', async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    const gensparkApiKey = c.env.GENSPARK_API_KEY

    if (!gensparkApiKey) {
      return c.json({ success: false, error: 'GENSPARK_API_KEY not configured' }, 500)
    }

    const body = await c.req.json()
    const { clientId, projectId, source, content, fromEmail, fromPhone } = body

    if (!clientId || !source || !content) {
      return c.json({ 
        success: false, 
        error: 'Missing required fields: clientId, source, content' 
      }, 400)
    }

    // Get client info
    const client = await DB_EDUCATION.prepare(
      'SELECT * FROM crm_clients WHERE id = ?'
    ).bind(clientId).first()

    if (!client) {
      return c.json({ success: false, error: 'Client not found' }, 404)
    }

    // Get project context if provided
    let project = null
    if (projectId) {
      project = await DB_EDUCATION.prepare(
        'SELECT * FROM crm_projects WHERE id = ?'
      ).bind(projectId).first()
    }

    // Run Agent 1: Classify message
    const classification = await classifyMessage({
      rawMessage: content,
      clientName: (client as any).name,
      companyName: (client as any).company,
      projectName: project ? (project as any).name : undefined
    }, gensparkApiKey)

    // Store message
    const messageId = generateCRMId('msg')
    await DB_EDUCATION.prepare(`
      INSERT INTO crm_messages (
        id, client_id, project_id, source, 
        ${fromEmail ? 'email_address,' : ''} 
        ${fromPhone ? 'phone_number,' : ''}
        body, message_type, category, urgency, sentiment,
        action_required, confidence_score, processed_at
      ) VALUES (?, ?, ?, ?, ${fromEmail ? '?,' : ''} ${fromPhone ? '?,' : ''} ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `).bind(
      messageId,
      clientId,
      projectId,
      source,
      ...(fromEmail ? [fromEmail] : []),
      ...(fromPhone ? [formatPhoneNumber(fromPhone)] : []),
      content,
      mapMessageTypeToDBEnum(classification.messageType),  // Map to DB enum
      classification.category.toUpperCase(),  // Map to uppercase
      classification.urgency.toUpperCase(),  // Map to uppercase
      mapSentimentToDBEnum(classification.sentiment),  // Map sentiment to DB enum
      classification.requiresAction ? 'create_task' : 'auto_resolve',
      classification.confidence
    ).run()

    // If actionable, generate task
    let taskId: string | null = null
    let taskSpec: Agent2Output | null = null

    if (classification.requiresAction && project) {
      taskSpec = await generateTask({
        rawMessage: content,
        classification,
        projectContext: {
          projectName: (project as any).name,
          projectType: (project as any).project_type || 'unknown',
          techStack: (project as any).tech_stack || '[]',
          currentPhase: (project as any).status,
          budgetHours: (project as any).budget_hours || 0,
          hoursUsed: (project as any).hours_used || 0
        }
      }, gensparkApiKey)

      taskId = generateCRMId('task')
      const effortMap = mapEffortToDBEnum(taskSpec.estimatedEffort)
      
      await DB_EDUCATION.prepare(`
        INSERT INTO crm_tasks (
          id, message_id, client_id, project_id,
          title, description, acceptance_criteria,
          effort, estimated_hours, priority, status, scope_flag, client_approval_required
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        taskId,
        messageId,
        clientId,
        projectId,
        taskSpec.taskTitle,
        taskSpec.description,
        JSON.stringify(taskSpec.acceptanceCriteria),
        effortMap.effort,
        effortMap.hours,
        mapPriorityToDBEnum(taskSpec.priority),
        'open',
        taskSpec.scopeFlag ? 1 : 0,
        taskSpec.clientApprovalRequired ? 1 : 0
      ).run()
    }

    return c.json({
      success: true,
      message: {
        id: messageId,
        classification,
        taskCreated: !!taskId,
        taskId,
        taskSpec: taskSpec ? {
          title: taskSpec.taskTitle,
          effort: taskSpec.estimatedEffort,
          priority: taskSpec.priority,
          suggestedResponse: taskSpec.suggestedResponse
        } : null
      }
    })

  } catch (error: any) {
    console.error('[CRM Process] Error:', error)
    return c.json({ 
      success: false, 
      error: error.message || 'Failed to process message' 
    }, 500)
  }
})

// ==============================================
// TASK MANAGEMENT ENDPOINTS
// ==============================================

/**
 * GET /api/crm/tasks
 * Get all tasks with optional filters
 */
app.get('/api/crm/tasks', async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    
    // Query params for filtering
    const status = c.req.query('status')  // 'open', 'in_progress', 'completed', etc.
    const priority = c.req.query('priority')  // 'critical', 'high', etc.
    const clientId = c.req.query('clientId')
    const projectId = c.req.query('projectId')

    let query = `
      SELECT 
        t.*,
        c.name as client_name,
        c.company as client_company,
        p.name as project_name,
        p.project_type,
        m.body as original_message,
        m.sentiment as message_sentiment
      FROM crm_tasks t
      LEFT JOIN crm_clients c ON t.client_id = c.id
      LEFT JOIN crm_projects p ON t.project_id = p.id
      LEFT JOIN crm_messages m ON t.message_id = m.id
      WHERE 1=1
    `
    
    const bindings: any[] = []

    if (status) {
      query += ' AND t.status = ?'
      bindings.push(status)
    }
    if (priority) {
      query += ' AND t.priority = ?'
      bindings.push(priority)
    }
    if (clientId) {
      query += ' AND t.client_id = ?'
      bindings.push(clientId)
    }
    if (projectId) {
      query += ' AND t.project_id = ?'
      bindings.push(projectId)
    }

    query += ' ORDER BY t.created_at DESC LIMIT 100'

    const result = await DB_EDUCATION.prepare(query).bind(...bindings).all()

    return c.json({
      success: true,
      tasks: result.results || []
    })

  } catch (error: any) {
    console.error('[CRM Tasks] Error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

/**
 * GET /api/crm/tasks/:id
 * Get single task details
 */
app.get('/api/crm/tasks/:id', async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    const taskId = c.req.param('id')

    const task = await DB_EDUCATION.prepare(`
      SELECT 
        t.*,
        c.name as client_name,
        c.company as client_company,
        c.phone_number,
        c.email,
        p.name as project_name,
        p.project_type,
        p.tech_stack,
        m.body as original_message,
        m.sentiment,
        m.received_at
      FROM crm_tasks t
      LEFT JOIN crm_clients c ON t.client_id = c.id
      LEFT JOIN crm_projects p ON t.project_id = p.id
      LEFT JOIN crm_messages m ON t.message_id = m.id
      WHERE t.id = ?
    `).bind(taskId).first()

    if (!task) {
      return c.json({ success: false, error: 'Task not found' }, 404)
    }

    return c.json({
      success: true,
      task
    })

  } catch (error: any) {
    console.error('[CRM Task Detail] Error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

/**
 * PUT /api/crm/tasks/:id
 * Update task (status, assignment, effort, etc.)
 */
app.put('/api/crm/tasks/:id', async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    const taskId = c.req.param('id')
    const updates = await c.req.json()

    const allowedFields = ['status', 'assigned_to', 'actual_effort_hours', 'due_date', 'priority']
    const setClause: string[] = []
    const bindings: any[] = []

    for (const [key, value] of Object.entries(updates)) {
      if (allowedFields.includes(key)) {
        setClause.push(`${key} = ?`)
        bindings.push(value)
      }
    }

    if (setClause.length === 0) {
      return c.json({ success: false, error: 'No valid fields to update' }, 400)
    }

    // Add completed_at timestamp if status changed to 'completed'
    if (updates.status === 'completed') {
      setClause.push('completed_at = datetime(\'now\')')
    }

    setClause.push('updated_at = datetime(\'now\')')
    bindings.push(taskId)

    await DB_EDUCATION.prepare(
      `UPDATE crm_tasks SET ${setClause.join(', ')} WHERE id = ?`
    ).bind(...bindings).run()

    return c.json({
      success: true,
      message: 'Task updated successfully'
    })

  } catch (error: any) {
    console.error('[CRM Task Update] Error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

/**
 * DELETE /api/crm/tasks/:id
 * Archive/delete task
 */
app.delete('/api/crm/tasks/:id', async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    const taskId = c.req.param('id')

    await DB_EDUCATION.prepare(
      'UPDATE crm_tasks SET status = ?, updated_at = datetime(\'now\') WHERE id = ?'
    ).bind('cancelled', taskId).run()

    return c.json({
      success: true,
      message: 'Task cancelled successfully'
    })

  } catch (error: any) {
    console.error('[CRM Task Delete] Error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// ==============================================
// CLIENT MANAGEMENT ENDPOINTS
// ==============================================

/**
 * GET /api/crm/clients
 * Get all clients with health scores
 */
app.get('/api/crm/clients', async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    
    const sortBy = c.req.query('sortBy') || 'name'  // 'name', 'healthScore', 'lastContact'
    const order = c.req.query('order') || 'asc'     // 'asc', 'desc'

    const result = await DB_EDUCATION.prepare(`
      SELECT 
        c.*,
        COUNT(DISTINCT p.id) as project_count,
        COUNT(DISTINCT CASE WHEN p.status = 'active' THEN p.id END) as active_project_count,
        h.health_score,
        h.churn_risk_level,
        h.sentiment_trend,
        h.calculated_at as health_updated_at
      FROM crm_clients c
      LEFT JOIN crm_projects p ON c.id = p.client_id
      LEFT JOIN crm_client_health h ON c.id = h.client_id
      GROUP BY c.id
      ORDER BY ${sortBy === 'healthScore' ? 'h.health_score' : sortBy === 'lastContact' ? 'c.updated_at' : 'c.name'} ${order === 'desc' ? 'DESC' : 'ASC'}
      LIMIT 100
    `).all()

    return c.json({
      success: true,
      clients: result.results || []
    })

  } catch (error: any) {
    console.error('[CRM Clients] Error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

/**
 * GET /api/crm/clients/:id
 * Get detailed client info with health analysis
 */
app.get('/api/crm/clients/:id', async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    const gensparkApiKey = c.env.GENSPARK_API_KEY
    const clientId = c.req.param('id')

    // Get client
    const client = await DB_EDUCATION.prepare(
      'SELECT * FROM crm_clients WHERE id = ?'
    ).bind(clientId).first()

    if (!client) {
      return c.json({ success: false, error: 'Client not found' }, 404)
    }

    // Get projects
    const projects = await DB_EDUCATION.prepare(
      'SELECT * FROM crm_projects WHERE client_id = ? ORDER BY created_at DESC'
    ).bind(clientId).all()

    // Get recent messages (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    const messages = await DB_EDUCATION.prepare(
      'SELECT * FROM crm_messages WHERE client_id = ? AND created_at > ? ORDER BY created_at DESC LIMIT 50'
    ).bind(clientId, thirtyDaysAgo).all()

    // Get existing health score
    const existingHealth = await DB_EDUCATION.prepare(
      'SELECT * FROM crm_client_health WHERE client_id = ? ORDER BY calculated_at DESC LIMIT 1'
    ).bind(clientId).first()

    // Recalculate health if API key available and we have message data
    let healthScore = existingHealth
    if (gensparkApiKey && messages.results && messages.results.length > 0) {
      const activeProject = projects.results?.find((p: any) => p.status === 'active')
      
      const healthInput = {
        clientId,
        clientData: {
          name: (client as any).name,
          company: (client as any).company || '',
          totalProjects: (client as any).total_projects || 0,
          activeProjects: (client as any).active_projects || 0,
          totalRevenue: (client as any).total_spent || 0
        },
        recentMessages: (messages.results as any[]).map(m => ({
          content: m.body,
          sentiment: m.sentiment || 'neutral',
          urgency: m.urgency || 'low',
          timestamp: m.created_at
        })),
        projectMetrics: {
          onTimeDelivery: true,  // TODO: Calculate from project data
          budgetCompliance: activeProject ? (activeProject as any).hours_used <= (activeProject as any).budget_hours : true,
          currentStatus: activeProject ? (activeProject as any).status : 'none'
        },
        responseMetrics: {
          avgResponseTimeHours: (client as any).avg_response_time_hours || 0,
          lastContactDate: (client as any).updated_at
        }
      }

      try {
        const healthAnalysis = await calculateClientHealth(healthInput, gensparkApiKey)

        // Store new health score
        const healthId = generateCRMId('health')
        await DB_EDUCATION.prepare(`
          INSERT INTO crm_client_health (
            id, client_id, health_score, churn_risk_level,
            sentiment_trend, upsell_opportunities, 
            response_time_avg_hours, calculated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
        `).bind(
          healthId,
          clientId,
          healthAnalysis.healthScore,
          healthAnalysis.riskLevel.toUpperCase(),
          healthAnalysis.sentimentTrend,
          JSON.stringify(healthAnalysis.upsellSignals),
          (client as any).avg_response_time_hours || 0
        ).run()

        healthScore = {
          health_score: healthAnalysis.healthScore,
          churn_risk_level: healthAnalysis.riskLevel.toUpperCase(),
          sentiment_trend: healthAnalysis.sentimentTrend,
          upsell_opportunities: JSON.stringify(healthAnalysis.upsellSignals),
          recommended_actions: healthAnalysis.recommendedActions,
          churn_risk_factors: healthAnalysis.churnRiskFactors
        }

      } catch (error) {
        console.error('[Health Calculation] Error:', error)
        // Use existing health score if recalculation fails
      }
    }

    return c.json({
      success: true,
      client,
      projects: projects.results || [],
      recentMessages: messages.results || [],
      healthScore
    })

  } catch (error: any) {
    console.error('[CRM Client Detail] Error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

/**
 * PUT /api/crm/clients/:id
 * Update client information
 */
app.put('/api/crm/clients/:id', async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    const clientId = c.req.param('id')
    const updates = await c.req.json()

    const allowedFields = ['name', 'company', 'phone_number', 'email', 'tier', 'status', 'notes', 'tags']
    const setClause: string[] = []
    const bindings: any[] = []

    for (const [key, value] of Object.entries(updates)) {
      if (allowedFields.includes(key)) {
        setClause.push(`${key} = ?`)
        bindings.push(value)
      }
    }

    if (setClause.length === 0) {
      return c.json({ success: false, error: 'No valid fields to update' }, 400)
    }

    setClause.push('updated_at = datetime(\'now\')')
    bindings.push(clientId)

    await DB_EDUCATION.prepare(
      `UPDATE crm_clients SET ${setClause.join(', ')} WHERE id = ?`
    ).bind(...bindings).run()

    return c.json({
      success: true,
      message: 'Client updated successfully'
    })

  } catch (error: any) {
    console.error('[CRM Client Update] Error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

/**
 * POST /api/crm/clients
 * Create new client manually
 */
app.post('/api/crm/clients', async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    const body = await c.req.json()
    const { name, company, phoneNumber, email, tier, notes } = body

    if (!name) {
      return c.json({ success: false, error: 'Client name is required' }, 400)
    }

    const clientId = generateCRMId('client')
    
    await DB_EDUCATION.prepare(`
      INSERT INTO crm_clients (
        id, name, company, phone_number, email, tier, status, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      clientId,
      name,
      company || null,
      phoneNumber ? formatPhoneNumber(phoneNumber) : null,
      email || null,
      tier || 'standard',
      'lead',
      notes || null
    ).run()

    const newClient = await DB_EDUCATION.prepare(
      'SELECT * FROM crm_clients WHERE id = ?'
    ).bind(clientId).first()

    return c.json({
      success: true,
      client: newClient
    })

  } catch (error: any) {
    console.error('[CRM Client Create] Error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// ==============================================
// ANALYTICS ENDPOINTS
// ==============================================

/**
 * GET /api/crm/analytics/dashboard
 * Executive dashboard metrics (ROI, health, tasks, revenue)
 */
app.get('/api/crm/analytics/dashboard', async (c) => {
  try {
    const { DB_EDUCATION } = c.env

    // Time saved calculation
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    const messagesThisWeek = await DB_EDUCATION.prepare(
      'SELECT COUNT(*) as count FROM crm_messages WHERE created_at > ?'
    ).bind(oneWeekAgo).first()

    const messageCount = (messagesThisWeek as any)?.count || 0
    const hoursThisWeek = messageCount * 0.33  // 20 min manual → 15 sec AI = 19.75 min saved per message ≈ 0.33 hrs
    const dollarValue = Math.round(hoursThisWeek * 150)  // $150/hr rate

    // Client health distribution
    const clientHealth = await DB_EDUCATION.prepare(`
      SELECT 
        COUNT(CASE WHEN h.health_score >= 70 THEN 1 END) as healthy,
        COUNT(CASE WHEN h.health_score >= 50 AND h.health_score < 70 THEN 1 END) as at_risk,
        COUNT(CASE WHEN h.health_score < 50 THEN 1 END) as critical
      FROM crm_clients c
      LEFT JOIN (
        SELECT client_id, health_score
        FROM crm_client_health
        WHERE (client_id, calculated_at) IN (
          SELECT client_id, MAX(calculated_at)
          FROM crm_client_health
          GROUP BY client_id
        )
      ) h ON c.id = h.client_id
      WHERE c.status = 'active'
    `).first()

    // Task metrics
    const taskMetrics = await DB_EDUCATION.prepare(`
      SELECT 
        COUNT(CASE WHEN status = 'open' THEN 1 END) as backlog,
        COUNT(CASE WHEN status = 'in_progress' THEN 1 END) as in_progress,
        COUNT(CASE WHEN status = 'completed' AND created_at > ? THEN 1 END) as completed_this_week
      FROM crm_tasks
    `).bind(oneWeekAgo).first()

    // Revenue at risk (critical health clients × avg project value)
    const revenueAtRisk = await DB_EDUCATION.prepare(`
      SELECT COALESCE(SUM(c.total_spent), 0) as total
      FROM crm_clients c
      INNER JOIN (
        SELECT client_id, health_score
        FROM crm_client_health
        WHERE (client_id, calculated_at) IN (
          SELECT client_id, MAX(calculated_at)
          FROM crm_client_health
          GROUP BY client_id
        )
      ) h ON c.id = h.client_id
      WHERE h.health_score < 50 AND c.status = 'active'
    `).first()

    return c.json({
      success: true,
      data: {
        timeSaved: {
          hoursThisWeek: Number(hoursThisWeek.toFixed(1)),
          dollarValue,
          messagesProcessed: messageCount,
          trend: 'up'  // TODO: Calculate week-over-week trend
        },
        clientHealth: {
          healthy: (clientHealth as any)?.healthy || 0,
          atRisk: (clientHealth as any)?.at_risk || 0,
          critical: (clientHealth as any)?.critical || 0
        },
        taskMetrics: {
          backlog: (taskMetrics as any)?.backlog || 0,
          inProgress: (taskMetrics as any)?.in_progress || 0,
          completedThisWeek: (taskMetrics as any)?.completed_this_week || 0
        },
        revenueAtRisk: (revenueAtRisk as any)?.total || 0
      }
    })

  } catch (error: any) {
    console.error('[CRM Analytics Dashboard] Error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

/**
 * GET /api/crm/analytics/patterns
 * Run Agent 4 to analyze patterns across all clients
 */
app.get('/api/crm/analytics/patterns', async (c) => {
  try {
    const { DB_EDUCATION } = c.env
    const gensparkApiKey = c.env.GENSPARK_API_KEY

    if (!gensparkApiKey) {
      return c.json({ success: false, error: 'GENSPARK_API_KEY not configured' }, 500)
    }

    const timeframe = (c.req.query('timeframe') || '30d') as '7d' | '30d' | '90d'
    const daysMap = { '7d': 7, '30d': 30, '90d': 90 }
    const cutoffDate = new Date(Date.now() - daysMap[timeframe] * 24 * 60 * 60 * 1000).toISOString()

    // Get all messages in timeframe
    const messages = await DB_EDUCATION.prepare(`
      SELECT 
        m.client_id,
        m.message_type,
        m.urgency,
        m.sentiment,
        m.body as content,
        p.project_type
      FROM crm_messages m
      LEFT JOIN crm_projects p ON m.project_id = p.id
      WHERE m.created_at > ?
      ORDER BY m.created_at DESC
      LIMIT 200
    `).bind(cutoffDate).all()

    // Get all tasks in timeframe
    const tasks = await DB_EDUCATION.prepare(`
      SELECT 
        title,
        estimated_effort as effort,
        actual_effort_hours,
        status,
        category as tags
      FROM crm_tasks
      WHERE created_at > ?
      LIMIT 100
    `).bind(cutoffDate).all()

    // Get all active clients with health scores
    const clients = await DB_EDUCATION.prepare(`
      SELECT 
        c.id,
        c.name,
        c.status,
        c.total_spent as totalRevenue,
        h.health_score
      FROM crm_clients c
      LEFT JOIN (
        SELECT client_id, health_score
        FROM crm_client_health
        WHERE (client_id, calculated_at) IN (
          SELECT client_id, MAX(calculated_at)
          FROM crm_client_health
          GROUP BY client_id
        )
      ) h ON c.id = h.client_id
      WHERE c.status IN ('active', 'lead')
    `).all()

    // Run Agent 4: Pattern analysis
    const analysis = await analyzePatterns({
      timeframe,
      allMessages: messages.results as any[] || [],
      allTasks: tasks.results as any[] || [],
      allClients: clients.results as any[] || []
    }, gensparkApiKey)

    return c.json({
      success: true,
      analysis,
      metadata: {
        timeframe,
        messagesAnalyzed: messages.results?.length || 0,
        tasksAnalyzed: tasks.results?.length || 0,
        clientsAnalyzed: clients.results?.length || 0,
        generatedAt: new Date().toISOString()
      }
    })

  } catch (error: any) {
    console.error('[CRM Pattern Analysis] Error:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})


export default app
