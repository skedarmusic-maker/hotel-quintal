import React, { useState } from 'react';
import { Menu, X, Phone, MessageCircle, Heart, Home, Info, Briefcase, Mail, Instagram } from 'lucide-react';
import { companyInfo } from '../data/siteData';

export default function Navbar({ activeTab, setActiveTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'HOME', icon: Home },
    { id: 'sobre', label: 'SOBRE NÓS', icon: Info },
    { id: 'servicos', label: 'SERVIÇOS', icon: Briefcase },
    { id: 'contato', label: 'CONTATO', icon: Mail },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/${companyInfo.whatsappRaw}?text=Ol%C3%A1%2C%20Geraldo!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20hospedagem%20para%20meu%20dog!`;

  return (
    <header className="sticky top-0 z-50 glass-header border-b border-amber-200/50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Name */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-full border-2 border-amber-400 p-0.5 shadow-md bg-white group-hover:scale-105 transition-transform duration-300">
              <img 
                src={companyInfo.logo} 
                alt="Logo Hotel Quintal dos Animais" 
                className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-full"
              />
            </div>
            <div>
              <span className="block text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight leading-none font-display">
                HOTEL QUINTAL
              </span>
              <span className="text-xs sm:text-sm font-semibold text-amber-600 tracking-wider uppercase flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> Dos Animais
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-gray-900 shadow-sm'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-amber-100/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-gray-900' : 'text-amber-600'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Portal & WhatsApp CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('portal')}
              className={`inline-flex items-center gap-2 font-extrabold px-5 py-2.5 rounded-full text-sm shadow-md transition-all cursor-pointer ${
                activeTab === 'portal' || activeTab === 'admin'
                  ? 'bg-gray-950 text-white shadow-lg'
                  : 'bg-amber-500 hover:bg-amber-400 text-gray-950'
              }`}
            >
              <span>🐾 Área do Cliente</span>
            </button>

            <a
              href={companyInfo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:opacity-90 text-white font-bold px-4 py-2.5 rounded-full text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
              title="Instagram do Hotel Quintal dos Animais"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-full text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile Header Buttons */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('portal')}
              className={`px-3 py-1.5 font-extrabold text-xs rounded-full shadow-xs flex items-center gap-1 cursor-pointer ${
                activeTab === 'portal' || activeTab === 'admin'
                  ? 'bg-gray-950 text-white'
                  : 'bg-amber-500 text-gray-950'
              }`}
            >
              <span>🐾 Área do Cliente</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-emerald-600 text-white rounded-full shadow-md"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-800 hover:bg-amber-100 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 border-b border-amber-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          
          <button
            onClick={() => handleNavClick('portal')}
            className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-gray-950 font-extrabold py-3.5 rounded-2xl text-base shadow-md mb-4 border border-amber-400"
          >
            <span>🐾 Acessar Área do Cliente</span>
          </button>

          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-base transition-colors ${
                    isActive
                      ? 'bg-amber-500 text-gray-900'
                      : 'text-gray-700 hover:bg-amber-50'
                  }`}
                >
                  <Icon className="w-5 h-5 text-amber-600" />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold py-3 rounded-xl text-base shadow-md"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              WhatsApp: {companyInfo.whatsapp}
            </a>
            <a
              href={companyInfo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-bold py-3 rounded-xl text-base shadow-md"
            >
              <Instagram className="w-5 h-5" />
              {companyInfo.instagram}
            </a>
            <p className="text-xs text-center text-gray-500 mt-1">
              Geraldo Gomes • Monte Mor / SP
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
