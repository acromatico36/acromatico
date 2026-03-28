# 🎯 **STRIPE PRODUCTS CREATION GUIDE**

## **✅ STRIPE KEYS CONFIGURED!**

Your Stripe API keys have been successfully added to the project!

```
✅ Publishable Key: pk_test_51SnJO8DinAxxUzek8EaG8eF1in...
✅ Secret Key: sk_test_51SnJO8DinAxxUzekQEkm2Vqybn...
✅ Server restarted with new environment variables
✅ Ready to create products!
```

---

## **NEXT STEP: CREATE 5 STRIPE PRODUCTS** 📦

### **Go to:** https://dashboard.stripe.com/test/products

Click the **"+ Add product"** button in the top-right corner.

---

## **PRODUCT 1: HEADSHOT SESSION** 💼

### **Product Information**
```
Name: Professional Headshot Session
Description: 30-minute professional photography session with 10 retouched headshots. Perfect for LinkedIn, corporate profiles, and personal branding.
```

### **Pricing**
```
Pricing model: Standard pricing
Price: $299.00
Billing period: One time
Currency: USD
```

### **After Creating:**
1. Click **"Save product"**
2. You'll see a **Price ID** like: `price_1SnJOxxxxxxxxxxxxxx`
3. **COPY THIS PRICE ID** - you'll need it!

---

## **PRODUCT 2: SIGNATURE SESSION** ⭐ (MOST POPULAR)

### **Product Information**
```
Name: Signature Photography Session
Description: 2-hour comprehensive photography session with 50+ professionally edited photos. Multiple locations and outfit changes included. Delivered in private online gallery within 1 week.
```

### **Pricing**
```
Pricing model: Standard pricing
Price: $599.00
Billing period: One time
Currency: USD
```

### **After Creating:**
1. Click **"Save product"**
2. **COPY THE PRICE ID**

---

## **PRODUCT 3: PREMIUM PACKAGE** 👑

### **Product Information**
```
Name: Premium Photography Package
Description: Full-day photography experience with 100+ edited photos, premium photo album, 20 printed photos (8x10), and unlimited locations. Includes expedited 3-day delivery.
```

### **Pricing**
```
Pricing model: Standard pricing
Price: $1,299.00
Billing period: One time
Currency: USD
```

### **After Creating:**
1. Click **"Save product"**
2. **COPY THE PRICE ID**

---

## **PRODUCT 4: PHOTOGRAPHY MASTERCLASS** 🎓

### **Product Information**
```
Name: Photography Masterclass for Kids
Description: 8-week online photography course for ages 10-18. Includes 40+ video lessons, downloadable workbooks, private community access, one-on-one mentor session, and certificate of completion. Lifetime access to all course materials.
```

### **Pricing**
```
Pricing model: Standard pricing
Price: $149.00
Billing period: One time
Currency: USD
```

### **After Creating:**
1. Click **"Save product"**
2. **COPY THE PRICE ID**

---

## **PRODUCT 5: ALL-ACCESS MEMBERSHIP** 💎 (BEST VALUE)

### **Product Information**
```
Name: All-Access Education Membership
Description: Unlimited access to all courses, weekly live workshops, priority support, and new courses added monthly. Perfect for homeschool families who want comprehensive creative education.
```

### **Pricing**
```
Pricing model: Standard pricing
Price: $29.00
Billing period: Monthly
Currency: USD
```

### **Optional: Free Trial**
```
Trial period: 7 days (free trial before first charge)
```

### **After Creating:**
1. Click **"Save product"**
2. **COPY THE PRICE ID**

---

## **PRICE IDs TRACKING SHEET** 📋

After creating each product, paste the Price IDs here:

```
1. Headshot Session ($299)
   Price ID: price_________________________________

2. Signature Session ($599) ⭐
   Price ID: price_________________________________

3. Premium Package ($1,299)
   Price ID: price_________________________________

4. Photography Masterclass ($149)
   Price ID: price_________________________________

5. All-Access Membership ($29/month) 💎
   Price ID: price_________________________________
```

---

## **AFTER CREATING ALL 5 PRODUCTS** ✅

### **Send me the 5 Price IDs and I'll:**

1. ✅ Update `/public/static/photography-checkout.html` with photography Price IDs
2. ✅ Update `/public/static/education-checkout.html` with education Price IDs
3. ✅ Rebuild the app
4. ✅ Test payment with card `4242 4242 4242 4242`
5. ✅ Show you the working checkout pages!

---

## **VISUAL GUIDE: HOW TO CREATE A PRODUCT** 📸

### **Step 1: Click "+ Add product"**
```
┌────────────────────────────────────────────────────┐
│ Products                        [+ Add product]    │
└────────────────────────────────────────────────────┘
```

### **Step 2: Fill Product Details**
```
┌────────────────────────────────────────────────────┐
│ Add a product                                      │
├────────────────────────────────────────────────────┤
│                                                    │
│ Name                                               │
│ [Professional Headshot Session              ]     │
│                                                    │
│ Description (optional)                             │
│ [30-minute professional photography session...]   │
│                                                    │
│ Image (optional)                                   │
│ [Upload image]                                     │
│                                                    │
└────────────────────────────────────────────────────┘
```

### **Step 3: Set Pricing**
```
┌────────────────────────────────────────────────────┐
│ Pricing                                            │
├────────────────────────────────────────────────────┤
│                                                    │
│ Pricing model                                      │
│ (•) Standard pricing                               │
│ ( ) Package pricing                                │
│                                                    │
│ Price                                              │
│ $ [299.00]    USD ▼                                │
│                                                    │
│ Billing period                                     │
│ [One time ▼]                                       │
│                                                    │
│ [Save product]                                     │
│                                                    │
└────────────────────────────────────────────────────┘
```

### **Step 4: Copy Price ID**
```
┌────────────────────────────────────────────────────┐
│ Professional Headshot Session                      │
├────────────────────────────────────────────────────┤
│                                                    │
│ Price                                              │
│ $299.00 USD • One time                             │
│                                                    │
│ Price ID: price_1SnJOxxxxxxxxxxxxxxxxxx            │
│           [Copy] ← CLICK THIS!                     │
│                                                    │
└────────────────────────────────────────────────────┘
```

---

## **QUICK COPY-PASTE TEMPLATES** 📝

For faster creation, here are copy-paste ready templates:

### **HEADSHOT**
```
Name: Professional Headshot Session
Description: 30-minute professional photography session with 10 retouched headshots. Perfect for LinkedIn, corporate profiles, and personal branding.
Price: 299.00
Billing: One time
```

### **SIGNATURE**
```
Name: Signature Photography Session
Description: 2-hour comprehensive photography session with 50+ professionally edited photos. Multiple locations and outfit changes included. Delivered in private online gallery within 1 week.
Price: 599.00
Billing: One time
```

### **PREMIUM**
```
Name: Premium Photography Package
Description: Full-day photography experience with 100+ edited photos, premium photo album, 20 printed photos (8x10), and unlimited locations. Includes expedited 3-day delivery.
Price: 1299.00
Billing: One time
```

### **MASTERCLASS**
```
Name: Photography Masterclass for Kids
Description: 8-week online photography course for ages 10-18. Includes 40+ video lessons, downloadable workbooks, private community access, one-on-one mentor session, and certificate of completion. Lifetime access to all course materials.
Price: 149.00
Billing: One time
```

### **MEMBERSHIP**
```
Name: All-Access Education Membership
Description: Unlimited access to all courses, weekly live workshops, priority support, and new courses added monthly. Perfect for homeschool families who want comprehensive creative education.
Price: 29.00
Billing: Monthly
Trial: 7 days (optional)
```

---

## **TROUBLESHOOTING** 🔧

### **Q: Can't find "+ Add product" button?**
**A:** Make sure you're in **Test Mode** (toggle in top-right) and on the Products page: https://dashboard.stripe.com/test/products

### **Q: Where do I find the Price ID?**
**A:** After saving a product, click on it. The Price ID is shown under the price amount. It looks like `price_1SnJOxxxxxxxxxxxxxxxxxx`

### **Q: Can I edit products later?**
**A:** Yes! But you'll get a NEW Price ID if you change the price. Better to create them correctly now.

### **Q: Do I need to add images?**
**A:** No, images are optional. We already have beautiful images on the checkout pages.

---

## **TIME ESTIMATE** ⏱️

- Product 1 (Headshot): 2 mins
- Product 2 (Signature): 2 mins
- Product 3 (Premium): 2 mins
- Product 4 (Masterclass): 2 mins
- Product 5 (Membership): 2 mins
**Total: 10 minutes**

---

## **AFTER YOU'RE DONE** ✅

### **Send me this:**

```
Headshot Price ID: price_xxxxxxxxxxxxxxxxxxxxx
Signature Price ID: price_xxxxxxxxxxxxxxxxxxxxx
Premium Price ID: price_xxxxxxxxxxxxxxxxxxxxx
Masterclass Price ID: price_xxxxxxxxxxxxxxxxxxxxx
Membership Price ID: price_xxxxxxxxxxxxxxxxxxxxx
```

### **And I'll complete the integration in 2 minutes!** 🚀

---

**Current Status:** ✅ Stripe keys configured  
**Next Step:** Create 5 products in Stripe Dashboard  
**URL:** https://dashboard.stripe.com/test/products  
**Time Needed:** 10 minutes  

**Let me know when you have the Price IDs!** 🎯
