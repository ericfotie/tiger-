"use client"; // ✅ Indispensable pour Framer Motion et le scroll

import { Menu, X, HardHat } from 'lucide-react';
import { useState, useEffect } from 'react';
// ✅ Next.js utilise 'next/link' et 'next/navigation'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname(); // ✅ Remplace useLocation().pathname

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 ${
        scrolled
          ? 'py-3 bg-[#1A1A1A]/95 backdrop-blur-md shadow-2xl border-b border-[#FFB800]/20'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* LOGO DYNAMIQUE */}
        <Link href="/" className="flex items-center gap-3 group" onClick={closeMenu}>
          <div className="relative">
            <HardHat
              className={`transition-all duration-500 ${scrolled ? 'text-[#FFB800]' : 'text-white'} group-hover:rotate-12`}
              size={32}
            />
            <motion.div
              layoutId="logo-glow"
              className="absolute -inset-1 bg-[#FFB800]/30 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-black uppercase leading-none tracking-tighter text-2xl text-white">
              Tiger<span className="text-[#FFB800]">Construction</span>
            </span>
            <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-gray-400 leading-none mt-1">
              Engineering Excellence
            </span>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex gap-8 font-bold text-[11px] uppercase tracking-[0.2em]">
            <CustomLink href="/" label="Accueil" active={pathname === "/"} />
            <CustomLink href="/contact" label="Expertise & Devis" active={pathname === "/contact"} />
          </div>

          <AnimatePresence>
            {scrolled && (
              <motion.a
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                href="tel:+237653268165"
                className="bg-[#FFB800] text-black px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-white transition-colors"
              >
                Appel Urgent
              </motion.a>
            )}
          </AnimatePresence>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className={`md:hidden p-2 rounded-sm transition-all ${scrolled ? 'text-[#FFB800] bg-white/5' : 'text-white bg-black/20'}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="md:hidden fixed inset-0 bg-[#1A1A1A] z-[60] flex flex-col justify-center items-center p-10"
          >
            <button onClick={closeMenu} className="absolute top-8 right-8 text-[#FFB800]">
              <X size={40}/>
            </button>

            <div className="flex flex-col gap-8 text-center">
              <MobileLink href="/" label="Accueil" onClick={closeMenu} />
              <MobileLink href="/contact" label="Expertise & Devis" onClick={closeMenu} />
              <div className="h-px w-20 bg-[#FFB800]/30 mx-auto my-4"></div>
              <a href="tel:+237653268165" className="text-[#FFB800] font-black text-lg">+237 653 268 165</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ✅ Utilisation de href au lieu de to
function CustomLink({ href, label, active }: { href: string, label: string, active: boolean }) {
  return (
    <Link href={href} className={`relative group transition-colors ${active ? 'text-[#FFB800]' : 'text-white/70 hover:text-white'}`}>
      {label}
      <span className={`absolute -bottom-1 left-0 h-[2px] bg-[#FFB800] transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
    </Link>
  );
}

function MobileLink({ href, label, onClick }: { href: string, label: string, onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-5xl font-black text-white uppercase tracking-tighter hover:text-[#FFB800] transition-colors"
    >
      {label}
    </Link>
  );
}