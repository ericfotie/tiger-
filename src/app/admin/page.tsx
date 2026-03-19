"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Plus, Trash2, Edit3, MessageSquare,
  Send, Image as ImageIcon, X, Save, CheckCircle2, LogOut, Loader2, Undo2
} from 'lucide-react';
import { useProjectStore } from '../../store/useProjectStore';

export default function Admin() {
  const router = useRouter();
  const {
    projects, addProject, updateProject, deleteProject,
    messages, deleteMessage, logout, fetchData, isLoading
  } = useProjectStore() as any;

  const [isReady, setIsReady] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null); // ✅ Track l'ID en cours d'édition
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    fetchData();
    setIsReady(true);
  }, [fetchData]);

  // --- LOGIQUE D'ÉDITION ---
  const startEditing = (project: any) => {
    setEditingId(project.id);
    setPreviewImages(project.images || []);

    // On pré-remplit le formulaire
    if (formRef.current) {
      formRef.current.title.value = project.title;
      formRef.current.client.value = project.client;
      formRef.current.type.value = project.type;
      formRef.current.description.value = project.description;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Remonte pour l'édition
  };

  const cancelEditing = () => {
    setEditingId(null);
    setPreviewImages([]);
    formRef.current?.reset();
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const projectData = {
      title: formData.get('title') as string,
      client: formData.get('client') as string,
      type: formData.get('type') as string,
      description: formData.get('description') as string,
      images: previewImages,
    };

    let success = false;
    if (editingId) {
      success = await updateProject(editingId, projectData);
    } else {
      success = await addProject({ ...projectData, stars: 0 });
    }

    if (success) {
      cancelEditing();
    }
  };

  // --- IMAGE HANDLING (Compression & Base64) ---
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const img = new window.Image();
          img.src = reader.result as string;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 800; // Optimisation pour le stockage
            const scaleSize = MAX_WIDTH / img.width;
            canvas.width = MAX_WIDTH;
            canvas.height = img.height * scaleSize;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              setPreviewImages(prev => [...prev, canvas.toDataURL('image/jpeg', 0.6)]);
            }
          };
        };
        reader.readAsDataURL(file);
      });
    }
  };

  if (!isReady) return null;

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-4 md:p-10 font-sans text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-12 border-b-2 pb-8">
          <h1 className="text-4xl font-black uppercase tracking-tighter">
            Console <span className="text-[#FFB800]">Ingénieur</span>
          </h1>
          <button onClick={() => { logout(); router.push('/'); }} className="bg-red-50 text-red-600 px-6 py-3 font-black text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
            <LogOut size={16} />
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">

            {/* FORMULAIRE DYNAMIQUE (AJOUT / MODIF) */}
            <motion.div className={`bg-white p-8 shadow-2xl border-t-8 ${editingId ? 'border-[#FFB800]' : 'border-[#1A1A1A]'}`}>
              <h2 className="text-xl font-black mb-8 flex items-center gap-3 uppercase">
                {editingId ? <Edit3 className="text-[#FFB800]" /> : <Plus className="text-[#FFB800]" />}
                {editingId ? "Révision du Dossier" : "Nouvel Ouvrage"}
              </h2>

              <form ref={formRef} onSubmit={handleFormSubmit} className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <input name="title" required placeholder="Désignation" className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-[#FFB800] outline-none font-bold" />
                  <input name="client" required placeholder="Maître d'Ouvrage" className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-[#FFB800] outline-none" />
                  <select name="type" required className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-[#FFB800] outline-none font-bold">
                    <option value="Génie Civil">Génie Civil</option>
                    <option value="Bâtiment">Bâtiment / Immeuble</option>
                    <option value="Route">Infrastructure Routière</option>
                    <option value="Hydraulique">Ouvrage Hydraulique</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <textarea name="description" placeholder="Description technique..." className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-[#FFB800] outline-none h-32 resize-none" />
                  <div className="border-2 border-dashed border-gray-200 p-4 text-center cursor-pointer hover:border-[#FFB800]" onClick={() => fileInputRef.current?.click()}>
                    <input type="file" multiple hidden ref={fileInputRef} onChange={handleImageUpload} accept="image/*" />
                    <ImageIcon className="mx-auto text-gray-300" size={24} />
                    <span className="text-[10px] font-black text-gray-400 block uppercase mt-2">Images du Site</span>
                  </div>
                </div>

                <div className="md:col-span-2 flex gap-4">
                  <button type="submit" disabled={isLoading} className="flex-1 bg-[#1A1A1A] text-white py-5 font-black uppercase tracking-[0.2em] hover:bg-[#FFB800] hover:text-black transition-all">
                    {isLoading ? <Loader2 className="animate-spin mx-auto" /> : (editingId ? "Mettre à jour l'Ouvrage" : "Publier le Dossier")}
                  </button>
                  {editingId && (
                    <button type="button" onClick={cancelEditing} className="px-8 bg-gray-100 text-gray-400 font-black uppercase hover:bg-red-50 hover:text-red-600 transition-all">
                      Annuler
                    </button>
                  )}
                </div>
              </form>
            </motion.div>

            {/* LISTE DES PROJETS AVEC BOUTON MODIFIER */}
            <div className="grid md:grid-cols-1 gap-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-2">Archives Techniques</h3>
              {projects?.map((p: any) => (
                <div key={p.id} className="bg-white p-4 border-l-4 border-gray-200 flex justify-between items-center hover:border-[#FFB800] shadow-sm transition-all group">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 flex-shrink-0">
                        {p.images?.[0] && <img src={p.images[0]} className="w-full h-full object-cover grayscale group-hover:grayscale-0" />}
                      </div>
                      <div>
                        <h4 className="font-black uppercase text-[11px]">{p.title}</h4>
                        <p className="text-[9px] text-gray-400 font-bold uppercase">{p.client} • {p.type}</p>
                      </div>
                   </div>
                   <div className="flex gap-2">
                     <button onClick={() => startEditing(p)} className="p-2 text-gray-300 hover:text-[#FFB800] transition-colors"><Edit3 size={18}/></button>
                     <button onClick={() => deleteProject(p.id)} className="p-2 text-gray-300 hover:text-red-600 transition-colors"><Trash2 size={18}/></button>
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* MESSAGES HUB */}
          <div className="space-y-6">
            <h2 className="text-xl font-black uppercase flex items-center gap-3">
              <MessageSquare className="text-[#FFB800]" /> Inbox Client
            </h2>
            <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2">
              {messages?.map((msg: any) => (
                <div key={msg.id} className="bg-white p-6 shadow-xl border-t-4 border-[#FFB800]">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-black text-md uppercase tracking-tight">{msg.name}</h4>
                    <button onClick={() => deleteMessage(msg.id)} className="text-gray-200 hover:text-red-500"><Trash2 size={16}/></button>
                  </div>
                  <p className="text-xs italic text-gray-600 mb-6 border-l-2 border-gray-100 pl-4">{msg.content}</p>
                  <a href={`https://wa.me/237${msg.whatsapp?.replace(/\s/g, '')}`} target="_blank" className="w-full flex justify-center py-3 bg-[#25D366] text-white font-black text-[10px] uppercase tracking-widest hover:brightness-110 transition-all">WhatsApp Direct</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}