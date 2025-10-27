import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  Heart,
  Share2,
  Phone,
  Mail,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Building2,
  Wifi,
  Car,
  Zap,
  Droplet,
  Shield,
  X,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Images par type (les mêmes que Properties.tsx)
const propertyImages = {
  appartement: [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
  ],
  maison: [
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
  ],
  villa: [
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop",
  ],
  studio: [
    "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800&h=600&fit=crop",
  ],
};

// Génération des détails d'une propriété (même logique que Properties.tsx)
const getPropertyDetails = (id: string) => {
  const types = ["appartement", "maison", "villa", "studio"];
  const locations = [
    "Dakar Plateau",
    "Mermoz",
    "Fann",
    "Almadies",
    "Ngor",
    "Hann",
  ];
  const badges = ["nouveau", "exclusif", "coup-de-coeur"];

  const numId = parseInt(id);
  const type = types[numId % types.length];
  const location = locations[numId % locations.length];
  const badge = badges[numId % badges.length];
  const status = numId % 3 === 0 ? "location" : "vente";

  const price =
    type === "studio"
      ? status === "location"
        ? 150000 + Math.floor(Math.random() * 100000)
        : 25000000 + Math.floor(Math.random() * 25000000)
      : status === "location"
      ? 200000 + Math.floor(Math.random() * 500000)
      : 35000000 + Math.floor(Math.random() * 165000000);

  const bedrooms = type === "studio" ? 1 : Math.ceil(Math.random() * 5);
  const bathrooms = Math.ceil(Math.random() * 3);
  const area =
    type === "studio"
      ? 20 + Math.floor(Math.random() * 30)
      : 50 + Math.floor(Math.random() * 250);

  const images = propertyImages[type as keyof typeof propertyImages];

  return {
    id,
    title: `${
      type.charAt(0).toUpperCase() + type.slice(1)
    } moderne ${location}`,
    type,
    status,
    price,
    location,
    images,
    bedrooms,
    bathrooms,
    area,
    badge,
    reference: `SEN-${id.padStart(3, "0")}`,
    description: `Magnifique ${type} situé dans le quartier prisé de ${location}. Ce bien d'exception offre des prestations haut de gamme avec une vue imprenable et un agencement optimisé pour votre confort. Idéal pour une famille ou un investissement locatif de qualité.`,
    features: [
      "Cuisine équipée moderne",
      "Climatisation",
      "Parking privé",
      "Sécurité 24/7",
      "Internet fibre",
      "Eau courante",
      "Terrasse",
      "Finitions luxueuses",
    ],
  };
};

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!id) {
    navigate("/properties");
    return null;
  }

  const property = getPropertyDetails(id);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
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

  const statusVariants = {
    vente: "bg-gradient-to-r from-blue-500 to-blue-600",
    location: "bg-gradient-to-r from-orange-500 to-orange-600",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-[#fef9f8] py-12">
      <div className="container mx-auto px-4">
        {/* Bouton retour - même style que Properties */}
        <motion.button
          onClick={() => navigate("/properties")}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, x: -5 }}
          className="flex items-center gap-2 text-[#14204d] hover:text-[#FED9B7] mb-8 font-medium transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Retour aux propriétés
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-8">
            {/* Galerie d'images - Style cohérent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl h-96 lg:h-[500px] group"
            >
              <motion.img
                key={currentImageIndex}
                src={property.images[currentImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 cursor-pointer"
                onClick={() => setLightboxOpen(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Navigation images */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all shadow-lg"
              >
                <ChevronLeft className="w-6 h-6 text-[#14204d]" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all shadow-lg"
              >
                <ChevronRight className="w-6 h-6 text-[#14204d]" />
              </motion.button>

              {/* Indicateurs */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {property.images.map((_, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    whileHover={{ scale: 1.2 }}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentImageIndex
                        ? "bg-[#FED9B7] w-8"
                        : "bg-white/70 w-2"
                    }`}
                  />
                ))}
              </div>

              {/* Badges - même style que Properties */}
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
                    statusVariants[
                      property.status as keyof typeof statusVariants
                    ]
                  } text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg`}
                  whileHover={{ scale: 1.05 }}
                >
                  {property.status === "vente" ? "À vendre" : "À louer"}
                </motion.div>
              </div>

              {/* Actions - même style */}
              <div className="absolute top-4 right-4 flex gap-2">
                <motion.button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="bg-white/90 backdrop-blur-sm p-2.5 rounded-full hover:bg-white transition-all shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
                    }`}
                  />
                </motion.button>
                <motion.button
                  className="bg-white/90 backdrop-blur-sm p-2.5 rounded-full hover:bg-white transition-all shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Share2 className="w-5 h-5 text-gray-600" />
                </motion.button>
              </div>
            </motion.div>

            {/* Informations principales - Style cohérent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-bold text-[#14204d] mb-3">
                    {property.title}
                  </h1>
                  <p className="text-gray-600 flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-[#FED9B7]" />
                    {property.location}
                  </p>
                  <p className="text-sm text-gray-500">
                    Référence : {property.reference}
                  </p>
                </div>
                <div className="text-right">
                  <motion.p
                    className="text-3xl font-bold text-[#14204d]"
                    whileHover={{ scale: 1.05 }}
                  >
                    {property.price.toLocaleString("fr-FR")} F CFA
                  </motion.p>
                  {property.status === "location" && (
                    <p className="text-gray-600 text-lg">/mois</p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    ≈{" "}
                    {Math.round(property.price / property.area).toLocaleString(
                      "fr-FR"
                    )}{" "}
                    F CFA/m²
                  </p>
                </div>
              </div>

              {/* Caractéristiques - même style que Properties */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 pb-8 border-b border-gray-200">
                <motion.div
                  className="bg-gradient-to-br from-[#FED9B7]/20 to-[#f7b79c]/20 p-5 rounded-2xl"
                  whileHover={{ scale: 1.05 }}
                >
                  <Bed className="w-6 h-6 text-[#FED9B7] mb-2" />
                  <p className="text-2xl font-bold text-[#14204d]">
                    {property.bedrooms}
                  </p>
                  <p className="text-sm text-gray-600">Chambres</p>
                </motion.div>
                <motion.div
                  className="bg-gradient-to-br from-[#FED9B7]/20 to-[#f7b79c]/20 p-5 rounded-2xl"
                  whileHover={{ scale: 1.05 }}
                >
                  <Bath className="w-6 h-6 text-[#FED9B7] mb-2" />
                  <p className="text-2xl font-bold text-[#14204d]">
                    {property.bathrooms}
                  </p>
                  <p className="text-sm text-gray-600">Salles de bain</p>
                </motion.div>
                <motion.div
                  className="bg-gradient-to-br from-[#FED9B7]/20 to-[#f7b79c]/20 p-5 rounded-2xl"
                  whileHover={{ scale: 1.05 }}
                >
                  <Maximize className="w-6 h-6 text-[#FED9B7] mb-2" />
                  <p className="text-2xl font-bold text-[#14204d]">
                    {property.area}
                  </p>
                  <p className="text-sm text-gray-600">m²</p>
                </motion.div>
                <motion.div
                  className="bg-gradient-to-br from-[#FED9B7]/20 to-[#f7b79c]/20 p-5 rounded-2xl"
                  whileHover={{ scale: 1.05 }}
                >
                  <Building2 className="w-6 h-6 text-[#FED9B7] mb-2" />
                  <p className="text-2xl font-bold text-[#14204d] capitalize">
                    {property.type}
                  </p>
                  <p className="text-sm text-gray-600">Type</p>
                </motion.div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#14204d] mb-4">
                  Description
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Équipements - Style cohérent */}
              <div>
                <h2 className="text-2xl font-bold text-[#14204d] mb-4">
                  Équipements
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center gap-3 text-gray-700"
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-[#FED9B7] to-[#f7b79c] rounded-lg flex items-center justify-center flex-shrink-0">
                        {idx % 6 === 0 && (
                          <Wifi className="w-4 h-4 text-white" />
                        )}
                        {idx % 6 === 1 && (
                          <Zap className="w-4 h-4 text-white" />
                        )}
                        {idx % 6 === 2 && (
                          <Car className="w-4 h-4 text-white" />
                        )}
                        {idx % 6 === 3 && (
                          <Shield className="w-4 h-4 text-white" />
                        )}
                        {idx % 6 === 4 && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                        {idx % 6 === 5 && (
                          <Droplet className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span className="text-sm font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Formulaire de contact - Style cohérent */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl sticky top-8 border border-white/20">
              <h3 className="text-xl font-bold text-[#14204d] mb-6">
                Contactez-nous
              </h3>

              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Votre nom"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#FED9B7] transition-all shadow-sm"
                />
                <input
                  type="email"
                  placeholder="Votre email"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#FED9B7] transition-all shadow-sm"
                />
                <input
                  type="tel"
                  placeholder="Votre téléphone"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#FED9B7] transition-all shadow-sm"
                />
                <textarea
                  placeholder="Votre message"
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#FED9B7] resize-none transition-all shadow-sm"
                  defaultValue={`Je suis intéressé(e) par le bien ${property.reference}`}
                />

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#FED9B7] to-[#f7b79c] text-[#14204d] py-3 rounded-2xl font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Envoyer le message
                </motion.button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white border-2 border-[#FED9B7] text-[#14204d] py-3 rounded-2xl font-bold hover:bg-[#FED9B7]/10 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Phone className="w-5 h-5" />
                  Appeler maintenant
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white border-2 border-[#FED9B7] text-[#14204d] py-3 rounded-2xl font-bold hover:bg-[#FED9B7]/10 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Calendar className="w-5 h-5" />
                  Planifier une visite
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lightbox - même style */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <motion.button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.1 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>
            <motion.img
              src={property.images[currentImageIndex]}
              alt={property.title}
              className="max-w-full max-h-full rounded-2xl object-contain shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
