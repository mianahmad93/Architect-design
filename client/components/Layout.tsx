import { Link, NavLink, Outlet } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

export function Layout() {
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [open]);

  const activeClass = useMemo(
    () =>
      ({ isActive }: { isActive: boolean }) =>
        cn(
          "px-3 py-2 text-sm tracking-wide transition-colors",
          "hover:text-accent-foreground",
          isActive ? "text-accent" : "text-foreground/80",
        ),
    [],
  );

  return (
    <div className="min-h-screen flex flex-col">
      <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-foreground">Skip to content</a>
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-block h-8 w-8 rounded-sm bg-accent" aria-hidden />
            <span className="font-heading text-lg tracking-wide">waaseem</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={activeClass} end={item.to === "/"}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="md:hidden">
            <Button aria-label="Toggle menu" variant="ghost" size="icon" onClick={() => setOpen((v) => !v)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </Button>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="border-t md:hidden bg-white">
              <div className="container py-2 flex flex-col">
                {navItems.map((item) => (
                  <NavLink key={item.to} to={item.to} className={activeClass} end={item.to === "/"} onClick={() => setOpen(false)}>
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main id="content" className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t bg-secondary/30">
        <div className="container py-10 grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="inline-block h-7 w-7 rounded-sm bg-accent" aria-hidden />
              <span className="font-heading text-lg">waseem</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-prose">
              Modern, elegant, and sustainable architecture. We design residential, commercial, and interior spaces that inspire.
            </p>
          </div>
          <nav className="grid gap-2">
            <h3 className="font-heading text-sm uppercase tracking-wider text-foreground/70">Quick Links</h3>
            {navItems.map((i) => (
              <Link key={i.to} to={i.to} className="text-sm text-foreground/80 hover:text-accent">
                {i.label}
              </Link>
            ))}
          </nav>
          <div className="grid gap-2">
            <h3 className="font-heading text-sm uppercase tracking-wider text-foreground/70">Contact</h3>
            <p className="text-sm text-foreground/80">Lahore, Pakistan</p>
            <a className="text-sm text-foreground/80 hover:text-accent" href="tel:+923001112223">+92 300 111 2223</a>
            <a className="text-sm text-foreground/80 hover:text-accent" href="mailto:info@waseemarchitects.com">info@waseemarchitects.com</a>
            <div className="flex gap-3 pt-1">
              <a href="#" aria-label="Instagram" className="text-foreground/70 hover:text-accent transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" aria-label="Facebook" className="text-foreground/70 hover:text-accent transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.5 9.95v-7.04H7.9V12h2.6V9.8c0-2.57 1.53-3.99 3.87-3.99 1.12 0 2.29.2 2.29.2v2.52h-1.29c-1.27 0-1.66.79-1.66 1.6V12h2.83l-.45 2.91h-2.38v7.04A10 10 0 0 0 22 12"/></svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="text-foreground/70 hover:text-accent transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8.5h4V24h-4V8.5zM8.5 8.5h3.8v2.1h.05c.53-1 1.82-2.1 3.75-2.1 4 0 4.74 2.63 4.74 6V24h-4v-6.7c0-1.6 0-3.7-2.26-3.7-2.26 0-2.6 1.77-2.6 3.6V24h-4V8.5z"/></svg>
              </a>
            </div>
          </div>
        </div>
  <div className="border-t py-4 text-center text-xs text-muted-foreground">© 2025 waaseem. All rights reserved.</div>
      </footer>

      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-40 rounded-full bg-accent text-accent-foreground shadow-lg hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Back to top"
          >
            <span className="block p-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 15l-6-6-6 6"/></svg>
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Layout;
