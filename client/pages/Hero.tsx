import { motion } from "framer-motion";
import type { Variants, Transition } from "framer-motion";
import { useRef, useEffect } from "react";

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

const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<any[]>([]);
  const mousePos = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const config = {
      particleCount: 100,
      colors: ["#fbbf24", "#f59e0b", "#d97706", "#b45309"],
      maxDistance: 100,
      grabDistance: 120,
      particleSpeed: 0.5,
      lineOpacity: 0.4,
      particleOpacity: 0.6,
      particleSize: 3,
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * config.particleSpeed;
        this.vy = (Math.random() - 0.5) * config.particleSpeed;
        this.radius = Math.random() * config.particleSize + 1;
        this.color = config.colors[Math.floor(Math.random() * config.colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Add constant gentle movement (AUTO MOVEMENT)
        if (Math.abs(this.vx) < 0.3) {
          this.vx += (Math.random() - 0.5) * 0.1;
        }
        if (Math.abs(this.vy) < 0.3) {
          this.vy += (Math.random() - 0.5) * 0.1;
        }

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        this.x = Math.max(0, Math.min(width, this.x));
        this.y = Math.max(0, Math.min(height, this.y));

        this.vx *= 0.98;
        this.vy *= 0.98;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = config.particleOpacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    // create initial particles
    particles.current = [];
    const density = config.particleCount / 1000;
    const particleCount = Math.floor((width * height) / 1000 * density);

    for (let i = 0; i < particleCount; i++) {
      particles.current.push(new Particle());
    }

    const drawConnections = () => {
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const p1 = particles.current[i];
          const p2 = particles.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < config.maxDistance) {
            const opacity = (1 - distance / config.maxDistance) * config.lineOpacity;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(251, 191, 36, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    };

    const drawMouseConnections = () => {
      if (mousePos.current.x === null || mousePos.current.y === null) return;

      particles.current.forEach(particle => {
        const dx = particle.x - mousePos.current.x!;
        const dy = particle.y - mousePos.current.y!;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.grabDistance) {
          // stronger repulsion
          const force = (1 - distance / config.grabDistance) * 4;
          const angle = Math.atan2(dy, dx);
          particle.vx += Math.cos(angle) * force * 0.5;
          particle.vy += Math.sin(angle) * force * 0.5;

          const opacity = 1 - distance / config.grabDistance;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(251, 191, 36, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mousePos.current.x!, mousePos.current.y!);
          ctx.stroke();
        }
      });
    };

    const animate = () => {
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(0, 0, width, height);

      particles.current.forEach(particle => {
        particle.update();
        particle.draw();
      });

      drawConnections();
      drawMouseConnections();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // ✅ Mouse events now on window (not canvas)
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mousePos.current.x = null;
      mousePos.current.y = null;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      particles.current = [];
      const newParticleCount = Math.floor((width * height) / 1000 * density);
      for (let i = 0; i < newParticleCount; i++) {
        particles.current.push(new Particle());
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair" />;
};

const Hero = () => {
  return (
    <section
      className="relative min-h-[70svh] md:min-h-[88svh] overflow-hidden"
      aria-label="Hero Section"
    >
      {/* Background Particles */}
      <ParticlesBackground />

      {/* Gradient Overlay (does not block mouse) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/30 pointer-events-none" />

      {/* Foreground Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container text-center text-white px-4 md:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-1.5 mb-4 mt-10 text-xs md:text-sm font-medium bg-yellow-400/20 backdrop-blur-sm rounded-full border border-yellow-400/30 text-yellow-300">
              Creating dream homes with contemporary elegance
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2">
              Modern Residential Design
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
                key={index}
                variants={letterVariants}
                className="inline-block"
                animate={{
                  y: [0, -8, 0],
                  color: ["#fde047", "#facc15", "#fbbf24", "#fde047"],
                  textShadow: [
                    "0 0 5px rgba(255,255,0,0.3)",
                    "0 0 15px rgba(255,255,0,0.8)",
                    "0 0 5px rgba(255,255,0,0.3)",
                  ],
                }}
                transition={{
                  duration: 3,
                  delay: index * 0.12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>


          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mx-auto max-w-2xl text-sm md:text-base lg:text-lg text-white/90 mb-8"
          >
            Architects crafts iconic residential, commercial, and interior spaces with precision
            and purpose.
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
              className="border-2 border-yellow-400/70 text-yellow-400 bg-yellow-400/10 backdrop-blur-sm hover:bg-yellow-400/20 px-6 md:px-8 py-3 rounded-lg cursor-pointer transition"
            >
              Learn More
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
