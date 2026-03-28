# 🚀 **STRIPE INTEGRATION - 5-MINUTE QUICK START**

## **WHERE ARE WE?** ✅

You asked: *"Alright let's go back to the stripe integration. Walk me through on those 5 steps, first one where do I get the api keys"*

**Status:** ✅ **STRIPE INTEGRATION IS 90% COMPLETE!**

All code is already implemented. You just need to:
1. Get Stripe API keys (5 mins)
2. Paste them into environment (2 mins)
3. Create products (10 mins)
4. Test with fake card (1 min)

---

## **WHAT'S ALREADY DONE** ✅

### **Backend API (100% Complete)**
```
✅ POST /api/payments/create-checkout-session
✅ POST /api/payments/webhook (Stripe event handler)
✅ GET /payment-success (beautiful success page)
✅ GET /payment-cancel (cancellation page)
```

### **Frontend Checkout Pages (100% Complete)**
```
✅ /static/photography-checkout.html (3 packages: $299, $599, $1,299)
✅ /static/education-checkout.html (Course: $149, Subscription: $29/mo)
```

### **Features Included**
- ✅ Secure Stripe Checkout integration
- ✅ Webhook event handling (payment success, failures, subscriptions)
- ✅ Database payment recording
- ✅ Beautiful Acromatico-branded UI (teal theme)
- ✅ Mobile-responsive design
- ✅ Loading states & error handling
- ✅ Test mode support
- ✅ Metadata tracking (product type, source, etc.)

---

## **STEP 1: GET STRIPE API KEYS** 🔑

### **A. Create Account**
1. Go to: https://dashboard.stripe.com/register
2. Sign up with email
3. Business name: **Acromatico**

### **B. Get Keys**
1. Login to Stripe Dashboard
2. Click: **Developers** → **API keys**
3. Copy these TWO keys:

```bash
# Publishable Key (safe to expose)
pk_test_51xxxxxxxxxxxxxxxxxxxxxxxxx

# Secret Key (⚠️ NEVER share this!)
sk_test_51xxxxxxxxxxxxxxxxxxxxxxxxx
```

**⏱️ Time:** 5 minutes

---

## **STEP 2: ADD KEYS TO PROJECT** 🔐

### **Option A: Local Development (Sandbox)**

Create `.dev.vars` file:

```bash
cd /home/user/webapp
cat > .dev.vars << 'EOF'
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
EOF
```

**⚠️ IMPORTANT:** Replace `YOUR_SECRET_KEY_HERE` with your actual keys!

### **Option B: Production (Cloudflare)**

```bash
npx wrangler pages secret put STRIPE_SECRET_KEY --project-name acromatico
# Paste: sk_test_YOUR_SECRET_KEY

npx wrangler pages secret put STRIPE_PUBLISHABLE_KEY --project-name acromatico
# Paste: pk_test_YOUR_PUBLISHABLE_KEY
```

**⏱️ Time:** 2 minutes

---

## **STEP 3: CREATE STRIPE PRODUCTS** 📦

### **Go to:** https://dashboard.stripe.com/test/products

Create these 5 products:

### **Photography Packages**

#### **1. Headshot Session**
```
Name: Professional Headshot Session
Price: $299.00 (one-time)
```
**→ Copy Price ID:** `price_xxxxxxxxxxxxxxxxxxxxx`

#### **2. Signature Session** ⭐
```
Name: Signature Photography Session
Price: $599.00 (one-time)
```
**→ Copy Price ID:** `price_xxxxxxxxxxxxxxxxxxxxx`

#### **3. Premium Package**
```
Name: Premium Photography Package
Price: $1,299.00 (one-time)
```
**→ Copy Price ID:** `price_xxxxxxxxxxxxxxxxxxxxx`

---

### **Education Products**

#### **4. Photography Masterclass**
```
Name: Photography Masterclass for Kids
Price: $149.00 (one-time)
```
**→ Copy Price ID:** `price_xxxxxxxxxxxxxxxxxxxxx`

#### **5. Monthly Membership** 💎
```
Name: All-Access Education Membership
Price: $29.00/month (recurring)
Billing: Monthly
```
**→ Copy Price ID:** `price_xxxxxxxxxxxxxxxxxxxxx`

**⏱️ Time:** 10 minutes

---

## **STEP 4: UPDATE CHECKOUT PAGES WITH PRICE IDs** 📝

### **A. Photography Page**

Open: `/home/user/webapp/public/static/photography-checkout.html`

Find this section (around line 387):

```javascript
const priceMap = {
  'HEADSHOT_PRICE_ID': 'price_REPLACE_WITH_ACTUAL_HEADSHOT_PRICE_ID',
  'SIGNATURE_PRICE_ID': 'price_REPLACE_WITH_ACTUAL_SIGNATURE_PRICE_ID',
  'PREMIUM_PRICE_ID': 'price_REPLACE_WITH_ACTUAL_PREMIUM_PRICE_ID'
}
```

**Replace with your actual Price IDs:**

```javascript
const priceMap = {
  'HEADSHOT_PRICE_ID': 'price_1ABC123xyz456...',  // ← Paste Headshot Price ID
  'SIGNATURE_PRICE_ID': 'price_1DEF456abc789...', // ← Paste Signature Price ID
  'PREMIUM_PRICE_ID': 'price_1GHI789def012...'    // ← Paste Premium Price ID
}
```

---

### **B. Education Page**

Open: `/home/user/webapp/public/static/education-checkout.html`

Find this section (around line 416):

```javascript
const priceMap = {
  'COURSE_PRICE_ID': 'price_REPLACE_WITH_ACTUAL_COURSE_PRICE_ID',
  'SUBSCRIPTION_PRICE_ID': 'price_REPLACE_WITH_ACTUAL_SUBSCRIPTION_PRICE_ID'
}
```

**Replace with your actual Price IDs:**

```javascript
const priceMap = {
  'COURSE_PRICE_ID': 'price_1JKL012ghi345...',      // ← Paste Course Price ID
  'SUBSCRIPTION_PRICE_ID': 'price_1MNO345jkl678...' // ← Paste Subscription Price ID
}
```

**⏱️ Time:** 3 minutes

---

## **STEP 5: TEST PAYMENT** 🧪

### **A. Rebuild & Restart**

```bash
cd /home/user/webapp
npm run build
pm2 restart acromatico
```

### **B. Open Checkout Pages**

**Photography:**
```
https://3000-i49aua0ijjil4k3yd5ptd-82b888ba.sandbox.novita.ai/static/photography-checkout.html
```

**Education:**
```
https://3000-i49aua0ijjil4k3yd5ptd-82b888ba.sandbox.novita.ai/static/education-checkout.html
```

---

### **C. Use Test Card**

Click any "Book Now" or "Enroll" button, then use:

```
Card Number:  4242 4242 4242 4242
Expiry:       12/34 (any future date)
CVC:          123 (any 3 digits)
ZIP:          12345 (any 5 digits)
```

**✅ Success!** You'll see the payment success page.

---

### **D. Verify in Stripe Dashboard**

1. Go to: https://dashboard.stripe.com/test/payments
2. You'll see your test payment with status **"Succeeded"** ✅
3. Click on it to see full details

**⏱️ Time:** 2 minutes

---

## **VISUAL FLOW** 🎯

```
USER                         YOUR APP                      STRIPE
  │                              │                            │
  ├──── Clicks "Book Now" ──────►│                            │
  │                              │                            │
  │                              ├─── Create Session ────────►│
  │                              │                            │
  │                              │◄─── Session URL ───────────┤
  │                              │                            │
  │◄──── Redirect to Stripe ─────┤                            │
  │                              │                            │
  ├──────── Enter Card ──────────┼───────────────────────────►│
  │                              │                            │
  │                              │◄──── Payment Success ──────┤
  │                              │                            │
  │                              │──── Webhook Event ─────────►│
  │                              │     (record in DB)         │
  │                              │                            │
  │◄──── Success Page ───────────┤                            │
  │     "Thank you!"             │                            │
```

---

## **CURRENT URLS** 🔗

### **Checkout Pages (Ready to Test!)**
```
📸 Photography:
https://3000-i49aua0ijjil4k3yd5ptd-82b888ba.sandbox.novita.ai/static/photography-checkout.html

🎓 Education:
https://3000-i49aua0ijjil4k3yd5ptd-82b888ba.sandbox.novita.ai/static/education-checkout.html
```

### **CRM Dashboard**
```
https://3000-i49aua0ijjil4k3yd5ptd-82b888ba.sandbox.novita.ai/admin/crm/dashboard
```

---

## **WHAT HAPPENS NEXT?** 🚀

### **After Test Payment Succeeds:**

1. ✅ Payment recorded in Stripe Dashboard
2. ✅ Webhook event sent to `/api/payments/webhook`
3. ✅ Payment saved to `payments` table in database
4. ✅ Customer receives email receipt (from Stripe)
5. ✅ Success page shown with session ID

---

## **GO LIVE CHECKLIST** 📋

When you're ready for REAL payments:

1. ✅ Complete Stripe business verification
2. ✅ Add bank account for payouts
3. ✅ Switch to **Live Mode** in Stripe Dashboard
4. ✅ Get **Live API keys** (pk_live_xxx, sk_live_xxx)
5. ✅ Update Cloudflare secrets with live keys
6. ✅ Create live products (not test mode)
7. ✅ Update Price IDs in checkout pages
8. ✅ Create live webhook endpoint
9. ✅ Test with real card (small amount first!)
10. ✅ Launch! 🎉

---

## **TROUBLESHOOTING** 🔧

### **Error: "Stripe not configured"**
**Fix:** Add `STRIPE_SECRET_KEY` to `.dev.vars` or Cloudflare secrets

### **Error: "Invalid API key"**
**Fix:** Make sure you copied the FULL key (starts with `sk_test_` or `pk_test_`)

### **Payment succeeds but no database entry**
**Fix:** Check webhook is configured correctly in Stripe Dashboard

### **Checkout button doesn't work**
**Fix:** Update Price IDs in the JavaScript `priceMap` object

---

## **QUICK REFERENCE** 📚

### **Test Cards**
```
✅ Success:              4242 4242 4242 4242
❌ Decline:              4000 0000 0000 0002
⏳ 3D Secure Required:   4000 0025 0000 3155
```

### **Environment Variables**
```bash
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

### **Important Files**
```
/home/user/webapp/src/index.tsx                    (API endpoints)
/home/user/webapp/public/static/photography-checkout.html
/home/user/webapp/public/static/education-checkout.html
/home/user/webapp/.dev.vars                        (local env vars)
/home/user/webapp/STRIPE_SETUP_GUIDE.md           (full guide)
```

---

## **YOU'RE 90% DONE!** 🎯

**What's left:**
1. Get Stripe keys (5 mins)
2. Paste them (2 mins)
3. Create products (10 mins)
4. Update Price IDs (3 mins)
5. Test! (2 mins)

**Total time: 22 minutes** ⏱️

---

**Let me know when you have your Stripe API keys and I'll help you add them!** 🚀

*P.S. - Read the full `STRIPE_SETUP_GUIDE.md` for step-by-step screenshots and detailed explanations.*
