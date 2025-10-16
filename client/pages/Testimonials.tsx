import React from 'react'




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


const Testimonials = () => {
    return (
        <>
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
        </>
    )
}

export default Testimonials