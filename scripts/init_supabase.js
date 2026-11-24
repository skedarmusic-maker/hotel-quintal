import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dpibdwbabkqearoiduwe.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwaWJkd2JhYmtxZWFyb2lkdXdlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDI2OTg5NywiZXhwIjoyMTA1ODQ1ODk3fQ.KNPnhCd2SYLofpGPZqHROopAHvC8nF3oEkwO-Nii9-s';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function testConnection() {
  console.log("Conectando ao Supabase com Service Role Key...");
  try {
    const { data, error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
    
    if (error) {
      if (error.code === '42P01') {
        console.log("⚠️ Conexão realizada com sucesso! As tabelas ainda não foram criadas no banco de dados.");
        console.log("💡 Por favor, execute o script SQL 'supabase/schema.sql' no SQL Editor do painel do Supabase.");
      } else {
        console.error("❌ Erro ao consultar banco:", error);
      }
    } else {
      console.log("✅ Conexão estabelecida com sucesso! Tabela 'profiles' já existe. Registros:", data);
    }
  } catch (err) {
    console.error("❌ Falha na conexão:", err);
  }
}

testConnection();
