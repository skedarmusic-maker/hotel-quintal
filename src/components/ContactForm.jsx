import React, { useState } from 'react';
import { MessageCircle, Send, CheckCircle2, Calendar, User, Dog, PhoneCall, FileText } from 'lucide-react';
import { companyInfo } from '../data/siteData';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    tutorName: '',
    petName: '',
    petBreed: '',
    serviceType: 'Hospedagem Canina (Pernoite)',
    startDate: '',
    endDate: '',
    phone: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Build WhatsApp message
    const msg = `Ol%C3%A1%2C%20Geraldo!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20o%20Hotel%20Quintal%20dos%20Animais%3A%0A%0A` +
      `*Tutor(a):* ${encodeURIComponent(formData.tutorName || 'Não informado')}%0A` +
      `*Nome do Pet:* ${encodeURIComponent(formData.petName || 'Não informado')} (${encodeURIComponent(formData.petBreed || 'Raça não informada')})%0A` +
      `*Serviço:* ${encodeURIComponent(formData.serviceType)}%0A` +
      `*Entrada:* ${encodeURIComponent(formData.startDate || 'A definir')}%0A` +
      `*Saída:* ${encodeURIComponent(formData.endDate || 'A definir')}%0A` +
      `*Telefone/Whats:* ${encodeURIComponent(formData.phone || 'Não informado')}%0A` +
      `*Observações:* ${encodeURIComponent(formData.message || 'Sem observações')}`;

    window.open(`https://wa.me/${companyInfo.whatsappRaw}?text=${msg}`, '_blank');
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-amber-200">
      <div className="mb-6">
        <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-amber-500 fill-amber-500" />
          Solicitar Orçamento / Reserva Rápida
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Preencha os dados abaixo para direcionarmos o melhor atendimento via WhatsApp direto com Geraldo Gomes.
        </p>
      </div>

      {submitted && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 text-sm flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
          <span>Formulário enviado! Abrindo a conversa no WhatsApp para finalizar seu atendimento...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Nome do Tutor */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Seu Nome Completo *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="text"
                name="tutorName"
                required
                value={formData.tutorName}
                onChange={handleChange}
                placeholder="Ex: Ana Maria"
                className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm outline-none transition-all"
              />
            </div>
          </div>

          {/* Nome e Raça do Pet */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Nome do Pet e Raça *
            </label>
            <div className="relative">
              <Dog className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="text"
                name="petName"
                required
                value={formData.petName}
                onChange={handleChange}
                placeholder="Ex: Rex (Golden Retriever)"
                className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm outline-none transition-all"
              />
            </div>
          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Serviço Desejado */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Serviço Desejado *
            </label>
            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm outline-none bg-white font-medium"
            >
              <option value="Hospedagem Canina (Pernoite)">Hospedagem Canina (Pernoite)</option>
              <option value="Day Care / Creche Pet">Day Care / Creche Pet</option>
              <option value="Hospedagem 24 Horas">Hospedagem 24 Horas</option>
              <option value="Cuidados Especiais / Outro">Cuidados Especiais / Outro</option>
            </select>
          </div>

          {/* Telefone / WhatsApp */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Seu WhatsApp *
            </label>
            <div className="relative">
              <PhoneCall className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="text"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="(19) 99999-9999"
                className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm outline-none transition-all"
              />
            </div>
          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Data de Entrada */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Data Prevista de Entrada
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm outline-none transition-all"
              />
            </div>
          </div>

          {/* Data de Saída */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Data Prevista de Saída
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Mensagem / Observações */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            Alguma necessidade especial ou detalhe sobre seu pet?
          </label>
          <div className="relative">
            <FileText className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
            <textarea
              name="message"
              rows="3"
              value={formData.message}
              onChange={handleChange}
              placeholder="Ex: Toma medicação diária às 8h, gosta de bolinha..."
              className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-sm outline-none transition-all"
            ></textarea>
          </div>
        </div>

        {/* Botão Enviar */}
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-4 px-6 rounded-2xl shadow-lg hover:shadow-emerald-600/30 transition-all duration-200 text-base cursor-pointer"
        >
          <Send className="w-5 h-5 fill-white" />
          Enviar Orçamento no WhatsApp de Geraldo Gomes
        </button>

      </form>
    </div>
  );
}
