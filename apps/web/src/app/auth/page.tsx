'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useAuthStore } from '@/lib/store/auth-store';
import { AppNav } from '@/components/app-nav';

export default function AuthPage() {
  const router = useRouter();
  const { setSession } = useAuthStore();
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const payload = isSignup
        ? await api.signup({ name, email, password })
        : await api.login({ email, password });
      setSession(payload.jwt_token, payload.user);
      router.push('/dashboard');
    } catch (caught) {
      setError((caught as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AppNav />
      <main className="mesh-bg flex min-h-[calc(100vh-72px)] items-center justify-center px-4 py-12">
        <form onSubmit={submit} className="glass w-full max-w-md rounded-xl p-6 md:p-8">
          <h1 className="text-2xl font-semibold">{isSignup ? 'Create account' : 'Welcome back'}</h1>
          <p className="mt-1 text-sm text-slate-300">Secure JWT auth with role-aware access controls.</p>
          {isSignup && (
            <div className="mt-5">
              <label className="mb-2 block text-xs text-slate-300">Full name</label>
              <input className="input-base w-full" value={name} onChange={(event) => setName(event.target.value)} />
            </div>
          )}
          <div className="mt-4">
            <label className="mb-2 block text-xs text-slate-300">Email</label>
            <input
              className="input-base w-full"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <label className="mb-2 block text-xs text-slate-300">Password</label>
            <input
              className="input-base w-full"
              type="password"
              value={password}
              minLength={8}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          {error && <p className="mt-3 text-sm text-orange-300">{error}</p>}
          <button
            disabled={loading}
            className="mt-5 w-full rounded-md bg-cyan-400 px-3 py-2 text-sm font-semibold text-black disabled:opacity-60"
          >
            {loading ? 'Please wait...' : isSignup ? 'Sign up' : 'Log in'}
          </button>
          <button
            type="button"
            className="mt-4 text-sm text-slate-300 underline"
            onClick={() => setIsSignup((value) => !value)}
          >
            {isSignup ? 'Already have an account? Log in' : 'No account yet? Create one'}
          </button>
        </form>
      </main>
    </>
  );
}
