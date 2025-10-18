import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";
import { useSEO, localBusinessSchema } from "@/lib/seo";
import Aos from "aos";
import "aos/dist/aos.css";

import ExpertiseSection from "./Expertise";
import Landmark from "./Landmark";
import Hero from "./Hero";
import IndexAbout from "./IndexAbout";
import Testimonials from "./Testimonials";
import Featured from "./Featured";
import IndexContact from "./IndexContact";

export default function Index() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  useSEO({
    title: "Designing Tomorrow’s Landmarks Today.",
    description:
      "Modern, elegant, and high-performance architecture in Pakistan. Residential, Commercial, Interior Design.",
    keywords: [
      "Best Architecture Firm in Pakistan",
      "Modern Architectural Design",
      "Waseem Architects Portfolio",
      "Residential & Commercial Architecture",
      "Interior Design Services Pakistan",
    ],
    schema: localBusinessSchema(),
  });

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.65, 0.05, 0.36, 1] }}
    >
      <Hero />
      <IndexAbout />
       <Landmark />

      <Featured />
      <ExpertiseSection />
      {/* <Testimonials /> */}
      {/* <IndexContact /> */}
    </motion.div>
  );
}
