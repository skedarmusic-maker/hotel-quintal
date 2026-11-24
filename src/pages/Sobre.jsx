import React from 'react';
import { companyInfo } from '../data/siteData';
import { Heart, ShieldCheck, MapPin, Sparkles, Trees, Award, MessageCircle, CheckCircle2 } from 'lucide-react';

export default function Sobre({ setActiveTab }) {
  const whatsappUrl = `https://wa.me/${companyInfo.whatsappRaw}?text=Ol%C3%A1%2C%20Geraldo!%20Li%20a%20hist%C3%B3ria%20do%20Hotel%20Quintal%20dos%20Animais%20no%20site%20e%20gostaria%20de%20agendar%20uma%20visita!`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* 1. SEÇÃO CABEÇALHO H1 SEO */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 font-extrabold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider">
          <Heart className="w-3.5 h-3.5 fill-amber-600 text-amber-600" /> Quem Somos • Monte Mor / SP
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Sobre o Hotel Quintal dos Animais em Monte Mor
        </h1>
        <p className="text-lg text-gray-600 font-medium">
          Tradição em acolhimento pet, amplo espaço interno estruturado e amor incondicional para o seu melhor amigo.
        </p>
      </div>

      {/* 2. HISTÓRIA & CONCEITO COM GERALDO GOMES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Idealizado por Geraldo Gomes
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
            Um refúgio pensado para quem ama o seu pet como filho
          </h2>

          <p className="text-sm text-gray-700 leading-relaxed">
            O <strong>HOTEL QUINTAL DOS ANIMAIS</strong> nasceu da paixão genuína pelos cães e do desejo de oferecer uma alternativa verdadeiramente humana, acolhedora e segura às hospedagens tradicionais.
          </p>

          <p className="text-sm text-gray-700 leading-relaxed">
            Sabemos o quanto dói no coração do tutor ter que viajar ou cumprir compromissos profissionais e precisar deixar seu animalzinho. É por isso que criamos um ambiente onde os cães <strong>não ficam confinados em gaiolas frias</strong>. Aqui, eles contam com um <strong>AMPLO ESPAÇO INTERNO</strong> estruturado com boxes individuais higienizados com piso, ventilação e supervisão amorosa constante.
          </p>

          <div className="bg-amber-50 rounded-2xl p-5 border-l-4 border-amber-500 text-sm font-semibold text-gray-800 space-y-2">
            <p>
              "Nosso compromisso é dar a você a paz de espírito necessária para viajar sabendo que seu dog está rindo à toa, recebendo carinho e sendo tratado como parte da família."
            </p>
            <span className="block text-xs font-extrabold text-amber-700">— Geraldo Gomes, Fundador e Responsável</span>
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/Images/site/252.jpg"
              alt="Geraldo Gomes cuidando dos animais no Hotel Quintal dos Animais"
              className="rounded-3xl shadow-lg border-4 border-white object-cover w-full h-64 sm:h-80"
            />
            <img
              src="/Images/site/15151.jpg"
              alt="Cachorro confortável nas instalações do hotel em Monte Mor"
              className="rounded-3xl shadow-lg border-4 border-white object-cover w-full h-64 sm:h-80 mt-8"
            />
          </div>
        </div>

      </div>

      {/* 3. SEÇÃO NOVO TOUR EM VÍDEO DA ESTRUTURA REFORMADA */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-amber-300 shadow-xl space-y-6">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="inline-flex items-center gap-2 bg-amber-500 text-gray-950 font-extrabold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 fill-gray-950" /> Estrutura Reformada • Conheça os Novos Boxes
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Tour em Vídeo pelas Nossas Novas Instalações
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Assista ao vídeo real gravado pelo Geraldo Gomes mostrando os novos boxes com piso branco lavável, divisões seguras por porte e pintura nova para acolher seu cão com máxima higiene.
          </p>
        </div>

        <div className="max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-200 bg-gray-950">
          <video
            controls
            playsInline
            className="w-full max-h-[500px] object-cover mx-auto"
            poster="/Images/site/252.jpg"
          >
            <source src="/Images/site/estrutura_nova_boxes.mp4" type="video/mp4" />
            Seu navegador não suporta a exibição de vídeos.
          </video>
        </div>
      </section>

      {/* 4. ESTRUTURA E LOCALIZAÇÃO PRIVILEGIADA */}
      <section className="bg-gradient-to-br from-amber-50 via-white to-amber-100/50 rounded-3xl p-8 sm:p-12 border border-amber-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <MapPin className="w-7 h-7 text-amber-600" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Localização Estratégica em Monte Mor para Atender toda a RMC
          </h2>
        </div>

        <div className="prose prose-amber max-w-none text-sm text-gray-700 leading-relaxed space-y-4">
          <p>
            Escolhemos o <strong>Parque Café I em Monte Mor</strong> justamente pelo ambiente calmo, arejado e livre do barulho e do estresse do trânsito urbano. Um local sereno que proporciona um refúgio de paz genuíno para os animais.
          </p>

          <p>
            A apenas alguns minutos de <strong>Campinas, Hortolândia, Indaiatuba e Sumaré</strong>, nosso hotel oferece fácil acesso para os tutores que procuram uma hospedagem canina de alto padrão com instalações higienizadas, perto de casa e com atendimento personalizado.
          </p>

          <p className="font-semibold text-gray-900 bg-white p-4 rounded-xl border border-amber-200">
            Aqui seu cão desfruta de conforto com total segurança, em um espaço especialmente reformado para garantir o bem-estar e a tranquilidade durante todo o período de estadia.
          </p>
        </div>
      </section>

      {/* 5. VALORES & PILARES */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Nossos Pilares de Atendimento
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Princípios inegociáveis que norteiam a hospedagem do seu cão.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-8 shadow-md border border-amber-200 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 font-bold">
              <Trees className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">1. Amplo Espaço Interno</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Instalações amplas, protegidas de chuva e sol forte, com boxes arejados e confortáveis para o descanso seguro do seu cão.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-md border border-amber-200 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">2. Segurança & Supervisão</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Estrutura totalmente cercada, com piso lavável de fácil desinfecção. Acompanhamento rigoroso de vacinas, alimentação adequada e cuidados com a saúde.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-md border border-amber-200 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 font-bold">
              <Heart className="w-6 h-6 fill-amber-500 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">3. Carinho & Respeito Individual</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Respeitamos a personalidade de cada animal. Se o seu cão é mais velhinho ou tímido, ele recebe o sossego e a atenção carinhosa no seu tempo.
            </p>
          </div>
        </div>
      </section>

      {/* 6. SEÇÃO DE VISITA E CONTATO */}
      <div className="bg-gray-950 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 border-2 border-amber-400">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-2xl font-extrabold text-white">Quer conhecer nosso espaço pessoalmente?</h3>
          <p className="text-sm text-amber-100/80">
            Agende uma visita com Geraldo Gomes no Parque Café I em Monte Mor. Será um prazer receber você e seu cão para um tour pelas nossas novas instalações!
          </p>
        </div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-6 py-4 rounded-full text-base shadow-xl shrink-0 transition-transform hover:scale-105"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
          <span>Agendar Visita pelo WhatsApp</span>
        </a>
      </div>

    </div>
  );
}
