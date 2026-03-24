# Production Deployment Commands

## 1. Create D1 Database
```bash
npx wrangler d1 create acromatico-education
```

## 2. Update wrangler.jsonc
Copy the `database_id` from step 1 output and update `wrangler.jsonc`:
```jsonc
"database_id": "PASTE_YOUR_DATABASE_ID_HERE"
```

## 3. Apply Migrations
```bash
npx wrangler d1 migrations apply acromatico-education
```

## 4. Build Project
```bash
npm run build
```

## 5. Deploy to Cloudflare Pages
```bash
npx wrangler pages deploy dist --project-name acromatico
```

## 6. Configure Environment Variables
```bash
npx wrangler pages secret put GENSPARK_API_KEY --project-name acromatico
npx wrangler pages secret put TWILIO_ACCOUNT_SID --project-name acromatico
npx wrangler pages secret put TWILIO_AUTH_TOKEN --project-name acromatico
npx wrangler pages secret put TWILIO_PHONE_NUMBER --project-name acromatico
```
