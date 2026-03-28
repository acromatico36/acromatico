const STRIPE_SECRET_KEY = 'sk_test_51SnJO8DinAxxUzekOEkm2Vqybn0eieO8U5DGQhymGPDOuikVq7eUJuYUyx3wT8lSKydU8nhXxAUXAzfkVIbI1aWg00Vt0uahMK';

async function testKey() {
  console.log('🔑 Testing CORRECTED secret key...\n');
  console.log('Key starts with:', STRIPE_SECRET_KEY.substring(0, 20) + '...');
  console.log('Key length:', STRIPE_SECRET_KEY.length, 'characters\n');
  
  try {
    const response = await fetch('https://api.stripe.com/v1/products?limit=1', {
      headers: { 'Authorization': `Bearer ${STRIPE_SECRET_KEY}` }
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅✅✅ SUCCESS! KEY IS VALID! ✅✅✅');
      console.log('✅ Connected to Stripe successfully!');
      console.log('📦 Existing products:', data.data.length);
      console.log('\n🚀 Ready to create all 5 products automatically!\n');
      return true;
    } else {
      console.log('❌ Error:', data.error?.message);
      return false;
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
    return false;
  }
}

testKey();
