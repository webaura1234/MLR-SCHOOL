'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        fontFamily: 'inherit',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Something went wrong</h2>
      <p style={{ color: '#666', maxWidth: '400px' }}>
        We ran into an unexpected error. Please try again.
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: '0.6rem 1.4rem',
          borderRadius: '6px',
          border: 'none',
          background: '#1a1a1a',
          color: '#fff',
          cursor: 'pointer',
          fontSize: '0.95rem',
        }}
      >
        Try again
      </button>
    </div>
  );
}

