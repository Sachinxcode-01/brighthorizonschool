import express from 'express';
import { requireAdminAuth } from '../middleware/auth.js';
import {
  adminLogin,
  getAdminMe,
  getDashboardStats,
  studentsCrud,
  teachersCrud,
  staffCrud,
  admissionsCrud,
  academicsCrud,
  attendanceCrud,
  examsCrud,
  resultsCrud,
  feesCrud,
  paymentsCrud,
  timetableCrud,
  noticesCrud,
  newsCrud,
  eventsCrud,
  galleryCrud,
  achievementsCrud,
  downloadsCrud,
  calendarCrud,
  enquiriesCrud,
  getCMSContent,
  updateCMSContent,
  getSettings,
  updateSettings,
  getAuditLogs
} from '../controllers/adminController.js';

const router = express.Router();

// Public auth login
router.post('/auth/login', adminLogin);

// All routes below require Admin Authentication
router.use(requireAdminAuth);

router.get('/auth/me', getAdminMe);
router.get('/dashboard/stats', getDashboardStats);

const registerCrudRoutes = (path, crud) => {
  router.get(`/${path}`, crud.getAll);
  router.get(`/${path}/:id`, crud.getOne);
  router.post(`/${path}`, crud.create);
  router.put(`/${path}/:id`, crud.update);
  router.delete(`/${path}/:id`, crud.delete);
};

registerCrudRoutes('students', studentsCrud);
registerCrudRoutes('teachers', teachersCrud);
registerCrudRoutes('staff', staffCrud);
registerCrudRoutes('admissions', admissionsCrud);
registerCrudRoutes('academics', academicsCrud);
registerCrudRoutes('attendance', attendanceCrud);
registerCrudRoutes('examinations', examsCrud);
registerCrudRoutes('results', resultsCrud);
registerCrudRoutes('fees', feesCrud);
registerCrudRoutes('payments', paymentsCrud);
registerCrudRoutes('timetable', timetableCrud);
registerCrudRoutes('notices', noticesCrud);
registerCrudRoutes('news', newsCrud);
registerCrudRoutes('events', eventsCrud);
registerCrudRoutes('gallery', galleryCrud);
registerCrudRoutes('achievements', achievementsCrud);
registerCrudRoutes('downloads', downloadsCrud);
registerCrudRoutes('calendar', calendarCrud);
registerCrudRoutes('enquiries', enquiriesCrud);

router.get('/cms', getCMSContent);
router.put('/cms', updateCMSContent);

router.get('/settings', getSettings);
router.put('/settings', updateSettings);

router.get('/audit-logs', getAuditLogs);

export default router;
