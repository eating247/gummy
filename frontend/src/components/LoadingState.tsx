import React from 'react';

export default function LoadingState(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🍬</div>
        <div className="text-xl text-gray-600">Loading Gummy...</div>
      </div>
    </div>
  );
}
