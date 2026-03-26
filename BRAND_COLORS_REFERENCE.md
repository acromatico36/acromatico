# 🎨 ACROMATICO BRAND COLORS - QUICK REFERENCE

## Primary Brand Color

### **Acromatico Teal**
```
Hex: #4794A6
RGB: rgb(71, 148, 166)
HSL: hsl(191, 40%, 46%)
```

**Usage:**
- Primary buttons
- Active states
- Accent colors
- Icon highlights
- Border accents
- Logo color

**Hover State:**
```
Hex: #5aa5b8
RGB: rgb(90, 165, 184)
HSL: hsl(192, 41%, 54%)
```

---

## Background Colors

### **Dark Slate (Body)**
```
Hex: #0f172a
Tailwind: slate-900
RGB: rgb(15, 23, 42)
```

### **Surface (Cards)**
```
Hex: #1e293b
Tailwind: slate-800
RGB: rgb(30, 41, 59)
```

### **Darker Surface**
```
Hex: #334155
Tailwind: slate-700
RGB: rgb(51, 65, 85)
```

---

## Text Colors

### **Primary Text (Headings)**
```
Hex: #ffffff
Tailwind: text-white
RGB: rgb(255, 255, 255)
```

### **Secondary Text (Labels)**
```
Hex: #cbd5e1
Tailwind: text-slate-300
RGB: rgb(203, 213, 225)
```

### **Tertiary Text (Descriptions)**
```
Hex: #94a3b8
Tailwind: text-slate-400
RGB: rgb(148, 163, 184)
```

---

## Accent Colors (Special Use)

### **Teal Light (Backgrounds)**
```
RGBA: rgba(71, 148, 166, 0.1)
Usage: Icon backgrounds, subtle accents
```

### **Teal Border**
```
RGBA: rgba(71, 148, 166, 0.2)
Usage: Card borders, dividers
```

### **Teal Shadow**
```
RGBA: rgba(71, 148, 166, 0.39)
Usage: Button shadows, elevation effects
```

---

## CSS Variables (Copy/Paste)

```css
:root {
    --acro-primary: #4794A6;
    --acro-primary-hover: #5aa5b8;
    --acro-primary-light: rgba(71, 148, 166, 0.1);
    --acro-dark: #0f172a;
    --acro-surface: #1e293b;
    --acro-border: rgba(71, 148, 166, 0.2);
    --acro-shadow: rgba(71, 148, 166, 0.39);
}
```

---

## Tailwind Classes Reference

### **Backgrounds**
```css
bg-slate-900    /* Body background */
bg-slate-800    /* Card backgrounds */
bg-slate-700    /* Secondary elements */
```

### **Text**
```css
text-white      /* Primary headings */
text-slate-300  /* Secondary text */
text-slate-400  /* Tertiary text */
```

### **Borders**
```css
border-slate-700  /* Card borders */
```

### **Custom Teal (Use inline styles)**
```html
style="color: var(--acro-primary);"
style="background: var(--acro-primary);"
style="border-color: var(--acro-primary);"
```

---

## Component Examples

### **Button (Primary)**
```html
<button style="
    background: var(--acro-primary);
    color: white;
    box-shadow: 0 4px 14px 0 rgba(71, 148, 166, 0.39);
    transition: all 0.3s ease;
">
    Button Text
</button>
```

### **Card**
```html
<div class="bg-slate-800 border border-slate-700 rounded-xl p-6">
    <h3 class="text-white font-semibold mb-2">Card Title</h3>
    <p class="text-slate-400">Card description text</p>
</div>
```

### **Icon Badge**
```html
<div style="
    background: var(--acro-primary-light);
    border-radius: 50%;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
">
    <i class="fas fa-star" style="color: var(--acro-primary);"></i>
</div>
```

---

## Typography

### **Font Family**
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### **Google Fonts Import**
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

### **Font Weights**
- 300: Light
- 400: Regular
- 500: Medium
- 600: Semi-Bold
- 700: Bold
- 800: Extra-Bold

---

## Logo Files

### **White Logo (Dark Backgrounds)**
```
/static/acromatico-logo-white.png
```
**Use for:** Navigation bars, dark cards, hero sections

### **Standard Logo**
```
/static/acromatico-logo.png
```
**Use for:** Light backgrounds (if needed)

### **Dark Logo**
```
/static/acromatico-logo-dark.png
```
**Use for:** White/light backgrounds

---

## Status Colors (Preserved)

### **Success/Healthy**
```
Hex: #10b981
Tailwind: green-500
```

### **Warning**
```
Hex: #f59e0b
Tailwind: amber-500
```

### **Error/Critical**
```
Hex: #ef4444
Tailwind: red-500
```

---

## Color Psychology

**Teal (#4794A6):**
- Represents: Creativity, Vision, Ocean, Photography
- Emotional: Calm, Professional, Trustworthy
- Industry: Premium Photography, Creative Arts
- Association: Water, Clarity, Perspective

**Dark Slate:**
- Represents: Sophistication, Premium Quality
- Emotional: Serious, Professional, Elegant
- Industry: High-End Services, Luxury Brands
- Association: Night Photography, Dark Room

---

## Accessibility

### **Contrast Ratios**
- Teal (#4794A6) on Slate-900 (#0f172a): **4.8:1** ✅ (AA)
- White (#ffffff) on Slate-800 (#1e293b): **14.5:1** ✅ (AAA)
- Slate-300 on Slate-900: **8.2:1** ✅ (AAA)

All color combinations meet WCAG AA standards for accessibility.

---

## Do's and Don'ts

### **✅ DO:**
- Use teal for primary actions and accents
- Use dark slate backgrounds consistently
- Maintain white text for headings
- Use glass-morphism effects sparingly
- Keep Inter font throughout

### **❌ DON'T:**
- Use blue or purple (generic SaaS colors)
- Use bright white backgrounds
- Mix fonts (stick to Inter)
- Overuse teal (use as accent, not primary)
- Use light gray text on light backgrounds

---

## Quick Color Picker

Copy these exact values:

```
Primary Teal:    #4794A6
Hover Teal:      #5aa5b8
Dark Slate:      #0f172a
Surface Slate:   #1e293b
Border Slate:    #334155
White Text:      #ffffff
Secondary Text:  #cbd5e1
Tertiary Text:   #94a3b8
```

---

**Last Updated:** March 26, 2026  
**Brand:** Acromatico Photography & Education  
**Designer:** Following established brand guidelines
