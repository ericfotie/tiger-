"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProjectStore } from '../../store/useProjectStore';
import { Lock, ShieldCheck, Loader2, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const login = useProjectStore((state: any) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    // On appelle ton API via le Store
    const success = await login(password);

    if (success) {
      // ✅ Redirection vers l'admin après succès
      router.push('/admin');
      router.refresh();
    } else {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-10 shadow-2xl border-t-8 border-[#FFB800]">

        <div className="text-center mb-10">
          <div className="bg-[#FFB800] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Lock className="text-[#1A1A1A]" size={30} />
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tighter text-[#1A1A1A]">
            Console <span className="text-[#FFB800]">Tiger</span>
          </h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-2 italic">
            Tiger Construction • Accès Ingénieur
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Entrer le Code</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full p-4 bg-gray-50 border-2 outline-none font-bold transition-all ${
                error ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-[#FFB800]'
              }`}
            />
            {error && (
              <p className="text-red-500 text-[10px] font-black uppercase flex items-center gap-1 mt-2">
                <AlertCircle size={12} /> Code incorrect - Accès refusé
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1A1A1A] text-white py-5 font-black uppercase tracking-[0.3em] hover:bg-[#FFB800] hover:text-black transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <><ShieldCheck size={20}/> Vérifier l'identité</>}
          </button>
        </form>
      </div>
    </div>
  );
}