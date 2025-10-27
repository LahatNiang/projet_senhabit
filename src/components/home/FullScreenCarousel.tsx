import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const carouselImages = [
  {
    url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920",
    title: "Villas de Prestige à Dakar",
    subtitle: "Des résidences uniques pour un confort inégalé",
    animation: "animate-slideUp",
  },
  {
    url: "https://images.unsplash.com/photo-1712342029127-2924f1ff66ae?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA0fHxDb25mb3J0JTIwZXQlMjAlQzMlQTlsJUMzJUE5Z2FuY2UlMjBhdSUyMGMlQzUlOTN1ciUyMGRlJTIwbGElMjB2aWxsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
    title: "Appartements Modernes",
    subtitle: "Confort et élégance au cœur de la ville",
    animation: "animate-fadeIn",
  },
  {
    url: "https://images.unsplash.com/photo-1725962441765-6aaa75327f3b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2hhbWJyZXMlMjBldCUyMFN1aXRlcyUyMEhhdXQlMjBkZSUyMEdhbW1lfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
    title: "Chambres et Suites Haut de Gamme",
    subtitle: "Intimité et luxe pour chaque espace",
    animation: "animate-slideRight",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1661877360520-f70603f7c0d8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNhbGxlJTIwZGUlMjBzZWpvdXIlMjBlbGVnYW50ZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
    title: "Salles de Séjour Élégantes",
    subtitle: "Design raffiné et convivialité",
    animation: "animate-slideLeft",
  },
  {
    url: "https://images.unsplash.com/photo-1632400990400-416d5460f337?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW1tZXVibGUlMjBldCUyMHJlc2lkYW5jZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
    title: "Immeubles et Résidences",
    subtitle: "Investissements fiables et durables",
    animation: "animate-fadeInUp",
  },
];

export default function FullScreenCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  }, [isTransitioning]);

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide(
        (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
      );
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const goToSlide = (index: number) => {
    if (!isTransitioning && index !== currentSlide) {
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-[#14204d] via-[#0a0f2c] to-[#14204d]">
      {carouselImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={image.url}
            alt={image.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading={index === 0 ? "eager" : "lazy"}
          />

          {/* Overlay avec dégradé du bas vers le milieu */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

          <div className="absolute inset-0 flex items-center justify-center z-20 px-4">
            <div
              className={`text-center text-white max-w-5xl ${image.animation}`}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6">
                {image.title}
              </h1>
              <p className="text-xl md:text-3xl font-sans text-white/90">
                {image.subtitle}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 backdrop-blur-md hover:bg-white/30 p-4 rounded-full transition-all duration-300 group border border-white/30"
        aria-label="Image précédente"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 backdrop-blur-md hover:bg-white/30 p-4 rounded-full transition-all duration-300 group border border-white/30"
        aria-label="Image suivante"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-3">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? "w-12 h-3 bg-gradient-to-br from-[#FED9B7] to-[#fef9f8]"
                : "w-3 h-3 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Aller à l'image ${index + 1}`}
          />
        ))}
      </div>

      {/* Overlay subtil en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/70 to-transparent z-20"></div>
    </section>
  );
}
