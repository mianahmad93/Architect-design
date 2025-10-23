import { motion, useInView, Variants } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// ✅ Static animated background grid (lines only)
const AnimatedGrid = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawGrid = () => {
      const width = (canvas.width = canvas.offsetWidth);
      const height = (canvas.height = canvas.offsetHeight);
      const gridSize = 40;

      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "rgba(251, 191, 36, 0.1)";
      ctx.lineWidth = 1;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    drawGrid();
    window.addEventListener("resize", drawGrid);
    return () => window.removeEventListener("resize", drawGrid);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-50 pointer-events-none"
    />
  );
};

// Shuffle function
const shuffle = (array) => {
  let currentIndex = array.length;
  let randomIndex;
  const arr = array.slice();
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
  }
  return arr;
};

// ✅ Only 9 Architectural Images
const squareData = [
  { id: 1, src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80" },
  { id: 2, src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80" },
  { id: 3, src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80" },
  { id: 4, src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80" },
  { id: 5, src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80" },
  { id: 6, src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80" },
  { id: 7, src: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=800&q=80" },
  { id: 8, src: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=800&q=80" },
  { id: 9, src: "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=800&q=80" },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full rounded-lg overflow-hidden"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());
    timeoutRef.current = window.setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-3 grid-rows-3 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

const IndexAbout = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-20%" });

  // ✅ Framer Motion variants for text
  const textContainer: Variants = {
    hidden: { opacity: 0, x: -80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        duration: 1.2,
        bounce: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const textChild: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-black py-20"
    >
      {/* Background Grid */}
      <AnimatedGrid />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />

      <div className="container relative z-10 px-6 md:px-12">
        <div className="grid md:grid-cols-2 items-center gap-12">
          {/* ✅ Left Text Section with animation */}
          <motion.div
            variants={textContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-white space-y-6"
          >
            <motion.span
              variants={textChild}
              className="block mb-4 text-xs md:text-sm text-amber-400 font-medium"
            >
              Crafting Excellence Every Day
            </motion.span>

            <motion.h2
              variants={textChild}
              className="font-heading text-3xl md:text-5xl font-bold leading-tight bg-gradient-to-br from-amber-100 to-amber-400 bg-clip-text text-transparent"
            >
              Designing Modern Structures that Define the Future
            </motion.h2>

            <motion.p
              variants={textChild}
              className="text-gray-300 leading-relaxed text-base md:text-lg"
            >
              Our architects and designers shape environments that balance
              aesthetics, sustainability, and human experience. Every project we
              create tells a story — merging innovation with timeless
              craftsmanship.
            </motion.p>

            <motion.button
              variants={textChild}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-amber-600 to-yellow-700 text-white font-medium py-3 px-6 rounded-lg transition-all hover:from-amber-700 hover:to-yellow-800"
            >
              Explore Our Projects
            </motion.button>
          </motion.div>

          {/* ✅ Right Shuffle Grid Section */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <ShuffleGrid />

            {/* Glow Effect */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[400px] h-[150px] bg-yellow-400/20 blur-[80px] rounded-full pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IndexAbout;
