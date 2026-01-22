// Location/Venue Knowledge Base
const LOCATION_GUIDES = {
  'miami': {
    title: 'Miami Wedding Photography Guide',
    description: 'Miami offers stunning coastal backdrops, Art Deco architecture, and vibrant cultural scenes perfect for wedding photography.',
    bestSpots: ['South Beach', 'Vizcaya Museum', 'Fairchild Tropical Garden', 'Wynwood Walls', 'Brickell City Centre'],
    bestTimes: 'Golden hour (6:30-7:30 PM) offers soft, warm light perfect for romantic shots',
    tips: 'Miami\'s humidity can be intense - plan for hair/makeup touch-ups and consider indoor backup options'
  },
  'hudson valley': {
    title: 'Hudson Valley Wedding Photography Guide',
    description: 'The Hudson Valley provides rustic elegance with rolling hills, historic estates, and seasonal beauty.',
    bestSpots: ['Storm King Art Center', 'Mohonk Mountain House', 'Barn venues', 'Riverside locations'],
    bestTimes: 'Fall foliage (late September-October) and spring blooms (May-June) are peak seasons',
    tips: 'Weather can change quickly - have indoor backup plans and embrace natural lighting'
  },
  'nyc': {
    title: 'NYC Wedding Photography Guide',
    description: 'New York City offers iconic urban backdrops from Central Park to Brooklyn Bridge.',
    bestSpots: ['Central Park', 'Brooklyn Bridge', 'DUMBO', 'The High Line', 'Grand Central Terminal'],
    bestTimes: 'Early morning (6-8 AM) for empty streets, or golden hour for romantic city glow',
    tips: 'Permits required for some locations - plan ahead and arrive early to beat crowds'
  },
  'south florida': {
    title: 'South Florida Wedding Photography Guide',
    description: 'South Florida combines tropical beaches, luxury venues, and year-round sunshine.',
    bestSpots: ['Key Biscayne', 'Coconut Grove', 'Palm Beach estates', 'Fort Lauderdale waterfront'],
    bestTimes: 'Sunset ceremonies (6-7 PM) offer spectacular ocean backdrops',
    tips: 'Sun protection is essential - provide shade and hydration for guests'
  }
};

// Venue Type Knowledge
const VENUE_TYPES = {
  'barn': {
    style: 'Rustic Elegance',
    bestFor: 'Couples seeking authentic, laid-back charm with natural beauty',
    photoOps: ['String lights at dusk', 'Hay bale seating', 'Open field portraits', 'Wooden beam details'],
    considerations: 'Weather contingencies important - ensure heating/cooling available'
  },
  'beach': {
    style: 'Coastal Romance',
    bestFor: 'Intimate ceremonies with ocean views and sunset backdrops',
    photoOps: ['Barefoot beach walks', 'Sunset portraits', 'Ocean reflections', 'Driftwood details'],
    considerations: 'Wind can affect hair/decor - have backup styling products'
  },
  'garden': {
    style: 'Natural Beauty',
    bestFor: 'Spring and summer celebrations surrounded by blooms',
    photoOps: ['Flower-framed portraits', 'Garden pathways', 'Natural arbors', 'Seasonal blooms'],
    considerations: 'Seasonal availability varies - book early for peak bloom times'
  },
  'estate': {
    style: 'Luxury & Grandeur',
    bestFor: 'Formal celebrations in historic or upscale settings',
    photoOps: ['Grand staircases', 'Architectural details', 'Manicured grounds', 'Interior elegance'],
    considerations: 'Often have strict vendor requirements - review contracts carefully'
  }
};

// FAQ Templates
const FAQ_CATEGORIES = {
  wedding: [
    {
      q: 'How far in advance should we book our wedding photographer?',
      a: '12-18 months for peak season (May-October), 6-12 months for off-season. Popular dates book quickly.'
    },
    {
      q: 'What should we look for in a wedding photographer?',
      a: 'Style compatibility, experience at your venue type, strong portfolio, clear communication, and backup plans.'
    },
    {
      q: 'How long does it take to receive wedding photos?',
      a: 'Full galleries typically delivered within 4-8 weeks. Sneak peeks often available within days.'
    }
  ],
  engagement: [
    {
      q: 'When is the best time for engagement photos?',
      a: 'Golden hour (1 hour before sunset) provides the most flattering natural light. Spring and fall offer mild weather.'
    },
    {
      q: 'What should we wear for engagement photos?',
      a: 'Coordinated but not matching outfits. Solid colors photograph best. Bring layers for outfit changes.'
    },
    {
      q: 'Where are the best spots for engagement photos?',
      a: 'Locations meaningful to your relationship, scenic parks, urban settings, or beach/waterfront areas.'
    }
  ],
  location: [
    {
      q: 'Do you travel for destination weddings?',
      a: 'Yes! We shoot weddings worldwide. Travel fees may apply depending on location.'
    },
    {
      q: 'What is included in destination wedding packages?',
      a: 'Full day coverage, travel time, pre-wedding consultation, and complete edited gallery.'
    }
  ]
};

module.exports = {
  LOCATION_GUIDES,
  VENUE_TYPES,
  FAQ_CATEGORIES
};
