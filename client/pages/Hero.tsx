import { motion, AnimatePresence } from "framer-motion";
import type { Variants, Transition } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { set } from "date-fns";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    title: "Modern Residential Design",
    subtitle: "Creating dream homes with contemporary elegance"
  },
  {
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
    title: "Commercial Architecture",
    subtitle: "Innovative spaces that inspire business growth"
  },
  {
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
    title: "Interior Mastery",
    subtitle: "Transforming spaces into timeless experiences"
  },
  {
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2084&auto=format&fit=crop",
    title: "Sustainable Living",
    subtitle: "Eco-friendly designs for a better tomorrow"
  }
];

const text = "Designing Tomorrow's Landmarks Today.";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.2 },
  },
};

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: "spring", stiffness: 100, damping: 12 } as Transition,
  },
};

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.8,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.8,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const Hero = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  const imageIndex = ((page % slides.length) + slides.length) % slides.length;

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    if (!isPaused) return

    const timer = setInterval(() => {
      setPage((prev) => [prev[0] + 1, 1]);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section
      className="relative min-h-[70svh] md:min-h-[88svh] overflow-hidden"
      aria-label="Hero Carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
            scale: { duration: 0.5 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute inset-0"
        >
          <motion.img
            src={slides[imageIndex].image}
            alt={slides[imageIndex].title}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 7, ease: "easeOut" }}
            loading="eager"
          />

          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full min-h-[70svh] md:min-h-[88svh] flex items-center justify-center">
        <div className="container text-center text-white px-4 md:px-8 max-w-5xl">
          <motion.div
            key={`content-${page}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-xs md:text-sm font-medium bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
              {slides[imageIndex].subtitle}
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2">
              {slides[imageIndex].title}
            </h2>
          </motion.div>

          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="font-heading text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight flex justify-center flex-wrap gap-1 mb-6"
          >
            {text.split("").map((char, index) => (
              <motion.span
                key={`${page}-${index}`}
                variants={letterVariants}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            key={`desc-${page}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mx-auto max-w-2xl text-sm md:text-base lg:text-lg text-white/90 mb-8"
          >
            Architects crafts iconic residential, commercial, and interior spaces with precision and purpose.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex items-center justify-center gap-3 flex-wrap"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-300 px-6 md:px-8 py-3 rounded-lg cursor-pointer transition shadow-lg hover:shadow-xl"
            >
              Start a Project
            </motion.a>
            <motion.a
              href="#about"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white/70 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 px-6 md:px-8 py-3 rounded-lg cursor-pointer transition"
            >
              Learn More
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {/* <button
        onClick={() => paginate(-1)}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 md:p-3 rounded-full transition group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-0.5 transition" />
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 md:p-3 rounded-full transition group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-0.5 transition" />
      </button> */}

      {/* Dots Indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setPage([index, index > imageIndex ? 1 : -1])}
            className={`transition-all ${index === imageIndex
              ? "w-8 md:w-10 bg-white"
              : "w-2 md:w-2.5 bg-white/50 hover:bg-white/70"
              } h-2 md:h-2.5 rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;