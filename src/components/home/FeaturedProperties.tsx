import { Bed, Bath, Maximize, MapPin, Heart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

const featuredProperties = [
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
  },
  {
    id: "2",
    title: "Appartement haussmannien",
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
  },
];

export default function FeaturedProperties() {
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
    <section
      className="py-20 bg-gradient-to-br from-gray-50 to-gold-50"
      id="biens"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[#14204d] font-serif font-bold text-navy-500 mb-4">
            Biens en Vedette
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-sans">
            Découvrez notre sélection de propriétés d'exception
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredProperties.map((property) => (
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
                  aria-label={
                    favorites.has(property.id)
                      ? "Retirer des favoris"
                      : "Ajouter aux favoris"
                  }
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
                    <span className="font-medium font-sans">
                      {property.bedrooms}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="w-4 h-4 text-gold-500" />
                    <span className="font-medium font-sans">
                      {property.bathrooms}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Maximize className="w-4 h-4 text-gold-500" />
                    <span className="font-medium font-sans">
                      {property.area}m²
                    </span>
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

        <div className="text-center">
          <Link to="/properties">
            <Button variant="primary" size="lg">
              Voir tous les biens
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
