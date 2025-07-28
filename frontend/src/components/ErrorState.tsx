import React from 'react';

interface ErrorStateProps {
  error: string;
}

export default function ErrorState({
  error,
}: ErrorStateProps): React.JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">😕</div>
        <div className="text-xl text-red-600 mb-4">Error: {error}</div>
        <button
          onClick={() => window.location.reload()}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
