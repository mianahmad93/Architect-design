import { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useSEO, localBusinessSchema } from "@/lib/seo";
import Aos from "aos";
import "aos/dist/aos.css";
import ExpertiseSection from "./Expertise";





const heroImg =
  "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2070&auto=format&fit=crop";

const expertise = [
  {
    title: "Residential",
    desc: "Timeless homes with natural light, clean lines, and functional elegance.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 11l9-8 9 8" /><path d="M9 22V12h6v10" /><path d="M21 22H3" /></svg>
    ),
  },
  {
    title: "Commercial",
    desc: "Modern workplaces and retail spaces that elevate your brand.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 22h18" /><path d="M6 18V5h12v13" /><path d="M8 8h8" /></svg>
    ),
  },
  {
    title: "Interior Design",
    desc: "Minimal interiors with premium materials and warm palettes.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 22h16" /><path d="M7 22V7h10v15" /><path d="M12 7V2" /></svg>
    ),
  },
];

const projects = [
  "https://cdn.builder.io/api/v1/image/assets%2Ff5b2d64f73b6425baaffec479b1205e6%2Fdd2358296bdb44508daeebec2f6dae57?format=webp&width=1800",
  "https://cdn.builder.io/api/v1/image/assets%2Ff5b2d64f73b6425baaffec479b1205e6%2Fd920a7b102114b6c9431f6814e954e06?format=webp&width=1800",
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=1800&auto=format&fit=crop",
];

const testimonials = [
  {
    quote:
      "They transformed our vision into a landmark. Attention to detail is remarkable.",
    name: "Ahsan R.",
  },
  {
    quote:
      "Elegant, modern, and on time. The team is professional and collaborative.",
    name: "Sana K.",
  },
  {
    quote: "Our office redesign boosted productivity and client impressions.",
    name: "Orbit Tech",
  },
];

export default function Index() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);



  useSEO({
    title: " Designing Tomorrow’s Landmarks Today.",
    description:
      "Modern, elegant, and high-performance architecture in Pakistan. Residential, Commercial, Interior Design.",
    keywords: [
      "Best Architecture Firm in Pakistan",
      "Modern Architectural Design",
      "Waseem Architects Portfolio",
      "Residential & Commercial Architecture",
      "Interior Design Services Pakistan",
    ],
    ogImage: projects[0],
    schema: localBusinessSchema(),
  });
  Aos.init()
  return (
    <div className="bg-background text-foreground">
      {/* Hero */}
      <section
        className="relative min-h-[70svh] md:min-h-[88svh] grid place-items-center overflow-hidden"
        aria-label="Hero"
      >
        {/* Parallax background */}
        <motion.img
          src={heroImg}
          alt="Modern architectural facade"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ y }}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

        {/* Text content */}
        <div className="relative container text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight"
          >
            Designing Tomorrow’s Landmarks Today.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-white/90"
          >
            Architects crafts iconic residential, commercial, and interior spaces with precision and purpose.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-8 flex items-center justify-center gap-3"
          >
            <a href="#contact">
              <Button className="bg-accent text-accent-foreground hover:opacity-95">
                Start a Project
              </Button>
            </a>
            <a href="#about">
              <Button
                variant="outline"
                className="border-white/70 text-white bg-white/10 hover:bg-white/20"
              >
                Learn More
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="container py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-2 md:gap-14 items-center">
          {/* Left Side — Text */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="font-heading text-2xl md:text-4xl">
              About Waseem Architects
            </h2>
            <p className="mt-4 text-muted-foreground">
              We are an architecture studio focused on modern, sustainable, and
              human-centered design. Our work blends geometric precision with
              warm materiality to create spaces that feel effortless.
            </p>
            <div className="mt-6">
              <a href="/about">
                <Button className="bg-accent text-accent-foreground hover:opacity-95">
                  Learn More
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Right Side — Image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop"
              alt="Studio interior"
              className="w-full h-72 md:h-96 object-cover rounded-md shadow"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </div>
      </section>

      {/* Expertise */}
        <ExpertiseSection expertise={expertise} />

      {/* Featured Projects */}
     
      <section className="container py-16 md:py-24">

        <div className="flex items-end justify-between gap-4">
          <h2 className="font-heading text-2xl md:text-3xl">Featured Projects</h2>
          <a href="/projects" className="text-sm text-foreground/70 hover:text-accent">View All</a>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((src, i) => (
            <motion.figure
              data-aos="flip-down"

              key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="group relative overflow-hidden rounded-md">
              <img
                src={`${src}`}

                alt={`Project ${i + 1}`}
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <figcaption className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.figure>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-secondary/40 py-16 md:py-20">
        <div className="container">
          <h2 className="font-heading text-2xl md:text-3xl">Client Testimonials</h2>
          <div className="mt-6 overflow-hidden">
            <div className="flex gap-6 flex-nowrap animate-marquee hover:[animation-play-state:paused]">
              {[...testimonials, ...testimonials].map((t, i) => (
                <blockquote key={i} className="min-w-[280px] max-w-sm rounded-md border bg-white p-6 shadow-sm">
                  <p className="text-sm">“{t.quote}”</p>
                  <footer className="mt-3 text-xs text-muted-foreground">— {t.name}</footer>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="container py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 items-start">
          <div>
            <h2 className="font-heading text-2xl md:text-3xl">Contact Us</h2>
            <p className="mt-2 text-muted-foreground text-sm">Tell us about your project and we’ll get back within 24 hours.</p>
            <form className="mt-6 grid gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm">Name</label>
                <input id="name" name="name" required className="h-11 rounded-md border bg-white px-3 outline-none focus:ring-2 focus:ring-accent" placeholder="Your name" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm">Email</label>
                <input id="email" name="email" type="email" required className="h-11 rounded-md border bg-white px-3 outline-none focus:ring-2 focus:ring-accent" placeholder="you@example.com" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="message" className="text-sm">Message</label>
                <textarea id="message" name="message" rows={4} className="rounded-md border bg-white p-3 outline-none focus:ring-2 focus:ring-accent" placeholder="Tell us about your project" />
              </div>
              <Button className="bg-accent text-accent-foreground hover:opacity-95 w-fit">Send Message</Button>
            </form>
          </div>
          <div>
            <div className="aspect-[16/10] w-full overflow-hidden rounded-md border bg-white">
              <iframe
                title="Map"
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108838.8176382342!2d74.2293702!3d31.4826358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190fd614b5f8ef%3A0x9e5bf4c4e3c0b6a4!2sLahore%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
