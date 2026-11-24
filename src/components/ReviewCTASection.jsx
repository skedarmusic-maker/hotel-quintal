import React from 'react';
import { companyInfo } from '../data/siteData';
import { Star, Heart, MessageSquare, ExternalLink } from 'lucide-react';

export default function ReviewCTASection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 rounded-3xl p-8 sm:p-12 text-white border-2 border-amber-400/50 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        
        {/* Glow de fundo */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-4 max-w-2xl text-center md:text-left relative z-10">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 border border-amber-400/40 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-amber-400" /> Avaliações Verificadas no Google
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
            Seu pet já se hospedou com a gente? Deixe sua avaliação!
          </h2>

          <p className="text-sm text-gray-300 leading-relaxed">
            Sua opinião é fundamental! Ajude outros tutores de Monte Mor, Campinas e região a encontrarem um abrigo seguro, acolhedor e com amplo espaço verde para seus cães.
          </p>

          <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400 pt-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-xs font-extrabold text-white ml-2">Nota 5.0 no Google</span>
          </div>
        </div>

        {/* Botão de Avaliação no Google */}
        <div className="relative z-10 shrink-0 w-full md:w-auto text-center">
          <a
            href={companyInfo.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-400 text-gray-950 font-black text-base px-8 py-4 rounded-full shadow-xl hover:scale-105 transition-all duration-300 w-full md:w-auto cursor-pointer"
          >
            <Star className="w-5 h-5 fill-gray-950" />
            <span>Avaliar no Perfil do Google</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <span className="block text-[11px] text-gray-400 mt-2 font-medium">
            Leva menos de 1 minuto ⏱️
          </span>
        </div>

      </div>
    </section>
  );
}
