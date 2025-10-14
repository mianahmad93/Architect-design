import { motion, useMotionValue, useTransform, useViewportScroll } from "framer-motion";
import type { Variants } from "framer-motion";

const text = "Designing Tomorrow’s Landmarks Today.";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
};

const Hero = ({ heroImg }) => {
  const { scrollY } = useViewportScroll();
  const y = useTransform(scrollY, [0, 300], [0, 50]); // parallax vertical movement
  const scale = useTransform(scrollY, [0, 300], [1, 1.05]); // gentle zoom effect

  return (
    <section
      className="relative min-h-[70svh] md:min-h-[88svh] grid place-items-center overflow-hidden"
      aria-label="Hero"
    >
      <motion.img
        src={heroImg}
        alt="Modern architectural facade"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ y, scale }}
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />

      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent animate-gradient-x"
        initial={{opacity: 0}}
        animate={{opacity: [0.6, 0.8, 0.6]}}
        transition={{duration: 10, repeat: Infinity, repeatType: "mirror"}}
      />

      <div className="relative container text-center text-white px-4 md:px-0 max-w-4xl">
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-heading text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight flex justify-center flex-wrap gap-1"
        >
          {text.split("").map((char, index) => (
            <motion.span key={index} variants={letterVariants} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-white/90"
        >
          Architects crafts iconic residential, commercial, and interior spaces with precision and purpose.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mt-8 flex items-center justify-center gap-3 flex-wrap"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, backgroundColor: "#FEE440" }}
            whileTap={{ scale: 0.95 }}
            className="bg-accent text-accent-foreground hover:opacity-95 px-6 py-3 rounded cursor-pointer transition"
          >
            Start a Project
          </motion.a>
          <motion.a
            href="#about"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="border border-white/70 text-white bg-white/10 hover:bg-white/20 px-6 py-3 rounded cursor-pointer transition"
          >
            Learn More
          </motion.a>
        </motion.div>
      </div>

      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
