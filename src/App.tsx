import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import { ProtectedRoute } from './components/ProtectedRoute';
import './App.css';

// Utilitaire pour forcer le retour en haut de page (UX client)
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />

      <div className="flex flex-col min-h-screen bg-white font-sans selection:bg-[#FFB800] selection:text-black">
        {/* Barre de navigation publique */}
        <Navbar />

        <main className="flex-grow">
          <Routes>
            {/* --- ACCÈS PUBLIC --- */}
            <Route path="/" element={<Home />} />
            <Route path="/projets" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />

            {/* --- ACCÈS INGÉNIEUR (CACHÉ) ---
                Accessible uniquement via l'URL directe ou le point secret du Footer */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />

            {/* Optionnel: Redirection si route inconnue vers l'accueil */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        {/* Footer contenant le micro-point secret de connexion */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;