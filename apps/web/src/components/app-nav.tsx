'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/auth-store';

const routes = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/admin', label: 'Admin' },
];

export function AppNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, clearSession } = useAuthStore();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/30 backdrop-blur-lg">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" className="font-semibold text-lg tracking-tight">
          AuraCV
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`rounded-md px-3 py-1.5 text-sm transition ${
                pathname === route.href ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              {route.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="hidden text-xs text-slate-300 md:inline">{user.email}</span>
              <button
                className="rounded-md border border-white/15 px-3 py-1.5 text-xs hover:bg-white/5"
                onClick={() => {
                  clearSession();
                  router.push('/auth');
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link className="rounded-md bg-cyan-400 px-3 py-1.5 text-xs font-semibold text-black" href="/auth">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
