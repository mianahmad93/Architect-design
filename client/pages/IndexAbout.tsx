import { motion, useInView } from 'framer-motion';
import type { Variants, Transition } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

// Animated background grid
const AnimatedGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const gridSize = 40;
    let offset = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.1)';
      ctx.lineWidth = 1;

      offset += 0.3;
      if (offset > gridSize) offset = 0;

      // Vertical lines
      for (let x = -gridSize + offset; x < width + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = -gridSize + offset; y < height + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-50" />;
};

// Floating architecture elements
const FloatingElements = () => {
  const elements = [
    { icon: '🏛️', delay: 0, duration: 8 },
    { icon: '📐', delay: 1, duration: 10 },
    { icon: '✏️', delay: 2, duration: 9 },
    { icon: '🏗️', delay: 1.5, duration: 11 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {elements.map((el, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl md:text-5xl opacity-20"
          initial={{ x: Math.random() * 100 + '%', y: -100 }}
          animate={{
            y: ['0%', '100vh'],
            x: [
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
            ],
            rotate: [0, 360],
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            left: `${Math.random() * 80 + 10}%`,
          }}
        >
          {el.icon}
        </motion.div>
      ))}
    </div>
  );
};

// Staggered word animation
const AnimatedText = ({ text, className = '' }: { text: string; className?: string }) => {
  const words = text.split(' ');
  
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { type: 'spring', damping: 12, stiffness: 100 } as Transition,
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={child}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Stats counter animation
const StatCounter = ({ end, label, suffix = '' }: { end: number; label: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">
        {count}{suffix}
      </div>
      <div className="text-sm text-gray-400">{label}</div>
    </motion.div>
  );
};

const IndexAbout = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-20%" });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-black py-20"
    >
      {/* Animated Background */}
      <AnimatedGrid />
      <FloatingElements />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />

      {/* Content Container */}
      <div className="container relative z-10 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <span className="inline-block px-6 py-2 text-xs md:text-sm font-medium bg-yellow-400/10 backdrop-blur-sm rounded-full border border-yellow-400/30 text-yellow-300">
              Award-Winning Architecture Firm
            </span>
          </motion.div>

          {/* Main Heading with Word Animation */}
          <AnimatedText
            text="Crafting Spaces That Inspire & Transform"
            className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-center text-white mb-6"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center text-base md:text-lg text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            We are a team of visionary architects and designers committed to creating 
            <span className="text-yellow-400 font-semibold"> modern, sustainable, and human-centered </span>
            spaces. Our philosophy blends geometric precision with organic warmth, 
            transforming concepts into iconic landmarks.
          </motion.p>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-yellow-400/20"
          >
            <StatCounter end={150} label="Projects Completed" suffix="+" />
            <StatCounter end={12} label="Years Experience" suffix="+" />
            <StatCounter end={98} label="Client Satisfaction" suffix="%" />
            <StatCounter end={25} label="Awards Won" suffix="+" />
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {[
              { title: 'Modern Design', desc: 'Cutting-edge aesthetics that stand the test of time', icon: '🎨' },
              { title: 'Sustainability', desc: 'Eco-conscious solutions for a better tomorrow', icon: '🌱' },
              { title: 'Innovation', desc: 'Pushing boundaries with creative architecture', icon: '💡' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-yellow-400/10 to-transparent backdrop-blur-sm p-6 rounded-xl border border-yellow-400/20 hover:border-yellow-400/40 transition-all cursor-pointer"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <motion.a
              href="/about"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-300 px-8 py-6 text-base rounded-lg shadow-lg hover:shadow-2xl transition-all">
                Discover Our Story
              </Button>
            </motion.a>
            
            <motion.a
              href="/projects"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline" 
                className="border-2 border-yellow-400/70 text-yellow-400 bg-yellow-400/10 backdrop-blur-sm hover:bg-yellow-400/20 px-8 py-6 text-base rounded-lg"
              >
                View Portfolio
              </Button>
            </motion.a>
          </motion.div>

        </div>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-yellow-400/20 blur-[100px] rounded-full pointer-events-none" />
    </section>
  );
};

export default IndexAbout;