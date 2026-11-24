import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dpibdwbabkqearoiduwe.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwaWJkd2JhYmtxZWFyb2lkdXdlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDI2OTg5NywiZXhwIjoyMTA1ODQ1ODk3fQ.KNPnhCd2SYLofpGPZqHROopAHvC8nF3oEkwO-Nii9-s';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function testSafeHealthFormSave() {
  const { data: pets } = await supabase.from('pets').select('*').limit(1);
  const pet = pets[0];

  const payload = {
    pet_id: pet.id,
    food_brand: "Premier Ração Teste 2",
    food_portion_grams: 200,
    feeding_schedule: "08:00, 18:00",
    takes_medication: true,
    medication_details: "Remédio de teste 1x ao dia às 12h",
    allergies: "Nenhuma",
    vet_name: "Dr. Carlos",
    vet_phone: "19999998888",
    behavior_notes: "Dócil",
    special_care: "Carinho extra",
    updated_at: new Date().toISOString()
  };

  // Check if exists
  const { data: existing } = await supabase
    .from('pet_health_forms')
    .select('id')
    .eq('pet_id', pet.id)
    .maybeSingle();

  let resultError = null;

  if (existing) {
    const { error } = await supabase
      .from('pet_health_forms')
      .update(payload)
      .eq('pet_id', pet.id);
    resultError = error;
  } else {
    const { error } = await supabase
      .from('pet_health_forms')
      .insert([payload]);
    resultError = error;
  }

  if (resultError) {
    console.error("❌ Erro no save seguro:", resultError);
  } else {
    console.log("✅ Ficha de saúde salva com SUCESSO ABSOLUTO!");
  }
}

testSafeHealthFormSave();
