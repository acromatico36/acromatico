# 🎯 SMUGMUG IMAGE REPLACEMENT GUIDE

## 📋 OVERVIEW

Currently, all 502 blog post hero images have your **Acromatico logo watermark** on the bottom right.

The **clean versions WITHOUT logo** are on Smugmug at: https://acromatico.smugmug.com

This system allows you to:
1. **Easily map** each blog post to its Smugmug gallery
2. **Batch update** all 502 posts in one command
3. **Track progress** as you fill in Smugmug URLs

---

## 🚀 QUICK START

### **Step 1: Access Smugmug**
Go to: https://acromatico.smugmug.com

*(NOTE: Smugmug was temporarily down when I checked. Wait for it to come back up.)*

### **Step 2: Find Gallery for Each Post**
For each blog post (e.g., "Rustic Barn Wedding at Rolling Meadow Farm | Sade + Luke"):
1. Find the matching Smugmug gallery
2. Open the first/hero image
3. Right-click → "Copy Image Address" (get the full-res URL)
4. Add to `smugmug_image_mapping.json`

### **Step 3: Edit Mapping File**
Open: `/home/user/webapp/smugmug_image_mapping.json`

Example entry:
```json
"rustic-barn-wedding-at-rolling-meadow-farm-sade-luke": {
  "title": "Rustic Barn Wedding at Rolling Meadow Farm | Sade + Luke",
  "current_wordpress_image": "https://acromatico.com/wp-content/uploads/2025/09/rustic-barn-wedding-002.jpg",
  "smugmug_image_no_logo": "https://photos.smugmug.com/..../i-ABC123/0/X5/rustic-barn-001-X5.jpg",
  "smugmug_gallery_url": "https://acromatico.smugmug.com/Weddings/Rustic-Barn-Sade-Luke",
  "notes": "✅ Done - clean hero image"
}
```

### **Step 4: Run Update Script**
```bash
cd /home/user/webapp
python3 smugmug_image_updater.py --update
```

This will:
- Update ALL blog posts with Smugmug URLs
- Skip posts without Smugmug URLs (so you can do it in batches)
- Show progress report

### **Step 5: Deploy**
```bash
cd /home/user/webapp
cp -r public/static/blog dist/static/
pm2 restart acromatico
```

---

## 📊 MAPPING FILE STRUCTURE

### **502 Posts Organized Alphabetically:**
```json
{
  "20th-anniversary-photo-session": { ... },
  "50s-anniversary-maria-antonio": { ... },
  "rustic-barn-wedding-at-rolling-meadow-farm-sade-luke": { ... },
  ...
}
```

### **Each Entry Has:**
| Field | Description | Required |
|-------|-------------|----------|
| `title` | Blog post title | Auto-filled |
| `current_wordpress_image` | Current hero image (with logo) | Auto-filled |
| `smugmug_image_no_logo` | **FILL THIS:** Direct URL to clean Smugmug image | ✅ YES |
| `smugmug_gallery_url` | Link to Smugmug gallery (for reference) | Optional |
| `notes` | Your notes/progress tracking | Optional |

---

## 🎯 RECOMMENDED WORKFLOW

### **Option A: Do All 502 at Once** (Time: ~2-3 hours)
1. Open Smugmug + mapping file side-by-side
2. Go through each gallery
3. Copy image URLs
4. Fill in mapping file
5. Run update script once

### **Option B: Do Top 10 First** (Time: ~15 minutes)
1. Focus on the 10 posts shown on acromatico.com/blog homepage:
   - `rustic-barn-wedding-at-rolling-meadow-farm-sade-luke`
   - `hudson-valley-barn-engagement-kate-steve`
   - `surprise-proposal-sarasota`
   - `cold-spring-ny-wedding-zeynep-dominic`
   - `piano-teacher-photo-session-mistico-restaurant-miami-fl`
   - `family-portrait-photos-at-villa-del-balbianello-lake-como`
   - `family-photo-shoot-at-villa-del-balbianello-lake-como-italy`
   - `davie-fl-wedding-photography`
   - `20th-anniversary-photo-session`
   - `newborn-session`
2. Fill in just those 10
3. Run update script
4. Deploy and test
5. Continue with remaining posts

### **Option C: Batch by Category** (Time: ~3-4 hours)
1. **Day 1:** All wedding posts
2. **Day 2:** All engagement posts
3. **Day 3:** All family/portrait sessions
4. Run update script after each batch

---

## 🔍 HOW TO GET SMUGMUG IMAGE URLS

### **Method 1: Direct Image URL (Recommended)**
1. Open Smugmug gallery
2. Click on image to view full size
3. Right-click image → "Copy Image Address"
4. Paste into `smugmug_image_no_logo` field

Example URL format:
```
https://photos.smugmug.com/photos/i-ABC123/0/X5/i-ABC123-X5.jpg
```

### **Method 2: Download Link**
1. Click "Download" button on image
2. Select largest size (e.g., "Original")
3. Copy the download URL
4. Paste into mapping file

---

## 🚨 IMPORTANT NOTES

### **Smugmug Currently Down:**
When I tried to access https://acromatico.smugmug.com, I got:
```
500 Internal Server Error
"We're so embarrassed. There's been a problem..."
```

**Check Smugmug status:** https://status.smugmug.com/

Once it's back up, you can proceed with the steps above.

### **Image Size Recommendations:**
- **Minimum:** 1920px wide (for hero images)
- **Recommended:** Original/full resolution
- **Format:** .jpg or .jpeg

### **URL Requirements:**
- Must be publicly accessible (no login required)
- Must be direct image URL (ends with .jpg, .jpeg, .png)
- Should be HTTPS

---

## 📝 EXAMPLE: COMPLETE ONE POST

### **Before:**
```json
"rustic-barn-wedding-at-rolling-meadow-farm-sade-luke": {
  "title": "Rustic Barn Wedding at Rolling Meadow Farm | Sade + Luke",
  "current_wordpress_image": "https://acromatico.com/wp-content/uploads/2025/09/rustic-barn-wedding-002.jpg",
  "smugmug_image_no_logo": "",
  "smugmug_gallery_url": "",
  "notes": ""
}
```

### **After (filled in):**
```json
"rustic-barn-wedding-at-rolling-meadow-farm-sade-luke": {
  "title": "Rustic Barn Wedding at Rolling Meadow Farm | Sade + Luke",
  "current_wordpress_image": "https://acromatico.com/wp-content/uploads/2025/09/rustic-barn-wedding-002.jpg",
  "smugmug_image_no_logo": "https://photos.smugmug.com/Wedding/Sade-Luke-Rolling-Meadow/i-JKL456/0/X5/rustic-barn-002-X5.jpg",
  "smugmug_gallery_url": "https://acromatico.smugmug.com/Weddings/Sade-Luke-Rolling-Meadow-Farm",
  "notes": "✅ Clean hero image - no logo"
}
```

---

## 🎉 WHAT HAPPENS WHEN YOU RUN UPDATE

The script will:

1. ✅ Read `smugmug_image_mapping.json`
2. ✅ For each post with a `smugmug_image_no_logo` URL:
   - Open the blog post HTML
   - Find the hero section
   - Replace the background-image URL
   - Save the updated HTML
3. ✅ Show progress report:
   ```
   ✅ UPDATED: 502 posts
   ⏭️  SKIPPED: 0 posts (no Smugmug URL)
   ❌ ERRORS: 0 posts
   ```
4. ✅ All done! Deploy to see changes.

---

## 💡 PRO TIPS

### **Tip 1: Use Notes Field**
Track your progress:
```json
"notes": "✅ Done"
"notes": "⏳ In progress"
"notes": "❌ Can't find gallery"
"notes": "🔍 Need to check image quality"
```

### **Tip 2: Save Frequently**
Edit the JSON file in batches of 10-20 posts, save, and run update script. That way if something breaks, you haven't lost everything.

### **Tip 3: Test First**
Do the top 10 posts first, deploy, and verify they look good before continuing.

### **Tip 4: Search Shortcuts**
In the mapping file, use Ctrl+F to quickly find posts by name.

---

## 🆘 TROUBLESHOOTING

### **Problem: Smugmug is down**
**Solution:** Wait for it to come back up. Check: https://status.smugmug.com/

### **Problem: Can't find a gallery**
**Solution:** Add a note in the mapping file and skip for now:
```json
"notes": "❌ Gallery not found - need to check"
```

### **Problem: Image URL doesn't work**
**Solution:** Make sure it's a direct image URL (not a gallery page). Test by pasting the URL in your browser - should show just the image.

### **Problem: Update script fails**
**Solution:** Check the error message. Common issues:
- Invalid JSON syntax (missing comma, quote)
- Invalid URL format
- File permissions

---

## 📞 READY TO START?

Once Smugmug is back up:

1. **Open:** `smugmug_image_mapping.json`
2. **Fill in:** Smugmug URLs for each post
3. **Run:** `python3 smugmug_image_updater.py --update`
4. **Deploy:** `cp -r public/static/blog dist/static/ && pm2 restart acromatico`

**That's it!** All 502 blog posts will have clean hero images without your logo watermark! 🚀

---

## 📁 FILES

- **Mapping File:** `/home/user/webapp/smugmug_image_mapping.json` (502 posts)
- **Update Script:** `/home/user/webapp/smugmug_image_updater.py`
- **This Guide:** `/home/user/webapp/SMUGMUG_GUIDE.md`

---

**Questions? Let me know and I'll help!** 💪
