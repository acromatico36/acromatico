// Admin CRM - Complete Database Management System
const API_BASE = window.location.origin;
const token = localStorage.getItem('token');
let allStudentsData = [];
let allCoursesData = [];
let allClassesData = [];

if (!token) {
  window.location.href = '/education/login';
}

function logout() {
  localStorage.removeItem('token');
  window.location.href = '/education/login';
}

// Tab Navigation
function showTab(tabName) {
  // Hide all tabs
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
  // Remove active from all buttons
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  
  // Show selected tab
  document.getElementById(`${tabName}-tab`).classList.remove('hidden');
  // Add active to selected button
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

  // Load tab data
  if (tabName === 'overview') loadOverview();
  if (tabName === 'students') loadStudentsCRM();
  if (tabName === 'courses') loadCoursesCRM();
  if (tabName === 'classes') loadClassesCRM();
  if (tabName === 'revenue') loadRevenue();
}

// Initialize
async function init() {
  try {
    const res = await fetch(`${API_BASE}/api/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Auth failed');
    const data = await res.json();
    
    if (data.user.role !== 'admin') {
      alert('Access denied. Admin only.');
      window.location.href = '/education/login';
      return;
    }

    document.getElementById('adminName').textContent = data.user.first_name || data.user.email;
    await loadOverview();
  } catch (error) {
    console.error('Init error:', error);
    alert('Failed to initialize. Please login again.');
    window.location.href = '/education/login';
  }
}

// ============================================================
// OVERVIEW TAB
// ============================================================
async function loadOverview() {
  try {
    const res = await fetch(`${API_BASE}/api/dashboard/admin`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to load overview');
    const data = await res.json();

    document.getElementById('totalStudents').textContent = data.stats.totalStudents || 0;
    document.getElementById('activeCourses').textContent = data.stats.activeCourses || 0;
    document.getElementById('monthlyRevenue').textContent = `$${(data.stats.monthlyRevenue || 0).toLocaleString()}`;
    
    // Load upcoming classes count
    const classesRes = await fetch(`${API_BASE}/api/admin/classes/upcoming`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (classesRes.ok) {
      const classesData = await classesRes.json();
      document.getElementById('upcomingClasses').textContent = (classesData.classes || []).length;
    }

  } catch (error) {
    console.error('Load overview error:', error);
  }
}

// ============================================================
// STUDENTS CRM TAB
// ============================================================
async function loadStudentsCRM() {
  try {
    document.getElementById('studentsTableLoading').classList.remove('hidden');
    document.getElementById('studentsTableContent').classList.add('hidden');

    // Fetch all students with parent info
    const res = await fetch(`${API_BASE}/api/admin/students/all`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!res.ok) throw new Error('Failed to load students');
    const data = await res.json();
    allStudentsData = data.students || [];

    document.getElementById('studentsTableLoading').classList.add('hidden');
    document.getElementById('studentsTableContent').classList.remove('hidden');

    renderStudentsTable(allStudentsData);
  } catch (error) {
    console.error('Load students error:', error);
    document.getElementById('studentsTableLoading').innerHTML = '<p class="text-red-400">Failed to load students.</p>';
  }
}

function renderStudentsTable(students) {
  const tbody = document.getElementById('studentsTableBody');
  
  if (students.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" class="text-center py-8 text-gray-400 font-light">No students found.</td></tr>';
    return;
  }

  tbody.innerHTML = students.map(s => `
    <tr class="border-b border-white/5 hover:bg-white/5 transition">
      <td class="py-4 px-4 font-light">${s.first_name} ${s.last_name}</td>
      <td class="py-4 px-4 font-light text-gray-400">${s.age || '-'}</td>
      <td class="py-4 px-4 font-light text-gray-400">${s.grade || '-'}</td>
      <td class="py-4 px-4 font-light text-gray-400">${s.parent_email || 'N/A'}</td>
      <td class="py-4 px-4 font-light">
        <span class="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-full text-xs">
          ${s.courses_enrolled || 0} courses
        </span>
      </td>
      <td class="py-4 px-4">
        <span class="px-3 py-1 ${s.enrollment_status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'} rounded-full text-xs font-light">
          ${s.enrollment_status || 'active'}
        </span>
      </td>
      <td class="py-4 px-4 font-light text-gray-400 text-xs">${new Date(s.created_at).toLocaleDateString()}</td>
      <td class="py-4 px-4 text-right">
        <button onclick="viewStudent('${s.id}')" class="px-3 py-1 glass rounded hover:bg-white/10 transition text-xs font-light mr-2">
          <i class="fas fa-eye"></i>
        </button>
        <button onclick="editStudent('${s.id}')" class="px-3 py-1 glass rounded hover:bg-white/10 transition text-xs font-light">
          <i class="fas fa-edit"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

function filterStudents() {
  const search = document.getElementById('studentSearch').value.toLowerCase();
  const filtered = allStudentsData.filter(s => 
    s.first_name.toLowerCase().includes(search) ||
    s.last_name.toLowerCase().includes(search) ||
    (s.parent_email || '').toLowerCase().includes(search)
  );
  renderStudentsTable(filtered);
}

function exportStudentsCSV() {
  const csv = [
    ['Name', 'Age', 'Grade', 'Parent Email', 'Courses', 'Status', 'Enrolled Date'],
    ...allStudentsData.map(s => [
      `${s.first_name} ${s.last_name}`,
      s.age || '',
      s.grade || '',
      s.parent_email || '',
      s.courses_enrolled || 0,
      s.enrollment_status || 'active',
      new Date(s.created_at).toLocaleDateString()
    ])
  ].map(row => row.join(',')).join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `students_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
}

function viewStudent(id) {
  const student = allStudentsData.find(s => s.id === id);
  if (!student) return;
  
  alert(`Student Details:\n\nName: ${student.first_name} ${student.last_name}\nAge: ${student.age || 'N/A'}\nGrade: ${student.grade || 'N/A'}\nParent: ${student.parent_email || 'N/A'}\nCourses: ${student.courses_enrolled || 0}\nStatus: ${student.enrollment_status}`);
}

function editStudent(id) {
  alert('Edit functionality coming soon! This will open a modal to edit student details.');
}

// ============================================================
// COURSES CRM TAB
// ============================================================
async function loadCoursesCRM() {
  try {
    const res = await fetch(`${API_BASE}/api/courses/browse`);
    if (!res.ok) throw new Error('Failed');
    const data = await res.json();
    allCoursesData = data.courses || [];

    const grid = document.getElementById('coursesGrid');
    
    if (allCoursesData.length === 0) {
      grid.innerHTML = '<div class="col-span-full glass p-12 rounded-xl text-center"><p class="text-gray-400 font-light">No courses yet. Create your first one!</p></div>';
      return;
    }

    grid.innerHTML = allCoursesData.map(c => `
      <div class="glass p-6 rounded-xl hover:bg-white/10 transition">
        ${c.thumbnail_url ? `<img src="${c.thumbnail_url}" class="w-full h-40 object-cover rounded-lg mb-4">` : '<div class="w-full h-40 bg-gradient-to-br from-teal-500 to-purple-500 rounded-lg mb-4 flex items-center justify-center text-4xl">📚</div>'}
        <h4 class="text-lg font-normal mb-2">${c.title}</h4>
        <p class="text-sm text-gray-400 font-light mb-4">${c.description || 'No description'}</p>
        <div class="flex items-center justify-between text-sm mb-4">
          <span class="text-teal-400 font-light">$${c.price_monthly || 0}/mo</span>
          <span class="text-gray-400 font-light">${c.enrolled_students || 0} students</span>
        </div>
        <div class="flex items-center justify-between text-sm mb-4">
          <span class="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-light">${c.category || 'General'}</span>
          <span class="text-gray-400 font-light">${c.total_classes || 0} classes</span>
        </div>
        <div class="flex gap-2">
          <button onclick="editCourse('${c.id}')" class="flex-1 px-4 py-2 glass rounded-lg hover:bg-white/10 transition text-sm font-light">
            <i class="fas fa-edit mr-2"></i> Edit
          </button>
          <button onclick="showScheduleClassModal('${c.id}')" class="flex-1 btn-primary py-2 rounded-lg text-sm font-light">
            <i class="fas fa-calendar-plus mr-2"></i> Schedule
          </button>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Load courses error:', error);
  }
}

function editCourse(id) {
  alert('Edit course functionality coming soon!');
}

// ============================================================
// LIVE CLASSES TAB
// ============================================================
async function loadClassesCRM() {
  try {
    const res = await fetch(`${API_BASE}/api/admin/classes/all`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!res.ok) throw new Error('Failed to load classes');
    const data = await res.json();
    allClassesData = data.classes || [];

    const calendar = document.getElementById('classesCalendar');
    
    if (allClassesData.length === 0) {
      calendar.innerHTML = '<div class="glass p-12 rounded-xl text-center"><p class="text-gray-400 font-light">No classes scheduled yet.</p></div>';
      return;
    }

    calendar.innerHTML = allClassesData.map(cls => {
      const date = new Date(`${cls.scheduled_date}T${cls.scheduled_time}`);
      const isPast = date < new Date();
      
      return `
        <div class="glass p-6 rounded-xl hover:bg-white/10 transition ${isPast ? 'opacity-60' : ''}">
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-xs px-3 py-1 bg-teal-500/20 text-teal-400 rounded-full font-light">
                  ${cls.course_title || 'Course'}
                </span>
                ${isPast ? '<span class="text-xs px-3 py-1 bg-gray-500/20 text-gray-400 rounded-full font-light">Completed</span>' : '<span class="text-xs px-3 py-1 bg-green-500/20 text-green-400 rounded-full font-light">Upcoming</span>'}
              </div>
              <h4 class="text-lg font-normal mb-1">${cls.title}</h4>
              <p class="text-sm text-gray-400 font-light mb-3">${cls.description || 'No description'}</p>
              <div class="flex items-center gap-4 text-sm font-light">
                <span><i class="fas fa-calendar mr-2 text-gray-400"></i>${date.toLocaleDateString()}</span>
                <span><i class="fas fa-clock mr-2 text-gray-400"></i>${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                <span><i class="fas fa-hourglass mr-2 text-gray-400"></i>${cls.duration_minutes || 60} min</span>
              </div>
            </div>
            <div class="text-4xl">${isPast ? '✅' : '📹'}</div>
          </div>
          <div class="flex gap-2">
            ${cls.meeting_link ? `<a href="${cls.meeting_link}" target="_blank" class="px-4 py-2 glass rounded-lg hover:bg-white/10 transition text-sm font-light"><i class="fas fa-video mr-2"></i> Join Zoom</a>` : ''}
            <button onclick="editClass('${cls.id}')" class="px-4 py-2 glass rounded-lg hover:bg-white/10 transition text-sm font-light">
              <i class="fas fa-edit mr-2"></i> Edit
            </button>
            ${!isPast ? `<button onclick="cancelClass('${cls.id}')" class="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition text-sm font-light"><i class="fas fa-times mr-2"></i> Cancel</button>` : ''}
          </div>
        </div>
      `;
    }).join('');
  } catch (error) {
    console.error('Load classes error:', error);
    document.getElementById('classesCalendar').innerHTML = '<div class="glass p-12 rounded-xl text-center"><p class="text-red-400">Failed to load classes.</p></div>';
  }
}

function editClass(id) {
  alert('Edit class functionality coming soon!');
}

function cancelClass(id) {
  if (confirm('Are you sure you want to cancel this class?')) {
    alert('Cancel class functionality coming soon!');
  }
}

// ============================================================
// REVENUE TAB
// ============================================================
async function loadRevenue() {
  try {
    const res = await fetch(`${API_BASE}/api/admin/revenue/stats`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!res.ok) throw new Error('Failed to load revenue');
    const data = await res.json();

    document.getElementById('totalRevenue').textContent = `$${(data.totalRevenue || 0).toLocaleString()}`;
    document.getElementById('activeSubscriptions').textContent = data.activeSubscriptions || 0;
    document.getElementById('avgStudentValue').textContent = `$${(data.avgStudentValue || 0).toLocaleString()}`;

    const list = document.getElementById('subscriptionsList');
    if ((data.subscriptions || []).length === 0) {
      list.innerHTML = '<p class="text-gray-400 font-light">No subscriptions yet.</p>';
      return;
    }

    list.innerHTML = (data.subscriptions || []).map(sub => `
      <div class="flex items-center justify-between p-4 glass rounded-lg">
        <div>
          <p class="font-normal">${sub.parent_email || 'Parent'}</p>
          <p class="text-sm text-gray-400 font-light">${sub.num_students} student(s) • ${sub.billing_cycle}</p>
        </div>
        <div class="text-right">
          <p class="text-lg font-light text-teal-400">$${sub.monthly_price}</p>
          <p class="text-xs text-gray-400 font-light">${sub.status}</p>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Load revenue error:', error);
  }
}

// ============================================================
// DATABASE CONSOLE TAB
// ============================================================
let queryResultsData = [];

async function executeSQLQuery() {
  const query = document.getElementById('sqlQuery').value.trim();
  
  if (!query) {
    alert('Please enter a SQL query');
    return;
  }

  // Safety check for dangerous operations
  const dangerousKeywords = ['DELETE', 'DROP', 'TRUNCATE', 'ALTER'];
  const upperQuery = query.toUpperCase();
  const hasDanger = dangerousKeywords.some(kw => upperQuery.includes(kw));
  
  if (hasDanger && !confirm('⚠️ WARNING: This query contains potentially destructive operations. Are you sure you want to continue?')) {
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/api/admin/database/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ query })
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Query failed');
    }

    const data = await res.json();
    queryResultsData = data.results || [];

    document.getElementById('queryResults').classList.remove('hidden');
    
    const content = document.getElementById('queryResultsContent');
    
    if (queryResultsData.length === 0) {
      content.innerHTML = '<p class="text-gray-400 font-light">Query executed successfully. No results returned.</p>';
      return;
    }

    // Build table
    const keys = Object.keys(queryResultsData[0]);
    content.innerHTML = `
      <table class="w-full">
        <thead>
          <tr class="border-b border-white/10">
            ${keys.map(k => `<th class="text-left py-3 px-4 text-gray-400">${k}</th>`).join('')}
          </tr>
        </thead>
        <tbody class="text-sm">
          ${queryResultsData.map(row => `
            <tr class="border-b border-white/5 hover:bg-white/5">
              ${keys.map(k => `<td class="py-3 px-4 font-light">${row[k] ?? 'NULL'}</td>`).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
      <p class="mt-4 text-sm text-gray-400 font-light">${queryResultsData.length} row(s) returned</p>
    `;

  } catch (error) {
    console.error('SQL query error:', error);
    alert('Query failed: ' + error.message);
  }
}

function showQuickQueries() {
  const queries = [
    'SELECT * FROM students LIMIT 10',
    'SELECT * FROM courses',
    'SELECT * FROM live_classes ORDER BY scheduled_date DESC',
    'SELECT * FROM enrollments',
    'SELECT * FROM subscriptions',
    'SELECT COUNT(*) as total FROM students',
    'SELECT course_id, COUNT(*) as enrollments FROM enrollments GROUP BY course_id'
  ];
  
  const query = prompt('Quick Queries:\n\n' + queries.map((q, i) => `${i+1}. ${q}`).join('\n\n') + '\n\nEnter number (1-' + queries.length + '):');
  const index = parseInt(query) - 1;
  
  if (index >= 0 && index < queries.length) {
    document.getElementById('sqlQuery').value = queries[index];
  }
}

function exportQueryResults() {
  if (queryResultsData.length === 0) {
    alert('No results to export');
    return;
  }

  const keys = Object.keys(queryResultsData[0]);
  const csv = [
    keys.join(','),
    ...queryResultsData.map(row => keys.map(k => row[k] ?? '').join(','))
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `query_results_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
}

// ============================================================
// MODALS
// ============================================================
function showCreateCourseModal() {
  document.getElementById('createCourseModal').classList.add('active');
}

function closeCreateCourseModal() {
  document.getElementById('createCourseModal').classList.remove('active');
}

async function createCourse(e) {
  e.preventDefault();
  try {
    const res = await fetch(`${API_BASE}/api/admin/courses/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: document.getElementById('courseTitle').value,
        description: document.getElementById('courseDescription').value,
        category: document.getElementById('courseCategory').value,
        priceMonthly: parseFloat(document.getElementById('coursePrice').value) || 49,
        thumbnailUrl: document.getElementById('courseThumbnail').value || null
      })
    });

    if (!res.ok) throw new Error('Failed to create course');
    
    alert('Course created successfully! 🎉');
    closeCreateCourseModal();
    await loadCoursesCRM();
  } catch (error) {
    console.error('Create course error:', error);
    alert('Failed to create course: ' + error.message);
  }
}

function showScheduleClassModal(courseId = null) {
  const modal = document.getElementById('scheduleClassModal');
  const select = document.getElementById('classCourseId');
  
  // Populate course dropdown
  select.innerHTML = '<option value="">Choose a course...</option>' + 
    allCoursesData.map(c => `<option value="${c.id}"${courseId === c.id ? ' selected' : ''}>${c.title}</option>`).join('');
  
  modal.classList.add('active');
}

function closeScheduleClassModal() {
  document.getElementById('scheduleClassModal').classList.remove('active');
}

async function scheduleClass(e) {
  e.preventDefault();
  try {
    const res = await fetch(`${API_BASE}/api/admin/classes/schedule`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        courseId: document.getElementById('classCourseId').value,
        title: document.getElementById('classTitle').value,
        description: document.getElementById('classDescription').value,
        scheduledDate: document.getElementById('classDate').value,
        scheduledTime: document.getElementById('classTime').value,
        durationMinutes: parseInt(document.getElementById('classDuration').value) || 60,
        meetingLink: document.getElementById('classMeetingLink').value,
        meetingPassword: document.getElementById('classMeetingPassword').value || null
      })
    });

    if (!res.ok) throw new Error('Failed to schedule class');
    
    alert('Class scheduled successfully! 🎉 All enrolled students will see it!');
    closeScheduleClassModal();
    await loadClassesCRM();
  } catch (error) {
    console.error('Schedule class error:', error);
    alert('Failed to schedule class: ' + error.message);
  }
}

// Initialize
init();
