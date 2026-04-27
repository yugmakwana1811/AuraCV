'use client';

import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useAuthStore } from '@/lib/store/auth-store';
import { useRouter } from 'next/navigation';
import { AppNav } from '@/components/app-nav';

export default function DashboardPage() {
  const router = useRouter();
  const { token, user } = useAuthStore();
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [resumeId, setResumeId] = useState<string | undefined>();
  const [lastUpload, setLastUpload] = useState<{ parsed_text: string; stored_file_url: string } | null>(null);

  useEffect(() => {
    if (!token) {
      router.push('/auth');
    }
  }, [router, token]);

  const dashboardQuery = useQuery({
    queryKey: ['dashboard', token],
    queryFn: () => api.dashboard(token as string),
    enabled: Boolean(token),
  });

  const uploadMutation = useMutation({
    mutationFn: (file: File) => api.uploadResume(token as string, file),
    onSuccess: (data) => {
      setLastUpload(data);
      setResumeText(data.parsed_text);
      setResumeId(data.id);
    },
  });

  const atsMutation = useMutation({
    mutationFn: () => api.atsScore(token as string, resumeText, resumeId),
  });

  const aiMutation = useMutation({
    mutationFn: () => api.aiSuggestions(token as string, resumeText),
  });

  const matchMutation = useMutation({
    mutationFn: () => api.jobMatch(token as string, resumeText, jobDescription, resumeId),
  });

  if (!token) {
    return null;
  }

  return (
    <>
      <AppNav />
      <main className="mesh-bg min-h-[calc(100vh-72px)] px-4 py-6 md:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-4 md:grid-cols-12">
        <section className="glass rounded-xl p-5 md:col-span-4">
          <h2 className="text-lg font-semibold">Welcome, {user?.email}</h2>
          <p className="mt-1 text-sm text-slate-300">Upload resume then run ATS, AI rewrite, and job match.</p>
          <label className="mt-4 block text-xs text-slate-300">Resume file (PDF/DOCX, max 5MB)</label>
          <input
            className="mt-2 block w-full text-sm"
            type="file"
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) uploadMutation.mutate(file);
            }}
          />
          {uploadMutation.isPending && <p className="mt-2 text-xs text-slate-300">Uploading...</p>}
          {lastUpload && (
            <p className="mt-3 text-xs text-emerald-300 break-all">Stored: {lastUpload.stored_file_url}</p>
          )}
        </section>

        <section className="glass rounded-xl p-5 md:col-span-8">
          <h2 className="text-lg font-semibold">Resume Text</h2>
          <textarea
            className="input-base mt-3 h-44 w-full resize-none text-sm"
            value={resumeText}
            onChange={(event) => setResumeText(event.target.value)}
            placeholder="Parsed resume text appears here..."
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              className="rounded-md bg-cyan-400 px-3 py-2 text-xs font-semibold text-black"
              onClick={() => atsMutation.mutate()}
              disabled={!resumeText || atsMutation.isPending}
            >
              {atsMutation.isPending ? 'Scoring...' : 'Run ATS Score'}
            </button>
            <button
              className="rounded-md bg-emerald-400 px-3 py-2 text-xs font-semibold text-black"
              onClick={() => aiMutation.mutate()}
              disabled={!resumeText || aiMutation.isPending}
            >
              {aiMutation.isPending ? 'Thinking...' : 'Generate AI Suggestions'}
            </button>
          </div>
        </section>

        <section className="glass rounded-xl p-5 md:col-span-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">ATS Output</h3>
          <pre className="mt-3 max-h-64 overflow-auto rounded-md bg-black/30 p-3 text-xs">
            {JSON.stringify(atsMutation.data ?? {}, null, 2)}
          </pre>
        </section>
        <section className="glass rounded-xl p-5 md:col-span-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">AI Suggestions</h3>
          <pre className="mt-3 max-h-64 overflow-auto rounded-md bg-black/30 p-3 text-xs">
            {JSON.stringify(aiMutation.data ?? {}, null, 2)}
          </pre>
        </section>

        <section className="glass rounded-xl p-5 md:col-span-12">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Job Match</h3>
          <textarea
            className="input-base mt-3 h-28 w-full resize-none text-sm"
            value={jobDescription}
            onChange={(event) => setJobDescription(event.target.value)}
            placeholder="Paste job description..."
          />
          <button
            className="mt-3 rounded-md bg-orange-400 px-3 py-2 text-xs font-semibold text-black"
            onClick={() => matchMutation.mutate()}
            disabled={!resumeText || !jobDescription || matchMutation.isPending}
          >
            {matchMutation.isPending ? 'Matching...' : 'Run Job Match'}
          </button>
          <pre className="mt-3 max-h-64 overflow-auto rounded-md bg-black/30 p-3 text-xs">
            {JSON.stringify(matchMutation.data ?? {}, null, 2)}
          </pre>
        </section>

        <section className="glass rounded-xl p-5 md:col-span-12">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Dashboard Data</h3>
          <pre className="mt-3 max-h-64 overflow-auto rounded-md bg-black/30 p-3 text-xs">
            {JSON.stringify(dashboardQuery.data ?? {}, null, 2)}
          </pre>
        </section>
        </div>
      </main>
    </>
  );
}
