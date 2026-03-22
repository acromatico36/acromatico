-- ACROMATICO EDUCATION - REAL COURSE DATA
-- Based on complete business plan curriculum

-- TIER 1: Visual Thinking Foundation (Ages 7-9)
INSERT INTO courses (title, description, thumbnail_url, tier, age_range, duration_weeks, price_monthly, category, instructor_name, total_classes, created_at) VALUES 
(
  'Visual Thinking Foundation',
  'Master the fundamentals of visual storytelling through light, composition, and creative expression. Learn how light creates emotion, composition tells stories, and your iPhone is a creative superpower. Create your first photo essay and join a community of young visual thinkers.',
  'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800',
  'Foundation',
  '7-9',
  8,
  99,
  'Photography',
  'Italo Campilii',
  24,
  CURRENT_TIMESTAMP
);

-- TIER 2: Digital Photography Mastery (Ages 10-12)
INSERT INTO courses (title, description, thumbnail_url, tier, age_range, duration_weeks, price_monthly, category, instructor_name, total_classes, created_at) VALUES 
(
  'Digital Photography Mastery',
  'Transform from beginner to professional photographer in 12 weeks. Master camera fundamentals, lighting design, posing & direction, post-processing with AI tools, video integration, and launch your photography business with real paying clients. Average students earn $1,500-$3,000 during this course through our curated job marketplace.',
  'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800',
  'Rising',
  '10-12',
  12,
  99,
  'Photography',
  'Italo Campilii',
  36,
  CURRENT_TIMESTAMP
);

-- TIER 3: Photography as Business (Ages 13-14)
INSERT INTO courses (title, description, thumbnail_url, tier, age_range, duration_weeks, price_monthly, category, instructor_name, total_classes, created_at) VALUES 
(
  'Photography as Business',
  'The complete business + mastery program for serious young photographers. Master advanced photography, cinematic video, AI workflow automation, pricing psychology, client acquisition, contracts, tax basics, and launch your brand or YouTube channel. Graduate with 5-10 active clients earning $500-$2,000/month and a professional portfolio that competes with 25-year-old freelancers.',
  'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800',
  'Leadership',
  '13-14',
  16,
  99,
  'Photography',
  'Italo Campilii',
  48,
  CURRENT_TIMESTAMP
);

-- FILMMAKING COURSES (Phase 2 - Q3 2026)
INSERT INTO courses (title, description, thumbnail_url, tier, age_range, duration_weeks, price_monthly, category, instructor_name, total_classes, created_at) VALUES 
(
  'Intro to Filmmaking',
  'Create stunning micro-content and short-form video on mobile. Master storytelling fundamentals, mobile cinematography, social media video strategy, and create your first 5-video series for TikTok/Instagram Reels. Perfect for aspiring creators aged 10-12.',
  'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800',
  'Rising',
  '10-12',
  8,
  99,
  'Filmmaking',
  'Miguel Santos',
  24,
  CURRENT_TIMESTAMP
);

INSERT INTO courses (title, description, thumbnail_url, tier, age_range, duration_weeks, price_monthly, category, instructor_name, total_classes, created_at) VALUES 
(
  'Advanced Filmmaking & Content Creation',
  'Master cinematic techniques, lighting, sound design, and storytelling for both short-form and long-form content. Learn AI video tools (Descript, Synthesia, RunwayML) and launch your YouTube channel or create your first documentary. Turn your passion for video into a profitable skill.',
  'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800',
  'Leadership',
  '13-14',
  12,
  99,
  'Filmmaking',
  'Miguel Santos',
  36,
  CURRENT_TIMESTAMP
);

-- BRAND & WEB DEVELOPMENT (Phase 3 - Q1 2027)
INSERT INTO courses (title, description, thumbnail_url, tier, age_range, duration_weeks, price_monthly, category, instructor_name, total_classes, created_at) VALUES 
(
  'Visual Branding Fundamentals',
  'Design beautiful, professional brand identities from scratch. Master color theory, typography, logo design, and complete brand identity development. Create a brand identity for your own business and understand why great design drives business success.',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
  'Rising',
  '10-12',
  8,
  99,
  'Design',
  'Elizabeth Chen',
  24,
  CURRENT_TIMESTAMP
);

INSERT INTO courses (title, description, thumbnail_url, tier, age_range, duration_weeks, price_monthly, category, instructor_name, total_classes, created_at) VALUES 
(
  'Web Development: No-Code Mastery',
  'Build professional websites without writing code. Master Webflow/Wix, design principles, user experience, and build 3 real websites for local businesses earning $500-$2,000 per client. Learn the skills that let you charge premium prices and work from anywhere.',
  'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800',
  'Leadership',
  '13-14',
  10,
  99,
  'Web Development',
  'Elizabeth Chen',
  30,
  CURRENT_TIMESTAMP
);

-- SaaS BUILDING (Phase 4 - Q3 2027)
INSERT INTO courses (title, description, thumbnail_url, tier, age_range, duration_weeks, price_monthly, category, instructor_name, total_classes, created_at) VALUES 
(
  'Creator to Founder: Build Your SaaS',
  'Turn your creator skills into a software business. Master AI + no-code tools (Zapier, Airtable, Make, FlutterFlow), learn how creators build audience → product → revenue, and launch your first SaaS. Example: Build a "Batch Photo Editor" and sell to photography students for $20/month. Ages 14-18.',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
  'Leadership',
  '14-18',
  12,
  149,
  'Business & Tech',
  'John Martinez',
  36,
  CURRENT_TIMESTAMP
);
