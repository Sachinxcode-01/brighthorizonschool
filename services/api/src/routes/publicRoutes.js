import express from 'express';
import {
  getPublicSiteContent,
  getPublicFaculty,
  getPublicNotices,
  getPublicEvents,
  getPublicNews,
  getPublicGallery,
  getPublicAchievements,
  getPublicDownloads,
  getPublicCalendar,
  getPublicFaqs,
  submitEnquiry,
  submitContact,
  aiAssistant
} from '../controllers/publicController.js';

const router = express.Router();

router.get('/site-content', getPublicSiteContent);
router.get('/faculty', getPublicFaculty);
router.get('/notices', getPublicNotices);
router.get('/events', getPublicEvents);
router.get('/news', getPublicNews);
router.get('/gallery', getPublicGallery);
router.get('/achievements', getPublicAchievements);
router.get('/downloads', getPublicDownloads);
router.get('/calendar', getPublicCalendar);
router.get('/faqs', getPublicFaqs);

router.post('/enquiry', submitEnquiry);
router.post('/contact', submitContact);
router.post('/ai-assistant', aiAssistant);

export default router;
