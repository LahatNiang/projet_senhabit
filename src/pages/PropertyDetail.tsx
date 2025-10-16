import { useState, useEffect } from "react";
import { Home, Phone, Mail, Menu, X, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Button from "../components/ui/Button";

export default function HeaderEnhanced() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Accueil", path: "/" },
    { name: "Nos biens", path: "/properties" },
    { name: "À propos", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Admin", path: "/admin" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-2xl shadow-gold-500/10"
          : "bg-white/60 backdrop-blur-md"
      }`}
      role="banner"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gold-50/30 via-transparent to-navy-50/30 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative">
        <div className="flex justify-between items-center py-4">
          <Link
            to="/"
            className="flex items-center gap-3 group"
            aria-label="Altis Immobilier - Accueil"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-navy-400 to-navy-600 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-navy-500 to-navy-700 p-3 rounded-xl shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                <Home className="w-7 h-7 text-gold-400" />
                <Sparkles className="w-3 h-3 text-gold-300 absolute -top-1 -right-1 animate-pulse" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-navy-600 via-navy-500 to-gold-500 bg-clip-text text-transparent">
                Sen <span className="text-gold-500">Habita</span>
              </h1>
              <p className="text-xs text-gray-600 font-sans">
                Votre expert en immobilier
              </p>
            </div>
          </Link>

          <nav
            className="hidden lg:flex items-center gap-8"
            role="navigation"
            aria-label="Navigation principale"
          >
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative font-medium font-sans transition-all duration-300 group ${
                    isActive
                      ? "text-gold-600"
                      : "text-navy-500 hover:text-gold-500"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-gold-400 to-gold-600 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                  {isActive && (
                    <span className="absolute -top-1 -right-2 w-2 h-2 bg-gold-500 rounded-full animate-pulse"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+33123456789"
              className="flex items-center gap-2 text-navy-500 hover:text-gold-500 transition-all duration-300 group"
              aria-label="Appeler au +33 1 23 45 67 89"
            >
              <div className="p-2 bg-gradient-to-br from-navy-50 to-gold-50 rounded-lg group-hover:scale-110 transition-transform">
                <Phone className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">+33 1 23 45 67 89</span>
            </a>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <Button
                variant="primary"
                size="md"
                className="relative animate-pulse-slow"
              >
                <Mail className="w-4 h-4 mr-2" />
                Estimer mon bien
              </Button>
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-navy-500 hover:bg-gold-50 rounded-lg transition-all duration-300 hover:scale-110"
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

        {mobileMenuOpen && (
          <nav
            className="lg:hidden py-4 border-t border-gold-200/50 animate-slideDown backdrop-blur-xl bg-white/90"
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
                    className={`py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-gold-50 to-navy-50 text-gold-600 shadow-md"
                        : "text-navy-500 hover:bg-gold-50"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-gold-200/50">
                <Button variant="primary" className="w-full mb-3">
                  <Mail className="w-4 h-4 mr-2" />
                  Se connecter
                </Button>
                <a
                  href="tel:+33123456789"
                  className="flex items-center justify-center gap-2 text-navy-500 py-2"
                >
                  <Phone className="w-4 h-4" />
                  <span className="text-sm font-medium">+33 1 23 45 67 89</span>
                </a>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
