/**
 * Stripe Products Auto-Creation Script
 * 
 * This script automatically creates all 5 products in Stripe using the Stripe API.
 * Run this once to set up all products, then automatically update checkout pages.
 * 
 * Usage: node scripts/create-stripe-products.js
 */

// Product definitions matching your checkout pages
const products = [
  {
    name: 'Professional Headshot Session',
    description: '30-minute professional photography session with 10 retouched headshots. Perfect for LinkedIn, corporate profiles, and personal branding.',
    price: 29900, // $299.00 in cents
    currency: 'usd',
    type: 'one_time',
    category: 'photography',
    metadata: {
      duration: '30 minutes',
      deliverables: '10 retouched headshots',
      delivery_time: '2 weeks',
      package_type: 'headshot'
    }
  },
  {
    name: 'Signature Photography Session',
    description: '2-hour comprehensive photography session with 50+ professionally edited photos. Multiple locations and outfit changes included. Delivered in private online gallery within 1 week.',
    price: 59900, // $599.00 in cents
    currency: 'usd',
    type: 'one_time',
    category: 'photography',
    metadata: {
      duration: '2 hours',
      deliverables: '50+ edited photos',
      delivery_time: '1 week',
      package_type: 'signature',
      popular: 'true'
    }
  },
  {
    name: 'Premium Photography Package',
    description: 'Full-day photography experience with 100+ edited photos, premium photo album, 20 printed photos (8x10), and unlimited locations. Includes expedited 3-day delivery.',
    price: 129900, // $1,299.00 in cents
    currency: 'usd',
    type: 'one_time',
    category: 'photography',
    metadata: {
      duration: 'Full day',
      deliverables: '100+ photos, album, 20 prints',
      delivery_time: '3 days',
      package_type: 'premium'
    }
  },
  {
    name: 'Photography Masterclass for Kids',
    description: '8-week online photography course for ages 10-18. Includes 40+ video lessons, downloadable workbooks, private community access, one-on-one mentor session, and certificate of completion. Lifetime access to all course materials.',
    price: 14900, // $149.00 in cents
    currency: 'usd',
    type: 'one_time',
    category: 'education',
    metadata: {
      duration: '8 weeks',
      lessons: '40+ video lessons',
      age_range: '10-18',
      access: 'lifetime',
      package_type: 'masterclass'
    }
  },
  {
    name: 'All-Access Education Membership',
    description: 'Unlimited access to all courses, weekly live workshops, priority support, and new courses added monthly. Perfect for homeschool families who want comprehensive creative education.',
    price: 2900, // $29.00 in cents
    currency: 'usd',
    type: 'recurring',
    interval: 'month',
    category: 'education',
    metadata: {
      access: 'unlimited',
      support: 'priority',
      workshops: 'weekly',
      package_type: 'membership',
      best_value: 'true'
    }
  }
];

async function createStripeProducts() {
  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
  
  if (!STRIPE_SECRET_KEY) {
    console.error('❌ ERROR: STRIPE_SECRET_KEY not found in environment variables');
    console.error('Make sure you have a .dev.vars file with STRIPE_SECRET_KEY');
    process.exit(1);
  }

  console.log('🚀 Starting Stripe Products Creation...\n');
  console.log('━'.repeat(80));

  const createdProducts = [];

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    console.log(`\n📦 Creating Product ${i + 1}/5: ${product.name}`);
    
    try {
      // Step 1: Create the product
      const productResponse = await fetch('https://api.stripe.com/v1/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          name: product.name,
          description: product.description,
          ...Object.keys(product.metadata).reduce((acc, key, index) => ({
            ...acc,
            [`metadata[${key}]`]: product.metadata[key]
          }), {})
        })
      });

      if (!productResponse.ok) {
        const error = await productResponse.json();
        throw new Error(`Product creation failed: ${error.error?.message || 'Unknown error'}`);
      }

      const productData = await productResponse.json();
      console.log(`   ✅ Product created: ${productData.id}`);

      // Step 2: Create the price
      const priceParams = new URLSearchParams({
        product: productData.id,
        unit_amount: product.price.toString(),
        currency: product.currency
      });

      if (product.type === 'recurring') {
        priceParams.append('recurring[interval]', product.interval);
      }

      const priceResponse = await fetch('https://api.stripe.com/v1/prices', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: priceParams
      });

      if (!priceResponse.ok) {
        const error = await priceResponse.json();
        throw new Error(`Price creation failed: ${error.error?.message || 'Unknown error'}`);
      }

      const priceData = await priceResponse.json();
      console.log(`   ✅ Price created: ${priceData.id}`);
      console.log(`   💰 Amount: $${(product.price / 100).toFixed(2)} ${product.currency.toUpperCase()}`);
      console.log(`   🔗 Type: ${product.type}${product.interval ? ` (${product.interval}ly)` : ''}`);

      createdProducts.push({
        name: product.name,
        product_id: productData.id,
        price_id: priceData.id,
        amount: product.price,
        type: product.type,
        category: product.category
      });

    } catch (error) {
      console.error(`   ❌ Error creating ${product.name}:`, error.message);
      process.exit(1);
    }
  }

  console.log('\n' + '━'.repeat(80));
  console.log('\n🎉 SUCCESS! All 5 products created in Stripe!\n');
  
  // Display results
  console.log('📋 PRICE IDs CREATED:\n');
  console.log('━'.repeat(80));
  
  const photographyProducts = createdProducts.filter(p => p.category === 'photography');
  const educationProducts = createdProducts.filter(p => p.category === 'education');
  
  console.log('\n📸 PHOTOGRAPHY PACKAGES:\n');
  photographyProducts.forEach((p, i) => {
    console.log(`${i + 1}. ${p.name}`);
    console.log(`   Price ID: ${p.price_id}`);
    console.log(`   Amount: $${(p.amount / 100).toFixed(2)}\n`);
  });
  
  console.log('🎓 EDUCATION PRODUCTS:\n');
  educationProducts.forEach((p, i) => {
    console.log(`${i + 1}. ${p.name}`);
    console.log(`   Price ID: ${p.price_id}`);
    console.log(`   Amount: $${(p.amount / 100).toFixed(2)}${p.type === 'recurring' ? '/month' : ''}\n`);
  });

  console.log('━'.repeat(80));
  console.log('\n💻 CODE SNIPPETS TO COPY:\n');
  console.log('PHOTOGRAPHY-CHECKOUT.HTML (line ~387):\n');
  console.log('const priceMap = {');
  photographyProducts.forEach(p => {
    const key = p.name.includes('Headshot') ? 'HEADSHOT_PRICE_ID' : 
                 p.name.includes('Signature') ? 'SIGNATURE_PRICE_ID' : 
                 'PREMIUM_PRICE_ID';
    console.log(`  '${key}': '${p.price_id}',`);
  });
  console.log('}\n');
  
  console.log('EDUCATION-CHECKOUT.HTML (line ~416):\n');
  console.log('const priceMap = {');
  educationProducts.forEach(p => {
    const key = p.name.includes('Masterclass') ? 'COURSE_PRICE_ID' : 'SUBSCRIPTION_PRICE_ID';
    console.log(`  '${key}': '${p.price_id}',`);
  });
  console.log('}\n');
  
  console.log('━'.repeat(80));
  console.log('\n✅ All done! View in Stripe Dashboard:\n');
  console.log('   https://dashboard.stripe.com/test/products\n');
  
  return createdProducts;
}

// Run the script
createStripeProducts().catch(error => {
  console.error('\n❌ FATAL ERROR:', error.message);
  process.exit(1);
});
