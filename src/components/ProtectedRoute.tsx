"use client"; // ✅ Indispensable pour l'état du formulaire et Framer Motion

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ShieldCheck, AlertCircle } from 'lucide-react';
// ✅ Chemin relatif corrigé pour remonter vers src/store
import { useProjectStore } from '../store/useProjectStore';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useProjectStore((state: any) => state.isAuthenticated);
  const login = useProjectStore((state: any) => state.login);

  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Sécurité pour Next.js (évite les bugs d'affichage au premier rendu)
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(passwordInput);

    if (!success) {
      setError(true);
      setPasswordInput('');
      // Secousse visuelle
      setTimeout(() => setError(false), 500);
    }
  };

  if (!mounted) return null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6 font-sans">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: error ? [0, -10, 10, -10, 10, 0] : 0
            }}
            transition={{ duration: 0.4 }}
            className="max-w-md w-full bg-white p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-t-8 border-[#FFB800] relative overflow-hidden"
          >
            {/* Filigrane discret Tiger */}
            <div className="absolute -right-8 -bottom-8 opacity-[0.03] pointer-events-none">
              <ShieldCheck size={200} />
            </div>

            <div className="text-center mb-10 relative z-10">
              <div className="w-20 h-20 bg-[#F8FAFC] rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100 shadow-inner">
                <ShieldCheck size={40} className={error ? "text-red-500" : "text-[#FFB800]"} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tighter text-[#0F172A]">Accès Ingénieur</h2>
              <p className="text-gray-400 text-[9px] font-black uppercase mt-2 tracking-[0.3em]">
                Console Tiger Construction
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6 relative z-10 text-[#0F172A]">
              <div className="relative">
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${error ? "text-red-500" : "text-gray-400"}`} size={18} />
                <input
                  type="password"
                  placeholder="CODE DE SÉCURITÉ"
                  className={`w-full pl-12 p-4 bg-gray-50 border-2 outline-none font-black text-center tracking-[0.5em] transition-all ${
                    error ? "border-red-500 text-red-500" : "border-transparent focus:border-[#FFB800]"
                  }`}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  autoFocus
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0F172A] text-white py-5 font-black uppercase tracking-[0.2em] hover:bg-[#FFB800] hover:text-black transition-all shadow-xl active:scale-95"
              >
                Déverrouiller
              </button>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-[10px] font-black text-center uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <AlertCircle size={12} /> Code incorrect
                </motion.p>
              )}
            </form>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return <>{children}</>;
};