import { Bed, Bath, Maximize, MapPin, Heart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const featuredProperties = [
  {
    id: "1",
    title: "Villa moderne avec piscine",
    type: "villa",
    status: "vente",
    price: 185000000,
    location: "Almadies",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop",
    bedrooms: 5,
    bathrooms: 3,
    area: 220,
    badge: "coup-de-coeur" as const,
    reference: "SEN-001",
  },
  {
    id: "2",
    title: "Appartement standing",
    type: "appartement",
    status: "vente",
    price: 85000000,
    location: "Dakar Plateau",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    bedrooms: 3,
    bathrooms: 2,
    area: 95,
    badge: "exclusif" as const,
    reference: "SEN-002",
  },
  {
    id: "3",
    title: "Studio moderne centre-ville",
    type: "studio",
    status: "location",
    price: 250000,
    location: "Mermoz",
    image:
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&h=600&fit=crop",
    bedrooms: 1,
    bathrooms: 1,
    area: 32,
    badge: "nouveau" as const,
    reference: "SEN-003",
  },
  {
    id: "4",
    title: "Maison familiale avec jardin",
    type: "maison",
    status: "vente",
    price: 120000000,
    location: "Ngor",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
    bedrooms: 4,
    bathrooms: 2,
    area: 150,
    badge: "nouveau" as const,
    reference: "SEN-004",
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

  type BadgeType = "nouveau" | "exclusif" | "coup-de-coeur";

  const badgeVariants: Record<BadgeType, string> = {
    nouveau: "bg-gradient-to-r from-emerald-500 to-teal-600",
    exclusif: "bg-gradient-to-r from-purple-500 to-indigo-600",
    "coup-de-coeur": "bg-gradient-to-r from-rose-500 to-pink-600",
  };

  const badgeLabels: Record<BadgeType, string> = {
    nouveau: "Nouveau",
    exclusif: "Exclusif",
    "coup-de-coeur": "Coup de cœur",
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-[#fef9f8]" id="biens">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-5xl md:text-6xl text-[#14204d] font-bold mb-4 tracking-tight">
            Biens en{" "}
            <span className="bg-gradient-to-r from-[#FED9B7] via-[#f7b79c] to-[#fef9f8] text-transparent bg-clip-text">
              Vedette
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection de propriétés d'exception au Sénégal
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <motion.div
                    className={`${
                      badgeVariants[property.badge as BadgeType]
                    } text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {badgeLabels[property.badge as BadgeType]}
                  </motion.div>
                  <motion.div
                    className={`${
                      property.status === "vente"
                        ? "bg-gradient-to-r from-blue-500 to-blue-600"
                        : "bg-gradient-to-r from-orange-500 to-orange-600"
                    } text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {property.status === "vente" ? "À vendre" : "À louer"}
                  </motion.div>
                </div>

                {/* Favori */}
                <motion.button
                  onClick={() => toggleFavorite(property.id)}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2.5 rounded-full hover:bg-white transition-all shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
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
                </motion.button>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                  <motion.span
                    className="text-2xl font-bold text-[#14204d]"
                    whileHover={{ scale: 1.05 }}
                  >
                    {property.price.toLocaleString("fr-FR")} F CFA
                    {property.status === "location" && (
                      <span className="text-lg">/mois</span>
                    )}
                  </motion.span>
                </div>

                <h3 className="text-lg font-bold text-[#14204d] mb-3 group-hover:text-[#FED9B7] transition-colors line-clamp-2 min-h-[3.5rem] flex items-start">
                  {property.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#FED9B7] flex-shrink-0" />
                  {property.location}
                </p>

                <div className="flex items-center gap-5 text-gray-600 text-sm mb-6">
                  <div className="flex items-center gap-1.5">
                    <Bed className="w-4 h-4 text-[#FED9B7]" />
                    <span className="font-medium">{property.bedrooms}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Bath className="w-4 h-4 text-[#FED9B7]" />
                    <span className="font-medium">{property.bathrooms}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Maximize className="w-4 h-4 text-[#FED9B7]" />
                    <span className="font-medium">{property.area}m²</span>
                  </div>
                </div>

                {/* Bouton toujours aligné en bas */}
                <div className="mt-auto pt-4">
                  <Link to={`/property/${property.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-[#FED9B7] to-[#f7b79c] text-[#14204d] py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all"
                    >
                      Voir les détails
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/properties">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#FED9B7] to-[#f7b79c] text-[#14204d] px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Voir tous les biens
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}