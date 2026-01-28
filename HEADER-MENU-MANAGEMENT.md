# DYNAMIC HEADER & MENU - Site-Wide Header/Menu Management

## ✅ PROBLEMS SOLVED

1. **Hamburger menu wasn't working** → Fixed! Menu now opens/closes properly
2. **Green hover color (#728012)** → Fixed! Now uses Acromatico brand color (#4794A6)
3. **Hardcoded headers in 502 posts** → Fixed! Now dynamic, update once = changes everywhere

---

## 🎯 How It Works

### Architecture

```
src/components/header.tsx  →  Hono API (/api/header)  →  All Blog Posts
     (Single File)               (Server-Side)              (Dynamic Load)
```

1. **Single Header Component** (`src/components/header.tsx`)
   - Logo + Hamburger menu button
   - Mobile menu drawer with navigation
   - Menu toggle JavaScript included
   - Acromatico brand color styling

2. **Hono API Endpoint** (`/api/header`)
   - Serves header/menu HTML dynamically
   - Includes JavaScript for menu functionality

3. **Blog Posts** (502 posts)
   - Load header via JavaScript on page load
   - Execute menu toggle scripts automatically

---

## 🍔 Menu Features

✅ **Hamburger menu opens/closes properly**  
✅ **Hover color: Acromatico brand (#4794A6)** - not green anymore!  
✅ **Close on overlay click**  
✅ **Close on ESC key**  
✅ **Close when clicking a menu link**  
✅ **Smooth animations**  

---

## 📝 How to Update the Header/Menu

### Update Menu Links

Edit `src/components/header.tsx`:

```typescript
<nav class="mobile-menu-nav">
  <ul>
    <li><a href="/">Portfolios</a></li>
    <li><a href="/static/blog-index.html">Recent Work</a></li>
    <li><a href="/our-story">About Us</a></li>
    <!-- ADD NEW MENU ITEMS HERE -->
    <li><a href="/new-page">New Page</a></li>
  </ul>
</nav>
```

Then rebuild and restart:

```bash
cd /home/user/webapp
npm run build
pm2 restart acromatico
```

**Result:** All 502 blog posts + homepage get the new menu automatically!

---

### Change Brand Color

Edit the color constant in `src/components/header.tsx`:

```typescript
const ACROMATICO_COLOR = '#4794A6'; // Change this to your new color
```

This updates:
- Hamburger hover color
- Menu link hover color
- Search input focus border
- All menu interactions

---

## 🧪 Testing

Test the header API:

```bash
curl http://localhost:3000/api/header
```

Test a blog post:

```bash
curl http://localhost:3000/static/blog/20th-anniversary-photo-session.html | grep header-container
```

Test in browser:
1. Open any blog post
2. Click hamburger menu (top right)
3. Menu should slide in from right
4. Hover over hamburger → should turn teal (#4794A6), not green
5. Click overlay or ESC → menu closes

---

## 📊 Results

✅ **502 blog posts** now use dynamic header/menu  
✅ **34 posts skipped** (test/template files)  
✅ **Hamburger menu** now works properly  
✅ **Brand color** fixed (#4794A6)  
✅ **Menu toggle JavaScript** included  

---

## 🎨 Brand Colors Reference

- **Acromatico Teal**: `#4794A6` (primary brand color)
- **Old Green** (removed): `#728012`

All hover states, focus states, and interactive elements now use the correct brand color!

---

## 🚀 Live Test

🔗 **Test URL:** https://3000-i49aua0ijjil4k3yd5ptd-b9b802c4.sandbox.novita.ai/static/blog/20th-anniversary-photo-session.html

**Try this:**
1. Click hamburger menu (top right corner)
2. Menu slides in from right ✅
3. Hover over menu icon → teal color ✅
4. Click a menu link → menu closes ✅
5. Press ESC → menu closes ✅

---

## 📁 Files

- **Created:** `src/components/header.tsx` (5.7 KB) - Single source of truth
- **Created:** `replace_with_dynamic_header.py` - Migration script
- **Modified:** `src/index.tsx` - Added `/api/header` route
- **Modified:** 502 blog posts - Dynamic header loader

---

## 🎉 Benefits

✅ **Update once, changes everywhere** - No more copy/paste to 502 files  
✅ **Menu actually works** - JavaScript included and functional  
✅ **Correct brand colors** - #4794A6 everywhere  
✅ **Maintainable** - One file to edit for entire site  
✅ **Version control** - All changes tracked in git  

---

## 📝 Future Updates

To add a new menu item or change the menu:

1. Edit `src/components/header.tsx`
2. Run `npm run build && pm2 restart acromatico`
3. **All 502 blog posts updated automatically!** 🚀

---

## Commit

```
[main 3efc4e3e] DYNAMIC HEADER & MENU: Fixed hamburger menu (now works!) 
                + Fixed green color → Acromatico brand color (#4794A6) 
                + 502 blog posts now load header/menu dynamically
506 files changed, 18517 insertions(+), 48910 deletions(-)
```

**48,910 deletions** (removed hardcoded headers) → **18,517 insertions** (dynamic loaders) = **Much cleaner codebase!** 🎉
