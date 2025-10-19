import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Phone, Compass, Award } from "lucide-react";

const cardData = [
  {
    id: 1,
    icon: <Phone className="w-8 h-8 text-yellow-400" />,
    title: "Premium Support",
    text: "Prioritizing customer support to enhance satisfaction, loyalty, and long-term success in every project.",
    button: "CALL NOW",
  },
  {
    id: 2,
    icon: <Award className="w-8 h-8 text-yellow-400" />,
    title: "Client Ratings",
    text: "We exceed expectations and deliver projects that our clients proudly recommend with a 4.9+ satisfaction score.",
    button: "LEARN MORE",
  },
  {
    id: 3,
    icon: <Compass className="w-8 h-8 text-yellow-400" />,
    title: "Design Excellence",
    text: "Creating innovative architectural solutions that blend functionality with aesthetic beauty, tailored to your vision.",
    button: "LEARN MORE",
  },
];

export default function ExpertiseSection() {
  const [cards, setCards] = useState(cardData);

  return (
    <section className="relative bg-zinc-950 py-24 px-4 overflow-hidden min-h-screen flex items-center justify-center">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='%23FACC15'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block rounded-full border border-yellow-500/40 bg-yellow-500/10 px-4 py-1.5 text-sm text-yellow-400 mb-4"
          >
            Our Expertise
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Swipe to Explore
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-400 text-lg"
          >
            Drag cards left or right to discover our services
          </motion.p>
        </div>

        {/* Cards Stack */}
        <div className="grid h-[600px] w-full place-items-center">
          {cards.map((card) => (
            <Card key={card.id} cards={cards} setCards={setCards} {...card} />
          ))}
        </div>

        {/* Cards Counter */}
        <div className="text-center mt-8">
          <p className="text-zinc-500 text-sm">
            {cards.length} card{cards.length !== 1 ? "s" : ""} remaining
          </p>
        </div>
      </div>
    </section>
  );
}

const Card = ({ id, icon, title, text, button, setCards, cards }) => {
  const x = useMotionValue(0);
  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  
  const isFront = id === cards[cards.length - 1].id;
  
  const rotate = useTransform(() => {
    const offset = isFront ? 0 : id % 2 ? 6 : -6;
    return `${rotateRaw.get() + offset}deg`;
  });

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 100) {
      setCards((pv) => pv.filter((v) => v.id !== id));
    }
  };

  return (
    <motion.div
      className="h-[500px] w-full max-w-sm origin-bottom rounded-2xl border border-yellow-500/60 backdrop-blur-sm bg-zinc-950/80 shadow-2xl hover:cursor-grab active:cursor-grabbing p-8 flex flex-col justify-between"
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        opacity,
        rotate,
        transition: "0.125s transform",
        boxShadow: isFront
          ? "0 20px 25px -5px rgb(250 204 21 / 0.3), 0 8px 10px -6px rgb(250 204 21 / 0.2)"
          : undefined,
      }}
      animate={{
        scale: isFront ? 1 : 0.98,
      }}
      drag={isFront ? "x" : false}
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col items-start text-left">
        <div className="w-16 h-16 border-2 border-yellow-500/50 rounded-full flex items-center justify-center mb-6">
          {icon}
        </div>
        <h3 className="text-3xl font-bold text-white mb-4">{title}</h3>
        <p className="text-white/85 text-base leading-relaxed">{text}</p>
      </div>

      <button className="w-full border-2 border-yellow-500/60 text-yellow-400 font-semibold py-3 px-6 rounded-xl hover:bg-yellow-500/20 hover:border-yellow-500 transition-all duration-200">
        {button}
      </button>
    </motion.div>
  );
}