import { Phone, Mail, Calculator } from 'lucide-react';
import Button from '../ui/Button';

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-navy-500 via-navy-600 to-navy-700 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gold-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold-600 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Prêt à concrétiser votre projet immobilier ?
          </h2>
          <p className="text-xl text-navy-100 mb-12 font-sans">
            Notre équipe d'experts est à votre disposition pour vous accompagner à chaque étape
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-500 flex items-center justify-center">
                <Calculator className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-3">
                Estimation gratuite
              </h3>
              <p className="text-navy-100 mb-4 font-sans">
                Évaluez votre bien en quelques clics
              </p>
              <Button variant="primary" className="w-full">
                 bien
              </Button>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-500 flex items-center justify-center">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-3">
                Appelez-nous
              </h3>
              <p className="text-navy-100 mb-4 font-sans">
                Un conseiller à votre écoute
              </p>
              <Button variant="outline" className="w-full !border-white !text-white hover:!bg-white hover:!text-navy-500">
                +33 1 23 45 67 89
              </Button>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-500 flex items-center justify-center">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-3">
                Contactez-nous
              </h3>
              <p className="text-navy-100 mb-4 font-sans">
                Une question ? Écrivez-nous
              </p>
              <Button variant="primary" className="w-full">
                Envoyer un message
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}