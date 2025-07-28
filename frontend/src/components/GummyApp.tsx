import React, { useState, useEffect } from 'react';
import { GummyAPI } from '../services/api';
import { DumpsterType, MaterialType, ServiceArea } from '../types';
import Header from './Header';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import LocationSelector from './LocationSelector';
import MaterialSelector from './MaterialSelector';
import DumpsterSelector from './DumpsterSelector';
import SelectionSummary from './SelectionSummary';
import Footer from './Footer';

function GummyApp(): React.JSX.Element {
  const [dumpsterTypes, setDumpsterTypes] = useState<DumpsterType[]>([]);
  const [materialTypes, setMaterialTypes] = useState<MaterialType[]>([]);
  const [serviceAreas, setServiceAreas] = useState<ServiceArea[]>([]);
  const [selectedDumpster, setSelectedDumpster] = useState<DumpsterType | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<ServiceArea | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [dumpsters, materials, serviceAreas] = await Promise.all([
          GummyAPI.getDumpsterTypes(),
          GummyAPI.getMaterialTypes(),
          GummyAPI.getServiceAreas(),
        ]);
        setDumpsterTypes(dumpsters);
        setMaterialTypes(materials);
        setServiceAreas(serviceAreas);
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

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <LocationSelector
          serviceAreas={serviceAreas}
          selectedLocation={selectedLocation}
          onLocationSelect={setSelectedLocation}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <MaterialSelector
          materialTypes={materialTypes}
          selectedMaterial={selectedMaterial}
          onMaterialSelect={setSelectedMaterial}
        />

        {/* Dumpster Selection */}
        <DumpsterSelector
          dumpsterTypes={dumpsterTypes}
          selectedDumpster={selectedDumpster}
          onDumpsterSelect={setSelectedDumpster}
        />

        <SelectionSummary
          selectedDumpster={selectedDumpster}
          selectedMaterial={selectedMaterial}
          getWeightRange={getWeightRange}
        />

        <Footer />
      </div>
    </div>
  );
};

export default GummyApp;
