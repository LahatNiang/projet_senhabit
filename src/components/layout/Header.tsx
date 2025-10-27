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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("Accueil");
  const [scrolled, setScrolled] = useState(false);

  // ✅ Suivi automatique de la section active + effet scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      let current = "Accueil";
      sections.forEach((section) => {
        const top = section.getBoundingClientRect().top;
        if (top <= window.innerHeight / 3)
          current = section.id.charAt(0).toUpperCase() + section.id.slice(1);
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    "Accueil",
    "Nos biens",
    "Services",
    "À propos",
    "Blog",
    "Contact",
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-2xl bg-white/10 border-b border-white/20 shadow-2xl"
          : "backdrop-blur-xl bg-white/5 border-b border-white/10"
      }`}
      role="banner"
    >
      {/* Effet de lumière dynamique */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        <div className="flex justify-between items-center py-4">
          {/* ✅ Logo Premium avec effets */}
          <motion.a
            href="/"
            className="flex items-center gap-3 group relative"
            aria-label="Sen Habita - Accueil"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {/* Badge Premium */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="absolute -top-2 -right-2"
            >
              <Crown className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-3 rounded-2xl bg-gradient-to-br from-[#FF6B35] to-[#FF8E53] shadow-2xl shadow-orange-500/30 backdrop-blur-md group"
            >
              <Home className="w-7 h-7 text-white" />

              {/* Effet de scintillement */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </motion.div>

            <div className="relative">
              <motion.h1
                className="text-2xl font-bold font-display text-white tracking-tight drop-shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                SEN{" "}
                <span className="bg-gradient-to-r from-[#FF8E53] to-[#FF6B35] text-transparent bg-clip-text">
                  HABITA
                </span>
              </motion.h1>
              <motion.p
                className="text-xs text-white/80 font-sans flex items-center gap-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Sparkles className="w-3 h-3 text-yellow-400" />
                Excellence Immobilière
              </motion.p>
            </div>
          </motion.a>

          {/* ✅ Navigation desktop premium avec effets avancés */}
          <nav
            className="hidden lg:flex items-center gap-1 backdrop-blur-md bg-white/5 rounded-2xl p-2 border border-white/10 shadow-2xl"
            role="navigation"
            aria-label="Navigation principale"
          >
            {menuItems.map((item, i) => {
              const isActive = activeSection === item;
              return (
                <motion.a
                  key={i}
                  href={`#${item.toLowerCase().replace(" ", "")}`}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    isActive
                      ? "text-white bg-white/20 shadow-lg"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`}
                  style={{
                    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                  }}
                >
                  <span className="relative flex flex-col items-center">
                    {item}

                    {/* ✅ Ligne de soulignement animée */}
                    <motion.span
                      className="absolute bottom-2 left-1/2 h-0.5 bg-gradient-to-r from-[#FF8E53] to-[#FF6B35] rounded-full"
                      initial={{ width: 0, x: "-50%" }}
                      animate={{
                        width: isActive ? "80%" : "0%",
                        x: "-50%",
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />

                    {/* ✅ Effet Ping premium */}
                    {isActive && (
                      <motion.span
                        className="absolute -top-1 -right-1"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 15,
                        }}
                      >
                        <span className="relative flex h-3 w-3">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-[#FF6B35] opacity-80 animate-ping"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-[#FF8E53] to-[#FF6B35] shadow-lg"></span>
                        </span>
                      </motion.span>
                    )}

                    {/* ✅ Effet de particules sur hover */}
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#FF8E53]/20 to-[#FF6B35]/20"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </span>
                </motion.a>
              );
            })}
          </nav>

          {/* ✅ Contact & Admin - Style Premium */}
          <div className="hidden lg:flex items-center gap-4">
            <motion.a
              href="tel:+221772345678"
              className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-white hover:bg-white/20 transition-all group"
              aria-label="Appeler Sen Habita"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(255, 107, 53, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Phone className="w-4 h-4 text-[#FF8E53]" />
              </motion.div>
              <span className="text-sm font-semibold text-white">
                +221 77 234 56 78
              </span>
            </motion.a>

            <motion.a
              href="/login"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 40px rgba(255, 107, 53, 0.6)",
                y: -2,
              }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8E53] text-white px-6 py-3 rounded-xl shadow-2xl shadow-orange-500/40 font-semibold transition-all duration-300 relative overflow-hidden group"
            >
              {/* Effet de brillance */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8 }}
              />

              <Mail className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Espace Premium</span>

              <motion.div
                className="absolute -right-2 -top-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-3 h-3 text-yellow-300 fill-yellow-300" />
              </motion.div>
            </motion.a>
          </div>

          {/* ✅ Bouton menu mobile premium */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-3 text-white hover:bg-white/20 rounded-xl transition-all backdrop-blur-md border border-white/10 shadow-lg relative"
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileMenuOpen}
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255, 255, 255, 0.15)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* ✅ Menu mobile premium */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="lg:hidden py-6 mt-2 backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl relative overflow-hidden"
              role="navigation"
              aria-label="Navigation mobile"
            >
              {/* Effet de fond animé */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/10 to-[#FF8E53]/5" />

              <div className="relative z-10 flex flex-col gap-2 px-4">
                {menuItems.map((item, i) => {
                  const isActive = activeSection === item;
                  return (
                    <motion.a
                      key={i}
                      href={`#${item.toLowerCase().replace(" ", "")}`}
                      className={`relative px-4 py-3 rounded-xl font-semibold transition-all ${
                        isActive
                          ? "text-white bg-gradient-to-r from-[#FF6B35] to-[#FF8E53] shadow-lg"
                          : "text-white/90 hover:text-white hover:bg-white/10"
                      }`}
                      whileHover={{ x: 10 }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="flex items-center gap-3">
                        {isActive && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-white rounded-full"
                          />
                        )}
                        {item}
                      </span>
                    </motion.a>
                  );
                })}

                <div className="pt-4 mt-4 border-t border-white/20">
                  <motion.a
                    href="/admin/login"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-[#FF6B35] to-[#FF8E53] text-white px-5 py-3 rounded-xl shadow-lg font-semibold"
                  >
                    <Crown className="w-4 h-4" />
                    Espace Premium
                  </motion.a>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
