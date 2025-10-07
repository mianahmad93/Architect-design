import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useSEO } from "@/lib/seo";

const PROJECTS = [
  {
    id: "modern-villa",
    title: "Modern Villa — Lahore",
    category: "Residential",
    img: "https://cdn.builder.io/api/v1/image/assets%2Ff5b2d64f73b6425baaffec479b1205e6%2Fdd2358296bdb44508daeebec2f6dae57?format=webp&width=1200",
    excerpt: "A luxury home blending glass, wood, and concrete textures.",
    features: ["Open courtyard", "Solar panels", "Green walls"],
  },
  {
    id: "corporate-tower",
    title: "Corporate Tower — Karachi",
    category: "Commercial",
    img: "https://images.unsplash.com/photo-1505842465776-3acb42587e1d?q=80&w=1200&auto=format&fit=crop",
    excerpt: "12-story office tower designed with sustainable materials and smart systems.",
    features: ["12 stories", "Sustainable materials", "Smart systems"],
  },
  {
    id: "urban-apartment",
    title: "Urban Apartment — Islamabad",
    category: "Residential",
    img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1200&auto=format&fit=crop",
    excerpt: "Compact yet elegant city apartments with modern aesthetics.",
    features: ["Space optimization", "Modern aesthetics"],
  },
  {
    id: "school-building",
    title: "School Building — Faisalabad",
    category: "Commercial",
    img: "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1200&auto=format&fit=crop",
    excerpt: "Functional educational space with natural lighting and open-air areas.",
    features: ["Natural lighting", "Flexible classrooms"],
  },
  {
    id: "restaurant-interior",
    title: "Restaurant Interior — Multan",
    category: "Interior",
    img: "https://cdn.builder.io/api/v1/image/assets%2Ff5b2d64f73b6425baaffec479b1205e6%2Fd920a7b102114b6c9431f6814e954e06?format=webp&width=1200",
    excerpt: "Industrial-chic theme with exposed bricks and modern lighting.",
    features: ["Exposed brick", "Modern lighting"],
  },
];

const categories = ["All", "Residential", "Commercial", "Interior"];

export default function Projects() {
  useSEO({ title: "Projects — Waseem Architects", description: "Our portfolio of residential, commercial, and interior projects." });

  const [filter, setFilter] = useState<string>("All");
  const [selected, setSelected] = useState<string | null>(null);

  const list = useMemo(() => {
    if (filter === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <div className="container py-16 md:py-24">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl">Projects</h1>
          <p className="mt-2 text-muted-foreground max-w-prose">Explore a curated selection of our work across residential, commercial and interior projects.</p>
        </div>
        <div className="mt-2 flex gap-2">
          {categories.map((c) => (
            <button key={c} onClick={() => setFilter(c)} className={`text-sm px-3 py-2 rounded-md ${filter === c ? "bg-accent text-accent-foreground" : "bg-white border text-foreground/80"}`}>
              {c}
            </button>
          ))}
        </div>
      </header>

      <section className="mt-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {list.map((p) => (
            <motion.article key={p.id} className="group relative overflow-hidden rounded-md border bg-white" whileHover={{ scale: 1.01 }} onClick={() => setSelected(p.id)}>
              <img src={p.img} alt={p.title} loading="lazy" decoding="async" className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
              <div className="p-4">
                <h3 className="font-heading text-lg">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                <div className="mt-3 flex gap-2 text-xs text-muted-foreground">
                  {p.features.map((f) => (
                    <span key={f} className="inline-block rounded-full border px-2 py-1">{f}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Simple lightbox modal */}
      {selected && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60" onClick={() => setSelected(null)}>
          <div className="max-w-3xl p-4" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} className="mb-4 text-sm underline">Close</button>
            <div className="rounded-md overflow-hidden bg-white">
              <img src={PROJECTS.find((p) => p.id === selected)?.img} alt={PROJECTS.find((p) => p.id === selected)?.title} className="w-full h-80 object-cover" />
              <div className="p-4">
                <h3 className="font-heading text-xl">{PROJECTS.find((p) => p.id === selected)?.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{PROJECTS.find((p) => p.id === selected)?.excerpt}</p>
                <div className="mt-3 flex gap-2">
                  {PROJECTS.find((p) => p.id === selected)?.features.map((f) => (
                    <span key={f} className="inline-block rounded-full border px-3 py-1 text-xs">{f}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
