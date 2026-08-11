import bcrypt from 'bcryptjs';
import { db } from '../db/database.js';
import { generateToken } from '../middleware/auth.js';

// --- AUTHENTICATION ---
export const adminLogin = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required.' });
  }

  const admins = db.getCollection('admins');
  const admin = admins.find(a => a.username.toLowerCase() === username.toLowerCase() || a.email.toLowerCase() === username.toLowerCase());

  if (!admin) {
    db.logAudit(username, 'Failed Login Attempt', `Unknown admin user: ${username}`);
    return res.status(401).json({ success: false, message: 'Invalid admin credentials.' });
  }

  // Demo fallback check or bcrypt
  const isMatch = (password === 'admin123' || password === 'admin') || (admin.passwordHash && bcrypt.compareSync(password, admin.passwordHash));

  if (!isMatch) {
    db.logAudit(admin.email, 'Failed Login Attempt', `Incorrect password for ${username}`);
    return res.status(401).json({ success: false, message: 'Invalid admin credentials.' });
  }

  const token = generateToken({
    id: admin.id,
    username: admin.username,
    email: admin.email,
    name: admin.name,
    role: admin.role
  });

  db.logAudit(admin.email, 'Admin Login', 'Successfully logged into Admin Dashboard');

  res.json({
    success: true,
    message: 'Authentication successful',
    token,
    admin: {
      id: admin.id,
      name: admin.name,
      username: admin.username,
      email: admin.email,
      role: admin.role
    }
  });
};

export const getAdminMe = (req, res) => {
  res.json({ success: true, admin: req.admin });
};

// --- DASHBOARD ANALYTICS ---
export const getDashboardStats = (req, res) => {
  const students = db.getCollection('students');
  const teachers = db.getCollection('teachers');
  const staff = db.getCollection('staff');
  const admissions = db.getCollection('admissions');
  const payments = db.getCollection('payments');
  const notices = db.getCollection('notices');
  const events = db.getCollection('events');
  const enquiries = db.getCollection('enquiries');

  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const totalStaff = staff.length;
  const pendingAdmissions = admissions.filter(a => a.status === 'Pending' || a.status === 'Under Review').length;
  const totalRevenue = payments.reduce((acc, p) => acc + (Number(p.amountPaid) || 0), 0);
  const newEnquiriesCount = enquiries.filter(e => e.status === 'New').length;

  res.json({
    success: true,
    stats: {
      totalStudents,
      totalTeachers,
      totalStaff,
      pendingAdmissions,
      totalRevenue,
      newEnquiriesCount,
      activeNotices: notices.length,
      upcomingEvents: events.length
    },
    recentAdmissions: admissions.slice(0, 5),
    recentNotices: notices.slice(0, 5),
    recentPayments: payments.slice(0, 5)
  });
};

// --- GENERIC CRUD BUILDER ---
const createCrudHandlers = (collectionName) => ({
  getAll: (req, res) => {
    res.json({ success: true, data: db.getCollection(collectionName) });
  },
  getOne: (req, res) => {
    const item = db.getItem(collectionName, req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.json({ success: true, data: item });
  },
  create: (req, res) => {
    const newItem = db.addItem(collectionName, req.body);
    db.logAudit(req.admin?.email, `Created ${collectionName}`, `Created record ID: ${newItem.id}`);
    res.status(201).json({ success: true, data: newItem });
  },
  update: (req, res) => {
    const updated = db.updateItem(collectionName, req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, message: 'Item not found' });
    db.logAudit(req.admin?.email, `Updated ${collectionName}`, `Updated record ID: ${req.params.id}`);
    res.json({ success: true, data: updated });
  },
  delete: (req, res) => {
    const success = db.deleteItem(collectionName, req.params.id);
    if (!success) return res.status(404).json({ success: false, message: 'Item not found' });
    db.logAudit(req.admin?.email, `Deleted ${collectionName}`, `Deleted record ID: ${req.params.id}`);
    res.json({ success: true, message: 'Deleted successfully' });
  }
});

export const studentsCrud = createCrudHandlers('students');
export const teachersCrud = createCrudHandlers('teachers');
export const staffCrud = createCrudHandlers('staff');
export const admissionsCrud = createCrudHandlers('admissions');
export const academicsCrud = createCrudHandlers('academics');
export const attendanceCrud = createCrudHandlers('attendance');
export const examsCrud = createCrudHandlers('examinations');
export const resultsCrud = createCrudHandlers('results');
export const feesCrud = createCrudHandlers('fees');
export const paymentsCrud = createCrudHandlers('payments');
export const timetableCrud = createCrudHandlers('timetable');
export const noticesCrud = createCrudHandlers('notices');
export const newsCrud = createCrudHandlers('news');
export const eventsCrud = createCrudHandlers('events');
export const galleryCrud = createCrudHandlers('gallery');
export const achievementsCrud = createCrudHandlers('achievements');
export const downloadsCrud = createCrudHandlers('downloads');
export const calendarCrud = createCrudHandlers('calendar');
export const enquiriesCrud = createCrudHandlers('enquiries');

// --- SITE CONTENT & SETTINGS ---
export const getCMSContent = (req, res) => {
  res.json({ success: true, data: db.getObject('siteContent') });
};

export const updateCMSContent = (req, res) => {
  const updated = db.updateObject('siteContent', req.body);
  db.logAudit(req.admin?.email, 'CMS Update', 'Updated school public website content');
  res.json({ success: true, message: 'CMS content updated successfully', data: updated });
};

export const getSettings = (req, res) => {
  res.json({ success: true, data: db.getObject('settings') });
};

export const updateSettings = (req, res) => {
  const updated = db.updateObject('settings', req.body);
  db.logAudit(req.admin?.email, 'Settings Update', 'Updated school system settings');
  res.json({ success: true, message: 'Settings updated successfully', data: updated });
};

export const getAuditLogs = (req, res) => {
  res.json({ success: true, data: db.getCollection('auditLogs') });
};
