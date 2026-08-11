export interface ApiClientConfig {
  baseUrl: string;
  headers?: Record<string, string>;
}

export class ApiClient {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor(config: ApiClientConfig) {
    this.baseUrl = config.baseUrl;
    this.headers = {
      'Content-Type': 'application/json',
      ...config.headers,
    };
  }

  public setAuthToken(token: string | null) {
    if (token) {
      this.headers['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.headers['Authorization'];
    }
  }

  public async get<T>(endpoint: string, options: RequestInit = {}): Promise<{ success: boolean; data?: T; message?: string }> {
    try {
      const res = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: { ...this.headers, ...options.headers },
        ...options,
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: err.message || 'Network error' };
    }
  }

  public async post<T>(endpoint: string, body?: any, options: RequestInit = {}): Promise<{ success: boolean; data?: T; message?: string; reply?: string }> {
    try {
      const res = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: { ...this.headers, ...options.headers },
        body: body ? JSON.stringify(body) : undefined,
        ...options,
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: err.message || 'Network error' };
    }
  }

  public async put<T>(endpoint: string, body?: any, options: RequestInit = {}): Promise<{ success: boolean; data?: T; message?: string }> {
    try {
      const res = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'PUT',
        headers: { ...this.headers, ...options.headers },
        body: body ? JSON.stringify(body) : undefined,
        ...options,
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: err.message || 'Network error' };
    }
  }

  public async delete<T>(endpoint: string, options: RequestInit = {}): Promise<{ success: boolean; data?: T; message?: string }> {
    try {
      const res = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'DELETE',
        headers: { ...this.headers, ...options.headers },
        ...options,
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: err.message || 'Network error' };
    }
  }
}
