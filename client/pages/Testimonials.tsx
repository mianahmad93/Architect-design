import { useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
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

export function Testimonials() {
  const [cards, setCards] = useState(cardData);

  return (
    <section className="relative min-h-screen overflow-hidden bg-zinc-950 px-4 py-24 text-zinc-100"
    >
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className={`grid gap-12 items-center min-h-[80vh] transition-all duration-700 ${
          cards.length === 0 ? 'grid-cols-1 place-items-center' : 'grid-cols-1 lg:grid-cols-2'
        }`}>
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              maxWidth: cards.length === 0 ? '800px' : '100%'
            }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col justify-center transition-all duration-700 ${
              cards.length === 0 ? 'text-center' : 'text-center lg:text-left'
            }`}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl md:leading-tight tracking-tight mb-6"
            >
              Shaping Modern Spaces with Timeless Design
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base text-zinc-300 md:text-lg leading-relaxed mb-8"
            >
              We craft contemporary structures that merge innovation, elegance,
              and sustainability — redefining the architectural experience for a
              new era of living.
            </motion.p>
          </motion.div>

          {/* Right Side - Swipeable Cards */}
          {cards.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col items-center justify-center"
            >
              {/* Cards Stack */}
              <div className="grid h-[500px] w-full max-w-md place-items-center">
                {cards.map((card) => (
                  <Card
                    key={card.id}
                    cards={cards}
                    setCards={setCards}
                    {...card}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Success Message when all cards swiped */}
          {cards.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <button
                onClick={() => setCards(cardData)}
                className="px-6 py-3 rounded-full bg-yellow-500/10 border border-yellow-500/60 text-yellow-400 font-semibold hover:bg-yellow-500/20 transition-all duration-200"
              >
                Reset Cards
              </button>
            </motion.div>
          )}
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
      className="h-[450px] w-full max-w-sm origin-bottom rounded-2xl border border-yellow-500/60 backdrop-blur-sm bg-zinc-950/80 shadow-2xl hover:cursor-grab active:cursor-grabbing p-8 flex flex-col justify-between"
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
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <p className="text-white/85 text-sm leading-relaxed">{text}</p>
      </div>

      <button className="w-full border-2 border-yellow-500/60 text-yellow-400 font-semibold py-3 px-6 rounded-xl hover:bg-yellow-500/20 hover:border-yellow-500 transition-all duration-200">
        {button}
      </button>
    </motion.div>
  );
}