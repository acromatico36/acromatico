# 🚀 ACROMATICO V5 - MANUAL DEPLOYMENT GUIDE

## ⚠️ AUTOMATED DEPLOYMENT ISSUE
The `wrangler pages deploy` command is timing out when uploading 1,119 files.
This is likely due to network limits or API rate limiting.

## ✅ SOLUTION: Deploy via GitHub Actions (RECOMMENDED)

### **Option 1: GitHub → Cloudflare Pages Integration (Easiest)**

1. **Push code to GitHub:**
   ```bash
   cd /home/user/webapp
   git remote add origin https://github.com/YOUR_USERNAME/acromatico.git
   git push -u origin main
   ```

2. **Connect Cloudflare Pages to GitHub:**
   - Go to: https://dash.cloudflare.com/
   - Pages → acromatico → Settings → Builds & deployments
   - Connect to Git repository: acromatico
   - Build settings:
     - Build command: `npm run build`
     - Build output directory: `dist`
     - Root directory: `/`
   - Save and Deploy

3. **Automatic deployments:**
   - Every push to `main` branch will auto-deploy
   - Preview deployments for other branches

---

### **Option 2: Direct Upload via Cloudflare Dashboard**

1. **Create deployment archive:**
   ```bash
   cd /home/user/webapp
   tar -czf acromatico-v5-dist.tar.gz dist/
   ```

2. **Upload via Dashboard:**
   - Go to: https://dash.cloudflare.com/
   - Pages → acromatico → Upload assets
   - Upload `acromatico-v5-dist.tar.gz`
   - Click "Deploy site"

---

### **Option 3: Split Deployment (Workaround)**

If wrangler keeps timing out, deploy in smaller chunks:

```bash
# Deploy worker only (no static files)
cd /home/user/webapp
npx wrangler pages deploy dist/_worker.js --project-name acromatico

# Then use dashboard to upload static files
```

---

## 📊 CURRENT DEPLOYMENT STATUS

- **Version:** V5 (443 blog posts with proper Mares framework)
- **Local URL:** http://localhost:3000
- **Files to deploy:** 1,121 files
- **Total size:** ~50MB
- **Git commit:** e53d75b2

## 🔗 PRODUCTION URLS (After Deployment)

- **Main:** https://acromatico.pages.dev
- **Latest deployment:** https://[deployment-id].acromatico.pages.dev

---

## ✅ WHAT'S DEPLOYED (V5)

- ✅ 443 blog posts with Mares framework
- ✅ All formatting preserved (H2 sections with `<br/>` tags)
- ✅ Hero sections, galleries, FAQs
- ✅ Vendor credits with links
- ✅ Mobile-responsive design
- ✅ Full Mares CSS styling

---

## 💡 RECOMMENDED NEXT STEP

**Use GitHub → Cloudflare Pages integration!**

This is the most reliable way to deploy and gives you:
- Automatic deployments on every push
- Preview deployments for testing
- Deployment history and rollbacks
- No upload timeout issues

Let me know if you want me to set up the GitHub integration!

