export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Farm {
  id: number;
  name: string;
  owner_id: number | null;
  cityId: number;
  cityName: string;
  barangayName: string;
  coordinates: Coordinates;
  totalTrees: number;
  dnaVerifiedCount: number;
  hasDnaVerified: boolean;
  boundary: [number, number][]; // [lat, lng] polygon
}

export interface TreeData {
  id: number;
  farmId: number;        
  lat: number;
  lng: number;
  dnaVerified: boolean;
}
