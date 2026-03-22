-- ACROMATICO EDUCATION - REAL COURSE DATA
-- Based on complete business plan curriculum

-- Clear existing data
DELETE FROM courses;

-- TIER 1: Visual Thinking Foundation (Ages 7-9)
INSERT INTO courses (title, slug, description, category, age_range, duration_weeks, thumbnail_url, price, is_published) VALUES 
(
  'Visual Thinking Foundation',
  'visual-thinking-foundation',
  'Master the fundamentals of visual storytelling through light, composition, and creative expression. Learn how light creates emotion, composition tells stories, and your iPhone is a creative superpower. Create your first photo essay and join a community of young visual thinkers. 8-week program with 24 cinema-quality video lessons + weekly live workshops.',
  'photography',
  '7-9',
  8,
  'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800',
  99,
  1
);

-- TIER 2: Digital Photography Mastery (Ages 10-12)
INSERT INTO courses (title, slug, description, category, age_range, duration_weeks, thumbnail_url, price, is_published) VALUES 
(
  'Digital Photography Mastery',
  'digital-photography-mastery',
  'Transform from beginner to professional photographer in 12 weeks. Master camera fundamentals, lighting design, posing & direction, post-processing with AI tools (Adobe Firefly, Lightroom), video integration for Reels/TikTok, and launch your photography business with real paying clients. Includes curated job marketplace access - average students earn $1,500-$3,000 during this course.',
  'photography',
  '10-12',
  12,
  'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800',
  99,
  1
);

-- TIER 3: Photography as Business (Ages 13-14)
INSERT INTO courses (title, slug, description, category, age_range, duration_weeks, thumbnail_url, price, is_published) VALUES 
(
  'Photography as Business',
  'photography-as-business',
  'The complete business + mastery program for serious young photographers. 16-week intensive covering advanced photography, cinematic video, AI workflow automation, pricing psychology, client acquisition, contracts, tax basics, and brand/YouTube launch. Graduate with 5-10 active clients earning $500-$2,000/month and a professional portfolio that competes with 25-year-old freelancers. This is where creators become founders.',
  'photography',
  '13-14',
  16,
  'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800',
  99,
  1
);

-- FILMMAKING: Intro (Ages 10-12)
INSERT INTO courses (title, slug, description, category, age_range, duration_weeks, thumbnail_url, price, is_published) VALUES 
(
  'Intro to Filmmaking',
  'intro-to-filmmaking',
  'Create stunning micro-content and short-form video on mobile. Master storytelling fundamentals, mobile cinematography, social media video strategy (TikTok/Reels), and create your first 5-video series that gets views and engagement. Perfect for aspiring creators aged 10-12. No fancy equipment needed - just your phone and creativity.',
  'filmmaking',
  '10-12',
  8,
  'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800',
  99,
  1
);

-- FILMMAKING: Advanced (Ages 13-14)
INSERT INTO courses (title, slug, description, category, age_range, duration_weeks, thumbnail_url, price, is_published) VALUES 
(
  'Advanced Filmmaking & Content Creation',
  'advanced-filmmaking-content-creation',
  'Master cinematic techniques, lighting, sound design, and storytelling for both short-form and long-form content. Learn AI video tools (Descript, Synthesia, RunwayML) to 10x your output, and launch your YouTube channel or create your first documentary. Turn your passion for video into a profitable skill that earns you $500-2,000/month by graduation.',
  'filmmaking',
  '13-14',
  12,
  'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800',
  99,
  1
);

-- BRAND DESIGN: Visual Branding (Ages 10-12)
INSERT INTO courses (title, slug, description, category, age_range, duration_weeks, thumbnail_url, price, is_published) VALUES 
(
  'Visual Branding Fundamentals',
  'visual-branding-fundamentals',
  'Design beautiful, professional brand identities from scratch. Master color theory, typography, logo design, and complete brand identity development using industry-standard tools. Create a brand identity for your own business and understand why great design drives business success. Perfect for creative minds who love visual storytelling.',
  'brand-design',
  '10-12',
  8,
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
  99,
  1
);

-- WEB DEVELOPMENT: No-Code (Ages 13-14)
INSERT INTO courses (title, slug, description, category, age_range, duration_weeks, thumbnail_url, price, is_published) VALUES 
(
  'Web Development: No-Code Mastery',
  'web-development-no-code-mastery',
  'Build professional websites without writing code. Master Webflow/Wix, design principles, user experience, and build 3 real websites for local businesses earning $500-$2,000 per client. Learn the skills that let you charge premium prices and work from anywhere. By week 10, you will have launched 3 client sites and earned your first $3,000+.',
  'web-dev',
  '13-14',
  10,
  'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800',
  99,
  1
);

-- SaaS BUILDING: Creator to Founder (Ages 14-18)
INSERT INTO courses (title, slug, description, category, age_range, duration_weeks, thumbnail_url, price, is_published) VALUES 
(
  'Creator to Founder: Build Your SaaS',
  'creator-to-founder-build-your-saas',
  'Turn your creator skills into a software business. Master AI + no-code tools (Zapier, Airtable, Make, FlutterFlow), learn how creators build audience → product → revenue, and launch your first SaaS product. Example: Build a "Batch Photo Editor" and sell to photography students for $20/month. This is the most advanced course - ages 14-18 only. By week 12, launch your MVP and get your first 10 paying customers.',
  'saas-building',
  '14-18',
  12,
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
  149,
  1
);
