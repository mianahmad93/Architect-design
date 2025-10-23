"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";

export default function Featured() {
  return (
    <div className="bg-zinc-950 w-full">
      <Projects />
    </div>
  );
}

const Projects = () => {
  return (
    <section
      id="featured-projects"
      className="w-full py-16 text-white"
    >
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-16 text-4xl md:text-5xl font-black uppercase text-center tracking-tight text-zinc-50"
      >
        Featured Projects
      </motion.h1>

      <div className="w-full divide-y divide-zinc-800">
        {projects.map((project, index) => (
          <ProjectItem key={index} {...project} />
        ))}
      </div>
    </section>
  );
};

const ProjectItem = ({ title, year, location, type }) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      whileHover={{ scale: 1.02, backgroundColor: "rgba(39, 39, 42, 0.4)" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group flex flex-col md:flex-row items-start md:items-center justify-between py-6 px-2 sm:px-4 cursor-pointer transition-all hover:shadow-lg hover:shadow-amber-500/10"
    >
      <div>
        <p className="mb-1.5 text-lg md:text-xl text-zinc-50 group-hover:text-amber-400 transition-all duration-300">
          {title}
        </p>
        <div className="flex items-center gap-3 text-sm uppercase">
          <p className="text-zinc-500 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {year}
          </p>
          <span className="text-zinc-700">•</span>
          <p className="text-zinc-500">{type}</p>
        </div>
      </div>

      <motion.div
        whileHover={{ x: 4 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex items-center gap-1.5 text-start md:text-end text-sm uppercase text-zinc-500 mt-3 md:mt-0"
      >
        <p className="group-hover:text-zinc-300 transition-colors duration-300">
          {location}
        </p>
        <MapPin className="w-4 h-4 group-hover:text-amber-400 transition-colors duration-300" />
      </motion.div>
    </motion.div>
  );
};

const projects = [
  { title: "Skyline Tower", year: "2024", location: "Dubai, UAE", type: "Commercial" },
  { title: "Verde Residences", year: "2024", location: "Singapore", type: "Residential" },
  { title: "Modern Art Museum", year: "2023", location: "London, UK", type: "Cultural" },
  { title: "Tech Campus", year: "2023", location: "San Francisco, USA", type: "Corporate" },
  { title: "Ocean Villa", year: "2023", location: "Maldives", type: "Residential" },
  { title: "Central Library", year: "2022", location: "Toronto, Canada", type: "Public" },
  { title: "Horizon Plaza", year: "2022", location: "Tokyo, Japan", type: "Mixed-Use" },
];
