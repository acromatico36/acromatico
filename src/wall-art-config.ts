// Acromatico Wall Art Pricing Configuration
// Based on Graphistudio 2026 Price List
// Retail pricing includes 2-2.5x markup for healthy profit margins

export const WALL_ART_CONFIG = {
  // Canvas Pro - Cotton canvas with anti-glare finish, wooden panel
  canvas_pro: {
    name: 'Canvas Pro',
    description: 'Premium cotton canvas with exclusive anti-glare "Touch" finishing',
    features: [
      'Archival certified 12 color HD printing',
      'Cotton canvas with anti-glare finish',
      'Seamless wooden panel with 3D hanger',
      '2.3" or 1.2" thickness options',
      'Optional certificate on back'
    ],
    popular_sizes: [
      { size: '16x20', wholesale: 169, retail: 450, label: '16×20"' },
      { size: '20x30', wholesale: 261, retail: 650, label: '20×30" (Popular)' },
      { size: '24x36', wholesale: 342, retail: 850, label: '24×36"' },
      { size: '30x40', wholesale: 494, retail: 1200, label: '30×40"' }
    ]
  },

  // Metal Pro - ChromaLuxe aluminum with wooden panel
  metal_pro: {
    name: 'Metal Pro',
    description: 'ChromaLuxe® aluminum with dye sublimation printing',
    features: [
      'Highest quality ChromaLuxe® aluminum',
      'Dye sublimation - waterproof & anti-scratch',
      'Multiple finish options (Gloss, Matte, Satin)',
      'Seamless wooden panel with 3D hanger',
      '2.3" or 1.2" thickness options'
    ],
    popular_sizes: [
      { size: '16x20', wholesale: 169, retail: 450, label: '16×20"' },
      { size: '20x30', wholesale: 261, retail: 650, label: '20×30" (Popular)' },
      { size: '24x36', wholesale: 342, retail: 850, label: '24×36"' },
      { size: '30x40', wholesale: 494, retail: 1200, label: '30×40"' }
    ]
  },

  // Acrylic Pro - Ultra HD acrylic with wooden panel
  acrylic_pro: {
    name: 'Acrylic Pro',
    description: 'Highest quality acrylic with stunning HD visual effects',
    features: [
      'Glossy or Matte 1/8" thickness',
      'Ink jet printing with 12 fine art inks',
      'Vibrant colors & maximum definition',
      'Seamless wooden panel with 3D hanger',
      '2.3" or 1.2" thickness options'
    ],
    popular_sizes: [
      { size: '16x20', wholesale: 169, retail: 450, label: '16×20"' },
      { size: '20x30', wholesale: 261, retail: 650, label: '20×30" (Popular)' },
      { size: '24x36', wholesale: 342, retail: 850, label: '24×36"' },
      { size: '30x40', wholesale: 494, retail: 1200, label: '30×40"' }
    ]
  },

  // Metal Print - Lightweight ChromaLuxe aluminum (no panel)
  metal_print: {
    name: 'Metal Print',
    description: 'Lightweight ChromaLuxe® metal print with frame options',
    features: [
      'ChromaLuxe® aluminum - waterproof & anti-scratch',
      'Multiple finish options',
      'Light Frame or Floating Block options',
      '4 corner finishing styles',
      'Optional certificate on back'
    ],
    mounting_options: [
      { type: 'print', name: 'Print Only', add_cost: 0 },
      { type: 'light_frame', name: 'Light Frame', add_cost: 30 },
      { type: 'floating_block', name: 'Floating Block', add_cost: 40 }
    ],
    popular_sizes: [
      { size: '12x12', print_wholesale: 42, print_retail: 105, label: '12×12"' },
      { size: '16x20', print_wholesale: 55, print_retail: 145, label: '16×20"' },
      { size: '20x30', print_wholesale: 94, print_retail: 245, label: '20×30" (Popular)' },
      { size: '24x36', print_wholesale: 139, print_retail: 350, label: '24×36"' }
    ]
  },

  // Acrylic Print - Lightweight acrylic (no panel)
  acrylic_print: {
    name: 'Acrylic Print',
    description: 'Ultra-clear acrylic with anti-UV protection',
    features: [
      'Glossy or Matte finish',
      'Plotter printing on ultra-clear acrylic',
      'Anti-UV filter protection',
      'Light Frame or Floating Block options',
      'Optional certificate on back'
    ],
    mounting_options: [
      { type: 'print', name: 'Print Only', add_cost: 0 },
      { type: 'light_frame', name: 'Light Frame', add_cost: 30 },
      { type: 'floating_block', name: 'Floating Block', add_cost: 40 }
    ],
    popular_sizes: [
      { size: '12x12', print_wholesale: 42, print_retail: 105, label: '12×12"' },
      { size: '16x20', print_wholesale: 55, print_retail: 145, label: '16×20"' },
      { size: '20x30', print_wholesale: 94, print_retail: 245, label: '20×30" (Popular)' },
      { size: '24x36', print_wholesale: 139, print_retail: 350, label: '24×36"' }
    ]
  }
};

// Calculate retail price with profit margin
export function calculateWallArtPrice(wholesale: number, markup: number = 2.5): number {
  return Math.round(wholesale * markup);
}

// Get recommended retail price
export function getRetailPrice(product: string, size: string, mounting?: string): number {
  const config = WALL_ART_CONFIG[product as keyof typeof WALL_ART_CONFIG];
  if (!config) return 0;

  // For products with mounting options
  if ('mounting_options' in config && 'popular_sizes' in config) {
    const sizeData = config.popular_sizes.find((s: any) => s.size === size);
    if (!sizeData) return 0;

    let basePrice = sizeData.print_retail;
    
    // Add mounting cost if selected
    if (mounting && mounting !== 'print') {
      const mountOption = config.mounting_options.find((m: any) => m.type === mounting);
      if (mountOption) {
        basePrice += mountOption.add_cost;
      }
    }

    return basePrice;
  }

  // For standard products (Canvas Pro, Metal Pro, Acrylic Pro)
  if ('popular_sizes' in config) {
    const sizeData = config.popular_sizes.find((s: any) => s.size === size);
    return sizeData?.retail || 0;
  }

  return 0;
}
