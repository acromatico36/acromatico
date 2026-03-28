# 🎯 **STRIPE PRICE IDs - QUICK REFERENCE**

After creating products in Stripe Dashboard, paste your Price IDs here for easy reference.

---

## **PHOTOGRAPHY PACKAGES**

### **1. Headshot Session** ($299)
```
Price ID: price_____________________________
Status: [ ] Created  [ ] Updated in code
```

### **2. Signature Session** ($599) ⭐
```
Price ID: price_____________________________
Status: [ ] Created  [ ] Updated in code
```

### **3. Premium Package** ($1,299)
```
Price ID: price_____________________________
Status: [ ] Created  [ ] Updated in code
```

---

## **EDUCATION PRODUCTS**

### **4. Photography Masterclass** ($149)
```
Price ID: price_____________________________
Status: [ ] Created  [ ] Updated in code
```

### **5. All-Access Membership** ($29/month) 💎
```
Price ID: price_____________________________
Status: [ ] Created  [ ] Updated in code
```

---

## **WHERE TO UPDATE**

### **Photography Checkout**
File: `/home/user/webapp/public/static/photography-checkout.html`
Line: ~387

```javascript
const priceMap = {
  'HEADSHOT_PRICE_ID': 'price_1ABC...',  // ← UPDATE THIS
  'SIGNATURE_PRICE_ID': 'price_1DEF...', // ← UPDATE THIS
  'PREMIUM_PRICE_ID': 'price_1GHI...'    // ← UPDATE THIS
}
```

### **Education Checkout**
File: `/home/user/webapp/public/static/education-checkout.html`
Line: ~416

```javascript
const priceMap = {
  'COURSE_PRICE_ID': 'price_1JKL...',      // ← UPDATE THIS
  'SUBSCRIPTION_PRICE_ID': 'price_1MNO...' // ← UPDATE THIS
}
```

---

## **AFTER UPDATING**

```bash
cd /home/user/webapp
npm run build
pm2 restart acromatico
```

Then test at:
- https://3000-i49aua0ijjil4k3yd5ptd-82b888ba.sandbox.novita.ai/static/photography-checkout.html
- https://3000-i49aua0ijjil4k3yd5ptd-82b888ba.sandbox.novita.ai/static/education-checkout.html

Use test card: **4242 4242 4242 4242**
