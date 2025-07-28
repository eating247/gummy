import React from 'react';

import { DumpsterType } from '../types';

interface DumpsterCardProps {
  dumpster: DumpsterType;
  isSelected: boolean;
  onSelect: (dumpster: DumpsterType) => void;
  getWeightRange: (sizeYards: number) => string;
  getRecommendation: (sizeYards: number) => string;
}

export default function DumpsterCard({
  dumpster,
  isSelected,
  onSelect,
  getWeightRange,
  getRecommendation,
}: DumpsterCardProps): React.JSX.Element {
  return (
    <div
      className={`bg-white rounded-xl shadow-md border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
        isSelected
          ? 'border-purple-500 ring-2 ring-purple-200'
          : 'border-gray-200 hover:border-purple-300'
      }`}
      onClick={() => onSelect(dumpster)}
    >
      <div className="p-6">
        {/* Size Header */}
        <div className="text-center mb-4">
          <h3 className="text-3xl font-bold text-gray-900 mb-1">
            {dumpster.sizeCubicYards} Yard
          </h3>
          <div className="text-sm text-gray-500">Cubic Yards</div>
        </div>

        {/* Dimensions */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h4 className="font-semibold text-gray-700 mb-2">Dimensions</h4>
          <p className="text-gray-600">
            {dumpster.lengthFt}' L × {dumpster.widthFt}' W × {dumpster.heightFt}
            ' H
          </p>
        </div>

        {/* Weight Limit */}
        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          <h4 className="font-semibold text-blue-700 mb-2">Weight Limit</h4>
          <p className="text-blue-600">
            {getWeightRange(dumpster.sizeCubicYards)}*
          </p>
          <p className="text-xs text-blue-500 mt-1">
            *Varies by location and material
          </p>
        </div>

        {/* Best For */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-700 mb-2">Best For</h4>
          <p className="text-sm text-gray-600">
            {getRecommendation(dumpster.sizeCubicYards)}
          </p>
        </div>

        {/* Select Button */}
        <button
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors duration-200 ${
            isSelected
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-700'
          }`}
        >
          {isSelected ? 'Selected' : 'Select This Size'}
        </button>
      </div>
    </div>
  );
}
