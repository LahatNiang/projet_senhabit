import { motion, type Variants } from "framer-motion";
import { Search, FileText, Key, CheckCircle } from "lucide-react";

export default function ProcessSection() {
  const steps = [
    {
      icon: Search,
      title: "Recherche et sélection",
      description:
        "Définissez vos critères et explorez notre catalogue de propriétés soigneusement sélectionnées.",
    },
    {
      icon: FileText,
      title: "Visites et évaluation",
      description:
        "Organisez des visites et bénéficiez de nos conseils d'experts pour évaluer chaque bien.",
    },
    {
      icon: Key,
      title: "Négociation et contrat",
      description:
        "Nous vous accompagnons dans la négociation et la préparation de tous les documents.",
    },
    {
      icon: CheckCircle,
      title: "Finalisation",
      description:
        "Signature et remise des clés — votre nouveau départ en toute sérénité.",
    },
  ];

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 60, rotate: -3, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1] }, // cubic-bezier
    },
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Halo doux doré */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,215,0,0.05),transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        {/* TITRE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.42, 0, 0.58, 1] }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-[#14204d]">
            Comment ça marche ?
          </h2>
          <p className="text-lg md:text-xl text-[#14204d] mt-4 max-w-2xl mx-auto font-sans">
            Un processus simple et transparent pour réaliser votre projet
            immobilier.
          </p>
        </motion.div>

        {/* ÉTAPES */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.05, rotate: 0, y: -5 }}
              className="relative bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-8 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(255,215,0,0.25)]"
            >
              {/* NUMÉRO */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#14204d] text-white font-bold w-10 h-10 flex items-center justify-center rounded-full shadow-lg border border-[#FFD700]">
                {index + 1}
              </div>

              {/* ICÔNE */}
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#14204d] flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                <step.icon className="w-10 h-10 text-[#FFD700]" />
              </div>

              {/* TITRE */}
              <h3 className="text-xl font-display font-bold text-[#14204d] mb-3">
                {step.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-gray-600 leading-relaxed font-sans">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
