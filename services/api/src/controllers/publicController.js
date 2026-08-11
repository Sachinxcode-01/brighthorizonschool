import { db } from '../db/database.js';

export const getPublicSiteContent = (req, res) => {
  const siteContent = db.getObject('siteContent');
  const settings = db.getObject('settings');
  res.json({
    success: true,
    data: {
      ...siteContent,
      schoolName: settings.schoolName,
      logoUrl: settings.logoUrl,
      currentAcademicYear: settings.currentAcademicYear
    }
  });
};

export const getPublicFaculty = (req, res) => {
  const teachers = db.getCollection('teachers');
  const publicTeachers = teachers
    .filter(t => t.isPublicVisible !== false)
    .map(({ email, phone, isPublicVisible, joiningDate, ...publicData }) => publicData);
  res.json({ success: true, data: publicTeachers });
};

export const getPublicNotices = (req, res) => {
  const notices = db.getCollection('notices');
  res.json({ success: true, data: notices });
};

export const getPublicEvents = (req, res) => {
  const events = db.getCollection('events');
  const publicEvents = events.filter(e => e.isPublic !== false);
  res.json({ success: true, data: publicEvents });
};

export const getPublicNews = (req, res) => {
  const news = db.getCollection('news');
  const publishedNews = news.filter(n => n.status === 'Published');
  res.json({ success: true, data: publishedNews });
};

export const getPublicGallery = (req, res) => {
  const gallery = db.getCollection('gallery');
  res.json({ success: true, data: gallery });
};

export const getPublicAchievements = (req, res) => {
  const achievements = db.getCollection('achievements');
  res.json({ success: true, data: achievements });
};

export const getPublicDownloads = (req, res) => {
  const downloads = db.getCollection('downloads');
  res.json({ success: true, data: downloads });
};

export const getPublicCalendar = (req, res) => {
  const calendar = db.getCollection('calendar');
  res.json({ success: true, data: calendar });
};

export const getPublicFaqs = (req, res) => {
  const faqs = [
    {
      id: "faq-1",
      question: "What are the age criteria for school admission?",
      answer: "For Grade 1, the child should complete 6 years of age as of March 31st of the academic year."
    },
    {
      id: "faq-2",
      question: "Does the school provide safe transport facilities?",
      answer: "Yes, we maintain a fleet of GPS-tracked air-conditioned buses covering all major city routes with trained female attendants."
    },
    {
      id: "faq-3",
      question: "What is the teacher-to-student ratio?",
      answer: "We maintain an optimal ratio of 1:25 to ensure personalized care, academic monitoring, and interactive engagement."
    },
    {
      id: "faq-4",
      question: "Are there extracurricular activities included in the curriculum?",
      answer: "Absolutely! We offer robotics, music, classical dance, swimming, chess, debate, and inter-school sports leagues."
    }
  ];
  res.json({ success: true, data: faqs });
};

export const submitEnquiry = (req, res) => {
  const { applicantName, parentName, email, phone, gradeApplying, previousSchool, message } = req.body;
  if (!applicantName || !parentName || !email || !phone || !gradeApplying) {
    return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
  }

  const newEnquiry = db.addItem('admissions', {
    applicantName,
    parentName,
    email,
    phone,
    gradeApplying,
    previousSchool: previousSchool || '',
    message: message || '',
    status: 'Pending',
    createdAt: new Date().toISOString()
  });

  res.status(201).json({
    success: true,
    message: 'Your admission enquiry has been submitted successfully! Our admissions counselor will contact you shortly.',
    data: newEnquiry
  });
};

export const submitContact = (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'Please fill in all required contact fields.' });
  }

  const submission = db.addItem('enquiries', {
    name,
    email,
    phone: phone || '',
    subject,
    message,
    submittedAt: new Date().toISOString(),
    status: 'New'
  });

  res.status(201).json({
    success: true,
    message: 'Thank you for contacting Bright Horizon School. We have received your message.',
    data: submission
  });
};

export const aiAssistant = (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ success: false, message: 'Message query is required.' });
  }

  const q = message.toLowerCase();
  let reply = "Thank you for reaching out to Bright Horizon School. ";

  if (q.includes('admission') || q.includes('apply') || q.includes('join') || q.includes('form')) {
    reply += "Admissions for Academic Year 2026-27 are currently open! You can submit an enquiry online via our Admissions page or download the prospectus form.";
  } else if (q.includes('fee') || q.includes('cost') || q.includes('tuition')) {
    reply += "Our fee structure is transparent with no hidden charges. Annual tuition for senior grades starts from ₹35,000. Detailed fee terms can be viewed on our Admissions page.";
  } else if (q.includes('facility') || q.includes('lab') || q.includes('sport') || q.includes('bus') || q.includes('transport')) {
    reply += "Bright Horizon features state-of-the-art Science & STEM Robotics labs, a smart library, GPS-monitored transport, indoor swimming pool, and dedicated sports grounds.";
  } else if (q.includes('contact') || q.includes('phone') || q.includes('location') || q.includes('address')) {
    reply += "We are located at Knowledge Hub Sector 12, City Centre. You can reach our front reception at +91 98300 00000 or email info@brighthorizonschool.edu.in.";
  } else if (q.includes('principal') || q.includes('vision') || q.includes('history')) {
    reply += "Founded in 1998, Bright Horizon School is led by Principal Dr. S. K. Mukherjee. Our mission is holistic, technology-driven education built on strong core values.";
  } else if (q.includes('timing') || q.includes('hours') || q.includes('open')) {
    reply += "School operational hours are Monday through Saturday, from 8:00 AM to 4:00 PM.";
  } else {
    reply += "We offer excellence in academics, sports, and holistic character building from Kindergarten to Grade 12. How else may I assist you today?";
  }

  res.json({ success: true, reply });
};
