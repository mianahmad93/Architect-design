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
          <a href="/" className="flex items-center gap-3 group">
            {/* Logo Icon */}
            <div className="relative h-10 w-10">
              {/* Building structure */}
              <svg
                viewBox="0 0 40 40"
                className="h-full w-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Base foundation */}
                <rect x="2" y="35" width="36" height="3" fill="#D4AF37" opacity="0.9" />

                {/* Left building */}
                <path
                  d="M 8 35 L 8 15 L 15 10 L 15 35 Z"
                  fill="#E5E7EB"
                  className="group-hover:fill-white transition-colors duration-300"
                />
                <rect x="10" y="18" width="2" height="3" fill="#374151" opacity="0.3" />
                <rect x="10" y="23" width="2" height="3" fill="#374151" opacity="0.3" />
                <rect x="10" y="28" width="2" height="3" fill="#374151" opacity="0.3" />

                {/* Center tall building */}
                <path
                  d="M 17 35 L 17 8 L 23 8 L 23 35 Z"
                  fill="#F9FAFB"
                  className="group-hover:fill-white transition-colors duration-300"
                />
                <rect x="18.5" y="12" width="1.5" height="2" fill="#374151" opacity="0.3" />
                <rect x="18.5" y="16" width="1.5" height="2" fill="#374151" opacity="0.3" />
                <rect x="18.5" y="20" width="1.5" height="2" fill="#374151" opacity="0.3" />
                <rect x="18.5" y="24" width="1.5" height="2" fill="#374151" opacity="0.3" />
                <rect x="18.5" y="28" width="1.5" height="2" fill="#374151" opacity="0.3" />

                {/* Right building */}
                <path
                  d="M 25 35 L 25 18 L 32 13 L 32 35 Z"
                  fill="#E5E7EB"
                  className="group-hover:fill-white transition-colors duration-300"
                />
                <rect x="27" y="20" width="2" height="3" fill="#374151" opacity="0.3" />
                <rect x="27" y="25" width="2" height="3" fill="#374151" opacity="0.3" />
                <rect x="27" y="30" width="2" height="3" fill="#374151" opacity="0.3" />

                {/* Accent line */}
                <line x1="5" y1="10" x2="35" y2="10" stroke="#D4AF37" strokeWidth="1.5" opacity="0.8" />
              </svg>
            </div>
          </a>
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
      <footer className="relative border-t border-yellow-400/20 bg-zinc-950">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/30 pointer-events-none" />

        <div className="container relative z-10 py-10 grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <a href="/" className=" items-center gap-3 group inline-flex">
              {/* Logo Icon - Same as header */}
              <div className="relative h-8 w-8">
                <svg
                  viewBox="0 0 40 40"
                  className="h-full w-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="2" y="35" width="36" height="3" fill="#D4AF37" opacity="0.9" />
                  <path
                    d="M 8 35 L 8 15 L 15 10 L 15 35 Z"
                    fill="#E5E7EB"
                    className="group-hover:fill-white transition-colors duration-300"
                  />
                  <rect x="10" y="18" width="2" height="3" fill="#374151" opacity="0.3" />
                  <rect x="10" y="23" width="2" height="3" fill="#374151" opacity="0.3" />
                  <rect x="10" y="28" width="2" height="3" fill="#374151" opacity="0.3" />
                  <path
                    d="M 17 35 L 17 8 L 23 8 L 23 35 Z"
                    fill="#F9FAFB"
                    className="group-hover:fill-white transition-colors duration-300"
                  />
                  <rect x="18.5" y="12" width="1.5" height="2" fill="#374151" opacity="0.3" />
                  <rect x="18.5" y="16" width="1.5" height="2" fill="#374151" opacity="0.3" />
                  <rect x="18.5" y="20" width="1.5" height="2" fill="#374151" opacity="0.3" />
                  <rect x="18.5" y="24" width="1.5" height="2" fill="#374151" opacity="0.3" />
                  <rect x="18.5" y="28" width="1.5" height="2" fill="#374151" opacity="0.3" />
                  <path
                    d="M 25 35 L 25 18 L 32 13 L 32 35 Z"
                    fill="#E5E7EB"
                    className="group-hover:fill-white transition-colors duration-300"
                  />
                  <rect x="27" y="20" width="2" height="3" fill="#374151" opacity="0.3" />
                  <rect x="27" y="25" width="2" height="3" fill="#374151" opacity="0.3" />
                  <rect x="27" y="30" width="2" height="3" fill="#374151" opacity="0.3" />
                  <line x1="5" y1="10" x2="35" y2="10" stroke="#D4AF37" strokeWidth="1.5" opacity="0.8" />
                </svg>
              </div>
            </a>
            <p className="mt-4 text-sm text-gray-300 max-w-prose">
              Modern, elegant, and sustainable architecture. We design residential, commercial, and interior spaces that inspire.
            </p>
          </div>
          <nav className="grid gap-2">
            <h3 className="font-heading text-sm uppercase tracking-wider text-yellow-400">Quick Links</h3>
            {navItems.map((i) => (
              <Link
                key={i.to}
                to={i.to}
                className="text-sm text-gray-300 hover:text-yellow-400 transition-colors"
              >
                {i.label}
              </Link>
            ))}
          </nav>
          <div className="grid gap-2">
            <h3 className="font-heading text-sm uppercase tracking-wider text-yellow-400">Contact</h3>
            <p className="text-sm text-gray-300">Lahore, Pakistan</p>
            <a className="text-sm text-gray-300 hover:text-yellow-400 transition-colors" href="tel:+923001112223">
              +92 300 111 2223
            </a>
            <a className="text-sm text-gray-300 hover:text-yellow-400 transition-colors" href="mailto:info@waseemarchitects.com">
              info@waseemarchitects.com
            </a>
          </div>
        </div>
        <div className="relative z-10 border-t border-yellow-400/20 py-4 text-center text-xs text-gray-400">
          © 2025 All rights reserved.
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
            className="fixed bottom-6 right-6 z-40 rounded-full bg-yellow-400 text-gray-900 shadow-lg hover:bg-yellow-300 hover:shadow-yellow-400/50 transition-all duration-300"
            aria-label="Back to top"
          >
            <span className="block p-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
