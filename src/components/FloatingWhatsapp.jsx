import React from 'react';
import { MessageCircle } from 'lucide-react';
import { companyInfo } from '../data/siteData';

export default function FloatingWhatsapp() {
  const whatsappUrl = `https://wa.me/${companyInfo.whatsappRaw}?text=Ol%C3%A1%2C%20Geraldo!%20Gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20hospedagem%20para%20meu%20cachorro!`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip */}
      <span className="hidden sm:inline-block bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg border border-amber-400/40 animate-bounce">
        Fale com Geraldo no WhatsApp 👋
      </span>

      {/* Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center border-2 border-white"
        aria-label="Atendimento via WhatsApp"
      >
        <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-75 blur-sm group-hover:opacity-100 transition duration-300 animate-pulse"></span>
        <MessageCircle className="w-7 h-7 relative z-10 fill-white" />
      </a>
    </div>
  );
}
