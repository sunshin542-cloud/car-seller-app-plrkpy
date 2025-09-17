
export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: 'Essence' | 'Diesel' | 'Électrique' | 'Hybride';
  transmission: 'Manuelle' | 'Automatique';
  color: string;
  description: string;
  images: string[];
  features: string[];
  condition: 'Excellent' | 'Très bon' | 'Bon' | 'Correct';
  location: string;
  contactPhone: string;
  contactEmail: string;
}
