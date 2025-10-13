import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { Search, MapPin, Home as HomeIcon, DollarSign } from "lucide-react";
import Button from "../ui/Button";

// 🌟 Animation fadeUp (apparition fluide vers le haut)
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero() {
  const [searchType, setSearchType] = useState<"vente" | "location">("vente");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const carouselImages = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1920",
    "https://images.unsplash.com/photo-1628745277862-bc0b2d68c50c?auto=format&fit=crop&q=80&w=1920",
    "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1920",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % carouselImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <section className="relative w-full overflow-hidden bg-white" id="home">
      {/* 🌅 Carousel d'images en arrière-plan */}
      {carouselImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image}
            alt={`Real estate ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/80 to-white"></div>
        </div>
      ))}

      {/* 🏡 Section principale */}
      <div className="relative py-24 md:py-28 lg:py-32 px-6 md:px-12 lg:px-20 text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-navy-800 leading-tight mb-6"
        >
          Trouvez la propriété{" "}
          <span className="block bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#FF9800] bg-clip-text text-transparent">
            de vos rêves
          </span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 1, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-lg md:text-2xl text-gray-700 mb-10 font-sans max-w-3xl mx-auto"
        >
          Expertise immobilière, accompagnement personnalisé et service
          d’excellence pour chaque projet.
        </motion.p>

        {/* 🔍 Barre de recherche */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-100"
        >
          <div className="flex gap-4 mb-6 justify-center">
            <button
              onClick={() => setSearchType("vente")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                searchType === "vente"
                  ? "bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#FF9800] text-black shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Acheter
            </button>
            <button
              onClick={() => setSearchType("location")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                searchType === "location"
                  ? "bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#FF9800] text-black shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Louer
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FFD700] w-5 h-5" />
              <input
                type="text"
                placeholder="Ville, quartier ou adresse"
                className="w-full pl-11 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#FFD700] transition-colors"
              />
            </div>

            <div className="relative">
              <HomeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FFD700] w-5 h-5" />
              <select className="w-full pl-11 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#FFD700]">
                <option value="">Type de bien</option>
                <option value="appartement">Appartement</option>
                <option value="maison">Maison</option>
                <option value="villa">Villa</option>
                <option value="studio">Studio</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>

            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FFD700] w-5 h-5" />
              <select className="w-full pl-11 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#FFD700]">
                <option value="">Budget</option>
                {searchType === "vente" ? (
                  <>
                    <option value="0-200000">0 - 200 000€</option>
                    <option value="200000-400000">200 000 - 400 000€</option>
                    <option value="400000-600000">400 000 - 600 000€</option>
                    <option value="600000+">Plus de 600 000€</option>
                  </>
                ) : (
                  <>
                    <option value="0-800">0 - 800€/mois</option>
                    <option value="800-1200">800 - 1 200€/mois</option>
                    <option value="1200-1800">1 200 - 1 800€/mois</option>
                    <option value="1800+">Plus de 1 800€/mois</option>
                  </>
                )}
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Button
              variant="primary"
              size="lg"
              className="min-w-[200px] bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#FF9800] text-black font-semibold"
            >
              <Search className="w-5 h-5 mr-2" />
              Rechercher
            </Button>
          </div>
        </motion.div>

        {/* 📊 Statistiques */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12"
        >
          {[
            { value: "500+", label: "Biens disponibles" },
            { value: "15", label: "Ans d'expertise" },
            { value: "2000+", label: "Clients satisfaits" },
            { value: "98%", label: "Taux de satisfaction" },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl font-bold text-navy-700">{item.value}</p>
              <p className="text-gray-600 mt-2">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
