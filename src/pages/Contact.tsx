import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, CheckCircle, AlertCircle, X, Loader, Shield } from "lucide-react";

// Types pour le formulaire
type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type Errors = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

type Touched = {
  name?: boolean;
  email?: boolean;
  phone?: boolean;
  message?: boolean;
};

type Notification = {
  type: "success" | "error";
  message: string;
};

// Type pour les validateurs
type Validators = {
  [key: string]: (value: string) => string;
};

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

const validators: Validators = {
  name: (value: string) => {
    if (!value || value.trim().length < 2) return "Le nom doit contenir au moins 2 caractères";
    if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(value)) return "Le nom ne peut contenir que des lettres";
    if (value.trim().length > 50) return "Le nom ne peut dépasser 50 caractères";
    return "";
  },
  email: (value: string) => {
    if (!value) return "L'email est requis";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Format d'email invalide";
    return "";
  },
  phone: (value: string) => {
    if (!value) return "";
    const phoneRegex = /^(\+221)?[0-9\s-]{9,15}$/;
    if (!phoneRegex.test(value)) return "Format invalide (ex: +221 77 123 45 67)";
    return "";
  },
  message: (value: string) => {
    if (!value || value.trim().length < 10) return "Le message doit contenir au moins 10 caractères";
    if (value.trim().length > 1000) return "Le message ne peut dépasser 1000 caractères";
    return "";
  }
};

export default function Contact() {
  useScrollAnimation();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "information",
    message: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Touched>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<Notification | null>(null);
  const [charCount, setCharCount] = useState(0);

  const validateField = (name: keyof FormData, value: string): string => {
    if (validators[name]) {
      return validators[name](value);
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === "message") {
      if (value.length > 1000) return;
      setCharCount(value.length);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name as keyof Touched]) {
      const error = validateField(name as keyof FormData, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name as keyof FormData, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    
    newErrors.name = validators.name(formData.name);
    newErrors.email = validators.email(formData.email);
    newErrors.message = validators.message(formData.message);
    
    if (formData.phone) {
      newErrors.phone = validators.phone(formData.phone);
    }

    setErrors(newErrors);
    
    return Object.values(newErrors).every(error => !error);
  };

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setTouched({
      name: true,
      email: true,
      phone: true,
      message: true
    });

    if (!validateForm()) {
      showNotification("error", "Veuillez corriger les erreurs dans le formulaire");
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Enregistrement dans la console (à remplacer par ton API)
      console.log("📨 Données du formulaire envoyées:", {
        ...formData,
        timestamp: new Date().toISOString(),
        source: "Contact Page"
      });
      
      // Ici tu remplaceras par ton appel API:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      showNotification("success", "✅ Votre message a été envoyé avec succès ! Nous vous répondrons sous 24h.");
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "information",
        message: "",
      });
      setErrors({});
      setTouched({});
      setCharCount(0);
      
    } catch (error) {
      showNotification("error", "❌ Une erreur s'est produite. Veuillez réessayer.");
      console.error("Erreur:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#fffdf8] via-[#fefaf3] to-[#fff9f6] overflow-hidden">
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-8 right-8 z-50 max-w-md animate-slideIn">
          <div className={`flex items-start gap-4 p-6 rounded-2xl shadow-2xl backdrop-blur-xl border-2 ${
            notification.type === "success" 
              ? "bg-emerald-50/95 border-emerald-200" 
              : "bg-red-50/95 border-red-200"
          }`}>
            <div className={`p-2 rounded-full ${
              notification.type === "success" 
                ? "bg-emerald-100" 
                : "bg-red-100"
            }`}>
              {notification.type === "success" ? (
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-600" />
              )}
            </div>
            <div className="flex-1">
              <h4 className={`font-bold mb-1 ${
                notification.type === "success" 
                  ? "text-emerald-900" 
                  : "text-red-900"
              }`}>
                {notification.type === "success" ? "Succès !" : "Erreur"}
              </h4>
              <p className={`text-sm ${
                notification.type === "success" 
                  ? "text-emerald-700" 
                  : "text-red-700"
              }`}>
                {notification.message}
              </p>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* ORNEMENT */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-[-80px] left-[-100px] w-[400px] h-[400px] rounded-full blur-3xl bg-gradient-to-r from-[#FED9B7] to-[#f7b79c] animate-pulse-slow"></div>
        <div className="absolute bottom-[-100px] right-[-80px] w-[350px] h-[350px] rounded-full blur-3xl bg-gradient-to-r from-[#f7b79c] to-[#FED9B7] animate-pulse-slow"></div>
      </div>

      {/* HEADER */}
      <div className="relative flex flex-col items-center text-center py-16 fade-up opacity-0 z-10">
        <div className="w-20 h-20 bg-gradient-to-r from-[#FED9B7] to-[#f7b79c] rounded-2xl flex items-center justify-center shadow-xl mb-6 animate-bounce-slow">
          <Mail className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#14204d] mt-5 drop-shadow-sm">
          Contactez-nous
        </h1>
        <div className="h-1 w-32 bg-gradient-to-r from-[#FED9B7] to-[#f7b79c] rounded-full mt-4"></div>
        <p className="text-gray-600 mt-6 max-w-lg opacity-90 text-lg">
          Une question, un projet ou besoin d'assistance ? Notre équipe vous répond avec attention et professionnalisme.
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
            gradient: "from-blue-500 to-blue-600"
          },
          {
            icon: Mail,
            title: "Email",
            info: "contact@senhabita.sn",
            sub: "Réponse sous 24h",
            gradient: "from-purple-500 to-purple-600"
          },
          {
            icon: MapPin,
            title: "Adresse",
            info: "Dakar, Sénégal",
            sub: "Immeuble SEN HABITA",
            gradient: "from-pink-500 to-pink-600"
          },
        ].map(({ icon: Icon, title, info, sub, gradient }, i) => (
          <div
            key={i}
            className="p-10 text-center rounded-3xl bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 border border-white/50"
          >
            <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform`}>
              <Icon className="w-10 h-10 text-white drop-shadow-sm" />
            </div>
            <h3 className="text-xl font-semibold text-[#14204d] mb-2">
              {title}
            </h3>
            <p className="text-[#f7b79c] font-medium text-lg">{info}</p>
            <p className="text-gray-500 text-sm mt-1">{sub}</p>
          </div>
        ))}
      </div>

      {/* FORMULAIRE */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl mx-auto px-6 fade-up opacity-0 z-10 mb-20">
        <div className="p-10 rounded-3xl border-2 border-[#FED9B7]/30 shadow-2xl backdrop-blur-lg bg-white/90">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-3xl font-serif font-bold text-[#14204d]">
              Envoyez-nous un message
            </h2>
            <div className="bg-emerald-100 p-2 rounded-lg">
              <Shield className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <p className="text-gray-600 mb-8">Tous les champs marqués d'un <span className="text-red-500 font-bold">*</span> sont obligatoires</p>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nom */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Nom complet <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 bg-white ${
                    errors.name && touched.name
                      ? "border-red-400 focus:border-red-500 shake"
                      : "border-gray-200 focus:border-[#f7b79c] focus:shadow-lg"
                  }`}
                  placeholder="Jean Dupont"
                />
                {errors.name && touched.name && (
                  <p className="text-red-500 text-xs mt-2 flex items-center gap-1 animate-fadeIn">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 bg-white ${
                    errors.email && touched.email
                      ? "border-red-400 focus:border-red-500 shake"
                      : "border-gray-200 focus:border-[#f7b79c] focus:shadow-lg"
                  }`}
                  placeholder="jean.dupont@example.com"
                />
                {errors.email && touched.email && (
                  <p className="text-red-500 text-xs mt-2 flex items-center gap-1 animate-fadeIn">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Téléphone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition bg-white ${
                    errors.phone && touched.phone
                      ? "border-red-400 focus:border-red-500 shake"
                      : "border-gray-200 focus:border-[#f7b79c] focus:shadow-lg"
                  }`}
                  placeholder="+221 77 123 45 67"
                />
                {errors.phone && touched.phone && (
                  <p className="text-red-500 text-xs mt-2 flex items-center gap-1 animate-fadeIn">
                    <AlertCircle className="w-3 h-3" />
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Sujet */}
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                  Sujet <span className="text-red-500">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#f7b79c] focus:shadow-lg bg-white transition"
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

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none resize-none transition bg-white ${
                  errors.message && touched.message
                    ? "border-red-400 focus:border-red-500 shake"
                    : "border-gray-200 focus:border-[#f7b79c] focus:shadow-lg"
                }`}
                placeholder="Décrivez votre projet ou votre demande en détail..."
              ></textarea>
              <div className="flex justify-between items-center mt-2">
                {errors.message && touched.message ? (
                  <p className="text-red-500 text-xs flex items-center gap-1 animate-fadeIn">
                    <AlertCircle className="w-3 h-3" />
                    {errors.message}
                  </p>
                ) : (
                  <div></div>
                )}
                <p className={`text-xs transition-colors ${charCount > 900 ? 'text-orange-500 font-semibold' : 'text-gray-500'}`}>
                  {charCount}/1000 caractères
                </p>
              </div>
            </div>

            {/* Bouton Submit */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#FED9B7] to-[#f7b79c] text-[#14204d] py-4 rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Envoi en cours...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Envoyer le message</span>
                </>
              )}
            </button>

            {/* Garanties */}
            <div className="flex items-center justify-center gap-4 text-xs text-gray-600 mt-4 flex-wrap">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-emerald-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                </div>
                <span>Données sécurisées</span>
              </div>
              <span className="text-gray-400">•</span>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-blue-600" />
                </div>
                <span>Réponse sous 24h</span>
              </div>
              <span className="text-gray-400">•</span>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <Shield className="w-3 h-3 text-purple-600" />
                </div>
                <span>100% confidentiel</span>
              </div>
            </div>
          </div>
        </div>
 
        {/* INFOS COMPLÉMENTAIRES */}
        <div className="space-y-8">
          <div className="p-8 bg-gradient-to-br from-[#14204d] to-[#1b285a] text-white rounded-3xl shadow-2xl backdrop-blur-md border border-white/10 hover:scale-[1.02] transition-transform">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-r from-[#FED9B7] to-[#f7b79c] p-4 rounded-xl shadow-lg">
                <Clock className="w-8 h-8 text-[#14204d]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Horaires d'ouverture</h3>
                <div className="space-y-2">
                  <p className="flex justify-between gap-4">
                    <span>Lundi - Vendredi</span>
                    <span className="font-semibold text-[#FED9B7]">8h30 - 18h00</span>
                  </p>
                  <p className="flex justify-between gap-4">
                    <span>Samedi</span>
                    <span className="font-semibold text-[#FED9B7]">9h00 - 16h00</span>
                  </p>
                  <p className="flex justify-between gap-4">
                    <span>Dimanche</span>
                    <span className="font-semibold text-red-300">Fermé</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 bg-gradient-to-r from-[#FED9B7] to-[#f7b79c] text-[#14204d] rounded-3xl shadow-2xl backdrop-blur-md hover:scale-[1.02] transition-transform">
            <div className="flex items-start gap-4">
              <div className="bg-white/40 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                <MessageCircle className="w-8 h-8 text-[#14204d]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Chat en direct</h3>
                <p className="text-[#14204d]/80 mb-4">
                  Besoin d'une réponse rapide ? Nos conseillers sont disponibles pour échanger avec vous en temps réel.
                </p>
                <button className="bg-[#14204d] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1b285a] hover:scale-105 transition-all shadow-lg">
                  Démarrer le chat
                </button>
              </div>
            </div>
          </div>

          {/* Carte de confiance */}
          <div className="p-8 bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border-2 border-[#FED9B7]/30 hover:shadow-2xl transition-shadow">
            <h3 className="text-xl font-bold text-[#14204d] mb-4">Pourquoi nous faire confiance ?</h3>
            <div className="space-y-3">
              {[
                { icon: CheckCircle, text: "Réponse garantie sous 24h", color: "text-emerald-500" },
                { icon: CheckCircle, text: "Équipe professionnelle certifiée", color: "text-blue-500" },
                { icon: CheckCircle, text: "Confidentialité totale assurée", color: "text-purple-500" },
                { icon: CheckCircle, text: "+500 clients satisfaits", color: "text-orange-500" }
              ].map(({ icon: Icon, text, color }, i) => (
                <div key={i} className="flex items-center gap-3 hover:translate-x-2 transition-transform">
                  <Icon className={`w-5 h-5 ${color}`} />
                  <span className="text-gray-700">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="text-center text-gray-500 py-8 fade-up opacity-0 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <p className="mb-2">
          © 2025 <span className="font-semibold text-[#14204d]">SEN HABITA</span> — Tous droits réservés
        </p>
        <p className="text-sm flex items-center justify-center gap-2">
          <Shield className="w-4 h-4 text-emerald-600" />
          Vos données sont protégées et ne seront jamais partagées
        </p>
      </footer>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp {
          animation: fadeUp 1s ease-out forwards;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .shake {
          animation: shake 0.3s ease-out;
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 7s ease-in-out infinite;
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}