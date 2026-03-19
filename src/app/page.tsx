'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowRight, Loader2, HardHat } from 'lucide-react'; // Ajout de HardHat pour le style
import { useProjectStore } from '../store/useProjectStore';
import Link from 'next/link';

export default function Home() {
  const projects = useProjectStore((state: any) => state.projects) || [];
  const fetchData = useProjectStore((state: any) => state.fetchData);
  const addStar = useProjectStore((state: any) => state.addStar);
  const isLoading = useProjectStore((state: any) => state.isLoading);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchData();
  }, [fetchData]);

  if (!mounted) return null;

  return (
    <div className="overflow-hidden bg-[#F8FAFC] min-h-screen pt-24">
      <section id="projets" className="py-20 px-6 max-w-7xl mx-auto">

        {/* HEADER DE SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <HardHat size={16} className="text-[#FFB800]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Portfolio BTP</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase leading-[0.85] border-l-8 border-[#FFB800] pl-6 text-[#0F172A] tracking-tighter">
              Ouvrages <br /> <span className="text-gray-300">Récents</span>
            </h2>
          </div>

          {/* INDICATEUR DE FLUX DB */}
          <div className="h-12 flex items-center bg-white px-5 rounded-full shadow-sm border border-gray-100">
            {isLoading ? (
              <div className="flex items-center gap-3 text-[#FFB800]">
                <Loader2 className="animate-spin" size={16} />
                <span className="font-black text-[9px] uppercase tracking-widest">Lecture PostgreSQL...</span>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-green-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-black text-[9px] uppercase tracking-widest">Dossiers synchronisés</span>
              </div>
            )}
          </div>
        </div>

        {/* GRILLE DE PROJETS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {projects.length > 0 ? (
              projects.map((project: any) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  viewport={{ once: true }}
                  className="bg-white border border-gray-100 shadow-xl group flex flex-col hover:border-[#FFB800] transition-all duration-500"
                >
                  {/* VISUEL TECHNIQUE */}
                  <div className="h-72 bg-gray-200 relative overflow-hidden shrink-0">
                    <img
                      src={project.images?.[0] || "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2070&auto=format&fit=crop"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-transparent to-transparent opacity-60"></div>
                    <div className="absolute top-4 right-4 bg-[#FFB800] text-black font-black px-4 py-1.5 text-[10px] uppercase tracking-widest shadow-2xl border border-black/5">
                      {project.type}
                    </div>
                  </div>

                  {/* DETAILS */}
                  <div className="p-8 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-6 gap-3">
                      <h3 className="font-black text-2xl uppercase tracking-tighter text-[#0F172A] leading-[0.9] group-hover:text-[#FFB800] transition-colors">
                        {project.title}
                      </h3>
                      <button
                        onClick={() => addStar(project.id)}
                        className="flex items-center gap-2 bg-[#0F172A] px-3 py-2 hover:bg-[#FFB800] transition-all shadow-lg active:scale-90 group/star"
                      >
                        <Star size={12} className="text-[#FFB800] group-hover:text-black transition-colors" fill="currentColor" />
                        <span className="font-black text-xs text-white group-hover:text-black">{project.stars || 0}</span>
                      </button>
                    </div>

                    <p className="text-gray-500 text-xs leading-relaxed mb-8 italic line-clamp-3 border-l-2 border-gray-100 pl-4">
                      {project.description}
                    </p>

                    <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Maître d'Ouvrage</span>
                        <span className="text-[11px] font-bold text-[#0F172A] uppercase">{project.client}</span>
                      </div>
                      <Link
                        href="/contact"
                        className="bg-[#0F172A] text-white p-3 group-hover:bg-[#FFB800] group-hover:text-black transition-all shadow-md"
                      >
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              !isLoading && (
                <div className="col-span-full text-center py-40 border-4 border-dashed border-gray-100 bg-white">
                  <div className="max-w-sm mx-auto">
                    <HardHat size={40} className="mx-auto text-gray-200 mb-4" />
                    <p className="text-gray-400 font-black text-xs uppercase tracking-[0.3em]">Aucune archive disponible</p>
                    <p className="text-gray-300 text-[10px] mt-2 italic px-4">Les projets de Tiger Construction apparaîtront ici après validation technique.</p>
                  </div>
                </div>
              )
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}