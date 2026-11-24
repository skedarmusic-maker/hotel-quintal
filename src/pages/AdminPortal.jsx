import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { ShieldCheck, Heart, Camera, DollarSign, Calendar, MessageCircle, CheckCircle2, User, Plus, Search, Filter, AlertCircle, Clock, Eye, Trash2, Tag, Check, X, Video, Film, UploadCloud, Play, Link2, Sparkles, RefreshCw } from 'lucide-react';
import { isVideoMedia, formatFileSize, formatDuration } from '../lib/mediaUtils';

export default function AdminPortal() {
  const { user, profile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('hospedes'); // 'hospedes', 'agenda', 'feed', 'financeiro', 'recados'

  // Data States
  const [pets, setPets] = useState([]);
  const [healthForms, setHealthForms] = useState({});
  const [bookings, setBookings] = useState([]);
  const [selectedPetForm, setSelectedPetForm] = useState(null);

  // Feed Creation & Management State
  const [feedPetId, setFeedPetId] = useState('');
  const [feedImageUrl, setFeedImageUrl] = useState('');
  const [feedCaption, setFeedCaption] = useState('');
  const [feedMealOk, setFeedMealOk] = useState(true);
  const [feedMedsOk, setFeedMedsOk] = useState(false);
  const [feedPlaytimeOk, setFeedPlaytimeOk] = useState(true);
  const [postingFeed, setPostingFeed] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  // Mobile / Direct File Upload State (Photos & Videos)
  const [feedFile, setFeedFile] = useState(null);
  const [feedFilePreview, setFeedFilePreview] = useState(null);
  const [feedFileType, setFeedFileType] = useState(null); // 'image' | 'video'
  const [feedVideoDuration, setFeedVideoDuration] = useState(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [feedPostsList, setFeedPostsList] = useState([]);
  const [deletingPostId, setDeletingPostId] = useState(null);

  const fileInputRef = useRef(null);
  const photoInputRef = useRef(null);
  const videoInputRef = useRef(null);

  // Financial State
  const [transactions, setTransactions] = useState([]);
  const [newTransDesc, setNewTransDesc] = useState('');
  const [newTransAmount, setNewTransAmount] = useState('');
  const [newTransType, setNewTransType] = useState('diaria');
  const [newTransStatus, setNewTransStatus] = useState('pago');

  // Messages State
  const [messages, setMessages] = useState([]);

  // Search filter
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      // Load all pets with tutor info
      const { data: petsData, error: petsErr } = await supabase
        .from('pets')
        .select(`
          *,
          profiles:tutor_id (full_name, phone)
        `)
        .order('created_at', { ascending: false });

      if (petsErr) throw petsErr;
      setPets(petsData || []);

      // Load all health forms
      const { data: formsData, error: formsErr } = await supabase
        .from('pet_health_forms')
        .select('*');

      if (!formsErr && formsData) {
        const formMap = {};
        formsData.forEach((f) => { formMap[f.pet_id] = f; });
        setHealthForms(formMap);
      }

      // Load all bookings
      const { data: bookingsData, error: bookingsErr } = await supabase
        .from('bookings')
        .select(`
          *,
          pets (name, breed),
          profiles:tutor_id (full_name, phone)
        `)
        .order('check_in', { ascending: false });

      if (!bookingsErr) setBookings(bookingsData || []);

      // Load transactions
      const { data: transData, error: transErr } = await supabase
        .from('financial_transactions')
        .select('*')
        .order('created_at', { ascending: false });

      if (!transErr) setTransactions(transData || []);

      // Load messages
      const { data: msgData, error: msgErr } = await supabase
        .from('tutor_messages')
        .select(`
          *,
          profiles:tutor_id (full_name, phone)
        `)
        .order('created_at', { ascending: false });

      if (!msgErr) setMessages(msgData || []);

      // Load recent feed posts
      const { data: feedData, error: feedErr } = await supabase
        .from('pet_feed_posts')
        .select(`
          *,
          pets (name, breed, profiles:tutor_id (full_name))
        `)
        .order('created_at', { ascending: false })
        .limit(30);

      if (!feedErr && feedData) {
        setFeedPostsList(feedData);
      }

    } catch (err) {
      console.error('Erro ao carregar dados admin:', err);
    }
  };

  // Manipulador de seleção de foto ou vídeo direto do celular
  const handleFileSelect = (e, forcedType = null) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Limite de segurança: 50MB
    const maxSizeBytes = 50 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      alert(`O arquivo selecionado tem ${(file.size / (1024 * 1024)).toFixed(1)}MB. O tamanho máximo permitido é de 50MB. Para vídeos de celular, cerca de 15 segundos costumam ter entre 10MB e 25MB.`);
      return;
    }

    const isVideo = forcedType === 'video' || file.type.startsWith('video/') || /\.(mp4|mov|webm|m4v|3gp|avi)$/i.test(file.name);
    const isImage = forcedType === 'image' || file.type.startsWith('image/') || /\.(jpg|jpeg|png|webp|gif|heic)$/i.test(file.name);

    if (!isVideo && !isImage) {
      alert('Por favor, selecione uma foto (JPG, PNG, HEIC) ou um vídeo (MP4, MOV, WEBM).');
      return;
    }

    setFeedFile(file);
    setFeedFileType(isVideo ? 'video' : 'image');
    setFeedVideoDuration(null);

    if (feedFilePreview) {
      URL.revokeObjectURL(feedFilePreview);
    }
    const previewUrl = URL.createObjectURL(file);
    setFeedFilePreview(previewUrl);
    setFeedImageUrl(''); // Limpa URL manual se escolheu arquivo
  };

  const handleClearMedia = () => {
    if (feedFilePreview) {
      URL.revokeObjectURL(feedFilePreview);
    }
    setFeedFile(null);
    setFeedFilePreview(null);
    setFeedFileType(null);
    setFeedVideoDuration(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (photoInputRef.current) photoInputRef.current.value = '';
    if (videoInputRef.current) videoInputRef.current.value = '';
  };

  const handleCreateFeedPost = async (e) => {
    e.preventDefault();
    if (!feedPetId) {
      alert('Selecione um pet para postar.');
      return;
    }

    if (!feedFile && !feedImageUrl.trim()) {
      alert('Por favor, tire/envie uma foto ou vídeo do pet, ou forneça um link de imagem/vídeo.');
      return;
    }

    setPostingFeed(true);
    setUploadStatus('Preparando envio...');

    try {
      let finalMediaUrl = feedImageUrl.trim();

      // Se há um arquivo do celular selecionado (foto ou vídeo), faz o upload para o Supabase Storage
      if (feedFile) {
        setUploadStatus(feedFileType === 'video' ? 'Enviando vídeo do pet para a nuvem...' : 'Enviando foto do pet para a nuvem...');

        const rawExt = feedFile.name.split('.').pop()?.toLowerCase() || (feedFileType === 'video' ? 'mp4' : 'jpg');
        const safeExt = rawExt.replace(/[^a-z0-9]/g, '') || (feedFileType === 'video' ? 'mp4' : 'jpg');
        const timestamp = Date.now();
        const fileName = `feed_${feedPetId}_${timestamp}.${safeExt}`;
        const filePath = `posts/${fileName}`;

        const contentType = feedFile.type || (feedFileType === 'video' ? 'video/mp4' : 'image/jpeg');

        const { data: uploadData, error: uploadErr } = await supabase.storage
          .from('pet-media')
          .upload(filePath, feedFile, {
            cacheControl: '3600',
            upsert: false,
            contentType: contentType
          });

        if (uploadErr) {
          console.error('Erro no upload de mídia:', uploadErr);
          throw new Error('Falha ao enviar a mídia para o servidor: ' + (uploadErr.message || ''));
        }

        const { data: publicUrlData } = supabase.storage
          .from('pet-media')
          .getPublicUrl(filePath);

        finalMediaUrl = publicUrlData.publicUrl;

        // Se for vídeo e por ventura a extensão for ambígua, anexa marcador
        if (feedFileType === 'video' && !/\.(mp4|mov|webm|m4v)$/i.test(finalMediaUrl)) {
          finalMediaUrl += '?type=video';
        }
      }

      if (!finalMediaUrl) {
        finalMediaUrl = '/Images/site/252.jpg';
      }

      setUploadStatus('Publicando no feed do tutor...');

      const { data: newPost, error } = await supabase
        .from('pet_feed_posts')
        .insert([
          {
            pet_id: feedPetId,
            image_url: finalMediaUrl,
            caption: feedCaption.trim(),
            meal_ok: feedMealOk,
            meds_ok: feedMedsOk,
            playtime_ok: feedPlaytimeOk,
          },
        ])
        .select(`
          *,
          pets (name, breed, profiles:tutor_id (full_name))
        `)
        .single();

      if (error) throw error;

      alert(`🎉 Atualização publicada no Feed do Tutor com sucesso! (${feedFileType === 'video' ? 'Vídeo' : 'Foto'})`);

      if (newPost) {
        setFeedPostsList([newPost, ...feedPostsList]);
      }

      // Limpa os estados
      setFeedCaption('');
      setFeedImageUrl('');
      handleClearMedia();
    } catch (err) {
      console.error('Erro ao postar feed:', err);
      alert('Erro ao publicar post: ' + (err.message || 'Erro desconhecido.'));
    } finally {
      setPostingFeed(false);
      setUploadStatus('');
    }
  };

  const handleDeleteFeedPost = async (post) => {
    const petName = post.pets?.name || 'este hóspede';
    if (!window.confirm(`Deseja realmente excluir esta postagem do feed do pet ${petName}?`)) {
      return;
    }

    setDeletingPostId(post.id);
    try {
      const { error } = await supabase
        .from('pet_feed_posts')
        .delete()
        .eq('id', post.id);

      if (error) throw error;

      // Se a mídia estiver no storage pet-media, tenta limpá-la silenciosamente
      if (post.image_url && post.image_url.includes('pet-media')) {
        try {
          const parts = post.image_url.split('/pet-media/');
          if (parts[1]) {
            const storagePath = parts[1].split('?')[0];
            await supabase.storage.from('pet-media').remove([storagePath]);
          }
        } catch (errStorage) {
          console.warn('Mídia já removida ou inacessível no storage:', errStorage);
        }
      }

      setFeedPostsList(feedPostsList.filter(p => p.id !== post.id));
      alert('Postagem excluída com sucesso.');
    } catch (err) {
      console.error('Erro ao excluir postagem:', err);
      alert('Erro ao excluir postagem: ' + (err.message || ''));
    } finally {
      setDeletingPostId(null);
    }
  };

  const updateBookingStatus = async (id, status) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ booking_status: status })
        .eq('id', id);

      if (error) throw error;
      setBookings(bookings.map(b => b.id === id ? { ...b, booking_status: status } : b));
    } catch (err) {
      console.error('Erro ao atualizar status da reserva:', err);
    }
  };

  const updateBookingPaymentStatus = async (id, status) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ payment_status: status })
        .eq('id', id);

      if (error) throw error;
      setBookings(bookings.map(b => b.id === id ? { ...b, payment_status: status } : b));
    } catch (err) {
      console.error('Erro ao atualizar pagamento da reserva:', err);
    }
  };

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    if (!newTransDesc.trim() || !newTransAmount) return;

    try {
      const { data, error } = await supabase
        .from('financial_transactions')
        .insert([
          {
            description: newTransDesc.trim(),
            amount: parseFloat(newTransAmount),
            type: newTransType,
            status: newTransStatus,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      setTransactions([data, ...transactions]);
      setNewTransDesc('');
      setNewTransAmount('');
    } catch (err) {
      console.error('Erro ao adicionar receita:', err);
    }
  };

  const toggleTransactionStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'pago' ? 'pendente' : 'pago';
    try {
      const { error } = await supabase
        .from('financial_transactions')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      setTransactions(transactions.map(t => t.id === id ? { ...t, status: newStatus } : t));
    } catch (err) {
      console.error('Erro ao alterar status:', err);
    }
  };

  const markMessageAsRead = async (id) => {
    try {
      const { error } = await supabase
        .from('tutor_messages')
        .update({ is_read_by_admin: true })
        .eq('id', id);

      if (error) throw error;
      setMessages(messages.map(m => m.id === id ? { ...m, is_read_by_admin: true } : m));
    } catch (err) {
      console.error('Erro ao marcar lido:', err);
    }
  };

  const filteredPets = pets.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.profiles?.full_name && p.profiles.full_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalReceived = transactions.filter(t => t.status === 'pago').reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0);
  const totalPending = transactions.filter(t => t.status === 'pendente').reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Admin Header */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 border-2 border-amber-400">
        <div>
          <span className="bg-amber-500 text-gray-950 text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider">
            Painel Administrativo • Hotel Quintal dos Animais
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold mt-2 tracking-tight">
            Gestão do Hotel (Geraldo Gomes) 🐾
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">
            Agenda de reservas, controle de hóspedes, publicação de diário e fluxo financeiro.
          </p>
        </div>

        <button
          onClick={signOut}
          className="bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold text-xs px-6 py-3 rounded-full transition-colors cursor-pointer shrink-0"
        >
          Sair da Conta
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-gray-200 gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('hospedes')}
          className={`py-3 px-5 rounded-t-2xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            activeTab === 'hospedes' ? 'bg-amber-500 text-gray-950 shadow-xs' : 'bg-white text-gray-600 hover:bg-amber-50'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>🐾 Hóspedes & Fichas ({pets.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('agenda')}
          className={`py-3 px-5 rounded-t-2xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            activeTab === 'agenda' ? 'bg-amber-500 text-gray-950 shadow-xs' : 'bg-white text-gray-600 hover:bg-amber-50'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>📅 Agenda & Reservas ({bookings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('feed')}
          className={`py-3 px-5 rounded-t-2xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            activeTab === 'feed' ? 'bg-amber-500 text-gray-950 shadow-xs' : 'bg-white text-gray-600 hover:bg-amber-50'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>📸 Publicar no Feed</span>
        </button>

        <button
          onClick={() => setActiveTab('financeiro')}
          className={`py-3 px-5 rounded-t-2xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            activeTab === 'financeiro' ? 'bg-amber-500 text-gray-950 shadow-xs' : 'bg-white text-gray-600 hover:bg-amber-50'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>💰 Painel Financeiro</span>
        </button>

        <button
          onClick={() => setActiveTab('recados')}
          className={`py-3 px-5 rounded-t-2xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            activeTab === 'recados' ? 'bg-amber-500 text-gray-950 shadow-xs' : 'bg-white text-gray-600 hover:bg-amber-50'
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          <span>💬 Recados ({messages.filter(m => !m.is_read_by_admin).length} novos)</span>
        </button>
      </div>

      {/* TAB 1: HÓSPEDES & FICHAS */}
      {activeTab === 'hospedes' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-amber-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-extrabold text-gray-900">
                Central de Hóspedes Cadastrados
              </h3>
              <p className="text-xs text-gray-600">
                Consulte as especificações de ração, remédios com relógio despertador e cuidados de cada pet.
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar pet ou tutor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPets.map((pet) => {
              const form = healthForms[pet.id];
              return (
                <div key={pet.id} className="bg-white rounded-3xl p-6 border border-amber-200 shadow-md flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-extrabold text-gray-900">🐕 {pet.name}</h4>
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase">
                        {pet.breed || 'SRD'}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-gray-600">
                      Tutor(a): <strong className="text-gray-900">{pet.profiles?.full_name || 'N/A'}</strong>
                    </p>
                    <p className="text-xs text-gray-500">
                      WhatsApp: {pet.profiles?.phone || 'N/A'}
                    </p>

                    <div className="mt-4 pt-3 border-t border-amber-100 space-y-2 text-xs text-gray-700">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold">🥣 Ração:</span>
                        <span>{form?.food_brand ? `${form.food_brand} (${form.food_portion_grams || 'N/I'}g)` : 'Não informada'}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="font-bold">⏰ Horários:</span>
                        <span className="font-extrabold text-amber-800">{form?.feeding_schedule || 'Não definidos'}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="font-bold">💊 Remédio:</span>
                        {form?.takes_medication ? (
                          <span className="bg-red-100 text-red-800 font-extrabold px-2 py-0.5 rounded-md text-[10px]">
                            SIM: {form.medication_details}
                          </span>
                        ) : (
                          <span className="text-emerald-700 font-medium">Não utiliza</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedPetForm({ pet, form })}
                    className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-amber-400" />
                    <span>Ver Ficha Completa</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal Ficha Completa */}
      {selectedPetForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-md">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-amber-200 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-xs uppercase font-extrabold text-amber-700">Ficha Técnica de Saúde</span>
                <h3 className="text-2xl font-extrabold text-gray-900">🐕 {selectedPetForm.pet.name}</h3>
              </div>
              <button
                onClick={() => setSelectedPetForm(null)}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs cursor-pointer"
              >
                ✕ Fechar
              </button>
            </div>

            {selectedPetForm.form ? (
              <div className="space-y-4 text-xs">
                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-1">
                  <h4 className="font-extrabold text-amber-900 text-sm">🥣 Alimentação & Horários (Relógio)</h4>
                  <p><strong>Marca:</strong> {selectedPetForm.form.food_brand || 'Não informada'}</p>
                  <p><strong>Porção:</strong> {selectedPetForm.form.food_portion_grams ? `${selectedPetForm.form.food_portion_grams}g por refeição` : 'N/I'}</p>
                  <p className="text-sm font-extrabold text-amber-950 mt-1">
                    ⏰ Horários Selecionados: {selectedPetForm.form.feeding_schedule || 'Não configurados'}
                  </p>
                </div>

                <div className="bg-red-50 p-4 rounded-2xl border border-red-200 space-y-1">
                  <h4 className="font-extrabold text-red-900 text-sm">💊 Medicamentos</h4>
                  <p><strong>Usa Remédios?</strong> {selectedPetForm.form.takes_medication ? 'SIM 🔴' : 'NÃO 🟢'}</p>
                  {selectedPetForm.form.takes_medication && (
                    <p className="font-bold text-red-800">{selectedPetForm.form.medication_details}</p>
                  )}
                </div>

                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-1">
                  <h4 className="font-extrabold text-gray-900 text-sm">🏥 Veterinário & Alergias</h4>
                  <p><strong>Alergias:</strong> {selectedPetForm.form.allergies || 'Nenhuma declarada'}</p>
                  <p><strong>Vet Responsável:</strong> {selectedPetForm.form.vet_name} ({selectedPetForm.form.vet_phone})</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-1">
                  <h4 className="font-extrabold text-gray-900 text-sm">🧠 Comportamento e Cuidados</h4>
                  <p><strong>Comportamento:</strong> {selectedPetForm.form.behavior_notes || 'Nenhum relato'}</p>
                  <p><strong>Instruções:</strong> {selectedPetForm.form.special_care || 'Nenhuma instrução'}</p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-gray-500 italic text-center py-6">
                Este pet ainda não possui Ficha de Saúde preenchida pelo tutor.
              </p>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: AGENDA & RESERVAS */}
      {activeTab === 'agenda' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-amber-200 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="text-xl font-extrabold text-gray-900">
                Agenda Operacional de Reservas
              </h3>
              <p className="text-xs text-gray-600">
                Acompanhe o calendário de check-ins, check-outs e solicitações de reservas antecipadas (com 5% OFF).
              </p>
            </div>
            <button
              onClick={loadAllData}
              className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200 hover:bg-amber-100 cursor-pointer"
            >
              🔄 Atualizar Agenda
            </button>
          </div>

          {bookings.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-amber-200 space-y-3">
              <Calendar className="w-12 h-12 text-amber-500 mx-auto" />
              <h4 className="text-lg font-bold text-gray-900">Nenhuma reserva agendada ainda</h4>
              <p className="text-xs text-gray-600">
                As reservas solicitadas pelos tutores aparecerão aqui com data de check-in, check-out e opção de desconto antecipado.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((b) => (
                <div key={b.id} className="bg-white rounded-3xl p-6 border border-amber-200 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
                  
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-lg font-extrabold text-gray-900">🐕 {b.pets?.name || 'Pet'}</span>
                      <span className="bg-amber-100 text-amber-900 text-xs font-extrabold px-3 py-0.5 rounded-full uppercase">
                        {b.service_type}
                      </span>
                      {b.payment_status === 'prepaid_pending_verification' || b.payment_status === 'pendente_desconto_5' ? (
                        <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-extrabold px-3 py-0.5 rounded-full">
                          🎉 5% OFF Pix Antecipado (Aguardando Verificação)
                        </span>
                      ) : b.payment_status === 'pago' ? (
                        <span className="bg-emerald-600 text-white text-xs font-extrabold px-3 py-0.5 rounded-full">
                          🟢 Pago
                        </span>
                      ) : (
                        <span className="bg-amber-200 text-amber-900 text-xs font-extrabold px-3 py-0.5 rounded-full">
                          🪙 Pagamento no Check-in (Integral)
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-gray-700">
                      👤 <strong>Tutor(a):</strong> {b.profiles?.full_name || 'N/A'} ({b.profiles?.phone || 'N/I'})
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-800 bg-gray-50 p-3 rounded-2xl border border-gray-200">
                      <span>📥 Check-in: <strong>{new Date(b.check_in).toLocaleString('pt-BR')}</strong></span>
                      <span>📤 Check-out: <strong>{new Date(b.check_out).toLocaleString('pt-BR')}</strong></span>
                    </div>

                    {b.notes && (
                      <p className="text-xs text-gray-600 italic">
                        📝 {b.notes}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:items-end justify-between gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                    <span className="text-2xl font-extrabold text-emerald-700">
                      R$ {parseFloat(b.total_price).toFixed(2)}
                    </span>

                    <div className="flex flex-wrap items-center gap-2">
                      {b.payment_status !== 'pago' && (
                        <button
                          onClick={() => updateBookingPaymentStatus(b.id, 'pago')}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer"
                        >
                          ✓ Confirmar Pagamento
                        </button>
                      )}

                      {b.booking_status !== 'concluido' && (
                        <button
                          onClick={() => updateBookingStatus(b.id, 'concluido')}
                          className="bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer"
                        >
                          Concluir Estadia
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* TAB 3: PUBLICAR NO FEED (FOTOS & VÍDEOS DE 15S DO CELULAR) */}
      {activeTab === 'feed' && (
        <div className="space-y-8 max-w-4xl mx-auto">
          
          {/* Card Principal de Publicação */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
              <div>
                <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  Mídia Direto do Celular 📱
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-1 flex items-center gap-2">
                  <Camera className="w-6 h-6 text-amber-500" />
                  <span>Publicar no Feed do Tutor</span>
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  Grave vídeos curtos de ~15 segundos ou tire fotos diretamente do seu celular para encantar os tutores.
                </p>
              </div>

              <button
                type="button"
                onClick={loadAllData}
                className="self-start sm:self-auto text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-full flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Atualizar</span>
              </button>
            </div>

            <form onSubmit={handleCreateFeedPost} className="space-y-6">
              
              {/* Seleção do Pet */}
              <div>
                <label className="block text-xs font-extrabold text-gray-800 uppercase tracking-wide mb-1.5">
                  1. Selecione o Pet Hóspede *
                </label>
                <select
                  required
                  value={feedPetId}
                  onChange={(e) => setFeedPetId(e.target.value)}
                  className="w-full p-3.5 bg-gray-50 border-2 border-gray-200 focus:border-amber-500 rounded-2xl text-xs sm:text-sm font-bold text-gray-900 transition-colors"
                >
                  <option value="">-- Toque para selecionar o pet hóspede --</option>
                  {pets.map(p => (
                    <option key={p.id} value={p.id}>
                      🐕 {p.name} ({p.breed || 'SRD'}) • Tutor: {p.profiles?.full_name || 'N/I'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Seção de Upload de Mídia (Foto ou Vídeo do Celular) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-extrabold text-gray-800 uppercase tracking-wide">
                    2. Foto ou Vídeo do Pet *
                  </label>
                  <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    🎬 Suporta Vídeos de ~15s e Fotos
                  </span>
                </div>

                {/* Inputs de arquivo ocultos acionados pelos botões grandes */}
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileSelect(e, 'image')}
                  className="hidden"
                />
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileSelect(e, 'video')}
                  className="hidden"
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {/* Se nenhuma mídia selecionada ainda */}
                {!feedFilePreview && !feedImageUrl ? (
                  <div className="space-y-3">
                    {/* Botões Rápidos e Grandes para Celular */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      
                      {/* Botão Foto */}
                      <button
                        type="button"
                        onClick={() => photoInputRef.current?.click()}
                        className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-dashed border-amber-400 hover:border-amber-600 hover:bg-amber-100/50 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all transform active:scale-95 group text-center"
                      >
                        <div className="w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                          <Camera className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="block font-extrabold text-sm text-gray-900">
                            📸 Tirar Foto / Galeria
                          </span>
                          <span className="block text-[11px] text-gray-500 mt-0.5">
                            Câmera ou foto do celular (JPG, PNG)
                          </span>
                        </div>
                      </button>

                      {/* Botão Vídeo */}
                      <button
                        type="button"
                        onClick={() => videoInputRef.current?.click()}
                        className="p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-dashed border-purple-400 hover:border-purple-600 hover:bg-purple-100/50 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all transform active:scale-95 group text-center"
                      >
                        <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                          <Video className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="block font-extrabold text-sm text-gray-900">
                            🎥 Gravar Vídeo / Galeria
                          </span>
                          <span className="block text-[11px] text-gray-500 mt-0.5">
                            Vídeo de até ~15-30s do pet (MP4, MOV)
                          </span>
                        </div>
                      </button>

                    </div>

                    {/* Alternativa: Colar Link URL */}
                    <div className="text-center pt-1">
                      <button
                        type="button"
                        onClick={() => setShowUrlInput(!showUrlInput)}
                        className="text-xs font-semibold text-gray-500 hover:text-amber-700 inline-flex items-center gap-1.5 cursor-pointer underline underline-offset-4"
                      >
                        <Link2 className="w-3.5 h-3.5" />
                        <span>{showUrlInput ? 'Ocultar opção de link' : 'Ou colar link de imagem/vídeo da internet'}</span>
                      </button>
                    </div>

                    {showUrlInput && (
                      <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200 space-y-1 animate-fadeIn">
                        <label className="block text-[11px] font-bold text-gray-700">Link URL direto:</label>
                        <input
                          type="url"
                          placeholder="https://exemplo.com/video.mp4 ou foto.jpg"
                          value={feedImageUrl}
                          onChange={(e) => setFeedImageUrl(e.target.value)}
                          className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs font-mono"
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  /* Pré-visualização da Mídia Selecionada */
                  <div className="bg-gray-900 rounded-3xl p-4 sm:p-6 border-2 border-amber-400 shadow-xl space-y-4 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {feedFileType === 'video' || isVideoMedia(feedImageUrl) ? (
                          <span className="bg-purple-600 text-white text-xs font-extrabold px-3 py-1 rounded-full flex items-center gap-1">
                            <Video className="w-3.5 h-3.5" /> Vídeo Pronto
                          </span>
                        ) : (
                          <span className="bg-amber-500 text-gray-950 text-xs font-extrabold px-3 py-1 rounded-full flex items-center gap-1">
                            <Camera className="w-3.5 h-3.5" /> Foto Pronta
                          </span>
                        )}
                        {feedFile && (
                          <span className="text-xs text-gray-300 font-mono">
                            {formatFileSize(feedFile.size)}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={handleClearMedia}
                        className="bg-red-500/20 hover:bg-red-500 text-red-200 hover:text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Trocar / Remover</span>
                      </button>
                    </div>

                    {/* Player ou Imagem */}
                    <div className="rounded-2xl overflow-hidden bg-black flex items-center justify-center max-h-80">
                      {feedFileType === 'video' || isVideoMedia(feedImageUrl) ? (
                        <video
                          src={feedFilePreview || feedImageUrl}
                          controls
                          playsInline
                          preload="metadata"
                          onLoadedMetadata={(e) => setFeedVideoDuration(e.target.duration)}
                          className="w-full max-h-80 object-contain"
                        />
                      ) : (
                        <img
                          src={feedFilePreview || feedImageUrl}
                          alt="Pré-visualização do pet"
                          className="w-full max-h-80 object-contain"
                        />
                      )}
                    </div>

                    {/* Dicas e Duração de Vídeo */}
                    {feedFileType === 'video' && (
                      <div className="text-xs bg-white/10 p-3 rounded-xl flex items-center justify-between text-gray-200">
                        <span>
                          ⏱️ Duração do vídeo: <strong>{feedVideoDuration ? `${Math.round(feedVideoDuration)} segundos` : 'Detectando...'}</strong>
                        </span>
                        {feedVideoDuration && feedVideoDuration > 30 ? (
                          <span className="text-amber-400 font-bold">
                            ⚠️ Dica: vídeos de até 15-20s são ideais
                          </span>
                        ) : (
                          <span className="text-emerald-400 font-bold">
                            ✓ Duração perfeita!
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Checklists Rápidos da Rotina */}
              <div className="space-y-2 bg-gradient-to-r from-amber-50 to-orange-50 p-4 sm:p-5 rounded-2xl border border-amber-200">
                <span className="block text-xs font-extrabold text-amber-950 uppercase tracking-wide">
                  3. Checklists Rápidos da Rotina de Hoje:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  
                  <label className="flex items-center gap-2.5 p-2.5 bg-white rounded-xl border border-amber-200 cursor-pointer shadow-xs hover:border-emerald-500 transition-colors">
                    <input
                      type="checkbox"
                      checked={feedMealOk}
                      onChange={(e) => setFeedMealOk(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded-sm cursor-pointer"
                    />
                    <span className="text-xs font-bold text-gray-800">🥣 Alimentação OK</span>
                  </label>

                  <label className="flex items-center gap-2.5 p-2.5 bg-white rounded-xl border border-amber-200 cursor-pointer shadow-xs hover:border-blue-500 transition-colors">
                    <input
                      type="checkbox"
                      checked={feedMedsOk}
                      onChange={(e) => setFeedMedsOk(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded-sm cursor-pointer"
                    />
                    <span className="text-xs font-bold text-gray-800">💊 Medicação OK</span>
                  </label>

                  <label className="flex items-center gap-2.5 p-2.5 bg-white rounded-xl border border-amber-200 cursor-pointer shadow-xs hover:border-amber-500 transition-colors">
                    <input
                      type="checkbox"
                      checked={feedPlaytimeOk}
                      onChange={(e) => setFeedPlaytimeOk(e.target.checked)}
                      className="w-4 h-4 text-amber-600 rounded-sm cursor-pointer"
                    />
                    <span className="text-xs font-bold text-gray-800">🐕 Recreação OK</span>
                  </label>

                </div>
              </div>

              {/* Legenda do Momento */}
              <div>
                <label className="block text-xs font-extrabold text-gray-800 uppercase tracking-wide mb-1.5">
                  4. Legenda / Recado para o Tutor (Opcional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Ex: Rex passou a manhã correndo no gramado com os amigos e já almoçou toda a ração!"
                  value={feedCaption}
                  onChange={(e) => setFeedCaption(e.target.value)}
                  className="w-full p-3.5 bg-gray-50 border-2 border-gray-200 focus:border-amber-500 rounded-2xl text-xs sm:text-sm font-medium transition-colors"
                />
              </div>

              {/* Botão de Envio com Status */}
              <div>
                <button
                  type="submit"
                  disabled={postingFeed}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-gray-950 font-extrabold text-sm sm:text-base rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer transform active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {postingFeed ? (
                    <>
                      <div className="w-5 h-5 border-2 border-gray-950 border-t-transparent rounded-full animate-spin" />
                      <span>{uploadStatus || 'Enviando mídia e publicando...'}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Publicar no Feed do Tutor ({feedFileType === 'video' ? 'Vídeo 🎥' : 'Foto 📸'})</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

          {/* Histórico de Postagens Recentes no Feed */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-lg space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
              <div>
                <h4 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
                  <span>📋 Publicações Recentes no Feed</span>
                  <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2.5 py-0.5 rounded-full">
                    {feedPostsList.length}
                  </span>
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Veja o que os tutores estão visualizando e exclua publicações caso necessário.
                </p>
              </div>
            </div>

            {feedPostsList.length === 0 ? (
              <div className="text-center py-10 text-gray-500 text-xs italic">
                Nenhuma publicação no feed encontrada ainda.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {feedPostsList.map((post) => {
                  const isVid = isVideoMedia(post.image_url);
                  return (
                    <div
                      key={post.id}
                      className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
                    >
                      {/* Área de Mídia */}
                      <div className="relative bg-black w-full overflow-hidden">
                        {isVid ? (
                          <div className="aspect-video w-full flex items-center justify-center bg-black">
                            <video
                              src={post.image_url}
                              controls
                              playsInline
                              preload="metadata"
                              className="w-full h-full object-contain"
                            />
                            <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 pointer-events-none">
                              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                              <span>Vídeo 🎥</span>
                            </div>
                          </div>
                        ) : (
                          <div className="relative h-56 w-full">
                            <img
                              src={post.image_url || '/Images/site/252.jpg'}
                              alt="Foto do post"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 pointer-events-none">
                              <span>Foto 📸</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Conteúdo do Post */}
                      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-extrabold text-gray-900">
                              🐕 {post.pets?.name || 'Pet Hóspede'}
                            </span>
                            <span className="text-[10px] text-gray-500 font-semibold">
                              {new Date(post.created_at).toLocaleString('pt-BR')}
                            </span>
                          </div>

                          {post.pets?.profiles?.full_name && (
                            <span className="block text-[11px] text-gray-600">
                              Tutor(a): <strong>{post.pets.profiles.full_name}</strong>
                            </span>
                          )}

                          {/* Checklists */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {post.meal_ok && (
                              <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full border border-emerald-300">
                                🥣 Alimentação OK
                              </span>
                            )}
                            {post.meds_ok && (
                              <span className="text-[10px] font-extrabold bg-blue-100 text-blue-900 px-2 py-0.5 rounded-full border border-blue-300">
                                💊 Medicação OK
                              </span>
                            )}
                            {post.playtime_ok && (
                              <span className="text-[10px] font-extrabold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300">
                                🐕 Recreação OK
                              </span>
                            )}
                          </div>

                          {post.caption && (
                            <p className="text-xs text-gray-700 font-medium leading-relaxed bg-white p-3 rounded-xl border border-gray-100">
                              "{post.caption}"
                            </p>
                          )}
                        </div>

                        {/* Botão de Excluir */}
                        <div className="pt-3 border-t border-gray-200 flex justify-end">
                          <button
                            type="button"
                            onClick={() => handleDeleteFeedPost(post)}
                            disabled={deletingPostId === post.id}
                            className="text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-xl border border-red-200 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>{deletingPostId === post.id ? 'Excluindo...' : 'Excluir Postagem'}</span>
                          </button>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      )}

      {/* TAB 4: PAINEL FINANCEIRO */}
      {activeTab === 'financeiro' && (
        <div className="space-y-6">
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-emerald-500 text-white rounded-3xl p-6 shadow-lg space-y-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-100">Total Recebido (Pago)</span>
              <p className="text-3xl font-extrabold">R$ {totalReceived.toFixed(2)}</p>
            </div>
            <div className="bg-amber-500 text-gray-950 rounded-3xl p-6 shadow-lg space-y-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-950">Pendências de Pagamento</span>
              <p className="text-3xl font-extrabold">R$ {totalPending.toFixed(2)}</p>
            </div>
          </div>

          {/* Form Add Transaction */}
          <div className="bg-white rounded-3xl p-6 border border-amber-200 shadow-md">
            <h4 className="text-sm font-extrabold uppercase text-gray-900 mb-3">Adicionar Novo Lançamento Financeiro</h4>
            <form onSubmit={handleAddTransaction} className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              <input
                type="text"
                required
                placeholder="Descrição (ex: Diária Rex, Banho extra)"
                value={newTransDesc}
                onChange={(e) => setNewTransDesc(e.target.value)}
                className="sm:col-span-2 p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
              />
              <input
                type="number"
                step="0.01"
                required
                placeholder="Valor R$"
                value={newTransAmount}
                onChange={(e) => setNewTransAmount(e.target.value)}
                className="p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
              />
              <select
                value={newTransStatus}
                onChange={(e) => setNewTransStatus(e.target.value)}
                className="p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold"
              >
                <option value="pago">🟢 Pago</option>
                <option value="pendente">🟡 Pendente</option>
              </select>
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-gray-950 font-extrabold py-2.5 rounded-xl text-xs shadow-sm transition-all cursor-pointer"
              >
                + Registrar
              </button>
            </form>
          </div>

          {/* Transactions List */}
          <div className="bg-white rounded-3xl p-6 border border-amber-200 shadow-md space-y-3">
            <h4 className="text-sm font-extrabold uppercase text-gray-900">Histórico de Lançamentos:</h4>
            {transactions.length === 0 ? (
              <p className="text-xs text-gray-500 italic">Nenhum lançamento financeiro registrado.</p>
            ) : (
              transactions.map(t => (
                <div key={t.id} className="flex items-center justify-between p-3.5 bg-gray-50 rounded-2xl border border-gray-200 text-xs">
                  <div>
                    <span className="block font-bold text-gray-900">{t.description}</span>
                    <span className="text-[10px] text-gray-500">{new Date(t.created_at).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-extrabold text-sm text-gray-900">R$ {parseFloat(t.amount).toFixed(2)}</span>
                    <button
                      onClick={() => toggleTransactionStatus(t.id, t.status)}
                      className={`px-3 py-1 rounded-full font-extrabold text-[10px] cursor-pointer ${
                        t.status === 'pago' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}
                    >
                      {t.status === 'pago' ? '🟢 Pago' : '🟡 Pendente'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      )}

      {/* TAB 5: RECADOS DOS TUTORES */}
      {activeTab === 'recados' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-md space-y-4">
          <h3 className="text-xl font-extrabold text-gray-900">
            Inbox de Recados Enviados pelos Tutores
          </h3>
          {messages.length === 0 ? (
            <p className="text-xs text-gray-500 italic">Nenhum recado recebido.</p>
          ) : (
            messages.map((m) => (
              <div key={m.id} className={`p-4 rounded-2xl border text-xs space-y-2 ${m.is_read_by_admin ? 'bg-gray-50 border-gray-200' : 'bg-amber-50 border-amber-300'}`}>
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-gray-900">
                    👤 {m.profiles?.full_name || 'Tutor'} ({m.profiles?.phone})
                  </span>
                  <span className="text-[10px] text-gray-500">{new Date(m.created_at).toLocaleString('pt-BR')}</span>
                </div>
                <p className="text-gray-800 font-medium">{m.message}</p>
                {!m.is_read_by_admin && (
                  <button
                    onClick={() => markMessageAsRead(m.id)}
                    className="text-[10px] font-bold bg-amber-500 text-gray-950 px-3 py-1 rounded-full shadow-xs cursor-pointer"
                  >
                    ✓ Marcar como Lido
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
}
