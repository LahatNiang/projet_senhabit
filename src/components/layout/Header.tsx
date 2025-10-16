import React from "react";
import { Home } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-[#0a0f2c]/90 backdrop-blur-md border-b border-[#14204d] shadow-lg z-50 px-6 py-3 flex justify-between items-center">
      {/* --- LOGO --- */}
      <a
        href="/"
        className="flex items-center gap-3 group"
        aria-label="SenHabita - Accueil"
      >
        {/* === Conteneur lumineux === */}
        <div className="relative p-[3px] rounded-2xl overflow-hidden group">
          {/* halo lumineux animé */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700] via-[#FFC107] to-[#FF9800] opacity-30 blur-xl" />
            <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.4),transparent)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000" />
          </div>

          {/* icône principale */}
          <div className="relative bg-[#14204d] p-3 rounded-xl shadow-md group-hover:shadow-[0_0_15px_rgba(255,215,0,0.3)] group-hover:scale-[1.05] transition-all duration-300">
            <Home className="w-7 h-7 text-transparent bg-gradient-to-br from-[#FFD700] via-[#FFC107] to-[#FF9800] bg-clip-text" />
          </div>
        </div>

        {/* texte du logo */}
        <div>
          <h1 className="text-2xl font-display font-bold bg-gradient-to-br from-[#FFD700] via-[#FFC107] to-[#FF9800] bg-clip-text text-transparent drop-shadow-sm">
            SenHabita
          </h1>
          <p className="text-xs text-gray-400 font-sans">
            Votre expert en immobilier
          </p>
        </div>
      </a>

      {/* --- NAVIGATION --- */}
      <nav className="hidden lg:flex items-center gap-8">
        {[
          { href: "#accueil", label: "Accueil" },
          { href: "#biens", label: "Nos biens" },
          { href: "#services", label: "Services" },
          { href: "#about", label: "À propos" },
          { href: "#blog", label: "Blog" },
          { href: "#contact", label: "Contact" },
           { href: "#admin", label: "Admin" },
          
        ].map((item) => (
          <a key={item.href} href={item.href} className="relative group">
            {/* Texte avec effet gradient au survol */}
            <span
              className="
                inline-block text-gray-300 font-medium font-sans
                transition-all duration-300 group-hover:-translate-y-1
              "
            >
              <span
                className="
                  transition-all duration-300
                  group-hover:text-transparent
                  group-hover:bg-clip-text
                  group-hover:bg-gradient-to-br
                  group-hover:from-[#FFD700]
                  group-hover:via-[#FFC107]
                  group-hover:to-[#FF9800]
                  inline-block
                "
              >
                {item.label}
              </span>
            </span>

            {/* soulignement dégradé */}
            <span
              className="
                absolute left-0 -bottom-1 h-[2px] w-0
                bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#FF9800]
                group-hover:w-full transition-all duration-500
              "
            />
          </a>
        ))}
      </nav>

      {/* --- ICÔNE ou CTA (optionnel) --- */}
      <div className="hidden lg:flex items-center">
        <button className="p-2 rounded-lg bg-[#14204d] hover:shadow-[0_0_15px_rgba(255,215,0,0.4)] transition-all">
          <Home className="w-5 h-5 text-transparent bg-gradient-to-br from-[#FFD700] via-[#FFC107] to-[#FF9800] bg-clip-text" />
        </button>
      </div>
    </header>
  );
};

export default Header;
