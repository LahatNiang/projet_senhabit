import { Phone, Mail, Calculator } from "lucide-react";
import { useEffect } from "react";
import Button from "../ui/Button";

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

// Typage pour chaque item du CTA
type CTAItem = {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  text: string;
  button: { text: string; variant: "primary" | "outline" };
};

export default function CTASection() {
  useScrollAnimation();

  const items: CTAItem[] = [
    {
      icon: Calculator,
      title: "Estimation gratuite",
      text: "Évaluez votre bien en quelques clics",
      button: { text: "Estimer mon bien", variant: "primary" },
    },
    {
      icon: Phone,
      title: "Appelez-nous",
      text: "Un conseiller à votre écoute",
      button: { text: "+33 1 23 45 67 89", variant: "outline" },
    },
    {
      icon: Mail,
      title: "Contactez-nous",
      text: "Une question ? Écrivez-nous",
      button: { text: "Envoyer un message", variant: "primary" },
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-navy-500 via-navy-600 to-navy-700 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gold-400 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold-600 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#14204d] mb-6">
            Prêt à concrétiser votre projet immobilier ?
          </h2>
          <p className="text-xl text-[#14204d]/80 mb-12 font-sans">
            Notre équipe d'experts est à votre disposition pour vous accompagner
            à chaque étape
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((item, i) => (
              <div
                key={i}
                className="fade-up opacity-0 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500 flex flex-col items-center text-center min-h-[360px]"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-lg transform transition-transform duration-500 hover:scale-110">
                  <item.icon className="w-8 h-8 text-[#FED9B7]" />
                </div>

                <h3 className="text-xl font-display font-bold text-[#14204d] mb-3">
                  {item.title}
                </h3>
                <p className="text-[#14204d]/80 mb-6 font-sans flex-1">
                  {item.text}
                </p>

                <Button
                  variant={item.button.variant}
                  className={`w-full transition-all duration-300 hover:scale-105 ${
                    item.button.variant === "outline"
                      ? "!border-[#FED9B7] !text-[#14204d] hover:!bg-white hover:!text-navy-500"
                      : ""
                  }`}
                >
                  {item.button.text}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes pulse-slow {
            0%,100% { opacity: 0.7; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.05); }
          }
          .animate-pulse-slow {
            animation: pulse-slow 4s ease-in-out infinite;
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
