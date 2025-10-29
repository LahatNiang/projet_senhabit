import { useState, useEffect } from "react";
import {
  Home,
  Phone,
  Mail,
  Menu,
  X,
  Star,
  Crown,
  Sparkles,
  Shield,
  Award,
  Zap,
  Clock,
} from "lucide-react";

interface MenuItem {
  name: string;
  href: string;
  icon?: typeof Home;
  badge?: string;
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("Accueil");
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 50);

      let current = "Accueil";
      sections.forEach((section) => {
        const top = section.getBoundingClientRect().top;
        if (top <= window.innerHeight / 3) {
          current = section.id.charAt(0).toUpperCase() + section.id.slice(1);
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems: MenuItem[] = [
    { name: "Accueil", href: "#accueil", icon: Home },
    { name: "Nos biens", href: "#nosbiens", icon: Star, badge: "New" },
    { name: "Services", href: "#services", icon: Shield },
    { name: "À propos", href: "#apropos", icon: Award },
    { name: "Blog", href: "#blog", icon: Zap },
    { name: "Contact", href: "#contact", icon: Phone },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "backdrop-blur-2xl bg-gradient-to-r from-[#14204d]/95 via-[#1a2857]/95 to-[#14204d]/95 border-b-2 border-[#FED9B7]/30 shadow-[0_10px_40px_rgba(254,217,183,0.3)]"
          : "backdrop-blur-xl bg-gradient-to-r from-[#14204d]/85 via-[#1a2857]/85 to-[#14204d]/85 border-b border-[#FED9B7]/10"
      }`}
      role="banner"
    >
      {/* Effets de lumière */}
      <div className="absolute inset-0 opacity-30 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#FED9B7] to-[#f7b79c] rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-gradient-to-br from-[#f7b79c] to-[#FED9B7] rounded-full blur-3xl animate-pulse-slow-delayed"></div>
      </div>

      {/* Ligne décorative animée */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FED9B7] to-transparent animate-shimmer"></div>

      <div className="container mx-auto px-6 relative">
        <div className="flex justify-between items-center py-4">
          {/* Logo Premium */}
          <a
            href="/"
            className="flex items-center gap-4 group relative"
            aria-label="Sen Habita - Accueil"
          >
            {/* Badge Premium flottant */}
            <div className="absolute -top-3 -right-3 animate-float">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FED9B7] to-[#f7b79c] rounded-full blur-md animate-pulse"></div>
                <Crown className="relative w-5 h-5 text-[#FED9B7] fill-[#FED9B7] drop-shadow-lg" />
              </div>
            </div>

            {/* Icône du logo */}
            <div className="relative group/logo">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FED9B7] to-[#f7b79c] rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative p-4 rounded-2xl bg-gradient-to-br from-[#14204d] to-[#1e2a5a] shadow-2xl border-2 border-[#FED9B7]/30 group-hover:border-[#FED9B7]/60 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Home className="w-8 h-8 text-[#FED9B7] group-hover:text-white transition-colors duration-300 drop-shadow-[0_0_10px_rgba(254,217,183,0.5)]" />
                
                {/* Particules */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#FED9B7] rounded-full animate-ping"></div>
                <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-[#f7b79c] rounded-full animate-ping animation-delay-1000"></div>
              </div>
            </div>

            {/* Texte du logo */}
            <div className="relative">
              <h1 className="text-3xl font-bold font-display tracking-tight">
                <span className="text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_2px_15px_rgba(255,255,255,0.5)] transition-all duration-300">
                  SEN
                </span>{" "}
                <span className="bg-gradient-to-r from-[#FED9B7] via-[#f7b79c] to-[#FED9B7] text-transparent bg-clip-text animate-gradient bg-[length:200%_auto] group-hover:scale-105 inline-block transition-transform">
                  HABITA
                </span>
              </h1>
              
              <p className="text-xs text-[#FED9B7]/90 font-sans flex items-center gap-2 mt-1">
                <Sparkles className="w-3 h-3 text-[#FED9B7] animate-pulse" />
                <span className="animate-text-shimmer bg-gradient-to-r from-[#FED9B7] via-white to-[#FED9B7] bg-[length:200%_auto] text-transparent bg-clip-text">
                  Excellence Immobilière Premium
                </span>
              </p>

              <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FED9B7] to-transparent group-hover:w-full transition-all duration-500"></div>
            </div>
          </a>

          {/* Navigation Desktop */}
          <nav
            className="hidden lg:flex items-center gap-2 backdrop-blur-xl bg-gradient-to-r from-[#14204d]/70 via-[#1a2857]/70 to-[#14204d]/70 rounded-2xl p-2 border-2 border-[#FED9B7]/20 shadow-[0_8px_32px_rgba(254,217,183,0.2)] hover:shadow-[0_8px_40px_rgba(254,217,183,0.3)] transition-all duration-500"
            role="navigation"
            aria-label="Navigation principale"
          >
            {menuItems.map((item, i) => {
              const isActive = activeSection === item.name;
              const Icon = item.icon;
              
              return (
                <a
                  key={i}
                  href={item.href}
                  className={`relative px-5 py-3 rounded-xl font-semibold transition-all duration-300 group/item overflow-hidden ${
                    isActive
                      ? "text-white bg-gradient-to-r from-[#FED9B7]/30 to-[#f7b79c]/30 shadow-lg border-2 border-[#FED9B7]/50"
                      : "text-[#FED9B7]/80 hover:text-white hover:bg-[#FED9B7]/10 border-2 border-transparent"
                  }`}
                  style={{
                    textShadow: "0 2px 8px rgba(0,0,0,0.4)",
                  }}
                >
                  {/* Effet de brillance */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/item:translate-x-full transition-transform duration-1000"></div>

                  <span className="relative flex items-center gap-2">
                    {Icon && (
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#FED9B7]' : 'text-[#FED9B7]/70 group-hover/item:text-[#FED9B7]'} transition-colors duration-300`} />
                    )}
                    {item.name}

                    {item.badge && (
                      <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-bold rounded-full animate-bounce shadow-lg">
                        {item.badge}
                      </span>
                    )}

                    <span className={`absolute bottom-1 left-1/2 h-1 bg-gradient-to-r from-[#FED9B7] via-[#f7b79c] to-[#FED9B7] rounded-full transition-all duration-400 ${
                      isActive ? 'w-3/4 -translate-x-1/2' : 'w-0 -translate-x-1/2 group-hover/item:w-3/4'
                    }`} />

                    {isActive && (
                      <span className="absolute -top-1 -right-1">
                        <span className="relative flex h-3 w-3">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-[#FED9B7] opacity-75 animate-ping"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-[#FED9B7] to-[#f7b79c] shadow-[0_0_10px_rgba(254,217,183,0.8)]"></span>
                        </span>
                      </span>
                    )}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Actions Premium */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Bouton téléphone */}
            <a
              href="tel:+221772345678"
              className="relative flex items-center gap-3 bg-gradient-to-r from-[#14204d]/80 to-[#1a2857]/80 backdrop-blur-md px-5 py-3 rounded-xl border-2 border-[#FED9B7]/30 text-[#FED9B7] hover:border-[#FED9B7]/60 transition-all duration-300 group/phone overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(254,217,183,0.4)]"
              aria-label="Appeler Sen Habita"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#FED9B7]/10 to-[#f7b79c]/10 scale-x-0 group-hover/phone:scale-x-100 transition-transform duration-500 origin-left"></div>

              <div className="relative">
                <Phone className="w-5 h-5 text-[#FED9B7] group-hover/phone:animate-ring" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              </div>
              
              <div className="relative flex flex-col">
                <span className="text-[10px] text-[#FED9B7]/70 leading-none">Appelez-nous</span>
                <span className="text-sm font-bold text-[#FED9B7] group-hover/phone:text-white transition-colors">
                  +221 77 234 56 78
                </span>
              </div>

              <Clock className="w-4 h-4 text-[#FED9B7]/50 absolute -top-2 -right-2 animate-spin-slow" />
            </a>

            {/* Bouton Espace Premium */}
            <a
              href="/login"
              className="relative flex items-center gap-3 bg-gradient-to-r from-[#FED9B7] via-[#f7b79c] to-[#FED9B7] bg-[length:200%_auto] hover:bg-[position:right_center] text-[#14204d] px-7 py-3 rounded-xl shadow-[0_10px_30px_rgba(254,217,183,0.5)] hover:shadow-[0_15px_40px_rgba(254,217,183,0.7)] font-bold transition-all duration-500 group/premium overflow-hidden border-2 border-white/20 hover:scale-105 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover/premium:translate-x-full transition-transform duration-1000"></div>

              <div className="absolute top-0 left-0 w-full h-full">
                <span className="absolute top-2 left-4 w-1 h-1 bg-white/60 rounded-full animate-float"></span>
                <span className="absolute top-4 right-6 w-1 h-1 bg-white/60 rounded-full animate-float animation-delay-500"></span>
                <span className="absolute bottom-3 left-8 w-1 h-1 bg-white/60 rounded-full animate-float animation-delay-1000"></span>
              </div>

              <Mail className="w-5 h-5 relative z-10 group-hover/premium:scale-110 transition-transform" />
              <span className="relative z-10 flex items-center gap-2">
                Espace Premium
                <Shield className="w-4 h-4 animate-pulse" />
              </span>

              <div className="absolute -right-2 -top-2 animate-spin-slow">
                <Star className="w-5 h-5 text-[#14204d]/40 fill-[#14204d]/40" />
              </div>
            </a>
          </div>

          {/* Bouton menu mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden relative p-4 text-[#FED9B7] rounded-xl transition-all backdrop-blur-xl border-2 border-[#FED9B7]/30 shadow-lg hover:shadow-[0_0_30px_rgba(254,217,183,0.4)] group/mobile overflow-hidden"
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileMenuOpen}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#FED9B7]/10 to-[#f7b79c]/10 scale-0 group-hover/mobile:scale-100 transition-transform duration-300"></div>

            <div className="relative">
              {mobileMenuOpen ? (
                <X className="w-7 h-7 animate-spin-in" />
              ) : (
                <Menu className="w-7 h-7 animate-fade-in" />
              )}
            </div>

            <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></span>
          </button>
        </div>

        {/* Menu mobile */}
        {mobileMenuOpen && (
          <nav
            className="lg:hidden py-6 mt-4 mb-4 backdrop-blur-2xl bg-gradient-to-br from-[#14204d]/95 to-[#1a2857]/95 border-2 border-[#FED9B7]/30 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] relative overflow-hidden animate-slide-down"
            role="navigation"
            aria-label="Navigation mobile"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#FED9B7]/5 to-[#f7b79c]/5 animate-pulse-slow"></div>

            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FED9B7]/20 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#f7b79c]/20 to-transparent rounded-full blur-2xl"></div>

            <div className="relative z-10 flex flex-col gap-3 px-4">
              {menuItems.map((item, i) => {
                const isActive = activeSection === item.name;
                const Icon = item.icon;
                
                return (
                  <a
                    key={i}
                    href={item.href}
                    className={`relative px-5 py-4 rounded-xl font-semibold transition-all duration-300 overflow-hidden group/mobile-item ${
                      isActive
                        ? "text-[#14204d] bg-gradient-to-r from-[#FED9B7] to-[#f7b79c] shadow-lg scale-105"
                        : "text-[#FED9B7]/90 hover:text-white hover:bg-[#FED9B7]/10 border border-[#FED9B7]/20"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FED9B7]/20 to-transparent -translate-x-full group-hover/mobile-item:translate-x-0 transition-transform duration-500"></div>

                    <span className="relative flex items-center gap-3">
                      {Icon && <Icon className="w-5 h-5" />}
                      {item.name}
                      
                      {isActive && (
                        <span className="ml-auto flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-[#14204d] opacity-75 animate-ping"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#14204d]"></span>
                        </span>
                      )}

                      {item.badge && (
                        <span className="ml-auto px-2 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </span>
                  </a>
                );
              })}

              <div className="flex items-center gap-3 my-2">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#FED9B7]/30 to-transparent"></div>
                <Sparkles className="w-4 h-4 text-[#FED9B7] animate-pulse" />
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#FED9B7]/30 to-transparent"></div>
              </div>

              <div className="space-y-3 mt-2">
                <a
                  href="tel:+221772345678"
                  className="flex items-center justify-center gap-3 w-full bg-[#14204d]/60 backdrop-blur-md text-[#FED9B7] px-5 py-3 rounded-xl font-semibold border-2 border-[#FED9B7]/30 hover:border-[#FED9B7]/60 transition-all"
                >
                  <Phone className="w-5 h-5" />
                  +221 77 234 56 78
                </a>

                <a
                  href="/login"
                  className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-[#FED9B7] to-[#f7b79c] text-[#14204d] px-5 py-4 rounded-xl shadow-xl font-bold hover:scale-105 transition-transform"
                >
                  <Crown className="w-5 h-5" />
                  Espace Premium
                  <Shield className="w-4 h-4 animate-pulse" />
                </a>
              </div>
            </div>
          </nav>
        )}
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }

        @keyframes text-shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-text-shimmer {
          animation: text-shimmer 2s ease infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-pulse-slow-delayed {
          animation: pulse-slow 4s ease-in-out infinite 2s;
        }

        @keyframes ring {
          0%, 100% { transform: rotate(0deg); }
          10% { transform: rotate(15deg); }
          20% { transform: rotate(-15deg); }
          30% { transform: rotate(10deg); }
          40% { transform: rotate(-10deg); }
          50% { transform: rotate(0deg); }
        }
        .group-hover\/phone:hover .animate-ring {
          animation: ring 0.5s ease-in-out;
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        @keyframes spin-in {
          from { transform: rotate(-90deg); opacity: 0; }
          to { transform: rotate(0deg); opacity: 1; }
        }
        .animate-spin-in {
          animation: spin-in 0.3s ease-out;
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.4s ease-out;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </header>
  );
}