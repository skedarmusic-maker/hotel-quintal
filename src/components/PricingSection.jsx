import React from 'react';
import { pricingData, companyInfo } from '../data/siteData';
import { MessageCircle, CheckCircle2, Sparkles, Tag, ShieldCheck, Clock, Zap } from 'lucide-react';

export default function PricingSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* HEADER DA TABELA */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-2 bg-amber-500 text-gray-950 font-extrabold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
          <Zap className="w-4 h-4 fill-gray-950" /> Tabela Transparente de Valores
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          {pricingData.title}
        </h2>
        <p className="text-sm sm:text-base text-gray-600 font-medium">
          {pricingData.subtitle}
        </p>
      </div>

      {/* BANNER PROMOCIONAL DE LANÇAMENTO */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 rounded-3xl p-4 sm:p-6 text-gray-950 text-center shadow-lg border-2 border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-left">
          <div className="p-3 bg-gray-950 text-amber-400 rounded-2xl shrink-0 font-extrabold">
            <Tag className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-xs uppercase font-extrabold text-gray-900 tracking-wider">Oferta Especial de Boas-Vindas</span>
            <span className="text-base sm:text-lg font-black text-gray-950">{pricingData.promoBanner}</span>
          </div>
        </div>
        <div className="bg-gray-950 text-amber-400 font-extrabold px-4 py-2 rounded-2xl text-xs sm:text-sm tracking-wider uppercase shrink-0 shadow-md">
          Cupom: {pricingData.promoCode}
        </div>
      </div>

      {/* CARDS DE PREÇO POR PORTE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingData.categories.map((cat, idx) => {
          const whatsappUrl = `https://wa.me/${companyInfo.whatsappRaw}?text=Ol%C3%A1%2C%20Geraldo!%20Gostaria%20de%20garantir%20a%20tabela%20promocional%20de%20lan%C3%A7amento%20para%20meu%20dog%20de%20*${encodeURIComponent(cat.porte)}*%20(${encodeURIComponent(cat.weight)})!`;

          return (
            <div
              key={idx}
              className={`relative bg-white rounded-3xl p-8 shadow-xl border-2 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between ${cat.popular
                  ? 'border-amber-500 ring-4 ring-amber-400/20'
                  : 'border-amber-200'
                }`}
            >
              {/* Badge Popular / Destaque */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gray-900 text-amber-400 text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
                {cat.badge}
              </div>

              <div>
                <div className="text-center pb-6 border-b border-gray-100">
                  <h3 className="text-2xl font-extrabold text-gray-900 mt-2">{cat.porte}</h3>
                  <span className="inline-block text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full mt-1">
                    {cat.weight}
                  </span>
                </div>

                {/* Preços por modalidade */}
                <div className="py-6 space-y-4">
                  {cat.prices.map((item, pIdx) => (
                    <div
                      key={pIdx}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between transition-colors ${item.featured
                          ? 'bg-amber-500/10 border-amber-300'
                          : 'bg-gray-50 border-gray-100'
                        }`}
                    >
                      <div>
                        <span className="block text-xs font-bold text-gray-700">{item.period}</span>
                        <span className="text-[11px] text-gray-500 uppercase">por {item.unit}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-gray-500 font-bold">R$</span>
                        <span className="text-2xl font-black text-gray-900 ml-1">{item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Benefícios inclusos */}
                <ul className="space-y-2 text-xs font-medium text-gray-600 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Amplo gramado verde ao ar livre</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Fotos e vídeos diários no WhatsApp</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Supervisão carinhosa do Geraldo Gomes</span>
                  </li>
                </ul>
              </div>

              {/* Botão de conversão com valor garantido */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 px-4 rounded-2xl shadow-md transition-all text-xs sm:text-sm"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Garantir Valor de Lançamento</span>
              </a>

            </div>
          );
        })}
      </div>

      {/* BLOCO DE DESTAQUE EXCLUSIVO: CRECHE PET & PACOTE MENSAL (ORÇAMENTO PERSONALIZADO) */}
      <div className="bg-gradient-to-br from-emerald-950 via-gray-900 to-emerald-950 rounded-3xl p-6 sm:p-10 text-white border-2 border-emerald-400/60 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 mt-10">

        {/* Glow ambient effect */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-4 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 font-extrabold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider border border-emerald-400/30">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Modalidade Creche Pet • Pacote Mensal</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Precisa deixar o pet todos os dias? <span className="text-emerald-400 underline decoration-emerald-400/50">Economize no Pacote Mensal!</span>
          </h3>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-medium">
            Se você tem uma rotina corrida de trabalho e precisa de atendimento diário ou frequente, nossa modalidade de <strong>Creche Pet Mensal</strong> oferece <strong>descontos especiais no valor de cada diária</strong>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-white/5 p-3 rounded-xl border border-emerald-500/20 text-xs font-semibold text-emerald-200">
              🏷️ Desconto progressivo na diária
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-emerald-500/20 text-xs font-semibold text-emerald-200">
              🗓️ Flexibilidade de dias e horários
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-emerald-500/20 text-xs font-semibold text-emerald-200">
              💬 Cotação direta com Geraldo
            </div>
          </div>
        </div>

        <div className="shrink-0 w-full lg:w-auto relative z-10 text-center lg:text-right space-y-3">
          <span className="block text-xs font-extrabold uppercase tracking-wider text-emerald-400">
            Valores Sob Consulta • Atendimento Personalizado
          </span>

          <a
            href={`https://wa.me/${companyInfo.whatsappRaw}?text=Ol%C3%A1%2C%20Geraldo!%20Vim%20pelo%20site%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20personalizado%20para%20o%20*Pacote%20Mensal%20de%20Creche%20Pet*%20do%20meu%20c%C3%A3o.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full lg:w-auto inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-extrabold text-sm sm:text-base px-8 py-4 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-gray-950" />
            <span>Solicitar Orçamento da Creche</span>
          </a>

          <span className="block text-[11px] text-gray-400">
            ⚡ Resposta rápida diretamente pelo WhatsApp do hotel
          </span>
        </div>

      </div>

    </section>
  );
}
