#!/usr/bin/env python3
"""
STANDARDIZE FOOTER ACROSS ALL BLOG POSTS
Replaces simple blog footer with site-wide footer from homepage
"""

from pathlib import Path
import re

# Site-wide footer HTML (from homepage)
SITE_FOOTER = '''<footer class="bg-black border-t border-white/10 py-16">
<div class="max-w-7xl mx-auto px-6 lg:px-8">
<div class="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
<div>
<h4 class="font-bold mb-4">Academy</h4>
<ul class="space-y-2 text-gray-400 text-sm">
<li><a href="/academy" class="hover:text-white transition">Curriculum</a></li>
<li><a href="/pricing" class="hover:text-white transition">Pricing</a></li>
<li><a href="/faq" class="hover:text-white transition">FAQ</a></li>
</ul>
</div>
<div>
<h4 class="font-bold mb-4">Services</h4>
<ul class="space-y-2 text-gray-400 text-sm">
<li><a href="/studio" class="hover:text-white transition">Studio</a></li>
<li><a href="/prints" class="hover:text-white transition">Art Prints</a></li>
<li><a href="/photography" class="hover:text-white transition">Photography</a></li>
</ul>
</div>
<div>
<h4 class="font-bold mb-4">Company</h4>
<ul class="space-y-2 text-gray-400 text-sm">
<li><a href="/about" class="hover:text-white transition">About</a></li>
<li><a href="/blog" class="hover:text-white transition">Blog</a></li>
<li><a href="/contact" class="hover:text-white transition">Contact</a></li>
</ul>
</div>
<div>
<h4 class="font-bold mb-4">Legal</h4>
<ul class="space-y-2 text-gray-400 text-sm">
<li><a href="/privacy" class="hover:text-white transition">Privacy</a></li>
<li><a href="/terms" class="hover:text-white transition">Terms</a></li>
</ul>
</div>
</div>
<div class="pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
<p>© 2026 Acromatico. Built for creators, by creators.</p>
</div>
</div>
</footer>'''

def replace_footer_in_post(html_file):
    """Replace old blog footer with site-wide footer"""
    
    html_path = Path(html_file)
    if not html_path.exists():
        return False
    
    content = html_path.read_text(encoding='utf-8')
    
    # Find and replace the old post-footer
    old_footer_pattern = r'<div class="post-footer">.*?</div>\s*</div>'
    
    if re.search(old_footer_pattern, content, re.DOTALL):
        # Replace old footer with new site-wide footer
        content = re.sub(old_footer_pattern, SITE_FOOTER, content, flags=re.DOTALL)
        
        # Write back
        html_path.write_text(content, encoding='utf-8')
        return True
    
    return False

def main():
    """Replace footer in all blog posts"""
    
    blog_dir = Path('/home/user/webapp/public/static/blog')
    
    if not blog_dir.exists():
        print("❌ Blog directory not found")
        return
    
    posts = list(blog_dir.glob('*.html'))
    
    print(f"🔄 STANDARDIZING FOOTER ACROSS {len(posts)} BLOG POSTS\n")
    print("="*80)
    
    success = 0
    skipped = 0
    
    for i, post in enumerate(posts, 1):
        if i % 50 == 0:
            print(f"Progress: {i}/{len(posts)} posts...")
        
        if replace_footer_in_post(post):
            success += 1
        else:
            skipped += 1
    
    print("\n" + "="*80)
    print(f"✅ SUCCESS: {success} footers replaced")
    print(f"⏭️  SKIPPED: {skipped} posts (no old footer found)")
    print("="*80)
    
    print("\n🎯 RESULT:")
    print("All blog posts now have the same footer as the homepage!")

if __name__ == '__main__':
    main()
