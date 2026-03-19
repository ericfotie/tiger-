"use client";

import { motion } from 'framer-motion';
import { Send, MessageCircle, Phone, Mail, MapPin, CheckCircle2, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
// ✅ Correction du chemin : on remonte de 2 niveaux pour atteindre src/store
import { useProjectStore } from '../../store/useProjectStore';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Extraction avec typage manuel pour éviter les erreurs TypeScript sur Ubuntu
  const addMessage = useProjectStore((state: any) => state.addMessage);
  const isLoading = useProjectStore((state: any) => state.isLoading);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const messageData = {
      name: formData.get('name') as string,
      // ✅ Aligné avec ton schéma Prisma (champ whatsapp)
      whatsapp: formData.get('whatsapp') as string,
      subject: formData.get('type') as string,
      content: formData.get('message') as string,
    };

    try {
      await addMessage(messageData);
      setSubmitted(true);
    } catch (error) {
      alert("Erreur lors de l'envoi. Vérifie ta connexion au serveur Tiger.");
      console.error("Erreur Tiger Construction:", error);
    }
  };

  if (!isReady) return null;

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#FFB800] selection:text-black">
      {/* HEADER SECTION */}
      <section className="bg-[#1A1A1A] text-white py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/grid.svg')] bg-center"></div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black uppercase tracking-tighter relative z-10"
        >
          Démarrons votre <span className="text-[#FFB800]">Projet</span>
        </motion.h1>
        <p className="mt-4 text-gray-400 max-w-xl mx-auto italic relative z-10">
          Expertise technique, devis précis et respect des normes du génie civil au Cameroun.
        </p>
      </section>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-0 p-6 md:p-12 -mt-16 relative z-20">

        {/* COLONNE GAUCHE : INFOS */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8 bg-[#F5F5F5] p-8 md:p-12 shadow-inner border-b-4 lg:border-b-0 lg:border-l-4 border-[#FFB800]"
        >
          <div>
            <h2 className="text-2xl font-black uppercase mb-6 border-l-4 border-[#FFB800] pl-4 text-[#1A1A1A]">Coordonnées</h2>
            <p className="text-gray-600 mb-8">
              Nos ingénieurs sont disponibles pour une consultation technique sur site ou dans nos bureaux de Yaoundé.
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
              title="Bureau d'étude"
              value="Nkomkana, Yaoundé"
              href="#"
            />
          </div>
        </motion.div>

        {/* COLONNE DROITE : FORMULAIRE */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 md:p-12 shadow-2xl border border-gray-100"
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="text-xl font-black uppercase mb-6 text-center text-[#1A1A1A]">Demander un Devis Technique</h3>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-400">Identité</label>
                  <input name="name" required type="text" placeholder="Nom Complet" className="w-full p-4 bg-gray-50 border-b-2 border-gray-200 focus:border-[#FFB800] outline-none transition-all text-[#1A1A1A] font-bold" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-400">Contact WhatsApp</label>
                  <input name="whatsapp" required type="text" placeholder="Ex: 6xx xxx xxx" className="w-full p-4 bg-gray-50 border-b-2 border-gray-200 focus:border-[#FFB800] outline-none transition-all text-[#1A1A1A] font-bold" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400">Nature des Travaux</label>
                <select name="type" className="w-full p-4 bg-gray-50 border-b-2 border-gray-200 focus:border-[#FFB800] outline-none font-bold text-sm uppercase text-[#1A1A1A]">
                  <option value="Information">Choisir une catégorie...</option>
                  <option value="Pont">Génie Civil / Ponts</option>
                  <option value="Bâtiment">Bâtiment R+X</option>
                  <option value="Audit">Audit & Expertise</option>
                  <option value="Géotechnique">Sondages Géotechniques</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400">Description du besoin</label>
                <textarea name="message" required placeholder="Localisation, dimensions, contraintes particulières..." className="w-full p-4 bg-gray-50 border-b-2 border-gray-200 focus:border-[#FFB800] outline-none h-40 text-[#1A1A1A] resize-none" />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1A1A1A] text-white font-black py-5 uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#FFB800] hover:text-black transition-all group disabled:opacity-50 shadow-lg"
              >
                {isLoading ? (
                  <><Loader2 size={20} className="animate-spin" /> Transmission...</>
                ) : (
                  <><Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Envoyer au bureau d'étude</>
                )}
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="h-full flex flex-col items-center justify-center text-center py-20 space-y-4"
            >
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={48} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-black uppercase text-[#1A1A1A]">Demande Enregistrée !</h3>
              <p className="text-gray-500 font-medium px-6">Votre dossier technique a été transmis à l'ingénieur. Nous vous contacterons via WhatsApp sous 24h.</p>
              <button onClick={() => setSubmitted(false)} className="mt-6 text-[#FFB800] font-black underline uppercase text-xs hover:text-black transition-colors">Envoyer un autre dossier</button>
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
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">{title}</p>
        <p className="font-bold text-[#1A1A1A] text-sm">{value}</p>
      </div>
    </a>
  );
}