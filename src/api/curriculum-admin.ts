// Admin API for Curriculum Management
// Handles CRUD operations for modules, weeks, and lessons

export interface LessonPlaceholder {
  id: string
  module_id: string
  week_id: string
  lesson_type: 'welcome' | 'skill_lesson' | 'adventure_mission' | 'pdf_resource'
  title: string
  duration_min: number
  video_url: string | null
  pdf_url: string | null
  thumbnail_url: string | null
  description: string | null
  sort_order: number
  upload_status: 'awaiting' | 'uploaded' | 'processing'
}

// GET all modules with week counts
export async function getAllModules(db: D1Database) {
  const modules = await db.prepare(`
    SELECT 
      m.*,
      COUNT(w.id) as week_count
    FROM curriculum_modules m
    LEFT JOIN curriculum_weeks w ON m.id = w.module_id
    GROUP BY m.id
    ORDER BY m.sort_order
  `).all()
  
  return modules.results
}

// GET module with all weeks and lessons
export async function getModuleDetail(db: D1Database, moduleId: string) {
  // Get module
  const module = await db.prepare(`
    SELECT * FROM curriculum_modules WHERE id = ?
  `).bind(moduleId).first()
  
  if (!module) {
    throw new Error('Module not found')
  }
  
  // Get weeks
  const weeks = await db.prepare(`
    SELECT * FROM curriculum_weeks 
    WHERE module_id = ? 
    ORDER BY sort_order
  `).bind(moduleId).all()
  
  // Get lessons for each week
  const lessons = await db.prepare(`
    SELECT * FROM curriculum_lessons 
    WHERE module_id = ? 
    ORDER BY week_id, sort_order
  `).bind(moduleId).all()
  
  return {
    module,
    weeks: weeks.results,
    lessons: lessons.results
  }
}

// CREATE lesson placeholder
export async function createLessonPlaceholder(
  db: D1Database, 
  lesson: Omit<LessonPlaceholder, 'id'>
): Promise<string> {
  const id = `lesson-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  
  await db.prepare(`
    INSERT INTO curriculum_lessons 
    (id, module_id, week_id, lesson_type, title, duration_min, video_url, pdf_url, thumbnail_url, description, sort_order, upload_status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    id,
    lesson.module_id,
    lesson.week_id,
    lesson.lesson_type,
    lesson.title,
    lesson.duration_min,
    lesson.video_url,
    lesson.pdf_url,
    lesson.thumbnail_url,
    lesson.description,
    lesson.sort_order,
    lesson.upload_status
  ).run()
  
  return id
}

// UPDATE lesson (upload video/PDF)
export async function updateLesson(
  db: D1Database,
  lessonId: string,
  updates: Partial<LessonPlaceholder>
) {
  const fields: string[] = []
  const values: any[] = []
  
  if (updates.title !== undefined) {
    fields.push('title = ?')
    values.push(updates.title)
  }
  if (updates.video_url !== undefined) {
    fields.push('video_url = ?')
    values.push(updates.video_url)
  }
  if (updates.pdf_url !== undefined) {
    fields.push('pdf_url = ?')
    values.push(updates.pdf_url)
  }
  if (updates.thumbnail_url !== undefined) {
    fields.push('thumbnail_url = ?')
    values.push(updates.thumbnail_url)
  }
  if (updates.description !== undefined) {
    fields.push('description = ?')
    values.push(updates.description)
  }
  if (updates.duration_min !== undefined) {
    fields.push('duration_min = ?')
    values.push(updates.duration_min)
  }
  if (updates.upload_status !== undefined) {
    fields.push('upload_status = ?')
    values.push(updates.upload_status)
  }
  
  if (fields.length === 0) {
    throw new Error('No fields to update')
  }
  
  values.push(lessonId)
  
  await db.prepare(`
    UPDATE curriculum_lessons 
    SET ${fields.join(', ')}
    WHERE id = ?
  `).bind(...values).run()
}

// DELETE lesson
export async function deleteLesson(db: D1Database, lessonId: string) {
  await db.prepare(`
    DELETE FROM curriculum_lessons WHERE id = ?
  `).bind(lessonId).run()
}

// Get curriculum stats
export async function getCurriculumStats(db: D1Database) {
  const stats = await db.prepare(`
    SELECT 
      COUNT(DISTINCT m.id) as total_modules,
      COUNT(DISTINCT w.id) as total_weeks,
      COUNT(l.id) as total_lessons,
      SUM(CASE WHEN l.upload_status = 'uploaded' THEN 1 ELSE 0 END) as uploaded_lessons,
      SUM(CASE WHEN l.upload_status = 'awaiting' THEN 1 ELSE 0 END) as awaiting_lessons
    FROM curriculum_modules m
    LEFT JOIN curriculum_weeks w ON m.id = w.module_id
    LEFT JOIN curriculum_lessons l ON m.id = l.module_id
  `).first()
  
  return stats
}
