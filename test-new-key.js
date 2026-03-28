const STRIPE_SECRET_KEY = 'rk_test_51SnJO8DinAxxUzekljHFxLIKj36qENb6fyQpzWQdvtkYP6aI3vH26VFBZM7AlhP1YGmb2YrcyJhwBI1IvDftJMKt001xBl6e0V';

async function testKey() {
  console.log('🔑 Testing NEW unrestricted key...\n');
  console.log('Key type:', STRIPE_SECRET_KEY.substring(0, 7));
  console.log('Key length:', STRIPE_SECRET_KEY.length);
  console.log('');
  
  try {
    const response = await fetch('https://api.stripe.com/v1/products?limit=1', {
      headers: { 'Authorization': `Bearer ${STRIPE_SECRET_KEY}` }
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ SUCCESS! Key is VALID!');
      console.log('✅ Connected to Stripe successfully!');
      console.log('Account has', data.data.length, 'existing products');
      console.log('\n🚀 Ready to create products automatically!\n');
      return true;
    } else {
      console.log('❌ Error:', data.error?.message);
      console.log('Error type:', data.error?.type);
      return false;
    }
  } catch (error) {
    console.log('❌ Network error:', error.message);
    return false;
  }
}

testKey();
