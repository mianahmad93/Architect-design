"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      {/* Outer Circle */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] h-8 w-8 rounded-full border border-[#9B834B] pointer-events-none "
        animate={{
          x: position.x - 16,
          y: position.y - 16,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 20,
        }}
      />

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full bg-accent pointer-events-none"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
      />
    </>
  );
}
