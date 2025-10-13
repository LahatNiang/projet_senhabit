import { useState } from "react";
import {
  Search,
  MapPin,
  Home,
  DollarSign,
  SlidersHorizontal,
  Grid,
  List,
  Bed,
  Bath,
  Maximize,
  Heart,
} from "lucide-react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";

const properties = [
  {
    id: "1",
    title: "Villa moderne avec piscine",
    type: "villa",
    status: "vente",
    price: 850000,
    location: "Neuilly-sur-Seine",
    image:
      "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=800",
    bedrooms: 5,
    bathrooms: 3,
    area: 220,
    badge: "coup-de-coeur" as const,
    reference: "ALT-001",
  },
  {
    id: "2",
    title: "Appartement haussmannien rénové",
    type: "appartement",
    status: "vente",
    price: 650000,
    location: "Paris 16ème",
    image:
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800",
    bedrooms: 3,
    bathrooms: 2,
    area: 95,
    badge: "exclusif" as const,
    reference: "ALT-002",
  },
  {
    id: "3",
    title: "Studio moderne centre-ville",
    type: "studio",
    status: "location",
    price: 1200,
    location: "Paris 11ème",
    image:
      "https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg?auto=compress&cs=tinysrgb&w=800",
    bedrooms: 1,
    bathrooms: 1,
    area: 32,
    badge: "nouveau" as const,
    reference: "ALT-003",
  },
  {
    id: "4",
    title: "Maison familiale avec jardin",
    type: "maison",
    status: "vente",
    price: 520000,
    location: "Boulogne-Billancourt",
    image:
      "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800",
    bedrooms: 4,
    bathrooms: 2,
    area: 150,
    badge: "nouveau" as const,
    reference: "ALT-004",
  },
  {
    id: "5",
    title: "Loft industriel avec terrasse",
    type: "appartement",
    status: "vente",
    price: 720000,
    location: "Paris 10ème",
    image:
      "https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg?auto=compress&cs=tinysrgb&w=800",
    bedrooms: 2,
    bathrooms: 1,
    area: 110,
    badge: "coup-de-coeur" as const,
    reference: "ALT-005",
  },
  {
    id: "6",
    title: "Appartement lumineux avec balcon",
    type: "appartement",
    status: "location",
    price: 1800,
    location: "Paris 15ème",
    image:
      "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=800",
    bedrooms: 3,
    bathrooms: 2,
    area: 85,
    badge: "nouveau" as const,
    reference: "ALT-006",
  },
];

export default function Properties() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const badgeVariants = {
    nouveau: "new" as const,
    exclusif: "exclusive" as const,
    "coup-de-coeur": "featured" as const,
  };

  const badgeLabels = {
    nouveau: "Nouveau",
    exclusif: "Exclusif",
    "coup-de-coeur": "Coup de coeur",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gold-50 py-12 animate-fadeIn">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-navy-500 mb-4">
            Nos Biens Immobiliers
          </h1>
          <p className="text-xl text-gray-600 font-sans">
            Découvrez notre sélection de propriétés exceptionnelles
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Localisation"
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>
            <div className="relative">
              <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-500 w-5 h-5" />
              <select className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gold-500 transition-colors appearance-none bg-white">
                <option>Type de bien</option>
                <option>Appartement</option>
                <option>Maison</option>
                <option>Villa</option>
                <option>Studio</option>
              </select>
            </div>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-500 w-5 h-5" />
              <select className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gold-500 transition-colors appearance-none bg-white">
                <option>Budget</option>
                <option>0 - 300 000€</option>
                <option>300 000 - 600 000€</option>
                <option>600 000+</option>
              </select>
            </div>
            <Button variant="primary">
              <Search className="w-5 h-5 mr-2" />
              Rechercher
            </Button>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-navy-500 hover:text-gold-500 transition-colors font-medium"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtres avancés
          </button>

          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4 animate-slideDown">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chambres
                </label>
                <select className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gold-500">
                  <option>Toutes</option>
                  <option>1+</option>
                  <option>2+</option>
                  <option>3+</option>
                  <option>4+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Surface (m²)
                </label>
                <select className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gold-500">
                  <option>Toutes</option>
                  <option>20 - 50</option>
                  <option>50 - 100</option>
                  <option>100+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Équipements
                </label>
                <div className="flex flex-wrap gap-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-gold-500"
                    />
                    Parking
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-gold-500"
                    />
                    Jardin
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-gold-500"
                    />
                    Piscine
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600 font-sans">
            <span className="font-bold text-navy-500">{properties.length}</span>{" "}
            biens disponibles
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-gold-500 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-gold-500 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "space-y-6"
          }
        >
          {properties.map((property) => (
            <Card key={property.id} className="group overflow-hidden">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant={badgeVariants[property.badge]}>
                    {badgeLabels[property.badge]}
                  </Badge>
                </div>
                <button
                  onClick={() => toggleFavorite(property.id)}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all shadow-lg"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.has(property.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600"
                    }`}
                  />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-navy-500 font-display">
                    {property.status === "vente"
                      ? `${property.price.toLocaleString("fr-FR")}€`
                      : `${property.price}€/mois`}
                  </span>
                </div>

                <h3 className="text-lg font-display font-bold text-navy-500 mb-2 group-hover:text-gold-500 transition-colors">
                  {property.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 flex items-center gap-1 font-sans">
                  <MapPin className="w-4 h-4 text-gold-500" />
                  {property.location}
                </p>

                <div className="flex items-center gap-4 text-gray-600 text-sm mb-4">
                  <div className="flex items-center gap-1">
                    <Bed className="w-4 h-4 text-gold-500" />
                    <span className="font-medium">{property.bedrooms}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="w-4 h-4 text-gold-500" />
                    <span className="font-medium">{property.bathrooms}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Maximize className="w-4 h-4 text-gold-500" />
                    <span className="font-medium">{property.area}m²</span>
                  </div>
                </div>

                <Link to={`/property/${property.id}`}>
                  <Button variant="outline" className="w-full">
                    Voir les détails
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
