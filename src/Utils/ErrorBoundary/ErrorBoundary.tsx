import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          {/* <h2>Something went wrong.</h2> */}
          {/* You can render any custom fallback UI */}
          {/* Details about the error can be found in this.state.error and this.state.errorInfo */}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
