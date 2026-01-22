// Email Automation Backend Endpoints for Acromatico Photography
// Located at: /home/user/webapp/src/automation.tsx

import { Hono } from 'hono'
import { cors } from 'hono/cors'

type Bindings = {
  DB: D1Database
  // Email service API key (SendGrid, Resend, etc.)
  EMAIL_API_KEY: string
}

const automation = new Hono<{ Bindings: Bindings }>()

// Enable CORS
automation.use('/*', cors())

// ============================================
// CONTACT FORM SUBMISSION
// ============================================
automation.post('/contact', async (c) => {
  try {
    const { name, email, phone, message, service } = await c.req.json()
    
    // Validate required fields
    if (!name || !email || !message) {
      return c.json({ error: 'Missing required fields' }, 400)
    }
    
    // Store in database
    await c.env.DB.prepare(`
      INSERT INTO contacts (name, email, phone, message, service, created_at)
      VALUES (?, ?, ?, ?, ?, datetime('now'))
    `).bind(name, email, phone || null, message, service || 'general').run()
    
    // Send welcome email (mock implementation - would use SendGrid/Resend in production)
    // await sendWelcomeEmail(email, name)
    
    return c.json({ 
      success: true, 
      message: 'Thanks for reaching out! We will get back to you within 24 hours.' 
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return c.json({ error: 'Failed to submit contact form' }, 500)
  }
})

// ============================================
// NEWSLETTER SUBSCRIPTION
// ============================================
automation.post('/subscribe', async (c) => {
  try {
    const { email, name } = await c.req.json()
    
    if (!email) {
      return c.json({ error: 'Email is required' }, 400)
    }
    
    // Check if already subscribed
    const existing = await c.env.DB.prepare(`
      SELECT id FROM subscribers WHERE email = ?
    `).bind(email).first()
    
    if (existing) {
      return c.json({ message: 'You are already subscribed!' })
    }
    
    // Add to subscribers
    await c.env.DB.prepare(`
      INSERT INTO subscribers (email, name, subscribed_at)
      VALUES (?, ?, datetime('now'))
    `).bind(email, name || null).run()
    
    // Send welcome email series (Day 1)
    // await sendSubscriberWelcome(email, name)
    
    return c.json({ 
      success: true, 
      message: 'Welcome to Acromatico! Check your inbox for our first email.' 
    })
  } catch (error) {
    console.error('Subscribe error:', error)
    return c.json({ error: 'Failed to subscribe' }, 500)
  }
})

// ============================================
// BOOKING INQUIRY
// ============================================
automation.post('/book', async (c) => {
  try {
    const { 
      clientName, 
      email, 
      phone, 
      eventType, 
      eventDate, 
      location, 
      budget,
      details 
    } = await c.req.json()
    
    if (!clientName || !email || !eventType || !eventDate) {
      return c.json({ error: 'Missing required fields' }, 400)
    }
    
    // Store booking inquiry
    await c.env.DB.prepare(`
      INSERT INTO bookings (
        client_name, email, phone, event_type, event_date, 
        location, budget, details, status, created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', datetime('now'))
    `).bind(
      clientName, email, phone || null, eventType, eventDate,
      location || null, budget || null, details || null
    ).run()
    
    // Send booking confirmation email
    // await sendBookingConfirmation(email, clientName, eventType, eventDate)
    
    // Notify team
    // await notifyTeam('New Booking Inquiry', { clientName, eventType, eventDate })
    
    return c.json({ 
      success: true, 
      message: 'Booking inquiry received! We will contact you within 24 hours to discuss your event.' 
    })
  } catch (error) {
    console.error('Booking error:', error)
    return c.json({ error: 'Failed to submit booking inquiry' }, 500)
  }
})

// ============================================
// AUTOMATED EMAIL SEQUENCES (SCHEDULED)
// ============================================

// Welcome Sequence for New Subscribers
// Day 1: Welcome email (sent immediately via /subscribe endpoint)
// Day 3: Portfolio highlights
// Day 7: Client testimonials
// Day 14: Special offer

automation.get('/automation/welcome-sequence', async (c) => {
  try {
    // Get subscribers who joined 3 days ago and haven't received Day 3 email
    const day3Subscribers = await c.env.DB.prepare(`
      SELECT id, email, name FROM subscribers
      WHERE DATE(subscribed_at) = DATE('now', '-3 days')
      AND day3_sent = 0
    `).all()
    
    // Send Day 3 email
    for (const sub of day3Subscribers.results || []) {
      // await sendDay3Email(sub.email, sub.name)
      await c.env.DB.prepare(`
        UPDATE subscribers SET day3_sent = 1 WHERE id = ?
      `).bind(sub.id).run()
    }
    
    // Similar logic for Day 7 and Day 14
    
    return c.json({ 
      success: true, 
      processed: day3Subscribers.results?.length || 0 
    })
  } catch (error) {
    console.error('Welcome sequence error:', error)
    return c.json({ error: 'Failed to process welcome sequence' }, 500)
  }
})

// Post-Booking Follow-up Sequence
automation.get('/automation/booking-followup', async (c) => {
  try {
    // Get bookings that need follow-up
    const followUpBookings = await c.env.DB.prepare(`
      SELECT * FROM bookings
      WHERE status = 'pending'
      AND DATE(created_at) <= DATE('now', '-2 days')
      AND followup_sent = 0
    `).all()
    
    for (const booking of followUpBookings.results || []) {
      // await sendBookingFollowUp(booking.email, booking.client_name)
      await c.env.DB.prepare(`
        UPDATE bookings SET followup_sent = 1 WHERE id = ?
      `).bind(booking.id).run()
    }
    
    return c.json({ 
      success: true, 
      processed: followUpBookings.results?.length || 0 
    })
  } catch (error) {
    console.error('Booking followup error:', error)
    return c.json({ error: 'Failed to process booking follow-ups' }, 500)
  }
})

// ============================================
// ANALYTICS & REPORTING
// ============================================
automation.get('/stats', async (c) => {
  try {
    const [contacts, subscribers, bookings] = await Promise.all([
      c.env.DB.prepare('SELECT COUNT(*) as count FROM contacts').first(),
      c.env.DB.prepare('SELECT COUNT(*) as count FROM subscribers').first(),
      c.env.DB.prepare('SELECT COUNT(*) as count FROM bookings').first()
    ])
    
    return c.json({
      contacts: contacts?.count || 0,
      subscribers: subscribers?.count || 0,
      bookings: bookings?.count || 0,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Stats error:', error)
    return c.json({ error: 'Failed to fetch stats' }, 500)
  }
})

export default automation
