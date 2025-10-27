import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Logo from "../components/ui/Logo";

// ✅ Animation d’apparition au scroll
function useScrollAnimation() {
  useEffect(() => {
    const els = document.querySelectorAll(".fade-up");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            entry.target.classList.add("animate-fadeUp");
        });
      },
      { threshold: 0.2 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ✅ Typage fort du formulaire
interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function Contact() {
  useScrollAnimation();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "information",
    message: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: appeler ton API ou afficher une confirmation
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#fffdf8] via-[#fefaf3] to-[#fff9f6] overflow-hidden">
      {/* ORNEMENT DÉGRADÉ */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-[-80px] left-[-100px] w-[400px] h-[400px] rounded-full blur-3xl bg-gradient-to-r from-[#FED9B7] to-[#f7b79c] animate-pulse-slow"></div>
        <div className="absolute bottom-[-100px] right-[-80px] w-[350px] h-[350px] rounded-full blur-3xl bg-gradient-to-r from-[#f7b79c] to-[#FED9B7] animate-pulse-slow"></div>
      </div>

      {/* HEADER */}
      <div className="relative flex flex-col items-center text-center py-16 fade-up opacity-0 z-10">
        <Logo size="lg" showText={false} />
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#14204d] mt-5 drop-shadow-sm">
          Contactez-nous
        </h1>
        <div className="h-1 w-32 bg-gradient-to-r from-[#FED9B7] to-[#f7b79c] rounded-full mt-4"></div>
        <p className="text-gray-600 mt-6 max-w-lg opacity-90">
          Une question, un projet ou besoin d’assistance ? Notre équipe vous
          répond avec attention et professionnalisme.
        </p>
      </div>

      {/* INFOS RAPIDES */}
      <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-10 w-full max-w-6xl mx-auto mb-20 px-6 fade-up opacity-0 z-10">
        {[
          {
            icon: Phone,
            title: "Téléphone",
            info: "+221 77 123 45 67",
            sub: "Lun - Ven : 9h - 18h30",
          },
          {
            icon: Mail,
            title: "Email",
            info: "contact@senhabita.sn",
            sub: "Réponse sous 24h",
          },
          {
            icon: MapPin,
            title: "Adresse",
            info: "Dakar, Sénégal",
            sub: "Immeuble SEN HABITA",
          },
        ].map(({ icon: Icon, title, info, sub }, i) => (
          <Card
            key={i}
            className="p-10 text-center rounded-3xl bg-white/70 backdrop-blur-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-[#FED9B7] to-[#f7b79c] flex items-center justify-center shadow-lg">
              <Icon className="w-10 h-10 text-white drop-shadow-sm" />
            </div>
            <h3 className="text-xl font-semibold text-[#14204d] mb-2">
              {title}
            </h3>
            <p className="text-[#f7b79c] font-medium text-lg">{info}</p>
            <p className="text-gray-500 text-sm mt-1">{sub}</p>
          </Card>
        ))}
      </div>

      {/* FORMULAIRE + INFOS COMPLÉMENTAIRES */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl mx-auto px-6 fade-up opacity-0 z-10">
        {/* FORM */}
        <Card className="p-10 rounded-3xl border border-[#FED9B7]/30 shadow-lg backdrop-blur-lg bg-white/80">
          <h2 className="text-3xl font-serif font-bold text-[#14204d] mb-8">
            Envoyez-nous un message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(["name", "email"] as (keyof FormData)[]).map((field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {field === "name" ? "Nom complet *" : "Email *"}
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    id={field}
                    name={field}
                    required
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#f7b79c] transition-all duration-300 bg-white/90"
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#f7b79c] transition bg-white/90"
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Sujet *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#f7b79c] bg-white/90 transition"
                >
                  <option value="information">Demande d'information</option>
                  <option value="visite">Planifier une visite</option>
                  <option value="estimation">Estimation de bien</option>
                  <option value="vente">Vendre un bien</option>
                  <option value="location">Location</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#f7b79c] resize-none transition bg-white/90"
              ></textarea>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#FED9B7] to-[#f7b79c] text-[#14204d] hover:scale-[1.03] transition-transform shadow-xl"
            >
              <span className="flex items-center gap-2">
                <Send className="w-5 h-5 text-[#14204d]" />
                <span className="text-base font-semibold">Envoyer le message</span>
              </span>
            </Button>
          </form>
        </Card>
 
        {/* INFOS SUPPLÉMENTAIRES */}
        <div className="space-y-8">
          <Card className="p-8 bg-gradient-to-br from-[#14204d] to-[#1b285a] text-white rounded-3xl shadow-lg backdrop-blur-md bg-opacity-90">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-r from-[#FED9B7] to-[#f7b79c] p-4 rounded-xl">
                <Clock className="w-8 h-8 text-[#14204d]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Horaires d'ouverture</h3>
                <p>Lundi - Vendredi : 8h30 - 18h00</p>
                <p>Samedi : 9h00 - 16h00</p>
                <p>Dimanche : Fermé</p>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-to-r from-[#FED9B7] to-[#f7b79c] text-[#14204d] rounded-3xl shadow-lg backdrop-blur-md bg-opacity-90">
            <div className="flex items-start gap-4">
              <div className="bg-white/30 p-4 rounded-xl">
                <MessageCircle className="w-8 h-8 text-[#14204d]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Chat en direct</h3>
                <p className="text-[#14204d]/80 mb-4">
                  Besoin d'une réponse rapide ? Nos conseillers sont disponibles
                  pour échanger avec vous.
                </p>
                <Button
                  variant="secondary"
                  className="!bg-[#14204d] !text-white hover:!bg-[#1b285a]"
                >
                  Démarrer le chat
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="text-center text-gray-500 mt-16 py-6 fade-up opacity-0">
        © 2025 <span className="font-semibold text-[#14204d]">SEN HABITA</span>{" "}
        — Tous droits réservés
      </footer>

      {/* Animations */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp {
          animation: fadeUp 1s ease-out forwards;
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 7s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
