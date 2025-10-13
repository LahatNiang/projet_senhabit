import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const blogPosts = [
  {
    id: '1',
    title: '10 conseils pour réussir votre investissement locatif',
    excerpt: 'Découvrez les meilleures stratégies pour maximiser votre rentabilité locative et éviter les pièges courants.',
    image: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: '15 Mars 2024',
    readTime: 5,
    category: 'Investissement'
  },
  {
    id: '2',
    title: 'Guide complet de l\'achat immobilier en 2024',
    excerpt: 'Toutes les étapes à suivre pour acheter votre bien immobilier en toute sérénité cette année.',
    image: 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: '12 Mars 2024',
    readTime: 8,
    category: 'Achat'
  },
  {
    id: '3',
    title: 'Les quartiers en pleine évolution à Paris',
    excerpt: 'Identifiez les zones à fort potentiel pour votre prochain achat ou investissement immobilier.',
    image: 'https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: '8 Mars 2024',
    readTime: 6,
    category: 'Marché'
  }
];

export default function BlogSection() {
  return (
    <section className="py-20 bg-white" id="blog">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy-500 mb-4">
            Actualités & Conseils
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-sans">
            Restez informé des dernières tendances du marché immobilier
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {blogPosts.map((post) => (
            <Card key={post.id} className="group overflow-hidden">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-gold-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3 font-sans">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime} min</span>
                  </div>
                </div>

                <h3 className="text-xl font-display font-bold text-navy-500 mb-3 group-hover:text-gold-500 transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed font-sans">
                  {post.excerpt}
                </p>

                <button className="flex items-center gap-2 text-gold-500 font-semibold hover:gap-3 transition-all font-sans">
                  Lire l'article
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg">
            Voir tous les articles
          </Button>
        </div>
      </div>
    </section>
  );
}