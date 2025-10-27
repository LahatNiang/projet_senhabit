import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  Home,
  SlidersHorizontal,
  Grid,
  List,
  Bed,
  Bath,
  Maximize,
  Heart,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Building2,
  Key,
  Award,
  TrendingUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Images immobilières réalistes par type de bien
const propertyImages = {
  appartement: [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1574643156929-51fa098b0394?w=800&h=600&fit=crop",
  ],
  maison: [
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
  ],
  villa: [
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1601760562234-9814eea6663a?w=800&h=600&fit=crop",
  ],
  studio: [
    "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800&h=600&fit=crop",
  ],
};

// Génération avec images immobilières
const generateProperties = () => {
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
  const props = [];

  for (let i = 1; i <= 55; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const badge = badges[Math.floor(Math.random() * badges.length)];
    const status = i % 3 === 0 ? "location" : "vente";

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

    const imageArray = propertyImages[type as keyof typeof propertyImages];
    const image = imageArray[i % imageArray.length];

    props.push({
      id: i.toString(),
      title: `${
        type.charAt(0).toUpperCase() + type.slice(1)
      } moderne ${location}`,
      type,
      status,
      price,
      location,
      image,
      bedrooms,
      bathrooms,
      area,
      badge,
      reference: `SEN-${i.toString().padStart(3, "0")}`,
    });
  }
  return props;
};

const allProperties = generateProperties();

export default function Properties() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    status: "",
    minPrice: 0,
    maxPrice: Infinity,
    bedrooms: 0,
    area: 0,
    equipment: [] as string[],
  });

  const propertiesPerPage = 9;

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) newFavorites.delete(id);
    else newFavorites.add(id);
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

  const filteredProperties = useMemo(() => {
    return allProperties.filter((p) => {
      const locationMatch = filters.location
        ? p.location.toLowerCase().includes(filters.location.toLowerCase())
        : true;
      const typeMatch = filters.type ? p.type === filters.type : true;
      const statusMatch = filters.status ? p.status === filters.status : true;
      const priceMatch =
        p.price >= filters.minPrice && p.price <= filters.maxPrice;
      const bedroomsMatch = p.bedrooms >= filters.bedrooms;
      const areaMatch = p.area >= filters.area;
      const equipmentMatch = filters.equipment.length
        ? filters.equipment.includes(p.badge)
        : true;
      return (
        locationMatch &&
        typeMatch &&
        statusMatch &&
        priceMatch &&
        bedroomsMatch &&
        areaMatch &&
        equipmentMatch
      );
    });
  }, [filters]);

  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
  const displayedProperties = filteredProperties.slice(
    (currentPage - 1) * propertiesPerPage,
    currentPage * propertiesPerPage
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-[#fef9f8] py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section Améliorée */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 relative"
        >
          <motion.h1
            className="text-5xl md:text-6xl text-[#14204d] font-bold mb-4 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Nos Biens{" "}
            <span className="bg-gradient-to-r from-[#FED9B7] via-[#f7b79c] to-[#fef9f8] text-transparent bg-clip-text">
              Immobiliers
            </span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Découvrez notre sélection de propriétés haut de gamme
          </motion.p>

          {/* Stats avec icônes alignées */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg">
              <Building2 className="w-6 h-6 text-[#FED9B7]" />
              <div className="text-left">
                <p className="text-2xl font-bold text-[#14204d]">500+</p>
                <p className="text-sm text-gray-600">Propriétés</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg">
              <Key className="w-6 h-6 text-[#f7b79c]" />
              <div className="text-left">
                <p className="text-2xl font-bold text-[#14204d]">98%</p>
                <p className="text-sm text-gray-600">Satisfaction</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg">
              <Award className="w-6 h-6 text-[#FED9B7]" />
              <div className="text-left">
                <p className="text-2xl font-bold text-[#14204d]">15 ans</p>
                <p className="text-sm text-gray-600">Expertise</p>
              </div>
            </div>
          </motion.div>

          {/* Flèche de défilement */}
          <motion.div
            className="flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-8 h-8 text-[#FED9B7]" />
          </motion.div>
        </motion.div>

        {/* Filtres */}
        <motion.div
          className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-10 border border-white/20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="relative group">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#FED9B7] w-5 h-5 transition-all group-focus-within:scale-110" />
              <input
                type="text"
                placeholder="Localisation"
                value={filters.location}
                onChange={(e) => {
                  setFilters({ ...filters, location: e.target.value });
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#FED9B7] transition-all shadow-sm"
              />
            </div>

            <div className="relative group">
              <Home className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#FED9B7] w-5 h-5 transition-all group-focus-within:scale-110" />
              <select
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#FED9B7] transition-all appearance-none bg-white shadow-sm cursor-pointer"
                onChange={(e) => {
                  setFilters({ ...filters, type: e.target.value });
                  setCurrentPage(1);
                }}
              >
                <option value="">Type de bien</option>
                <option value="appartement">Appartement</option>
                <option value="maison">Maison</option>
                <option value="villa">Villa</option>
                <option value="studio">Studio</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>

            <div className="relative group">
              <TrendingUp className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#FED9B7] w-5 h-5 transition-all group-focus-within:scale-110" />
              <select
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#FED9B7] transition-all appearance-none bg-white shadow-sm cursor-pointer"
                onChange={(e) => {
                  setFilters({ ...filters, status: e.target.value });
                  setCurrentPage(1);
                }}
              >
                <option value="">Vente ou Location</option>
                <option value="vente">À vendre</option>
                <option value="location">À louer</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#FED9B7] to-[#f7b79c] text-[#14204d] px-6 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Rechercher
            </motion.button>
          </div>

          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-[#14204d] hover:text-[#FED9B7] transition-colors font-medium"
            whileHover={{ x: 5 }}
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filtres avancés
            <motion.div
              animate={{ rotate: showFilters ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-6 overflow-hidden"
              >
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Prix minimum (F CFA)
                  </label>
                  <input
                    type="number"
                    placeholder="Prix min"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#FED9B7] shadow-sm"
                    onChange={(e) => {
                      setFilters({
                        ...filters,
                        minPrice: Number(e.target.value) || 0,
                      });
                      setCurrentPage(1);
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Prix maximum (F CFA)
                  </label>
                  <input
                    type="number"
                    placeholder="Prix max"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#FED9B7] shadow-sm"
                    onChange={(e) => {
                      setFilters({
                        ...filters,
                        maxPrice: Number(e.target.value) || Infinity,
                      });
                      setCurrentPage(1);
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Chambres
                  </label>
                  <select
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#FED9B7] shadow-sm"
                    onChange={(e) => {
                      setFilters({
                        ...filters,
                        bedrooms: Number(e.target.value),
                      });
                      setCurrentPage(1);
                    }}
                  >
                    <option value="0">Toutes</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Surface (m²)
                  </label>
                  <select
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#FED9B7] shadow-sm"
                    onChange={(e) => {
                      setFilters({ ...filters, area: Number(e.target.value) });
                      setCurrentPage(1);
                    }}
                  >
                    <option value="0">Toutes</option>
                    <option value="20">20+</option>
                    <option value="50">50+</option>
                    <option value="100">100+</option>
                  </select>
                </div>

                <div className="md:col-span-4">
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Équipements
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {["nouveau", "exclusif", "coup-de-coeur"].map((equip) => (
                      <label
                        key={equip}
                        className="flex items-center gap-2 text-sm cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-[#FED9B7] focus:ring-[#FED9B7]"
                          onChange={(e) => {
                            const newEquip = [...filters.equipment];
                            if (e.target.checked) newEquip.push(equip);
                            else {
                              const index = newEquip.indexOf(equip);
                              if (index > -1) newEquip.splice(index, 1);
                            }
                            setFilters({ ...filters, equipment: newEquip });
                            setCurrentPage(1);
                          }}
                        />
                        {badgeLabels[equip as keyof typeof badgeLabels]}
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Vue et résultats */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <p className="text-gray-600 text-lg">
            <span className="font-bold text-[#14204d] text-2xl">
              {filteredProperties.length}
            </span>{" "}
            bien{filteredProperties.length !== 1 ? "s" : ""} disponible
            {filteredProperties.length !== 1 ? "s" : ""}
          </p>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode("grid")}
              className={`p-3 rounded-xl transition-all shadow-md ${
                viewMode === "grid"
                  ? "bg-gradient-to-r from-[#FED9B7] to-[#f7b79c] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Grid className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode("list")}
              className={`p-3 rounded-xl transition-all shadow-md ${
                viewMode === "list"
                  ? "bg-gradient-to-r from-[#FED9B7] to-[#f7b79c] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              <List className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Liste des biens */}
        <motion.div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "space-y-6"
          }
          layout
        >
          <AnimatePresence>
            {displayedProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
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

                <div className="p-6">
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

                  <h3 className="text-lg font-bold text-[#14204d] mb-3 group-hover:text-[#FED9B7] transition-colors line-clamp-2">
                    {property.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#FED9B7] flex-shrink-0" />
                    {property.location}
                  </p>

                  <div className="flex items-center gap-5 text-gray-600 text-sm mb-5">
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

                  <motion.button
                    onClick={() => navigate(`/properties/${property.id}`)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-[#FED9B7] to-[#f7b79c] text-[#14204d] py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all"
                  >
                    Voir les détails
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pagination améliorée */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-4 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            disabled={currentPage === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold shadow-md transition-all ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-[#14204d] hover:bg-[#FED9B7]"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Précédent
          </motion.button>

          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setCurrentPage(i + 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`w-12 h-12 rounded-xl font-bold shadow-md transition-all ${
                  currentPage === i + 1
                    ? "bg-gradient-to-r from-[#FED9B7] to-[#f7b79c] text-white scale-110"
                    : "bg-white text-[#14204d] hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </motion.button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (currentPage < totalPages) {
                setCurrentPage(currentPage + 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold shadow-md transition-all ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-[#14204d] hover:bg-[#FED9B7]"
            }`}
          >
            Suivant
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
