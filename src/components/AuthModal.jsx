import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Lock, Mail, User, Phone, ShieldCheck, Heart, Sparkles, ArrowRight } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, defaultMode = 'login', isAdminMode = false, onAuthSuccess }) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState(defaultMode); // 'login', 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    setMode(defaultMode);
  }, [defaultMode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (!isAdminMode && mode === 'signup') {
        await signUp(email, password, fullName, phone, 'tutor');
        setSuccessMsg('Cadastro realizado com sucesso! Você já pode se conectar.');
        setTimeout(() => {
          setMode('login');
          setSuccessMsg('');
        }, 2000);
      } else {
        await signIn(email, password);
        setSuccessMsg('Conectado com sucesso!');
        if (onAuthSuccess) onAuthSuccess();
        setTimeout(() => {
          onClose();
        }, 1000);
      }
    } catch (err) {
      console.error('Erro na autenticação:', err);
      setErrorMsg(err.message || 'Falha ao autenticar. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-amber-200 overflow-hidden">
        
        {/* Header Banner */}
        <div className={`p-6 text-center relative ${isAdminMode ? 'bg-gray-950 text-white border-b-2 border-amber-400' : 'bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-gray-950'}`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            {isAdminMode ? <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> : <Sparkles className="w-3.5 h-3.5" />}
            <span>{isAdminMode ? 'Acesso Restrito' : 'Área do Tutor'}</span>
          </div>
          
          <h2 className="text-2xl font-extrabold tracking-tight">
            {isAdminMode ? 'Painel Administrativo' : mode === 'signup' ? 'Cadastro do Tutor' : 'Entrar no Sistema'}
          </h2>
          <p className="text-xs font-medium opacity-90 mt-1">
            {isAdminMode ? 'Gestão operacional do Hotel Quintal dos Animais' : 'Acompanhe seu pet em tempo real e preencha a Ficha de Saúde'}
          </p>
        </div>

        {/* Tab Toggle (Only for Tutor public login/signup) */}
        {!isAdminMode && (
          <div className="flex border-b border-gray-100 bg-gray-50/80 p-1.5">
            <button
              type="button"
              onClick={() => { setMode('login'); setErrorMsg(''); }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                mode === 'login' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Entrar na Minha Conta
            </button>
            <button
              type="button"
              onClick={() => { setMode('signup'); setErrorMsg(''); }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                mode === 'signup' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Criar Novo Cadastro
            </button>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {errorMsg && (
            <div className="p-3 text-xs bg-red-50 text-red-700 rounded-xl border border-red-200 font-semibold">
              ⚠️ {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="p-3 text-xs bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 font-semibold">
              ✅ {successMsg}
            </div>
          )}

          {!isAdminMode && mode === 'signup' && (
            <>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="Seu nome completo"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-amber-500 focus:outline-hidden font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Telefone / WhatsApp</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    required
                    placeholder="(19) 99999-9999"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-amber-500 focus:outline-hidden font-medium"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
              <input
                type="email"
                required
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-amber-500 focus:outline-hidden font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
              <input
                type="password"
                required
                minLength={6}
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-amber-500 focus:outline-hidden font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 ${
              isAdminMode ? 'bg-amber-500 hover:bg-amber-400 text-gray-950' : 'bg-amber-500 hover:bg-amber-600 text-gray-950'
            }`}
          >
            {loading ? (
              <span>Processando...</span>
            ) : (
              <>
                <span>{isAdminMode ? 'Acessar Painel Hotel' : mode === 'signup' ? 'Cadastrar Minha Conta' : 'Entrar no Sistema'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="p-4 bg-gray-50 text-center border-t border-gray-100 text-xs text-gray-500">
          🔒 Conexão criptografada Supabase Auth.
        </div>

      </div>
    </div>
  );
}
