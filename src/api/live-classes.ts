/**
 * LIVE CLASSES API - Complete Backend for Live Class Platform
 * This handles all course enrollment, scheduling, attendance, assignments, achievements
 */

import { Context } from 'hono'

// Helper: Verify JWT token (imported from main)
function verifyToken(token: string): any {
  try {
    const payload = JSON.parse(atob(token))
    if (payload.exp < Date.now()) {
      return null
    }
    return payload
  } catch {
    return null
  }
}

// ============================================================
// PARENT API - Managing Children & Enrollments
// ============================================================

// POST /api/students/add - Parent adds a child
export async function addStudent(c: Context) {
  try {
    const { DB_EDUCATION } = c.env
    const authHeader = c.req.header('Authorization')
    
    if (!authHeader?.startsWith('Bearer ')) {
      return c.json({ message: 'No token provided' }, 401)
    }
    
    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    
    if (!payload) {
      return c.json({ message: 'Invalid token' }, 401)
    }
    
    const { firstName, lastName, age, grade } = await c.req.json()
    
    if (!firstName || !lastName) {
      return c.json({ message: 'First and last name required' }, 400)
    }
    
    const result = await DB_EDUCATION.prepare(`
      INSERT INTO students (parent_id, first_name, last_name, age, grade, enrollment_status)
      VALUES (?, ?, ?, ?, ?, 'active')
    `).bind(payload.id, firstName, lastName, age || null, grade || null).run()
    
    return c.json({ 
      message: 'Student added successfully',
      studentId: result.meta.last_row_id
    }, 201)
    
  } catch (error: any) {
    console.error('Add student error:', error)
    return c.json({ message: 'Failed to add student: ' + error.message }, 500)
  }
}

// POST /api/enrollments/create - Enroll student in course
export async function createEnrollment(c: Context) {
  try {
    const { DB_EDUCATION } = c.env
    const authHeader = c.req.header('Authorization')
    
    if (!authHeader?.startsWith('Bearer ')) {
      return c.json({ message: 'No token provided' }, 401)
    }
    
    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    
    if (!payload) {
      return c.json({ message: 'Invalid token' }, 401)
    }
    
    const { studentId, courseId } = await c.req.json()
    
    if (!studentId || !courseId) {
      return c.json({ message: 'Student ID and Course ID required' }, 400)
    }
    
    // Verify parent owns this student
    const student = await DB_EDUCATION.prepare(
      'SELECT id FROM students WHERE id = ? AND parent_id = ?'
    ).bind(studentId, payload.id).first()
    
    if (!student) {
      return c.json({ message: 'Student not found or unauthorized' }, 403)
    }
    
    // Check if already enrolled
    const existing = await DB_EDUCATION.prepare(
      'SELECT id FROM enrollments WHERE student_id = ? AND course_id = ?'
    ).bind(studentId, courseId).first()
    
    if (existing) {
      return c.json({ message: 'Student already enrolled in this course' }, 400)
    }
    
    // Create enrollment
    const result = await DB_EDUCATION.prepare(`
      INSERT INTO enrollments (student_id, course_id, status, progress)
      VALUES (?, ?, 'active', 0)
    `).bind(studentId, courseId).run()
    
    // Auto-register for all upcoming live classes
    await DB_EDUCATION.prepare(`
      INSERT INTO class_attendance (live_class_id, student_id, status)
      SELECT id, ?, 'registered'
      FROM live_classes
      WHERE course_id = ? AND status = 'scheduled'
      AND datetime(scheduled_date || ' ' || scheduled_time) > datetime('now')
    `).bind(studentId, courseId).run()
    
    return c.json({ 
      message: 'Enrollment created successfully',
      enrollmentId: result.meta.last_row_id
    }, 201)
    
  } catch (error: any) {
    console.error('Create enrollment error:', error)
    return c.json({ message: 'Failed to create enrollment: ' + error.message }, 500)
  }
}

// GET /api/courses/browse - Browse available courses
export async function browseCourses(c: Context) {
  try {
    const { DB_EDUCATION } = c.env
    
    const courses = await DB_EDUCATION.prepare(`
      SELECT 
        c.id,
        c.title,
        c.description,
        c.category,
        c.thumbnail_url,
        c.price_monthly,
        COUNT(DISTINCT e.student_id) as enrolled_students,
        COUNT(DISTINCT lc.id) as total_classes
      FROM courses c
      LEFT JOIN enrollments e ON c.id = e.course_id AND e.status = 'active'
      LEFT JOIN live_classes lc ON c.id = lc.course_id
      WHERE c.status = 'active'
      GROUP BY c.id
      ORDER BY c.created_at DESC
    `).all()
    
    return c.json({ courses: courses?.results || [] })
    
  } catch (error: any) {
    console.error('Browse courses error:', error)
    return c.json({ message: 'Failed to load courses: ' + error.message }, 500)
  }
}

// ============================================================
// STUDENT API - Viewing Classes, Assignments, Progress
// ============================================================

// GET /api/classes/upcoming - Get upcoming live classes for student
export async function getUpcomingClasses(c: Context) {
  try {
    const { DB_EDUCATION } = c.env
    const authHeader = c.req.header('Authorization')
    
    if (!authHeader?.startsWith('Bearer ')) {
      return c.json({ message: 'No token provided' }, 401)
    }
    
    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    
    if (!payload) {
      return c.json({ message: 'Invalid token' }, 401)
    }
    
    // Get student ID for this user (if student role)
    let studentId
    if (payload.role === 'student') {
      // For now, assume user is directly a student (we'll enhance this later)
      const student = await DB_EDUCATION.prepare(
        'SELECT id FROM students WHERE parent_id = ? LIMIT 1'
      ).bind(payload.id).first()
      studentId = student?.id
    } else {
      // If parent, get first child
      const student = await DB_EDUCATION.prepare(
        'SELECT id FROM students WHERE parent_id = ? LIMIT 1'
      ).bind(payload.id).first()
      studentId = student?.id
    }
    
    if (!studentId) {
      return c.json({ classes: [] })
    }
    
    const classes = await DB_EDUCATION.prepare(`
      SELECT 
        lc.id,
        lc.class_number,
        lc.title,
        lc.description,
        lc.scheduled_date,
        lc.scheduled_time,
        lc.duration_minutes,
        lc.meeting_link,
        lc.meeting_password,
        lc.status,
        c.title as course_title,
        ca.status as attendance_status
      FROM live_classes lc
      INNER JOIN courses c ON lc.course_id = c.id
      INNER JOIN enrollments e ON c.id = e.course_id AND e.student_id = ?
      LEFT JOIN class_attendance ca ON lc.id = ca.live_class_id AND ca.student_id = ?
      WHERE lc.status IN ('scheduled', 'in_progress')
      AND datetime(lc.scheduled_date || ' ' || lc.scheduled_time) >= datetime('now')
      ORDER BY lc.scheduled_date ASC, lc.scheduled_time ASC
      LIMIT 50
    `).bind(studentId, studentId).all()
    
    return c.json({ classes: classes?.results || [] })
    
  } catch (error: any) {
    console.error('Get upcoming classes error:', error)
    return c.json({ message: 'Failed to load classes: ' + error.message }, 500)
  }
}

// GET /api/classes/completed - Get completed classes
export async function getCompletedClasses(c: Context) {
  try {
    const { DB_EDUCATION } = c.env
    const authHeader = c.req.header('Authorization')
    
    if (!authHeader?.startsWith('Bearer ')) {
      return c.json({ message: 'No token provided' }, 401)
    }
    
    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    
    if (!payload) {
      return c.json({ message: 'Invalid token' }, 401)
    }
    
    const student = await DB_EDUCATION.prepare(
      'SELECT id FROM students WHERE parent_id = ? LIMIT 1'
    ).bind(payload.id).first()
    
    if (!student) {
      return c.json({ classes: [] })
    }
    
    const classes = await DB_EDUCATION.prepare(`
      SELECT 
        lc.id,
        lc.class_number,
        lc.title,
        lc.scheduled_date,
        lc.scheduled_time,
        c.title as course_title,
        ca.status as attendance_status,
        ca.attendance_minutes
      FROM live_classes lc
      INNER JOIN courses c ON lc.course_id = c.id
      INNER JOIN enrollments e ON c.id = e.course_id AND e.student_id = ?
      LEFT JOIN class_attendance ca ON lc.id = ca.live_class_id AND ca.student_id = ?
      WHERE lc.status = 'completed'
      ORDER BY lc.scheduled_date DESC, lc.scheduled_time DESC
      LIMIT 100
    `).bind(student.id, student.id).all()
    
    return c.json({ classes: classes?.results || [] })
    
  } catch (error: any) {
    console.error('Get completed classes error:', error)
    return c.json({ message: 'Failed to load classes: ' + error.message }, 500)
  }
}

// GET /api/assignments/pending - Get pending assignments for student
export async function getPendingAssignments(c: Context) {
  try {
    const { DB_EDUCATION } = c.env
    const authHeader = c.req.header('Authorization')
    
    if (!authHeader?.startsWith('Bearer ')) {
      return c.json({ message: 'No token provided' }, 401)
    }
    
    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    
    if (!payload) {
      return c.json({ message: 'Invalid token' }, 401)
    }
    
    const student = await DB_EDUCATION.prepare(
      'SELECT id FROM students WHERE parent_id = ? LIMIT 1'
    ).bind(payload.id).first()
    
    if (!student) {
      return c.json({ assignments: [] })
    }
    
    const assignments = await DB_EDUCATION.prepare(`
      SELECT 
        ca.id,
        ca.title,
        ca.description,
        ca.due_date,
        ca.points_possible,
        ca.assignment_type,
        c.title as course_title,
        asub.id as submission_id,
        asub.status as submission_status,
        asub.grade
      FROM course_assignments ca
      INNER JOIN courses c ON ca.course_id = c.id
      INNER JOIN enrollments e ON c.id = e.course_id AND e.student_id = ?
      LEFT JOIN assignment_submissions asub ON ca.id = asub.assignment_id AND asub.student_id = ?
      WHERE asub.id IS NULL OR asub.status IN ('draft', 'submitted')
      ORDER BY ca.due_date ASC NULLS LAST
      LIMIT 50
    `).bind(student.id, student.id).all()
    
    return c.json({ assignments: assignments?.results || [] })
    
  } catch (error: any) {
    console.error('Get pending assignments error:', error)
    return c.json({ message: 'Failed to load assignments: ' + error.message }, 500)
  }
}

// POST /api/assignments/submit - Submit assignment
export async function submitAssignment(c: Context) {
  try {
    const { DB_EDUCATION } = c.env
    const authHeader = c.req.header('Authorization')
    
    if (!authHeader?.startsWith('Bearer ')) {
      return c.json({ message: 'No token provided' }, 401)
    }
    
    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    
    if (!payload) {
      return c.json({ message: 'Invalid token' }, 401)
    }
    
    const { assignmentId, submissionText, fileUrl } = await c.req.json()
    
    if (!assignmentId) {
      return c.json({ message: 'Assignment ID required' }, 400)
    }
    
    const student = await DB_EDUCATION.prepare(
      'SELECT id FROM students WHERE parent_id = ? LIMIT 1'
    ).bind(payload.id).first()
    
    if (!student) {
      return c.json({ message: 'Student not found' }, 404)
    }
    
    // Check if already submitted
    const existing = await DB_EDUCATION.prepare(
      'SELECT id FROM assignment_submissions WHERE assignment_id = ? AND student_id = ?'
    ).bind(assignmentId, student.id).first()
    
    if (existing) {
      // Update existing submission
      await DB_EDUCATION.prepare(`
        UPDATE assignment_submissions
        SET submission_text = ?, file_url = ?, submitted_at = datetime('now'), status = 'submitted'
        WHERE id = ?
      `).bind(submissionText || null, fileUrl || null, existing.id).run()
      
      return c.json({ message: 'Assignment updated successfully' })
    } else {
      // Create new submission
      await DB_EDUCATION.prepare(`
        INSERT INTO assignment_submissions (assignment_id, student_id, submission_text, file_url, status)
        VALUES (?, ?, ?, ?, 'submitted')
      `).bind(assignmentId, student.id, submissionText || null, fileUrl || null).run()
      
      return c.json({ message: 'Assignment submitted successfully' }, 201)
    }
    
  } catch (error: any) {
    console.error('Submit assignment error:', error)
    return c.json({ message: 'Failed to submit assignment: ' + error.message }, 500)
  }
}

// GET /api/achievements/student - Get student achievements
export async function getStudentAchievements(c: Context) {
  try {
    const { DB_EDUCATION } = c.env
    const authHeader = c.req.header('Authorization')
    
    if (!authHeader?.startsWith('Bearer ')) {
      return c.json({ message: 'No token provided' }, 401)
    }
    
    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    
    if (!payload) {
      return c.json({ message: 'Invalid token' }, 401)
    }
    
    const student = await DB_EDUCATION.prepare(
      'SELECT id FROM students WHERE parent_id = ? LIMIT 1'
    ).bind(payload.id).first()
    
    if (!student) {
      return c.json({ achievements: [] })
    }
    
    const achievements = await DB_EDUCATION.prepare(`
      SELECT 
        a.id,
        a.name,
        a.description,
        a.icon,
        sa.earned_at,
        CASE WHEN sa.id IS NOT NULL THEN 1 ELSE 0 END as earned
      FROM achievements a
      LEFT JOIN student_achievements sa ON a.id = sa.achievement_id AND sa.student_id = ?
      ORDER BY earned DESC, a.created_at ASC
    `).bind(student.id).all()
    
    return c.json({ achievements: achievements?.results || [] })
    
  } catch (error: any) {
    console.error('Get achievements error:', error)
    return c.json({ message: 'Failed to load achievements: ' + error.message }, 500)
  }
}

// ============================================================
// ADMIN API - Course & Class Management
// ============================================================

// POST /api/admin/courses/create - Create a course
export async function createCourse(c: Context) {
  try {
    const { DB_EDUCATION } = c.env
    const authHeader = c.req.header('Authorization')
    
    if (!authHeader?.startsWith('Bearer ')) {
      return c.json({ message: 'No token provided' }, 401)
    }
    
    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    
    if (!payload || payload.role !== 'admin') {
      return c.json({ message: 'Unauthorized' }, 403)
    }
    
    const { title, description, category, priceMonthly, thumbnailUrl } = await c.req.json()
    
    if (!title) {
      return c.json({ message: 'Title required' }, 400)
    }
    
    const result = await DB_EDUCATION.prepare(`
      INSERT INTO courses (title, description, category, price_monthly, thumbnail_url, status)
      VALUES (?, ?, ?, ?, ?, 'active')
    `).bind(title, description || null, category || null, priceMonthly || 49, thumbnailUrl || null).run()
    
    return c.json({ 
      message: 'Course created successfully',
      courseId: result.meta.last_row_id
    }, 201)
    
  } catch (error: any) {
    console.error('Create course error:', error)
    return c.json({ message: 'Failed to create course: ' + error.message }, 500)
  }
}

// POST /api/admin/classes/schedule - Schedule a live class
export async function scheduleClass(c: Context) {
  try {
    const { DB_EDUCATION } = c.env
    const authHeader = c.req.header('Authorization')
    
    if (!authHeader?.startsWith('Bearer ')) {
      return c.json({ message: 'No token provided' }, 401)
    }
    
    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    
    if (!payload || payload.role !== 'admin') {
      return c.json({ message: 'Unauthorized' }, 403)
    }
    
    const { courseId, classNumber, title, description, scheduledDate, scheduledTime, durationMinutes, meetingLink, meetingPassword } = await c.req.json()
    
    if (!courseId || !title || !scheduledDate || !scheduledTime) {
      return c.json({ message: 'Course ID, title, date, and time required' }, 400)
    }
    
    const result = await DB_EDUCATION.prepare(`
      INSERT INTO live_classes (course_id, class_number, title, description, scheduled_date, scheduled_time, duration_minutes, meeting_link, meeting_password, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'scheduled')
    `).bind(courseId, classNumber || 1, title, description || null, scheduledDate, scheduledTime, durationMinutes || 60, meetingLink || null, meetingPassword || null).run()
    
    return c.json({ 
      message: 'Class scheduled successfully',
      classId: result.meta.last_row_id
    }, 201)
    
  } catch (error: any) {
    console.error('Schedule class error:', error)
    return c.json({ message: 'Failed to schedule class: ' + error.message }, 500)
  }
}

// POST /api/admin/attendance/mark - Mark attendance for a class
export async function markAttendance(c: Context) {
  try {
    const { DB_EDUCATION } = c.env
    const authHeader = c.req.header('Authorization')
    
    if (!authHeader?.startsWith('Bearer ')) {
      return c.json({ message: 'No token provided' }, 401)
    }
    
    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    
    if (!payload || payload.role !== 'admin') {
      return c.json({ message: 'Unauthorized' }, 403)
    }
    
    const { liveClassId, studentId, status, attendanceMinutes } = await c.req.json()
    
    if (!liveClassId || !studentId || !status) {
      return c.json({ message: 'Class ID, student ID, and status required' }, 400)
    }
    
    await DB_EDUCATION.prepare(`
      INSERT INTO class_attendance (live_class_id, student_id, status, attendance_minutes, marked_by, marked_at)
      VALUES (?, ?, ?, ?, ?, datetime('now'))
      ON CONFLICT(live_class_id, student_id) 
      DO UPDATE SET status = ?, attendance_minutes = ?, marked_by = ?, marked_at = datetime('now')
    `).bind(liveClassId, studentId, status, attendanceMinutes || null, payload.id, status, attendanceMinutes || null, payload.id).run()
    
    return c.json({ message: 'Attendance marked successfully' })
    
  } catch (error: any) {
    console.error('Mark attendance error:', error)
    return c.json({ message: 'Failed to mark attendance: ' + error.message }, 500)
  }
}

// GET /api/students/my-students - Get all students for parent
export async function getMyStudents(c: Context) {
  try {
    const { DB_EDUCATION } = c.env
    const authHeader = c.req.header('Authorization')
    
    if (!authHeader?.startsWith('Bearer ')) {
      return c.json({ message: 'No token provided' }, 401)
    }
    
    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    
    if (!payload) {
      return c.json({ message: 'Invalid token' }, 401)
    }
    
    const students = await DB_EDUCATION.prepare(`
      SELECT 
        s.id,
        s.first_name,
        s.last_name,
        s.age,
        s.grade,
        s.enrollment_status,
        COUNT(DISTINCT e.course_id) as courses_enrolled,
        COUNT(DISTINCT ca.id) as classes_attended
      FROM students s
      LEFT JOIN enrollments e ON s.id = e.student_id AND e.status = 'active'
      LEFT JOIN class_attendance ca ON s.id = ca.student_id AND ca.status = 'present'
      WHERE s.parent_id = ?
      GROUP BY s.id
      ORDER BY s.created_at DESC
    `).bind(payload.id).all()
    
    return c.json({ students: students?.results || [] })
    
  } catch (error: any) {
    console.error('Get my students error:', error)
    return c.json({ message: 'Failed to load students: ' + error.message }, 500)
  }
}

// GET /api/enrollments/my-courses - Get enrolled courses for student
export async function getStudentCourses(c: Context) {
  try {
    const { DB_EDUCATION } = c.env
    const authHeader = c.req.header('Authorization')
    
    if (!authHeader?.startsWith('Bearer ')) {
      return c.json({ message: 'No token provided' }, 401)
    }
    
    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    
    if (!payload) {
      return c.json({ message: 'Invalid token' }, 401)
    }
    
    // Get student ID
    const student = await DB_EDUCATION.prepare(
      'SELECT id FROM students WHERE parent_id = ? LIMIT 1'
    ).bind(payload.id).first()
    
    if (!student) {
      return c.json({ courses: [] })
    }
    
    const courses = await DB_EDUCATION.prepare(`
      SELECT 
        c.id,
        c.title,
        c.description,
        c.category,
        c.thumbnail_url,
        e.progress,
        e.status,
        COUNT(DISTINCT lc.id) as total_classes,
        COUNT(DISTINCT ca.id) as attended_classes
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      LEFT JOIN live_classes lc ON c.id = lc.course_id
      LEFT JOIN class_attendance ca ON lc.id = ca.live_class_id AND ca.student_id = e.student_id AND ca.status = 'present'
      WHERE e.student_id = ?
      GROUP BY c.id
      ORDER BY e.enrolled_at DESC
    `).bind(student.id).all()
    
    return c.json({ courses: courses?.results || [] })
    
  } catch (error: any) {
    console.error('Get student courses error:', error)
    return c.json({ message: 'Failed to load courses: ' + error.message }, 500)
  }
}

// GET /api/assignments/my-assignments - Get assignments for student
export async function getStudentAssignments(c: Context) {
  try {
    const { DB_EDUCATION } = c.env
    const authHeader = c.req.header('Authorization')
    
    if (!authHeader?.startsWith('Bearer ')) {
      return c.json({ message: 'No token provided' }, 401)
    }
    
    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    
    if (!payload) {
      return c.json({ message: 'Invalid token' }, 401)
    }
    
    // Get student ID
    const student = await DB_EDUCATION.prepare(
      'SELECT id FROM students WHERE parent_id = ? LIMIT 1'
    ).bind(payload.id).first()
    
    if (!student) {
      return c.json({ assignments: [] })
    }
    
    const assignments = await DB_EDUCATION.prepare(`
      SELECT 
        a.id,
        a.title,
        a.description,
        a.due_date,
        a.points_possible,
        a.assignment_type,
        c.title as course_title,
        lc.title as class_title,
        s.submission_text,
        s.file_url,
        s.submitted_at,
        s.grade,
        s.feedback,
        s.status
      FROM course_assignments a
      JOIN courses c ON a.course_id = c.id
      LEFT JOIN live_classes lc ON a.live_class_id = lc.id
      JOIN enrollments e ON c.id = e.course_id AND e.student_id = ?
      LEFT JOIN assignment_submissions s ON a.id = s.assignment_id AND s.student_id = ?
      ORDER BY a.due_date DESC
    `).bind(student.id, student.id).all()
    
    return c.json({ assignments: assignments?.results || [] })
    
  } catch (error: any) {
    console.error('Get student assignments error:', error)
    return c.json({ message: 'Failed to load assignments: ' + error.message }, 500)
  }
}

// POST /api/admin/assignments/create - Create assignment
export async function createAssignment(c: Context) {
  try {
    const { DB_EDUCATION } = c.env
    const authHeader = c.req.header('Authorization')
    
    if (!authHeader?.startsWith('Bearer ')) {
      return c.json({ message: 'No token provided' }, 401)
    }
    
    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    
    if (!payload || payload.role !== 'admin') {
      return c.json({ message: 'Unauthorized' }, 403)
    }
    
    const { courseId, liveClassId, title, description, dueDate, pointsPossible, assignmentType } = await c.req.json()
    
    if (!courseId || !title) {
      return c.json({ message: 'Course ID and title required' }, 400)
    }
    
    const result = await DB_EDUCATION.prepare(`
      INSERT INTO course_assignments (course_id, live_class_id, title, description, due_date, points_possible, assignment_type)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(courseId, liveClassId || null, title, description || null, dueDate || null, pointsPossible || 100, assignmentType || 'homework').run()
    
    return c.json({ 
      message: 'Assignment created successfully',
      assignmentId: result.meta.last_row_id
    }, 201)
    
  } catch (error: any) {
    console.error('Create assignment error:', error)
    return c.json({ message: 'Failed to create assignment: ' + error.message }, 500)
  }
}

// POST /api/admin/assignments/grade - Grade assignment
export async function gradeAssignment(c: Context) {
  try {
    const { DB_EDUCATION } = c.env
    const authHeader = c.req.header('Authorization')
    
    if (!authHeader?.startsWith('Bearer ')) {
      return c.json({ message: 'No token provided' }, 401)
    }
    
    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    
    if (!payload || payload.role !== 'admin') {
      return c.json({ message: 'Unauthorized' }, 403)
    }
    
    const { submissionId, grade, feedback } = await c.req.json()
    
    if (!submissionId || grade === undefined) {
      return c.json({ message: 'Submission ID and grade required' }, 400)
    }
    
    await DB_EDUCATION.prepare(`
      UPDATE assignment_submissions
      SET grade = ?, feedback = ?, graded_by = ?, graded_at = datetime('now'), status = 'graded'
      WHERE id = ?
    `).bind(grade, feedback || null, payload.id, submissionId).run()
    
    return c.json({ message: 'Assignment graded successfully' })
    
  } catch (error: any) {
    console.error('Grade assignment error:', error)
    return c.json({ message: 'Failed to grade assignment: ' + error.message }, 500)
  }
}

// POST /api/admin/achievements/award - Award achievement to student
export async function awardAchievement(c: Context) {
  try {
    const { DB_EDUCATION } = c.env
    const authHeader = c.req.header('Authorization')
    
    if (!authHeader?.startsWith('Bearer ')) {
      return c.json({ message: 'No token provided' }, 401)
    }
    
    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    
    if (!payload || payload.role !== 'admin') {
      return c.json({ message: 'Unauthorized' }, 403)
    }
    
    const { studentId, achievementId } = await c.req.json()
    
    if (!studentId || !achievementId) {
      return c.json({ message: 'Student ID and achievement ID required' }, 400)
    }
    
    const result = await DB_EDUCATION.prepare(`
      INSERT INTO student_achievements (student_id, achievement_id, awarded_by)
      VALUES (?, ?, ?)
      ON CONFLICT(student_id, achievement_id) DO NOTHING
    `).bind(studentId, achievementId, payload.id).run()
    
    return c.json({ 
      message: 'Achievement awarded successfully',
      awardId: result.meta.last_row_id
    }, 201)
    
  } catch (error: any) {
    console.error('Award achievement error:', error)
    return c.json({ message: 'Failed to award achievement: ' + error.message }, 500)
  }
}

// POST /api/admin/notifications/send - Send notification to user
export async function sendNotification(c: Context) {
  try {
    const { DB_EDUCATION } = c.env
    const authHeader = c.req.header('Authorization')
    
    if (!authHeader?.startsWith('Bearer ')) {
      return c.json({ message: 'No token provided' }, 401)
    }
    
    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    
    if (!payload || payload.role !== 'admin') {
      return c.json({ message: 'Unauthorized' }, 403)
    }
    
    const { userId, studentId, type, title, message, link } = await c.req.json()
    
    if (!userId || !type || !title || !message) {
      return c.json({ message: 'User ID, type, title, and message required' }, 400)
    }
    
    const result = await DB_EDUCATION.prepare(`
      INSERT INTO notifications (user_id, student_id, type, title, message, link)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(userId, studentId || null, type, title, message, link || null).run()
    
    return c.json({ 
      message: 'Notification sent successfully',
      notificationId: result.meta.last_row_id
    }, 201)
    
  } catch (error: any) {
    console.error('Send notification error:', error)
    return c.json({ message: 'Failed to send notification: ' + error.message }, 500)
  }
}
