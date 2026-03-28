const STRIPE_SECRET_KEY = 'sk_test_51SnJO8DinAxxUzek0Ekm2Vqybn0eie08U5DGQhymGPD0uikVq7eUJuYUyx3wT8lSKydU8nhXxAUXAzfkVIbI1aWg00Vt0uahMK';

async function testKey() {
  console.log('🔑 Testing SECRET KEY from screenshot...\n');
  
  try {
    const response = await fetch('https://api.stripe.com/v1/products?limit=1', {
      headers: { 'Authorization': `Bearer ${STRIPE_SECRET_KEY}` }
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ SUCCESS! KEY IS VALID!');
      console.log('✅ Connected to Stripe!\n');
      return true;
    } else {
      console.log('❌ Still invalid:', data.error?.message);
      console.log('\nThe key in the screenshot might have a typo.');
      console.log('Can you triple-click the key in Stripe Dashboard and copy it?');
      return false;
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
    return false;
  }
}

testKey();
