import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Send,
  Heart,
  ArrowRight,
  Check,
  Clock,
  Shield,
} from "lucide-react";

type NewsletterStatus = "success" | "error" | null;

export default function Footer() {
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] =
    useState<NewsletterStatus>(null);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNewsletterStatus("success");
      setEmail("");
      setTimeout(() => setNewsletterStatus(null), 3000);
    } else {
      setNewsletterStatus("error");
      setTimeout(() => setNewsletterStatus(null), 3000);
    }
  };

  const socialLinks = [
    {
      Icon: Facebook,
      href: "#",
      color: "from-blue-500 to-blue-600",
      label: "Facebook",
    },
    {
      Icon: Twitter,
      href: "#",
      color: "from-sky-400 to-sky-600",
      label: "Twitter",
    },
    {
      Icon: Instagram,
      href: "#",
      color: "from-pink-500 to-rose-600",
      label: "Instagram",
    },
    {
      Icon: Linkedin,
      href: "#",
      color: "from-blue-600 to-blue-700",
      label: "LinkedIn",
    },
  ];

  const services = [
    { title: "Vente de biens", link: "/properties" },
    { title: "Location", link: "/properties" },
    { title: "Estimation gratuite", link: "/contact" },
    { title: "Gestion locative", link: "/properties" },
    { title: "Conseils en investissement", link: "/about" },
  ];

  

  return (
    <footer className="relative bg-gradient-to-br from-[#14204d] via-[#1a2857] to-[#14204d] text-white overflow-hidden">
      {/* Effets de fond animés */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#FED9B7] to-[#f7b79c] rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#f7b79c] to-[#FED9B7] rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-br from-[#FED9B7] to-[#f7b79c] rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Grille de fond subtile */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(254, 217, 183, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(254, 217, 183, 0.3) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Stats Bar - Nouveau */}
        <div className="py-12 border-b border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          {/* Logo + Description */}
          <div className="space-y-6">
            <div className="group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FED9B7] to-[#f7b79c] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <span className="text-2xl font-bold text-[#14204d]">SH</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-[#FED9B7] to-[#f7b79c] text-transparent bg-clip-text">
                  SEN HABITA
                </span>
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed">
              Votre partenaire immobilier de confiance au Sénégal. Expertise,
              élégance et accompagnement sur mesure pour tous vos projets.
            </p>

            {/* Badges de confiance */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-emerald-300">Certifié</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30">
                <Check className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-blue-300">Vérifié</span>
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, href, color, label }, i) => (
                <a
                  key={i}
                  href={href}
                  aria-label={label}
                  className="group relative"
                >
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 hover:-translate-y-1 transition-all duration-300`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  {/* Tooltip */}
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-[#14204d] px-3 py-1 rounded-lg text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-xl mb-6 text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-[#FED9B7] to-[#f7b79c] rounded-full"></div>
              Nos Services
            </h4>
            <ul className="space-y-3">
              {services.map(({ title, link }, i) => (
                <li key={i}>
                  <a
                    href={link}
                    className="group flex items-center gap-2 text-gray-300 hover:text-[#FED9B7] transition-all duration-300"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {title}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-xl mb-6 text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-[#FED9B7] to-[#f7b79c] rounded-full"></div>
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="group">
                <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-300 leading-relaxed">
                      Rue 10, Almadies
                      <br />
                      Dakar, Sénégal
                    </p>
                  </div>
                </div>
              </li>

              <li className="group">
                <a
                  href="tel:+221778007698"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm text-gray-300 group-hover:text-[#FED9B7] transition-colors">
                    +221 77 800 76 98
                  </span>
                </a>
              </li>

              <li className="group">
                <a
                  href="mailto:contact@senhabita.sn"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm text-gray-300 group-hover:text-[#FED9B7] transition-colors">
                    contact@senhabita.sn
                  </span>
                </a>
              </li>
            </ul>

            {/* Horaires */}
            <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-[#FED9B7]" />
                <p className="text-sm font-semibold text-white">Horaires</p>
              </div>
              <div className="space-y-1 text-xs text-gray-300">
                <p className="flex justify-between">
                  <span>Lun - Ven</span>
                  <span className="text-[#FED9B7] font-semibold">
                    9h00 - 18h30
                  </span>
                </p>
                <p className="flex justify-between">
                  <span>Samedi</span>
                  <span className="text-[#FED9B7] font-semibold">
                    9h00 - 17h00
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-xl mb-6 text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-[#FED9B7] to-[#f7b79c] rounded-full"></div>
              Newsletter
            </h4>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              Recevez nos offres exclusives et nos meilleurs conseils
              immobiliers directement dans votre boîte mail.
            </p>

            <form onSubmit={handleNewsletterSubmit}>
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="w-full px-4 py-3 pr-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#FED9B7] focus:bg-white/15 transition-all"
                  />
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>

                <button
                  type="submit"
                  className="group w-full bg-gradient-to-r from-[#FED9B7] to-[#f7b79c] hover:from-[#f7b79c] hover:to-[#FED9B7] text-[#14204d] font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                >
                  <span>S'abonner</span>
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Message de statut */}
                {newsletterStatus && (
                  <div
                    className={`p-3 rounded-xl border flex items-center gap-2 animate-fadeIn ${
                      newsletterStatus === "success"
                        ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-300"
                        : "bg-red-500/20 border-red-500/30 text-red-300"
                    }`}
                  >
                    {newsletterStatus === "success" ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span className="text-sm font-semibold">
                          Inscription réussie !
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-sm font-semibold">
                          Email invalide
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </form>

            {/* Garanties */}
            <div className="mt-6 space-y-2">
              {[
                { icon: Check, text: "Pas de spam" },
                { icon: Check, text: "Désinscription facile" },
                { icon: Shield, text: "Données protégées" },
              ].map(({ icon: Icon, text }, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-xs text-gray-400"
                >
                  <Icon className="w-4 h-4 text-[#FED9B7]" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bas de page */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <p>© 2025 SEN HABITA. Tous droits réservés.</p>
              <span className="hidden md:inline">•</span>
              <p className="flex items-center gap-1">
                Fait avec{" "}
                <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />{" "}
                au Sénégal
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {["Mentions légales", "Confidentialité", "CGU", "Cookies"].map(
                (link, i) => (
                  <a
                    key={i}
                    href="#"
                    className="text-gray-400 hover:text-[#FED9B7] transition-colors relative group"
                  >
                    {link}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FED9B7] group-hover:w-full transition-all duration-300"></span>
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 20s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </footer>
  );
}
