"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import React from "react";

export default function ScrollIndicator() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        scaleX,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        originX: 0,
        background: "linear-gradient(90deg, #FACC15, #D4AF37, #FDE68A)", // gold gradient
        zIndex: 9999,
        boxShadow: "0 0 10px rgba(250, 204, 21, 0.6)",
      }}
    />
  );
}
