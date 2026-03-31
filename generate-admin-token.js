// Generate Admin JWT Token for Acromatico CRM
const JWT_SECRET = 'acromatico-super-secret-key-2024-change-in-production'

// Simple JWT generation (header.payload.signature)
function base64UrlEncode(str) {
  return Buffer.from(str).toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

function createToken(payload) {
  const header = { alg: 'HS256', typ: 'JWT' }
  
  const headerEncoded = base64UrlEncode(JSON.stringify(header))
  const payloadEncoded = base64UrlEncode(JSON.stringify(payload))
  
  const crypto = require('crypto')
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${headerEncoded}.${payloadEncoded}`)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
  
  return `${headerEncoded}.${payloadEncoded}.${signature}`
}

// Generate admin token
const adminPayload = {
  userId: 'admin-italo',
  email: 'italo@acromatico.com',
  role: 'admin',
  name: 'Italo Campilii',
  iat: Math.floor(Date.now() / 1000),
  exp: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60) // 1 year
}

const token = createToken(adminPayload)

console.log('\n🔐 ACROMATICO CRM - ADMIN TOKEN\n')
console.log('=' .repeat(80))
console.log('\n📋 YOUR ADMIN TOKEN (copy this entire string):\n')
console.log(token)
console.log('\n' + '=' .repeat(80))
console.log('\n✅ Token Details:')
console.log('   • User: Italo Campilii')
console.log('   • Email: italo@acromatico.com')
console.log('   • Role: admin')
console.log('   • Expires: 1 year from now')
console.log('\n🔗 CRM Login URL:')
console.log('   https://3000-i49aua0ijjil4k3yd5ptd-82b888ba.sandbox.novita.ai/admin/crm/login')
console.log('\n📝 How to use:')
console.log('   1. Copy the token above')
console.log('   2. Go to CRM Login page')
console.log('   3. Paste token in the text area')
console.log('   4. Click "Access Dashboard"')
console.log('\n')
