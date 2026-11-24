import React from 'react';
import { X, MessageCircle } from 'lucide-react';
import { companyInfo } from '../data/siteData';

export default function GalleryModal({ selectedImage, setSelectedImage }) {
  if (!selectedImage) return null;

  const whatsappUrl = `https://wa.me/${companyInfo.whatsappRaw}?text=Ol%C3%A1%2C%20Geraldo!%20Adorei%20as%20fotos%20do%20Hotel%20Quintal%20dos%20Animais!%20Gostaria%20de%20saber%20mais!`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-amber-300">
        
        {/* Header bar */}
        <div className="flex items-center justify-between p-4 bg-amber-500 text-gray-900 font-bold">
          <span className="text-sm sm:text-base">{selectedImage.title}</span>
          <button
            onClick={() => setSelectedImage(null)}
            className="p-1 rounded-full hover:bg-amber-600 transition-colors text-gray-900"
            aria-label="Fechar modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Image Display */}
        <div className="bg-gray-900 max-h-[70vh] flex items-center justify-center overflow-hidden">
          <img
            src={selectedImage.url}
            alt={selectedImage.alt || selectedImage.title}
            className="max-h-[70vh] w-auto object-contain"
          />
        </div>

        {/* Footer info & CTA */}
        <div className="p-4 sm:p-6 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-extrabold text-gray-900 text-base">{selectedImage.title}</h4>
            <p className="text-xs text-gray-600">Hotel Quintal dos Animais • Parque Café I - Monte Mor/SP</p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-md transition-colors"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            Falar no WhatsApp
          </a>
        </div>

      </div>
    </div>
  );
}
