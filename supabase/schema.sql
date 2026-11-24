-- ========================================================
-- SCHEMA SQL PARA HOTEL QUINTAL DOS ANIMAIS (SUPABASE)
-- Execute este script no SQL Editor do seu projeto Supabase
-- ========================================================

-- 1. TABELA DE PERFIS DE USUÁRIOS (Tutores e Admin)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT,
  role TEXT CHECK (role IN ('tutor', 'admin')) DEFAULT 'tutor',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABELA DE PETS
CREATE TABLE IF NOT EXISTS public.pets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  breed TEXT,
  age INTEGER,
  weight NUMERIC(5,2),
  photo_url TEXT,
  gender TEXT CHECK (gender IN ('macho', 'femea')),
  is_castrated BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. FICHA DE SAÚDE E CUIDADOS ("DIÁRIO DE BORDO DO PET")
CREATE TABLE IF NOT EXISTS public.pet_health_forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id UUID REFERENCES public.pets(id) ON DELETE CASCADE UNIQUE NOT NULL,
  food_brand TEXT,
  food_portion_grams INTEGER,
  feeding_schedule TEXT, -- Ex: "08:00, 18:00"
  takes_medication BOOLEAN DEFAULT FALSE,
  medication_details TEXT, -- Nome, dosagem, frequência e horários
  allergies TEXT,
  vet_name TEXT,
  vet_phone TEXT,
  behavior_notes TEXT, -- Como reage com cães, medo de barulhos, hábitos
  special_care TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. AGENDAMENTOS E RESERVAS
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id UUID REFERENCES public.pets(id) ON DELETE CASCADE NOT NULL,
  tutor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  service_type TEXT CHECK (service_type IN ('hospedagem', 'daycare', 'taxi_dog')) NOT NULL,
  check_in TIMESTAMPTZ NOT NULL,
  check_out TIMESTAMPTZ NOT NULL,
  total_price NUMERIC(10,2) NOT NULL DEFAULT 0.00,
  payment_status TEXT CHECK (payment_status IN ('pago', 'pendente', 'parcial')) DEFAULT 'pendente',
  booking_status TEXT CHECK (booking_status IN ('confirmado', 'em_andamento', 'concluido', 'cancelado')) DEFAULT 'confirmado',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. FEED DE ATUALIZAÇÕES DO PET ("DIÁRIO DE CAMPO")
CREATE TABLE IF NOT EXISTS public.pet_feed_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id UUID REFERENCES public.pets(id) ON DELETE CASCADE NOT NULL,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  image_url TEXT,
  caption TEXT,
  meal_ok BOOLEAN DEFAULT FALSE,
  meds_ok BOOLEAN DEFAULT FALSE,
  playtime_ok BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. MURAL DE RECADOS DOS TUTORES
CREATE TABLE IF NOT EXISTS public.tutor_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE NOT NULL,
  tutor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  message TEXT NOT NULL,
  is_read_by_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. REGISTRO FINANCEIRO OPERACIONAL
CREATE TABLE IF NOT EXISTS public.financial_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  description TEXT NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  type TEXT CHECK (type IN ('diaria', 'extra_banho', 'extra_transporte', 'outro')) DEFAULT 'diaria',
  status TEXT CHECK (status IN ('pago', 'pendente')) DEFAULT 'pendente',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================
-- ROW LEVEL SECURITY (RLS) & POLÍTICAS DE SEGURANÇA
-- ========================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pet_health_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pet_feed_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutor_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_transactions ENABLE ROW LEVEL SECURITY;

-- Função auxiliar para verificar se o usuário atual é admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Políticas para PROFILES
CREATE POLICY "Usuários veem próprio perfil ou admin vê todos" ON public.profiles
  FOR SELECT USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Usuários editam próprio perfil ou admin edita" ON public.profiles
  FOR UPDATE USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Inserção de perfil ao registrar" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id OR public.is_admin());

-- Políticas para PETS
CREATE POLICY "Tutor vê seus pets ou admin vê todos" ON public.pets
  FOR SELECT USING (tutor_id = auth.uid() OR public.is_admin());

CREATE POLICY "Tutor edita seus pets ou admin edita" ON public.pets
  FOR ALL USING (tutor_id = auth.uid() OR public.is_admin());

-- Políticas para PET_HEALTH_FORMS
CREATE POLICY "Acesso à Ficha de Saúde" ON public.pet_health_forms
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.pets WHERE pets.id = pet_health_forms.pet_id AND pets.tutor_id = auth.uid())
    OR public.is_admin()
  );

-- Políticas para BOOKINGS
CREATE POLICY "Visualização de Reservas" ON public.bookings
  FOR SELECT USING (tutor_id = auth.uid() OR public.is_admin());

CREATE POLICY "Gestão de Reservas pelo Admin" ON public.bookings
  FOR ALL USING (public.is_admin());

-- Políticas para PET_FEED_POSTS
CREATE POLICY "Visualização de Posts do Feed" ON public.pet_feed_posts
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.pets WHERE pets.id = pet_feed_posts.pet_id AND pets.tutor_id = auth.uid())
    OR public.is_admin()
  );

CREATE POLICY "Admin publica no Feed" ON public.pet_feed_posts
  FOR ALL USING (public.is_admin());

-- Políticas para TUTOR_MESSAGES
CREATE POLICY "Envio e visualização de recados" ON public.tutor_messages
  FOR ALL USING (tutor_id = auth.uid() OR public.is_admin());

-- Políticas para FINANCIAL_TRANSACTIONS
CREATE POLICY "Apenas Admin gerencia financeiro" ON public.financial_transactions
  FOR ALL USING (public.is_admin());

-- ========================================================
-- TRIGGER PARA CRIAR PERFIL AUTOMÁTICO AO CRIAR USUÁRIO AUTH
-- ========================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Novo Usuário'),
    NEW.raw_user_meta_data->>'phone',
    COALESCE(NEW.raw_user_meta_data->>'role', 'tutor')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ========================================================
-- BUCKET DE ARMAZENAMENTO DE IMAGENS (STORAGE)
-- ========================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('pet-media', 'pet-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Imagens públicas para visualização" ON storage.objects
  FOR SELECT USING (bucket_id = 'pet-media');

CREATE POLICY "Upload por usuários autenticados" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'pet-media' AND auth.role() = 'authenticated');
