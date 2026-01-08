# MANUAL E-COMMERCE TESTING CHECKLIST

## 🔗 LIVE URL
**https://3000-i2ay1vn846a1hkwkyk082-cbeee0f9.sandbox.novita.ai**

---

## ✅ PRICING PAGE TEST (/pricing)
**URL**: https://3000-i2ay1vn846a1hkwkyk082-cbeee0f9.sandbox.novita.ai/pricing

### What You Should See:
1. **4 Pricing Cards** displayed in a grid
   - 1 Student - $116/mo
   - 2 Students - $99/mo (Most Popular badge)
   - 3 Students - $89/mo
   - 4+ Students - $79/mo

2. **Monthly/Annual Toggle** at the top
   - Click toggle to switch between plans
   - Annual shows (Save 20%) discount
   - Prices update when toggling

3. **Add to Cart Buttons** on each card
   - Should say "Add to Cart"
   - Should be clickable
   - Should show "Added to cart! 🎉" alert when clicked

4. **Cart Counter** in nav (top right)
   - Shows "0" initially
   - Increments when items added

### Test Steps:
- [ ] Visit /pricing page
- [ ] Verify 4 pricing cards are visible
- [ ] Click "Add to Cart" on 2 Students plan
- [ ] Verify alert appears
- [ ] Check cart counter increases to "1"
- [ ] Click toggle to Annual
- [ ] Verify prices change (e.g., 2 Students becomes $79/mo)
- [ ] Add another tier to cart
- [ ] Verify cart counter increases

---

## 🛒 CART PAGE TEST (/cart)
**URL**: https://3000-i2ay1vn846a1hkwkyk082-cbeee0f9.sandbox.novita.ai/cart

### What You Should See:
1. **Cart Items** (if you added items from pricing)
   - Student tier name
   - Price per student
   - Billing period (Monthly/Annual)
   - Quantity controls (+/-)
   - Remove button

2. **Order Summary**
   - Subtotal
   - Savings (if annual)
   - Total

3. **Proceed to Checkout** button

### Test Steps:
- [ ] Visit /cart after adding items
- [ ] Verify items display correctly
- [ ] Click "+" to increase quantity
- [ ] Click "-" to decrease quantity
- [ ] Click "Remove" to delete item
- [ ] Check totals update correctly
- [ ] Click "Proceed to Checkout"

---

## 💳 CHECKOUT PAGE TEST (/checkout)
**URL**: https://3000-i2ay1vn846a1hkwkyk082-cbeee0f9.sandbox.novita.ai/checkout

### What You Should See:
1. **Account Information Form**
   - Full Name
   - Email
   - Phone
   - Password

2. **Student Information Forms**
   - Dynamic based on cart items
   - Name, Age, Grade for each student

3. **Payment Information**
   - Stripe placeholder (not functional yet)

4. **Order Summary Sidebar**
   - Shows cart items
   - Shows prorated first month pricing
   - Shows totals

### Test Steps:
- [ ] Visit /checkout (with items in cart)
- [ ] Verify form sections appear
- [ ] Check student forms match cart quantity
- [ ] Fill out account info form
- [ ] Fill out student info forms
- [ ] Verify order summary shows correct items

---

## 🏠 HOMEPAGE TEST (/)
**URL**: https://3000-i2ay1vn846a1hkwkyk082-cbeee0f9.sandbox.novita.ai

### What You Should See:
1. **Hero Section** with starfield animation
2. **"Start Creating Today"** button → should go to /pricing
3. **"Enroll Now"** buttons → should go to /pricing
4. **"View Curriculum"** button → should smooth scroll to curriculum
5. **12-Month Journey** section with video background
6. **Meet Your Educators** section with Italo & Ale photos

### Test Steps:
- [ ] Visit homepage
- [ ] Click "Start Creating Today"
- [ ] Verify redirects to /pricing
- [ ] Go back, click "View Curriculum"
- [ ] Verify smooth scroll to curriculum section
- [ ] Click "Enroll Now" in CTA section
- [ ] Verify redirects to /pricing

---

## 🎓 ACADEMY PAGE TEST (/academy)
**URL**: https://3000-i2ay1vn846a1hkwkyk082-cbeee0f9.sandbox.novita.ai/academy

### What You Should See:
- Curriculum overview
- Monthly breakdown
- Learning objectives
- Pricing CTA

---

## ❓ FAQ PAGE TEST (/faq)
**URL**: https://3000-i2ay1vn846a1hkwkyk082-cbeee0f9.sandbox.novita.ai/faq

### What You Should See:
- 8 FAQ items
- Ages, equipment, cancellation info
- Multi-child discount details
- Contact CTA

---

## 🐛 KNOWN ISSUES TO CHECK
1. **404 Error in Console**: There's a harmless 404 for a missing resource (likely sourcemap). Ignore if functionality works.
2. **Tailwind CDN Warning**: Expected warning about using CDN in production. Ignore for dev testing.
3. **Cart Persistence**: Cart should persist after page refresh (uses localStorage).

---

## ✨ EXPECTED BEHAVIOR
- All buttons should have hover effects (lift + glow)
- Brand color #4794A6 on primary buttons
- Navigation should work across all pages
- Cart counter should update in real-time
- Monthly/Annual toggle should update prices instantly
- "Most Popular" badge should be on 2 Students tier

---

## 🚨 REPORT ISSUES
If anything doesn't work:
1. Note the exact page URL
2. Describe what you clicked
3. Describe what happened vs what you expected
4. Check browser console for errors (F12 → Console tab)
