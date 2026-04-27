const runtimeDefaultApiBase =
  typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:4000/api'
    : '/api';

const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? runtimeDefaultApiBase).replace(
  /\/$/,
  '',
);

export interface ApiErrorShape {
  message: string;
}

type AuthResponse = {
  jwt_token: string;
  user: { id: string; email: string; role: string };
};

type MockUserRecord = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
};

const MOCK_USERS_KEY = 'auracv_mock_users_v1';

function shouldUseMockAuth(error: Error): boolean {
  return (
    error.message.includes('Unable to reach API service') ||
    error.message.includes('Request failed (404)') ||
    error.message.includes('Request failed (500)') ||
    error.message.includes('Request failed (502)') ||
    error.message.includes('Request failed (503)')
  );
}

function loadMockUsers(): MockUserRecord[] {
  if (typeof window === 'undefined') {
    return [];
  }
  const raw = window.localStorage.getItem(MOCK_USERS_KEY);
  if (!raw) {
    return [];
  }
  try {
    return JSON.parse(raw) as MockUserRecord[];
  } catch {
    return [];
  }
}

function saveMockUsers(users: MockUserRecord[]): void {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
}

function buildMockAuthResponse(user: MockUserRecord): AuthResponse {
  return {
    jwt_token: `mock.${user.id}.${Date.now()}`,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  };
}

function tryMockSignup(payload: {
  email: string;
  password: string;
  name: string;
}): AuthResponse {
  const users = loadMockUsers();
  const existing = users.find((user) => user.email === payload.email.toLowerCase());
  if (existing) {
    throw new Error('Email already in use');
  }
  const created: MockUserRecord = {
    id: crypto.randomUUID(),
    name: payload.name,
    email: payload.email.toLowerCase(),
    password: payload.password,
    role: 'USER',
  };
  users.push(created);
  saveMockUsers(users);
  return buildMockAuthResponse(created);
}

function tryMockLogin(payload: { email: string; password: string }): AuthResponse {
  const users = loadMockUsers();
  const found = users.find((user) => user.email === payload.email.toLowerCase());
  if (!found || found.password !== payload.password) {
    throw new Error('Invalid credentials');
  }
  return buildMockAuthResponse(found);
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
  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers,
      cache: 'no-store',
    });
  } catch {
    throw new Error(
      'Unable to reach API service. Check NEXT_PUBLIC_API_URL and backend deployment.',
    );
  }

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
    request<AuthResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(payload),
    }).catch((error: Error) => {
      if (shouldUseMockAuth(error)) {
        return tryMockSignup(payload);
      }
      throw error;
    }),
  login: (payload: { email: string; password: string }) =>
    request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }).catch((error: Error) => {
      if (shouldUseMockAuth(error)) {
        return tryMockLogin(payload);
      }
      throw error;
    }),
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
    let response: Response;
    try {
      response = await fetch(`${API_BASE}/resume/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
    } catch {
      throw new Error(
        'Unable to reach API service. Check NEXT_PUBLIC_API_URL and backend deployment.',
      );
    }
    if (!response.ok) {
      throw new Error('Resume upload failed');
    }
    return response.json();
  },
};
