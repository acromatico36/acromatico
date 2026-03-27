#!/bin/bash
# Apply all database migrations in order

echo "🔄 Applying database migrations..."

cd /home/user/webapp

# Apply to local development database
echo "Applying to local D1 database..."
npx wrangler d1 migrations apply acromatico-education --local

echo "✅ Migrations applied successfully!"
echo ""
echo "To apply to production, run:"
echo "npx wrangler d1 migrations apply acromatico-education"
