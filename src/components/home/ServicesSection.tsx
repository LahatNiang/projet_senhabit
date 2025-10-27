import { useEffect } from "react";
import { ShoppingBag, Key, Home, TrendingUp } from "lucide-react";
import Card from "../ui/Card";

// Hook pour animation scroll
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
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function ServicesSection() {
  useScrollAnimation();

  const services = [
    {
      icon: ShoppingBag,
      title: "Vendre votre bien",
      description:
        "Estimation gratuite, visibilité maximale et accompagnement jusqu'à la vente finale.",
      color: "from-[#14204d] to-[#1c2a6b]",
    },
    {
      icon: Key,
      title: "Acheter un bien",
      description:
        "Large sélection de propriétés et conseils d'experts pour votre projet d'achat.",
      color: "from-[#f7b79c] to-[#FED9B7]",
    },
    {
      icon: Home,
      title: "Louer un bien",
      description:
        "Trouvez votre location idéale avec notre portefeuille diversifié de biens.",
      color: "from-[#14204d] to-[#1c2a6b]",
    },
    {
      icon: TrendingUp,
      title: "Estimation gratuite",
      description:
        "Évaluez la valeur de votre bien en quelques minutes avec nos experts.",
      color: "from-[#f7b79c] to-[#FED9B7]",
    },
  ];

  return (
    <section
      className="py-24 bg-gradient-to-b from-[#fef9f8] to-[#fffbea]"
      id="services"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 fade-up opacity-0 transition-all duration-700">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#14204d] mb-4">
            Nos Services
          </h2>
          <p className="text-xl text-[#14204d]/80 max-w-2xl mx-auto font-sans">
            Un accompagnement complet pour tous vos projets immobiliers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {services.map((service, index) => (
            <Card
              key={index}
              className="fade-up opacity-0 p-8 group relative hover:-translate-y-2 transition-all duration-500"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div
                className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:shadow-[0_20px_60px_rgba(254,217,183,0.4)]`}
              >
                <service.icon className="w-10 h-10 text-white transition-transform duration-500 group-hover:rotate-12" />
              </div>
              <h3 className="text-xl font-display font-bold text-[#14204d] mb-3">
                {service.title}
              </h3>
              <p className="text-[#14204d]/80 leading-relaxed font-sans">
                {service.description}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* --- Styles animation fade-up --- */}
      <style>
        {`
          @keyframes fadeUpVisible {
            0% {
              opacity: 0;
              transform: translateY(40px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeUpVisible {
            animation: fadeUpVisible 0.8s ease forwards;
          }
          @keyframes cardGlow {
            0% {
              box-shadow: 0 0 0 rgba(254, 217, 183, 0.4);
            }
            50% {
              box-shadow: 0 0 20px rgba(254, 217, 183, 0.4);
            }
            100% {
              box-shadow: 0 0 0 rgba(254, 217, 183, 0.4);
            }
          }
          .animate-cardGlow {
            animation: cardGlow 2s ease-in-out infinite;
          }
        `}
      </style>
    </section>
  );
}
