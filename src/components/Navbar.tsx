import { Menu, X, HardHat } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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
          ? 'py-3 bg-[#1A1A1A]/95 backdrop-blur-md shadow-2xl border-b border-[#FFB800]/30'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 group" onClick={closeMenu}>
          <div className="relative">
            <HardHat
              className={`transition-all duration-500 ${scrolled ? 'text-[#FFB800]' : 'text-white'} group-hover:rotate-12`}
              size={32}
            />
            <div className="absolute -inset-1 bg-[#FFB800]/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
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

        {/* DESKTOP MENU - ÉPURÉ */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex gap-8 font-bold text-[11px] uppercase tracking-[0.2em]">
            <CustomLink to="/" label="Accueil" active={location.pathname === "/"} />
            <CustomLink to="/contact" label="Expertise & Devis" active={location.pathname === "/contact"} />
          </div>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-white bg-white/5' : 'text-white bg-black/20'}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-0 bg-[#1A1A1A] z-40 p-10 flex flex-col justify-center items-center">
          <button onClick={closeMenu} className="absolute top-6 right-6 text-[#FFB800]"><X size={32}/></button>

          <div className="flex flex-col gap-10 text-center">
            <MobileLink to="/" label="Accueil" onClick={closeMenu} />
            <MobileLink to="/contact" label="Contact & Devis" onClick={closeMenu} />
          </div>
        </div>
      )}
    </nav>
  );
}

function CustomLink({ to, label, active }: { to: string, label: string, active: boolean }) {
  return (
    <Link to={to} className={`relative group transition-colors ${active ? 'text-[#FFB800]' : 'text-white/80 hover:text-white'}`}>
      {label}
      <span className={`absolute -bottom-1 left-0 h-[2px] bg-[#FFB800] transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
    </Link>
  );
}

function MobileLink({ to, label, onClick }: { to: string, label: string, onClick: () => void }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="text-4xl font-black text-white uppercase tracking-tighter hover:text-[#FFB800] transition-colors"
    >
      {label}
    </Link>
  );
}