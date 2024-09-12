// components/ErrorBoundary.js
'use client';
import { useState } from 'react';

export default function ErrorBoundary({ children, fallback }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return fallback;
  }

  return (
    <div onError={() => setHasError(true)}>
      {children}
    </div>
  );
}
