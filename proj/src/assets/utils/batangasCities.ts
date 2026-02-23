// src/assets/utils/batangasCities.ts
import type { Coordinates } from "./types";

export interface City {
  id: number;
  name: string;
  path: Coordinates[];
  color: string;
  center?: Coordinates; // optional
}

export const BATANGAS_CITIES: City[] = [
  
  {
    id: 5,
    name: "Batangas City",
    center: { lat: 13.7561, lng: 121.0578 },
    path: [],
    color: "#42A5F5",
  },
  
  {
    id: 14,
    name: "Lipa City",
    center: { lat: 13.9414, lng: 121.1642 },
    path: [],
    color: "#29B6F6",
  },
  
  {
    id: 21,
    name: "Rosario",
    center: { lat: 13.8442, lng: 121.2036 },
    path: [],
    color: "#42A5F5",
  },  // Add more cities here
];
