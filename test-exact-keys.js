const STRIPE_SECRET_KEY = 'sk_test_51SnJO8DinAxxUzek0Ekm2Vqybn0eie08U5DGQhymGPD0uikVq7eUJuYUyx3wT8lSKydU8nhXxAUXAzfkVIbI1aWg00Vt0uahMK';
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51SnJO8DinAxxUzek8EaG8eF1inNFDlnihZiWzi36CyAdQj5fLAjIixsSjVSq8V5iarAVuChKrCmvdhY4JqXEPTXf00uLoqL2df';

async function testKeys() {
  console.log('🔑 Testing exact keys you provided...\n');
  console.log('Secret key length:', STRIPE_SECRET_KEY.length);
  console.log('Publishable key length:', STRIPE_PUBLISHABLE_KEY.length);
  console.log('');
  
  try {
    const response = await fetch('https://api.stripe.com/v1/products?limit=1', {
      headers: { 'Authorization': `Bearer ${STRIPE_SECRET_KEY}` }
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ SUCCESS! Keys are valid!');
      console.log('✅ Connected to Stripe!');
      console.log('Existing products:', data.data.length);
      return true;
    } else {
      console.log('❌ Error:', data.error?.message);
      console.log('\nLet me try creating products manually instead...');
      return false;
    }
  } catch (error) {
    console.log('❌ Network error:', error.message);
    return false;
  }
}

testKeys();
