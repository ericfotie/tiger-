import { motion } from 'framer-motion';
import { Star, HardHat } from 'lucide-react';

const mockProjects = [
  {
    id: 1,
    title: "Pont de la Sanaga",
    desc: "Ouvrage d'art en béton précontraint.",
    maitreOuvrage: "MINTP",
    budget: "1.2 Milliards FCFA",
    stars: 124
  }
];

export default function Projects() {
  return (
    <section className="p-8 max-w-7xl mx-auto">
      <h2 className="text-4xl font-black mb-12 uppercase border-b-4 border-[#FFB800] inline-block">Réalisations</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockProjects.map(project => (
          <motion.div whileHover={{ y: -10 }} className="bg-white border border-gray-200 shadow-xl overflow-hidden">
            <div className="h-48 bg-zinc-300 flex items-center justify-center italic text-gray-500 font-bold">IMAGE DU PROJET</div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-xl uppercase tracking-tighter">{project.title}</h3>
                <div className="flex items-center gap-1 text-[#FFB800]"><Star fill="#FFB800" size={16}/> {project.stars}</div>
              </div>
              <ul className="text-xs text-gray-600 space-y-2 mb-6 uppercase">
                <li><strong>Nature:</strong> {project.desc}</li>
                <li><strong>Client:</strong> {project.maitreOuvrage}</li>
                <li><strong>Montant:</strong> {project.budget}</li>
              </ul>
              <button className="w-full bg-[#1A1A1A] text-white py-3 font-bold text-xs uppercase hover:bg-[#FFB800] hover:text-black transition-all">Détails Techniques</button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}