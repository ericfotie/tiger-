import { useEffect } from 'react'; // Ne pas oublier l'import !
import { motion } from 'framer-motion';
import { Star, ArrowRight, ShieldCheck, MapPin, CheckCircle2, Award, Building2, Loader2 } from 'lucide-react';
import { useProjectStore } from '../store/useProjectStore';
import { Link } from 'react-router-dom';

export default function Home() {
  // On récupère isLoading pour gérer l'affichage pendant le chargement
  const { projects, addStar, fetchData, isLoading } = useProjectStore();

  // CHARGEMENT INITIAL DES DONNÉES DEPUIS LE CLOUD
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="overflow-hidden bg-[#F8FAFC]">
      {/* ... (Sections Hero et Barre Publicitaire identiques) ... */}

      {/* --- 4. RÉALISATIONS DYNAMIQUES --- */}
      <section id="projets" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <h2 className="text-4xl font-black uppercase leading-none border-l-8 border-[#FFB800] pl-6">
            Ouvrages <br /> <span className="text-gray-400">Récents</span>
          </h2>
          {isLoading && (
            <div className="flex items-center gap-2 text-[#FFB800] animate-pulse">
              <Loader2 className="animate-spin" size={20} />
              <span className="font-black text-xs uppercase">Synchronisation Cloud...</span>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects && projects.length > 0 ? (
            projects.map((project) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                key={project.id}
                className="bg-white border border-gray-100 shadow-xl group flex flex-col hover:border-[#FFB800] transition-colors"
              >
                {/* Image et Badge Type */}
                <div className="h-64 bg-gray-100 relative overflow-hidden">
                  <img src={project.images?.[0]} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" />
                  <div className="absolute top-4 right-4 bg-[#FFB800] text-black font-black px-3 py-1 text-[9px] uppercase tracking-widest">
                    {project.type}
                  </div>
                </div>

                {/* Contenu de la carte */}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-black text-xl uppercase tracking-tighter text-[#0F172A]">{project.title}</h3>
                    <button
                      onClick={() => addStar(project.id)}
                      className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 hover:bg-[#FFB800]/10 transition-colors"
                    >
                      <Star size={14} className="text-[#FFB800]" fill="#FFB800" />
                      <span className="font-black text-xs text-[#0F172A]">{project.stars}</span>
                    </button>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed mb-6 italic line-clamp-3">{project.description}</p>

                  <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Client: {project.client}</span>
                    <Link to="/contact" className="text-[#FFB800] hover:text-[#0F172A] transition-colors"><ArrowRight size={20}/></Link>
                  </div>
                </div>
              </motion.div>
            ))
          ) : !isLoading && (
            <div className="col-span-full text-center py-20 border-2 border-dashed border-gray-200 rounded-xl">
              <p className="text-gray-400 font-bold uppercase tracking-widest">Aucun projet publié pour le moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* ... (Reste du composant identique) ... */}
    </div>
  );
}