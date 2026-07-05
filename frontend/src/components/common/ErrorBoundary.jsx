import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center dark:bg-gray-900">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Something went wrong
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            An unexpected error occurred. Please reload the page.
          </p>
          <button
            onClick={this.handleReload}
            className="mt-6 rounded-lg bg-brand-600 px-5 py-2.5 font-medium text-white transition hover:bg-brand-700"
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
