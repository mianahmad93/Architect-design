import { Link, NavLink, Outlet } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import TerminalPreLoader from "@/pages/TerminalPreLoader";


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
  const [showLoader, setShowLoader] = useState(false);

  
  useEffect(() => {
      setShowLoader(true);
      document.body.style.overflow = "hidden"; 
  
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else if (!showLoader) document.body.style.overflow = "";
  }, [open, showLoader]);

  const activeClass = useMemo(
    () =>
      ({ isActive }: { isActive: boolean }) =>
        cn(
          "px-3 py-2 text-sm tracking-wide transition-colors",
          "hover:text-accent-foreground",
          isActive ? "text-accent" : "text-foreground/80"
        ),
    []
  );

  
  if (showLoader) {
    return (
      <TerminalPreLoader
        onComplete={() => {
          setShowLoader(false);
          document.body.style.overflow = ""; 
        }}
      />
    );
  }

  
  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-foreground"
      >
        Skip to content
      </a>

      {/* Navbar */}
    {/* Navbar */}
<header className="sticky top-0 z-50 w-full border-b border-yellow-400/20 bg-[#1a1a1a] transition-colors duration-300">
  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/30 pointer-events-none" />
  
  <div className="container relative z-10 flex h-16 items-center justify-between">
    <Link to="/" className="flex items-center gap-2">
      <span className="inline-block h-8 w-8 rounded-sm bg-accent" aria-hidden />
      <span className="font-heading text-lg tracking-wide text-white">waaseem</span>
    </Link>
    <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
      {navItems.map((item) => (
        <NavLink 
          key={item.to} 
          to={item.to} 
          className={({ isActive }) =>
            cn(
              "px-3 py-2 text-sm tracking-wide transition-colors rounded-md",
              "hover:text-yellow-400 hover:bg-white/10",
              isActive ? "text-yellow-400 bg-yellow-400/20" : "text-gray-200"
            )
          }
          end={item.to === "/"}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
    <div className="md:hidden">
      <Button aria-label="Toggle menu" variant="ghost" size="icon" onClick={() => setOpen((v) => !v)} className="text-white hover:bg-white/10">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </Button>
    </div>
  </div>
  <AnimatePresence>
    {open && (
      <motion.div 
        initial={{ opacity: 0, height: 0 }} 
        animate={{ opacity: 1, height: "auto" }} 
        exit={{ opacity: 0, height: 0 }} 
        className="border-t border-yellow-400/20 md:hidden bg-[#1a1a1a] relative"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/30 pointer-events-none" />
        <div className="container relative z-10 py-2 flex flex-col">
          {navItems.map((item) => (
            <NavLink 
              key={item.to} 
              to={item.to} 
              className={({ isActive }) =>
                cn(
                  "px-3 py-2 text-sm tracking-wide transition-colors rounded-md",
                  "hover:text-yellow-400 hover:bg-white/10",
                  isActive ? "text-yellow-400 bg-yellow-400/20" : "text-gray-200"
                )
              }
              end={item.to === "/"} 
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</header>

      {/* Main Content */}
      <main id="content" className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
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
            <a className="text-sm text-foreground/80 hover:text-accent" href="tel:+923001112223">
              +92 300 111 2223
            </a>
            <a className="text-sm text-foreground/80 hover:text-accent" href="mailto:info@waseemarchitects.com">
              info@waseemarchitects.com
            </a>
          </div>
        </div>
        <div className="border-t py-4 text-center text-xs text-muted-foreground">
          © 2025 waaseem. All rights reserved.
        </div>
      </footer>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-40 rounded-full bg-accent text-accent-foreground shadow-lg hover:opacity-90"
            aria-label="Back to top"
          >
            <span className="block p-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 15l-6-6-6 6" />
              </svg>
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Layout;
