import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Heart, Plus, Edit2, Camera, ShieldCheck, CheckCircle2, MessageCircle, Clock, Sparkles, Send, User, AlertCircle, FileText, Calendar, Tag, DollarSign, ArrowRight, Video, Play, X, Maximize2 } from 'lucide-react';
import { isVideoMedia } from '../lib/mediaUtils';

export default function TutorPortal() {
  const { user, profile, signOut } = useAuth();
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [activeTab, setActiveTab] = useState('ficha'); // 'ficha', 'feed', 'reserva', 'recados'

  // Health Form State
  const [healthForm, setHealthForm] = useState({
    food_brand: '',
    food_portion_grams: '',
    takes_medication: false,
    medication_details: '',
    allergies: '',
    vet_name: '',
    vet_phone: '',
    behavior_notes: '',
    special_care: '',
  });

  // Time Picker State for Meals
  const [mealsPerDay, setMealsPerDay] = useState(2);
  const [mealTimes, setMealTimes] = useState(['08:00', '18:00']);

  // Feed Posts State
  const [feedPosts, setFeedPosts] = useState([]);
  const [selectedMediaModal, setSelectedMediaModal] = useState(null);

  // Tutor Messages State
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Booking / Reservation State
  const [bookingsList, setBookingsList] = useState([]);
  const [bookingService, setBookingService] = useState('hospedagem');
  const [bookingCheckIn, setBookingCheckIn] = useState('');
  const [bookingCheckOut, setBookingCheckOut] = useState('');
  const [bookingNotes, setBookingNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('pix_antecipado'); // 'pix_antecipado' ou 'checkin_local'
  const [copiedPix, setCopiedPix] = useState(false);
  const [creatingBooking, setCreatingBooking] = useState(false);
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState('');

  // New Pet Modal
  const [showAddPet, setShowAddPet] = useState(false);
  const [newPet, setNewPet] = useState({ name: '', breed: '', age: '', weight: '' });
  const [petErrorMsg, setPetErrorMsg] = useState('');

  // Edit Pet Modal
  const [showEditPet, setShowEditPet] = useState(false);
  const [editingPet, setEditingPet] = useState({ id: null, name: '', breed: '', age: '', weight: '' });
  const [editPetErrorMsg, setEditPetErrorMsg] = useState('');
  const [updatingPet, setUpdatingPet] = useState(false);

  const [loading, setLoading] = useState(false);
  const [savingForm, setSavingForm] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [formErrorMsg, setFormErrorMsg] = useState('');
  const [showSaveSuccessModal, setShowSaveSuccessModal] = useState(false);
  const [formJustSaved, setFormJustSaved] = useState(false);

  useEffect(() => {
    if (user) {
      loadPets();
      loadBookings();
    }
  }, [user]);

  useEffect(() => {
    if (selectedPet) {
      loadHealthForm(selectedPet.id);
      loadFeedPosts(selectedPet.id);
      loadMessages(selectedPet.id);
    }
  }, [selectedPet]);

  const loadPets = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('pets')
        .select('*')
        .eq('tutor_id', user.id);

      if (error) throw error;
      setPets(data || []);
      if (data && data.length > 0 && !selectedPet) {
        setSelectedPet(data[0]);
      }
    } catch (err) {
      console.error('Erro ao carregar pets:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadHealthForm = async (petId) => {
    try {
      const { data, error } = await supabase
        .from('pet_health_forms')
        .select('*')
        .eq('pet_id', petId)
        .maybeSingle();

      if (data) {
        setHealthForm({
          food_brand: data.food_brand || '',
          food_portion_grams: data.food_portion_grams || '',
          takes_medication: data.takes_medication || false,
          medication_details: data.medication_details || '',
          allergies: data.allergies || '',
          vet_name: data.vet_name || '',
          vet_phone: data.vet_phone || '',
          behavior_notes: data.behavior_notes || '',
          special_care: data.special_care || '',
        });

        if (data.feeding_schedule) {
          const times = data.feeding_schedule.split(',').map(t => t.trim());
          setMealTimes(times);
          setMealsPerDay(times.length);
        } else {
          setMealTimes(['08:00', '18:00']);
          setMealsPerDay(2);
        }
      } else {
        setHealthForm({
          food_brand: '', food_portion_grams: '',
          takes_medication: false, medication_details: '', allergies: '',
          vet_name: '', vet_phone: '', behavior_notes: '', special_care: ''
        });
        setMealTimes(['08:00', '18:00']);
        setMealsPerDay(2);
      }
    } catch (err) {
      console.error('Erro ao carregar ficha de saúde:', err);
    }
  };

  const loadFeedPosts = async (petId) => {
    try {
      const { data, error } = await supabase
        .from('pet_feed_posts')
        .select('*')
        .eq('pet_id', petId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFeedPosts(data || []);
    } catch (err) {
      console.error('Erro ao carregar feed:', err);
    }
  };

  const loadMessages = async (petId) => {
    try {
      const { data, error } = await supabase
        .from('tutor_messages')
        .select('*')
        .eq('tutor_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      console.error('Erro ao carregar recados:', err);
    }
  };

  const loadBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          pets (name, breed)
        `)
        .eq('tutor_id', user.id)
        .order('check_in', { ascending: false });

      if (error) throw error;
      setBookingsList(data || []);
    } catch (err) {
      console.error('Erro ao carregar reservas:', err);
    }
  };

  const handleMealsCountChange = (count) => {
    const num = parseInt(count, 10);
    setMealsPerDay(num);
    const newTimes = [...mealTimes];
    while (newTimes.length < num) {
      newTimes.push(newTimes.length === 0 ? '08:00' : newTimes.length === 1 ? '18:00' : '12:00');
    }
    setMealTimes(newTimes.slice(0, num));
  };

  const handleMealTimeChange = (index, value) => {
    const updated = [...mealTimes];
    updated[index] = value;
    setMealTimes(updated);
  };

  const handleAddPet = async (e) => {
    e.preventDefault();
    setPetErrorMsg('');
    try {
      const payload = {
        tutor_id: user.id,
        name: newPet.name.trim(),
        breed: newPet.breed?.trim() || null,
        age: newPet.age ? parseInt(newPet.age, 10) : null,
        weight: newPet.weight ? parseFloat(newPet.weight) : null,
      };

      const { data, error } = await supabase
        .from('pets')
        .insert([payload])
        .select()
        .single();

      if (error) throw error;
      setPets([...pets, data]);
      setSelectedPet(data);
      setShowAddPet(false);
      setNewPet({ name: '', breed: '', age: '', weight: '' });
    } catch (err) {
      console.error('Erro ao adicionar pet:', err);
      setPetErrorMsg(err.message || 'Erro ao cadastrar pet.');
    }
  };

  const handleOpenEditPet = (pet, e) => {
    if (e) e.stopPropagation();
    setEditingPet({
      id: pet.id,
      name: pet.name || '',
      breed: pet.breed || '',
      age: pet.age !== null && pet.age !== undefined ? String(pet.age) : '',
      weight: pet.weight !== null && pet.weight !== undefined ? String(pet.weight) : '',
    });
    setEditPetErrorMsg('');
    setShowEditPet(true);
  };

  const handleUpdatePet = async (e) => {
    e.preventDefault();
    if (!editingPet.id) return;
    setUpdatingPet(true);
    setEditPetErrorMsg('');
    try {
      const payload = {
        name: editingPet.name.trim(),
        breed: editingPet.breed?.trim() || null,
        age: editingPet.age ? parseInt(editingPet.age, 10) : null,
        weight: editingPet.weight ? parseFloat(editingPet.weight) : null,
      };

      const { data, error } = await supabase
        .from('pets')
        .update(payload)
        .eq('id', editingPet.id)
        .select()
        .single();

      if (error) throw error;

      const updatedList = pets.map(p => p.id === data.id ? data : p);
      setPets(updatedList);
      if (selectedPet?.id === data.id) {
        setSelectedPet(data);
      }
      setShowEditPet(false);
    } catch (err) {
      console.error('Erro ao atualizar pet:', err);
      setEditPetErrorMsg(err.message || 'Erro ao atualizar informações do pet.');
    } finally {
      setUpdatingPet(false);
    }
  };

  const handleSaveHealthForm = async (e) => {
    e.preventDefault();
    if (!selectedPet) return;
    setSavingForm(true);
    setStatusMsg('');
    setFormErrorMsg('');

    try {
      const scheduleString = mealTimes.filter(t => t).join(', ');

      const payload = {
        pet_id: selectedPet.id,
        food_brand: healthForm.food_brand?.trim() || null,
        food_portion_grams: healthForm.food_portion_grams ? parseInt(healthForm.food_portion_grams, 10) : null,
        feeding_schedule: scheduleString || null,
        takes_medication: healthForm.takes_medication,
        medication_details: healthForm.takes_medication ? healthForm.medication_details?.trim() : null,
        allergies: healthForm.allergies?.trim() || null,
        vet_name: healthForm.vet_name?.trim() || null,
        vet_phone: healthForm.vet_phone?.trim() || null,
        behavior_notes: healthForm.behavior_notes?.trim() || null,
        special_care: healthForm.special_care?.trim() || null,
        updated_at: new Date().toISOString(),
      };

      // Check if existing record exists for this pet
      const { data: existing } = await supabase
        .from('pet_health_forms')
        .select('id')
        .eq('pet_id', selectedPet.id)
        .maybeSingle();

      let resultErr = null;

      if (existing) {
        const { error } = await supabase
          .from('pet_health_forms')
          .update(payload)
          .eq('pet_id', selectedPet.id);
        resultErr = error;
      } else {
        const { error } = await supabase
          .from('pet_health_forms')
          .insert([payload]);
        resultErr = error;
      }

      if (resultErr) throw resultErr;

      setStatusMsg('Ficha de Saúde salva com sucesso!');
      setShowSaveSuccessModal(true);
      setFormJustSaved(true);
      setTimeout(() => setFormJustSaved(false), 5000);
      setTimeout(() => setStatusMsg(''), 6000);
    } catch (err) {
      console.error('Erro ao salvar ficha:', err);
      setFormErrorMsg(err.message || 'Erro ao salvar ficha de saúde.');
    } finally {
      setSavingForm(false);
    }
  };

  // Price & Discount Calculation
  const calculatePricing = () => {
    if (!bookingCheckIn || !bookingCheckOut) return { days: 0, rawTotal: 0, discountedTotal: 0, savings: 0 };
    const start = new Date(bookingCheckIn);
    const end = new Date(bookingCheckOut);
    const diffTime = end - start;
    let days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (days <= 0) days = 1;

    const rate = bookingService === 'hospedagem' ? 70 : bookingService === 'daycare' ? 50 : 40;
    const rawTotal = days * rate;
    const discountedTotal = rawTotal * 0.95;
    const savings = rawTotal - discountedTotal;

    return { days, rawTotal, discountedTotal, savings };
  };

  const pricing = calculatePricing();

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    if (!selectedPet || !bookingCheckIn || !bookingCheckOut) return;
    setCreatingBooking(true);
    setBookingSuccessMsg('');

    try {
      const isPrepaid = paymentMethod === 'pix_antecipado';
      const finalPrice = isPrepaid ? pricing.discountedTotal : pricing.rawTotal;
      const noteDetails = `Reserva para ${selectedPet.name}. ${isPrepaid ? '🟢 Pré-pago via Pix (5% OFF Aplicado - Chave geraldo58936@gmail.com)' : '🟡 Pagamento no Check-in (Integral)'}. ${bookingNotes ? `Obs: ${bookingNotes}` : ''}`;

      const payload = {
        pet_id: selectedPet.id,
        tutor_id: user.id,
        service_type: bookingService,
        check_in: new Date(bookingCheckIn).toISOString(),
        check_out: new Date(bookingCheckOut).toISOString(),
        total_price: finalPrice,
        payment_status: isPrepaid ? 'prepaid_pending_verification' : 'checkin_pending',
        booking_status: 'confirmado',
        notes: noteDetails,
      };

      const { error } = await supabase.from('bookings').insert([payload]);
      if (error) throw error;

      if (isPrepaid) {
        setBookingSuccessMsg(`🎉 Reserva agendada com 5% OFF! Chave Pix do hotel: geraldo58936@gmail.com. Valor: R$ ${finalPrice.toFixed(2)}.`);
      } else {
        setBookingSuccessMsg(`🎉 Reserva agendada com sucesso! Pagamento integral de R$ ${finalPrice.toFixed(2)} será efetuado no check-in.`);
      }

      loadBookings();
      setBookingNotes('');
      setBookingCheckIn('');
      setBookingCheckOut('');
    } catch (err) {
      console.error('Erro ao agendar reserva:', err);
      alert('Erro ao agendar reserva. Verifique as datas.');
    } finally {
      setCreatingBooking(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    try {
      const { data: bookings } = await supabase
        .from('bookings')
        .select('id')
        .eq('tutor_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1);

      let bookingId = bookings && bookings.length > 0 ? bookings[0].id : null;

      const { data, error } = await supabase
        .from('tutor_messages')
        .insert([
          {
            booking_id: bookingId,
            tutor_id: user.id,
            message: newMessage.trim(),
            is_read_by_admin: false,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      setMessages([data, ...messages]);
      setNewMessage('');
    } catch (err) {
      console.error('Erro ao enviar recado:', err);
      alert('Erro ao enviar recado.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* Top Welcome Bar */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 rounded-3xl p-6 sm:p-8 text-gray-950 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border-2 border-amber-300">
        <div>
          <span className="bg-gray-950/15 text-gray-950 text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider">
            Portal do Tutor • Hotel Quintal dos Animais
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold mt-2 tracking-tight">
            Olá, {profile?.full_name || 'Tutor(a)'}! 🐾
          </h1>
          <p className="text-xs sm:text-sm font-medium text-amber-950 mt-1">
            Preencha a ficha do pet, agende estadias com desconto e acompanhe a rotina em tempo real.
          </p>
        </div>

        <button
          onClick={signOut}
          className="bg-gray-950 hover:bg-gray-900 text-white font-bold text-xs px-5 py-2.5 rounded-full transition-colors cursor-pointer shrink-0"
        >
          Sair da Conta
        </button>
      </div>

      {/* Select Pet Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-amber-200 shadow-sm">
        <div>
          <h2 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
            <Heart className="w-5 h-5 fill-amber-500 text-amber-500" />
            Seus Hóspedes Cadastrados
          </h2>
          <p className="text-xs text-gray-600">Selecione o pet para personalizar informações.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {pets.map((p) => (
            <div key={p.id} className="flex items-center gap-1">
              <button
                onClick={() => setSelectedPet(p)}
                className={`px-4 py-2 rounded-full font-bold text-xs transition-all flex items-center gap-2 cursor-pointer ${selectedPet?.id === p.id
                  ? 'bg-amber-500 text-gray-950 shadow-md ring-2 ring-amber-400'
                  : 'bg-gray-100 text-gray-700 hover:bg-amber-100'
                  }`}
              >
                <span>🐕 {p.name}</span>
                <span className="text-[10px] opacity-75">({p.breed || 'SRD'})</span>
              </button>
              <button
                onClick={(e) => handleOpenEditPet(p, e)}
                title={`Editar dados de ${p.name}`}
                className="p-2 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          <button
            onClick={() => setShowAddPet(true)}
            className="px-4 py-2 rounded-full font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Cadastrar Pet
          </button>
        </div>
      </div>

      {/* Add Pet Modal */}
      {showAddPet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-md">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-amber-200 shadow-2xl space-y-4">
            <h3 className="text-xl font-bold text-gray-900">Cadastrar Novo Pet</h3>
            <form onSubmit={handleAddPet} className="space-y-3">
              {petErrorMsg && (
                <div className="p-3 text-xs bg-red-50 text-red-700 rounded-xl border border-red-200 font-semibold">
                  ⚠️ {petErrorMsg}
                </div>
              )}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Nome do Pet</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Rex, Mel, Thor"
                  value={newPet.name}
                  onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Raça</label>
                <input
                  type="text"
                  placeholder="Ex: Golden Retriever, Vira-lata, Poodle"
                  value={newPet.breed}
                  onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Idade (Anos)</label>
                  <input
                    type="number"
                    placeholder="Ex: 3"
                    value={newPet.age}
                    onChange={(e) => setNewPet({ ...newPet, age: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Peso (Kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Ex: 12.5"
                    value={newPet.weight}
                    onChange={(e) => setNewPet({ ...newPet, weight: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddPet(false)}
                  className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-bold text-xs cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-amber-500 text-gray-950 rounded-xl font-bold text-xs cursor-pointer"
                >
                  Salvar Pet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Pet Modal */}
      {showEditPet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-md">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-amber-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Editar Dados do Pet</h3>
              <button
                type="button"
                onClick={() => setShowEditPet(false)}
                className="text-xs font-bold text-gray-500 hover:text-gray-900"
              >
                ✕ Fechar
              </button>
            </div>
            <form onSubmit={handleUpdatePet} className="space-y-3">
              {editPetErrorMsg && (
                <div className="p-3 text-xs bg-red-50 text-red-700 rounded-xl border border-red-200 font-semibold">
                  ⚠️ {editPetErrorMsg}
                </div>
              )}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Nome do Pet</label>
                <input
                  type="text"
                  required
                  value={editingPet.name}
                  onChange={(e) => setEditingPet({ ...editingPet, name: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Raça</label>
                <input
                  type="text"
                  value={editingPet.breed}
                  onChange={(e) => setEditingPet({ ...editingPet, breed: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Idade (Anos)</label>
                  <input
                    type="number"
                    value={editingPet.age}
                    onChange={(e) => setEditingPet({ ...editingPet, age: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Peso (Kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={editingPet.weight}
                    onChange={(e) => setEditingPet({ ...editingPet, weight: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowEditPet(false)}
                  className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-bold text-xs cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={updatingPet}
                  className="flex-1 py-2.5 bg-amber-500 text-gray-950 rounded-xl font-bold text-xs cursor-pointer"
                >
                  {updatingPet ? 'Atualizando...' : 'Salvar Alterações'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Pop-up de Confirmação: Ficha Salva com Sucesso */}
      {showSaveSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-md">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full border-2 border-emerald-400 shadow-2xl space-y-6 text-center">

            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full border border-emerald-300">
                ✅ CONFIRMAÇÃO DE SALVAMENTO
              </span>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight pt-1">
                Ficha de Saúde Salva!
              </h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Todas as alterações e informações de saúde de <strong>{selectedPet?.name}</strong> foram salvas com sucesso no banco de dados e já estão disponíveis para a equipe do hotel!
              </p>
            </div>

            <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 text-xs text-amber-900 font-bold flex items-center justify-center gap-2">
              <span>📋 Diário de Bordo Atualizado no Hotel</span>
            </div>

            <button
              onClick={() => setShowSaveSuccessModal(false)}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-extrabold text-sm shadow-lg hover:scale-105 transition-all cursor-pointer"
            >
              ✓ Entendido, Continuar
            </button>

          </div>
        </div>
      )}

      {selectedPet ? (
        <div className="space-y-6">

          {/* Main Navigation Tabs */}
          <div className="flex border-b border-amber-200 gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveTab('ficha')}
              className={`py-3 px-5 rounded-t-2xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shrink-0 ${activeTab === 'ficha'
                ? 'bg-amber-500 text-gray-950 shadow-xs'
                : 'bg-white text-gray-600 hover:bg-amber-50'
                }`}
            >
              <FileText className="w-4 h-4" />
              <span>📋 Diário de Bordo (Ficha de Saúde)</span>
            </button>

            <button
              onClick={() => setActiveTab('reserva')}
              className={`py-3 px-5 rounded-t-2xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shrink-0 ${activeTab === 'reserva'
                ? 'bg-amber-500 text-gray-950 shadow-xs'
                : 'bg-white text-gray-600 hover:bg-amber-50'
                }`}
            >
              <Calendar className="w-4 h-4" />
              <span>📅 Agendar Reserva (5% OFF)</span>
            </button>

            <button
              onClick={() => setActiveTab('feed')}
              className={`py-3 px-5 rounded-t-2xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shrink-0 ${activeTab === 'feed'
                ? 'bg-amber-500 text-gray-950 shadow-xs'
                : 'bg-white text-gray-600 hover:bg-amber-50'
                }`}
            >
              <Camera className="w-4 h-4" />
              <span>📸 Fotos & Vídeos ({feedPosts.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('recados')}
              className={`py-3 px-5 rounded-t-2xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shrink-0 ${activeTab === 'recados'
                ? 'bg-amber-500 text-gray-950 shadow-xs'
                : 'bg-white text-gray-600 hover:bg-amber-50'
                }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>💬 Mural de Recados</span>
            </button>
          </div>

          {/* TAB 1: FICHA DE SAÚDE & CUIDADOS */}
          {activeTab === 'ficha' && (
            <form onSubmit={handleSaveHealthForm} className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200 shadow-lg space-y-6">

              <div className="flex items-center justify-between border-b border-amber-100 pb-4">
                <div>
                  <h3 className="text-xl font-extrabold text-gray-900">
                    Ficha de Saúde de {selectedPet.name}
                  </h3>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Alimentação, medicação com relógio despertador e recomendações médicas.
                  </p>
                </div>

                {statusMsg && (
                  <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-full border border-emerald-300">
                    ✅ {statusMsg}
                  </span>
                )}
              </div>

              {formErrorMsg && (
                <div className="p-3 text-xs bg-red-50 text-red-700 rounded-xl border border-red-200 font-semibold">
                  ⚠️ {formErrorMsg}
                </div>
              )}

              {/* Alimentação */}
              <div className="space-y-4">
                <h4 className="text-sm font-extrabold uppercase text-amber-800 tracking-wider flex items-center gap-2">
                  <span>🥣 Alimentação & Horários das Refeições</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Marca da Ração</label>
                    <input
                      type="text"
                      placeholder="Ex: Premier, Royal Canin, Guabi"
                      value={healthForm.food_brand}
                      onChange={(e) => setHealthForm({ ...healthForm, food_brand: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Porção por Refeição (Grams)</label>
                    <input
                      type="number"
                      placeholder="Ex: 150"
                      value={healthForm.food_portion_grams}
                      onChange={(e) => setHealthForm({ ...healthForm, food_portion_grams: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Quantas Refeições ao Dia?</label>
                    <select
                      value={mealsPerDay}
                      onChange={(e) => handleMealsCountChange(e.target.value)}
                      className="w-full p-2.5 bg-amber-50 border border-amber-300 rounded-xl text-xs font-bold text-amber-900"
                    >
                      <option value={1}>1 refeição por dia</option>
                      <option value={2}>2 refeições por dia</option>
                      <option value={3}>3 refeições por dia</option>
                      <option value={4}>4 refeições por dia</option>
                    </select>
                  </div>
                </div>

                {/* Relógios Despertadores para Horários das Refeições */}
                <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 space-y-3">
                  <span className="block text-xs font-extrabold text-amber-900 uppercase flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-600" />
                    Selecione os Horários exatos das Refeições (Relógio):
                  </span>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {Array.from({ length: mealsPerDay }).map((_, idx) => (
                      <div key={idx} className="bg-white p-2.5 rounded-xl border border-amber-200 shadow-xs">
                        <label className="block text-[10px] font-extrabold text-gray-600 uppercase mb-1">
                          Refeição {idx + 1}
                        </label>
                        <input
                          type="time"
                          required
                          value={mealTimes[idx] || '08:00'}
                          onChange={(e) => handleMealTimeChange(idx, e.target.value)}
                          className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg text-sm font-bold text-gray-900 focus:bg-white focus:border-amber-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Medicamentos */}
              <div className="space-y-4 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="takes_med"
                    checked={healthForm.takes_medication}
                    onChange={(e) => setHealthForm({ ...healthForm, takes_medication: e.target.checked })}
                    className="w-4 h-4 text-amber-600 rounded-sm cursor-pointer"
                  />
                  <label htmlFor="takes_med" className="text-sm font-extrabold text-gray-900 cursor-pointer">
                    💊 Pet toma medicamento durante a estadia?
                  </label>
                </div>

                {healthForm.takes_medication && (
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Detalhes do Medicamento (Nome, Dosagem e Horários Exatos no Relógio)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Ex: Apoquel 16mg - 1 comprimido às 08h e 20h. Simparic no dia 15."
                      value={healthForm.medication_details}
                      onChange={(e) => setHealthForm({ ...healthForm, medication_details: e.target.value })}
                      className="w-full p-2.5 bg-amber-50/50 border border-amber-200 rounded-xl text-xs font-medium"
                    />
                  </div>
                )}
              </div>

              {/* Saúde e Veterinário */}
              <div className="space-y-4 pt-2 border-t border-gray-100">
                <h4 className="text-sm font-extrabold uppercase text-amber-800 tracking-wider flex items-center gap-2">
                  <span>🏥 Alergias e Veterinário de Confiança</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Alergias Conhecidas</label>
                    <input
                      type="text"
                      placeholder="Ex: Alergia a frango, picada de abelha"
                      value={healthForm.allergies}
                      onChange={(e) => setHealthForm({ ...healthForm, allergies: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Nome do Veterinário</label>
                    <input
                      type="text"
                      placeholder="Ex: Dr. Carlos Silva"
                      value={healthForm.vet_name}
                      onChange={(e) => setHealthForm({ ...healthForm, vet_name: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Telefone do Veterinário</label>
                    <input
                      type="text"
                      placeholder="Ex: (19) 98888-7777"
                      value={healthForm.vet_phone}
                      onChange={(e) => setHealthForm({ ...healthForm, vet_phone: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Comportamento e Cuidados Especiais */}
              <div className="space-y-4 pt-2 border-t border-gray-100">
                <h4 className="text-sm font-extrabold uppercase text-amber-800 tracking-wider flex items-center gap-2">
                  <span>🧠 Comportamento e Dicas Importantes</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Comportamento & Convivência</label>
                    <textarea
                      rows={3}
                      placeholder="Ex: Muito dócil com cães pequenos. Medo de trovão (gosta de ficar no colo)."
                      value={healthForm.behavior_notes}
                      onChange={(e) => setHealthForm({ ...healthForm, behavior_notes: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Instruções ou Cuidados Especiais</label>
                    <textarea
                      rows={3}
                      placeholder="Ex: Gosta de dormir com a cobertinha azul dele. Não dar petiscos de couro."
                      value={healthForm.special_care}
                      onChange={(e) => setHealthForm({ ...healthForm, special_care: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Banner de Feedback em Destaque no Rodapé da Ficha */}
              {statusMsg && (
                <div className="p-4 bg-emerald-50 text-emerald-950 border-2 border-emerald-400 rounded-2xl font-extrabold text-xs flex items-center justify-between shadow-md animate-bounce">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>🎉 {statusMsg} (Pop-up de confirmação aberto)</span>
                  </div>
                  <button type="button" onClick={() => setStatusMsg('')} className="text-xs text-emerald-800 underline font-bold cursor-pointer">
                    Fechar
                  </button>
                </div>
              )}

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={savingForm}
                  className={`font-extrabold px-8 py-3.5 rounded-full shadow-lg transition-all cursor-pointer flex items-center gap-2 text-sm ${formJustSaved
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white ring-4 ring-emerald-400/30'
                    : savingForm
                      ? 'bg-amber-400 text-gray-950 cursor-wait'
                      : 'bg-amber-500 hover:bg-amber-400 text-gray-950 hover:scale-105'
                    }`}
                >
                  {savingForm ? (
                    <>⏳ Salvando Ficha no Hotel...</>
                  ) : formJustSaved ? (
                    <>✅ Ficha Salva com Sucesso!</>
                  ) : (
                    <>💾 Salvar Ficha de Saúde de {selectedPet.name}</>
                  )}
                </button>
              </div>

            </form>
          )}

          {/* TAB 2: AGENDAR RESERVA (5% OFF ANTECIPADO) */}
          {activeTab === 'reserva' && (
            <div className="space-y-8">

              {/* Form Agendar */}
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-200 shadow-lg space-y-6">
                <div>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                    🎉 Incentive a Reserva Antecipada • Desconto de 5%
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-2">
                    Agendar Reserva de Hospedagem para {selectedPet.name}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Programe as datas da viagem. Ao optar pelo pagamento antecipado, você ganha 5% de desconto em todas as diárias!
                  </p>
                </div>

                {bookingSuccessMsg && (
                  <div className="p-4 text-xs bg-emerald-50 text-emerald-900 rounded-2xl border border-emerald-300 font-extrabold space-y-1">
                    {bookingSuccessMsg}
                  </div>
                )}

                <form onSubmit={handleCreateBooking} className="space-y-6">

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Tipo de Serviço</label>
                      <select
                        value={bookingService}
                        onChange={(e) => setBookingService(e.target.value)}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-900"
                      >
                        <option value="hospedagem">🏠 Hospedagem Canina (R$ 70,00/dia)</option>
                        <option value="daycare">☀️ Day Care / Creche Pet (R$ 50,00/dia)</option>
                        <option value="taxi_dog">🚗 Táxi Dog Transporte (R$ 40,00)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Data & Hora de Entrada (Check-in)</label>
                      <input
                        type="datetime-local"
                        required
                        value={bookingCheckIn}
                        onChange={(e) => setBookingCheckIn(e.target.value)}
                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Data & Hora de Saída (Check-out)</label>
                      <input
                        type="datetime-local"
                        required
                        value={bookingCheckOut}
                        onChange={(e) => setBookingCheckOut(e.target.value)}
                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Observações ou Solicitações da Reserva</label>
                    <input
                      type="text"
                      placeholder="Ex: Vou levar no sábado às 09h da manhã. Quero acrescentar banho no último dia."
                      value={bookingNotes}
                      onChange={(e) => setBookingNotes(e.target.value)}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
                    />
                  </div>

                  {/* Escolha da Condição de Pagamento e Desconto 5% OFF */}
                  {pricing.days > 0 && (
                    <div className="space-y-4 pt-2">
                      <label className="block text-xs font-extrabold text-gray-900 uppercase tracking-wider">
                        Escolha a Forma de Pagamento e Condição de Desconto ({pricing.days} diária(s)):
                      </label>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {/* OPÇÃO 1: PAGAMENTO ANTECIPADO VIA PIX (COM 5% OFF) */}
                        <div
                          onClick={() => setPaymentMethod('pix_antecipado')}
                          className={`p-5 rounded-3xl border-2 transition-all cursor-pointer space-y-3 relative overflow-hidden ${paymentMethod === 'pix_antecipado'
                            ? 'bg-emerald-500/10 border-emerald-500 ring-4 ring-emerald-400/20 shadow-md'
                            : 'bg-gray-50 border-gray-200 hover:border-emerald-300'
                            }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-extrabold uppercase text-emerald-900 bg-emerald-200 px-3 py-1 rounded-full border border-emerald-300">
                              🎉 5% OFF • PAGAMENTO ANTECIPADO
                            </span>
                            <input
                              type="radio"
                              name="payment_option"
                              checked={paymentMethod === 'pix_antecipado'}
                              onChange={() => setPaymentMethod('pix_antecipado')}
                              className="w-4 h-4 text-emerald-600 cursor-pointer"
                            />
                          </div>

                          <div>
                            <h4 className="text-sm font-extrabold text-gray-900">
                              Pagamento Antecipado via Pix
                            </h4>
                            <div className="flex items-baseline gap-2 mt-1">
                              <span className="text-xs text-gray-400 line-through font-bold">R$ {pricing.rawTotal.toFixed(2)}</span>
                              <span className="text-2xl font-black text-emerald-700">R$ {pricing.discountedTotal.toFixed(2)}</span>
                              <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                                -R$ {pricing.savings.toFixed(2)}
                              </span>
                            </div>
                          </div>

                          <p className="text-[11px] text-emerald-950 font-medium leading-relaxed">
                            💡 O desconto de 5% é <strong>exclusivo para pagamento antecipado no Pix</strong>. Você garante o desconto e o hotel provisiona seu caixa!
                          </p>

                          {/* Chave Pix Copiar */}
                          {paymentMethod === 'pix_antecipado' && (
                            <div className="pt-2 border-t border-emerald-200/60 space-y-1.5 text-xs">
                              <span className="block font-bold text-gray-900 text-[11px]">Chave Pix do Hotel (E-mail):</span>
                              <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-emerald-300 font-mono text-[11px]">
                                <span className="font-extrabold text-emerald-950">geraldo58936@gmail.com</span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigator.clipboard.writeText('geraldo58936@gmail.com');
                                    setCopiedPix(true);
                                    setTimeout(() => setCopiedPix(false), 3000);
                                  }}
                                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-lg cursor-pointer shrink-0 transition-colors"
                                >
                                  {copiedPix ? '✓ Copiada!' : 'Copiar Key'}
                                </button>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* OPÇÃO 2: PAGAMENTO PRESENCIAL NO CHECK-IN (SEM DESCONTO) */}
                        <div
                          onClick={() => setPaymentMethod('checkin_local')}
                          className={`p-5 rounded-3xl border-2 transition-all cursor-pointer space-y-3 ${paymentMethod === 'checkin_local'
                            ? 'bg-amber-500/10 border-amber-500 ring-4 ring-amber-400/20 shadow-md'
                            : 'bg-gray-50 border-gray-200 hover:border-amber-300'
                            }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase text-gray-700 bg-gray-200 px-3 py-1 rounded-full">
                              PREÇO INTEGRAL
                            </span>
                            <input
                              type="radio"
                              name="payment_option"
                              checked={paymentMethod === 'checkin_local'}
                              onChange={() => setPaymentMethod('checkin_local')}
                              className="w-4 h-4 text-amber-600 cursor-pointer"
                            />
                          </div>

                          <div>
                            <h4 className="text-sm font-extrabold text-gray-900">
                              Pagamento no Check-in Presencial
                            </h4>
                            <div className="flex items-baseline gap-2 mt-1">
                              <span className="text-2xl font-black text-gray-900">R$ {pricing.rawTotal.toFixed(2)}</span>
                              <span className="text-[10px] text-gray-500 font-bold uppercase">(Sem Desconto)</span>
                            </div>
                          </div>

                          <p className="text-[11px] text-gray-600 font-medium leading-relaxed">
                            O pagamento integral é efetuado presencialmente no balcão do hotel na entrega do pet.
                          </p>
                        </div>

                      </div>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={creatingBooking || !bookingCheckIn || !bookingCheckOut}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-8 py-3.5 rounded-full shadow-lg transition-all cursor-pointer flex items-center gap-2"
                    >
                      {creatingBooking ? 'Confirmando Reserva...' : 'Confirmar Reserva de Hospedagem'}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </form>
              </div>

              {/* Minhas Reservas Anteriores */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm space-y-4">
                <h4 className="text-base font-extrabold text-gray-900">Histórico de Reservas Solicitadas:</h4>
                {bookingsList.length === 0 ? (
                  <p className="text-xs text-gray-500 italic">Nenhuma reserva agendada ainda.</p>
                ) : (
                  <div className="space-y-3">
                    {bookingsList.map((b) => (
                      <div key={b.id} className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-gray-900 text-sm">🐕 {b.pets?.name || 'Pet'}</span>
                            <span className="bg-amber-200 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                              {b.service_type}
                            </span>
                          </div>
                          <p className="text-gray-600 mt-1">
                            📅 <strong>Check-in:</strong> {new Date(b.check_in).toLocaleString('pt-BR')} | <strong>Check-out:</strong> {new Date(b.check_out).toLocaleString('pt-BR')}
                          </p>
                          {b.notes && <p className="text-[11px] text-gray-500 italic mt-0.5">{b.notes}</p>}
                        </div>

                        <div className="flex flex-col sm:items-end gap-1">
                          <span className="text-base font-extrabold text-emerald-700">R$ {parseFloat(b.total_price).toFixed(2)}</span>
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${b.payment_status === 'prepaid_pending_verification' || b.payment_status === 'pendente_desconto_5'
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300 font-extrabold'
                            : b.payment_status === 'pago'
                              ? 'bg-emerald-600 text-white border-emerald-700'
                              : 'bg-amber-100 text-amber-900 border-amber-300'
                            }`}>
                            {b.payment_status === 'prepaid_pending_verification' || b.payment_status === 'pendente_desconto_5'
                              ? '🟢 Pré-pago Pix (5% OFF)'
                              : b.payment_status === 'pago'
                                ? '🟢 Pago'
                                : '🪙 Pagamento no Check-in'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 3: FEED AO VIVO */}
          {activeTab === 'feed' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-amber-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                      Feed em Tempo Real 🐾
                    </span>
                    <span className="bg-purple-100 text-purple-900 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                      Fotos & Vídeos de 15s 🎥
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 mt-1">
                    Diário de Campo • {selectedPet.name}
                  </h3>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Acompanhe as fotos, vídeos e atualizações da rotina enviadas diretamente pelo Hotel Quintal dos Animais.
                  </p>
                </div>
                <button
                  onClick={() => loadFeedPosts(selectedPet.id)}
                  className="self-start sm:self-auto text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 px-4 py-2 rounded-full border border-amber-200 cursor-pointer transition-colors"
                >
                  🔄 Atualizar Feed
                </button>
              </div>

              {feedPosts.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-amber-200 shadow-xs space-y-3">
                  <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                    <Camera className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">Nenhuma foto ou vídeo no momento</h4>
                  <p className="text-xs text-gray-600 max-w-md mx-auto">
                    Assim que Geraldo postar fotos ou vídeos da rotina de <strong>{selectedPet.name}</strong>, elas aparecerão aqui em tempo real!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {feedPosts.map((post) => {
                    const isVid = isVideoMedia(post.image_url);
                    return (
                      <div key={post.id} className="bg-white rounded-3xl overflow-hidden border border-amber-200 shadow-md flex flex-col justify-between">
                        
                        {/* Mídia: Vídeo Player ou Foto */}
                        {post.image_url && (
                          <div className="relative bg-black w-full overflow-hidden">
                            {isVid ? (
                              <div className="aspect-video w-full flex items-center justify-center bg-black">
                                <video
                                  src={post.image_url}
                                  controls
                                  playsInline
                                  preload="metadata"
                                  className="w-full h-full object-contain"
                                >
                                  Seu navegador não suporta a reprodução deste vídeo.
                                </video>
                                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-extrabold px-3 py-1 rounded-full flex items-center gap-1.5 pointer-events-none">
                                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                  <span>Vídeo do Hotel 🎥</span>
                                </div>
                              </div>
                            ) : (
                              <div
                                className="relative group cursor-pointer overflow-hidden bg-gray-100"
                                onClick={() => setSelectedMediaModal(post.image_url)}
                              >
                                <img
                                  src={post.image_url}
                                  alt={`Momento de ${selectedPet.name}`}
                                  className="w-full h-64 sm:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                                  loading="lazy"
                                />
                                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-extrabold px-3 py-1 rounded-full flex items-center gap-1.5 pointer-events-none">
                                  <span>Foto do Hotel 📸</span>
                                </div>
                                <div className="absolute bottom-3 right-3 bg-black/60 hover:bg-black text-white text-xs p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Maximize2 className="w-4 h-4" />
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Conteúdo do Post */}
                        <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                          <div className="space-y-3">
                            <div className="flex flex-wrap gap-2">
                              {post.meal_ok && (
                                <span className="text-[11px] font-extrabold bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded-full border border-emerald-300">
                                  🥣 Alimentação OK
                                </span>
                              )}
                              {post.meds_ok && (
                                <span className="text-[11px] font-extrabold bg-blue-100 text-blue-900 px-2.5 py-1 rounded-full border border-blue-300">
                                  💊 Medicação OK
                                </span>
                              )}
                              {post.playtime_ok && (
                                <span className="text-[11px] font-extrabold bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full border border-amber-300">
                                  🐕 Recreação OK
                                </span>
                              )}
                            </div>

                            {post.caption && (
                              <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-medium bg-amber-50/50 p-3 rounded-2xl border border-amber-100">
                                "{post.caption}"
                              </p>
                            )}
                          </div>

                          <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-[10px] font-semibold text-gray-400">
                              Publicado em {new Date(post.created_at).toLocaleString('pt-BR')}
                            </span>
                            <span className="text-[10px] font-bold text-amber-800">
                              Hotel Quintal dos Animais 🐾
                            </span>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}

              {/* Lightbox Modal de Foto em Tela Cheia */}
              {selectedMediaModal && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/90 backdrop-blur-md animate-fadeIn"
                  onClick={() => setSelectedMediaModal(null)}
                >
                  <div
                    className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setSelectedMediaModal(null)}
                      className="absolute -top-12 right-0 text-white hover:text-amber-400 font-bold text-xs sm:text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>Fechar</span>
                    </button>
                    <img
                      src={selectedMediaModal}
                      alt="Foto ampliada do pet"
                      className="max-w-full max-h-[80vh] rounded-3xl object-contain shadow-2xl border border-white/20"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: MURAL DE RECADOS */}
          {activeTab === 'recados' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-lg space-y-6">
              <div>
                <h3 className="text-xl font-extrabold text-gray-900">
                  Mural de Recados & Solicitações
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  Envie recados diretos para Geraldo Gomes durante a estadia do seu pet.
                </p>
              </div>

              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="Ex: Favor dar banho antes de eu buscar às 17h."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium focus:bg-white focus:border-amber-500 focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-gray-950 font-extrabold px-6 py-3 rounded-2xl shadow-sm transition-colors cursor-pointer flex items-center gap-1.5 text-xs shrink-0"
                >
                  <Send className="w-4 h-4" /> Enviar
                </button>
              </form>

              <div className="space-y-3 pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold text-gray-700 uppercase">Seus Recados Recentes:</h4>
                {messages.length === 0 ? (
                  <p className="text-xs text-gray-500 italic">Nenhum recado enviado ainda.</p>
                ) : (
                  messages.map((m) => (
                    <div key={m.id} className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-1">
                      <p className="text-xs text-gray-800 font-medium">{m.message}</p>
                      <div className="flex items-center justify-between text-[10px] text-gray-500">
                        <span>{new Date(m.created_at).toLocaleString('pt-BR')}</span>
                        <span className={`font-bold ${m.is_read_by_admin ? 'text-emerald-600' : 'text-amber-700'}`}>
                          {m.is_read_by_admin ? '✓ Lido pelo Hotel' : '⏳ Recebido pelo Hotel'}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-amber-200 shadow-sm space-y-4">
          <Heart className="w-12 h-12 text-amber-500 mx-auto" />
          <h3 className="text-xl font-bold text-gray-900">Nenhum Pet Selecionado</h3>
          <p className="text-xs text-gray-600 max-w-sm mx-auto">
            Cadastre seu primeiro pet acima para começar a preencher a Ficha de Saúde, agendar reservas e acompanhar o feed!
          </p>
        </div>
      )}

    </div>
  );
}
