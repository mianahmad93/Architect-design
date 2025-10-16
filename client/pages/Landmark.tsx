// import React, { useEffect, useRef, useState } from "react";
// import { motion } from "framer-motion";

// const Landmark = () => {
//   const scrollRef = useRef(null);
//   const [isDragging, setIsDragging] = useState(false);

//   const designPhrases = [
//     { id: 1, main: "TIMELESS", sub: "DESIGN", description: "Architecture for generations" },
//     { id: 2, main: "SUSTAINABLE", sub: "LIVING", description: "Harmony with nature" },
//     { id: 3, main: "MODERN", sub: "ELEGANCE", description: "Where luxury meets innovation" },
//     { id: 4, main: "SCULPTING", sub: "SKYLINES", description: "Redefining urban landscapes" },
//     { id: 5, main: "FORM ", sub: "FUNCTION", description: "Where aesthetics meet purpose" },
//     { id: 6, main: "SPACES", sub: "INSPIRE", description: "Creating environments for life" },
//   ];

//   // Auto-scroll loop
//   useEffect(() => {
//     const scrollContainer = scrollRef.current;
//     if (!scrollContainer) return;

//     let scrollSpeed = 0.5;
//     let scrollPosition = 0;
//     let animationFrameId;

//     const autoScroll = () => {
//       if (!isDragging) {
//         scrollPosition += scrollSpeed;
//         if (scrollPosition >= scrollContainer.scrollWidth / 2) {
//           scrollPosition = 0;
//         }
//         scrollContainer.scrollLeft = scrollPosition;
//       }
//       animationFrameId = requestAnimationFrame(autoScroll);
//     };

//     animationFrameId = requestAnimationFrame(autoScroll);
//     return () => cancelAnimationFrame(animationFrameId);
//   }, [isDragging]);

//   return (
//     <div className="relative w-full min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 overflow-hidden pt-16">
//       {/* Header Section */}
//       <div className="relative z-20 px-8 md:px-16 lg:px-24">
//         <motion.span
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="text-orange-600 text-xs md:text-sm uppercase tracking-[0.4em] font-semibold block mb-4"
//         >
//           DESIGN PHILOSOPHY
//         </motion.span>

//         <motion.h1
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//           className="text-3xl md:text-5xl lg:text-5xl font-black leading-tight mb-6"
//         >
//           <span className="text-gray-900">Designing </span>
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600">
//             Tomorrow's
//           </span>
//           <span className="text-gray-900"> Landmarks</span>
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.6 }}
//           className="text-gray-700 text-base md:text-lg lg:text-xl max-w-2xl font-light leading-relaxed"
//         >
//           Every structure tells a story. We craft architectural narratives that stand the test of time.
//         </motion.p>
//       </div>

//       {/* Scrollable Section */}
//       <div
//         ref={scrollRef}
//         onMouseDown={() => setIsDragging(true)}
//         onMouseUp={() => setIsDragging(false)}
//         onMouseLeave={() => setIsDragging(false)}
//         className="relative overflow-x-scroll overflow-y-hidden scrollbar-hide cursor-grab active:cursor-grabbing"
//         style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//       >
//         <div className="flex items-start gap-10 md:gap-16 lg:gap-20 px-8 md:px-12 lg:px-16 py-12 md:py-16">
//           {[...designPhrases, ...designPhrases].map((phrase, index) => (
//             <motion.div
//               key={`${phrase.id}-${index}`}
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: false, amount: 0.3 }}
//               transition={{ delay: 0.1 * index, duration: 0.6, ease: "easeOut" }}
//               whileHover={{ scale: 1.05 }}
//               className="flex-shrink-0 group bg-white/40 backdrop-blur-sm shadow-sm border border-orange-100 rounded-2xl px-6 py-8 w-[70vw] sm:w-[45vw] md:w-[28vw] lg:w-[22vw] transition-all duration-300 hover:shadow-xl"
//             >
//               {/* Number */}
//               <motion.div
//                 className="text-orange-300 text-6xl md:text-7xl font-black mb-4 opacity-60 group-hover:opacity-100 transition-all"
//                 style={{ WebkitTextStroke: "2px rgba(251,146,60,0.2)" }}
//               >
//                 {String(phrase.id).padStart(2, "0")}
//               </motion.div>

//               {/* Main */}
//               <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 leading-snug mb-1 group-hover:text-gray-800 transition-all">
//                 {phrase.main}
//               </h2>

//               {/* Sub */}
//               <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 leading-snug mb-3 group-hover:from-orange-700 group-hover:via-amber-700 group-hover:to-yellow-700 transition-all">
//                 {phrase.sub}
//               </h3>

//               {/* Line */}
//               <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full mb-3 group-hover:w-28 transition-all duration-500" />

//               {/* Description */}
//               <p className="text-gray-600 text-sm md:text-base font-light leading-relaxed">
//                 {phrase.description}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Background Glow */}
//       <motion.div
//         animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
//         transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//         className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-orange-300/30 to-amber-300/30 rounded-full blur-3xl pointer-events-none"
//       />
//       <motion.div
//         animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.2, 0.4] }}
//         transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
//         className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-gradient-to-tr from-yellow-300/30 to-orange-300/30 rounded-full blur-3xl pointer-events-none"
//       />

//       {/* Subtle Grid Overlay */}
//       <div className="absolute inset-0 opacity-5 pointer-events-none">
//         <div
//           className="w-full h-full"
//           style={{
//             backgroundImage: `
//               linear-gradient(90deg, rgba(251,146,60,0.5) 1px, transparent 1px),
//               linear-gradient(rgba(251,146,60,0.5) 1px, transparent 1px)
//             `,
//             backgroundSize: "120px 120px",
//           }}
//         />
//       </div>

//       {/* Hide scrollbar for all browsers */}
//       <style>{`
//         .scrollbar-hide::-webkit-scrollbar { display: none; }
//       `}</style>
//     </div>
//   );
// };

// export default Landmark;



import './Landmark.css'
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "framer-motion";
// small local implementation of wrap to avoid adding a new dependency
function wrap(min: number, max: number, v: number) {
  const lo = Math.min(min, max);
  const hi = Math.max(min, max);
  const range = hi - lo;
  if (range === 0) return lo;
  // normalize v into [lo, hi)
  const mod = ((v - lo) % range + range) % range;
  return lo + mod;
}

interface ParallaxProps {
  children: string;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax from-black/50 via-black/20 to-black/30 inset-0 bg-gradient-to-t">
      <motion.div className="scroller" style={{ x }}>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
      </motion.div>
    </div>
  );
}

export default function Landmark() {
  return (
    <section>
      <ParallaxText baseVelocity={-5}>
        Architectural Excellence
      </ParallaxText>
      <ParallaxText baseVelocity={5}>
        Modern Spaces • Innovative Design • Timeless Architecture
      </ParallaxText>
    </section>
  );
}
