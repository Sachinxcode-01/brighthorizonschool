export interface TeacherProfile {
  id: string;
  name: string;
  photoUrl: string;
  qualification: string;
  department: string;
  subject: string;
  experience: string;
  designation: string;
  email?: string;
  phone?: string;
  isPublicVisible?: boolean;
  bio?: string;
}

export interface Notice {
  id: string;
  title: string;
  category: string;
  content: string;
  author: string;
  publishDate: string;
  isImportant?: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  imageUrl: string;
  author: string;
  publishDate: string;
  status: string;
}

export interface SchoolEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  imageUrl?: string;
  isPublic?: boolean;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  category: string;
  coverImage: string;
  eventDate: string;
  images: { id: string; url: string; caption: string }[];
}

export interface Achievement {
  id: string;
  title: string;
  category: string;
  recipientName: string;
  year: string;
  description: string;
  imageUrl?: string;
}

export interface DocumentDownload {
  id: string;
  title: string;
  category: string;
  fileUrl: string;
  fileSize: string;
  uploadedAt: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  type: string;
  description?: string;
}

export interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  principalName: string;
  principalMessage: string;
  principalImageUrl: string;
  schoolHistory: string;
  vision: string;
  mission: string;
  coreValues: string[];
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
  workingHours: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  reply?: string;
}
