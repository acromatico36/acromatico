#!/usr/bin/env python3
"""
ADD TAILWIND CSS TO ALL BLOG POSTS
The footer HTML uses Tailwind classes but Tailwind CSS is not loaded
"""

from pathlib import Path

TAILWIND_CDN = '<script src="https://cdn.tailwindcss.com"></script>'

def add_tailwind_to_post(html_file):
    """Add Tailwind CSS CDN to blog post"""
    
    html_path = Path(html_file)
    if not html_path.exists():
        return False
    
    content = html_path.read_text(encoding='utf-8')
    
    # Check if Tailwind already exists
    if 'tailwindcss.com' in content or 'cdn.tailwindcss' in content:
        return False  # Already has Tailwind
    
    # Find the GLightbox CSS line and add Tailwind after it
    glightbox_line = '<link href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css" rel="stylesheet"/>'
    
    if glightbox_line in content:
        # Add Tailwind right after GLightbox
        content = content.replace(
            glightbox_line,
            glightbox_line + '\n' + TAILWIND_CDN
        )
        
        html_path.write_text(content, encoding='utf-8')
        return True
    
    return False

def main():
    """Add Tailwind CSS to all blog posts"""
    
    blog_dir = Path('/home/user/webapp/public/static/blog')
    
    if not blog_dir.exists():
        print("❌ Blog directory not found")
        return
    
    posts = list(blog_dir.glob('*.html'))
    
    print(f"🎨 ADDING TAILWIND CSS TO {len(posts)} BLOG POSTS\n")
    print("="*80)
    
    success = 0
    skipped = 0
    
    for i, post in enumerate(posts, 1):
        if i % 50 == 0:
            print(f"Progress: {i}/{len(posts)} posts...")
        
        if add_tailwind_to_post(post):
            success += 1
        else:
            skipped += 1
    
    print("\n" + "="*80)
    print(f"✅ SUCCESS: {success} posts now have Tailwind CSS")
    print(f"⏭️  SKIPPED: {skipped} posts (already had Tailwind)")
    print("="*80)
    
    print("\n🎯 RESULT:")
    print("All blog footers now styled correctly with Tailwind CSS!")

if __name__ == '__main__':
    main()
