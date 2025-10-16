import React from 'react';
import { Button } from "@/components/ui/button";

const IndexContact = () => {
    return (
        <>
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
        </>
    )
}

export default IndexContact