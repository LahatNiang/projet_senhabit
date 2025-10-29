import { Calendar, Clock, ArrowRight } from "lucide-react";
// import Card from "../ui/Card";
import Button from "../ui/Button";
import { useEffect } from "react";

// Animation au scroll
function useScrollAnimation() {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-up");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeUpVisible");
          }
        });
      },
      { threshold: 0.2 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const blogPosts = [
  {
    id: "1",
    title: "10 conseils pour réussir votre investissement locatif",
    excerpt:
      "Découvrez les meilleures stratégies pour maximiser votre rentabilité locative et éviter les pièges courants.",
    image:
      "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=600",
    date: "15 Mars 2024",
    readTime: 5,
    category: "Investissement",
  },
  {
    id: "2",
    title: "Guide complet de l'achat immobilier en 2024",
    excerpt:
      "Toutes les étapes à suivre pour acheter votre bien immobilier en toute sérénité cette année.",
    image:
      "https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=600",
    date: "12 Novembre 2025",
    readTime: 8,
    category: "Achat",
  },
  {
    id: "3",
    title: "Les quartiers en pleine évolution à Paris",
    excerpt:
      "Identifiez les zones à fort potentiel pour votre prochain achat ou investissement immobilier.",
    image:
      "https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg?auto=compress&cs=tinysrgb&w=600",
    date: "8 Decembre 2025",
    readTime: 6,
    category: "Marché",
  },
];

export default function BlogSection() {
  useScrollAnimation();

  return (
    <section
      className="relative py-24 bg-gradient-to-br from-[#fffdf8] via-[#fffaf2] to-[#fef9f8] overflow-hidden"
      id="blog"
    >
      {/* Dégradés lumineux d’arrière-plan */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 left-10 w-72 h-72 bg-[#FED9B7] rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#fffaf2] rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* En-tête de section */}
        <div className="text-center mb-16 fade-up opacity-0">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#14204d] mb-4">
            Actualités & Conseils
          </h2>
          <p className="text-lg md:text-xl text-[#14204d]/70 max-w-2xl mx-auto font-sans">
            Restez informé des dernières tendances du marché immobilier
          </p>
        </div>

        {/* Liste des articles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto mb-12">
          {blogPosts.map((post, i) => (
            <div
              key={post.id}
              className="fade-up opacity-0 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-[#FED9B7]/30 overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 flex flex-col min-h-[520px]"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute top-4 left-4 bg-gradient-to-r from-[#FED9B7] to-[#fbbf77] text-[#14204d] px-4 py-1 rounded-full text-xs font-semibold shadow-md">
                  {post.category}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-sm text-[#14204d]/70 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-[#FED9B7]" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-[#FED9B7]" />
                    <span>{post.readTime} min</span>
                  </div>
                </div>

                <h3 className="text-xl font-display font-bold text-[#14204d] mb-3 group-hover:text-[#FED9B7] transition-colors">
                  {post.title}
                </h3>

                <p className="text-[#14204d]/70 mb-6 leading-relaxed flex-1">
                  {post.excerpt}
                </p>

                <button className="flex items-center gap-2 text-[#FED9B7] font-semibold hover:gap-3 transition-all duration-300 mt-auto">
                  Lire l'article
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bouton global */}
        <div className="text-center fade-up opacity-0">
          <Button
            variant="primary"
            size="lg"
            className="bg-gradient-to-r from-[#FED9B7] to-[#fbbf77] text-[#14204d] hover:scale-105 transition-transform shadow-lg"
          >
            Voir tous les articles
          </Button>
        </div>
      </div>

      <style>
        {`
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.05); }
          }
          .animate-pulse-slow {
            animation: pulse-slow 5s ease-in-out infinite;
          }
          @keyframes fadeUpVisible {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeUpVisible {
            animation: fadeUpVisible 0.8s ease forwards;
          }
        `}
      </style>
    </section>
  );
}
