import { motion } from 'framer-motion';
// Suppression de HardHat ici pour corriger l'erreur de build
import { Star } from 'lucide-react';

const mockProjects = [
  {
    id: 1,
    title: "Pont de la Sanaga",
    desc: "Ouvrage d'art en béton précontraint.",
    maitreOuvrage: "MINTP",
    budget: "1.2 Milliards FCFA",
    stars: 124,
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80"
  }
];

export default function Projects() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-16">
        <span className="text-[#FFB800] font-black text-[10px] uppercase tracking-[0.3em] block mb-2">Portfolio Technique</span>
        <h2 className="text-5xl font-black uppercase tracking-tighter text-[#0F172A]">
          Nos <span className="text-[#FFB800]">Réalisations</span>
        </h2>
        <div className="h-1.5 w-20 bg-[#FFB800] mt-4"></div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {mockProjects.map(project => (
          <motion.div
            key={project.id}
            whileHover={{ y: -10 }}
            className="bg-white border border-gray-100 shadow-2xl overflow-hidden group"
          >
            {/* Image avec filtre pro */}
            <div className="h-56 bg-zinc-200 overflow-hidden relative">
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute top-4 right-4 bg-[#0F172A] text-white text-[9px] font-black px-3 py-1 uppercase tracking-widest">
                Génie Civil
              </div>
            </div>

            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-black text-xl uppercase tracking-tighter leading-tight text-[#0F172A] group-hover:text-[#FFB800] transition-colors">
                  {project.title}
                </h3>
                <div className="flex items-center gap-1.5 text-[#FFB800] bg-[#0F172A] px-2 py-1 shadow-lg">
                  <Star fill="#FFB800" size={14}/>
                  <span className="font-black text-xs text-white">{project.stars}</span>
                </div>
              </div>

              <div className="space-y-3 mb-8 border-l-2 border-gray-100 pl-4">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Nature de l'ouvrage</span>
                  <p className="text-sm font-bold text-gray-700">{project.desc}</p>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Maître d'Ouvrage</span>
                  <p className="text-sm font-bold text-gray-700">{project.maitreOuvrage}</p>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Investissement</span>
                  <p className="text-sm font-bold text-[#FFB800]">{project.budget}</p>
                </div>
              </div>

              <button className="w-full bg-[#0F172A] text-white py-4 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#FFB800] hover:text-black transition-all shadow-xl">
                Consulter le Dossier Technique
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}