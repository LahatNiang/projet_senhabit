import { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Button from "../ui/Button";
import Logo from "../ui/Logo";

export default function HeaderEnhanced() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Accueil", path: "/" },
    { name: "Nos biens", path: "/properties" },
    { name: "À propos", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-white/80 backdrop-blur-2xl shadow-2xl shadow-[#FED9B7]/30"
          : "bg-white/60 backdrop-blur-xl"
      }`}
      role="banner"
    >
      {/* Effet glass + lueur douce */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FED9B7]/30 via-transparent to-[#14204d]/10 rounded-xl pointer-events-none"></div>

      <div className="container mx-auto px-6 relative">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link
            to="/"
            aria-label="SEN HABITA - Accueil"
            className="flex items-center gap-2 group"
          >
            <Logo size="md" />
          </Link>

          {/* Menu Desktop */}
          <nav
            className="hidden lg:flex items-center gap-10"
            role="navigation"
            aria-label="Navigation principale"
          >
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative text-base font-medium transition-all duration-500 group ${
                    isActive
                      ? "text-[#f7b79c]"
                      : "text-[#14204d] hover:text-[#f7b79c]"
                  }`}
                >
                  {item.name}

                  {/* Animation ping pour l'élément actif */}
                  {isActive && (
                    <span className="absolute -top-1 -right-1">
                      <span className="relative flex h-3 w-3">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-[#FED9B7] opacity-80 animate-ping"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-[#FED9B7] to-[#f7b79c] shadow-lg"></span>
                      </span>
                    </span>
                  )}

                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-[#FED9B7] to-[#f7b79c] rounded-full transition-all duration-500 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              );
            })}
          </nav>

          {/* Contact + Admin */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="tel:+221123456789"
              className="flex items-center gap-2 text-[#14204d] hover:text-[#f7b79c] transition-all duration-300 group"
              aria-label="Appeler SEN HABITA"
            >
              <div className="p-2 bg-white/30 rounded-lg shadow-md group-hover:scale-110 transition-transform">
                <Phone className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">+221 12 345 67 89</span>
            </a>

            <Link to="/login" className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FED9B7] to-[#f7b79c] rounded-xl blur-sm opacity-70 group-hover:opacity-100 transition-all"></div>
              <Button
                variant="primary"
                size="md"
                className="relative text-[#14204d] px-5 py-2 rounded-xl shadow-lg hover:scale-105 transition-transform duration-500"
              >
                Connexion
              </Button>
            </Link>
          </div>

          {/* Menu mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#14204d] hover:bg-[#FED9B7]/20 rounded-lg transition-all duration-300 hover:scale-110"
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

        {/* Menu mobile déroulant */}
        {mobileMenuOpen && (
          <nav
            className="lg:hidden py-5 border-t border-[#FED9B7]/40 animate-slideDown backdrop-blur-2xl bg-white/80 rounded-b-3xl shadow-lg"
            role="navigation"
            aria-label="Navigation mobile"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`relative py-2 px-4 rounded-lg font-medium text-center transition-all duration-400 ${
                      isActive
                        ? "bg-gradient-to-r from-[#FED9B7] to-[#f7b79c] text-[#14204d] shadow-md"
                        : "text-[#14204d] hover:bg-[#FED9B7]/30"
                    }`}
                  >
                    {item.name}

                    {/* Animation ping pour l'élément actif (mobile) */}
                    {isActive && (
                      <span className="absolute -top-1 -right-1">
                        <span className="relative flex h-3 w-3">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-[#14204d] opacity-70 animate-ping"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#14204d] shadow-lg"></span>
                        </span>
                      </span>
                    )}
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-[#FED9B7]/40">
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center w-full bg-[#14204d] text-white py-2 rounded-xl shadow-md hover:scale-105 transition-transform duration-500"
                >
                  Admin
                </Link>

                <a
                  href="tel:+221123456789"
                  className="flex items-center justify-center gap-2 text-[#14204d] py-3 hover:text-[#FED9B7] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span className="text-sm font-medium">+221 12 345 67 89</span>
                </a>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
