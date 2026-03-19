"use client";

import { motion } from 'framer-motion';
import { Star, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
// ✅ Import corrigé pour remonter de 2 niveaux vers src/store
import { useProjectStore } from '../../store/useProjectStore';

export default function Projects() {
  const { projects, fetchProjects, addStar, isLoading } = useProjectStore() as any;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchProjects();
  }, [fetchProjects]);

  if (!mounted) return null;

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto min-h-screen selection:bg-[#FFB800] selection:text-black">
      <div className="mb-16">
        <span className="text-[#FFB800] font-black text-[10px] uppercase tracking-[0.3em] block mb-2">
          Portfolio Technique
        </span>
        <h2 className="text-5xl font-black uppercase tracking-tighter text-[#0F172A]">
          Nos <span className="text-[#FFB800]">Réalisations</span>
        </h2>
        <div className="h-1.5 w-20 bg-[#FFB800] mt-4"></div>
      </div>

      {/* CHARGEMENT */}
      {isLoading && (
        <div className="flex flex-col items-center py-20">
          <Loader2 className="animate-spin text-[#FFB800]" size={40} />
          <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
            Accès à la base PostgreSQL...
          </p>
        </div>
      )}

      {/* VIDE */}
      {!isLoading && (!projects || projects.length === 0) && (
        <div className="text-center py-20 border-2 border-dashed border-gray-100 bg-gray-50/50">
          <p className="text-gray-400 font-bold italic">
            Aucun dossier technique publié pour le moment.
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects?.map((project: any) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10 }}
            className="bg-white border border-gray-100 shadow-2xl overflow-hidden group flex flex-col h-full"
          >
            {/* IMAGE AVEC EFFET GRAYSCALE */}
            <div className="h-60 bg-zinc-200 overflow-hidden relative shrink-0">
              <img
                src={project.images?.[0] || "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80"}
                alt={project.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
              />
              <div className="absolute top-4 right-4 bg-[#0F172A] text-[#FFB800] text-[9px] font-black px-3 py-1 uppercase tracking-widest border border-[#FFB800]/20">
                {project.type}
              </div>
            </div>

            {/* CONTENU DU DOSSIER */}
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-6 gap-2">
                <h3 className="font-black text-xl uppercase tracking-tighter leading-none text-[#0F172A] group-hover:text-[#FFB800] transition-colors">
                  {project.title}
                </h3>

                {/* BOUTON VOTE INTERACTIF */}
                <button
                  onClick={() => addStar(project.id)}
                  className="flex items-center gap-1.5 text-[#FFB800] bg-[#0F172A] px-2.5 py-1.5 shadow-lg active:scale-90 transition-transform group/star"
                >
                  <Star className="group-hover/star:fill-[#FFB800] transition-colors" size={14}/>
                  <span className="font-black text-xs text-white">{project.stars || 0}</span>
                </button>
              </div>

              <div className="space-y-4 mb-8 border-l-2 border-gray-100 pl-4 flex-grow">
                <div>
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Description</span>
                  <p className="text-sm font-bold text-gray-700 line-clamp-3 leading-snug">{project.description}</p>
                </div>
                <div>
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Maître d'Ouvrage</span>
                  <p className="text-sm font-bold text-gray-900">{project.client}</p>
                </div>
              </div>

              <button className="w-full bg-[#0F172A] text-white py-4 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#FFB800] hover:text-black transition-all shadow-xl group/btn">
                Ouvrir le Dossier Technique
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}