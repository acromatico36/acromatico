#!/usr/bin/env python3
"""
Fix template literal issues in blog-page.tsx by escaping all ${} inside <script> tags
"""

def fix_template_literals():
    file_path = 'src/blog-page.tsx'
    
    with open(file_path, 'r') as f:
        lines = f.readlines()
    
    # Find script tag boundaries
    script_start = None
    script_end = None
    
    for i, line in enumerate(lines):
        if '<script>' in line:
            script_start = i
        if '</script>' in line:
            script_end = i
            break
    
    if script_start is None or script_end is None:
        print("❌ Could not find <script> tags!")
        return False
    
    print(f"📍 Found <script> from line {script_start + 1} to {script_end + 1}")
    
    # Escape all ${...} in the script section
    # But skip lines that already have \\${
    fixed_count = 0
    for i in range(script_start + 1, script_end):
        original_line = lines[i]
        # Replace ${...} with \\${...} but avoid double-escaping
        # First, temporarily replace already-escaped ones
        temp_line = original_line.replace('\\${', '###ESCAPED###')
        # Then escape all remaining ${
        temp_line = temp_line.replace('${', '\\${')
        # Restore the already-escaped ones
        new_line = temp_line.replace('###ESCAPED###', '\\${')
        
        if new_line != original_line:
            lines[i] = new_line
            fixed_count += 1
            if fixed_count <= 5:  # Show first 5 changes
                print(f"  Line {i + 1}: {original_line.strip()[:60]}")
                print(f"       →  {new_line.strip()[:60]}")
    
    print(f"\n✅ Fixed {fixed_count} lines with template literal escaping")
    
    # Write back
    with open(file_path, 'w') as f:
        f.writelines(lines)
    
    print(f"💾 Saved changes to {file_path}")
    return True

if __name__ == '__main__':
    print("=" * 60)
    print("🔧 FIXING TEMPLATE LITERAL ISSUES")
    print("=" * 60)
    fix_template_literals()
