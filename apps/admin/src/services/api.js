const API_BASE_URL = '/api/v1/admin';

function getAuthHeader() {
  const token = localStorage.getItem('adminToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function requestAdmin(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
        ...options.headers
      },
      ...options
    });

    if (res.status === 401 && !endpoint.includes('/auth/login')) {
      localStorage.removeItem('adminToken');
      window.location.href = '/login';
      return { success: false, message: 'Session expired' };
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(`Admin API Error on ${endpoint}:`, err);
    return { success: false, message: err.message };
  }
}

export const adminApi = {
  login: (username, password) => requestAdmin('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }),
  getMe: () => requestAdmin('/auth/me'),
  getDashboardStats: () => requestAdmin('/dashboard/stats'),

  // Resource CRUD helper
  resource: (name) => ({
    getAll: () => requestAdmin(`/${name}`),
    getOne: (id) => requestAdmin(`/${name}/${id}`),
    create: (data) => requestAdmin(`/${name}`, { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => requestAdmin(`/${name}/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => requestAdmin(`/${name}/${id}`, { method: 'DELETE' })
  }),

  getCMS: () => requestAdmin('/cms'),
  updateCMS: (data) => requestAdmin('/cms', { method: 'PUT', body: JSON.stringify(data) }),

  getSettings: () => requestAdmin('/settings'),
  updateSettings: (data) => requestAdmin('/settings', { method: 'PUT', body: JSON.stringify(data) }),

  getAuditLogs: () => requestAdmin('/audit-logs')
};
