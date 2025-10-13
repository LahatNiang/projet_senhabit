import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "information",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gold-50 py-12 animate-fadeIn">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* === HEADER === */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#14204d] mb-4">
              Contactez-nous
            </h1>
            <p className="text-xl text-gray-600">
              Notre équipe est à votre écoute pour répondre à toutes vos
              questions
            </p>
          </div>

          {/* === INFOS DE CONTACT === */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* === TÉLÉPHONE === */}
            <Card className="p-8 text-center group hover:shadow-2xl transition-all">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center bg-white shadow-inner border border-[#FFD700] group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-10 h-10 bg-gradient-to-br from-[#14204d] to-[#FFD700] text-transparent bg-clip-text" />
              </div>
              <h3 className="text-xl font-display font-bold text-[#14204d] mb-3">
                Téléphone
              </h3>
              <a
                href="tel:+33123456789"
                className="text-gold-600 hover:text-gold-700 font-medium text-lg"
              >
                +33 1 23 45 67 89
              </a>
              <p className="text-sm text-gray-600 mt-2">
                Lun - Ven: 9h - 18h30
              </p>
            </Card>

            {/* === EMAIL === */}
            <Card className="p-8 text-center group hover:shadow-2xl transition-all">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center bg-white shadow-inner border border-[#FFD700] group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-10 h-10 bg-gradient-to-br from-[#FFD700] to-[#14204d] text-transparent bg-clip-text" />
              </div>
              <h3 className="text-xl font-display font-bold text-[#14204d] mb-3">
                Email
              </h3>
              <a
                href="mailto:contact@altis.fr"
                className="text-gold-600 hover:text-gold-700 font-medium text-lg"
              >
                contact@altis.fr
              </a>
              <p className="text-sm text-gray-600 mt-2">Réponse sous 24h</p>
            </Card>

            {/* === ADRESSE === */}
            <Card className="p-8 text-center group hover:shadow-2xl transition-all">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center bg-white shadow-inner border border-[#FFD700] group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-10 h-10 bg-gradient-to-br from-[#14204d] to-[#FFD700] text-transparent bg-clip-text" />
              </div>
              <h3 className="text-xl font-display font-bold text-[#14204d] mb-3">
                Adresse
              </h3>
              <p className="text-gray-700 font-medium">
                123 Avenue des Champs-Élysées
              </p>
              <p className="text-gray-600">75008 Paris, France</p>
            </Card>
          </div>

          {/* === FORMULAIRE + INFOS === */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* === FORMULAIRE === */}
            <Card className="p-8">
              <h2 className="text-2xl font-serif font-bold text-[#14204d] mb-6">
                Envoyez-nous un message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Champs du formulaire */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#FFD700] transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#FFD700] transition-colors"
                    />
                  </div>
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
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#FFD700] transition-colors"
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
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#FFD700] transition-colors bg-white"
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
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#FFD700] transition-colors resize-none"
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full bg-gradient-to-r from-[#FFD700] to-[#FF9800] text-[#14204d] font-bold hover:opacity-90"
                >
                  <Send className="w-5 h-5 mr-2 text-[#14204d]" />
                  Envoyer le message
                </Button>
              </form>
            </Card>

            {/* === INFOS SECONDAIRES === */}
            <div className="space-y-6">
              {/* Horaires */}
              <Card className="p-8 text-black">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-[#FFD700] p-4 rounded-xl">
                    <Clock className="w-8 h-8 text-[#14204d]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold mb-3">
                      Horaires d'ouverture
                    </h3>
                    <div className="space-y-2 text-black">
                      <p>Lundi - Vendredi: 9h00 - 18h30</p>
                      <p>Samedi: 9h00 - 17h00</p>
                      <p>Dimanche: Fermé</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Chat */}
              <Card className="p-8  text-black">
                <div className="flex items-start gap-4">
                  <div className="bg-[#FFD700] p-4 rounded-xl">
                    <MessageCircle className="w-8 h-8 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold mb-3">
                      Chat en direct
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Besoin d'une réponse immédiate ? Notre équipe est
                      disponible par chat.
                    </p>
                    <Button className="!bg-white !text-[#14204d] font-semibold hover:!bg-gray-100">
                      Démarrer le chat
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
