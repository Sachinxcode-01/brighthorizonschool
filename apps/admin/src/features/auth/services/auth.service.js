const API_BASE = 'http://localhost:5000/api/v1/admin';

export const authService = {
  login: async (email, password) => {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return await res.json();
  },
  verifyToken: async (token) => {
    const res = await fetch(`${API_BASE}/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  }
};
