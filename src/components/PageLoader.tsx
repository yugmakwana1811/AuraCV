export default function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6 py-16">
      <div className="glass-card flex w-full max-w-xl items-center gap-4 rounded-[2rem] border border-white/50 bg-white/50 px-6 py-5 shadow-lg">
        <div className="h-12 w-12 shrink-0 rounded-2xl border-4 border-primary/20 border-t-primary animate-spin" />
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary">
            Loading
          </p>
          <p className="text-sm text-on-surface-variant">
            Preparing the next AuraCV workspace panel.
          </p>
        </div>
      </div>
    </div>
  );
}
