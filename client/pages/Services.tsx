import { motion } from "framer-motion";
import { useSEO } from "@/lib/seo";

const services = [
  {
    key: "residential",
    title: "Residential Architecture",
    desc: "We design contemporary and timeless homes focusing on natural light, space optimization, and client lifestyle.",
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 11l9-8 9 8"/><path d="M9 22V12h6v10"/></svg>
    ),
  },
  {
    key: "commercial",
    title: "Commercial Architecture",
    desc: "From offices to retail spaces, our commercial designs emphasize brand identity, productivity, and sustainability.",
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
    ),
  },
  {
    key: "interior",
    title: "Interior Design",
    desc: "Beautiful and functional interiors with attention to materials, textures, and ergonomics.",
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 22h16"/><path d="M7 22V7h10v15"/></svg>
    ),
  },
  {
    key: "urban",
    title: "Urban Planning",
    desc: "Large-scale design strategies that integrate social, cultural, and environmental sustainability.",
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 21h18"/><path d="M4 10h16"/><path d="M7 6h.01"/></svg>
    ),
  },
  {
    key: "renovation",
    title: "Renovation & Restoration",
    desc: "We restore and modernize existing structures while preserving their original character.",
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v6"/><path d="M5 22h14"/><path d="M7 10h10"/></svg>
    ),
  },
];

export default function Services() {
  useSEO({ title: "Services — Waseem Architects", description: "Residential, Commercial, Urban & Interior Design services." });

  return (
    <div className="container py-16 md:py-24">
      <header>
        <h1 className="font-heading text-3xl md:text-4xl">Services</h1>
        <p className="mt-2 text-muted-foreground max-w-prose">We offer a full range of architecture and design services to bring your vision to life.</p>
      </header>

      <section className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <motion.article key={s.key} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="rounded-lg border bg-white p-6 shadow-sm hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="text-accent">{s.icon}</div>
              <h3 className="font-heading text-lg">{s.title}</h3>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
          </motion.article>
        ))}
      </section>
    </div>
  );
}
