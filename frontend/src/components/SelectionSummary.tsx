import React from 'react';
import { DumpsterType, MaterialType } from '../types';

interface SelectionSummaryProps {
  selectedDumpster: DumpsterType | null;
  selectedMaterial: MaterialType | null;
  getWeightRange: (sizeYards: number) => string;
}

export default function SelectionSummary({
  selectedDumpster,
  selectedMaterial,
  getWeightRange,
}: SelectionSummaryProps): React.JSX.Element | null {
  if (!selectedDumpster && !selectedMaterial) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Your Selection</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {selectedDumpster && (
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Dumpster Size</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-lg font-semibold text-purple-600 mb-1">
                {selectedDumpster.sizeCubicYards} Cubic Yards
              </div>
              <div className="text-sm text-gray-600">
                {selectedDumpster.lengthFt}' × {selectedDumpster.widthFt}' ×{' '}
                {selectedDumpster.heightFt}'
              </div>
              <div className="text-sm text-gray-600">
                Weight limit: {getWeightRange(selectedDumpster.sizeCubicYards)}
              </div>
            </div>
          </div>
        )}

        {selectedMaterial && (
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Material Type</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-lg font-semibold text-purple-600 mb-1">
                {selectedMaterial.name}
              </div>
              <div className="text-sm text-gray-600">
                {selectedMaterial.description}
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedDumpster && selectedMaterial && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button className="bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200 text-lg">
            Get Your Quote →
          </button>
        </div>
      )}
    </div>
  );
}
