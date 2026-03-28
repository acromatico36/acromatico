const STRIPE_SECRET_KEY = 'sk_test_51SnJO8DinAxxUzek0Ekm2Vqybn0eie08U5DGQhymGPD0uikVq7eUJuYUyx3wT8lSKydU8nhXxAUXAzfkVIbI1aWg00Vt0uahMK';

async function testStripeKey() {
  console.log('🔑 Testing Stripe API key...\n');
  
  try {
    const response = await fetch('https://api.stripe.com/v1/products?limit=1', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${STRIPE_SECRET_KEY}`
      }
    });
    
    console.log('Response status:', response.status);
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ API key is VALID!');
      console.log('✅ Connected to Stripe successfully!\n');
      return true;
    } else {
      console.log('❌ API key error:', data.error?.message);
      return false;
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
    return false;
  }
}

testStripeKey();
