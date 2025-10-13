import {
  Home,
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

export default function Footer() {
  return (
    <footer
      className="bg-[#0a0f2c] text-white pt-16 pb-8 border-t border-[#14204d]"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* === Grille principale === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* === Bloc logo et description === */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-5 w-fit group">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#FFD700] via-[#FFC107] to-[#FF9800]">
                <Home className="w-6 h-6 text-navy-950" />
              </div>
              <h3 className="text-xl font-display font-bold bg-gradient-to-br from-[#FFD700] via-[#FFC107] to-[#FF9800] bg-clip-text text-transparent">
                Sen Habita
              </h3>
            </Link>

            <p className="text-gray-300 text-sm leading-relaxed mb-5 font-sans">
              Votre partenaire de confiance pour trouver la propriété de vos
              rêves. Expertise, professionnalisme et accompagnement
              personnalisé.
            </p>

            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Réseaux sociaux"
                  className="p-2 rounded-lg bg-[#14204d] hover:bg-gradient-to-br hover:from-[#FFD700] hover:via-[#FFC107] hover:to-[#FF9800] transition-all"
                >
                  <Icon className="w-5 h-5 text-white hover:text-navy-950 transition-all" />
                </a>
              ))}
            </div>
          </div>

          {/* === Services === */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4 bg-gradient-to-br from-[#FFD700] via-[#FFC107] to-[#FF9800] bg-clip-text text-transparent">
              Nos Services
            </h4>
            <ul className="space-y-2 text-gray-300 font-sans">
              {[
                ["Vente de biens", "/properties"],
                ["Location", "/properties"],
                ["Estimation gratuite", "/contact"],
                ["Gestion locative", "/properties"],
                ["Conseils en investissement", "/about"],
              ].map(([label, link]) => (
                <li key={label}>
                  <Link
                    to={link}
                    className="transition-all hover:bg-gradient-to-br hover:from-[#FFD700] hover:via-[#FFC107] hover:to-[#FF9800] hover:bg-clip-text hover:text-transparent"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* === Contact === */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4 bg-gradient-to-br from-[#FFD700] via-[#FFC107] to-[#FF9800] bg-clip-text text-transparent">
              Contact
            </h4>
            <ul className="space-y-3 text-gray-300 font-sans">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  123 Avenue des Champs-Élysées
                  <br />
                  75008 Paris, France
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#FFD700] flex-shrink-0" />
                <a
                  href="tel:+33123456789"
                  className="text-sm hover:bg-gradient-to-br hover:from-[#FFD700] hover:via-[#FFC107] hover:to-[#FF9800] hover:bg-clip-text hover:text-transparent transition-all"
                >
                  +33 1 23 45 67 89
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#FFD700] flex-shrink-0" />
                <a
                  href="mailto:contact@altis.fr"
                  className="text-sm hover:bg-gradient-to-br hover:from-[#FFD700] hover:via-[#FFC107] hover:to-[#FF9800] hover:bg-clip-text hover:text-transparent transition-all"
                >
                  contact@altis.fr
                </a>
              </li>
            </ul>

            <div className="mt-4">
              <p className="text-sm text-gray-400 mb-1">Horaires</p>
              <p className="text-xs text-gray-500">Lun - Ven : 9h00 - 18h30</p>
              <p className="text-xs text-gray-500">Sam : 9h00 - 17h00</p>
            </div>
          </div>

          {/* === Newsletter === */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4 bg-gradient-to-br from-[#FFD700] via-[#FFC107] to-[#FF9800] bg-clip-text text-transparent">
              Newsletter
            </h4>
            <p className="text-gray-300 text-sm mb-4 font-sans">
              Recevez nos dernières offres et actualités immobilières.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Votre email"
                className="w-full px-4 py-3 rounded-lg bg-[#14204d]border border-[#1f2a5c] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition-all"
                aria-label="Adresse email pour la newsletter"
                required
              />
              <Button
                variant="primary"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-br from-[#FFD700] via-[#FFC107] to-[#FF9800] hover:opacity-90 text-navy-950 font-semibold py-3 rounded-lg transition-all"
                type="submit"
              >
                <Send className="w-4 h-4" />
                S'abonner
              </Button>
            </form>
          </div>
        </div>

        {/* === Bas de page === */}
        <div className="border-t border-[#14204d] pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
          <p className="font-sans">
            © {new Date().getFullYear()} Sen Habita. Tous droits réservés.
          </p>
          <div className="flex gap-6 font-sans">
            {["Mentions légales", "Confidentialité", "CGU"].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:bg-gradient-to-br hover:from-[#FFD700] hover:via-[#FFC107] hover:to-[#FF9800] hover:bg-clip-text hover:text-transparent transition-all"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
