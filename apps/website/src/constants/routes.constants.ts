export const PUBLIC_ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  ACADEMICS: '/academics',
  FACULTY: '/faculty',
  FACILITIES: '/facilities',
  ADMISSIONS: '/admissions',
  EVENTS: '/events',
  GALLERY: '/gallery',
  ACHIEVEMENTS: '/achievements',
  DOWNLOADS: '/downloads',
  CALENDAR: '/calendar',
  FAQ: '/faq',
  CONTACT: '/contact',
  POLICIES: '/policies',
} as const;

export const ADMIN_LOGIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:3001/login';
