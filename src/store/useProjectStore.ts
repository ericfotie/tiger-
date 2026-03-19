import { create } from 'zustand';

interface Message {
  id: string;
  name: string;
  whatsapp: string;
  subject: string;
  content: string;
  date: string;
  status: 'nouveau' | 'lu';
}

interface Project {
  id: string;
  title: string;
  client: string;
  type: string;
  description: string;
  images: string[];
  stars: number;
  date: string;
}

interface TigerStore {
  projects: Project[];
  messages: Message[];
  isAuthenticated: boolean;
  isLoading: boolean;
  // ✅ Typage mis à jour pour refléter l'aspect asynchrone (Promise)
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  fetchData: () => Promise<void>;
  addMessage: (msg: Omit<Message, 'id' | 'date' | 'status'>) => Promise<boolean>;
  deleteMessage: (id: string) => Promise<void>;
  addProject: (project: Omit<Project, 'id' | 'date' | 'stars'>) => Promise<boolean>;
  updateProject: (id: string, project: Partial<Project>) => Promise<boolean>;
  deleteProject: (id: string) => Promise<void>;
  addStar: (projectId: string) => Promise<void>;
}

export const useProjectStore = create<TigerStore>((set, get) => ({
  projects: [],
  messages: [],
  isAuthenticated: false,
  isLoading: false,

  // --- 🔒 AUTHENTIFICATION SÉCURISÉE ---
  login: async (password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        set({ isAuthenticated: true });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Erreur de connexion:", error);
      return false;
    }
  },

  logout: async () => {
    // Appel à l'API pour supprimer le cookie côté serveur
    await fetch('/api/auth/logout', { method: 'POST' });
    set({ isAuthenticated: false });
    // On force un rafraîchissement pour que le middleware bloque l'accès
    window.location.href = '/login';
  },

  // --- 📡 SYNCHRONISATION ---
  fetchData: async () => {
    set({ isLoading: true });
    try {
      const timestamp = Date.now();
      const [resProj, resMsg] = await Promise.all([
        fetch(`/api/projects?t=${timestamp}`),
        fetch(`/api/messages?t=${timestamp}`)
      ]);
      if (!resProj.ok || !resMsg.ok) throw new Error("Erreur serveur");
      const projects = await resProj.json();
      const messages = await resMsg.json();
      set({
        projects: Array.isArray(projects) ? projects : [],
        messages: Array.isArray(messages) ? messages : []
      });
    } catch (error) {
      console.error("❌ Erreur de synchronisation :", error);
    } finally {
      set({ isLoading: false });
    }
  },

  // --- 💬 ACTIONS MESSAGES ---
  addMessage: async (msg) => {
    set({ isLoading: true });
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msg),
      });
      if (res.ok) { await get().fetchData(); return true; }
      return false;
    } catch (error) { return false; } finally { set({ isLoading: false }); }
  },

  deleteMessage: async (id: string) => {
    if (!confirm("⚠️ Supprimer ce message de la base Tiger ?")) return;
    set({ isLoading: true });
    try {
      const res = await fetch(`/api/messages?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        set((state) => ({
          messages: state.messages.filter((m) => m.id !== id)
        }));
      }
    } catch (error) {
      console.error("Erreur suppression message:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  // --- 🏗️ ACTIONS PROJETS ---
  addProject: async (project) => {
    set({ isLoading: true });
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });
      if (res.ok) { await get().fetchData(); return true; }
      return false;
    } catch (error) { return false; } finally { set({ isLoading: false }); }
  },

  updateProject: async (id, updatedData) => {
    set({ isLoading: true });
    try {
      const res = await fetch(`/api/projects?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (res.ok) { await get().fetchData(); return true; }
      return false;
    } catch (error) { return false; } finally { set({ isLoading: false }); }
  },

  deleteProject: async (id) => {
    if (!confirm("⚠️ Confirmer la suppression définitive de cet ouvrage ?")) return;
    set({ isLoading: true });
    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
      if (res.ok) await get().fetchData();
    } catch (error) { console.error("Erreur suppression:", error); }
    finally { set({ isLoading: false }); }
  },

  addStar: async (projectId) => {
    const currentProjects = get().projects;
    set({
      projects: currentProjects.map(p =>
        p.id === projectId ? { ...p, stars: p.stars + 1 } : p
      )
    });
    try {
      const res = await fetch(`/api/projects`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: projectId }),
      });
      if (!res.ok) await get().fetchData();
    } catch (error) { await get().fetchData(); }
  },
}));