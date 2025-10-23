import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";

const COLORS_TOP = ["#FFD700", "#FACC15", "#EAB308", "#CA8A04"]; // gold/yellow tones

export const IndexContact = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #0A0A0A 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative grid min-h-screen place-content-center overflow-hidden bg-black px-4 py-24 text-gray-200"
    >
      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <span className="mb-2 inline-block rounded-full bg-yellow-500/10 px-3 py-1.5 text-sm text-yellow-400">
          Creating dream homes with contemporary elegance
        </span>

        <h1 className="max-w-4xl bg-gradient-to-br from-yellow-400 to-yellow-600 bg-clip-text text-3xl font-bold leading-tight text-transparent sm:text-5xl md:text-6xl">
          Designing Tomorrow’s Landmarks Today.
        </h1>

        <p className="mt-4 max-w-2xl text-gray-400 text-base md:text-lg">
          Architects crafting iconic residential, commercial, and interior spaces
          with precision and purpose.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <motion.button
            style={{ border, boxShadow }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="group relative flex items-center gap-2 rounded-md bg-yellow-500 px-6 py-3 text-black font-semibold transition-all hover:bg-yellow-400"
          >
            Start a Project
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </motion.button>

          <button className="flex items-center gap-2 rounded-md border border-yellow-500/60 px-6 py-3 text-yellow-400 font-medium hover:bg-yellow-500/10 transition-all">
            Learn More
          </button>
        </div>
      </div>

      {/* ✨ Animated Contact / Project Inquiry Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 mt-24 flex flex-col items-center w-full max-w-2xl mx-auto bg-black/60 backdrop-blur-md rounded-2xl border border-yellow-500/30 shadow-lg p-8"
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-yellow-400 mb-6">
          Let's Design Your Dream Space
        </h2>

        <motion.form
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {["Name", "Email", "Project Type", "Location"].map((placeholder, i) => (
            <motion.input
              key={i}
              type="text"
              placeholder={placeholder}
              whileFocus={{ scale: 1.03, borderColor: "#FACC15", boxShadow: "0 0 10px #FACC15" }}
              className="w-full rounded-md bg-black/40 border border-yellow-500/40 px-4 py-3 text-gray-200 placeholder-gray-500 outline-none transition-all focus:ring-2 focus:ring-yellow-500/50"
            />
          ))}
          <motion.textarea
            rows={4}
            placeholder="Tell us about your vision..."
            whileFocus={{ scale: 1.02, borderColor: "#FFD700", boxShadow: "0 0 12px #FFD700" }}
            className="col-span-1 sm:col-span-2 w-full rounded-md bg-black/40 border border-yellow-500/40 px-4 py-3 text-gray-200 placeholder-gray-500 outline-none transition-all focus:ring-2 focus:ring-yellow-500/50"
          ></motion.textarea>

          <motion.button
            style={{ border, boxShadow }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="col-span-1 sm:col-span-2 mt-4 flex items-center justify-center gap-2 rounded-md bg-yellow-500 px-6 py-3 text-black font-semibold transition-all hover:bg-yellow-400"
          >
            Send Message
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.form>
      </motion.div>

      {/* Animated dots background */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
    </motion.section>
  );
};
