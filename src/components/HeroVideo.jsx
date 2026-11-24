import React from 'react';
import { MessageCircle, ShieldCheck, Trees, Sparkles, MapPin, ChevronDown } from 'lucide-react';
import { companyInfo } from '../data/siteData';

export default function HeroVideo({ setActiveTab }) {
  const whatsappUrl = `https://wa.me/${companyInfo.whatsappRaw}?text=Ol%C3%A1%2C%20Geraldo!%20Vim%20pelo%20site%20e%20gostaria%20de%20reservar%20uma%20hospedagem%20para%20meu%20cachorro!`;

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-gray-950">
      
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-105 filter brightness-75"
        poster="/Images/site/00202.jpg"
      >
        <source src={companyInfo.heroVideo} type="video/mp4" />
        Seu navegador não suporta vídeos em background.
      </video>

      {/* Gradient Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/65 to-gray-950/40" />

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white">
        
        {/* Badge superior */}
        <div className="inline-flex items-center gap-2 bg-amber-500/90 text-gray-950 px-4 py-1.5 rounded-full font-bold text-xs sm:text-sm tracking-wide shadow-lg backdrop-blur-md mb-6 animate-bounce">
          <Sparkles className="w-4 h-4 fill-gray-950" />
          <span>HOSPEDAGEM CANINA 24H & DAY CARE • AMPLO ESPAÇO INTERNO</span>
        </div>

        {/* Title H1 para SEO */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6 drop-shadow-md">
          Hotel para Cachorro em Monte Mor e Região de Campinas
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl lg:text-2xl text-amber-100/90 max-w-3xl mx-auto font-medium leading-relaxed mb-8 drop-shadow-sm">
          {companyInfo.tagline}. Um refúgio aconchegante com boxes individuais com piso, conforto e atenção carinhosa 24 horas.
        </p>

        {/* Lista de destaques */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-10 text-xs sm:text-sm font-semibold text-gray-200">
          <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
            <ShieldCheck className="w-4 h-4 text-amber-400" /> Cuidamos do Seu Pet
          </span>
          <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
            <Sparkles className="w-4 h-4 text-amber-400" /> Boxes com Piso Higienizado
          </span>
          <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
            <MapPin className="w-4 h-4 text-amber-400" /> Atendimento Monte Mor & RMC
          </span>
        </div>

        {/* Botões de Ação CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setActiveTab('portal')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-gray-950 font-extrabold text-base px-8 py-4 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <span>🐾 Área do Cliente (Diário do Pet)</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-base sm:text-lg px-8 py-4 rounded-full shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 transform hover:-translate-y-1"
          >
            <MessageCircle className="w-6 h-6 fill-white" />
            <span>Fazer Reserva no WhatsApp</span>
          </a>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-white/60 flex flex-col items-center gap-1 animate-bounce">
        <span className="text-[10px] tracking-widest uppercase font-semibold">Saiba mais</span>
        <ChevronDown className="w-4 h-4 text-amber-400" />
      </div>

    </section>
  );
}
