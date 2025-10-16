import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const IndexAbout = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth horizontal scroll animation for text
      gsap.to(textRef.current, {
        x: 100, // move right when scrolling down
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true, // smooth animation
        },
      });

      // Optional subtle opposite parallax for image
      gsap.to(imageRef.current, {
        x: -30, // small counter movement for nice depth
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="container py-16 md:py-24 overflow-hidden"
    >
      <div className="grid gap-10 md:grid-cols-2 md:gap-14 items-center">
        {/* Left Text Section */}
        <div ref={textRef} className="md:pr-6">
          <h2 className="font-heading text-2xl md:text-4xl mb-4">
            About Waseem Architects
          </h2>
          <p className="text-muted-foreground mb-6">
            We are an architecture studio focused on modern, sustainable, and
            human-centered design. Our work blends geometric precision with warm
            materiality to create spaces that feel effortless.
          </p>
          <a href="/about">
            <Button className="bg-accent text-accent-foreground hover:opacity-95">
              Learn More
            </Button>
          </a>
        </div>

        {/* Right Image Section */}
        <div className="relative w-[85%] mx-auto md:w-[80%]" style={{ perspective: '1000px' }}>
          <img
            ref={imageRef}
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop"
            alt="Studio interior"
            className="w-full h-72 md:h-96 object-cover rounded-md shadow-xl"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute -inset-2 border-2 border-accent/20 rounded-md -z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default IndexAbout;
