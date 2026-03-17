import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import pour la redirection
import {
  Plus, Trash2, Edit3, MessageSquare,
  Send, Image as ImageIcon, HardHat, X, Save, CheckCircle2, LogOut
} from 'lucide-react';
import { useProjectStore } from '../store/useProjectStore';

export default function Admin() {
  const navigate = useNavigate();
  const { projects, addProject, deleteProject, messages, deleteMessage, logout } = useProjectStore();

  // --- LE VERROU DE PERSISTANCE ---
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    setIsReady(true);
  }, []);

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- LOGIQUE DE DÉCONNEXION ---
  const handleLogout = () => {
    logout(); // 1. On réinitialise l'état isAuthenticated à false
    navigate('/', { replace: true }); // 2. On rentre sur l'accueil en remplaçant l'historique
  };

  // --- LOGIQUE DE COMPRESSION HAUTE QUALITÉ ---
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const img = new Image();
          img.src = reader.result as string;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 1920;
            const scaleSize = MAX_WIDTH / img.width;
            canvas.width = MAX_WIDTH;
            canvas.height = img.height * scaleSize;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.imageSmoothingEnabled = true;
              ctx.imageSmoothingQuality = 'high';
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              const highQualBase64 = canvas.toDataURL('image/jpeg', 0.85);
              setPreviewImages(prev => [...prev, highQualBase64]);
            }
          };
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const projectData = {
      title: formData.get('title') as string,
      client: formData.get('client') as string,
      type: formData.get('type') as string,
      description: formData.get('description') as string,
      images: previewImages,
      stars: 0,
    };

    if (isEditing) {
      alert("Mise à jour effectuée !");
      setIsEditing(null);
    } else {
      addProject(projectData);
      alert("Nouveau projet technique publié !");
    }
    setPreviewImages([]);
    e.currentTarget.reset();
  };

  if (!isReady) return null;

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-4 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* HEADER AVEC BOUTON DÉCONNEXION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 border-b-2 border-gray-100 pb-8">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter text-[#1A1A1A]">
              Console <span className="text-[#FFB800]">Ingénieur</span>
            </h1>
            <p className="text-gray-500 font-medium flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-500" />
              Tiger Construction • Session Sécurisée
            </p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
             <div className="bg-white px-6 py-3 shadow-sm border rounded-sm flex-1 md:flex-none">
                <p className="text-[10px] font-black uppercase text-gray-400">Projets</p>
                <p className="text-xl font-black">{projects.length}</p>
             </div>
             {/* LE BOUTON DE DÉCONNEXION EST BIEN ICI */}
             <button
              onClick={handleLogout}
              className="bg-red-50 text-red-600 border-2 border-red-100 px-6 py-3 rounded-sm font-black text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all flex items-center gap-2 shadow-sm"
             >
               <LogOut size={16} /> Déconnexion
             </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* COLONNE GAUCHE : FORMULAIRE */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 shadow-2xl border-t-8 border-[#1A1A1A] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <HardHat size={120} />
              </div>

              <h2 className="text-xl font-black mb-8 flex items-center gap-3 uppercase tracking-tight">
                {isEditing ? <Edit3 className="text-[#FFB800]" /> : <Plus className="text-[#FFB800]" />}
                {isEditing ? "Modifier l'Ouvrage" : "Nouvel Appel d'Offre / Projet"}
              </h2>

              <form onSubmit={handleFormSubmit} className="grid md:grid-cols-2 gap-8 relative z-10">
                <div className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Désignation</label>
                    <input name="title" required type="text" placeholder="ex: Viaduc de Kribi" className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-[#FFB800] outline-none transition-all font-bold" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Maître d'Ouvrage</label>
                    <input name="client" required type="text" placeholder="ex: PAD" className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-[#FFB800] outline-none transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Catégorie</label>
                    <select name="type" className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-[#FFB800] outline-none font-bold text-sm">
                      <option value="Pont">Génie Civil / Ponts</option>
                      <option value="Bâtiment">Bâtiment R+X</option>
                      <option value="Industriel">Industriel</option>
                      <option value="Route">VRD</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Spécifications</label>
                    <textarea name="description" className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-[#FFB800] outline-none h-32 resize-none" />
                  </div>

                  <div className="space-y-2">
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-200 p-6 text-center cursor-pointer hover:bg-gray-50 transition-all group"
                    >
                      <input type="file" multiple hidden ref={fileInputRef} onChange={handleImageUpload} accept="image/*" />
                      <ImageIcon className="mx-auto text-gray-300 group-hover:text-[#FFB800] mb-2" size={32} />
                      <span className="text-[10px] font-black text-gray-400 block uppercase tracking-widest">Charger Photos</span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 grid grid-cols-6 gap-2">
                  {previewImages.map((img, idx) => (
                    <div key={idx} className="relative group aspect-square border-2 border-gray-100 shadow-sm">
                      <img src={img} className="w-full h-full object-cover" alt="preview" />
                      <button type="button" onClick={() => setPreviewImages(prev => prev.filter((_, i) => i !== idx))} className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 shadow-lg hover:scale-110 transition-transform"><X size={12} /></button>
                    </div>
                  ))}
                </div>

                <button type="submit" className="md:col-span-2 bg-[#1A1A1A] text-white py-5 font-black uppercase tracking-[0.3em] hover:bg-[#FFB800] hover:text-black transition-all shadow-xl flex items-center justify-center gap-4">
                  {isEditing ? <><Save size={20}/> Mettre à jour</> : <><CheckCircle2 size={20}/> Publier l'ouvrage</>}
                </button>
              </form>
            </motion.div>

            {/* LISTE DES PROJETS */}
            <div className="grid md:grid-cols-2 gap-4">
              <AnimatePresence>
                {projects.map(p => (
                  <motion.div layout key={p.id} className="bg-white p-5 border-l-4 border-gray-200 flex justify-between items-center group hover:border-[#FFB800] transition-all shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 flex items-center justify-center overflow-hidden rounded">
                        {p.images[0] ? <img src={p.images[0]} className="object-cover w-full h-full" alt="proj" /> : <HardHat className="text-gray-300" />}
                      </div>
                      <div>
                        <h4 className="font-black uppercase text-[11px] leading-tight truncate w-32">{p.title}</h4>
                        <p className="text-[9px] text-gray-400 font-bold uppercase">{p.client}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setIsEditing(p.id)} className="p-2 text-gray-400 hover:text-blue-600"><Edit3 size={18}/></button>
                      <button onClick={() => deleteProject(p.id)} className="p-2 text-gray-400 hover:text-red-600"><Trash2 size={18}/></button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* COLONNE DROITE : MESSAGES */}
          <div className="space-y-6">
            <h2 className="text-xl font-black flex items-center gap-3 uppercase tracking-tight text-[#1A1A1A]">
              <MessageSquare className="text-[#FFB800]" /> Hub Messages
              <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow-lg">{messages.length}</span>
            </h2>

            <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div key={msg.id} className="bg-white p-6 shadow-xl border-t-4 border-green-500 group relative">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[9px] font-black bg-green-50 text-green-700 px-2 py-1 tracking-widest uppercase">Demande Client</span>
                      <button onClick={() => deleteMessage(msg.id)} className="text-gray-200 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                    </div>
                    <h4 className="font-black text-lg text-[#1A1A1A] leading-tight mb-1">{msg.name}</h4>
                    <p className="text-[10px] font-black text-[#FFB800] mb-4 uppercase tracking-widest border-b pb-2">{msg.subject}</p>
                    <div className="bg-gray-50 p-4 mb-6 rounded-sm text-sm italic text-gray-600">"{msg.content}"</div>
                    <a
                      href={`https://wa.me/237${msg.email.replace(/\s/g, '')}`}
                      target="_blank" rel="noreferrer"
                      className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white py-4 rounded-sm font-black text-[10px] uppercase tracking-widest hover:bg-[#128C7E] shadow-lg transition-all"
                    >
                      <Send size={16} /> WhatsApp Direct
                    </a>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}