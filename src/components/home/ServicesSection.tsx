import { ShoppingBag, Key, Home, TrendingUp } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import Card from "../ui/Card";

export default function ServicesSection() {
  const services = [
    {
      icon: ShoppingBag,
      title: "Vendre votre bien",
      description:
        "Estimation gratuite, visibilité maximale et accompagnement jusqu'à la vente finale.",
      color: "from-[#FFD700] to-[#FFC107]",
    },
    {
      icon: Key,
      title: "Acheter un bien",
      description:
        "Large sélection de propriétés et conseils d'experts pour votre projet d'achat.",
      color: "from-[#14204d] to-[#0a0f2c]",
    },
    {
      icon: Home,
      title: "Louer un bien",
      description:
        "Trouvez votre location idéale avec notre portefeuille diversifié de biens.",
      color: "from-[#FFD700] to-[#FFC107]",
    },
    {
      icon: TrendingUp,
      title: "Estimation gratuite",
      description:
        "Évaluez la valeur de votre bien en quelques minutes avec nos experts.",
      color: "from-[#14204d] to-[#0a0f2c]",
    },
  ];

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.42, 0, 0.58, 1] }, // cubic-bezier
    },
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  return (
    <section className="py-20 bg-white" id="services">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#14204d] mb-4">
            Nos Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-sans">
            Un accompagnement complet pour tous vos projets immobiliers
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card className="p-8 text-center group">
                <div
                  className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <service.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-display font-bold text-[#14204d] mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-sans">
                  {service.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
