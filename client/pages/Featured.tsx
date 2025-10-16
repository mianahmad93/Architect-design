import React from 'react';
import { motion, useScroll, useTransform } from "framer-motion";


const projects = [
  "https://cdn.builder.io/api/v1/image/assets%2Ff5b2d64f73b6425baaffec479b1205e6%2Fdd2358296bdb44508daeebec2f6dae57?format=webp&width=1800",
  "https://cdn.builder.io/api/v1/image/assets%2Ff5b2d64f73b6425baaffec479b1205e6%2Fd920a7b102114b6c9431f6814e954e06?format=webp&width=1800",
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=1800&auto=format&fit=crop",
];

const Featured = () => {
    return (
        <>
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
        </>
    )
}

export default Featured