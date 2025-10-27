import {
  Search,
  MapPin,
  Home as HomeIcon,
  DollarSign,
  ChevronDown,
  TrendingUp,
  Award,
  Users,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


export default function Hero() {
  const [searchType, setSearchType] = useState<"vente" | "location">("vente");
  const [city, setCity] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [budget, setBudget] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(
      `/properties?type=${searchType}&city=${city}&propertyType=${propertyType}&budget=${budget}`
    );
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      id="accueil"
    >
      {/* Image de fond avec overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop&q=80"
          alt="Luxury real estate"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#14204d]/80 via-[#14204d]/70 to-[#14204d]/60"></div>
        
        {/* Effets lumineux animés */}
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-[#FED9B7] rounded-full blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-[#f7b79c] rounded-full blur-3xl opacity-15"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Particules flottantes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#FED9B7] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10 py-20">
        {/* Stats en haut */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap justify-center gap-8 mb-12"
        >
          {[
            { icon: TrendingUp, value: "500+", label: "Propriétés vendues" },
            { icon: Award, value: "15 ans", label: "D'expérience" },
            { icon: Users, value: "98%", label: "Clients satisfaits" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/20 transition-all"
            >
              <stat.icon className="w-6 h-6 text-[#FED9B7]" />
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-white/80">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Titre principal avec animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-5xl mx-auto text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#FED9B7]" />
            <span className="text-sm text-white/90 font-medium">
              Immobilier Premium au Sénégal
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6">
            Trouvez la propriété
            <motion.span
              className="block bg-gradient-to-r from-[#FED9B7] via-[#f7b79c] to-[#FED9B7] text-transparent bg-clip-text"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% auto",
              }}
            >
              de vos rêves
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light"
          >
            Expertise immobilière, accompagnement personnalisé et service
            d'excellence pour concrétiser vos projets
          </motion.p>
        </motion.div>

        {/* Formulaire de recherche avec glassmorphism avancé */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 md:p-10 border border-white/20 hover:border-[#FED9B7]/50 transition-all duration-500">
            {/* Effet de brillance */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl pointer-events-none"></div>
            
            {/* Toggle Acheter/Louer */}
            <div className="flex gap-4 mb-8 justify-center relative z-10">
              {["vente", "location"].map((type) => (
                <motion.button
                  key={type}
                  onClick={() => setSearchType(type as "vente" | "location")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-8 py-4 rounded-2xl font-bold transition-all duration-500 overflow-hidden ${
                    searchType === type
                      ? "text-[#14204d]"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {searchType === type && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-[#FED9B7] to-[#f7b79c] rounded-2xl"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  {searchType !== type && (
                    <div className="absolute inset-0 bg-white/5 rounded-2xl" />
                  )}
                  <span className="relative z-10 text-lg">
                    {type === "vente" ? "Acheter" : "Louer"}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Champs de recherche */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 relative z-10">
              {/* Ville */}
              <motion.div
                whileHover={{ y: -2 }}
                className="relative group"
              >
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#FED9B7] w-5 h-5 transition-all group-hover:scale-110 z-10" />
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full pl-12 pr-10 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl focus:outline-none focus:border-[#FED9B7] transition-all appearance-none text-white font-medium hover:bg-white/20 cursor-pointer"
                  style={{
                    backgroundImage: "none",
                  }}
                >
                  <option value="" className="bg-[#14204d] text-white">
                    Ville, quartier...
                  </option>
                  <option value="Dakar" className="bg-[#14204d] text-white">
                    Dakar
                  </option>
                  <option value="Mbour" className="bg-[#14204d] text-white">
                    Mbour
                  </option>
                  <option value="Saint-Louis" className="bg-[#14204d] text-white">
                    Saint-Louis
                  </option>
                  <option value="Ziguinchor" className="bg-[#14204d] text-white">
                    Ziguinchor
                  </option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#FED9B7] w-5 h-5 pointer-events-none z-10" />
              </motion.div>

              {/* Type de bien */}
              <motion.div
                whileHover={{ y: -2 }}
                className="relative group"
              >
                <HomeIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#FED9B7] w-5 h-5 transition-all group-hover:scale-110 z-10" />
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full pl-12 pr-10 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl focus:outline-none focus:border-[#FED9B7] transition-all appearance-none text-white font-medium hover:bg-white/20 cursor-pointer"
                >
                  <option value="" className="bg-[#14204d] text-white">
                    Type de bien
                  </option>
                  <option value="appartement" className="bg-[#14204d] text-white">
                    Appartement
                  </option>
                  <option value="maison" className="bg-[#14204d] text-white">
                    Maison
                  </option>
                  <option value="villa" className="bg-[#14204d] text-white">
                    Villa
                  </option>
                  <option value="studio" className="bg-[#14204d] text-white">
                    Studio
                  </option>
                  <option value="commercial" className="bg-[#14204d] text-white">
                    Commercial
                  </option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#FED9B7] w-5 h-5 pointer-events-none z-10" />
              </motion.div>

              {/* Budget */}
              <motion.div
                whileHover={{ y: -2 }}
                className="relative group"
              >
                <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#FED9B7] w-5 h-5 transition-all group-hover:scale-110 z-10" />
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full pl-12 pr-10 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl focus:outline-none focus:border-[#FED9B7] transition-all appearance-none text-white font-medium hover:bg-white/20 cursor-pointer"
                >
                  <option value="" className="bg-[#14204d] text-white">
                    Budget
                  </option>
                  {searchType === "vente" ? (
                    <>
                      <option value="0-50M" className="bg-[#14204d] text-white">
                        0 - 50M F CFA
                      </option>
                      <option value="50M-100M" className="bg-[#14204d] text-white">
                        50M - 100M F CFA
                      </option>
                      <option value="100M-200M" className="bg-[#14204d] text-white">
                        100M - 200M F CFA
                      </option>
                      <option value="200M+" className="bg-[#14204d] text-white">
                        Plus de 200M F CFA
                      </option>
                    </>
                  ) : (
                    <>
                      <option value="0-200K" className="bg-[#14204d] text-white">
                        0 - 200K F CFA/mois
                      </option>
                      <option value="200K-400K" className="bg-[#14204d] text-white">
                        200K - 400K F CFA/mois
                      </option>
                      <option value="400K-600K" className="bg-[#14204d] text-white">
                        400K - 600K F CFA/mois
                      </option>
                      <option value="600K+" className="bg-[#14204d] text-white">
                        Plus de 600K F CFA/mois
                      </option>
                    </>
                  )}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#FED9B7] w-5 h-5 pointer-events-none z-10" />
              </motion.div>

              {/* Bouton Rechercher */}
              <motion.button
                onClick={handleSearch}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden bg-gradient-to-r from-[#FED9B7] to-[#f7b79c] text-[#14204d] px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-2xl transition-all flex items-center justify-center gap-3 group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#f7b79c] to-[#FED9B7]"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <Search className="w-5 h-5 relative z-10 group-hover:rotate-90 transition-transform duration-300" />
                <span className="text-lg relative z-10">Rechercher</span>
              </motion.button>
            </div>

            {/* Recherches populaires */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-3 justify-center items-center relative z-10"
            >
              <span className="text-white/70 text-sm">Recherches populaires:</span>
              {["Villa Almadies", "Appartement Mermoz", "Maison Fann"].map((term, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-sm hover:bg-white/10 transition-all"
                >
                  {term}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex justify-center mt-16"
        >
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-2 text-white/70"
          >
            <span className="text-sm font-medium">Découvrir</span>
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}