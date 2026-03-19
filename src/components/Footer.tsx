"use client"; // ✅ Obligatoire pour utiliser useRouter et le bouton secret

import { HardHat, Mail, Phone, Facebook, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';
// ✅ Next.js utilise 'next/link' et 'next/navigation'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const router = useRouter();

  return (
    <footer className="bg-[#0F172A] text-white pt-20 pb-10 px-6 border-t-4 border-[#FFB800]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

        {/* COLONNE 1 : IDENTITÉ & RÉSEAUX */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <HardHat className="text-[#FFB800]" size={32} />
            <span className="font-black uppercase tracking-tighter text-2xl">Tiger Construction</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Leader dans l'ingénierie et la construction d'infrastructures au Cameroun. L'excellence au service du développement durable.
          </p>
          <div className="flex gap-4">
            <SocialIcon icon={<Facebook size={18} />} href="#" />
            <SocialIcon icon={<Linkedin size={18} />} href="#" />
            <SocialIcon icon={<Instagram size={18} />} href="#" />
          </div>
        </div>

        {/* COLONNE 2 : NAVIGATION */}
        <div>
          <h4 className="font-black uppercase text-sm mb-6 tracking-widest border-b border-white/10 pb-2 text-[#FFB800]">Navigation</h4>
          <ul className="space-y-4 text-gray-400 text-sm font-bold uppercase">
            <li>
              <Link href="/" className="hover:text-[#FFB800] transition-colors flex items-center gap-2 group">
                Accueil <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#FFB800] transition-colors flex items-center gap-2 group">
                Expertise & Devis <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
              </Link>
            </li>
          </ul>
        </div>

        {/* COLONNE 3 : EXPERTISE TECHNIQUE */}
        <div>
          <h4 className="font-black uppercase text-sm mb-6 tracking-widest border-b border-white/10 pb-2 text-[#FFB800]">Expertise</h4>
          <ul className="space-y-4 text-gray-300 text-[11px] font-medium">
            <li className="flex flex-col border-l-2 border-[#FFB800]/30 pl-3">
              <span className="text-white font-black uppercase text-[10px]">Génie Civil</span>
              <span className="text-gray-500 italic">Infrastructures routières et ponts.</span>
            </li>
            <li className="flex flex-col border-l-2 border-[#FFB800]/30 pl-3">
              <span className="text-white font-black uppercase text-[10px]">Bureau d'études</span>
              <span className="text-gray-500 italic">Calcul de structures et audits.</span>
            </li>
          </ul>
        </div>

        {/* COLONNE 4 : CONTACT DIRECT */}
        <div>
          <h4 className="font-black uppercase text-sm mb-6 tracking-widest border-b border-white/10 pb-2 text-[#FFB800]">Contact</h4>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 group cursor-pointer">
              <div className="p-2 bg-white/5 rounded group-hover:bg-[#FFB800] transition-colors">
                <Phone size={18} className="text-[#FFB800] group-hover:text-black" />
              </div>
              <span className="font-black text-white text-sm tracking-tighter">+237 653 268 165</span>
            </li>
            <li className="flex items-center gap-3 group cursor-pointer">
              <div className="p-2 bg-white/5 rounded group-hover:bg-[#FFB800] transition-colors">
                <Mail size={18} className="text-[#FFB800] group-hover:text-black" />
              </div>
              <span className="text-[10px] font-bold text-gray-400 group-hover:text-white transition-colors">ericfotie13@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 relative">
        <p className="text-gray-500 text-[9px] font-black uppercase tracking-[0.2em]">
          © {currentYear} Tiger Construction. Tous droits réservés.
        </p>
        <p className="text-gray-600 text-[9px] font-black uppercase tracking-[0.2em]">
          Designed by <span className="text-[#FFB800]">Eric.Dev</span>
        </p>

        {/* 🕵️ BACKDOOR ADMIN : Le point secret */}
        <button
          onClick={() => router.push('/admin')}
          className="absolute -bottom-2 -right-2 w-4 h-4 bg-transparent cursor-default hover:bg-[#FFB800]/10 transition-colors z-50 rounded-full"
          title="Console Ingénieur"
        />
      </div>
    </footer>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode, href: string }) {
  return (
    <a href={href} className="w-9 h-9 bg-white/5 flex items-center justify-center rounded-sm hover:bg-[#FFB800] hover:text-black transition-all duration-300">
      {icon}
    </a>
  );
}