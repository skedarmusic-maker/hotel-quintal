import React from 'react';
import ContactForm from '../components/ContactForm';
import { companyInfo } from '../data/siteData';
import { Phone, Mail, Instagram, MapPin, Clock, MessageCircle, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function Contato() {
  const whatsappUrl = `https://wa.me/${companyInfo.whatsappRaw}?text=Ol%C3%A1%2C%20Geraldo!%20Vim%20pela%20p%C3%A1gina%20de%20Contato%20do%20site%20e%20gostaria%20de%20fazer%20uma%20reserva!`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* H1 SEO HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 font-extrabold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider">
          <MessageCircle className="w-3.5 h-3.5 fill-amber-600 text-amber-600" /> Fale Conosco • Atendimento Rápido
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Reserve a Hospedagem do Seu Pet em Monte Mor
        </h1>
        <p className="text-lg text-gray-600 font-medium">
          Estamos prontos para acolher o seu cão com muito amor e amplo espaço interno estruturado em Monte Mor/SP.
        </p>
      </div>

      {/* GRID DE CONTATO E FORMULÁRIO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* COLUNA ESQUERDA: INFOS DE CONTATO */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-amber-200 space-y-6">
            <h2 className="text-2xl font-extrabold text-gray-900 border-b border-amber-100 pb-3">
              Informações de Contato
            </h2>

            <div className="space-y-5">
              
              {/* Geraldo Gomes & WhatsApp */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                <div className="p-3 bg-emerald-600 text-white rounded-2xl shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="block text-xs font-extrabold text-amber-800 uppercase">Responsável</span>
                  <span className="block text-base font-bold text-gray-900">{companyInfo.owner}</span>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-extrabold text-emerald-700 hover:text-emerald-900 text-base mt-1"
                  >
                    <MessageCircle className="w-4 h-4 fill-emerald-600" />
                    WhatsApp: {companyInfo.whatsapp}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                <div className="p-3 bg-amber-500 text-gray-950 rounded-2xl shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="block text-xs font-extrabold text-amber-800 uppercase">E-mail Comercial</span>
                  <a
                    href={`mailto:${companyInfo.email}`}
                    className="text-sm font-bold text-gray-900 hover:text-amber-600 break-all"
                  >
                    {companyInfo.email}
                  </a>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                <div className="p-3 bg-pink-600 text-white rounded-2xl shrink-0">
                  <Instagram className="w-6 h-6" />
                </div>
                <div>
                  <span className="block text-xs font-extrabold text-amber-800 uppercase">Siga no Instagram</span>
                  <a
                    href={companyInfo.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-gray-900 hover:text-pink-600"
                  >
                    {companyInfo.instagram}
                  </a>
                </div>
              </div>

              {/* Endereço */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                <div className="p-3 bg-amber-600 text-white rounded-2xl shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="block text-xs font-extrabold text-amber-800 uppercase">Endereço Completo</span>
                  <p className="text-sm font-bold text-gray-900 leading-snug">
                    {companyInfo.address}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Atendendo Monte Mor, Campinas, Hortolândia, Indaiatuba e RMC.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Card Horários e Visitas */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-950 text-white rounded-3xl p-6 border-2 border-amber-400/40 shadow-lg space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Clock className="w-5 h-5" />
              <span>Visitas ao Quintal</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Para garantir a tranquilidade e a segurança dos cachorros já hospedados, as visitas para conhecer o espaço devem ser agendadas previamente via WhatsApp.
            </p>
          </div>

        </div>

        {/* COLUNA DIREITA: FORMULÁRIO DE ORÇAMENTO */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

      </div>

      {/* SEÇÃO MAPA DO GOOGLE MEU NEGÓCIO (EMBED MAPA & NAP CONSISTENCY) */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-amber-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              <MapPin className="w-3.5 h-3.5 text-amber-600" /> Perfil Oficial no Google Meu Negócio
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900">
              Nossa Localização em Monte Mor / SP
            </h2>
            <p className="text-xs text-gray-600">
              {companyInfo.address} • CEP: {companyInfo.cep}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold bg-emerald-100 text-emerald-900 px-3 py-1.5 rounded-xl border border-emerald-300">
              🟢 {companyInfo.hours}
            </span>
            <span className="text-xs font-semibold bg-gray-100 text-gray-800 px-3 py-1.5 rounded-xl border border-gray-200">
              Plus Code: {companyInfo.plusCode}
            </span>
          </div>
        </div>

        {/* Iframe oficial do Google Maps Embed */}
        <div className="relative overflow-hidden rounded-2xl shadow-lg border-2 border-amber-300">
          <iframe
            src={companyInfo.googleMapsEmbed}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Localização do Hotel Quintal dos Animais no Google Maps"
            className="w-full h-[400px] sm:h-[450px]"
          ></iframe>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600 pt-2">
          <span>
            📍 <strong>Endereço NAP Oficial:</strong> {companyInfo.address}
          </span>
          <a
            href="https://maps.google.com/?cid=1896200257321527005"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold px-5 py-2.5 rounded-full transition-colors shrink-0"
          >
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>Abrir no Google Maps</span>
          </a>
        </div>
      </section>

    </div>
  );
}
