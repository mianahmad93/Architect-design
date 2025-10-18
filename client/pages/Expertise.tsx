import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Phone, Compass, Award } from "lucide-react";

const ExpertiseSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax motion
  const y1 = useTransform(scrollYProgress, [0, 1], [200, -200]);

  return (
    <section
      ref={containerRef}
      className="relative bg-zinc-950 py-24 px-4 overflow-hidden"
    >
      {/* ✅ Fullscreen Parallax Background */}
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.08 }}
        transition={{ duration: 1.2 }}
      >
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
          alt="Architecture background"
          className="w-full h-full object-cover"
        />
        {/* Subtle overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      </motion.div>

      {/* Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            icon: <Compass className="w-8 h-8 text-yellow-400" />,
            title: "Design Excellence",
            text: "Creating innovative architectural solutions that blend functionality with aesthetic beauty, tailored to your vision.",
            button: "LEARN MORE",
          },
          {
            icon: <Award className="w-8 h-8 text-yellow-400" />,
            title: "Client Ratings",
            text: "We exceed expectations and deliver projects that our clients proudly recommend with a 4.9+ satisfaction score.",
            button: "LEARN MORE",
          },
          {
            icon: <Phone className="w-8 h-8 text-yellow-400" />,
            title: "Premium Support",
            text: "Prioritizing customer support to enhance satisfaction, loyalty, and long-term success in every project.",
            button: "CALL NOW",
          },
        ].map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            className="border border-yellow-500/60 rounded-2xl p-8 backdrop-blur-sm bg-transparent shadow-lg hover:shadow-yellow-400/40 hover:scale-[1.03] transition-all duration-200"
          >
            <div className="flex flex-col items-start text-left">
              <div className="w-14 h-14 border border-yellow-500/50 rounded-full flex items-center justify-center mb-5">
                {card.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {card.title}
              </h3>
              <p className="text-white/85 text-sm leading-relaxed mb-6">
                {card.text}
              </p>
              <button className="border border-yellow-500/60 text-yellow-400 font-semibold py-2.5 px-6 rounded-lg hover:bg-yellow-500/10 transition-all duration-200">
                {card.button}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ExpertiseSection;
