import { Star, Quote } from 'lucide-react';
import Card from '../ui/Card';

const testimonials = [
  {
    name: 'Sophie Martin',
    role: 'Propriétaire',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    text: 'Service exceptionnel ! L\'équipe d\'Altis a su comprendre mes besoins et m\'a trouvé la maison parfaite en moins de 3 semaines. Professionnalisme et écoute au rendez-vous.'
  },
  {
    name: 'Jean Dupont',
    role: 'Investisseur',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    text: 'Accompagnement de qualité pour mon investissement locatif. Conseils avisés et suivi impeccable. Je recommande vivement Altis Immobilier pour leur expertise.'
  },
  {
    name: 'Marie Leblanc',
    role: 'Locataire',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    text: 'Recherche d\'appartement facilitée grâce à leur plateforme intuitive. L\'agent a été très réactif et m\'a aidée à trouver mon appartement idéal rapidement.'
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-navy-50 to-gold-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy-500 mb-4">
            Témoignages Clients
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-sans">
            La satisfaction de nos clients est notre plus belle récompense
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-8 relative">
              <Quote className="absolute top-6 right-6 w-12 h-12 text-gold-200" />

              <div className="flex items-center gap-4 mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gold-400"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-display font-bold text-navy-500">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600 font-sans">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold-500 text-gold-500" />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed italic font-sans">
                "{testimonial.text}"
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}