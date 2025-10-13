export interface Property {
  id: string;
  title: string;
  type: "appartement" | "maison" | "villa" | "studio" | "commercial";
  status: "vente" | "location";
  price: number;
  location: {
    address: string;
    city: string;
    region: string;
    coordinates: { lat: number; lng: number };
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    area: number;
    floor?: number;
    hasElevator?: boolean;
    hasParking?: boolean;
    hasPool?: boolean;
    hasGarden?: boolean;
    hasSecurity?: boolean;
  };
  description: string;
  images: string[];
  badges?: ("nouveau" | "exclusif" | "coup-de-coeur")[];
  reference: string;
  agent?: {
    id: string;
    name: string;
    photo: string;
    phone: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface SearchFilters {
  location?: string;
  type?: Property["type"][];
  status: "vente" | "location";
  priceMin?: number;
  priceMax?: number;
  areaMin?: number;
  areaMax?: number;
  bedrooms?: number;
  hasParking?: boolean;
  hasPool?: boolean;
  hasGarden?: boolean;
  hasElevator?: boolean;
}

export interface Agent {
  id: string;
  name: string;
  title: string;
  photo: string;
  phone: string;
  email: string;
  bio: string;
  specialties: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
}
