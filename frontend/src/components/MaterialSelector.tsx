// components/MaterialSelector.tsx
import React from 'react';
import { MaterialType } from '../types';

interface MaterialSelectorProps {
  materialTypes: MaterialType[];
  selectedMaterial: MaterialType | null;
  onMaterialSelect: (material: MaterialType) => void;
}

function MaterialSelector({
  materialTypes,
  selectedMaterial,
  onMaterialSelect,
}: MaterialSelectorProps): React.JSX.Element {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        What are you throwing away?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {materialTypes.map(material => (
          <button
            key={material.id}
            onClick={() => onMaterialSelect(material)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
              selectedMaterial?.id === material.id
                ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200'
                : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-25'
            }`}
          >
            <div className="font-semibold text-gray-900 mb-1">
              {material.name}
            </div>
            <div className="text-sm text-gray-600">{material.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default MaterialSelector;
