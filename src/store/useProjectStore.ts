import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

// Types identiques (on garde la structure Prisma)
interface Message {
  id: string;
  name: string;
  email: string;
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
  isLoading: boolean; // Nouveau : pour afficher un spinner pendant le chargement
  login: (password: string) => boolean;
  logout: () => void;
  // --- ACTIONS ---
  fetchData: () => Promise<void>; // Charger tout depuis Postgres
  addMessage: (msg: Omit<Message, 'id' | 'date' | 'status'>) => Promise<void>;
  addProject: (project: Omit<Project, 'id' | 'date'>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  addStar: (projectId: string) => Promise<void>;
}

export const useProjectStore = create<TigerStore>((set, get) => ({
  projects: [],
  messages: [],
  isAuthenticated: false,
  isLoading: false,

  // --- AUTHENTIFICATION (Reste local pour la session) ---
  login: (password: string) => {
    if (password === 'Tiger2026') {
      set({ isAuthenticated: true });
      return true;
    }
    return false;
  },
  logout: () => set({ isAuthenticated: false }),

  // --- ACTIONS API (COMMUNICATION AVEC POSTGRES) ---

  // 1. Charger les données au démarrage du site
  fetchData: async () => {
    set({ isLoading: true });
    try {
      const [resProj, resMsg] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/messages')
      ]);
      const projects = await resProj.json();
      const messages = await resMsg.json();
      set({ projects, messages, isLoading: false });
    } catch (error) {
      console.error("Erreur de chargement:", error);
      set({ isLoading: false });
    }
  },

  // 2. Envoyer un message (Visiteur -> DB)
  addMessage: async (msg) => {
    await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(msg),
    });
    // Optionnel : rafraîchir la liste locale
    get().fetchData();
  },

  // 3. Ajouter un projet (Admin -> DB)
  addProject: async (project) => {
    await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    });
    get().fetchData();
  },

  // 4. Supprimer un projet
  deleteProject: async (id) => {
    await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
    get().fetchData();
  },

  // 5. Ajouter une étoile (Vote en ligne)
  addStar: async (projectId) => {
    await fetch(`/api/projects/star`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: projectId }),
    });
    get().fetchData();
  },
}));