// Create Stripe Products for Acromatico Photography
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_51SnJO8DinAxxUzekOEkm2Vqybn0eieO8U5DGQhymGPDOuikVq7eUJuYUyx3wT8lSKydU8nhXxAUXAzfkVIbI1aWg00Vt0uahMK')

const products = [
  {
    name: 'Wedding Photography Package',
    description: 'Luxury wedding photography with timeless heirloom albums. Full-day coverage, engagement sessions, and museum-quality prints.',
    price: 120000, // $1,200 in cents
    currency: 'usd',
    type: 'one_time'
  },
  {
    name: 'Portrait Photography Session',
    description: 'Professional headshots, family portraits, and personal branding sessions. Studio or on-location.',
    price: 50000, // $500 in cents
    currency: 'usd',
    type: 'one_time'
  },
  {
    name: 'Event Photography Package',
    description: 'Corporate events, galas, conferences, and celebrations. Full event coverage with same-day delivery options.',
    price: 120000, // $1,200 in cents
    currency: 'usd',
    type: 'one_time'
  },
  {
    name: 'Commercial Photography',
    description: 'Product photography, brand campaigns, and editorial work. Studio production and creative direction.',
    price: 150000, // $1,500 average, custom pricing
    currency: 'usd',
    type: 'one_time'
  },
  {
    name: 'Real Estate Photography',
    description: 'Residential and Airbnb photography. Aerial drone shots, twilight photos, and virtual tours for MLS listings.',
    price: 35000, // $350 in cents
    currency: 'usd',
    type: 'one_time'
  }
]

async function createProducts() {
  console.log('\n🎨 Creating Acromatico Photography Products in Stripe...\n')
  console.log('='.repeat(80))
  
  const results = []
  
  for (let i = 0; i < products.length; i++) {
    const product = products[i]
    console.log(`\n📸 Creating ${i + 1}/${products.length}: ${product.name}`)
    
    try {
      // Create product
      const stripeProduct = await stripe.products.create({
        name: product.name,
        description: product.description,
        metadata: {
          category: 'photography',
          type: product.type
        }
      })
      
      // Create price
      const stripePrice = await stripe.prices.create({
        product: stripeProduct.id,
        unit_amount: product.price,
        currency: product.currency
      })
      
      results.push({
        name: product.name,
        product_id: stripeProduct.id,
        price_id: stripePrice.price_id,
        amount: product.price / 100
      })
      
      console.log(`   ✅ Product ID: ${stripeProduct.id}`)
      console.log(`   ✅ Price ID: ${stripePrice.id}`)
      console.log(`   💰 Amount: $${(product.price / 100).toFixed(2)}`)
      
    } catch (error) {
      console.error(`   ❌ Error: ${error.message}`)
    }
  }
  
  console.log('\n' + '='.repeat(80))
  console.log('\n📋 SUMMARY - Copy these Price IDs:\n')
  
  results.forEach((r, i) => {
    console.log(`${i + 1}. ${r.name}`)
    console.log(`   Price ID: ${r.price_id}`)
    console.log(`   Amount: $${r.amount}\n`)
  })
  
  console.log('='.repeat(80))
  console.log('\n🔗 Next Steps:')
  console.log('1. Copy the Price IDs above')
  console.log('2. Update photography-checkout.html with these IDs')
  console.log('3. Test checkout with card: 4242 4242 4242 4242')
  console.log('4. View products: https://dashboard.stripe.com/test/products\n')
}

createProducts().catch(console.error)
