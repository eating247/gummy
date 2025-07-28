// API Response wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// Dumpster Types
export interface DumpsterType {
  id: number;
  sizeCubicYards: number;
  lengthFt: number;
  widthFt: number;
  heightFt: number;
}

// Material Types
export interface MaterialType {
  id: number;
  name: string;
  category: string | null;
  description: string | null;
}

// Service Areas
export interface ServiceArea {
  id: number;
  zipCode: string;
  city: string | null;
  state: string | null;
  region: string | null;
  isActive: boolean;
}

// Quote Request (for future use)
export interface QuoteRequest {
  dumpsterTypeId: number;
  serviceAreaId: number;
  materialTypeId: number;
  rentalDays: number;
  customerEmail?: string;
  customerName?: string;
  projectDescription?: string;
}
