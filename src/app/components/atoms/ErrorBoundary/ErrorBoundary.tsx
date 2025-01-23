"use client";

import { ReactNode, Component } from "react";

type BoundaryProps = {
  FallbackComponent: () => JSX.Element;
  children: ReactNode;
};

type BoundaryState = {
  hasError: boolean;
};

/**
 * ErrorBoundary
 * @param {() => JSX.Element} FallbackComponent - Alternative Component to display in case of error
 * @param {number} children - children
 * @returns {JSX.Element}
 */
class ErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { FallbackComponent, children } = this.props;

    if (hasError) {
      return <FallbackComponent />;
    }

    return children;
  }
}

export default ErrorBoundary;
