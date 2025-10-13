import { Search, MapPin, Home as HomeIcon, DollarSign } from "lucide-react";
import { useState } from "react";
import Button from "./ui/Button";

export default function Hero() {
  const [searchType, setSearchType] = useState<"vente" | "location">("vente");

  return (
    <section
      className="relative bg-gradient-to-br from-navy-50 via-white to-gold-50 py-20 overflow-hidden"
      id="accueil"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gold-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-navy-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-navy-500 mb-6 leading-tight">
            Trouvez la propriété
            <span className="block text-gold-500">de vos rêves</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 font-sans">
            Expertise immobilière, accompagnement personnalisé et service
            d'excellence
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-100">
          <div className="flex gap-4 mb-6 justify-center">
            <button
              onClick={() => setSearchType("vente")}
              className={`px-6 py-3 rounded-xl font-semibold font-display transition-all duration-300 ${
                searchType === "vente"
                  ? "bg-gold-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              aria-pressed={searchType === "vente"}
            >
              Acheter
            </button>
            <button
              onClick={() => setSearchType("location")}
              className={`px-6 py-3 rounded-xl font-semibold font-display transition-all duration-300 ${
                searchType === "location"
                  ? "bg-gold-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              aria-pressed={searchType === "location"}
            >
              Louer
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Ville, quartier ou adresse"
                className="w-full pl-11 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gold-500 transition-colors font-sans"
                aria-label="Localisation"
              />
            </div>

            <div className="relative">
              <HomeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-500 w-5 h-5" />
              <select
                className="w-full pl-11 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gold-500 transition-colors appearance-none bg-white font-sans"
                aria-label="Type de bien"
              >
                <option value="">Type de bien</option>
                <option value="appartement">Appartement</option>
                <option value="maison">Maison</option>
                <option value="villa">Villa</option>
                <option value="studio">Studio</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>

            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-500 w-5 h-5" />
              <select
                className="w-full pl-11 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gold-500 transition-colors appearance-none bg-white font-sans"
                aria-label="Budget"
              >
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
            <Button variant="primary" size="lg" className="min-w-[200px]">
              <Search className="w-5 h-5 mr-2" />
              Rechercher
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
          <div className="text-center">
            <p className="text-4xl font-bold text-navy-500 font-display">
              500+
            </p>
            <p className="text-gray-600 mt-2 font-sans">Biens disponibles</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-navy-500 font-display">15</p>
            <p className="text-gray-600 mt-2 font-sans">Ans d'expertise</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-navy-500 font-display">
              2000+
            </p>
            <p className="text-gray-600 mt-2 font-sans">Clients satisfaits</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-navy-500 font-display text-black">
              98%
            </p>
            <p className="text-gray-600 mt-2 font-sans">Taux de satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
}
