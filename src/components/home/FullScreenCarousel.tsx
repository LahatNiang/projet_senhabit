import { useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface CarouselImage {
  url: string;
  title: string;
  subtitle: string;
  animation: string;
  cta?: string;
  badge?: string;
}

const carouselImages: CarouselImage[] = [
  {
    url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920",
    title: "Villas de Prestige à Dakar",
    subtitle: "Des résidences uniques pour un confort inégalé",
    animation: "animate-slideUp",
    cta: "Découvrir nos villas",
    badge: "Nouveauté",
  },
  {
    url: "https://images.unsplash.com/photo-1712342029127-2924f1ff66ae?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA0fHxDb25mb3J0JTIwZXQlMjAlQzMlQTlsJUMzJUE5Z2FuY2UlMjBhdSUyMGMlQzUlOTN1ciUyMGRlJTIwbGElMjB2aWxsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
    title: "Appartements Modernes",
    subtitle: "Confort et élégance au cœur de la ville",
    animation: "animate-fadeIn",
    cta: "Explorer les appartements",
    badge: "Premium",
  },
  {
    url: "https://images.unsplash.com/photo-1725962441765-6aaa75327f3b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2hhbWJyZXMlMjBldCUyMFN1aXRlcyUyMEhhdXQlMjBkZSUyMEdhbW1lfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
    title: "Chambres et Suites Haut de Gamme",
    subtitle: "Intimité et luxe pour chaque espace",
    animation: "animate-slideRight",
    cta: "Voir les suites",
    badge: "Luxe",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1661877360520-f70603f7c0d8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNhbGxlJTIwZGUlMjBzZWpvdXIlMjBlbGVnYW50ZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
    title: "Salles de Séjour Élégantes",
    subtitle: "Design raffiné et convivialité",
    animation: "animate-slideLeft",
    cta: "Découvrir le design",
    badge: "Exclusif",
  },
  {
    url: "https://images.unsplash.com/photo-1632400990400-416d5460f337?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW1tZXVibGUlMjBldCUyMHJlc2lkYW5jZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
    title: "Immeubles et Résidences",
    subtitle: "Investissements fiables et durables",
    animation: "animate-fadeInUp",
    cta: "Investir maintenant",
    badge: "Opportunité",
  },
];

export default function FullScreenCarousel() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const nextSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
      setProgress(0);
      setTimeout(() => setIsTransitioning(false), 600);
    }
  }, [isTransitioning]);

  const prevSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide(
        (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
      );
      setProgress(0);
      setTimeout(() => setIsTransitioning(false), 600);
    }
  }, [isTransitioning]);

  const goToSlide = useCallback(
    (index: number) => {
      if (!isTransitioning && index !== currentSlide) {
        setIsTransitioning(true);
        setCurrentSlide(index);
        setProgress(0);
        setTimeout(() => setIsTransitioning(false), 600);
      }
    },
    [isTransitioning, currentSlide]
  );

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  // Auto-play avec barre de progression
  useEffect(() => {
    if (isPaused) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + 100 / 60; // 6 secondes = 60 frames
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [isPaused, nextSlide]);

  // Gestion du clavier
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === " ") {
        e.preventDefault();
        togglePause();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [nextSlide, prevSlide, togglePause]);

  const currentImage = carouselImages[currentSlide];

  return (
    <section className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-[#14204d] via-[#0a0f2c] to-[#14204d]">
      {/* Effet de particules en arrière-plan */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#FED9B7] rounded-full animate-twinkle"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-[#f7b79c] rounded-full animate-twinkle-delayed"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-[#FED9B7] rounded-full animate-twinkle-delayed-2"></div>
        <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-[#f7b79c] rounded-full animate-twinkle"></div>
      </div>

      {/* Images du carrousel */}
      {carouselImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-all duration-1000 ${
            index === currentSlide
              ? "opacity-100 scale-100 z-10"
              : "opacity-0 scale-105 z-0"
          }`}
        >
          <img
            src={image.url}
            alt={image.title}
            className="w-full h-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
          />

          {/* Overlay avec plusieurs couches de dégradés */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50"></div>
          <div className="absolute inset-0 bg-[#14204d]/20"></div>

          {/* Effet de vignette */}
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"></div>
        </div>
      ))}

      {/* Contenu principal */}
      <div className="absolute inset-0 flex items-center justify-center z-20 px-4">
        <div
          className={`text-center text-white max-w-6xl ${currentImage.animation}`}
        >
          {/* Badge */}
          {currentImage.badge && (
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-[#FED9B7]/20 to-[#f7b79c]/20 border border-[#FED9B7]/30 backdrop-blur-md mb-6 animate-fadeIn">
              <Sparkles className="w-4 h-4 text-[#FED9B7]" />
              <span className="text-sm font-semibold text-[#FED9B7]">
                {currentImage.badge}
              </span>
            </div>
          )}

          {/* Titre principal */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-tight">
            <span className="inline-block animate-slideInTitle">
              {currentImage.title}
            </span>
          </h1>

          {/* Ligne décorative */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-0.5 w-16 bg-gradient-to-r from-transparent to-[#FED9B7] animate-expandLeft"></div>
            <div className="w-2 h-2 bg-[#FED9B7] rounded-full animate-pulse"></div>
            <div className="h-0.5 w-16 bg-gradient-to-l from-transparent to-[#FED9B7] animate-expandRight"></div>
          </div>

          {/* Sous-titre */}
          <p className="text-xl md:text-3xl lg:text-4xl font-sans text-white/90 mb-10 animate-fadeInDelayed">
            {currentImage.subtitle}
          </p>

          {/* CTA Button */}
          {currentImage.cta && (
            <button className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#FED9B7] to-[#f7b79c] hover:from-[#f7b79c] hover:to-[#FED9B7] text-[#14204d] font-bold rounded-full shadow-2xl hover:shadow-[0_0_40px_rgba(254,217,183,0.5)] transition-all duration-500 hover:scale-110 animate-fadeInCta">
              <span className="text-lg">{currentImage.cta}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation gauche */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-30 bg-white/10 backdrop-blur-md hover:bg-gradient-to-r hover:from-[#FED9B7] hover:to-[#f7b79c] p-4 md:p-5 rounded-full transition-all duration-300 group border border-white/20 hover:border-[#FED9B7] hover:scale-110 shadow-xl"
        aria-label="Image précédente"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:text-[#14204d] transition-colors" />
      </button>

      {/* Navigation droite */}
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-30 bg-white/10 backdrop-blur-md hover:bg-gradient-to-r hover:from-[#FED9B7] hover:to-[#f7b79c] p-4 md:p-5 rounded-full transition-all duration-300 group border border-white/20 hover:border-[#FED9B7] hover:scale-110 shadow-xl"
        aria-label="Image suivante"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:text-[#14204d] transition-colors" />
      </button>

      {/* Contrôle Play/Pause */}
      <button
        onClick={togglePause}
        className="absolute top-8 right-8 z-30 bg-white/10 backdrop-blur-md hover:bg-white/20 p-3 rounded-full transition-all duration-300 border border-white/20 hover:scale-110 group"
        aria-label={isPaused ? "Reprendre" : "Pause"}
      >
        {isPaused ? (
          <Play className="w-5 h-5 text-white group-hover:text-[#FED9B7] transition-colors" />
        ) : (
          <Pause className="w-5 h-5 text-white group-hover:text-[#FED9B7] transition-colors" />
        )}
      </button>

      {/* Indicateurs avec barres de progression */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30 flex gap-4">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group relative"
            aria-label={`Aller à l'image ${index + 1}`}
          >
            {/* Barre de fond */}
            <div
              className={`transition-all duration-300 rounded-full overflow-hidden ${
                index === currentSlide
                  ? "w-16 h-1 bg-white/30"
                  : "w-12 h-1 bg-white/20 group-hover:bg-white/40"
              }`}
            >
              {/* Barre de progression */}
              {index === currentSlide && (
                <div
                  className="h-full bg-gradient-to-r from-[#FED9B7] to-[#f7b79c] transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                ></div>
              )}
            </div>

            {/* Tooltip */}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white/90 text-[#14204d] px-3 py-1 rounded-lg text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
              {carouselImages[index].title}
            </span>
          </button>
        ))}
      </div>

      {/* Compteur de slides */}
      <div className="absolute bottom-12 left-8 z-30 flex items-center gap-3 text-white/80 text-sm font-semibold">
        <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
          <span className="text-[#FED9B7] text-lg">
            {String(currentSlide + 1).padStart(2, "0")}
          </span>
          <span className="mx-2">/</span>
          <span>{String(carouselImages.length).padStart(2, "0")}</span>
        </div>
      </div>

      {/* Overlay décoratif du bas */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#14204d] via-[#14204d]/50 to-transparent z-20 pointer-events-none"></div>

      {/* Coins décoratifs */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-[#FED9B7]/30 z-30 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-[#FED9B7]/30 z-30 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-[#FED9B7]/30 z-30 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-[#FED9B7]/30 z-30 pointer-events-none"></div>

      {/* Styles d'animations */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 1s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        @keyframes fadeInDelayed {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeInDelayed {
          animation: fadeInDelayed 1s ease-out 0.3s both;
        }

        @keyframes fadeInCta {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInCta {
          animation: fadeInCta 1s ease-out 0.6s both;
        }

        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideRight {
          animation: slideRight 1s ease-out;
        }

        @keyframes slideLeft {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideLeft {
          animation: slideLeft 1s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }

        @keyframes slideInTitle {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideInTitle {
          animation: slideInTitle 0.8s ease-out 0.1s both;
        }

        @keyframes expandLeft {
          from { width: 0; }
          to { width: 4rem; }
        }
        .animate-expandLeft {
          animation: expandLeft 0.8s ease-out 0.4s both;
        }

        @keyframes expandRight {
          from { width: 0; }
          to { width: 4rem; }
        }
        .animate-expandRight {
          animation: expandRight 0.8s ease-out 0.4s both;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
        .animate-twinkle-delayed {
          animation: twinkle 3s ease-in-out infinite;
          animation-delay: 1s;
        }
        .animate-twinkle-delayed-2 {
          animation: twinkle 3s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}
