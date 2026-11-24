import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dpibdwbabkqearoiduwe.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwaWJkd2JhYmtxZWFyb2lkdXdlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDI2OTg5NywiZXhwIjoyMTA1ODQ1ODk3fQ.KNPnhCd2SYLofpGPZqHROopAHvC8nF3oEkwO-Nii9-s';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function testInsertPetWithoutGender() {
  const { data: users } = await supabase.from('profiles').select('*').limit(1);
  const tutor = users[0];

  const testPet = {
    tutor_id: tutor.id,
    name: "Pet de Teste 2",
    breed: "Golden",
    age: 2,
    weight: 15.5
  };

  const { data, error } = await supabase.from('pets').insert([testPet]).select().single();
  if (error) {
    console.error("❌ Erro sem gender:", error);
  } else {
    console.log("✅ Pet inserido sem gender com SUCESSO!", data);
    await supabase.from('pets').delete().eq('id', data.id);
  }
}

testInsertPetWithoutGender();
