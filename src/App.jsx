import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsapp from './components/FloatingWhatsapp';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Servicos from './pages/Servicos';
import Contato from './pages/Contato';
import TutorPortal from './pages/TutorPortal';
import AdminPortal from './pages/AdminPortal';
import AuthModal from './components/AuthModal';
import { useAuth } from './context/AuthContext';

const resolveTabFromUrl = (pathname, hash) => {
  const cleanHash = (hash || '').toLowerCase();
  if (cleanHash === '#admin' || cleanHash === '#/admin') return 'admin';
  if (cleanHash === '#tutor' || cleanHash === '#portal' || cleanHash === '#/portal') return 'portal';

  const cleanPath = (pathname || (typeof window !== 'undefined' ? window.location.pathname : '/'))
    .toLowerCase()
    .replace(/\/+$/, '') || '/';

  if (cleanPath === '/sobre') return 'sobre';
  if (cleanPath === '/servicos') return 'servicos';
  if (cleanPath === '/contato') return 'contato';
  if (cleanPath === '/portal') return 'portal';
  if (cleanPath === '/admin') return 'admin';
  return 'home';
};

const tabToPath = (tabId) => {
  switch (tabId) {
    case 'sobre': return '/sobre';
    case 'servicos': return '/servicos';
    case 'contato': return '/contato';
    case 'portal': return '/portal';
    case 'admin': return '/admin';
    case 'home':
    default: return '/';
  }
};

const pageMetadata = {
  home: {
    title: 'Hotel Quintal dos Animais | Hotel para Cachorro em Monte Mor e Campinas',
    description: 'Hospedagem canina 24 horas, day care e creche pet com amplo espaço interno, boxes com piso higienizado e monitoramento em Monte Mor/SP. Atendemos toda a RMC.',
    canonical: 'https://hotelquintaldosanimais.com.br/'
  },
  sobre: {
    title: 'Sobre Nós | Hotel Quintal dos Animais em Monte Mor',
    description: 'Conheça a história do Hotel Quintal dos Animais, idealizado por Geraldo Gomes. Amplo espaço interno com boxes individuais com piso para acolher seu cachorro em Monte Mor e RMC.',
    canonical: 'https://hotelquintaldosanimais.com.br/sobre'
  },
  servicos: {
    title: 'Serviços de Hospedagem Canina 24 Horas | Hotel Quintal dos Animais',
    description: 'Hospedagem canina 24h, Day Care e creche pet com muito carinho, acomodações higienizadas e atenção individual em Monte Mor/SP e Região Metropolitana de Campinas.',
    canonical: 'https://hotelquintaldosanimais.com.br/servicos'
  },
  contato: {
    title: 'Contato e Reservas | Hotel Quintal dos Animais Monte Mor',
    description: 'Entre em contato com Geraldo Gomes no Hotel Quintal dos Animais. Faça sua reserva de hospedagem 24 horas para cachorro via WhatsApp: (19) 99506-4431.',
    canonical: 'https://hotelquintaldosanimais.com.br/contato'
  },
  portal: {
    title: 'Área do Tutor | Hotel Quintal dos Animais',
    description: 'Área exclusiva para clientes do Hotel Quintal dos Animais acompanharem fotos, vídeos e ficha do pet.',
    canonical: 'https://hotelquintaldosanimais.com.br/'
  },
  admin: {
    title: 'Painel Administrativo | Hotel Quintal dos Animais',
    description: 'Painel administrativo operacional do Hotel Quintal dos Animais.',
    canonical: 'https://hotelquintaldosanimais.com.br/'
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined') {
      return resolveTabFromUrl(window.location.pathname, window.location.hash);
    }
    return 'home';
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isAdminAuthMode, setIsAdminAuthMode] = useState(false);
  const { user, profile } = useAuth();

  // Listen for browser navigation (back/forward) and hash changes
  useEffect(() => {
    const handleLocationChange = () => {
      const targetTab = resolveTabFromUrl(window.location.pathname, window.location.hash);
      if (targetTab === 'admin') {
        setIsAdminAuthMode(true);
        if (!user) setAuthModalOpen(true);
      } else if (targetTab === 'portal') {
        setIsAdminAuthMode(false);
        if (!user) setAuthModalOpen(true);
      }
      setActiveTab(targetTab);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, [user]);

  // Synchronize dynamic SEO metadata per page
  useEffect(() => {
    const meta = pageMetadata[activeTab] || pageMetadata.home;
    document.title = meta.title;

    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) descEl.setAttribute('content', meta.description);

    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', meta.canonical);

    const ogUrlEl = document.querySelector('meta[property="og:url"]');
    if (ogUrlEl) ogUrlEl.setAttribute('content', meta.canonical);

    const ogTitleEl = document.querySelector('meta[property="og:title"]');
    if (ogTitleEl) ogTitleEl.setAttribute('content', meta.title);

    const ogDescEl = document.querySelector('meta[property="og:description"]');
    if (ogDescEl) ogDescEl.setAttribute('content', meta.description);
  }, [activeTab]);

  const handleNavClick = (tabId, pushHistory = true) => {
    if (tabId === 'portal') {
      setIsAdminAuthMode(false);
      if (!user) {
        setAuthModalOpen(true);
        return;
      }
    } else if (tabId === 'admin') {
      setIsAdminAuthMode(true);
      if (!user) {
        setAuthModalOpen(true);
        return;
      }
    }

    if (pushHistory && typeof window !== 'undefined') {
      const targetPath = tabToPath(tabId);
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ tab: tabId }, '', targetPath);
      }
    }

    setActiveTab(tabId);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPage = () => {
    switch (activeTab) {
      case 'sobre':
        return <Sobre setActiveTab={handleNavClick} />;
      case 'servicos':
        return <Servicos setActiveTab={handleNavClick} />;
      case 'contato':
        return <Contato setActiveTab={handleNavClick} />;
      case 'admin':
        if (!user || profile?.role !== 'admin') {
          return (
            <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-3xl border border-gray-200 shadow-xl text-center space-y-4">
              <span className="text-3xl">🔒</span>
              <h2 className="text-2xl font-extrabold text-gray-900">Acesso Restrito</h2>
              <p className="text-xs text-gray-600">
                Painel Administrativo Operacional do Hotel Quintal dos Animais.
              </p>
              <button
                onClick={() => {
                  setIsAdminAuthMode(true);
                  setAuthModalOpen(true);
                }}
                className="w-full py-3 bg-gray-950 hover:bg-gray-800 text-white font-extrabold rounded-xl shadow-md transition-all cursor-pointer"
              >
                Entrar com Credenciais do Hotel
              </button>
            </div>
          );
        }
        return <AdminPortal />;
      case 'portal':
        if (!user) {
          return (
            <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-3xl border border-amber-200 shadow-xl text-center space-y-4">
              <span className="text-3xl">🐾</span>
              <h2 className="text-2xl font-extrabold text-gray-900">Área do Cliente</h2>
              <p className="text-xs text-gray-600">
                Faça login para acompanhar seu pet em tempo real e preencher a Ficha de Saúde.
              </p>
              <button
                onClick={() => {
                  setIsAdminAuthMode(false);
                  setAuthModalOpen(true);
                }}
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-gray-950 font-extrabold rounded-xl shadow-md transition-all cursor-pointer"
              >
                Acessar Minha Conta
              </button>
            </div>
          );
        }
        return profile?.role === 'admin' ? <AdminPortal /> : <TutorPortal />;
      case 'home':
      default:
        return <Home setActiveTab={handleNavClick} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF5] text-gray-900 selection:bg-amber-400 selection:text-gray-900">
      
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={handleNavClick} />

      {/* Main Page Body */}
      <main className="flex-grow">
        {renderPage()}
      </main>

      {/* Footer */}
      <Footer setActiveTab={handleNavClick} />

      {/* Floating WhatsApp CTA */}
      <FloatingWhatsapp />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        isAdminMode={isAdminAuthMode}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={() => {
          if (isAdminAuthMode) {
            handleNavClick('admin');
          } else {
            handleNavClick('portal');
          }
        }}
      />

    </div>
  );
}
