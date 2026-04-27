import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('AuraCV render failure', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen mesh-gradient px-6 py-16 text-on-surface">
          <div className="mx-auto flex max-w-2xl flex-col items-center rounded-[2rem] border border-white/50 bg-white/60 p-10 text-center shadow-xl backdrop-blur-xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Recovery Mode
            </p>
            <h1 className="mb-4 text-4xl font-bold font-h1 tracking-tight">
              We hit a temporary UI problem.
            </h1>
            <p className="mb-8 max-w-xl text-base text-on-surface-variant">
              Refresh the page to retry. Your local settings were left untouched and the app
              can recover without a full rebuild.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-xl bg-primary px-6 py-3 font-bold text-white shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5"
            >
              Reload AuraCV
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
