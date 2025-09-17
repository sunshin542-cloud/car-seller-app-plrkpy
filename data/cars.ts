
import { Car } from '../types/Car';

export const cars: Car[] = [
  {
    id: '1',
    brand: 'BMW',
    model: 'Série 3',
    year: 2020,
    price: 35000,
    mileage: 45000,
    fuel: 'Diesel',
    transmission: 'Automatique',
    color: 'Noir',
    description: 'BMW Série 3 en excellent état, entretien régulier, toutes options.',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1494905998402-395d579af36f?w=800&h=600&fit=crop'
    ],
    features: ['GPS', 'Climatisation', 'Sièges chauffants', 'Bluetooth', 'Caméra de recul'],
    condition: 'Excellent',
    location: 'Paris',
    contactPhone: '+33 6 12 34 56 78',
    contactEmail: 'contact@example.com'
  },
  {
    id: '2',
    brand: 'Audi',
    model: 'A4',
    year: 2019,
    price: 28000,
    mileage: 62000,
    fuel: 'Essence',
    transmission: 'Manuelle',
    color: 'Blanc',
    description: 'Audi A4 très bien entretenue, parfaite pour les longs trajets.',
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop'
    ],
    features: ['GPS', 'Climatisation', 'Régulateur de vitesse', 'Bluetooth'],
    condition: 'Très bon',
    location: 'Lyon',
    contactPhone: '+33 6 12 34 56 78',
    contactEmail: 'contact@example.com'
  },
  {
    id: '3',
    brand: 'Mercedes',
    model: 'Classe C',
    year: 2021,
    price: 42000,
    mileage: 25000,
    fuel: 'Hybride',
    transmission: 'Automatique',
    color: 'Gris',
    description: 'Mercedes Classe C hybride, économique et luxueuse.',
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop'
    ],
    features: ['GPS', 'Climatisation automatique', 'Sièges en cuir', 'Système audio premium', 'Assistance au stationnement'],
    condition: 'Excellent',
    location: 'Marseille',
    contactPhone: '+33 6 12 34 56 78',
    contactEmail: 'contact@example.com'
  },
  {
    id: '4',
    brand: 'Volkswagen',
    model: 'Golf',
    year: 2018,
    price: 18000,
    mileage: 78000,
    fuel: 'Essence',
    transmission: 'Manuelle',
    color: 'Rouge',
    description: 'Volkswagen Golf fiable et économique, parfaite pour la ville.',
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&h=600&fit=crop'
    ],
    features: ['Climatisation', 'Bluetooth', 'Régulateur de vitesse'],
    condition: 'Bon',
    location: 'Toulouse',
    contactPhone: '+33 6 12 34 56 78',
    contactEmail: 'contact@example.com'
  },
  {
    id: '5',
    brand: 'Tesla',
    model: 'Model 3',
    year: 2022,
    price: 48000,
    mileage: 15000,
    fuel: 'Électrique',
    transmission: 'Automatique',
    color: 'Bleu',
    description: 'Tesla Model 3 électrique, technologie de pointe et conduite autonome.',
    images: [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&h=600&fit=crop'
    ],
    features: ['Autopilot', 'Écran tactile 15"', 'Superchargeur', 'Mise à jour OTA', 'Caméras 360°'],
    condition: 'Excellent',
    location: 'Nice',
    contactPhone: '+33 6 12 34 56 78',
    contactEmail: 'contact@example.com'
  }
];
