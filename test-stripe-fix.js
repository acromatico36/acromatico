// Try different variations of the key
const keys = [
  'sk_test_51SnJO8DinAxxUzekQEkm2Vqybn0eieO8U5DGQhymGPDOuikVq7eUJuYUyx3wT8lSKydU8nhXxAUXAzfkVIbI1aWg00vt0uahMK', // Original with O and v
  'sk_test_51SnJO8DinAxxUzek0Ekm2Vqybn0eie08U5DGQhymGPD0uikVq7eUJuYUyx3wT8lSKydU8nhXxAUXAzfkVIbI1aWg00Vt0uahMK'  // Your new one with 0 and V
];

async function testKey(key, label) {
  console.log(`Testing ${label}...`);
  try {
    const response = await fetch('https://api.stripe.com/v1/products?limit=1', {
      headers: { 'Authorization': `Bearer ${key}` }
    });
    
    if (response.ok) {
      console.log(`✅ ${label} WORKS!\n`);
      return key;
    } else {
      console.log(`❌ ${label} failed\n`);
      return null;
    }
  } catch (error) {
    console.log(`❌ ${label} error: ${error.message}\n`);
    return null;
  }
}

async function findWorkingKey() {
  for (let i = 0; i < keys.length; i++) {
    const result = await testKey(keys[i], `Key ${i + 1}`);
    if (result) {
      console.log('✅ FOUND WORKING KEY!');
      console.log(result);
      return result;
    }
  }
  console.log('❌ None of the keys work. Please re-copy from Stripe Dashboard.');
}

findWorkingKey();
