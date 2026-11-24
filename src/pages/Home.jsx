import React, { useState } from 'react';
import HeroVideo from '../components/HeroVideo';
import GalleryModal from '../components/GalleryModal';
import PricingSection from '../components/PricingSection';
import ReviewCTASection from '../components/ReviewCTASection';
import AppFeatureSection from '../components/AppFeatureSection';
import { companyInfo, servicesData, differentialsData, localStoryContent, galleryImages, faqData, testimonials } from '../data/siteData';
import { ShieldCheck, Heart, Sparkles, MapPin, CheckCircle2, ChevronDown, ChevronUp, Star, MessageCircle, ArrowRight, Home as HomeIcon, Trees, Sun, HeartHandshake } from 'lucide-react';

export default function Home({ setActiveTab }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const whatsappUrl = `https://wa.me/${companyInfo.whatsappRaw}?text=Ol%C3%A1%2C%20Geraldo!%20Vim%20pelo%20site%20e%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20o%20Hotel%20Quintal%20dos%20Animais!`;

  const getServiceIcon = (name) => {
    switch (name) {
      case 'Home': return <HomeIcon className="w-6 h-6 text-amber-600" />;
      case 'Sun': return <Sun className="w-6 h-6 text-amber-600" />;
      case 'Trees': return <Trees className="w-6 h-6 text-amber-600" />;
      default: return <HeartHandshake className="w-6 h-6 text-amber-600" />;
    }
  };

  return (
    <div className="space-y-16 pb-12">

      {/* 1. HERO VIDEO */}
      <HeroVideo setActiveTab={setActiveTab} />

      {/* 2. BARRA DE DIFERENCIAIS RÁPIDOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {differentialsData.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-xl border border-amber-200/80 hover:border-amber-400 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 mb-4 font-bold">
                {idx === 0 && <Trees className="w-6 h-6" />}
                {idx === 1 && <Heart className="w-6 h-6 fill-amber-500 text-amber-500" />}
                {idx === 2 && <MessageCircle className="w-6 h-6" />}
                {idx === 3 && <MapPin className="w-6 h-6" />}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. QUEM SOMOS & STORYTELLING LOCAL (SEO MONTE MOR / CAMPINAS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-br from-amber-500/10 via-white to-amber-100/40 rounded-3xl p-8 sm:p-12 border border-amber-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-amber-500 text-gray-950 font-bold px-3.5 py-1 rounded-full text-xs uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" /> Monte Mor • Região de Campinas
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              {localStoryContent.title}
            </h2>

            <p className="text-base font-semibold text-amber-700">
              {localStoryContent.subtitle}
            </p>

            <p className="text-sm text-gray-700 leading-relaxed">
              {localStoryContent.text1}
            </p>

            <p className="text-sm text-gray-700 leading-relaxed">
              {localStoryContent.text2}
            </p>

            <p className="text-sm font-medium text-gray-900 bg-white/80 p-4 rounded-2xl border border-amber-200/80 shadow-xs">
              {localStoryContent.text3}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setActiveTab('sobre')}
                className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold text-sm px-6 py-3 rounded-full transition-colors cursor-pointer"
              >
                <span>Conhecer Nossa História Completa</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <img
                src="/Images/site/ezgif-frame-009242.jpg"
                alt="Estrutura do Hotel Quintal dos Animais em Monte Mor"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <span className="block text-xs uppercase font-bold text-amber-400">Responsável Geraldo Gomes</span>
                  <span className="text-lg font-bold">Amplo Espaço & Carinho 24 Horas</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. RESUMO DOS SERVIÇOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold text-amber-600 uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
            Tudo para o bem-estar do seu cão
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3 tracking-tight">
            Nossos Serviços de Hospedagem Pet
          </h2>
          <p className="text-base text-gray-600 mt-2">
            Oferecemos uma estrutura pensada para a alegria, segurança e aconchego do seu melhor amigo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl p-8 shadow-md border border-amber-200/80 hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-amber-100 rounded-2xl">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <span className="bg-amber-500/20 text-amber-900 font-bold text-xs px-3 py-1 rounded-full">
                    {service.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-1">{service.title}</h3>
                <p className="text-xs font-semibold text-amber-700 mb-3">{service.subtitle}</p>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs font-medium text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => setActiveTab('servicos')}
                  className="text-xs font-extrabold text-amber-700 hover:text-amber-900 uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                >
                  Detalhes do serviço <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <a
                  href={`https://wa.me/${companyInfo.whatsappRaw}?text=Ol%C3%A1%2C%20Geraldo!%20Tenho%20interesse%20no%20servi%C3%A7o%3A%20${encodeURIComponent(service.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-full transition-colors flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" /> Orçamento
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4.5 TABELA TRANSPARENTE DE VALORES & OFERTA DE LANÇAMENTO */}
      <PricingSection />

      {/* 4.8 NOVIDADE EXCLUSIVA • MOCKUP DO APLICATIVO DO TUTOR */}
      <AppFeatureSection setActiveTab={setActiveTab} />

      {/* 5. GALERIA DE FOTOS INTERATIVA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold text-amber-600 uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
            Nossos Hospedados Felizes
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-2">
            Galeria do Hotel Quintal dos Animais
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Clique nas fotos para visualizar a alegria e a liberdade que seu cão vivencia por aqui.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage(img)}
              className="group relative rounded-2xl overflow-hidden aspect-square cursor-pointer shadow-md bg-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-xs font-bold text-white leading-snug">{img.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CHAMADA PARA DEIXAR AVALIAÇÃO NO GOOGLE */}
      <ReviewCTASection />

      {/* 6. DEPOIMENTOS DE TUTORES */}
      <section className="bg-amber-500/10 py-16 border-y border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex justify-center gap-1 text-amber-500 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-500" />
              ))}
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              O Que dizem os tutores da Região
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Tutores de Campinas, Monte Mor, Hortolândia e Indaiatuba que confiam o pet ao Hotel Quintal dos Animais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 shadow-md border border-amber-200 flex flex-col justify-between">
                <p className="text-sm text-gray-700 italic leading-relaxed mb-6">
                  "{t.text}"
                </p>
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="block font-bold text-gray-900 text-sm">{t.name}</span>
                    <span className="text-xs text-amber-700 font-medium">{t.city}</span>
                  </div>
                  <Heart className="w-5 h-5 fill-amber-500 text-amber-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PERGUNTAS FREQUENTES (FAQ) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Dúvidas Frequentes sobre a Hospedagem
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Respostas para as principais perguntas dos donos de pets.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="bg-white rounded-2xl border border-amber-200 overflow-hidden shadow-xs">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-4 text-left font-bold text-gray-900 flex items-center justify-between gap-4 hover:bg-amber-50/50 transition-colors cursor-pointer text-base"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-amber-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm text-gray-600 leading-relaxed border-t border-amber-100 bg-amber-50/20">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. CTA FINAL BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 rounded-3xl p-8 sm:p-14 text-white text-center shadow-2xl relative overflow-hidden border-2 border-amber-400/40">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="bg-amber-500 text-gray-950 font-extrabold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider">
              Reserve com antecedência para feriados e férias
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              Vai viajar? Deixe seu pet no melhor quintal da região!
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Fale diretamente com Geraldo Gomes no WhatsApp e garanta a vaga do seu cão com carinho, espaço verde e supervisão total em Monte Mor/SP.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-8 py-4 rounded-full text-base sm:text-lg shadow-xl hover:scale-105 transition-all duration-300"
            >
              <MessageCircle className="w-6 h-6 fill-white" />
              <span>Chamar Geraldo Gomes no WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Gallery Lightbox Modal */}
      <GalleryModal selectedImage={selectedImage} setSelectedImage={setSelectedImage} />

    </div>
  );
}
