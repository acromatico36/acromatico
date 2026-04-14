# Stripe Live Mode Setup Instructions

## 🚨 IMPORTANT: Switch from Test to Live Mode

The site is currently configured for **LIVE Stripe payments**. You need to add your production Stripe keys.

---

## Step 1: Get Your Live Stripe Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. **Toggle "Test mode" OFF** (top right corner)
3. Copy your **Live Publishable Key** (starts with `pk_live_`)
4. Copy your **Live Secret Key** (starts with `sk_live_`)

---

## Step 2: Update Local Development (.dev.vars)

Edit `/home/user/webapp/.dev.vars`:

```bash
# Replace these placeholder values with your actual live keys:
STRIPE_SECRET_KEY=sk_live_YOUR_ACTUAL_SECRET_KEY
STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_ACTUAL_PUBLISHABLE_KEY
```

---

## Step 3: Deploy to Cloudflare Pages with Live Keys

After deploying, add secrets to Cloudflare:

```bash
# Set live secret key (NEVER commit this to git)
npx wrangler pages secret put STRIPE_SECRET_KEY --project-name acromatico
# When prompted, paste: sk_live_YOUR_ACTUAL_SECRET_KEY

# Set live publishable key
npx wrangler pages secret put STRIPE_PUBLISHABLE_KEY --project-name acromatico
# When prompted, paste: pk_live_YOUR_ACTUAL_PUBLISHABLE_KEY
```

---

## Step 4: Verify Live Mode is Active

1. Make a test booking on your live site
2. Check [Stripe Dashboard → Payments](https://dashboard.stripe.com/payments)
3. **Ensure "Test mode" toggle is OFF**
4. You should see real payment attempts (they won't complete without a real card)

---

## 🔒 Security Checklist

✅ `.dev.vars` is in `.gitignore` (never commit API keys)  
✅ Use `wrangler pages secret put` for production (not environment variables in wrangler.jsonc)  
✅ Keep test keys for local development  
✅ Never expose secret keys in frontend code  

---

## Test Cards (for final verification before going live)

While in **test mode**, use these cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

In **live mode**, only real credit cards work.
