import { Component, type ErrorInfo, type ReactNode } from 'react';
import Button from '../button/Button';

interface Props { children: ReactNode; }
interface State { hasError: boolean; error?: Error; }

class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-500 to-purple-600 p-8">
          <div className="bg-white p-12 rounded-3xl text-center max-w-lg shadow-2xl">
            <h1 className="text-6xl mb-4">😕</h1>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Oops!</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We're sorry for the inconvenience. Please try refreshing the page.
            </p>
            <Button size="large" onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;