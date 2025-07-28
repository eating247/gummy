import React from 'react';
import { ServiceArea } from '../types';

interface LocationSelectorProps {
  serviceAreas: ServiceArea[];
  selectedLocation: ServiceArea | null;
  onLocationSelect: (location: ServiceArea) => void;
}

function LocationSelector({
  serviceAreas,
  selectedLocation,
  onLocationSelect,
}: LocationSelectorProps): React.JSX.Element {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        📍 Select your location
      </h2>
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {serviceAreas.map(area => (
            <button
              key={area.id}
              onClick={() => onLocationSelect(area)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                selectedLocation?.id === area.id
                  ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200'
                  : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-25'
              }`}
            >
              <div className="font-semibold text-gray-900 mb-1">
                {area.city}, {area.state}
              </div>
              <div className="text-sm text-gray-600">
                {area.region} • {area.zipCode}
              </div>
            </button>
          ))}
        </div>

        {!selectedLocation && (
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center space-x-2">
              <div className="text-yellow-600">⚠️</div>
              <div className="text-sm text-yellow-700">
                Please select your location to see accurate pricing and weight
                limits.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LocationSelector;
