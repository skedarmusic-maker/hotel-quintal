import React from 'react';
import { Camera, Clock, Heart, ShieldCheck, Sparkles, MessageCircle, ArrowRight, Tag, Bell, CheckCircle2, FileText, Smartphone } from 'lucide-react';

export default function AppFeatureSection({ setActiveTab }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 rounded-3xl p-8 sm:p-14 text-white border-2 border-amber-400/50 shadow-2xl relative overflow-hidden">
        
        {/* Glow ambient background effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* COLUNA ESQUERDA: TEXTO E BENEFÍCIOS */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 bg-amber-500 text-gray-950 font-extrabold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
              <Smartphone className="w-4 h-4 fill-gray-950" />
              <span>Novidade Exclusiva • Área do Tutor</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
              Acompanhe o Seu Pet em <span className="text-amber-400 underline decoration-amber-400/50">Tempo Real</span> na Palma da Mão
            </h2>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-medium">
              Desenvolvemos um portal exclusivo para você ter a paz de espírito absoluta enquanto viaja. Acompanhe fotos do dia, preencha a ficha médica e economize com reservas antecipadas!
            </p>

            {/* Grid dos Pilares de Benefícios */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              
              <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 space-y-2 hover:border-amber-400/60 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <Camera className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white">📸 Fotos & Vídeos (15s) no Feed</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Veja vídeos curtos e fotos do seu pet brincando no gramado em tempo real, gravados direto no hotel.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 space-y-2 hover:border-amber-400/60 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white">🥣 Ficha com Despertador</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Defina a porção exata da ração e horários de medicação no relógio para a equipe do hotel seguir à risca.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 space-y-2 hover:border-amber-400/60 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white">💬 Mural de Recados Diretos</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Envie solicitações de banho, recomendações ou avisos diretamente para Geraldo Gomes.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 space-y-2 hover:border-amber-400/60 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                  <Tag className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white">🏷️ 5% OFF Reserva & Creche Mensal</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Garanta descontos exclusivos na diária com o Pacote Mensal de Creche e 5% OFF em estadias antecipadas.
                </p>
              </div>

            </div>

            {/* CTA Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => {
                  if (setActiveTab) setActiveTab('portal');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-400 text-gray-950 font-extrabold text-base px-8 py-4 rounded-full shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <span>🐾 Acessar Área do Cliente / Cadastrar Pet</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <span className="text-xs text-gray-400 font-medium">
                🔒 100% Gratuito para todos os tutores do Hotel.
              </span>
            </div>

          </div>

          {/* COLUNA DIREITA: MOCKUP INTERATIVO DE SMARTPHONE */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Elemento de Iluminação de Fundo do Celular */}
            <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-2xl transform scale-90" />

            {/* Floating Badge 1 Top Left */}
            <div className="hidden sm:flex absolute -top-4 -left-6 z-20 items-center gap-2 bg-gray-900/90 text-amber-400 font-extrabold text-xs px-3.5 py-2 rounded-2xl border border-amber-400/50 shadow-2xl backdrop-blur-md animate-bounce">
              <Bell className="w-4 h-4 fill-amber-400" />
              <span>Foto Nova Recebida!</span>
            </div>

            {/* Floating Badge 2 Bottom Right */}
            <div className="hidden sm:flex absolute -bottom-4 -right-6 z-20 items-center gap-2 bg-emerald-950/90 text-emerald-300 font-extrabold text-xs px-3.5 py-2 rounded-2xl border border-emerald-400/50 shadow-2xl backdrop-blur-md">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>5% OFF Garantido</span>
            </div>

            {/* Moldura de Smartphone Premium */}
            <div className="relative w-full max-w-[300px] sm:max-w-[320px] bg-gray-950 rounded-[48px] p-3 border-4 border-gray-800 shadow-2xl ring-1 ring-white/20">
              
              {/* Dynamic Island / Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-end px-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-900/60 border border-blue-400/40" />
              </div>

              {/* Tela do Celular (Inside Web App UI) */}
              <div className="w-full bg-[#FFFDF5] text-gray-900 rounded-[38px] overflow-hidden pt-8 pb-4 px-3 space-y-3 font-sans">
                
                {/* Header da Tela */}
                <div className="bg-amber-500 p-3 rounded-2xl text-gray-950 flex items-center justify-between shadow-xs">
                  <div>
                    <span className="block text-[9px] font-extrabold uppercase tracking-wider opacity-80">Portal do Tutor</span>
                    <span className="block text-xs font-extrabold">🐕 Cafu (Rotwiler)</span>
                  </div>
                  <span className="text-[9px] font-bold bg-gray-950 text-amber-400 px-2 py-0.5 rounded-full">
                    🟢 Ao Vivo
                  </span>
                </div>

                {/* Feed Card Simulation */}
                <div className="bg-white rounded-2xl overflow-hidden border border-amber-200 shadow-sm space-y-2">
                  <div className="relative h-36">
                    <img
                      src="/Images/site/252.jpg"
                      alt="Foto do pet no feed"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[9px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                      Hoje às 10:30h
                    </span>
                  </div>

                  <div className="p-2.5 space-y-1.5">
                    <div className="flex flex-wrap gap-1">
                      <span className="text-[8px] font-extrabold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full">
                        🥣 Ração 150g OK
                      </span>
                      <span className="text-[8px] font-extrabold bg-blue-100 text-blue-900 px-2 py-0.5 rounded-full">
                        💊 Remédio 12h OK
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-700 font-medium leading-tight">
                      Cafu adorou correr no gramado amplo com a turma!
                    </p>
                  </div>
                </div>

                {/* Card Reserva Antecipada */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-2.5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-extrabold text-emerald-900 uppercase">Reserva Antecipada</span>
                    <span className="text-[9px] font-extrabold bg-emerald-600 text-white px-1.5 py-0.5 rounded-full">5% OFF</span>
                  </div>
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="text-[10px] text-gray-500">5 Diárias em Outubro</span>
                    <span className="font-extrabold text-emerald-800">R$ 332,50</span>
                  </div>
                </div>

                {/* Relógio de Medicação */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-2 flex items-center justify-between text-[10px] font-bold text-amber-900">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" /> Refeições:
                  </span>
                  <span>⏰ 08:00 • 18:00</span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
