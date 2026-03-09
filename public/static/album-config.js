// Copy album config to public directory for client-side access
// This is a browser-compatible version
export const ALBUM_CONFIG = {
  sizes: [
    { id: '16x20', name: '16×20"', dimensions: '40×50cm', description: 'Majestic format for grand storytelling', basePrice: 3200, popular: false },
    { id: '14x14', name: '14×14"', dimensions: '35×35cm', description: 'Square format with dramatic presence', basePrice: 2800, popular: false },
    { id: '12x16', name: '12×16"', dimensions: '30×40cm', description: 'Classic landscape format', basePrice: 2400, popular: true },
    { id: '12x12', name: '12×12"', dimensions: '30×30cm', description: 'Popular square format', basePrice: 2200, popular: true },
    { id: '9.5x13', name: '9.5×13"', dimensions: '25×35cm', description: 'Compact yet elegant', basePrice: 1800, popular: false },
    { id: '8x12', name: '8×12"', dimensions: '20×30cm', description: 'Intimate and classic', basePrice: 1600, popular: false },
    { id: '8x8', name: '8×8"', dimensions: '20×20cm', description: 'Small square format', basePrice: 1500, popular: false }
  ],

  coverTypes: [
    { id: 'crystal-glance', name: 'Crystal Glance', description: 'Image printed on massive 1/4" polycarbonate with crystalline edges', features: ['Timeless & modern', '3D effect', 'Diamond-cut beveled edges', 'Impact resistant'], basePrice: 800, popular: true, image: 'crystal-glance.jpg' },
    { id: 'metal', name: 'Metal Cover', description: 'Customizable metal plate in gold or silver finish', features: ['High customization', 'Satin or polish finish', 'Direct printing', 'Premium look'], basePrice: 650, popular: true, image: 'metal.jpg' },
    { id: 'metal-paint', name: 'Metal Paint', description: 'Modern elegance with clean lines and engraving', features: ['Contemporary design', 'Name engraving', 'Rounded edges', 'Avant-garde'], basePrice: 600, popular: false, image: 'metal-paint.jpg' },
    { id: 'hardback', name: 'Hardback Cover', description: 'Classic customizable cover printed on photo paper', features: ['Timeless classic', 'Full customization', 'Photo paper laminated', 'Pictures & graphics'], basePrice: 0, popular: false, image: 'hardback.jpg' }
  ],

  materials: {
    leathers: [
      { id: 'sequoia-se4001', name: 'Sequoia Premium Leather SE4001', price: 200, texture: 'Full grain leather' },
      { id: 'toscana-leather', name: 'Toscana Full Grain Leather', price: 180, texture: 'Natural grain' },
      { id: 'nappa-leather', name: 'Nappa Soft Leather', price: 160, texture: 'Soft & smooth' },
      { id: 'vintage-leather', name: 'Vintage Distressed Leather', price: 160, texture: 'Aged look' },
      { id: 'saffiano-leather', name: 'Saffiano Texture Leather', price: 150, texture: 'Cross-hatch' },
      { id: 'pebbled-leather', name: 'Pebbled Leather', price: 140, texture: 'Textured grain' }
    ],
    leatherettes: [
      { id: 'eco-leather-white', name: 'Eco Leather - White', price: 80, texture: 'Smooth eco-friendly' },
      { id: 'eco-leather-black', name: 'Eco Leather - Black', price: 80, texture: 'Smooth eco-friendly' },
      { id: 'eco-leather-ivory', name: 'Eco Leather - Ivory', price: 80, texture: 'Smooth eco-friendly' },
      { id: 'eco-leather-gray', name: 'Eco Leather - Gray', price: 80, texture: 'Smooth eco-friendly' },
      { id: 'vegan-leather', name: 'Vegan Leather', price: 70, texture: 'Plant-based' }
    ],
    fabrics: [
      { id: 'linen-natural', name: 'Natural Linen', price: 60, texture: 'Organic weave' },
      { id: 'linen-white', name: 'White Linen', price: 60, texture: 'Clean & elegant' },
      { id: 'linen-gray', name: 'Gray Linen', price: 60, texture: 'Modern neutral' },
      { id: 'canvas-raw', name: 'Raw Canvas', price: 50, texture: 'Rustic texture' },
      { id: 'silk-fabric', name: 'Silk Fabric', price: 90, texture: 'Luxury soft' },
      { id: 'velvet-fabric', name: 'Velvet Fabric', price: 100, texture: 'Rich & plush' }
    ],
    woods: [
      { id: 'maple-wood', name: 'Maple Wood', price: 250, texture: 'Light natural wood' },
      { id: 'walnut-wood', name: 'Walnut Wood', price: 280, texture: 'Dark rich wood' },
      { id: 'oak-wood', name: 'Oak Wood', price: 260, texture: 'Classic grain' },
      { id: 'bamboo-wood', name: 'Bamboo', price: 220, texture: 'Sustainable' }
    ],
    metals: [
      { id: 'gold-satin', name: 'Gold Satin', price: 400, texture: 'Brushed finish' },
      { id: 'gold-polish', name: 'Gold Polish', price: 420, texture: 'Mirror finish' },
      { id: 'silver-satin', name: 'Silver Satin', price: 380, texture: 'Brushed finish' },
      { id: 'silver-polish', name: 'Silver Polish', price: 400, texture: 'Mirror finish' },
      { id: 'rose-gold', name: 'Rose Gold', price: 440, texture: 'Modern metallic' },
      { id: 'copper', name: 'Copper', price: 360, texture: 'Warm metallic' }
    ],
    other: [
      { id: 'acrylic-clear', name: 'Clear Acrylic', price: 300, texture: 'Transparent' },
      { id: 'pearl-white', name: 'Pearl White', price: 120, texture: 'Pearlescent' },
      { id: 'glitter-gold', name: 'Glitter Gold', price: 140, texture: 'Sparkle finish' },
      { id: 'glitter-silver', name: 'Glitter Silver', price: 140, texture: 'Sparkle finish' }
    ]
  },

  spineTypes: [
    { id: 'rounded', name: 'Rounded Spine', description: 'Classic rounded edge', price: 0, image: 'rounded.jpg' },
    { id: 'stitched-rounded', name: 'Stitched Rounded', description: 'Rounded with decorative stitching', price: 50, image: 'stitched-rounded.jpg' },
    { id: 'square', name: 'Square Spine', description: 'Modern square edge', price: 0, image: 'square.jpg' },
    { id: 'stitched-square', name: 'Stitched Square', description: 'Square with decorative stitching', price: 50, image: 'stitched-square.jpg' }
  ],

  paperTypes: [
    { id: 'fuji-deep-matte', name: 'Fuji Deep Matte', description: 'Premium archival paper with velvety finish', features: ['True color reproduction', 'No glare', 'Museum quality', 'Most popular'], price: 0, popular: true },
    { id: 'fuji-glossy', name: 'Fuji Crystal Archive Glossy', description: 'Brilliant colors with high shine', features: ['Vibrant colors', 'High contrast', 'Classic look'], price: 0, popular: false },
    { id: 'metallic', name: 'Fuji Pearl Metallic', description: 'Pearlescent finish with subtle shimmer', features: ['3D depth effect', 'Unique look', 'Premium feel'], price: 100, popular: false }
  ],

  pageThickness: [
    { id: 'thin', name: 'Thin Flexible', description: 'Fresh & contemporary feel', price: 0 },
    { id: 'thick', name: 'Thick', description: 'Adds 300gr substrate, heavier feel', price: 150 },
    { id: 'rigid', name: 'Rigid', description: 'Massive, linear, ultra-premium', price: 300 }
  ],

  lamination: [
    { id: 'none', name: 'No Lamination', description: 'Natural paper finish', price: 0 },
    { id: 'glossy', name: 'Glossy Lamination', description: 'Protection with shine', price: 80 },
    { id: 'matte', name: 'Matte Lamination', description: 'Protection without glare', price: 80 },
    { id: 'scratch-resistant', name: 'Scratch-Resistant Matte', description: 'Maximum protection, no fingerprints', price: 120 }
  ],

  linings: [
    { id: 'black-board', name: 'Classic Black Board', description: 'Timeless elegant', price: 0, color: '#000000' },
    { id: 'ivory-matte', name: 'Ivory Matte', description: 'Soft neutral', price: 30, color: '#F5F5DC' },
    { id: 'silver-brilliant', name: 'Silver Brilliant', description: 'Metallic shine', price: 50, color: '#C0C0C0' },
    { id: 'gold-brilliant', name: 'Gold Brilliant', description: 'Luxury metallic', price: 60, color: '#FFD700' },
    { id: 'navy-blue', name: 'Navy Blue', description: 'Deep elegant', price: 40, color: '#000080' },
    { id: 'burgundy', name: 'Burgundy', description: 'Rich wine tone', price: 40, color: '#800020' },
    { id: 'forest-green', name: 'Forest Green', description: 'Natural deep', price: 40, color: '#228B22' }
  ],

  addons: {
    parentBooks: [
      { id: 'parent-8x12', name: 'Parent Book 8×12"', description: 'Flush mount copy for parents', price: 800, sizes: ['8x12', '8x8'] },
      { id: 'parent-6x8', name: 'Parent Book 6×8"', description: 'Smaller flush mount copy', price: 600, sizes: ['6x8', '6x6'] }
    ],
    pocketBooks: [
      { id: 'pocket-4x5', name: 'Pocket Book 4×5"', description: 'Perfect bound mini album', price: 150, sizes: ['4x5', '4x4'] },
      { id: 'pocket-2.5x4', name: 'Pocket Book 2.5×4"', description: 'Ultra-compact keepsake', price: 100, sizes: ['2.5x4', '2x2.5'] }
    ],
    extras: [
      { id: 'block-side-color', name: 'Block Side Color Printing', description: 'Custom color on page edges', price: 100 },
      { id: 'debossing', name: 'Cover Debossing', description: 'Embossed names/text', price: 80 },
      { id: 'foil-stamping', name: 'Foil Stamping', description: 'Gold/silver foil text', price: 120 },
      { id: 'presentation-box', name: 'Presentation Box', description: 'Luxury storage box', price: 250 }
    ]
  }
}

export const PAGE_COUNTS = [
  { pages: 20, price: 0, label: '20 pages (40 sides)' },
  { pages: 30, price: 150, label: '30 pages (60 sides)' },
  { pages: 40, price: 300, label: '40 pages (80 sides)' },
  { pages: 50, price: 450, label: '50 pages (100 sides)' },
  { pages: 60, price: 600, label: '60 pages (120 sides)' },
  { pages: 80, price: 900, label: '80 pages (160 sides)' },
  { pages: 100, price: 1200, label: '100 pages (200 sides)' }
]

export const SHIPPING_OPTIONS = [
  { id: 'standard', name: 'Standard Shipping', duration: '4-6 weeks', price: 0 },
  { id: 'expedited', name: 'Expedited Shipping', duration: '2-3 weeks', price: 150 },
  { id: 'rush', name: 'Rush Production + Shipping', duration: '1-2 weeks', price: 400 }
]

export function calculatePrice(config) {
  let total = 0
  
  const size = ALBUM_CONFIG.sizes.find(s => s.id === config.size)
  if (size) total += size.basePrice
  
  const coverType = ALBUM_CONFIG.coverTypes.find(c => c.id === config.coverType)
  if (coverType) total += coverType.basePrice
  
  if (config.material) {
    for (const category in ALBUM_CONFIG.materials) {
      const material = ALBUM_CONFIG.materials[category].find(m => m.id === config.material)
      if (material) {
        total += material.price
        break
      }
    }
  }
  
  const spine = ALBUM_CONFIG.spineTypes.find(s => s.id === config.spineType)
  if (spine) total += spine.price
  
  const paper = ALBUM_CONFIG.paperTypes.find(p => p.id === config.paperType)
  if (paper) total += paper.price
  
  const thickness = ALBUM_CONFIG.pageThickness.find(t => t.id === config.pageThickness)
  if (thickness) total += thickness.price
  
  const lamination = ALBUM_CONFIG.lamination.find(l => l.id === config.lamination)
  if (lamination) total += lamination.price
  
  const lining = ALBUM_CONFIG.linings.find(l => l.id === config.lining)
  if (lining) total += lining.price
  
  const pageCount = PAGE_COUNTS.find(p => p.pages === config.pageCount)
  if (pageCount) total += pageCount.price
  
  if (config.addons && config.addons.length > 0) {
    config.addons.forEach(addonId => {
      const parentBook = ALBUM_CONFIG.addons.parentBooks.find(a => a.id === addonId)
      if (parentBook) total += parentBook.price
      
      const pocketBook = ALBUM_CONFIG.addons.pocketBooks.find(a => a.id === addonId)
      if (pocketBook) total += pocketBook.price
      
      const extra = ALBUM_CONFIG.addons.extras.find(a => a.id === addonId)
      if (extra) total += extra.price
    })
  }
  
  const shipping = SHIPPING_OPTIONS.find(s => s.id === config.shipping)
  if (shipping) total += shipping.price
  
  return total
}
