import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Send,
} from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Logo from "../ui/Logo";


export default function Footer() {
  return (
    <footer
      className="relative bg-gradient-to-br from-[#f7b79c] via-[#FED9B7] to-[#fef9f8] text-[#14204d] pt-16 pb-8 overflow-hidden"
      role="contentinfo"
    >
      {/* Overlay sombre pour lisibilité */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>

      {/* Dégradé subtil haut */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#FED9B7]/20 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* --- Logo + Présentation --- */}
          <div>
            <Link to="/" className="mb-4 block">
              <div className="scale-90 hover:scale-95 transition-transform duration-300">
                <Logo size="md" showText={true} />
              </div>
            </Link>
            <p className="text-[#14204d]/90 text-sm leading-relaxed mb-4">
              Votre partenaire immobilier de confiance au Sénégal. Expertise,
              élégance et accompagnement sur mesure pour vos projets.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="bg-gradient-to-br from-[#FED9B7] to-[#fef9f8] hover:from-[#fef3e7] hover:to-[#fff9f7] p-2 rounded-lg transition-all shadow-md hover:shadow-[#FED9B7]/30"
                  aria-label="social"
                >
                  <Icon className="w-5 h-5 text-[#14204d]" />
                </a>
              ))}
            </div>
          </div>

          {/* --- Services --- */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4 text-[#14204d]">
              Nos Services
            </h4>
            <ul className="space-y-2 text-[#14204d]/90">
              {[
                ["Vente de biens", "/properties"],
                ["Location", "/properties"],
                ["Estimation gratuite", "/contact"],
                ["Gestion locative", "/properties"],
                ["Conseils en investissement", "/about"],
              ].map(([title, link], i) => (
                <li key={i}>
                  <Link
                    to={link}
                    className="hover:text-[#FED9B7] transition-colors"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Contact --- */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4 text-[#14204d]">
              Contact
            </h4>
            <ul className="space-y-3 text-[#14204d]/90">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-[##14204d] mt-0.5" />
                <span className="text-sm">
                  Rue 10, Almadies
                  <br />
                  Dakar, Sénégal
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-[##14204d]" />
                <a
                  href="tel:+221123456789"
                  className="text-sm hover:text-[#FED9B7] transition-colors"
                >
                  +221 77 800 76 98
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[##14204d]" />
                <a
                  href="mailto:contact@senhabita.sn"
                  className="text-sm hover:text-[#FED9B7] transition-colors"
                >
                  contact@senhabita.sn
                </a>
              </li>
            </ul>
            <div className="mt-4 text-sm text-[#14204d]/70">
              <p className="mb-1">Horaires d'ouverture</p>
              <p>Lun - Ven: 9h00 - 18h30</p>
              <p>Sam: 9h00 - 17h00</p>
            </div>
          </div>

          {/* --- Newsletter --- */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4 text-[#14204d]">
              Newsletter
            </h4>
            <p className="text-[#14204d]/90 text-sm mb-4">
              Recevez nos offres exclusives et nos conseils immobiliers.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Votre email"
                className="w-full px-4 py-3 rounded-lg bg-white/25 border border-[#FED9B7]/30 text-[#14204d] placeholder-[#14204d]/50 focus:outline-none focus:ring-2 focus:ring-[#FED9B7] transition-all"
              />
              <Button
                variant="primary"
                className="w-full bg-gradient-to-r from-[#FED9B7] to-[#fef9f8] hover:from-[#fef3e7] hover:to-[#fff9f7] text-[#14204d] font-semibold shadow-md hover:shadow-[#FED9B7]/40 transition-all"
                type="submit"
              >
                <span className="flex items-center gap-2">
                  <Send className="w-5 h-5 text-[#14204d]" />
                  <span className="text-base font-semibold">Envoyer le message</span>
                </span>
              </Button>
            </form>
          </div>
        </div>

        {/* --- Bas de page --- */}
        <div className="border-t border-[#14204d]/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[#14204d]/70 text-sm">
          <p>© 2025 SEN HABITA. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#FED9B7] transition-colors">
              Mentions légales
            </a>
            <a href="#" className="hover:text-[#FED9B7] transition-colors">
              Confidentialité
            </a>
            <a href="#" className="hover:text-[#FED9B7] transition-colors">
              CGU
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
