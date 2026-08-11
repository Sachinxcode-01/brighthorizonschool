const API_BASE_URL = '/api/v1/public';

async function fetchPublic(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(`API Fetch Error on ${endpoint}:`, err);
    return { success: false, message: err.message };
  }
}

export const publicApi = {
  getSiteContent: () => fetchPublic('/site-content'),
  getFaculty: () => fetchPublic('/faculty'),
  getNotices: () => fetchPublic('/notices'),
  getEvents: () => fetchPublic('/events'),
  getNews: () => fetchPublic('/news'),
  getGallery: () => fetchPublic('/gallery'),
  getAchievements: () => fetchPublic('/achievements'),
  getDownloads: () => fetchPublic('/downloads'),
  getCalendar: () => fetchPublic('/calendar'),
  getFaqs: () => fetchPublic('/faqs'),

  submitEnquiry: (payload) => fetchPublic('/enquiry', { method: 'POST', body: JSON.stringify(payload) }),
  submitContact: (payload) => fetchPublic('/contact', { method: 'POST', body: JSON.stringify(payload) }),
  askAiAssistant: (message) => fetchPublic('/ai-assistant', { method: 'POST', body: JSON.stringify({ message }) })
};
