export interface Barangay {
  id: number;   // PSGC
  name: string;
}

export const BARANGAYS: Record<string, Barangay[]> = {
  "Lipa City": [
    { id: 41014001, name: "Adya" },
    { id: 41014005, name: "Antipolo del Sur" },   
    { id: 41014069, name: "Tangob" },
  ],
  "Batangas City": [
    { id: 41005001, name: "Alangilan" },
    { id: 41005033, name: "Bolbok" },
    { id: 41005035, name: "Calicanto" },
    { id: 41005040, name: "Cuta" },
  ],
  "Rosario": [
    { id: 41021001, name: "Alupay" },
    { id: 41021003, name: "Bagong Pook" },
    { id: 41021007, name: "Bulihan" },
  ]
};
