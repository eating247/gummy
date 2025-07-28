import React from 'react';
import { DumpsterType } from '../types';
import DumpsterCard from './DumpsterCard';

interface DumpsterSelectorProps {
  dumpsterTypes: DumpsterType[];
  selectedDumpster: DumpsterType | null;
  onDumpsterSelect: (dumpster: DumpsterType) => void;
}

function DumpsterSelector({
  dumpsterTypes,
  selectedDumpster,
  onDumpsterSelect,
}: DumpsterSelectorProps): React.JSX.Element {
  const getWeightRange = (sizeYards: number): string => {
    switch (sizeYards) {
      case 10:
      case 15:
        return '2-3 tons';
      case 20:
        return '3-4 tons';
      case 30:
        return '4-5 tons';
      case 40:
        return '5-6 tons';
      default:
        return 'Varies';
    }
  };

  const getRecommendation = (sizeYards: number): string => {
    switch (sizeYards) {
      case 10:
        return 'Small cleanouts, bathroom renovations, garage cleanouts';
      case 15:
        return 'Medium bathroom renovations, small kitchen remodels, closet cleanouts';
      case 20:
        return 'Medium renovations, roofing projects, flooring removal';
      case 30:
        return 'Large renovations, home additions, major cleanouts';
      case 40:
        return 'Commercial projects, large construction, whole house cleanouts';
      default:
        return 'Various projects';
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Choose your dumpster size
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dumpsterTypes.map(dumpster => (
          <DumpsterCard
            key={dumpster.id}
            dumpster={dumpster}
            isSelected={selectedDumpster?.id === dumpster.id}
            onSelect={onDumpsterSelect}
            getWeightRange={getWeightRange}
            getRecommendation={getRecommendation}
          />
        ))}
      </div>
    </div>
  );
}

export default DumpsterSelector;
