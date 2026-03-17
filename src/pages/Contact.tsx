import { motion } from 'framer-motion';
import { Send, MessageCircle, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react'; // Ajout de useEffect
import { useProjectStore } from '../store/useProjectStore';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  // --- SÉCURITÉ D'ENREGISTREMENT (HYDRATATION) ---
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const addMessage = useProjectStore((state) => state.addMessage);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    addMessage({
      name: formData.get('name') as string,
      email: formData.get('whatsapp') as string,
      subject: formData.get('type') as string,
      content: formData.get('message') as string,
    });

    setSubmitted(true);
  };

  // Tant que le store n'est pas lu dans le navigateur, on n'affiche rien
  if (!isReady) return null;

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER SECTION */}
      <section className="bg-[#1A1A1A] text-white py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-construction-grid"></div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black uppercase tracking-tighter relative z-10"
        >
          Démarrons votre <span className="text-outline">Projet</span>
        </motion.h1>
        <p className="mt-4 text-gray-400 max-w-xl mx-auto italic relative z-10">
          Expertise technique, devis précis et respect des normes du génie civil.
        </p>
      </section>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-0 p-6 md:p-12 -mt-16 relative z-20">

        {/* COLONNE GAUCHE */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8 bg-[#F5F5F5] p-8 md:p-12 shadow-inner border-b-4 lg:border-b-0 lg:border-l-4 border-[#FFB800]"
        >
          <div>
            <h2 className="text-2xl font-black uppercase mb-6 border-l-4 border-[#FFB800] pl-4">Coordonnées</h2>
            <p className="text-gray-600 mb-8">
              Nos ingénieurs sont disponibles pour une consultation technique sur site ou dans nos bureaux à Yaoundé.
            </p>
          </div>

          <div className="space-y-6">
            <ContactLink
              icon={<MessageCircle className="text-green-500" />}
              title="WhatsApp Business"
              value="+237 653 268 165"
              href="https://wa.me/237653268165"
            />
            <ContactLink
              icon={<Phone className="text-blue-500" />}
              title="Appel Direct"
              value="+237 653 268 165"
              href="tel:+237653268165"
            />
            <ContactLink
              icon={<Mail className="text-red-500" />}
              title="Email Professionnel"
              value="ericfotie13@gmail.com"
              href="mailto:ericfotie13@gmail.com"
            />
            <ContactLink
              icon={<MapPin className="text-[#1A1A1A]" />}
              title="Siège Social"
              value="Bastos, Yaoundé"
              href="#"
            />
          </div>
        </motion.div>

        {/* COLONNE DROITE */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 md:p-12 shadow-2xl border border-gray-100"
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="text-xl font-black uppercase mb-6 text-center">Demander un Devis Technique</h3>

              <div className="grid md:grid-cols-2 gap-5">
                <input name="name" required type="text" placeholder="Nom Complet" className="w-full p-4 bg-gray-50 border-b-2 border-gray-200 focus:border-[#FFB800] outline-none transition-all" />
                <input name="whatsapp" required type="text" placeholder="Votre WhatsApp" className="w-full p-4 bg-gray-50 border-b-2 border-gray-200 focus:border-[#FFB800] outline-none transition-all" />
              </div>

              <select name="type" className="w-full p-4 bg-gray-50 border-b-2 border-gray-200 focus:border-[#FFB800] outline-none font-bold text-sm uppercase">
                <option value="Information">Type de Projet</option>
                <option value="Pont">Construction de Pont</option>
                <option value="Bâtiment">Plan de Bâtiment R+X</option>
                <option value="Audit">Audit de Structure</option>
                <option value="Géotechnique">Études Géotechniques</option>
              </select>

              <textarea name="message" required placeholder="Décrivez votre besoin technique..." className="w-full p-4 bg-gray-50 border-b-2 border-gray-200 focus:border-[#FFB800] outline-none h-40" />

              <button type="submit" className="w-full bg-[#1A1A1A] text-white font-black py-5 uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#FFB800] hover:text-black transition-all group">
                Envoyer au bureau d'étude <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="h-full flex flex-col items-center justify-center text-center py-20 space-y-4"
            >
              <CheckCircle2 size={80} className="text-green-500" />
              <h3 className="text-2xl font-black uppercase text-[#1A1A1A]">Demande Enregistrée !</h3>
              <p className="text-gray-500">Votre dossier a été transmis. Un ingénieur vous recontactera sous 24h.</p>
              <button onClick={() => setSubmitted(false)} className="text-[#FFB800] font-black underline uppercase text-sm hover:text-black transition-colors">Faire une autre demande</button>
            </motion.div>
          )}
        </motion.div>

      </div>
    </div>
  );
}

function ContactLink({ icon, title, value, href }: { icon: any, title: string, value: string, href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-white hover:shadow-md transition-all group border border-transparent hover:border-[#FFB800]/20">
      <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-[#FFB800]/10 transition-colors">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{title}</p>
        <p className="font-bold text-[#1A1A1A]">{value}</p>
      </div>
    </a>
  );
}