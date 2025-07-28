import React, { useState, useEffect } from 'react';
import { GummyAPI } from '../services/api';

// Types
interface DumpsterType {
  id: number;
  sizeCubicYards: number;
  lengthFt: number;
  widthFt: number;
  heightFt: number;
}

interface MaterialType {
  id: number;
  name: string;
  category: string | null;
  description: string | null;
}

interface ServiceArea {
  id: number;
  zipCode: string;
  city: string | null;
  state: string | null;
  region: string | null;
  isActive: boolean;
}

const GummyApp: React.FC = () => {
  const [dumpsterTypes, setDumpsterTypes] = useState<DumpsterType[]>([]);
  const [materialTypes, setMaterialTypes] = useState<MaterialType[]>([]);
  const [selectedDumpster, setSelectedDumpster] = useState<DumpsterType | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [dumpsters, materials] = await Promise.all([
          GummyAPI.getDumpsterTypes(),
          GummyAPI.getMaterialTypes(),
        ]);
        setDumpsterTypes(dumpsters);
        setMaterialTypes(materials);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🍬</div>
          <div className="text-xl text-gray-600">Loading Gummy...</div>
        </div>
      </div>
    );
  }

  if (error) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <div className="text-4xl">🍬</div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
              <div className="bg-red-500 text-white p-4">
test tailwind
</div>
                <span className="text-purple-600">Gummy</span> Dumpster Rentals
              </h1>
              <p className="text-gray-600">Transparent pricing, no hidden fees</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Material Type Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What are you throwing away?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {materialTypes.map((material) => (
              <button
                key={material.id}
                onClick={() => setSelectedMaterial(material)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  selectedMaterial?.id === material.id
                    ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200'
                    : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-25'
                }`}
              >
                <div className="font-semibold text-gray-900 mb-1">{material.name}</div>
                <div className="text-sm text-gray-600">{material.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Dumpster Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose your dumpster size</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dumpsterTypes.map((dumpster) => (
              <div
                key={dumpster.id}
                className={`bg-white rounded-xl shadow-md border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedDumpster?.id === dumpster.id 
                    ? 'border-purple-500 ring-2 ring-purple-200' 
                    : 'border-gray-200 hover:border-purple-300'
                }`}
                onClick={() => setSelectedDumpster(dumpster)}
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
                      {dumpster.lengthFt}' L × {dumpster.widthFt}' W × {dumpster.heightFt}' H
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
                      selectedDumpster?.id === dumpster.id
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-700'
                    }`}
                  >
                    {selectedDumpster?.id === dumpster.id ? 'Selected' : 'Select This Size'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selection Summary */}
        {(selectedDumpster || selectedMaterial) && (
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
                      {selectedDumpster.lengthFt}' × {selectedDumpster.widthFt}' × {selectedDumpster.heightFt}'
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
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-gray-500">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h4 className="font-semibold text-gray-700 mb-2">✅ What's Included</h4>
            <p className="mb-2">
              All prices include delivery, pickup, disposal fees, weight allowance, administrative charges, 
              environmental fees, fuel surcharge, and taxes.
            </p>
            <p className="text-purple-600 font-semibold">No hidden fees guaranteed! 🍬</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GummyApp;