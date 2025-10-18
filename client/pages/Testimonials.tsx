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

// Subtle architectural tones — metallic gold, concrete gray, warm white
const COLORS_TOP = ["#FACC15", "#F59E0B", "#EAB308", "#FCD34D"]; // Golden palette

export const Testimonials = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 12,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  // Background transitions smoothly through warm architectural tones
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #09090b 40%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative grid min-h-screen place-content-center overflow-hidden bg-zinc-950 px-4 py-24 text-zinc-100"
    >
      {/* Text Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <span className="mb-3 inline-block rounded-full border border-yellow-500/40 bg-yellow-500/10 px-4 py-1.5 text-sm text-yellow-400">
          Architectural Excellence
        </span>

        <h1 className="max-w-4xl bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent text-4xl font-semibold leading-tight sm:text-6xl md:text-7xl md:leading-tight tracking-tight">
          Shaping Modern Spaces with Timeless Design
        </h1>

        <p className="my-6 max-w-2xl text-base text-zinc-300 md:text-lg leading-relaxed">
          We craft contemporary structures that merge innovation, elegance, and
          sustainability — redefining the architectural experience for a new era
          of living.
        </p>

        <motion.button
          style={{
            border,
            boxShadow,
          }}
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.97,
          }}
          className="group relative flex w-fit items-center gap-2 rounded-full bg-yellow-500/10 px-6 py-3 text-yellow-300 transition-all duration-300 hover:bg-yellow-500/20"
        >
          Explore Our Projects
          <FiArrowRight className="transition-transform group-hover:translate-x-1 group-hover:-rotate-45" />
        </motion.button>
      </div>

      {/* Animated Star Field Background */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={70} count={2000} factor={4} fade speed={1.5} />
        </Canvas>
      </div>

      {/* Subtle overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-transparent to-zinc-950/90 z-[1]" />
    </motion.section>
  );
};
