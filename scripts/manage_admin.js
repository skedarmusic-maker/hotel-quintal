import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dpibdwbabkqearoiduwe.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwaWJkd2JhYmtxZWFyb2lkdXdlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDI2OTg5NywiZXhwIjoyMTA1ODQ1ODk3fQ.KNPnhCd2SYLofpGPZqHROopAHvC8nF3oEkwO-Nii9-s';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function createOrUpdateAdmin() {
  console.log("Verificando perfis existentes...");

  const adminEmail = 'geraldo58936@gmail.com';
  const adminPassword = '1q2w3e4r!!!SK'; // Senha segura padrãod o projeto

  // 1. Listar usuários da Auth
  const { data: authUsers, error: listErr } = await supabase.auth.admin.listUsers();

  if (listErr) {
    console.error("Erro ao listar usuários auth:", listErr);
    return;
  }

  console.log("Usuários Auth no Supabase:", authUsers.users.map(u => ({ id: u.id, email: u.email })));

  let existingUser = authUsers.users.find(u => u.email === adminEmail);

  if (!existingUser) {
    console.log(`Criando conta admin para ${adminEmail}...`);
    const { data: newUser, error: createErr } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: {
        full_name: 'Geraldo Gomes (Admin)',
        phone: '19995064431',
        role: 'admin'
      }
    });

    if (createErr) {
      console.error("Erro ao criar usuário admin:", createErr);
      return;
    }

    existingUser = newUser.user;
    console.log("✅ Usuário admin criado com sucesso!");
  } else {
    console.log(`Usuário ${adminEmail} já existe. Atualizando senha e perfil...`);
    await supabase.auth.admin.updateUserById(existingUser.id, {
      password: adminPassword
    });
  }

  // 2. Garantir que o perfil tem role = 'admin'
  const { error: profileErr } = await supabase
    .from('profiles')
    .upsert({
      id: existingUser.id,
      full_name: 'Geraldo Gomes (Admin)',
      phone: '19995064431',
      role: 'admin'
    });

  if (profileErr) {
    console.error("Erro ao atualizar role na tabela profiles:", profileErr);
  } else {
    console.log(`✅ Perfil de ${adminEmail} definido como 'admin' com SUCESSO!`);
    console.log(`🔑 Credenciais de Acesso Admin:`);
    console.log(`   E-mail: ${adminEmail}`);
    console.log(`   Senha: ${adminPassword}`);
  }
}

createOrUpdateAdmin();
