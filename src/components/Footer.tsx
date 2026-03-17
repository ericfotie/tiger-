import { HardHat, Mail, Phone, MapPin, Facebook, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  return (
    <footer className="bg-[#1A1A1A] text-white pt-20 pb-10 px-6 border-t-4 border-[#FFB800]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

        {/* COLONNE 1 : IDENTITÉ */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <HardHat className="text-[#FFB800]" size={32} />
            <span className="font-black uppercase tracking-tighter text-2xl">Tiger Construction</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Leader dans l'ingénierie et la construction d'infrastructures au Cameroun.
          </p>
          <div className="flex gap-4">
            <SocialIcon icon={<Facebook size={18} />} href="#" />
            <SocialIcon icon={<Linkedin size={18} />} href="#" />
            <SocialIcon icon={<Instagram size={18} />} href="#" />
          </div>
        </div>

        {/* COLONNE 2 : NAVIGATION (NETTOYÉE - PLUS D'ESPACE PRO ICI) */}
        <div>
          <h4 className="font-black uppercase text-sm mb-6 tracking-widest border-b border-white/10 pb-2">Navigation</h4>
          <ul className="space-y-4 text-gray-400 text-sm font-bold uppercase">
            <li>
              <Link to="/" className="hover:text-[#FFB800] transition-colors flex items-center gap-2 group">
                Accueil <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all" />
              </Link>
            </li>
            <li>
              <Link to="/projets" className="hover:text-[#FFB800] transition-colors flex items-center gap-2 group">
                Réalisations <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all" />
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#FFB800] transition-colors flex items-center gap-2 group">
                Contact & Devis <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all" />
              </Link>
            </li>
          </ul>
        </div>

        {/* COLONNE 3 : EXPERTISE */}
        <div>
          <h4 className="font-black uppercase text-sm mb-6 tracking-widest border-b border-white/10 pb-2">Expertise</h4>
          <ul className="space-y-4 text-gray-400 text-xs font-medium">
            <li className="flex flex-col"><span className="text-white font-black italic uppercase text-[10px]">Génie Civil</span> Infrastructures routières.</li>
            <li className="flex flex-col"><span className="text-white font-black italic uppercase text-[10px]">Bureau d'études</span> Audits techniques.</li>
          </ul>
        </div>

        {/* COLONNE 4 : CONTACT */}
        <div>
          <h4 className="font-black uppercase text-sm mb-6 tracking-widest border-b border-white/10 pb-2">Contact</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="flex items-center gap-3">
              <Phone size={20} className="text-[#FFB800]" />
              <span className="font-bold text-white">+237 653 268 165</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={20} className="text-[#FFB800]" />
              <span className="break-all text-[12px]">ericfotie13@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* SECTION FINALE : COPYRIGHT + LE SEUL ACCÈS RESTANT (MICRO-POINT) */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 relative">
        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">
          © {currentYear} Tiger Construction. Infrastructures durables.
        </p>
        <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.2em]">
          Designed by <span className="text-[#FFB800]">Eric.Dev</span>
        </p>

        {/* LE POINT SECRET : Micro-poussière de 1px en bas à droite */}
        <button
          onClick={() => navigate('/admin')}
          className="absolute -bottom-2 -right-2 w-1 h-1 bg-white/5 cursor-default hover:bg-[#FFB800]/50 transition-colors"
          aria-hidden="true"
        />
      </div>
    </footer>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode, href: string }) {
  return (
    <a href={href} className="w-10 h-10 bg-white/5 flex items-center justify-center rounded hover:bg-[#FFB800] hover:text-black transition-all">
      {icon}
    </a>
  );
}