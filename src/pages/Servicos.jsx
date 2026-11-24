import React from 'react';
import { servicesData, companyInfo } from '../data/siteData';
import PricingSection from '../components/PricingSection';
import ReviewCTASection from '../components/ReviewCTASection';
import { CheckCircle2, MessageCircle, ShieldCheck, HeartHandshake, Home as HomeIcon, Sun, Trees, Sparkles, Clock, AlertCircle, CalendarCheck } from 'lucide-react';

export default function Servicos({ setActiveTab }) {
  const getServiceIcon = (name) => {
    switch(name) {
      case 'CalendarCheck': return <CalendarCheck className="w-8 h-8 text-amber-600" />;
      case 'Home': return <HomeIcon className="w-8 h-8 text-amber-600" />;
      case 'Sun': return <Sun className="w-8 h-8 text-amber-600" />;
      case 'Trees': return <Trees className="w-8 h-8 text-amber-600" />;
      default: return <HeartHandshake className="w-8 h-8 text-amber-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* H1 HEADER SEO */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 font-extrabold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 fill-amber-600 text-amber-600" /> Nossos Serviços • Monte Mor & RMC
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Hospedagem Canina, Day Care e Creche Pet em Monte Mor e Campinas
        </h1>
        <p className="text-lg text-gray-600 font-medium">
          Conheça as modalidades de cuidado desenvolvidas para garantir diversão, descanso e segurança absoluta para o seu cachorro.
        </p>
      </div>

      {/* LISTA DETALHADA DOS SERVIÇOS */}
      <div className="space-y-10">
        {servicesData.map((service, index) => {
          const isEven = index % 2 === 0;
          const whatsappServiceUrl = `https://wa.me/${companyInfo.whatsappRaw}?text=Ol%C3%A1%2C%20Geraldo!%20Gostaria%20de%20consultar%20valores%20para%20o%20servi%C3%A7o%20de%3A%20${encodeURIComponent(service.title)}`;

          return (
            <div
              key={service.id}
              className={`bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-amber-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                !isEven ? 'lg:flex-row-reverse' : ''
              }`}
            >
              
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-100 rounded-2xl">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <div>
                    <span className="bg-amber-500/20 text-amber-900 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                      {service.badge}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
                      {service.title}
                    </h2>
                  </div>
                </div>

                <p className="text-base font-semibold text-amber-700">
                  {service.subtitle}
                </p>

                <p className="text-sm text-gray-700 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-2 pt-2">
                  <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">
                    O que está incluso neste serviço:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-medium text-gray-700 bg-amber-50/60 p-2.5 rounded-xl border border-amber-100">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-4">
                  <a
                    href={whatsappServiceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm px-6 py-3 rounded-full shadow-md transition-all hover:scale-105"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    Consultar Valores & Vagas no WhatsApp
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative rounded-3xl overflow-hidden shadow-lg border-4 border-amber-100">
                  <img
                    src={
                      index === 0 ? "/Images/site/00202.jpg" :
                      index === 1 ? "/Images/site/1414.jpg" :
                      index === 2 ? "/Images/site/27452.jpg" : "/Images/site/2525.jpg"
                    }
                    alt={service.title}
                    className="w-full h-72 sm:h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent flex items-end p-6">
                    <span className="text-white font-bold text-sm bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20">
                      Amplo Espaço Verde • Monte Mor/SP
                    </span>
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* TABELA TRANSPARENTE DE PREÇOS COM OPORTUNIDADE PROMOCIONAL */}
      <PricingSection />

      {/* REQUISITOS E RECOMENDAÇÕES PARA A HOSPEDAGEM */}
      <section className="bg-amber-500/10 rounded-3xl p-8 sm:p-10 border border-amber-300 space-y-6">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-7 h-7 text-amber-700" />
          <h2 className="text-2xl font-extrabold text-gray-900">
            Checklist para uma Hospedagem Tranquila
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-amber-200 space-y-2">
            <span className="block font-bold text-amber-700 text-sm uppercase">1. Vacinação Atualizada</span>
            <p className="text-xs text-gray-600 leading-relaxed">
              V10/V8, Antirrábica e Vacina contra a Gripe Canina em dia para garantir a segurança de toda a matilha.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-amber-200 space-y-2">
            <span className="block font-bold text-amber-700 text-sm uppercase">2. Alimentação Habitual</span>
            <p className="text-xs text-gray-600 leading-relaxed">
              Traga a ração ou alimentação do pet fracionada para os dias de estadia, evitando trocas bruscas de dieta.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-amber-200 space-y-2">
            <span className="block font-bold text-amber-700 text-sm uppercase">3. Objetos Pessoais</span>
            <p className="text-xs text-gray-600 leading-relaxed">
              Caminha, paninho ou brinquedo favorito que ajudem o pet a se sentir acolhido e em casa nos momentos de descanso.
            </p>
          </div>
        </div>
      </section>

      {/* CHAMADA PARA AVALIAÇÕES GOOGLE */}
      <ReviewCTASection />

      {/* CTA SOLICITAR ORÇAMENTO */}
      <div className="text-center bg-gray-950 text-white rounded-3xl p-10 border-2 border-amber-400 space-y-4">
        <h3 className="text-2xl font-extrabold">Precisa de um orçamento personalizado?</h3>
        <p className="text-sm text-gray-300 max-w-xl mx-auto">
          Fale diretamente com o proprietário Geraldo Gomes e informe os dias de hospedagem e o porte do seu cão.
        </p>
        <button
          onClick={() => setActiveTab('contato')}
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold px-8 py-3.5 rounded-full text-sm transition-colors cursor-pointer"
        >
          <span>Ir para o Formulário de Orçamento</span>
        </button>
      </div>

    </div>
  );
}
