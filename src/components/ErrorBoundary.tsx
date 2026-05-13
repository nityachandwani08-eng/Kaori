import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: ""
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="flex flex-col items-center justify-center p-8 bg-red-900/20 text-red-100 rounded-xl border border-red-500/30">
          <h2 className="text-xl font-bold mb-2">Failed to load 3D Model</h2>
          <p className="text-sm opacity-80 text-center">{this.state.errorMessage}</p>
          <p className="text-xs mt-4 opacity-60">The FBX format might be unsupported. Try converting to .glb.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
