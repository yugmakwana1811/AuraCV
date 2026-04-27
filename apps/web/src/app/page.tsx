'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { AppNav } from '@/components/app-nav';

const HeroScene = dynamic(() => import('@/components/hero-scene').then((module) => module.HeroScene), {
  ssr: false,
  loading: () => <div className="h-[420px] w-full animate-pulse rounded-xl bg-white/5" />,
});

export default function Home() {
  return (
    <>
      <AppNav />
      <main className="mesh-bg min-h-[calc(100vh-72px)] px-4 py-8 md:px-8">
        <section className="mx-auto grid w-full max-w-7xl items-center gap-6 md:grid-cols-2">
          <div>
            <p className="inline-flex rounded-full border border-cyan-200/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">
              AI Resume Analyzer SaaS
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
              AuraCV
            </h1>
            <p className="mt-4 max-w-xl text-base text-slate-300 md:text-lg">
              Upload resumes, compute ATS score, generate AI rewrites, and benchmark job-match in one production-ready platform.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/dashboard"
                className="rounded-md bg-cyan-400 px-4 py-2 text-sm font-semibold text-black"
              >
                Open Dashboard
              </Link>
              <Link
                href="/pricing"
                className="rounded-md border border-white/20 px-4 py-2 text-sm text-slate-200 hover:bg-white/5"
              >
                View Plans
              </Link>
            </div>
          </div>
          <div className="glass rounded-xl p-2 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <HeroScene />
          </div>
        </section>
        <section className="mx-auto mt-10 grid w-full max-w-7xl gap-4 md:grid-cols-3">
          <article className="glass rounded-xl p-5">
            <h2 className="text-sm font-semibold uppercase text-cyan-200">ATS Intelligence</h2>
            <p className="mt-2 text-sm text-slate-300">Scores 0-100 with skills, experience, and education sections.</p>
          </article>
          <article className="glass rounded-xl p-5">
            <h2 className="text-sm font-semibold uppercase text-emerald-200">AI Engine</h2>
            <p className="mt-2 text-sm text-slate-300">OpenAI-powered bullet rewrites with deterministic fallback under 5 seconds.</p>
          </article>
          <article className="glass rounded-xl p-5">
            <h2 className="text-sm font-semibold uppercase text-orange-200">Job Matching</h2>
            <p className="mt-2 text-sm text-slate-300">Keyword gap detection with match score and missing terms output.</p>
          </article>
        </section>
      </main>
    </>
  );
}
