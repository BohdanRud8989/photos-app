"use server";

import "./errorView.scss";

/**
 * Error view - Used as Fallback component in ErrorBoundary
 * @returns {JSX.Element}
 */
const ErrorView = () => (
  <article className="error-view">
    <h1 className="error-view__title">Warning!</h1>
    <p className="error-view__text">
      An error has occurred! <br />
      Please refresh the page and try again.
    </p>
  </article>
);

export default ErrorView;
