// Admin User Seeder - Creates default admin accounts

// Simple password hash function (same as in index.tsx)
function hashPassword(password: string): string {
  // Simple hash (in production, use bcrypt or similar)
  let hash = 0
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return hash.toString(36)
}

export interface AdminUser {
  email: string
  password: string
  firstName: string
  lastName: string
  role: 'admin' | 'parent' | 'student'
}

export const DEFAULT_ADMIN_USERS: AdminUser[] = [
  {
    email: 'italo@acromatico.com',
    password: 'admin123',
    firstName: 'Italo',
    lastName: 'Campilii',
    role: 'admin'
  }
]

export async function seedAdminUsers(db: D1Database): Promise<{ users: number }> {
  let usersCreated = 0

  for (const user of DEFAULT_ADMIN_USERS) {
    // Check if user already exists
    const existing = await db.prepare(
      'SELECT id FROM users WHERE email = ?'
    ).bind(user.email).first()

    if (existing) {
      console.log(`User ${user.email} already exists, skipping...`)
      continue
    }

    // Hash password
    const passwordHash = hashPassword(user.password)
    const userId = crypto.randomUUID().replace(/-/g, '')

    // Insert user
    const result = await db.prepare(`
      INSERT INTO users (id, email, password_hash, first_name, last_name, role, created_at)
      VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
    `).bind(
      userId,
      user.email,
      passwordHash,
      user.firstName,
      user.lastName,
      user.role
    ).run()

    if (result.success) {
      usersCreated++
      console.log(`✅ Created admin user: ${user.email}`)
    }
  }

  return { users: usersCreated }
}
