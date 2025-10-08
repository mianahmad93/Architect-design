"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ExpertiseSection({ expertise }: { expertise: any[] }) {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context((self) => {
                const cards = self.selector(".expertise-card") as HTMLElement[];

                // Animate heading (scoped)
                gsap.from(self.selector(".expertise-heading"), {
                    opacity: 0,
                    y: -50,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                        end: "bottom 20%",
                        scrub: true,
                    },
                });

                // Animate cards with a scroll-triggered stagger (scoped)
                gsap.from(cards, {
                    y: 80,
                    opacity: 0,
                    rotateX: 10,
                    scale: 0.95,
                    duration: 0.8,
                    ease: "power3.out",
                    stagger: 0.25,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                });

                // Ensure ScrollTrigger recalculates positions after setup
                ScrollTrigger.refresh();
    }, sectionRef.current);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative bg-secondary/40 py-16 md:py-24 overflow-hidden"
        >
            {/* Subtle gradient background animation */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/10 pointer-events-none" />

            <div className="container relative">
                <h2 className="expertise-heading font-heading text-3xl md:text-4xl text-center mb-4">
                    Our Expertise
                </h2>
                <p className="text-center text-muted-foreground max-w-xl mx-auto mb-12">
                    Blending creativity, innovation, and modern architecture to craft spaces
                    that inspire.
                </p>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {expertise.map((item, i) => (
                        <article
                            key={item.title}
                            className="expertise-card group relative rounded-xl border bg-white/80 backdrop-blur-sm p-8 shadow-md hover:shadow-2xl transition-all duration-700 hover:-translate-y-2"
                        >
                            <div className="text-accent mb-4 text-4xl">{item.icon}</div>
                            <h3 className="font-heading text-xl">{item.title}</h3>
                            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                                {item.desc}
                            </p>

                            {/* Decorative accent line */}
                            <div className="absolute left-0 bottom-0 w-0 h-[3px] bg-accent transition-all duration-700 group-hover:w-full" />
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
