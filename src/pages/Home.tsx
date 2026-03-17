import { motion } from 'framer-motion';
// Nettoyage des icônes inutilisées pour corriger les erreurs de build
import { Star, ArrowRight, ShieldCheck, MapPin, CheckCircle2, Award, Building2 } from 'lucide-react';
import { useProjectStore } from '../store/useProjectStore';
import { Link } from 'react-router-dom';

export default function Home() {
  const { projects, addStar } = useProjectStore();

  return (
    <div className="overflow-hidden bg-[#F8FAFC]">
      {/* --- 1. HERO SECTION --- */}
      <section className="relative h-[85vh] flex items-center justify-center bg-[#0F172A] text-white">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80"
            className="w-full h-full object-cover grayscale"
            alt="Main Construction"
          />
        </div>
        <div className="container mx-auto px-6 z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block py-1 px-4 rounded-full bg-[#FFB800] text-black font-black text-[10px] uppercase tracking-[0.3em] mb-6 shadow-xl">
              N°1 en Génie Civil & Infrastructures
            </span>
            <h1 className="text-6xl md:text-9xl font-black uppercase leading-[0.85] tracking-tighter mb-6">
              TIGER <br /><span className="text-[#FFB800]">CONSTRUCTION</span>
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg mb-10 font-medium italic border-l-4 border-[#FFB800] pl-6">
              Expertise technique au service du développement. Nous bâtissons des infrastructures qui défient le temps.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a href="#plan" className="bg-[#FFB800] text-black px-10 py-4 font-black flex items-center justify-center gap-3 hover:bg-white transition-all shadow-lg">
                NOTRE PLAN D'ACTION <ArrowRight size={18} />
              </a>
              <Link to="/contact" className="border-2 border-white/20 hover:border-[#FFB800] px-10 py-4 font-black flex items-center justify-center gap-3 transition-all backdrop-blur-sm">
                DEMANDER UNE EXPERTISE
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- 2. BARRE PUBLICITAIRE --- */}
      <section className="bg-white border-y border-gray-100 grid grid-cols-2 md:grid-cols-4 shadow-sm">
        <StatItem icon={<ShieldCheck className="text-[#FFB800]"/>} title="SÉCURITÉ" desc="Zéro Accident" />
        <StatItem icon={<Award className="text-[#FFB800]"/>} title="QUALITÉ" desc="Normes ISO" />
        <StatItem icon={<Building2 className="text-[#FFB800]"/>} title="SOLIDE" desc="Béton Haute Densité" />
        <StatItem icon={<CheckCircle2 className="text-[#FFB800]"/>} title="DÉLAIS" desc="Livraison 100% On-time" />
      </section>

      {/* --- 3. PLAN D'ACTION --- */}
      <section id="plan" className="py-20 px-6 bg-[#0F172A] text-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-8 leading-none">
              Notre <span className="text-[#FFB800]">Plan d'Action</span> Stratégique
            </h2>
            <div className="space-y-6">
              <PlanStep number="01" title="Analyse & Étude" text="Études géotechniques et calculs de structures pour une base inébranlable." />
              <PlanStep number="02" title="Planification" text="Optimisation des ressources et déploiement de la logistique lourde." />
              <PlanStep number="03" title="Exécution" text="Mise en œuvre par nos ingénieurs certifiés avec suivi digital en temps réel." />
              <PlanStep number="04" title="Audit Final" text="Contrôle qualité rigoureux avant la livraison officielle de l'ouvrage." />
            </div>
          </div>
          <div className="relative border-4 border-[#FFB800] p-2">
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80"
              alt="Plan Technique"
              className="w-full h-full object-cover grayscale opacity-80"
            />
          </div>
        </div>
      </section>

      {/* --- 4. RÉALISATIONS DYNAMIQUES --- */}
      <section id="projets" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <h2 className="text-4xl font-black uppercase leading-none border-l-8 border-[#FFB800] pl-6">
            Ouvrages <br /> <span className="text-gray-400">Récents</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-xs italic font-medium">
            Ingénierie de pointe appliquée sur le terrain camerounais.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects && projects.length > 0 ? projects.map((project) => (
            <motion.div key={project.id} className="bg-white border border-gray-100 shadow-xl group flex flex-col hover:border-[#FFB800] transition-colors">
              <div className="h-64 bg-gray-100 relative overflow-hidden">
                <img src={project.images?.[0]} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" />
                <div className="absolute top-4 right-4 bg-[#FFB800] text-black font-black px-3 py-1 text-[9px] uppercase tracking-widest">
                  {project.type}
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-black text-xl uppercase tracking-tighter text-[#0F172A]">{project.title}</h3>
                  <button onClick={() => addStar(project.id)} className="flex items-center gap-1.5 bg-gray-50 px-2 py-1">
                    <Star size={14} className="text-[#FFB800]" fill="#FFB800" />
                    <span className="font-black text-xs text-[#0F172A]">{project.stars}</span>
                  </button>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed mb-6 italic">{project.description}</p>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Client: {project.client}</span>
                  <Link to="/contact" className="text-[#FFB800] hover:text-[#0F172A] transition-colors"><ArrowRight size={20}/></Link>
                </div>
              </div>
            </motion.div>
          )) : null}
        </div>
      </section>

      {/* --- 5. LOCALISATION --- */}
      <section className="bg-white border-t-8 border-[#FFB800]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2">
          <div className="p-12 md:p-20 bg-gray-50">
            <div className="flex items-center gap-3 text-[#FFB800] mb-6">
              <MapPin size={32} />
              <h3 className="text-3xl font-black uppercase text-[#0F172A]">Siège Social</h3>
            </div>
            <p className="text-gray-600 text-lg font-medium leading-relaxed mb-8">
              Retrouvez l'excellence Tiger Construction au coeur de la capitale :<br /><br />
              <strong className="text-[#0F172A]">Quartier Bastos, Avenue de l'Innovation</strong><br />
              Yaoundé - Cameroun
            </p>
            <div className="space-y-4">
              <div className="flex flex-col border-l-4 border-[#FFB800] pl-4">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Bureau Technique</span>
                <span className="font-black text-[#0F172A]">+237 653 268 165</span>
              </div>
            </div>
          </div>
          <div className="h-full bg-[#0F172A] relative overflow-hidden flex items-center justify-center text-center p-12">
             <div className="z-10">
                <h4 className="text-[#FFB800] font-black text-4xl uppercase mb-4 tracking-tighter">Besoin d'un Devis ?</h4>
                <p className="text-gray-400 text-sm mb-8 font-medium">Réponse sous 24h par nos experts en génie civil.</p>
                <Link to="/contact" className="inline-block bg-[#FFB800] text-black px-12 py-5 font-black uppercase text-xs tracking-[0.2em] hover:bg-white transition-all shadow-2xl">
                  Démarrer l'Étude
                </Link>
             </div>
             <Building2 className="absolute -bottom-10 -right-10 text-white opacity-5" size={300} />
          </div>
        </div>
      </section>
    </div>
  );
}

// --- SOUS-COMPOSANTS ---
function StatItem({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="p-6 flex flex-col items-center text-center border-r last:border-0 border-gray-100">
      <div className="mb-2">{icon}</div>
      <h4 className="font-black text-sm uppercase leading-none text-[#0F172A]">{title}</h4>
      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">{desc}</p>
    </div>
  );
}

function PlanStep({ number, title, text }: { number: string, title: string, text: string }) {
  return (
    <div className="flex gap-6 group">
      <span className="text-4xl font-black text-[#FFB800] opacity-30 group-hover:opacity-100 transition-opacity leading-none">{number}</span>
      <div>
        <h4 className="text-xl font-black uppercase tracking-tight mb-1">{title}</h4>
        <p className="text-gray-400 text-xs leading-relaxed">{text}</p>
      </div>
    </div>
  );
}