'use client';
import { Component } from 'react';

interface Props { children: React.ReactNode }
interface State { error: Error | null }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };
  static getDerivedStateFromError(error: Error) { return { error } };
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
          <h2>Erro inesperado</h2>
          <pre style={{ background: '#fee', padding: 10, borderRadius: 8, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {this.state.error.stack || this.state.error.message}
          </pre>
        </div>
      );
    }
    return this.props.children;
  };
}
