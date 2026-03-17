import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ShieldCheck } from 'lucide-react';
import { useProjectStore } from '../store/useProjectStore';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // Utilisation de 'as any' pour bypasser la validation stricte au build
  const { isAuthenticated, login } = useProjectStore() as any;
  const [passwordInput, setPasswordInput] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(passwordInput)) {
      alert("Accès refusé : Code incorrect.");
      setPasswordInput('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center p-6 font-sans text-[#1A1A1A]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white p-10 shadow-2xl border-t-8 border-[#FFB800]"
        >
          <div className="text-center mb-8">
            <ShieldCheck size={50} className="mx-auto text-[#FFB800] mb-4" />
            <h2 className="text-2xl font-black uppercase tracking-tighter">Accès Ingénieur</h2>
            <p className="text-gray-400 text-[10px] font-bold uppercase mt-2 tracking-widest">Console Tiger Construction</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                placeholder="Code secret"
                className="w-full pl-12 p-4 bg-gray-50 border-2 border-transparent focus:border-[#FFB800] outline-none font-bold text-center"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#1A1A1A] text-white py-4 font-black uppercase tracking-widest hover:bg-[#FFB800] hover:text-black transition-all shadow-xl"
            >
              Déverrouiller
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
};