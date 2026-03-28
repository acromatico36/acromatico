# 🎯 **STRIPE INTEGRATION - COMPLETE SETUP GUIDE**

## **STEP 1: GET API KEYS** ✅

### **A. Create Stripe Account**
1. **Sign up at:** https://dashboard.stripe.com/register
2. **Fill out:**
   - Email address
   - Full name
   - Password
   - Business name: **Acromatico**
   - Business type: **Individual** or **Company**
   - Country: **United States** (or your location)
3. **Verify email** and complete onboarding

---

### **B. Get Your API Keys**
1. **Login to Stripe Dashboard:** https://dashboard.stripe.com
2. **Click:** Developers (top right) → **API keys**
3. **You'll see TWO sets of keys:**

#### **🧪 TEST MODE KEYS** (For development/testing)
```bash
STRIPE_PUBLISHABLE_KEY = pk_test_51xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY = sk_test_51xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET = whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### **🔴 LIVE MODE KEYS** (For production - DO NOT USE YET)
```bash
# Only use these after testing is complete and you've activated your account
STRIPE_PUBLISHABLE_KEY = pk_live_51xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY = sk_live_51xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET = whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

### **C. Copy Your Keys**
1. Click **"Reveal test key"** next to the secret key
2. **Copy both:**
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`) ⚠️ **NEVER share this!**

---

## **STEP 2: ADD KEYS TO CLOUDFLARE** ✅

### **A. Local Development (Sandbox)**
Create `.dev.vars` file in your project root:

```bash
cd /home/user/webapp
cat > .dev.vars << 'EOF'
# Stripe API Keys (TEST MODE)
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE

# Database
DB_NAME=acromatico-db

# Other services
GENSPARK_API_KEY=your_genspark_key
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+1234567890
EOF
```

**⚠️ IMPORTANT:** Never commit `.dev.vars` to Git! It's already in `.gitignore`.

---

### **B. Production (Cloudflare Pages)**

```bash
# Set Stripe secret key
npx wrangler pages secret put STRIPE_SECRET_KEY --project-name acromatico

# Set publishable key (not sensitive, can be in wrangler.jsonc too)
npx wrangler pages secret put STRIPE_PUBLISHABLE_KEY --project-name acromatico

# Set webhook secret (we'll get this in Step 3)
npx wrangler pages secret put STRIPE_WEBHOOK_SECRET --project-name acromatico
```

**When prompted, paste each key and press Enter.**

---

## **STEP 3: CREATE STRIPE PRODUCTS** ✅

### **A. Photography Packages**

1. **Go to:** https://dashboard.stripe.com/test/products
2. **Click:** "+ Add product"
3. **Create these products:**

#### **Product 1: Signature Session**
```
Name: Signature Photography Session
Description: 2-hour professional photography session with 50+ edited photos
Price: $599.00 (one-time payment)
Click "Save product"
```
**Copy the Price ID:** `price_xxxxxxxxxxxxxxxxxxxxx`

#### **Product 2: Premium Package**
```
Name: Premium Photography Package
Description: Full-day session with 100+ photos, prints, and album
Price: $1,299.00
Click "Save product"
```
**Copy the Price ID:** `price_xxxxxxxxxxxxxxxxxxxxx`

#### **Product 3: Headshot Session**
```
Name: Professional Headshot Session
Description: 30-minute session with 10 retouched headshots
Price: $299.00
Click "Save product"
```
**Copy the Price ID:** `price_xxxxxxxxxxxxxxxxxxxxx`

---

### **B. Education Courses**

#### **Product 4: Photography Masterclass**
```
Name: Photography Masterclass for Kids
Description: 8-week online course teaching photography fundamentals
Price: $149.00
Click "Save product"
```
**Copy the Price ID:** `price_xxxxxxxxxxxxxxxxxxxxx`

#### **Product 5: Monthly Subscription**
```
Name: Acromatico Education Membership
Description: Access to all courses + live workshops
Price: $29.00/month (recurring)
Billing period: Monthly
Click "Save product"
```
**Copy the Price ID:** `price_xxxxxxxxxxxxxxxxxxxxx`

---

## **STEP 4: SET UP WEBHOOKS** ✅

### **A. Create Webhook Endpoint**

1. **Go to:** https://dashboard.stripe.com/test/webhooks
2. **Click:** "+ Add endpoint"
3. **Fill out:**
   - **Endpoint URL:** `https://acromatico.pages.dev/api/payments/webhook`
   - **Description:** Acromatico Payment Events
   - **Events to send:**
     - ✅ `checkout.session.completed`
     - ✅ `payment_intent.succeeded`
     - ✅ `payment_intent.payment_failed`
     - ✅ `customer.subscription.created`
     - ✅ `customer.subscription.updated`
     - ✅ `customer.subscription.deleted`
4. **Click:** "Add endpoint"

---

### **B. Get Webhook Signing Secret**

1. After creating the webhook, **click on it**
2. **Copy the Signing secret** (starts with `whsec_`)
3. **Add to Cloudflare:**

```bash
npx wrangler pages secret put STRIPE_WEBHOOK_SECRET --project-name acromatico
# Paste: whsec_YOUR_SIGNING_SECRET_HERE
```

---

## **STEP 5: IMPLEMENT PAYMENT BUTTONS** ✅

### **A. Photography Shop Integration**

Create `/public/static/photography-checkout.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Photography Booking | Acromatico</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://js.stripe.com/v3/"></script>
</head>
<body class="bg-slate-900 text-white">
  
  <div class="container mx-auto px-4 py-16">
    <h1 class="text-4xl font-bold text-center mb-12">Book Your Session</h1>
    
    <div class="grid md:grid-cols-3 gap-8">
      
      <!-- Headshot Package -->
      <div class="bg-slate-800 rounded-xl p-8 border border-slate-700">
        <h3 class="text-2xl font-bold mb-4">Headshot Session</h3>
        <p class="text-slate-300 mb-6">30-minute session with 10 retouched headshots</p>
        <div class="text-4xl font-bold mb-8">$299</div>
        <button 
          onclick="checkout('price_YOUR_HEADSHOT_PRICE_ID')" 
          class="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-cyan-700 transition-all">
          Book Now
        </button>
      </div>
      
      <!-- Signature Package -->
      <div class="bg-slate-800 rounded-xl p-8 border-2 border-teal-500">
        <div class="text-teal-400 font-semibold mb-2">MOST POPULAR</div>
        <h3 class="text-2xl font-bold mb-4">Signature Session</h3>
        <p class="text-slate-300 mb-6">2-hour session with 50+ edited photos</p>
        <div class="text-4xl font-bold mb-8">$599</div>
        <button 
          onclick="checkout('price_YOUR_SIGNATURE_PRICE_ID')" 
          class="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-cyan-700 transition-all">
          Book Now
        </button>
      </div>
      
      <!-- Premium Package -->
      <div class="bg-slate-800 rounded-xl p-8 border border-slate-700">
        <h3 class="text-2xl font-bold mb-4">Premium Package</h3>
        <p class="text-slate-300 mb-6">Full-day session with 100+ photos, prints & album</p>
        <div class="text-4xl font-bold mb-8">$1,299</div>
        <button 
          onclick="checkout('price_YOUR_PREMIUM_PRICE_ID')" 
          class="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-cyan-700 transition-all">
          Book Now
        </button>
      </div>
      
    </div>
  </div>
  
  <script>
    async function checkout(priceId) {
      try {
        // Create checkout session
        const response = await fetch('/api/payments/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            priceId: priceId,
            quantity: 1,
            mode: 'payment',
            successUrl: window.location.origin + '/payment-success?session_id={CHECKOUT_SESSION_ID}',
            cancelUrl: window.location.origin + '/photography-checkout',
            metadata: {
              product_type: 'photography',
              source: 'website'
            }
          })
        })
        
        const data = await response.json()
        
        if (data.error) {
          alert('Payment error: ' + data.error)
          return
        }
        
        // Redirect to Stripe Checkout
        window.location.href = data.url
        
      } catch (error) {
        console.error('Checkout error:', error)
        alert('Failed to start checkout. Please try again.')
      }
    }
  </script>
  
</body>
</html>
```

---

### **B. Education Enrollment Integration**

Create `/public/static/education-checkout.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Enroll Now | Acromatico Education</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://js.stripe.com/v3/"></script>
</head>
<body class="bg-slate-900 text-white">
  
  <div class="container mx-auto px-4 py-16">
    <h1 class="text-4xl font-bold text-center mb-12">Choose Your Plan</h1>
    
    <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      
      <!-- One-Time Course -->
      <div class="bg-slate-800 rounded-xl p-8 border border-slate-700">
        <h3 class="text-2xl font-bold mb-4">Photography Masterclass</h3>
        <p class="text-slate-300 mb-6">8-week online course • Lifetime access • Certificate of completion</p>
        <div class="text-4xl font-bold mb-8">$149</div>
        <ul class="text-slate-300 mb-8 space-y-2">
          <li>✅ 40+ video lessons</li>
          <li>✅ Downloadable resources</li>
          <li>✅ Private community access</li>
          <li>✅ One-on-one mentor session</li>
        </ul>
        <button 
          onclick="checkout('price_YOUR_COURSE_PRICE_ID', 'payment')" 
          class="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-cyan-700 transition-all">
          Enroll Now
        </button>
      </div>
      
      <!-- Monthly Subscription -->
      <div class="bg-slate-800 rounded-xl p-8 border-2 border-teal-500">
        <div class="text-teal-400 font-semibold mb-2">BEST VALUE</div>
        <h3 class="text-2xl font-bold mb-4">All-Access Membership</h3>
        <p class="text-slate-300 mb-6">Access to ALL courses + live workshops</p>
        <div class="text-4xl font-bold mb-8">$29<span class="text-xl text-slate-400">/mo</span></div>
        <ul class="text-slate-300 mb-8 space-y-2">
          <li>✅ Unlimited course access</li>
          <li>✅ Weekly live workshops</li>
          <li>✅ Priority support</li>
          <li>✅ New courses added monthly</li>
        </ul>
        <button 
          onclick="checkout('price_YOUR_SUBSCRIPTION_PRICE_ID', 'subscription')" 
          class="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-cyan-700 transition-all">
          Start Free Trial
        </button>
        <p class="text-xs text-slate-400 mt-4 text-center">Cancel anytime</p>
      </div>
      
    </div>
  </div>
  
  <script>
    async function checkout(priceId, mode) {
      try {
        const response = await fetch('/api/payments/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            priceId: priceId,
            quantity: 1,
            mode: mode,
            successUrl: window.location.origin + '/payment-success?session_id={CHECKOUT_SESSION_ID}',
            cancelUrl: window.location.origin + '/education-checkout',
            metadata: {
              product_type: 'education',
              source: 'website'
            }
          })
        })
        
        const data = await response.json()
        
        if (data.error) {
          alert('Payment error: ' + data.error)
          return
        }
        
        window.location.href = data.url
        
      } catch (error) {
        console.error('Checkout error:', error)
        alert('Failed to start checkout. Please try again.')
      }
    }
  </script>
  
</body>
</html>
```

---

## **STEP 6: TEST THE INTEGRATION** ✅

### **A. Test Card Numbers**

Use these **test cards** in Stripe Checkout (only work in test mode):

```
✅ SUCCESSFUL PAYMENT
Card: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/34)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)

❌ DECLINED PAYMENT
Card: 4000 0000 0000 0002
Expiry: 12/34
CVC: 123

⏳ REQUIRES AUTHENTICATION (3D Secure)
Card: 4000 0025 0000 3155
Expiry: 12/34
CVC: 123
```

---

### **B. Testing Workflow**

1. **Start local dev server:**
```bash
cd /home/user/webapp
npm run build
pm2 restart acromatico
```

2. **Open photography checkout:**
```
https://3000-i49aua0ijjil4k3yd5ptd-82b888ba.sandbox.novita.ai/static/photography-checkout.html
```

3. **Click "Book Now"** on any package
4. **You'll be redirected to Stripe Checkout**
5. **Enter test card:** `4242 4242 4242 4242`
6. **Complete payment**
7. **You'll see the success page!** 🎉

---

### **C. Verify in Stripe Dashboard**

1. **Go to:** https://dashboard.stripe.com/test/payments
2. **You'll see your test payment** with status "Succeeded"
3. **Click on it** to see full details

---

## **STEP 7: GO LIVE** 🚀

### **A. Activate Your Stripe Account**

1. **Complete business verification** in Stripe Dashboard
2. **Add bank account** for payouts
3. **Submit required documents**

---

### **B. Switch to Live Keys**

1. **Get live API keys** from Stripe Dashboard (toggle Test Mode OFF)
2. **Update Cloudflare secrets:**

```bash
npx wrangler pages secret put STRIPE_SECRET_KEY --project-name acromatico
# Paste: sk_live_YOUR_LIVE_SECRET_KEY

npx wrangler pages secret put STRIPE_PUBLISHABLE_KEY --project-name acromatico  
# Paste: pk_live_YOUR_LIVE_PUBLISHABLE_KEY
```

3. **Create live webhook** at `https://acromatico.pages.dev/api/payments/webhook`
4. **Update `STRIPE_WEBHOOK_SECRET`** with live signing secret

---

### **C. Create Live Products**

1. **Switch to Live mode** in Stripe Dashboard
2. **Re-create all products** (Photography packages, Education courses)
3. **Copy the LIVE Price IDs**
4. **Update your checkout pages** with live Price IDs

---

## **QUICK REFERENCE** 📋

### **API Endpoints (Already Built!)**

```bash
# Create checkout session
POST /api/payments/create-checkout-session
Body: { priceId, quantity, mode, successUrl, cancelUrl, metadata }

# Webhook handler (Stripe calls this)
POST /api/payments/webhook

# Success page
GET /payment-success?session_id=xxx

# Cancel page
GET /payment-cancel
```

---

### **Environment Variables**

```bash
# Required
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Optional
DB_NAME=acromatico-db
```

---

## **TROUBLESHOOTING** 🔧

### **Issue: "Stripe not configured" error**
**Solution:** Add `STRIPE_SECRET_KEY` to `.dev.vars` (local) or Cloudflare secrets (production)

### **Issue: Webhook not receiving events**
**Solution:** 
1. Check webhook URL is correct: `https://acromatico.pages.dev/api/payments/webhook`
2. Verify endpoint is enabled in Stripe Dashboard
3. Check selected event types

### **Issue: Payment succeeds but database not updated**
**Solution:** Check webhook handler logs in `wrangler tail` or Cloudflare dashboard

---

## **NEXT STEPS** 🎯

✅ **Step 1:** Get Stripe API keys (TEST MODE)  
✅ **Step 2:** Add keys to `.dev.vars`  
✅ **Step 3:** Create products in Stripe Dashboard  
✅ **Step 4:** Copy Price IDs  
✅ **Step 5:** Update checkout pages with Price IDs  
✅ **Step 6:** Test with `4242 4242 4242 4242`  
✅ **Step 7:** Verify payment in Stripe Dashboard  
⏳ **Step 8:** Go live when ready!

---

**🚀 You're ready to accept payments!**

All code is already implemented. You just need to:
1. Get Stripe keys
2. Add them to environment
3. Create products
4. Test!

Let me know when you have your Stripe keys and I'll help you add them! 🎯
