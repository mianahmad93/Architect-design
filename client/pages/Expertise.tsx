"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const expertise = [
  {
    title: "Residential",
    desc: "Timeless homes with natural light, clean lines, and functional elegance.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 11l9-8 9 8" />
        <path d="M9 22V12h6v10" />
        <path d="M21 22H3" />
      </svg>
    ),
  },
  {
    title: "Commercial",
    desc: "Modern workplaces and retail spaces that elevate your brand.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 22h18" />
        <path d="M6 18V5h12v13" />
        <path d="M8 8h8" />
      </svg>
    ),
  },
  {
    title: "Interior Design",
    desc: "Minimal interiors with premium materials and warm palettes.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 22h16" />
        <path d="M7 22V7h10v15" />
        <path d="M12 7V2" />
      </svg>
    ),
  },
  {
    title: "Landscape",
    desc: "Connecting indoor and outdoor spaces with harmony and simplicity.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 20h16" />
        <path d="M4 14l4-4 4 4 4-4 4 4" />
      </svg>
    ),
  },
  {
    title: "Urban Design",
    desc: "Sustainable and efficient community-focused planning solutions.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 22h18" />
        <path d="M6 18V8h4v10" />
        <path d="M14 18V4h4v14" />
      </svg>
    ),
  },
];

export default function ExpertiseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const scrollContainer = scrollContainerRef.current;

    const ctx = gsap.context(() => {
      const totalScrollWidth = scrollContainer.scrollWidth;
      const viewportWidth = section.offsetWidth;
      const scrollDistance = totalScrollWidth - viewportWidth;

      // Main horizontal scroll animation
      const horizontalTween: gsap.core.Tween = gsap.to(scrollContainer, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          id: "horizontalScroll",
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Animate each card’s internal elements
      const cards = gsap.utils.toArray<HTMLElement>(".expertise-card");

      cards.forEach((card, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            // pass the horizontal tween (a gsap Animation) as the containerAnimation
            containerAnimation: horizontalTween,
            start: "left center",
            end: "right center",
            scrub: true,
          },
        });

        const directions = ["y: -50", "x: 50", "y: 50", "x: -50"];
        const randomDir = directions[i % directions.length];

        tl.from(card.querySelector(".icon"), {
          opacity: 0,
          duration: 1,
          [randomDir.split(": ")[0]]: Number(randomDir.split(": ")[1]),
        })
          .from(
            card.querySelector(".title"),
            {
              opacity: 0,
              x: i % 2 === 0 ? -40 : 40,
              duration: 1,
            },
            "-=0.5"
          )
          .from(
            card.querySelector(".desc"),
            {
              opacity: 0,
              y: i % 2 === 0 ? 40 : -40,
              duration: 1,
            },
            "-=0.6"
          );
      });

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-gradient-to-r from-gray-50 via-white to-gray-100 py-20 overflow-hidden"
    >
      <div className="container mx-auto mb-12 text-center">
        <h2 className="font-heading text-4xl md:text-5xl font-semibold mb-4">
          Our Expertise
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
          Scroll to explore our areas of architectural mastery — each crafted with precision and innovation.
        </p>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-10 px-10 md:px-20"
        style={{ width: `${expertise.length * 80}vw` }}
      >
        {expertise.map((item, i) => (
          <div
            key={i}
            className="expertise-card flex-shrink-0 w-[70vw] md:w-[60vw] bg-white rounded-3xl shadow-xl border border-gray-200 p-10 flex flex-col justify-center items-start"
          >
            <div className="icon text-accent text-5xl mb-6">{item.icon}</div>
            <h3 className="title font-heading text-2xl md:text-3xl mb-3">{item.title}</h3>
            <p className="desc text-gray-600 text-base md:text-lg leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
