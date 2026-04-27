'use client';

import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/lib/store/auth-store';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { AppNav } from '@/components/app-nav';
import { useEffect } from 'react';

export default function AdminPage() {
  const router = useRouter();
  const { token, user } = useAuthStore();
  useEffect(() => {
    if (!token) {
      router.push('/auth');
    }
  }, [router, token]);

  const users = useQuery({
    queryKey: ['admin-users', token],
    queryFn: () => api.adminUsers(token as string),
    enabled: Boolean(token) && user?.role === 'ADMIN',
  });
  const analytics = useQuery({
    queryKey: ['admin-analytics', token],
    queryFn: () => api.adminAnalytics(token as string),
    enabled: Boolean(token) && user?.role === 'ADMIN',
  });
  const payments = useQuery({
    queryKey: ['admin-payments', token],
    queryFn: () => api.adminPayments(token as string),
    enabled: Boolean(token) && user?.role === 'ADMIN',
  });

  if (!token) {
    return null;
  }
  if (user?.role !== 'ADMIN') {
    return (
      <>
        <AppNav />
        <main className="mesh-bg min-h-[calc(100vh-72px)] px-4 py-8">
          <div className="mx-auto w-full max-w-3xl rounded-xl border border-orange-200/20 bg-orange-500/10 p-6">
            <h1 className="text-xl font-semibold">Admin access required</h1>
            <p className="mt-1 text-sm text-slate-300">Your current role does not allow this route.</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <AppNav />
      <main className="mesh-bg min-h-[calc(100vh-72px)] px-4 py-8 md:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-4 md:grid-cols-3">
          <section className="glass rounded-xl p-5 md:col-span-3">
            <h1 className="text-2xl font-semibold">Admin Console</h1>
            <p className="mt-1 text-sm text-slate-300">Users, analytics, and payment visibility.</p>
          </section>
          <section className="glass rounded-xl p-5">
            <h2 className="text-sm font-semibold uppercase text-slate-300">Users</h2>
            <pre className="mt-3 max-h-80 overflow-auto rounded-md bg-black/30 p-3 text-xs">
              {JSON.stringify(users.data ?? {}, null, 2)}
            </pre>
          </section>
          <section className="glass rounded-xl p-5">
            <h2 className="text-sm font-semibold uppercase text-slate-300">Analytics</h2>
            <pre className="mt-3 max-h-80 overflow-auto rounded-md bg-black/30 p-3 text-xs">
              {JSON.stringify(analytics.data ?? {}, null, 2)}
            </pre>
          </section>
          <section className="glass rounded-xl p-5">
            <h2 className="text-sm font-semibold uppercase text-slate-300">Payments</h2>
            <pre className="mt-3 max-h-80 overflow-auto rounded-md bg-black/30 p-3 text-xs">
              {JSON.stringify(payments.data ?? {}, null, 2)}
            </pre>
          </section>
        </div>
      </main>
    </>
  );
}
