import React from 'react';
import { Heart, MapPin, Phone, Mail, Instagram, MessageCircle, ShieldCheck, Clock } from 'lucide-react';
import { companyInfo } from '../data/siteData';

export default function Footer({ setActiveTab }) {
  const whatsappUrl = `https://wa.me/${companyInfo.whatsappRaw}?text=Ol%C3%A1%2C%20Geraldo!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20o%20Hotel%20Quintal%20dos%20Animais!`;

  const handleNav = (id) => {
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-950 text-gray-300 pt-16 pb-8 border-t-4 border-amber-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Coluna 1: Sobre & Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={companyInfo.logo} 
                alt="Logo Hotel Quintal dos Animais" 
                className="w-12 h-12 rounded-full border-2 border-amber-400 bg-white"
              />
              <div>
                <h3 className="text-xl font-extrabold text-white tracking-tight">
                  HOTEL QUINTAL
                </h3>
                <p className="text-xs font-semibold text-amber-400 tracking-widest uppercase">
                  Dos Animais
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              O segundo lar do seu cão com amplo espaço verde, liberdade e amor. Localizado em Monte Mor/SP, atendendo toda a Região Metropolitana de Campinas.
            </p>
            <div className="flex items-center gap-2 text-xs font-medium text-amber-400 bg-amber-950/60 border border-amber-800/60 px-3 py-2 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Cuidamos do seu Pet com Responsabilidade</span>
            </div>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div>
            <h4 className="text-base font-bold text-white uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-amber-400 transition-colors flex items-center gap-2 cursor-pointer">
                  <span className="text-amber-500">›</span> Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('sobre')} className="hover:text-amber-400 transition-colors flex items-center gap-2 cursor-pointer">
                  <span className="text-amber-500">›</span> Quem Somos (Sobre)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('servicos')} className="hover:text-amber-400 transition-colors flex items-center gap-2 cursor-pointer">
                  <span className="text-amber-500">›</span> Nossos Serviços & Hospedagem
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contato')} className="hover:text-amber-400 transition-colors flex items-center gap-2 cursor-pointer">
                  <span className="text-amber-500">›</span> Fale Conosco / Orçamento
                </button>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Contatos Diretos */}
          <div>
            <h4 className="text-base font-bold text-white uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">
              Contatos
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-gray-400">Responsável: {companyInfo.owner}</span>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:text-amber-400">
                    WhatsApp: {companyInfo.whatsapp}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-400 shrink-0" />
                <a href={`mailto:${companyInfo.email}`} className="text-gray-300 hover:text-amber-400 text-xs sm:text-sm">
                  {companyInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Instagram className="w-5 h-5 text-amber-400 shrink-0" />
                <a href={companyInfo.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-amber-400">
                  {companyInfo.instagram}
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Localização & Atendimento */}
          <div>
            <h4 className="text-base font-bold text-white uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">
              Localização
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-300 leading-relaxed">
                  {companyInfo.address}
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-300">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Horário: <strong>{companyInfo.hours}</strong></span>
              </div>
              <div className="text-[11px] text-gray-400 bg-gray-900 p-2 rounded-lg border border-gray-800">
                <span>📍 Plus Code: {companyInfo.plusCode}</span>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                Agendar Visita no Quintal
              </a>
            </div>
          </div>

        </div>

        {/* Rodapé inferior & Créditos */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} Hotel Quintal dos Animais. Todos os direitos reservados.
          </p>
          <div className="flex items-center justify-center gap-4">
            <p className="flex items-center justify-center gap-1">
              Desenvolvido com <Heart className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> para pets de Monte Mor, Campinas e Região.
            </p>
            <button
              onClick={() => {
                window.location.hash = 'admin';
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-gray-700 hover:text-gray-400 text-[10px] transition-colors cursor-pointer"
            >
              🔒 Restrito
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
