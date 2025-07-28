// components/Header.tsx
import React from 'react';

export default function Header(): React.JSX.Element {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center space-x-3">
          <div className="text-4xl">🍬</div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              <span className="text-purple-600">Gummy</span> Dumpster Rentals
            </h1>
            <p className="text-gray-600">Transparent pricing, no hidden fees</p>
          </div>
        </div>
      </div>
    </div>
  );
}
