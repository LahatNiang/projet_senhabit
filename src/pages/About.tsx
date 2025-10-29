import { Award, Users, TrendingUp, Heart, Target, Shield } from "lucide-react";
import { motion } from "framer-motion";
// import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";
const team = [
  {
    name: "Maty Mbaye",
    role: "Directrice Générale",
    image:
      "https://i.pinimg.com/736x/72/9b/17/729b172acb8f5449b8d29c94b7a55609.jpg",
    specialty: "Gestion & Stratégie",
  },
  {
    name: "Amadou Sow",
    role: "Expert Investissement",
    image:
      "https://i.pinimg.com/736x/a8/ba/96/a8ba9626de3fadff0b38e1c83cdea435.jpg",
    specialty: "Conseil patrimonial",
  },
  {
    name: "Aminata Ndiaye",
    role: "Agent Commercial",
    image:
      "https://i.pinimg.com/736x/c0/1f/08/c01f08228303f3903fd8867c575a1956.jpg",
    specialty: "Vente & Location",
  },
  {
    name: "Abdou Lahat Niang",
    role: "Responsable Marketing",
    image:
      "https://i.pinimg.com/736x/7e/83/0e/7e830e9c49dee63d546ba2b376523d30.jpg",
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
    description:
      "Transparence et honnêteté dans toutes nos interactions avec nos clients.",
  },
  {
    icon: Target,
    title: "Excellence",
    description:
      "Un service de qualité supérieure pour chaque client et chaque mission.",
  },
  {
    icon: Users,
    title: "Proximité",
    description:
      "Une relation humaine et un accompagnement personnalisé à chaque étape.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* SECTION HERO */}
      <section className="relative py-32 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center brightness-[0.4]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1920&q=80')",
          }}
        ></div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#14204d]/60 to-[#0c132c]/90"></div>

        <motion.div
          className="container mx-auto px-6 relative z-10 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 tracking-tight">
            À propos de{" "}
            <span className="bg-gradient-to-r from-[#FED9B7] to-[#f7b79c] bg-clip-text text-transparent">
              Sen Habita
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Depuis 2009, nous transformons les rêves immobiliers en réalité avec
            passion, élégance et expertise.
          </p>
        </motion.div>

        {/* Animation décorative */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#FED9B7]/30 to-[#f7b79c]/10 blur-3xl rounded-full opacity-40"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </section>

      {/* STATS */}
      <section className="py-24 bg-gradient-to-br from-[#faf9f8] to-[#fffaf6]">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: Award,
              color: "from-[#FED9B7] to-[#f7b79c]",
              number: "15+",
              label: "Années d’expérience",
            },
            {
              icon: Users,
              color: "from-[#14204d] to-[#25316d]",
              number: "2000+",
              label: "Clients satisfaits",
            },
            {
              icon: TrendingUp,
              color: "from-[#FED9B7] to-[#f7b79c]",
              number: "500+",
              label: "Biens vendus/loués",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl p-10 text-center transform hover:-translate-y-2 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <div
                className={`w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center`}
              >
                <item.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-[#14204d] mb-2">
                {item.number}
              </h3>
              <p className="text-gray-600">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* VALEURS */}
      {/* VALEURS – version premium & animée */}
      <section className="relative py-28 bg-gradient-to-br from-[#ffffff] via-[#fefaf8] to-[#fffaf4] text-[#14204d] overflow-hidden">
        <div className="container mx-auto px-6 text-center mb-20 relative z-10">
          <motion.h2
            className="text-5xl md:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-[#14204d] to-[#25316d] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Nos Valeurs
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Les principes qui guident chaque décision et chaque réussite de Sen
            Habita.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 container mx-auto px-6 relative z-10">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -8, scale: 1.03 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15, type: "spring" }}
              className="relative p-10 rounded-3xl bg-[#fefefe] shadow-[10px_10px_20px_rgba(0,0,0,0.05),-10px_-10px_20px_rgba(255,255,255,0.9)] hover:shadow-[0_0_35px_rgba(254,217,183,0.4)] border border-white/60 backdrop-blur-md transition-all duration-500"
            >
              {/* Halo lumineux animé derrière l’icône */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#FED9B7]/20 to-[#f7b79c]/10 opacity-0 group-hover:opacity-100 transition duration-700 blur-2xl"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 6, repeat: Infinity }}
              />

              <div className="relative z-10 w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#FED9B7] to-[#f7b79c] flex items-center justify-center shadow-inner">
                <v.icon className="w-10 h-10 text-[#14204d]" />
              </div>

              <h3 className="text-2xl font-bold mb-3">{v.title}</h3>
              <p className="text-gray-600 leading-relaxed">{v.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Effet lumineux d’ambiance */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[#FED9B7]/20 to-[#f7b79c]/10 rounded-full blur-3xl opacity-40"
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </section>

      {/* ÉQUIPE */}
      <section className="py-24 bg-gradient-to-br from-[#fffaf6] to-[#fef9f8]">
        <div className="container mx-auto px-6 text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#14204d] mb-4">
            Notre Équipe
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Des experts passionnés au service de vos ambitions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
          {team.map((m, i) => (
            <motion.div
              key={i}
              className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={m.image}
                  alt={m.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all"
                  initial={false}
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-[#14204d] mb-1">
                  {m.name}
                </h3>
                <p className="text-[#f7b79c] font-medium mb-1">{m.role}</p>
                <p className="text-gray-600 text-sm">{m.specialty}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#fffaf6] text-[#14204d] text-center relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.h2
            className="text-4xl md:text-5xl font-serif font-bold mb-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Prêt à concrétiser votre projet immobilier ?
          </motion.h2>
          <p className="text-lg text-[#14204d] mb-10 max-w-2xl mx-auto">
            Contactez-nous dès aujourd’hui pour une consultation gratuite avec
            nos experts.
          </p>
          <Link
  to="/contact"
  className="inline-block px-8 py-4 text-lg font-semibold rounded-2xl shadow-xl 
             bg-gradient-to-r from-[#FED9B7] to-[#f7b79c] text-[#14204d]
             hover:scale-105 transition-transform duration-300"
>
  Prendre rendez-vous
</Link>

        </div>

        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(254,217,183,0.15),transparent_70%)]"
          animate={{ opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </section>
    </div>
  );
}
