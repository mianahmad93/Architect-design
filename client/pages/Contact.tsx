import { useState } from "react";
import { useSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";

export default function Contact() {
  useSEO({ title: "Contact — Waseem Architects", description: "Get in touch with Waseem Architects." });

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    // Placeholder: integrate real endpoint or email service
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    alert("Message sent — we will get back to you shortly.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="container py-16 md:py-24">
      <div className="grid gap-8 md:grid-cols-2 items-start">
        <div>
          <h1 className="font-heading text-3xl md:text-4xl">Let’s Discuss Your Next Project</h1>
          <p className="mt-2 text-muted-foreground max-w-prose">We’d love to hear from you. Whether you’re planning a new project or need expert consultation — let’s talk.</p>

          <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
            <div className="grid gap-2">
              <label htmlFor="fullName" className="text-sm">Full Name</label>
              <input id="fullName" name="fullName" required className="h-11 rounded-md border bg-white px-3 outline-none focus:ring-2 focus:ring-accent" placeholder="Your full name" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm">Email Address</label>
              <input id="email" name="email" type="email" required className="h-11 rounded-md border bg-white px-3 outline-none focus:ring-2 focus:ring-accent" placeholder="you@example.com" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="phone" className="text-sm">Phone Number</label>
              <input id="phone" name="phone" type="tel" className="h-11 rounded-md border bg-white px-3 outline-none focus:ring-2 focus:ring-accent" placeholder="+92 300 1234567" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="message" className="text-sm">Message</label>
              <textarea id="message" name="message" rows={5} required className="rounded-md border bg-white p-3 outline-none focus:ring-2 focus:ring-accent" placeholder="Tell us about your project" />
            </div>
            <Button type="submit" className="bg-accent text-accent-foreground w-fit" disabled={submitting}>{submitting ? "Sending…" : "Send Message"}</Button>
          </form>

          <div className="mt-8">
            <h3 className="font-heading text-lg">Contact details</h3>
            <p className="mt-2 text-sm text-muted-foreground">📍 Address: 12-B Gulberg III, Lahore, Pakistan</p>
            <p className="mt-1 text-sm text-muted-foreground">☎️ Phone: <a href="tel:+923001234567" className="hover:text-accent">+92 300 1234567</a></p>
            <p className="mt-1 text-sm text-muted-foreground">✉️ Email: <a href="mailto:info@waseemarchitects.com" className="hover:text-accent">info@waseemarchitects.com</a></p>
          </div>
        </div>

        <div>
          <div className="rounded-md overflow-hidden border">
            <iframe
              title="Waseem Architects — Lahore"
              className="h-96 w-full"
              loading="lazy"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.0000000000005!2d74.35100000000001!3d31.520400000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904d6c5b1b1ab%3A0xabcdef1234567890!2s12-B%20Gulberg%20III%2C%20Lahore%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000001"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <footer className="mt-12 border-t pt-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">© 2025 Waseem Architects. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="/" className="text-sm hover:text-accent">Home</a>
            <a href="/about" className="text-sm hover:text-accent">About</a>
            <a href="/projects" className="text-sm hover:text-accent">Projects</a>
            <a href="/contact" className="text-sm hover:text-accent">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
