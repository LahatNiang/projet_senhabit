import { useState } from "react";
import { Home, Phone, Mail, Menu, X, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Button from "../ui/Button";

export default function HeaderEnhanced() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Accueil", path: "/" },
    { name: "Nos biens", path: "/properties" },
    { name: "À propos", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Admin", path: "/admin" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white/90 backdrop-blur-xl shadow-md"
      role="banner"
    >
      <div className="container mx-auto px-4 relative">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
            aria-label="Altis Immobilier - Accueil"
          >
            <div className="relative">
              {/* Halo doré subtil */}
              <div className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-60 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/50 via-[#FFC107]/30 to-[#FF9800]/50 blur-xl animate-pulse-slow"></div>
              </div>

              {/* Symbole du logo */}
              <div className="relative bg-[##FFFFFF000] p-3 rounded-xl shadow-lg group-hover:shadow-2xl group-hover:scale-105 transition-all duration-300">
                <Home className="w-7 h-7 text-transparent bg-clip-text bg-gradient-to-br from-[#FFD700] via-[#FFC107] to-[#FF9800]" />
                <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-[#FFD700] opacity-80 animate-pulse" />
              </div>
            </div>

            {/* Texte du logo */}
            <div>
              <h1 className="text-3xl font-bold text-[#14204d]">
                Sen{" "}
                <span className="text-3xl font-bold text-[#14204d]">
                  Habita
                </span>
              </h1>
              <p className="text-xs text-gray-600 font-sans">
                Votre expert en immobilier
              </p>
            </div>
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden lg:flex items-center gap-8" role="navigation">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative font-medium font-sans group transition-all duration-300"
                >
                  <span
                    className={`inline-block transition-all duration-300 ${
                      isActive
                        ? "text-transparent bg-clip-text bg-gradient-to-br from-[#FFD700] via-[#FFC107] to-[#FF9800]"
                        : "text-[#14204d] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br group-hover:from-[#FFD700] group-hover:via-[#FFC107] group-hover:to-[#FF9800]"
                    }`}
                  >
                    {item.name}
                  </span>
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#FF9800] transition-all duration-500 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Contacts et bouton */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+33123456789"
              className="flex items-center gap-2 text-[#14204d] group transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-br hover:from-[#FFD700] hover:via-[#FFC107] hover:to-[#FF9800]"
            >
              <div className="p-2 bg-white/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-4 h-4 text-[#FFD700]" />
              </div>
              <span className="text-sm font-medium">+33 1 23 45 67 89</span>
            </a>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700] via-[#FFC107] to-[#FF9800] rounded-xl blur opacity-20 group-hover:opacity-50 transition-opacity"></div>
              <Button variant="primary" size="md" className="relative">
                <Mail className="w-4 h-4 mr-2 text-white" />
                Estimer mon bien
              </Button>
            </div>
          </div>

          {/* Menu mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#14204d] hover:bg-[#14204d]/10 rounded-lg transition-all duration-300 hover:scale-110"
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav
            className="lg:hidden py-4 border-t border-[#FFD700]/30 backdrop-blur-xl bg-white/90 transition-all duration-500"
            role="navigation"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-br from-[#FFD700] via-[#FFC107] to-[#FF9800] text-[#14204d] shadow-lg"
                        : "text-[#14204d] hover:bg-[#14204d]/10"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-[#FFD700]/30 flex flex-col gap-3">
                <Button variant="primary" className="w-full">
                  <Mail className="w-4 h-4 mr-2 text-white" />
                  Estimer mon bien
                </Button>
                <a
                  href="tel:+33123456789"
                  className="flex items-center justify-center gap-2 text-[#14204d] py-2 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-br hover:from-[#FFD700] hover:via-[#FFC107] hover:to-[#FF9800]"
                >
                  <Phone className="w-4 h-4 text-[#FFD700]" />
                  +33 1 23 45 67 89
                </a>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
