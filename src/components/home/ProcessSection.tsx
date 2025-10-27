import { useEffect } from "react";
import { Search, FileText, Key, CheckCircle } from "lucide-react";
import Card from "../ui/Card";

// Hook animation scroll
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

export default function ProcessSection() {
  useScrollAnimation();

  const steps = [
    {
      icon: Search,
      title: "Recherche et sélection",
      description:
        "Définissez vos critères et explorez notre catalogue de propriétés soigneusement sélectionnées.",
    },
    {
      icon: FileText,
      title: "Visites et évaluation",
      description:
        "Organisez des visites et bénéficiez de nos conseils d'experts pour évaluer chaque bien.",
    },
    {
      icon: Key,
      title: "Négociation et contrat",
      description:
        "Nous vous accompagnons dans la négociation et la préparation de tous les documents.",
    },
    {
      icon: CheckCircle,
      title: "Finalisation",
      description:
        "Signature et remise des clés - votre nouveau départ en toute sérénité.",
    },
  ];

  return (
    <section
      className="py-24 bg-gradient-to-b from-[#fef9f8] to-[#fffbea]"
      id="process"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 fade-up opacity-0 transition-all duration-700">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#14204d] mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-xl text-[#14204d]/80 max-w-2xl mx-auto font-sans">
            Un processus simple et transparent pour réaliser votre projet
            immobilier
          </p>
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {steps.map((step, index) => (
              <Card
                key={index}
                className="fade-up opacity-0 p-8 text-center relative group hover:-translate-y-2 transition-all duration-500"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Ligne de connexion pour desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full w-full h-1 bg-[#FED9B7] -translate-y-1/2 z-0 rounded-full" />
                )}

                {/* Icône avec effet premium */}
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#FED9B7] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                  <step.icon className="w-12 h-12 text-white transition-transform duration-500 group-hover:rotate-12" />
                </div>

                {/* Numéro étape */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-[#14204d] text-white flex items-center justify-center font-bold shadow-lg font-display">
                  {index + 1}
                </div>

                <h3 className="text-xl font-display font-bold text-[#14204d] mb-3">
                  {step.title}
                </h3>
                <p className="text-[#14204d]/80 leading-relaxed font-sans">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>
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
        `}
      </style>
    </section>
  );
}
