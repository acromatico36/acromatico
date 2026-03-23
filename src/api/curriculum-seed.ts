// Curriculum Database Seeder
// Populates the 12-month curriculum structure programmatically

export interface CurriculumModule {
  id: string
  quarter: number
  month_number: number
  month_name: string
  title: string
  subtitle: string
  description: string
  emoji: string
  theme_color: string
  adventure_title: string
  adventure_desc: string
  image_url: string | null
  sort_order: number
}

export interface CurriculumWeek {
  id: string
  module_id: string
  week_number: number
  week_type: string
  title: string
  subtitle: string
  emoji: string
  sort_order: number
}

export const CURRICULUM_MODULES: CurriculumModule[] = [
  // Q1: JANUARY
  {
    id: 'mod-jan',
    quarter: 1,
    month_number: 1,
    month_name: 'January',
    title: 'Visual Foundations',
    subtitle: 'Learning to See Like a Pro',
    description: 'Transform from snapshot-taker to visual storyteller. Master the Rule of Thirds, leading lines, and perspective magic.',
    emoji: '📷',
    theme_color: '#4794A6',
    adventure_title: 'My World, My Way',
    adventure_desc: 'Create a stunning portfolio showcasing your unique perspective.',
    image_url: '/static/images/curriculum/january-vintage-camera.jpg',
    sort_order: 1
  },
  // Q1: FEBRUARY
  {
    id: 'mod-feb',
    quarter: 1,
    month_number: 2,
    month_name: 'February',
    title: 'Light Mastery',
    subtitle: 'Becoming a Light Hunter',
    description: 'Transform into a light detective who understands how illumination creates mood and drama.',
    emoji: '💡',
    theme_color: '#FFD700',
    adventure_title: 'Chasing Light',
    adventure_desc: 'Build an epic collection showing your mastery of different lighting conditions.',
    image_url: '/static/images/curriculum/february-beach-boardwalk.jpg',
    sort_order: 2
  },
  // Q1: MARCH
  {
    id: 'mod-mar',
    quarter: 1,
    month_number: 3,
    month_name: 'March',
    title: 'Story Foundations',
    subtitle: 'Every Image Tells a Tale',
    description: 'Learn how the best photographers use sequences, emotion, and timing to craft visual narratives that resonate.',
    emoji: '📖',
    theme_color: '#9333EA',
    adventure_title: 'My Epic Story',
    adventure_desc: 'Create a multi-part photo series that takes viewers on an unforgettable journey.',
    image_url: '/static/images/curriculum/march-mountain-photographer.jpg',
    sort_order: 3
  },
  // Q2: APRIL
  {
    id: 'mod-apr',
    quarter: 2,
    month_number: 4,
    month_name: 'April',
    title: 'Portrait Power',
    subtitle: 'Capturing People & Personality',
    description: 'Discover how to photograph people in authentic, compelling ways that reveal character and emotion.',
    emoji: '👤',
    theme_color: '#EC4899',
    adventure_title: 'Faces & Stories',
    adventure_desc: 'Build a portrait collection that celebrates the people in your world.',
    image_url: '/static/images/curriculum/april-mom-child-beach.jpg',
    sort_order: 4
  },
  // Q2: MAY
  {
    id: 'mod-may',
    quarter: 2,
    month_number: 5,
    month_name: 'May',
    title: 'Urban Exploration',
    subtitle: 'City as Canvas',
    description: 'Transform urban environments into visual playgrounds. Learn architecture, street scenes, and cityscape secrets.',
    emoji: '🏙️',
    theme_color: '#14B8A6',
    adventure_title: 'Concrete Jungle',
    adventure_desc: 'Create a stunning urban portfolio that reveals the hidden beauty of city life.',
    image_url: '/static/images/curriculum/may-chicago-skyline.jpg',
    sort_order: 5
  },
  // Q2: JUNE
  {
    id: 'mod-jun',
    quarter: 2,
    month_number: 6,
    month_name: 'June',
    title: 'Nature Immersion',
    subtitle: 'Wild World Photography',
    description: 'Venture into natural environments to capture landscapes, wildlife, and the raw beauty of the outdoors.',
    emoji: '🌲',
    theme_color: '#22C55E',
    adventure_title: 'Into the Wild',
    adventure_desc: 'Build a nature portfolio showcasing the incredible diversity of the natural world.',
    image_url: null,
    sort_order: 6
  },
  // Q3: JULY
  {
    id: 'mod-jul',
    quarter: 3,
    month_number: 7,
    month_name: 'July',
    title: 'Action & Motion',
    subtitle: 'Freezing the Moment',
    description: 'Master the art of capturing movement—sports, dance, action scenes that tell dynamic visual stories.',
    emoji: '⚡',
    theme_color: '#F59E0B',
    adventure_title: 'Motion Magic',
    adventure_desc: 'Create an action portfolio that captures energy, speed, and the thrill of movement.',
    image_url: null,
    sort_order: 7
  },
  // Q3: AUGUST
  {
    id: 'mod-aug',
    quarter: 3,
    month_number: 8,
    month_name: 'August',
    title: 'Color Theory',
    subtitle: 'Mastering Visual Harmony',
    description: 'Dive deep into how color creates mood, emotion, and impact in visual storytelling.',
    emoji: '🎨',
    theme_color: '#8B5CF6',
    adventure_title: 'Color Symphony',
    adventure_desc: 'Build a vibrant portfolio demonstrating your command of color relationships and visual impact.',
    image_url: null,
    sort_order: 8
  },
  // Q3: SEPTEMBER
  {
    id: 'mod-sep',
    quarter: 3,
    month_number: 9,
    month_name: 'September',
    title: 'Advanced Composition',
    subtitle: 'Breaking the Rules',
    description: 'Level up with advanced framing techniques, creative angles, and experimental approaches to visual design.',
    emoji: '🎬',
    theme_color: '#6366F1',
    adventure_title: 'Visual Rebel',
    adventure_desc: 'Create a portfolio that showcases your unique compositional voice and creative vision.',
    image_url: null,
    sort_order: 9
  },
  // Q4: OCTOBER
  {
    id: 'mod-oct',
    quarter: 4,
    month_number: 10,
    month_name: 'October',
    title: 'Video Storytelling',
    subtitle: 'From Stills to Motion',
    description: 'Transition into video creation with editing, sequencing, and cinematic storytelling techniques.',
    emoji: '🎥',
    theme_color: '#EF4444',
    adventure_title: 'Motion Pictures',
    adventure_desc: 'Create your first short film showcasing your unique visual storytelling abilities.',
    image_url: '/static/images/curriculum/october-video-editing.jpg',
    sort_order: 10
  },
  // Q4: NOVEMBER
  {
    id: 'mod-nov',
    quarter: 4,
    month_number: 11,
    month_name: 'November',
    title: 'Portfolio Building',
    subtitle: 'Showcasing Your Best Work',
    description: 'Learn how to curate, edit, and present your work like a professional creator.',
    emoji: '📸',
    theme_color: '#10B981',
    adventure_title: 'My Signature Collection',
    adventure_desc: 'Build a professional portfolio that opens doors and showcases your creative journey.',
    image_url: '/static/images/curriculum/november-portfolio-dashboard.jpg',
    sort_order: 11
  },
  // Q4: DECEMBER
  {
    id: 'mod-dec',
    quarter: 4,
    month_number: 12,
    month_name: 'December',
    title: 'Creator Summit',
    subtitle: 'Your Signature Project',
    description: 'Culminate your year with a major creative project that showcases everything you\'ve learned.',
    emoji: '🏆',
    theme_color: '#3B82F6',
    adventure_title: 'The Final Masterpiece',
    adventure_desc: 'Create your ultimate visual project—your signature statement as a young creator.',
    image_url: null,
    sort_order: 12
  }
]

// Weekly structure (same 4-week pattern for every month)
export function generateWeeks(moduleId: string, startSortOrder: number): CurriculumWeek[] {
  const monthNumber = parseInt(moduleId.split('-')[1].substring(0, 2)) // Not actually used, just for clarity
  const baseWeeks = [
    { week_number: 1, week_type: 'eye', title: 'The Eye', subtitle: 'Composition & Visual Design', emoji: '👁️' },
    { week_number: 2, week_type: 'light', title: 'The Light', subtitle: 'Timing & Atmosphere', emoji: '💡' },
    { week_number: 3, week_type: 'story', title: 'The Story', subtitle: 'Motion & Narrative', emoji: '📖' },
    { week_number: 4, week_type: 'share', title: 'The Share', subtitle: 'Editing & Presentation', emoji: '🎬' }
  ]
  
  return baseWeeks.map((week, index) => ({
    id: `week-${moduleId.split('-')[1]}-${week.week_number}`,
    module_id: moduleId,
    week_number: week.week_number,
    week_type: week.week_type,
    title: week.title,
    subtitle: week.subtitle,
    emoji: week.emoji,
    sort_order: startSortOrder + index
  }))
}

// Seed function for use in API routes
export async function seedCurriculum(db: D1Database): Promise<{ modules: number, weeks: number }> {
  let modulesInserted = 0
  let weeksInserted = 0

  // Insert all modules
  for (const module of CURRICULUM_MODULES) {
    const result = await db.prepare(`
      INSERT OR IGNORE INTO curriculum_modules 
      (id, quarter, month_number, month_name, title, subtitle, description, emoji, theme_color, adventure_title, adventure_desc, image_url, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      module.id,
      module.quarter,
      module.month_number,
      module.month_name,
      module.title,
      module.subtitle,
      module.description,
      module.emoji,
      module.theme_color,
      module.adventure_title,
      module.adventure_desc,
      module.image_url,
      module.sort_order
    ).run()
    
    if (result.success) modulesInserted++
  }

  // Insert all weeks (4 per module = 48 total)
  let sortOrder = 1
  for (const module of CURRICULUM_MODULES) {
    const weeks = generateWeeks(module.id, sortOrder)
    for (const week of weeks) {
      const result = await db.prepare(`
        INSERT OR IGNORE INTO curriculum_weeks 
        (id, module_id, week_number, week_type, title, subtitle, emoji, sort_order)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        week.id,
        week.module_id,
        week.week_number,
        week.week_type,
        week.title,
        week.subtitle,
        week.emoji,
        week.sort_order
      ).run()
      
      if (result.success) weeksInserted++
    }
    sortOrder += 4
  }

  return { modules: modulesInserted, weeks: weeksInserted }
}
