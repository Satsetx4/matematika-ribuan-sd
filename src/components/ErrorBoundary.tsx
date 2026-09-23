import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Learning app failed to render.', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
          <section className="max-w-md rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-center shadow-lg">
            <h1 className="text-xl font-black">Aplikasi perlu dimuat ulang</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Belajar belum dapat ditampilkan. Muat ulang halaman untuk mencoba lagi.</p>
            <button className="btn-tactile mt-5 min-h-11 rounded-xl bg-amber-500 px-5 py-3 font-bold text-white" onClick={() => window.location.reload()}>
              Muat Ulang
            </button>
          </section>
        </main>
      );
    }
    return this.props.children;
  }
}
