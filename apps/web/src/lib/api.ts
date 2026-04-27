const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';

export interface ApiErrorShape {
  message: string;
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  token?: string | null,
): Promise<T> {
  const headers = new Headers(options.headers ?? {});
  headers.set('Content-Type', headers.get('Content-Type') ?? 'application/json');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    cache: 'no-store',
  });

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const body = (await response.json()) as ApiErrorShape | string;
      if (typeof body === 'string') {
        message = body;
      } else if (typeof body?.message === 'string') {
        message = body.message;
      }
    } catch {
      message = `Request failed (${response.status})`;
    }
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export const api = {
  signup: (payload: { email: string; password: string; name: string }) =>
    request<{ jwt_token: string; user: { id: string; email: string; role: string } }>(
      '/auth/signup',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      },
    ),
  login: (payload: { email: string; password: string }) =>
    request<{ jwt_token: string; user: { id: string; email: string; role: string } }>(
      '/auth/login',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      },
    ),
  me: (token: string) => request('/auth/me', {}, token),
  dashboard: (token: string) => request('/dashboard', {}, token),
  atsScore: (token: string, parsedResume: string, resumeId?: string) =>
    request(
      '/analysis/ats-score',
      {
        method: 'POST',
        body: JSON.stringify({ parsedResume, resumeId }),
      },
      token,
    ),
  aiSuggestions: (token: string, resumeText: string) =>
    request(
      '/analysis/ai-suggestions',
      {
        method: 'POST',
        body: JSON.stringify({ resumeText }),
      },
      token,
    ),
  jobMatch: (token: string, resume: string, jobDescription: string, resumeId?: string) =>
    request(
      '/analysis/job-match',
      {
        method: 'POST',
        body: JSON.stringify({ resume, jobDescription, resumeId }),
      },
      token,
    ),
  createCheckout: (token: string, plan_id: string) =>
    request(
      '/billing/checkout',
      {
        method: 'POST',
        body: JSON.stringify({ plan_id }),
      },
      token,
    ),
  adminUsers: (token: string) => request('/admin/users', {}, token),
  adminAnalytics: (token: string) => request('/admin/analytics', {}, token),
  adminPayments: (token: string) => request('/admin/payments', {}, token),
  uploadResume: async (token: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${API_BASE}/resume/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Resume upload failed');
    }
    return response.json();
  },
};
