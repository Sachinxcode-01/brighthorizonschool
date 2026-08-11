import { ApiResponse, SiteContent, TeacherProfile, Notice, SchoolEvent, NewsItem, GalleryAlbum, Achievement, DocumentDownload, CalendarEvent } from '../types';

declare const process: {
  env: {
    NEXT_PUBLIC_API_URL?: string;
    [key: string]: string | undefined;
  };
};

interface NextFetchRequestInit extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api/v1/public';

async function fetchPublic<T>(endpoint: string, options: NextFetchRequestInit = {}): Promise<ApiResponse<T>> {
  try {
    const { next, ...fetchOpts } = options;
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...fetchOpts.headers,
      },
      ...fetchOpts,
      ...(next ? { next } : { next: { revalidate: 60 } })
    } as NextFetchRequestInit);
    return await res.json();
  } catch (err: any) {
    console.error(`Fetch error on ${endpoint}:`, err);
    return { success: false, message: err.message || 'API request failed' };
  }
}

export const publicApi = {
  getSiteContent: () => fetchPublic<SiteContent>('/site-content'),
  getFaculty: () => fetchPublic<TeacherProfile[]>('/faculty'),
  getNotices: () => fetchPublic<Notice[]>('/notices'),
  getEvents: () => fetchPublic<SchoolEvent[]>('/events'),
  getNews: () => fetchPublic<NewsItem[]>('/news'),
  getGallery: () => fetchPublic<GalleryAlbum[]>('/gallery'),
  getAchievements: () => fetchPublic<Achievement[]>('/achievements'),
  getDownloads: () => fetchPublic<DocumentDownload[]>('/downloads'),
  getCalendar: () => fetchPublic<CalendarEvent[]>('/calendar'),
  getFaqs: () => fetchPublic<{ id: string; question: string; answer: string }[]>('/faqs'),

  submitEnquiry: (payload: any) => fetchPublic('/enquiry', { method: 'POST', body: JSON.stringify(payload) }),
  submitContact: (payload: any) => fetchPublic('/contact', { method: 'POST', body: JSON.stringify(payload) }),
  askAiAssistant: (message: string) => fetchPublic('/ai-assistant', { method: 'POST', body: JSON.stringify({ message }) })
};
