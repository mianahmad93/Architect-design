import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

// ✅ Static animated background grid (lines only)
const AnimatedGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

const IndexAbout = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { margin: "-20%" });

  // ✅ Framer Motion variants for text + image
  const textContainer: any = {
    hidden: { opacity: 0, x: -80, rotateY: 15 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        duration: 1.2,
        bounce: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const textChild: any = {
    hidden: { opacity: 0, y: 40, rotateX: -10 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  const imageVariants: any = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: "easeOut" },
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
            <motion.h2
              variants={textChild}
              className="font-heading text-3xl md:text-5xl font-bold leading-tight"
            >
              Designing Modern Structures that Define the Future
            </motion.h2>

            <motion.p
              variants={textChild}
              className="text-gray-300 leading-relaxed"
            >
              Our architects and designers shape environments that balance
              aesthetics, sustainability, and human experience. Every project we
              create tells a story — merging innovation with timeless
              craftsmanship.
            </motion.p>
          </motion.div>

          {/* ✅ Right Image Section */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden border border-yellow-400/20 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=900&q=80"
                alt="Modern Architecture Exterior"
                className="object-cover w-full h-[500px]"
              />
            </div>

            {/* Glow Effect */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[400px] h-[150px] bg-yellow-400/20 blur-[80px] rounded-full pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IndexAbout;
