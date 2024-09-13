'use client';
import { useState } from 'react';

/**
 * ErrorBoundary component catches JavaScript errors anywhere in its child component tree 
 * and displays a fallback UI instead of crashing the whole app.
 * 
 * @function ErrorBoundary
 * @param {Object} props - The component props.
 * @param {JSX.Element} props.children - The children components to render.
 * @param {JSX.Element} props.fallback - The fallback UI to display when an error occurs.
 * @returns {JSX.Element} The component rendering its children or the fallback UI if an error occurs.
 */
export default function ErrorBoundary({ children, fallback }) {
  const [hasError, setHasError] = useState(false);

  /**
   * Error handling callback to set the error state.
   */
  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    return fallback;
  }

  return (
    <div onError={handleError}>
      {children}
    </div>
  );
}
