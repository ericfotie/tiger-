import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

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
  login: (password: string) => boolean;
  logout: () => void;
  addMessage: (msg: Omit<Message, 'id' | 'date' | 'status'>) => void;
  deleteMessage: (id: string) => void;
  addProject: (project: Omit<Project, 'id' | 'date'>) => void;
  updateProject: (id: string, updatedProject: Omit<Project, 'id' | 'date'>) => void;
  deleteProject: (id: string) => void;
}

export const useProjectStore = create<TigerStore>()(
  persist(
    (set) => ({
      projects: [],
      messages: [],
      isAuthenticated: false,

      login: (password: string) => {
        if (password === 'Tiger2026') {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },

      logout: () => set({ isAuthenticated: false }),

      addMessage: (msg) => set((state) => ({
        messages: [
          {
            ...msg,
            id: uuidv4(),
            date: new Date().toLocaleString('fr-FR'),
            status: 'nouveau'
          },
          ...state.messages
        ]
      })),

      deleteMessage: (id) => set((state) => ({
        messages: state.messages.filter(m => m.id !== id)
      })),

      addProject: (project) => set((state) => ({
        projects: [
          {
            ...project,
            id: uuidv4(),
            date: new Date().toLocaleDateString('fr-FR')
          },
          ...state.projects
        ]
      })),

      updateProject: (id, updatedProject) => set((state) => ({
        projects: state.projects.map((p) =>
          p.id === id ? { ...p, ...updatedProject } : p
        )
      })),

      deleteProject: (id) => set((state) => ({
        projects: state.projects.filter(p => p.id !== id)
      })),
    }),
    {
      name: 'tiger-project-storage',
      storage: createJSONStorage(() => localStorage), // Sécurité pour le build Vercel/SSR
    }
  )
);