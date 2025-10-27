import { useEffect } from "react";
import { Star, Quote } from "lucide-react";
import Card from "../ui/Card";

// Animation d'apparition (IntersectionObserver)
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

const testimonials = [
  {
    name: "Aminata Diop",
    role: "Propriétaire à Dakar",
    image:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200",
    rating: 5,
    text: "SEN HABITA m’a aidée à vendre ma maison en un temps record. Une équipe professionnelle, humaine et à l’écoute. Je suis ravie du service et du suivi personnalisé !",
  },
  {
    name: "Cheikh Ndiaye",
    role: "Investisseur immobilier",
    image:
      "https://images.unsplash.com/photo-1605602517387-ec78b947335e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTJ8fGhvbW1lJTIwbm9pcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
    rating: 4,
    text: "J’ai pu investir dans un immeuble locatif à Dakar grâce à leurs conseils. Une vraie expertise locale et un accompagnement transparent à chaque étape.",
  },
  {
    name: "Fatou Sow",
    role: "Locataire à Mermoz",
    image:
      "https://images.unsplash.com/photo-1699105987147-caa9269b684a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE2fHxmZW1tZSUyMGQnYWZmYWlyZSUyMHRlaW50JTIwbm9pcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
    rating: 5,
    text: "Trouver un appartement n’a jamais été aussi simple. SEN HABITA m’a trouvé un logement moderne et bien situé en moins d’une semaine !",
  },
  {
    name: "Mamadou Ba",
    role: "Acheteur de résidence",
    image:
      "https://images.unsplash.com/photo-1616805765352-beedbad46b2a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGhvbW1lJTIwbm9pcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
    rating: 5,
    text: "Une expérience haut de gamme du début à la fin. L’équipe a compris mes besoins et a trouvé exactement le bien que je recherchais. Merci pour votre professionnalisme !",
  },
  {
    name: "Awa Cissé",
    role: "Investisseuse à Thiès",
    image:
      "https://images.unsplash.com/photo-1686628101920-990fec5e6fbc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGZlbW1lJTIwZCdhZmZhaXJlJTIwdGVpbnQlMjBub2lyfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
    rating: 4,
    text: "Très bon accompagnement pour mon premier projet d’investissement. J’ai apprécié la disponibilité et les explications claires tout au long du processus.",
  },
];

export default function TestimonialsSection() {
  useScrollAnimation();

  return (
    <section className="py-24 bg-gradient-to-b from-[#f7f7f9] via-[#faf9f5] to-[#fffbea] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-yellow-100/20 via-transparent to-transparent pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        {/* --- Titre principal --- */}
        <div className="text-center mb-16 fade-up opacity-0 transition-all duration-700">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#14204d] mb-4">
            Témoignages Clients
          </h2>
          <p className="text-lg text-[#14204d] max-w-2xl mx-auto font-sans">
            Leur confiance est notre plus belle réussite.
          </p>
        </div>

        {/* --- Cartes de témoignages --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="fade-up opacity-0 p-8 bg-gradient-to-br from-[#FED9B7] to-[#fef9f8] shadow-xl rounded-2xl border border-[#FED9B7] hover:shadow-[0_0_25px_rgba(254,217,183,0.25)] transition-all duration-700 relative group"
              style={{
                animationDelay: `${index * 0.2}s`,
              }}
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-[#FED9B7] group-hover:text-[#fef9f8] transition-colors duration-300" />

              <div className="flex items-center gap-4 mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#FED9B7] shadow-md"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-display font-bold text-[#14204d]">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-[#14204d] font-sans">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              {/* --- Étoiles --- */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating
                        ? "fill-[#14204d] text-[#14204d]"
                        : "text-gray-300"
                    } transition-colors duration-300`}
                  />
                ))}
              </div>

              <p className="text-[#14204d] leading-relaxed italic font-sans">
                “{testimonial.text}”
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* --- Styles d'animation personnalisés --- */}
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
