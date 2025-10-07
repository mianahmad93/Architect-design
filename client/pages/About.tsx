import { motion } from "framer-motion";
import { useSEO } from "@/lib/seo";

export default function About() {
  useSEO({
    title: "About — Waseem Architects",
    description:
      "Our story, mission, vision, and achievements at Waseem Architects.",
  });

  const timeline = [
    { year: "2015", text: "Studio founded with a focus on modern residential design." },
    { year: "2018", text: "Expanded to commercial projects and interiors." },
    { year: "2021", text: "Awarded for excellence in sustainable architecture." },
    { year: "2024", text: "Delivered 150+ projects across Pakistan." },
  ];

  const awards = [
    "A+ Sustainable Design Award",
    "Pakistan Architecture Excellence",
    "Interior Innovation Prize",
    "Urban Design Recognition",
  ];

  return (
    <div className="bg-background">
      <section className="container py-14 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <h1 className="font-heading text-3xl md:text-5xl">Crafting spaces that inspire.</h1>
            <p className="mt-4 text-muted-foreground">
              Waseem Architects is a multi-disciplinary studio creating architecture that is functional, timeless, and human-centered. Our mission is to elevate everyday life through design.
            </p>
            <div className="mt-6 grid gap-3">
              <div>
                <h3 className="font-heading text-lg">Mission</h3>
                <p className="text-sm text-muted-foreground">To design elegant, sustainable spaces that serve people and communities.</p>
              </div>
              <div>
                <h3 className="font-heading text-lg">Vision</h3>
                <p className="text-sm text-muted-foreground">To be the leading architecture firm in Pakistan known for innovation and integrity.</p>
              </div>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Ff5b2d64f73b6425baaffec479b1205e6%2Fdd2358296bdb44508daeebec2f6dae57?format=webp&width=800"
              alt="Founder portrait"
              className="h-80 w-full rounded-md object-cover shadow"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </div>
      </section>

      <section className="bg-secondary/40">
        <div className="container py-14 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl">Timeline</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-2">
            {timeline.map((t) => (
              <li key={t.year} className="rounded-md border bg-white p-6 shadow-sm">
                <div className="font-heading text-accent">{t.year}</div>
                <p className="mt-2 text-sm text-muted-foreground">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container py-14 md:py-20">
        <h2 className="font-heading text-2xl md:text-3xl">Awards & Recognitions</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {awards.map((a) => (
            <div key={a} className="rounded-md border p-6 text-center">
              <div className="mx-auto mb-3 h-10 w-10 rounded-full bg-accent" />
              <p className="text-sm font-medium">{a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
