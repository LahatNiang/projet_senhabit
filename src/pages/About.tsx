import { motion, type Variants } from "framer-motion";
import { Award, Users, TrendingUp, Heart, Target, Shield } from "lucide-react";
import Button from "../components/ui/Button";

const team = [
  {
    name: "Sophie Martin",
    role: "Directrice Générale",
    image:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
    specialty: "Gestion & Stratégie",
  },
  {
    name: "Jean Dupont",
    role: "Expert Investissement",
    image:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400",
    specialty: "Conseil patrimonial",
  },
  {
    name: "Marie Leblanc",
    role: "Agent Commercial",
    image:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400",
    specialty: "Vente & Location",
  },
  {
    name: "Thomas Bernard",
    role: "Responsable Marketing",
    image:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400",
    specialty: "Communication digitale",
  },
];

const values = [
  {
    icon: Heart,
    title: "Passion",
    description:
      "Nous aimons ce que nous faisons et cela se reflète dans chaque projet.",
  },
  {
    icon: Shield,
    title: "Confiance",
    description: "Transparence et honnêteté dans toutes nos interactions.",
  },
  {
    icon: Target,
    title: "Excellence",
    description:
      "Un service de qualité supérieure pour chaque client et chaque projet.",
  },
  {
    icon: Users,
    title: "Proximité",
    description: "Une relation humaine et un accompagnement personnalisé.",
  },
];

// Animation fluide
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
  }),
};

export default function About() {
  return (
    <div className="bg-white overflow-hidden">
      {/* === SECTION HEADER === */}
      <section className="relative h-[550px] overflow-hidden">
        <motion.img
          src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80"
          alt="Bâtiment moderne"
          className="w-full h-full object-cover"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.3, ease: "easeOut" }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>

        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#FF9800] bg-clip-text text-transparent drop-shadow-lg">
            Découvrez Sen Habita
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#FF9800] bg-clip-text text-transparent">
            Expertise, passion et confiance pour tous vos projets immobiliers.
          </p>
        </motion.div>

        {/* Halo lumineux */}
        <div className="absolute -bottom-10 left-20 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.25),transparent_70%)] blur-3xl animate-pulse" />
      </section>

      {/* === SECTION STATISTIQUES === */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gold-50">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[Award, Users, TrendingUp].map((Icon, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-10 rounded-2xl bg-white shadow-[0_8px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_40px_rgba(255,215,0,0.25)] transition-all duration-500"
            >
              <div
                className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, #14204d 0%, #FFD700 50%, #FF9800 100%)",
                }}
              >
                <Icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-[#14204d] mb-2">
                {i === 0 ? "15+" : i === 1 ? "2000+" : "500+"}
              </h3>
              <p className="text-gray-600">
                {i === 0
                  ? "Années d'expérience"
                  : i === 1
                  ? "Clients satisfaits"
                  : "Biens vendus/loués"}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* === SECTION VALEURS === */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            custom={0}
            className="text-4xl md:text-5xl font-serif font-bold text-[#14204d] mb-4"
          >
            Nos Valeurs
          </motion.h2>
          <p className="text-lg text-gray-600 mb-16">
            Les principes qui guident notre engagement chaque jour.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {values.map((val, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-[0_4px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_30px_rgba(255,215,0,0.25)] transition-all"
              >
                <div
                  className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, #FFD700 0%, #FFC107 50%, #FF9800 100%)",
                  }}
                >
                  <val.icon className="w-10 h-10 text-[#14204d]" />
                </div>
                <h3 className="text-xl font-semibold text-[#14204d] mb-3">
                  {val.title}
                </h3>
                <p className="text-gray-600">{val.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === SECTION ÉQUIPE === */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gold-50">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            className="text-4xl md:text-5xl font-serif font-bold text-[#14204d] mb-4"
          >
            Notre Équipe
          </motion.h2>
          <p className="text-lg text-gray-600 mb-16">
            Des professionnels passionnés à votre service.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {team.map((member, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="rounded-2xl overflow-hidden shadow-[0_6px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_40px_rgba(255,215,0,0.25)] transition-all"
              >
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-[#14204d]">
                    {member.name}
                  </h3>
                  <p className="text-[#FFD700] font-medium">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.specialty}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === SECTION CALL TO ACTION === */}
      <section className="py-20 bg-gradient-to-br from-[#14204d] via-[#0f1a3d] to-[#1b2a5e] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.15),transparent_70%)] blur-3xl animate-pulse" />
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#FF9800] bg-clip-text text-transparent">
            Prêt à démarrer votre projet ?
          </h2>
          <p className="text-lg text-gray-200 mb-10">
            Contactez-nous dès aujourd’hui pour une consultation gratuite.
          </p>
          <Button variant="primary" size="lg">
            Prendre rendez-vous
          </Button>
        </div>
      </section>
    </div>
  );
}
