'use client';

import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useAuthStore } from '@/lib/store/auth-store';
import { useRouter } from 'next/navigation';
import { AppNav } from '@/components/app-nav';
import { useEffect } from 'react';

const plans = [
  { id: 'basic', name: 'Basic', price: '$19/mo', blurb: 'ATS score + AI rewrite essentials' },
  { id: 'pro', name: 'Pro', price: '$49/mo', blurb: 'Full matching, advanced analytics, priority AI' },
];

export default function PricingPage() {
  const router = useRouter();
  const { token } = useAuthStore();
  useEffect(() => {
    if (!token) {
      router.push('/auth');
    }
  }, [router, token]);

  const checkout = useMutation({
    mutationKey: ['checkout'],
    mutationFn: (planId: string) => api.createCheckout(token as string, planId) as Promise<{ checkout_url?: string }>,
    onSuccess: (data) => {
      if (data.checkout_url) window.location.href = data.checkout_url;
    },
  });

  if (!token) {
    return null;
  }

  return (
    <>
      <AppNav />
      <main className="mesh-bg min-h-[calc(100vh-72px)] px-4 py-8 md:px-8">
        <div className="mx-auto grid w-full max-w-5xl gap-4 md:grid-cols-2">
          {plans.map((plan) => (
            <section key={plan.id} className="glass rounded-xl p-6">
              <h2 className="text-2xl font-semibold">{plan.name}</h2>
              <p className="mt-1 text-sm text-slate-300">{plan.blurb}</p>
              <p className="mt-6 text-3xl font-semibold">{plan.price}</p>
              <button
                className="mt-6 rounded-md bg-cyan-400 px-4 py-2 text-sm font-semibold text-black"
                onClick={() => checkout.mutate(plan.id)}
                disabled={checkout.isPending}
              >
                {checkout.isPending ? 'Redirecting...' : 'Choose Plan'}
              </button>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
