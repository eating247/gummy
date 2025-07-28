export interface DumpsterType {
  id: number;
  sizeCubicYards: number;
  lengthFt: number;
  widthFt: number;
  heightFt: number;
}

export interface MaterialType {
  id: number;
  name: string;
  category: string | null;
  description: string | null;
}

export interface ServiceArea {
  id: number;
  zipCode: string;
  city: string | null;
  state: string | null;
  region: string | null;
  isActive: boolean;
}
